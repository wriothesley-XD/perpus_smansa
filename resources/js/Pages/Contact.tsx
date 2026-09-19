import { Head } from '@inertiajs/react';
import { ArrowUpRight, Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
import { BrushUnderline, DotCluster, SparkleFourPoint } from '../Components/Common/Ornaments';
import { SiteShell } from '../Components/Common/SiteShell';

interface ContactProps {
    settings: {
        library_name: string;
        library_address: string;
        operating_hours: string;
        contact_email: string;
        contact_phone: string;
        instagram: string;
    };
}

export default function Contact({ settings }: ContactProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    return (
        <SiteShell>
            <Head title="Kontak — Perpustakaan Sunaryaman Musthofa" />

            <div className="min-h-screen bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                
                {/* 1. Header Section */}
                <section className="relative px-6 pt-12 pb-14 sm:px-10 dark:bg-[#090d16]">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">
                                    Layanan & Informasi
                                </span>

                                <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#152238] dark:text-white">
                                    Kami siap{" "}
                                    <span className="relative inline-block">
                                        <span className="relative z-10">membantu</span>
                                        <BrushUnderline />
                                    </span>
                                </h1>

                                <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-[#64748b] dark:text-slate-300">
                                    Pertanyaan mengenai koleksi, sirkulasi, donasi buku, atau reservasi ruang baca? Hubungi pustakawan kami kapan saja.
                                </p>
                            </div>

                            {/* Right Photo Card */}
                            <div className="relative mx-auto w-full max-w-sm">
                                <SparkleFourPoint size={18} color="#FFC533" className="absolute -top-3 -left-3 z-10" />
                                <DotCluster color="#FF8E4F" className="absolute -bottom-3 -right-3 z-10 opacity-70" />
                                <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-xl ring-2 ring-gray-100 dark:border-slate-800 dark:bg-[#121826] dark:ring-slate-800">
                                    <img
                                        src="/images/about_building.jpg"
                                        alt="Gedung Perpustakaan SMAN 1 Bukittinggi"
                                        className="h-48 sm:h-56 w-full rounded-2xl object-cover"
                                    />
                                    <div className="p-3 text-center">
                                        <p className="font-display text-xs font-bold text-[#152238] dark:text-white">
                                            Gedung Perpustakaan Sunaryaman Musthofa
                                        </p>
                                        <p className="text-[10px] text-gray-400 dark:text-slate-400">
                                            Kampus Landbouw SMA Negeri 1 Bukittinggi
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Details & Form Grid */}
                        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr]">
                            
                            {/* Left: Contact Info + Map */}
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Alamat */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                                <MapPin size={16} />
                                            </div>
                                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Alamat
                                            </h4>
                                        </div>
                                        <p className="mt-3 text-xs leading-relaxed text-[#152238] dark:text-slate-200">
                                            {settings.library_address || 'Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi, Sumatera Barat 26115'}
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-300">
                                                <Mail size={16} />
                                            </div>
                                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Email
                                            </h4>
                                        </div>
                                        <p className="mt-3 text-xs font-semibold text-[#152238] dark:text-slate-200 truncate">
                                            {settings.contact_email || 'perpustakaan@sman1bukittinggi.sch.id'}
                                        </p>
                                    </div>

                                    {/* Telepon */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/60 dark:text-purple-300">
                                                <Phone size={16} />
                                            </div>
                                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Telepon
                                            </h4>
                                        </div>
                                        <p className="mt-3 text-xs font-semibold text-[#152238] dark:text-slate-200">
                                            {settings.contact_phone || '(0752) 21045'}
                                        </p>
                                    </div>

                                    {/* Jam Operasional */}
                                    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                        <div className="flex items-center gap-3">
                                            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                                                <Clock3 size={16} />
                                            </div>
                                            <h4 className="font-display text-xs font-bold uppercase tracking-wider text-gray-400">
                                                Jam Layanan
                                            </h4>
                                        </div>
                                        <p className="mt-3 text-xs leading-relaxed text-[#152238] dark:text-slate-200">
                                            Senin – Jumat: 07.30 – 15.30 WIB
                                        </p>
                                    </div>
                                </div>

                                {/* Map Card */}
                                <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs dark:border-slate-800 dark:bg-[#121826]">
                                    <div className="aspect-[16/9] w-full">
                                        <iframe
                                            title="Lokasi SMAN 1 Bukittinggi"
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.674996459345!2d100.36675277496464!3d-0.3017779996952671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd5389657b9bb6d%3A0xe1fcab8bb757bf02!2sSMA%20Negeri%201%20Bukittinggi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                                            className="h-full w-full border-0"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Modern Message Form */}
                            <div className="rounded-3xl border border-gray-100 bg-white p-6 sm:p-8 shadow-lg dark:border-slate-800 dark:bg-[#121826]">
                                <h3 className="font-display text-lg font-bold text-[#152238] dark:text-white">
                                    Kirim Pesan
                                </h3>
                                <p className="mt-1 text-xs text-gray-400 dark:text-slate-400">
                                    Tinggalkan pesan Anda, kami akan membalas melalui email secepatnya.
                                </p>

                                {sent ? (
                                    <div className="mt-6 rounded-2xl bg-emerald-50 p-5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                        Pesan Anda berhasil terkirim! Terima kasih atas aspirasi dan pertanyaannya.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs text-[#152238] outline-none transition focus:border-[#2699fb] focus:ring-2 focus:ring-[#2699fb]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                placeholder="Contoh: Muhammad Farhan"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                                                Alamat Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1.5 w-full rounded-full border border-gray-200 bg-white px-4 py-2.5 text-xs text-[#152238] outline-none transition focus:border-[#2699fb] focus:ring-2 focus:ring-[#2699fb]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                placeholder="nama@email.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                                                Pesan atau Pertanyaan
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="mt-1.5 w-full rounded-2xl border border-gray-200 bg-white p-3.5 text-xs text-[#152238] outline-none transition focus:border-[#2699fb] focus:ring-2 focus:ring-[#2699fb]/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                                                placeholder="Tuliskan pertanyaan atau kebutuhan buku..."
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#2699fb] py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#1783df] active:scale-95"
                                        >
                                            <Send size={13} /> Kirim Pesan
                                        </button>
                                    </form>
                                )}
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </SiteShell>
    );
}
