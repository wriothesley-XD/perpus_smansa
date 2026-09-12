import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Barcode,
    BookMarked,
    BookOpen,
    CheckCircle2,
    Clock,
    Compass,
    GraduationCap,
    MapPin,
    Share2,
    ShieldAlert,
} from 'lucide-react';
import React, { useState } from 'react';
import { Badge } from '../../Components/Common/Badge';
import { BookCard } from '../../Components/Common/BookCard';
import { BookCover } from '../../Components/Common/BookCover';
import { ReservationModal } from '../../Components/Common/ReservationModal';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book } from '../../types/library';
import { RealPaperClip, WashiTapeStrip } from '../../Components/Common/Ornaments';

interface BookDetailProps {
    book: Book;
    relatedBooks: Book[];
}

export function CatalogShow({ book, relatedBooks }: BookDetailProps) {
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
            <Head title={`${book.title} | Katalog Perpustakaan SMAN 1 Bukittinggi`} />

            {/* Breadcrumb Navigation */}
            <div className="paper-grain border-b border-[#e5dfd7] bg-[#fffdf9]">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-8">
                    <Link
                        href="/catalog"
                        className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#0B4EA2] transition-colors"
                    >
                        <ArrowLeft size={16} />
                        <span>Kembali ke Katalog</span>
                    </Link>

                    <button
                        type="button"
                        onClick={handleShare}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                        <Share2 size={13} />
                        <span>{copied ? 'Tautan Disalin!' : 'Bagikan'}</span>
                    </button>
                </div>
            </div>

            {/* BOOK HERO / MAIN INFO */}
            <div className="paper-grain mx-auto max-w-7xl px-6 py-12 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[340px_1fr] lg:gap-14">
                    {/* Left Column: Book Cover & Quick Status */}
                    <div className="flex flex-col items-center">
                            <div className="relative w-full max-w-[280px] sm:max-w-[320px]">
                            <WashiTapeStrip width="70px" height="18px" color="rgba(11,78,162,0.7)" rotate={-2} className="-top-2 left-1/2 -translate-x-1/2 z-20" />
                            <div className="absolute -top-3.5 right-3 z-20">
                                <RealPaperClip rotate={25} color="#788796" />
                            </div>
                            <div className="card-polaroid rotate-[-1deg] transition-transform duration-500 hover:rotate-0">
                                <BookCover
                                    src={book.cover_image}
                                    title={book.title}
                                    className="aspect-[3/4] w-full rounded-sm shadow-xl"
                                />
                                <div className="mt-3 text-center font-handwriting text-sm font-bold">{book.title}</div>
                            </div>
                            <div className="mt-3 text-center font-handwriting text-xs text-[#0B4EA2] font-bold">
                                Koleksi Perpustakaan SMAN 1 Bukittinggi ♡
                            </div>
                        </div>

                        <div className="index-card relative mt-6 w-full max-w-[320px] rotate-[1deg] rounded-sm p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-semibold text-slate-500">Status Koleksi:</span>
                                {isAvailable ? (
                                    <Badge variant="available">
                                        <CheckCircle2 size={12} />
                                        <span>Tersedia</span>
                                    </Badge>
                                ) : (
                                    <Badge variant="borrowed">
                                        <Clock size={12} />
                                        <span>Sedang Dipinjam</span>
                                    </Badge>
                                )}
                            </div>

                            <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4 text-xs text-slate-600">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={13} className="text-[#0B4EA2]" />
                                        <span>Lokasi Rak Fisik:</span>
                                    </span>
                                    <strong className="font-mono text-[#0F172A]">{book.shelf_location}</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <BookOpen size={13} className="text-[#0B4EA2]" />
                                        <span>Total Eksemplar:</span>
                                    </span>
                                    <strong className="text-[#0F172A]">{book.copies?.length ?? 0} Eksemplar</strong>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-1.5">
                                        <CheckCircle2 size={13} className="text-emerald-600" />
                                        <span>Siap Dipinjam:</span>
                                    </span>
                                    <strong className="text-emerald-700">{book.available_copies_count} Eksemplar</strong>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => setReservationOpen(true)}
                                disabled={!isAvailable}
                                className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold shadow-md transition-all ${
                                    isAvailable
                                        ? 'bg-[#0B4EA2] text-white hover:bg-[#083c7d]'
                                        : 'cursor-not-allowed bg-slate-200 text-slate-500'
                                }`}
                            >
                                <BookMarked size={16} />
                                <span>{isAvailable ? 'Reservasi Buku' : 'Semua Eksemplar Dipinjam'}</span>
                            </button>
                        </div>
                    </div>

                    {/* Right Column: Title, Metadata, Synopsis */}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono-display text-xs font-bold uppercase tracking-[0.16em] text-[#0B4EA2]">
                                {book.category?.name}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="font-mono-display text-xs text-slate-500 font-semibold">
                                DDC {book.ddc_class?.code}
                            </span>
                        </div>

                        <h1 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
                            {book.title}
                        </h1>

                        <p className="mt-2 text-base text-slate-600 font-medium">
                            Karya: <strong className="text-[#0F172A]">{authorNames}</strong>
                        </p>

                        {/* Metadata Grid */}
                        <div className="index-card relative mt-8 grid grid-cols-2 gap-3 rounded-sm p-5 sm:grid-cols-4">
                            <div className="absolute -top-3 right-6">
                                <span className="rounded bg-[#EAF4FF] border border-blue-200 px-2 py-0.5 font-mono-display text-[9px] font-bold uppercase tracking-wider text-[#0B4EA2]">
                                    LIBRARY CARD
                                </span>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Penerbit
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A]">
                                    {book.publisher?.name ?? 'Belum tercatat'}
                                </strong>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Tahun Terbit
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A]">
                                    {book.publication_year}
                                </strong>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    ISBN
                                </span>
                                <strong className="mt-1 block font-mono text-xs text-[#0F172A]">
                                    {book.isbn || 'Belum tercatat'}
                                </strong>
                            </div>
                            <div>
                                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Bahasa
                                </span>
                                <strong className="mt-1 block text-xs text-[#0F172A]">
                                    {book.language}
                                </strong>
                            </div>
                        </div>

                        {/* Synopsis */}
                        <div className="mt-8">
                            <h2 className="font-display text-xl font-bold text-[#0F172A]">Sinopsis Buku</h2>
                            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                                {book.synopsis}
                            </p>
                        </div>

                        {/* Physical Copies / Barcodes Status */}
                        {book.copies && book.copies.length > 0 && (
                            <div className="mt-10 border-t border-slate-200 pt-8">
                                <h2 className="font-display text-lg font-bold text-[#0F172A]">
                                    Data Eksemplar Fisik ({book.copies.length})
                                </h2>
                                <p className="mt-1 text-xs text-slate-500">
                                    Setiap buku fisik memiliki barcode unik untuk keperluan sirkulasi peminjaman.
                                </p>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    {book.copies.map((copy, index) => {
                                        const copyAvailable = copy.status === 'available';
                                        return (
                                            <div
                                                key={copy.id}
                                                className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    <Barcode size={20} className="text-slate-400" />
                                                    <div>
                                                        <span className="font-mono font-bold text-slate-800">
                                                            {copy.barcode_identifier}
                                                        </span>
                                                        <span className="block text-[10px] text-slate-500">
                                                            Eksemplar #{index + 1} • {copy.shelf_location || book.shelf_location}
                                                        </span>
                                                    </div>
                                                </div>
                                                <span
                                                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                                        copyAvailable
                                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                            : 'bg-slate-100 text-slate-600'
                                                    }`}
                                                >
                                                    {copyAvailable ? 'Tersedia' : copy.status}
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
                    <div className="mt-20 border-t border-slate-200/80 pt-12">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                                    Koleksi Terkait
                                </span>
                                <h2 className="mt-1 font-display text-2xl font-bold text-[#0F172A]">
                                    Rekomendasi Serupa
                                </h2>
                            </div>
                            <Link
                                href="/catalog"
                                className="text-xs font-bold text-[#0B4EA2] hover:underline"
                            >
                                Lihat Semua Koleksi ?
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
