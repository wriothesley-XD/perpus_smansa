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
        ];

        return Inertia::render('Admin/Panel', [
            'stats'      => $stats,
            'books'      => $books,
            'magazines'  => $magazines,
            'events'     => $events,
            'activeLoans'=> $activeLoans,
            'categories' => $categories,
            'settings'   => $settings,
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
            'contact_phone'             => 'nullable|string|max:50',
        ]);

        foreach ($validated as $key => $value) {
            LibrarySetting::set($key, (string)$value);
        }

        return back()->with('status', 'Pengaturan perpustakaan berhasil diperbarui.');
    }
}
