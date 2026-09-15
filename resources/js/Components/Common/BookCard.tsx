import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Book } from "../../types/library";
import { BookCover } from "./BookCover";

interface BookCardProps {
    book: Book;
    compact?: boolean;
    hasClip?: boolean;
    sticker?: string;
}

export function BookCard({ book, sticker }: BookCardProps) {
    const isAvailable = (book.available_copies_count ?? 0) > 0;
    const authorName = book.authors?.length
        ? book.authors.map((a) => a.name).join(", ")
        : "Penulis belum tercatat";

    return (
        <article className="group relative flex flex-col rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
            {sticker && (
                <span className="absolute -right-2 -top-2 z-10 rounded-full bg-[#2699fb] px-2.5 py-1 font-mono text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {sticker}
                </span>
            )}
            <Link href={`/books/${book.slug}`} className="block flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2699fb] focus-visible:ring-offset-2">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl bg-gray-100">
                    <BookCover src={book.cover_image} title={book.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    {/* Available badge overlay */}
                    <span className={`absolute bottom-2 right-2 rounded-full px-2 py-0.5 text-[8px] font-bold shadow-sm ${isAvailable ? "bg-[#dcfce7] text-[#166534]" : "bg-gray-100 text-gray-500"}`}>
                        {isAvailable ? "Tersedia" : "Dipinjam"}
                    </span>
                </div>
                <div className="p-3">
                    <h3 className="line-clamp-2 min-h-[2.5rem] font-display text-[14px] font-bold leading-snug text-[#152238] transition-colors group-hover:text-[#2699fb]">
                        {book.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[11px] text-gray-400">{authorName}</p>
                    <p className="mt-1 text-[9px] font-mono uppercase tracking-wide text-gray-300">{book.category?.name || "Umum"}</p>
                </div>
            </Link>
            <div className="px-3 pb-3">
                <Link
                    href={`/books/${book.slug}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#152238] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#2699fb]"
                >
                    {isAvailable ? "Lihat & Reservasi" : "Lihat detail"} <ArrowUpRight size={11} />
                </Link>
            </div>
        </article>
    );
}
