<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Magazine extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'cover_image',
    ];

    public function editions(): HasMany
    {
        return $this->hasMany(MagazineEdition::class)->orderByDesc('publication_date');
    }

    public function latestEdition(): HasOne
    {
        return $this->hasOne(MagazineEdition::class)->latestOfMany('publication_date');
    }
}
