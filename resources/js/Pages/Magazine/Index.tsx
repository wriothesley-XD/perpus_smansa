import { Head, Link } from '@inertiajs/react';
import { BookOpen, Calendar, ChevronRight, Eye, FileText } from 'lucide-react';
import React from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Magazine, MagazineEdition, PaginatedResponse } from '../../types/library';

interface MagazineIndexProps {
    magazines: Magazine[];
    editions: PaginatedResponse<MagazineEdition>;
}

export default function MagazineIndex({ magazines, editions }: MagazineIndexProps) {
    return (
        <SiteShell>
            <Head title="E-Magazine — Perpustakaan SMAN 1 Bukittinggi" />

            {/* Header Banner */}
            <div className="border-b border-slate-200/80 bg-white py-12">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Publikasi Berkala Sekolah
                    </span>
                    <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                        E-Magazine Genta Smansa
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Wadah apresiasi literasi dan karya jurnalistik siswa SMAN 1 Bukittinggi. Baca edisi cetak dalam format digital interaktif di mana saja.
                    </p>
                </div>
            </div>

            {/* EDITIONS GRID */}
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 sm:gap-8">
                    {editions.data.map((ed) => (
                        <div
                            key={ed.id}
                            className="group flex flex-col rounded-3xl border border-slate-200/90 bg-white p-5 shadow-sm hover-lift"
                        >
                            <div className="aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100 shadow-inner">
                                <img
                                    src={ed.cover_image}
                                    alt={ed.edition_title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>

                            <div className="mt-5 flex flex-1 flex-col">
                                <div className="flex items-center justify-between text-xs text-[#0B4EA2] font-semibold">
                                    <span className="font-mono-display text-[11px] uppercase tracking-wider">
                                        {ed.edition_number}
                                    </span>
                                    <span className="flex items-center gap-1 text-slate-400">
                                        <Calendar size={12} />
                                        <span>{ed.year}</span>
                                    </span>
                                </div>

                                <h2 className="mt-2 font-display text-base font-bold text-[#0F172A] group-hover:text-[#0B4EA2] transition-colors line-clamp-2">
                                    {ed.edition_title}
                                </h2>

                                <p className="mt-2 flex-1 text-xs leading-relaxed text-slate-500 line-clamp-3">
                                    {ed.description || 'Edisi terbitan resmi menyajikan berita, artikel sains, dan karya sastra siswa.'}
                                </p>

                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                                    <span className="text-[11px] text-slate-400">
                                        {ed.page_count ? `${ed.page_count} Halaman` : 'Terbitan Digital'}
                                    </span>
                                    <Link
                                        href={`/magazines/${ed.id}`}
                                        className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B4EA2] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#083c7d] transition-colors"
                                    >
                                        <Eye size={14} />
                                        <span>Baca Edisi Ini</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SiteShell>
    );
}
