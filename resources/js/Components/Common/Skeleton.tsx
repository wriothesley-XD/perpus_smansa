import React from "react";

export function CardSkeleton() {
    return (
        <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-3.5 shadow-xs animate-pulse dark:border-slate-800 dark:bg-slate-900/60">
            <div className="aspect-[3/4] w-full rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="mt-3.5 space-y-2">
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                    <div className="h-5 w-20 rounded-full bg-slate-200 dark:bg-slate-800" />
                    <div className="h-3 w-10 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
            </div>
        </div>
    );
}

export function SkeletonLine({ className = "w-full h-4" }: { className?: string }) {
    return <div className={`rounded-md bg-slate-200 dark:bg-slate-800 animate-pulse ${className}`} />;
}

export function SkeletonAvatar({ size = "size-10" }: { size?: string }) {
    return <div className={`rounded-full bg-slate-200 dark:bg-slate-800 animate-pulse ${size}`} />;
}

export function SkeletonBanner() {
    return (
        <div className="w-full h-48 sm:h-64 rounded-3xl bg-slate-200 dark:bg-slate-800/80 animate-pulse" />
    );
}

export function RankingRowSkeleton() {
    return (
        <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs animate-pulse dark:border-slate-800 dark:bg-slate-900/50">
            <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="size-10 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0" />
                <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="h-3.5 w-3/4 rounded bg-slate-200 dark:bg-slate-800" />
                    <div className="h-2.5 w-1/2 rounded bg-slate-200 dark:bg-slate-800" />
                </div>
            </div>
            <div className="h-6 w-16 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
        </div>
    );
}

export function MagazineCardSkeleton() {
    return (
        <div className="flex gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-xs animate-pulse dark:border-slate-800 dark:bg-slate-900/60">
            <div className="h-32 w-24 shrink-0 rounded-xl bg-slate-200 dark:bg-slate-800" />
            <div className="flex-1 py-1 space-y-2.5">
                <div className="h-3 w-16 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800 pt-2" />
            </div>
        </div>
    );
}
