import React from "react";
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from "lucide-react";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastItem {
    id: string;
    type: ToastType;
    message: string;
    description?: string;
    duration?: number;
}

interface ToastProps {
    toast: ToastItem;
    onClose: (id: string) => void;
}

const toastStyles: Record<
    ToastType,
    { border: string; bg: string; icon: React.ReactNode; text: string; badge: string }
> = {
    success: {
        border: "border-emerald-500/30 dark:border-emerald-500/20",
        bg: "bg-white/95 dark:bg-slate-900/95",
        icon: <CheckCircle2 className="size-5 text-emerald-500 shrink-0" />,
        text: "text-slate-800 dark:text-slate-100",
        badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300",
    },
    error: {
        border: "border-rose-500/30 dark:border-rose-500/20",
        bg: "bg-white/95 dark:bg-slate-900/95",
        icon: <AlertCircle className="size-5 text-rose-500 shrink-0" />,
        text: "text-slate-800 dark:text-slate-100",
        badge: "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300",
    },
    warning: {
        border: "border-amber-500/30 dark:border-amber-500/20",
        bg: "bg-white/95 dark:bg-slate-900/95",
        icon: <AlertTriangle className="size-5 text-amber-500 shrink-0" />,
        text: "text-slate-800 dark:text-slate-100",
        badge: "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300",
    },
    info: {
        border: "border-[#2699fb]/30 dark:border-[#2699fb]/20",
        bg: "bg-white/95 dark:bg-slate-900/95",
        icon: <Info className="size-5 text-[#2699fb] shrink-0" />,
        text: "text-slate-800 dark:text-slate-100",
        badge: "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300",
    },
};

export function Toast({ toast, onClose }: ToastProps) {
    const style = toastStyles[toast.type];

    return (
        <div
            role="alert"
            className={`pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-2xl border p-3.5 shadow-xl backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 sm:slide-in-from-right-5 fade-in ${style.bg} ${style.border}`}
        >
            <div className="pt-0.5">{style.icon}</div>
            <div className="flex-1 min-w-0 pr-1">
                <p className={`text-xs sm:text-sm font-bold leading-tight ${style.text}`}>
                    {toast.message}
                </p>
                {toast.description && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-snug">
                        {toast.description}
                    </p>
                )}
            </div>
            <button
                type="button"
                onClick={() => onClose(toast.id)}
                className="shrink-0 rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 transition"
                aria-label="Tutup notifikasi"
            >
                <X size={14} />
            </button>
        </div>
    );
}

export default Toast;
