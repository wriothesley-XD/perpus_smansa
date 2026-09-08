<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('book_copies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
            $table->string('barcode_identifier', 50)->unique()->index();
            $table->string('status', 30)->default('available')->index(); // available, reserved, on_loan, maintenance, lost
            $table->string('condition_notes', 255)->nullable();
            $table->string('shelf_location', 50)->nullable();
            $table->date('acquired_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('book_copies');
    }
};
