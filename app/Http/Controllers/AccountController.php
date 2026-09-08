<?php

namespace App\Http\Controllers;

use App\Models\Loan;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    public function dashboard(Request $request): Response
    {
        $user = $request->user();

        $activeLoans = Loan::with(['bookCopy.book'])
            ->where('user_id', $user->id)
            ->where('status', 'active')
            ->orderBy('due_at')
            ->get();

        $loanHistory = Loan::with(['bookCopy.book'])
            ->where('user_id', $user->id)
            ->where('status', '!=', 'active')
            ->orderByDesc('returned_at')
            ->limit(10)
            ->get();

        $reservations = Reservation::with('book')
            ->where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->limit(10)
            ->get();

        return Inertia::render('Account/Dashboard', [
            'activeLoans' => $activeLoans,
            'loanHistory' => $loanHistory,
            'reservations' => $reservations,
        ]);
    }
}
