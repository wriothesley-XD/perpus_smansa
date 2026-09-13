import { Link } from '@inertiajs/react';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';
import { Book } from '../../types/library';
import { BookCover } from './BookCover';
import { RealPaperClip } from './Ornaments';

interface BookCardProps {
    book: Book;
    compact?: boolean;
    hasClip?: boolean;
    sticker?: string;
}

export function BookCard({ book, hasClip = true, sticker }: BookCardProps) {
    const isAvailable = (book.available_copies_count ?? 0) > 0;
    const authorName = book.authors?.length ? book.authors.map((a) => a.name).join(', ') : 'Penulis belum tercatat';

    return (
        <article className="group relative rounded-[16px] border border-[#e5d9cd] bg-[#fffdf9] p-3 shadow-[0_12px_26px_-20px_rgba(33,42,48,.55)] transition duration-200 hover:-translate-y-1.5 hover:shadow-[0_20px_32px_-18px_rgba(18,59,93,.3)] dark:border-[#29465d] dark:bg-[#14283d]">
            {hasClip && <div className="absolute -top-3.5 left-4 z-20"><RealPaperClip rotate={-10} color="#71808a" /></div>}
            {sticker && <span className="absolute -right-1.5 -top-2 z-20 rounded-full bg-[#e37c5b] px-2.5 py-1 font-mono-display text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">{sticker}</span>}

            <Link href={`/books/${book.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e37c5b] focus-visible:ring-offset-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-[10px] bg-[#edf0ee] shadow-inner dark:bg-[#102237]"><BookCover src={book.cover_image} title={book.title} className="h-full w-full object-cover" /></div>
                <div className="mt-3">
                    <h3 className="line-clamp-2 min-h-[2.35rem] font-display text-[15px] font-bold leading-[1.15] text-[#19283a] transition-colors group-hover:text-[#e37c5b] dark:text-[#edf4f8]">{book.title}</h3>
                    <p className="mt-1 line-clamp-1 text-[11px] text-[#71808a]">{authorName}</p>
                    <div className="mt-2 flex items-center justify-between gap-2"><span className="line-clamp-1 text-[9px] font-mono-display uppercase tracking-wide text-[#9aa4a8]">{book.category?.name || 'Fiksi'}</span><span className={`shrink-0 rounded-full px-2 py-1 text-[8px] font-bold ${isAvailable ? 'bg-[#e3f3e8] text-[#277044]' : 'bg-[#edf0f3] text-[#61717c]'}`}>{isAvailable ? 'Tersedia' : 'Dipinjam'}</span></div>
                </div>
            </Link>
            <Link href={`/books/${book.slug}`} className="mt-3 inline-flex min-h-10 w-full items-center justify-center gap-1.5 rounded-full bg-[#123b5d] px-2 py-2 text-[10px] font-bold text-white transition hover:bg-[#0c2d47] dark:bg-[#e8f1f5] dark:text-[#123b5d]">{isAvailable ? 'Lihat detail & rak' : 'Ingatkan saya'} <ArrowUpRight size={13} /></Link>
        </article>
    );
}
