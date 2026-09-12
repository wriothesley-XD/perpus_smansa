<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class SmansaWork extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'slug', 'author_name', 'author_type', 'author_class',
        'category', 'content', 'cover_image', 'attachment_path',
        'is_published', 'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function scopePublished(Builder $query): Builder
    {
        return $query->where('is_published', true);
    }

    public function scopeByCategory(Builder $query, ?string $category): Builder
    {
        if (!$category) return $query;
        return $query->where('category', $category);
    }

    public function scopeByAuthorType(Builder $query, ?string $type): Builder
    {
        if (!$type) return $query;
        return $query->where('author_type', $type);
    }

    public function getCategoryLabelAttribute(): string
    {
        return match($this->category) {
            'cerpen'       => 'Cerpen',
            'puisi'        => 'Puisi',
            'esai'         => 'Esai',
            'karya_ilmiah' => 'Karya Ilmiah',
            'novel'        => 'Novel',
            default        => 'Karya',
        };
    }
}
