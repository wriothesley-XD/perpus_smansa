<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ReservationController extends Controller
{
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'book_id' => ['required', 'exists:books,id'],
            'name' => ['required', 'string', 'max:150'],
            'nis' => ['required', 'string', 'max:50'],
            'class_name' => ['required', 'string', 'max:50'],
            'phone_number' => ['nullable', 'string', 'max:30'],
        ]);

        $book = Book::with('copies')->findOrFail($validated['book_id']);

        if (!$book->is_available) {
            return back()->withErrors([
                'reservation' => 'Saat ini seluruh eksemplar buku sedang dipinjam.',
            ]);
        }

        // Duplicate prevention: check for active/pending reservation for this NIS or user
        $existing = Reservation::where('book_id', $book->id)
            ->where('status', 'pending')
            ->where(function ($q) use ($validated, $request) {
                $q->where('guest_nis', $validated['nis']);
                if ($request->user()) {
                    $q->orWhere('user_id', $request->user()->id);
                }
            })
            ->first();

        if ($existing) {
            return back()->withErrors([
                'reservation' => 'Anda sudah memiliki reservasi aktif yang masih menunggu untuk buku ini.',
            ]);
        }

        $code = sprintf('RES-%s-%04d', date('Ym'), mt_rand(1000, 9999));

        Reservation::create([
            'reservation_code' => $code,
            'book_id' => $book->id,
            'user_id' => $request->user()?->id,
            'guest_name' => $validated['name'],
            'guest_nis' => $validated['nis'],
            'guest_class' => $validated['class_name'],
            'guest_phone' => $validated['phone_number'] ?? null,
            'status' => 'pending',
            'expires_at' => now()->addDays(2),
            'notes' => 'Reservasi diajukan melalui portal web perpustakaan.',
        ]);

        return back()->with('success', "Reservasi berhasil dikonfirmasi dengan kode: {$code}. Silakan ambil buku di perpustakaan dalam 2 hari kerja.");
    }
}
