<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Book extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'category_id',
        'publisher_id',
        'ddc_class_id',
        'publication_year',
        'isbn',
        'language',
        'synopsis',
        'shelf_location',
        'cover_image',
        'popularity',
    ];

    protected $casts = [
        'publication_year' => 'integer',
        'popularity' => 'integer',
    ];

    protected $appends = [
        'available_copies_count',
        'is_available',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function publisher(): BelongsTo
    {
        return $this->belongsTo(Publisher::class);
    }

    public function ddcClass(): BelongsTo
    {
        return $this->belongsTo(DdcClass::class);
    }

    public function authors(): BelongsToMany
    {
        return $this->belongsToMany(Author::class, 'book_authors');
    }

    public function copies(): HasMany
    {
        return $this->hasMany(BookCopy::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function getAvailableCopiesCountAttribute(): int
    {
        if ($this->relationLoaded('copies')) {
            return $this->copies->where('status', 'available')->count();
        }
        return $this->copies()->where('status', 'available')->count();
    }

    public function getIsAvailableAttribute(): bool
    {
        return $this->available_copies_count > 0;
    }

    public function scopeSearch(Builder $query, ?string $term): Builder
    {
        if (!$term) {
            return $query;
        }

        return $query->where(function (Builder $sub) use ($term) {
            $sub->where('title', 'like', "%{$term}%")
                ->orWhere('isbn', 'like', "%{$term}%")
                ->orWhereHas('authors', function (Builder $authorQuery) use ($term) {
                    $authorQuery->where('name', 'like', "%{$term}%");
                });
        });
    }

    public function scopeAvailable(Builder $query): Builder
    {
        return $query->whereHas('copies', function (Builder $copyQuery) {
            $copyQuery->where('status', 'available');
        });
    }

    public function scopePopular(Builder $query): Builder
    {
        return $query->orderByDesc('popularity');
    }

    public function scopeNewest(Builder $query): Builder
    {
        return $query->orderByDesc('publication_year')->orderByDesc('id');
    }
}
