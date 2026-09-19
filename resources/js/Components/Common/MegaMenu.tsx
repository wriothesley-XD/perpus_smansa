import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import {
    Award,
    BookOpen,
    Calendar,
    ChevronDown,
    ChevronRight,
    Flame,
    Info,
    LayoutDashboard,
    Newspaper,
    Phone,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import { useI18n } from "../../utils/i18n";

interface MegaMenuProps {
    currentUrl: string;
    label?: string;
}

export function MegaMenu({ currentUrl, label }: MegaMenuProps) {
    const { t } = useI18n();
    const displayLabel = label || t("nav_explore");
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Keep hover state open with a small debounce so moving between button and dropdown never breaks
    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 160);
    };

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    // Check if any link inside mega menu is currently active
    const isActive = (href: string) => {
        if (href === "/") return currentUrl === "/";
        return currentUrl.startsWith(href);
    };

    const isAnyChildActive = [
        "/catalog",
        "/magazines",
        "/events",
        "/karya-smansa",
        "/ranking",
        "/information",
        "/contact",
    ].some((p) => currentUrl.startsWith(p));

    const categories = [
        {
            title: t("mega_cat_reading"),
            items: [
                {
                    label: "Katalog Buku",
                    desc: "Peminjaman buku fisik & koleksi digital",
                    href: "/catalog",
                    icon: BookOpen,
                    color: "bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-[#38bdf8]",
                },
                {
                    label: "E-Magazine",
                    desc: "Majalah sekolah edisi digital berkala",
                    href: "/magazines",
                    icon: Newspaper,
                    color: "bg-amber-50 text-[#FF8E4F] dark:bg-amber-950/60 dark:text-amber-300",
                },
                {
                    label: "Buku Terpopuler",
                    desc: "Koleksi paling sering dipinjam siswa",
                    href: "/ranking",
                    icon: Flame,
                    color: "bg-rose-50 text-rose-500 dark:bg-rose-950/60 dark:text-rose-300",
                },
            ],
        },
        {
            title: t("mega_cat_community"),
            items: [
                {
                    label: "Agenda Event",
                    desc: "Jadwal kegiatan literasi & workshop",
                    href: "/events",
                    icon: Calendar,
                    color: "bg-indigo-50 text-indigo-500 dark:bg-indigo-950/60 dark:text-indigo-300",
                },
                {
                    label: "Karya Siswa & Guru",
                    desc: "Puisi, cerpen, esai & artikel ilmiah",
                    href: "/karya-smansa",
                    icon: Sparkles,
                    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300",
                },
                {
                    label: "Peringkat Pembaca",
                    desc: "Leaderboard & rekap sirkulasi anggota",
                    href: "/ranking",
                    icon: Award,
                    color: "bg-yellow-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300",
                },
            ],
        },
        {
            title: t("mega_cat_services"),
            items: [
                {
                    label: "Informasi & Profil",
                    desc: "Tata tertib & panduan perpustakaan",
                    href: "/information",
                    icon: Info,
                    color: "bg-sky-50 text-[#2699fb] dark:bg-sky-950/60 dark:text-sky-300",
                },
                {
                    label: "Hubungi Kami",
                    desc: "Bantuan sirkulasi & pesan pustakawan",
                    href: "/contact",
                    icon: Phone,
                    color: "bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-300",
                },
                {
                    label: "Ruang Saya",
                    desc: "Dashboard akun & histori bacaan",
                    href: "/dashboard",
                    icon: LayoutDashboard,
                    color: "bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300",
                },
            ],
        },
    ];

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Trigger Button */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                className={`nav-underline-link group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold ${
                    isOpen || isAnyChildActive
                        ? "is-active text-[#2699fb] font-bold"
                        : "text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white"
                }`}
            >
                <span>{displayLabel}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ease-out ${
                        isOpen ? "rotate-180 text-[#2699fb]" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-400"
                    }`}
                />
            </button>

            {/* Mega Menu Dropdown Panel */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[740px] transition-all duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto visible"
                        : "opacity-0 translate-y-2 pointer-events-none invisible"
                }`}
            >
                <div className="overflow-hidden rounded-3xl border border-gray-100/90 bg-white/98 p-6 shadow-2xl backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f172a]/98">
                    {/* Multi-Column Category Grid */}
                    <div className="grid grid-cols-3 gap-6">
                        {categories.map((cat) => (
                            <div key={cat.title} className="space-y-3">
                                {/* Category Header */}
                                <div className="border-b border-gray-100 pb-2 dark:border-slate-800">
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2699fb]">
                                        {cat.title}
                                    </span>
                                </div>

                                {/* Menu Items */}
                                <div className="space-y-1">
                                    {cat.items.map((item) => {
                                        const active = isActive(item.href);
                                        const IconComponent = item.icon;
                                        return (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                onClick={() => setIsOpen(false)}
                                                className={`group flex items-start gap-3 rounded-2xl p-2.5 transition-all duration-200 ${
                                                    active
                                                        ? "bg-blue-50/70 dark:bg-blue-950/40"
                                                        : "hover:bg-gray-50 dark:hover:bg-slate-800/60"
                                                }`}
                                            >
                                                <span
                                                    className={`grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-200 group-hover:scale-105 ${item.color}`}
                                                >
                                                    <IconComponent size={17} />
                                                </span>
                                                <div className="min-w-0 flex-1">
                                                    <p
                                                        className={`text-xs font-bold leading-snug transition-colors ${
                                                            active
                                                                ? "text-[#2699fb] dark:text-[#38bdf8]"
                                                                : "text-[#152238] group-hover:text-[#2699fb] dark:text-slate-100 dark:group-hover:text-white"
                                                        }`}
                                                    >
                                                        {item.label}
                                                    </p>
                                                    <p className="mt-0.5 line-clamp-1 text-[11px] text-slate-400 dark:text-slate-400">
                                                        {item.desc}
                                                    </p>
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Featured Promotional Banner at Bottom */}
                    <div className="mt-6 border-t border-gray-100 pt-4 dark:border-slate-800">
                        <div className="flex items-center justify-between rounded-2xl border border-blue-100/70 bg-gradient-to-r from-blue-50/90 via-sky-50/40 to-amber-50/60 p-3.5 dark:border-slate-800 dark:from-slate-800/80 dark:via-slate-800/50 dark:to-slate-900/60">
                            <div className="flex items-center gap-3">
                                <span className="grid size-8 place-items-center rounded-xl bg-[#2699fb] text-white shadow-xs">
                                    <Newspaper size={15} />
                                </span>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-[#FF8E4F] px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-white">
                                            {t("mega_promo_badge")}
                                        </span>
                                        <p className="text-xs font-bold text-[#152238] dark:text-white">
                                            {t("mega_promo_title")}
                                        </p>
                                    </div>
                                    <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                                        {t("mega_promo_desc")}
                                    </p>
                                </div>
                            </div>

                            <Link
                                href="/magazines"
                                onClick={() => setIsOpen(false)}
                                className="inline-flex items-center gap-1.5 rounded-full bg-[#2699fb] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#1783df] hover:gap-2 active:scale-95 shrink-0"
                            >
                                <span>{t("mega_promo_cta")}</span>
                                <ArrowRight size={13} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MegaMenu;
