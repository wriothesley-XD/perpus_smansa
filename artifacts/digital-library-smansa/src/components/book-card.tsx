import { ArrowUpRight, Bookmark, CheckCircle2 } from 'lucide-react';
import type { Book } from '@workspace/api-client-react';
import { Link } from 'wouter';
import { BookCover } from './book-cover';

export function BookCard({ book, compact = false }: { book: Book; compact?: boolean }) {
  const available = book.availableCopies > 0;
  return (
    <Link href={`/books/${book.id}`} data-testid={`card-book-${book.id}`} className={`group block rounded-2xl border border-border bg-card p-3 transition-all hover-lift ${compact ? '' : 'p-4'}`}>
      <BookCover src={book.coverUrl} title={book.title} className={`rounded-xl ${compact ? 'aspect-[3/4]' : 'aspect-[3/4]'}`} />
      <div className="px-1 pt-4">
        <div className="flex items-center justify-between gap-2">
          <span className="font-mono-display text-[10px] font-bold uppercase tracking-[.12em] text-primary">{book.category}</span>
          <ArrowUpRight size={15} className="text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
        </div>
        <h3 className="mt-2 line-clamp-2 min-h-[48px] font-display text-[18px] font-bold leading-6 text-foreground">{book.title}</h3>
        <p className="mt-1 truncate text-sm text-muted-foreground">{book.author}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className={`flex items-center gap-1.5 font-semibold ${available ? 'text-primary' : 'text-muted-foreground'}`}>
            {available ? <CheckCircle2 size={13} /> : <Bookmark size={13} />} {available ? `${book.availableCopies} tersedia` : 'Sedang dipinjam'}
          </span>
          <span className="font-mono-display text-[10px] text-muted-foreground">{book.year}</span>
        </div>
      </div>
    </Link>
  );
}