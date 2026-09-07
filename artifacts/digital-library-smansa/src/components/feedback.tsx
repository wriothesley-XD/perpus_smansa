import { AlertCircle, BookOpen, RefreshCw } from 'lucide-react';

export function QueryError({ onRetry, label = 'Data belum dapat dimuat' }: { onRetry?: () => void; label?: string }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-destructive/20 bg-destructive/5 px-6 py-16 text-center"><AlertCircle size={26} className="text-destructive" /><h3 className="mt-4 font-display text-xl font-bold">{label}</h3><p className="mt-2 max-w-sm text-sm text-muted-foreground">Coba muat ulang halaman atau kembali beberapa saat lagi.</p>{onRetry && <button type="button" onClick={onRetry} className="mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-primary-foreground" data-testid="button-retry"><RefreshCw size={14} /> Coba lagi</button>}</div>;
}

export function EmptyState({ title = 'Belum ada koleksi di sini', description = 'Coba gunakan kata kunci lain atau jelajahi bagian lain.' }: { title?: string; description?: string }) {
  return <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center"><span className="grid size-14 place-items-center rounded-full bg-secondary text-primary"><BookOpen size={24} /></span><h3 className="mt-4 font-display text-xl font-bold">{title}</h3><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">{description}</p></div>;
}

export function CardSkeleton() {
  return <div className="rounded-2xl border border-border bg-card p-4"><div className="skeleton aspect-[3/4] rounded-xl" /><div className="mt-4 h-3 w-1/3 rounded skeleton" /><div className="mt-3 h-5 w-4/5 rounded skeleton" /><div className="mt-2 h-4 w-2/3 rounded skeleton" /></div>;
}