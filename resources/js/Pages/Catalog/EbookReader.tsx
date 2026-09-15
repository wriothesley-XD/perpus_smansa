import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Bookmark,
    BookmarkCheck,
    ChevronLeft,
    ChevronRight,
    Clock,
    Lock,
    Maximize2,
    Minimize2,
    RotateCcw,
    ShieldAlert,
    Sliders,
    Type,
    X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Book } from "../../types/library";

interface EbookReaderProps {
    book: Book;
    loan: {
        id: number;
        loan_code: string;
        borrowed_at: string;
        due_at: string;
        is_locked: boolean;
        remaining_hours: number;
        loan_duration_days: number;
    };
    progress: {
        last_page: number;
        total_pages: number;
        bookmarks: number[];
        notes: Record<string, string>;
    };
    readerInfo: {
        name: string;
        identifier: string;
        class: string;
    };
}

export default function EbookReader({ book, loan, progress, readerInfo }: EbookReaderProps) {
    const totalPages = progress.total_pages || 24;
    const [currentPage, setCurrentPage] = useState<number>(progress.last_page || 1);
    const [bookmarks, setBookmarks] = useState<number[]>(progress.bookmarks || []);
    const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showBookmarksList, setShowBookmarksList] = useState(false);
    const [toastMessage, setToastMessage] = useState<string | null>(
        progress.last_page > 1 ? `Melanjutkan dari halaman ${progress.last_page}` : null
    );
    const saveTimerRef = useRef<any>(null);

    // Auto-hide toast after 4s
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 4000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // Anti-Download & DRM Protections
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setToastMessage("Konten e-book dilindungi hak cipta Perpustakaan SMAN 1 Bukittinggi.");
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            // Block Ctrl+S, Ctrl+P, Ctrl+U, Ctrl+C
            if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "c"].includes(e.key.toLowerCase())) {
                e.preventDefault();
                setToastMessage("Fungsi simpan, cetak, dan salin dinonaktifkan untuk melindungi buku digital.");
            }
            // Left / Right arrow navigation
            if (e.key === "ArrowLeft") {
                changePage(currentPage - 1);
            } else if (e.key === "ArrowRight") {
                changePage(currentPage + 1);
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentPage]);

    // Auto-save reading progress to server
    const saveProgressToServer = (page: number, updatedBookmarks: number[]) => {
        if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
        saveTimerRef.current = setTimeout(() => {
            fetch(`/books/${book.id}/save-progress`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || "",
                },
                body: JSON.stringify({
                    last_page: page,
                    total_pages: totalPages,
                    bookmarks: updatedBookmarks,
                }),
            }).catch(() => {});
        }, 600);
    };

    const changePage = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            saveProgressToServer(newPage, bookmarks);
        }
    };

    const toggleBookmark = () => {
        let updated: number[];
        if (bookmarks.includes(currentPage)) {
            updated = bookmarks.filter((p) => p !== currentPage);
            setToastMessage(`Bookmark halaman ${currentPage} dihapus`);
        } else {
            updated = [...bookmarks, currentPage].sort((a, b) => a - b);
            setToastMessage(`Halaman ${currentPage} ditandai sebagai bookmark`);
        }
        setBookmarks(updated);
        saveProgressToServer(currentPage, updated);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
        } else {
            document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
        }
    };

    const handleRenewLoan = () => {
        router.post(`/books/${book.id}/renew-online`);
    };

    // If loan expired, show locked screen
    if (loan.is_locked) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#090d16] p-6 text-white select-none">
                <Head title={`Terkunci: ${book.title} - E-Reader SMANSA`} />
                <div className="relative mx-auto max-w-md rounded-3xl border border-slate-800 bg-[#121824] p-8 text-center shadow-2xl">
                    <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-500/10 text-amber-400">
                        <Lock size={32} />
                    </div>
                    <h1 className="mt-5 font-display text-xl font-black text-white">
                        Masa Peminjaman E-Book Telah Berakhir
                    </h1>
                    <p className="mt-3 text-xs leading-relaxed text-slate-400">
                        Buku digital <strong className="text-white">"{book.title}"</strong> telah melewati batas pinjam online ({loan.loan_duration_days} hari). Halaman terakhir yang Anda baca ({progress.last_page}) serta bookmark Anda tetap aman tersimpan.
                    </p>

                    <div className="mt-6 flex flex-col gap-3">
                        <button
                            type="button"
                            onClick={handleRenewLoan}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#2699fb] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#1783df]"
                        >
                            <RotateCcw size={15} /> Pinjam Kembali E-Book ({loan.loan_duration_days} Hari)
                        </button>
                        <Link
                            href={`/books/${book.slug}`}
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-xs font-bold text-slate-300 transition hover:bg-slate-800"
                        >
                            Kembali ke Detail Buku
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const isCurrentPageBookmarked = bookmarks.includes(currentPage);

    return (
        <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-[#090d16] text-slate-100 select-none">
            <Head title={`Membaca: ${book.title} - E-Reader SMANSA`} />

            {/* ── TOP NAV BAR ── */}
            <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-slate-800/90 bg-[#0f172a]/95 px-4 backdrop-blur-md">
                <div className="flex items-center gap-3 min-w-0">
                    <Link
                        href={`/books/${book.slug}`}
                        aria-label="Kembali ke detail buku"
                        className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                        <ArrowLeft size={17} />
                    </Link>
                    <div className="min-w-0">
                        <h1 className="truncate text-xs font-bold text-white sm:text-sm">{book.title}</h1>
                        <p className="truncate text-[10px] text-slate-400">
                            {book.authors?.map((a) => a.name).join(", ") || "Perpustakaan SMAN 1 Bukittinggi"}
                        </p>
                    </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center gap-2">
                    {/* Loan Timer Badge */}
                    <div className="hidden items-center gap-1.5 rounded-full border border-blue-900/60 bg-blue-950/40 px-3 py-1 text-[10px] font-semibold text-blue-300 sm:flex">
                        <Clock size={12} />
                        <span>Sisa: {loan.remaining_hours} jam</span>
                    </div>

                    {/* Bookmark Toggle Button */}
                    <button
                        type="button"
                        onClick={toggleBookmark}
                        aria-label={isCurrentPageBookmarked ? "Hapus bookmark" : "Tandai bookmark"}
                        className={`grid size-8 place-items-center rounded-full transition ${
                            isCurrentPageBookmarked
                                ? "bg-amber-400/20 text-amber-400"
                                : "text-slate-400 hover:bg-slate-800 hover:text-white"
                        }`}
                    >
                        {isCurrentPageBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>

                    {/* Bookmarks list button */}
                    {bookmarks.length > 0 && (
                        <button
                            type="button"
                            onClick={() => setShowBookmarksList(!showBookmarksList)}
                            className="rounded-full border border-slate-700 bg-slate-800/70 px-2.5 py-1 text-[10px] font-bold text-slate-300 hover:bg-slate-700"
                        >
                            {bookmarks.length} Bookmark
                        </button>
                    )}

                    {/* Font Size Toggle */}
                    <button
                        type="button"
                        onClick={() => setFontSize(fontSize === "base" ? "lg" : fontSize === "lg" ? "sm" : "base")}
                        aria-label="Ubah ukuran huruf"
                        className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                        <Type size={16} />
                    </button>

                    {/* Fullscreen toggle */}
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label="Layar penuh"
                        className="grid size-8 place-items-center rounded-full text-slate-400 transition hover:bg-slate-800 hover:text-white"
                    >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                </div>
            </header>

            {/* ── TOAST NOTIFICATION ── */}
            {toastMessage && (
                <div className="absolute top-16 left-1/2 z-50 -translate-x-1/2 rounded-full border border-slate-700 bg-slate-900/90 px-4 py-1.5 text-xs font-semibold text-white shadow-xl backdrop-blur-md animate-fade-in">
                    {toastMessage}
                </div>
            )}

            {/* ── BOOKMARK DRAWER MODAL ── */}
            {showBookmarksList && (
                <div className="absolute top-16 right-4 z-40 w-64 rounded-2xl border border-slate-800 bg-[#121824] p-4 shadow-2xl">
                    <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Daftar Bookmark</span>
                        <button type="button" onClick={() => setShowBookmarksList(false)} className="text-slate-400 hover:text-white">
                            <X size={15} />
                        </button>
                    </div>
                    <div className="mt-3 max-h-48 space-y-1.5 overflow-y-auto">
                        {bookmarks.map((p) => (
                            <button
                                key={p}
                                type="button"
                                onClick={() => { changePage(p); setShowBookmarksList(false); }}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold ${
                                    p === currentPage ? "bg-[#2699fb] text-white" : "bg-slate-800/60 text-slate-300 hover:bg-slate-800"
                                }`}
                            >
                                <span>Halaman {p}</span>
                                <span className="text-[10px] opacity-70">Lompat ↵</span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── MAIN READING CANVAS AREA ── */}
            <main className="relative flex-1 overflow-y-auto px-4 py-8 sm:px-12 flex items-center justify-center">
                {/* Security DRM Watermark Overlay */}
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center opacity-5 select-none rotate-[-15deg]">
                    <p className="text-2xl font-black uppercase tracking-[0.2em] text-white">
                        Perpustakaan Sunaryaman Musthofa
                    </p>
                    <p className="mt-2 text-sm font-semibold tracking-wider text-white">
                        {readerInfo.name} • NIS: {readerInfo.identifier} • {readerInfo.class}
                    </p>
                </div>

                {/* Simulated Protected Book Page Container */}
                <div
                    className={`relative mx-auto w-full max-w-2xl rounded-2xl border border-slate-800 bg-[#101520] p-8 sm:p-12 shadow-2xl transition-all ${
                        fontSize === "sm" ? "text-xs leading-6" : fontSize === "lg" ? "text-base leading-8" : "text-sm leading-7"
                    }`}
                >
                    {/* Header of page */}
                    <div className="flex items-center justify-between border-b border-slate-800 pb-4 text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                        <span>{book.title}</span>
                        <span>Hal. {currentPage} / {totalPages}</span>
                    </div>

                    {/* Page Content Body */}
                    <div className="mt-6 min-h-[360px] text-slate-300 font-sans">
                        {currentPage === 1 ? (
                            <div className="text-center py-8">
                                <div className="mx-auto aspect-[3/4] w-36 overflow-hidden rounded-xl bg-slate-800 shadow-md">
                                    <img src={book.cover_image || "/images/hero_library.jpg"} alt={book.title} className="h-full w-full object-cover" />
                                </div>
                                <h2 className="mt-6 font-display text-xl font-extrabold text-white">{book.title}</h2>
                                <p className="mt-2 text-xs text-slate-400">
                                    Karya: {book.authors?.map((a) => a.name).join(", ") || "Penulis SMANSA"}
                                </p>
                                <p className="mt-1 text-[10px] font-mono uppercase tracking-wider text-[#2699fb]">
                                    ISBN {book.isbn || "978-602-000-0"} • Tahun {book.publication_year || 2024}
                                </p>
                                <div className="mt-8 rounded-xl bg-blue-950/40 border border-blue-900/40 p-4 text-xs text-blue-200 text-left">
                                    <p className="font-bold mb-1">Sinopsis Resmi:</p>
                                    <p className="line-clamp-4">{book.synopsis || "Buku referensi resmi koleksi Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi."}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h3 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                                    Bab {Math.ceil(currentPage / 3)}: Bagian {currentPage}
                                </h3>
                                <p className="text-justify text-slate-300">
                                    {book.synopsis ? `${book.synopsis.slice(0, 300)}...` : "Perpustakaan SMA Negeri 1 Bukittinggi menyediakan fasilitas membaca buku digital guna mendukung kegiatan pembelajaran berkesinambungan bagi seluruh siswa dan tenaga pendidik."}
                                </p>
                                <p className="text-justify text-slate-300">
                                    Membaca bukan sekadar mengeja deretan kata, melainkan proses membuka jendela pemikiran, menelaah gagasan baru, dan memperkaya kosa kata yang berharga bagi pengembangan kapasitas pribadi siswa SMAN 1 Bukittinggi.
                                </p>
                                <p className="text-justify text-slate-300">
                                    Melalui integrasi koleksi buku kurikulum, sastra daerah Minangkabau, karya ilmiah siswa, dan referensi global, setiap warga sekolah memiliki kesempatan untuk belajar kapan saja dengan penuh kemudahan.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Footer of page */}
                    <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-4 text-[10px] text-slate-500 font-mono">
                        <span className="flex items-center gap-1">
                            <ShieldAlert size={12} className="text-slate-600" /> Hak Cipta Dilindungi
                        </span>
                        <span>Halaman {currentPage} dari {totalPages}</span>
                    </div>
                </div>
            </main>

            {/* ── BOTTOM PAGE CONTROLLER ── */}
            <footer className="z-30 flex h-16 shrink-0 items-center justify-between border-t border-slate-800/90 bg-[#0f172a]/95 px-6 backdrop-blur-md">
                <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => changePage(currentPage - 1)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={15} /> Sebelumnya
                </button>

                {/* Page Slider / Indicator */}
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={1}
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => changePage(parseInt(e.target.value))}
                        className="h-1.5 w-24 sm:w-48 accent-[#2699fb] cursor-pointer"
                    />
                    <span className="font-mono text-xs font-bold text-slate-300">
                        {currentPage} / {totalPages}
                    </span>
                </div>

                <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => changePage(currentPage + 1)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#1783df] disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    Selanjutnya <ChevronRight size={15} />
                </button>
            </footer>
        </div>
    );
}
