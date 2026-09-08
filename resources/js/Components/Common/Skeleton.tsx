import React from 'react';

export function CardSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-3.5 shadow-sm animate-pulse">
            <div className="aspect-[3/4] w-full rounded-xl bg-slate-200" />
            <div className="mt-3.5 space-y-2">
                <div className="h-3 w-16 rounded bg-slate-200" />
                <div className="h-4 w-full rounded bg-slate-200" />
                <div className="h-3 w-24 rounded bg-slate-200" />
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                    <div className="h-5 w-20 rounded-full bg-slate-200" />
                    <div className="h-3 w-10 rounded bg-slate-200" />
                </div>
            </div>
        </div>
    );
}
