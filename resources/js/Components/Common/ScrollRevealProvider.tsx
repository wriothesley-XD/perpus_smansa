import React, { useCallback, useEffect, useRef, useState } from "react";
import { ScrollRevealContext } from "../../utils/scrollRevealContext";
import { RotateCcw } from "lucide-react";

interface ScrollRevealProviderProps {
    children: React.ReactNode;
}

/**
 * Provider yang membungkus halaman dan menyediakan:
 * - Context replayKey untuk semua ScrollReveal children
 * - Floating replay button yang muncul setelah animasi pertama selesai
 */
export function ScrollRevealProvider({ children }: ScrollRevealProviderProps) {
    const [replayKey, setReplayKey] = useState(0);
    const [showReplay, setShowReplay] = useState(false);

    // Munculkan tombol replay setelah 2.5 detik (animasi pertama sudah selesai)
    useEffect(() => {
        const timer = setTimeout(() => setShowReplay(true), 2500);
        return () => clearTimeout(timer);
    }, []);

    const triggerReplay = useCallback(() => {
        // Scroll ke atas dulu agar semua elemen bisa di-reveal ulang
        window.scrollTo({ top: 0, behavior: "smooth" });
        // Delay singkat biar scroll selesai
        setTimeout(() => setReplayKey((k) => k + 1), 400);
    }, []);

    return (
        <ScrollRevealContext.Provider value={{ replayKey, triggerReplay }}>
            {children}

            {/* Floating Replay Button */}
            <div
                className={`fixed bottom-6 right-6 z-50 transition-all duration-500 ${
                    showReplay
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                }`}
            >
                <button
                    type="button"
                    onClick={triggerReplay}
                    title="Putar ulang animasi halaman"
                    className="group flex items-center gap-2 rounded-full border border-gray-200 bg-white/90 px-3.5 py-2 text-[11px] font-bold text-[#64748b] shadow-lg backdrop-blur-sm transition-all hover:border-[#2699fb] hover:bg-[#2699fb] hover:text-white hover:shadow-[#2699fb]/20 hover:shadow-xl active:scale-95 dark:border-slate-700 dark:bg-[#121826]/90 dark:text-slate-400 dark:hover:border-[#2699fb] dark:hover:bg-[#2699fb] dark:hover:text-white"
                >
                    <RotateCcw
                        size={13}
                        className="transition-transform duration-300 group-hover:-rotate-180"
                    />
                    <span>Putar ulang</span>
                </button>
            </div>
        </ScrollRevealContext.Provider>
    );
}

export default ScrollRevealProvider;
