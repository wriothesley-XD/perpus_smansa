<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Inertia\Inertia;
use Inertia\Response;

class EventController extends Controller
{
    public function index(): Response
    {
        $events   = Event::published()->byType('event')->latest('event_date')->get();
        $dutas    = Event::published()->byType('duta')->latest()->get();
        $podcasts = Event::published()->byType('podcast')->latest()->get();

        return Inertia::render('Event/Index', [
            'events'   => $events,
            'dutas'    => $dutas,
            'podcasts' => $podcasts,
        ]);
    }

    public function show(string $slug): Response
    {
        $event = Event::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Event/Show', [
            'event' => $event,
        ]);
    }
}
