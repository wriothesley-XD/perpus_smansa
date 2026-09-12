<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Loan;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class RankingController extends Controller
{
    public function __invoke(): Response
    {
        // Top 10 books by loan count (via book_copies -> loans)
        $topBooks = Book::with(['authors', 'category', 'copies'])
            ->withCount(['copies as loan_count' => function ($query) {
                $query->join('loans', 'book_copies.id', '=', 'loans.book_copy_id');
            }])
            ->orderByDesc('loan_count')
            ->limit(10)
            ->get();

        // Top 10 active members by loan count
        $topMembers = User::withCount('loans')
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
        ]);
    }
}
