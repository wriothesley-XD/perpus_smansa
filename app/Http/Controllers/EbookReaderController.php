<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\LibrarySetting;
use App\Models\Loan;
use App\Models\ReadingProgress;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EbookReaderController extends Controller
{
    /**
     * Display the secure E-Reader interface.
     */
    public function read(string $slug): Response|RedirectResponse
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login')->with('status', 'Silakan masuk terlebih dahulu untuk membaca e-book.');
        }

        $book = Book::with(['category', 'authors'])->where('slug', $slug)->orWhere('id', is_numeric($slug) ? $slug : 0)->firstOrFail();

        // Check or fetch active online loan
        $activeLoan = Loan::where('user_id', $user->id)
            ->where('is_online_loan', true)
            ->whereHas('bookCopy', function ($q) use ($book) {
                $q->where('book_id', $book->id);
            })
            ->latest()
            ->first();

        $loanDurationDays = (int) LibrarySetting::get('online_loan_duration_days', 3);
        $isLocked = false;
        $remainingHours = 0;
        $dueAtFormatted = null;

        if (!$activeLoan) {
            // Not yet borrowed online - auto-borrow if under limit
            $maxOnlineLoans = (int) LibrarySetting::get('max_online_loans', 3);
            $currentOnlineLoansCount = Loan::where('user_id', $user->id)
                ->where('is_online_loan', true)
                ->where('status', 'active')
                ->where('due_at', '>', now())
                ->count();

            if ($currentOnlineLoansCount >= $maxOnlineLoans) {
                return redirect()->route('catalog.show', $book->slug)->with('error', "Anda telah mencapai batas maksimal peminjaman e-book aktif ($maxOnlineLoans buku).");
            }

            // Create online loan
            $copy = BookCopy::firstOrCreate(
                ['book_id' => $book->id, 'barcode_identifier' => 'EBOOK-' . $book->id],
                ['status' => 'available', 'condition_notes' => 'Salinan Digital E-Book']
            );

            $dueAt = now()->addDays($loanDurationDays);
            $activeLoan = Loan::create([
                'loan_code' => 'EB-' . strtoupper(substr(uniqid(), -8)),
                'user_id' => $user->id,
                'book_copy_id' => $copy->id,
                'borrowed_at' => now(),
                'due_at' => $dueAt,
                'status' => 'active',
                'is_online_loan' => true,
                'notes' => 'Peminjaman digital e-reader',
            ]);

            $remainingHours = $loanDurationDays * 24;
            $dueAtFormatted = $dueAt->translatedFormat('d F Y, H:i');
        } else {
            $now = Carbon::now();
            $dueDate = Carbon::parse($activeLoan->due_at);

            if ($now->greaterThan($dueDate) || $activeLoan->status !== 'active') {
                $isLocked = true;
                $activeLoan->update(['status' => 'overdue']);
            } else {
                $remainingHours = $now->diffInHours($dueDate, false);
                $dueAtFormatted = $dueDate->translatedFormat('d F Y, H:i');
            }
        }

        // Fetch or create reading progress
        $progress = ReadingProgress::firstOrCreate(
            ['user_id' => $user->id, 'book_id' => $book->id],
            ['last_page' => 1, 'total_pages' => 30, 'bookmarks' => []]
        );

        return Inertia::render('Catalog/EbookReader', [
            'book' => $book,
            'loan' => [
                'id' => $activeLoan->id,
                'loan_code' => $activeLoan->loan_code,
                'borrowed_at' => $activeLoan->borrowed_at,
                'due_at' => $dueAtFormatted,
                'is_locked' => $isLocked,
                'remaining_hours' => max(0, $remainingHours),
                'loan_duration_days' => $loanDurationDays,
            ],
            'progress' => [
                'last_page' => $progress->last_page ?? 1,
                'total_pages' => $progress->total_pages ?? 30,
                'bookmarks' => $progress->bookmarks ?? [],
                'notes' => $progress->notes ?? [],
            ],
            'readerInfo' => [
                'name' => $user->name,
                'identifier' => $user->identifier_number ?? 'Anggota SMANSA',
                'class' => $user->class_name ?? 'SMAN 1 Bukittinggi',
            ],
        ]);
    }

    /**
     * Renew / borrow online again after expiration.
     */
    public function renewOnlineLoan(int $bookId): RedirectResponse
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('login');
        }

        $book = Book::findOrFail($bookId);
        $loanDurationDays = (int) LibrarySetting::get('online_loan_duration_days', 3);

        $copy = BookCopy::firstOrCreate(
            ['book_id' => $book->id, 'barcode_identifier' => 'EBOOK-' . $book->id],
            ['status' => 'available', 'condition_notes' => 'Salinan Digital E-Book']
        );

        Loan::create([
            'loan_code' => 'EB-' . strtoupper(substr(uniqid(), -8)),
            'user_id' => $user->id,
            'book_copy_id' => $copy->id,
            'borrowed_at' => now(),
            'due_at' => now()->addDays($loanDurationDays),
            'status' => 'active',
            'is_online_loan' => true,
            'notes' => 'Perpanjangan peminjaman digital',
        ]);

        return redirect()->route('books.read', $book->slug)->with('status', "Peminjaman e-book berhasil diperpanjang selama $loanDurationDays hari.");
    }

    /**
     * Save reading progress & bookmarks asynchronously.
     */
    public function saveProgress(Request $request, int $bookId): JsonResponse
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthenticated'], 401);
        }

        $request->validate([
            'last_page' => 'required|integer|min:1',
            'total_pages' => 'nullable|integer|min:1',
            'bookmarks' => 'nullable|array',
            'notes' => 'nullable|array',
        ]);

        $progress = ReadingProgress::updateOrCreate(
            ['user_id' => $user->id, 'book_id' => $bookId],
            [
                'last_page' => $request->last_page,
                'total_pages' => $request->total_pages ?? 30,
                'bookmarks' => $request->bookmarks ?? [],
                'notes' => $request->notes ?? [],
            ]
        );

        return response()->json([
            'success' => true,
            'last_page' => $progress->last_page,
            'bookmarks' => $progress->bookmarks,
        ]);
    }

    /**
     * Securely stream the PDF document with authorization and anti-download headers.
     */
    public function streamPdf(Request $request, string $slug)
    {
        $user = auth()->user();
        if (!$user) {
            abort(401, 'Silakan masuk terlebih dahulu untuk mengakses e-book.');
        }

        $book = Book::where('slug', $slug)->orWhere('id', is_numeric($slug) ? $slug : 0)->firstOrFail();

        $isStaff = in_array($user->role, ['admin', 'librarian', 'teacher']);

        $activeLoan = Loan::where('user_id', $user->id)
            ->where('is_online_loan', true)
            ->where('status', 'active')
            ->where('due_at', '>', now())
            ->whereHas('bookCopy', function ($q) use ($book) {
                $q->where('book_id', $book->id);
            })
            ->first();

        if (!$activeLoan && !$isStaff) {
            abort(403, 'Akses e-book terkunci. Masa peminjaman online Anda telah habis atau belum meminjam buku ini.');
        }

        $rawPath = $book->ebook_file_path;
        $resolvedPath = null;

        if ($rawPath) {
            if (str_starts_with($rawPath, '/storage/')) {
                $relative = substr($rawPath, strlen('/storage/'));
                $resolvedPath = storage_path('app/public/' . $relative);
            } elseif (file_exists(public_path(ltrim($rawPath, '/')))) {
                $resolvedPath = public_path(ltrim($rawPath, '/'));
            } elseif (file_exists(storage_path('app/' . ltrim($rawPath, '/')))) {
                $resolvedPath = storage_path('app/' . ltrim($rawPath, '/'));
            }
        }

        if (!$resolvedPath || !file_exists($resolvedPath)) {
            // Check for sample magazine/bulletin PDF
            $sample = public_path('storage/magazines/genta-sample.pdf');
            if (file_exists($sample)) {
                $resolvedPath = $sample;
            }
        }

        if (!$resolvedPath || !file_exists($resolvedPath)) {
            abort(404, 'Berkas e-book sedang dipersiapkan oleh pihak perpustakaan sekolah.');
        }

        return response()->file($resolvedPath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="smansa-reader.pdf"',
            'Cache-Control' => 'private, no-cache, no-store, must-revalidate, max-age=0',
            'Pragma' => 'no-cache',
            'Expires' => '0',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
