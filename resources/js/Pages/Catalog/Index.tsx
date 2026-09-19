import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowRight,
    Search,
    SlidersHorizontal,
    BookOpen,
    GraduationCap,
    Award,
    Smartphone,
    Sparkles,
} from "lucide-react";
import React, { useState } from "react";
import { BookCard } from "../../Components/Common/BookCard";
import { Pagination } from "../../Components/Common/Pagination";
import { CardSkeleton } from "../../Components/Common/Skeleton";
import SiteShell from "../../Components/Common/SiteShell";
import { Book, Category, MagazineEdition } from "../../types/library";
import { useI18n } from "../../utils/i18n";

interface CatalogIndexProps {
    books: {
        data: Book[];
        current_page: number;
        last_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    categories: Category[];
    authors: string[];
    filters: {
        search?: string;
        category?: string;
        status?: string;
        author?: string;
        sort?: string;
        curriculum?: string;
    };
    latestMagazines?: (MagazineEdition & { magazine?: { title: string; slug: string } })[];
}

export default function Index({
    books,
    categories,
    authors,
    filters,
    latestMagazines = [],
}: CatalogIndexProps) {
    const { t } = useI18n();
    const [search, setSearch] = useState(filters.search || "");
    const [category, setCategory] = useState(filters.category || "");
    const [status, setStatus] = useState(filters.status || "all");
    const [author, setAuthor] = useState(filters.author || "");
    const [sort, setSort] = useState(filters.sort || "latest");

    const applyFilters = (newFilters: Record<string, string | undefined>) => {
        const query: Record<string, string | undefined> = {
            search: search || undefined,
            category: category || undefined,
            status: status !== "all" ? status : undefined,
            author: author || undefined,
            sort: sort !== "latest" ? sort : undefined,
            curriculum: filters.curriculum || undefined,
            ...newFilters,
        };

        // Remove undefined keys
        Object.keys(query).forEach((k) => query[k] === undefined && delete query[k]);

        router.get("/catalog", query, { preserveState: true, preserveScroll: true });
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        applyFilters({ search });
    };

    const curriculumTabs = [
        { id: "", label: t("filter_curriculum_all"), Icon: BookOpen },
        { id: "fase_e", label: t("filter_fase_e"), Icon: GraduationCap },
        { id: "fase_f", label: t("filter_fase_f"), Icon: GraduationCap },
        { id: "snbt_osn", label: t("filter_snbt_osn"), Icon: Award },
        { id: "ebook", label: t("filter_ebook"), Icon: Smartphone },
        { id: "fiksi", label: t("filter_fiksi"), Icon: Sparkles },
    ];

    const recentScrollRef = React.useRef<HTMLDivElement>(null);

    const scrollRecent = (direction: "left" | "right") => {
        if (recentScrollRef.current) {
            recentScrollRef.current.scrollBy({
                left: direction === "left" ? -300 : 300,
                behavior: "smooth",
            });
        }
    };

    return (
        <SiteShell>
            <Head title={`E-Katalog — Temukan Buku Favoritmu | Perpustakaan Sunaryaman Musthofa`} />

            {/* ── 1. HERO SEARCH SECTION (Identical to Right Artboard) ── */}
            <section className="bg-white px-5 pt-10 pb-12 sm:px-8 lg:px-14 lg:pt-16 lg:pb-16 dark:bg-[#090d16]">
                <div className="mx-auto max-w-7xl">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
                        
                        {/* Left: Heading + Subtitle + Search Input */}
                        <div>
                            <h1 className="font-display text-[clamp(2.4rem,4.5vw,4.2rem)] font-extrabold leading-[1.08] tracking-tight text-[#152238] dark:text-white">
                                Temukan buku
                                <br />
                                favoritmu hari ini
                            </h1>
                            <p className="mt-4 max-w-lg text-sm sm:text-base leading-relaxed text-[#64748b] dark:text-slate-300">
                                Jelajahi ribuan koleksi buku teks Kurikulum Merdeka, karya sastra, buku referensi SNBT/OSN, serta terbitan digital resmi SMAN 1 Bukittinggi.
                            </p>

                            {/* Pill Search bar */}
                            <form
                                onSubmit={handleSearchSubmit}
                                className="mt-8 flex max-w-lg items-center gap-2 rounded-full border border-gray-200 bg-white p-1.5 shadow-sm transition-all focus-within:border-[#2699fb] focus-within:ring-4 focus-within:ring-[#2699fb]/10 dark:border-slate-700 dark:bg-slate-900"
                            >
                                <Search size={17} className="ml-3.5 shrink-0 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Cari judul, penulis, atau kategori..."
                                    className="w-full bg-transparent px-2 py-2 text-xs sm:text-sm text-[#152238] outline-none placeholder:text-gray-400 dark:text-white"
                                />
                                <button
                                    type="submit"
                                    className="rounded-full bg-[#2699fb] px-6 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1783df] active:scale-95"
                                >
                                    Cari
                                </button>
                            </form>
                        </div>

                        {/* Right: Dual Rectangular Showcase Photos */}
                        <div className="relative mx-auto flex h-72 w-full max-w-md items-center justify-center gap-4 sm:h-80">
                            <div className="h-full w-1/2 overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg ring-2 ring-gray-100 dark:ring-slate-800">
                                <img
                                    src="/images/catalog_shelf.jpg"
                                    alt="Rak buku perpustakaan"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/hero_library.jpg"; }}
                                />
                            </div>
                            <div className="h-[88%] w-1/2 overflow-hidden rounded-2xl sm:rounded-3xl shadow-lg ring-2 ring-gray-100 dark:ring-slate-800">
                                <img
                                    src="/images/catalog_stack.jpg"
                                    alt="Koleksi buku"
                                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                                    onError={(e) => { (e.target as HTMLImageElement).src = "/images/about_building.jpg"; }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── 2. BUKU TERBARU SECTION (Identical to Right Artboard) ── */}
            <section className="border-t border-gray-100 bg-[#f8fafc] px-5 py-12 sm:px-8 lg:px-14 lg:py-16 dark:border-slate-800/80 dark:bg-[#0c121e]">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between gap-4">
                        <div>
                            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                                Buku terbaru
                            </h2>
                            <p className="mt-1 text-xs text-[#64748b] dark:text-slate-400">
                                Koleksi buku cetak dan e-book rilis terbaru yang siap dibaca
                            </p>
                        </div>
                        <a
                            href="#katalog-lengkap"
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#2699fb] hover:underline"
                        >
                            Lihat semua <ArrowRight size={14} />
                        </a>
                    </div>

                    {/* Horizontal Scroll / Carousel */}
                    <div
                        ref={recentScrollRef}
                        className="mt-6 flex gap-4 overflow-x-auto pb-4 scroll-smooth scrollbar-none"
                    >
                        {books.data.slice(0, 8).map((book) => (
                            <div key={book.id} className="w-44 sm:w-48 shrink-0">
                                <BookCard book={book} />
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows at bottom right */}
                    <div className="mt-4 flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => scrollRecent("left")}
                            aria-label="Sebelumnya"
                            className="grid size-8 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <span className="text-xs">‹</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollRecent("right")}
                            aria-label="Berikutnya"
                            className="grid size-8 place-items-center rounded-full border border-gray-200 bg-white text-gray-500 shadow-xs transition hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        >
                            <span className="text-xs">›</span>
                        </button>
                    </div>
                </div>
            </section>

            {/* ── 3. FULL CATALOG & FILTERS SECTION ── */}
            <section id="katalog-lengkap" className="border-t border-gray-100 bg-white px-5 py-12 sm:px-8 lg:px-14 lg:py-16 dark:border-slate-800/80 dark:bg-[#090d16]">
                <div className="mx-auto max-w-7xl">
                    
                    {/* Kurikulum Merdeka Quick Filter Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        {curriculumTabs.map((tab) => {
                            const isCurrent = (filters.curriculum || "") === tab.id;
                            const IconComponent = tab.Icon;
                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => applyFilters({ curriculum: tab.id || undefined })}
                                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition ${
                                        isCurrent
                                            ? "bg-[#2699fb] text-white shadow-xs"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                                    }`}
                                >
                                    <IconComponent size={13} className={isCurrent ? "text-white" : "text-gray-400"} />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Filter dropdowns row */}
                    <div className="mt-4 flex flex-wrap items-center gap-2.5">
                        <span className="flex items-center gap-1 text-xs font-bold text-gray-400">
                            <SlidersHorizontal size={13} /> Filter:
                        </span>

                        <select
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); applyFilters({ category: e.target.value }); }}
                            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="">{t("catalog_all_categories")}</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.slug}>{cat.name}</option>
                            ))}
                        </select>

                        <select
                            value={status}
                            onChange={(e) => { setStatus(e.target.value); applyFilters({ status: e.target.value }); }}
                            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="all">{t("catalog_filter_category")}</option>
                            <option value="available">{t("status_available")}</option>
                            <option value="borrowed">{t("status_borrowed")}</option>
                        </select>

                        <select
                            value={author}
                            onChange={(e) => { setAuthor(e.target.value); applyFilters({ author: e.target.value }); }}
                            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="">{t("book_author")}</option>
                            {authors.map((name) => (
                                <option key={name} value={name}>{name}</option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(e) => { setSort(e.target.value); applyFilters({ sort: e.target.value }); }}
                            className="rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-[#152238] shadow-xs focus:border-[#2699fb] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                        >
                            <option value="latest">{t("catalog_sort_latest")}</option>
                            <option value="popular">{t("catalog_sort_popular")}</option>
                            <option value="title_asc">{t("catalog_sort_title_asc")}</option>
                            <option value="title_desc">{t("catalog_sort_title_desc")}</option>
                        </select>
                    </div>

                    {/* Results count & reset */}
                    <div className="mt-8 flex items-end justify-between border-t border-gray-100 pt-6 dark:border-slate-800">
                        <div>
                            <h2 className="font-display text-xl sm:text-2xl font-bold text-[#152238] dark:text-white">
                                Koleksi Lengkap
                            </h2>
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                {t("catalog_showing_results")} {books.data.length} {t("catalog_of_results")} {books.total} {t("catalog_books_count")}
                            </p>
                        </div>
                        {(filters.search || filters.category || filters.curriculum || filters.status !== "all" || filters.author) && (
                            <button
                                onClick={() => router.get("/catalog")}
                                className="text-xs font-bold text-[#2699fb] hover:underline"
                            >
                                {t("catalog_reset_filters")}
                            </button>
                        )}
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
                            {t("catalog_no_results")}
                        </div>
                    )}

                    {/* Advanced Pagination */}
                    {books.last_page > 1 && (
                        <Pagination
                            currentPage={books.current_page}
                            lastPage={books.last_page}
                            from={(books.current_page - 1) * books.data.length + 1}
                            to={(books.current_page - 1) * books.data.length + books.data.length}
                            total={books.total}
                            label="buku"
                            onPageChange={(page) => {
                                applyFilters({ page: String(page) });
                            }}
                        />
                    )}
                </div>
            </section>

            {/* SECTION 2 – E-Magazine terbaru */}
            {latestMagazines.length > 0 && (
                <section className="border-t border-gray-100 bg-[#f8fafc] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">{t("sec_magazine_badge")}</p>
                                <h2 className="mt-1 font-display text-2xl font-black text-[#152238]">{t("sec_magazine_latest")}</h2>
                            </div>
                            <Link href="/magazines" className="flex items-center gap-1 text-sm font-semibold text-[#2699fb] hover:underline">
                                {t("sec_see_all")} <ArrowRight size={13} />
                            </Link>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {latestMagazines.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/magazines/${edition.magazine?.slug ?? edition.magazine_id}`}
                                    className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <img
                                            src={edition.cover_image || "/images/hero_library.jpg"}
                                            alt={edition.edition_title}
                                            className="h-full w-full object-cover transition group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="py-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#2699fb]">
                                            {t("sec_magazine_edition")} {edition.edition_number}
                                        </p>
                                        <h3 className="mt-1.5 font-display text-sm font-bold leading-snug text-[#152238]">
                                            {edition.edition_title}
                                        </h3>
                                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-[#2699fb]">
                                            {t("sec_magazine_read")} <ArrowRight size={10} />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </SiteShell>
    );
}
