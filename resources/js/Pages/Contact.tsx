import { Head } from '@inertiajs/react';
import { Clock, Globe, Mail, MapPin, Phone, Send } from 'lucide-react';
import React, { useState } from 'react';
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
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <SiteShell>
            <Head title="Kontak & Lokasi — Perpustakaan SMAN 1 Bukittinggi" />

            <div className="border-b border-slate-200/80 bg-white py-14">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Hubungi Kami
                    </span>
                    <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                        Informasi Kontak & Lokasi
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Punya pertanyaan mengenai koleksi buku, tata cara donasi buku alumni, atau usulan pengadaan bahan pustaka baru? Sampaikan kepada kami.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
                    {/* Contact Info Cards */}
                    <div className="space-y-4">
                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                <MapPin size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-sm font-bold text-[#0F172A]">Lokasi Perpustakaan</h3>
                                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                                    {settings.library_address}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                <Clock size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-sm font-bold text-[#0F172A]">Jam Operasional Layanan</h3>
                                <p className="mt-1 text-xs text-slate-600">{settings.operating_hours}</p>
                                <p className="mt-0.5 text-[11px] text-slate-400">Sabtu, Minggu & Hari Libur Nasional: Tutup</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                <Mail size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-sm font-bold text-[#0F172A]">Surat Elektronik & Telepon</h3>
                                <p className="mt-1 text-xs text-slate-600">{settings.contact_email}</p>
                                <p className="mt-0.5 text-xs text-slate-600 font-semibold">{settings.contact_phone}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#EAF4FF] text-[#0B4EA2]">
                                <Globe size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-sm font-bold text-[#0F172A]">Media Sosial Resmi</h3>
                                <p className="mt-1 text-xs text-[#0B4EA2] font-semibold">{settings.instagram}</p>
                            </div>
                        </div>
                    </div>

                    {/* Feedback Form */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                        <h2 className="font-display text-xl font-bold text-[#0F172A]">
                            Kirim Pesan atau Usulan Judul Buku
                        </h2>
                        <p className="mt-1.5 text-xs text-slate-500">
                            Kami sangat menghargai saran koleksi bacaan untuk terus memperkaya perpustakaan sekolah.
                        </p>

                        {submitted ? (
                            <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
                                <h3 className="font-display text-base font-bold text-emerald-800">
                                    Pesan Berhasil Terkirim!
                                </h3>
                                <p className="mt-2 text-xs text-emerald-700">
                                    Terima kasih atas aspirasi dan masukannya. Tim pustakawan akan segera meninjau usulan Anda.
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Nama Lengkap
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Nama Anda"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#0B4EA2] focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Email / Nomor HP
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Kontak yang dapat dihubungi"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#0B4EA2] focus:bg-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                                        Pesan atau Usulan Buku
                                    </label>
                                    <textarea
                                        rows={4}
                                        required
                                        placeholder="Tulis judul buku, penulis, alasan usulan, atau pertanyaan umum…"
                                        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm outline-none focus:border-[#0B4EA2] focus:bg-white"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B4EA2] py-3 text-xs font-bold text-white shadow-md hover:bg-[#083c7d] transition-all"
                                >
                                    <Send size={14} />
                                    <span>Kirimkan Pesan</span>
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
