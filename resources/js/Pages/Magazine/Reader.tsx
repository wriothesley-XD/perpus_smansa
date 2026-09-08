import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen, Download, ExternalLink, Maximize2 } from 'lucide-react';
import React, { useState } from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { MagazineEdition } from '../../types/library';

interface MagazineReaderProps {
    edition: MagazineEdition;
    otherEditions: MagazineEdition[];
}

export default function MagazineReader({ edition, otherEditions }: MagazineReaderProps) {
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        const elem = document.getElementById('pdf-reader-frame');
        if (!elem) return;

        if (!document.fullscreenElement) {
            elem.requestFullscreen().catch((err) => {
                alert(`Gagal layar penuh: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    return (
        <SiteShell>
            <Head title={`Membaca: ${edition.edition_title} — Perpustakaan SMAN 1 Bukittinggi`} />

            {/* Reader Header */}
            <div className="border-b border-slate-200/80 bg-white">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
                    <Link
                        href="/magazines"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B4EA2] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Kembali ke E-Magazine</span>
                    </Link>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleFullscreen}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <Maximize2 size={13} />
                            <span>Layar Penuh</span>
                        </button>
                        <a
                            href={edition.pdf_file_path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0B4EA2] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#083c7d] transition-colors"
                        >
                            <ExternalLink size={13} />
                            <span>Buka Tab Baru</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Viewer Section */}
            <div className="mx-auto max-w-7xl px-6 py-8 sm:px-8">
                <div className="mb-6">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-widest text-[#0B4EA2]">
                        {edition.edition_number} • {edition.year}
                    </span>
                    <h1 className="mt-1 font-display text-2xl font-bold text-[#0F172A] sm:text-3xl">
                        {edition.edition_title}
                    </h1>
                </div>

                {/* PDF Viewer Container */}
                <div
                    id="pdf-reader-frame"
                    className="relative aspect-[16/10] w-full min-h-[600px] overflow-hidden rounded-3xl border border-slate-300 bg-slate-900 shadow-2xl"
                >
                    <iframe
                        src={`${edition.pdf_file_path}#toolbar=1&navpanes=0`}
                        title={edition.edition_title}
                        className="h-full w-full border-0"
                    />
                </div>

                {/* Other Editions */}
                {otherEditions.length > 0 && (
                    <div className="mt-16 border-t border-slate-200/80 pt-10">
                        <h2 className="font-display text-xl font-bold text-[#0F172A]">Edisi Lainnya</h2>
                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {otherEditions.map((item) => (
                                <Link
                                    key={item.id}
                                    href={`/magazines/${item.id}`}
                                    className="group rounded-2xl border border-slate-200 bg-white p-3 hover-lift"
                                >
                                    <div className="aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100">
                                        <img
                                            src={item.cover_image}
                                            alt={item.edition_title}
                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                        />
                                    </div>
                                    <h3 className="mt-2 font-display text-xs font-bold text-[#0F172A] group-hover:text-[#0B4EA2] line-clamp-1">
                                        {item.edition_title}
                                    </h3>
                                    <span className="text-[10px] text-slate-400">{item.year}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </SiteShell>
    );
}
