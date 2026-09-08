<?php

namespace Tests\Feature;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Category;
use App\Models\DdcClass;
use App\Models\Publisher;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CatalogTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        $category = Category::create([
            'name' => 'Fiksi & Sastra',
            'slug' => 'fiksi-sastra',
        ]);

        $publisher = Publisher::create([
            'name' => 'Bentang Pustaka',
            'slug' => 'bentang-pustaka',
        ]);

        $ddc = DdcClass::create([
            'code' => '800',
            'name' => 'Kesusastraan',
        ]);

        $author = Author::create([
            'name' => 'Andrea Hirata',
            'slug' => 'andrea-hirata',
        ]);

        $book = Book::create([
            'title' => 'Laskar Pelangi',
            'slug' => 'laskar-pelangi',
            'category_id' => $category->id,
            'publisher_id' => $publisher->id,
            'ddc_class_id' => $ddc->id,
            'publication_year' => 2005,
            'isbn' => '978-979-3062-79-2',
            'language' => 'Indonesia',
            'synopsis' => 'Kisah inspiratif anak Belitung.',
            'shelf_location' => 'Rak F-12',
            'popularity' => 95,
        ]);

        $book->authors()->attach($author->id);

        BookCopy::create([
            'book_id' => $book->id,
            'barcode_identifier' => 'SMANSA-LASK-001-C1',
            'status' => 'available',
            'shelf_location' => 'Rak F-12',
        ]);
    }

    public function test_catalog_index_returns_successful_response(): void
    {
        $response = $this->get('/catalog');
        $response->assertStatus(200);
    }

    public function test_catalog_can_search_books_by_title(): void
    {
        $response = $this->get('/catalog?q=Laskar');
        $response->assertStatus(200);
        $response->assertSee('Laskar Pelangi');
    }

    public function test_can_view_book_detail_by_slug(): void
    {
        $response = $this->get('/books/laskar-pelangi');
        $response->assertStatus(200);
        $response->assertSee('Laskar Pelangi');
        $response->assertSee('Andrea Hirata');
        $response->assertSee('Rak F-12');
    }

    public function test_can_view_magazines_page(): void
    {
        $response = $this->get('/magazines');
        $response->assertStatus(200);
    }

    public function test_can_view_information_page(): void
    {
        $response = $this->get('/information');
        $response->assertStatus(200);
    }

    public function test_can_view_contact_page(): void
    {
        $response = $this->get('/contact');
        $response->assertStatus(200);
    }
}
