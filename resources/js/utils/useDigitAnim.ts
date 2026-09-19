import { useEffect, useRef } from "react";

/**
 * Trigger animasi digit pop-in setiap kali `value` berubah.
 * Attach ref yang dikembalikan ke elemen `.t-digit-group`.
 */
export function useDigitAnim(value: number | string) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Hapus kelas, paksa reflow, lalu tambah kembali
        el.classList.remove("is-animating");
        // Force reflow (flush pending style recalcs)
        void el.getBoundingClientRect();
        el.classList.add("is-animating");
    }, [value]);

    return ref;
}
