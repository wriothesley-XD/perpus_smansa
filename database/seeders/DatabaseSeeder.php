<?php

namespace Database\Seeders;

use App\Models\Author;
use App\Models\Book;
use App\Models\BookCopy;
use App\Models\Category;
use App\Models\DdcClass;
use App\Models\LibrarySetting;
use App\Models\Magazine;
use App\Models\MagazineEdition;
use App\Models\Publisher;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Core Users
        $admin = User::firstOrCreate(
            ['email' => 'admin@smansa.sch.id'],
            [
                'name' => 'Administrator Perpustakaan',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'identifier_number' => 'ADM-001',
                'phone_number' => '081234567890',
            ]
        );

        $librarian = User::firstOrCreate(
            ['email' => 'pustakawan@smansa.sch.id'],
            [
                'name' => 'Dra. Hj. Elvi Rahmi',
                'password' => Hash::make('password'),
                'role' => 'librarian',
                'identifier_number' => 'NIP. 197004121995122001',
                'phone_number' => '081298765432',
            ]
        );

        $student = User::firstOrCreate(
            ['email' => 'siswa@smansa.sch.id'],
            [
                'name' => 'Ahmad Fauzan',
                'password' => Hash::make('password'),
                'role' => 'student',
                'identifier_number' => 'NIS. 23101',
                'class_name' => 'XI MIPA 1',
                'phone_number' => '085274123456',
            ]
        );

        // 2. Library Settings
        $settings = [
            'library_name' => 'Perpustakaan SMAN 1 Bukittinggi',
            'library_tagline' => 'Find it. Read it. Grow with it.',
            'library_address' => 'Jl. Syekh M. Jamil Jambek No. 36, Pakan Kurai, Kec. Guguk Panjang, Kota Bukittinggi, Sumatera Barat 26136',
            'operating_hours' => 'Senin - Jumat: 07.30 - 16.00 WIB',
            'contact_email' => 'perpustakaan@sman1bukittinggi.sch.id',
            'contact_phone' => '(0752) 22543',
            'instagram' => '@perpus_smansabkt',
            'borrowing_days_limit' => '7',
            'max_books_borrow' => '3',
        ];

        foreach ($settings as $key => $val) {
            LibrarySetting::updateOrCreate(['key' => $key], ['value' => $val, 'group' => 'general']);
        }

        // 3. DDC Classes
        $ddcs = [
            ['code' => '000', 'name' => 'Karya Umum & Komputer'],
            ['code' => '100', 'name' => 'Filsafat & Psikologi'],
            ['code' => '200', 'name' => 'Agama & Spiritualitas'],
            ['code' => '300', 'name' => 'Ilmu Sosial & Pendidikan'],
            ['code' => '400', 'name' => 'Bahasa & Linguistik'],
            ['code' => '500', 'name' => 'Sains Murni & Matematika'],
            ['code' => '600', 'name' => 'Teknologi & Ilmu Terapan'],
            ['code' => '700', 'name' => 'Kesenian & Rekreasi'],
            ['code' => '800', 'name' => 'Kesusastraan & Fiksi'],
            ['code' => '900', 'name' => 'Sejarah & Geografi'],
        ];

        $ddcMap = [];
        foreach ($ddcs as $item) {
            $ddcMap[$item['code']] = DdcClass::firstOrCreate(['code' => $item['code']], $item);
        }

        // 4. Categories
        $categories = [
            ['name' => 'Fiksi & Sastra', 'slug' => 'fiksi-sastra', 'description' => 'Koleksi novel, cerpen, antologi, dan mahakarya sastra klasik hingga kontemporer.', 'icon' => 'BookOpen'],
            ['name' => 'Sains & Teknologi', 'slug' => 'sains-teknologi', 'description' => 'Eksplorasi fisika, biologi, kimia, robotika, dan komputasi masa depan.', 'icon' => 'Atom'],
            ['name' => 'Sejarah & Sosial', 'slug' => 'sejarah-sosial', 'description' => 'Dokumentasi perjalanan peradaban Minangkabau, Indonesia, dan dunia.', 'icon' => 'Landmark'],
            ['name' => 'Pengembangan Diri', 'slug' => 'pengembangan-diri', 'description' => 'Buku psikologi terapan, manajemen waktu, kebiasaan efektif, dan kepemimpinan.', 'icon' => 'Sparkles'],
            ['name' => 'Buku Pelajaran SMA', 'slug' => 'buku-pelajaran', 'description' => 'Buku teks utama Kurikulum Merdeka untuk jenjang kelas X, XI, dan XII.', 'icon' => 'GraduationCap'],
        ];

        $catMap = [];
        foreach ($categories as $item) {
            $catMap[$item['slug']] = Category::firstOrCreate(['slug' => $item['slug']], $item);
        }

        // 5. Publishers
        $publishers = [
            ['name' => 'Bentang Pustaka', 'slug' => 'bentang-pustaka', 'city' => 'Yogyakarta'],
            ['name' => 'Gramedia Pustaka Utama', 'slug' => 'gramedia-pustaka-utama', 'city' => 'Jakarta'],
            ['name' => 'Balai Pustaka', 'slug' => 'balai-pustaka', 'city' => 'Jakarta'],
            ['name' => 'Penerbit Erlangga', 'slug' => 'penerbit-erlangga', 'city' => 'Jakarta'],
            ['name' => 'Republika Penerbit', 'slug' => 'republika-penerbit', 'city' => 'Jakarta'],
        ];

        $pubMap = [];
        foreach ($publishers as $item) {
            $pubMap[$item['slug']] = Publisher::firstOrCreate(['slug' => $item['slug']], $item);
        }

        // 6. Authors
        $authors = [
            ['name' => 'Andrea Hirata', 'slug' => 'andrea-hirata', 'bio' => 'Novelis Indonesia penerima penghargaan internasional, penulis tetralogi Laskar Pelangi.'],
            ['name' => 'Buya Hamka', 'slug' => 'buya-hamka', 'bio' => 'Ulama, sastrawan, dan pahlawan nasional asal Sumatera Barat pengarang Tenggelamnya Kapal Van der Wijck.'],
            ['name' => 'Pramoedya Ananta Toer', 'slug' => 'pramoedya-ananta-toer', 'bio' => 'Salah satu sastrawan terbesar Indonesia, pengarang Tetralogi Buru.'],
            ['name' => 'Ahmad Fuadi', 'slug' => 'ahmad-fuadi', 'bio' => 'Novelis asal Bayur, Maninjau, Sumatera Barat, penulis trilogi Negeri 5 Menara.'],
            ['name' => 'Tere Liye', 'slug' => 'tere-liye', 'bio' => 'Penulis produktif karya fiksi fantasi dan serial petualangan dunia paralel.'],
            ['name' => 'James Clear', 'slug' => 'james-clear', 'bio' => 'Penulis dan pemikir global di bidang pembentukan kebiasaan dan perbaikan berkelanjutan.'],
            ['name' => 'Kemendikbudristek', 'slug' => 'kemendikbudristek', 'bio' => 'Pusat Perbukuan Badan Standar, Kurikulum, dan Asesmen Pendidikan.'],
        ];

        $authorMap = [];
        foreach ($authors as $item) {
            $authorMap[$item['slug']] = Author::firstOrCreate(['slug' => $item['slug']], $item);
        }

        // 7. Books Dataset
        $booksData = [
            [
                'title' => 'Laskar Pelangi',
                'category' => 'fiksi-sastra',
                'publisher' => 'bentang-pustaka',
                'ddc' => '800',
                'authors' => ['andrea-hirata'],
                'year' => 2005,
                'isbn' => '978-979-3062-79-2',
                'shelf' => 'Rak F-12',
                'popularity' => 98,
                'cover_image' => 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Kisah perjuangan sepuluh anak di Gantong, Pulau Belitong, dalam menempuh pendidikan dengan keterbatasan fasilitas di bawah bimbingan guru yang penuh dedikasi.',
                'copies_count' => 4,
                'available_count' => 3,
            ],
            [
                'title' => 'Tenggelamnya Kapal Van der Wijck',
                'category' => 'fiksi-sastra',
                'publisher' => 'balai-pustaka',
                'ddc' => '800',
                'authors' => ['buya-hamka'],
                'year' => 1938,
                'isbn' => '978-979-407-123-4',
                'shelf' => 'Rak F-04',
                'popularity' => 95,
                'cover_image' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Mahakarya Buya Hamka yang mengisahkan cinta sejati antara Zainuddin dan Hayati yang terhalang oleh adat istiadat dan strata sosial di tanah Minangkabau.',
                'copies_count' => 3,
                'available_count' => 2,
            ],
            [
                'title' => 'Bumi Manusia',
                'category' => 'fiksi-sastra',
                'publisher' => 'gramedia-pustaka-utama',
                'ddc' => '800',
                'authors' => ['pramoedya-ananta-toer'],
                'year' => 1980,
                'isbn' => '978-979-97312-3-4',
                'shelf' => 'Rak F-08',
                'popularity' => 92,
                'cover_image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Buku pertama dari Tetralogi Buru. Menampilkan perjuangan Minke, seorang pribumi cerdas di era Hindia Belanda yang memperjuangkan martabat bangsanya.',
                'copies_count' => 3,
                'available_count' => 1,
            ],
            [
                'title' => 'Negeri 5 Menara',
                'category' => 'fiksi-sastra',
                'publisher' => 'gramedia-pustaka-utama',
                'ddc' => '800',
                'authors' => ['ahmad-fuadi'],
                'year' => 2009,
                'isbn' => '978-979-22-4861-6',
                'shelf' => 'Rak F-15',
                'popularity' => 88,
                'cover_image' => 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Enam santri dari berbagai pelosok Nusantara yang disatukan di Pondok Madani dengan mantra penggerak impian hidup: Man Jadda Wajada.',
                'copies_count' => 3,
                'available_count' => 2,
            ],
            [
                'title' => 'Atomic Habits',
                'category' => 'pengembangan-diri',
                'publisher' => 'gramedia-pustaka-utama',
                'ddc' => '100',
                'authors' => ['james-clear'],
                'year' => 2018,
                'isbn' => '978-602-06-3317-6',
                'shelf' => 'Rak P-02',
                'popularity' => 99,
                'cover_image' => 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Panduan praktis teruji untuk membentuk kebiasaan baik, memutus kebiasaan buruk, dan menguasai perilaku kecil yang menghasilkan lonjakan prestasi.',
                'copies_count' => 4,
                'available_count' => 3,
            ],
            [
                'title' => 'Bumi',
                'category' => 'fiksi-sastra',
                'publisher' => 'gramedia-pustaka-utama',
                'ddc' => '800',
                'authors' => ['tere-liye'],
                'year' => 2014,
                'isbn' => '978-602-03-0112-9',
                'shelf' => 'Rak F-19',
                'popularity' => 86,
                'cover_image' => 'https://images.unsplash.com/photo-1532012164546-f432f2e37b29?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Awal mula perjalanan luar biasa Raib, Seli, dan Ali menembus klan Bulan serta mengungkap rahasia peradaban paralel yang tersembunyi di alam semesta.',
                'copies_count' => 3,
                'available_count' => 2,
            ],
            [
                'title' => 'Fisika untuk SMA/MA Kelas XI (Kurikulum Merdeka)',
                'category' => 'buku-pelajaran',
                'publisher' => 'penerbit-erlangga',
                'ddc' => '500',
                'authors' => ['kemendikbudristek'],
                'year' => 2023,
                'isbn' => '978-623-180-201-9',
                'shelf' => 'Rak S-03',
                'popularity' => 82,
                'cover_image' => 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Materi ajar fisika komprehensif berlandaskan saintifik, dilengkapi eksperimen laboratorium, fenomena mekanika, termodinamika, dan gelombang elektromagnetik.',
                'copies_count' => 5,
                'available_count' => 4,
            ],
            [
                'title' => 'Sejarah Minangkabau: Jejak Adat & Keislaman',
                'category' => 'sejarah-sosial',
                'publisher' => 'balai-pustaka',
                'ddc' => '900',
                'authors' => ['buya-hamka'],
                'year' => 1974,
                'isbn' => '978-979-407-331-3',
                'shelf' => 'Rak M-01',
                'popularity' => 90,
                'cover_image' => 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?auto=format&fit=crop&w=700&q=80',
                'synopsis' => 'Analisis mendalam mengenai falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah serta dinamika sosial nagari di dataran tinggi Minangkabau.',
                'copies_count' => 3,
                'available_count' => 2,
            ],
        ];

        foreach ($booksData as $idx => $b) {
            $slug = Str::slug($b['title']);
            $book = Book::updateOrCreate(
                ['slug' => $slug],
                [
                    'title' => $b['title'],
                    'category_id' => $catMap[$b['category']]->id,
                    'publisher_id' => $pubMap[$b['publisher']]->id,
                    'ddc_class_id' => $ddcMap[$b['ddc']]->id,
                    'publication_year' => $b['year'],
                    'isbn' => $b['isbn'],
                    'language' => 'Indonesia',
                    'synopsis' => $b['synopsis'],
                    'shelf_location' => $b['shelf'],
                    'cover_image' => $b['cover_image'],
                    'popularity' => $b['popularity'],
                ]
            );

            // Link authors
            $authorIds = [];
            foreach ($b['authors'] as $authSlug) {
                if (isset($authorMap[$authSlug])) {
                    $authorIds[] = $authorMap[$authSlug]->id;
                }
            }
            $book->authors()->sync($authorIds);

            // Generate copies
            $prefix = strtoupper(substr(preg_replace('/[^a-zA-Z]/', '', $book->title), 0, 4));
            for ($i = 1; $i <= $b['copies_count']; $i++) {
                $status = ($i <= $b['available_count']) ? 'available' : 'on_loan';
                $code = sprintf('SMANSA-%s-%03d-C%d', $prefix, $book->id, $i);

                BookCopy::updateOrCreate(
                    ['barcode_identifier' => $code],
                    [
                        'book_id' => $book->id,
                        'status' => $status,
                        'condition_notes' => 'Kondisi fisik baik dan bersampul mika',
                        'shelf_location' => $b['shelf'],
                        'acquired_at' => now()->subMonths(6),
                    ]
                );
            }
        }

        // 8. Magazines & Editions
        $magazine = Magazine::updateOrCreate(
            ['slug' => 'genta-smansa'],
            [
                'title' => 'Majalah Genta Smansa',
                'description' => 'Majalah terbitan resmi SMAN 1 Bukittinggi yang menyajikan karya literasi, liputan prestasi, profil alumni, dan dinamika riset siswa.',
                'cover_image' => 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=700&q=80',
            ]
        );

        $editions = [
            [
                'edition_title' => 'Edisi September 2026 - Langkah Baru Menuju Masa Depan Digital',
                'edition_number' => 'Vol. 15 No. 2',
                'year' => 2026,
                'publication_date' => '2026-09-01',
                'page_count' => 36,
                'cover_image' => 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=700&q=80',
                'pdf_file_path' => '/samples/genta-smansa-sep2026.pdf',
                'description' => 'Liputan khusus peluncuran Perpustakaan Digital, wawancara olimpiade sains nasional, dan antologi puisi siswa kelas XII.',
            ],
            [
                'edition_title' => 'Edisi Mei 2026 - Jejak Prestasi Insan Smansa',
                'edition_number' => 'Vol. 15 No. 1',
                'year' => 2026,
                'publication_date' => '2026-05-15',
                'page_count' => 32,
                'cover_image' => 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=700&q=80',
                'pdf_file_path' => '/samples/genta-smansa-mei2026.pdf',
                'description' => 'Merekam kisah inspiratif wisudawan berprestasi dan kiprah alumni di berbagai universitas terkemuka dunia.',
            ],
            [
                'edition_title' => 'Edisi Januari 2026 - Mengukir Karya di Ranah Minang',
                'edition_number' => 'Vol. 14 No. 3',
                'year' => 2026,
                'publication_date' => '2026-01-10',
                'page_count' => 28,
                'cover_image' => 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=700&q=80',
                'pdf_file_path' => '/samples/genta-smansa-jan2026.pdf',
                'description' => 'Eksplorasi budaya Bukittinggi, rubrik resensi buku perpustakaan sekolah, dan tips belajar efektif jelang ujian.',
            ],
        ];

        foreach ($editions as $ed) {
            MagazineEdition::updateOrCreate(
                ['edition_number' => $ed['edition_number'], 'magazine_id' => $magazine->id],
                array_merge($ed, ['magazine_id' => $magazine->id])
            );
        }

        // 9. Initial Sample Reservation
        $laskarPelangi = Book::where('slug', 'laskar-pelangi')->first();
        if ($laskarPelangi) {
            Reservation::updateOrCreate(
                ['reservation_code' => 'RES-202609-001'],
                [
                    'book_id' => $laskarPelangi->id,
                    'user_id' => $student->id,
                    'guest_name' => $student->name,
                    'guest_nis' => '23101',
                    'guest_class' => 'XI MIPA 1',
                    'guest_phone' => '085274123456',
                    'status' => 'pending',
                    'expires_at' => now()->addDays(2),
                    'notes' => 'Reservasi mandiri via portal katalog.',
                ]
            );
        }
    }
}