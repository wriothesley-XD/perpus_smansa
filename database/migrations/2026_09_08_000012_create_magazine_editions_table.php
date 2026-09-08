<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('magazine_editions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('magazine_id')->constrained('magazines')->cascadeOnDelete();
            $table->string('edition_title', 200);
            $table->string('edition_number', 50);
            $table->unsignedSmallInteger('year');
            $table->date('publication_date');
            $table->string('cover_image', 255);
            $table->string('pdf_file_path', 255);
            $table->unsignedSmallInteger('page_count')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('magazine_editions');
    }
};
