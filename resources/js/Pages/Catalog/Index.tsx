import { Head, router } from '@inertiajs/react';
import { Search } from 'lucide-react';
import React, { useState } from 'react';
import { BookCard } from '../../Components/Common/BookCard';
import {
    BotanicalLeaf,
    RealPaperClip,
    WashiTapeStrip,
} from '../../Components/Common/Ornaments';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book, Category, DdcClass, PaginatedResponse } from '../../types/library';

interface CatalogIndexProps {
    books: PaginatedResponse<Book>;
    categories: Category[];
    ddcClasses: DdcClass[];
    authors: string[];
    filters: {
        q: string;
        category: string;
        ddc: string;
        status: string;
        sort: string;
        author?: string;
    };
}

export default function CatalogIndex({
    books,
    categories,
    authors,
    filters,
}: CatalogIndexProps) {
    const [search, setSearch] = useState(filters.q || '');
    const [category, setCategory] = useState(filters.category || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [author, setAuthor] = useState(filters.author || '');

    const applyFilters = (overrides = {}) => {
        const queryParams = {
            q: search.trim() || undefined,
            category: category || undefined,
            status: status !== 'all' ? status : undefined,
            author: author || undefined,
            ...overrides,
        };

        router.get('/catalog', queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <SiteShell>
            <Head title="Katalog Buku - Perpustakaan SMAN 1 Bukittinggi" />

            {/* 1. HERO / SEARCH & FILTER SECTION */}
            <section className="paper-grain relative px-6 py-8 sm:px-10 overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        
                        {/* LEFT HEADER */}
                        <div>
                            {/* Section Number */}
                            <p className="font-mono-display text-xs font-bold uppercase tracking-wider text-slate-500">
                                01 / DISCOVER
                            </p>

                            {/* Headline */}
                            <div className="relative mt-2 inline-block">
                                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                                    Cari. Filter. <br />
                                    Temukan.
                                </h1>
                                {/* Annotation note beside title */}
                                <div className="absolute top-1 -right-28 hidden sm:block">
                                    <span className="font-handwriting text-sm text-[#2E8BE6] font-semibold rotate-[8deg] inline-block">
                                        koleksi untuk <br /> setiap cerita
                                    </span>
                                </div>
                            </div>

                            {/* Search bar with blue round button */}
                            <form
                                onSubmit={handleSearchSubmit}
                                className="mt-8 flex max-w-xl items-center rounded-full bg-white px-4 py-1.5 shadow-[0_4px_18px_rgba(0,0,0,0.06)] border border-slate-200"
                            >
                                <Search size={16} className="text-slate-400 shrink-0" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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

                            {/* Filter Dropdown Pills matching mockup: Kategori, Ketersediaan, Penulis */}
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                {/* Kategori Dropdown */}
                                <select
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        applyFilters({ category: e.target.value });
                                    }}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs focus:outline-none"
                                >
                                    <option value="">Kategori ▾</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>

                                {/* Ketersediaan Dropdown */}
                                <select
                                    value={status}
                                    onChange={(e) => {
                                        setStatus(e.target.value);
                                        applyFilters({ status: e.target.value });
                                    }}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs focus:outline-none"
                                >
                                    <option value="all">Ketersediaan ▾</option>
                                    <option value="available">Tersedia</option>
                                    <option value="borrowed">Sedang Dipinjam</option>
                                </select>

                                {/* Penulis Dropdown */}
                                <select
                                    value={author}
                                    onChange={(e) => {
                                        setAuthor(e.target.value);
                                        applyFilters({ author: e.target.value });
                                    }}
                                    className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-xs focus:outline-none"
                                >
                                    <option value="">Penulis ▾</option>
                                    {authors.map((name) => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* RIGHT POLAROID PHOTO: School Building Photo */}
                        <div className="relative mx-auto w-full max-w-[340px] pt-4 lg:pt-0">
                            {/* Blue washi tape */}
                            <WashiTapeStrip width="65px" height="18px" color="rgba(11, 78, 162, 0.75)" rotate={-5} className="-top-2 left-10" />

                            {/* Polaroid Card */}
                            <div className="card-polaroid rotate-[2deg] transition-transform duration-500 hover:rotate-0">
                                <div className="overflow-hidden rounded-sm bg-slate-200 aspect-[16/10]">
                                    <img
                                        src="/images/school_building.jpg"
                                        alt="SMAN 1 Bukittinggi"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-2.5 text-center font-handwriting text-xs font-bold text-slate-600">
                                    E-Katalog
                                </div>
                            </div>

                            {/* Leaf ornament behind */}
                            <div className="absolute -top-4 -right-6 z-0 pointer-events-none">
                                <BotanicalLeaf size={50} color="#2A5C43" rotate={35} />
                            </div>

                            {/* Handwritten pointer note */}
                            <div className="mt-3 text-right">
                                <span className="font-handwriting text-xs text-slate-500 font-bold rotate-[-3deg] inline-block">
                                    Cari buku favoritmu di sini! ↴
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. CATALOG BOOK GRID */}
            <section className="px-6 py-8 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4">
                        {books.data.map((book, idx) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                hasClip={idx % 2 === 0}
                                sticker={idx === 0 ? 'Popular' : undefined}
                            />
                        ))}
                    </div>

                    {/* Empty State */}
                    {books.data.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-sm text-slate-500 bg-white/50">
                            Buku yang kamu cari tidak ditemukan. Coba kata kunci lain atau reset filter.
                        </div>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}
