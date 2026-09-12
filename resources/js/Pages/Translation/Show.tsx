import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { BookCard } from '../../Components/Common/BookCard';
import { Book } from '../../types/library';

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

interface TranslationShowProps {
    language: LangInfo;
    books: Book[];
}

export default function TranslationShow({ language: lang, books }: TranslationShowProps) {
    return (
        <SiteShell>
            <Head title={`Koleksi ${lang.name} - Perpustakaan SMAN 1 Bukittinggi`} />
            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Hero */}
                <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-14 sm:px-8" style={{ background: `linear-gradient(135deg, ${lang.bg} 0%, white 60%)` }}>
                    <div className="mx-auto max-w-7xl">
                        <Link href="/translations" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B4EA2] dark:text-blue-400 hover:gap-3 transition-all">
                            <ArrowLeft size={16} /> Semua Bahasa
                        </Link>
                        <div className="mt-6 flex items-start gap-5">
                            <div className="text-6xl">{lang.flag}</div>
                            <div>
                                <span className="font-mono-display text-xs font-bold uppercase tracking-widest" style={{ color: lang.color }}>
                                    {lang.code.toUpperCase()} • {lang.native}
                                </span>
                                <h1 className="mt-1 font-display text-3xl font-extrabold text-[#0F172A] sm:text-4xl">{lang.tagline}</h1>
                                <blockquote className="mt-4 text-sm italic text-slate-600">
                                    {lang.quote}
                                    <footer className="mt-1 not-italic font-semibold text-xs" style={{ color: lang.color }}>— {lang.author}</footer>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Books */}
                <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">
                                Koleksi Berbahasa {lang.name}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                {books.length} judul ditemukan di perpustakaan
                            </p>
                        </div>
                        <Link href={`/catalog?language=${lang.code}`} className="hidden sm:inline-flex items-center gap-2 text-sm font-bold" style={{ color: lang.color }}>
                            <span>Lihat di Katalog</span> <BookOpen size={16} />
                        </Link>
                    </div>

                    {books.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-16 text-center">
                            <p className="text-4xl mb-4">{lang.flag}</p>
                            <p className="font-display text-xl font-bold text-slate-700 dark:text-slate-300">Belum ada koleksi berbahasa {lang.name}</p>
                            <p className="mt-2 text-sm text-slate-500">Hubungi pustakawan untuk rekomendasi pengadaan koleksi baru.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                            {books.map((book) => <BookCard key={book.id} book={book} />)}
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
