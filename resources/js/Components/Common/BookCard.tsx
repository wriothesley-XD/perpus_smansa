import { Link } from "@inertiajs/react";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Book } from "../../types/library";
import { BookCover } from "./BookCover";
import { Tooltip } from "./Tooltip";
import { useI18n } from "../../utils/i18n";

interface BookCardProps {
    book: Book;
    compact?: boolean;
    hasClip?: boolean;
    sticker?: string;
    showButton?: boolean;
}

export function BookCard({ book, sticker, showButton = false }: BookCardProps) {
    const { t } = useI18n();
    const isAvailable = (book.available_copies_count ?? 0) > 0;
    const authorName = book.authors?.length
        ? book.authors.map((a) => a.name).join(", ")
        : "Penulis belum tercatat";

    return (
        <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100/90 bg-white p-2.5 shadow-xs transition duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:border-slate-800 dark:bg-[#111726]">
            {sticker && (
                <span className="absolute right-3 top-3 z-10 rounded-full bg-[#2699fb] px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white shadow-sm">
                    {sticker}
                </span>
            )}
            <Link
                href={`/books/${book.slug}`}
                className="block flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2699fb] focus-visible:ring-offset-2"
            >
                {/* Book Cover Image */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                    <BookCover
                        src={book.cover_image}
                        title={book.title}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    {/* Availability status badge with Tooltip */}
                    <div className="absolute bottom-2 right-2">
                        <Tooltip
                            content={
                                isAvailable
                                    ? `Tersedia: ${book.available_copies_count ?? 1} eksemplar`
                                    : "Sedang dipinjam seluruhnya"
                            }
                            position="top"
                        >
                            <span
                                className={`rounded-full px-2 py-0.5 text-[8px] font-bold shadow-xs cursor-default ${
                                    isAvailable
                                        ? "bg-[#dcfce7]/95 text-[#166534] backdrop-blur-xs"
                                        : "bg-gray-100/95 text-gray-500 backdrop-blur-xs"
                                }`}
                            >
                                {isAvailable ? t("status_available") : t("status_borrowed")}
                            </span>
                        </Tooltip>
                    </div>
                </div>

                {/* Details */}
                <div className="pt-3 pb-1 px-1">
                    {/* Category pill badge as shown in mockup */}
                    <div className="mb-1.5">
                        <span className="inline-block rounded-full bg-blue-50/90 px-2.5 py-0.5 text-[10px] font-bold text-[#2699fb] dark:bg-blue-950/70 dark:text-sky-300">
                            {book.category?.name || "Koleksi"}
                        </span>
                    </div>

                    <h3 className="line-clamp-2 min-h-[2.4rem] font-display text-[13.5px] font-bold leading-snug text-[#152238] transition-colors group-hover:text-[#2699fb] dark:text-white dark:group-hover:text-[#38bdf8]">
                        {book.title}
                    </h3>
                    <p className="mt-1 line-clamp-1 text-[11px] font-medium text-gray-400 dark:text-slate-400">
                        {authorName}
                    </p>
                </div>
            </Link>

            {showButton && (
                <div className="pt-2 px-1 pb-1">
                    <Link
                        href={`/books/${book.slug}`}
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#152238] px-3 py-2 text-[10px] font-bold text-white transition hover:bg-[#2699fb] dark:bg-[#2699fb] dark:hover:bg-[#1984dc]"
                    >
                        {isAvailable ? t("btn_view_reserve") : t("btn_view_detail")} <ArrowUpRight size={11} />
                    </Link>
                </div>
            )}
        </article>
    );
}
