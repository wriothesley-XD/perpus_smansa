import { Head } from '@inertiajs/react';
import React, { useState } from 'react';
import {
    HandDrawnStar,
    RealPaperClip,
    WashiTapeStrip,
} from '../Components/Common/Ornaments';
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
            <Head title="Kontak - Perpustakaan SMAN 1 Bukittinggi" />

            <section className="paper-grain relative px-6 py-8 sm:px-10 overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    
                    {/* Header + Polaroid Photo */}
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="font-mono-display text-xs font-bold uppercase tracking-wider text-slate-500">
                                HUBUNGI KAMI
                            </p>

                            <div className="flex items-center gap-3 mt-2">
                                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A]">
                                    Kami siap <br />
                                    <span className="text-[#2E8BE6]">membantu.</span>
                                </h1>
                                <HandDrawnStar size={24} color="#2E8BE6" className="mt-2" />
                            </div>

                            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-slate-600">
                                Jika kamu memiliki pertanyaan, saran, atau masukan, jangan ragu untuk menghubungi kami melalui cara berikut.
                            </p>
                        </div>

                        {/* Top Right: Polaroid with Let's Talk memo */}
                        <div className="relative mx-auto w-full max-w-[340px] pt-4 lg:pt-0">
                            {/* Memo Note Let's Talk */}
                            <div className="absolute -top-3 right-0 z-20">
                                <WashiTapeStrip width="45px" height="15px" color="rgba(11, 78, 162, 0.7)" rotate={-5} className="-top-2 left-3" />
                                <div className="memo-note rotate-[4deg] rounded px-3 py-1.5 text-center font-handwriting text-xs text-slate-700 font-bold">
                                    Let's <br /> Talk! :)
                                </div>
                            </div>

                            {/* Polaroid photo */}
                            <div className="card-polaroid rotate-[2deg] transition-transform hover:rotate-0">
                                <div className="overflow-hidden rounded-sm bg-slate-200 aspect-[16/10]">
                                    <img
                                        src="/images/about_building.jpg"
                                        alt="SMAN 1 Bukittinggi"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-2 text-center font-handwriting text-xs text-slate-500">
                                    Kampus SMAN 1 Bukittinggi
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Details & Form Grid */}
                    <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
                        {/* LEFT: Info list + map side by side */}
                        <div className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-start">
                            <div className="space-y-6">
                            {/* Alamat */}
                            <div className="flex items-start gap-4">
                                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0B3866] text-white text-xs">
                                    📍
                                </div>
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">Alamat</h4>
                                    <p className="mt-1 text-xs text-[#0F172A] font-medium leading-relaxed">
                                        {settings.library_address || 'Jl. Syekh M. Jamil Jambek No. 36, Bukittinggi, Sumatera Barat 26115'}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-4">
                                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0B3866] text-white text-xs">
                                    Email
                                </div>
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">Email</h4>
                                    <p className="mt-1 text-xs text-[#0B3866] font-semibold">
                                        {settings.contact_email || 'perpustakaan@sman1bukittinggi.sch.id'}
                                    </p>
                                </div>
                            </div>

                            {/* Telepon */}
                            <div className="flex items-start gap-4">
                                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0B3866] text-white text-xs">
                                    📞
                                </div>
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">Telepon</h4>
                                    <p className="mt-1 text-xs text-[#0F172A] font-medium">
                                        {settings.contact_phone || '(0752) 21045'}
                                    </p>
                                </div>
                            </div>

                            {/* Jam Operasional */}
                            <div className="flex items-start gap-4">
                                <div className="grid size-8 shrink-0 place-items-center rounded-full bg-[#0B3866] text-white text-xs">
                                    🕒
                                </div>
                                <div>
                                    <h4 className="font-display text-xs font-bold uppercase tracking-wider text-slate-400">Jam Operasional</h4>
                                    <p className="mt-1 text-xs text-[#0F172A] font-medium">
                                        Senin - Jumat: 07.30 - 15.30 WIB
                                    </p>
                                </div>
                            </div>

                            </div>

                            {/* Peta Lokasi with clear navigation affordance */}
                            <a href="https://www.google.com/maps/search/?api=1&query=SMA+Negeri+1+Bukittinggi" target="_blank" rel="noreferrer" className="group relative block pt-4" aria-label="Buka lokasi perpustakaan di Google Maps">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#EDE7DF] bg-white p-2 shadow-xs transition group-hover:-translate-y-1 group-hover:shadow-md">
                                    <iframe
                                        title="Lokasi SMAN 1 Bukittinggi"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.674996459345!2d100.36675277496464!3d-0.3017779996952671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2fd5389657b9bb6d%3A0xe1fcab8bb757bf02!2sSMA%20Negeri%201%20Bukittinggi!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                                        className="pointer-events-none h-full w-full rounded border-0"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-2 flex items-center justify-center rounded bg-[#0B3866]/0 transition group-hover:bg-[#0B3866]/15">
                                        <span className="rounded-full bg-white px-3 py-2 text-[10px] font-bold text-[#0B3866] opacity-0 shadow-md transition group-hover:opacity-100">Buka navigasi ↗</span>
                                    </div>
                                </div>
                                {/* Sticky note location */}
                                <div className="absolute -bottom-3 right-4 z-20">
                                    <div className="memo-note rotate-[-2deg] rounded px-3 py-1.5 text-center font-handwriting text-xs text-[#2E8BE6] font-bold">
                                        Lokasi Kami: Di Jantung SMAN 1 Bukittinggi ·
                                    </div>
                                </div>
                            </a>
                        </div>

                        {/* RIGHT: Kirim Pesan Form */}
                        <div className="relative">
                            {/* Paperclip top right */}
                            <div className="absolute -top-3.5 right-6 z-20">
                                <RealPaperClip rotate={15} color="#718096" />
                            </div>

                            <div className="bg-white rounded-xl p-6 sm:p-8 border border-[#EDE7DF] shadow-[0_6px_20px_rgba(0,0,0,0.05)]">
                                <h3 className="font-display text-base font-bold text-[#0F172A]">Kirim Pesan</h3>
                                <p className="mt-1 text-xs text-slate-500">Tinggalkan pesan Anda, kami akan membalas via email.</p>

                                {sent ? (
                                    <div className="mt-6 rounded-lg bg-emerald-50 p-4 text-xs font-semibold text-emerald-700 border border-emerald-200">
                                        Pesan berhasil dikirim! Terima kasih atas masukan Anda.
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0B3866] focus:bg-white focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0B3866] focus:bg-white focus:outline-none"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                Pesan
                                            </label>
                                            <textarea
                                                required
                                                rows={4}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs text-slate-800 focus:border-[#0B3866] focus:bg-white focus:outline-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="w-full rounded-full bg-[#0B3866] py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#082B4E] transition-colors"
                                        >
                                            Kirim →
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </SiteShell>
    );
}
