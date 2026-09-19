<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Category;
use App\Models\Event;
use App\Models\LibrarySetting;
use App\Models\Loan;
use App\Models\Magazine;
use App\Models\MagazineEdition;
use App\Models\Reservation;
use App\Models\SmansaWork;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function panel(): Response
    {
        $user = auth()->user();
        if (!$user || !in_array($user->role, ['librarian', 'admin'])) {
            abort(403, 'Akses ditolak. Halaman ini hanya untuk pustakawan dan guru.');
        }

        $stats = [
            'totalBooks'          => Book::count(),
            'totalCopies'         => BookCopy::count(),
            'activeLoans'         => Loan::where('status', 'active')->count(),
            'pendingReservations' => Reservation::where('status', 'pending')->count(),
            'totalMembers'        => User::whereIn('role', ['student', 'teacher'])->count(),
            'totalEvents'         => Event::count(),
            'totalWorks'          => SmansaWork::count(),
            'pendingWorks'        => SmansaWork::where('is_published', false)->count(),
        ];

        $books = Book::with(['category', 'authors'])
            ->withCount('copies')
            ->latest()
            ->paginate(10);

        $magazines = Magazine::with(['editions' => function ($q) {
            $q->orderByDesc('publication_date');
        }])->get();

        $events = Event::latest()->paginate(10);

        $activeLoans = Loan::with(['user', 'bookCopy.book'])
            ->where('status', 'active')
            ->latest()
            ->get();

        $categories = Category::orderBy('name')->get(['id', 'name']);

        $settings = [
            'online_loan_duration_days' => (int) LibrarySetting::get('online_loan_duration_days', 3),
            'max_online_loans'          => (int) LibrarySetting::get('max_online_loans', 3),
            'library_name'              => LibrarySetting::get('library_name', 'Perpustakaan SMAN 1 Bukittinggi'),
            'library_address'           => LibrarySetting::get('library_address', 'Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi'),
            'contact_phone'             => LibrarySetting::get('contact_phone', '(0752) 22543'),
            'inlislite_guestbook_url'   => LibrarySetting::get('inlislite_guestbook_url', env('INLISLITE_GUESTBOOK_URL', 'http://192.168.1.100:8123/inlislite3/buku-tamu')),
        ];

        $inlisliteInfo = [
            'guestbook_url'  => $settings['inlislite_guestbook_url'],
            'connected'      => false,
            'today_visitors' => 0,
            'message'        => 'Koneksi database INLISLite siap terhubung saat server lokal perpustakaan diaktifkan.',
        ];

        try {
            if (config('database.connections.inlislite')) {
                $pdo = \Illuminate\Support\Facades\DB::connection('inlislite')->getPdo();
                if ($pdo) {
                    $inlisliteInfo['connected'] = true;
                    $tables = \Illuminate\Support\Facades\DB::connection('inlislite')->select("SHOW TABLES LIKE 'memberguesses'");
                    if (!empty($tables)) {
                        $inlisliteInfo['today_visitors'] = \Illuminate\Support\Facades\DB::connection('inlislite')
                            ->table('memberguesses')
                            ->whereDate('CreateDate', now()->toDateString())
                            ->count();
                        $inlisliteInfo['message'] = 'Terhubung langsung ke database INLISLite v3 Perpusnas.';
                    } else {
                        $inlisliteInfo['message'] = 'Terhubung ke server MySQL INLISLite.';
                    }
                }
            }
        } catch (\Throwable $e) {
            $inlisliteInfo['connected'] = false;
            $inlisliteInfo['message'] = 'Menunggu server lokal perpustakaan sekolah aktif di jaringan.';
        }

        return Inertia::render('Admin/Panel', [
            'stats'         => $stats,
            'books'         => $books,
            'magazines'     => $magazines,
            'events'        => $events,
            'activeLoans'   => $activeLoans,
            'categories'    => $categories,
            'settings'      => $settings,
            'inlisliteInfo' => $inlisliteInfo,
        ]);
    }

    /**
     * Store a newly created book.
     */
    public function storeBook(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'            => 'required|string|max:255',
            'author_name'      => 'nullable|string|max:255',
            'category_id'      => 'required|exists:categories,id',
            'publication_year' => 'required|integer|min:1900|max:' . (date('Y') + 1),
            'isbn'             => 'nullable|string|max:50',
            'shelf_location'   => 'nullable|string|max:100',
            'synopsis'         => 'required|string',
            'copies_count'     => 'nullable|integer|min:1|max:50',
            'cover_image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
            'ebook_file'       => 'nullable|file|mimes:pdf|max:15360', // Max 15MB
        ], [
            'cover_image.max'  => 'Ukuran foto sampul maksimal 2 MB. Mohon kompres foto terlebih dahulu.',
            'ebook_file.max'   => 'Ukuran file e-book PDF maksimal 15 MB.',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = '/storage/' . $request->file('cover_image')->store('covers', 'public');
        }

        $ebookPath = null;
        $isEbook = false;
        if ($request->hasFile('ebook_file')) {
            $ebookPath = '/storage/' . $request->file('ebook_file')->store('ebooks', 'public');
            $isEbook = true;
        }

        $slug = Str::slug($validated['title']) . '-' . rand(100, 999);

        $book = Book::create([
            'title'            => $validated['title'],
            'slug'             => $slug,
            'category_id'      => $validated['category_id'],
            'publication_year' => $validated['publication_year'],
            'isbn'             => $validated['isbn'] ?? null,
            'shelf_location'   => $validated['shelf_location'] ?? 'Rak Umum',
            'synopsis'         => $validated['synopsis'],
            'cover_image'      => $coverPath,
            'ebook_file_path'  => $ebookPath,
            'is_ebook'         => $isEbook,
        ]);

        // Attach or create author
        if (!empty($validated['author_name'])) {
            $author = Author::firstOrCreate(
                ['name' => trim($validated['author_name'])],
                ['slug' => Str::slug($validated['author_name'])]
            );
            $book->authors()->syncWithoutDetaching([$author->id]);
        }

        // Generate copies
        $copiesCount = $validated['copies_count'] ?? 1;
        for ($i = 1; $i <= $copiesCount; $i++) {
            BookCopy::create([
                'book_id'            => $book->id,
                'barcode_identifier' => 'SMANSA-' . $book->id . '-' . str_pad((string)$i, 2, '0', STR_PAD_LEFT),
                'status'             => 'available',
                'shelf_location'     => $validated['shelf_location'] ?? 'Rak Umum',
            ]);
        }

        return back()->with('status', 'Buku baru "' . $book->title . '" berhasil ditambahkan.');
    }

    /**
     * Delete a book.
     */
    public function deleteBook(int $id): RedirectResponse
    {
        $book = Book::findOrFail($id);
        $title = $book->title;
        $book->delete();

        return back()->with('status', 'Buku "' . $title . '" berhasil dihapus.');
    }

    /**
     * Store a new magazine or bulletin edition.
     */
    public function storeMagazineEdition(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'magazine_id'      => 'required|exists:magazines,id',
            'edition_title'    => 'required|string|max:255',
            'edition_number'   => 'required|string|max:50',
            'publication_date' => 'required|date',
            'description'      => 'nullable|string',
            'cover_image'      => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
            'pdf_file'         => 'nullable|file|mimes:pdf|max:15360', // Max 15MB
        ], [
            'cover_image.max'  => 'Ukuran foto sampul maksimal 2 MB.',
            'pdf_file.max'     => 'Ukuran file PDF maksimal 15 MB.',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = '/storage/' . $request->file('cover_image')->store('magazines/covers', 'public');
        }

        $pdfPath = null;
        if ($request->hasFile('pdf_file')) {
            $pdfPath = '/storage/' . $request->file('pdf_file')->store('magazines/editions', 'public');
        }

        MagazineEdition::create([
            'magazine_id'      => $validated['magazine_id'],
            'edition_title'    => $validated['edition_title'],
            'edition_number'   => $validated['edition_number'],
            'publication_date' => $validated['publication_date'],
            'year'             => date('Y', strtotime($validated['publication_date'])),
            'description'      => $validated['description'] ?? null,
            'cover_image'      => $coverPath ?? 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
            'pdf_file_path'    => $pdfPath ?? '/storage/sample_bulletin.pdf',
        ]);

        return back()->with('status', 'Edisi buletin/majalah berhasil diterbitkan.');
    }

    /**
     * Delete a magazine edition.
     */
    public function deleteMagazineEdition(int $id): RedirectResponse
    {
        $edition = MagazineEdition::findOrFail($id);
        $edition->delete();

        return back()->with('status', 'Edisi buletin/majalah berhasil dihapus.');
    }

    /**
     * Store event or news.
     */
    public function storeEvent(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'type'        => 'required|in:event,duta,podcast',
            'event_date'  => 'nullable|date',
            'location'    => 'nullable|string|max:255',
            'description' => 'required|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048', // Max 2MB
        ], [
            'cover_image.max' => 'Ukuran gambar cover maksimal 2 MB.',
        ]);

        $coverPath = null;
        if ($request->hasFile('cover_image')) {
            $coverPath = '/storage/' . $request->file('cover_image')->store('events', 'public');
        }

        Event::create([
            'title'        => $validated['title'],
            'slug'         => Str::slug($validated['title']) . '-' . rand(100, 999),
            'type'         => $validated['type'],
            'event_date'   => $validated['event_date'] ?? null,
            'location'     => $validated['location'] ?? 'Ruang Baca SMAN 1 Bukittinggi',
            'description'  => $validated['description'],
            'cover_image'  => $coverPath,
            'is_published' => true,
        ]);

        return back()->with('status', 'Agenda/berita kegiatan berhasil dipublikasikan.');
    }

    /**
     * Delete an event.
     */
    public function deleteEvent(int $id): RedirectResponse
    {
        $event = Event::findOrFail($id);
        $event->delete();

        return back()->with('status', 'Agenda/kegiatan berhasil dihapus.');
    }

    /**
     * Update settings.
     */
    public function updateSettings(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'online_loan_duration_days' => 'required|integer|min:1|max:30',
            'max_online_loans'          => 'required|integer|min:1|max:10',
            'library_name'              => 'required|string|max:255',
            'library_address'           => 'nullable|string|max:255',
            'contact_phone'             => 'nullable|string|max:50',
            'inlislite_guestbook_url'   => 'nullable|string|max:255',
        ]);

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                LibrarySetting::set($key, (string)$value);
            }
        }

        return back()->with('status', 'Pengaturan perpustakaan dan tautan INLISLite berhasil disimpan.');
    }

    /**
     * Cari anggota/siswa menggunakan Barcode Scanner atau NIS untuk sirkulasi cepat meja perpustakaan.
     */
    public function quickLookupMember(Request $request): \Illuminate\Http\JsonResponse
    {
        $query = trim($request->input('query', ''));
        if (!$query) {
            return response()->json(['found' => false, 'message' => 'Silakan scan kartu atau ketikkan NIS siswa.']);
        }

        $student = User::where('identifier_number', $query)
            ->orWhere('email', $query)
            ->orWhere('id', is_numeric($query) ? (int)$query : 0)
            ->orWhere('name', 'like', "%{$query}%")
            ->first();

        if (!$student) {
            return response()->json(['found' => false, 'message' => "Siswa / anggota dengan NIS/ID '$query' tidak ditemukan."]);
        }

        $activeLoans = Loan::with(['bookCopy.book'])
            ->where('user_id', $student->id)
            ->where('status', 'active')
            ->get();

        return response()->json([
            'found' => true,
            'student' => [
                'id' => $student->id,
                'name' => $student->name,
                'email' => $student->email,
                'identifier_number' => $student->identifier_number ?: '-',
                'class_name' => $student->class_name ?: 'Warga SMANSA',
                'phone_number' => $student->phone_number ?: '-',
                'role' => $student->role,
                'active_loans_count' => $activeLoans->count(),
                'can_borrow' => $activeLoans->count() < 3,
            ],
            'active_loans' => $activeLoans,
        ]);
    }

    /**
     * Proses peminjaman fisik cepat di meja perpustakaan dengan scan barcode buku.
     */
    public function quickStoreLoan(Request $request): RedirectResponse
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'barcode' => 'required|string',
        ]);

        $barcode = trim($request->input('barcode'));
        $copy = BookCopy::with('book')->where('barcode_identifier', $barcode)->first();

        if (!$copy) {
            return back()->with('error', "Eksemplar buku dengan barcode '$barcode' tidak ditemukan dalam katalog.");
        }

        if ($copy->status !== 'available') {
            return back()->with('error', "Buku ini sedang berstatus '{$copy->status}' dan tidak dapat dipinjamkan.");
        }

        $activeCount = Loan::where('user_id', $request->user_id)->where('status', 'active')->count();
        if ($activeCount >= 3) {
            return back()->with('error', 'Siswa telah mencapai batas kuota maksimum peminjaman fisik (3 buku).');
        }

        Loan::create([
            'loan_code' => 'P-' . strtoupper(substr(uniqid(), -8)),
            'user_id' => $request->user_id,
            'book_copy_id' => $copy->id,
            'librarian_id' => auth()->id(),
            'borrowed_at' => now(),
            'due_at' => now()->addDays(7),
            'status' => 'active',
            'is_online_loan' => false,
            'notes' => 'Peminjaman sirkulasi meja perpustakaan (Scan Barcode Fisik)',
        ]);

        $copy->update(['status' => 'borrowed']);

        return back()->with('status', "Buku '{$copy->book->title}' berhasil dipinjamkan. Batas pengembalian 7 hari ke depan.");
    }

    /**
     * Proses pengembalian buku cepat di meja sirkulasi.
     */
    public function quickReturnLoan(int $id): RedirectResponse
    {
        $loan = Loan::with('bookCopy.book')->findOrFail($id);
        $loan->update([
            'status' => 'returned',
            'returned_at' => now(),
        ]);

        if ($loan->bookCopy) {
            $loan->bookCopy->update(['status' => 'available']);
        }

        $bookTitle = $loan->bookCopy && $loan->bookCopy->book ? $loan->bookCopy->book->title : 'Buku';
        return back()->with('status', "Buku '$bookTitle' telah berhasil dikembalikan dan tersedia di rak.");
    }

    /**
     * Sinkronisasi status pinjaman yang telah melewati tanggal jatuh tempo.
     */
    public function syncOverdueLoans(): RedirectResponse
    {
        $updated = Loan::where('status', 'active')
            ->where('due_at', '<', now())
            ->update(['status' => 'overdue']);

        return back()->with('status', "Sinkronisasi berhasil. Sebanyak $updated peminjaman jatuh tempo telah diperbarui statusnya menjadi 'Terlambat'.");
    }

    /**
     * Ekspor Laporan Sirkulasi Perpustakaan (Excel/CSV) untuk evaluasi dan akreditasi sekolah.
     */
    public function exportCirculationReport(?Request $request = null)
    {
        $user = auth()->user();
        if (!$user || !in_array($user->role, ['librarian', 'admin', 'teacher'])) {
            abort(403);
        }

        $loans = Loan::with(['user', 'bookCopy.book'])->latest('borrowed_at')->get();
        $filename = 'Laporan-Sirkulasi-SMANSA-' . date('Y-m-d') . '.csv';

        $callback = function () use ($loans) {
            $handle = fopen('php://output', 'w');
            fprintf($handle, chr(0xEF).chr(0xBB).chr(0xBF));

            fputcsv($handle, [
                'No',
                'Kode Peminjaman',
                'Nama Anggota / Siswa',
                'NIS / NISN / NIP',
                'Kelas / Unit Kerja',
                'Nomor WhatsApp',
                'Judul Buku',
                'Barcode Eksemplar',
                'Tipe Pinjaman',
                'Tanggal Pinjam',
                'Batas Kembali',
                'Tanggal Dikembalikan',
                'Status Peminjaman',
            ]);

            $i = 1;
            foreach ($loans as $loan) {
                fputcsv($handle, [
                    $i++,
                    $loan->loan_code,
                    $loan->user ? $loan->user->name : 'Umum',
                    $loan->user ? ($loan->user->identifier_number ?: '-') : '-',
                    $loan->user ? ($loan->user->class_name ?: '-') : '-',
                    $loan->user ? ($loan->user->phone_number ?: '-') : '-',
                    $loan->bookCopy && $loan->bookCopy->book ? $loan->bookCopy->book->title : 'Buku',
                    $loan->bookCopy ? $loan->bookCopy->barcode_identifier : '-',
                    $loan->is_online_loan ? 'Online (E-Reader)' : 'Fisik (Sekolah)',
                    $loan->borrowed_at ? date('d/m/Y H:i', strtotime($loan->borrowed_at)) : '-',
                    $loan->due_at ? date('d/m/Y', strtotime($loan->due_at)) : '-',
                    $loan->returned_at ? date('d/m/Y H:i', strtotime($loan->returned_at)) : '-',
                    match ($loan->status) {
                        'active' => 'Aktif (Sedang Dipinjam)',
                        'returned' => 'Selesai (Sudah Kembali)',
                        'overdue' => 'Terlambat / Menunggak',
                        default => ucfirst($loan->status),
                    },
                ]);
            }

            fclose($handle);
        };

        return response()->stream($callback, 200, [
            'Content-Type' => 'text/csv; charset=UTF-8',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
            'Cache-Control' => 'no-store, no-cache',
        ]);
    }
}

