import { Head, Link, router } from '@inertiajs/react';
import {
    ArrowRight,
    BookMarked,
    BookOpen,
    Check,
    Compass,
    Newspaper,
    Search,
    Sparkles,
    Users,
} from 'lucide-react';
import React, { useState } from 'react';
import { BookCard } from '../Components/Common/BookCard';
import { SiteShell } from '../Components/Common/SiteShell';
import { Book, LibraryStats, MagazineEdition } from '../types/library';

interface HomeProps {
    stats: LibraryStats;
    popularBooks: Book[];
    latestMagazines: MagazineEdition[];
    settings: {
        library_name: string;
        library_tagline: string;
        operating_hours: string;
        library_address: string;
        contact_phone: string;
    };
}

export default function Home({ stats, popularBooks, latestMagazines, settings }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/catalog', { q: searchQuery.trim() });
        } else {
            router.get('/catalog');
        }
    };

    const statItems = [
        { label: 'Koleksi Judul', value: stats.total_books, icon: BookOpen },
        { label: 'Buku Tersedia', value: stats.available_books, icon: Check },
        { label: 'Penulis Terdata', value: stats.total_authors, icon: Users },
        { label: 'Kategori Ilmu', value: stats.total_categories, icon: Compass },
    ];

    const featureCards = [
        {
            title: 'E-Katalog',
            badge: 'Koleksi',
            badgeColor: 'bg-[#f3e8ff] text-[#6b21a8]',
            desc: 'Cari ketersediaan judul, lokasi rak fisik, dan klasifikasi DDC.',
            href: '/catalog',
            buttonText: 'Buka Katalog',
            icon: BookMarked,
        },
        {
            title: 'E-Magazine',
            badge: 'Terbitan',
            badgeColor: 'bg-[#dbeafe] text-[#1e40af]',
            desc: 'Baca majalah Genta Smansa digital langsung dari browser.',
            href: '/magazines',
            buttonText: 'Baca Edisi',
            icon: Newspaper,
        },
        {
            title: 'Reservasi',
            badge: 'Layanan',
            badgeColor: 'bg-[#dcfce7] text-[#166534]',
            desc: 'Pesan buku favoritmu lebih awal agar siap diambil di meja perpustakaan.',
            href: '/catalog',
            buttonText: 'Mulai Pesan',
            icon: Sparkles,
        },
    ];

    return (
        <SiteShell>
            <Head title="Beranda - Perpustakaan Digital SMAN 1 Bukittinggi" />

            <div className="overflow-hidden bg-white">
                {/* 1. HERO SECTION - ASYMMETRIC FIGMA SPLIT */}
                <section className="relative border-b border-slate-100 bg-white">
                    {/* Subtle decorative dot accents */}
                    <div className="absolute left-[38%] top-12 hidden size-3 rounded-full bg-[#facc15] lg:block" />
                    <div className="absolute left-[42%] top-24 hidden size-2 rounded-full bg-[#fb923c] lg:block" />
                    <div className="absolute right-[12%] top-16 hidden size-3.5 rounded-full bg-[#0B4EA2]/60 lg:block" />

                    <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
                        {/* Hero Left Content */}
                        <div className="fade-up relative z-10">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#0B4EA2]/20 bg-[#EAF4FF] px-4 py-1 text-xs font-bold text-[#0B4EA2]">
                                <Sparkles size={14} />
                                <span>Perpustakaan Digital • SMAN 1 Bukittinggi</span>
                            </div>

                            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
                                Temukan halaman yang{' '}
                                <span className="brush-highlight">menunggumu.</span>
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                                Akses koleksi buku fisik, majalah terbitan digital sekolah, dan khazanah literasi terkurasi untuk mendukung eksplorasi pengetahuan insan Smansa.
                            </p>

                            {/* Search & CTA Row */}
                            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <Link
                                    href="/catalog"
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0B4EA2] px-8 text-sm font-bold text-white shadow-md hover:bg-[#083c7d] hover-lift transition-all shrink-0"
                                >
                                    <span>Cari Buku</span>
                                    <ArrowRight size={16} className="ml-2" />
                                </Link>

                                <form
                                    onSubmit={handleSearch}
                                    className="flex h-12 w-full max-w-md items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-[#0B4EA2] transition-colors"
                                >
                                    <Search size={18} className="text-slate-400 shrink-0" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cari judul, penulis, atau topik..."
                                        className="w-full bg-transparent px-3 text-sm text-[#0F172A] outline-none placeholder:text-slate-400"
                                    />
                                    <button
                                        type="submit"
                                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                                    >
                                        Cari
                                    </button>
                                </form>
                            </div>

                            {/* Quick Tags */}
                            <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="font-medium">Populer:</span>
                                {['Laskar Pelangi', 'Buya Hamka', 'Atomic Habits', 'Bumi Manusia', 'Fisika SMA'].map((tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => router.get('/catalog', { q: tag })}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 hover:border-[#0B4EA2] hover:text-[#0B4EA2] transition-colors"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Hero Right Visual: Figma Blobs & Layered Card Mockup */}
                        <div className="fade-up-delay relative mx-auto h-[440px] w-full max-w-[560px] lg:h-[500px]">
                            {/* Layer 1: Orange Blob */}
                            <div className="figma-blob absolute right-[4%] top-[4%] h-[230px] w-[220px] rotate-12 bg-[#fb923c] opacity-95 sm:h-[300px] sm:w-[280px]" />
                            {/* Layer 2: Yellow Blob */}
                            <div className="figma-blob absolute bottom-[6%] left-[10%] h-[240px] w-[230px] -rotate-12 bg-[#facc15] opacity-95 sm:h-[310px] sm:w-[290px]" />
                            {/* Layer 3: Particle dots grid */}
                            <div className="figma-dots absolute right-[2%] top-[10%] h-32 w-36 opacity-60" />
                            <div className="figma-dots absolute bottom-[10%] left-[4%] h-28 w-32 opacity-50" />

                            {/* Layer 4: Primary Tilted White Card (Figma Style) */}
                            <div className="absolute left-[16%] top-[14%] h-[290px] w-[235px] rotate-[-4deg] rounded-2xl bg-white p-3 soft-shadow sm:h-[350px] sm:w-[280px] transition-transform hover:rotate-0 duration-500">
                                <div className="flex h-full flex-col justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B4EA2]">
                                            Ruang Baca
                                        </span>
                                        <BookMarked size={18} className="text-[#0B4EA2]" />
                                    </div>
                                    <div>
                                        <div className="mb-3 h-1.5 w-14 rounded-full bg-[#facc15]" />
                                        <p className="font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
                                            Buka <br />
                                            satu <br />
                                            bab.
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span>SMANSA BUKITTINGGI</span>
                                        <span>EST. 1956</span>
                                    </div>
                                </div>
                            </div>

                            {/* Layer 5: Floating Secondary Badge Card */}
                            <div className="absolute bottom-[12%] right-[4%] w-[210px] rotate-[6deg] rounded-2xl bg-white p-4 soft-shadow sm:w-[240px] transition-transform hover:rotate-0 duration-500">
                                <div className="flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                        <Sparkles size={20} />
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-[#0F172A]">Koleksi Lengkap</p>
                                        <p className="text-[10px] text-slate-500">Ribuan judul terindeks</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. STATS BAR COUNTER */}
                <section className="border-b border-slate-100 bg-white">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 border-x border-slate-100">
                        {statItems.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-center gap-4 px-6 py-6 sm:px-8">
                                <span className="grid size-12 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2] shrink-0">
                                    <Icon size={22} />
                                </span>
                                <div>
                                    <p className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                                        {value}
                                    </p>
                                    <p className="font-mono-display text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        {label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. FEATURE SECTION 1: CHECKLIST & MACOS 3-CARD WINDOW (Figma Middle Section) */}
                <section className="relative border-b border-slate-100 bg-slate-50/50 py-20 sm:py-28">
                    <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
                        {/* Left Side: Checklist */}
                        <div>
                            <span className="font-mono-display text-xs font-bold uppercase tracking-[0.18em] text-[#0B4EA2]">
                                Satu Pintu Untuk Semua
                            </span>
                            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                                Jelajah, simpan, dan baca dengan{' '}
                                <span className="brush-highlight">caramu.</span>
                            </h2>
                            <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                                Perpustakaan hadir dalam format digital untuk membuat interaksi membaca di lingkungan SMAN 1 Bukittinggi terasa lebih dekat, cepat, dan terorganisir.
                            </p>

                            <div className="mt-8 space-y-4">
                                {[
                                    'Cari ketersediaan judul, lokasi rak fisik, dan nomor DDC.',
                                    'Lihat status ketersediaan salinan buku sebelum berkunjung.',
                                    'Reservasi mandiri koleksi buku favoritmu dari mana saja.',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 text-sm text-slate-700 sm:text-base">
                                        <span className="mt-0.5 grid size-5 place-items-center rounded-full bg-[#dcfce7] text-[#166534] shrink-0">
                                            <Check size={13} strokeWidth={3} />
                                        </span>
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-9">
                                <Link
                                    href="/information"
                                    className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4EA2] hover:text-[#083c7d] hover:gap-3 transition-all"
                                >
                                    <span>Kenali layanan perpustakaan</span>
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </div>

                        {/* Right Side: Yellow Blob + macOS Window Mockup with 3 Overlapping Feature Cards */}
                        <div className="relative min-h-[420px]">
                            {/* Background Yellow & Warm Blob */}
                            <div className="figma-blob absolute -right-4 top-2 h-72 w-72 bg-[#facc15] opacity-90 sm:h-96 sm:w-96" />
                            <div className="figma-blob-alt absolute -left-4 bottom-2 h-64 w-64 bg-[#fb923c]/40" />
                            <div className="figma-dots absolute right-2 top-2 h-32 w-32 opacity-40" />

                            {/* macOS Window Frame */}
                            <div className="relative z-10 mx-auto w-full max-w-[500px] rounded-2xl border-4 border-white bg-white p-5 soft-shadow">
                                {/* Window 3-dot Controls */}
                                <div className="mb-5 flex items-center gap-1.5 border-b border-slate-100 pb-3">
                                    <span className="size-3 rounded-full bg-[#fb7185]" />
                                    <span className="size-3 rounded-full bg-[#facc15]" />
                                    <span className="size-3 rounded-full bg-[#22c55e]" />
                                    <span className="ml-3 font-mono-display text-[10px] font-semibold text-slate-400">
                                        portal-layanan-smansa
                                    </span>
                                </div>

                                {/* 3 Cards Grid */}
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {featureCards.map((card) => {
                                        const CardIcon = card.icon;
                                        return (
                                            <div
                                                key={card.title}
                                                className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow"
                                            >
                                                <div>
                                                    <span
                                                        className={`inline-block rounded px-2 py-0.5 text-[9px] font-bold ${card.badgeColor}`}
                                                    >
                                                        {card.badge}
                                                    </span>
                                                    <div className="mt-3 flex items-center gap-1.5">
                                                        <CardIcon size={16} className="text-[#0B4EA2]" />
                                                        <h3 className="font-display text-sm font-bold text-[#0F172A]">
                                                            {card.title}
                                                        </h3>
                                                    </div>
                                                    <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
                                                        {card.desc}
                                                    </p>
                                                </div>
                                                <Link
                                                    href={card.href}
                                                    className="mt-4 block rounded-lg border border-[#0B4EA2]/30 py-1.5 text-center text-[10px] font-bold text-[#0B4EA2] hover:bg-[#0B4EA2] hover:text-white transition-colors"
                                                >
                                                    {card.buttonText}
                                                </Link>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. POPULAR BOOKS CATALOG SHOWCASE */}
                <section className="border-b border-slate-100 bg-white py-20 sm:py-24">
                    <div className="mx-auto max-w-7xl px-6 sm:px-8">
                        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                            <div>
                                <span className="font-mono-display text-xs font-bold uppercase tracking-[0.18em] text-[#0B4EA2]">
                                    Koleksi Unggulan
                                </span>
                                <h2 className="mt-2 font-display text-3xl font-extrabold text-[#0F172A] sm:text-4xl">
                                    Buku pilihan minggu ini.
                                </h2>
                            </div>
                            <Link
                                href="/catalog"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4EA2] hover:gap-3 transition-all"
                            >
                                <span>Lihat semua koleksi</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                            {popularBooks.length > 0 ? (
                                popularBooks.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))
                            ) : (
                                <div className="col-span-full rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500">
                                    Belum ada koleksi buku yang ditampilkan.
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* 5. EDITORIAL / MAGAZINE SHOWCASE (Figma Section 3) */}
                {latestMagazines.length > 0 && (
                    <section className="relative border-b border-slate-100 bg-slate-50/70 py-20 sm:py-28">
                        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
                            {/* Left Description */}
                            <div>
                                <span className="font-mono-display text-xs font-bold uppercase tracking-[0.18em] text-[#0B4EA2]">
                                    Publikasi Digital
                                </span>
                                <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight text-[#0F172A] sm:text-4xl">
                                    Baca karya & cerita terbaru warga{' '}
                                    <span className="brush-highlight">sekolah.</span>
                                </h2>
                                <p className="mt-6 text-base leading-relaxed text-slate-600 sm:text-lg">
                                    Majalah Genta Smansa kini hadir dalam format digital. Akses artikel inspiratif, kabar ekstrakurikuler, dan opini siswa langsung dari gawai Anda.
                                </p>
                                <div className="mt-8">
                                    <Link
                                        href="/magazines"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#083c7d] hover-lift transition-all"
                                    >
                                        <span>Semua Edisi Majalah</span>
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Right Visual: Orange Blob + Magazine Cards */}
                            <div className="relative min-h-[360px]">
                                <div className="figma-blob absolute -right-6 top-0 h-80 w-80 bg-[#fb923c] opacity-80" />
                                <div className="figma-dots absolute left-0 bottom-0 h-32 w-32 opacity-40" />

                                <div className="relative z-10 grid gap-4 sm:grid-cols-3">
                                    {latestMagazines.map((mag) => (
                                        <Link
                                            key={mag.id}
                                            href={`/magazines/${mag.id}`}
                                            className="group rounded-2xl bg-white p-3.5 soft-shadow transition hover:-translate-y-1.5 duration-300"
                                        >
                                            <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                                                {mag.cover_image ? (
                                                    <img
                                                        src={mag.cover_image}
                                                        alt={mag.edition_title}
                                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="grid h-full place-items-center text-slate-400">
                                                        <Newspaper size={32} />
                                                    </div>
                                                )}
                                            </div>
                                            <p className="mt-3 font-mono-display text-[10px] font-bold uppercase tracking-wider text-[#0B4EA2]">
                                                {mag.edition_number} • {mag.year}
                                            </p>
                                            <h4 className="mt-1 line-clamp-1 font-display text-sm font-bold text-[#0F172A] group-hover:text-[#0B4EA2] transition-colors">
                                                {mag.edition_title}
                                            </h4>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. FULL-WIDTH CTA BANNER (Figma Section 4 - Gold Background & Bold Orange Button) */}
                <section className="bg-[#facc15] px-6 py-24 sm:px-8 lg:py-28">
                    <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                        <span className="rounded-full bg-[#0F172A]/10 px-4 py-1 text-xs font-extrabold uppercase tracking-wider text-[#0F172A]">
                            Ayo Membaca
                        </span>
                        <h2 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
                            Sudah siap menemukan <br className="hidden sm:inline" />
                            bacaan berikutnya?
                        </h2>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-[#0F172A]/85 sm:text-lg">
                            Mulai dari satu buku, lalu lihat ke mana rasa ingin tahu dan pengetahuanmu membawa masa depanmu.
                        </p>
                        <Link
                            href="/catalog"
                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#ea580c] px-9 py-4 text-base font-extrabold text-white shadow-lg hover:bg-[#c2410c] hover:scale-105 transition-all"
                        >
                            <span>Cari Buku Sekarang</span>
                            <ArrowRight size={18} className="ml-2" />
                        </Link>
                    </div>
                </section>
            </div>
        </SiteShell>
    );
}
