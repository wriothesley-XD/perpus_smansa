import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    AlertCircle,
    BookCopy,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    FileText,
    HelpCircle,
    MessageSquare,
    Package,
    Plus,
    Send,
    Settings,
    Trash2,
    Upload,
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
        book?: {
            id: number;
            title: string;
            slug: string;
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
        data: (Book & { copies_count?: number })[];
        current_page: number;
        last_page: number;
    };
    magazines: (Magazine & { editions?: MagazineEdition[] })[];
    events: {
        data: Event[];
    };
    activeLoans: ActiveLoan[];
    categories: { id: number; name: string }[];
    settings: {
        online_loan_duration_days: number;
        max_online_loans: number;
        library_name: string;
        library_address: string;
        contact_phone: string;
    };
}

type TabType = "books" | "magazines" | "events" | "whatsapp" | "settings" | "guide";

export default function AdminPanel({
    stats,
    books,
    magazines,
    events,
    activeLoans,
    categories,
    settings,
}: PanelProps) {
    const [activeTab, setActiveTab] = useState<TabType>("books");
    const [showAddBookModal, setShowAddBookModal] = useState(false);
    const [showAddMagazineModal, setShowAddMagazineModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);

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

    const handleCreateBook = (e: React.FormEvent) => {
        e.preventDefault();
        bookForm.post("/admin-panel/books", {
            onSuccess: () => {
                bookForm.reset();
                setShowAddBookModal(false);
            },
        });
    };

    const handleDeleteBook = (id: number, title: string) => {
        if (confirm(`Yakin ingin menghapus buku "${title}" beserta salinannya?`)) {
            bookForm.delete(`/admin-panel/books/${id}`);
        }
    };

    const handleCreateMagazine = (e: React.FormEvent) => {
        e.preventDefault();
        magazineForm.post("/admin-panel/magazines", {
            onSuccess: () => {
                magazineForm.reset();
                setShowAddMagazineModal(false);
            },
        });
    };

    const handleDeleteMagazine = (id: number) => {
        if (confirm("Yakin ingin menghapus edisi ini?")) {
            magazineForm.delete(`/admin-panel/magazines/${id}`);
        }
    };

    const handleCreateEvent = (e: React.FormEvent) => {
        e.preventDefault();
        eventForm.post("/admin-panel/events", {
            onSuccess: () => {
                eventForm.reset();
                setShowAddEventModal(false);
            },
        });
    };

    const handleDeleteEvent = (id: number) => {
        if (confirm("Yakin ingin menghapus agenda kegiatan ini?")) {
            eventForm.delete(`/admin-panel/events/${id}`);
        }
    };

    const handleUpdateSettings = (e: React.FormEvent) => {
        e.preventDefault();
        settingsForm.post("/admin-panel/settings");
    };

    return (
        <SiteShell>
            <Head title="Panel Pengelola Perpustakaan - SMAN 1 Bukittinggi" />

            <div className="min-h-screen bg-gray-50/50 pb-20 dark:bg-[#090d16]">
                {/* Header Banner */}
                <div className="border-b border-gray-200 bg-white px-5 py-8 sm:px-8 dark:border-slate-800 dark:bg-[#0f172a]">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-blue-300">
                                    Portal Khusus Guru & Pustakawan
                                </span>
                                <h1 className="mt-2 font-display text-2xl font-black text-[#152238] dark:text-white sm:text-3xl">
                                    Pusat Manajemen Perpustakaan
                                </h1>
                                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => setActiveTab("guide")}
                                className="inline-flex items-center gap-2 self-start rounded-full border border-blue-200 bg-blue-50/50 px-4 py-2 text-xs font-bold text-[#2699fb] transition hover:bg-blue-100/50 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-300"
                            >
                                <HelpCircle size={15} /> Baca Panduan Guru
                            </button>
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
                                    className="inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Tambah Buku Baru
                                </button>
                            </div>

                            {/* Books Table */}
                            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-gray-100 bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 dark:border-slate-800 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-5 py-3.5">Buku & Penulis</th>
                                            <th className="px-5 py-3.5">Kategori</th>
                                            <th className="px-5 py-3.5">Eksemplar</th>
                                            <th className="px-5 py-3.5">Tipe Akses</th>
                                            <th className="px-5 py-3.5 text-right">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                        {books.data.map((book) => (
                                            <tr key={book.id} className="hover:bg-gray-50/40 dark:hover:bg-slate-800/30">
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md bg-gray-100 dark:bg-slate-700">
                                                            <img
                                                                src={book.cover_image || "/images/hero_library.jpg"}
                                                                alt={book.title}
                                                                className="h-full w-full object-cover"
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                        <div>
                                                            <Link
                                                                href={`/books/${book.slug}`}
                                                                className="font-bold text-[#152238] hover:text-[#2699fb] dark:text-white"
                                                            >
                                                                {book.title}
                                                            </Link>
                                                            <p className="text-[10px] text-gray-400">
                                                                {book.authors?.map((a) => a.name).join(", ") || "Penulis Umum"} • Rak: {book.shelf_location || "-"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4">
                                                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-700 dark:bg-slate-800 dark:text-slate-300">
                                                        {book.category?.name || "Umum"}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-gray-600 dark:text-slate-300 font-mono">
                                                    {book.copies_count || 1} Salinan
                                                </td>
                                                <td className="px-5 py-4">
                                                    {book.is_ebook || book.ebook_file_path ? (
                                                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
                                                            Tersedia E-Book
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-semibold text-gray-500 dark:bg-slate-800 dark:text-slate-400">
                                                            Buku Fisik
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteBook(book.id, book.title)}
                                                        className="rounded-lg p-1.5 text-rose-500 transition hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                                        title="Hapus buku"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 2: BULETIN & MAJALAH
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "magazines" && (
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Penerbitan Buletin & Majalah SMANSA
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Unggah edisi terbaru Buletin Kurtaw atau Majalah Genta Smansa.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddMagazineModal(true)}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Terbitkan Edisi Baru
                                </button>
                            </div>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2">
                                {magazines.map((mag) => (
                                    <div
                                        key={mag.id}
                                        className="rounded-2xl border border-gray-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#121824]"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                                                {mag.type === "bulletin" ? "Buletin Perpustakaan" : "Majalah Sekolah"}
                                            </span>
                                            <span className="text-xs text-gray-400">{mag.editions?.length || 0} Edisi Terbit</span>
                                        </div>
                                        <h3 className="mt-3 font-display text-base font-bold text-[#152238] dark:text-white">{mag.title}</h3>
                                        <p className="mt-1 text-xs text-gray-400 line-clamp-2">{mag.description}</p>

                                        <div className="mt-4 space-y-2 border-t border-gray-100 pt-4 dark:border-slate-800">
                                            {mag.editions?.map((ed) => (
                                                <div
                                                    key={ed.id}
                                                    className="flex items-center justify-between rounded-xl bg-gray-50/60 p-2.5 text-xs dark:bg-slate-800/50"
                                                >
                                                    <div>
                                                        <p className="font-bold text-[#152238] dark:text-white">
                                                            Edisi {ed.edition_number}: {ed.edition_title}
                                                        </p>
                                                        <p className="text-[10px] text-gray-400">{ed.publication_date}</p>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteMagazine(ed.id)}
                                                        className="text-rose-500 hover:text-rose-700"
                                                    >
                                                        <Trash2 size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                            {(!mag.editions || mag.editions.length === 0) && (
                                                <p className="text-xs text-gray-400 italic">Belum ada edisi yang terbit.</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 3: AGENDA & KEGIATAN
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "events" && (
                        <div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Agenda, Duta Literasi & Berita Kegiatan
                                    </h2>
                                    <p className="text-xs text-gray-400">Kelola jadwal kegiatan literasi dan podcast.</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setShowAddEventModal(true)}
                                    className="inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1783df]"
                                >
                                    <Plus size={15} /> Publikasikan Kegiatan
                                </button>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                {events.data.map((ev) => (
                                    <div
                                        key={ev.id}
                                        className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-[#121824]"
                                    >
                                        <div>
                                            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase text-[#2699fb] dark:bg-blue-950/60 dark:text-blue-300">
                                                {ev.type}
                                            </span>
                                            <h3 className="mt-3 font-display text-base font-bold text-[#152238] dark:text-white">{ev.title}</h3>
                                            <p className="mt-1 text-xs text-gray-400 line-clamp-2">{ev.description}</p>
                                            <p className="mt-3 text-[10px] text-gray-500">
                                                📅 {ev.event_date || "Tanggal segera"} • 📍 {ev.location}
                                            </p>
                                        </div>
                                        <div className="mt-4 flex justify-end border-t border-gray-100 pt-3 dark:border-slate-800">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteEvent(ev.id)}
                                                className="inline-flex items-center gap-1 text-xs font-bold text-rose-500 hover:text-rose-700"
                                            >
                                                <Trash2 size={13} /> Hapus
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ═══════════════════════════════════════════════════════
                        TAB 4: PUSAT PENGINGAT WHATSAPP (SIRKULASI)
                    ═══════════════════════════════════════════════════════ */}
                    {activeTab === "whatsapp" && (
                        <div>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                        Pusat Notifikasi & Pengingat WhatsApp
                                    </h2>
                                    <p className="text-xs text-gray-400">
                                        Kirim pesan pengingat jatuh tempo dan keterlambatan pengembalian buku langsung ke WhatsApp siswa secara sopan dan otomatis.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-gray-100 bg-gray-50/50 text-[10px] uppercase font-bold text-gray-400 dark:border-slate-800 dark:bg-slate-800/50">
                                        <tr>
                                            <th className="px-5 py-3.5">Peminjam</th>
                                            <th className="px-5 py-3.5">Buku Dipinjam</th>
                                            <th className="px-5 py-3.5">Batas Kembali</th>
                                            <th className="px-5 py-3.5">Nomor WhatsApp</th>
                                            <th className="px-5 py-3.5 text-right">Kirim Pesan WhatsApp</th>
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
                        <div className="max-w-2xl">
                            <h2 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                Pengaturan Durasi Peminjaman & Sistem
                            </h2>
                            <p className="text-xs text-gray-400">Atur batasan membaca e-book dan identitas perpustakaan.</p>

                            <form onSubmit={handleUpdateSettings} className="mt-6 space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-[#121824]">
                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-200">
                                        Maksimal Hari Pinjam E-Book (E-Reader)
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={30}
                                        value={settingsForm.data.online_loan_duration_days}
                                        onChange={(e) => settingsForm.setData("online_loan_duration_days", parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">
                                        Setelah waktu ini terlewati, e-book otomatis terkunci dan siswa harus meminjam kembali.
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-200">
                                        Maksimal Jumlah E-Book Aktif per Siswa
                                    </label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={10}
                                        value={settingsForm.data.max_online_loans}
                                        onChange={(e) => settingsForm.setData("max_online_loans", parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-[#152238] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-[#152238] dark:text-slate-200">
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
                                    <CheckCircle2 size={16} /> 1. Cara Menambahkan Buku Baru & E-Book
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Buka tab <strong>Koleksi Buku & E-Book</strong> lalu klik tombol <em>+ Tambah Buku Baru</em>.</li>
                                    <li>• Isi judul, penulis, kategori, tahun terbit, lokasi rak fisik, dan sinopsis.</li>
                                    <li>• <strong>Foto Sampul:</strong> Gunakan format JPG/PNG/WebP dengan ukuran <strong>maksimal 2 MB</strong> agar website tetap cepat dimuat.</li>
                                    <li>• <strong>File E-Book (PDF):</strong> Jika tersedia salinan digital, unggah file PDF buku dengan ukuran <strong>maksimal 15 MB</strong>. Buku ini otomatis dapat dibaca di E-Reader dengan proteksi anti-download.</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-amber-100 bg-amber-50/40 p-5 dark:border-amber-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-amber-600">
                                    <CheckCircle2 size={16} /> 2. Cara Mengunggah Buletin Kurtaw & Majalah Sekolah
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Pilih jenis publikasi: <em>Buletin Kurtaw SMANSA</em> atau <em>Majalah Genta Smansa</em>.</li>
                                    <li>• Masukkan nomor edisi (contoh: <code>02/2026</code>) dan judul tema edisi.</li>
                                    <li>• Unggah file PDF buletin (maksimal 15 MB). Buletin akan langsung dapat dibaca oleh seluruh warga sekolah.</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-emerald-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-emerald-600">
                                    <CheckCircle2 size={16} /> 3. Mengirimkan Pesan Pengingat WhatsApp ke Siswa
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Buka tab <strong>Pusat WhatsApp (Sirkulasi)</strong> untuk melihat daftar siswa yang sedang meminjam buku.</li>
                                    <li>• Klik tombol hijau <strong>"Ingatkan (H-1)"</strong>: Layar WhatsApp Web atau aplikasi WhatsApp di HP Anda akan otomatis terbuka dengan draf pesan resmi dari Perpustakaan SMANSA yang sudah memuat nama siswa, kelas, judul buku, dan tanggal jatuh tempo.</li>
                                    <li>• Anda cukup menekan tombol kirim di WhatsApp tanpa perlu mengetik ulang pesan!</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl border border-purple-100 bg-purple-50/40 p-5 dark:border-purple-900/40 dark:bg-slate-800/60">
                                <h3 className="flex items-center gap-2 font-display text-sm font-bold text-purple-600">
                                    <CheckCircle2 size={16} /> 4. Tips Kecepatan Membuka Website
                                </h3>
                                <ul className="mt-3 space-y-2 text-xs text-gray-600 dark:text-slate-300">
                                    <li>• Semua gambar di website telah dilengkapi sistem <em>lazy loading</em> sehingga tidak membebani kuota internet.</li>
                                    <li>• Pastikan foto sampul buku yang difoto menggunakan ponsel telah dikompres di bawah 2 MB sebelum diunggah.</li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── MODAL TAMBAH BUKU ── */}
            {showAddBookModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#121824]">
                        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                            <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                                Tambah Buku & E-Book Baru
                            </h3>
                            <button type="button" onClick={() => setShowAddBookModal(false)} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateBook} className="mt-4 space-y-3.5 text-xs">
                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Judul Buku *</label>
                                <input
                                    type="text"
                                    required
                                    value={bookForm.data.title}
                                    onChange={(e) => bookForm.setData("title", e.target.value)}
                                    placeholder="Contoh: Sejarah Minangkabau & Kearifan Lokal"
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Penulis</label>
                                    <input
                                        type="text"
                                        value={bookForm.data.author_name}
                                        onChange={(e) => bookForm.setData("author_name", e.target.value)}
                                        placeholder="Nama pengarang"
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Kategori</label>
                                    <select
                                        value={bookForm.data.category_id}
                                        onChange={(e) => bookForm.setData("category_id", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    >
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Tahun</label>
                                    <input
                                        type="number"
                                        value={bookForm.data.publication_year}
                                        onChange={(e) => bookForm.setData("publication_year", parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Lokasi Rak</label>
                                    <input
                                        type="text"
                                        value={bookForm.data.shelf_location}
                                        onChange={(e) => bookForm.setData("shelf_location", e.target.value)}
                                        placeholder="Contoh: Rak 03"
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Eksemplar Fisik</label>
                                    <input
                                        type="number"
                                        min={1}
                                        max={50}
                                        value={bookForm.data.copies_count}
                                        onChange={(e) => bookForm.setData("copies_count", parseInt(e.target.value))}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Sinopsis / Ringkasan Buku *</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={bookForm.data.synopsis}
                                    onChange={(e) => bookForm.setData("synopsis", e.target.value)}
                                    placeholder="Tuliskan ringkasan isi buku secara singkat..."
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            {/* File Uploads with MB Limits */}
                            <div className="rounded-2xl border border-blue-100 bg-blue-50/30 p-3.5 dark:border-blue-900/40 dark:bg-slate-800/50">
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">
                                        Foto Sampul Buku (Maksimal 2 MB)
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => bookForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-xs text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-blue-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#2699fb]"
                                    />
                                </div>

                                <div className="mt-3 border-t border-blue-100 pt-3 dark:border-slate-700">
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">
                                        File E-Book PDF (Maksimal 15 MB) - Opsional
                                    </label>
                                    <input
                                        type="file"
                                        accept="application/pdf"
                                        onChange={(e) => bookForm.setData("ebook_file", e.target.files ? e.target.files[0] : null)}
                                        className="mt-1 block w-full text-xs text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700"
                                    />
                                    <p className="mt-1 text-[10px] text-gray-400">
                                        Jika diisi, siswa dapat membaca buku ini lewat E-Reader anti-download.
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowAddBookModal(false)}
                                    className="rounded-full border px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
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

            {/* ── MODAL TAMBAH BULETIN / MAJALAH ── */}
            {showAddMagazineModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#121824]">
                        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                            <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                                Terbitkan Edisi Buletin / Majalah
                            </h3>
                            <button type="button" onClick={() => setShowAddMagazineModal(false)} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateMagazine} className="mt-4 space-y-3.5 text-xs">
                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Jenis Publikasi</label>
                                <select
                                    value={magazineForm.data.magazine_id}
                                    onChange={(e) => magazineForm.setData("magazine_id", e.target.value)}
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                >
                                    {magazines.map((m) => (
                                        <option key={m.id} value={m.id}>{m.title}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Judul Edisi *</label>
                                <input
                                    type="text"
                                    required
                                    value={magazineForm.data.edition_title}
                                    onChange={(e) => magazineForm.setData("edition_title", e.target.value)}
                                    placeholder="Contoh: Semangat Literasi Menuju Prestasi Emas"
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Nomor Edisi</label>
                                    <input
                                        type="text"
                                        required
                                        value={magazineForm.data.edition_number}
                                        onChange={(e) => magazineForm.setData("edition_number", e.target.value)}
                                        placeholder="Contoh: 03/2026"
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Tanggal Terbit</label>
                                    <input
                                        type="date"
                                        value={magazineForm.data.publication_date}
                                        onChange={(e) => magazineForm.setData("publication_date", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Foto Sampul (Maks. 2 MB)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => magazineForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-xs text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-blue-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#2699fb]"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">File PDF Edisi (Maks. 15 MB)</label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => magazineForm.setData("pdf_file", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-xs text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-emerald-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-emerald-700"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddMagazineModal(false)}
                                    className="rounded-full border px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={magazineForm.processing}
                                    className="rounded-full bg-[#2699fb] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    {magazineForm.processing ? "Menerbitkan..." : "Terbitkan Edisi"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* ── MODAL TAMBAH AGENDA ── */}
            {showAddEventModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
                    <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-[#121824]">
                        <div className="flex items-center justify-between border-b pb-3 dark:border-slate-800">
                            <h3 className="font-display text-base font-bold text-[#152238] dark:text-white">
                                Publikasikan Kegiatan Baru
                            </h3>
                            <button type="button" onClick={() => setShowAddEventModal(false)} className="text-gray-400 hover:text-gray-600">
                                ✕
                            </button>
                        </div>

                        <form onSubmit={handleCreateEvent} className="mt-4 space-y-3.5 text-xs">
                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Nama Kegiatan *</label>
                                <input
                                    type="text"
                                    required
                                    value={eventForm.data.title}
                                    onChange={(e) => eventForm.setData("title", e.target.value)}
                                    placeholder="Contoh: Bedah Buku Karya Siswa SMANSA 2026"
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Tipe</label>
                                    <select
                                        value={eventForm.data.type}
                                        onChange={(e) => eventForm.setData("type", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    >
                                        <option value="event">Agenda / Event</option>
                                        <option value="duta">Duta Literasi</option>
                                        <option value="podcast">Podcast Duta</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-bold text-[#152238] dark:text-slate-200">Tanggal Pelaksanaan</label>
                                    <input
                                        type="date"
                                        value={eventForm.data.event_date}
                                        onChange={(e) => eventForm.setData("event_date", e.target.value)}
                                        className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Lokasi Kegiatan</label>
                                <input
                                    type="text"
                                    value={eventForm.data.location}
                                    onChange={(e) => eventForm.setData("location", e.target.value)}
                                    placeholder="Contoh: Ruang Baca / Aula SMANSA"
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Deskripsi *</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={eventForm.data.description}
                                    onChange={(e) => eventForm.setData("description", e.target.value)}
                                    placeholder="Jelaskan rincian agenda atau episode podcast..."
                                    className="mt-1 block w-full rounded-xl border border-gray-200 p-2.5 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                />
                            </div>

                            <div>
                                <label className="block font-bold text-[#152238] dark:text-slate-200">Foto Kegiatan (Maks. 2 MB)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => eventForm.setData("cover_image", e.target.files ? e.target.files[0] : null)}
                                    className="mt-1 block w-full text-xs text-gray-500 file:mr-3 file:rounded-full file:border-0 file:bg-purple-100 file:px-3 file:py-1 file:text-xs file:font-semibold file:text-purple-700"
                                />
                            </div>

                            <div className="flex justify-end gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => setShowAddEventModal(false)}
                                    className="rounded-full border px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100"
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
