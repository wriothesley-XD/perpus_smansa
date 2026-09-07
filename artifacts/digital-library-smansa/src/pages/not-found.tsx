import { ArrowLeft, Compass } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return <div className="mx-auto flex min-h-[65vh] max-w-3xl flex-col items-center justify-center px-5 text-center"><span className="grid size-16 place-items-center rounded-full bg-secondary text-primary"><Compass size={30} /></span><p className="mt-6 font-mono-display text-[10px] font-bold uppercase tracking-[.2em] text-primary">404 · halaman tidak ditemukan</p><h1 className="mt-4 font-display text-4xl font-bold">Rak ini belum ada.</h1><p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">Mungkin bukunya pindah tempat. Mari kembali dan mulai mencari dari awal.</p><Link href="/" data-testid="link-not-found-home" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><ArrowLeft size={16} /> Kembali ke beranda</Link></div>;
}
