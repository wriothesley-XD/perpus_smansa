import { Head } from '@inertiajs/react';
import { BookOpen, DoorOpen, Landmark, Laptop, Newspaper, Sparkles, Trophy, Users, Wifi } from 'lucide-react';
import React from 'react';
import { BrushUnderline, DotCluster, SparkleFourPoint } from '../../Components/Common/Ornaments';
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

            <section className="relative px-6 py-12 sm:px-10 overflow-hidden bg-white text-[#152238] dark:bg-[#090d16] dark:text-slate-100">
                <div className="mx-auto max-w-7xl">
                    
                    {/* 1. TOP HERO: Headline + Modern Showcase */}
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        <div className="lg:col-span-7">
                            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                <Sparkles size={14} />
                                <span>Profil & Sejarah Perpustakaan</span>
                            </div>

                            <h1 className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] dark:text-white leading-[1.15]">
                                Lebih dari sekadar perpustakaan, ini adalah ruang untuk{' '}
                                <span className="relative inline-block text-[#152238] dark:text-white">
                                    tumbuh
                                    <span className="absolute -bottom-2 left-0 right-0 w-full">
                                        <BrushUnderline />
                                    </span>
                                </span>
                                .
                            </h1>

                            <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
                                Perpustakaan Sunaryaman Musthofa SMAN 1 Bukittinggi hadir sebagai pusat literasi, eksplorasi ide, dan sumber pengetahuan bagi seluruh warga sekolah. Kami percaya setiap buku menyimpan cerita, dan setiap pembaca adalah bagian dari masa depan yang lebih baik.
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                                <div className="flex items-center gap-2">
                                    <span className="size-2 rounded-full bg-emerald-500" />
                                    <span>Akreditasi A Nasional</span>
                                </div>
                                <span>•</span>
                                <div>12.000+ Koleksi Buku</div>
                                <span>•</span>
                                <div>Layanan Digital & Fisik Terpadu</div>
                            </div>
                        </div>

                        {/* Modern Photo Showcase */}
                        <div className="relative lg:col-span-5 flex justify-center">
                            <div className="relative w-full max-w-md">
                                <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-xl dark:border-slate-800 dark:bg-slate-900/80">
                                    <div className="overflow-hidden rounded-2xl aspect-[4/3] bg-slate-100 dark:bg-slate-800">
                                        <img
                                            src="/images/about_building.jpg"
                                            alt="Gedung SMAN 1 Bukittinggi"
                                            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                                        />
                                    </div>
                                    <div className="mt-3.5 px-2 pb-1 flex items-center justify-between">
                                        <div>
                                            <p className="font-display text-sm font-bold text-[#0F172A] dark:text-white">Gedung SMAN 1 Bukittinggi</p>
                                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Pusat Literasi Sunaryaman Musthofa</p>
                                        </div>
                                        <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                            Est. 1956
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Ornaments */}
                                <div className="pointer-events-none absolute -top-4 -right-4">
                                    <SparkleFourPoint size={28} color="#FF8E4F" />
                                </div>
                                <div className="pointer-events-none absolute -bottom-5 -left-5">
                                    <DotCluster color="#FFC533" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. STATS SECTION */}
                    <div className="mt-20">
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-11 place-items-center rounded-2xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Landmark size={20} />
                                </span>
                                <div className="mt-4">
                                    <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">1956</span>
                                    <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">Tahun Berdiri</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-11 place-items-center rounded-2xl bg-amber-50 text-[#FF8E4F] dark:bg-amber-950/60 dark:text-amber-300">
                                    <BookOpen size={20} />
                                </span>
                                <div className="mt-4">
                                    <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">12.000+</span>
                                    <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">Koleksi Buku & E-Book</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-11 place-items-center rounded-2xl bg-yellow-50 text-[#FFC533] dark:bg-amber-950/60 dark:text-amber-300">
                                    <DoorOpen size={20} />
                                </span>
                                <div className="mt-4">
                                    <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">5</span>
                                    <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">Ruang Layanan Literasi</span>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs transition-all hover:shadow-md hover:-translate-y-0.5 dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-300">
                                    <Trophy size={20} />
                                </span>
                                <div className="mt-4">
                                    <span className="block font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">Juara 1</span>
                                    <span className="mt-1 block text-xs font-semibold text-slate-500 dark:text-slate-400">Perpustakaan Tingkat Nasional</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. FASILITAS UNGGULAN */}
                    <div className="mt-16">
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <span className="font-mono-display text-xs font-bold uppercase tracking-wider text-[#2699fb]">
                                    FASILITAS
                                </span>
                                <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-[#0F172A] dark:text-white">
                                    Sarana Nyaman untuk Belajar & Berkreasi
                                </h2>
                            </div>
                            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
                                Didesain ramah siswa dengan fasilitas modern yang mendukung pembelajaran mandiri maupun kolaboratif.
                            </p>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-[#2699fb]/30 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <BookOpen size={18} />
                                </span>
                                <div>
                                    <span className="block text-xs font-bold text-[#0F172A] dark:text-white">Ruang Baca Terbuka</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Tenang & ber-AC</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-[#2699fb]/30 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Laptop size={18} />
                                </span>
                                <div>
                                    <span className="block text-xs font-bold text-[#0F172A] dark:text-white">E-Katalog & OPAC</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Akses pencarian cepat</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-[#2699fb]/30 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Newspaper size={18} />
                                </span>
                                <div>
                                    <span className="block text-xs font-bold text-[#0F172A] dark:text-white">E-Magazine & Kliping</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Publikasi berkala</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-xs transition hover:border-[#2699fb]/30 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
                                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-blue-50 text-[#2699fb] dark:bg-blue-950/60 dark:text-sky-300">
                                    <Wifi size={18} />
                                </span>
                                <div>
                                    <span className="block text-xs font-bold text-[#0F172A] dark:text-white">WiFi Kecepatan Tinggi</span>
                                    <span className="text-[10px] text-slate-500 dark:text-slate-400">Gratis untuk seluruh siswa</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 4. TIM PUSTAKAWAN */}
                    <div className="mt-16">
                        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900/50">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                                <div className="relative w-44 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm aspect-[4/3] dark:border-slate-700 dark:bg-slate-800">
                                    <img
                                        src="/images/team.jpg"
                                        alt="Tim Pustakawan"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="flex-1">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/70 px-3 py-1 text-xs font-bold text-[#152238] dark:bg-blue-950/80 dark:text-sky-300">
                                        <Users size={13} /> Tim Pustakawan
                                    </span>
                                    <h3 className="mt-2 font-display text-xl font-bold text-[#0F172A] dark:text-white">
                                        Pustakawan & Staf Perpustakaan
                                    </h3>
                                    <p className="mt-1 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        Di balik setiap layanan dan rak buku yang rapi, ada tim berdedikasi yang siap mendampingi perjalanan membaca, riset tugas akhir, dan kebutuhan literasi seluruh siswa dan guru.
                                    </p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {librarians.map((lib) => (
                                            <span
                                                key={lib.id}
                                                className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700 shadow-2xs dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                                            >
                                                {lib.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. NATIONAL CHAMPION ARCHIVE */}
                    <div className="relative mt-16 overflow-hidden rounded-3xl bg-[#152238] p-8 text-white sm:p-10 shadow-lg dark:bg-slate-900/90 dark:border dark:border-slate-800">
                        <div className="absolute -right-12 -top-12 size-48 rounded-full bg-white/5 blur-2xl pointer-events-none" />
                        <div className="absolute bottom-0 right-0 pointer-events-none">
                            <DotCluster color="rgba(255,255,255,0.15)" />
                        </div>
                        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
                            <div>
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-1 text-[11px] font-bold uppercase tracking-wider text-blue-200">
                                    <Trophy size={13} className="text-[#FFC533]" /> NATIONAL CHAMPION ARCHIVE
                                </span>
                                <h2 className="mt-4 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight">
                                    Dari juara nasional, menuju generasi literasi berikutnya.
                                </h2>
                                <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/90">
                                    Perjalanan perpustakaan SMAN 1 Bukittinggi adalah arsip hidup tentang keberanian membaca, berinovasi dalam teknologi informasi sekolah, dan tumbuh bersama civitas akademika.
                                </p>
                            </div>
                            <div className="relative rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-xs">
                                <div className="flex items-center gap-4">
                                    <span className="grid size-12 place-items-center rounded-2xl bg-[#FFC533] text-[#152238] shadow-md">
                                        <Trophy size={22} />
                                    </span>
                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wider text-blue-200">Prestasi Perpustakaan</p>
                                        <h3 className="font-display text-xl font-bold text-white">Juara 1 Nasional</h3>
                                        <p className="text-xs text-blue-100">Perpustakaan Sekolah Terbaik se-Indonesia</p>
                                    </div>
                                </div>
                                <div className="mt-5 border-t border-white/15 pt-4 text-xs leading-relaxed text-blue-100/80">
                                    Prestasi ini menjadi halaman penting dalam perjalanan kami—dan alasan kuat untuk terus menghadirkan ruang baca digital yang lebih terbuka, kreatif, dan relevan dengan generasi masa kini.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </SiteShell>
    );
}
