import { Head, Link } from '@inertiajs/react';
import React from 'react';
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

export default function MagazineIndex({ editions }: MagazineIndexProps) {
    const featuredEdition = editions.data[0];

    return (
        <SiteShell>
            <Head title="E-Magazine - Perpustakaan SMAN 1 Bukittinggi" />

            {/* 1. HERO: READING TABLE */}
            <section className="paper-grain relative px-6 py-8 sm:px-10 overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                        
                        {/* LEFT CONTENT */}
                        <div>
                            <p className="font-mono-display text-xs font-bold uppercase tracking-wider text-slate-500">
                                THE READING TABLE
                            </p>

                            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-[54px] font-extrabold leading-[1.12] tracking-tight text-[#0F172A]">
                                Majalah digital <br />
                                untuk pikiran yang <br />
                                <span className="text-[#2E8BE6]">lebih luas.</span>
                            </h1>

                            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-slate-600">
                                Jelajahi koleksi e-magazine pilihan, dari sains, teknologi, budaya, hingga gaya hidup.
                            </p>

                            <div className="mt-7 flex items-center gap-6">
                                <a
                                    href="#populer"
                                    className="rounded-full bg-[#0B3866] px-7 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#082B4E] transition-all"
                                >
                                    Jelajahi Semua ➔
                                </a>

                                {/* Handwritten note */}
                                <div className="font-handwriting text-sm text-slate-500 font-bold rotate-[-3deg]">
                                    Read <br />
                                    Explore <br />
                                    Grow
                                </div>
                            </div>
                        </div>

                        {/* RIGHT CONTENT: LAYERED MAGAZINE COVERS */}
                        <div className="relative mx-auto flex w-full max-w-[420px] items-center justify-center py-6">
                            {/* Tape accent */}
                            <WashiTapeStrip width="65px" height="20px" color="rgba(11, 78, 162, 0.8)" rotate={-6} className="-top-3 left-16" />

                            {/* Botanical leaf */}
                            <div className="absolute -bottom-6 -right-6 pointer-events-none">
                                <BotanicalLeaf size={65} color="#2A5C43" rotate={20} />
                            </div>

                            {/* Back stacked card */}
                            <div className="absolute -left-2 top-8 w-44 rotate-[-12deg] rounded-lg bg-white p-2 shadow-md">
                                <div className="aspect-[3/4] bg-slate-200 rounded overflow-hidden">
                                    <div className="h-full w-full bg-[#E5DFD5] flex items-center justify-center font-display text-xs font-bold text-slate-500">
                                        E-Magazine
                                    </div>
                                </div>
                            </div>

                            {/* Main Magazine Cover in Front */}
                            <div className="relative z-10 w-56 rotate-[2deg] rounded-lg bg-white p-2.5 shadow-xl transition-transform hover:rotate-0">
                                <div className="aspect-[3/4] overflow-hidden rounded bg-slate-100 relative">
                                    {featuredEdition?.cover_image ? (
                                        <img
                                            src={featuredEdition.cover_image}
                                            alt={featuredEdition.edition_title}
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-gradient-to-br from-[#0B3866] to-[#041D3F] p-4 text-white flex flex-col justify-between">
                                            <span className="font-mono-display text-[9px] uppercase tracking-widest text-blue-200">
                                                Genta Smansa
                                            </span>
                                            <span className="font-display text-base font-black">
                                                EDISI SPESIAL LITERASI
                                            </span>
                                            <span className="text-[10px] text-blue-200">Tahun 2026</span>
                                        </div>
                                    )}
                                </div>

                                {/* Edition Badge Circle Stamp on Cover */}
                                <div className="absolute -top-4 -right-4 z-20">
                                    <div className="stamp-badge size-14 rotate-12">
                                        <span className="font-mono-display text-[8px] uppercase tracking-wider">EDITION</span>
                                        <span className="text-xs font-black">04</span>
                                        <span className="text-[7px]">2026</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 2. MAJALAH POPULER SECTION */}
            <section id="populer" className="px-6 py-10 sm:px-10">
                <div className="mx-auto max-w-7xl">
                    <div className="flex items-center justify-between">
                        <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F172A]">
                            Majalah Populer
                        </h2>
                        <a href="#populer" className="font-handwriting text-base font-bold text-[#2E8BE6] hover:underline">
                            Lihat Semua ➔
                        </a>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
                        {editions.data.map((ed, idx) => (
                            <div key={ed.id} className="relative group">
                                {idx === 0 && (
                                    <div className="absolute -top-3.5 left-4 z-20">
                                        <RealPaperClip rotate={-10} color="#718096" />
                                    </div>
                                )}
                                <div className="bg-white rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#EDE7DF] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-md">
                                    <div className="aspect-[3/4] overflow-hidden rounded bg-slate-100">
                                        {ed.cover_image ? (
                                            <img
                                                src={ed.cover_image}
                                                alt={ed.edition_title}
                                                className="h-full w-full bg-[#f5efe6] object-contain"
                                            />
                                        ) : (
                                            <div className="h-full w-full bg-slate-800 p-3 text-white flex flex-col justify-between text-center">
                                                <span className="text-[9px] font-mono-display uppercase tracking-widest text-slate-300">
                                                    Majalah
                                                </span>
                                                <span className="font-display text-xs font-bold leading-tight">
                                                    {ed.edition_title}
                                                </span>
                                                <span className="text-[9px] text-slate-400">{ed.year}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="line-clamp-1 font-display text-xs font-bold text-[#0F172A]">
                                            {ed.edition_title}
                                        </h3>
                                        <p className="text-[10px] text-slate-500 mt-0.5">
                                            {ed.edition_number} • {ed.year}
                                        </p>
                                        <Link
                                            href={`/magazines/${ed.id}`}
                                            className="mt-2.5 inline-block rounded-full bg-[#0B3866] px-3 py-1 text-[10px] font-bold text-white hover:bg-[#082B4E]"
                                        >
                                            Baca
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </SiteShell>
    );
}
