<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;
use Inertia\Response;

class TranslationController extends Controller
{
    private array $languages = [
        'en' => [
            'code'    => 'en',
            'name'    => 'English',
            'native'  => 'English',
            'flag'    => '🇬🇧',
            'tagline' => 'World of Literature in English',
            'quote'   => '"A reader lives a thousand lives before he dies."',
            'author'  => 'George R.R. Martin',
            'color'   => '#1d4ed8',
            'bg'      => '#dbeafe',
        ],
        'ja' => [
            'code'    => 'ja',
            'name'    => 'Japanese',
            'native'  => '日本語',
            'flag'    => '🇯🇵',
            'tagline' => 'Khazanah Sastra Bahasa Jepang',
            'quote'   => '"本を読む人は、何千もの人生を生きる。"',
            'author'  => 'Haruki Murakami',
            'color'   => '#dc2626',
            'bg'      => '#fee2e2',
        ],
        'de' => [
            'code'    => 'de',
            'name'    => 'German',
            'native'  => 'Deutsch',
            'flag'    => '🇩🇪',
            'tagline' => 'Koleksi Berbahasa Jerman',
            'quote'   => '"Lesen ist träumen mit offenen Augen."',
            'author'  => 'Heinrich Heine',
            'color'   => '#d97706',
            'bg'      => '#fef3c7',
        ],
    ];

    public function index(): Response
    {
        $stats = [];
        foreach ($this->languages as $code => $lang) {
            $stats[$code] = Book::where('language', $code)->count();
        }

        return Inertia::render('Translation/Index', [
            'languages' => array_values($this->languages),
            'bookCounts' => $stats,
        ]);
    }

    public function show(string $lang): Response
    {
        abort_unless(array_key_exists($lang, $this->languages), 404);

        $langData = $this->languages[$lang];
        $books = Book::with(['authors', 'category', 'copies'])
            ->where('language', $lang)
            ->limit(12)
            ->get();

        return Inertia::render('Translation/Show', [
            'language' => $langData,
            'books'    => $books,
        ]);
    }
}
