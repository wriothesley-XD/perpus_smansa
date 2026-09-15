import { Head, Link } from '@inertiajs/react';
import { ArrowUpRight, BookOpen, FileText, Newspaper, Sparkles, Filter } from 'lucide-react';
import React, { useState } from 'react';
import { useI18n } from '../../utils/i18n';
import {
    BotanicalLeaf,
    HandDrawnStar,
    RealPaperClip,
    WashiTapeStrip,
} from '../../Components/Common/Ornaments';
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
            <Head title="E-Magazine & Buletin Kurtaw — Perpustakaan SMAN 1 Bukittinggi" />

            {/* 1. HERO SECTION */}
            <section className="paper-grain relative px-6 py-10 sm:px-10 overflow-hidden dark:bg-[#0c121e]">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        {/* LEFT CONTENT */}
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F1F5] px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#152238] dark:bg-[#152238] dark:text-[#2699fb]">
                                <Sparkles size={12} className="text-[#FF8E4F]" />
                                PUBLIKASI RESMI SMAN 1 BUKITTINGGI
                            </div>

                            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-[#0F172A] dark:text-white">
                                Majalah Genta & <br />
                                <span className="text-[#FF8E4F]">Buletin Kurtaw</span> SMANSA
                            </h1>

                            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                Wadah kreativitas literasi, karya tulis ilmiah, liputan prestasi, dan gagasan inspiratif siswa serta guru SMAN 1 Bukittinggi dalam format digital yang interaktif.
                            </p>

                            <div className="mt-7 flex items-center gap-5">
                                <a
                                    href="#daftar-publikasi"
                                    className="rounded-full bg-[#152238] px-7 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#0f172a] transition-all dark:bg-[#2699fb] dark:hover:bg-[#1a83e0]"
                                >
                                    Jelajahi Terbitan ↓
                                </a>

                                <div className="font-handwriting text-base text-[#FF8E4F] font-bold rotate-[-3deg]">
                                    Suara Landbouw <br />
                                    Berkarakter Unggul
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT: LAYERED MAGAZINE COVERS */}
                        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center py-6">
                            <WashiTapeStrip width="65px" height="20px" color="rgba(11, 78, 162, 0.8)" rotate={-6} className="-top-3 left-16" />

                            <div className="absolute -bottom-6 -right-6 pointer-events-none">
                                <BotanicalLeaf size={65} color="#2A5C43" rotate={20} />
                            </div>

                            {/* Back stacked card */}
                            <div className="absolute -left-2 top-8 w-44 rotate-[-12deg] rounded-xl bg-white p-2 shadow-md dark:bg-slate-800">
                                <div className="aspect-[3/4] bg-slate-200 rounded-lg overflow-hidden dark:bg-slate-700 flex items-center justify-center p-3 text-center">
                                    <span className="font-display text-[11px] font-bold text-slate-500 dark:text-slate-300">
                                        Buletin Kurtaw SMANSA
                                    </span>
                                </div>
                            </div>

                            {/* Main Magazine Cover */}
                            {featuredEdition && (
                                <div className="relative z-10 w-56 rotate-[2deg] rounded-xl bg-white p-2.5 shadow-2xl transition-transform hover:rotate-0 dark:bg-[#161f30] dark:border dark:border-slate-700">
                                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 relative">
                                        {featuredEdition.cover_image ? (
                                            <img
                                                src={featuredEdition.cover_image}
                                                alt={featuredEdition.edition_title}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-gradient-to-br from-[#152238] to-[#041D3F] p-4 text-white flex flex-col justify-between">
                                                <span className="font-mono-display text-[9px] uppercase tracking-widest text-blue-200">
                                                    {featuredEdition.magazine?.title || 'SMANSA Press'}
                                                </span>
                                                <span className="font-display text-base font-black">
                                                    {featuredEdition.edition_title}
                                                </span>
                                                <span className="text-[10px] text-blue-200">Tahun {featuredEdition.year}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Edition Badge Circle */}
                                    <div className="absolute -top-4 -right-4 z-20">
                                        <div className="stamp-badge size-14 rotate-12 bg-[#FFC533] text-[#152238] shadow-md">
                                            <span className="font-mono-display text-[8px] uppercase tracking-wider">EDISI</span>
                                            <span className="text-xs font-black">{featuredEdition.edition_number || '01'}</span>
                                            <span className="text-[7px]">{featuredEdition.year || '2026'}</span>
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
                                    <div key={ed.id} className="relative group">
                                        {idx === 0 && (
                                            <div className="absolute -top-3.5 left-4 z-20">
                                                <RealPaperClip rotate={-10} color="#718096" />
                                            </div>
                                        )}
                                        <div className="bg-white rounded-xl p-3.5 shadow-sm border border-[#EDE7DF] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md dark:bg-[#121826] dark:border-slate-800">
                                            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800 relative">
                                                {ed.cover_image ? (
                                                    <img
                                                        src={ed.cover_image}
                                                        alt={ed.edition_title}
                                                        className="h-full w-full bg-[#f5efe6] object-contain dark:bg-slate-900"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-slate-800 p-3 text-white flex flex-col justify-between text-center">
                                                        <span className="text-[9px] font-mono-display uppercase tracking-widest text-slate-300">
                                                            {isBulletin ? 'Buletin' : 'Majalah'}
                                                        </span>
                                                        <span className="font-display text-xs font-bold leading-tight">
                                                            {ed.edition_title}
                                                        </span>
                                                        <span className="text-[9px] text-slate-400">{ed.year}</span>
                                                    </div>
                                                )}

                                                {/* Badge */}
                                                <div className="absolute top-2 left-2">
                                                    <span
                                                        className={`rounded px-2 py-0.5 text-[9px] font-bold shadow-sm ${
                                                            isBulletin
                                                                ? 'bg-[#FF8E4F] text-white'
                                                                : 'bg-[#152238] text-white dark:bg-[#2699fb]'
                                                        }`}
                                                    >
                                                        {isBulletin ? 'Buletin Kurtaw' : 'Majalah Genta'}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-3">
                                                <h3 className="line-clamp-1 font-display text-xs font-bold text-[#0F172A] dark:text-white">
                                                    {ed.edition_title}
                                                </h3>
                                                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                                                    Edisi {ed.edition_number} · Tahun {ed.year}{' '}
                                                    {ed.page_count ? `· ${ed.page_count} Hal` : ''}
                                                </p>
                                                <p className="mt-1.5 line-clamp-2 min-h-8 text-[10px] leading-4 text-slate-500 dark:text-slate-400">
                                                    {ed.description || 'Edisi resmi literasi SMAN 1 Bukittinggi.'}
                                                </p>
                                                <Link
                                                    href={`/magazines/${ed.id}`}
                                                    className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#152238] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#0f172a] transition-colors dark:bg-[#2699fb] dark:hover:bg-[#1a83e0]"
                                                >
                                                    <FileText size={13} /> Baca Online <ArrowUpRight size={13} />
                                                </Link>
                                            </div>
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
