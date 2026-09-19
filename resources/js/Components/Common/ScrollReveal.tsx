import React, { CSSProperties, useEffect, useRef, useState } from "react";
import { useScrollRevealContext } from "../../utils/scrollRevealContext";

interface ScrollRevealProps {
    children: React.ReactNode;
    /**
     * Delay stagger dalam ms (misal: 0, 100, 200 untuk 3 cards berurutan).
     * Default: 0
     */
    delay?: number;
    /**
     * Jarak geser vertikal awal dalam px sebelum muncul.
     * Default: 28
     */
    distance?: number;
    /**
     * Durasi animasi dalam ms.
     * Default: 600
     */
    duration?: number;
    /** Class tambahan pada wrapper */
    className?: string;
    /** Tag HTML yang dirender, default 'div' */
    as?: React.ElementType;
    /**
     * Threshold IntersectionObserver (0–1).
     * Default: 0.12
     */
    threshold?: number;
    /**
     * Jika true, elemen sudah terlihat sejak awal (berguna untuk hero above-fold).
     * Default: false
     */
    immediate?: boolean;
}

/**
 * Membungkus children dengan animasi fade-in + slide-up saat masuk viewport.
 *
 * - Merespons replayKey dari ScrollRevealContext (tombol "Putar ulang")
 * - Respects prefers-reduced-motion (animasi di-skip jika user aktifkan setting tersebut)
 * - Inner elements dengan class `.reveal-scale` akan scale-in setelah container visible
 */
export function ScrollReveal({
    children,
    delay = 0,
    distance = 28,
    duration = 600,
    className = "",
    as: Tag = "div",
    threshold = 0.12,
    immediate = false,
}: ScrollRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const [visible, setVisible] = useState(immediate);
    const { replayKey } = useScrollRevealContext();
    const observerRef = useRef<IntersectionObserver | null>(null);

    const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reset dan re-observe setiap replayKey berubah
    useEffect(() => {
        if (prefersReduced) {
            setVisible(true);
            return;
        }
        if (immediate) {
            setVisible(true);
            return;
        }

        // Reset visibility
        setVisible(false);

        // Cleanup observer lama
        if (observerRef.current) {
            observerRef.current.disconnect();
        }

        // Delay kecil agar DOM selesai render ulang setelah reset
        const setupTimer = setTimeout(() => {
            const el = ref.current;
            if (!el) return;

            observerRef.current = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        observerRef.current?.disconnect();
                    }
                },
                {
                    threshold,
                    rootMargin: "0px 0px -40px 0px",
                }
            );

            observerRef.current.observe(el);
        }, 80);

        return () => {
            clearTimeout(setupTimer);
            observerRef.current?.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [replayKey]);

    const style: CSSProperties = {
        transitionDuration: `${duration}ms`,
        transitionDelay: visible ? `${delay}ms` : "0ms",
    };

    const Component = (Tag || "div") as any;

    return (
        <Component
            ref={ref}
            style={style}
            className={`reveal-item${visible ? " is-visible" : ""} ${className}`}
        >
            {children}
        </Component>
    );
}

export default ScrollReveal;
