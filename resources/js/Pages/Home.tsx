import { Link } from "@inertiajs/react";
import {
    ArrowRight,
    ArrowUpRight,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Headphones,
    Search,
    Trophy,
    BookOpen,
    Newspaper,
    PenTool,
    Phone,
} from "lucide-react";
import React, { useRef } from "react";
import SiteShell from "../Components/Common/SiteShell";
import { BookCard } from "../Components/Common/BookCard";
import { CardSkeleton } from "../Components/Common/Skeleton";
import { AnimatedNumber } from "../Components/Common/AnimatedNumber";
import { ScrollReveal } from "../Components/Common/ScrollReveal";
import {
    BrushUnderline,
    DotCluster,
    DoodleBook,
    DoodleBulb,
    DoodleChat,
    DoodleGlasses,
    DoodleGraduationCap,
    DoodleTote,
    SparkleFourPoint,
} from "../Components/Common/Ornaments";
import { Book, Event, LibraryStats, MagazineEdition, ReaderRank, SmansaWork } from "../types/library";
import { useI18n } from "../utils/i18n";

interface HomeProps {
    stats: LibraryStats;
    popularBooks: Book[];
    latestMagazines: (MagazineEdition & { magazine?: { title: string; slug: string } })[];
    topReaders?: ReaderRank[];
    upcomingEvents?: Event[];
    latestPodcasts?: Event[];
    featuredWorks?: SmansaWork[];
    settings?: { library_name: string; library_tagline: string; operating_hours: string; library_address: string; contact_phone: string };
}

export default function Home({
    stats = { total_books: 0, available_books: 0, total_authors: 0, total_categories: 0 },
    popularBooks = [],
    latestMagazines = [],
    topReaders = [],
    upcomingEvents = [],
    latestPodcasts = [],
    featuredWorks = [],
}: HomeProps) {
    const { t } = useI18n();
    const booksScrollRef = useRef<HTMLDivElement>(null);

    const scrollBooks = (direction: "left" | "right") => {
        if (booksScrollRef.current) {
            const amount = 320;
            booksScrollRef.current.scrollBy({
                left: direction === "left" ? -amount : amount,
                behavior: "smooth",
            });
        }
    };

    return (
        <SiteShell>
            <div className="bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100 overflow-hidden">

                {/* ── 1. HERO SECTION (Identical to Left Artboard) ── */}
                <section className="relative px-5 pt-12 pb-16 sm:px-8 lg:px-14 lg:pt-20 lg:pb-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
                        
                        {/* Left Content */}
                        <ScrollReveal immediate className="relative z-10">
                            <h1 className="font-display text-[clamp(2.8rem,5.5vw,5.2rem)] font-extrabold leading-[1.06] tracking-tight text-[#152238] dark:text-white">
                                <span>Sunaryaman</span>
                                <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">Musthofa</span>
                                    <BrushUnderline />
                                </span>
                            </h1>

                            <p className="mt-6 max-w-lg text-sm sm:text-base leading-relaxed text-[#64748b] dark:text-slate-300">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque tempor. Perpustakaan digital SMA Negeri 1 Bukittinggi terpadu dan modern.
                            </p>

                            {/* Action Row: Blue Pill Button + Secondary Note */}
                            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                                <Link
                                    href="/catalog"
                                    className="inline-flex items-center justify-center rounded-full bg-[#2699fb] px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1783df] hover:shadow-lg active:scale-95"
                                >
                                    Cari Buku
                                </Link>
                                <p className="max-w-[220px] text-xs leading-relaxed text-gray-400 dark:text-slate-400">
                                    Lorem ipsum dolor sit amet consectetur adipiscing elit.
                                </p>
                            </div>
                        </ScrollReveal>

                        {/* Right Visual: Two Organic Blob Portraits */}
                        <ScrollReveal immediate delay={150} className="relative mx-auto flex h-[380px] w-full max-w-[460px] items-center justify-center sm:h-[440px] lg:h-[480px]">
                            {/* Decorative sparkles & dots */}
                            <SparkleFourPoint size={20} color="#FFC533" className="absolute left-6 top-8 z-20 animate-pulse" />
                            <SparkleFourPoint size={16} color="#FF8E4F" className="absolute right-10 top-14 z-20" />
                            <DotCluster color="#FFC533" className="absolute -left-2 bottom-12 opacity-80" />
                            <DotCluster color="#FF8E4F" className="absolute right-2 -bottom-2 opacity-60" />

                            {/* Blob 1 (Yellow Background - Left Person) */}
                            <div className="relative z-10 -mr-6 -mt-6">
                                <div className="blob-yellow flex size-52 sm:size-64 items-center justify-center bg-[#FFC533] p-2.5 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="blob-yellow h-full w-full overflow-hidden bg-white/10">
                                        <img
                                            src="/images/hero_person1.jpg"
                                            alt="Pembaca Sunaryaman Musthofa"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/images/about_building.jpg";
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Blob 2 (Orange Background - Right Person) */}
                            <div className="relative z-20 -ml-4 mt-12 sm:mt-16">
                                <div className="blob-orange flex size-48 sm:size-60 items-center justify-center bg-[#FF8E4F] p-2.5 shadow-xl transition-transform duration-300 hover:scale-[1.02]">
                                    <div className="blob-orange h-full w-full overflow-hidden bg-white/10">
                                        <img
                                            src="/images/hero_person2.jpg"
                                            alt="Siswa SMANSA"
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = "/images/hero_library.jpg";
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </section>

                {/* ── 2. SEMUA ADA DI SATU TEMPAT (Identical to Left Artboard) ── */}
                <section className="relative px-5 py-16 sm:px-8 lg:px-14 lg:py-24 border-t border-gray-100 dark:border-slate-800/80">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                        
                        {/* Left Copy */}
                        <ScrollReveal>
                            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.12] tracking-tight text-[#152238] dark:text-white">
                                Semua ada di
                                <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">satu tempat</span>
                                    <BrushUnderline />
                                </span>
                            </h2>

                            {/* Bullet checklist with checkmarks */}
                            <ul className="mt-6 space-y-3 text-sm text-[#475569] dark:text-slate-300">
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-[#152238] dark:text-sky-400">✓</span>
                                    <span>Lorem ipsum dolor sit amet</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-[#152238] dark:text-sky-400">✓</span>
                                    <span>Lorem ipsum dolor sit amet</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <span className="font-bold text-[#152238] dark:text-sky-400">✓</span>
                                    <span>Lorem ipsum dolor sit amet</span>
                                </li>
                            </ul>

                            <Link
                                href="/catalog"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2699fb] hover:underline"
                            >
                                Lihat semua fitur <ArrowRight size={15} />
                            </Link>
                        </ScrollReveal>

                        {/* Right: Curved backdrop + 3 floating cards with photo headers */}
                        <div className="relative">
                            {/* Curved organic yellow-orange backdrop */}
                            <div className="pointer-events-none absolute -inset-4 sm:-inset-8 rounded-[48px] bg-gradient-to-tr from-[#FFC533]/25 to-[#FF8E4F]/20 blur-xl dark:opacity-30" />
                            
                            <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                                {/* Card 1: P-Katalog */}
                                <ScrollReveal delay={0} className="h-full">
                                    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-md hover:shadow-xl transition duration-300 dark:border-slate-800 dark:bg-[#121826]">
                                        <div>
                                            <div className="h-32 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                                                <img
                                                    src="/images/feature_collab.jpg"
                                                    alt="P-Katalog"
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/about_building.jpg"; }}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <span className="reveal-scale inline-block rounded-full bg-purple-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
                                                    P-Katalog
                                                </span>
                                                <h3 className="mt-1.5 font-display text-sm font-bold text-[#152238] dark:text-white">
                                                    Cari koleksi buku
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400 leading-relaxed">
                                                    Lorem ipsum dolor sit amet
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <Link
                                                href="/catalog"
                                                className="block w-full rounded-full border border-[#2699fb] py-1.5 text-center text-xs font-bold text-[#2699fb] transition hover:bg-[#2699fb] hover:text-white dark:border-[#38bdf8] dark:text-[#38bdf8]"
                                            >
                                                Buka
                                            </Link>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Card 2: E-Magazine */}
                                <ScrollReveal delay={120} className="h-full">
                                    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-md hover:shadow-xl transition duration-300 dark:border-slate-800 dark:bg-[#121826]">
                                        <div>
                                            <div className="h-32 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                                                <img
                                                    src="/images/feature_books.jpg"
                                                    alt="E-Magazine"
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero_library.jpg"; }}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <span className="reveal-scale inline-block rounded-full bg-amber-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                                                    E-Magazine
                                                </span>
                                                <h3 className="mt-1.5 font-display text-sm font-bold text-[#152238] dark:text-white">
                                                    Baca digital
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400 leading-relaxed">
                                                    Lorem ipsum dolor sit amet
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <Link
                                                href="/magazines"
                                                className="block w-full rounded-full border border-[#2699fb] py-1.5 text-center text-xs font-bold text-[#2699fb] transition hover:bg-[#2699fb] hover:text-white dark:border-[#38bdf8] dark:text-[#38bdf8]"
                                            >
                                                Buka
                                            </Link>
                                        </div>
                                    </div>
                                </ScrollReveal>

                                {/* Card 3: Kontak */}
                                <ScrollReveal delay={240} className="h-full">
                                    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-md hover:shadow-xl transition duration-300 dark:border-slate-800 dark:bg-[#121826]">
                                        <div>
                                            <div className="h-32 w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                                                <img
                                                    src="/images/feature_reading.jpg"
                                                    alt="Kontak"
                                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/school_building.jpg"; }}
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <span className="reveal-scale inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                    Kontak
                                                </span>
                                                <h3 className="mt-1.5 font-display text-sm font-bold text-[#152238] dark:text-white">
                                                    Hubungi pustaka
                                                </h3>
                                                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400 leading-relaxed">
                                                    Lorem ipsum dolor sit amet
                                                </p>
                                            </div>
                                        </div>
                                        <div className="mt-4 pt-2">
                                            <Link
                                                href="/contact"
                                                className="block w-full rounded-full border border-[#2699fb] py-1.5 text-center text-xs font-bold text-[#2699fb] transition hover:bg-[#2699fb] hover:text-white dark:border-[#38bdf8] dark:text-[#38bdf8]"
                                            >
                                                Buka
                                            </Link>
                                        </div>
                                    </div>
                                </ScrollReveal>
                            </div>
                        </div>

                    </div>
                </section>

                {/* ── 3. PINJAM BUKU DENGAN MUDAH (Identical to Left Artboard) ── */}
                <section className="relative px-5 py-16 sm:px-8 lg:px-14 lg:py-24 border-t border-gray-100 dark:border-slate-800/80">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                        
                        {/* Left Copy */}
                        <ScrollReveal>
                            <h2 className="font-display text-[clamp(2.2rem,4vw,3.5rem)] font-extrabold leading-[1.12] tracking-tight text-[#152238] dark:text-white">
                                Pinjam buku
                                <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">dengan mudah</span>
                                    <BrushUnderline />
                                </span>
                            </h2>
                            <p className="mt-5 max-w-md text-sm leading-relaxed text-[#64748b] dark:text-slate-300">
                                Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque tempor. Layanan peminjaman dan reservasi buku terpadu SMAN 1 Bukittinggi.
                            </p>
                            <Link
                                href="/catalog"
                                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#2699fb] hover:underline"
                            >
                                Lihat semua fitur <ArrowRight size={15} />
                            </Link>
                        </ScrollReveal>

                        {/* Right: Orange Backdrop + Reader Photo + Floating Card */}
                        <ScrollReveal delay={150} className="relative mx-auto w-full max-w-lg">
                            {/* Backdrop blob & dots */}
                            <div className="blob-orange absolute -inset-4 sm:-inset-6 bg-[#FF8E4F]/25 blur-xl pointer-events-none" />
                            <DotCluster color="#FFC533" className="absolute -right-4 top-2 z-10 opacity-75" />
                            <DotCluster color="#FF8E4F" className="absolute -left-2 bottom-4 z-10 opacity-75" />

                            {/* Main Reader Photo */}
                            <div className="relative z-10 ml-auto h-72 sm:h-96 w-[88%] sm:w-[85%] overflow-hidden rounded-3xl shadow-xl ring-4 ring-white dark:ring-slate-800">
                                <img
                                    src="/images/catalog_shelf.jpg"
                                    alt="Siswa membaca di perpustakaan"
                                    className="h-full w-full object-cover"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero_library.jpg"; }}
                                />
                            </div>

                            {/* Floating White Card on Top-Left */}
                            <div className="absolute -left-3 top-8 z-20 w-60 sm:w-64 rounded-2xl border border-gray-100/80 bg-white p-4 shadow-2xl dark:border-slate-800 dark:bg-[#121826]">
                                <span className="reveal-scale inline-block rounded-full bg-blue-50 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    Peminjaman
                                </span>
                                <h3 className="mt-2 font-display text-sm font-bold text-[#152238] dark:text-white">
                                    Pinjam buku dari manapun
                                </h3>
                                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400 leading-relaxed">
                                    Lorem ipsum dolor sit amet
                                </p>
                                <div className="mt-4">
                                    <Link
                                        href="/catalog"
                                        className="block w-full rounded-full border border-[#2699fb] py-1.5 text-center text-xs font-bold text-[#2699fb] transition hover:bg-[#2699fb] hover:text-white dark:border-[#38bdf8] dark:text-[#38bdf8]"
                                    >
                                        Coba Sekarang
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                    </div>
                </section>

                {/* ── BUKU TERBARU SECTION (Horizontal Slider & Carousel) ── */}
                <section className="relative px-5 py-14 sm:px-8 lg:px-14 lg:py-20 border-t border-gray-100 dark:border-slate-800/80">
                    <div className="mx-auto max-w-7xl">
                        <ScrollReveal className="flex items-center justify-between gap-4">
                            <div>
                                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                                    Buku terbaru
                                </h2>
                                <p className="mt-1 text-xs text-[#64748b] dark:text-slate-400">
                                    Koleksi buku terbitan dan pengadaan teranyar di perpustakaan
                                </p>
                            </div>
                            <Link
                                href="/catalog"
                                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2699fb] hover:underline"
                            >
                                Lihat semua <ArrowRight size={14} />
                            </Link>
                        </ScrollReveal>

                        {/* Carousel Scroll Container */}
                        <div
                            ref={booksScrollRef}
                            className="mt-6 flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                        >
                            {popularBooks.map((book) => (
                                <div key={book.id} className="w-44 sm:w-52 shrink-0">
                                    <BookCard book={book} />
                                </div>
                            ))}
                            {popularBooks.length === 0 && (
                                <p className="py-10 text-center text-xs text-gray-400">
                                    Belum ada buku yang ditampilkan.
                                </p>
                            )}
                        </div>

                        {/* Navigation Arrows at bottom right */}
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                                type="button"
                                onClick={() => scrollBooks("left")}
                                aria-label="Sebelumnya"
                                className="grid size-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                type="button"
                                onClick={() => scrollBooks("right")}
                                aria-label="Berikutnya"
                                className="grid size-9 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* ── 4. SIAP MULAI MEMBACA? (Identical to Left Artboard CTA) ── */}
                <section className="relative px-5 py-24 sm:px-8 lg:px-14 lg:py-32 border-t border-gray-100 dark:border-slate-800/80 overflow-hidden">
                    {/* Floating Avatar Circles (Matching scattered avatars in mockup) */}
                    <div className="pointer-events-none absolute inset-0">
                        {/* Avatar 1 (top-left) */}
                        <div className="absolute left-[8%] top-[18%] size-12 sm:size-14 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-slate-800">
                            <img src="/images/avatars/avatar1.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 2 (top-left-center) */}
                        <div className="absolute left-[20%] top-[10%] size-9 sm:size-11 overflow-hidden rounded-full ring-2 ring-white shadow-md dark:ring-slate-800">
                            <img src="/images/avatars/avatar2.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 3 (left-mid) */}
                        <div className="absolute left-[12%] top-[48%] size-11 sm:size-13 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-slate-800">
                            <img src="/images/avatars/avatar3.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 4 (bottom-left) */}
                        <div className="absolute left-[10%] bottom-[16%] size-16 sm:size-20 overflow-hidden rounded-full ring-4 ring-white shadow-xl dark:ring-slate-800">
                            <img src="/images/avatars/avatar4.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 5 (top-right) */}
                        <div className="absolute right-[14%] top-[14%] size-10 sm:size-12 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-slate-800">
                            <img src="/images/avatars/avatar5.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 6 (mid-right) */}
                        <div className="absolute right-[9%] top-[45%] size-12 sm:size-14 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-slate-800">
                            <img src="/images/avatars/avatar6.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>
                        {/* Avatar 7 (bottom-right) */}
                        <div className="absolute right-[18%] bottom-[18%] size-10 sm:size-12 overflow-hidden rounded-full ring-2 ring-white shadow-md dark:ring-slate-800">
                            <img src="/images/avatars/avatar2.jpg" alt="Reader" className="h-full w-full object-cover" />
                        </div>

                        {/* Yellow Outline Doodles Scattered Around */}
                        <DoodleBook size={32} color="#FFC533" className="absolute left-[5%] top-[8%] opacity-80" />
                        <DoodleGraduationCap size={30} color="#FFC533" className="absolute left-[15%] top-[30%] opacity-80" />
                        <DoodleGlasses size={32} color="#FFC533" className="absolute left-[6%] bottom-[32%] opacity-80" />
                        <DoodleBulb size={28} color="#FFC533" className="absolute left-[20%] bottom-[12%] opacity-80" />
                        <DoodleChat size={30} color="#FFC533" className="absolute right-[22%] top-[18%] opacity-80" />
                        <DoodleTote size={28} color="#FFC533" className="absolute right-[6%] bottom-[22%] opacity-80" />
                        <SparkleFourPoint size={18} color="#FF8E4F" className="absolute right-[15%] bottom-[35%] opacity-70" />
                        <DotCluster color="#FFC533" className="absolute right-[28%] bottom-[10%] opacity-50" />
                    </div>

                    {/* Center Content */}
                    <ScrollReveal className="relative z-10 mx-auto max-w-2xl text-center">
                        <h2 className="font-display text-[clamp(2.3rem,4.5vw,3.8rem)] font-extrabold tracking-tight text-[#152238] dark:text-white">
                            Siap mulai{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">membaca?</span>
                                <BrushUnderline />
                            </span>
                        </h2>

                        <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-[#64748b] dark:text-slate-300">
                            Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque tempor.
                        </p>

                        <div className="mt-8 flex justify-center">
                            <Link
                                href="/catalog"
                                className="inline-flex items-center justify-center rounded-full bg-[#2699fb] px-9 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-[#1783df] hover:shadow-lg active:scale-95"
                            >
                                Cari Buku
                            </Link>
                        </div>
                    </ScrollReveal>
                </section>

                {/* ── 5. KOMUNITAS, EVENT & KARYA (Complementary Section) ── */}
                <section className="border-t border-gray-100 bg-[#f8fafc] px-5 py-14 sm:px-8 lg:px-14 lg:py-18 dark:border-slate-800 dark:bg-[#0c121e]">
                    <div className="mx-auto max-w-7xl">
                        <ScrollReveal className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">
                                    Aktivitas & Prestasi
                                </span>
                                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                                    Komunitas & Duta Literasi
                                </h2>
                            </div>
                            <div className="flex gap-4 text-xs font-bold">
                                <Link href="/events" className="text-[#2699fb] hover:underline">Agenda Event →</Link>
                                <Link href="/karya-smansa" className="text-[#2699fb] hover:underline">Karya Siswa →</Link>
                                <Link href="/ranking" className="text-[#2699fb] hover:underline">Peringkat Baca →</Link>
                            </div>
                        </ScrollReveal>

                        <div className="mt-8 grid gap-5 md:grid-cols-3">
                            {/* Card 1: Top Readers */}
                            <ScrollReveal delay={0} className="h-full">
                                <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="reveal-scale inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                                                <Trophy size={12} /> Top Readers
                                            </span>
                                            <Link href="/ranking" className="text-xs font-bold text-[#2699fb] hover:underline">Lihat Semua</Link>
                                        </div>
                                        <h3 className="mt-3 font-display text-base font-bold text-[#152238] dark:text-white">
                                            Papan Pembaca Teraktif
                                        </h3>
                                        <div className="mt-3 space-y-2.5">
                                            {topReaders.slice(0, 3).map((r, i) => (
                                                <div key={r.id} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`reveal-scale grid size-5 place-items-center rounded-full font-bold text-[10px] ${i === 0 ? "bg-[#FFC533] text-[#152238]" : "bg-gray-100 text-gray-500 dark:bg-slate-800 dark:text-slate-300"}`}>
                                                            {i + 1}
                                                        </span>
                                                        <span className="font-semibold text-[#152238] dark:text-white">{r.name}</span>
                                                    </div>
                                                    <span className="reveal-scale font-mono text-gray-400 inline-flex items-center gap-0.5">
                                                        <AnimatedNumber value={r.loans_count} /> buku
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <Link href="/ranking" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                        Peringkat Lengkap <ArrowUpRight size={13} />
                                    </Link>
                                </div>
                            </ScrollReveal>

                            {/* Card 2: Upcoming Events */}
                            <ScrollReveal delay={120} className="h-full">
                                <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="reveal-scale inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                                <Calendar size={12} /> Event & Kegiatan
                                            </span>
                                            <Link href="/events" className="text-xs font-bold text-[#2699fb] hover:underline">Lihat Semua</Link>
                                        </div>
                                        <h3 className="mt-3 font-display text-base font-bold text-[#152238] dark:text-white">
                                            Agenda Literasi Terkini
                                        </h3>
                                        <div className="mt-3 space-y-2">
                                            {upcomingEvents.slice(0, 2).map((ev) => (
                                                <Link key={ev.id} href={`/events/${ev.slug}`} className="block rounded-xl bg-gray-50 p-2.5 transition hover:bg-blue-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800">
                                                    <p className="line-clamp-1 text-xs font-bold text-[#152238] dark:text-white">{ev.title}</p>
                                                    <p className="mt-0.5 text-[10px] text-gray-400">{ev.event_date || "Segera hadir"}</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <Link href="/events" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                        Jelajahi Agenda <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </ScrollReveal>

                            {/* Card 3: Karya SMANSA */}
                            <ScrollReveal delay={240} className="h-full">
                                <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <span className="reveal-scale inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                <PenTool size={12} /> Karya Siswa & Guru
                                            </span>
                                            <Link href="/karya-smansa" className="text-xs font-bold text-[#2699fb] hover:underline">Lihat Semua</Link>
                                        </div>
                                        <h3 className="mt-3 font-display text-base font-bold text-[#152238] dark:text-white">
                                            Galeri Karya Smansa
                                        </h3>
                                        <div className="mt-3 space-y-2">
                                            {featuredWorks.slice(0, 2).map((wk) => (
                                                <Link key={wk.id} href={`/karya-smansa/${wk.slug}`} className="block rounded-xl bg-gray-50 p-2.5 transition hover:bg-emerald-50/50 dark:bg-slate-800/60 dark:hover:bg-slate-800">
                                                    <p className="line-clamp-1 text-xs font-bold text-[#152238] dark:text-white">{wk.title}</p>
                                                    <p className="mt-0.5 text-[10px] text-gray-400">{wk.author_name} ({wk.author_type === "teacher" ? "Guru" : "Siswa"})</p>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <Link href="/karya-smansa" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                        Buka Galeri <ArrowRight size={13} />
                                    </Link>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </section>

            </div>
        </SiteShell>
    );
}
