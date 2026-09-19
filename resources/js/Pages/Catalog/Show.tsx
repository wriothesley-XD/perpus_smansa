import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Barcode,
    BookMarked,
    BookOpen,
    CheckCircle2,
    Clock,
    Eye,
    MapPin,
    Share2,
} from 'lucide-react';
import React, { useState } from 'react';
import { BookCard } from '../../Components/Common/BookCard';
import { BookCover } from '../../Components/Common/BookCover';
import { ReservationModal } from '../../Components/Common/ReservationModal';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book } from '../../types/library';
import { useI18n } from '../../utils/i18n';

interface BookDetailProps {
    book: Book;
    relatedBooks: Book[];
}

export function CatalogShow({ book, relatedBooks }: BookDetailProps) {
    const { t } = useI18n();
    const [reservationOpen, setReservationOpen] = useState(false);
    const [copied, setCopied] = useState(false);

    const isAvailable = (book.available_copies_count ?? 0) > 0;
    const authorNames = book.authors && book.authors.length > 0
        ? book.authors.map((a) => a.name).join(', ')
        : 'Anonim';

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <SiteShell>
            <Head title={`${book.title} | ${t('nav_catalog')} Perpustakaan SMAN 1 Bukittinggi`} />

            {/* Breadcrumb Navigation Bar */}
            <div className="border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 sm:px-8">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#152238] dark:text-slate-400 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>{t('btn_back')} ke Katalog</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors"
                    >
                        <Share2 size={13} />
                        <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
                    </button>
                </div>
            </div>

            {/* BOOK MAIN INFO */}
            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[320px_1fr] lg:gap-14">
                    
                    {/* Left Column: Book Cover & Action Box */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-full max-w-[280px]">
                            <div className="overflow-hidden rounded-2xl bg-white p-2.5 shadow-xl border border-slate-200/80 dark:bg-slate-900/80 dark:border-slate-800">
                                <BookCover
                                    src={book.cover_image}
                                    title={book.title}
                                    className="aspect-[3/4] w-full rounded-xl object-cover shadow-xs"
                                />
                            </div>
                        </div>

                        {/* Quick Loan / Availability Card */}
                        <div className="mt-6 w-full max-w-[280px] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/70">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Status Fisik:</span>
                                {isAvailable ? (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                        <CheckCircle2 size={12} />
                                        <span>Tersedia</span>
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-bold text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
                                        <Clock size={12} />
                                        <span>Sedang Dipinjam</span>
                                    </span>
                                )}
                            </div>

                            <div className="mt-4 space-y-2 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-slate-800 dark:text-slate-400">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                        <MapPin size={13} className="text-[#2699fb]" />
                                        <span>Lokasi Rak:</span>
                                    </span>
                                    <strong className="font-mono text-[#0F172A] dark:text-white">{book.shelf_location || '-'}</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                        <BookOpen size={13} className="text-[#2699fb]" />
                                        <span>Total Eksemplar:</span>
                                    </span>
                                    <strong className="text-[#0F172A] dark:text-white">{book.copies?.length ?? 0}</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
                                        <CheckCircle2 size={13} className="text-emerald-600" />
                                        <span>Dapat Dipinjam:</span>
                                    </span>
                                    <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{book.available_copies_count ?? 0}</strong>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-6 space-y-2.5">
                                <button
                                    type="button"
                                    onClick={() => setReservationOpen(true)}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#152238] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#0f172a] dark:bg-slate-800 dark:hover:bg-slate-700"
                                >
                                    <BookMarked size={14} />
                                    <span>{isAvailable ? 'Pinjam / Reservasi Fisik' : 'Buku Sedang Dipinjam'}</span>
                                </button>

                                <Link
                                    href={`/books/${book.slug}/read`}
                                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2699fb] py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1783df]"
                                >
                                    <Eye size={14} />
                                    <span>Baca Online Sekarang</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Title, Metadata, Synopsis */}
                    <div>
                        <div className="flex flex-wrap items-center gap-2">
                            {book.category?.name && (
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    {book.category.name}
                                </span>
                            )}
                            {book.ddc_class?.code && (
                                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                    DDC {book.ddc_class.code}
                                </span>
                            )}
                        </div>

                        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] dark:text-white sm:text-4xl lg:text-5xl">
                            {book.title}
                        </h1>

                        <p className="mt-2 text-base font-medium text-slate-600 dark:text-slate-300">
                            Karya: <strong className="text-[#0F172A] dark:text-white">{authorNames}</strong>
                        </p>

                        {/* Metadata Grid */}
                        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Penerbit
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A] dark:text-white truncate">
                                    {book.publisher?.name ?? '-'}
                                </strong>
                            </div>
                            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Tahun Terbit
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A] dark:text-white">
                                    {book.publication_year ?? '-'}
                                </strong>
                            </div>
                            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    ISBN
                                </span>
                                <strong className="mt-1 block font-mono text-xs text-[#0F172A] dark:text-white truncate">
                                    {book.isbn || '-'}
                                </strong>
                            </div>
                            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/60">
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Bahasa
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A] dark:text-white">
                                    {book.language || 'Indonesia'}
                                </strong>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="mt-8">
                            <h2 className="font-display text-lg font-bold text-[#0F172A] dark:text-white">Sinopsis Buku</h2>
                            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                {book.synopsis || 'Sinopsis belum tersedia untuk judul koleksi ini.'}
                            </p>
                        </div>

                        {/* Physical Copies */}
                        {book.copies && book.copies.length > 0 && (
                            <div className="mt-10 border-t border-slate-200/80 pt-8 dark:border-slate-800">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-display text-base font-bold text-[#0F172A] dark:text-white">
                                        Eksemplar Fisik ({book.copies.length})
                                    </h2>
                                    <span className="text-xs text-slate-400">Terdaftar di Sistem OPAC</span>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {book.copies.map((copy, index) => {
                                        const copyAvailable = copy.status === 'available';
                                        return (
                                            <div
                                                key={copy.id}
                                                className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white px-4 py-3 text-xs shadow-2xs dark:border-slate-800 dark:bg-slate-900/60"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Barcode size={20} className="text-slate-400" />
                                                    <div>
                                                        <span className="font-mono font-bold text-slate-800 dark:text-slate-100">
                                                            {copy.barcode_identifier}
                                                        </span>
                                                        <span className="block text-[10px] text-slate-500 dark:text-slate-400">
                                                            Salinan #{index + 1} • {copy.shelf_location || book.shelf_location || 'Rak Umum'}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                                                        copyAvailable
                                                            ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                                                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                                    }`}
                                                >
                                                    {copyAvailable ? 'Tersedia' : 'Dipinjam'}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* RELATED BOOKS */}
                {relatedBooks.length > 0 && (
                    <div className="mt-20 border-t border-slate-200/80 pt-12 dark:border-slate-800">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-mono-display text-xs font-bold uppercase tracking-wider text-[#2699fb]">
                                    REKOMENDASI
                                </span>
                                <h2 className="mt-1 font-display text-2xl font-bold text-[#0F172A] dark:text-white">
                                    Buku Terkait Lainnya
                                </h2>
                            </div>
                            <Link
                                href="/catalog"
                                className="text-xs font-bold text-[#2699fb] hover:underline"
                            >
                                Lihat Semua Buku →
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                            {relatedBooks.map((relBook) => (
                                <BookCard key={relBook.id} book={relBook} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* RESERVATION MODAL */}
            <ReservationModal
                book={book}
                isOpen={reservationOpen}
                onClose={() => setReservationOpen(false)}
            />
        </SiteShell>
    );
}

export default CatalogShow;
