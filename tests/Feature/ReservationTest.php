<?php

namespace Tests\Feature;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Category;
use App\Models\Reservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    public function test_guest_can_submit_reservation_with_nis(): void
    {
        $category = Category::create(['name' => 'Fiksi', 'slug' => 'fiksi']);
        $book = Book::create([
            'title' => 'Bumi',
            'slug' => 'bumi',
            'category_id' => $category->id,
            'publication_year' => 2014,
            'synopsis' => 'Petualangan klan bulan.',
            'shelf_location' => 'Rak F-01',
        ]);

        BookCopy::create([
            'book_id' => $book->id,
            'barcode_identifier' => 'SMANSA-BUMI-001-C1',
            'status' => 'available',
        ]);

        $response = $this->post('/reservations', [
            'book_id' => $book->id,
            'name' => 'Siti Rahma',
            'nis' => '23201',
            'class_name' => 'X-1',
            'phone_number' => '081234567890',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('reservations', [
            'book_id' => $book->id,
            'guest_name' => 'Siti Rahma',
            'guest_nis' => '23201',
            'status' => 'pending',
        ]);
    }

    public function test_cannot_make_duplicate_pending_reservation(): void
    {
        $category = Category::create(['name' => 'Fiksi', 'slug' => 'fiksi']);
        $book = Book::create([
            'title' => 'Bumi',
            'slug' => 'bumi',
            'category_id' => $category->id,
            'publication_year' => 2014,
            'synopsis' => 'Petualangan klan bulan.',
            'shelf_location' => 'Rak F-01',
        ]);

        BookCopy::create([
            'book_id' => $book->id,
            'barcode_identifier' => 'SMANSA-BUMI-001-C1',
            'status' => 'available',
        ]);

        Reservation::create([
            'reservation_code' => 'RES-202609-0001',
            'book_id' => $book->id,
            'guest_name' => 'Siti Rahma',
            'guest_nis' => '23201',
            'guest_class' => 'X-1',
            'status' => 'pending',
        ]);

        $response = $this->post('/reservations', [
            'book_id' => $book->id,
            'name' => 'Siti Rahma',
            'nis' => '23201',
            'class_name' => 'X-1',
        ]);

        $response->assertSessionHasErrors('reservation');
    }
}
