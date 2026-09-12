<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('smansa_works', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('author_name');
            $table->enum('author_type', ['student', 'teacher'])->default('student');
            $table->string('author_class')->nullable();
            $table->enum('category', ['cerpen', 'puisi', 'esai', 'karya_ilmiah', 'novel'])->default('cerpen');
            $table->longText('content');
            $table->string('cover_image')->nullable();
            $table->string('attachment_path')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('smansa_works');
    }
};
