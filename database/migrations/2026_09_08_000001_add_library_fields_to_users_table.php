<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 20)->default('student')->after('password');
            $table->string('identifier_number', 50)->nullable()->unique()->after('role');
            $table->string('class_name', 50)->nullable()->after('identifier_number');
            $table->string('phone_number', 30)->nullable()->after('class_name');
            $table->string('avatar', 255)->nullable()->after('phone_number');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'identifier_number', 'class_name', 'phone_number', 'avatar']);
        });
    }
};
