import { Head, Link, router } from '@inertiajs/react';
import {
    BookOpen,
    Check,
    ChevronLeft,
    ChevronRight,
    Filter,
    RotateCcw,
    Search,
    SlidersHorizontal,
    X,
} from 'lucide-react';
import React, { useState } from 'react';
import { BookCard } from '../../Components/Common/BookCard';
import { EmptyState } from '../../Components/Common/EmptyState';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book, Category, DdcClass, PaginatedResponse } from '../../types/library';

interface CatalogIndexProps {
    books: PaginatedResponse<Book>;
    categories: Category[];
    ddcClasses: DdcClass[];
    filters: {
        q: string;
        category: string;
        ddc: string;
        status: string;
        sort: string;
    };
}

export default function CatalogIndex({
    books,
    categories,
    ddcClasses,
    filters,
}: CatalogIndexProps) {
    const [search, setSearch] = useState(filters.q || '');
    const [category, setCategory] = useState(filters.category || '');
    const [ddc, setDdc] = useState(filters.ddc || '');
    const [status, setStatus] = useState(filters.status || 'all');
    const [sort, setSort] = useState(filters.sort || 'popular');
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const applyFilters = (overrides = {}) => {
        const queryParams = {
            q: search.trim() || undefined,
            category: category || undefined,
            ddc: ddc || undefined,
            status: status !== 'all' ? status : undefined,
            sort: sort !== 'popular' ? sort : undefined,
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

    const handleReset = () => {
        setSearch('');
        setCategory('');
        setDdc('');
        setStatus('all');
        setSort('popular');
        router.get('/catalog');
    };

    const hasActiveFilters = search || category || ddc || status !== 'all' || sort !== 'popular';

    return (
        <SiteShell>
            <Head title="Katalog Buku (OPAC) — Perpustakaan SMAN 1 Bukittinggi" />

            <div className="border-b border-slate-200/80 bg-white py-10">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Online Public Access Catalog (OPAC)
                    </span>
                    <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                        Katalog Perpustakaan
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm text-slate-600">
                        Jelajahi seluruh koleksi buku teks pelajaran, fiksi, karya sastra, dan referensi keilmuan yang tersimpan di rak SMAN 1 Bukittinggi.
                    </p>

                    {/* Search & Sort Bar */}
                    <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center">
                        <form
                            onSubmit={handleSearchSubmit}
                            className="flex flex-1 items-center rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-1.5 focus-within:border-[#0B4EA2] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#0B4EA2]/15 transition-all"
                        >
                            <Search size={18} className="text-[#0B4EA2] shrink-0" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul buku, penulis, atau ISBN…"
                                className="w-full bg-transparent px-3 py-2 text-sm text-[#0F172A] outline-none placeholder:text-slate-400"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearch('');
                                        applyFilters({ q: undefined });
                                    }}
                                    className="p-1 text-slate-400 hover:text-slate-700"
                                >
                                    <X size={16} />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="ml-2 rounded-xl bg-[#0B4EA2] px-4 py-2 text-xs font-bold text-white hover:bg-[#083c7d] transition-colors"
                            >
                                Cari
                            </button>
                        </form>

                        <div className="flex items-center gap-2">
                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 text-xs">
                                <span className="text-slate-500 font-medium">Urutkan:</span>
                                <select
                                    value={sort}
                                    onChange={(e) => {
                                        setSort(e.target.value);
                                        applyFilters({ sort: e.target.value });
                                    }}
                                    className="bg-transparent font-bold text-[#0F172A] outline-none cursor-pointer"
                                >
                                    <option value="popular">Paling Populer</option>
                                    <option value="newest">Terbaru</option>
                                    <option value="title_asc">Judul (A–Z)</option>
                                    <option value="title_desc">Judul (Z–A)</option>
                                </select>
                            </div>

                            {/* Mobile Filter Toggle */}
                            <button
                                type="button"
                                onClick={() => setMobileFilterOpen(true)}
                                className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 lg:hidden"
                            >
                                <SlidersHorizontal size={14} className="text-[#0B4EA2]" />
                                <span>Filter Koleksi</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MAIN CATALOG CONTENT */}
            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
                    {/* DESKTOP SIDEBAR FILTERS */}
                    <aside className="hidden lg:block space-y-8">
                        {/* Status Filter */}
                        <div>
                            <h3 className="font-mono-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B4EA2]">
                                Ketersediaan
                            </h3>
                            <div className="mt-3 space-y-1.5">
                                {[
                                    { value: 'all', label: 'Semua Status' },
                                    { value: 'available', label: 'Tersedia di Rak' },
                                    { value: 'borrowed', label: 'Sedang Dipinjam' },
                                ].map((item) => (
                                    <button
                                        key={item.value}
                                        type="button"
                                        onClick={() => {
                                            setStatus(item.value);
                                            applyFilters({ status: item.value });
                                        }}
                                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                                            status === item.value
                                                ? 'bg-[#EAF4FF] text-[#0B4EA2]'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        {status === item.value && <Check size={14} />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div>
                            <h3 className="font-mono-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B4EA2]">
                                Kategori Bidang
                            </h3>
                            <div className="mt-3 space-y-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCategory('');
                                        applyFilters({ category: undefined });
                                    }}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                                        !category ? 'bg-[#EAF4FF] text-[#0B4EA2]' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <span>Semua Kategori</span>
                                </button>
                                {categories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        type="button"
                                        onClick={() => {
                                            setCategory(cat.slug);
                                            applyFilters({ category: cat.slug });
                                        }}
                                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-colors ${
                                            category === cat.slug
                                                ? 'bg-[#EAF4FF] text-[#0B4EA2]'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span className="truncate">{cat.name}</span>
                                        {cat.books_count !== undefined && (
                                            <span className="rounded-full bg-slate-200/70 px-2 py-0.5 text-[10px] text-slate-600 font-mono">
                                                {cat.books_count}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* DDC Classification Filter */}
                        <div>
                            <h3 className="font-mono-display text-[11px] font-bold uppercase tracking-[0.16em] text-[#0B4EA2]">
                                Klasifikasi DDC
                            </h3>
                            <div className="mt-3 space-y-1 max-h-60 overflow-y-auto pr-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDdc('');
                                        applyFilters({ ddc: undefined });
                                    }}
                                    className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-semibold transition-colors ${
                                        !ddc ? 'bg-[#EAF4FF] text-[#0B4EA2]' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                                >
                                    <span>Semua DDC</span>
                                </button>
                                {ddcClasses.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => {
                                            setDdc(item.code);
                                            applyFilters({ ddc: item.code });
                                        }}
                                        className={`flex w-full items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium transition-colors ${
                                            ddc === item.code
                                                ? 'bg-[#EAF4FF] text-[#0B4EA2] font-bold'
                                                : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span className="truncate">{item.code} {item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="flex items-center gap-2 text-xs font-bold text-[#0B4EA2] hover:underline pt-2"
                            >
                                <RotateCcw size={13} />
                                <span>Reset Semua Filter</span>
                            </button>
                        )}
                    </aside>

                    {/* BOOK GRID & PAGINATION */}
                    <div>
                        {/* Results Summary Bar */}
                        <div className="mb-6 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                                Menampilkan <strong className="text-[#0F172A]">{books.data.length}</strong> dari{' '}
                                <strong className="text-[#0F172A]">{books.total}</strong> koleksi buku
                            </span>
                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={handleReset}
                                    className="text-xs font-bold text-[#0B4EA2] hover:underline lg:hidden"
                                >
                                    Reset Filter
                                </button>
                            )}
                        </div>

                        {books.data.length > 0 ? (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6">
                                {books.data.map((book) => (
                                    <BookCard key={book.id} book={book} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState
                                title="Buku Tidak Ditemukan"
                                description="Tidak ada koleksi yang cocok dengan filter atau kata kunci yang Anda masukkan."
                                action={
                                    <button
                                        type="button"
                                        onClick={handleReset}
                                        className="rounded-xl bg-[#0B4EA2] px-5 py-2.5 text-xs font-bold text-white"
                                    >
                                        Hapus Semua Filter
                                    </button>
                                }
                            />
                        )}

                        {/* Pagination */}
                        {books.last_page > 1 && (
                            <div className="mt-12 flex items-center justify-center gap-2 border-t border-slate-200/80 pt-8">
                                {books.links.map((link, index) => {
                                    if (link.url === null) {
                                        return (
                                            <span
                                                key={index}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                                className="rounded-xl px-3 py-2 text-xs text-slate-300"
                                            />
                                        );
                                    }
                                    return (
                                        <Link
                                            key={index}
                                            href={link.url}
                                            preserveScroll
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors ${
                                                link.active
                                                    ? 'bg-[#0B4EA2] text-white'
                                                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE FILTER MODAL */}
            {mobileFilterOpen && (
                <div className="fixed inset-0 z-50 flex items-end bg-slate-950/50 backdrop-blur-sm lg:hidden">
                    <div className="max-h-[85vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <h2 className="font-display text-lg font-bold text-[#0F172A]">Filter Koleksi</h2>
                            <button
                                type="button"
                                onClick={() => setMobileFilterOpen(false)}
                                className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="mt-6 space-y-6">
                            {/* Status */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Ketersediaan
                                </label>
                                <select
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold outline-none"
                                >
                                    <option value="all">Semua Status</option>
                                    <option value="available">Tersedia di Rak</option>
                                    <option value="borrowed">Sedang Dipinjam</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Kategori
                                </label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold outline-none"
                                >
                                    <option value="">Semua Kategori</option>
                                    {categories.map((c) => (
                                        <option key={c.id} value={c.slug}>
                                            {c.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* DDC */}
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                    Klasifikasi DDC
                                </label>
                                <select
                                    value={ddc}
                                    onChange={(e) => setDdc(e.target.value)}
                                    className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold outline-none"
                                >
                                    <option value="">Semua DDC</option>
                                    {ddcClasses.map((d) => (
                                        <option key={d.id} value={d.code}>
                                            {d.code} {d.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex gap-3 pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => {
                                        handleReset();
                                        setMobileFilterOpen(false);
                                    }}
                                    className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-700"
                                >
                                    Reset
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        applyFilters();
                                        setMobileFilterOpen(false);
                                    }}
                                    className="flex-1 rounded-xl bg-[#0B4EA2] py-3 text-sm font-bold text-white"
                                >
                                    Terapkan Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </SiteShell>
    );
}
