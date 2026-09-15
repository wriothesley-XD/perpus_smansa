import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    AlertCircle,
    Barcode,
    BookCopy,
    BookOpen,
    Calendar,
    Check,
    CheckCircle2,
    Clock,
    Download,
    ExternalLink,
    FileText,
    HelpCircle,
    LogOut,
    MessageSquare,
    Package,
    Plus,
    RefreshCw,
    Search,
    Send,
    Settings,
    Shield,
    Trash2,
    Upload,
    User,
    Users,
} from "lucide-react";
import React, { useState } from "react";
import { SiteShell } from "../../Components/Common/SiteShell";
import { Book, Event, Magazine, MagazineEdition } from "../../types/library";
import {
    buildWhatsAppLink,
    createDueDateReminderMessage,
    createNewBookBroadcastMessage,
    createOverdueMessage,
} from "../../utils/whatsapp";

interface ActiveLoan {
    id: number;
    loan_code: string;
    borrowed_at: string;
    due_at: string;
    status: string;
    is_online_loan: boolean;
    user: {
        id: number;
        name: string;
        class_name?: string | null;
        phone_number?: string | null;
        identifier_number?: string | null;
    };
    book_copy?: {
        id: number;
        barcode_identifier: string;
        book?: {
            id: number;
            title: string;
            cover_image?: string;
        };
    };
}

interface PanelProps {
    stats: {
        totalBooks: number;
        totalCopies: number;
        activeLoans: number;
        pendingReservations: number;
        totalMembers: number;
        totalEvents: number;
        totalWorks: number;
        pendingWorks: number;
    };
    books: {
        data: Book[];
        current_page: number;
        last_page: number;
        total: number;
    };
    magazines: Magazine[];
    events: {
        data: Event[];
        current_page: number;
        last_page: number;
        total: number;
    };
    activeLoans: ActiveLoan[];
    categories: { id: number; name: string }[];
    settings: {
        online_loan_duration_days: number;
        max_online_loans: number;
        library_name: string;
        library_address: string;
        contact_phone: string;
        inlislite_guestbook_url?: string;
    };
    inlisliteInfo?: {
        guestbook_url: string;
        connected: boolean;
        today_visitors: number;
        message: string;
    };
}

type TabType = "circulation" | "books" | "magazines" | "events" | "whatsapp" | "settings" | "guide";

export default function AdminPanel({
    stats,
    books,
    magazines,
    events,
    activeLoans,
    categories,
    settings,
    inlisliteInfo,
}: PanelProps) {
    const [activeTab, setActiveTab] = useState<TabType>("circulation");
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showAddMagazineModal, setShowAddMagazineModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);

    // Meja Sirkulasi Quick Scan State
    const [scanQuery, setScanQuery] = useState("");
    const [scannedMember, setScannedMember] = useState<any>(null);
    const [memberLoans, setMemberLoans] = useState<any[]>([]);
    const [scanLoading, setScanLoading] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);
    const [bookBarcode, setBookBarcode] = useState("");
    const [borrowLoading, setBorrowLoading] = useState(false);

    // Book Form
    const bookForm = useForm({
        title: "",
        author_name: "",
        category_id: categories[0]?.id ? String(categories[0].id) : "1",
        publication_year: new Date().getFullYear(),
        isbn: "",
        shelf_location: "Rak Umum",
        synopsis: "",
        copies_count: 1,
        cover_image: null as File | null,
        ebook_file: null as File | null,
    });

    // Magazine/Bulletin Form
    const magazineForm = useForm({
        magazine_id: magazines[0]?.id ? String(magazines[0].id) : "1",
        edition_title: "",
        edition_number: "",
        publication_date: new Date().toISOString().split("T")[0],
        description: "",
        cover_image: null as File | null,
        pdf_file: null as File | null,
    });

    // Event Form
    const eventForm = useForm({
        title: "",
        type: "event",
        event_date: new Date().toISOString().split("T")[0],
        location: "Ruang Baca SMAN 1 Bukittinggi",
        description: "",
        cover_image: null as File | null,
    });

    // Settings Form
    const settingsForm = useForm({
        online_loan_duration_days: settings.online_loan_duration_days || 3,
        max_online_loans: settings.max_online_loans || 3,
        library_name: settings.library_name || "Perpustakaan SMAN 1 Bukittinggi",
        contact_phone: settings.contact_phone || "(0752) 22543",
    });

    // WhatsApp Broadcast Form
    const [broadcastBookTitle, setBroadcastBookTitle] = useState("");
    const [broadcastAuthor, setBroadcastAuthor] = useState("");
    const [broadcastCategory, setBroadcastCategory] = useState("Buku Umum");
    const [broadcastTargetPhone, setBroadcastTargetPhone] = useState("");

    // Handlers
    const handleMemberLookup = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        const q = scanQuery.trim();
        if (!q) return;
        setScanLoading(true);
        setScanError(null);
        try {
            const res = await fetch(`/admin-panel/lookup-member?query=${encodeURIComponent(q)}`);
            const data = await res.json();
            if (data.found) {
                setScannedMember(data.student);
                setMemberLoans(data.active_loans || []);
            } else {
                setScannedMember(null);
                setMemberLoans([]);
                setScanError(data.message || "Siswa atau anggota tidak ditemukan.");
            }
        } catch (err: any) {
            setScanError("Gagal menghubungi server: " + err.message);
        } finally {
            setScanLoading(false);
        }
    };

    const handleQuickBorrow = (e: React.FormEvent) => {
        e.preventDefault();
        if (!scannedMember || !bookBarcode.trim()) return;
        setBorrowLoading(true);
        router.post(
            "/admin-panel/quick-loan",
            { user_id: scannedMember.id, barcode: bookBarcode.trim() },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setBookBarcode("");
                    setBorrowLoading(false);
                    handleMemberLookup();
                },
                onError: () => {
                    setBorrowLoading(false);
                },
            }
        );
    };

    const handleQuickReturn = (loanId: number) => {
        if (!confirm("Konfirmasi pengembalian buku ini ke rak perpustakaan?")) return;
        router.post(
            `/admin-panel/quick-return/${loanId}`,
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    if (scannedMember) {
                        handleMemberLookup();
                    }
                },
            }
        );
    };

    const handleSyncOverdue = () => {
        if (!confirm("Periksa dan tandai pinjaman yang telah melewati jatuh tempo sebagai terlambat?")) return;
        router.post("/admin-panel/sync-overdue", {}, { preserveScroll: true });
    };

    const handleBookSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        bookForm.post("/admin-panel/books", {
            onSuccess: () => {
                setShowAddBookModal(false);
                bookForm.reset();
            },
        });
    };

    const handleMagazineSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        magazineForm.post("/admin-panel/magazines", {
            onSuccess: () => {
                setShowAddMagazineModal(false);
                magazineForm.reset();
            },
        });
    };

    const handleEventSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        eventForm.post("/admin-panel/events", {
            onSuccess: () => {
                setShowAddEventModal(false);
                eventForm.reset();
            },
        });
    };

    const handleSettingsSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        settingsForm.post("/admin-panel/settings", {
            preserveScroll: true,
        });
    };

    return (
        <SiteShell>
            <Head title="Admin Panel — Perpustakaan SMAN 1 Bukittinggi" />

            <div className="min-h-screen bg-gray-50/50 pb-20 dark:bg-[#090d16]">
                {/* Header Banner */}
                <div className="border-b border-gray-200 bg-white px-5 py-8 sm:px-8 dark:border-slate-800 dark:bg-[#0f172a]">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-blue-300">
                                    <Shield size={13} />
                                    <span>Portal Khusus Guru & Pustakawan</span>
                                </div>
                                <h1 className="mt-2 font-display text-2xl font-black text-[#152238] dark:text-white sm:text-3xl">
                                    Pusat Manajemen Perpustakaan
                                </h1>
                                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-2">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs transition"
                                >
                                    <BookOpen size={14} className="text-[#2699fb]" />
                                    <span>Ruang Saya (Dashboard)</span>
                                </Link>

                                <Link
                                    href="/profile"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs transition"
                                >
                                    <User size={14} className="text-slate-500" />
                                    <span>Profil Saya</span>
                                </Link>

                                <a
                                    href="/admin-panel/export-report"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300 transition"
                                >
                                    <Download size={14} />
                                    <span>Unduh Laporan Excel</span>
                                </a>

                                <button
                                    type="button"
                                    onClick={handleSyncOverdue}
                                    title="Sinkronisasi status pinjaman jatuh tempo"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs transition"
                                >
                                    <RefreshCw size={13} />
                                    <span>Sinkron Jatuh Tempo</span>
                                </button>

                                <Link
                                    method="post"
                                    as="button"
                                    href="/logout"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 transition"
                                >
                                    <LogOut size={14} />
                                    <span>Keluar</span>
                                </Link>
                            </div>
                        </div>

                        {/* Quick Stats Grid */}
                        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Total Buku</span>
                                <p className="mt-1 text-2xl font-black text-[#152238] dark:text-white">{stats.totalBooks}</p>
                                <span className="text-[10px] text-gray-400">{stats.totalCopies} eksemplar fisik</span>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Peminjaman Aktif</span>
                                <p className="mt-1 text-2xl font-black text-emerald-600">{stats.activeLoans}</p>
                                <span className="text-[10px] text-gray-400">Online & fisik</span>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">Anggota</span>
                                <p className="mt-1 text-2xl font-black text-[#152238] dark:text-white">{stats.totalMembers}</p>
                                <span className="text-[10px] text-gray-400">Siswa & guru SMANSA</span>
                            </div>
                            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-500">Buletin & Majalah</span>
                                <p className="mt-1 text-2xl font-black text-[#152238] dark:text-white">
                                    {magazines.reduce((acc, m) => acc + (m.editions?.length || 0), 0)}
                                </p>
                                <span className="text-[10px] text-gray-400">Edisi terbit</span>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-px dark:border-slate-800">
                            {[
                                { id: "circulation", label: "Meja Sirkulasi & Scan Kartu", icon: Barcode },
                                { id: "books", label: "Koleksi Buku & E-Book", icon: BookOpen },
                                { id: "magazines", label: "Buletin & Majalah", icon: FileText },
                                { id: "events", label: "Agenda & Kegiatan", icon: Calendar },
                                { id: "whatsapp", label: "Pusat WhatsApp (Sirkulasi)", icon: MessageSquare },
                                { id: "settings", label: "Pengaturan Layanan", icon: Settings },
                                { id: "guide", label: "Buku Panduan Guru", icon: HelpCircle },
                            ].map((tab) => {
                                const Icon = tab.icon;
                                const isActive = activeTab === tab.id;
                                return (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id as TabType)}
                                        className={`flex items-center gap-2 rounded-t-xl px-4 py-3 text-xs font-bold transition-all ${
                                            isActive
                                                ? "border-b-2 border-[#2699fb] bg-white text-[#2699fb] shadow-xs dark:bg-[#121824]"
                                                : "text-gray-500 hover:text-[#152238] dark:text-slate-400 dark:hover:text-white"
                                        }`}
                                    >
                                        <Icon size={15} />
                                        <span>{tab.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Tab Content Area */}
                <div className="mx-auto max-w-7xl px-5 pt-8 sm:px-8">

                    {/* ═══════════════════════════════════════════════════════
                        TAB 0: MEJA SIRKULASI & SCAN KARTU PELAJAR
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "circulation" && (
                        <div className="space-y-8">
                            <div>
                                <h2 className="font-display text-xl font-bold text-[#152238] dark:text-white">
                                    Meja Sirkulasi Cepat (Integrasi Kartu Pelajar)
                                </h2>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                                    Gunakan scanner barcode USB untuk menembak barcode kartu fisik siswa SMANSA, atau ketikkan nomor NIS secara manual.
                                </p>
                            </div>

                            {/* Scan Input Box */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#121824]">
                                <form onSubmit={handleMemberLookup} className="flex flex-col sm:flex-row gap-3">
                                    <div className="relative flex-1">
                                        <Barcode className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                        <input
                                            type="text"
                                            value={scanQuery}
                                            onChange={(e) => setScanQuery(e.target.value)}
                                            placeholder="Scan Barcode Kartu Pelajar / Ketik NIS Siswa (Contoh: NIS. 23101 atau 23101)..."
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 pl-11 pr-4 py-3 text-sm text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono focus:border-[#2699fb] focus:outline-none"
                                            autoFocus
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={scanLoading}
                                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2699fb] px-6 py-3 text-xs font-bold text-white shadow-xs hover:bg-[#1783df] transition"
                                    >
                                        <Search size={15} />
                                        <span>{scanLoading ? "Mencari..." : "Cari Siswa"}</span>
                                    </button>
                                </form>

                                {scanError && (
                                    <div className="mt-4 rounded-xl bg-rose-50 p-3 text-xs text-rose-700 border border-rose-200 dark:bg-rose-950/40 dark:border-rose-900/60 dark:text-rose-300">
                                        {scanError}
                                    </div>
                                )}
                            </div>

                            {/* Student Profile Card & Loan Actions */}
                            {scannedMember && (
                                <div className="grid gap-6 lg:grid-cols-3 animate-fade-in">
                                    {/* Member Info Card */}
                                    <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-6 shadow-sm dark:border-blue-900/60 dark:bg-slate-900/60 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-12 place-items-center rounded-2xl bg-[#152238] text-white font-black text-lg dark:bg-[#2699fb]">
                                                {scannedMember.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                                                    {scannedMember.name}
                                                </h3>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                                    NIS/NIP: <span className="font-mono font-bold text-[#2699fb]">{scannedMember.identifier_number}</span>
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t border-blue-100 pt-3 dark:border-slate-800 text-xs space-y-1.5 text-slate-600 dark:text-slate-300">
                                            <div className="flex justify-between">
                                                <span>Kelas:</span>
                                                <span className="font-bold text-[#152238] dark:text-white">{scannedMember.class_name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>WhatsApp:</span>
                                                <span className="font-mono font-semibold">{scannedMember.phone_number}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Buku Dipinjam:</span>
                                                <span className="font-bold text-[#2699fb]">{scannedMember.active_loans_count} / 3 Buku</span>
                                            </div>
                                        </div>

                                        <div className="pt-2">
                                            <span
                                                className={`inline-block w-full text-center rounded-xl py-1.5 text-[11px] font-bold ${
                                                    scannedMember.can_borrow
                                                        ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                                        : "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                                                }`}
                                            >
                                                {scannedMember.can_borrow ? (
                                                    <span className="inline-flex items-center gap-1"><CheckCircle2 size={12} /> Berhak Meminjam Buku Fisik</span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1"><AlertCircle size={12} /> Batas Kuota Maksimal Penuh (3 Buku)</span>
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Area: Pinjam Buku & Daftar Pinjaman */}
                                    <div className="lg:col-span-2 space-y-6">
                                        {/* Form Pinjam Baru */}
                                        {scannedMember.can_borrow && (
                                            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-[#121824]">
                                                <h4 className="font-bold text-xs text-[#152238] dark:text-white flex items-center gap-1.5">
                                                    <BookCopy size={15} className="text-[#2699fb]" />
                                                    <span>Proses Pinjamkan Buku Fisik ke Siswa Ini</span>
                                                </h4>
                                                <form onSubmit={handleQuickBorrow} className="mt-3 flex gap-2">
                                                    <input
                                                        type="text"
                                                        value={bookBarcode}
                                                        onChange={(e) => setBookBarcode(e.target.value)}
                                                        placeholder="Scan Barcode Eksemplar Buku (Contoh: SMANSA-00001)..."
                                                        className="flex-1 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white font-mono"
                                                    />
                                                    <button
                                                        type="submit"
                                                        disabled={borrowLoading || !bookBarcode.trim()}
                                                        className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-emerald-700 disabled:opacity-50 transition"
                                                    >
                                                        {borrowLoading ? "Memproses..." : "Pinjamkan (7 Hari)"}
                                                    </button>
                                                </form>
                                            </div>
                                        )}

                                        {/* Active Loans Table */}
                                        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden shadow-sm dark:border-slate-800 dark:bg-[#121824]">
                                            <div className="px-5 py-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
                                                <h4 className="font-bold text-xs text-[#152238] dark:text-white">
                                                    Daftar Buku Yang Sedang Dipinjam Siswa Ini ({memberLoans.length})
                                                </h4>
                                            </div>
                                            <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                                {memberLoans.map((l) => (
                                                    <div key={l.id} className="p-4 flex items-center justify-between text-xs">
                                                        <div>
                                                            <p className="font-bold text-[#152238] dark:text-white">
                                                                {l.book_copy?.book?.title || "Buku"}
                                                            </p>
                                                            <p className="text-[10px] text-gray-400 mt-0.5 font-mono">
                                                                Barcode: {l.book_copy?.barcode_identifier || "-"} • Batas Kembali:{" "}
                                                                <span className={new Date(l.due_at) < new Date() ? "text-rose-600 font-bold" : "text-emerald-600"}>
                                                                    {new Date(l.due_at).toLocaleDateString("id-ID")}
                                                                </span>
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleQuickReturn(l.id)}
                                                            className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition"
                                                        >
                                                            Kembalikan ke Rak
                                                        </button>
                                                    </div>
                                                ))}
                                                {memberLoans.length === 0 && (
                                                    <div className="p-6 text-center text-xs text-gray-400 italic">
                                                        Siswa ini tidak memiliki pinjaman aktif saat ini.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 1: BUKU & E-BOOK
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "books" && (
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Daftar Buku & E-Book
                                    </h2>
                                    <p className="text-xs text-gray-400">Kelola judul, sampul foto, dan salinan file digital.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookModal(true)}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Tambah Buku Baru
                                </button>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-gray-100 bg-gray-50/70 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:border-slate-800 dark:bg-slate-900/40">
                                        <tr>
                                            <th className="px-5 py-3.5">Sampul & Judul</th>
                                            <th className="px-5 py-3.5">Kategori</th>
                                            <th className="px-5 py-3.5">Tipe</th>
                                            <th className="px-5 py-3.5">Stok Fisik</th>
                                            <th className="px-5 py-3.5 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                        {books.data.map((book) => (
                                            <tr key={book.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-9 shrink-0 overflow-hidden rounded bg-gray-100 shadow-xs dark:bg-slate-800">
                                                            <img
                                                                src={book.cover_image || "/images/hero_library.jpg"}
                                                                alt={book.title}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-[#152238] dark:text-white line-clamp-1">{book.title}</p>
                                                            <p className="text-[10px] text-gray-400">
                                                                {book.authors?.map((a) => a.name).join(", ") || "Penulis SMANSA"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-blue-300">
                                                        {book.category?.name || "Umum"}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {book.is_ebook || book.ebook_file_path ? (
                                                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                            E-Book Digital
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-bold text-gray-600 dark:bg-slate-800 dark:text-slate-300">
                                                            Fisik Saja
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4 font-mono font-bold text-[#152238] dark:text-white">
                                                    {book.copies_count || 1} Eksemplar
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <Link
                                                        method="delete"
                                                        as="button"
                                                        href={`/admin-panel/books/${book.id}`}
                                                        className="text-gray-400 transition hover:text-rose-600"
                                                        onClick={(e) => {
                                                            if (!confirm(`Hapus buku "${book.title}"?`)) e.preventDefault();
                                                        }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 2: MAJALAH & BULETIN KURTAW
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "magazines" && (
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Edisi Buletin & Majalah Sekolah
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Publikasikan Majalah Genta Smansa atau Buletin Kurtaw dalam format PDF.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddMagazineModal(true)}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Upload Edisi Baru
                                </button>
                            </div>

                            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {magazines.flatMap((m) => m.editions || []).map((ed) => (
                                    <div
                                        key={ed.id}
                                        className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121824]"
                                    >
                                        <div className="h-24 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-slate-800">
                                            <img
                                                src={ed.cover_image || "/images/hero_library.jpg"}
                                                alt={ed.edition_title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-1 flex-col justify-between">
                                            <div>
                                                <span className="rounded bg-purple-50 px-1.5 py-0.5 text-[9px] font-bold text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                                                    Edisi {ed.edition_number} ({ed.year})
                                                </span>
                                                <h3 className="mt-1 font-display text-xs font-bold text-[#152238] dark:text-white line-clamp-1">
                                                    {ed.edition_title}
                                                </h3>
                                                <p className="text-[10px] text-gray-400 mt-1 line-clamp-2">
                                                    {ed.description || "Publikasi literasi resmi SMANSA"}
                                                </p>
                                            </div>

                                            <div className="mt-2 flex items-center justify-between pt-2 border-t border-gray-50 dark:border-slate-800">
                                                <a
                                                    href={ed.pdf_file_path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[10px] font-bold text-[#2699fb] hover:underline"
                                                >
                                                    Lihat PDF ↗
                                                </a>
                                                <Link
                                                    method="delete"
                                                    as="button"
                                                    href={`/admin-panel/magazines/${ed.id}`}
                                                    className="text-gray-400 transition hover:text-rose-600"
                                                    onClick={(e) => {
                                                        if (!confirm(`Hapus edisi "${ed.edition_title}"?`)) e.preventDefault();
                                                    }}
                                                >
                                                    <Trash2 size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 3: AGENDA & EVENT
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "events" && (
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Agenda & Berita Kegiatan Literasi
                                    </h2>
                                    <p className="text-xs text-gray-400">Publikasikan seminar, workshop, dan podcast Duta Baca.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddEventModal(true)}
                                    className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Buat Agenda Baru
                                </button>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-gray-100 bg-gray-50/70 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:border-slate-800 dark:bg-slate-900/40">
                                        <tr>
                                            <th className="px-5 py-3.5">Judul Kegiatan</th>
                                            <th className="px-5 py-3.5">Jenis</th>
                                            <th className="px-5 py-3.5">Tanggal</th>
                                            <th className="px-5 py-3.5">Lokasi</th>
                                            <th className="px-5 py-3.5 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                        {events.data.map((ev) => (
                                            <tr key={ev.id} className="hover:bg-gray-50/50 dark:hover:bg-slate-800/40">
                                                <td className="px-5 py-4 font-bold text-[#152238] dark:text-white">
                                                    {ev.title}
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 capitalize dark:bg-amber-950/60 dark:text-amber-300">
                                                        {ev.type}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 font-mono text-gray-500">
                                                    {ev.event_date ? new Date(ev.event_date).toLocaleDateString("id-ID") : "Mendatang"}
                                                </td>
                                                <td className="px-5 py-4 text-gray-500">
                                                    {ev.location || "Ruang Baca SMANSA"}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <Link
                                                        method="delete"
                                                        as="button"
                                                        href={`/admin-panel/events/${ev.id}`}
                                                        className="text-gray-400 transition hover:text-rose-600"
                                                        onClick={(e) => {
                                                            if (!confirm(`Hapus agenda "${ev.title}"?`)) e.preventDefault();
                                                        }}
                                                    >
                                                        <Trash2 size={16} />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 4: PUSAT WHATSAPP SIRKULASI
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "whatsapp" && (
                        <div className="space-y-6">
                            {/* Educational Callout explaining Zero Cost & Legal WhatsApp */}
                            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">
                                <div className="flex items-start gap-3">
                                    <div className="grid size-8 place-items-center rounded-xl bg-emerald-500 text-white shrink-0">
                                        <MessageSquare size={16} />
                                    </div>
                                    <div className="text-xs">
                                        <h3 className="font-bold text-emerald-900 dark:text-emerald-200">
                                            Fitur WhatsApp Ini 100% Gratis, Resmi, & Aman
                                        </h3>
                                        <p className="mt-1 text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                                            Sistem memanfaatkan teknologi resmi <em>WhatsApp Click-to-Chat (wa.me)</em>. Sekolah tidak perlu membayar biaya bulanan API Meta ataupun membeli server gateway pihak ketiga. Pesan akan terkirim langsung dari aplikasi WhatsApp Web/Desktop petugas dengan format sopan dan personal yang telah disiapkan otomatis.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Pemberitahuan Sirkulasi & Pengingat Jatuh Tempo
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Kirim pengingat H-1 atau peringatan keterlambatan langsung ke nomor WhatsApp siswa yang terdaftar.
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="/admin-panel/export-report"
                                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                    >
                                        <Download size={13} /> Ekspor Data ke Excel
                                    </a>
                                </div>
                            </div>

                            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-gray-100 bg-gray-50/70 font-mono text-[10px] uppercase tracking-wider text-gray-400 dark:border-slate-800 dark:bg-slate-900/40">
                                        <tr>
                                            <th className="px-5 py-3.5">Nama Siswa</th>
                                            <th className="px-5 py-3.5">Buku Dipinjam</th>
                                            <th className="px-5 py-3.5">Batas Kembali</th>
                                            <th className="px-5 py-3.5">Nomor WhatsApp</th>
                                            <th className="px-5 py-3.5 text-right">Aksi Cepat</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                        {activeLoans.map((loan) => {
                                            const studentName = loan.user?.name || "Siswa";
                                            const className = loan.user?.class_name || "";
                                            const bookTitle = loan.book_copy?.book?.title || "Buku Perpustakaan";
                                            const phone = loan.user?.phone_number || "";
                                            const dueDate = new Date(loan.due_at).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            });

                                            const reminderLink = phone
                                                ? buildWhatsAppLink(
                                                      phone,
                                                      createDueDateReminderMessage({
                                                          studentName,
                                                          className,
                                                          bookTitle,
                                                          dueDate,
                                                      })
                                                  )
                                                : null;

                                            const overdueLink = phone
                                                ? buildWhatsAppLink(
                                                      phone,
                                                      createOverdueMessage({
                                                          studentName,
                                                          className,
                                                          bookTitle,
                                                          dueDate,
                                                      })
                                                  )
                                                : null;

                                            return (
                                                <tr key={loan.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30">
                                                    <td className="px-5 py-4">
                                                        <p className="font-bold text-[#152238] dark:text-white">{studentName}</p>
                                                        <p className="text-[10px] text-gray-400">
                                                            {className ? `Kelas ${className}` : "Anggota Perpustakaan"} • NIS: {loan.user?.identifier_number || "-"}
                                                        </p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="font-semibold text-gray-700 dark:text-slate-200">{bookTitle}</p>
                                                        <span className="text-[10px] text-gray-400">Kode: {loan.loan_code}</span>
                                                    </td>
                                                    <td className="px-5 py-4 font-mono text-gray-600 dark:text-slate-300">
                                                        {dueDate}
                                                    </td>
                                                    <td className="px-5 py-4 font-mono text-gray-600 dark:text-slate-300">
                                                        {phone || <span className="text-gray-400 italic">Belum tercatat</span>}
                                                    </td>
                                                    <td className="px-5 py-4 text-right">
                                                        {phone ? (
                                                            <div className="inline-flex gap-2">
                                                                <a
                                                                    href={reminderLink || "#"}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1 rounded-full bg-emerald-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-xs transition hover:bg-emerald-600"
                                                                >
                                                                    <Send size={11} /> Ingatkan (H-1)
                                                                </a>
                                                                <a
                                                                    href={overdueLink || "#"}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="inline-flex items-center gap-1 rounded-full bg-rose-500 px-3 py-1.5 text-[10px] font-bold text-white shadow-xs transition hover:bg-rose-600"
                                                                >
                                                                    Peringatan
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <span className="text-[10px] text-gray-400 italic">No. WA kosong</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {activeLoans.length === 0 && (
                                            <tr>
                                                <td colSpan={5} className="py-8 text-center text-xs text-gray-400 italic">
                                                    Tidak ada peminjaman aktif saat ini.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 5: PENGATURAN LAYANAN
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "settings" && (
                        <div className="max-w-xl">
                            <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                Pengaturan Layanan Perpustakaan
                            </h2>
                            <p className="text-xs text-gray-400">Atur durasi pinjam e-book dan kuota maksimal siswa.</p>

                            <form onSubmit={handleSettingsSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-300">
                                        Durasi Peminjaman E-Book Online (Hari)
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="30"
                                        value={settingsForm.data.online_loan_duration_days}
                                        onChange={(e) => settingsForm.setData("online_loan_duration_days", parseInt(e.target.value) || 1)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                    <span className="text-[10px] text-gray-400">
                                        Setelah durasi ini berlalu, e-book otomatis terkunci di akun siswa.
                                    </span>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-300">
                                        Maksimal Buku Online Yang Boleh Dipinjam Bersamaan
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        max="10"
                                        value={settingsForm.data.max_online_loans}
                                        onChange={(e) => settingsForm.setData("max_online_loans", parseInt(e.target.value) || 1)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-300">
                                        Nama Perpustakaan Resmi
                                    </label>
                                    <input
                                        type="text"
                                        value={settingsForm.data.library_name}
                                        onChange={(e) => settingsForm.setData("library_name", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="rounded-full bg-[#2699fb] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    Simpan Pengaturan
                                </button>
                            </form>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 6: BUKU PANDUAN GURU / PUSTAKAWAN
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "guide" && (
                        <div className="max-w-3xl space-y-6">
                            <div>
                                <h2 className="font-display text-xl font-black text-[#152238] dark:text-white">
                                    Buku Panduan Pustakawan & Guru SMAN 1 Bukittinggi
                                </h2>
                                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    Panduan praktis pengelolaan buku, buletin, dan komunikasi sirkulasi siswa.
                                </p>
                            </div>

                            <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5 dark:border-blue-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-[#2699fb]">
                                    <CheckCircle2 size={16} /> 1. Cara Menggunakan Meja Sirkulasi (Scan Barcode Kartu Siswa)
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Buka tab <strong>Meja Sirkulasi & Scan Kartu</strong>.</li>
                                    <li>• Siapkan scanner barcode USB, lalu tembakkan ke kartu pelajar fisik siswa (atau masukkan nomor NIS).</li>
                                    <li>• Sistem akan langsung menampilkan foto siswa, nama, kelas, nomor WhatsApp, serta buku yang sedang dipinjam.</li>
                                    <li>• Tembak barcode buku fisik yang ingin dipinjam &rarr; Buku otomatis terpinjam dengan jatuh tempo 7 hari ke depan!</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-emerald-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-emerald-600">
                                    <CheckCircle2 size={16} /> 2. Mengirimkan Notifikasi WhatsApp (100% Gratis Tanpa Biaya)
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Di tab <strong>Pusat WhatsApp</strong>, Anda dapat melihat siapa saja siswa yang besok bukunya harus dikembalikan.</li>
                                    <li>• Cukup klik tombol <em>Ingatkan (H-1)</em> atau <em>Peringatan</em>.</li>
                                    <li>• WhatsApp Web/Desktop akan otomatis terbuka di komputer dengan pesan ramah yang sudah terketik rapi. Tekan tombol Enter untuk mengirim!</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 dark:border-amber-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-amber-600">
                                    <CheckCircle2 size={16} /> 3. Mengunduh Laporan Sirkulasi untuk Akreditasi Sekolah
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Klik tombol <em>Unduh Laporan Excel</em> di kanan atas panel admin.</li>
                                    <li>• File berformat <code>.CSV</code> siap dibuka di Microsoft Excel dengan data lengkap nomor induk siswa, judul buku, dan tanggal sirkulasi.</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-indigo-100 bg-indigo-50/40 p-5 dark:border-indigo-900/40 dark:bg-slate-800/60">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h3 className="flex items-center gap-2 font-display text-sm font-bold text-indigo-700 dark:text-indigo-400">
                                            <CheckCircle2 size={16} /> 4. Integrasi INLISLite Perpusnas RI & Buku Tamu Masuk
                                        </h3>
                                        <p className="mt-1 text-xs text-gray-600 dark:text-slate-300">
                                            Sistem web ini terhubung langsung dengan pangkalan data INLISLite v3 yang terpasang pada komputer server lokal perpustakaan sekolah.
                                        </p>
                                    </div>
                                    <div className="shrink-0">
                                        <a
                                            href={inlisliteInfo?.guestbook_url || "http://192.168.1.100:8123/inlislite3/buku-tamu"}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-indigo-700 transition"
                                        >
                                            <ExternalLink size={14} /> Buka Layar Buku Tamu (Perangkat Pintu)
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-4 grid gap-3 sm:grid-cols-2 text-xs border-t border-indigo-100/60 dark:border-slate-700 pt-3">
                                    <div className="flex items-center justify-between rounded-lg bg-white/70 dark:bg-slate-900/60 p-3 border border-indigo-100/60 dark:border-slate-800">
                                        <span className="text-gray-500 dark:text-slate-400">Status Database INLISLite:</span>
                                        <span className={`font-bold ${inlisliteInfo?.connected ? "text-emerald-600" : "text-amber-600"}`}>
                                            {inlisliteInfo?.connected ? "Terhubung (Database Lokal)" : "Siap Terhubung di Jaringan Sekolah"}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between rounded-lg bg-white/70 dark:bg-slate-900/60 p-3 border border-indigo-100/60 dark:border-slate-800">
                                        <span className="text-gray-500 dark:text-slate-400">IP / URL Buku Tamu Lokal:</span>
                                        <span className="font-mono font-bold text-indigo-700 dark:text-indigo-300 truncate max-w-[200px]">
                                            {inlisliteInfo?.guestbook_url || "192.168.1.100"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════
                MODAL: TAMBAH BUKU BARU
            ═══════════════════════════════════════════════════════ */}
            {showAddBookModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#121824] max-h-[90vh] overflow-y-auto">
                        <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                            Tambah Buku Baru / E-Book
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Lengkapi data buku fisik atau e-book digital.</p>

                        <form onSubmit={handleBookSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Buku *</label>
                                <input
                                    type="text"
                                    required
                                    value={bookForm.data.title}
                                    onChange={(e) => bookForm.setData("title", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Penulis *</label>
                                    <input
                                        type="text"
                                        required
                                        value={bookForm.data.author_name}
                                        onChange={(e) => bookForm.setData("author_name", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori *</label>
                                    <select
                                        value={bookForm.data.category_id}
                                        onChange={(e) => bookForm.setData("category_id", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Tahun Terbit</label>
                                    <input
                                        type="number"
                                        value={bookForm.data.publication_year}
                                        onChange={(e) => bookForm.setData("publication_year", parseInt(e.target.value) || 2024)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">ISBN</label>
                                    <input
                                        type="text"
                                        value={bookForm.data.isbn}
                                        onChange={(e) => bookForm.setData("isbn", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Jumlah Eksemplar</label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={bookForm.data.copies_count}
                                        onChange={(e) => bookForm.setData("copies_count", parseInt(e.target.value) || 1)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Lokasi Rak Fisik</label>
                                <input
                                    type="text"
                                    value={bookForm.data.shelf_location}
                                    onChange={(e) => bookForm.setData("shelf_location", e.target.value)}
                                    placeholder="Contoh: Rak 03 - Sains & Matematika"
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Sinopsis Singkat</label>
                                <textarea
                                    rows={3}
                                    value={bookForm.data.synopsis}
                                    onChange={(e) => bookForm.setData("synopsis", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-slate-800">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        Foto Cover (Maks 2 MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        onChange={(e) => bookForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-[11px] text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#2699fb]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">
                                        File E-Book PDF (Maks 15 MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => bookForm.setData("ebook_file", e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-[11px] text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-purple-700"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookModal(false)}
                                    className="rounded-full px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={bookForm.processing}
                                    className="rounded-full bg-[#2699fb] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    {bookForm.processing ? "Menyimpan..." : "Simpan Buku"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════
                MODAL: UPLOAD MAJALAH / BULETIN KURTAW
            ═══════════════════════════════════════════════════════ */}
            {showAddMagazineModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#121824]">
                        <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                            Unggah Edisi Majalah / Buletin Kurtaw
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Publikasi karya literasi digital sekolah.</p>

                        <form onSubmit={handleMagazineSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Jenis Publikasi *</label>
                                <select
                                    value={magazineForm.data.magazine_id}
                                    onChange={(e) => magazineForm.setData("magazine_id", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    {magazines.map((m) => (
                                        <option key={m.id} value={m.id}>
                                            {m.type === "bulletin" ? "[Buletin] " : "[Majalah] "} {m.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Edisi / Tema *</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="Contoh: Edisi Spesial Dies Natalis 2026"
                                    value={magazineForm.data.edition_title}
                                    onChange={(e) => magazineForm.setData("edition_title", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Nomor Edisi *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Contoh: 04"
                                        value={magazineForm.data.edition_number}
                                        onChange={(e) => magazineForm.setData("edition_number", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Tanggal Terbit</label>
                                    <input
                                        type="date"
                                        value={magazineForm.data.publication_date}
                                        onChange={(e) => magazineForm.setData("publication_date", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">File Dokumen PDF * (Maks 15 MB)</label>
                                <input
                                    type="file"
                                    required
                                    accept="application/pdf"
                                    onChange={(e) => magazineForm.setData("pdf_file", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-[11px] text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-purple-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-purple-700"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Foto Cover (Maks 2 MB)</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => magazineForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-[11px] text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#2699fb]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddMagazineModal(false)}
                                    className="rounded-full px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={magazineForm.processing}
                                    className="rounded-full bg-[#2699fb] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    {magazineForm.processing ? "Mengunggah..." : "Publikasikan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ═══════════════════════════════════════════════════════
                MODAL: BUAT AGENDA EVENT BARU
            ═══════════════════════════════════════════════════════ */}
            {showAddEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl dark:bg-[#121824]">
                        <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                            Publikasikan Agenda / Berita Literasi
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">Kegiatan perpustakaan, duta baca, dan podcast literasi.</p>

                        <form onSubmit={handleEventSubmit} className="mt-5 space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Judul Kegiatan *</label>
                                <input
                                    type="text"
                                    required
                                    value={eventForm.data.title}
                                    onChange={(e) => eventForm.setData("title", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Kategori</label>
                                    <select
                                        value={eventForm.data.type}
                                        onChange={(e) => eventForm.setData("type", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    >
                                        <option value="event">Agenda / Acara</option>
                                        <option value="duta">Duta Literasi</option>
                                        <option value="podcast">Podcast SMANSA</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Tanggal Kegiatan</label>
                                    <input
                                        type="date"
                                        value={eventForm.data.event_date}
                                        onChange={(e) => eventForm.setData("event_date", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Lokasi / Tempat</label>
                                <input
                                    type="text"
                                    value={eventForm.data.location}
                                    onChange={(e) => eventForm.setData("location", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Deskripsi / Detail Acara *</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={eventForm.data.description}
                                    onChange={(e) => eventForm.setData("description", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 dark:text-slate-300">Foto Poster / Dokumentasi (Maks 2 MB)</label>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={(e) => eventForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-[11px] text-gray-500 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-bold file:text-[#2699fb]"
                                />
                            </div>

                            <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-slate-800">
                                <button
                                    type="button"
                                    onClick={() => setShowAddEventModal(false)}
                                    className="rounded-full px-4 py-2 text-xs font-bold text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-800"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={eventForm.processing}
                                    className="rounded-full bg-[#2699fb] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    {eventForm.processing ? "Menyimpan..." : "Publikasikan"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </SiteShell>
    );
}
