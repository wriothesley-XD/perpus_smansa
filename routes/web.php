<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\EbookReaderController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\InfoController;
use App\Http\Controllers\MagazineController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RankingController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\SmansaWorkController;
use App\Http\Controllers\TranslationController;
use Illuminate\Support\Facades\Route;

// Public Digital Library Portal
Route::get('/', HomeController::class)->name('home');
Route::get('/catalog', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/books/{slug}', [CatalogController::class, 'show'])->name('catalog.show');
Route::get('/books/{slug}/read', [EbookReaderController::class, 'read'])->name('books.read');
Route::post('/books/{id}/renew-online', [EbookReaderController::class, 'renewOnlineLoan'])->name('books.renew_online');
Route::post('/books/{id}/save-progress', [EbookReaderController::class, 'saveProgress'])->name('books.save_progress');
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('/magazines', [MagazineController::class, 'index'])->name('magazines.index');
Route::get('/magazines/{id}', [MagazineController::class, 'show'])->name('magazines.show');
Route::get('/information', [InfoController::class, 'about'])->name('information');
Route::get('/contact', [InfoController::class, 'contact'])->name('contact');

// New Features
Route::get('/ranking', RankingController::class)->name('ranking');
Route::get('/events', [EventController::class, 'index'])->name('events.index');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');
Route::get('/translations', [TranslationController::class, 'index'])->name('translations.index');
Route::get('/translations/{lang}', [TranslationController::class, 'show'])->name('translations.show');
Route::get('/karya-smansa', [SmansaWorkController::class, 'index'])->name('smansa-works.index');
Route::get('/karya-smansa/{slug}', [SmansaWorkController::class, 'show'])->name('smansa-works.show');

// Admin Panel (librarian / admin only)
Route::get('/admin-panel', [AdminController::class, 'panel'])->name('admin.panel')->middleware(['auth']);

// Authenticated Member Area
Route::middleware(['auth'])->group(function () {
    Route::post('/admin-panel/books', [AdminController::class, 'storeBook'])->name('admin.books.store');
    Route::delete('/admin-panel/books/{id}', [AdminController::class, 'deleteBook'])->name('admin.books.destroy');
    Route::post('/admin-panel/magazines', [AdminController::class, 'storeMagazineEdition'])->name('admin.magazines.store');
    Route::delete('/admin-panel/magazines/{id}', [AdminController::class, 'deleteMagazineEdition'])->name('admin.magazines.destroy');
    Route::post('/admin-panel/events', [AdminController::class, 'storeEvent'])->name('admin.events.store');
    Route::delete('/admin-panel/events/{id}', [AdminController::class, 'deleteEvent'])->name('admin.events.destroy');
    Route::post('/admin-panel/settings', [AdminController::class, 'updateSettings'])->name('admin.settings.update');

    Route::get('/dashboard', [AccountController::class, 'dashboard'])->name('dashboard');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
