import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookHeart, Download, GraduationCap, Pen } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { SmansaWork } from '../../types/library';

interface SmansaWorkShowProps {
    work: SmansaWork;
    related: SmansaWork[];
}

const categoryLabel: Record<string, string> = {
    cerpen: 'Cerpen', puisi: 'Puisi', esai: 'Esai',
    karya_ilmiah: 'Karya Ilmiah', novel: 'Novel',
};

export default function SmansaWorkShow({ work, related }: SmansaWorkShowProps) {
    return (
        <SiteShell>
            <Head title={`${work.title} - Karya Smansa`} />
            <div className="min-h-screen bg-white dark:bg-slate-900">
                <div className="mx-auto max-w-3xl px-6 py-10 sm:px-8">
                    <Link href="/karya-smansa" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B4EA2] dark:text-blue-400 hover:gap-3 transition-all">
                        <ArrowLeft size={16} /> Semua Karya
                    </Link>

                    <div className="mt-6">
                        <span className="inline-block rounded-lg bg-rose-100 dark:bg-rose-900/40 px-3 py-1 text-xs font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300">
                            {work.category_label ?? categoryLabel[work.category] ?? work.category}
                        </span>
                        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-[#0F172A] dark:text-white sm:text-4xl">
                            {work.title}
                        </h1>

                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                {work.author_type === 'student' ? <GraduationCap size={16} className="text-purple-500" /> : <Pen size={16} className="text-amber-500" />}
                                <span className="font-semibold text-[#0F172A] dark:text-white">{work.author_name}</span>
                                {work.author_class && <span className="text-slate-400">• {work.author_class}</span>}
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${work.author_type === 'student' ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300'}`}>
                                    {work.author_type === 'student' ? 'Siswa' : 'Guru'}
                                </span>
                            </div>
                            {work.attachment_path && (
                                <a href={`/storage/${work.attachment_path}`} download
                                    className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700 transition-colors">
                                    <Download size={16} /> Download PDF
                                </a>
                            )}
                        </div>
                    </div>

                    {work.cover_image && (
                        <div className="mt-8 overflow-hidden rounded-2xl">
                            <img src={work.cover_image} alt={work.title} className="w-full max-h-64 object-cover" />
                        </div>
                    )}

                    {/* Content */}
                    <article className="mt-8 prose prose-slate dark:prose-invert max-w-none prose-lg leading-relaxed">
                        <div className="whitespace-pre-line text-[#0F172A] dark:text-slate-200 text-base leading-[1.9]">
                            {work.content}
                        </div>
                    </article>

                    {/* Related */}
                    {related.length > 0 && (
                        <div className="mt-16 border-t border-slate-100 dark:border-slate-800 pt-10">
                            <h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Karya Sejenis</h2>
                            <div className="mt-6 grid gap-4 sm:grid-cols-3">
                                {related.map((r) => (
                                    <Link key={r.id} href={`/karya-smansa/${r.slug}`}
                                        className="group rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 hover:shadow-md hover:-translate-y-0.5 transition-all">
                                        <div className="flex items-center gap-1.5 text-xs text-rose-500 font-bold uppercase tracking-wider">
                                            <BookHeart size={12} /> {categoryLabel[r.category] ?? r.category}
                                        </div>
                                        <h3 className="mt-2 font-display text-sm font-bold leading-snug text-[#0F172A] dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 line-clamp-2 transition-colors">{r.title}</h3>
                                        <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{r.author_name}</p>
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
