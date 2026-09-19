<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Book;
use App\Models\Reservation;
use App\Models\ReadingProgress;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $user = $request->user();

        // Get active loans, deduped: keep only the most-recent loan per book copy
        // to avoid showing multiple cards when user clicks a book multiple times
        $allActiveLoans = Loan::with(['bookCopy.book'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->orderBy('due_at')
            ->get();

        // Group by book_copy_id, keep latest per book
        $activeLoans = $allActiveLoans->groupBy('book_copy_id')
            ->map(fn ($group) => $group->sortByDesc('created_at')->first())
            ->values();

        $loanHistory = Loan::with(['bookCopy.book'])
            ->where('user_id', $user->id)
            ->where('status', '!=', 'active')
            ->orderByDesc('updated_at')
            ->limit(10)
            ->get();

        $reservations = Reservation::with('book')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        $readingProgresses = ReadingProgress::where('user_id', $user->id)
            ->get()
            ->keyBy('book_id');

        $completedReads = Loan::where('user_id', $user->id)->where('status', 'returned')->count();
        $passport = [
            'total_reads' => $completedReads,
            'active_reads' => $activeLoans->count(),
            'streak' => 0,
            'member_since' => optional($user->created_at)->format('Y'),
            'member_code' => $user->identifier_number ?: 'SMANSA-'.str_pad((string) $user->id, 5, '0', STR_PAD_LEFT),
        ];

        $recommendations = Book::with(['category', 'authors', 'copies'])
            ->popular()
            ->limit(3)
            ->get();

        return Inertia::render('Account/Dashboard', [
            'activeLoans' => $activeLoans,
            'loanHistory' => $loanHistory,
            'reservations' => $reservations,
            'passport' => $passport,
            'recommendations' => $recommendations,
            'readingProgresses' => $readingProgresses,
        ]);
    }
}
