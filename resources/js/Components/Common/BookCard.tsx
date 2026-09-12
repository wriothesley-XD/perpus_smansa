import { Link } from '@inertiajs/react';
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
    const authorName = book.authors && book.authors.length > 0
        ? book.authors.map((a) => a.name).join(', ')
        : 'Penulis';

    return (
        <div className="relative group">
            {/* Scrapbook Paperclip on top-left or top-right */}
            {hasClip && (
                <div className="absolute -top-3.5 left-4 z-20">
                    <RealPaperClip rotate={-10} color="#718096" />
                </div>
            )}

            {/* Sticker ribbon if any */}
            {sticker && (
                <div className="absolute -top-2.5 right-2 z-20">
                    <span className="inline-block bg-blue-600 text-white font-handwriting text-xs font-bold px-2.5 py-0.5 rounded shadow-sm rotate-6">
                        {sticker}
                    </span>
                </div>
            )}

            <Link
                href={`/books/${book.slug}`}
                className="block bg-white rounded-lg p-3 shadow-[0_4px_16px_rgba(0,0,0,0.06)] border border-[#EDE7DF] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_12px_24px_rgba(11,78,162,0.12)]"
            >
                {/* Book Cover Frame */}
                <div className="relative overflow-hidden rounded bg-slate-100 shadow-sm">
                    <BookCover
                        src={book.cover_image}
                        title={book.title}
                        className="aspect-[3/4.2] w-full object-cover"
                    />
                </div>

                {/* Book Details */}
                <div className="mt-3 flex flex-col">
                    <h3 className="line-clamp-1 font-display text-[13px] font-bold text-[#0F172A] group-hover:text-[#2E8BE6] transition-colors">
                        {book.title}
                    </h3>
                    <p className="line-clamp-1 text-[11px] text-slate-500 mt-0.5">
                        {authorName}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                        {book.category?.name || 'Fiksi'} • {book.shelf_location || 'R.12'}
                    </p>

                    {/* Status badge pill */}
                    <div className="mt-2.5">
                        {isAvailable ? (
                            <span className="inline-block rounded-full bg-[#E2F7EB] px-2.5 py-0.5 text-[9px] font-bold text-[#15803D]">
                                Tersedia
                            </span>
                        ) : (
                            <span className="inline-block rounded-full bg-[#EBF2FC] px-2.5 py-0.5 text-[9px] font-bold text-[#0B3866]">
                                Dipinjam
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </div>
    );
}