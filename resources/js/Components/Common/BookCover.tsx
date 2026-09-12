import { BookOpen } from 'lucide-react';
import React, { useState } from 'react';

interface BookCoverProps {
    src?: string | null;
    title: string;
    className?: string;
}

export function BookCover({ src, title, className = '' }: BookCoverProps) {
    const [failed, setFailed] = useState(!src);

    if (failed || !src) {
        return (
            <div
                className={`relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-[#0B3866] to-[#092E61] p-4 text-center text-white shadow-md ${className}`}
                aria-label={`Sampul ${title}`}
            >
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                <BookOpen size={32} className="text-white/80" />
                <p className="mt-3 line-clamp-3 font-display text-xs font-bold leading-snug text-white/90">
                    {title}
                </p>
                <span className="mt-2 text-[9px] font-semibold uppercase tracking-widest text-[#FACC15]">
                    SMAN 1 Bukittinggi
                </span>
            </div>
        );
    }

    return (
        <div className={`relative overflow-hidden rounded-xl bg-slate-100 shadow-sm ${className}`}>
            <img
                src={src}
                alt={`Sampul buku ${title}`}
                loading="lazy"
                onError={() => setFailed(true)}
                className="h-full w-full object-cover transition-transform duration-500 will-change-transform group-hover:scale-105"
            />
        </div>
    );
}
