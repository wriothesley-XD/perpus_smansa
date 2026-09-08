<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title', 255)->index();
            $table->string('slug', 280)->unique();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->foreignId('publisher_id')->nullable()->constrained('publishers')->nullOnDelete();
            $table->foreignId('ddc_class_id')->nullable()->constrained('ddc_classes')->nullOnDelete();
            $table->unsignedSmallInteger('publication_year');
            $table->string('isbn', 30)->nullable()->index();
            $table->string('language', 50)->default('Indonesia');
            $table->text('synopsis');
            $table->string('shelf_location', 50)->default('Rak Utama');
            $table->string('cover_image', 255)->nullable();
            $table->unsignedInteger('popularity')->default(0)->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
