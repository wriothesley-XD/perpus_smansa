import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChevronRight, LogIn, LogOut, MapPin, Menu, User, X } from 'lucide-react';
import React, { useState } from 'react';

const NAV_ITEMS = [
    { label: 'Beranda', href: '/' },
    { label: 'E-Katalog', href: '/catalog' },
    { label: 'E-Magazine', href: '/magazines' },
    { label: 'Tentang Perpustakaan', href: '/information' },
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
        <div className="flex min-h-screen flex-col bg-white text-[#0F172A]">
            {/* Main Header - Minimalist Figma Style */}
            <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-8">
                    {/* Brand Logo */}
                    <Link href="/" className="group flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-xl bg-[#0B4EA2] text-white shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                            <BookOpen size={20} strokeWidth={2} />
                        </span>
                        <div className="leading-tight">
                            <span className="block font-display text-lg font-bold tracking-tight text-[#0F172A]">
                                Perpustakaan
                            </span>
                            <span className="block font-mono-display text-[9px] font-bold uppercase tracking-[0.18em] text-[#0B4EA2]">
                                SMAN 1 Bukittinggi
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-8 lg:flex" aria-label="Navigasi Utama">
                        {NAV_ITEMS.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`relative py-2 text-sm font-medium transition-colors hover:text-[#0B4EA2] ${
                                        active ? 'font-bold text-[#0B4EA2]' : 'text-slate-600'
                                    }`}
                                >
                                    {item.label}
                                    {active && (
                                        <span className="absolute -bottom-[25px] left-0 right-0 mx-auto h-[3px] w-6 rounded-full bg-[#0B4EA2]" />
                                    )}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action / Auth */}
                    <div className="hidden items-center gap-3 lg:flex">
                        {auth?.user?.role === 'librarian' || auth?.user?.role === 'admin' ? (
                            <a
                                href="/admin"
                                className="rounded-lg border border-amber-300 bg-[#FACC15]/20 px-3 py-1.5 text-xs font-bold text-amber-900 hover:bg-[#FACC15]/40 transition-colors"
                            >
                                Panel Admin
                            </a>
                        ) : null}

                        {auth?.user ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    href="/dashboard"
                                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1.5 pl-2.5 pr-4 text-xs font-semibold text-slate-800 hover:border-[#0B4EA2] transition-colors"
                                >
                                    <span className="grid size-6 place-items-center rounded-full bg-[#0B4EA2] text-white text-[10px] font-bold">
                                        {auth.user.name.charAt(0)}
                                    </span>
                                    <span>{auth.user.name.split(' ')[0]}</span>
                                    <span className="rounded bg-slate-200 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-slate-600">
                                        {auth.user.role}
                                    </span>
                                </Link>
                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="rounded-full p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-colors"
                                    title="Keluar"
                                >
                                    <LogOut size={16} />
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-2 rounded-xl bg-[#0B4EA2] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#083c7d] transition-all"
                            >
                                <LogIn size={14} />
                                <span>Masuk</span>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger Button */}
                    <button
                        type="button"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="rounded-xl border border-slate-200 p-2.5 text-slate-700 hover:bg-slate-100 lg:hidden"
                        aria-label="Menu navigasi"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile Navigation Drawer */}
                {mobileOpen && (
                    <div className="border-t border-slate-100 bg-white px-5 py-5 shadow-lg lg:hidden">
                        <nav className="flex flex-col gap-1.5">
                            {NAV_ITEMS.map((item) => {
                                const active = isActive(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileOpen(false)}
                                        className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                                            active
                                                ? 'bg-[#EAF4FF] text-[#0B4EA2]'
                                                : 'text-slate-700 hover:bg-slate-50'
                                        }`}
                                    >
                                        <span>{item.label}</span>
                                        <ChevronRight size={16} className="text-slate-400" />
                                    </Link>
                                );
                            })}
                            <div className="mt-4 border-t border-slate-100 pt-4">
                                {auth?.user ? (
                                    <div className="space-y-2">
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-800"
                                        >
                                            <User size={16} />
                                            <span>Dashboard Anggota ({auth.user.name})</span>
                                        </Link>
                                        <Link
                                            href="/logout"
                                            method="post"
                                            as="button"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
                                        >
                                            <LogOut size={16} />
                                            <span>Keluar Akun</span>
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        onClick={() => setMobileOpen(false)}
                                        className="flex items-center justify-center gap-2 rounded-xl bg-[#0B4EA2] py-3 text-sm font-bold text-white shadow-sm"
                                    >
                                        <LogIn size={16} />
                                        <span>Masuk Anggota</span>
                                    </Link>
                                )}
                            </div>
                        </nav>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="flex-1">{children}</main>

            {/* Modern Clean Footer */}
            <footer className="border-t border-slate-200/80 bg-[#0F172A] text-white">
                <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-[1.3fr_0.8fr_0.9fr] lg:px-10">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="grid size-10 place-items-center rounded-xl bg-[#0B4EA2] text-white">
                                <BookOpen size={20} />
                            </span>
                            <div>
                                <h2 className="font-display text-lg font-bold text-white">
                                    Perpustakaan SMAN 1
                                </h2>
                                <p className="font-mono-display text-[10px] uppercase tracking-widest text-[#FACC15]">
                                    Bukittinggi • Sumatera Barat
                                </p>
                            </div>
                        </div>
                        <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
                            Pusat eksplorasi literasi, referensi akademik, dan terbitan digital untuk menunjang prestasi serta wawasan seluruh insan Smansa.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                            <MapPin size={14} className="text-[#FACC15] shrink-0" />
                            <span>Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi</span>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-mono-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#FACC15]">
                            Jelajah Koleksi
                        </h3>
                        <div className="mt-4 flex flex-col items-start gap-2.5 text-sm text-slate-400">
                            <Link href="/catalog" className="hover:text-white transition-colors">
                                Katalog Buku (OPAC)
                            </Link>
                            <Link href="/magazines" className="hover:text-white transition-colors">
                                E-Magazine Genta Smansa
                            </Link>
                            <Link href="/information" className="hover:text-white transition-colors">
                                Tentang & Tata Tertib
                            </Link>
                            <Link href="/contact" className="hover:text-white transition-colors">
                                Kontak & Lokasi
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-mono-display text-[11px] font-bold uppercase tracking-[0.18em] text-[#FACC15]">
                            Layanan Pustakawan
                        </h3>
                        <p className="mt-4 text-xs leading-relaxed text-slate-400">
                            Butuh bantuan pencarian literatur referensi skripsi guru atau karya ilmiah siswa? Hubungi tim pustakawan kami.
                        </p>
                        <div className="mt-4 space-y-1 text-xs font-medium text-slate-300">
                            <p>Senin - Jumat: 07.30 - 16.00 WIB</p>
                            <p className="text-[#FACC15] font-semibold">perpustakaan@sman1bukittinggi.sch.id</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 bg-[#0A0F1D] py-6">
                    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-slate-400 sm:flex-row sm:px-8">
                        <span>
                            © {new Date().getFullYear()} Perpustakaan SMAN 1 Bukittinggi. All rights reserved.
                        </span>
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                                <span className="font-bold text-[#FACC15]">IG:</span>
                                @perpus_smansabkt
                            </span>
                            <span>•</span>
                            <span className="font-medium text-slate-400">SLAVUSworks Production</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
