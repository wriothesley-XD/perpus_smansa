# 📘 Panduan Praktis Database MySQL — Perpustakaan SMAN 1 Bukittinggi
> **Panduan Khusus untuk Junior Database Engineer / Backend Developer**  
> Proyek: **Digital Library Perpustakaan Sunaryaman Musthofa SMAN 1 Bukittinggi** (`perpus_smansa`)

Halo! Panduan ini dibuat khusus untuk mempermudah kamu yang sedang mengelola database MySQL di proyek ini. Di Laravel, kamu **tidak perlu membuat tabel atau relasi secara manual satu per satu di phpMyAdmin/MySQL Workbench**, karena seluruh struktur tabel sudah diatur menggunakan **Migration** dan data awal diatur lewat **Seeder**.

---

## 🧭 1. Konsep Dasar yang Wajib Dipahami

1. **Migration = Version Control untuk Database**  
   File di folder `database/migrations/` adalah cetak biru (*blueprint*) dari seluruh tabel. Jika kamu menjalankan perintah migration, Laravel otomatis mengeksekusi script SQL untuk membuat atau mengubah tabel.
2. **Seeder = Pengisi Data Otomatis**  
   File `database/seeders/DatabaseSeeder.php` bertugas mengisikan data awal (akun Admin, akun Siswa, buku fiksi/pelajaran, buletin, kategori DDC, dsb.) sehingga database langsung siap digunakan.
3. **Foreign Key & Relasi**  
   Setiap tabel saling terhubung (contoh: peminjaman buku terhubung ke siswa dan buku). Jangan menghapus data induk sembarangan agar tidak terjadi error relasi (*foreign key constraint failure*).

---

## 🚀 2. Langkah Setup MySQL dari Nol (Step-by-Step)

### Langkah 1: Nyalakan Service MySQL
- Jika menggunakan **XAMPP**: Buka XAMPP Control Panel, klik **Start** pada modul **Apache** dan **MySQL**.
- Jika menggunakan **Laragon**: Klik **Start All**.

### Langkah 2: Buat Database Kosong di phpMyAdmin
1. Buka browser, akses `http://localhost/phpmyadmin`.
2. Klik menu **Databases** (Basis data).
3. Buat database baru dengan nama: `perpus_smansa`.
4. Pilih collation: `utf8mb4_unicode_ci` (agar mendukung karakter khusus, emoji, dan pencarian cepat).
5. Klik **Create**. *Biarkan kosong, jangan buat tabel apapun secara manual!*

### Langkah 3: Sesuaikan Konfigurasi di File `.env`
Buka file `.env` di direktori utama `d:\perpus_smansa\.env`. Cari baris yang diawali `DB_`, lalu ubah menjadi seperti berikut:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=perpus_smansa
DB_USERNAME=root
DB_PASSWORD=
```
*(Catatan: Jika MySQL kamu di XAMPP tidak ada password, kosongkan `DB_PASSWORD=`. Jika memakai password tertentu, isi sesuai konfigurasi komputermu).*

### Langkah 4: Jalankan Migration & Seeder
Buka terminal (PowerShell / Command Prompt) di folder proyek `d:\perpus_smansa`, lalu jalankan:

```bash
php artisan migrate:fresh --seed
```

🎉 **Selesai!** Dalam hitungan detik, seluruh tabel, foreign key, indeks, akun default, dan buku contoh akan langsung terisi rapi di database MySQL `perpus_smansa`.

---

## 🗄️ 3. Peta Struktur Tabel Utama di Proyek Ini

Berikut daftar tabel penting yang perlu kamu ketahui:

| Nama Tabel | Fungsi & Penjelasan | Kolom Kunci yang Wajib Diperhatikan |
| :--- | :--- | :--- |
| `users` | Akun pengguna (admin, pustakawan, siswa, guru). | `email`, `identifier_number` (NIS/NISN/NIP), `role` (`admin`/`librarian`/`student`), `class_name`, `phone_number` (WhatsApp). |
| `books` | Data katalog buku cetak dan e-book. | `title`, `slug`, `isbn`, `category_id`, `publisher_id`, `ebook_file_path` (path file PDF), `is_ebook` (boolean). |
| `book_copies` | Eksemplar fisik buku di rak perpustakaan. | `book_id`, `barcode_identifier` (barcode buku), `status` (`available`, `borrowed`, `lost`, `maintenance`). |
| `categories` | Kategori buku (Fiksi, Sains, Sejarah, dsb.). | `name`, `slug`, `icon`. |
| `loans` | Riwayat & transaksi peminjaman buku siswa. | `loan_code`, `user_id`, `book_copy_id`, `borrowed_at`, `due_at`, `returned_at`, `is_online_loan` (1 jika baca online), `status` (`active`, `returned`, `overdue`). |
| `reading_progress` | Catatan halaman terakhir & bookmark e-reader. | `user_id`, `book_id`, `last_page`, `total_pages`, `bookmarks` (JSON), `notes` (JSON). |
| `magazines` | Induk majalah sekolah dan buletin kurtaw. | `title`, `slug`, `type` (`magazine` atau `bulletin`). |
| `magazine_editions`| Edisi per terbitan majalah/buletin. | `magazine_id`, `edition_title`, `edition_number`, `year`, `pdf_file_path`, `cover_image`. |
| `events` | Agenda kegiatan & berita literasi sekolah. | `title`, `slug`, `event_date`, `location`, `description`. |
| `smansa_works` | Karya tulis siswa (cerpen, puisi, esai ilmiah). | `user_id`, `title`, `category`, `content`, `status`. |
| `library_settings` | Konfigurasi sistem perpustakaan. | `key`, `value` (misal durasi maksimal pinjam buku online/offline). |

---

## 🔑 4. Akun Bawaan Hasil Seeding

Kamu bisa langsung mencoba login dengan akun yang otomatis dibuatkan:

| Peran (Role) | Email Login | NIS / NISN / Identifier | Password | Nama Lengkap |
| :--- | :--- | :--- | :--- | :--- |
| **Admin Utama** | `admin@smansa.sch.id` | `ADM-001` | `password` | Administrator Perpustakaan |
| **Pustakawan** | `pustakawan@smansa.sch.id` | `NIP. 197004121995122001` | `password` | Dra. Hj. Elvi Rahmi |
| **Siswa Contoh** | `siswa@smansa.sch.id` | `NIS. 23101` | `password` | Ahmad Fauzan (XI MIPA 1) |

*Tips: Siswa bisa login menggunakan Email ATAU nomor NIS/NISN.*

---

## 🛠️ 5. Perintah Sakti Sehari-hari (Cheatsheet)

Jalankan perintah-perintah ini di terminal:

```bash
# 1. Cek status migration (melihat tabel mana saja yang sudah/belum jalan)
php artisan migrate:status

# 2. Menjalankan migration baru yang belum dieksekusi
php artisan migrate

# 3. Mereset database total dan mengisi ulang data dummy (Data lama akan terhapus!)
php artisan migrate:fresh --seed

# 4. Hanya menjalankan seeder (tanpa menghapus tabel)
php artisan db:seed

# 5. Membuka konsol database interaktif Laravel
php artisan tinker
```

---

## ⚠️ 6. Aturan Emas untuk Junior (Best Practices)

1. **JANGAN PERNAH mengubah struktur tabel langsung di phpMyAdmin saat develop!**
   - Mengapa? Jika kamu menambah kolom manual di phpMyAdmin komputermu, perubahan itu **tidak akan ada di komputer teman setimmu**.
   - **Solusi yang benar**: Buat migration baru dengan perintah:
     ```bash
     php artisan make:migration add_new_column_to_books_table --table=books
     ```
     Lalu tulis definisinya dan jalankan `php artisan migrate`. Dengan cara ini, teman tim cukup mengetik `php artisan migrate` dan databasenya otomatis ikut terupdate.

2. **Perhatikan Foreign Key Constraint**:
   - Jika ingin menghapus data buku dari tabel `books`, pastikan buku tersebut tidak sedang dipinjam di tabel `loans` atau memiliki eksemplar di `book_copies`.

3. **Backup Database Sebelum Presentasi / Demo**:
   - Buka phpMyAdmin -> Pilih database `perpus_smansa` -> Klik tab **Export** (Ekspor) -> Klik tombol **Export**. Simpan file `.sql` tersebut sebagai cadangan.

---

## 🚨 7. Cara Mengatasi Error Umum (Troubleshooting)

### Kasus 1: `SQLSTATE[HY000] [2002] Connection refused` atau `No connection could be made`
* **Penyebab**: Service MySQL belum aktif.
* **Solusi**: Buka XAMPP / Laragon, klik tombol **Start** pada modul MySQL.

### Kasus 2: `SQLSTATE[HY000] [1045] Access denied for user 'root'@'localhost'`
* **Penyebab**: Username atau password MySQL di file `.env` tidak cocok.
* **Solusi**: Periksa `DB_USERNAME` dan `DB_PASSWORD` di file `.env`. Untuk default XAMPP, password biasanya dikosongkan (`DB_PASSWORD=`).

### Kasus 3: `SQLSTATE[42S02]: Base table or view not found`
* **Penyebab**: Tabel belum dibuat di MySQL.
* **Solusi**: Jalankan perintah `php artisan migrate` atau `php artisan migrate:fresh --seed`.

### Kasus 4: `SQLSTATE[42000]: Syntax error: 1071 Specified key was too long`
* **Penyebab**: Versi MySQL/MariaDB lama membatasi panjang index string utf8mb4.
* **Solusi**: Jangan khawatir, proyek ini sudah mengaktifkan `Schema::defaultStringLength(191);` di `AppServiceProvider.php` secara otomatis.

---

*Jika ada pertanyaan lebih lanjut seputar database atau query Eloquent, silakan hubungi tim atau buka file model terkait di folder `app/Models/`! Semangat coding-nya!*
