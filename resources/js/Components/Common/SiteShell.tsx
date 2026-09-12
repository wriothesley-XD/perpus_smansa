import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    Search,
    Menu,
    X,
} from 'lucide-react';
import React, { useState } from 'react';

const NAV_ITEMS = [
    { label: 'Beranda', href: '/' },
    { label: 'Katalog', href: '/catalog' },
    { label: 'E-Magazine', href: '/magazines' },
    { label: 'Tentang', href: '/information' },
    { label: 'Kontak', href: '/contact' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
    const { url } = usePage();
    const { auth } = usePage().props as { auth?: { user?: { name: string; role: string } } };
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === '/') return url === '/';
        return url.startsWith(path);
    };

    return (
        <div className="paper-grain flex min-h-screen flex-col bg-[#F4EFEA] text-[#0F172A] selection:bg-[#0B3866] selection:text-white">
            {/* Header: Transparent warm cream background matching mockup */}
            <header className="sticky top-0 z-40 bg-[#F4EFEA]/90 backdrop-blur-md transition-all">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
                    {/* Brand Logo: Clean icon + Uppercase text */}
                    <Link href="/" className="group relative flex items-center gap-3">
                        <span className="tape-edge absolute -left-2 top-0 z-0 h-9 w-10 -rotate-6 opacity-40 transition group-hover:rotate-0" />
                        <span className="grid size-9 place-items-center rounded-lg bg-[#0B3866] text-white shadow-sm">
                            <BookOpen size={18} strokeWidth={2.2} />
                        </span>
                        <div className="leading-tight">
                            <span className="block font-display text-sm font-extrabold uppercase tracking-wide text-[#0B3866]">
                                Perpustakaan
                            </span>
                            <span className="block font-mono-display text-[9px] font-bold uppercase tracking-[0.16em] text-slate-700">
                                SMAN 1 Bukittinggi
                            </span>
                        </div>
                    </Link>

                    {/* Navigation items in center */}
                    <nav className="hidden items-center gap-7 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-xs font-semibold tracking-wide transition-colors hover:text-[#2E8BE6] ${
                                        active ? 'font-bold text-[#2E8BE6]' : 'text-slate-600'
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side: Search Icon & Login Button */}
                    <div className="hidden items-center gap-4 md:flex">
                        <Link
                            href="/catalog"
                            className="p-1.5 text-slate-600 hover:text-[#0B3866] transition-colors"
                            title="Pencarian"
                        >
                            <Search size={17} strokeWidth={2.2} />
                        </Link>

                        {auth?.user ? (
                            <Link
                                href="/dashboard"
                                className="rounded-full bg-[#0B3866] px-5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#082B4E] transition-all"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="rounded-full bg-[#0B3866] px-6 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#082B4E] transition-all"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile toggle */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="rounded-lg p-2 text-slate-700 hover:bg-slate-200/60"
                        >
                            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                {mobileOpen && (
                    <div className="border-b border-slate-200 bg-[#F4EFEA] px-6 py-4 md:hidden">
                        <nav className="flex flex-col gap-2">
                            {NAV_ITEMS.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="py-2 text-sm font-semibold text-slate-700 hover:text-[#2E8BE6]"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="mt-3 pt-3 border-t border-slate-200 flex justify-between items-center">
                                <Link href="/login" className="rounded-full bg-[#0B3866] px-5 py-2 text-xs font-bold text-white">
                                    Login
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Page Content */}
            <main className="flex-1">{children}</main>

            {/* Footer: Deep Navy Bar with Center Slogan & Socials */}
            <footer className="torn-top mt-16 bg-[#0B3866] text-white">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:flex-row sm:px-10">
                    {/* Left: Brand */}
                    <div className="flex items-center gap-3">
                        <span className="grid size-8 place-items-center rounded bg-white/10 text-white">
                            <BookOpen size={16} />
                        </span>
                        <div>
                            <span className="block text-xs font-bold uppercase tracking-wider">Perpustakaan</span>
                            <span className="block text-[9px] uppercase tracking-widest text-blue-200">SMAN 1 Bukittinggi</span>
                        </div>
                    </div>

                    {/* Center: Slogan italic */}
                    <div className="text-center font-handwriting text-sm text-blue-100 italic">
                        Membaca hari ini, untuk masa depan esok.
                    </div>

                    {/* Nav Links */}
                    <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-blue-100">
                        {NAV_ITEMS.map((item) => (
                            <Link key={item.href} href={item.href} className="hover:text-white transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Social Media Icons */}
                    <div className="flex items-center gap-4 text-blue-100">
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.2 2.7 12 2.7 12 2.7s-4.2 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3S1.3 20 2.2 20.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.3 12 22.3s4.2 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.7 1.2-2.7S23.3 15.4 23.3 13v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/></svg>
                        </a>
                        <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="hover:text-white">
                            <svg width="14" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.74a4.85 4.85 0 01-1.01-.05z"/></svg>
                        </a>
                    </div>
                </div>

                {/* Bottom copyright line */}
                <div className="border-t border-blue-800/60 py-3 text-center text-[10px] text-blue-200">
                    © {new Date().getFullYear()} Perpustakaan SMAN 1 Bukittinggi. All rights reserved. &nbsp;•&nbsp; SLAVUSworks
                </div>
            </footer>
        </div>
    );
}
