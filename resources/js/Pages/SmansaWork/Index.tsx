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

            <div className="min-h-screen bg-white">
                {/* Hero Header */}
                <div className="relative border-b border-slate-200/80 bg-slate-50/40 px-6 py-16 sm:px-8 overflow-hidden">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1 text-xs font-semibold text-[#2699fb]">
                                    <Sparkles size={14} />
                                    <span>Pojok Literasi & Publikasi Civitas</span>
                                </div>

                                <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                                    Karya Civitas{' '}
                                    <span className="relative inline-block text-[#152238]">
                                        SMANSA
                                        <span className="absolute -bottom-2 left-0 right-0 w-full">
                                            <BrushUnderline />
                                        </span>
                                    </span>
                                </h1>
                                <p className="mt-4 max-w-xl text-sm sm:text-base text-slate-600">
                                    Kumpulan cerpen, puisi, esai reflektif, dan karya ilmiah persembahan orisinal guru & siswa SMAN 1 Bukittinggi.
                                </p>
                            </div>

                            <Link
                                href="/contact?subject=Kirim%20Karya%20SMANSA"
                                className="inline-flex items-center gap-2 rounded-full bg-[#152238] px-6 py-3 text-xs font-bold text-white shadow-xs transition hover:bg-[#0f172a] self-start sm:self-auto"
                            >
                                <span>Kirim Karya Tulisan</span>
                                <span>↗</span>
                            </Link>
                        </div>
                    </div>

                    <div className="pointer-events-none absolute -bottom-4 right-12 hidden lg:block opacity-40">
                        <SparkleFourPoint size={40} color="#FF8E4F" />
                    </div>
                </div>

                {/* Filters */}
                <div className="sticky top-16 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-6 sm:px-8">
                    <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 py-3.5">
                        {/* Category filter */}
                        <button
                            type="button"
                            onClick={() => setFilter('category', null)}
                            className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                                !filters.category
                                    ? 'bg-[#152238] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                        >
                            Semua Kategori
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setFilter('category', cat)}
                                className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                                    filters.category === cat
                                        ? 'bg-[#152238] text-white shadow-2xs'
                                        : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                                }`}
                            >
                                {categoryLabel[cat] ?? cat}
                            </button>
                        ))}

                        <div className="mx-2 hidden h-5 w-px bg-slate-200 sm:block" />

                        {/* Author type filter */}
                        <button
                            type="button"
                            onClick={() => setFilter('type', null)}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                                !filters.type
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                        >
                            <Users size={13} />
                            <span>Semua Penulis</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('type', 'student')}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                                filters.type === 'student'
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                            }`}
                        >
                            <GraduationCap size={13} />
                            <span>Siswa</span>
                        </button>
                        <button
                            type="button"
                            onClick={() => setFilter('type', 'teacher')}
                            className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all ${
                                filters.type === 'teacher'
                                    ? 'bg-[#2699fb] text-white shadow-2xs'
                                    : 'border border-slate-200 bg-white text-slate-600 hover:border-slate-300'
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
                        <div className="rounded-3xl border border-dashed border-slate-200 p-16 text-center">
                            <FileText size={40} className="mx-auto text-slate-300" />
                            <p className="mt-4 font-display text-base font-bold text-slate-700">
                                Belum ada karya pada filter ini
                            </p>
                            <p className="mt-1 text-xs text-slate-500">
                                Pilih kategori lain atau kirimkan tulisan pertamamu.
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {works.map((work) => (
                                <Link
                                    key={work.id}
                                    href={`/karya-smansa/${work.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#2699fb]/40 hover:shadow-md"
                                >
                                    {/* Cover */}
                                    <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                                        {work.cover_image ? (
                                            <img
                                                src={work.cover_image}
                                                alt={work.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="grid h-full place-items-center bg-blue-50/40">
                                                <BookHeart size={36} className="text-[#2699fb]/40" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-1 flex-col p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2699fb]">
                                                {work.category_label ?? categoryLabel[work.category] ?? work.category}
                                            </span>
                                            {work.attachment_path && (
                                                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
                                                    PDF
                                                </span>
                                            )}
                                        </div>

                                        <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0F172A] transition-colors group-hover:text-[#2699fb] line-clamp-2">
                                            {work.title}
                                        </h3>

                                        <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                {work.author_type === 'student' ? (
                                                    <GraduationCap size={13} className="text-[#2699fb]" />
                                                ) : (
                                                    <Pen size={13} className="text-[#FF8E4F]" />
                                                )}
                                                <span className="font-semibold text-slate-700">{work.author_name}</span>
                                                {work.author_class && <span className="text-slate-400">• {work.author_class}</span>}
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
