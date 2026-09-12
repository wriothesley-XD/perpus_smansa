<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Event;
use App\Models\Loan;
use App\Models\Reservation;
use App\Models\SmansaWork;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function panel(): Response
    {
        $user = auth()->user();
        if (!$user || !in_array($user->role, ['librarian', 'admin'])) {
            abort(403, 'Akses ditolak. Halaman ini hanya untuk pustakawan.');
        }

        $stats = [
            'totalBooks'          => Book::count(),
            'totalCopies'         => BookCopy::count(),
            'activeLoans'         => Loan::where('status', 'active')->count(),
            'pendingReservations' => Reservation::where('status', 'pending')->count(),
            'totalMembers'        => User::whereIn('role', ['student', 'teacher'])->count(),
            'totalEvents'         => Event::count(),
            'totalWorks'          => SmansaWork::count(),
        ];

        return Inertia::render('Admin/Panel', compact('stats'));
    }
}
