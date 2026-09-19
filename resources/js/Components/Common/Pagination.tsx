import React, { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CornerDownLeft } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    lastPage: number;
    from?: number;
    to?: number;
    total?: number;
    onPageChange: (page: number) => void;
    label?: string; // e.g. "buku", "entri"
}

function getPageRange(current: number, last: number): (number | "...")[] {
    if (last <= 7) return Array.from({ length: last }, (_, i) => i + 1);

    const pages: (number | "...")[] = [];

    // Always show first
    pages.push(1);

    if (current > 3) pages.push("...");

    const rangeStart = Math.max(2, current - 1);
    const rangeEnd = Math.min(last - 1, current + 1);

    for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
    }

    if (current < last - 2) pages.push("...");

    // Always show last
    pages.push(last);

    return pages;
}

export function Pagination({
    currentPage,
    lastPage,
    from,
    to,
    total,
    onPageChange,
    label = "entri",
}: PaginationProps) {
    const [jumpValue, setJumpValue] = useState("");
    const [jumping, setJumping] = useState(false);
    const jumpInputRef = useRef<HTMLInputElement>(null);

    if (lastPage <= 1) return null;

    const pages = getPageRange(currentPage, lastPage);

    const goTo = (page: number) => {
        const clamped = Math.min(Math.max(1, page), lastPage);
        if (clamped !== currentPage) onPageChange(clamped);
    };

    const handleJump = (e: React.FormEvent) => {
        e.preventDefault();
        const num = parseInt(jumpValue, 10);
        if (!isNaN(num)) {
            goTo(num);
            setJumpValue("");
            setJumping(false);
        }
    };

    const btnBase =
        "inline-flex items-center justify-center rounded-full text-xs font-bold transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2699fb]/60";
    const btnNum = `${btnBase} size-9`;
    const btnNav = `${btnBase} size-9 border`;

    return (
        <div className="mt-8 flex flex-col items-center gap-3">
            {/* Info row */}
            {total !== undefined && from !== undefined && to !== undefined && (
                <p className="text-[11px] text-gray-400 dark:text-slate-500">
                    Menampilkan{" "}
                    <span className="font-bold text-[#152238] dark:text-slate-300">
                        {from}–{to}
                    </span>{" "}
                    dari{" "}
                    <span className="font-bold text-[#152238] dark:text-slate-300">
                        {total.toLocaleString("id-ID")}
                    </span>{" "}
                    {label}
                </p>
            )}

            {/* Controls row */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
                {/* First page */}
                <button
                    type="button"
                    onClick={() => goTo(1)}
                    disabled={currentPage === 1}
                    aria-label="Halaman pertama"
                    className={`${btnNav} ${
                        currentPage === 1
                            ? "cursor-not-allowed border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-700"
                            : "border-gray-200 text-gray-500 hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#2699fb]"
                    }`}
                >
                    <ChevronsLeft size={15} />
                </button>

                {/* Previous */}
                <button
                    type="button"
                    onClick={() => goTo(currentPage - 1)}
                    disabled={currentPage === 1}
                    aria-label="Halaman sebelumnya"
                    className={`${btnNav} ${
                        currentPage === 1
                            ? "cursor-not-allowed border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-700"
                            : "border-gray-200 text-gray-500 hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#2699fb]"
                    }`}
                >
                    <ChevronLeft size={15} />
                </button>

                {/* Page numbers */}
                {pages.map((page, i) =>
                    page === "..." ? (
                        <span
                            key={`ellipsis-${i}`}
                            className="inline-flex size-9 items-center justify-center text-xs text-gray-400 dark:text-slate-500"
                        >
                            …
                        </span>
                    ) : (
                        <button
                            key={page}
                            type="button"
                            onClick={() => goTo(page as number)}
                            aria-label={`Halaman ${page}`}
                            aria-current={page === currentPage ? "page" : undefined}
                            className={`${btnNum} ${
                                page === currentPage
                                    ? "bg-[#2699fb] text-white shadow-sm shadow-blue-200 dark:shadow-blue-900/30 scale-110"
                                    : "border border-gray-200 bg-white text-[#152238] hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-[#2699fb]"
                            }`}
                        >
                            {page}
                        </button>
                    )
                )}

                {/* Next */}
                <button
                    type="button"
                    onClick={() => goTo(currentPage + 1)}
                    disabled={currentPage === lastPage}
                    aria-label="Halaman berikutnya"
                    className={`${btnNav} ${
                        currentPage === lastPage
                            ? "cursor-not-allowed border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-700"
                            : "border-gray-200 text-gray-500 hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#2699fb]"
                    }`}
                >
                    <ChevronRight size={15} />
                </button>

                {/* Last page */}
                <button
                    type="button"
                    onClick={() => goTo(lastPage)}
                    disabled={currentPage === lastPage}
                    aria-label="Halaman terakhir"
                    className={`${btnNav} ${
                        currentPage === lastPage
                            ? "cursor-not-allowed border-gray-100 text-gray-300 dark:border-slate-800 dark:text-slate-700"
                            : "border-gray-200 text-gray-500 hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:text-slate-400 dark:hover:border-[#2699fb]"
                    }`}
                >
                    <ChevronsRight size={15} />
                </button>

                {/* Separator */}
                <span className="mx-1 h-5 w-px bg-gray-200 dark:bg-slate-700" aria-hidden="true" />

                {/* Page jump */}
                {jumping ? (
                    <form onSubmit={handleJump} className="flex items-center gap-1">
                        <input
                            ref={jumpInputRef}
                            type="number"
                            min={1}
                            max={lastPage}
                            value={jumpValue}
                            onChange={(e) => setJumpValue(e.target.value)}
                            onBlur={() => {
                                if (!jumpValue) setJumping(false);
                            }}
                            autoFocus
                            placeholder={String(currentPage)}
                            className="w-14 rounded-full border border-[#2699fb] bg-white px-2.5 py-1.5 text-center text-xs font-bold text-[#152238] outline-none ring-2 ring-[#2699fb]/20 dark:bg-slate-900 dark:text-white"
                        />
                        <button
                            type="submit"
                            aria-label="Loncat ke halaman"
                            className="grid size-8 place-items-center rounded-full bg-[#2699fb] text-white transition hover:bg-[#1783df]"
                        >
                            <CornerDownLeft size={13} />
                        </button>
                    </form>
                ) : (
                    <button
                        type="button"
                        onClick={() => {
                            setJumping(true);
                            setTimeout(() => jumpInputRef.current?.focus(), 50);
                        }}
                        className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-[11px] font-bold text-gray-500 transition hover:border-[#2699fb] hover:text-[#2699fb] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400"
                    >
                        Loncat ke hal…
                    </button>
                )}
            </div>

            {/* Page indicator for mobile */}
            <p className="text-[11px] text-gray-400 dark:text-slate-500 sm:hidden">
                Hal. <span className="font-bold text-[#152238] dark:text-slate-300">{currentPage}</span> dari{" "}
                <span className="font-bold text-[#152238] dark:text-slate-300">{lastPage}</span>
            </p>
        </div>
    );
}

export default Pagination;
