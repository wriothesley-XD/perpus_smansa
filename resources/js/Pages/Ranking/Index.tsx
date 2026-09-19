import { Head, Link, router } from '@inertiajs/react';
import { BookOpen, Crown, Medal, Sparkles, Trophy, Users } from 'lucide-react';
import { BrushUnderline, SparkleFourPoint } from '../../Components/Common/Ornaments';
import { SiteShell } from '../../Components/Common/SiteShell';
import { AnimatedNumber } from '../../Components/Common/AnimatedNumber';
import { ScrollReveal } from '../../Components/Common/ScrollReveal';
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
    if (rank === 1) return <Crown size={22} className="text-[#FFC533]" />;
    if (rank === 2) return <Medal size={20} className="text-slate-400" />;
    if (rank === 3) return <Medal size={20} className="text-[#FF8E4F]" />;
    return <span className="w-6 text-center text-xs font-bold text-slate-400 dark:text-slate-500">#{rank}</span>;
};

export default function RankingIndex({ topBooks, topMembers, totalLoans, period }: RankingProps) {
    const periods = [
        { key: 'all', label: 'Sepanjang Masa' },
        { key: 'semester', label: 'Semester Ini' },
        { key: 'month', label: 'Bulan Ini' },
        { key: 'week', label: 'Minggu Ini' },
    ];

    return (
        <SiteShell>
            <Head title="Papan Peringkat & Koleksi Favorit - Perpustakaan SMAN 1 Bukittinggi" />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                {/* Hero Header */}
                <div className="relative border-b border-slate-200/80 bg-slate-50/50 px-6 py-16 sm:px-8 overflow-hidden dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                            <ScrollReveal immediate>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Sparkles size={14} />
                                    <span>Leaderboard & Rekap Sirkulasi</span>
                                </div>

                                <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                    Papan Peringkat{' '}
                                    <span className="relative inline-block text-[#152238] dark:text-white">
                                        Membaca
                                        <span className="absolute -bottom-2 left-0 right-0 w-full">
                                            <BrushUnderline />
                                        </span>
                                    </span>
                                </h1>
                                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
                                    Apresiasi kepada pembaca paling aktif dan daftar judul buku paling digemari oleh warga SMAN 1 Bukittinggi.
                                </p>
                            </ScrollReveal>

                            <ScrollReveal immediate delay={150} className="sm:self-center">
                                <div className="flex flex-col gap-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900/80">
                                    <div className="flex items-center gap-3">
                                        <span className="reveal-scale grid size-11 place-items-center rounded-2xl bg-[#FFC533]/20 text-[#152238] dark:bg-amber-950/50 dark:text-amber-300">
                                            <Trophy size={22} className="text-[#FF8E4F]" />
                                        </span>
                                        <div>
                                            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Transaksi</p>
                                            <p className="reveal-scale font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                                                <AnimatedNumber value={totalLoans} />
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Peminjaman buku fisik & digital terdata</span>
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -bottom-4 right-20 hidden lg:block opacity-30">
                        <SparkleFourPoint size={44} color="#FFC533" />
                    </div>
                </div>

                {/* Period Filter Tabs */}
                <div className="sticky top-16 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-6 sm:px-8 dark:border-slate-800 dark:bg-[#090d16]/95">
                    <div className="mx-auto flex max-w-7xl items-center gap-2 py-3.5 overflow-x-auto">
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mr-2 shrink-0">Periode:</span>
                        {periods.map((item) => (
                            <button
                                key={item.key}
                                type="button"
                                onClick={() => router.get('/ranking', { period: item.key }, { preserveScroll: true })}
                                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                    period === item.key
                                        ? 'bg-[#152238] text-white shadow-2xs dark:bg-[#2699fb] dark:text-white'
                                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                    <div className="grid gap-12 lg:grid-cols-2">
                        
                        {/* Top Books Column */}
                        <div>
                            <ScrollReveal className="mb-6 flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-2xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <BookOpen size={20} />
                                </span>
                                <div>
                                    <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Buku Paling Populer</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Judul dengan frekuensi peminjaman tertinggi</p>
                                </div>
                            </ScrollReveal>

                            <div className="space-y-3">
                                {topBooks.length === 0 ? (
                                    <p className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                        Belum ada data peminjaman buku pada periode ini.
                                    </p>
                                ) : (
                                    topBooks.map((book, idx) => (
                                        <ScrollReveal key={book.id} delay={idx * 60}>
                                            <Link
                                                href={`/books/${book.slug}`}
                                                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs transition-all hover:-translate-y-0.5 hover:border-[#2699fb]/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-[#2699fb]/50"
                                            >
                                                <div className="flex w-7 items-center justify-center shrink-0">
                                                    {medal(idx + 1)}
                                                </div>

                                                <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 overflow-hidden border border-slate-200/60 dark:bg-slate-800 dark:border-slate-700">
                                                    {book.cover_image ? (
                                                        <img
                                                            src={book.cover_image}
                                                            alt={book.title}
                                                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                                        />
                                                    ) : (
                                                        <BookOpen size={20} className="text-slate-400" />
                                                    )}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="truncate font-display text-sm font-bold text-[#0F172A] group-hover:text-[#2699fb] dark:text-white dark:group-hover:text-[#38bdf8] transition-colors">
                                                        {book.title}
                                                    </p>
                                                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                                                        {book.authors?.map((a) => a.name).join(', ') || 'Anonim'}
                                                    </p>
                                                </div>

                                                <div className="shrink-0 text-right pr-2">
                                                    <p className="reveal-scale font-display text-base font-extrabold text-[#2699fb] dark:text-[#38bdf8]">
                                                        <AnimatedNumber value={book.loan_count ?? 0} />
                                                    </p>
                                                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">kali dipinjam</p>
                                                </div>
                                            </Link>
                                        </ScrollReveal>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Top Members Column */}
                        <div>
                            <ScrollReveal className="mb-6 flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-2xl bg-amber-50 text-[#FF8E4F] dark:bg-amber-950/60 dark:text-amber-300">
                                    <Users size={20} />
                                </span>
                                <div>
                                    <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Pembaca Paling Aktif</h2>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Siswa dengan jumlah peminjaman terbanyak</p>
                                </div>
                            </ScrollReveal>

                            <div className="space-y-3">
                                {topMembers.length === 0 ? (
                                    <p className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                                        Belum ada data anggota pada periode ini.
                                    </p>
                                ) : (
                                    topMembers.map((member, idx) => (
                                        <ScrollReveal key={member.id} delay={idx * 60}>
                                            <div
                                                className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-3.5 shadow-2xs transition-all hover:shadow-xs dark:border-slate-800 dark:bg-slate-900/60"
                                            >
                                                <div className="flex w-7 items-center justify-center shrink-0">
                                                    {medal(idx + 1)}
                                                </div>

                                                <div className="grid size-11 shrink-0 place-items-center rounded-full bg-slate-100 text-[#152238] font-bold text-xs border border-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700">
                                                    {member.initial_name.substring(0, 2).toUpperCase()}
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <p className="font-display text-sm font-bold text-[#0F172A] dark:text-white">
                                                        {member.initial_name}
                                                    </p>
                                                    <p className="text-xs text-slate-500 dark:text-slate-400">Kelas {member.class}</p>
                                                </div>

                                                <div className="shrink-0 text-right pr-2">
                                                    <p className="reveal-scale font-display text-base font-extrabold text-[#FF8E4F] dark:text-amber-400">
                                                        <AnimatedNumber value={member.loans_count} />
                                                    </p>
                                                    <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">buku dibaca</p>
                                                </div>
                                            </div>
                                        </ScrollReveal>
                                    ))
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
