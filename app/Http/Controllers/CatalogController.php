<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\DdcClass;
use App\Models\MagazineEdition;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CatalogController extends Controller
{
    public function index(Request $request): Response
    {
        $search = $request->input('q');
        $categorySlug = $request->input('category');
        $ddcCode = $request->input('ddc');
        $status = $request->input('status', 'all');
        $author = $request->input('author');
        $sort = $request->input('sort', 'popular');
        $curriculum = $request->input('curriculum');

        $query = Book::with(['category', 'authors', 'copies', 'ddcClass']);

        if ($search) {
            $query->search($search);
        }

        if ($categorySlug) {
            $query->whereHas('category', function (Builder $q) use ($categorySlug) {
                $q->where('slug', $categorySlug);
            });
        }

        if ($author) {
            $query->whereHas('authors', function (Builder $q) use ($author) {
                $q->where('name', $author);
            });
        }

        if ($curriculum === 'fase_e') {
            $query->where(function (Builder $q) {
                $q->where('title', 'like', '%kelas x%')
                  ->orWhere('title', 'like', '%kelas 10%')
                  ->orWhere('title', 'like', '%fase e%')
                  ->orWhere('synopsis', 'like', '%fase e%')
                  ->orWhere('synopsis', 'like', '%kelas x%');
            });
        } elseif ($curriculum === 'fase_f') {
            $query->where(function (Builder $q) {
                $q->where('title', 'like', '%kelas xi%')
                  ->orWhere('title', 'like', '%kelas xii%')
                  ->orWhere('title', 'like', '%kelas 11%')
                  ->orWhere('title', 'like', '%kelas 12%')
                  ->orWhere('title', 'like', '%fase f%')
                  ->orWhere('synopsis', 'like', '%fase f%');
            });
        } elseif ($curriculum === 'snbt_osn') {
            $query->where(function (Builder $q) {
                $q->where('title', 'like', '%snbt%')
                  ->orWhere('title', 'like', '%utbk%')
                  ->orWhere('title', 'like', '%olimpiade%')
                  ->orWhere('title', 'like', '%osn%')
                  ->orWhere('synopsis', 'like', '%snbt%')
                  ->orWhere('synopsis', 'like', '%utbk%')
                  ->orWhere('synopsis', 'like', '%olimpiade%');
            });
        } elseif ($curriculum === 'ebook') {
            $query->where(function (Builder $q) {
                $q->where('is_ebook', true)->orWhereNotNull('ebook_file_path');
            });
        } elseif ($curriculum === 'fiksi') {
            $query->whereHas('category', function (Builder $q) {
                $q->where('slug', 'fiksi')->orWhere('name', 'like', '%fiksi%')->orWhere('name', 'like', '%sastra%');
            });
        }

        if ($ddcCode) {
            $query->whereHas('ddcClass', function (Builder $q) use ($ddcCode) {
                $q->where('code', $ddcCode);
            });
        }

        if ($status === 'available') {
            $query->available();
        } elseif ($status === 'borrowed') {
            $query->whereDoesntHave('copies', function (Builder $q) {
                $q->where('status', 'available');
            });
        }

        match ($sort) {
            'newest' => $query->newest(),
            'title_asc' => $query->orderBy('title', 'asc'),
            'title_desc' => $query->orderBy('title', 'desc'),
            default => $query->popular(),
        };

        $books = $query->paginate(12)->withQueryString();
        $categories = Category::withCount('books')->orderBy('name')->get();
        $ddcClasses = DdcClass::orderBy('code')->get();
        $authors = Author::orderBy('name')->pluck('name');
        $latestMagazines = MagazineEdition::with('magazine')
            ->orderByDesc('publication_date')
            ->limit(4)
            ->get();

        return Inertia::render('Catalog/Index', [
            'books' => $books,
            'categories' => $categories,
            'ddcClasses' => $ddcClasses,
            'authors' => $authors,
            'latestMagazines' => $latestMagazines,
            'filters' => [
                'q' => $search ?? '',
                'category' => $categorySlug ?? '',
                'ddc' => $ddcCode ?? '',
                'status' => $status,
                'author' => $author ?? '',
                'sort' => $sort,
                'curriculum' => $curriculum,
            ],
        ]);
    }

    public function show(string $slug): Response
    {
        $book = Book::with(['category', 'publisher', 'ddcClass', 'authors', 'copies'])
            ->where('slug', $slug)
            ->orWhere('id', is_numeric($slug) ? $slug : 0)
            ->firstOrFail();

        $relatedBooks = Book::with(['category', 'authors', 'copies'])
            ->where('id', '!=', $book->id)
            ->where(function (Builder $q) use ($book) {
                $q->where('category_id', $book->category_id)
                    ->orWhere('ddc_class_id', $book->ddc_class_id);
            })
            ->limit(4)
            ->get();

        return Inertia::render('Catalog/Show', [
            'book' => $book,
            'relatedBooks' => $relatedBooks,
        ]);
    }
}
