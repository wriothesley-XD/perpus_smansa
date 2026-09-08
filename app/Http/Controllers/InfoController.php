<?php

namespace App\Http\Controllers;

use App\Models\LibrarySetting;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class InfoController extends Controller
{
    public function about(): Response
    {
        $librarians = User::whereIn('role', ['librarian', 'admin'])
            ->select('id', 'name', 'role', 'identifier_number', 'avatar')
            ->get();

        $settings = [
            'library_name' => LibrarySetting::get('library_name', 'Perpustakaan SMAN 1 Bukittinggi'),
            'library_address' => LibrarySetting::get('library_address', 'Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi'),
            'operating_hours' => LibrarySetting::get('operating_hours', 'Senin - Jumat: 07.30 - 16.00 WIB'),
            'contact_email' => LibrarySetting::get('contact_email', 'perpustakaan@sman1bukittinggi.sch.id'),
            'contact_phone' => LibrarySetting::get('contact_phone', '(0752) 22543'),
        ];

        return Inertia::render('About/Information', [
            'librarians' => $librarians,
            'settings' => $settings,
        ]);
    }

    public function contact(): Response
    {
        $settings = [
            'library_name' => LibrarySetting::get('library_name', 'Perpustakaan SMAN 1 Bukittinggi'),
            'library_address' => LibrarySetting::get('library_address', 'Jl. Syekh M. Jamil Jambek No. 36, Pakan Kurai, Kec. Guguk Panjang, Kota Bukittinggi, Sumatera Barat 26136'),
            'operating_hours' => LibrarySetting::get('operating_hours', 'Senin - Jumat: 07.30 - 16.00 WIB'),
            'contact_email' => LibrarySetting::get('contact_email', 'perpustakaan@sman1bukittinggi.sch.id'),
            'contact_phone' => LibrarySetting::get('contact_phone', '(0752) 22543'),
            'instagram' => LibrarySetting::get('instagram', '@perpus_smansabkt'),
        ];

        return Inertia::render('Contact', [
            'settings' => $settings,
        ]);
    }
}