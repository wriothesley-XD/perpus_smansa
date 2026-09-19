import { Head, Link, router } from "@inertiajs/react";
import {
    ArrowLeft,
    Bookmark,
    BookmarkCheck,
    BookOpen,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock,
    Columns2,
    ListTree,
    Lock,
    Maximize2,
    Minimize2,
    Moon,
    RotateCcw,
    ShieldAlert,
    Square,
    Sun,
    Type,
    Volume2,
    VolumeX,
    X,
} from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Book } from "../../types/library";
import { useI18n } from "../../utils/i18n";
import { BookPageContent, getBookPages } from "./bookContentData";

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
    hasPdf: boolean;
}

type PaperMood = "sepia" | "white" | "night";

// Native Web Audio API paper flip sound generator (Zero external assets needed!)
const playPaperFlipSound = () => {
    try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const bufferSize = ctx.sampleRate * 0.14;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(650, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.14);
        filter.Q.setValueAtTime(2.5, ctx.currentTime);

        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.14);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        noise.start();
        setTimeout(() => ctx.close(), 200);
    } catch {
        // Silently ignore if blocked by browser policy
    }
};

export default function EbookReader({ book, loan, progress, readerInfo, hasPdf }: EbookReaderProps) {
    const { t } = useI18n();
    const totalPages = Math.max(24, progress.total_pages || 24);
    const [currentPage, setCurrentPage] = useState<number>(progress.last_page || 1);
    const [bookmarks, setBookmarks] = useState<number[]>(progress.bookmarks || []);
    const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showBookmarksList, setShowBookmarksList] = useState(false);
    const [showToc, setShowToc] = useState(false);
    const [viewMode, setViewMode] = useState<"canvas" | "pdf">("canvas");
    const [paperMood, setPaperMood] = useState<PaperMood>(() => {
        return (localStorage.getItem("smansa_reader_mood") as PaperMood) || "sepia";
    });
    const [spreadMode, setSpreadMode] = useState<"double" | "single">("double");
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

    interface FlippingState {
        direction: "next" | "prev";
        targetPage: number;
        turningPageFront: BookPageContent | null;
        turningPageBack: BookPageContent | null;
        newUnderlyingLeft: BookPageContent | null;
        newUnderlyingRight: BookPageContent | null;
    }

    const [flippingState, setFlippingState] = useState<FlippingState | null>(null);
    const [studentNote, setStudentNote] = useState<string>(progress.notes?.["reflection"] || "");
    const [toastMessage, setToastMessage] = useState<string | null>(
        progress.last_page > 1 ? `Melanjutkan dari halaman ${progress.last_page}` : null
    );

    const saveTimerRef = useRef<any>(null);

    // Generate full page content dataset
    const pages = useMemo(() => getBookPages(book, totalPages), [book, totalPages]);

    // Save paper mood preference
    const handleSetPaperMood = (mood: PaperMood) => {
        setPaperMood(mood);
        localStorage.setItem("smansa_reader_mood", mood);
    };

    // Auto-hide toast
    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => setToastMessage(null), 3500);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    // Responsive spread mode default
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setSpreadMode("single");
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // DRM & Keyboard Navigation
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            setToastMessage("Konten e-book dilindungi hak cipta Perpustakaan SMAN 1 Bukittinggi.");
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && ["s", "p", "u", "c"].includes(e.key.toLowerCase())) {
                e.preventDefault();
                setToastMessage("Fungsi simpan, cetak, dan salin dinonaktifkan untuk melindungi buku digital.");
            }
            if (e.key === "ArrowLeft") {
                navigatePage("prev");
            } else if (e.key === "ArrowRight" || e.key === " ") {
                e.preventDefault();
                navigatePage("next");
            }
        };

        window.addEventListener("contextmenu", handleContextMenu);
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("contextmenu", handleContextMenu);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [currentPage, spreadMode, totalPages, soundEnabled]);

    // Auto-save reading progress to server
    const saveProgressToServer = (page: number, updatedBookmarks: number[], updatedNote?: string) => {
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
                    notes: { reflection: updatedNote ?? studentNote },
                }),
            }).catch(() => {});
        }, 600);
    };

    const navigatePage = (direction: "next" | "prev") => {
        let step = spreadMode === "double" && currentPage > 1 ? 2 : 1;
        if (currentPage === 1 && direction === "next") {
            step = 1;
        }

        let newPage = direction === "next" ? currentPage + step : currentPage - step;
        if (spreadMode === "double" && newPage > 1 && newPage % 2 !== 0 && direction === "prev") {
            newPage = newPage - 1;
        }

        if (newPage >= 1 && newPage <= totalPages) {
            triggerPageTurn(newPage, direction);
        }
    };

    const triggerPageTurn = (targetPage: number, direction: "next" | "prev") => {
        if (soundEnabled) {
            playPaperFlipSound();
        }

        let front: BookPageContent | null = null;
        let back: BookPageContent | null = null;
        let underLeft: BookPageContent | null = null;
        let underRight: BookPageContent | null = null;

        const isTargetCover = targetPage === 1;
        const targetLeftNum = isTargetCover ? 1 : targetPage % 2 === 0 ? targetPage : targetPage - 1;
        const targetRightNum = isTargetCover ? null : targetLeftNum + 1 <= totalPages ? targetLeftNum + 1 : null;

        if (direction === "next") {
            // Turning the current right page over to the left
            front = rightPageData || leftPageData || null;
            back = pages.find((p) => p.pageNumber === targetLeftNum) || null;
            underLeft = leftPageData || null;
            underRight = targetRightNum ? pages.find((p) => p.pageNumber === targetRightNum) || null : null;
        } else {
            // Turning the current left page back over to the right
            front = leftPageData || null;
            back = targetRightNum ? pages.find((p) => p.pageNumber === targetRightNum) || null : null;
            underLeft = pages.find((p) => p.pageNumber === targetLeftNum) || null;
            underRight = rightPageData || null;
        }

        setFlippingState({
            direction,
            targetPage,
            turningPageFront: front,
            turningPageBack: back,
            newUnderlyingLeft: underLeft,
            newUnderlyingRight: underRight,
        });

        setTimeout(() => {
            setCurrentPage(targetPage);
            setFlippingState(null);
            saveProgressToServer(targetPage, bookmarks);
        }, 480);
    };

    const jumpToPage = (targetPage: number) => {
        const clamped = Math.max(1, Math.min(totalPages, targetPage));
        if (soundEnabled) playPaperFlipSound();
        setCurrentPage(clamped);
        setShowToc(false);
        setShowBookmarksList(false);
        saveProgressToServer(clamped, bookmarks);
    };

    const toggleBookmark = () => {
        let updated: number[];
        const pageToBookmark = currentPage;
        if (bookmarks.includes(pageToBookmark)) {
            updated = bookmarks.filter((p) => p !== pageToBookmark);
            setToastMessage(`Bookmark halaman ${pageToBookmark} dihapus`);
        } else {
            updated = [...bookmarks, pageToBookmark].sort((a, b) => a - b);
            setToastMessage(`Halaman ${pageToBookmark} ditandai sebagai bookmark`);
        }
        setBookmarks(updated);
        saveProgressToServer(pageToBookmark, updated);
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

    // Calculate left and right page in spread mode
    const isCover = currentPage === 1;
    const leftPageNum = isCover ? 1 : currentPage % 2 === 0 ? currentPage : currentPage - 1;
    const rightPageNum = isCover ? null : leftPageNum + 1 <= totalPages ? leftPageNum + 1 : null;

    const leftPageData = pages.find((p) => p.pageNumber === leftPageNum);
    const rightPageData = rightPageNum ? pages.find((p) => p.pageNumber === rightPageNum) : null;

    const isLeftBookmarked = bookmarks.includes(leftPageNum);
    const isRightBookmarked = rightPageNum ? bookmarks.includes(rightPageNum) : false;
    const isCurrentSpreadBookmarked = isLeftBookmarked || isRightBookmarked;

    // Mood Theme Colors
    const moodClasses = {
        sepia: {
            desk: "bg-[#eee7dc] text-[#2c241c]",
            paper: "bg-[#fbf7ed] border-[#e6dcce] text-[#2c241c]",
            creaseLeft: "shadow-[inset_-22px_0_24px_-14px_rgba(44,36,28,0.18)]",
            creaseRight: "shadow-[inset_22px_0_24px_-14px_rgba(44,36,28,0.18)]",
            headerBorder: "border-[#e6dcce] text-[#827464]",
            footerBorder: "border-[#e6dcce] text-[#827464]",
            callout: "bg-[#f4ecdc] border-[#ded0bb] text-[#4a3d2e]",
            badge: "bg-[#4a3d2e] text-[#fbf7ed]",
            tableHeader: "bg-[#f0e4d0] text-[#33281d]",
            tableBorder: "border-[#e2d5c0]",
            topNav: "bg-[#fcfaf5]/95 border-[#ded3c2] text-[#2c241c]",
            bottomNav: "bg-[#fcfaf5]/95 border-[#ded3c2] text-[#2c241c]",
            accentText: "text-[#8a4b16]",
        },
        white: {
            desk: "bg-[#edf2f7] text-slate-800",
            paper: "bg-white border-slate-200 text-slate-800",
            creaseLeft: "shadow-[inset_-22px_0_24px_-14px_rgba(0,0,0,0.14)]",
            creaseRight: "shadow-[inset_22px_0_24px_-14px_rgba(0,0,0,0.14)]",
            headerBorder: "border-slate-200 text-slate-400",
            footerBorder: "border-slate-200 text-slate-400",
            callout: "bg-blue-50/70 border-blue-100 text-blue-900",
            badge: "bg-blue-600 text-white",
            tableHeader: "bg-slate-100 text-slate-700",
            tableBorder: "border-slate-200",
            topNav: "bg-white/95 border-slate-200 text-slate-800",
            bottomNav: "bg-white/95 border-slate-200 text-slate-800",
            accentText: "text-[#2699fb]",
        },
        night: {
            desk: "bg-[#0b0f19] text-slate-200",
            paper: "bg-[#141b2a] border-[#202b40] text-slate-200",
            creaseLeft: "shadow-[inset_-22px_0_24px_-14px_rgba(0,0,0,0.6)]",
            creaseRight: "shadow-[inset_22px_0_24px_-14px_rgba(0,0,0,0.6)]",
            headerBorder: "border-slate-800 text-slate-500",
            footerBorder: "border-slate-800 text-slate-500",
            callout: "bg-slate-900/80 border-slate-800 text-blue-200",
            badge: "bg-[#2699fb] text-white",
            tableHeader: "bg-slate-900 text-slate-300",
            tableBorder: "border-slate-800",
            topNav: "bg-[#111726]/95 border-slate-800 text-slate-200",
            bottomNav: "bg-[#111726]/95 border-slate-800 text-slate-200",
            accentText: "text-[#38bdf8]",
        },
    }[paperMood];

    // Locked Screen
    if (loan.is_locked) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#f8fafc] p-6 text-slate-800 select-none">
                <Head title={`Terkunci: ${book.title} - E-Reader SMANSA`} />
                <div className="relative mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
                    <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                        <Lock size={32} />
                    </div>
                    <h1 className="mt-5 font-display text-xl font-black text-slate-900">
                        Masa Peminjaman E-Book Telah Berakhir
                    </h1>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600">
                        Buku digital <strong className="text-slate-900">"{book.title}"</strong> telah melewati batas pinjam online ({loan.loan_duration_days} hari). Halaman terakhir yang Anda baca ({progress.last_page}) serta bookmark Anda tetap aman tersimpan.
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
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
                        >
                            Kembali ke Detail Buku
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Render an individual book page content
    const renderPageContent = (pageData: BookPageContent | undefined | null, isRightSide: boolean = false) => {
        if (!pageData) return null;

        // 1. Cover Page
        if (pageData.type === "cover") {
            return (
                <div className="flex h-full flex-col items-center justify-center p-8 sm:p-14 text-center">
                    {/* Hardcover Embossed Seal */}
                    <div className="relative mb-6 rounded-2xl p-1 shadow-2xl transition hover:scale-105 duration-300">
                        <div className="aspect-[3/4] w-44 sm:w-52 overflow-hidden rounded-xl shadow-lg border-2 border-amber-600/30">
                            <img
                                src={book.cover_image || "/images/hero_library.jpg"}
                                alt={book.title}
                                className="h-full w-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        Koleksi Digital Terverifikasi
                    </div>

                    <h1 className="mt-4 font-display text-2xl sm:text-3xl font-black tracking-tight text-inherit">
                        {book.title}
                    </h1>
                    <p className="mt-2 text-xs font-medium opacity-75">
                        Karya: {book.authors?.map((a) => a.name).join(", ") || "Penulis SMANSA"}
                    </p>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest opacity-60">
                        ISBN {book.isbn || "978-SMANSA-2026"} • Tahun {book.publication_year || 2024}
                    </p>

                    <div className="mt-6 rounded-xl border p-4 text-left text-xs opacity-90 max-w-sm">
                        <p className="font-bold text-[11px] mb-1 uppercase tracking-wider text-inherit">Sinopsis Resmi:</p>
                        <p className="line-clamp-3 leading-relaxed opacity-80">
                            {book.synopsis || "Buku referensi resmi koleksi Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => navigatePage("next")}
                        className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-6 py-2.5 text-xs font-bold text-white shadow-lg transition hover:bg-[#1783df] hover:shadow-xl active:scale-95"
                    >
                        Buka & Mulai Membaca <ChevronRight size={15} />
                    </button>
                </div>
            );
        }

        // 2. Table of Contents
        if (pageData.type === "toc") {
            return (
                <div className="flex h-full flex-col p-6 sm:p-10">
                    <div className="border-b pb-4 mb-6">
                        <h2 className="font-display text-xl font-black text-inherit tracking-tight">{pageData.title}</h2>
                        <p className="text-xs opacity-75 mt-1">{pageData.subtitle}</p>
                    </div>

                    <div className="space-y-2 flex-1 overflow-y-auto pr-2">
                        {pages
                            .filter((p) => p.pageNumber > 2 && p.chapterTitle)
                            .slice(0, 10)
                            .map((p) => (
                                <button
                                    key={p.pageNumber}
                                    type="button"
                                    onClick={() => jumpToPage(p.pageNumber)}
                                    className="group flex w-full items-center justify-between rounded-lg p-2.5 text-left text-xs transition hover:bg-black/5 active:bg-black/10"
                                >
                                    <div className="flex items-center gap-3 min-w-0">
                                        <span className="font-mono text-[10px] font-bold opacity-40 group-hover:opacity-100 transition">
                                            {p.chapterNumber ? `BAB ${p.chapterNumber}` : "BAGIAN"}
                                        </span>
                                        <span className="truncate font-semibold text-inherit group-hover:underline">
                                            {p.chapterTitle}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[11px] font-bold opacity-60 shrink-0 ml-2">
                                        Hal. {p.pageNumber}
                                    </span>
                                </button>
                            ))}
                    </div>

                    <div className="mt-4 pt-3 border-t text-[10px] opacity-60 flex items-center justify-between">
                        <span>Perpustakaan SMAN 1 Bukittinggi</span>
                        <span>Klik judul bab untuk lompat</span>
                    </div>
                </div>
            );
        }

        // 3. Chapter & Regular Content
        return (
            <div className="flex h-full flex-col justify-between p-6 sm:p-10">
                {/* Page Header */}
                <div className={`flex items-center justify-between border-b pb-3 text-[10px] font-mono uppercase tracking-widest ${moodClasses.headerBorder}`}>
                    <span className="truncate max-w-[180px] sm:max-w-xs">{book.title}</span>
                    <span>Halaman {pageData.pageNumber}</span>
                </div>

                {/* Page Body Content */}
                <div className={`my-auto space-y-4 font-serif ${fontSize === "sm" ? "text-xs leading-6" : fontSize === "lg" ? "text-base leading-8" : "text-sm leading-7"}`}>
                    {pageData.chapterTitle && (
                        <div className="mb-4">
                            {pageData.chapterNumber && (
                                <span className={`inline-block text-[10px] font-mono font-black uppercase tracking-widest ${moodClasses.accentText}`}>
                                    Bab {pageData.chapterNumber}
                                </span>
                            )}
                            <h2 className="font-display text-lg sm:text-xl font-black text-inherit tracking-tight">
                                {pageData.chapterTitle}
                            </h2>
                        </div>
                    )}

                    {pageData.bodyParagraphs?.map((para, pIdx) => (
                        <p key={pIdx} className="text-justify indent-6">
                            {pIdx === 0 && !pageData.chapterNumber ? (
                                <span className="float-left mr-2 text-3xl font-black leading-none font-display">
                                    {para.charAt(0)}
                                </span>
                            ) : null}
                            {pIdx === 0 && !pageData.chapterNumber ? para.slice(1) : para}
                        </p>
                    ))}

                    {/* Styled Quote Box */}
                    {pageData.quote && (
                        <div className="my-5 border-l-4 border-amber-600/60 pl-4 py-1 italic opacity-95">
                            <p className="text-xs sm:text-sm font-serif">"{pageData.quote.text}"</p>
                            <p className="mt-1 text-[10px] font-sans font-bold not-italic opacity-70">
                                — {pageData.quote.author}
                            </p>
                        </div>
                    )}

                    {/* Callout Box */}
                    {pageData.callout && (
                        <div className={`rounded-xl border p-4 text-xs font-sans ${moodClasses.callout}`}>
                            <div className="flex items-center gap-2 mb-1.5">
                                {pageData.callout.badge && (
                                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${moodClasses.badge}`}>
                                        {pageData.callout.badge}
                                    </span>
                                )}
                                <p className="font-bold text-[11px]">{pageData.callout.title}</p>
                            </div>
                            <p className="whitespace-pre-line leading-relaxed opacity-90">{pageData.callout.text}</p>
                        </div>
                    )}

                    {/* Interactive Reflection Input */}
                    {pageData.interactivePrompt && (
                        <div className="mt-4 rounded-xl border p-4 bg-black/5 font-sans">
                            <label className="block text-xs font-bold mb-2">
                                ✍️ {pageData.interactivePrompt.question}
                            </label>
                            <textarea
                                rows={3}
                                value={studentNote}
                                onChange={(e) => {
                                    setStudentNote(e.target.value);
                                    saveProgressToServer(currentPage, bookmarks, e.target.value);
                                }}
                                placeholder={pageData.interactivePrompt.placeholder}
                                className="w-full rounded-lg border bg-white/80 p-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2699fb]"
                            />
                            <p className="mt-1 text-[9px] opacity-60 text-right">Tersimpan otomatis ke catatan akun Anda</p>
                        </div>
                    )}

                    {/* Comparison Table */}
                    {pageData.table && (
                        <div className={`mt-4 overflow-hidden rounded-xl border text-xs font-sans ${moodClasses.tableBorder}`}>
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className={moodClasses.tableHeader}>
                                        {pageData.table.headers.map((h, i) => (
                                            <th key={i} className="p-2.5 font-bold text-[10px] uppercase tracking-wider">
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {pageData.table.rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="border-t border-inherit/10">
                                            {row.map((cell, cIdx) => (
                                                <td key={cIdx} className={`p-2.5 text-[11px] ${cIdx === 0 ? "font-bold" : "opacity-90"}`}>
                                                    {cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Page Footer */}
                <div className={`flex items-center justify-between border-t pt-3 text-[10px] font-mono ${moodClasses.footerBorder}`}>
                    <span className="flex items-center gap-1.5 opacity-60">
                        <ShieldAlert size={12} /> DRM SMANSA
                    </span>
                    <span className="font-bold font-sans text-xs opacity-75">
                        — {pageData.pageNumber} —
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className={`relative flex h-screen w-screen flex-col overflow-hidden select-none transition-colors duration-300 ${moodClasses.desk}`}>
            <Head title={`Membaca: ${book.title} - E-Reader SMANSA`} />

            {/* ── TOP NAV BAR ── */}
            <header className={`z-30 flex h-14 shrink-0 items-center justify-between border-b px-4 shadow-sm backdrop-blur-md transition-colors ${moodClasses.topNav}`}>
                {/* Left: Book Meta */}
                <div className="flex items-center gap-3 min-w-0">
                    <Link
                        href={`/books/${book.slug}`}
                        aria-label="Kembali ke detail buku"
                        className="grid size-8 place-items-center rounded-full opacity-70 transition hover:bg-black/10 hover:opacity-100"
                    >
                        <ArrowLeft size={17} />
                    </Link>
                    <div className="min-w-0">
                        <h1 className="truncate text-xs font-bold sm:text-sm">{book.title}</h1>
                        <p className="truncate text-[10px] opacity-70">
                            {book.authors?.map((a) => a.name).join(", ") || "Perpustakaan SMAN 1 Bukittinggi"}
                        </p>
                    </div>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Loan Timer Badge */}
                    <div className="hidden items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 md:flex">
                        <Clock size={12} />
                        <span>Sisa: {loan.remaining_hours} jam</span>
                    </div>

                    {/* Table of Contents Drawer Button */}
                    <button
                        type="button"
                        onClick={() => setShowToc(!showToc)}
                        title="Daftar Isi Buku"
                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-bold transition ${
                            showToc ? "bg-[#2699fb] text-white border-[#2699fb]" : "border-inherit/30 hover:bg-black/5"
                        }`}
                    >
                        <ListTree size={13} />
                        <span className="hidden sm:inline">Daftar Isi</span>
                    </button>

                    {/* Paper Mood Switcher */}
                    <div className="flex items-center rounded-full border border-inherit/30 p-0.5">
                        <button
                            type="button"
                            onClick={() => handleSetPaperMood("sepia")}
                            title="Kertas Krem Sepia (Novel)"
                            className={`rounded-full px-2 py-1 text-[9px] font-bold transition ${
                                paperMood === "sepia" ? "bg-[#e5dbc9] text-[#2c241c] shadow-sm" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            Sepia
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSetPaperMood("white")}
                            title="Kertas Putih Bersih"
                            className={`rounded-full px-2 py-1 text-[9px] font-bold transition ${
                                paperMood === "white" ? "bg-white text-slate-900 shadow-sm" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            Putih
                        </button>
                        <button
                            type="button"
                            onClick={() => handleSetPaperMood("night")}
                            title="Mode Malam Lembut"
                            className={`rounded-full px-2 py-1 text-[9px] font-bold transition ${
                                paperMood === "night" ? "bg-slate-800 text-slate-100 shadow-sm" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            Malam
                        </button>
                    </div>

                    {/* Spread Mode Toggle (Desktop only) */}
                    <div className="hidden lg:flex items-center rounded-full border border-inherit/30 p-0.5">
                        <button
                            type="button"
                            onClick={() => setSpreadMode("double")}
                            title="Tampilan 2 Halaman (Buku Terbuka)"
                            className={`grid size-7 place-items-center rounded-full transition ${
                                spreadMode === "double" ? "bg-black/10 shadow-sm" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            <Columns2 size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setSpreadMode("single")}
                            title="Tampilan 1 Halaman Tunggal"
                            className={`grid size-7 place-items-center rounded-full transition ${
                                spreadMode === "single" ? "bg-black/10 shadow-sm" : "opacity-60 hover:opacity-100"
                            }`}
                        >
                            <Square size={13} />
                        </button>
                    </div>

                    {/* Sound Mute/Unmute Toggle */}
                    <button
                        type="button"
                        onClick={() => {
                            setSoundEnabled(!soundEnabled);
                            setToastMessage(!soundEnabled ? "Suara balik kertas diaktifkan 📖" : "Suara dimatikan");
                        }}
                        title={soundEnabled ? "Suara Buka Kertas Aktif" : "Suara Senyap"}
                        className={`grid size-8 place-items-center rounded-full transition ${
                            soundEnabled ? "text-[#2699fb]" : "opacity-40 hover:opacity-100"
                        }`}
                    >
                        {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    </button>

                    {/* Bookmark Ribbon Button */}
                    <button
                        type="button"
                        onClick={toggleBookmark}
                        aria-label={isCurrentSpreadBookmarked ? "Hapus bookmark" : "Tandai bookmark"}
                        className={`grid size-8 place-items-center rounded-full transition ${
                            isCurrentSpreadBookmarked
                                ? "bg-rose-500/15 text-rose-600 font-bold"
                                : "opacity-60 hover:bg-black/10 hover:opacity-100"
                        }`}
                    >
                        {isCurrentSpreadBookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                    </button>

                    {/* PDF Mode Toggle (only if PDF exists) */}
                    {hasPdf && (
                        <button
                            type="button"
                            onClick={() => setViewMode(viewMode === "canvas" ? "pdf" : "canvas")}
                            className={`rounded-full border px-3 py-1 text-[10px] font-bold transition ${
                                viewMode === "pdf"
                                    ? "border-[#2699fb] bg-[#2699fb] text-white shadow-sm"
                                    : "border-inherit/40 hover:bg-black/10"
                            }`}
                        >
                            {viewMode === "pdf" ? t("reader_mode_canvas") : t("reader_mode_pdf")}
                        </button>
                    )}

                    {/* Font Size Toggle (Canvas mode) */}
                    {viewMode === "canvas" && (
                        <button
                            type="button"
                            onClick={() => setFontSize(fontSize === "base" ? "lg" : fontSize === "lg" ? "sm" : "base")}
                            aria-label="Ubah ukuran huruf"
                            className="grid size-8 place-items-center rounded-full opacity-70 transition hover:bg-black/10 hover:opacity-100"
                        >
                            <Type size={16} />
                        </button>
                    )}

                    {/* Fullscreen Toggle */}
                    <button
                        type="button"
                        onClick={toggleFullscreen}
                        aria-label="Layar penuh"
                        className="grid size-8 place-items-center rounded-full opacity-70 transition hover:bg-black/10 hover:opacity-100"
                    >
                        {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                    </button>
                </div>
            </header>

            {/* ── TOAST NOTIFICATION ── */}
            {toastMessage && (
                <div className="absolute top-16 left-1/2 z-50 -translate-x-1/2 rounded-full border border-slate-200 bg-white/95 px-4 py-1.5 text-xs font-semibold text-slate-800 shadow-xl backdrop-blur-md animate-fade-in">
                    {toastMessage}
                </div>
            )}

            {/* ── TABLE OF CONTENTS DRAWER ── */}
            {showToc && (
                <div className="absolute top-16 left-4 z-40 w-80 max-h-[calc(100vh-140px)] flex flex-col rounded-2xl border bg-white/95 p-4 shadow-2xl backdrop-blur-md">
                    <div className="flex items-center justify-between border-b pb-3 mb-2">
                        <span className="text-xs font-bold text-slate-900 flex items-center gap-2">
                            <ListTree size={15} className="text-[#2699fb]" /> Daftar Isi Buku
                        </span>
                        <button type="button" onClick={() => setShowToc(false)} className="text-slate-400 hover:text-slate-900">
                            <X size={15} />
                        </button>
                    </div>
                    <div className="space-y-1 overflow-y-auto pr-1 text-xs">
                        {pages.map((p) => (
                            <button
                                key={p.pageNumber}
                                type="button"
                                onClick={() => jumpToPage(p.pageNumber)}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-medium transition ${
                                    currentPage === p.pageNumber
                                        ? "bg-[#2699fb] text-white"
                                        : "text-slate-700 hover:bg-slate-100"
                                }`}
                            >
                                <span className="truncate">
                                    {p.pageNumber === 1
                                        ? "Sampul Depan (Cover)"
                                        : p.pageNumber === 2
                                        ? "Daftar Isi"
                                        : p.chapterTitle || `Halaman ${p.pageNumber}`}
                                </span>
                                <span className="font-mono text-[10px] opacity-70 shrink-0 ml-2">
                                    Hal. {p.pageNumber}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* ── MAIN READING CANVASES / FLIPBOOK SPREAD ── */}
            <main className="relative flex-1 overflow-hidden px-2 sm:px-6 py-4 flex items-center justify-center">
                {/* Security DRM Watermark Overlay */}
                <div className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center opacity-[0.03] select-none rotate-[-15deg]">
                    <p className="text-3xl font-black uppercase tracking-[0.25em]">
                        Perpustakaan Sunaryaman Musthofa
                    </p>
                    <p className="mt-2 text-sm font-semibold tracking-wider">
                        {readerInfo.name} • NIS: {readerInfo.identifier} • {readerInfo.class}
                    </p>
                </div>

                {viewMode === "pdf" ? (
                    /* PDF Stream Mode */
                    <div className="relative z-10 mx-auto w-full max-w-5xl h-[calc(100vh-140px)] rounded-2xl overflow-hidden border border-slate-300 bg-white shadow-2xl">
                        <iframe
                            src={`/books/${book.slug}/stream#toolbar=0&navpanes=0`}
                            title={book.title}
                            className="w-full h-full border-0"
                        />
                    </div>
                ) : (
                    /* Interactive Book Spread Area */
                    <div className="relative z-10 flex w-full max-w-6xl h-[calc(100vh-145px)] max-h-[820px] items-center justify-center">
                        {/* Physical Ribbon Bookmark Hanging from Top */}
                        {isCurrentSpreadBookmarked && (
                            <div
                                onClick={toggleBookmark}
                                title="Klik untuk menghapus bookmark halaman ini"
                                className="absolute -top-3 right-16 sm:right-28 z-30 cursor-pointer transition-transform hover:translate-y-1"
                                style={{
                                    width: "24px",
                                    height: "56px",
                                    background: "linear-gradient(135deg, #e11d48, #be123c)",
                                    clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 82%, 0 100%)",
                                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.35))",
                                }}
                            />
                        )}

                        {/* Navigation Margin Click Zones (Left / Prev) */}
                        {currentPage > 1 && (
                            <button
                                type="button"
                                onClick={() => navigatePage("prev")}
                                title="Halaman Sebelumnya (←)"
                                aria-label="Halaman Sebelumnya"
                                className="group absolute -left-2 sm:left-1 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-12 place-items-center rounded-full bg-black/10 text-inherit backdrop-blur-sm shadow-md transition hover:bg-[#2699fb] hover:text-white active:scale-95"
                            >
                                <ChevronLeft size={24} />
                            </button>
                        )}

                        {/* Navigation Margin Click Zones (Right / Next) */}
                        {currentPage < totalPages && (
                            <button
                                type="button"
                                onClick={() => navigatePage("next")}
                                title="Halaman Berikutnya (→)"
                                aria-label="Halaman Berikutnya"
                                className="group absolute -right-2 sm:right-1 top-1/2 -translate-y-1/2 z-20 grid size-10 sm:size-12 place-items-center rounded-full bg-black/10 text-inherit backdrop-blur-sm shadow-md transition hover:bg-[#2699fb] hover:text-white active:scale-95"
                            >
                                <ChevronRight size={24} />
                            </button>
                        )}

                        {/* ── THE BOOK OPEN CONTAINER (Two-page Spread on Desktop) ── */}
                        <div className="perspective-book relative flex h-full w-full max-w-5xl rounded-2xl shadow-2xl overflow-hidden">
                            {/* Outer Book Binding Edge (Left stacked paper illusion) */}
                            <div className="w-1.5 sm:w-2.5 h-full bg-gradient-to-r from-black/20 via-black/10 to-transparent shrink-0" />

                            {/* Spread Mode: Double Page or Single Page */}
                            {spreadMode === "double" && !isCover && rightPageData ? (
                                <div className="relative flex-1 flex h-full preserve-3d">
                                    {/* LEFT PAGE (Base) */}
                                    <div
                                        onClick={() => !flippingState && navigatePage("prev")}
                                        className={`group relative flex-1 h-full overflow-y-auto border-r ${moodClasses.paper} ${moodClasses.creaseLeft} cursor-w-resize transition-all duration-200`}
                                    >
                                        <div className="pointer-events-none absolute bottom-0 left-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-black/15 to-transparent" />
                                        {renderPageContent(flippingState?.direction === "prev" ? flippingState.newUnderlyingLeft : leftPageData, false)}
                                    </div>

                                    {/* BOOK SPINE CENTER FOLD / CREASE SHADOW */}
                                    <div className="relative w-2.5 sm:w-4 h-full bg-gradient-to-r from-black/15 via-black/5 to-black/15 shrink-0 shadow-inner z-10" />

                                    {/* RIGHT PAGE (Base) */}
                                    <div
                                        onClick={() => !flippingState && navigatePage("next")}
                                        className={`group relative flex-1 h-full overflow-y-auto border-l ${moodClasses.paper} ${moodClasses.creaseRight} cursor-e-resize transition-all duration-200`}
                                    >
                                        <div className="pointer-events-none absolute bottom-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tl from-black/15 to-transparent" />
                                        {renderPageContent(flippingState?.direction === "next" ? flippingState.newUnderlyingRight : rightPageData, true)}
                                    </div>

                                    {/* ── 3D FLIPPING LEAF (NEXT: RIGHT TO LEFT) ── */}
                                    {flippingState?.direction === "next" && (
                                        <div className="pointer-events-none absolute top-0 right-0 w-1/2 h-full z-20 preserve-3d animate-flip-next">
                                            {/* Front of turning page (Current right page lifting off) */}
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} ${moodClasses.creaseRight} border-l shadow-2xl overflow-y-auto`}>
                                                {renderPageContent(flippingState.turningPageFront, true)}
                                            </div>
                                            {/* Back of turning page (New left page landing on left side) */}
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} ${moodClasses.creaseLeft} border-r shadow-2xl overflow-y-auto rotate-y-180`}>
                                                {renderPageContent(flippingState.turningPageBack, false)}
                                            </div>
                                        </div>
                                    )}

                                    {/* ── 3D FLIPPING LEAF (PREV: LEFT TO RIGHT) ── */}
                                    {flippingState?.direction === "prev" && (
                                        <div className="pointer-events-none absolute top-0 left-0 w-1/2 h-full z-20 preserve-3d animate-flip-prev">
                                            {/* Front of turning page (Current left page lifting off) */}
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} ${moodClasses.creaseLeft} border-r shadow-2xl overflow-y-auto`}>
                                                {renderPageContent(flippingState.turningPageFront, false)}
                                            </div>
                                            {/* Back of turning page (New right page landing on right side) */}
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} ${moodClasses.creaseRight} border-l shadow-2xl overflow-y-auto rotate-y-180`}>
                                                {renderPageContent(flippingState.turningPageBack, true)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* SINGLE PAGE MODE OR COVER */
                                <div className="relative flex-1 h-full preserve-3d">
                                    <div className={`relative w-full h-full overflow-y-auto ${moodClasses.paper} shadow-xl`}>
                                        {renderPageContent(flippingState ? flippingState.newUnderlyingLeft || leftPageData : leftPageData, false)}
                                    </div>
                                    {/* Single page flipping leaf */}
                                    {flippingState && (
                                        <div className={`pointer-events-none absolute inset-0 z-20 preserve-3d ${flippingState.direction === "next" ? "animate-flip-next" : "animate-flip-prev"}`}>
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} shadow-2xl overflow-y-auto`}>
                                                {renderPageContent(flippingState.turningPageFront, false)}
                                            </div>
                                            <div className={`absolute inset-0 backface-hidden ${moodClasses.paper} shadow-2xl overflow-y-auto rotate-y-180`}>
                                                {renderPageContent(flippingState.turningPageBack, false)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Outer Book Binding Edge (Right stacked paper illusion) */}
                            <div className="w-1.5 sm:w-2.5 h-full bg-gradient-to-l from-black/20 via-black/10 to-transparent shrink-0" />
                        </div>
                    </div>
                )}
            </main>

            {/* ── BOTTOM PAGE CONTROLLER ── */}
            <footer className={`z-30 flex h-16 shrink-0 items-center justify-between border-t px-4 sm:px-8 shadow-sm backdrop-blur-md transition-colors ${moodClasses.bottomNav}`}>
                {/* Prev Page Button */}
                <button
                    type="button"
                    disabled={currentPage <= 1}
                    onClick={() => navigatePage("prev")}
                    className="inline-flex items-center gap-1.5 rounded-full border border-inherit/40 px-4 py-2 text-xs font-semibold transition hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={15} />
                    <span className="hidden sm:inline">{t("reader_prev")}</span>
                </button>

                {/* Page Slider / Progress Indicator */}
                <div className="flex items-center gap-3">
                    <input
                        type="range"
                        min={1}
                        max={totalPages}
                        value={currentPage}
                        onChange={(e) => jumpToPage(parseInt(e.target.value))}
                        className="h-1.5 w-24 sm:w-56 accent-[#2699fb] cursor-pointer"
                    />
                    <div className="font-mono text-xs font-bold shrink-0">
                        <span>{spreadMode === "double" && rightPageNum ? `${leftPageNum}-${rightPageNum}` : currentPage}</span>
                        <span className="opacity-40"> / {totalPages}</span>
                    </div>
                </div>

                {/* Next Page Button */}
                <button
                    type="button"
                    disabled={currentPage >= totalPages}
                    onClick={() => navigatePage("next")}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-semibold text-white shadow-md transition hover:bg-[#1783df] active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                >
                    <span className="hidden sm:inline">{t("reader_next")}</span>
                    <ChevronRight size={15} />
                </button>
            </footer>
        </div>
    );
}
