<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\Event;
use App\Models\LibrarySetting;
use App\Models\MagazineEdition;
use App\Models\SmansaWork;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $stats = [
            'total_books' => Book::count(),
            'available_books' => Book::available()->count(),
            'total_authors' => Author::count(),
            'total_categories' => Category::count(),
        ];

        $popularBooks = Book::with(['category', 'authors', 'copies'])
            ->popular()
            ->limit(4)
            ->get();

        $latestMagazines = MagazineEdition::with('magazine')
            ->orderByDesc('publication_date')
            ->limit(3)
            ->get();

        $topReaders = User::withCount('loans')
            ->where('role', 'student')
            ->orderByDesc('loans_count')
            ->limit(3)
            ->get(['id', 'name', 'class']);

        $upcomingEvents = Event::published()
            ->whereIn('type', ['event', 'duta'])
            ->where(function ($query) {
                $query->whereNull('event_date')->orWhereDate('event_date', '>=', now());
            })
            ->latest('event_date')
            ->limit(2)
            ->get();

        $latestPodcasts = Event::published()->byType('podcast')->latest()->limit(2)->get();
        $featuredWorks = SmansaWork::published()->latest('published_at')->limit(2)->get();

        $settings = [
            'library_name' => LibrarySetting::get('library_name', 'Perpustakaan SMAN 1 Bukittinggi'),
            'library_tagline' => LibrarySetting::get('library_tagline', 'Find it. Read it. Grow with it.'),
            'operating_hours' => LibrarySetting::get('operating_hours', 'Senin - Jumat: 07.30 - 16.00 WIB'),
            'library_address' => LibrarySetting::get('library_address', 'Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi'),
            'contact_phone' => LibrarySetting::get('contact_phone', '(0752) 22543'),
        ];

        return Inertia::render('Home', [
            'stats' => $stats,
            'popularBooks' => $popularBooks,
            'latestMagazines' => $latestMagazines,
            'topReaders' => $topReaders,
            'upcomingEvents' => $upcomingEvents,
            'latestPodcasts' => $latestPodcasts,
            'featuredWorks' => $featuredWorks,
            'settings' => $settings,
        ]);
    }
}
