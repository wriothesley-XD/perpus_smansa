import { Link } from '@inertiajs/react';
import { ArrowUpRight, CheckCircle2, Clock } from 'lucide-react';
import React from 'react';
import { Book } from '../../types/library';
import { Badge } from './Badge';
import { BookCover } from './BookCover';

interface BookCardProps {
    book: Book;
    compact?: boolean;
}

export function BookCard({ book, compact = false }: BookCardProps) {
    const isAvailable = (book.available_copies_count ?? 0) > 0;
    const authorName = book.authors && book.authors.length > 0
        ? book.authors.map((a) => a.name).join(', ')
        : 'Penulis Anonim';

    return (
        <Link
            href={`/books/${book.slug}`}
            className="group relative flex flex-col rounded-2xl border border-slate-200/90 bg-white p-3.5 transition-all duration-300 hover-lift hover:border-[#0B4EA2]/30"
        >
            <div className="relative overflow-hidden rounded-xl">
                <BookCover
                    src={book.cover_image}
                    title={book.title}
                    className="aspect-[3/4] w-full"
                />
            </div>

            <div className="flex flex-1 flex-col pt-3.5">
                <div className="flex items-center justify-between gap-1">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.14em] text-[#0B4EA2]">
                        {book.category?.name ?? 'Koleksi'}
                    </span>
                    <ArrowUpRight
                        size={15}
                        className="text-slate-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0B4EA2]"
                    />
                </div>

                <h3 className="mt-1.5 line-clamp-2 min-h-[44px] font-display text-[15px] font-bold leading-snug text-[#0F172A] group-hover:text-[#0B4EA2] transition-colors">
                    {book.title}
                </h3>

                <p className="mt-0.5 truncate text-xs text-[#64748B]">
                    {authorName}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                    {isAvailable ? (
                        <Badge variant="available">
                            <CheckCircle2 size={12} className="shrink-0" />
                            <span>{book.available_copies_count} Tersedia</span>
                        </Badge>
                    ) : (
                        <Badge variant="borrowed">
                            <Clock size={12} className="shrink-0" />
                            <span>Dipinjam</span>
                        </Badge>
                    )}
                    <span className="font-mono-display text-[11px] font-semibold text-slate-400">
                        {book.publication_year}
                    </span>
                </div>
            </div>
        </Link>
    );
}
