import { Head, Link } from '@inertiajs/react';
import {
    Award,
    BookOpen,
    CheckCircle2,
    Clock,
    Compass,
    GraduationCap,
    MapPin,
    Shield,
    Users,
} from 'lucide-react';
import React from 'react';
import { SiteShell } from '../../Components/Common/SiteShell';

interface LibrarianItem {
    id: number;
    name: string;
    role: string;
    identifier_number?: string;
    avatar?: string;
}

interface InformationProps {
    librarians: LibrarianItem[];
    settings: {
        library_name: string;
        library_address: string;
        operating_hours: string;
        contact_email: string;
        contact_phone: string;
    };
}

export default function Information({ librarians, settings }: InformationProps) {
    const facilities = [
        {
            title: 'Ruang Baca Utama Ber-AC',
            desc: 'Kapasitas 120 kursi dengan pencahayaan alami, meja baca individual, dan koneksi internet stabil.',
        },
        {
            title: 'Terminal Penelusuran OPAC',
            desc: 'Komputer khusus katalog untuk memudahkan siswa dan guru mencari letak rak buku secara mandiri.',
        },
        {
            title: 'Pojok Literasi Budaya Minangkabau',
            desc: 'Koleksi khusus naskah, sejarah, sastra lokal, dan ensiklopedia kebudayaan Ranah Minang.',
        },
        {
            title: 'Ruang Diskusi & Multimedia',
            desc: 'Area kolaborasi kelompok untuk pengerjaan riset karya ilmiah remaja dan presentasi siswa.',
        },
    ];

    const rules = [
        'Setiap siswa berhak meminjam maksimal 3 (tiga) judul buku secara bersamaan.',
        'Masa peminjaman standar adalah 7 (tujuh) hari kalender dan dapat diperpanjang 1 (satu) kali jika tidak direservasi pemustaka lain.',
        'Koleksi referensi (kamus, ensiklopedia, dan buku langka) hanya dapat dibaca di tempat.',
        'Peminjam wajib menjaga kebersihan dan keutuhan fisik buku yang dipinjam.',
    ];

    return (
        <SiteShell>
            <Head title="Tentang Perpustakaan — SMAN 1 Bukittinggi" />

            {/* Header */}
            <div className="border-b border-slate-200/80 bg-white py-14">
                <div className="mx-auto max-w-7xl px-6 sm:px-8">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Profil & Layanan
                    </span>
                    <h1 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl">
                        Mengenal Perpustakaan SMAN 1 Bukittinggi
                    </h1>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Pusat peradaban intelektual sekolah yang berdedikasi mewujudkan generasi literat, kritis, dan berintegritas tinggi.
                    </p>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 space-y-16">
                {/* Visi & Misi */}
                <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 lg:grid-cols-2">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-xl bg-[#EAF4FF] px-3 py-1 text-xs font-bold text-[#0B4EA2]">
                            <Compass size={14} />
                            <span>Visi Perpustakaan</span>
                        </div>
                        <h2 className="mt-4 font-display text-2xl font-bold text-[#0F172A]">
                            “Menjadi Pusat Literasi Unggul, Modern, dan Berkarakter di Tingkat Nasional.”
                        </h2>
                        <p className="mt-4 text-sm leading-relaxed text-slate-600">
                            Menyediakan akses informasi tanpa batas bagi civitas akademika SMAN 1 Bukittinggi guna memajukan mutu pendidikan berbasis kearifan lokal Minangkabau.
                        </p>
                    </div>

                    <div>
                        <div className="inline-flex items-center gap-2 rounded-xl bg-[#EAF4FF] px-3 py-1 text-xs font-bold text-[#0B4EA2]">
                            <Award size={14} />
                            <span>Misi Utama</span>
                        </div>
                        <ul className="mt-4 space-y-3 text-sm text-slate-700">
                            <li className="flex items-start gap-3">
                                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                                    <CheckCircle2 size={12} />
                                </span>
                                <span>Mengembangkan koleksi bahan pustaka yang relevan dengan kurikulum dan riset sekolah.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                                    <CheckCircle2 size={12} />
                                </span>
                                <span>Menyediakan layanan otomasi perpustakaan berbasis digital yang cepat, tepat, dan transparan.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                                    <CheckCircle2 size={12} />
                                </span>
                                <span>Menciptakan iklim budaya baca yang menyenangkan dan ramah bagi seluruh pemustaka.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Fasilitas */}
                <div>
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Sarana & Prasarana
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A]">
                        Fasilitas Ruang Perpustakaan
                    </h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {facilities.map((f) => (
                            <div
                                key={f.title}
                                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover-lift"
                            >
                                <h3 className="font-display text-base font-bold text-[#0F172A]">
                                    {f.title}
                                </h3>
                                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                                    {f.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tata Tertib */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50/70 p-8 sm:p-12">
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Sirkulasi Peminjaman
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A]">
                        Ketentuan & Tata Tertib Perpustakaan
                    </h2>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                        {rules.map((rule, idx) => (
                            <div
                                key={idx}
                                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 text-xs leading-relaxed text-slate-700"
                            >
                                <span className="font-mono-display font-bold text-[#0B4EA2]">
                                    0{idx + 1}.
                                </span>
                                <span>{rule}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pengelola Perpustakaan */}
                <div>
                    <span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-[#0B4EA2]">
                        Pengelola
                    </span>
                    <h2 className="mt-2 font-display text-2xl font-bold text-[#0F172A]">
                        Tim Pustakawan SMAN 1 Bukittinggi
                    </h2>
                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {librarians.map((lib) => (
                            <div
                                key={lib.id}
                                className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
                            >
                                <div className="grid size-12 place-items-center rounded-xl bg-[#0B4EA2] text-white text-sm font-bold">
                                    {lib.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-display text-sm font-bold text-[#0F172A]">
                                        {lib.name}
                                    </h3>
                                    <p className="text-xs text-[#0B4EA2] font-semibold capitalize">
                                        {lib.role === 'admin' ? 'Kepala Perpustakaan' : 'Pustakawan Pelaksana'}
                                    </p>
                                    {lib.identifier_number && (
                                        <p className="mt-0.5 text-[10px] text-slate-400 font-mono">
                                            {lib.identifier_number}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SiteShell>
    );
}
