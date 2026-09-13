<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Book;
use App\Models\Category;
use App\Models\DdcClass;
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

        return Inertia::render('Catalog/Index', [
            'books' => $books,
            'categories' => $categories,
            'ddcClasses' => $ddcClasses,
            'authors' => $authors,
            'filters' => [
                'q' => $search ?? '',
                'category' => $categorySlug ?? '',
                'ddc' => $ddcCode ?? '',
                'status' => $status,
                'author' => $author ?? '',
                'sort' => $sort,
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
