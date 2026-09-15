<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// Jadwal harian pemeriksaan buku jatuh tempo pukul 06.00 pagi
Schedule::command('loans:check-overdue')->dailyAt('06:00');
