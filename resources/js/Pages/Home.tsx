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

    const featureItems = [
        {
            title: 'E-Katalog (OPAC)',
            badge: 'Pencarian Cepat',
            badgeClass: 'bg-blue-100 text-blue-800',
            desc: 'Cari ketersediaan judul, lokasi rak fisik, dan klasifikasi DDC secara real-time.',
            href: '/catalog',
            icon: BookOpen,
        },
        {
            title: 'E-Magazine',
            badge: 'Publikasi Digital',
            badgeClass: 'bg-purple-100 text-purple-800',
            desc: 'Baca majalah Genta Smansa langsung melalui peramban kapan saja dan di mana saja.',
            href: '/magazines',
            icon: Newspaper,
        },
        {
            title: 'Reservasi Mandiri',
            badge: 'Layanan Siswa',
            badgeClass: 'bg-emerald-100 text-emerald-800',
            desc: 'Pesan buku favoritmu sebelum tiba di perpustakaan agar buku tersimpan rapi untukmu.',
            href: '/catalog',
            icon: BookMarked,
        },
    ];

    return (
        <SiteShell>
            <Head title="Beranda — Digital Library SMAN 1 Bukittinggi" />

            {/* HERO SECTION */}
            <section className="relative overflow-hidden border-b border-slate-200/80 bg-white">
                <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-[#0B4EA2]/5 blur-3xl" />
                <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-[#FACC15]/10 blur-3xl" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:py-28">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-[#0B4EA2]/20 bg-[#EAF4FF] px-4 py-1.5 text-xs font-bold text-[#0B4EA2]">
                            <Sparkles size={14} />
                            <span>Digital Library • SMAN 1 Bukittinggi</span>
                        </div>

                        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl sm:leading-[1.15]">
                            Temukan Dunia Baru <br className="hidden sm:inline" />
                            dari Setiap Halaman.
                        </h1>

                        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                            Akses katalog koleksi buku fisik, majalah terbitan digital, dan khazanah literasi terkurasi untuk mendukung kemajuan akademik insan Smansa.
                        </p>

                        {/* Search Bar */}
                        <form
                            onSubmit={handleSearch}
                            className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg sm:flex-row sm:items-center sm:gap-2"
                        >
                            <div className="flex flex-1 items-center px-3">
                                <Search size={20} className="text-[#0B4EA2] shrink-0" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari judul buku, nama penulis, atau ISBN…"
                                    className="w-full bg-transparent px-3 py-2.5 text-sm text-[#0F172A] outline-none placeholder:text-slate-400"
                                />
                            </div>
                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-xl bg-[#0B4EA2] px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-[#083c7d] transition-all"
                            >
                                <span>Cari Buku</span>
                                <ArrowRight size={16} />
                            </button>
                        </form>

                        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500">
                            <span>Pencarian populer:</span>
                            {['Laskar Pelangi', 'Buya Hamka', 'Atomic Habits', 'Bumi Manusia', 'Fisika SMA'].map(
                                (tag) => (
                                    <button
                                        key={tag}
                                        type="button"
                                        onClick={() => router.get('/catalog', { q: tag })}
                                        className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-700 hover:border-[#0B4EA2] hover:text-[#0B4EA2] transition-colors"
                                    >
                                        {tag}
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* METRICS BANNER */}
            <section className="border-b border-slate-200 bg-white">
                <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-slate-100 sm:grid-cols-4 sm:divide-y-0">
                    {statItems.map((item) => (
                        <div key={item.label} className="p-6 text-center sm:p-8">
                            <div className="mx-auto grid size-10 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                <item.icon size={20} />
                            </div>
                            <p className="mt-3 font-display text-3xl font-extrabold text-[#0F172A]">
                                {item.value}
                            </p>
                            <p className="mt-1 font-mono-display text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                {item.label}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURE SHOWCASE */}
            <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
                <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                    <div>
                        <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                            Satu Pintu Untuk Semua
                        </span>
                        <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                            Jelajah, simpan, dan baca dengan caramu.
                        </h2>
                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            Perpustakaan digital SMAN 1 Bukittinggi dirancang agar meminjam dan membaca terasa ramah, cepat, dan terintegrasi dengan rutinitas belajar.
                        </p>

                        <div className="mt-6 space-y-3 text-sm text-slate-700">
                            {[
                                'Cari koleksi buku fisik berdasarkan judul, penulis, nomor DDC, atau nomor rak.',
                                'Pantau ketersediaan eksemplar buku secara real-time sebelum berkunjung ke perpustakaan.',
                                'Ajukan reservasi mandiri dengan mudah hanya menggunakan NIS atau akun siswa.',
                            ].map((text, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                                        <Check size={12} strokeWidth={3} />
                                    </span>
                                    <span>{text}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8">
                            <Link
                                href="/information"
                                className="inline-flex items-center gap-2 text-sm font-bold text-[#0B4EA2] hover:underline"
                            >
                                <span>Kenali profil & layanan perpustakaan</span>
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                        {featureItems.map((f) => (
                            <div
                                key={f.title}
                                className="flex flex-col rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm hover-lift"
                            >
                                <span className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold ${f.badgeClass} w-fit`}>
                                    {f.badge}
                                </span>
                                <f.icon size={24} className="mt-4 text-[#0B4EA2]" />
                                <h3 className="mt-3 font-display text-base font-bold text-[#0F172A]">
                                    {f.title}
                                </h3>
                                <p className="mt-1.5 flex-1 text-xs leading-relaxed text-slate-500">
                                    {f.desc}
                                </p>
                                <Link
                                    href={f.href}
                                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[#0B4EA2] hover:underline"
                                >
                                    <span>Buka layanan</span>
                                    <ArrowRight size={12} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* POPULAR BOOKS */}
            <section className="border-t border-slate-200/80 bg-white py-20">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                                Baru Di Rak & Terpopuler
                            </span>
                            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F172A]">
                                Buku Pilihan Minggu Ini
                            </h2>
                        </div>
                        <Link
                            href="/catalog"
                            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#0B4EA2] hover:underline"
                        >
                            <span>Lihat Semua Katalog</span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                        {popularBooks.map((book) => (
                            <BookCard key={book.id} book={book} />
                        ))}
                    </div>
                </div>
            </section>

            {/* E-MAGAZINE SPOTLIGHT */}
            {latestMagazines.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-[#EAF4FF]/40 p-8 sm:p-12">
                        <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-center">
                            <div>
                                <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                                    Terbitan Digital
                                </span>
                                <h2 className="mt-2 font-display text-3xl font-extrabold text-[#0F172A]">
                                    Majalah Genta Smansa
                                </h2>
                                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                                    Merekam jejak kreativitas literasi siswa, riset sekolah, prestasi olimpiade, dan dinamika kebanggaan almamater SMAN 1 Bukittinggi.
                                </p>
                                <Link
                                    href="/magazines"
                                    className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#083c7d] transition-colors"
                                >
                                    <span>Jelajahi Semua Edisi</span>
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                {latestMagazines.map((ed) => (
                                    <Link
                                        key={ed.id}
                                        href={`/magazines/${ed.id}`}
                                        className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover-lift"
                                    >
                                        <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                                            <img
                                                src={ed.cover_image}
                                                alt={ed.edition_title}
                                                className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="mt-3 flex-1">
                                            <span className="font-mono-display text-[10px] font-bold uppercase tracking-wider text-[#0B4EA2]">
                                                {ed.edition_number} • {ed.year}
                                            </span>
                                            <h3 className="mt-1 line-clamp-2 font-display text-xs font-bold text-[#0F172A]">
                                                {ed.edition_title}
                                            </h3>
                                        </div>
                                        <span className="mt-3 text-[11px] font-semibold text-[#0B4EA2] group-hover:underline">
                                            Baca Digital ?
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* CALL TO ACTION */}
            <section className="bg-[#FACC15] py-20 text-[#092E61]">
                <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
                    <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
                        Sudah siap menemukan <br className="hidden sm:inline" />
                        bacaan berikutnya?
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-base text-[#092E61]/90 sm:text-lg">
                        Mulai dari satu buku, telusuri rak perpustakaan, dan kembangkan potensi dirimu bersama koleksi SMAN 1 Bukittinggi.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/catalog"
                            className="rounded-xl bg-[#0B4EA2] px-8 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#092E61] transition-all"
                        >
                            Buka Katalog Buku
                        </Link>
                        <Link
                            href="/information"
                            className="rounded-xl border-2 border-[#092E61] px-8 py-3.5 text-sm font-bold text-[#092E61] hover:bg-[#092E61] hover:text-white transition-all"
                        >
                            Tata Tertib & Jam Buka
                        </Link>
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
