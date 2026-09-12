import { Head } from '@inertiajs/react';
import { BookOpen, Landmark, Laptop } from 'lucide-react';
import React from 'react';
import {
    BotanicalLeaf,
    RealPaperClip,
    WashiTapeStrip,
} from '../../Components/Common/Ornaments';
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

export default function Information({ librarians }: InformationProps) {
    return (
        <SiteShell>
            <Head title="Tentang Perpustakaan - SMAN 1 Bukittinggi" />

            <section className="paper-grain relative px-6 py-8 sm:px-10 overflow-hidden">
                <div className="mx-auto max-w-7xl">
                    
                    {/* 1. TOP HERO: Headline + Polaroid School Photo */}
                    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="font-mono-display text-xs font-bold uppercase tracking-wider text-slate-500">
                                TENTANG KAMI
                            </p>

                            <h1 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
                                Lebih dari <br />
                                sekadar perpustakaan, <br />
                                ini adalah ruang untuk <br />
                                <span className="text-[#2E8BE6]">tumbuh.</span>
                            </h1>

                            <p className="mt-4 max-w-md text-xs sm:text-sm leading-relaxed text-slate-600">
                                Perpustakaan SMAN 1 Bukittinggi hadir sebagai pusat literasi dan sumber pengetahuan bagi seluruh warga sekolah. Kami percaya bahwa setiap buku menyimpan cerita, dan setiap pembaca adalah bagian dari masa depan yang lebih baik.
                            </p>
                        </div>

                        {/* Photo Polaroid Gedung SMAN 1 Bukittinggi with Blue Washi Tape */}
                        <div className="relative mx-auto w-full max-w-[340px] pt-4 lg:pt-0">
                            <WashiTapeStrip width="75px" height="20px" color="rgba(11, 78, 162, 0.75)" rotate={-4} className="-top-3 left-1/3" />
                            
                            <div className="card-polaroid rotate-[2deg] transition-transform hover:rotate-0">
                                <div className="overflow-hidden rounded-sm bg-slate-200 aspect-[16/10]">
                                    <img
                                        src="/images/about_building.jpg"
                                        alt="Gedung SMAN 1 Bukittinggi"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="mt-2.5 text-center font-handwriting text-sm font-bold text-slate-700">
                                    SMAN 1 Bukittinggi
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -right-4 pointer-events-none">
                                <BotanicalLeaf size={55} color="#2A5C43" rotate={20} />
                            </div>
                        </div>
                    </div>

                    {/* 2. SEKILAS KAMI (STATS CARD) */}
                    <div className="mt-12">
                        <h3 className="font-display text-sm font-bold text-[#0F172A]">Sekilas Kami</h3>
                        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="bg-white rounded-lg p-4 border border-[#EDE7DF] shadow-xs flex items-center gap-3">
                                <span className="grid size-9 place-items-center rounded-full bg-[#e8f1f5] text-[#123b5d]"><Landmark size={17} /></span>
                                <div>
                                    <span className="block font-display text-lg font-black text-[#0F172A]">1956</span>
                                    <span className="block text-[10px] text-slate-500">Tahun Berdiri</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-[#EDE7DF] shadow-xs flex items-center gap-3">
                                <span className="text-2xl">📚</span>
                                <div>
                                    <span className="block font-display text-lg font-black text-[#0F172A]">12.000+</span>
                                    <span className="block text-[10px] text-slate-500">Koleksi Buku</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-[#EDE7DF] shadow-xs flex items-center gap-3">
                                <span className="text-2xl">🚪</span>
                                <div>
                                    <span className="block font-display text-lg font-black text-[#0F172A]">5</span>
                                    <span className="block text-[10px] text-slate-500">Ruang Layanan</span>
                                </div>
                            </div>
                            <div className="bg-white rounded-lg p-4 border border-[#EDE7DF] shadow-xs flex items-center gap-3">
                                <span className="text-2xl">🥇</span>
                                <div>
                                    <span className="block font-display text-lg font-black text-[#0F172A]">1</span>
                                    <span className="block text-[10px] text-slate-500">Tujuan: Literasi</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. FASILITAS */}
                    <div className="mt-10">
                        <h3 className="font-display text-sm font-bold text-[#0F172A]">Fasilitas</h3>
                        <div className="mt-3 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="bg-white rounded-lg p-3 border border-[#EDE7DF] flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <BookOpen size={16} className="text-[#123b5d]" /> <span>Ruang Baca</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-[#EDE7DF] flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <Laptop size={16} className="text-[#123b5d]" /> <span>E-Katalog</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-[#EDE7DF] flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <span>📰</span> <span>E-Magazine</span>
                            </div>
                            <div className="bg-white rounded-lg p-3 border border-[#EDE7DF] flex items-center gap-2.5 text-xs font-semibold text-slate-700">
                                <span>📶</span> <span>WiFi Gratis</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. TIM KAMI */}
                    <div className="mt-10">
                        <h3 className="font-display text-sm font-bold text-[#0F172A]">Tim Kami</h3>
                        <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-white p-5 rounded-xl border border-[#EDE7DF]">
                            <div className="relative w-40 shrink-0">
                                <div className="card-polaroid rotate-[-2deg]">
                                    <div className="aspect-[4/3] bg-slate-200 overflow-hidden rounded">
                                        <img
                                            src="/images/team.jpg"
                                            alt="Tim Pustakawan"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div className="mt-1 text-center font-handwriting text-[10px] text-slate-500">
                                        Tim Pustakawan
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-display text-sm font-bold text-[#0F172A]">Pustakawan & Staf Perpustakaan</h4>
                                <p className="mt-1 max-w-lg text-xs leading-relaxed text-slate-600">
                                    Dibalik setiap layanan, ada tim yang selalu siap mendampingi perjalanan membaca dan riset seluruh siswa dan guru.
                                </p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {librarians.map((lib) => (
                                        <span key={lib.id} className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-semibold text-slate-700">
                                            {lib.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. NATIONAL CHAMPION ARCHIVE */}
                    <div className="relative mt-12 overflow-hidden rounded-2xl bg-[#0B3866] p-6 text-white sm:p-8">
                        <div className="absolute -right-12 -top-12 size-40 rounded-full border border-white/20" />
                        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
                            <div><span className="font-mono-display text-[10px] font-bold uppercase tracking-[0.2em] text-blue-200">NATIONAL CHAMPION ARCHIVE</span><h2 className="mt-3 font-display text-2xl font-bold sm:text-3xl">Dari juara nasional, menuju generasi literasi berikutnya.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100">Perjalanan perpustakaan SMAN 1 Bukittinggi adalah arsip hidup tentang keberanian membaca, berinovasi, dan tumbuh bersama sekolah.</p></div>
                            <div className="relative rounded-xl border border-white/20 bg-white/10 p-5"><div className="flex items-center gap-3"><span className="grid size-12 place-items-center rounded-full bg-[#FACC15] text-2xl">🏆</span><div><p className="font-mono-display text-[10px] font-bold uppercase tracking-wider text-blue-200">Milestone</p><h3 className="font-display text-xl font-bold">Juara Nasional</h3><p className="text-xs text-blue-100">Sekitar 2020 • Program Perpustakaan Sekolah</p></div></div><div className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-blue-100">Prestasi ini menjadi halaman penting dalam perjalanan kami—dan alasan untuk terus membuat ruang baca yang lebih terbuka, kreatif, dan relevan.</div></div>
                        </div>
                    </div>

                </div>
            </section>
        </SiteShell>
    );
}
