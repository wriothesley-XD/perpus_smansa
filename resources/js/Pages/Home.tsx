import { Head, Link, router } from '@inertiajs/react';
import { animate, motion, useInView } from 'framer-motion';
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
import React, { useEffect, useRef, useState } from 'react';
import { BookCard } from '../Components/Common/BookCard';
import { SiteShell } from '../Components/Common/SiteShell';
import { Book, LibraryStats, MagazineEdition } from '../types/library';

const MotionLink = motion.create(Link);

// Fade + slide-up saat section masuk viewport
const sectionFade = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
};

const sectionViewport = { once: true, amount: 0.2 };

// Hover halus: scale 1.02 + shadow (transisi 250ms)
const hoverGlow = {
    scale: 1.02,
    boxShadow: '0 20px 35px -8px rgba(11, 78, 162, 0.12), 0 8px 10px -4px rgba(0, 0, 0, 0.04)',
};

const hoverTransition = { duration: 0.25, ease: 'easeOut' as const };

// Hover chip "Populer": scale halus saja (200ms)
const chipHoverTransition = { duration: 0.2, ease: 'easeOut' as const };

// Hover tombol "Cari Buku": scale 1.03 + shadow tipis (200ms)
const ctaHover = {
    scale: 1.03,
    y: -4,
    boxShadow: '0 12px 24px -8px rgba(11, 78, 162, 0.35)',
};

const ctaHoverTransition = { duration: 0.2, ease: 'easeOut' as const };

// Hero kiri: fade + slide-up 20px berurutan saat load (stagger 0.1s antar elemen)
const heroStagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
};

const heroItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// Hero kanan (kartu RUANG BACA + blob): fade + scale-in kecil saat load
const heroVisual = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' as const, delay: 0.2 } },
};

// Angka statistik menghitung dari 0 saat terlihat di viewport
function CountUp({ value, duration = 1.4 }: { value: number; duration?: number }) {
    const numberRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(numberRef, { once: true, amount: 0.5 });

    useEffect(() => {
        if (!isInView) {
            return;
        }

        const controls = animate(0, value, {
            duration,
            ease: 'easeOut',
            onUpdate: (latest) => {
                if (numberRef.current) {
                    numberRef.current.textContent = String(Math.round(latest));
                }
            },
        });

        return () => controls.stop();
    }, [isInView, value, duration]);

    return <span ref={numberRef}>0</span>;
}

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
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFade}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="relative border-b border-slate-100 bg-white"
                >
                    {/* Subtle decorative dot accents */}
                    <motion.div
                        className="absolute left-[38%] top-12 hidden size-3 rounded-full bg-[#facc15] lg:block"
                        animate={{ y: [0, -6] }}
                        transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0 }}
                        style={{ willChange: 'transform' }}
                    />
                    <motion.div
                        className="absolute left-[42%] top-24 hidden size-2 rounded-full bg-[#fb923c] lg:block"
                        animate={{ y: [0, -7] }}
                        transition={{ duration: 2.3, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0.6 }}
                        style={{ willChange: 'transform' }}
                    />
                    <div className="absolute right-[12%] top-16 hidden size-3.5 rounded-full bg-[#0B4EA2]/60 lg:block" />

                    <div className="relative mx-auto grid min-h-[660px] max-w-7xl items-center gap-12 px-6 py-14 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-16 lg:py-20">
                        {/* Hero Left Content */}
                        <motion.div variants={heroStagger} initial="hidden" animate="visible" className="relative z-10">
                            <motion.div variants={heroItem} className="inline-flex items-center gap-2 rounded-full border border-[#0B4EA2]/20 bg-[#EAF4FF] px-4 py-1 text-xs font-bold text-[#0B4EA2]">
                                <Sparkles size={14} />
                                <span>Perpustakaan Digital • SMAN 1 Bukittinggi</span>
                            </motion.div>

                            <motion.h1 variants={heroItem} className="mt-6 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-[#0F172A] sm:text-5xl lg:text-6xl">
                                Temukan halaman yang{' '}
                                <span className="brush-highlight">menunggumu.</span>
                            </motion.h1>

                            <motion.p variants={heroItem} className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
                                Akses koleksi buku fisik, majalah terbitan digital sekolah, dan khazanah literasi terkurasi untuk mendukung eksplorasi pengetahuan insan Smansa.
                            </motion.p>

                            {/* Search & CTA Row */}
                            <motion.div variants={heroItem} className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                <MotionLink
                                    href="/catalog"
                                    className="inline-flex h-12 items-center justify-center rounded-xl bg-[#0B4EA2] px-8 text-sm font-bold text-white shadow-md hover:bg-[#083c7d] transition-colors duration-300 shrink-0"
                                    whileHover={ctaHover}
                                    transition={ctaHoverTransition}
                                >
                                    <span>Cari Buku</span>
                                    <ArrowRight size={16} className="ml-2" />
                                </MotionLink>

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
                                    <motion.button
                                        type="submit"
                                        className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                                        whileHover={hoverGlow}
                                        transition={hoverTransition}
                                    >
                                        Cari
                                    </motion.button>
                                </form>
                            </motion.div>

                            {/* Quick Tags */}
                            <motion.div variants={heroItem} className="mt-5 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                                <span className="font-medium">Populer:</span>
                                {['Laskar Pelangi', 'Buya Hamka', 'Atomic Habits', 'Bumi Manusia', 'Fisika SMA'].map((tag) => (
                                    <motion.button
                                        key={tag}
                                        type="button"
                                        onClick={() => router.get('/catalog', { q: tag })}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 hover:border-[#0B4EA2] hover:text-[#0B4EA2] transition-colors"
                                        whileHover={{ scale: 1.05 }}
                                        transition={chipHoverTransition}
                                    >
                                        {tag}
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Hero Right Visual: Figma Blobs & Layered Card Mockup */}
                        <motion.div variants={heroVisual} initial="hidden" animate="visible" className="relative mx-auto h-[440px] w-full max-w-[560px] lg:h-[500px]">
                            {/* Layer 1: Orange Blob */}
                            <motion.div
                                className="figma-blob absolute right-[4%] top-[4%] h-[230px] w-[220px] rotate-12 bg-[#fb923c] opacity-95 sm:h-[300px] sm:w-[280px]"
                                animate={{ y: [0, -10] }}
                                transition={{ duration: 2.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0.9 }}
                                style={{ willChange: 'transform' }}
                            />
                            {/* Layer 2: Yellow Blob */}
                            <motion.div
                                className="figma-blob absolute bottom-[6%] left-[10%] h-[240px] w-[230px] -rotate-12 bg-[#facc15] opacity-95 sm:h-[310px] sm:w-[290px]"
                                animate={{ y: [0, -11] }}
                                transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 1.2 }}
                                style={{ willChange: 'transform' }}
                            />
                            {/* Layer 3: Particle dots grid */}
                            <div className="figma-dots absolute right-[2%] top-[10%] h-32 w-36 opacity-60" />
                            <div className="figma-dots absolute bottom-[10%] left-[4%] h-28 w-32 opacity-50" />

                            {/* Layer 4: Primary Tilted White Card (Figma Style) */}
                            <motion.div
                                className="absolute left-[16%] top-[14%] h-[290px] w-[235px] rotate-[-4deg] rounded-2xl bg-white p-3 soft-shadow sm:h-[350px] sm:w-[280px] transition-[rotate] hover:rotate-0 duration-500"
                                animate={{ y: [0, -12], rotate: [-2, 2] }}
                                transition={{ duration: 2.6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 1.5 }}
                                style={{ willChange: 'transform' }}
                            >
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
                            </motion.div>

                            {/* Layer 5: Floating Secondary Badge Card */}
                            <motion.div
                                className="absolute bottom-[12%] right-[4%] w-[210px] rotate-[6deg] rounded-2xl bg-white p-4 soft-shadow sm:w-[240px] transition-[rotate] hover:rotate-0 duration-500"
                                animate={{ y: [0, -8] }}
                                transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse', delay: 0.3 }}
                                style={{ willChange: 'transform' }}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="grid size-10 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                        <Sparkles size={20} />
                                    </span>
                                    <div>
                                        <p className="text-xs font-bold text-[#0F172A]">Koleksi Lengkap</p>
                                        <p className="text-[10px] text-slate-500">Ribuan judul terindeks</p>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.section>

                {/* 2. STATS BAR COUNTER */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFade}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="border-b border-slate-100 bg-white"
                >
                    <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y sm:divide-y-0 sm:grid-cols-4 border-x border-slate-100">
                        {statItems.map(({ label, value, icon: Icon }) => (
                            <div key={label} className="flex items-center gap-4 px-6 py-6 sm:px-8">
                                <span className="grid size-12 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2] shrink-0">
                                    <Icon size={22} />
                                </span>
                                <div>
                                    <p className="text-2xl font-extrabold text-[#0F172A] sm:text-3xl">
                                        <CountUp value={value} />
                                    </p>
                                    <p className="font-mono-display text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                        {label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

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
                                            <motion.div
                                                key={card.title}
                                                className="flex flex-col justify-between rounded-xl border border-slate-100 bg-white p-3.5 shadow-sm hover:shadow-md transition-shadow"
                                                whileHover={{ scale: 1.02 }}
                                                transition={hoverTransition}
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
                                                <MotionLink
                                                    href={card.href}
                                                    className="mt-4 block rounded-lg border border-[#0B4EA2]/30 py-1.5 text-center text-[10px] font-bold text-[#0B4EA2] hover:bg-[#0B4EA2] hover:text-white transition-colors"
                                                    whileHover={hoverGlow}
                                                    transition={hoverTransition}
                                                >
                                                    {card.buttonText}
                                                </MotionLink>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. POPULAR BOOKS CATALOG SHOWCASE */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFade}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="border-b border-slate-100 bg-white py-20 sm:py-24"
                >
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
                                    <motion.div
                                        key={book.id}
                                        className="h-full [&>a]:h-full"
                                        whileHover={hoverGlow}
                                        transition={hoverTransition}
                                    >
                                        <BookCard book={book} />
                                    </motion.div>
                                ))
                            ) : (
                                <div className="col-span-full rounded-2xl border border-dashed border-slate-200 p-12 text-center text-sm text-slate-500">
                                    Belum ada koleksi buku yang ditampilkan.
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>

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
                                    <MotionLink
                                        href="/magazines"
                                        className="inline-flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-6 py-3 text-sm font-bold text-white shadow-sm hover:bg-[#083c7d] transition-colors duration-300"
                                        whileHover={{ ...hoverGlow, y: -4 }}
                                        transition={hoverTransition}
                                    >
                                        <span>Semua Edisi Majalah</span>
                                        <ArrowRight size={16} />
                                    </MotionLink>
                                </div>
                            </div>

                            {/* Right Visual: Orange Blob + Magazine Cards */}
                            <div className="relative min-h-[360px]">
                                <div className="figma-blob absolute -right-6 top-0 h-80 w-80 bg-[#fb923c] opacity-80" />
                                <div className="figma-dots absolute left-0 bottom-0 h-32 w-32 opacity-40" />

                                <div className="relative z-10 grid gap-4 sm:grid-cols-3">
                                    {latestMagazines.map((mag) => (
                                        <MotionLink
                                            key={mag.id}
                                            href={`/magazines/${mag.id}`}
                                            className="group rounded-2xl bg-white p-3.5 soft-shadow"
                                            whileHover={{ ...hoverGlow, y: -6 }}
                                            transition={hoverTransition}
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
                                        </MotionLink>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 6. FULL-WIDTH CTA BANNER (Figma Section 4 - Gold Background & Bold Orange Button) */}
                <motion.section
                    initial="hidden"
                    whileInView="visible"
                    viewport={sectionViewport}
                    variants={sectionFade}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="bg-[#facc15] px-6 py-24 sm:px-8 lg:py-28"
                >
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
                        <MotionLink
                            href="/catalog"
                            className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#ea580c] px-9 py-4 text-base font-extrabold text-white shadow-lg hover:bg-[#c2410c] transition-colors duration-300"
                            whileHover={hoverGlow}
                            transition={hoverTransition}
                        >
                            <span>Cari Buku Sekarang</span>
                            <ArrowRight size={18} className="ml-2" />
                        </MotionLink>
                    </div>
                </motion.section>
            </div>
        </SiteShell>
    );
}
