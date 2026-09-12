import { Head, Link } from '@inertiajs/react';
import { Calendar, Headphones, Mic2, Radio, Star } from 'lucide-react';
import { useState } from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';
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
        if (type === 'event')   return 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300';
        if (type === 'duta')    return 'bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300';
        if (type === 'podcast') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300';
        return '';
    };

    return (
        <SiteShell>
            <Head title="Event, Duta & Podcast - Perpustakaan SMAN 1 Bukittinggi" />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                {/* Hero */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-gradient-to-r from-[#7c3aed] to-[#123B5D] px-6 py-16 text-white sm:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-center gap-3">
                            <Radio size={32} className="text-[#facc15]" />
                            <div>
                                <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Event, Duta & Podcast</h1>
                                <p className="mt-1 text-white/80">Kegiatan, inspirasi, dan suara dari komunitas Smansa</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 sm:px-8">
                    <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto py-3">
                        {tabs.map(({ key, label, icon: Icon, count }) => (
                            <button
                                key={key}
                                onClick={() => setTab(key)}
                                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                                    tab === key
                                        ? 'bg-[#123B5D] text-white shadow-sm'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{label}</span>
                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                    tab === key ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
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
                                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                            >
                                {/* Cover */}
                                <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
                                    {item.cover_image ? (
                                        <img src={item.cover_image} alt={item.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    ) : (
                                        <div className="grid h-full place-items-center">
                                            {item.type === 'podcast' ? <Headphones size={40} className="text-slate-300" /> :
                                             item.type === 'duta'    ? <Mic2 size={40} className="text-slate-300" /> :
                                                                        <Calendar size={40} className="text-slate-300" />}
                                        </div>
                                    )}
                                </div>
                                {/* Content */}
                                <div className="flex flex-1 flex-col p-5">
                                    <span className={`inline-block rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${typeColor(item.type)}`}>
                                        {item.type === 'event' ? 'Event' : item.type === 'duta' ? 'Duta Perpustakaan' : 'Podcast'}
                                    </span>
                                    <h3 className="mt-3 font-display text-base font-bold leading-snug text-[#0F172A] dark:text-white group-hover:text-[#123B5D] dark:group-hover:text-blue-400 transition-colors">
                                        {item.title}
                                    </h3>
                                    {item.description && (
                                        <p className="mt-2 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">{item.description}</p>
                                    )}
                                    <div className="mt-auto pt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400 dark:text-slate-500">
                                        {item.event_date && <span>{new Date(item.event_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>}
                                        {item.location && <span>{item.location}</span>}
                                        {item.host_name && <span>Host: {item.host_name}</span>}
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
