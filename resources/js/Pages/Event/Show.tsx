import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Headphones, MapPin, Mic2, Sparkles } from 'lucide-react';
import { SiteShell } from '../../Components/Common/SiteShell';
import { Event } from '../../types/library';

interface EventShowProps {
    event: Event;
}

export default function EventShow({ event }: EventShowProps) {
    const isPodcast = event.type === 'podcast';

    return (
        <SiteShell>
            <Head title={`${event.title} - Agenda & Podcast SMANSA`} />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                {/* Top Nav Bar */}
                <div className="border-b border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                    <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-3.5 sm:px-8">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#152238] dark:text-slate-400 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Kembali ke Agenda & Podcast</span>
                        </Link>

                        <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                            event.type === 'event'
                                ? 'bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300'
                                : event.type === 'duta'
                                ? 'bg-yellow-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                                : 'bg-amber-50 text-[#FF8E4F] dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                            {event.type === 'event' ? 'Event Literasi' : event.type === 'duta' ? 'Duta Baca' : 'Podcast Perpustakaan'}
                        </span>
                    </div>
                </div>

                <div className="mx-auto max-w-3xl px-6 py-12 sm:px-8">
                    <div>
                        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.2] text-[#0F172A] dark:text-white">
                            {event.title}
                        </h1>

                        <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-6">
                            {event.event_date && (
                                <span className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-[#2699fb]" />
                                    <span>
                                        {new Date(event.event_date).toLocaleDateString('id-ID', {
                                             weekday: 'long',
                                             day: 'numeric',
                                             month: 'long',
                                             year: 'numeric',
                                        })}
                                        {event.event_time && ` • ${event.event_time}`}
                                    </span>
                                </span>
                            )}
                            {event.location && (
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-[#2699fb]" />
                                    <span>{event.location}</span>
                                </span>
                            )}
                            {event.host_name && (
                                <span className="flex items-center gap-1.5">
                                    <Mic2 size={14} className="text-[#FF8E4F]" />
                                    <span>Host: {event.host_name}</span>
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Cover Image */}
                    {event.cover_image && (
                        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200/80 shadow-sm dark:border-slate-800">
                            <img src={event.cover_image} alt={event.title} className="h-72 w-full object-cover sm:h-96" />
                        </div>
                    )}

                    {/* Podcast Player */}
                    {isPodcast && event.podcast_url && (
                        <div className="mt-8 flex items-center gap-5 rounded-2xl border border-amber-200/80 bg-amber-50/50 p-6 shadow-xs dark:border-amber-900/60 dark:bg-amber-950/40">
                            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-[#FF8E4F] shadow-xs dark:bg-slate-800 dark:text-amber-400">
                                <Headphones size={24} />
                            </span>
                            <div className="flex-1">
                                <p className="font-display text-sm font-bold text-[#0F172A] dark:text-white">Dengarkan Episode Podcast Ini</p>
                                <audio controls preload="metadata" className="mt-3 w-full" src={event.podcast_url}>
                                    Browser Anda belum mendukung pemutar audio ini.
                                </audio>
                                <a
                                    href={event.podcast_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 inline-block text-xs font-bold text-[#2699fb] hover:underline"
                                >
                                    Buka Sumber Audio Eksternal ↗
                                </a>
                            </div>
                        </div>
                    )}

                    {/* Description Content */}
                    {event.description && (
                        <div className="mt-8 leading-relaxed">
                            <p className="text-base sm:text-lg leading-[1.9] text-slate-700 dark:text-slate-300 whitespace-pre-line">
                                {event.description}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </SiteShell>
    );
}
