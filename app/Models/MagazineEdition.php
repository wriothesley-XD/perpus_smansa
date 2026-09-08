<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MagazineEdition extends Model
{
    use HasFactory;

    protected $fillable = [
        'magazine_id',
        'edition_title',
        'edition_number',
        'year',
        'publication_date',
        'cover_image',
        'pdf_file_path',
        'page_count',
        'description',
    ];

    protected $casts = [
        'year' => 'integer',
        'page_count' => 'integer',
        'publication_date' => 'date',
    ];

    public function magazine(): BelongsTo
    {
        return $this->belongsTo(Magazine::class);
    }
}
