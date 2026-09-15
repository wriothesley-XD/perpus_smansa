<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ReadingProgress extends Model
{
    protected $table = 'reading_progress';

    protected $fillable = [
        'user_id',
        'book_id',
        'last_page',
        'total_pages',
        'bookmarks',
        'notes',
    ];

    protected $casts = [
        'bookmarks' => 'array',
        'notes' => 'array',
        'last_page' => 'integer',
        'total_pages' => 'integer',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
