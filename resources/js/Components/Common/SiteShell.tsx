import { Link, usePage } from '@inertiajs/react';
import {
    ArrowUpRight,
    BookOpen,
    Globe2,
    Menu,
    Moon,
    Search,
    Sun,
    X,
    Play,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';

const NAV_ITEMS = [
    { label: 'Beranda', href: '/' },
    { label: 'Katalog', href: '/catalog' },
    { label: 'E-Magazine', href: '/magazines' },
    { label: 'Komunitas', href: '/events' },
    { label: 'Karya', href: '/karya-smansa' },
    { label: 'Bahasa', href: '/translations' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const auth = props.auth as { user?: { name: string; role: string } } | undefined;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const stored = window.localStorage.getItem('smansa-theme');
        const enabled = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(enabled);
        document.documentElement.classList.toggle('dark', enabled);
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle('dark', next);
        window.localStorage.setItem('smansa-theme', next ? 'dark' : 'light');
    };

    const isActive = (path: string) => path === '/' ? url === '/' : url.startsWith(path);
    const accountHref = auth?.user && ['admin', 'librarian'].includes(auth.user.role) ? '/admin-panel' : '/dashboard';

    return (
        <div className="paper-grain flex min-h-screen flex-col bg-[#f4efe8] text-[#19283a] transition-colors dark:bg-[#0b1728]">
            <header className="sticky top-0 z-40 border-b border-[#d8cbbd]/60 bg-[#f4efe8]/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1728]/90">
                <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
                    <Link href="/" className="group flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                        <span className="relative grid size-10 place-items-center rounded-[13px] bg-[#123b5d] text-[#f8d77e] shadow-[4px_4px_0_#d9c6ac] transition-transform duration-200 group-hover:-rotate-3 dark:shadow-[4px_4px_0_#1d344c]">
                            <BookOpen size={19} strokeWidth={1.8} />
                            <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#e37c5b]" />
                        </span>
                        <span className="leading-none">
                            <span className="block font-display text-[15px] font-black tracking-[-0.03em] text-[#123b5d] dark:text-[#e8f0f6]">Perpustakaan</span>
                            <span className="mt-1 block font-mono-display text-[8px] font-bold uppercase tracking-[0.18em] text-[#78848d]">SMAN 1 Bukittinggi</span>
                        </span>
                    </Link>

                    <nav className="hidden items-center gap-1 rounded-full border border-[#d8cbbd]/70 bg-white/35 p-1 md:flex dark:border-white/10 dark:bg-white/5">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return <Link key={item.href} href={item.href} className={`rounded-full px-3.5 py-2 text-[11px] font-semibold transition-all ${active ? 'bg-[#123b5d] text-white shadow-sm' : 'text-[#64717b] hover:bg-white/80 hover:text-[#123b5d] dark:text-[#a7b7c3] dark:hover:bg-white/10 dark:hover:text-white'}`}>{item.label}</Link>;
                        })}
                    </nav>

                    <div className="hidden items-center gap-1.5 md:flex">
                        <button type="button" onClick={toggleTheme} aria-label={darkMode ? 'Gunakan mode terang' : 'Gunakan mode gelap'} className="grid size-10 place-items-center rounded-full text-[#66737d] transition hover:bg-white/70 hover:text-[#123b5d] dark:text-[#c3d2dc] dark:hover:bg-white/10">
                            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                        </button>
                        <Link href="/catalog" aria-label="Cari di katalog" className="grid size-10 place-items-center rounded-full text-[#66737d] transition hover:bg-white/70 hover:text-[#123b5d] dark:text-[#c3d2dc] dark:hover:bg-white/10"><Search size={17} /></Link>
                        <Link href={auth?.user ? accountHref : '/login'} className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#123b5d] px-4 py-2.5 text-[11px] font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#0c2d47]">{auth?.user ? 'Ruang Saya' : 'Masuk'} <ArrowUpRight size={13} /></Link>
                    </div>

                    <button type="button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Buka menu" className="grid size-10 place-items-center rounded-full border border-[#d8cbbd] text-[#123b5d] md:hidden dark:border-white/15 dark:text-white">{mobileOpen ? <X size={19} /> : <Menu size={19} />}</button>
                </div>
                {mobileOpen && <div className="border-t border-[#d8cbbd]/60 bg-[#f4efe8] px-5 py-4 dark:border-white/10 dark:bg-[#0b1728] md:hidden"><nav className="grid gap-1">{NAV_ITEMS.concat([{ label: 'Tentang', href: '/information' }, { label: 'Kontak', href: '/contact' }]).map((item) => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`rounded-xl px-3 py-3 text-sm font-semibold ${isActive(item.href) ? 'bg-[#123b5d] text-white' : 'text-[#596872] dark:text-[#c3d2dc]'}`}>{item.label}</Link>)}</nav><div className="mt-3 flex gap-2 border-t border-[#d8cbbd]/60 pt-3 dark:border-white/10"><button type="button" onClick={toggleTheme} className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-[#d8cbbd] px-3 py-2 text-xs font-bold dark:border-white/15 dark:text-white">{darkMode ? <Sun size={14} /> : <Moon size={14} />} {darkMode ? 'Mode terang' : 'Mode gelap'}</button><Link href={auth?.user ? accountHref : '/login'} className="flex-1 rounded-full bg-[#123b5d] px-4 py-2 text-center text-xs font-bold text-white">{auth?.user ? 'Ruang Saya' : 'Masuk'}</Link></div></div>}
            </header>

            <main className="flex-1">{children}</main>

            <footer className="torn-top mt-20 bg-[#123b5d] text-white">
                <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
                    <div className="grid gap-10 md:grid-cols-[1.2fr_.8fr_.8fr]">
                        <div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-white/10 text-[#f8d77e]"><BookOpen size={18} /></span><div><p className="font-display text-lg font-bold">Perpustakaan SMANSA</p><p className="mt-1 font-mono-display text-[9px] uppercase tracking-[0.18em] text-blue-200">Archive of curious minds</p></div></div><p className="mt-5 max-w-sm text-sm leading-7 text-blue-100">Tempat warga sekolah menemukan cerita, pengetahuan, dan ruang untuk bertumbuh bersama.</p></div>
                        <div><p className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#f8d77e]">Jelajahi</p><div className="mt-4 grid gap-2 text-sm text-blue-100">{NAV_ITEMS.slice(1, 5).map((item) => <Link key={item.href} href={item.href} className="w-fit transition hover:translate-x-1 hover:text-white">{item.label}</Link>)}</div></div>
                        <div><p className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#f8d77e]">Temui kami</p><p className="mt-4 text-sm leading-6 text-blue-100">Ruang Baca SMAN 1 Bukittinggi<br />Senin–Jumat · 07.00–16.00</p><div className="mt-5 flex gap-2"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Globe2" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><Globe2 size={15} /></a><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="grid size-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><Play size={15} /></a></div></div>
                    </div>
                    <div className="mt-12 flex flex-col gap-2 border-t border-white/15 pt-5 text-[10px] text-blue-200 sm:flex-row sm:items-center sm:justify-between"><span>© {new Date().getFullYear()} Perpustakaan SMAN 1 Bukittinggi</span><span className="font-mono-display uppercase tracking-[0.16em]">Made for readers · SLAVUSworks</span></div>
                </div>
            </footer>
        </div>
    );
}

export default SiteShell;

