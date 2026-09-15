import { Link, usePage } from "@inertiajs/react";
import { BookOpen, Globe, Moon, Menu, Search, Sun, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useI18n, Language } from "../../utils/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const auth = props.auth as { user?: { name: string; role: string } } | undefined;
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { lang, setLanguage, t } = useI18n();

    // Dark mode sync
    useEffect(() => {
        const savedTheme = localStorage.getItem("smansa-theme");
        const isDark = savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches);
        setDarkMode(isDark);
        document.documentElement.classList.toggle("dark", isDark);
    }, []);

    const toggleTheme = () => {
        const next = !darkMode;
        setDarkMode(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("smansa-theme", next ? "dark" : "light");
    };

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    const isActive = (path: string) => path === "/" ? url === "/" : url.startsWith(path);
    const accountHref = auth?.user && ["admin", "librarian"].includes(auth.user.role) ? "/admin-panel" : "/dashboard";

    const navItems = [
        { label: t("nav_home"), href: "/" },
        { label: t("nav_catalog"), href: "/catalog" },
        { label: t("nav_magazine"), href: "/magazines" },
        { label: t("nav_bulletin"), href: "/magazines?type=bulletin" },
        { label: t("nav_events"), href: "/events" },
        { label: t("nav_works"), href: "/karya-smansa" },
        { label: t("nav_ranking"), href: "/ranking" },
    ];

    const langFlags: Record<Language, { label: string; flag: string }> = {
        id: { label: "ID", flag: "🇮🇩" },
        en: { label: "EN", flag: "🇬🇧" },
        de: { label: "DE", flag: "🇩🇪" },
    };

    return (
        <div className="flex min-h-screen flex-col bg-white text-[#152238] transition-colors duration-200 dark:bg-[#090d16] dark:text-[#f8fafc]">
            {/* ── NAVBAR ── */}
            <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 shadow-xs backdrop-blur-md dark:border-slate-800/80 dark:bg-[#090d16]/95">
                <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 shrink-0" onClick={() => setMobileOpen(false)}>
                        <span className="grid size-9 place-items-center rounded-xl bg-[#152238] text-white shadow-sm dark:bg-[#2699fb]">
                            <BookOpen size={17} strokeWidth={2} />
                        </span>
                        <span className="leading-none">
                            <span className="block font-display text-[14px] font-extrabold tracking-tight text-[#152238] dark:text-white">Perpustakaan</span>
                            <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-[#64748b] dark:text-slate-400">SMAN 1 Bukittinggi</span>
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden items-center gap-0.5 xl:gap-1 lg:flex">
                        {navItems.map((item) => {
                            const active = isActive(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                                        active
                                            ? "bg-[#f0f7ff] text-[#2699fb] dark:bg-blue-950/60 dark:text-[#38bdf8]"
                                            : "text-[#64748b] hover:bg-gray-50 hover:text-[#152238] dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-white"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Desktop actions (Lang, Dark Mode, Search, Account) */}
                    <div className="hidden items-center gap-2 sm:flex">
                        {/* Language Selector Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setLangOpen(!langOpen)}
                                aria-label="Ganti bahasa / Switch language"
                                className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-[#152238] hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                <span className="text-sm">{langFlags[lang].flag}</span>
                                <span>{langFlags[lang].label}</span>
                            </button>
                            {langOpen && (
                                <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900">
                                    <button
                                        type="button"
                                        onClick={() => { setLanguage("id"); setLangOpen(false); }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 ${lang === "id" ? "text-[#2699fb]" : "text-gray-700 dark:text-slate-300"}`}
                                    >
                                        <span>🇮🇩</span> Bahasa Indonesia
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setLanguage("en"); setLangOpen(false); }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 ${lang === "en" ? "text-[#2699fb]" : "text-gray-700 dark:text-slate-300"}`}
                                    >
                                        <span>🇬🇧</span> English
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => { setLanguage("de"); setLangOpen(false); }}
                                        className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 ${lang === "de" ? "text-[#2699fb]" : "text-gray-700 dark:text-slate-300"}`}
                                    >
                                        <span>🇩🇪</span> Deutsch
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Dark/Light Mode Toggle */}
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={darkMode ? t("theme_light") : t("theme_dark")}
                            className="grid size-9 place-items-center rounded-full text-[#64748b] transition hover:bg-gray-100 hover:text-[#152238] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
                        </button>

                        {/* Search Link */}
                        <Link href="/catalog" aria-label={t("nav_search_aria")} className="grid size-9 place-items-center rounded-full text-[#64748b] transition hover:bg-gray-100 hover:text-[#152238] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white">
                            <Search size={17} />
                        </Link>

                        {/* Login / Dashboard */}
                        <Link
                            href={auth?.user ? accountHref : "/login"}
                            className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1783df]"
                        >
                            {auth?.user ? t("nav_my_space") : t("nav_login")}
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            aria-label={darkMode ? t("theme_light") : t("theme_dark")}
                            className="grid size-9 place-items-center rounded-full border border-gray-200 text-[#152238] dark:border-slate-700 dark:text-white"
                        >
                            {darkMode ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} />}
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Buka menu"
                            className="grid size-10 place-items-center rounded-full border border-gray-200 text-[#152238] dark:border-slate-700 dark:text-white"
                        >
                            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu drawer */}
                {mobileOpen && (
                    <div className="border-t border-gray-100 bg-white px-5 py-4 dark:border-slate-800 dark:bg-[#090d16] lg:hidden">
                        {/* Language switcher inside mobile menu */}
                        <div className="mb-3 flex items-center justify-between rounded-xl bg-gray-50 p-2.5 dark:bg-slate-800/80">
                            <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-300">
                                <Globe size={14} /> Bahasa:
                            </span>
                            <div className="flex gap-1">
                                {(["id", "en", "de"] as Language[]).map((l) => (
                                    <button
                                        key={l}
                                        type="button"
                                        onClick={() => setLanguage(l)}
                                        className={`rounded-lg px-2.5 py-1 text-xs font-bold ${
                                            lang === l
                                                ? "bg-[#2699fb] text-white"
                                                : "bg-white text-gray-700 dark:bg-slate-700 dark:text-slate-200"
                                        }`}
                                    >
                                        {langFlags[l].flag} {l.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <nav className="grid gap-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`rounded-xl px-4 py-2.5 text-sm font-semibold ${
                                        isActive(item.href)
                                            ? "bg-[#f0f7ff] text-[#2699fb] dark:bg-blue-950/60 dark:text-[#38bdf8]"
                                            : "text-[#64748b] hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <Link
                                href="/information"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#64748b] hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                {t("nav_about")}
                            </Link>
                            <Link
                                href="/contact"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-[#64748b] hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                {t("nav_contact")}
                            </Link>
                        </nav>
                        <div className="mt-3 border-t border-gray-100 pt-3 dark:border-slate-800">
                            <Link
                                href={auth?.user ? accountHref : "/login"}
                                onClick={() => setMobileOpen(false)}
                                className="block w-full rounded-full bg-[#2699fb] px-4 py-2.5 text-center text-sm font-semibold text-white"
                            >
                                {auth?.user ? t("nav_my_space") : t("nav_login")}
                            </Link>
                        </div>
                    </div>
                )}
            </header>

            {/* ── MAIN CONTENT ── */}
            <main className="flex-1">{children}</main>

            {/* ── FOOTER ── */}
            <footer className="bg-[#152238] text-white dark:bg-[#05070c] border-t dark:border-slate-800">
                <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
                    <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
                        {/* Brand */}
                        <div>
                            <div className="flex items-center gap-2.5">
                                <span className="grid size-9 place-items-center rounded-xl bg-white/10">
                                    <BookOpen size={17} strokeWidth={2} />
                                </span>
                                <p className="font-display text-base font-extrabold">Perpustakaan SMANSA</p>
                            </div>
                            <p className="mt-4 max-w-xs text-sm leading-7 text-blue-200/80">
                                Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi. Tempat warga sekolah menemukan cerita, ilmu pengetahuan, dan ruang untuk bertumbuh bersama.
                            </p>
                        </div>

                        {/* Koleksi */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFC533]">Koleksi & Bacaan</p>
                            <div className="mt-4 grid gap-2.5 text-sm text-blue-200/80">
                                <Link href="/catalog" className="w-fit transition hover:text-white">Katalog Buku</Link>
                                <Link href="/magazines" className="w-fit transition hover:text-white">E-Magazine</Link>
                                <Link href="/magazines?type=bulletin" className="w-fit transition hover:text-white">Buletin Kurtaw</Link>
                                <Link href="/karya-smansa" className="w-fit transition hover:text-white">Karya SMANSA</Link>
                                <Link href="/translations" className="w-fit transition hover:text-white">Pojok Bahasa</Link>
                            </div>
                        </div>

                        {/* Komunitas */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFC533]">Komunitas</p>
                            <div className="mt-4 grid gap-2.5 text-sm text-blue-200/80">
                                <Link href="/events" className="w-fit transition hover:text-white">Agenda & Duta Literasi</Link>
                                <Link href="/ranking" className="w-fit transition hover:text-white">Papan Pembaca Teraktif</Link>
                                <Link href="/information" className="w-fit transition hover:text-white">Tentang Perpustakaan</Link>
                                <Link href="/contact" className="w-fit transition hover:text-white">Hubungi Kami</Link>
                            </div>
                        </div>

                        {/* Kontak */}
                        <div>
                            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#FFC533]">Temui Kami</p>
                            <p className="mt-4 text-sm leading-6 text-blue-200/80">
                                Ruang Baca SMAN 1 Bukittinggi<br />
                                Jl. Syekh M. Jamil Jambek No. 36<br />
                                Bukittinggi, Sumatera Barat<br />
                                Senin–Jumat · 07.30–16.00 WIB
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-blue-300/60 sm:flex-row sm:items-center sm:justify-between">
                        <span>© {new Date().getFullYear()} Perpustakaan SMAN 1 Bukittinggi • NPSN 10303496</span>
                        <span className="uppercase tracking-[0.12em]">Ruang Baca · SMANSA Bukittinggi</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default SiteShell;
