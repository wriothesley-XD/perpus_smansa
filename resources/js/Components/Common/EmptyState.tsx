import { BookX } from 'lucide-react';
import React from 'react';

interface EmptyStateProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
}

export function EmptyState({
    title = 'Koleksi tidak ditemukan',
    description = 'Coba gunakan kata kunci lain atau hapus filter untuk melihat semua koleksi.',
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center">
            <div className="grid size-14 place-items-center rounded-2xl bg-[#E8F1F5] text-[#123B5D]">
                <BookX size={28} />
            </div>
            <h3 className="mt-4 font-display text-lg font-bold text-[#0F172A]">{title}</h3>
            <p className="mt-1.5 max-w-md text-sm text-[#64748B]">{description}</p>
            {action && <div className="mt-6">{action}</div>}
        </div>
    );
}
