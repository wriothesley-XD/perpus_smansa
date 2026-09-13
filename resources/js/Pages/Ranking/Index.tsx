import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Crown, Medal, Trophy, Users } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Book } from '../../types/library';

interface TopMember {
    id: number;
    initial_name: string;
    class: string;
    loans_count: number;
}

interface RankingProps {
    topBooks: (Book & { loan_count: number })[];
    topMembers: TopMember[];
    totalLoans: number;
    period: string;
}

const medal = (rank: number) => {
    if (rank === 1) return <Crown size={20} className="text-[#facc15]" />;
    if (rank === 2) return <Medal size={20} className="text-slate-400" />;
    if (rank === 3) return <Medal size={20} className="text-amber-600" />;
    return <span className="w-5 text-center text-sm font-bold text-slate-500">{rank}</span>;
};

export default function RankingIndex({ topBooks, topMembers, totalLoans, period }: RankingProps) {
    const periods = [{ key: 'all', label: 'Sepanjang masa' }, { key: 'semester', label: 'Semester ini' }, { key: 'month', label: 'Bulan ini' }, { key: 'week', label: 'Minggu ini' }];
    return (
        <SiteShell>
            <Head title="Ranking Koleksi - Perpustakaan SMAN 1 Bukittinggi" />

            <div className="bg-white dark:bg-slate-900 min-h-screen">
                {/* Header */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-[#123B5D] to-[#1d6fd6] px-6 py-16 text-white sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3">
                            <Trophy size={32} className="text-[#facc15]" />
                            <div>
                                <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Ranking Perpustakaan</h1>
                                <p className="mt-1 text-white/80">Buku paling sering dipinjam & anggota teraktif</p>
                            </div>
                        </div>
                        <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white/15 px-5 py-3">
                            <BookOpen size={20} />
                            <span className="font-bold">{totalLoans.toLocaleString('id-ID')} total peminjaman tercatat</span>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                            {periods.map((item) => <button key={item.key} type="button" onClick={() => router.get('/ranking', { period: item.key }, { preserveScroll: true })} className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${period === item.key ? 'bg-[#F8D77E] text-[#123B5D]' : 'bg-white/10 text-white hover:bg-white/20'}`}>{item.label}</button>)}
                        </div>
                    </div>
                </div>

                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                    <div className="grid gap-10 lg:grid-cols-2">
                        {/* Top Books */}
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-xl bg-[#E8F1F5] dark:bg-slate-800">
                                    <BookOpen size={20} className="text-[#123B5D] dark:text-blue-400" />
                                </span>
                                <div>
                                    <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Buku Terbanyak Dipinjam</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Berdasarkan total transaksi peminjaman</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {topBooks.length === 0 && (
                                    <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                                        Belum ada data peminjaman.
                                    </p>
                                )}
                                {topBooks.map((book, idx) => (
                                    <Link
                                        key={book.id}
                                        href={`/books/${book.slug}`}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:border-[#123B5D] dark:hover:border-blue-500 transition-all hover:-translate-y-0.5 hover:shadow-md"
                                    >
                                        <div className="flex w-8 items-center justify-center shrink-0">
                                            {medal(idx + 1)}
                                        </div>
                                        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden">
                                            {book.cover_image ? (
                                                <img src={book.cover_image} alt={book.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <BookOpen size={20} className="text-slate-400" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="truncate font-semibold text-[#0F172A] dark:text-white text-sm">{book.title}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">
                                                {book.authors?.map(a => a.name).join(', ') || '—'}
                                            </p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-lg font-extrabold text-[#123B5D] dark:text-blue-400">{book.loan_count ?? 0}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400">pinjaman</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Top Members */}
                        <div>
                            <div className="mb-6 flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-xl bg-[#fef9c3] dark:bg-slate-800">
                                    <Users size={20} className="text-amber-600 dark:text-yellow-400" />
                                </span>
                                <div>
                                    <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Anggota Teraktif</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">Nama dianonimkan untuk privasi</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {topMembers.length === 0 && (
                                    <p className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500">
                                        Belum ada data anggota.
                                    </p>
                                )}
                                {topMembers.map((member, idx) => (
                                    <div
                                        key={member.id}
                                        className="flex items-center gap-4 rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4"
                                    >
                                        <div className="flex w-8 items-center justify-center shrink-0">
                                            {medal(idx + 1)}
                                        </div>
                                        <div className="grid size-10 shrink-0 place-items-center rounded-full bg-[#123B5D] text-white font-bold text-sm">
                                            {member.initial_name}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-[#0F172A] dark:text-white text-sm">{member.initial_name}</p>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">Kelas {member.class}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-lg font-extrabold text-amber-600 dark:text-yellow-400">{member.loans_count}</p>
                                            <p className="text-[10px] uppercase tracking-wider text-slate-400">pinjaman</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
