import { Head, Link } from '@inertiajs/react';
import { Calendar, Headphones, Mic2, Star } from 'lucide-react';
import { useState } from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { BrushUnderline } from '../../Components/Common/Ornaments';
import { Event } from '../../types/library';

interface EventIndexProps {
    events: Event[];
    dutas: Event[];
    podcasts: Event[];
}

type Tab = 'all' | 'event' | 'duta' | 'podcast';

export default function EventIndex({ events, dutas, podcasts }: EventIndexProps) {
    const [tab, setTab] = useState<Tab>('all');

    const allItems = [...events, ...dutas, ...podcasts].sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    const displayed = tab === 'all' ? allItems
        : tab === 'event' ? events
        : tab === 'duta' ? dutas
        : podcasts;

    const tabs: { key: Tab; label: string; icon: typeof Calendar; count: number }[] = [
        { key: 'all',     label: 'Semua',   icon: Star,      count: allItems.length },
        { key: 'event',   label: 'Event',   icon: Calendar,  count: events.length },
        { key: 'duta',    label: 'Duta',    icon: Mic2,      count: dutas.length },
        { key: 'podcast', label: 'Podcast', icon: Headphones, count: podcasts.length },
    ];

    const typeColor = (type: string) => {
        if (type === 'event')   return 'bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300';
        if (type === 'duta')    return 'bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300';
        if (type === 'podcast') return 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300';
        return '';
    };

    return (
        <SiteShell>
            <Head title="Event, Duta & Podcast — Perpustakaan Sunaryaman Musthofa" />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                {/* Clean Hero */}
                <div className="border-b border-gray-100 bg-white px-6 pt-12 pb-10 dark:border-slate-800/80 dark:bg-[#090d16] sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">
                            Komunitas & Literasi
                        </span>
                        <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                            Event, Duta &{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">Podcast</span>
                                <BrushUnderline />
                            </span>
                        </h1>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#64748b] dark:text-slate-300">
                            Ragam kegiatan literasi, inspirasi duta perpustakaan, dan siaran siniar suara komunitas SMAN 1 Bukittinggi.
                        </p>
                    </div>
                </div>

                {/* Pill Tabs */}
                <div className="border-b border-gray-100 bg-[#f8fafc] px-6 dark:border-slate-800/80 dark:bg-[#0c121e] sm:px-8">
                    <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto py-3.5">
                        {tabs.map(({ key, label, icon: Icon, count }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                                    tab === key
                                        ? 'bg-[#2699fb] text-white shadow-xs'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                                }`}
                            >
                                <Icon size={14} />
                                <span>{label}</span>
                                <span className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${
                                    tab === key ? 'bg-white/25 text-white' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-slate-400'
                                }`}>{count}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid */}
                <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
                    {displayed.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 p-16 text-center text-sm text-slate-500">
                            Belum ada konten pada kategori ini.
                        </div>
                    )}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {displayed.map((item) => (
                            <Link
                                key={item.id}
                                href={`/events/${item.slug}`}
                                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white p-3 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg dark:border-slate-800 dark:bg-[#121826]"
                            >
                                {/* Cover */}
                                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-slate-800">
                                    {item.cover_image ? (
                                        <img src={item.cover_image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="grid h-full place-items-center bg-gray-50 dark:bg-slate-800/80">
                                            {item.type === 'podcast' ? <Headphones size={36} className="text-gray-300" /> :
                                             item.type === 'duta'    ? <Mic2 size={36} className="text-gray-300" /> :
                                                                        <Calendar size={36} className="text-gray-300" />}
                                        </div>
                                    )}
                                </div>
                                {/* Content */}
                                <div className="flex flex-1 flex-col pt-3 pb-1 px-1">
                                    <span className={`inline-block w-fit rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${typeColor(item.type)}`}>
                                        {item.type === 'event' ? 'Event' : item.type === 'duta' ? 'Duta Perpustakaan' : 'Podcast'}
                                    </span>
                                    <h3 className="mt-2 font-display text-base font-bold leading-snug text-[#152238] transition-colors group-hover:text-[#2699fb] dark:text-white dark:group-hover:text-[#38bdf8]">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="mt-1.5 line-clamp-2 text-xs text-[#64748b] dark:text-slate-400">{item.description}</p>
                                    )}
                                    <div className="mt-auto pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 text-[11px] text-gray-400 dark:border-slate-800/60 dark:text-slate-500">
                                        <span>{item.event_date ? new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : (item.location || "SMAN 1 Bukittinggi")}</span>
                                        <span className="font-bold text-[#2699fb]">Lihat Detail →</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
