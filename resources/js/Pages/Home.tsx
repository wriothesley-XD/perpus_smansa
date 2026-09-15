import { Link } from "@inertiajs/react";
import { ArrowRight, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Headphones, Search, Trophy, Sparkles } from "lucide-react";
import SiteShell from "../Components/Common/SiteShell";
import { BookCard } from "../Components/Common/BookCard";
import { Book, Event, LibraryStats, MagazineEdition, ReaderRank, SmansaWork } from "../types/library";

interface HomeProps {
    stats: LibraryStats;
    popularBooks: Book[];
    latestMagazines: (MagazineEdition & { magazine?: { title: string; slug: string } })[];
    topReaders?: ReaderRank[];
    upcomingEvents?: Event[];
    latestPodcasts?: Event[];
    featuredWorks?: SmansaWork[];
    settings?: { library_name: string; library_tagline: string; operating_hours: string; library_address: string; contact_phone: string };
}

const FEATURE_PILLS = [
    "Koleksi terkurasi untuk seluruh warga sekolah",
    "Reservasi buku secara online tanpa antre",
    "Akses majalah sekolah & bacaan digital",
    "Ruang apresiasi karya literasi guru & siswa",
];

export default function Home({
    stats = { total_books: 0, available_books: 0, total_authors: 0, total_categories: 0 },
    popularBooks = [],
    latestMagazines = [],
    topReaders = [],
    upcomingEvents = [],
    latestPodcasts = [],
    featuredWorks = [],
}: HomeProps) {
    return (
        <SiteShell>
            <div className="bg-white text-[#152238]">

                {/* 1. HERO SECTION */}
                <section className="relative overflow-hidden bg-white px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pb-28 lg:pt-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

                        {/* LEFT copy */}
                        <div className="relative z-10">
                            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f0f7ff] px-3.5 py-1.5 text-xs font-bold text-[#2699fb]">
                                <Sparkles size={14} /> Perpustakaan Sunaryaman Musthofa
                            </div>
                            <h1 className="font-display text-[clamp(2.8rem,6vw,5.5rem)] font-black leading-[1] tracking-tight text-[#152238]">
                                <span className="relative inline-block">
                                    <span className="relative z-10">Sunaryaman</span>
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none" aria-hidden="true">
                                        <path d="M2 9 C40 3, 100 1, 198 8" stroke="#FF8E4F" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>
                                <br />
                                <span>Musthofa</span>
                            </h1>

                            <p className="mt-6 max-w-md text-base leading-7 text-[#64748b]">
                                Portal literasi digital SMAN 1 Bukittinggi. Jelajahi ribuan koleksi buku, majalah sekolah, agenda kegiatan, serta karya inspiratif warga sekolah.
                            </p>

                            {/* Search bar */}
                            <form action="/catalog" method="get" className="mt-8 flex max-w-lg items-center gap-2 rounded-2xl border border-gray-200 bg-white p-1.5 shadow-[0_8px_30px_-15px_rgba(21,34,56,.18)] focus-within:border-[#2699fb] focus-within:ring-4 focus-within:ring-[#2699fb]/10">
                                <Search size={17} className="ml-3 shrink-0 text-gray-400" />
                                <input
                                    name="q"
                                    aria-label="Cari buku"
                                    placeholder="Cari judul buku, penulis, atau kategori..."
                                    className="min-w-0 flex-1 border-0 bg-transparent px-2 py-2.5 text-sm text-[#152238] outline-none placeholder:text-gray-400"
                                />
                                <button className="rounded-xl bg-[#2699fb] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1783df]">
                                    Cari
                                </button>
                            </form>

                            {/* Stats */}
                            <div className="mt-8 flex flex-wrap gap-8 text-sm text-[#64748b]">
                                <span><strong className="mr-1 text-2xl font-black text-[#152238]">{stats.total_books || 0}</strong>koleksi</span>
                                <span><strong className="mr-1 text-2xl font-black text-[#152238]">{stats.total_categories || 0}</strong>kategori</span>
                                <span><strong className="mr-1 text-2xl font-black text-[#152238]">{stats.available_books || 0}</strong>tersedia</span>
                            </div>
                        </div>

                        {/* RIGHT organic blob photos */}
                        <div className="relative mx-auto h-[380px] w-full max-w-[440px] lg:h-[500px]">
                            <div className="blob-yellow absolute left-6 top-8 h-64 w-64 bg-[#FFC533] opacity-90 lg:h-80 lg:w-80" />
                            <div className="blob-orange absolute bottom-6 right-4 h-48 w-48 bg-[#FF8E4F] opacity-80 lg:h-64 lg:w-64" />
                            <div className="absolute left-8 top-10 z-10 h-52 w-40 -rotate-6 overflow-hidden rounded-2xl shadow-[0_20px_40px_-15px_rgba(21,34,56,.45)] ring-4 ring-white lg:h-72 lg:w-56">
                                <img src="/images/hero_library.jpg" alt="Perpustakaan SMANSA" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute bottom-6 right-6 z-20 h-44 w-36 rotate-6 overflow-hidden rounded-2xl shadow-[0_20px_40px_-15px_rgba(21,34,56,.45)] ring-4 ring-white lg:h-60 lg:w-48">
                                <img src="/images/about_building.jpg" alt="Siswa membaca" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute bottom-10 left-4 z-30 rounded-2xl bg-white px-4 py-3 shadow-lg lg:left-2">
                                <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#2699fb]">Terbuka untuk semua</p>
                                <p className="mt-0.5 text-xs font-bold text-[#152238]">Baca lebih banyak, tumbuh lebih jauh.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 2. SEMUA ADA DI SATU TEMPAT */}
                <section className="border-y border-gray-100 bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[#152238] sm:text-5xl">
                                Semua{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">ada di</span>
                                    <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 100 10" fill="none" aria-hidden="true">
                                        <path d="M2 7 C25 2, 60 1, 98 7" stroke="#FF8E4F" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>{" "}
                                satu tempat
                            </h2>
                            <p className="mt-5 max-w-sm text-sm leading-7 text-[#64748b]">
                                Mulai dari koleksi buku fisik, majalah digital, agenda literasi, hingga publikasi karya siswa dan guru SMAN 1 Bukittinggi.
                            </p>
                            <ul className="mt-6 grid gap-3">
                                {FEATURE_PILLS.map((item) => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-medium text-[#334155]">
                                        <span className="grid size-5 place-items-center rounded-full bg-[#2699fb]/10 text-[#2699fb]">
                                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4l2.5 2.5L9 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/catalog" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#2699fb] hover:underline">
                                Lihat semua koleksi buku <ArrowRight size={15} />
                            </Link>
                        </div>

                        {/* RIGHT 4 feature portals */}
                        <div className="relative">
                            <div className="blob-yellow absolute inset-0 bg-[#FFC533]/20" />
                            <div className="relative grid grid-cols-2 gap-4 p-4 sm:p-6">
                                {[
                                    { label: "Katalog Buku", desc: "Ribuan judul terkurasi", href: "/catalog", icon: "📚", color: "bg-[#eef5ff]" },
                                    { label: "E-Magazine", desc: "Majalah & bacaan digital", href: "/magazines", icon: "📰", color: "bg-[#fff8ec]" },
                                    { label: "Karya SMANSA", desc: "Cerpen, puisi, & esai", href: "/karya-smansa", icon: "✍️", color: "bg-[#fef2f2]" },
                                    { label: "Pojok Bahasa", desc: "Kosakata & terjemahan", href: "/translations", icon: "🌐", color: "bg-[#f0fdf4]" },
                                ].map((cat) => (
                                    <Link
                                        key={cat.label}
                                        href={cat.href}
                                        className={`${cat.color} flex flex-col justify-between rounded-2xl p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md`}
                                    >
                                        <div>
                                            <span className="text-3xl">{cat.icon}</span>
                                            <h3 className="mt-3 text-sm font-bold text-[#152238]">{cat.label}</h3>
                                            <p className="mt-1 text-xs text-[#64748b]">{cat.desc}</p>
                                        </div>
                                        <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                            Buka <ArrowRight size={12} />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. BUKU TERBARU */}
                <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-end justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">Pilihan pembaca</p>
                                <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-[#152238] sm:text-4xl">Buku terbaru</h2>
                            </div>
                            <Link href="/catalog" className="hidden items-center gap-1 text-sm font-semibold text-[#2699fb] hover:underline sm:flex">
                                Lihat semua <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                            {popularBooks?.slice(0, 5).map((book) => (
                                <BookCard key={book.id} book={book} hasClip={false} />
                            ))}
                        </div>
                        {(!popularBooks || popularBooks.length === 0) && (
                            <p className="mt-8 rounded-2xl bg-gray-50 p-8 text-center text-sm text-gray-400">
                                Koleksi buku akan segera hadir.
                            </p>
                        )}
                        <div className="mt-6 flex justify-end gap-2">
                            <button aria-label="Sebelumnya" className="grid size-9 place-items-center rounded-full border border-gray-200 text-gray-400 hover:border-[#2699fb] hover:text-[#2699fb]">
                                <ChevronLeft size={15} />
                            </button>
                            <button aria-label="Berikutnya" className="grid size-9 place-items-center rounded-full border border-gray-200 text-gray-400 hover:border-[#2699fb] hover:text-[#2699fb]">
                                <ChevronRight size={15} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* 4. PINJAM BUKU DENGAN MUDAH */}
                <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
                        <div>
                            <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[#152238] sm:text-5xl">
                                Pinjam{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">buku</span>
                                    <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 80 10" fill="none" aria-hidden="true">
                                        <path d="M2 7 C20 2, 50 1, 78 7" stroke="#FF8E4F" strokeWidth="4" strokeLinecap="round" />
                                    </svg>
                                </span>{" "}
                                dengan mudah
                            </h2>
                            <p className="mt-5 max-w-sm text-sm leading-7 text-[#64748b]">
                                Reservasi buku favoritmu secara daring kapan saja, lalu ambil langsung di meja sirkulasi perpustakaan tanpa menunggu antrean.
                            </p>
                            <Link href="/catalog" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#2699fb] hover:underline">
                                Cari buku sekarang <ArrowRight size={15} />
                            </Link>
                        </div>

                        <div className="relative mx-auto h-[320px] w-full max-w-[400px]">
                            <div className="blob-orange absolute inset-8 bg-[#FF8E4F]/80" />
                            <div className="absolute inset-0 z-10 overflow-hidden rounded-3xl shadow-[0_20px_40px_-15px_rgba(21,34,56,.3)]">
                                <img src="/images/hero_library.jpg" alt="Pinjam buku" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute -right-4 bottom-8 z-20 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-right-8">
                                <p className="text-[9px] font-bold uppercase tracking-[.15em] text-[#2699fb]">Ketentuan pinjam</p>
                                <p className="mt-1 text-xs font-semibold text-[#152238]">Maks. 3 buku &bull; 7 hari pinjam</p>
                                <div className="mt-2 h-1 w-full rounded-full bg-gray-100">
                                    <div className="h-1 w-2/3 rounded-full bg-[#2699fb]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. E-MAGAZINE TERBARU */}
                <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">Bacaan digital</p>
                                <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-[#152238] sm:text-4xl">E-Magazine terbaru</h2>
                            </div>
                            <Link href="/magazines" className="hidden items-center gap-1 text-sm font-semibold text-[#2699fb] hover:underline sm:flex">
                                Lihat semua <ArrowRight size={14} />
                            </Link>
                        </div>
                        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {latestMagazines?.map((edition) => (
                                <Link
                                    key={edition.id}
                                    href={`/magazines/${edition.magazine?.slug ?? edition.magazine_id}`}
                                    className="group flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="h-36 w-28 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                        <img src={edition.cover_image || "/images/hero_library.jpg"} alt={edition.edition_title} className="h-full w-full object-cover transition group-hover:scale-105" />
                                    </div>
                                    <div className="py-1">
                                        <p className="text-[9px] font-bold uppercase tracking-[.16em] text-[#2699fb]">Edisi {edition.edition_number}</p>
                                        <h3 className="mt-2 font-display text-lg font-bold leading-tight text-[#152238]">{edition.edition_title}</h3>
                                        <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-400">{edition.description || "Temukan cerita dan wawasan terbaru."}</p>
                                        <span className="mt-3 inline-flex items-center gap-1 text-[10px] font-semibold text-[#2699fb]">Baca edisi <ArrowRight size={10} /></span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        {(!latestMagazines || latestMagazines.length === 0) && (
                            <p className="mt-8 rounded-2xl bg-gray-50 p-8 text-center text-sm text-gray-400">Majalah digital akan segera hadir.</p>
                        )}
                    </div>
                </section>

                {/* 6. KOMUNITAS, EVENT & KARYA SISWA */}
                <section className="border-t border-gray-100 bg-[#f8fafc] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[.2em] text-[#2699fb]">Aktivitas & Kreativitas</p>
                                <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-[#152238] sm:text-4xl">Komunitas & Karya Literasi</h2>
                            </div>
                            <div className="flex gap-3 text-xs font-semibold">
                                <Link href="/events" className="text-[#2699fb] hover:underline">Semua Agenda →</Link>
                                <span className="text-gray-300">•</span>
                                <Link href="/karya-smansa" className="text-[#2699fb] hover:underline">Galeri Karya →</Link>
                            </div>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {/* Card 1: Papan Pembaca Teraktif */}
                            <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff8ec] px-2.5 py-1 text-[10px] font-bold text-[#f59e0b]">
                                            <Trophy size={13} /> Peringkat Pembaca
                                        </span>
                                        <Link href="/ranking" className="text-xs font-semibold text-[#2699fb] hover:underline">Lihat semua</Link>
                                    </div>
                                    <h3 className="mt-3 font-display text-lg font-bold text-[#152238]">Pembaca Teraktif</h3>
                                    <div className="mt-4 space-y-3">
                                        {topReaders.length > 0 ? (
                                            topReaders.slice(0, 3).map((reader, idx) => (
                                                <div key={reader.id} className="flex items-center justify-between text-xs">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`grid size-5 place-items-center rounded-full font-bold text-[10px] ${idx === 0 ? "bg-[#FFC533] text-[#152238]" : "bg-gray-100 text-gray-500"}`}>
                                                            {idx + 1}
                                                        </span>
                                                        <span className="font-semibold text-[#152238]">{reader.name}</span>
                                                    </div>
                                                    <span className="font-mono text-gray-400">{reader.loans_count} buku</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">Belum ada data peminjaman.</p>
                                        )}
                                    </div>
                                </div>
                                <Link href="/ranking" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                    Lihat papan peringkat <ArrowUpRight size={13} />
                                </Link>
                            </div>

                            {/* Card 2: Agenda & Duta Literasi */}
                            <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef5ff] px-2.5 py-1 text-[10px] font-bold text-[#2699fb]">
                                            <Calendar size={13} /> Agenda
                                        </span>
                                        <Link href="/events" className="text-xs font-semibold text-[#2699fb] hover:underline">Semua</Link>
                                    </div>
                                    <h3 className="mt-3 font-display text-lg font-bold text-[#152238]">Kegiatan Perpustakaan</h3>
                                    <div className="mt-4 space-y-3">
                                        {upcomingEvents.length > 0 ? (
                                            upcomingEvents.slice(0, 2).map((event) => (
                                                <Link key={event.id} href={`/events/${event.slug}`} className="block rounded-xl bg-[#f8fafc] p-3 transition hover:bg-[#eef5ff]">
                                                    <p className="line-clamp-1 text-xs font-bold text-[#152238]">{event.title}</p>
                                                    <p className="mt-1 text-[10px] text-gray-400">{event.event_date || "Segera hadir"} {event.location ? `• ${event.location}` : ""}</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">Agenda baru sedang disiapkan.</p>
                                        )}
                                    </div>
                                </div>
                                <Link href="/events" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                    Jelajahi agenda <ArrowRight size={13} />
                                </Link>
                            </div>

                            {/* Card 3: Podcast Duta Literasi */}
                            <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fef2f2] px-2.5 py-1 text-[10px] font-bold text-[#ef4444]">
                                            <Headphones size={13} /> Podcast
                                        </span>
                                        <Link href="/events" className="text-xs font-semibold text-[#2699fb] hover:underline">Semua</Link>
                                    </div>
                                    <h3 className="mt-3 font-display text-lg font-bold text-[#152238]">Podcast Duta Literasi</h3>
                                    <div className="mt-4 space-y-3">
                                        {latestPodcasts.length > 0 ? (
                                            latestPodcasts.slice(0, 2).map((podcast) => (
                                                <Link key={podcast.id} href={`/events/${podcast.slug}`} className="flex items-center gap-3 rounded-xl bg-[#f8fafc] p-3 transition hover:bg-[#eef5ff]">
                                                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#2699fb] text-white text-[10px]">▶</span>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="line-clamp-1 text-xs font-bold text-[#152238]">{podcast.title}</p>
                                                        <p className="truncate text-[10px] text-gray-400">{podcast.host_name || "Duta SMANSA"}</p>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">Episode perdana segera hadir.</p>
                                        )}
                                    </div>
                                </div>
                                <Link href="/events" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                    Dengarkan sekarang <ArrowRight size={13} />
                                </Link>
                            </div>

                            {/* Card 4: Karya Pilihan Guru & Siswa */}
                            <div className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f0fdf4] px-2.5 py-1 text-[10px] font-bold text-[#16a34a]">
                                            ✍️ Karya SMANSA
                                        </span>
                                        <Link href="/karya-smansa" className="text-xs font-semibold text-[#2699fb] hover:underline">Galeri</Link>
                                    </div>
                                    <h3 className="mt-3 font-display text-lg font-bold text-[#152238]">Karya Siswa & Guru</h3>
                                    <div className="mt-4 space-y-3">
                                        {featuredWorks.length > 0 ? (
                                            featuredWorks.slice(0, 2).map((work) => (
                                                <Link key={work.id} href={`/karya-smansa/${work.slug}`} className="block rounded-xl bg-[#f8fafc] p-3 transition hover:bg-[#eef5ff]">
                                                    <span className="text-[9px] font-bold uppercase tracking-wider text-[#FF8E4F]">{work.category_label || work.category}</span>
                                                    <p className="line-clamp-1 mt-0.5 text-xs font-bold text-[#152238]">{work.title}</p>
                                                    <p className="mt-0.5 text-[10px] text-gray-400">{work.author_name} ({work.author_type === "teacher" ? "Guru" : "Siswa"})</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-xs text-gray-400">Karya pilihan akan segera hadir.</p>
                                        )}
                                    </div>
                                </div>
                                <Link href="/karya-smansa" className="mt-5 inline-flex items-center gap-1 text-xs font-bold text-[#2699fb]">
                                    Buka galeri karya <ArrowRight size={13} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 7. CTA */}
                <section className="bg-white px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
                    <div className="relative mx-auto max-w-3xl text-center">
                        <div className="pointer-events-none absolute -left-10 top-0 hidden h-12 w-12 overflow-hidden rounded-full border-4 border-white shadow-lg lg:block">
                            <div className="h-full w-full bg-[#FFC533]" />
                        </div>
                        <div className="pointer-events-none absolute -right-16 top-8 hidden h-10 w-10 overflow-hidden rounded-full border-4 border-white shadow-lg lg:block">
                            <div className="h-full w-full bg-[#2699fb]" />
                        </div>
                        <div className="pointer-events-none absolute -left-20 bottom-0 hidden h-8 w-8 overflow-hidden rounded-full border-4 border-white shadow-lg lg:block">
                            <div className="h-full w-full bg-[#FF8E4F]" />
                        </div>
                        <div className="pointer-events-none absolute -right-6 bottom-4 hidden h-14 w-14 overflow-hidden rounded-full border-4 border-white shadow-lg lg:block">
                            <div className="h-full w-full bg-[#152238]/10" />
                        </div>

                        <h2 className="font-display text-4xl font-black leading-tight tracking-tight text-[#152238] sm:text-5xl">
                            Siap mulai{" "}
                            <span className="relative inline-block">
                                <span className="relative z-10">membaca</span>
                                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 110 10" fill="none" aria-hidden="true">
                                    <path d="M2 7 C28 2, 70 1, 108 7" stroke="#FF8E4F" strokeWidth="4" strokeLinecap="round" />
                                </svg>
                            </span>
                            ?
                        </h2>
                        <p className="mx-auto mt-5 max-w-md text-base leading-7 text-[#64748b]">
                            Koleksi baru selalu hadir. Temukan buku favoritmu, simpan daftar bacaan, dan reservasi kapan saja.
                        </p>
                        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                            <Link
                                href="/catalog"
                                className="inline-flex items-center gap-2 rounded-full bg-[#2699fb] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#1783df]"
                            >
                                Cari Buku <ArrowRight size={15} />
                            </Link>
                            <Link
                                href="/information"
                                className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-8 py-3.5 text-sm font-semibold text-[#152238] transition hover:bg-gray-50"
                            >
                                Tentang Perpustakaan
                            </Link>
                        </div>
                    </div>
                </section>

            </div>
        </SiteShell>
    );
}
