import { Link, usePage, router } from "@inertiajs/react";
import {
    ArrowUp,
    BookOpen,
    Calendar,
    ChevronDown,
    ChevronRight,
    Globe,
    Home,
    Info,
    LayoutDashboard,
    LogOut,
    Mail,
    MapPin,
    Moon,
    Newspaper,
    PenTool,
    Phone,
    Search,
    Shield,
    Sliders,
    Sun,
    Trophy,
    User,
    UserCog,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useI18n, Language } from "../../utils/i18n";
import { ScrollRevealProvider } from "./ScrollRevealProvider";
import { HamburgerButton } from "./HamburgerButton";
import { MegaMenu } from "./MegaMenu";
import { SearchBar } from "./SearchBar";
import { Tooltip } from "./Tooltip";
import { ToastProvider } from "./ToastProvider";

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
    const [pageTransition, setPageTransition] = useState<"enter" | "exit">("enter");
    const { lang, setLanguage, t } = useI18n();
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const langDropdownRef = useRef<HTMLDivElement>(null);

    // Inertia Page Transition handling
    useEffect(() => {
        const removeStart = router.on("start", () => {
            setPageTransition("exit");
        });
        const removeFinish = router.on("finish", () => {
            setPageTransition("enter");
        });
        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

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

    const mobileNavItems = [
        { label: t("nav_home"), href: "/", icon: Home },
        { label: t("nav_catalog"), href: "/catalog", icon: BookOpen },
        { label: t("nav_magazine"), href: "/magazines", icon: Newspaper },
        { label: t("nav_events"), href: "/events", icon: Calendar },
        { label: t("nav_works"), href: "/karya-smansa", icon: PenTool },
        { label: t("nav_ranking"), href: "/ranking", icon: Trophy },
        { label: t("nav_about"), href: "/information", icon: Info },
        { label: t("nav_contact"), href: "/contact", icon: Phone },
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
        <ToastProvider>
        <ScrollRevealProvider>
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
                    <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
                        <Link
                            href="/"
                            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                                isActive("/")
                                    ? "text-[#2699fb] font-bold"
                                    : "text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white"
                            }`}
                        >
                            {t("nav_home")}
                        </Link>
                        <Link
                            href="/catalog"
                            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                                isActive("/catalog")
                                    ? "text-[#2699fb] font-bold"
                                    : "text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white"
                            }`}
                        >
                            {t("nav_catalog")}
                        </Link>
                        <Link
                            href="/magazines"
                            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                                isActive("/magazines")
                                    ? "text-[#2699fb] font-bold"
                                    : "text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white"
                            }`}
                        >
                            {t("nav_magazine")}
                        </Link>

                        {/* Mega Menu Dropdown */}
                        <MegaMenu currentUrl={url} label="Jelajahi" />

                        <Link
                            href="/contact"
                            className={`rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-all ${
                                isActive("/contact")
                                    ? "text-[#2699fb] font-bold"
                                    : "text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white"
                            }`}
                        >
                            {t("nav_contact")}
                        </Link>
                    </nav>

                    {/* Right actions */}
                    <div className="hidden items-center gap-2 sm:flex">
                        {/* Language Selector Dropdown */}
                        <div className="relative" ref={langDropdownRef}>
                            <Tooltip content="Ganti Bahasa / Switch Language" position="bottom">
                                <button
                                    type="button"
                                    onClick={() => setLangOpen(!langOpen)}
                                    aria-label="Ganti bahasa / Switch language"
                                    className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-2.5 py-1 text-xs font-semibold text-[#152238] hover:bg-gray-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                                >
                                    <span className="text-sm">{langFlags[lang].flag}</span>
                                    <span>{langFlags[lang].label}</span>
                                </button>
                            </Tooltip>
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
                        <Tooltip content={darkMode ? t("theme_light") : t("theme_dark")} position="bottom">
                            <button
                                type="button"
                                onClick={toggleTheme}
                                aria-label={darkMode ? t("theme_light") : t("theme_dark")}
                                className="grid size-9 place-items-center rounded-full text-[#64748b] transition hover:bg-gray-100 hover:text-[#152238] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                {darkMode ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} />}
                            </button>
                        </Tooltip>

                        {/* Animated Search Bar */}
                        <SearchBar placeholder={t("nav_search_placeholder")} />

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
                        <HamburgerButton
                            isOpen={mobileOpen}
                            onClick={() => setMobileOpen(!mobileOpen)}
                            ariaLabel="Menu Navigasi Mobile"
                        />
                    </div>
                </div>

                {/* Mobile Backdrop Overlay (Smooth fade) */}
                <div
                    className={`fixed inset-x-0 top-[72px] bottom-0 z-30 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 lg:hidden ${
                        mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
                    onClick={() => setMobileOpen(false)}
                    aria-hidden="true"
                />

                {/* Mobile menu drawer with smooth height expansion */}
                <div
                    className={`mobile-menu-drawer relative z-40 border-t border-gray-100 bg-white/95 backdrop-blur-md dark:border-slate-800 dark:bg-[#090d16]/95 lg:hidden ${
                        mobileOpen ? "is-open border-b shadow-xl" : ""
                    }`}
                >
                    <div className="overflow-hidden">
                        <div className="px-5 py-4 max-h-[calc(100vh-76px)] overflow-y-auto space-y-4">
                            {/* Language switcher with stagger */}
                            <div
                                style={{
                                    transitionDelay: mobileOpen ? "25ms" : "0ms",
                                }}
                                className={`flex items-center justify-between rounded-xl bg-gray-50 p-2.5 dark:bg-slate-800/80 transition-all duration-300 ease-out transform ${
                                    mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                                }`}
                            >
                                <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-slate-300">
                                    <Globe size={14} /> Bahasa:
                                </span>
                                <div className="flex gap-1">
                                    {(["id", "en", "de"] as Language[]).map((l) => (
                                        <button
                                            key={l}
                                            type="button"
                                            onClick={() => setLanguage(l)}
                                            className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all ${
                                                lang === l
                                                    ? "bg-[#2699fb] text-white shadow-xs"
                                                    : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
                                            }`}
                                        >
                                            {langFlags[l].flag} {l.toUpperCase()}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Links with Icons & Staggered Slide-In */}
                            <div className="space-y-1">
                                <p
                                    style={{
                                        transitionDelay: mobileOpen ? "40ms" : "0ms",
                                    }}
                                    className={`px-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 transition-all duration-300 ease-out transform ${
                                        mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                                    }`}
                                >
                                    Menu Utama & Eksplorasi
                                </p>
                                <nav className="grid gap-1">
                                    {mobileNavItems.map((item, idx) => {
                                        const active = isActive(item.href);
                                        const IconComponent = item.icon;
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                onClick={() => setMobileOpen(false)}
                                                style={{
                                                    transitionDelay: mobileOpen ? `${(idx + 2) * 35}ms` : "0ms",
                                                }}
                                                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] transform ${
                                                    mobileOpen
                                                        ? "opacity-100 translate-x-0"
                                                        : "opacity-0 -translate-x-5 pointer-events-none"
                                                } ${
                                                    active
                                                        ? "bg-blue-50/80 text-[#2699fb] font-bold dark:bg-blue-950/60 dark:text-[#38bdf8]"
                                                        : "text-[#475569] hover:bg-gray-50 hover:text-[#152238] dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span
                                                        className={`grid size-8 place-items-center rounded-lg transition-colors ${
                                                            active
                                                                ? "bg-[#2699fb] text-white shadow-xs"
                                                                : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                                                        }`}
                                                    >
                                                        <IconComponent size={16} />
                                                    </span>
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronRight
                                                    size={15}
                                                    className={`transition-transform duration-200 ${
                                                        active
                                                            ? "text-[#2699fb] translate-x-0.5"
                                                            : "text-gray-300 opacity-60 dark:text-slate-600"
                                                    }`}
                                                />
                                            </Link>
                                        );
                                    })}
                                </nav>
                            </div>

                            {/* Mobile Account Section with Stagger */}
                            <div
                                style={{
                                    transitionDelay: mobileOpen ? `${(mobileNavItems.length + 2) * 35}ms` : "0ms",
                                }}
                                className={`border-t border-gray-100 pt-3 dark:border-slate-800 transition-all duration-300 ease-out transform ${
                                    mobileOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
                                }`}
                            >
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
                                                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-[#152238] shadow-xs hover:border-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            >
                                                <BookOpen size={16} className="text-[#2699fb]" />
                                                <span>Ruang Saya (Dashboard)</span>
                                            </Link>

                                            {isAdminOrLibrarian && (
                                                <Link
                                                    href="/admin-panel"
                                                    onClick={() => setMobileOpen(false)}
                                                    className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2.5 text-xs font-bold text-[#2699fb] shadow-xs hover:bg-blue-100/60 dark:border-blue-900 dark:bg-blue-950/60 dark:text-blue-300"
                                                >
                                                    <Shield size={16} />
                                                    <span>Admin Panel Perpustakaan</span>
                                                </Link>
                                            )}

                                            <Link
                                                href="/profile"
                                                onClick={() => setMobileOpen(false)}
                                                className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2.5 text-xs font-bold text-[#152238] shadow-xs hover:border-[#2699fb] dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                                            >
                                                <UserCog size={16} className="text-slate-500 dark:text-slate-400" />
                                                <span>Pengaturan Profil</span>
                                            </Link>

                                            <Link
                                                method="post"
                                                as="button"
                                                href="/logout"
                                                onClick={() => setMobileOpen(false)}
                                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-rose-50 px-3.5 py-2.5 text-xs font-bold text-rose-700 border border-rose-200 hover:bg-rose-100/70 dark:bg-rose-950/50 dark:border-rose-900/60 dark:text-rose-300 transition"
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
                                        className="flex items-center justify-center gap-2 w-full rounded-full bg-[#2699fb] px-4 py-2.5 text-center text-sm font-bold text-white shadow-sm transition hover:bg-[#1783df] active:scale-98"
                                    >
                                        <User size={16} />
                                        <span>{t("nav_login")}</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ── MAIN CONTENT (with page transition) ── */}
            <main
                className={`flex-1 transition-all ${
                    pageTransition === "enter"
                        ? "page-transition-active"
                        : "page-transition-exit"
                }`}
            >
                {children}
            </main>

            {/* ── REDESIGNED RICH FOOTER ── */}
            <footer className="relative bg-[#152238] text-white dark:bg-[#05070c] border-t border-slate-800/80">
                <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-8 lg:px-10">
                    {/* Top Stats Banner */}
                    <div className="mb-12 rounded-2xl border border-slate-700/60 bg-slate-900/50 p-6 backdrop-blur-xs">
                        <div className="grid grid-cols-1 divide-y divide-slate-800 sm:grid-cols-3 sm:divide-y-0 sm:divide-x sm:divide-slate-800 text-center gap-4 sm:gap-0">
                            <div className="px-4 py-2">
                                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#2699fb]">1.200+</p>
                                <p className="mt-1 text-xs text-slate-400 font-medium">{t("footer_stat_books")}</p>
                            </div>
                            <div className="px-4 py-2">
                                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFC533]">40+</p>
                                <p className="mt-1 text-xs text-slate-400 font-medium">{t("footer_stat_cats")}</p>
                            </div>
                            <div className="px-4 py-2">
                                <p className="font-display text-2xl sm:text-3xl font-extrabold text-[#FF8E4F]">950+</p>
                                <p className="mt-1 text-xs text-slate-400 font-medium">{t("footer_stat_members")}</p>
                            </div>
                        </div>
                    </div>

                    {/* Columns Grid */}
                    <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
                        {/* Brand & Address */}
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
                            <p className="mt-4 max-w-sm text-xs leading-relaxed text-slate-400">
                                {t('footer_brand_desc')}
                            </p>
                            <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                                <MapPin size={15} className="text-[#2699fb] shrink-0 mt-0.5" />
                                <span>{t('footer_address_val')}</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                <Phone size={14} className="text-[#2699fb] shrink-0" />
                                <span>(0752) 21107 · 0812-6789-0123</span>
                            </div>
                            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
                                <Mail size={14} className="text-[#2699fb] shrink-0" />
                                <span>perpustakaan@sman1bukittinggi.sch.id</span>
                            </div>
                        </div>

                        {/* Links 1: Koleksi */}
                        <div>
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">{t('footer_col_reading')}</h4>
                            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                                <li><Link href="/catalog" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_catalog')}</Link></li>
                                <li><Link href="/magazines" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_genta')}</Link></li>
                                <li><Link href="/magazines?type=bulletin" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_kurtaw')}</Link></li>
                                <li><Link href="/karya-smansa" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_works')}</Link></li>
                            </ul>
                        </div>

                        {/* Links 2: Layanan */}
                        <div>
                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">{t('footer_col_services')}</h4>
                            <ul className="mt-4 space-y-2.5 text-xs text-slate-400">
                                <li><Link href="/events" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_events')}</Link></li>
                                <li><Link href="/ranking" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_ranking')}</Link></li>
                                <li><Link href="/information" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_info')}</Link></li>
                                <li><Link href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition">{t('footer_link_contact')}</Link></li>
                            </ul>
                        </div>

                        {/* Operasional & Fast Back to top */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h4 className="font-display text-xs font-bold uppercase tracking-wider text-blue-300">{t('footer_col_hours')}</h4>
                                <div className="mt-4 space-y-2 text-xs text-slate-400">
                                    <p>{t('footer_hours_mon_thu')}</p>
                                    <p>{t('footer_hours_fri')}</p>
                                    <p>{t('footer_hours_sat')}</p>
                                    <p className="pt-2 text-[11px] text-amber-300 font-medium">{t('footer_hours_online')}</p>
                                </div>
                            </div>

                            {/* Back to top button */}
                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                                    className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-2 text-xs font-bold text-slate-300 transition hover:border-[#2699fb] hover:bg-[#2699fb] hover:text-white"
                                >
                                    <ArrowUp size={14} />
                                    <span>{t("footer_back_to_top")}</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Copyright */}
                    <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row text-xs text-slate-400">
                        <p>© {new Date().getFullYear()} Perpustakaan Sunaryaman Musthofa SMA Negeri 1 Bukittinggi. {t('footer_copyright')}</p>
                        <p className="font-mono text-[10px] text-slate-500">
                            NPSN 10303496 · {t('footer_system_label')}
                        </p>
                    </div>
                </div>
                {/* Solid bottom accent strip */}
                <div className="h-9 w-full bg-[#080d17] border-t border-slate-900/90" />
            </footer>
        </div>
        </ScrollRevealProvider>
        </ToastProvider>
    );
}

export default SiteShell;
