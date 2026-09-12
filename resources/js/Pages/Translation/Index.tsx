import { Head, Link } from '@inertiajs/react';
import { BookOpen, Globe } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';

interface LangInfo {
    code: string;
    name: string;
    native: string;
    flag: string;
    tagline: string;
    quote: string;
    author: string;
    color: string;
    bg: string;
}

interface TranslationIndexProps {
    languages: LangInfo[];
    bookCounts: Record<string, number>;
}

export default function TranslationIndex({ languages, bookCounts }: TranslationIndexProps) {
    return (
        <SiteShell>
            <Head title="Koleksi Multibahasa - Perpustakaan SMAN 1 Bukittinggi" />
            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Hero */}
                <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-16 sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3">
                            <Globe size={32} className="text-[#0B4EA2] dark:text-blue-400" />
                            <div>
                                <h1 className="font-display text-3xl font-extrabold text-[#0F172A] dark:text-white sm:text-4xl">
                                    Koleksi Multibahasa
                                </h1>
                                <p className="mt-1 text-slate-500 dark:text-slate-400">
                                    Jelajahi dunia literasi melalui koleksi buku berbahasa asing perpustakaan Smansa
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Language Cards */}
                <div className="mx-auto max-w-7xl px-6 py-14 sm:px-8">
                    <div className="grid gap-8 sm:grid-cols-3">
                        {languages.map((lang) => (
                            <Link
                                key={lang.code}
                                href={`/translations/${lang.code}`}
                                className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                            >
                                {/* Colored accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl" style={{ backgroundColor: lang.color }} />

                                <div className="text-5xl mb-4">{lang.flag}</div>
                                <div>
                                    <span className="font-mono-display text-xs font-bold uppercase tracking-widest" style={{ color: lang.color }}>
                                        {lang.code.toUpperCase()} • {lang.native}
                                    </span>
                                    <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">{lang.name}</h2>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{lang.tagline}</p>
                                </div>

                                <blockquote className="mt-6 border-l-4 pl-4 text-sm italic text-slate-600 dark:text-slate-300" style={{ borderColor: lang.color }}>
                                    <p>{lang.quote}</p>
                                    <footer className="mt-2 text-xs font-semibold not-italic" style={{ color: lang.color }}>— {lang.author}</footer>
                                </blockquote>

                                <div className="mt-6 flex items-center gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: lang.bg }}>
                                    <BookOpen size={16} style={{ color: lang.color }} />
                                    <span className="text-sm font-bold" style={{ color: lang.color }}>
                                        {bookCounts[lang.code] ?? 0} judul tersedia di perpustakaan
                                    </span>
                                </div>

                                <div className="mt-4 text-sm font-bold group-hover:gap-3 flex items-center gap-2 transition-all" style={{ color: lang.color }}>
                                    Jelajahi koleksi <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
