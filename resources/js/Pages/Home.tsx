import { Head, Link, router } from '@inertiajs/react';
import { ArrowUpRight, BookOpen, CalendarDays, Headphones, Search, ShieldCheck, Sprout, Trophy, Users } from 'lucide-react';
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
import { Book, Event, LibraryStats, MagazineEdition, ReaderRank, SmansaWork } from '../types/library';

interface HomeProps {
    stats: LibraryStats;
    popularBooks: Book[];
    latestMagazines: MagazineEdition[];
    topReaders: ReaderRank[];
    upcomingEvents: Event[];
    latestPodcasts: Event[];
    featuredWorks: SmansaWork[];
    settings: {
        library_name: string;
        library_tagline: string;
        operating_hours: string;
        library_address: string;
        contact_phone: string;
    };
}

export default function Home({ stats, popularBooks, latestMagazines, topReaders, upcomingEvents, latestPodcasts, featuredWorks }: HomeProps) {
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
            <section className="paper-grain relative px-6 py-6 sm:px-10 md:py-12 overflow-hidden">
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
                                className="editorial-surface mt-7 flex max-w-md items-center rounded-full px-4 py-1.5"
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
                                start exploring <ArrowUpRight size={14} className="inline" />
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
                                    A place to grow ·
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
                            Lihat Semua →
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

            {/* 3. READING ROOM COMMUNITY RAIL */}
            <section className="px-6 py-12 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-6 flex items-end justify-between gap-4">
                        <div>
                            <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B3866]">THE READING ROOM</span>
                            <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0F172A] sm:text-3xl">Perpustakaan yang terus bergerak.</h2>
                        </div>
                        <Link href="/events" className="hidden items-center gap-1 font-handwriting text-base font-bold md:flex">Jelajahi komunitas <ArrowUpRight size={16} /></Link>
                    </div>

                    <div className="grid gap-4 lg:grid-cols-[1.1fr_.9fr_.9fr]">
                        <div className="editorial-surface relative overflow-hidden rounded-2xl bg-[#0B3866] p-6 text-white lg:row-span-2">
                            <div className="absolute -right-8 -top-8 size-32 rounded-full border border-white/20" />
                            <div className="relative flex items-center gap-2 text-blue-200"><Trophy size={17} /><span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.16em]">Readers Wall of Fame</span></div>
                            <h3 className="relative mt-8 max-w-xs font-display text-3xl font-bold leading-tight">Siapa yang sedang menyalakan rasa ingin tahu?</h3>
                            <div className="relative mt-8 space-y-3">
                                {topReaders.length > 0 ? topReaders.map((reader, index) => (
                                    <div key={reader.id} className="flex items-center gap-3 rounded-xl bg-white/10 p-3">
                                        <span className="grid size-8 place-items-center rounded-full bg-[#FACC15] font-display text-sm font-bold text-[#0B3866]">{index + 1}</span>
                                        <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{reader.name}</p><p className="text-[10px] text-blue-200">{reader.class || 'Pembaca aktif'}</p></div>
                                        <strong className="font-mono-display text-xs text-[#FACC15]">{reader.loans_count} pinjam</strong>
                                    </div>
                                )) : <p className="text-sm text-blue-100">Papan pembaca akan muncul setelah transaksi peminjaman tercatat.</p>}
                            </div>
                            <Link href="/ranking" className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#0B3866]">Lihat ranking lengkap <ArrowUpRight size={14} /></Link>
                        </div>

                        <div className="editorial-surface rounded-2xl bg-[#fffdf7] p-5">
                            <div className="flex items-center justify-between"><span className="flex items-center gap-2 text-[#0B3866]"><CalendarDays size={17} /><span className="font-mono-display text-[10px] font-bold uppercase tracking-wider">Agenda & Duta</span></span><Link href="/events" className="font-handwriting text-sm font-bold">Semua →</Link></div>
                            <div className="mt-5 space-y-3">{upcomingEvents.length > 0 ? upcomingEvents.map((event) => <Link key={event.id} href={`/events/${event.slug}`} className="block rounded-xl bg-[#eaf5ff] p-3 transition hover:-translate-y-0.5"><p className="text-sm font-bold text-[#0F172A]">{event.title}</p><p className="mt-1 text-[10px] text-slate-500">{event.event_date || 'Agenda terbaru'} {event.location ? `• ${event.location}` : ''}</p></Link>) : <p className="text-xs text-slate-500">Agenda baru sedang disiapkan oleh tim perpustakaan.</p>}</div>
                        </div>

                        <div className="editorial-surface rounded-2xl bg-[#fffdf7] p-5">
                            <div className="flex items-center gap-2 text-[#0B3866]"><Headphones size={17} /><span className="font-mono-display text-[10px] font-bold uppercase tracking-wider">Podcast Duta</span></div>
                            <div className="mt-5 space-y-3">{latestPodcasts.length > 0 ? latestPodcasts.map((podcast) => <Link key={podcast.id} href={`/events/${podcast.slug}`} className="flex items-center gap-3 rounded-xl border border-[#eadbce] p-3 transition hover:-translate-y-0.5"><span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#FACC15] text-[#0B3866]">▶</span><span className="min-w-0"><strong className="block truncate text-sm text-[#0F172A]">{podcast.title}</strong><small className="text-[10px] text-slate-500">{podcast.host_name || 'Duta literasi SMANSA'}</small></span></Link>) : <p className="text-xs text-slate-500">Episode podcast perdana segera hadir.</p>}</div>
                        </div>

                        <div className="editorial-surface rounded-2xl bg-[#fffdf7] p-5 lg:col-span-2">
                            <div className="flex items-center justify-between"><span className="font-mono-display text-[10px] font-bold uppercase tracking-wider text-[#0B3866]">Karya SMANSA</span><Link href="/karya-smansa" className="font-handwriting text-sm font-bold">Buka galeri →</Link></div>
                            <div className="mt-4 grid gap-3 sm:grid-cols-2">{featuredWorks.length > 0 ? featuredWorks.map((work) => <Link key={work.id} href={`/karya-smansa/${work.slug}`} className="rounded-xl bg-[#f4efeA] p-3 transition hover:-translate-y-0.5"><span className="font-mono-display text-[9px] font-bold uppercase tracking-wider text-[#2E8BE6]">{work.category_label || work.category}</span><h3 className="mt-1 font-display text-base font-bold text-[#0F172A]">{work.title}</h3><p className="mt-1 text-[10px] text-slate-500">{work.author_name} • {work.author_type === 'teacher' ? 'Guru' : 'Siswa'}</p></Link>) : <p className="text-xs text-slate-500">Karya pilihan guru dan siswa akan tampil di sini.</p>}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. VALUE PROPOSITION CARDS / BENEFIT SECTION */}
            <section className="torn-top paper-lines relative mt-4 bg-[#eaf5ff] px-6 py-12 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                        
                        {/* Left handwritten annotation */}
                        <div className="font-handwriting text-lg text-[#315a7d] font-bold rotate-[-3deg] shrink-0">
                            Lebih dari sekadar buku ~
                        </div>

                        {/* 4 Feature Items */}
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 flex-1">
                            {/* Item 1 */}
                            <div className="group rounded-xl border border-[#d4e5f2] bg-white/75 p-3 text-center shadow-xs transition hover:-translate-y-1">
                                <div className="mx-auto grid size-9 place-items-center rounded-full bg-[#123b5d] text-[#f8d77e] transition group-hover:rotate-[-8deg]"><BookOpen size={17} /></div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Koleksi Lengkap</h4>
                                <p className="text-[10px] text-slate-500">Buku fisik & digital</p>
                            </div>

                            {/* Item 2 */}
                            <div className="group rounded-xl border border-[#d4e5f2] bg-white/75 p-3 text-center shadow-xs transition hover:-translate-y-1">
                                <div className="mx-auto grid size-9 place-items-center rounded-full bg-[#e37c5b] text-white transition group-hover:rotate-[-8deg]"><Users size={17} /></div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Akses Mudah</h4>
                                <p className="text-[10px] text-slate-500">Kapan saja, di mana saja</p>
                            </div>

                            {/* Item 3 */}
                            <div className="group rounded-xl border border-[#d4e5f2] bg-white/75 p-3 text-center shadow-xs transition hover:-translate-y-1">
                                <div className="mx-auto grid size-9 place-items-center rounded-full bg-[#7897a6] text-white transition group-hover:rotate-[-8deg]"><ShieldCheck size={17} /></div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Terpercaya</h4>
                                <p className="text-[10px] text-slate-500">Untuk seluruh warga sekolah</p>
                            </div>

                            {/* Item 4 */}
                            <div className="group rounded-xl border border-[#d4e5f2] bg-white/75 p-3 text-center shadow-xs transition hover:-translate-y-1">
                                <div className="mx-auto grid size-9 place-items-center rounded-full bg-[#668a69] text-white transition group-hover:rotate-[-8deg]"><Sprout size={17} /></div>
                                <h4 className="mt-1 font-display text-xs font-bold text-[#0F172A]">Ruang Tumbuh</h4>
                                <p className="text-[10px] text-slate-500">Bersama pengetahuan</p>
                            </div>
                        </div>

                        {/* Right sticky note: Good books, better days! :) */}
                        <div className="shrink-0 hidden lg:block">
                            <WashiTapeStrip width="45px" height="15px" color="rgba(186, 215, 245, 0.85)" rotate={-5} className="-top-2 left-4" />
                            <div className="memo-note rotate-[4deg] rounded px-3 py-2 text-center font-handwriting text-xs text-slate-700 leading-tight">
                                Good books, <br />
                                better days.
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
