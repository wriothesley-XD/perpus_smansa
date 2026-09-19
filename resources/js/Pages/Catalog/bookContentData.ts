import { Book } from "../../types/library";

export interface BookPageContent {
    pageNumber: number;
    title?: string;
    subtitle?: string;
    chapterNumber?: number;
    chapterTitle?: string;
    type: "cover" | "toc" | "foreword" | "chapter" | "diagram" | "reflection" | "colophon";
    bodyParagraphs?: string[];
    quote?: { text: string; author: string };
    callout?: { title: string; text: string; badge?: string };
    table?: { headers: string[]; rows: string[][] };
    interactivePrompt?: { question: string; placeholder: string };
    coverData?: {
        title: string;
        authors: string;
        isbn: string;
        year: number;
        publisher: string;
        coverImage?: string;
    };
}

// ── 1. ATOMIC HABITS PAGES ──
const atomicHabitsPages: BookPageContent[] = [
    {
        pageNumber: 1,
        type: "cover",
        title: "Atomic Habits",
        subtitle: "Perubahan Kecil yang Memberikan Hasil Luar Biasa",
    },
    {
        pageNumber: 2,
        type: "toc",
        title: "Daftar Isi Buku",
        subtitle: "Panduan Belajar & Implementasi Karakter Siswa SMANSA",
        bodyParagraphs: [
            "Sentuh atau klik bab di bawah untuk langsung menuju halaman yang dituju:",
        ],
    },
    {
        pageNumber: 3,
        type: "foreword",
        chapterTitle: "Prakata Pustakawan Sekolah",
        bodyParagraphs: [
            "Puji syukur ke hadirat Tuhan Yang Maha Esa atas tersedianya edisi digital terkurasi dari mahakarya James Clear di Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi.",
            "Buku ini kami pilih secara khusus sebagai rujukan utama pengembangan karakter siswa. Di era digital yang serba cepat ini, godaan prokrastinasi (menunda pekerjaan) dan ketergantungan pada media sosial seringkali menjadi tantangan terbesar generasi muda.",
            "Melalui buku ini, kami berharap para siswa Landbouw mampu membangun kedisiplinan belajar mandiri yang berkelanjutan, mempersiapkan diri menembus PTN impian, dan mengukir prestasi olimpiade sains dengan landasan kebiasaan positif yang kokoh.",
        ],
        quote: {
            text: "Kualitas hidup kita hari ini adalah cerminan dari akumulasi kebiasaan-kebiasaan kecil kita selama bertahun-tahun.",
            author: "Kepala Perpustakaan SMAN 1 Bukittinggi",
        },
    },
    {
        pageNumber: 4,
        type: "foreword",
        chapterTitle: "Pengantar Penulis: James Clear",
        bodyParagraphs: [
            "Pada hari terakhir tahun kedua saya di SMA, sebuah tongkat bisbol menghantam wajah saya tepat di tengah hidung. Tulang wajah saya remuk, rongga mata saya retak, dan otak saya mengalami trauma berat.",
            "Pemulihan dari cedera tersebut berlangsung sangat lambat. Butuh waktu berbulan-bulan untuk bisa berjalan lurus kembali, dan lebih dari satu tahun untuk memulihkan fungsi penglihatan normal saya.",
            "Dari pengalaman traumatis itulah saya menyadari satu hal krusial: satu-satunya cara untuk memperbaiki hidup ketika segala sesuatunya tampak hancur adalah dengan memulai dari langkah-langkah kecil. Memulai dari perubahan 1% setiap hari.",
        ],
        callout: {
            title: "Pelajaran Inti:",
            text: "Perubahan besar tidak dimulai dari keajaiban tiba-tiba, melainkan dari ribuan keputusan kecil yang diambil secara sadar setiap hari.",
            badge: "Intisari",
        },
    },
    {
        pageNumber: 5,
        type: "chapter",
        chapterNumber: 1,
        chapterTitle: "Kekuatan Dahsyat Perubahan 1%",
        bodyParagraphs: [
            "Sangat mudah melebih-lebihkan arti penting satu momen penentu dan meremehkan nilai membuat perbaikan-perbaikan kecil setiap hari.",
            "Terlalu sering kita meyakinkan diri bahwa kesuksesan besar menuntut aksi yang spektakuler. Baik itu menjuarai lomba debat nasional, lolos fakultas kedokteran, atau meraih nilai 100 pada ujian fisika.",
            "Namun kenyataannya, perbaikan 1% seringkali tidak terasa sama sekali pada hari itu. Bila Anda bisa menjadi 1% lebih baik setiap hari selama satu tahun, Anda akan menjadi 37 kali lebih baik pada akhir tahun tersebut (1.01^365 = 37.78).",
        ],
        callout: {
            title: "Kalkulasi Matematis Perubahan:",
            text: "1% lebih baik setiap hari: 1.01^365 = 37.78 kali kemajuan.\n1% lebih buruk setiap hari: 0.99^365 = 0.03 (nyaris lenyap).",
            badge: "Matematika Kebiasaan",
        },
    },
    {
        pageNumber: 6,
        type: "diagram",
        chapterNumber: 1,
        chapterTitle: "Bunga Majemuk dari Perbaikan Diri",
        bodyParagraphs: [
            "Kebiasaan adalah bunga majemuk dari perbaikan diri. Mengulang kebiasaan sama seperti menabung modal yang berbunga majemuk di bank.",
            "Hasil dari kebiasaan Anda berlipat ganda saat Anda mereproduksinya dari waktu ke waktu. Satu hari membaca modul mungkin tidak terasa bedanya, tetapi membaca 20 halaman setiap sore selama 3 tahun di SMA menghasilkan ratusan ribu kosa kata dan wawasan yang tak tertandingi.",
        ],
        table: {
            headers: ["Bidang", "Jika 1% Lebih Buruk", "Jika 1% Lebih Baik"],
            rows: [
                ["Produktifitas", "Tugas menumpuk & stres konstan", "Selesai lebih awal & pikiran tenang"],
                ["Pengetahuan", "Mudah lupa materi dasar", "Konsep mendalam & daya nalar tajam"],
                ["Hubungan Sosial", "Kasar & mudah tersinggung", "Empati tinggi & jejaring suportif"],
                ["Kesehatan Siswa", "Begadang & konsentrasi buyar", "Stamina prima & fokus sepanjang jam belajar"],
            ],
        },
    },
    {
        pageNumber: 7,
        type: "chapter",
        chapterNumber: 1,
        chapterTitle: "Lembah Kekecewaan (The Plateau)",
        bodyParagraphs: [
            "Ketika Anda mulai mencoba membangun kebiasaan baru, kemajuan seringkali tidak terlihat linier. Di minggu-minggu pertama, Anda mungkin merasa sudah bersusah payah belajar 1 jam setiap malam, tetapi nilai kuis masih belum naik signifikan.",
            "Ini adalah fase kritis yang saya sebut sebagai 'Lembah Kekecewaan' (The Plateau of Latent Potential). Orang mengharapkan hasil linier, padahal efek dari kebiasaan bersifat tertunda.",
            "Energi Anda tidak hilang sia-sia; ia sedang terakumulasi seperti bongkahan es di suhu minus yang perlahan dihangatkan dari -5°C ke 0°C. Perubahan wujud cair baru terjadi tepat di 0°C, tetapi kenaikan dari -5°C ke -1°C tetap mutlak diperlukan.",
        ],
        quote: {
            text: "Ketika batu karang tidak pecah pada pukulan keseratus, saya tahu bahwa bukan pukulan ke-101 yang memecahkannya, melainkan akumulasi 100 pukulan sebelumnya.",
            author: "Jacob Riis",
        },
    },
    {
        pageNumber: 8,
        type: "chapter",
        chapterNumber: 1,
        chapterTitle: "Lupakan Sasaran, Fokuslah pada Sistem",
        bodyParagraphs: [
            "Hampir setiap siswa di ruang kelas memiliki sasaran yang sama: ingin mendapatkan ranking tinggi atau lolos SNBP/SNBT.",
            "Jika pemenang dan yang tidak menang sama-sama memiliki sasaran yang serupa, maka sasaran bukanlah faktor pembeda kesuksesan. Pembedanya adalah SISTEM belajar harian yang mereka terapkan.",
            "Sasaran berguna untuk menentukan arah, sedangkan sistem adalah kendaraan yang membawa Anda maju ke tujuan. Jika Anda menghabiskan terlalu banyak waktu memikirkan sasaran tanpa merawat sistem harian, Anda akan terjebak dalam angan-angan.",
        ],
        callout: {
            title: "Prinsip Emas:",
            text: "Anda tidak naik ke level sasaran Anda. Anda jatuh ke level sistem Anda.",
            badge: "Inti Pemikiran",
        },
    },
    {
        pageNumber: 9,
        type: "chapter",
        chapterNumber: 2,
        chapterTitle: "Bagaimana Kebiasaan Membentuk Identitas",
        bodyParagraphs: [
            "Mengapa begitu sulit mengubah kebiasaan buruk? Alasan paling mendasar adalah kita mencoba mengubah hal yang salah.",
            "Perubahan perilaku terdiri atas tiga lapisan utama:",
            "1. Perubahan Hasil (Goals): Mengubah capaian seperti medali, piagam, atau angka rapor.",
            "2. Perubahan Proses (System): Mengubah rutinitas belajar dan penataan waktu.",
            "3. Perubahan Identitas (Beliefs): Mengubah apa yang Anda yakini tentang diri Anda sendiri, prinsip moral Anda, dan pandangan dunia Anda.",
            "Banyak orang memulai proses dari Hasil. Pendekatan yang jauh lebih perkasa dan tahan lama adalah membangun kebiasaan berbasis IDENTITAS.",
        ],
    },
    {
        pageNumber: 10,
        type: "chapter",
        chapterNumber: 2,
        chapterTitle: "Menjadi Pembelajar Sejati",
        bodyParagraphs: [
            "Tujuannya bukan sekadar 'membaca 1 buku', melainkan 'menjadi seorang pembaca'.",
            "Tujuannya bukan sekadar 'mengerjakan soal olimpiade', melainkan 'menjadi seorang pemecah masalah sains'.",
            "Ketika perilaku Anda telah menjadi bagian dari identitas Anda, Anda tidak perlu lagi memaksa diri untuk melakukannya. Anda melakukannya karena itulah siapa Anda yang sesungguhnya.",
            "Setiap tindakan yang Anda ambil setiap sore di ruang perpustakaan adalah satu suara (vote) yang mendukung identitas pembelajar sejati Anda.",
        ],
        callout: {
            title: "Pertanyaan Reflektif Siswa:",
            text: "Apakah tindakan yang baru saja saya lakukan hari ini mencerminkan tipe orang yang ingin saya banggakan dalam 5 tahun ke depan?",
            badge: "Refleksi",
        },
    },
    {
        pageNumber: 11,
        type: "chapter",
        chapterNumber: 3,
        chapterTitle: "Siklus 4 Langkah Kebiasaan Manusia",
        bodyParagraphs: [
            "Setiap kebiasaan yang Anda lakukan—dari mengecek smartphone hingga mengikat tali sepatu—didorong oleh siklus neurobiologis empat langkah:",
            "1. Petunjuk (Cue): Pemicu visual, audio, atau lokasi yang menandakan adanya potensi ganjaran.",
            "2. Gairah (Craving): Keinginan mendalam untuk mengubah status perasaan atau kondisi mental.",
            "3. Tanggapan (Response): Aksi nyata atau kebiasaan yang Anda jalankan.",
            "4. Ganjaran (Reward): Kepuasan yang memuaskan gairah dan memberi sinyal ke otak untuk mengingat aksi ini.",
            "Dari siklus ini lahir Empat Kaidah Perubahan Perilaku (The Four Laws of Behavior Change).",
        ],
    },
    {
        pageNumber: 12,
        type: "chapter",
        chapterNumber: 3,
        chapterTitle: "Hukum 1: Menjadikannya Terlihat (Obvious)",
        bodyParagraphs: [
            "Lingkungan seringkali lebih berkuasa daripada kemauan (willpower). Manusia adalah makhluk yang sangat dipengaruhi oleh petunjuk visual.",
            "Jika Anda ingin rajin membaca buku perpustakaan di kamar, jangan sembunyikan buku itu di laci tertutup. Letakkan buku tepat di atas bantal tempat tidur atau di tengah meja belajar Anda.",
            "Bagi siswa SMANSA, penataan meja belajar yang bersih, bebas dari notifikasi smartphone, dan menyediakan botol minum serta buku terbuka adalah 80% kunci terbukanya sesi fokus.",
        ],
        callout: {
            title: "Teknik Niat Implementasi:",
            text: "Saya akan [PERILAKU BELAJAR] pada [WAKTU] di [LOKASI]. Contoh: Saya akan menyelesaikan 5 soal matematika pada pukul 16.30 di Perpustakaan Sekolah.",
            badge: "Formula Praktis",
        },
    },
    {
        pageNumber: 13,
        type: "chapter",
        chapterNumber: 3,
        chapterTitle: "Hukum 2: Menjadikannya Menarik (Attractive)",
        bodyParagraphs: [
            "Otak kita digerakkan oleh lonjakan hormon dopamin. Dopamin dilepaskan bukan hanya saat kita menerima hadiah, melainkan saat kita MENGANTISIPASI hadiah.",
            "Gunakan teknik 'Pemaduan Godaan' (Temptation Bundling). Pasangkan kegiatan yang HARUS Anda lakukan dengan kegiatan yang INGIN Anda lakukan.",
            "Contoh: 'Hanya setelah saya membaca 1 bab buku pelajaran Fisika, saya diizinkan mendengarkan playlist musik favorit atau membuka media sosial selama 15 menit.'",
        ],
        quote: {
            text: "Kita cenderung meniru kebiasaan dari tiga kelompok sosial: orang terdekat (keluarga), orang terbanyak (teman seangkatan), dan orang paling berkuasa/berprestasi.",
            author: "James Clear",
        },
    },
    {
        pageNumber: 14,
        type: "chapter",
        chapterNumber: 3,
        chapterTitle: "Hukum 3: Menjadikannya Mudah (Easy)",
        bodyParagraphs: [
            "Energi manusia secara alami mengikuti hukum usaha terkecil (Law of Least Effort). Otak kita selalu mencari jalan yang paling hemat energi.",
            "Bila Anda ingin memulai kebiasaan baru, kurangi gesekan (friction) seminimal mungkin. Siapkan alat tulis, buku teks, dan ringkasan sejak malam sebelumnya.",
            "Kunci membangun kebiasaan bukanlah kesempurnaan pada hari pertama, melainkan frekuensi pengulangan. Lebih baik belajar 15 menit setiap hari daripada belajar 5 jam sekali seminggu.",
        ],
    },
    {
        pageNumber: 15,
        type: "chapter",
        chapterNumber: 3,
        chapterTitle: "Aturan Dua Menit (The Two-Minute Rule)",
        bodyParagraphs: [
            "Ketika Anda memulai kebiasaan baru, waktunya harus kurang dari dua menit.",
            "Alih-alih berniat 'Membaca 50 halaman setiap malam', ubah menjadi 'Membaca satu halaman saja'.",
            "Alih-alih berniat 'Belajar untuk ujian UTBK', ubah menjadi 'Membuka buku catatan saya di atas meja'.",
            "Kebiasaan harus terlebih dahulu dimapankan sebelum bisa disempurnakan. Anda tidak dapat mengoptimalkan kebiasaan yang bahkan belum pernah Anda mulai.",
        ],
        callout: {
            title: "Aturan Dua Menit SMANSA:",
            text: "Cukup duduk di kursi, buka portal perpustakaan digital ini, dan baca dua paragraf. Begitu Anda memulai, kelembaman rasa malas akan hilang dengan sendirinya.",
            badge: "Solusi Prokrastinasi",
        },
    },
    {
        pageNumber: 16,
        type: "chapter",
        chapterNumber: 4,
        chapterTitle: "Hukum 4: Menjadikannya Memuaskan",
        bodyParagraphs: [
            "Apa yang langsung diganjar akan diulang. Apa yang langsung dihukum akan dihindari.",
            "Otak kita berevolusi di lingkungan imbalan langsung (immediate return). Sedangkan pendidikan dan karier adalah lingkungan imbalan tertunda (delayed return).",
            "Untuk mempertahankan kebiasaan baik, berikan sedikit rasa kemenangan instan pada diri Anda. Menggunakan pelacak kebiasaan (habit tracker), mencentang ceklis harian di buku agenda, atau melihat progres bar di profil e-library adalah bentuk kepuasan visual yang sangat kuat.",
        ],
    },
    {
        pageNumber: 17,
        type: "chapter",
        chapterNumber: 4,
        chapterTitle: "Kaidah Jangan Pernah Putus Dua Kali",
        bodyParagraphs: [
            "Dalam perjalanan belajar Anda, pasti ada saatnya Anda sakit, lelah setelah kegiatan ekstrakurikuler, atau ada urusan keluarga yang mendadak.",
            "Satu kali bolos tidak akan menghancurkan kebiasaan Anda. Yang menghancurkan kebiasaan adalah ketika bolos itu terulang untuk kedua kalinya berturut-turut.",
            "Jika hari ini Anda tidak sempat belajar 1 jam, lakukan 5 menit saja. Mempertahankan ritme dasar jauh lebih berharga daripada membiarkan kebiasaan Anda runtuh menjadi nol.",
        ],
        quote: {
            text: "Hari-hari ketika Anda tidak bersemangat belajar adalah hari-hari yang paling menentukan identitas Anda. Melakukan sedikit kemajuan di hari buruk adalah bukti mental pemenang.",
            author: "Prinsip Prestasi SMANSA",
        },
    },
    {
        pageNumber: 18,
        type: "chapter",
        chapterNumber: 4,
        chapterTitle: "Cara Memutus Kebiasaan Buruk",
        bodyParagraphs: [
            "Untuk melenyapkan kebiasaan yang merugikan, cukup balikkan keempat kaidah di atas:",
            "1. Buat Tak Terlihat (Inversion of Cue): Jauhkan HP dari jangkauan tangan saat belajar, letakkan di ruangan lain.",
            "2. Buat Tak Menarik (Inversion of Craving): Pikirkan kembali kerugian besar jika waktu muda Anda terbuang percuma tanpa ilmu.",
            "3. Buat Sulit (Inversion of Response): Pasang kata sandi yang rumit pada aplikasi game atau batasi screen-time.",
            "4. Buat Tak Memuaskan (Inversion of Reward): Miliki partner akuntabilitas (teman belajar) yang saling memantau target harian.",
        ],
    },
    {
        pageNumber: 19,
        type: "diagram",
        chapterTitle: "Matriks Rangkuman Kaidah Perilaku",
        bodyParagraphs: [
            "Simpan tabel rangkuman ini sebagai peta panduan harian Anda:",
        ],
        table: {
            headers: ["Fase Siklus", "Membangun Kebiasaan Baik", "Memutus Kebiasaan Buruk"],
            rows: [
                ["1. Petunjuk", "Jadikan TERLIHAT (Obvious)", "Jadikan TAK TERLIHAT (Invisible)"],
                ["2. Gairah", "Jadikan MENARIK (Attractive)", "Jadikan TAK MENARIK (Unattractive)"],
                ["3. Tanggapan", "Jadikan MUDAH (Easy)", "Jadikan SULIT (Difficult)"],
                ["4. Ganjaran", "Jadikan MEMUASKAN (Satisfying)", "Jadikan TAK MEMUASKAN (Painful)"],
            ],
        },
    },
    {
        pageNumber: 20,
        type: "reflection",
        chapterTitle: "Rencana Aksi Literasi Siswa SMANSA",
        bodyParagraphs: [
            "Tuliskan dan petakan 3 kebiasaan belajar yang ingin Anda mulai minggu ini:",
            "1. Kebiasaan Membaca: Berapa menit Anda akan meluangkan waktu di perpustakaan?",
            "2. Waktu & Lokasi: Di jam berapa dan di sudut perpustakaan mana Anda paling fokus?",
            "3. Mitra Belajar: Siapa teman yang akan saling mengingatkan target belajar bersama?",
        ],
        interactivePrompt: {
            question: "Komitmen Kebiasaan Saya Minggu Ini:",
            placeholder: "Ketik komitmen belajar harian Anda di sini...",
        },
    },
    {
        pageNumber: 21,
        type: "chapter",
        chapterTitle: "Glosarium Istilah Kunci",
        bodyParagraphs: [
            "• Habit Loop: Siklus 4 fase yang mengotomatisasi perilaku manusia (Cue, Craving, Response, Reward).",
            "• Keystone Habit: Kebiasaan induk yang secara otomatis memicu rentetan kebiasaan baik lainnya (contoh: olahraga pagi atau merapikan tempat tidur).",
            "• Habit Stacking: Menautkan kebiasaan baru tepat setelah kebiasaan lama yang sudah mapan.",
            "• Friction: Hambatan atau energi yang diperlukan sebelum sebuah tindakan dapat dimulai.",
            "• Delayed Gratification: Kemampuan menahan kepuasan sesaat demi imbalan berlipat di masa depan.",
        ],
    },
    {
        pageNumber: 22,
        type: "foreword",
        chapterTitle: "Rekomendasi Bacaan Lanjutan di SMANSA",
        bodyParagraphs: [
            "Setelah menyelesaikan buku Atomic Habits, pustakawan menyarankan Anda untuk memperluas cakrawala dengan koleksi berikut di katalog sekolah:",
            "1. 'Deep Work' oleh Cal Newport (Koleksi Rak P-04): Cara mengasah konsentrasi bebas distraksi di dunia yang penuh gangguan digital.",
            "2. 'Bumi Manusia' oleh Pramoedya Ananta Toer (Koleksi Rak F-08): Menumbuhkan ketangguhan karakter dan daya juang lewat sastra sejarah Indonesia.",
            "3. 'Grit: Kekuatan Passion dan Kegigihan' oleh Angela Duckworth (Koleksi Rak P-01): Mengapa kegigihan mengalahkan bakat mentah dalam meraih cita-cita.",
        ],
    },
    {
        pageNumber: 23,
        type: "colophon",
        chapterTitle: "Kartu Catatan Sirkulasi Digital",
        bodyParagraphs: [
            "Buku ini dipinjam melalui Portal Resmi Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi.",
            "Salinan digital dilindungi enkripsi DRM streaming guna memastikan hak penerbit dan mematuhi undang-undang hak cipta Republik Indonesia.",
            "Mari junjung tinggi kejujuran akademik, etika membaca, dan rawatlah kecintaan terhadap buku demi masa depan bangsa yang gemilang.",
        ],
        callout: {
            title: "Motto Literasi SMANSA:",
            text: "Find it. Read it. Grow with it. Landbouw Hebat, Indonesia Bermartabat.",
            badge: "SMANSA BUKITTINGGI",
        },
    },
    {
        pageNumber: 24,
        type: "colophon",
        chapterTitle: "Kolofon & Hak Cipta Koleksi",
        bodyParagraphs: [
            "Judul: Atomic Habits: Perubahan Kecil yang Memberikan Hasil Luar Biasa",
            "Penulis: James Clear",
            "Penerbit Asli: Penguin Random House / Gramedia Pustaka Utama",
            "Kurasi Digital: Tim Literasi & Pustakawan SMAN 1 Bukittinggi",
            "Tahun Terbit: 2018 | ISBN: 978-602-06-3317-6",
            "Hak Cipta Dilindungi Undang-Undang. Disediakan khusus untuk pembelajaran warga sekolah SMA Negeri 1 Bukittinggi.",
        ],
    },
];

// Helper to generate dynamic authentic book pages for any book in DB
export function getBookPages(book: Book, totalPages: number = 24): BookPageContent[] {
    if (book.slug === "atomic-habits") {
        return atomicHabitsPages;
    }

    // Dynamic generator for other books
    const pages: BookPageContent[] = [];
    const authorName = book.authors?.map((a) => a.name).join(", ") || "Penulis Terpilih SMANSA";

    for (let i = 1; i <= totalPages; i++) {
        if (i === 1) {
            pages.push({
                pageNumber: 1,
                type: "cover",
                title: book.title,
                subtitle: `Karya: ${authorName}`,
            });
        } else if (i === 2) {
            pages.push({
                pageNumber: 2,
                type: "toc",
                title: "Daftar Isi Koleksi Digital",
                subtitle: `Perpustakaan SMA Negeri 1 Bukittinggi`,
                bodyParagraphs: [
                    "Silakan klik atau sentuh daftar bab berikut untuk membuka halaman materi yang diinginkan:",
                ],
            });
        } else if (i === 3) {
            pages.push({
                pageNumber: 3,
                type: "foreword",
                chapterTitle: "Prakata & Sambutan Pustakawan",
                bodyParagraphs: [
                    `Selamat membaca "${book.title}", sebuah karya berharga yang tersimpan dalam koleksi Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi.`,
                    `Buku ini dikategorikan dalam koleksi resmi sekolah guna mendukung program penguatan literasi sains, sastra, dan sosial humaniora bagi seluruh siswa.`,
                    "Semoga setiap untaian ilmu dan narasi yang tersaji mampu membuka wawasan baru dan menginspirasi langkah nyata dalam menggapai cita-cita luhur.",
                ],
                quote: {
                    text: `Membaca adalah jembatan emas yang menghubungkan kita dengan pemikiran tokoh-tokoh besar dunia.`,
                    author: "Pustakawan SMAN 1 Bukittinggi",
                },
            });
        } else if (i === 4) {
            pages.push({
                pageNumber: 4,
                type: "chapter",
                chapterTitle: "Sinopsis & Garis Besar Buku",
                bodyParagraphs: [
                    book.synopsis || "Buku referensi kurasi resmi yang memperkaya khazanah keilmuan civitas akademika SMAN 1 Bukittinggi.",
                    "Melalui pembahasan yang runut dan mendalam, karya ini menyajikan perspektif kontekstual yang relevan dengan perkembangan keilmuan terkini serta pembentukan karakter generasi muda.",
                ],
                callout: {
                    title: "Informasi Katalog Perpustakaan:",
                    text: `Lokasi Rak: ${book.shelf_location || "Rak Utama"} | DDC: ${book.ddc_class?.code || "800"} | Tahun: ${book.publication_year || 2024}`,
                    badge: "Data Bibliografi",
                },
            });
        } else if (i === totalPages) {
            pages.push({
                pageNumber: totalPages,
                type: "colophon",
                chapterTitle: "Kolofon & Pengesahan Sirkulasi",
                bodyParagraphs: [
                    `Judul Dokumen: ${book.title}`,
                    `Penulis: ${authorName}`,
                    `ISBN: ${book.isbn || "978-SMANSA-2026"}`,
                    "Platform: Perpustakaan Digital Sunaryaman Musthofa SMAN 1 Bukittinggi",
                    "Disediakan secara terbatas untuk keperluan studi dan pembelajaran mandiri peserta didik.",
                ],
                callout: {
                    title: "Status Sirkulasi:",
                    text: "Tersedia salinan fisik asli di perpustakaan sekolah. Kunjungi gedung perpustakaan untuk membaca edisi cetak.",
                    badge: "Koleksi Resmi SMANSA",
                },
            });
        } else {
            const chapNum = Math.floor((i - 4) / 3) + 1;
            const partNum = ((i - 4) % 3) + 1;
            pages.push({
                pageNumber: i,
                type: i % 4 === 0 ? "diagram" : "chapter",
                chapterNumber: chapNum,
                chapterTitle: `Bab ${chapNum}: Pembahasan Bagian ${partNum}`,
                bodyParagraphs: [
                    `Melanjutkan penelaahan materi dalam ${book.title}, bagian ini menguraikan konsep-konsep kunci yang saling bertaut untuk membangun pemahaman yang komprehensif.`,
                    `Kajian literatur menunjukkan bahwa kemampuan menghubungkan teori dengan penerapan praktis di lapangan merupakan salah satu indikator utama keberhasilan proses belajar siswa di jenjang pendidikan menengah atas.`,
                    `Siswa diajak untuk mencermati fakta-fakta pendukung, menganalisis argumen penulis, serta merumuskan kesimpulan kritis yang dapat dipertanggungjawabkan secara ilmiah.`,
                ],
                callout: partNum === 1 ? {
                    title: "Poin Pembelajaran Mandiri:",
                    text: `Identifikasi ide pokok pada bab ${chapNum} ini dan diskusikan bersama rekan sekelas dalam kegiatan belajar kelompok literasi.`,
                    badge: "Tugas Literasi",
                } : undefined,
            });
        }
    }

    return pages;
}
