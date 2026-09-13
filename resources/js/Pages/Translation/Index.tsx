import { Head, Link } from '@inertiajs/react';
import { ArrowRightLeft, Copy, Globe } from 'lucide-react';
import { useState } from 'react';
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
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('en');
    const [translated, setTranslated] = useState('');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState('');

    const translate = async () => {
        if (!source.trim()) return;
        setProcessing(true);
        setError('');
        try {
            const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(source)}&langpair=id|${target}`);
            const payload = await response.json();
            const result = payload?.responseData?.translatedText;
            if (!result) throw new Error('empty');
            setTranslated(result);
        } catch {
            setError('Layanan penerjemah sedang tidak tersedia. Coba lagi sebentar.');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <SiteShell>
            <Head title="Ruang Penerjemah - Perpustakaan SMAN 1 Bukittinggi" />
            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Hero */}
                <div className="border-b border-slate-100 dark:border-slate-800 px-6 py-16 sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3">
                            <Globe size={32} className="text-[#123B5D] dark:text-blue-400" />
                            <div>
                                <h1 className="font-display text-3xl font-extrabold text-[#0F172A] dark:text-white sm:text-4xl">
                                    Ruang Penerjemah
                                </h1>
                                <p className="mt-1 text-slate-500 dark:text-slate-400">
                                    Terjemahkan ide, karya, dan materi belajar ke bahasa Inggris, Jepang, atau Jerman.
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
                                        Bahasa tujuan • {lang.code.toUpperCase()} • {lang.native}
                                    </span>
                                    <h2 className="mt-2 font-display text-2xl font-extrabold text-[#0F172A] dark:text-white">{lang.name}</h2>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{lang.tagline}</p>
                                </div>

                                <blockquote className="mt-6 border-l-4 pl-4 text-sm italic text-slate-600 dark:text-slate-300" style={{ borderColor: lang.color }}>
                                    <p>{lang.quote}</p>
                                    <footer className="mt-2 text-xs font-semibold not-italic" style={{ color: lang.color }}>— {lang.author}</footer>
                                </blockquote>

                                <div className="mt-6 flex items-center gap-2 rounded-xl px-4 py-3" style={{ backgroundColor: lang.bg }}>
                                    <ArrowRightLeft size={16} style={{ color: lang.color }} />
                                    <span className="text-sm font-bold" style={{ color: lang.color }}>Gunakan sebagai bahasa tujuan</span>
                                </div>

                                <div className="mt-4 text-sm font-bold group-hover:gap-3 flex items-center gap-2 transition-all" style={{ color: lang.color }}>
                                    Pilih bahasa ini <span>→</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="mx-auto mt-14 max-w-4xl rounded-3xl border border-slate-100 bg-[#fffdf7] p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:p-8">
                        <div className="flex items-center gap-3"><Globe className="text-[#123B5D]" size={22} /><div><h2 className="font-display text-xl font-bold text-[#0F172A] dark:text-white">Mulai menerjemahkan</h2><p className="text-sm text-slate-500 dark:text-slate-400">Tulis teks sumber, pilih bahasa tujuan, lalu lanjutkan proses penerjemahan.</p></div></div>
                        <div className="mt-6 grid gap-4 md:grid-cols-2"><textarea value={source} onChange={(e) => setSource(e.target.value)} rows={7} placeholder="Tulis teks bahasa Indonesia di sini..." className="w-full resize-none rounded-2xl border border-slate-200 bg-white p-4 text-sm outline-none focus:border-[#123B5D] dark:border-slate-700 dark:bg-slate-900 dark:text-white" /><div className="relative"><textarea value={translated} readOnly rows={7} placeholder="Hasil terjemahan akan tampil di sini..." className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white" />{translated && <button type="button" onClick={() => navigator.clipboard?.writeText(translated)} className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-200"><Copy size={13} /> Salin</button>}</div></div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3"><div className="flex items-center gap-3"><select value={target} onChange={(e) => setTarget(e.target.value)} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-semibold dark:border-slate-700 dark:bg-slate-900 dark:text-white">{languages.map((lang) => <option key={lang.code} value={lang.code}>{lang.flag} {lang.name}</option>)}</select>{error && <span className="text-xs font-medium text-rose-600">{error}</span>}</div><button type="button" onClick={translate} disabled={processing || !source.trim()} className="rounded-xl bg-[#123B5D] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#0C2D47] disabled:opacity-60">{processing ? 'Menerjemahkan...' : 'Terjemahkan'}</button></div>
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
