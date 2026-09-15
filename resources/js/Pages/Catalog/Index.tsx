import { Head, Link, router } from "@inertiajs/react";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import React, { useState } from "react";
import { BookCard } from "../../Components/Common/BookCard";
import { SiteShell } from "../../Components/Common/SiteShell";
import { Book, Category, DdcClass, MagazineEdition, PaginatedResponse } from "../../types/library";

interface CatalogIndexProps {
    books: PaginatedResponse<Book>;
    categories: Category[];
    ddcClasses: DdcClass[];
    authors: string[];
    latestMagazines?: (MagazineEdition & { magazine?: { title: string; slug: string } })[];
    filters: {
        q: string;
        category: string;
        ddc: string;
        status: string;
        sort: string;
        author?: string;
    };
}

export default function CatalogIndex({ books, categories, authors, latestMagazines = [], filters }: CatalogIndexProps) {
    const [search, setSearch] = useState(filters.q || "");
    const [category, setCategory] = useState(filters.category || "");
    const [status, setStatus] = useState(filters.status || "all");
    const [author, setAuthor] = useState(filters.author || "");

    const applyFilters = (overrides = {}) => {
        router.get(
            "/catalog",
            {
                q: search.trim() || undefined,
                category: category || undefined,
                status: status !== "all" ? status : undefined,
                author: author || undefined,
                ...overrides,
            },
            { preserveState: true, preserveScroll: true },
        );
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters();
    };

    return (
        <SiteShell>
            <Head title="Katalog Buku - Perpustakaan SMAN 1 Bukittinggi" />

            {/* ═══════════════════════════════════════════════════════
                HERO  (Figma node 6-2521: "Temukan buku favoritmu hari ini")
            ═══════════════════════════════════════════════════════ */}
            <section className="bg-white px-5 pt-12 pb-10 sm:px-8 lg:px-12 lg:pt-16">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">

                        {/* LEFT */}
                        <div>
                            <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-[#152238] sm:text-5xl lg:text-6xl">
                                Temukan buku{" "}
                                <span className="relative inline-block text-[#2699fb]">
                                    favoritmu
                                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 160 10" fill="none" aria-hidden="true">
                                        <path d="M2 7 C40 2, 100 1, 158 7" stroke="#FF8E4F" strokeWidth="3.5" strokeLinecap="round" />
                                    </svg>
                                </span>{" "}
                                hari ini
                            </h1>
                            <p className="mt-4 max-w-md text-sm leading-7 text-[#64748b]">
                                Jelajahi ribuan koleksi buku perpustakaan SMAN 1 Bukittinggi. Cari, filter, dan temukan buku yang paling cocok untukmu.
                            </p>

                            {/* Search bar */}
                            <form
                                onSubmit={handleSearchSubmit}
                                className="mt-6 flex max-w-xl items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-[0_8px_30px_-15px_rgba(21,34,56,.15)] focus-within:border-[#2699fb] focus-within:ring-4 focus-within:ring-[#2699fb]/10"
                            >
                                <Search size={16} className="ml-3 shrink-0 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari buku, penulis, atau kategori..."
                                    className="w-full bg-transparent px-2 py-2.5 text-sm text-[#152238] outline-none placeholder:text-gray-400"
                                />
                                <button
                                    type="submit"
                                    className="rounded-xl bg-[#2699fb] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1783df]"
                                >
                                    Cari
                                </button>
                            </form>

                            {/* Filter pills */}
                            <div className="mt-4 flex flex-wrap items-center gap-2">
                                <span className="flex items-center gap-1 text-xs font-semibold text-gray-400">
                                    <SlidersHorizontal size={12} /> Filter:
                                </span>

                                <select
                                    value={category}
                                    onChange={(e) => { setCategory(e.target.value); applyFilters({ category: e.target.value }); }}
                                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none focus:ring-2 focus:ring-[#2699fb]/10"
                                >
                                    <option value="">Kategori</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.slug}>{cat.name}</option>
                                    ))}
                                </select>

                                <select
                                    value={status}
                                    onChange={(e) => { setStatus(e.target.value); applyFilters({ status: e.target.value }); }}
                                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none focus:ring-2 focus:ring-[#2699fb]/10"
                                >
                                    <option value="all">Ketersediaan</option>
                                    <option value="available">Tersedia</option>
                                    <option value="borrowed">Sedang Dipinjam</option>
                                </select>

                                <select
                                    value={author}
                                    onChange={(e) => { setAuthor(e.target.value); applyFilters({ author: e.target.value }); }}
                                    className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none focus:ring-2 focus:ring-[#2699fb]/10"
                                >
                                    <option value="">Penulis</option>
                                    {authors.map((name) => (
                                        <option key={name} value={name}>{name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* RIGHT: dual rectangular photo showcase */}
                        <div className="relative mx-auto flex h-64 w-full max-w-sm items-center justify-center gap-4 lg:h-80">
                            <div className="h-full w-1/2 overflow-hidden rounded-2xl shadow-[0_15px_35px_-15px_rgba(21,34,56,.3)]">
                                <img src="/images/hero_library.jpg" alt="Koleksi buku" className="h-full w-full object-cover" />
                            </div>
                            <div className="h-[85%] w-1/2 overflow-hidden rounded-2xl shadow-[0_15px_35px_-15px_rgba(21,34,56,.3)]">
                                <img src="/images/about_building.jpg" alt="Perpustakaan" className="h-full w-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                SECTION 1 – Buku terbaru (6-column grid)
            ═══════════════════════════════════════════════════════ */}
            <section className="border-t border-gray-100 px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-end justify-between">
                        <h2 className="font-display text-2xl font-black text-[#152238]">Buku terbaru</h2>
                        <Link href="/catalog" className="flex items-center gap-1 text-sm font-semibold text-[#2699fb] hover:underline">
                            Lihat semua <ArrowRight size={13} />
                        </Link>
                    </div>

                    {/* Book grid */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {books.data.map((book, idx) => (
                            <BookCard
                                key={book.id}
                                book={book}
                                sticker={idx === 0 ? "Populer" : undefined}
                            />
                        ))}
                    </div>

                    {books.data.length === 0 && (
                        <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-12 text-center text-sm text-gray-400">
                            Buku tidak ditemukan. Coba kata kunci atau filter lain.
                        </div>
                    )}

                    {/* Pagination */}
                    {books.last_page > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-2">
                            {books.links.map((link, i) => (
                                <button
                                    key={i}
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url, {}, { preserveScroll: true })}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                        link.active
                                            ? "bg-[#2699fb] text-white shadow-sm"
                                            : link.url
                                            ? "border border-gray-200 text-[#152238] hover:bg-gray-50"
                                            : "cursor-not-allowed border border-gray-100 text-gray-300"
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                SECTION 2 – E-Magazine terbaru (4-column grid)
            ═══════════════════════════════════════════════════════ */}
            <section className="border-t border-gray-100 bg-[#f8fafc] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">Bacaan digital</p>
                            <h2 className="mt-1 font-display text-2xl font-black text-[#152238]">E-Magazine terbaru</h2>
                        </div>
                        <Link href="/magazines" className="flex items-center gap-1 text-sm font-semibold text-[#2699fb] hover:underline">
                            Lihat semua <ArrowRight size={13} />
                        </Link>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {latestMagazines.map((edition) => (
                            <Link
                                key={edition.id}
                                href={`/magazines/${edition.magazine?.slug ?? edition.magazine_id}`}
                                className="group flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-gray-100">
                                    <img
                                        src={edition.cover_image || "/images/hero_library.jpg"}
                                        alt={edition.edition_title}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#2699fb]">
                                        Edisi {edition.edition_number}
                                    </p>
                                    <h3 className="mt-1 line-clamp-1 font-display text-base font-bold text-[#152238] transition-colors group-hover:text-[#2699fb]">
                                        {edition.edition_title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[#64748b]">
                                        {edition.description || "Temukan cerita dan wawasan terbaru dari ruang baca kami."}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {latestMagazines.length === 0 && (
                        <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-400">
                            Majalah digital akan segera hadir.
                        </div>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}
