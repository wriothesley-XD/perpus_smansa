import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'available' | 'borrowed' | 'reserved' | 'primary' | 'accent' | 'neutral';
    className?: string;
}

export function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
    const variants = {
        available: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        borrowed: 'bg-rose-50 text-rose-700 border-rose-200/60',
        reserved: 'bg-amber-50 text-amber-800 border-amber-200/60',
        primary: 'bg-[#EAF4FF] text-[#0B4EA2] border-[#0B4EA2]/20',
        accent: 'bg-amber-100 text-amber-900 border-amber-300',
        neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    };

    return (
        <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${variants[variant]} ${className}`}
        >
            {children}
        </span>
    );
}
