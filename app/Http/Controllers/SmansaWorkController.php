<?php

namespace App\Http\Controllers;

use App\Models\SmansaWork;
use Inertia\Inertia;
use Inertia\Response;

class SmansaWorkController extends Controller
{
    public function index(): Response
    {
        $category   = request('category');
        $authorType = request('type');

        $works = SmansaWork::published()
            ->byCategory($category)
            ->byAuthorType($authorType)
            ->orderByDesc('published_at')
            ->orderByDesc('created_at')
            ->get();

        $categories = ['cerpen', 'puisi', 'esai', 'karya_ilmiah', 'novel'];

        return Inertia::render('SmansaWork/Index', [
            'works'      => $works,
            'categories' => $categories,
            'filters'    => ['category' => $category, 'type' => $authorType],
        ]);
    }

    public function show(string $slug): Response
    {
        $work = SmansaWork::published()->where('slug', $slug)->firstOrFail();

        $related = SmansaWork::published()
            ->where('slug', '!=', $slug)
            ->where('category', $work->category)
            ->limit(3)
            ->get();

        return Inertia::render('SmansaWork/Show', [
            'work'    => $work,
            'related' => $related,
        ]);
    }
}
