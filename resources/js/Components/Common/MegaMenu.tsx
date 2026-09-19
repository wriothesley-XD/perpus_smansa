import React, { useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    Info,
    Sparkles,
    Trophy,
} from 'lucide-react';
import { useI18n } from '../../utils/i18n';

interface MegaMenuProps {
    currentUrl: string;
    label?: string;
}

export function MegaMenu({ currentUrl, label }: MegaMenuProps) {
    const { t } = useI18n();
    const displayLabel = label || t('nav_explore');
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 160);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsOpen(false);
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const isActive = (href: string) => currentUrl.startsWith(href);

    const isAnyChildActive = [
        '/ranking',
        '/karya-smansa',
        '/events',
        '/information',
    ].some((p) => currentUrl.startsWith(p));

    const menuItems = [
        {
            label: 'Peringkat & Buku Populer',
            desc: 'Leaderboard pembaca aktif & buku terfavorit',
            href: '/ranking',
            icon: Trophy,
            color: 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300',
        },
        {
            label: 'Karya Siswa & Guru',
            desc: 'Puisi, cerpen, esai & artikel civitas SMANSA',
            href: '/karya-smansa',
            icon: Sparkles,
            color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300',
        },
        {
            label: 'Agenda, Duta & Podcast',
            desc: 'Jadwal literasi, duta baca & rekaman podcast',
            href: '/events',
            icon: Calendar,
            color: 'bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300',
        },
        {
            label: 'Profil & Informasi',
            desc: 'Sejarah, fasilitas, tata tertib & pustakawan',
            href: '/information',
            icon: Info,
            color: 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300',
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
                className={`nav-underline-link group inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                    isOpen || isAnyChildActive
                        ? 'is-active text-[#2699fb] font-bold'
                        : 'text-[#64748b] hover:text-[#152238] dark:text-slate-300 dark:hover:text-white'
                }`}
            >
                <span>{displayLabel}</span>
                <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ease-out ${
                        isOpen ? 'rotate-180 text-[#2699fb]' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400'
                    }`}
                />
            </button>

            {/* Dropdown Panel */}
            <div
                className={`absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50 w-[520px] transition-all duration-200 ease-out ${
                    isOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto visible'
                        : 'opacity-0 translate-y-2 pointer-events-none invisible'
                }`}
            >
                <div className="overflow-hidden rounded-2xl border border-gray-100/90 bg-white/98 p-4 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-[#0f172a]/98">
                    <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2.5 px-1 dark:border-slate-800">
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2699fb]">
                            Eksplorasi SMANSA
                        </span>
                        <span className="text-[10px] font-medium text-slate-400">
                            4 Menu Pilihan
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                        {menuItems.map((item) => {
                            const active = isActive(item.href);
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`group flex items-start gap-3 rounded-xl p-3 transition-all duration-200 ${
                                        active
                                            ? 'bg-blue-50/80 dark:bg-blue-950/40'
                                            : 'hover:bg-gray-50 dark:hover:bg-slate-800/60'
                                    }`}
                                >
                                    <span
                                        className={`grid size-9 shrink-0 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-105 ${item.color}`}
                                    >
                                        <IconComponent size={17} />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center justify-between">
                                            <p
                                                className={`text-xs font-bold leading-snug transition-colors ${
                                                    active
                                                        ? 'text-[#2699fb] dark:text-[#38bdf8]'
                                                        : 'text-[#152238] group-hover:text-[#2699fb] dark:text-slate-100 dark:group-hover:text-[#38bdf8]'
                                                }`}
                                            >
                                                {item.label}
                                            </p>
                                            <ChevronRight
                                                size={12}
                                                className="text-slate-300 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all dark:text-slate-600"
                                            />
                                        </div>
                                        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-slate-500 dark:text-slate-400">
                                            {item.desc}
                                        </p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MegaMenu;
