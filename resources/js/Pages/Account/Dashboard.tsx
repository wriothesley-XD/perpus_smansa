import { Head, Link, usePage } from '@inertiajs/react';
import {
    AlertCircle,
    Barcode,
    BookMarked,
    BookOpen,
    Calendar,
    CheckCircle2,
    Clock,
    User,
} from 'lucide-react';
import React from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Loan, Reservation } from '../../types/library';

interface DashboardProps {
    activeLoans: Loan[];
    loanHistory: Loan[];
    reservations: Reservation[];
}

export default function Dashboard({ activeLoans, loanHistory, reservations }: DashboardProps) {
    const { auth } = usePage().props;
    const user = auth?.user;

    return (
        <SiteShell>
            <Head title="Dashboard Anggota — Perpustakaan SMAN 1 Bukittinggi" />

            {/* User Header Profile */}
            <div className="border-b border-slate-200/80 bg-white py-10">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4">
                            <div className="grid size-16 place-items-center rounded-2xl bg-[#0B4EA2] text-xl font-bold text-white shadow-md">
                                {user?.name.charAt(0)}
                            </div>
                            <div>
                                <span className="rounded-md bg-[#EAF4FF] px-2 py-0.5 font-mono text-[10px] font-bold uppercase text-[#0B4EA2]">
                                    {user?.role === 'student' ? 'Siswa' : user?.role === 'teacher' ? 'Guru' : 'Anggota'}
                                </span>
                                <h1 className="mt-1 font-display text-2xl font-bold text-[#0F172A]">
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
                                className="rounded-xl bg-[#0B4EA2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#083c7d] transition-colors"
                            >
                                Cari Buku Lagi
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8 space-y-12">
                {/* ACTIVE LOANS */}
                <div>
                    <div className="flex items-center gap-2">
                        <BookOpen size={18} className="text-[#0B4EA2]" />
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
                        <BookMarked size={18} className="text-[#0B4EA2]" />
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
                                                <td className="px-5 py-3.5 font-mono font-bold text-[#0B4EA2]">
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
