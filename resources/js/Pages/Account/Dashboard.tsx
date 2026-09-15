import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Barcode,
    BookMarked,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    Flame,
    LogOut,
    Shield,
    Smartphone,
    Sparkles,
    User,
    UserCog,
    ArrowRight,
} from 'lucide-react';
import React from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book, Loan, Reservation } from '../../types/library';
import { BookCard } from '../../Components/Common/BookCard';

interface ReadingProgressInfo {
    last_page: number;
    total_pages: number;
    updated_at: string;
}

interface DashboardProps {
    activeLoans: Loan[];
    loanHistory: Loan[];
    reservations: Reservation[];
    passport: {
        total_reads: number;
        active_reads: number;
        streak: number;
        member_since?: string;
        member_code: string;
    };
    recommendations: Book[];
    readingProgresses?: Record<number, ReadingProgressInfo>;
}

export default function Dashboard({
    activeLoans,
    loanHistory,
    reservations,
    passport,
    recommendations,
    readingProgresses = {},
}: DashboardProps) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const stamps = [
        { label: 'Peminjam Pertama', unlocked: passport.total_reads >= 1 },
        { label: 'Penjelajah Genre', unlocked: passport.total_reads >= 5 },
        { label: 'Pembaca Setia', unlocked: passport.streak >= 3 },
    ];

    const isLoanExpired = (dueAt: string) => {
        return new Date(dueAt).getTime() < Date.now();
    };

    const getDaysRemaining = (dueAt: string) => {
        const diffMs = new Date(dueAt).getTime() - Date.now();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <SiteShell>
            <Head title="Dashboard Anggota — Perpustakaan SMAN 1 Bukittinggi" />

            {/* User Header Profile */}
            <div className="paper-grain border-b border-slate-200/80 bg-white py-10 dark:border-slate-800 dark:bg-[#0c121e]">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid size-16 place-items-center rounded-2xl bg-[#152238] text-2xl font-bold text-white shadow-md dark:bg-[#2699fb]">
                                {user?.name?.charAt(0) || 'U'}
                            </div>
                            <div>
                                <div className="flex items-center gap-2">
                                    <span className="rounded-md bg-[#E8F1F5] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#152238] dark:bg-[#152238] dark:text-[#2699fb]">
                                        {user?.role === 'student' ? 'Siswa SMANSA' : user?.role === 'teacher' ? 'Guru' : 'Anggota'}
                                    </span>
                                    {user?.identifier_number && (
                                        <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                                            NIS/NISN: {user.identifier_number}
                                        </span>
                                    )}
                                </div>
                                <h1 className="mt-1 font-display text-2xl font-bold text-[#0F172A] dark:text-white">
                                    {user?.name}
                                </h1>
                                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                    {user?.class_name ? `Kelas ${user.class_name}` : 'Civitas Academica SMAN 1 Bukittinggi'}
                                    {user?.phone_number ? ` • WA: ${user.phone_number}` : ''}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                            {user && ['admin', 'librarian', 'teacher'].includes(user.role) && (
                                <Link
                                    href="/admin-panel"
                                    className="inline-flex items-center gap-1.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs font-bold text-[#2699fb] hover:bg-blue-100/70 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300 shadow-xs transition-colors"
                                >
                                    <Shield size={14} />
                                    <span>Admin Panel</span>
                                </Link>
                            )}

                            <Link
                                href="/profile"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-gray-700 hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 shadow-xs transition-colors"
                            >
                                <UserCog size={14} className="text-slate-500 dark:text-slate-400" />
                                <span>Profil Saya</span>
                            </Link>

                            <Link
                                href="/catalog"
                                className="rounded-xl bg-[#152238] px-4 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#0f172a] transition-colors dark:bg-[#2699fb] dark:hover:bg-[#1a83e0]"
                            >
                                Cari Buku →
                            </Link>

                            <Link
                                method="post"
                                as="button"
                                href="/logout"
                                className="inline-flex items-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-700 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300 transition-colors"
                            >
                                <LogOut size={14} />
                                <span>Keluar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 space-y-12">
                {/* READING PASSPORT */}
                <section className="relative overflow-hidden rounded-2xl bg-[#152238] p-6 text-white shadow-xl sm:p-8 dark:bg-[#121826] dark:border dark:border-slate-800">
                    <div className="absolute -right-12 -top-12 size-40 rounded-full border border-white/10" />
                    <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
                        <div>
                            <div className="flex items-center gap-2 text-blue-200">
                                <Sparkles size={16} />
                                <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#FFC533]">
                                    Reading Passport SMANSA
                                </span>
                            </div>
                            <h2 className="mt-3 font-display text-2xl sm:text-3xl font-bold">
                                Jejak Literasi & Prestasi Membacamu
                            </h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100/90">
                                Simpan rekam jejak buku pelajaran, fiksi, dan e-book yang telah kamu selesaikan di Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi.
                            </p>
                            <div className="mt-6 flex flex-wrap gap-2">
                                {stamps.map((stamp) => (
                                    <span
                                        key={stamp.label}
                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${
                                            stamp.unlocked
                                                ? 'bg-[#FFC533] text-[#152238]'
                                                : 'border border-white/20 text-blue-100/55'
                                        }`}
                                    >
                                        <span
                                            className={`size-1.5 rounded-full ${
                                                stamp.unlocked ? 'bg-[#FF8E4F]' : 'bg-white/25'
                                            }`}
                                        />
                                        {stamp.label}
                                        {!stamp.unlocked && ' · terkunci'}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* DIGITAL LIBRARY CARD */}
                        <div className="relative rotate-[1.5deg] rounded-xl bg-[#fffdf7] p-5 text-[#0F172A] shadow-2xl border border-[#EDE7DF] dark:bg-[#161f30] dark:border-slate-700 dark:text-white">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="font-mono-display text-[9px] font-bold uppercase tracking-widest text-[#2699fb]">
                                        KARTU ANGGOTA DIGITAL
                                    </span>
                                    <h3 className="mt-2 font-display text-lg font-bold">{user?.name}</h3>
                                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                        NIS/NISN: {user?.identifier_number || 'Belum diisi'}
                                    </p>
                                    <p className="text-[10px] text-slate-400 dark:text-slate-500">
                                        {user?.class_name ? `Kelas ${user.class_name}` : 'Civitas SMANSA'} • Sejak {passport.member_since || '2026'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <Barcode size={32} className="text-[#152238] dark:text-[#2699fb]" />
                                    <span className="font-mono text-[9px] font-bold text-slate-400">SMAN 1 BKT</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-end justify-between border-t border-dashed border-slate-300 dark:border-slate-700 pt-3">
                                <span className="font-mono text-[10px] font-bold tracking-wider text-[#152238] dark:text-blue-300">
                                    {passport.member_code}
                                </span>
                                <span className="font-handwriting text-sm font-bold text-[#FF8E4F]">
                                    Cerdas · Berkarakter · Berprestasi
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                        <div>
                            <strong className="block font-display text-2xl sm:text-3xl font-extrabold">{passport.total_reads}</strong>
                            <span className="text-[10px] text-blue-200">Buku Selesai Dibaca</span>
                        </div>
                        <div>
                            <strong className="block font-display text-2xl sm:text-3xl font-extrabold">{passport.active_reads}</strong>
                            <span className="text-[10px] text-blue-200">Sedang Dipinjam</span>
                        </div>
                        <div>
                            <strong className="flex items-center gap-1 font-display text-2xl sm:text-3xl font-extrabold text-[#FFC533]">
                                <Flame size={20} className="text-[#FFC533]" />
                                {passport.streak}
                            </strong>
                            <span className="text-[10px] text-blue-200">Hari Membaca Aktif</span>
                        </div>
                    </div>
                </section>

                {/* ACTIVE LOANS */}
                <div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <BookOpen size={20} className="text-[#2699fb]" />
                            <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">
                                Peminjaman Aktif & E-Book Saya ({activeLoans.length})
                            </h2>
                        </div>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                            Batas peminjaman online otomatis 3 hari
                        </span>
                    </div>

                    {activeLoans.length > 0 ? (
                        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {activeLoans.map((loan) => {
                                const book = loan.book_copy?.book;
                                const isEbook = loan.is_online_loan || book?.is_ebook || !!book?.ebook_file_path;
                                const expired = isLoanExpired(loan.due_at);
                                const daysLeft = getDaysRemaining(loan.due_at);
                                const progress = book?.id ? readingProgresses[book.id] : null;

                                return (
                                    <div
                                        key={loan.id}
                                        className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#121826]"
                                    >
                                        <div>
                                            <div className="flex items-center justify-between text-xs">
                                                <span className="font-mono text-[10px] text-slate-400">
                                                    {loan.loan_code}
                                                </span>
                                                <div className="flex items-center gap-1.5">
                                                    {isEbook && (
                                                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800">
                                                            E-Book Online
                                                        </span>
                                                    )}
                                                    {expired ? (
                                                        <span className="rounded-full bg-rose-50 px-2 py-0.5 text-[9px] font-bold text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800">
                                                            Kedaluwarsa
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800">
                                                            {daysLeft <= 1 ? 'Sisa 1 Hari' : `Sisa ${daysLeft} Hari`}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>

                                            <h3 className="mt-3 font-display text-base font-bold text-[#0F172A] dark:text-white line-clamp-2">
                                                {book?.title ?? 'Buku Perpustakaan'}
                                            </h3>

                                            <p className="mt-1 font-mono text-xs text-slate-500 dark:text-slate-400">
                                                Barcode: {loan.book_copy?.barcode_identifier || '-'}
                                            </p>

                                            {/* Reading Progress Indicator */}
                                            {progress && (
                                                <div className="mt-3 rounded-lg bg-slate-50 p-2.5 border border-slate-100 dark:bg-slate-900/50 dark:border-slate-800">
                                                    <div className="flex items-center justify-between text-[11px]">
                                                        <span className="text-slate-500 dark:text-slate-400">Terakhir dibaca:</span>
                                                        <span className="font-bold text-[#2699fb]">Halaman {progress.last_page}</span>
                                                    </div>
                                                    {progress.total_pages > 0 && (
                                                        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                                            <div
                                                                className="h-full bg-[#2699fb] rounded-full transition-all"
                                                                style={{
                                                                    width: `${Math.min(100, Math.round((progress.last_page / progress.total_pages) * 100))}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                        <div className="mt-5 border-t border-slate-100 dark:border-slate-800 pt-4">
                                            <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                                                <div className="flex items-center justify-between">
                                                    <span>Batas Pinjam:</span>
                                                    <span className={expired ? 'font-bold text-rose-600' : 'font-semibold'}>
                                                        {new Date(loan.due_at).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        })}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Action Button */}
                                            {isEbook && book?.slug ? (
                                                <Link
                                                    href={`/books/${book.slug}/read`}
                                                    className={`mt-4 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold text-white shadow-sm transition-all ${
                                                        expired
                                                            ? 'bg-amber-600 hover:bg-amber-700'
                                                            : 'bg-[#2699fb] hover:bg-[#1a83e0]'
                                                    }`}
                                                >
                                                    <BookOpen size={14} />
                                                    {expired
                                                        ? 'Buka Reader / Perpanjang'
                                                        : progress?.last_page
                                                        ? `Lanjut Baca (Hal. ${progress.last_page})`
                                                        : 'Mulai Baca E-Book Online'}
                                                    <ArrowRight size={14} />
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/books/${book?.slug || ''}`}
                                                    className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-slate-200 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                                                >
                                                    Detail Buku Fisik
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-800 dark:bg-[#121826]">
                            <BookOpen size={32} className="mx-auto text-slate-300 dark:text-slate-600" />
                            <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                Belum ada buku atau e-book yang sedang dipinjam
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                                Jelajahi katalog perpustakaan untuk membaca e-book atau meminjam buku fisik di sekolah.
                            </p>
                            <Link
                                href="/catalog"
                                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-[#152238] px-4 py-2 text-xs font-bold text-white hover:bg-[#0f172a] dark:bg-[#2699fb] dark:hover:bg-[#1a83e0]"
                            >
                                Buka Katalog Buku
                            </Link>
                        </div>
                    )}
                </div>

                {/* RECOMMENDATIONS */}
                {recommendations.length > 0 && (
                    <section>
                        <div className="flex items-end justify-between">
                            <div>
                                <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#2699fb]">
                                    Rekomendasi Pustakawan
                                </span>
                                <h2 className="mt-1 font-display text-xl font-bold text-[#0F172A] dark:text-white">
                                    Buku Pilihan Untukmu
                                </h2>
                            </div>
                            <Link href="/catalog" className="font-handwriting text-base font-bold text-[#FF8E4F] hover:underline">
                                Jelajahi semua →
                            </Link>
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">
                            {recommendations.map((book) => (
                                <BookCard key={book.id} book={book} hasClip={false} />
                            ))}
                        </div>
                    </section>
                )}

                {/* RESERVATIONS & HISTORY */}
                <div className="grid gap-8 lg:grid-cols-2">
                    {/* RESERVATIONS */}
                    <div>
                        <div className="flex items-center gap-2">
                            <BookMarked size={18} className="text-[#2699fb]" />
                            <h2 className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
                                Riwayat Reservasi ({reservations.length})
                            </h2>
                        </div>

                        {reservations.length > 0 ? (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#121826]">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="border-b border-slate-100 bg-slate-50/70 font-mono text-[10px] uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
                                            <tr>
                                                <th className="px-4 py-3">Kode</th>
                                                <th className="px-4 py-3">Judul Buku</th>
                                                <th className="px-4 py-3">Tanggal</th>
                                                <th className="px-4 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                                            {reservations.map((res) => (
                                                <tr key={res.id}>
                                                    <td className="px-4 py-3 font-mono font-bold text-[#152238] dark:text-blue-400">
                                                        {res.reservation_code}
                                                    </td>
                                                    <td className="px-4 py-3 font-semibold text-[#0F172A] dark:text-white line-clamp-1">
                                                        {res.book?.title ?? 'Buku'}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                        {new Date(res.created_at).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200 capitalize dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800">
                                                            {res.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-[#121826] dark:text-slate-400">
                                Belum ada riwayat reservasi buku.
                            </div>
                        )}
                    </div>

                    {/* LOAN HISTORY */}
                    <div>
                        <div className="flex items-center gap-2">
                            <Clock size={18} className="text-[#2699fb]" />
                            <h2 className="font-display text-lg font-bold text-[#0F172A] dark:text-white">
                                Riwayat Pengembalian ({loanHistory.length})
                            </h2>
                        </div>

                        {loanHistory.length > 0 ? (
                            <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-[#121826]">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-xs">
                                        <thead className="border-b border-slate-100 bg-slate-50/70 font-mono text-[10px] uppercase text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
                                            <tr>
                                                <th className="px-4 py-3">Judul Buku</th>
                                                <th className="px-4 py-3">Dipinjam</th>
                                                <th className="px-4 py-3">Dikembalikan</th>
                                                <th className="px-4 py-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100 text-slate-700 dark:divide-slate-800 dark:text-slate-300">
                                            {loanHistory.map((lh) => (
                                                <tr key={lh.id}>
                                                    <td className="px-4 py-3 font-semibold text-[#0F172A] dark:text-white line-clamp-1">
                                                        {lh.book_copy?.book?.title ?? 'Buku'}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                        {new Date(lh.borrowed_at).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-4 py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                                                        {lh.returned_at ? new Date(lh.returned_at).toLocaleDateString('id-ID') : '-'}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300 capitalize">
                                                            {lh.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-[#121826] dark:text-slate-400">
                                Belum ada riwayat pengembalian buku.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
