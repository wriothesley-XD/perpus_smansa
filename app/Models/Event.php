<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'description', 'type',
        'event_date', 'event_time', 'location',
        'cover_image', 'podcast_url', 'host_name', 'is_published',
    ];

    protected $casts = [
        'event_date'   => 'date',
        'is_published' => 'boolean',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeByType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    public function getTypeLabelAttribute(): string
    {
        return match($this->type) {
            'event'   => 'Event',
            'duta'    => 'Duta Perpustakaan',
            'podcast' => 'Podcast',
            default   => 'Event',
        };
    }
}
