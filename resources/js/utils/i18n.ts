import { useEffect, useState } from 'react';

export type Language = 'id' | 'en' | 'de';

export const TRANSLATIONS: Record<Language, Record<string, string>> = {
    id: {
        nav_home: 'Beranda',
        nav_catalog: 'Katalog',
        nav_magazine: 'E-Magazine',
        nav_bulletin: 'Buletin',
        nav_events: 'Event & Duta',
        nav_works: 'Karya Siswa',
        nav_ranking: 'Ranking',
        nav_about: 'Tentang',
        nav_contact: 'Kontak',
        nav_login: 'Masuk',
        nav_my_space: 'Ruang Saya',
        nav_search_aria: 'Cari buku',

        hero_tagline: 'Perpustakaan Sunaryaman Musthofa',
        hero_sub: 'Portal literasi digital SMAN 1 Bukittinggi. Temukan ribuan koleksi buku, majalah sekolah, dan sumber belajar terbaik.',
        hero_search_placeholder: 'Cari judul buku, penulis, atau kategori...',
        hero_search_btn: 'Cari',
        stat_collections: 'koleksi',
        stat_categories: 'kategori',
        stat_available: 'tersedia',
        hero_badge_title: 'Terbuka untuk semua',
        hero_badge_sub: 'Baca lebih banyak, tumbuh lebih jauh.',

        sec_all_in_one_title: 'Semua ada di satu tempat',
        sec_all_in_one_sub: 'Mulai dari buku pelajaran, novel, karya siswa, hingga majalah dan buletin sekolah.',
        sec_books_latest: 'Buku terbaru',
        sec_see_all: 'Lihat semua',
        sec_borrow_easy_title: 'Pinjam buku dengan mudah',
        sec_borrow_easy_sub: 'Reservasi buku secara online, ambil langsung di meja sirkulasi perpustakaan.',
        sec_borrow_rule: 'Maks. 3 buku • 7 hari pinjam',
        sec_magazine_latest: 'E-Magazine & Buletin terbaru',
        sec_ready_title: 'Siap mulai membaca?',
        sec_ready_sub: 'Koleksi baru selalu hadir. Temukan buku favoritmu dan mulai membaca sekarang.',
        sec_find_book: 'Cari Buku',

        status_available: 'Tersedia',
        status_borrowed: 'Dipinjam',
        btn_view_reserve: 'Lihat & Reservasi',
        btn_view_detail: 'Lihat detail',
        btn_read_ebook: 'Baca E-Book',

        theme_light: 'Mode Terang',
        theme_dark: 'Mode Gelap',
        lang_id: 'Indonesia',
        lang_en: 'English',
        lang_de: 'Deutsch',
    },
    en: {
        nav_home: 'Home',
        nav_catalog: 'Catalog',
        nav_magazine: 'E-Magazine',
        nav_bulletin: 'Bulletin',
        nav_events: 'Events & Amb.',
        nav_works: 'Student Works',
        nav_ranking: 'Rankings',
        nav_about: 'About',
        nav_contact: 'Contact',
        nav_login: 'Log In',
        nav_my_space: 'My Space',
        nav_search_aria: 'Search books',

        hero_tagline: 'Sunaryaman Musthofa Library',
        hero_sub: 'Digital library portal of SMAN 1 Bukittinggi. Discover thousands of curated books, school magazines, and learning resources.',
        hero_search_placeholder: 'Search by book title, author, or category...',
        hero_search_btn: 'Search',
        stat_collections: 'books',
        stat_categories: 'categories',
        stat_available: 'available',
        hero_badge_title: 'Open for Everyone',
        hero_badge_sub: 'Read more, grow further.',

        sec_all_in_one_title: 'Everything in one place',
        sec_all_in_one_sub: 'From textbooks and novels to student creative works, school magazines, and bulletins.',
        sec_books_latest: 'Latest Books',
        sec_see_all: 'View All',
        sec_borrow_easy_title: 'Borrow books with ease',
        sec_borrow_easy_sub: 'Reserve your books online and pick them up at the library circulation desk.',
        sec_borrow_rule: 'Max. 3 books • 7 days loan',
        sec_magazine_latest: 'Latest E-Magazines & Bulletins',
        sec_ready_title: 'Ready to start reading?',
        sec_ready_sub: 'New arrivals await you. Discover your next favorite book and dive in today.',
        sec_find_book: 'Find Books',

        status_available: 'Available',
        status_borrowed: 'Borrowed',
        btn_view_reserve: 'View & Reserve',
        btn_view_detail: 'View Details',
        btn_read_ebook: 'Read E-Book',

        theme_light: 'Light Mode',
        theme_dark: 'Dark Mode',
        lang_id: 'Indonesian',
        lang_en: 'English',
        lang_de: 'German',
    },
    de: {
        nav_home: 'Startseite',
        nav_catalog: 'Katalog',
        nav_magazine: 'E-Magazin',
        nav_bulletin: 'Bulletin',
        nav_events: 'Veranstaltungen',
        nav_works: 'Schülerwerke',
        nav_ranking: 'Rangliste',
        nav_about: 'Über uns',
        nav_contact: 'Kontakt',
        nav_login: 'Anmelden',
        nav_my_space: 'Mein Bereich',
        nav_search_aria: 'Bücher suchen',

        hero_tagline: 'Sunaryaman Musthofa Bibliothek',
        hero_sub: 'Das digitale Bibliotheksportal der SMAN 1 Bukittinggi. Entdecken Sie Tausende von Büchern, Schulmagazinen und Bildungsressourcen.',
        hero_search_placeholder: 'Nach Buchtitel, Autor oder Kategorie suchen...',
        hero_search_btn: 'Suchen',
        stat_collections: 'Bücher',
        stat_categories: 'Kategorien',
        stat_available: 'Verfügbar',
        hero_badge_title: 'Offen für alle',
        hero_badge_sub: 'Mehr lesen, weiter wachsen.',

        sec_all_in_one_title: 'Alles an einem Ort',
        sec_all_in_one_sub: 'Von Lehrbüchern und Romanen bis hin zu Schüleraufsätzen, Magazinen und Newslettern.',
        sec_books_latest: 'Neueste Bücher',
        sec_see_all: 'Alle ansehen',
        sec_borrow_easy_title: 'Bücher einfach ausleihen',
        sec_borrow_easy_sub: 'Reservieren Sie Bücher online und holen Sie sie am Bibliotheksschalter ab.',
        sec_borrow_rule: 'Max. 3 Bücher • 7 Tage Ausleihe',
        sec_magazine_latest: 'Aktuelle E-Magazine & Bulletins',
        sec_ready_title: 'Bereit zu lesen?',
        sec_ready_sub: 'Neue Bücher erwarten Sie. Finden Sie Ihr Lieblingsbuch und fangen Sie heute an.',
        sec_find_book: 'Bücher finden',

        status_available: 'Verfügbar',
        status_borrowed: 'Ausgeliehen',
        btn_view_reserve: 'Ansehen & Reservieren',
        btn_view_detail: 'Details ansehen',
        btn_read_ebook: 'E-Book lesen',

        theme_light: 'Heller Modus',
        theme_dark: 'Dunkler Modus',
        lang_id: 'Indonesisch',
        lang_en: 'Englisch',
        lang_de: 'Deutsch',
    },
};

export function getInitialLanguage(): Language {
    if (typeof window === 'undefined') return 'id';
    const saved = localStorage.getItem('smansa-lang') as Language;
    if (saved && ['id', 'en', 'de'].includes(saved)) {
        return saved;
    }
    return 'id';
}

export function useI18n() {
    const [lang, setLangState] = useState<Language>(getInitialLanguage);

    useEffect(() => {
        const handleStorage = () => {
            const current = getInitialLanguage();
            setLangState(current);
        };
        window.addEventListener('storage', handleStorage);
        window.addEventListener('smansa-lang-changed', handleStorage);
        return () => {
            window.removeEventListener('storage', handleStorage);
            window.removeEventListener('smansa-lang-changed', handleStorage);
        };
    }, []);

    const setLanguage = (newLang: Language) => {
        setLangState(newLang);
        if (typeof window !== 'undefined') {
            localStorage.setItem('smansa-lang', newLang);
            window.dispatchEvent(new Event('smansa-lang-changed'));
        }
    };

    const t = (key: string): string => {
        return TRANSLATIONS[lang]?.[key] || TRANSLATIONS['id']?.[key] || key;
    };

    return { lang, setLanguage, t };
}
