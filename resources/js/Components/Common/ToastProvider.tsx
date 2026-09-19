import React, { createContext, useCallback, useState } from "react";
import { Toast, ToastItem, ToastType } from "./Toast";

export interface ToastContextValue {
    toasts: ToastItem[];
    show: (message: string, options?: { type?: ToastType; description?: string; duration?: number }) => string;
    success: (message: string, description?: string, duration?: number) => string;
    error: (message: string, description?: string, duration?: number) => string;
    warning: (message: string, description?: string, duration?: number) => string;
    info: (message: string, description?: string, duration?: number) => string;
    dismiss: (id: string) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastItem[]>([]);

    const dismiss = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const show = useCallback(
        (message: string, options?: { type?: ToastType; description?: string; duration?: number }): string => {
            const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
            const type = options?.type || "info";
            const duration = options?.duration ?? 4000;

            const newToast: ToastItem = {
                id,
                type,
                message,
                description: options?.description,
                duration,
            };

            setToasts((prev) => [...prev, newToast]);

            if (duration > 0) {
                setTimeout(() => {
                    dismiss(id);
                }, duration);
            }

            return id;
        },
        [dismiss]
    );

    const success = useCallback(
        (message: string, description?: string, duration?: number) =>
            show(message, { type: "success", description, duration }),
        [show]
    );

    const error = useCallback(
        (message: string, description?: string, duration?: number) =>
            show(message, { type: "error", description, duration }),
        [show]
    );

    const warning = useCallback(
        (message: string, description?: string, duration?: number) =>
            show(message, { type: "warning", description, duration }),
        [show]
    );

    const info = useCallback(
        (message: string, description?: string, duration?: number) =>
            show(message, { type: "info", description, duration }),
        [show]
    );

    return (
        <ToastContext.Provider value={{ toasts, show, success, error, warning, info, dismiss }}>
            {children}
            {/* Toast Container */}
            <div
                aria-live="assertive"
                className="pointer-events-none fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2.5 p-2 sm:bottom-6 sm:right-6"
            >
                {toasts.map((toast) => (
                    <Toast key={toast.id} toast={toast} onClose={dismiss} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export default ToastProvider;
