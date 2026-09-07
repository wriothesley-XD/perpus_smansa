import { BookOpen } from 'lucide-react';
import { useState } from 'react';

type BookCoverProps = { src?: string; title: string; className?: string };

export function BookCover({ src, title, className = '' }: BookCoverProps) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`relative overflow-hidden bg-secondary ${className}`}>
      {src && !failed ? (
        <img src={src} alt={`Sampul ${title}`} onError={() => setFailed(true)} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]" data-testid={`img-cover-${title.slice(0, 16).replace(/\s/g, '-')}`} />
      ) : (
        <div className="flex h-full min-h-40 flex-col items-center justify-center gap-3 bg-primary px-5 text-center text-primary-foreground">
          <BookOpen size={30} strokeWidth={1.4} />
          <span className="font-display text-sm font-bold leading-5">{title}</span>
        </div>
      )}
    </div>
  );
}