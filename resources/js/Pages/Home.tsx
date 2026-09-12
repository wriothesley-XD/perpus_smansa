import { Head, Link, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { BookCard } from '../Components/Common/BookCard';
import {
    BotanicalLeaf,
    HandDrawnStar,
    ReadMoreStamp,
    RealPaperClip,
    WashiTapeStrip,
} from '../Components/Common/Ornaments';
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

export default function Home({ stats, popularBooks, latestMagazines }: HomeProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get('/catalog', { q: searchQuery.trim() });
        } else {
            router.get('/catalog');
        }
    };

    return (
        <SiteShell>
            <Head title="Perpustakaan Digital SMAN 1 Bukittinggi" />

            {/* 1. HERO SECTION */}
            <section className="relative px-6 py-6 sm:px-10 md:py-12 overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
                        
                        {/* LEFT COLUMN */}
                        <div className="relative z-10">
                            {/* Memo Note: Selamat Datang */}
                            <div className="relative inline-block mb-4">
                                <WashiTapeStrip width="60px" height="18px" color="rgba(254, 240, 138, 0.9)" rotate={-3} className="-top-2 left-4" />
                                <div className="memo-note rotate-[-2deg] rounded px-3 py-1.5 text-[11px] font-handwriting text-slate-700 font-bold">
                                    Selamat Datang di <br />
                                    Perpustakaan Digital SMAN 1 Bukittinggi
                                </div>
                            </div>

                            {/* Main Title */}
                            <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-extrabold leading-[1.12] tracking-tight text-[#0F172A]">
                                Temukan halaman <br />
                                yang <span className="text-[#2E8BE6]">menunggumu.</span>
                            </h1>

                            <p className="mt-4 max-w-lg text-xs sm:text-sm leading-relaxed text-slate-600">
                                Jelajahi ribuan koleksi buku, majalah, dan sumber bacaan digital untuk mendukung perjalanan belajar dan impianmu.
                            </p>

                            {/* Search Box Pill */}
                            <form
                                onSubmit={handleSearch}
                                className="mt-7 flex max-w-md items-center rounded-full bg-white px-4 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-slate-200"
                            >
                                <Search size={16} className="text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari buku, penulis, atau kategori..."
                                    className="w-full bg-transparent px-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none"
                                />
                                <button
                                    type="submit"
                                    className="rounded-full bg-[#0B3866] px-6 py-2 text-xs font-bold text-white hover:bg-[#082B4E] transition-colors"
                                >
                                    Cari
                                </button>
                            </form>

                            {/* Doodle text: start exploring -> */}
                            <div className="mt-3 ml-6 font-handwriting text-base text-slate-500 font-bold rotate-[-1deg]">
                                start exploring ➔
                            </div>
                        </div>

                        {/* RIGHT COLUMN: POLAROID PHOTO COLLAGE */}
                        <div className="relative mx-auto w-full max-w-[440px] pt-4 pb-8 lg:pt-0">
                            {/* Paperclip top */}
                            <div className="absolute top-0 right-28 z-30">
                                <RealPaperClip rotate={20} color="#788796" />
                            </div>

                            {/* Top right sticky note: Buku adalah jendela dunia :) */}
                            <div className="absolute -top-4 right-2 z-20 hidden sm:block">
                                <div className="memo-note rotate-[4deg] rounded p-2.5 text-center font-handwriting text-xs text-slate-700 leading-snug">
                                    Buku <br />
                                    adalah <br />
                                    jendela <br />
                                    dunia  :)
                                </div>
                            </div>

                            {/* Main Tilted Photo Frame (Polaroid) */}
                            <div className="card-polaroid relative z-10 mx-auto w-[85%] rotate-[3deg] transition-transform duration-500 hover:rotate-0">
                                <div className="overflow-hidden rounded-sm bg-slate-200 aspect-[4/3] relative">
                                    <img
                                        src="/images/hero_library.jpg"
                                        alt="Ruang Baca SMAN 1 Bukittinggi"
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Handwritten caption inside polaroid */}
                                <div className="mt-3 text-center font-handwriting text-sm text-slate-600 font-semibold">
                                    A place to grow ♡
                                </div>

                                {/* READ MORE round badge */}
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2">
                                    <Link href="/catalog">
                                        <ReadMoreStamp />
                                    </Link>
                                </div>
                            </div>

                            {/* Botanical leaf beside the photo */}
                            <div className="absolute bottom-2 -right-4 z-20 pointer-events-none">
                                <BotanicalLeaf size={60} color="#355E49" rotate={25} />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. BUKU TERPOPULER SECTION */}
            <section className="px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    {/* Header bar */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                                Buku Terpopuler
                            </h2>
                            <HandDrawnStar size={20} color="#2E8BE6" />
                        </div>
                        <Link
                            href="/catalog"
                            className="font-handwriting text-base font-bold text-[#2E8BE6] hover:underline"
                        >
                            Lihat Semua ➔
                        </Link>
                    </div>

                    {/* Books Row */}
                    <div className="relative mt-8">
                        {/* Most Picked Ribbon on top left */}
                        <div className="absolute -top-6 -left-2 z-20 hidden md:block">
                            <span className="inline-block bg-white border border-slate-200 px-3 py-1 font-handwriting text-sm font-bold text-slate-700 rotate-[-6deg] shadow-sm rounded-sm">
                                Most Picked
                            </span>
                        </div>

                        {/* New! doodle on top right */}
                        <div className="absolute -top-7 right-6 z-20 hidden md:block">
                            <span className="font-handwriting text-2xl font-bold text-[#2E8BE6] rotate-[8deg]">
                                New!
                            </span>
                        </div>

                        {/* Book Grid: 5 columns on desktop matching mockup */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                            {popularBooks && popularBooks.length > 0 ? (
                                popularBooks.slice(0, 5).map((book, idx) => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        hasClip={true}
                                        sticker={idx === 2 ? 'Koleksi' : undefined}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full py-8 text-center text-xs text-slate-400">
                                    Memuat koleksi buku...
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. VALUE PROPOSITION CARDS / BENEFIT SECTION */}
            <section className="px-6 py-12 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                        
                        {/* Left handwritten annotation */}
                        <div className="font-handwriting text-lg text-slate-500 font-bold rotate-[-3deg] shrink-0">
                            Lebih dari sekadar buku ~
                        </div>

                        {/* 4 Feature Items */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 flex-1">
                            {/* Item 1 */}
                            <div className="text-center p-3 rounded-lg bg-white/70 border border-[#EDE7DF] shadow-xs">
                                <div className="text-xl">📖</div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Koleksi Lengkap</h4>
                                <p className="text-[10px] text-slate-500">Buku fisik & digital</p>
                            </div>

                            {/* Item 2 */}
                            <div className="text-center p-3 rounded-lg bg-white/70 border border-[#EDE7DF] shadow-xs">
                                <div className="text-xl">👥</div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Akses Mudah</h4>
                                <p className="text-[10px] text-slate-500">Kapan saja, di mana saja</p>
                            </div>

                            {/* Item 3 */}
                            <div className="text-center p-3 rounded-lg bg-white/70 border border-[#EDE7DF] shadow-xs">
                                <div className="text-xl">🛡️</div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Terpercaya</h4>
                                <p className="text-[10px] text-slate-500">Untuk seluruh warga sekolah</p>
                            </div>

                            {/* Item 4 */}
                            <div className="text-center p-3 rounded-lg bg-white/70 border border-[#EDE7DF] shadow-xs">
                                <div className="text-xl">🌱</div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Ruang Tumbuh</h4>
                                <p className="text-[10px] text-slate-500">Bersama pengetahuan</p>
                            </div>
                        </div>

                        {/* Right sticky note: Good books, better days! :) */}
                        <div className="shrink-0 hidden lg:block">
                            <WashiTapeStrip width="45px" height="15px" color="rgba(186, 215, 245, 0.85)" rotate={-5} className="-top-2 left-4" />
                            <div className="memo-note rotate-[4deg] rounded px-3 py-2 text-center font-handwriting text-xs text-slate-700 leading-tight">
                                Good books, <br />
                                better days! :)
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </SiteShell>
    );
}