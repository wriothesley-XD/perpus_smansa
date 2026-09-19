import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, BookOpen, FileText, Newspaper, Sparkles, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useI18n } from '../../utils/i18n';
import { BrushUnderline, DotCluster, SparkleFourPoint } from '../../Components/Common/Ornaments';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Magazine, MagazineEdition, PaginatedResponse } from '../../types/library';

interface MagazineIndexProps {
    magazines: Magazine[];
    editions: PaginatedResponse<MagazineEdition>;
}

export default function MagazineIndex({ editions, magazines }: MagazineIndexProps) {
    const { t } = useI18n();
    const [selectedTab, setSelectedTab] = useState<'all' | 'magazine' | 'bulletin'>('all');

    const filteredEditions = editions.data.filter((ed) => {
        if (selectedTab === 'all') return true;
        const magType = ed.magazine?.type;
        if (magType) return magType === selectedTab;
        
        // Fallback title detection
        const title = (ed.edition_title + ' ' + (ed.magazine?.title || '')).toLowerCase();
        if (selectedTab === 'bulletin') {
            return title.includes('buletin') || title.includes('kurtaw');
        }
        return !title.includes('buletin');
    });

    const featuredEdition = filteredEditions[0] || editions.data[0];

    return (
        <SiteShell>
            <Head title="E-Magazine & Buletin Kurtaw — Perpustakaan Sunaryaman Musthofa" />

            {/* 1. HERO SECTION */}
            <section className="relative px-6 pt-12 pb-14 sm:px-10 dark:bg-[#090d16]">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* LEFT CONTENT */}
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">
                                Publikasi Resmi SMAN 1 Bukittinggi
                            </span>

                            <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.12] tracking-tight text-[#152238] dark:text-white">
                                Majalah Genta & <br />
                                <span className="relative inline-block">
                                    <span className="relative z-10">Buletin Kurtaw</span>
                                    <BrushUnderline />
                                </span>
                            </h1>

                            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-[#64748b] dark:text-slate-300">
                                Wadah kreativitas literasi, karya tulis ilmiah, liputan prestasi, dan gagasan inspiratif civitas akademika SMAN 1 Bukittinggi dalam format digital interaktif.
                            </p>

                            <div className="mt-7 flex items-center gap-4">
                                <a
                                    href="#daftar-publikasi"
                                    className="rounded-full bg-[#2699fb] px-7 py-3 text-xs font-bold text-white shadow-md hover:bg-[#1783df] transition-all"
                                >
                                    Jelajahi Terbitan ↓
                                </a>
                                <span className="text-xs font-bold text-[#FF8E4F]">
                                    Suara Landbouw Berkarakter
                                </span>
                            </div>
                        </div>

                        {/* RIGHT CONTENT: LAYERED MAGAZINE COVERS */}
                        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center py-6">
                            <SparkleFourPoint size={18} color="#FFC533" className="absolute -top-2 right-8 z-10" />
                            <DotCluster color="#FF8E4F" className="absolute -bottom-4 left-4 z-10 opacity-70" />

                            {/* Back stacked card */}
                            <div className="absolute -left-2 top-8 w-44 rotate-[-6deg] rounded-2xl bg-white p-2 shadow-md dark:bg-slate-800 ring-1 ring-gray-100 dark:ring-slate-700">
                                <div className="aspect-[3/4] bg-slate-100 rounded-xl overflow-hidden dark:bg-slate-700 flex items-center justify-center p-3 text-center">
                                    <span className="font-display text-[11px] font-bold text-slate-500 dark:text-slate-300">
                                        Buletin Kurtaw SMANSA
                                    </span>
                                </div>
                            </div>

                            {/* Main Magazine Cover */}
                            {featuredEdition && (
                                <div className="relative z-10 w-56 rotate-[2deg] rounded-2xl bg-white p-3 shadow-xl transition-transform hover:rotate-0 dark:bg-[#161f30] ring-1 ring-gray-100 dark:ring-slate-700">
                                    <div className="aspect-[3/4] overflow-hidden rounded-xl bg-slate-100 relative">
                                        {featuredEdition.cover_image ? (
                                            <img
                                                src={featuredEdition.cover_image}
                                                alt={featuredEdition.edition_title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-[#152238] to-[#2699fb] p-4 text-white flex flex-col justify-between">
                                                <span className="font-mono text-[9px] uppercase tracking-widest text-blue-200">
                                                    {featuredEdition.magazine?.title || 'SMANSA Press'}
                                                </span>
                                                <span className="font-display text-base font-black">
                                                    {featuredEdition.edition_title}
                                                </span>
                                                <span className="text-[10px] text-blue-100">Tahun {featuredEdition.year}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Edition Badge */}
                                    <div className="absolute -top-3 -right-3 z-20">
                                        <div className="rounded-full bg-[#FFC533] px-3 py-1 font-mono text-[10px] font-extrabold text-[#152238] shadow-md">
                                            EDISI {featuredEdition.edition_number || '01'}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. DAFTAR PUBLIKASI & FILTER */}
            <section id="daftar-publikasi" className="px-6 py-12 sm:px-10 dark:bg-[#090d16]">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h2 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                                Arsip Majalah & Buletin SMANSA
                            </h2>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Pilih kategori untuk membaca Majalah Genta Smansa atau Buletin Kurtaw
                            </p>
                        </div>

                        {/* FILTER TABS */}
                        <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
                            <button
                                type="button"
                                onClick={() => setSelectedTab('all')}
                                className={`rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                    selectedTab === 'all'
                                        ? 'bg-white text-[#152238] shadow-sm dark:bg-[#2699fb] dark:text-white'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                }`}
                            >
                                {t('mag_tab_all')} ({editions.data.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedTab('magazine')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                    selectedTab === 'magazine'
                                        ? 'bg-white text-[#152238] shadow-sm dark:bg-[#2699fb] dark:text-white'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                }`}
                            >
                                <BookOpen size={14} />
                                <span>{t('mag_tab_magazine')}</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setSelectedTab('bulletin')}
                                className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
                                    selectedTab === 'bulletin'
                                        ? 'bg-white text-[#152238] shadow-sm dark:bg-[#2699fb] dark:text-white'
                                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                                }`}
                            >
                                <Newspaper size={14} />
                                <span>{t('mag_tab_bulletin')}</span>
                            </button>
                        </div>
                    </div>

                    {/* EDITIONS GRID */}
                    {filteredEditions.length > 0 ? (
                        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                            {filteredEditions.map((ed, idx) => {
                                const isBulletin =
                                    ed.magazine?.type === 'bulletin' ||
                                    (ed.edition_title + ' ' + (ed.magazine?.title || '')).toLowerCase().includes('buletin') ||
                                    (ed.edition_title + ' ' + (ed.magazine?.title || '')).toLowerCase().includes('kurtaw');

                                return (
                                    <div key={ed.id} className="group flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:border-slate-800 dark:bg-[#121826]">
                                        <div>
                                            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800 relative">
                                                {ed.cover_image ? (
                                                    <img
                                                        src={ed.cover_image}
                                                        alt={ed.edition_title}
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-gradient-to-br from-[#152238] to-[#2699fb] p-3 text-white flex flex-col justify-between text-center">
                                                        <span className="text-[9px] font-mono uppercase tracking-widest text-blue-200">
                                                            {isBulletin ? 'Buletin' : 'Majalah'}
                                                        </span>
                                                        <span className="font-display text-xs font-bold leading-tight">
                                                            {ed.edition_title}
                                                        </span>
                                                        <span className="text-[9px] text-blue-100">{ed.year}</span>
                                                    </div>
                                                )}

                                                {/* Badge */}
                                                <div className="absolute top-2 left-2">
                                                    <span
                                                        className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold shadow-xs ${
                                                            isBulletin
                                                                ? 'bg-[#FF8E4F] text-white'
                                                                : 'bg-[#2699fb] text-white'
                                                        }`}
                                                    >
                                                        {isBulletin ? 'Buletin Kurtaw' : 'Majalah Genta'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3 px-1">
                                                <h3 className="line-clamp-1 font-display text-sm font-bold text-[#152238] transition-colors group-hover:text-[#2699fb] dark:text-white dark:group-hover:text-[#38bdf8]">
                                                    {ed.edition_title}
                                                </h3>
                                                <p className="text-[11px] font-medium text-gray-400 dark:text-slate-400 mt-0.5">
                                                    Edisi {ed.edition_number} · Tahun {ed.year}{' '}
                                                    {ed.page_count ? `· ${ed.page_count} Hal` : ''}
                                                </p>
                                                <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#64748b] dark:text-slate-400">
                                                    {ed.description || 'Edisi resmi literasi SMAN 1 Bukittinggi.'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-3 px-1">
                                            <Link
                                                href={`/magazines/${ed.id}`}
                                                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#2699fb] px-3 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-[#1783df] active:scale-95"
                                            >
                                                <FileText size={13} /> Baca Online <ArrowUpRight size={13} />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-800 dark:bg-[#121826]">
                            <Newspaper size={36} className="mx-auto text-slate-400 dark:text-slate-600" />
                            <p className="mt-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                                Belum ada publikasi pada kategori ini
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Pilih kategori lain atau kembali ke Semua Publikasi untuk melihat edisi tersedia.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSelectedTab('all')}
                                className="mt-4 rounded-xl bg-[#152238] px-4 py-2 text-xs font-bold text-white dark:bg-[#2699fb]"
                            >
                                Tampilkan Semua
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </SiteShell>
    );
}
