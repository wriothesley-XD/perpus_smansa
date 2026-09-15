<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table) {
            if (!Schema::hasColumn('books', 'ebook_file_path')) {
                $table->string('ebook_file_path', 255)->nullable()->after('cover_image');
            }
            if (!Schema::hasColumn('books', 'is_ebook')) {
                $table->boolean('is_ebook')->default(false)->after('ebook_file_path');
            }
        });

        Schema::table('loans', function (Blueprint $table) {
            if (!Schema::hasColumn('loans', 'is_online_loan')) {
                $table->boolean('is_online_loan')->default(false)->after('status');
            }
        });

        Schema::table('magazines', function (Blueprint $table) {
            if (!Schema::hasColumn('magazines', 'type')) {
                $table->string('type', 30)->default('magazine')->after('title'); // 'magazine' or 'bulletin'
            }
        });

        if (!Schema::hasTable('reading_progress')) {
            Schema::create('reading_progress', function (Blueprint $table) {
                $table->id();
                $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
                $table->foreignId('book_id')->constrained('books')->cascadeOnDelete();
                $table->unsignedInteger('last_page')->default(1);
                $table->unsignedInteger('total_pages')->default(1);
                $table->json('bookmarks')->nullable();
                $table->json('notes')->nullable();
                $table->timestamps();

                $table->unique(['user_id', 'book_id']);
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reading_progress');

        Schema::table('magazines', function (Blueprint $table) {
            if (Schema::hasColumn('magazines', 'type')) {
                $table->dropColumn('type');
            }
        });

        Schema::table('loans', function (Blueprint $table) {
            if (Schema::hasColumn('loans', 'is_online_loan')) {
                $table->dropColumn('is_online_loan');
            }
        });

        Schema::table('books', function (Blueprint $table) {
            if (Schema::hasColumn('books', 'ebook_file_path')) {
                $table->dropColumn(['ebook_file_path', 'is_ebook']);
            }
        });
    }
};
