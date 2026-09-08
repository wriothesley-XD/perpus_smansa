<?php

namespace App\Http\Controllers;

use App\Models\Magazine;
use App\Models\MagazineEdition;
use Inertia\Inertia;
use Inertia\Response;

class MagazineController extends Controller
{
    public function index(): Response
    {
        $magazines = Magazine::with(['editions' => function ($q) {
            $q->orderByDesc('publication_date');
        }])->get();

        $allEditions = MagazineEdition::with('magazine')
            ->orderByDesc('publication_date')
            ->paginate(9);

        return Inertia::render('Magazine/Index', [
            'magazines' => $magazines,
            'editions' => $allEditions,
        ]);
    }

    public function show(int $id): Response
    {
        $edition = MagazineEdition::with('magazine')->findOrFail($id);

        $otherEditions = MagazineEdition::where('magazine_id', $edition->magazine_id)
            ->where('id', '!=', $edition->id)
            ->orderByDesc('publication_date')
            ->limit(4)
            ->get();

        return Inertia::render('Magazine/Reader', [
            'edition' => $edition,
            'otherEditions' => $otherEditions,
        ]);
    }
}
