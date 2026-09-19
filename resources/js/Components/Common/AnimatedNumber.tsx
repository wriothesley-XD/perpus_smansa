import React from "react";
import { useDigitAnim } from "../../utils/useDigitAnim";

interface AnimatedNumberProps {
    /** Nilai angka yang akan dianimasikan */
    value: number;
    /** Format locale, default 'id-ID' */
    locale?: string;
    /** Class tambahan pada wrapper */
    className?: string;
    /** Custom render value — jika diset, value ini yang ditampilkan (tapi value asli tetap jadi trigger) */
    display?: string;
}

/**
 * Menampilkan angka dengan animasi digit pop-in (staggered per karakter).
 * Tiap digit/karakter muncul dari bawah secara berurutan saat komponen mount
 * atau nilai berubah.
 *
 * Animasi di-skip otomatis jika user mengaktifkan `prefers-reduced-motion`.
 */
export function AnimatedNumber({
    value,
    locale = "id-ID",
    className = "",
    display,
}: AnimatedNumberProps) {
    const ref = useDigitAnim(value);
    const formatted = display ?? value.toLocaleString(locale);
    const chars = formatted.split("");

    return (
        <span
            ref={ref as React.RefObject<HTMLSpanElement>}
            className={`t-digit-group ${className}`}
        >
            {chars.map((char, i) => (
                <span
                    key={i}
                    className="t-digit"
                    // Stagger dimulai dari index 0, max 7 (sesuai CSS yang didefinisikan)
                    data-stagger={Math.min(i, 7) || undefined}
                >
                    {char}
                </span>
            ))}
        </span>
    );
}

export default AnimatedNumber;
