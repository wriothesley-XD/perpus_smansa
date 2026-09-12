import { Head, Link, router } from '@inertiajs/react';
import { BookHeart, FileText, GraduationCap, Pen, Users } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { SmansaWork } from '../../types/library';

interface SmansaWorkIndexProps {
    works: SmansaWork[];
    categories: string[];
    filters: { category?: string; type?: string };
}

const categoryLabel: Record<string, string> = {
    cerpen: 'Cerpen', puisi: 'Puisi', esai: 'Esai',
    karya_ilmiah: 'Karya Ilmiah', novel: 'Novel',
};
const categoryColor: Record<string, string> = {
    cerpen: 'bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300',
    puisi: 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300',
    esai: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300',
    karya_ilmiah: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300',
    novel: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function SmansaWorkIndex({ works, categories, filters }: SmansaWorkIndexProps) {
    const setFilter = (key: string, value: string | null) => {
        router.get('/karya-smansa', { ...filters, [key]: value ?? undefined }, { preserveScroll: true });
    };

    return (
        <SiteShell>
            <Head title="Karya Smansa - Perpustakaan SMAN 1 Bukittinggi" />
            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Hero */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-gradient-to-br from-rose-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 px-6 py-14 sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3">
                            <BookHeart size={32} className="text-rose-500" />
                            <div>
                                <h1 className="font-display text-3xl font-extrabold text-[#0F172A] dark:text-white sm:text-4xl">
                                    Karya Smansa
                                </h1>
                                <p className="mt-1 text-slate-500 dark:text-slate-400">
                                    Cerpen, puisi, esai, dan karya ilmiah dari guru & siswa SMAN 1 Bukittinggi
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 sm:px-8">
                    <div className="mx-auto flex max-w-7xl flex-wrap gap-2 py-4">
                        {/* Category filter */}
                        <button onClick={() => setFilter('category', null)}
                            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${!filters.category ? 'bg-[#0B4EA2] text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                            Semua Kategori
                        </button>
                        {categories.map(cat => (
                            <button key={cat} onClick={() => setFilter('category', cat)}
                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filters.category === cat ? 'bg-[#0B4EA2] text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                                {categoryLabel[cat] ?? cat}
                            </button>
                        ))}
                        <div className="mx-2 my-1 w-px bg-slate-200 dark:bg-slate-700" />
                        {/* Author type filter */}
                        <button onClick={() => setFilter('type', null)}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${!filters.type ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                            <Users size={14} /> Semua
                        </button>
                        <button onClick={() => setFilter('type', 'student')}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filters.type === 'student' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                            <GraduationCap size={14} /> Siswa
                        </button>
                        <button onClick={() => setFilter('type', 'teacher')}
                            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${filters.type === 'teacher' ? 'bg-purple-600 text-white' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                            <Pen size={14} /> Guru
                        </button>
                    </div>
                </div>

                {/* Works Grid */}
                <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
                    {works.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-16 text-center">
                            <FileText size={40} className="mx-auto text-slate-300 dark:text-slate-600" />
                            <p className="mt-4 font-display text-lg font-bold text-slate-600 dark:text-slate-400">Belum ada karya pada filter ini</p>
                        </div>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {works.map((work) => (
                                <Link key={work.id} href={`/karya-smansa/${work.slug}`}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                                    {/* Cover */}
                                    <div className="aspect-video overflow-hidden bg-gradient-to-br from-rose-50 to-purple-100 dark:from-slate-700 dark:to-slate-600">
                                        {work.cover_image ? (
                                            <img src={work.cover_image} alt={work.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="grid h-full place-items-center">
                                                <BookHeart size={40} className="text-rose-300 dark:text-rose-600" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-5">
                                        <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider w-fit ${categoryColor[work.category] ?? 'bg-slate-100 text-slate-600'}`}>
                                            {work.category_label ?? categoryLabel[work.category] ?? work.category}
                                        </span>
                                        <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0F172A] dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors line-clamp-2">
                                            {work.title}
                                        </h3>
                                        <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                                            <div className="flex items-center gap-1.5">
                                                {work.author_type === 'student' ? <GraduationCap size={13} /> : <Pen size={13} />}
                                                <span className="font-medium">{work.author_name}</span>
                                                {work.author_class && <span>• {work.author_class}</span>}
                                            </div>
                                            {work.attachment_path && (
                                                <span className="rounded-md bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 text-[9px] font-bold text-emerald-700 dark:text-emerald-400">PDF</span>
                                            )}
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
