import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Headphones, MapPin, Mic2 } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Event } from '../../types/library';

interface EventShowProps {
    event: Event;
}

export default function EventShow({ event }: EventShowProps) {
    const isPodcast = event.type === 'podcast';

    return (
        <SiteShell>
            <Head title={`${event.title} - Perpustakaan SMAN 1 Bukittinggi`} />

            <div className="min-h-screen bg-white dark:bg-slate-900">
                <div className="mx-auto max-w-4xl px-6 py-10 sm:px-8">
                    <Link href="/events" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B4EA2] dark:text-blue-400 hover:gap-3 transition-all">
                        <ArrowLeft size={16} /> Kembali ke Daftar
                    </Link>

                    <div className="mt-6">
                        <span className={`inline-block rounded-lg px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                            event.type === 'event' ? 'bg-blue-100 text-blue-800' :
                            event.type === 'duta'  ? 'bg-purple-100 text-purple-800' :
                                                     'bg-amber-100 text-amber-800'
                        }`}>
                            {event.type === 'event' ? 'Event' : event.type === 'duta' ? 'Duta Perpustakaan' : 'Podcast'}
                        </span>

                        <h1 className="mt-4 font-display text-3xl font-extrabold leading-tight text-[#0F172A] dark:text-white sm:text-4xl">
                            {event.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                            {event.event_date && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} />
                                    {new Date(event.event_date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                                    {event.event_time && ` • ${event.event_time}`}
                                </span>
                            )}
                            {event.location && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} />
                                    {event.location}
                                </span>
                            )}
                            {event.host_name && (
                                <span className="flex items-center gap-1.5">
                                    <Mic2 size={14} />
                                    Host: {event.host_name}
                                </span>
                            )}
                        </div>
                    </div>

                    {event.cover_image && (
                        <div className="mt-8 overflow-hidden rounded-2xl">
                            <img src={event.cover_image} alt={event.title} className="h-72 w-full object-cover sm:h-96" />
                        </div>
                    )}

                    {/* Podcast Player */}
                    {isPodcast && event.podcast_url && (
                        <div className="mt-8 flex items-center gap-4 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-5">
                            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700">
                                <Headphones size={24} />
                            </span>
                            <div className="flex-1">
                                <p className="font-semibold text-[#0F172A] dark:text-white">Dengarkan Episode Ini</p>
                                <a href={event.podcast_url} target="_blank" rel="noopener noreferrer"
                                    className="mt-1 break-all text-sm text-[#0B4EA2] dark:text-blue-400 hover:underline">
                                    {event.podcast_url}
                                </a>
                            </div>
                        </div>
                    )}

                    {event.description && (
                        <div className="prose prose-slate dark:prose-invert mt-8 max-w-none">
                            <p className="text-base leading-relaxed text-slate-700 dark:text-slate-300 whitespace-pre-line">{event.description}</p>
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
