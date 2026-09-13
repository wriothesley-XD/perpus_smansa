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
    Sparkles,
    User,
} from 'lucide-react';
import React from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book, Loan, Reservation } from '../../types/library';
import { BookCard } from '../../Components/Common/BookCard';

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
}

export default function Dashboard({ activeLoans, loanHistory, reservations, passport, recommendations }: DashboardProps) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const stamps = [
        { label: 'First Borrow', unlocked: passport.total_reads >= 1 },
        { label: 'Genre Hopper', unlocked: passport.total_reads >= 5 },
        { label: 'Steady Reader', unlocked: passport.streak >= 3 },
    ];

    return (
        <SiteShell>
            <Head title="Dashboard Anggota — Perpustakaan SMAN 1 Bukittinggi" />

            {/* User Header Profile */}
            <div className="paper-grain border-b border-slate-200/80 bg-white py-10 dark:border-slate-700 dark:bg-[#102136]">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid size-16 place-items-center rounded-2xl bg-[#123B5D] text-xl font-bold text-white shadow-md">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <span className="rounded-md bg-[#E8F1F5] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#123B5D]">
                                    {user?.role === 'student' ? 'Siswa' : user?.role === 'teacher' ? 'Guru' : 'Anggota'}
                                </span>
                                    <h1 className="mt-1 font-display text-2xl font-bold text-[#0F172A] dark:text-white">
                                    {user?.name}
                                </h1>
                                <p className="text-xs text-slate-500 font-medium">
                                    {user?.identifier_number || 'NIS / NIP belum diisi'} • {user?.class_name || 'Umum'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href="/catalog"
                                className="rounded-xl bg-[#123B5D] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#0C2D47] transition-colors"
                            >
                                Cari Buku Lagi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12">
                {/* READING PASSPORT */}
                <section className="relative overflow-hidden rounded-2xl bg-[#123B5D] p-6 text-white shadow-xl sm:p-8">
                    <div className="absolute -right-12 -top-12 size-40 rounded-full border border-white/20" />
                    <div className="relative grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
                        <div>
                            <div className="flex items-center gap-2 text-blue-200"><Sparkles size={16} /><span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em]">Reading Passport</span></div>
                            <h2 className="mt-3 font-display text-3xl font-bold">Perjalanan bacamu punya cerita.</h2>
                            <p className="mt-2 max-w-xl text-sm leading-relaxed text-blue-100">Simpan jejak bacaan, temukan rekomendasi berikutnya, dan bawa identitas literasimu ke mana pun di lingkungan SMANSA.</p>
                            <div className="mt-6 flex flex-wrap gap-2">{stamps.map((stamp) => <span key={stamp.label} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${stamp.unlocked ? 'bg-[#F8D77E] text-[#123B5D]' : 'border border-white/20 text-blue-100/55'}`}><span className={`size-1.5 rounded-full ${stamp.unlocked ? 'bg-[#E37C5B]' : 'bg-white/25'}`} />{stamp.label}{!stamp.unlocked && ' · terkunci'}</span>)}</div>
                        </div>
                        <div className="relative rotate-[2deg] rounded-sm bg-[#fffdf7] p-5 text-[#0F172A] shadow-xl">
                            <div className="flex items-start justify-between"><div><span className="font-mono-display text-[9px] font-bold uppercase tracking-widest text-[#123B5D]">Digital Library Card</span><h3 className="mt-2 font-display text-lg font-bold">{user?.name}</h3><p className="text-[10px] text-slate-500">{user?.class_name || 'Warga SMANSA'} • {passport.member_since || '2026'}</p></div><Barcode size={28} className="text-[#123B5D]" /></div>
                            <div className="mt-6 flex items-end justify-between border-t border-dashed border-slate-300 pt-3"><span className="font-mono text-[10px] font-bold tracking-wider">{passport.member_code}</span><span className="font-handwriting text-sm font-bold text-[#2C3E50]">read. grow. share.</span></div>
                        </div>
                    </div>
                    <div className="relative mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-5"><div><strong className="block font-display text-2xl">{passport.total_reads}</strong><span className="text-[10px] text-blue-200">Buku selesai</span></div><div><strong className="block font-display text-2xl">{passport.active_reads}</strong><span className="text-[10px] text-blue-200">Sedang dibaca</span></div><div><strong className="flex items-center gap-1 font-display text-2xl"><Flame size={18} className="text-[#F8D77E]" />{passport.streak}</strong><span className="text-[10px] text-blue-200">Hari streak</span></div></div>
                </section>

                {recommendations.length > 0 && <section><div className="flex items-end justify-between"><div><span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#123B5D]">Untuk perjalananmu</span><h2 className="mt-2 font-display text-xl font-bold text-[#0F172A] dark:text-white">Bacaan berikutnya</h2></div><Link href="/catalog" className="font-handwriting text-sm font-bold">Jelajahi semua →</Link></div><div className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-3">{recommendations.map((book) => <BookCard key={book.id} book={book} hasClip={false} />)}</div></section>}

                {/* ACTIVE LOANS */}
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-[#123B5D]" />
                        <h2 className="font-display text-xl font-bold text-[#0F172A]">
                            Peminjaman Aktif ({activeLoans.length})
                        </h2>
                    </div>

                    {activeLoans.length > 0 ? (
                        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {activeLoans.map((loan) => (
                                <div
                                    key={loan.id}
                                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                                >
                                    <div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-mono text-[10px] text-slate-400">
                                                {loan.loan_code}
                                            </span>
                                            <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                                                Aktif
                                            </span>
                                        </div>
                                        <h3 className="mt-2 font-display text-base font-bold text-[#0F172A]">
                                            {loan.book_copy?.book?.title ?? 'Judul Buku'}
                                        </h3>
                                        <p className="mt-1 flex items-center gap-1.5 font-mono text-xs text-slate-500">
                                            <Barcode size={14} />
                                            <span>{loan.book_copy?.barcode_identifier}</span>
                                        </p>
                                    </div>

                                    <div className="mt-6 border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-1">
                                        <div className="flex items-center justify-between">
                                            <span>Tanggal Pinjam:</span>
                                            <span>{new Date(loan.borrowed_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                        <div className="flex items-center justify-between font-semibold text-rose-700">
                                            <span>Batas Kembali:</span>
                                            <span>{new Date(loan.due_at).toLocaleDateString('id-ID')}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
                            Tidak ada peminjaman aktif saat ini. Telusuri katalog untuk meminjam buku.
                        </div>
                    )}
                </div>

                {/* RESERVATIONS */}
                <div>
                    <div className="flex items-center gap-2">
                        <BookMarked size={18} className="text-[#123B5D]" />
                        <h2 className="font-display text-xl font-bold text-[#0F172A]">
                            Riwayat Reservasi ({reservations.length})
                        </h2>
                    </div>

                    {reservations.length > 0 ? (
                        <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left text-xs">
                                    <thead className="border-b border-slate-100 bg-slate-50/70 font-mono text-[10px] uppercase text-slate-500">
                                        <tr>
                                            <th className="px-5 py-3">Kode Reservasi</th>
                                            <th className="px-5 py-3">Judul Buku</th>
                                            <th className="px-5 py-3">Tanggal Pengajuan</th>
                                            <th className="px-5 py-3">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-slate-700">
                                        {reservations.map((res) => (
                                            <tr key={res.id}>
                                                <td className="px-5 py-3.5 font-mono font-bold text-[#123B5D]">
                                                    {res.reservation_code}
                                                </td>
                                                <td className="px-5 py-3.5 font-semibold text-[#0F172A]">
                                                    {res.book?.title ?? 'Buku'}
                                                </td>
                                                <td className="px-5 py-3.5 text-slate-500">
                                                    {new Date(res.created_at).toLocaleDateString('id-ID')}
                                                </td>
                                                <td className="px-5 py-3.5">
                                                    <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 border border-amber-200 capitalize">
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
                        <div className="mt-4 rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-xs text-slate-500">
                            Belum ada riwayat reservasi buku.
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
