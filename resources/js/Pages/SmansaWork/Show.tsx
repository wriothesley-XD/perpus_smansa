import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookHeart, Download, GraduationCap, Pen } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { SmansaWork } from '../../types/library';

interface SmansaWorkShowProps {
    work: SmansaWork;
    related: SmansaWork[];
}

const categoryLabel: Record<string, string> = {
    cerpen: 'Cerpen',
    puisi: 'Puisi',
    esai: 'Esai',
    karya_ilmiah: 'Karya Ilmiah',
    novel: 'Novel',
};

export default function SmansaWorkShow({ work, related }: SmansaWorkShowProps) {
    return (
        <SiteShell>
            <Head title={`${work.title} - Karya Civitas SMANSA`} />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                {/* Top Nav */}
                <div className="border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5 sm:px-8">
                        <Link
                            href="/karya-smansa"
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#152238] dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Kembali ke Karya Civitas</span>
                        </Link>

                        {work.attachment_path && (
                            <a
                                href={`/storage/${work.attachment_path}`}
                                download
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#152238] px-4 py-1.5 text-xs font-bold text-white shadow-2xs hover:bg-[#0f172a] dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
                            >
                                <Download size={13} />
                                <span>Unduh PDF</span>
                            </a>
                        )}
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
                    {/* Header */}
                    <div>
                        <span className="inline-block rounded-full bg-blue-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                            {work.category_label ?? categoryLabel[work.category] ?? work.category}
                        </span>

                        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] text-[#0F172A] dark:text-white">
                            {work.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
                            <div className="flex items-center gap-3">
                                <span className="grid size-10 place-items-center rounded-full bg-slate-100 text-[#152238] dark:bg-slate-800 dark:text-slate-200">
                                    {work.author_type === 'student' ? (
                                        <GraduationCap size={18} className="text-[#2699fb]" />
                                    ) : (
                                        <Pen size={18} className="text-[#FF8E4F]" />
                                    )}
                                </span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <p className="text-sm font-bold text-[#0F172A] dark:text-white">{work.author_name}</p>
                                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                            work.author_type === 'student'
                                                ? 'bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300'
                                                : 'bg-amber-50 text-[#FF8E4F] dark:bg-amber-950/60 dark:text-amber-300'
                                        }`}>
                                            {work.author_type === 'student' ? 'Siswa' : 'Guru'}
                                        </span>
                                    </div>
                                    {work.author_class && (
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{work.author_class}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cover */}
                    {work.cover_image && (
                        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm dark:border-slate-800">
                            <img src={work.cover_image} alt={work.title} className="w-full max-h-80 object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <article className="mt-10 leading-relaxed">
                        <div className="whitespace-pre-line text-base sm:text-lg leading-[2] text-[#1E293B] dark:text-slate-200">
                            {work.content}
                        </div>
                    </article>

                    {/* Related Works */}
                    {related.length > 0 && (
                        <div className="mt-20 border-t border-slate-200/80 pt-12 dark:border-slate-800">
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="font-mono-display text-xs font-bold uppercase tracking-wider text-[#2699fb]">
                                        EXPLORE
                                    </span>
                                    <h2 className="mt-1 font-display text-xl sm:text-2xl font-bold text-[#0F172A] dark:text-white">
                                        Karya Sejenis Lainnya
                                    </h2>
                                </div>
                                <Link
                                    href="/karya-smansa"
                                    className="text-xs font-bold text-[#2699fb] hover:underline"
                                >
                                    Lihat Semua →
                                </Link>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                {related.map((r) => (
                                    <Link
                                        key={r.id}
                                        href={`/karya-smansa/${r.slug}`}
                                        className="group rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#2699fb]/40 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-[#2699fb]/50"
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2699fb]">
                                            {categoryLabel[r.category] ?? r.category}
                                        </span>
                                        <h3 className="mt-2 font-display text-sm font-bold leading-snug text-[#0F172A] dark:text-white group-hover:text-[#2699fb] dark:group-hover:text-[#38bdf8] line-clamp-2 transition-colors">
                                            {r.title}
                                        </h3>
                                        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">{r.author_name}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
