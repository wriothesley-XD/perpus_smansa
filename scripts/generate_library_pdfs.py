import os
from fpdf import FPDF

class SmansaPDF(FPDF):
    def __init__(self, title_text, author_text, subtitle_text="", is_magazine=False):
        super().__init__(orientation="P", unit="mm", format="A4")
        self.doc_title = title_text
        self.doc_author = author_text
        self.doc_subtitle = subtitle_text
        self.is_magazine = is_magazine
        self.set_auto_page_break(auto=True, margin=20)

    def header(self):
        if self.page_no() == 1:
            return  # Suppress header on cover page
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(100, 116, 139) # slate-500
        school_text = "PERPUSTAKAAN SUNARYAMAN MUSTHOFA | SMAN 1 BUKITTINGGI"
        self.cell(0, 6, school_text, align="L")
        self.ln(4)
        self.set_font("Helvetica", "I", 7)
        self.cell(0, 4, f"{self.doc_title} - {self.doc_author}", align="L")
        self.ln(6)
        # Accent rule line
        self.set_draw_color(38, 153, 251) # Smansa blue
        self.set_line_width(0.4)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(6)

    def footer(self):
        if self.page_no() == 1:
            return  # Suppress footer on cover page
        self.set_y(-15)
        self.set_draw_color(226, 232, 240)
        self.set_line_width(0.3)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.ln(3)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(148, 163, 184) # slate-400
        self.cell(0, 5, "Portal Literasi Digital SMANSA - Hak Akses Terbatas untuk Warga Sekolah", align="L")
        self.set_y(-15)
        self.set_font("Helvetica", "B", 8)
        self.cell(0, 5, f"Halaman {self.page_no()}", align="R")

    def draw_cover(self, isbn="", category="", pub_info=""):
        self.add_page()
        # Top banner background
        self.set_fill_color(15, 23, 42) # slate-900
        self.rect(0, 0, 210, 85, "F")
        
        # Blue accent stripe
        self.set_fill_color(38, 153, 251)
        self.rect(0, 85, 210, 4, "F")

        # School Header on banner
        self.set_y(22)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(147, 197, 253) # blue-300
        self.cell(0, 6, "SMA NEGERI 1 BUKITTINGGI", align="C", ln=True)
        
        self.set_font("Helvetica", "B", 16)
        self.set_text_color(255, 255, 255)
        self.cell(0, 8, "PERPUSTAKAAN SUNARYAMAN MUSTHOFA", align="C", ln=True)

        self.set_font("Helvetica", "", 9)
        self.set_text_color(203, 213, 225)
        self.cell(0, 6, "Platform Digital E-Library & Literasi Sekolah Berkelanjutan", align="C", ln=True)

        # Title Section
        self.set_y(105)
        if category:
            self.set_font("Helvetica", "B", 9)
            self.set_text_color(38, 153, 251)
            self.cell(0, 6, f"[ KOLEKSI {category.upper()} ]", align="C", ln=True)
            self.ln(2)

        self.set_font("Helvetica", "B", 22)
        self.set_text_color(15, 23, 42)
        self.multi_cell(0, 9, self.doc_title, align="C")
        self.ln(4)

        if self.doc_subtitle:
            self.set_font("Helvetica", "I", 12)
            self.set_text_color(71, 85, 105)
            self.multi_cell(0, 6, self.doc_subtitle, align="C")
            self.ln(6)

        # Author badge
        self.set_font("Helvetica", "B", 12)
        self.set_text_color(30, 41, 59)
        self.cell(0, 7, f"Karya: {self.doc_author}", align="C", ln=True)
        self.ln(12)

        # Metadata Card
        card_w = 150
        card_x = (210 - card_w) / 2
        card_y = self.get_y()
        self.set_fill_color(248, 250, 252) # slate-50
        self.set_draw_color(203, 213, 225) # slate-300
        self.rect(card_x, card_y, card_w, 42, "FD")

        self.set_xy(card_x + 6, card_y + 4)
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(15, 23, 42)
        self.cell(card_w - 12, 5, "INFORMASI REKOR KATALOG DIGITAL", ln=True)
        
        self.set_x(card_x + 6)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(71, 85, 105)
        if isbn:
            self.cell(card_w - 12, 5, f"Nomor Standar (ISBN): {isbn}", ln=True)
            self.set_x(card_x + 6)
        if pub_info:
            self.cell(card_w - 12, 5, f"Penerbit / Hak Akses: {pub_info}", ln=True)
            self.set_x(card_x + 6)
        self.cell(card_w - 12, 5, "Format: E-Book Aman (DRM Streaming Terproteksi SMANSA)", ln=True)
        self.set_x(card_x + 6)
        self.cell(card_w - 12, 5, "Status Dokumen: Edisi Penuh / Terverifikasi Pustakawan Sekolah", ln=True)

        # Notice at bottom of cover
        self.set_y(260)
        self.set_font("Helvetica", "I", 7.5)
        self.set_text_color(148, 163, 184)
        self.multi_cell(0, 4, "PERHATIAN: Berkas ini didistribusikan secara digital melalui Sistem Perpustakaan SMAN 1 Bukittinggi untuk keperluan referensi dan pembelajaran mandiri peserta didik. Dilarang menggandakan atau mengedarkan tanpa izin tertulis dari pihak sekolah.", align="C")

    def add_chapter(self, chapter_title, paragraphs, callout_title="", callout_text=""):
        self.add_page()
        # Chapter Heading
        self.set_font("Helvetica", "B", 15)
        self.set_text_color(15, 23, 42) # slate-900
        self.cell(0, 8, chapter_title, ln=True)
        
        # Sub-bar
        self.set_draw_color(38, 153, 251)
        self.set_line_width(0.8)
        self.line(self.l_margin, self.get_y() + 1, self.l_margin + 35, self.get_y() + 1)
        self.ln(6)

        # Body Paragraphs
        self.set_font("Helvetica", "", 9.5)
        self.set_text_color(51, 65, 85) # slate-700
        for para in paragraphs:
            self.multi_cell(0, 5.5, para)
            self.ln(3.5)

        # Optional Callout Box
        if callout_title and callout_text:
            self.ln(3)
            box_x = self.l_margin
            box_w = self.w - self.l_margin - self.r_margin
            start_y = self.get_y()
            
            self.set_fill_color(239, 246, 255) # blue-50
            self.set_draw_color(147, 197, 253) # blue-300
            self.rect(box_x, start_y, box_w, 24, "FD")
            
            # Accent bar on left
            self.set_fill_color(38, 153, 251)
            self.rect(box_x, start_y, 2.5, 24, "F")

            self.set_xy(box_x + 6, start_y + 3)
            self.set_font("Helvetica", "B", 9)
            self.set_text_color(30, 58, 138) # blue-900
            self.cell(box_w - 10, 5, callout_title, ln=True)
            
            self.set_x(box_x + 6)
            self.set_font("Helvetica", "", 8.5)
            self.set_text_color(30, 64, 175) # blue-800
            self.multi_cell(box_w - 10, 4.5, callout_text)
            self.ln(5)

def build_atomic_habits():
    pdf = SmansaPDF(
        title_text="Atomic Habits",
        author_text="James Clear",
        subtitle_text="Perubahan Kecil yang Memberikan Hasil Luar Biasa",
        is_magazine=False
    )
    pdf.draw_cover(
        isbn="978-602-06-3317-6",
        category="Pengembangan Diri & Psikologi Terapan",
        pub_info="PT Gramedia Pustaka Utama (Koleksi Perpustakaan SMAN 1 Bukittinggi)"
    )

    pdf.add_chapter(
        chapter_title="Bab 1: Kekuatan Dahsyat Perubahan 1% Setiap Hari",
        paragraphs=[
            "Sangat mudah melebih-lebihkan arti penting satu momen penentu dan meremehkan nilai membuat perbaikan-perbaikan kecil setiap hari. Terlalu sering kita meyakinkan diri bahwa kesuksesan besar menuntut aksi besar. Baik ketika kita ingin menurunkan berat badan, membangun bisnis, memenangkan kejuaraan sains, atau meraih peringkat pertama di sekolah.",
            "Namun kenyataannya, perbaikan 1% seringkali tidak terlalu terlihat atau terasa hari ini, namun sangat bermakna dalam jangka panjang. Bila Anda bisa menjadi 1% lebih baik setiap hari selama satu tahun, Anda akan menjadi tiga puluh tujuh kali lebih baik pada akhir tahun tersebut.",
            "Kebiasaan adalah bunga majemuk dari perbaikan diri. Efek kebiasaan berlipat ganda saat Anda mengulanginya dari waktu ke waktu. Pada suatu hari tertentu, efeknya mungkin tampak kecil. Namun pengaruh yang dihasilkan selama berbulan-bulan dan bertahun-tahun bisa menjadi sangat mencengangkan.",
            "Bagi seorang siswa di SMAN 1 Bukittinggi yang bercita-cita menembus perguruan tinggi idaman atau menjuarai olimpiade, kunci utamanya bukan belajar mati-matian 12 jam dalam satu malam sebelum ujian, melainkan dedikasi 45 menit mengulang materi setiap sore secara konsisten."
        ],
        callout_title="Refleksi Siswa SMANSA:",
        callout_text="Fokuslah pada sistem dan proses belajar harian, bukan hanya semata-mata pada target nilai rapor. Sistem yang konsisten akan otomatis menghasilkan nilai yang gemilang."
    )

    pdf.add_chapter(
        chapter_title="Bab 2: Bagaimana Kebiasaan Membentuk Identitas Diri",
        paragraphs=[
            "Alasan utama begitu sulitnya mengubah kebiasaan adalah kita mencoba mengubah hal yang salah. Untuk memahami ini, bayangkan ada tiga lapisan perubahan: perubahan pada hasil, perubahan pada proses, dan perubahan pada identitas diri.",
            "Hasil berkaitan dengan apa yang Anda dapatkan (misal: meraih medali emas OSN). Proses berkaitan dengan apa yang Anda lakukan (misal: jadwal membaca modul tiap jam 4 sore). Lapisan terdalam, identitas, berkaitan dengan apa yang Anda yakini tentang diri Anda sendiri.",
            "Banyak orang memulai proses perubahan dengan berfokus pada apa yang ingin mereka capai. Cara ini mengarah ke kebiasaan berbasis hasil. Alternatif yang jauh lebih kokoh adalah membangun kebiasaan berbasis identitas. Dengan pendekatan ini, kita mulai dengan berfokus pada kita ingin menjadi orang seperti apa.",
            "Alih-alih berkata: 'Saya sedang mencoba membaca buku sejarah hari ini', katakan pada diri Anda: 'Saya adalah seorang pembelajar sejati dan pecinta ilmu pengetahuan'. Ketika identitas Anda telah selaras dengan tindakan Anda, Anda tidak lagi harus berjuang memaksa diri sendiri untuk belajar."
        ],
        callout_title="Kaidah Emas Identitas:",
        callout_text="Setiap tindakan yang Anda ambil adalah satu suara yang mendukung tipe orang seperti apa yang Anda inginkan di masa depan."
    )

    pdf.add_chapter(
        chapter_title="Bab 3: Empat Kaidah Perubahan Perilaku",
        paragraphs=[
            "Proses membangun kebiasaan dapat dipecah menjadi empat langkah sederhana: petunjuk (cue), gairah (craving), tanggapan (response), dan ganjaran (reward). Keempat langkah ini merupakan tulang punggung setiap kebiasaan.",
            "Dari empat langkah ini terciptalah Empat Kaidah Perubahan Perilaku (The Four Laws of Behavior Change):",
            "1. Kaidah Pertama: Menjadikannya terlihat (Make it obvious). Letakkan buku pelajaran atau novel literasi di meja belajar yang mudah terjangkau mata Anda.",
            "2. Kaidah Kedua: Menjadikannya menarik (Make it attractive). Padukan kegiatan belajar dengan sesuatu yang menyenangkan, seperti mendengarkan instrumental musik lembut.",
            "3. Kaidah Ketiga: Menjadikannya mudah (Make it easy). Kurangi hambatan awal. Mulailah dengan aturan dua menit: bacalah dua halaman pertama sebelum bersantai.",
            "4. Kaidah Keempat: Menjadikannya memuaskan (Make it satisfying). Berikan penghargaan pada diri sendiri saat target membaca mingguan tercapai."
        ],
        callout_title="Tips Praktis di Perpustakaan Sekolah:",
        callout_text="Gunakan ruang baca hening Perpustakaan SMAN 1 Bukittinggi sebagai lingkungan kondusif yang mengaktifkan petunjuk positif untuk fokus dan berkonsentrasi."
    )

    pdf.add_chapter(
        chapter_title="Bab 4: Penutup & Implementasi Belajar Efektif",
        paragraphs=[
            "Perjalanan menjadi pribadi unggul bukanlah tentang satu lonjakan besar, melainkan akumulasi ribuan pilihan kecil yang tepat setiap harinya. Melalui perpustakaan digital ini, para siswa SMANSA dibekali kemudahan untuk mengakses ilmu pengetahuan berkualitas tanpa batas ruang dan waktu.",
            "Manfaatkan fitur penanda halaman (bookmarks), catatan digital, serta riwayat peminjaman untuk memantau kemajuan membaca Anda. Jadikan literasi bukan sebagai kewajiban tugas semata, melainkan bagian tak terpisahkan dari gaya hidup generasi muda Minangkabau yang berbudaya, religius, dan berdaya saing global.",
            "Buku ini dipersembahkan dalam format digital terkurasi khusus untuk civitas akademika SMAN 1 Bukittinggi guna menyemarakkan Gerakan Literasi Sekolah (GLS)."
        ]
    )

    return pdf

def build_laskar_pelangi():
    pdf = SmansaPDF(
        title_text="Laskar Pelangi",
        author_text="Andrea Hirata",
        subtitle_text="Kisah Perjuangan dan Asa Sepuluh Sahabat di Pulau Belitong",
        is_magazine=False
    )
    pdf.draw_cover(
        isbn="978-979-3062-79-2",
        category="Fiksi & Mahakarya Sastra Indonesia",
        pub_info="Bentang Pustaka (Edisi Khusus Koleksi Digital SMAN 1 Bukittinggi)"
    )

    pdf.add_chapter(
        chapter_title="Bab 1: Sepuluh Murid Baru",
        paragraphs=[
            "Pagi itu, waktu aku masih kecil, aku duduk di bangku panjang di depan sebuah kelas. Sebatang pohon filicium tua yang rindang meneduhiku. Ayahku duduk di sampingku, memeluk pundakku dengan kedua lengannya dan tersenyum mengangguk-angguk pada setiap orang tua dan anak-anaknya yang duduk berderet-deret di bangku panjang lain di depan kami.",
            "Hari itu adalah hari yang agak penting: hari pertama masuk SD. Di ujung bangku-bangku panjang tadi ada sebuah pintu terbuka. Kusen pintu itu miring karena seluruh bangunan sekolah sudah doyong seolah akan roboh.",
            "Pak Harfan dan Bu Muslimah berdiri di depan pintu yang reyot itu. Wajah mereka tegang menatap jalan setapak. Jika hari itu murid baru tidak genap sepuluh orang, sekolah SD Muhammadiyah Gantong yang sangat miskin ini akan ditutup oleh pengawas sekolah dari Depdikbud.",
            "Sembilan anak telah duduk gemetar di bangku reyot. Waktu hampir habis. Dan ketika harapan hampir pupus, dari kejauhan tampak Harun, seorang anak berusia lima belas tahun dengan keterbelakangan mental, berlari riang digandeng ibunya. Harun menyelamatkan sekolah kami. Kami genap sepuluh orang, dan perjalanan Laskar Pelangi pun dimulai."
        ],
        callout_title="Pesan Moral Literasi:",
        callout_text="Keterbatasan fasilitas fisik tidak pernah mampu memadamkan api semangat belajar dan ketulusan hati seorang pendidik sejati."
    )

    pdf.add_chapter(
        chapter_title="Bab 2: Lintang sang Jenius dari Pesisir",
        paragraphs=[
            "Di antara kami bersepuluh, Lintang adalah bintang yang paling benderang. Setiap hari ia mengayuh sepeda bututnya sejauh empat puluh kilometer melintasi hutan bakau, rawa buaya, dan jalanan berlumpur hanya demi tiba di sekolah kami.",
            "Otak anak nelayan miskin itu bekerja secepat kilat ketika berhadapan dengan angka-angka matematika dan rumus-rumus fisika. Ia tidak pernah mengeluh meski rantai sepedanya putus puluhan kali atau ketika ia harus menunggu buaya sebesar pohon kelapa menyeberang jalan setapak.",
            "Semangat juang Lintang mengingatkan kita semua bahwa kesempatan memperoleh pendidikan adalah anugerah tak ternilai yang patut diperjuangkan dengan segenap daya dan jiwa."
        ]
    )

    return pdf

def build_fisika_kelas_xi():
    pdf = SmansaPDF(
        title_text="Fisika untuk SMA/MA Kelas XI",
        author_text="Kemendikbudristek RI",
        subtitle_text="Buku Teks Utama - Implementasi Kurikulum Merdeka",
        is_magazine=False
    )
    pdf.draw_cover(
        isbn="978-623-180-201-9",
        category="Buku Pelajaran & Sains Murni",
        pub_info="Pusat Perbukuan Balitbang Kemendikbudristek (SMAN 1 Bukittinggi)"
    )

    pdf.add_chapter(
        chapter_title="Bab 1: Vektor dan Kinematika Gerak Lurus",
        paragraphs=[
            "Dalam kehidupan sehari-hari, fenomena gerak selalu terjadi di sekitar kita. Kendaraan yang melaju di jalanan Bukittinggi, bola yang dilempar ke udara, hingga gerak revolusi bumi mengitari matahari adalah wujud nyata fenomena kinematika.",
            "Besaran vektor adalah besaran yang memiliki nilai dan arah. Berbeda dengan besaran skalar yang hanya dinyatakan oleh angka dan satuan (seperti massa dan suhu), besaran vektor menuntut penentuan arah gerak yang spesifik (seperti perpindahan, kecepatan, percepatan, dan gaya).",
            "Metode penguraian komponen vektor pada bidang Cartesius (sumbu-X dan sumbu-Y) merupakan pondasi mendasar dalam memecahkan persamaan gerak dua dimensi, seperti gerak parabola dan gerak melingkar beraturan."
        ],
        callout_title="Latihan Eksperimen Mandiri:",
        callout_text="Gunakan perangkat laboratorium fisika SMAN 1 Bukittinggi untuk mengukur percepatan gravitasi bumi (g) menggunakan metode bandul matematis."
    )

    return pdf

def build_sejarah_minangkabau():
    pdf = SmansaPDF(
        title_text="Sejarah Minangkabau: Jejak Adat & Keislaman",
        author_text="Buya Hamka",
        subtitle_text="Kajian Filosofis Falsafah Luhak Nan Tigo dan Nagari",
        is_magazine=False
    )
    pdf.draw_cover(
        isbn="978-979-407-331-3",
        category="Sejarah Kebudayaan & Muatan Lokal Minangkabau",
        pub_info="Balai Pustaka & Pusat Kajian Kebudayaan Minangkabau SMANSA"
    )

    pdf.add_chapter(
        chapter_title="Bab 1: Falsafah Adat Basandi Syarak, Syarak Basandi Kitabullah",
        paragraphs=[
            "Perjalanan peradaban masyarakat Minangkabau berakar kuat pada kearifan alam terkembang jadi guru. Masyarakat adat Minang memandang keteraturan hukum semesta sebagai cermin pedoman tatanan tingkah laku kemanusiaan dalam hidup bermasyarakat.",
            "Perjanjian bersejarah di Bukit Marapalam menjadi tonggak kesepakatan abadi yang merekatkan pranata adat dengan syariat Islam: Adat Basandi Syarak, Syarak Basandi Kitabullah (ABS-SBK). Nilai luhur ini mengalir dalam setiap sendi kehidupan nagari, tata ruang balai adat, surau, dan rumah gadang.",
            "Bagi generasi muda SMAN 1 Bukittinggi, memahami akar budaya dan sejarah luhur Minangkabau merupakan modal integritas kepribadian agar mampu melangkah kokoh di kancah internasional tanpa kehilangan jati diri kearifan lokal."
        ]
    )

    return pdf

def build_genta_magazine(edition_title="Edisi September 2026 - Menuju Era Baru Digital"):
    pdf = SmansaPDF(
        title_text="Majalah Genta Smansa",
        author_text="Redaksi Genta & OSIS SMAN 1 Bukittinggi",
        subtitle_text=edition_title,
        is_magazine=True
    )
    pdf.draw_cover(
        isbn="ISSN: 2580-1928",
        category="Publikasi Berkala & Majalah Sekolah",
        pub_info="Penerbit Redaksi Majalah Genta Smansa, SMA Negeri 1 Bukittinggi"
    )

    pdf.add_chapter(
        chapter_title="Tajuk Rencana: Transformasi Literasi Digital Abad 21",
        paragraphs=[
            "Puji syukur kita panjatkan ke hadirat Allah SWT, Majalah Genta Smansa kembali hadir menyapa seluruh pembaca setia di lingkungan SMA Negeri 1 Bukittinggi dan para alumni di berbagai penjuru dunia.",
            "Edisi kali ini menandai babak baru dalam sejarah perpustakaan sekolah dengan diluncurkannya Perpustakaan Digital Berbasis Web Terintegrasi. Melalui inovasi ini, ribuan judul referensi buku, jurnal ilmiah, dan e-magazine dapat dinikmati oleh siswa kapan saja dan di mana saja.",
            "Kepala SMAN 1 Bukittinggi menyampaikan apresiasi mendalam atas kerja keras tim pengembang, pustakawan, dan civitas akademika dalam mewujudkan ekosistem sekolah digital yang inklusif, modern, dan berwawasan masa depan.",
            "Selamat membaca, teruslah berkarya, dan kobarkan semangat literasi di dada setiap putra-putri Landbouw!"
        ],
        callout_title="Sorotan Prestasi OSN 2026:",
        callout_text="Tim Olimpiade Sains SMAN 1 Bukittinggi berhasil memborong 5 medali di tingkat nasional bidang Fisika, Astronomi, dan Informatika!"
    )

    return pdf

def build_default_smansa_pdf():
    pdf = SmansaPDF(
        title_text="Koleksi E-Book Resmi Perpustakaan SMANSA",
        author_text="Perpustakaan Sunaryaman Musthofa",
        subtitle_text="Koleksi Digital Berlisensi SMA Negeri 1 Bukittinggi",
        is_magazine=False
    )
    pdf.draw_cover(
        isbn="SMANSA-DIGITAL-LIB",
        category="Koleksi Literasi Siswa",
        pub_info="Perpustakaan SMA Negeri 1 Bukittinggi, Sumatera Barat"
    )

    pdf.add_chapter(
        chapter_title="Pengantar Koleksi E-Book Perpustakaan Digital",
        paragraphs=[
            "Selamat datang di Sistem Pembaca Digital (E-Reader) Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi.",
            "Sistem ini dirancang khusus untuk memberikan pengalaman membaca buku secara aman, nyaman, dan ramah pengguna bagi seluruh siswa, guru, dan staf sekolah. Fitur penanda halaman (bookmarks), pelacak progres otomatis, dan pembatas waktu peminjaman online dirancang untuk mendukung manajemen belajar mandiri Anda.",
            "Koleksi buku cetak fisik asli tetap tersedia di ruang perpustakaan sekolah pada rak-rak berkategori Dewey Decimal Classification (DDC). Siswa dapat melakukan reservasi fisik ataupun menikmati bahan bacaan melalui e-reader ini.",
            "Jika ada saran, pertanyaan mengenai koleksi, atau permohonan judul buku baru, silakan menghubungi petugas pustakawan di meja sirkulasi utama atau melalui portal kontak perpustakaan."
        ]
    )

    return pdf

def main():
    dest_ebooks = os.path.join("storage", "app", "public", "ebooks")
    dest_magazines = os.path.join("storage", "app", "public", "magazines")
    dest_editions = os.path.join("storage", "app", "public", "magazines", "editions")

    os.makedirs(dest_ebooks, exist_ok=True)
    os.makedirs(dest_magazines, exist_ok=True)
    os.makedirs(dest_editions, exist_ok=True)

    print("Generating Atomic Habits PDF...")
    build_atomic_habits().output(os.path.join(dest_ebooks, "atomic-habits.pdf"))

    print("Generating Laskar Pelangi PDF...")
    build_laskar_pelangi().output(os.path.join(dest_ebooks, "laskar-pelangi.pdf"))

    print("Generating Fisika Kelas XI PDF...")
    build_fisika_kelas_xi().output(os.path.join(dest_ebooks, "fisika-kelas-xi.pdf"))

    print("Generating Sejarah Minangkabau PDF...")
    build_sejarah_minangkabau().output(os.path.join(dest_ebooks, "sejarah-minangkabau.pdf"))

    print("Generating Default Library Reader PDF...")
    build_default_smansa_pdf().output(os.path.join(dest_ebooks, "smansa-default-reader.pdf"))

    print("Generating Genta Magazine Sample PDF...")
    build_genta_magazine("Edisi Khusus September 2026").output(os.path.join(dest_magazines, "genta-sample.pdf"))
    build_genta_magazine("Edisi Khusus September 2026").output(os.path.join(dest_editions, "genta-sep2026.pdf"))
    build_genta_magazine("Edisi Mei 2026").output(os.path.join(dest_editions, "genta-mei2026.pdf"))
    build_genta_magazine("Edisi Januari 2026").output(os.path.join(dest_editions, "genta-jan2026.pdf"))

    print("All PDFs successfully generated!")

if __name__ == "__main__":
    main()
