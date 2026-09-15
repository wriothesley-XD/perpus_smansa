import { Link, usePage } from "@inertiajs/react";
import {
    BookOpen,
    ChevronDown,
    Globe,
    LogOut,
    Menu,
    Moon,
    Search,
    Shield,
    Sliders,
    Sun,
    User,
    UserCog,
    X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useI18n, Language } from "../../utils/i18n";

export function SiteShell({ children }: { children: React.ReactNode }) {
    const { url, props } = usePage();
    const auth = props.auth as {
        user?: {
            id: number;
            name: string;
            email: string;
            role: string;
            identifier_number?: string;
            class_name?: string;
            phone_number?: string;
        };
    } | undefined;

    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const { lang, setLanguage, t } = useI18n();
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const langDropdownRef = useRef<HTMLDivElement>(null);

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

    // Close drawers/dropdowns on navigation
    useEffect(() => {
        setMobileOpen(false);
        setUserDropdownOpen(false);
        setLangOpen(false);
    }, [url]);

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [mobileOpen]);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const isActive = (path: string) => path === "/" ? url === "/" : url.startsWith(path);
    const isAdminOrLibrarian = auth?.user && ["admin", "librarian", "teacher"].includes(auth.user.role);

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

    const getRoleBadge = (role?: string) => {
        switch (role) {
            case "admin":
                return { label: "Admin", color: "bg-rose-100 text-rose-800 dark:bg-rose-950/70 dark:text-rose-300" };
            case "librarian":
                return { label: "Pustakawan", color: "bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300" };
            case "teacher":
                return { label: "Guru", color: "bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300" };
            default:
                return { label: "Siswa", color: "bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300" };
        }
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
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                                    isActive(item.href)
                                        ? "bg-[#2699fb]/10 text-[#2699fb] font-bold dark:bg-[#2699fb]/20 dark:text-[#38bdf8]"
                                        : "text-[#64748b] hover:bg-gray-50 hover:text-[#152238] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right actions */}
                    <div className="hidden items-center gap-2 sm:flex">
                        {/* Language Selector Dropdown */}
                        <div className="relative" ref={langDropdownRef}>
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
                                <div className="absolute right-0 mt-2 w-36 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-900 z-50">
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

                        {/* User Account State (Guest vs Logged In) */}
                        {auth?.user ? (
                            <div className="relative ml-1" ref={userDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                    className={`inline-flex items-center gap-2 rounded-full border py-1.5 pl-2 pr-3 text-xs font-bold transition-all ${
                                        userDropdownOpen
                                            ? "border-[#2699fb] bg-blue-50/50 dark:bg-blue-950/50"
                                            : "border-gray-200 bg-white hover:bg-gray-50 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                                    }`}
                                >
                                    <div className="grid size-7 place-items-center rounded-full bg-gradient-to-tr from-[#152238] to-[#2699fb] text-white text-xs font-black shadow-xs">
                                        {auth.user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="max-w-[110px] truncate text-[#152238] dark:text-white">
                                        {auth.user.name.split(" ")[0]}
                                    </span>
                                    <span className={`rounded px-1.5 py-0.5 text-[9px] font-extrabold uppercase ${getRoleBadge(auth.user.role).color}`}>
                                        {getRoleBadge(auth.user.role).label}
                                    </span>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${userDropdownOpen ? "rotate-180 text-[#2699fb]" : ""}`} />
                                </button>

                                {/* User Dropdown Menu */}
                                {userDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-gray-200/80 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-[#121826] z-50 animate-in fade-in zoom-in-95 duration-100">
                                        {/* User Header Profile Card */}
                                        <div className="rounded-xl bg-slate-50 p-3 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                                            <div className="flex items-center gap-3">
                                                <div className="grid size-10 place-items-center rounded-xl bg-[#152238] text-sm font-black text-white dark:bg-[#2699fb]">
                                                    {auth.user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-display text-xs font-bold text-[#152238] dark:text-white">
                                                        {auth.user.name}
                                                    </p>
                                                    <p className="truncate text-[10px] text-gray-500 dark:text-slate-400">
                                                        {auth.user.email}
                                                    </p>
                                                    <p className="mt-0.5 font-mono text-[9px] font-semibold text-slate-400 dark:text-slate-500">
                                                        {auth.user.identifier_number ? `ID: ${auth.user.identifier_number}` : 'SMANSA Member'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu List */}
                                        <div className="mt-2 space-y-1">
                                            {/* Ruang Saya / Dashboard */}
                                            <Link
                                                href="/dashboard"
                                                onClick={() => setUserDropdownOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#152238] hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors"
                                            >
                                                <div className="grid size-8 place-items-center rounded-lg bg-blue-50 text-[#2699fb] dark:bg-blue-950/60">
                                                    <BookOpen size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Ruang Saya (Dashboard)</p>
                                                    <p className="text-[10px] text-gray-400">Buku dipinjam & kartu digital</p>
                                                </div>
                                            </Link>

                                            {/* Admin Panel (Special Section for Admin/Teacher/Librarian) */}
                                            {isAdminOrLibrarian && (
                                                <Link
                                                    href="/admin-panel"
                                                    onClick={() => setUserDropdownOpen(false)}
                                                    className="flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50/50 px-3 py-2.5 text-xs font-semibold text-[#152238] hover:bg-blue-100/60 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 dark:hover:bg-blue-950/70 transition-colors"
                                                >
                                                    <div className="grid size-8 place-items-center rounded-lg bg-[#2699fb] text-white shadow-xs">
                                                        <Shield size={16} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <p className="font-bold">Admin Panel</p>
                                                            <span className="rounded bg-[#2699fb] px-1 py-0.2 text-[8px] font-black uppercase text-white">Guru</span>
                                                        </div>
                                                        <p className="text-[10px] text-slate-500 dark:text-blue-300/80">Kelola buku, buletin & WA</p>
                                                    </div>
                                                </Link>
                                            )}

                                            {/* Pengaturan Profil */}
                                            <Link
                                                href="/profile"
                                                onClick={() => setUserDropdownOpen(false)}
                                                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#152238] hover:bg-slate-100/70 dark:text-slate-200 dark:hover:bg-slate-800/70 transition-colors"
                                            >
                                                <div className="grid size-8 place-items-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                    <UserCog size={16} />
                                                </div>
                                                <div>
                                                    <p className="font-bold">Pengaturan Profil</p>
                                                    <p className="text-[10px] text-gray-400">Ubah data diri & kata sandi</p>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Divider */}
                                        <div className="my-1.5 border-t border-gray-100 dark:border-slate-800" />

                                        {/* Log Out Button */}
                                        <Link
                                            method="post"
                                            as="button"
                                            href="/logout"
                                            className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors text-left"
                                        >
                                            <div className="grid size-8 place-items-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                                                <LogOut size={16} />
                                            </div>
                                            <div>
                                                <p>Keluar (Log Out)</p>
                                                <p className="text-[10px] text-rose-400/80">Akhiri sesi di perangkat ini</p>
                                            </div>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="ml-1 inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1783df]"
                            >
                                <User size={14} />
                                <span>{t("nav_login")}</span>
                            </Link>
                        )}
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
                    <div className="border-t border-gray-100 bg-white px-5 py-4 dark:border-slate-800 dark:bg-[#090d16] lg:hidden max-h-[85vh] overflow-y-auto">
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

                        {/* Navigation Links */}
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

                        {/* Mobile Account Section */}
                        <div className="mt-4 border-t border-gray-100 pt-4 dark:border-slate-800">
                            {auth?.user ? (
                                <div className="space-y-3">
                                    {/* User Banner */}
                                    <div className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3 dark:bg-slate-900/80 border border-slate-100 dark:border-slate-800">
                                        <div className="grid size-10 place-items-center rounded-xl bg-[#152238] text-sm font-bold text-white dark:bg-[#2699fb]">
                                            {auth.user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-xs font-bold text-[#152238] dark:text-white">
                                                {auth.user.name}
                                            </p>
                                            <p className="truncate text-[10px] text-gray-500 dark:text-slate-400">
                                                {auth.user.email}
                                            </p>
                                            <span className={`inline-block mt-1 rounded px-1.5 py-0.2 text-[9px] font-extrabold uppercase ${getRoleBadge(auth.user.role).color}`}>
                                                {getRoleBadge(auth.user.role).label}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Grid */}
                                    <div className="grid grid-cols-1 gap-2">
                                        <Link
                                            href="/dashboard"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-[#152238] shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        >
                                            <BookOpen size={16} className="text-[#2699fb]" />
                                            <span>Ruang Saya (Dashboard)</span>
                                        </Link>

                                        {isAdminOrLibrarian && (
                                            <Link
                                                href="/admin-panel"
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs font-bold text-[#2699fb] shadow-xs dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300"
                                            >
                                                <Shield size={16} />
                                                <span>Admin Panel Perpustakaan</span>
                                            </Link>
                                        )}

                                        <Link
                                            href="/profile"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-[#152238] shadow-xs dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                        >
                                            <UserCog size={16} className="text-slate-500 dark:text-slate-400" />
                                            <span>Pengaturan Profil</span>
                                        </Link>

                                        <Link
                                            method="post"
                                            as="button"
                                            href="/logout"
                                            onClick={() => setMobileOpen(false)}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-700 border border-rose-200 dark:bg-rose-950/50 dark:border-rose-900/60 dark:text-rose-300 transition"
                                        >
                                            <LogOut size={16} />
                                            <span>Keluar (Log Out)</span>
                                        </Link>
                                    </div>
                                </div>
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full rounded-full bg-[#2699fb] px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm hover:bg-[#1783df]"
                                >
                                    {t("nav_login")}
                                </Link>
                            )}
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
                                <span className="grid size-9 place-items-center rounded-xl bg-[#2699fb] text-white shadow-sm">
                                    <BookOpen size={18} strokeWidth={2} />
                                </span>
                                <div>
                                    <span className="block font-display text-sm font-extrabold tracking-tight">Perpustakaan</span>
                                    <span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-blue-300">SMAN 1 Bukittinggi</span>
                                </div>
                            </div>
                            <p className="mt-4 max-w-xs text-xs leading-relaxed text-slate-400">
                                Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi (NPSN: 10303496). Mengembangkan budaya literasi unggul, riset ilmiah, dan karakter pembelajar sepanjang hayat.
                            </p>
                            <p className="mt-2 text-[11px] text-slate-400 font-mono">
                                Alamat: Jl. Syekh M. Djamil Djambek No. 36, Pakan Kurai, Bukittinggi, Sumatera Barat
                            </p>
                        </div>

                        {/* Links 1 */}
                        <div>
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">Koleksi & Bacaan</h4>
                            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                                <li><Link href="/catalog" className="hover:text-white transition">Katalog Buku Pelajaran & Fiksi</Link></li>
                                <li><Link href="/magazines" className="hover:text-white transition">E-Magazine Genta Smansa</Link></li>
                                <li><Link href="/magazines?type=bulletin" className="hover:text-white transition">Buletin Kurtaw SMANSA</Link></li>
                                <li><Link href="/karya-smansa" className="hover:text-white transition">Karya Tulis Siswa & Guru</Link></li>
                            </ul>
                        </div>

                        {/* Links 2 */}
                        <div>
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">Komunitas & Layanan</h4>
                            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                                <li><Link href="/events" className="hover:text-white transition">Agenda & Duta Literasi</Link></li>
                                <li><Link href="/ranking" className="hover:text-white transition">Papan Pembaca Teraktif</Link></li>
                                <li><Link href="/information" className="hover:text-white transition">Profil Perpustakaan Sunaryaman</Link></li>
                                <li><Link href="/contact" className="hover:text-white transition">Kontak Layanan Pustaka</Link></li>
                            </ul>
                        </div>

                        {/* Operasional */}
                        <div>
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">Jam Layanan</h4>
                            <div className="mt-4 space-y-2 text-xs text-slate-400">
                                <p><strong className="text-white">Senin - Kamis:</strong> 07.15 - 16.00 WIB</p>
                                <p><strong className="text-white">Jumat:</strong> 07.15 - 11.45 WIB</p>
                                <p><strong className="text-white">Sabtu:</strong> 07.30 - 13.00 WIB</p>
                                <p className="pt-2 text-[11px] text-amber-300 font-medium">Layanan E-Book & Buletin Online: 24 Jam Nonstop</p>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row text-xs text-slate-500">
                        <p>© {new Date().getFullYear()} Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi. Hak Cipta Dilindungi.</p>
                        <p className="font-mono text-[10px] text-slate-500">
                            NPSN 10303496 · Sistem Informasi Perpustakaan Terintegrasi
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default SiteShell;
