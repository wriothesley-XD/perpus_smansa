<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RankingController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $period = $request->string('period', 'all')->toString();
        $since = match ($period) {
            'week' => now()->subWeek(),
            'month' => now()->startOfMonth(),
            'semester' => now()->subMonths(6),
            default => null,
        };

        // Top 10 books by loan count (via book_copies -> loans)
        $topBooks = Book::with(['authors', 'category', 'copies'])
            ->withCount(['copies as loan_count' => function ($query) use ($since) {
                $query->join('loans', 'book_copies.id', '=', 'loans.book_copy_id');
                $query->when($since, fn ($loan) => $loan->where('loans.borrowed_at', '>=', $since));
            }])
            ->orderByDesc('loan_count')
            ->limit(10)
            ->get();

        // Top 10 active members by loan count
        $topMembers = User::withCount(['loans' => function ($query) use ($since) {
                $query->when($since, fn ($loan) => $loan->where('borrowed_at', '>=', $since));
            }])
            ->where('role', 'student')
            ->orderByDesc('loans_count')
            ->limit(10)
            ->get()
            ->map(fn($u) => [
                'id'          => $u->id,
                'initial_name'=> substr($u->name, 0, 1) . '***',
                'class'       => $u->class ?? '—',
                'loans_count' => $u->loans_count,
            ]);

        // Overall stats
        $totalLoans = Loan::count();

        return Inertia::render('Ranking/Index', [
            'topBooks'   => $topBooks,
            'topMembers' => $topMembers,
            'totalLoans' => $totalLoans,
            'period' => $period,
        ]);
    }
}
