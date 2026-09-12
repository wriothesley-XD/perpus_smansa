import { Head, Link, usePage } from '@inertiajs/react';
import {
    BarChart3, BookCopy, BookOpen, Calendar, CalendarCheck,
    ChevronRight, FileText, Package, Settings, Users
} from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';

interface AdminStats {
    totalBooks: number;
    totalCopies: number;
    activeLoans: number;
    pendingReservations: number;
    totalMembers: number;
    totalEvents: number;
    totalWorks: number;
    pendingWorks: number;
}

interface AdminPanelProps {
    stats: AdminStats;
}

const MENU_GROUPS = [
    {
        label: 'Koleksi',
        items: [
            { label: 'Manajemen Buku', desc: 'Lihat koleksi dan detail katalog', icon: BookOpen, href: '/catalog', color: 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
            { label: 'Eksemplar Buku', desc: 'Pantau ketersediaan salinan fisik', icon: BookCopy, href: '/catalog', color: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' },
        ],
    },
    {
        label: 'Transaksi',
        items: [
            { label: 'Peminjaman', desc: 'Pantau transaksi aktif dan statistik', icon: Package, href: '/ranking', color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' },
            { label: 'Reservasi', desc: 'Lihat alur reservasi dari katalog', icon: CalendarCheck, href: '/catalog', color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' },
        ],
    },
    {
        label: 'Konten Komunitas',
        items: [
            { label: 'Event & Podcast', desc: 'Lihat event, duta, dan podcast', icon: Calendar, href: '/events', color: 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
            { label: 'Karya Smansa', desc: 'Lihat karya siswa dan guru', icon: FileText, href: '/karya-smansa', color: 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' },
        ],
    },
    {
        label: 'Anggota & Sistem',
        items: [
            { label: 'Data Anggota', desc: 'Pantau komunitas pembaca', icon: Users, href: '/ranking', color: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
            { label: 'Laporan', desc: 'Statistik peminjaman dan koleksi', icon: BarChart3, href: '/ranking', color: 'bg-teal-50 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' },
            { label: 'Pengaturan', desc: 'Informasi dan kontak perpustakaan', icon: Settings, href: '/information', color: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' },
        ],
    },
];

export default function AdminPanel({ stats }: AdminPanelProps) {
    const { auth } = usePage().props as { auth?: { user?: { name: string; role: string } } };

    const statCards = [
        { label: 'Judul Buku', value: stats?.totalBooks ?? 0, icon: BookOpen, color: 'text-[#0B4EA2] dark:text-blue-400', bg: 'bg-[#EAF4FF] dark:bg-blue-900/20' },
        { label: 'Eksemplar', value: stats?.totalCopies ?? 0, icon: BookCopy, color: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-900/20' },
        { label: 'Dipinjam', value: stats?.activeLoans ?? 0, icon: Package, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-900/20' },
        { label: 'Reservasi Masuk', value: stats?.pendingReservations ?? 0, icon: CalendarCheck, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-900/20' },
        { label: 'Anggota', value: stats?.totalMembers ?? 0, icon: Users, color: 'text-slate-600 dark:text-slate-300', bg: 'bg-slate-100 dark:bg-slate-700' },
        { label: 'Event & Podcast', value: stats?.totalEvents ?? 0, icon: Calendar, color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
        { label: 'Karya Menunggu Kurasi', value: stats?.pendingWorks ?? 0, icon: FileText, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-900/20' },
    ];

    return (
        <SiteShell>
            <Head title="Panel Admin — Perpustakaan SMAN 1 Bukittinggi" />
            <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-900">
                {/* Header */}
                <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-8 sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-widest text-[#0B4EA2] dark:text-blue-400">
                                    Panel Pengelola
                                </p>
                                <h1 className="mt-1 font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                                    Selamat datang, {auth?.user?.name?.split(' ')[0] ?? 'Pustakawan'}
                                </h1>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    Kelola koleksi, transaksi, dan konten perpustakaan dari sini.
                                </p>
                            </div>
                            <span className="hidden rounded-xl bg-amber-100 dark:bg-amber-900/30 px-4 py-2 text-xs font-bold text-amber-800 dark:text-amber-400 sm:block">
                                {auth?.user?.role === 'admin' ? 'Administrator' : 'Pustakawan'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 space-y-10">
                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
                        {statCards.map((s) => (
                            <div key={s.label} className="rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5">
                                <span className={`inline-grid size-10 place-items-center rounded-xl ${s.bg}`}>
                                    <s.icon size={18} className={s.color} />
                                </span>
                                <p className="mt-3 text-2xl font-extrabold text-[#0F172A] dark:text-white">
                                    {s.value.toLocaleString('id-ID')}
                                </p>
                                <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">{s.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* Menu Groups */}
                    {MENU_GROUPS.map((group) => (
                        <div key={group.label}>
                            <h2 className="mb-4 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                {group.label}
                            </h2>
                            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                {group.items.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-5 hover:border-[#0B4EA2] dark:hover:border-blue-500 hover:shadow-md transition-all"
                                    >
                                        <span className={`grid size-11 shrink-0 place-items-center rounded-xl ${item.color}`}>
                                            <item.icon size={20} />
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-[#0F172A] dark:text-white text-sm">{item.label}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{item.desc}</p>
                                        </div>
                                        <ChevronRight size={16} className="shrink-0 text-slate-300 dark:text-slate-600" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Quick nav back */}
                    <div className="flex items-center gap-3 pt-2">
                        <Link href="/" className="text-sm font-semibold text-[#0B4EA2] dark:text-blue-400 hover:underline">
                            ← Kembali ke Portal Perpustakaan
                        </Link>
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
