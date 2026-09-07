import { ArrowRight, BookMarked, Check, LibraryBig, Newspaper, Search, Sparkles, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useGetLibraryStats, useListBooks, useListMagazines } from '@workspace/api-client-react';
import { Link, useLocation } from 'wouter';
import { BookCard } from '@/components/book-card';
import { CardSkeleton, EmptyState, QueryError } from '@/components/feedback';

const featureItems = [
  {
    title: 'E-Katalog',
    description: 'Temukan buku pelajaran, fiksi, dan referensi dari satu tempat.',
    badge: 'Koleksi',
    tone: 'purple',
    Icon: BookMarked,
  },
  {
    title: 'E-Magazine',
    description: 'Baca terbitan digital sekolah kapan saja, langsung dari browser.',
    badge: 'Terbitan',
    tone: 'blue',
    Icon: Newspaper,
  },
  {
    title: 'Reservasi',
    description: 'Simpan buku pilihanmu sebelum datang ke ruang perpustakaan.',
    badge: 'Layanan',
    tone: 'green',
    Icon: LibraryBig,
  },
] as const;

export default function Home() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const statsQuery = useGetLibraryStats();
  const booksQuery = useListBooks({ sort: 'newest' });
  const magazinesQuery = useListMagazines();
  const books = booksQuery.data ?? [];
  const magazines = magazinesQuery.data ?? [];
  const categories = useMemo(() => Array.from(new Set(books.map((book) => book.category))).slice(0, 4), [books]);

  const statItems: Array<{ label: string; value: number | undefined; Icon: typeof LibraryBig }> = [
    { label: 'Koleksi buku', value: statsQuery.data?.totalBooks, Icon: LibraryBig },
    { label: 'Penulis', value: statsQuery.data?.totalAuthors, Icon: UsersRound },
    { label: 'Kategori', value: statsQuery.data?.totalCategories, Icon: BookMarked },
    { label: 'Siap dipinjam', value: statsQuery.data?.availableBooks, Icon: Sparkles },
  ];

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    setLocation(`/catalog${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`);
  };

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative border-b border-slate-100 bg-white">
        <div className="absolute left-[42%] top-16 hidden size-3 rounded-full bg-[#facc15] lg:block" />
        <div className="absolute left-[46%] top-28 hidden size-2 rounded-full bg-[#ea580c] lg:block" />
        <div className="absolute right-[8%] top-20 hidden size-3 rounded-full bg-[#1e8fc9] lg:block" />
        <div className="relative mx-auto grid min-h-[704px] max-w-[1440px] items-center gap-12 px-6 py-16 sm:px-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-20 lg:px-20 lg:py-20">
          <div className="fade-up relative z-10">
            <p className="mb-6 text-sm font-bold uppercase tracking-[.18em] text-primary">Perpustakaan digital · SMAN 1 Bukittinggi</p>
            <h1 className="max-w-[620px] font-display text-5xl font-extrabold leading-[1.06] tracking-[-.045em] text-[#0f172a] sm:text-6xl lg:text-[72px]">
              Temukan halaman yang <span className="text-primary">menunggumu.</span>
            </h1>
            <p className="mt-8 max-w-[560px] text-lg leading-[1.6] text-[#475569] sm:text-xl">
              Koleksi buku, majalah, dan cerita dari perpustakaan sekolah—siap menemani rasa ingin tahumu.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/catalog" data-testid="button-hero-catalog" className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-9 text-base font-bold text-primary-foreground shadow-[0_8px_18px_rgba(30,143,201,.2)] transition hover:-translate-y-0.5 hover:shadow-lg">
                Cari Buku
              </Link>
              <form onSubmit={submitSearch} className="flex h-12 w-full max-w-[330px] items-center rounded-xl border border-slate-200 bg-white px-3 shadow-sm focus-within:border-primary sm:w-[330px]" role="search">
                <Search size={17} className="shrink-0 text-slate-400" />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari koleksi..." className="min-w-0 flex-1 bg-transparent px-2 text-sm text-[#0f172a] outline-none" data-testid="input-home-search" />
                <button type="submit" className="sr-only" data-testid="button-home-search">Cari</button>
              </form>
            </div>
          </div>

          <div className="fade-up-delay relative mx-auto h-[430px] w-full max-w-[620px] lg:h-[500px]" aria-label="Ilustrasi ruang baca">
            <div className="figma-blob absolute right-[3%] top-[3%] h-[220px] w-[210px] rotate-12 bg-[#fb923c] sm:h-[290px] sm:w-[275px]" />
            <div className="figma-blob absolute bottom-[4%] left-[10%] h-[230px] w-[220px] -rotate-12 bg-[#facc15] sm:h-[295px] sm:w-[280px]" />
            <div className="figma-dots absolute right-[1%] top-[8%] h-28 w-32 opacity-60" />
            <div className="figma-dots absolute bottom-[11%] left-[3%] h-24 w-28 opacity-50" />
            <div className="absolute left-[18%] top-[17%] h-[285px] w-[225px] rotate-[-4deg] rounded-[3px] bg-white p-3 soft-shadow sm:h-[350px] sm:w-[275px]">
              <div className="flex h-full flex-col justify-between border border-slate-100 bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-[.15em] text-primary">Ruang baca</span>
                  <BookMarked size={18} className="text-primary" />
                </div>
                <div>
                  <div className="mb-4 h-1 w-16 bg-[#facc15]" />
                  <p className="font-display text-4xl font-extrabold leading-[.98] text-[#0f172a] sm:text-5xl">Buka<br />satu<br />bab.</p>
                </div>
                <p className="text-[10px] font-medium uppercase tracking-[.16em] text-slate-400">SMANSA · 2024</p>
              </div>
            </div>
            <div className="absolute bottom-[9%] right-[2%] w-[220px] rotate-[7deg] rounded-xl bg-white p-4 soft-shadow sm:w-[255px]">
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded bg-[#dbeafe] px-2 py-1 text-[10px] font-medium text-[#1e40af]">E-Katalog</span>
                <ArrowRight size={15} className="text-primary" />
              </div>
              <p className="font-display text-lg font-bold leading-tight text-[#0f172a]">Buku pilihan<br />untuk hari ini.</p>
              <div className="mt-4 flex gap-2">
                {books.slice(0, 3).map((book) => <img key={book.id} src={book.coverUrl} alt="" className="h-14 w-10 rounded object-cover shadow-sm" />)}
                {!books.length && <div className="h-14 w-10 rounded bg-slate-100" />}
              </div>
            </div>
            <div className="absolute right-[5%] top-[8%] grid size-12 place-items-center rounded-full border-4 border-white bg-[#1e8fc9] text-white shadow-md">
              <Sparkles size={19} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px border-x border-b border-slate-200 bg-slate-200 sm:grid-cols-4">
        {statItems.map(({ label, value, Icon }, index) => (
          <div key={label} className="bg-white px-5 py-6 sm:px-7">
            <div className="flex items-center gap-2 text-slate-500"><Icon size={16} className="text-primary" /><span className="text-[10px] font-bold uppercase tracking-[.12em]">{label}</span></div>
            {statsQuery.isLoading ? <div className="skeleton mt-3 h-8 w-20 rounded" /> : <p className="mt-2 font-display text-3xl font-extrabold text-[#0f172a]" data-testid={`stat-${index}`}>{value ?? '—'}</p>}
          </div>
        ))}
      </section>

      <section className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-6 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20 lg:px-20 lg:py-28">
        <div className="absolute left-[35%] top-10 hidden h-3 w-48 rounded-full bg-[#facc15]/70 lg:block" />
        <div className="fade-up relative z-10">
          <p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Satu pintu untuk semua</p>
          <h2 className="mt-4 max-w-xl font-display text-4xl font-extrabold leading-[1.1] tracking-[-.03em] text-[#0f172a] sm:text-5xl">Jelajah, simpan, dan baca dengan caramu.</h2>
          <p className="mt-7 max-w-lg text-lg leading-[1.6] text-[#475569]">Perpustakaan hadir untuk membuat pengalaman membaca di sekolah terasa lebih dekat dan mudah.</p>
          <div className="mt-8 space-y-3">
            {['Cari buku berdasarkan judul, penulis, atau kategori.', 'Lihat ketersediaan koleksi sebelum berkunjung.', 'Reservasi buku favoritmu dengan beberapa langkah.'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-base text-[#0f172a]"><span className="grid size-6 place-items-center rounded-full bg-[#dcfce7] text-[#166534]"><Check size={14} strokeWidth={3} /></span>{item}</div>
            ))}
          </div>
          <Link href="/information" className="mt-8 inline-flex items-center gap-2 rounded-lg px-0 py-3 text-base font-medium tracking-wide text-[#2563eb] transition hover:gap-3">Kenali perpustakaan <ArrowRight size={19} /></Link>
        </div>

        <div className="relative min-h-[410px]">
          <div className="absolute inset-x-10 top-7 h-56 rounded-[34%_66%_48%_52%/40%_40%_60%_60%] bg-[#fb923c] lg:inset-x-16" />
          <div className="absolute bottom-0 left-8 h-52 w-48 rounded-[48%_52%_38%_62%/56%_44%_56%_44%] bg-[#facc15] lg:left-14" />
          <div className="figma-dots absolute right-0 top-0 h-28 w-32 opacity-60" />
          <div className="relative mx-auto flex min-h-[410px] max-w-[610px] items-center justify-center">
            <div className="absolute left-4 top-24 hidden h-24 w-24 rotate-[-8deg] rounded-xl bg-white p-2 soft-shadow sm:block">
              <div className="grid h-full place-items-center rounded-lg bg-slate-100 text-slate-300"><BookMarked size={31} /></div>
            </div>
            <div className="relative z-10 w-[min(100%,390px)] rounded-[20px] border-4 border-white bg-white p-5 soft-shadow">
              <div className="mb-5 flex items-center gap-1.5"><span className="size-2.5 rounded-full bg-[#fb7185]" /><span className="size-2.5 rounded-full bg-[#facc15]" /><span className="size-2.5 rounded-full bg-[#22c55e]" /></div>
              <div className="grid gap-3 sm:grid-cols-3">
                {featureItems.map(({ title, description, badge, tone, Icon }) => (
                  <div key={title} className="rounded-[10px] bg-white p-3 shadow-[0_20px_25px_-5px_rgba(0,0,0,.1),0_0_10px_rgba(0,0,0,.07)]">
                    <div className={`mb-4 inline-flex rounded px-2 py-1 text-[9px] font-medium ${tone === 'purple' ? 'bg-[#f3e8ff] text-[#6b21a8]' : tone === 'blue' ? 'bg-[#dbeafe] text-[#1e40af]' : 'bg-[#dcfce7] text-[#166534]'}`}>{badge}</div>
                    <Icon size={21} className="text-primary" />
                    <p className="mt-2 font-display text-sm font-bold leading-tight text-[#0f172a]">{title}</p>
                    <p className="mt-2 line-clamp-3 text-[10px] leading-[1.4] text-slate-500">{description}</p>
                    <Link href={title === 'E-Katalog' ? '/catalog' : title === 'E-Magazine' ? '/magazines' : '/catalog'} className="mt-3 block rounded border border-[#2563eb] px-2 py-1 text-center text-[9px] font-medium text-[#2563eb]">Buka</Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 pb-20 sm:px-10 lg:px-20">
        <div className="flex items-end justify-between gap-5">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Baru di rak</p><h2 className="mt-3 font-display text-4xl font-extrabold tracking-[-.03em] text-[#0f172a]">Buku pilihan minggu ini</h2></div>
          <Link href="/catalog" data-testid="link-home-catalog" className="hidden items-center gap-2 text-sm font-bold text-[#2563eb] transition hover:gap-3 sm:flex">Lihat semua <ArrowRight size={16} /></Link>
        </div>
        {booksQuery.isError ? <div className="mt-10"><QueryError onRetry={() => booksQuery.refetch()} /></div> : <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{booksQuery.isLoading ? [1, 2, 3, 4].map((item) => <CardSkeleton key={item} />) : books.length ? books.slice(0, 4).map((book) => <BookCard key={book.id} book={book} />) : <div className="col-span-full"><EmptyState /></div>}</div>}
        <Link href="/catalog" data-testid="link-home-catalog-mobile" className="mt-7 flex items-center justify-center gap-2 text-sm font-bold text-[#2563eb] sm:hidden">Lihat semua koleksi <ArrowRight size={16} /></Link>
      </section>

      {magazines.length > 0 && <section className="mx-auto max-w-[1280px] px-6 pb-20 sm:px-10 lg:px-20">
        <div className="grid gap-8 rounded-[20px] bg-slate-50 p-7 sm:p-10 md:grid-cols-[.8fr_1.2fr] md:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-primary">Terbitan digital</p><h2 className="mt-3 font-display text-3xl font-extrabold text-[#0f172a]">Baca yang terbaru.</h2><p className="mt-4 max-w-md text-sm leading-6 text-slate-600">Temukan cerita, karya, dan kabar terbaru dari warga sekolah.</p><Link href="/magazines" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#2563eb]">Semua edisi <ArrowRight size={16} /></Link></div>
          <div className="grid gap-4 sm:grid-cols-3">{magazines.slice(0, 3).map((magazine) => <Link key={magazine.id} href="/magazines" className="group rounded-xl bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md" data-testid={`card-magazine-home-${magazine.id}`}><img src={magazine.coverUrl} alt={`Sampul ${magazine.title}`} className="h-40 w-full rounded-lg object-cover" /><p className="mt-3 text-[10px] font-bold uppercase tracking-widest text-primary">{magazine.edition} · {magazine.year}</p><h3 className="mt-2 font-display text-sm font-bold leading-tight text-[#0f172a]">{magazine.title}</h3></Link>)}</div>
        </div>
      </section>}

      <section className="bg-[#facc15] px-6 py-24 sm:px-10 lg:px-20">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center text-center">
          <h2 className="font-display text-4xl font-extrabold leading-[1.1] tracking-[-.03em] text-[#0f172a] sm:text-5xl">Sudah siap menemukan<br className="hidden sm:block" /> bacaan berikutnya?</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#0f172a] sm:text-lg">Mulai dari satu buku, lalu lihat ke mana rasa ingin tahu membawamu.</p>
          <Link href="/catalog" className="mt-8 inline-flex items-center justify-center rounded-lg border-2 border-[#ea580c] bg-[#ea580c] px-8 py-4 text-base font-bold text-white transition hover:brightness-105">Cari Buku</Link>
        </div>
      </section>
    </div>
  );
}