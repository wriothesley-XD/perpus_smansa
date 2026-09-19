import { Head, Link, router } from '@inertiajs/react';
import { BookHeart, FileText, GraduationCap, Pen, Sparkles, Users } from 'lucide-react';
import { BrushUnderline, SparkleFourPoint } from '../../Components/Common/Ornaments';
import { SiteShell } from '../../Components/Common/SiteShell';
import { SmansaWork } from '../../types/library';

interface SmansaWorkIndexProps {
    works: SmansaWork[];
    categories: string[];
    filters: { category?: string; type?: string };
}

const categoryLabel: Record<string, string> = {
    cerpen: 'Cerpen',
    puisi: 'Puisi',
    esai: 'Esai',
    karya_ilmiah: 'Karya Ilmiah',
    novel: 'Novel',
};

export default function SmansaWorkIndex({ works, categories, filters }: SmansaWorkIndexProps) {
    const setFilter = (key: string, value: string | null) => {
        router.get('/karya-smansa', { ...filters, [key]: value ?? undefined }, { preserveScroll: true });
    };

    return (
        <SiteShell>
            <Head title="Karya Smansa - Perpustakaan SMAN 1 Bukittinggi" />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                {/* Hero Header */}
                <div className="relative border-b border-slate-200/80 bg-slate-50/40 px-6 py-16 sm:px-8 overflow-hidden dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Sparkles size={14} />
                                    <span>Pojok Literasi & Publikasi Civitas</span>
                                </div>

                                <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] dark:text-white">
                                    Karya Civitas{' '}
                                    <span className="relative inline-block text-[#152238] dark:text-white">
                                        SMANSA
                                        <span className="absolute -bottom-2 left-0 right-0 w-full">
                                            <BrushUnderline />
                                        </span>
                                    </span>
                                </h1>
                                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-600 dark:text-slate-300">
                                    Kumpulan cerpen, puisi, esai reflektif, dan karya ilmiah persembahan orisinal guru & siswa SMAN 1 Bukittinggi.
                                </p>
                            </div>

                            <Link
                                href="/contact?subject=Kirim%20Karya%20SMANSA"
                                className="inline-flex items-center gap-2 rounded-full bg-[#152238] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#0f172a] dark:bg-slate-800 dark:hover:bg-slate-700 self-start sm:self-auto"
                            >
                                <span>Kirim Karya Tulisan</span>
                                <span>↗</span>
                            </Link>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -bottom-4 right-16 hidden lg:block opacity-30">
                        <SparkleFourPoint size={40} color="#2699fb" />
                    </div>
                </div>

                {/* Filter bar */}
                <div className="sticky top-16 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-6 sm:px-8 dark:border-slate-800 dark:bg-[#090d16]/95">
                    <div className="mx-auto flex max-w-7xl items-center gap-2 py-3.5 overflow-x-auto">
                        {/* Category filter */}
                        <button
                            type="button"
                            onClick={() => setFilter('category', null)}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                !filters.category
                                    ? 'bg-[#152238] text-white shadow-2xs dark:bg-[#2699fb] dark:text-white'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            Semua Kategori
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter('category', cat)}
                                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                    filters.category === cat
                                        ? 'bg-[#152238] text-white shadow-2xs dark:bg-[#2699fb] dark:text-white'
                                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                                }`}
                            >
                                {categoryLabel[cat] ?? cat}
                            </button>
                        ))}

                        <div className="mx-2 hidden h-5 w-px bg-slate-200 sm:block dark:bg-slate-800" />

                        {/* Author type filter */}
                        <button
                            type="button"
                            onClick={() => setFilter('type', null)}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                !filters.type
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            <Users size={13} />
                            <span>Semua Penulis</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('type', 'student')}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                filters.type === 'student'
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            <GraduationCap size={13} />
                            <span>Siswa</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('type', 'teacher')}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shrink-0 ${
                                filters.type === 'teacher'
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-slate-700'
                            }`}
                        >
                            <Pen size={13} />
                            <span>Guru</span>
                        </button>
                    </div>
                </div>

                {/* Works Grid */}
                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                    {works.length === 0 ? (
                        <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center dark:border-slate-800">
                            <FileText size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
                            <p className="mt-4 font-display text-base font-bold text-slate-700 dark:text-slate-300">
                                Belum ada karya pada filter ini
                            </p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                Pilih kategori lain atau kirimkan tulisan pertamamu.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {works.map((work) => (
                                <Link
                                    key={work.id}
                                    href={`/karya-smansa/${work.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2699fb]/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-[#2699fb]/50"
                                >
                                    {/* Cover */}
                                    <div className="aspect-[16/9] overflow-hidden bg-slate-100 dark:bg-slate-800">
                                        {work.cover_image ? (
                                            <img
                                                src={work.cover_image}
                                                alt={work.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="grid h-full place-items-center bg-blue-50/40 dark:bg-blue-950/30">
                                                <BookHeart size={36} className="text-[#2699fb]/40 dark:text-sky-400/40" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                                {work.category_label ?? categoryLabel[work.category] ?? work.category}
                                            </span>
                                            {work.attachment_path && (
                                                <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[9px] font-bold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                    PDF
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0F172A] dark:text-white transition-colors group-hover:text-[#2699fb] dark:group-hover:text-[#38bdf8] line-clamp-2">
                                            {work.title}
                                        </h3>

                                        <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                {work.author_type === 'student' ? (
                                                    <GraduationCap size={13} className="text-[#2699fb]" />
                                                ) : (
                                                    <Pen size={13} className="text-[#FF8E4F]" />
                                                )}
                                                <span className="font-semibold text-slate-700 dark:text-slate-200">{work.author_name}</span>
                                                {work.author_class && <span className="text-slate-400 dark:text-slate-500">• {work.author_class}</span>}
                                            </div>
                                            <span className="font-bold text-[#2699fb] group-hover:translate-x-0.5 transition-transform">
                                                Baca →
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
