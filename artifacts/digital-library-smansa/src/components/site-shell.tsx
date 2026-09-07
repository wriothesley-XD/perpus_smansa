import { BookOpen, Clock3, Instagram, Menu, MapPin, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/catalog', label: 'Katalog' },
  { href: '/magazines', label: 'Majalah digital' },
  { href: '/information', label: 'Tentang perpustakaan' },
  { href: '/contact', label: 'Kontak' },
];

export function SiteShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link href="/" className="group flex items-center gap-3" data-testid="link-logo">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform group-hover:-rotate-3">
              <BookOpen size={22} strokeWidth={1.8} />
            </span>
            <span className="leading-none">
              <span className="block font-display text-[17px] font-bold tracking-tight text-foreground">Perpustakaan</span>
              <span className="mt-1 block font-mono-display text-[10px] font-bold uppercase tracking-[.16em] text-primary">SMAN 1 Bukittinggi</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigasi utama">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-testid={`link-nav-${item.href === '/' ? 'home' : item.href.slice(1)}`}
                className={`relative py-2 text-[13px] font-semibold transition-colors hover:text-primary ${location === item.href ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {item.label}
                {location === item.href && <span className="absolute -bottom-[13px] left-0 right-0 mx-auto h-0.5 w-5 rounded-full bg-accent" />}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <Clock3 size={14} className="text-primary" /> Senin–Jumat · 07.00–15.30
            </span>
            <Link href="/catalog" data-testid="link-header-search" className="rounded-full bg-secondary px-4 py-2 text-xs font-bold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground">
              Cari buku
            </Link>
          </div>

          <button type="button" onClick={() => setMenuOpen((open) => !open)} className="rounded-lg p-2 text-foreground lg:hidden" aria-label="Buka menu" data-testid="button-menu">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {menuOpen && (
          <div className="border-t border-border bg-card px-5 py-4 lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1" aria-label="Navigasi seluler">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)} data-testid={`link-mobile-${item.href === '/' ? 'home' : item.href.slice(1)}`} className={`rounded-lg px-3 py-3 text-sm font-semibold ${location === item.href ? 'bg-secondary text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-border bg-secondary/45">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.3fr_.7fr_.8fr] lg:px-10">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground"><BookOpen size={19} /></span>
              <div><p className="font-display text-lg font-bold">Perpustakaan SMAN 1</p><p className="font-mono-display text-[10px] uppercase tracking-widest text-primary">Bukittinggi</p></div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted-foreground">Ruang tenang untuk membaca, mencari tahu, dan pulang membawa satu pertanyaan baru.</p>
            <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground"><MapPin size={14} className="text-primary" /> Jl. Syekh Jamil Jambek, Bukittinggi</div>
          </div>
          <div>
            <h2 className="font-mono-display text-[10px] font-bold uppercase tracking-[.18em] text-primary">Jelajah</h2>
            <div className="mt-4 flex flex-col items-start gap-3 text-sm text-muted-foreground">
              <Link href="/catalog" className="transition-colors hover:text-primary" data-testid="link-footer-catalog">Katalog buku</Link>
              <Link href="/magazines" className="transition-colors hover:text-primary" data-testid="link-footer-magazines">Majalah digital</Link>
              <Link href="/information" className="transition-colors hover:text-primary" data-testid="link-footer-information">Tentang kami</Link>
            </div>
          </div>
          <div>
            <h2 className="font-mono-display text-[10px] font-bold uppercase tracking-[.18em] text-primary">Sapa kami</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">Punya pertanyaan tentang koleksi atau ingin berkunjung?</p>
            <Link href="/contact" data-testid="link-footer-contact" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">Lihat informasi kontak <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="border-t border-border/70">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10">
            <span>© {new Date().getFullYear()} Perpustakaan SMAN 1 Bukittinggi</span>
            <span className="flex items-center gap-2"><Instagram size={13} /> Dibuat untuk warga sekolah</span>
          </div>
        </div>
      </footer>
    </div>
  );
}