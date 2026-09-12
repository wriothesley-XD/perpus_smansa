<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->enum('type', ['event', 'duta', 'podcast'])->default('event');
            $table->date('event_date')->nullable();
            $table->time('event_time')->nullable();
            $table->string('location')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('podcast_url')->nullable();
            $table->string('host_name')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
