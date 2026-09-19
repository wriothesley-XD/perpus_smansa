import React from "react";

interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    ariaLabel?: string;
    className?: string;
}

/**
 * HamburgerButton
 * - Smooth morph animation between 3-bar hamburger and X icon
 * - Clean mobile-first button container
 * - Full accessible aria-expanded and aria-label states
 */
export function HamburgerButton({
    isOpen,
    onClick,
    ariaLabel,
    className = "",
}: HamburgerButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={ariaLabel || (isOpen ? "Tutup menu" : "Buka menu")}
            aria-expanded={isOpen}
            className={`relative grid size-10 place-items-center rounded-full border border-gray-200 text-[#152238] transition-colors hover:bg-gray-50 active:scale-95 focus:outline-none dark:border-slate-700 dark:text-white dark:hover:bg-slate-800 ${className}`}
        >
            <div className="relative flex h-3.5 w-4.5 flex-col justify-between" aria-hidden="true">
                {/* Top line */}
                <span
                    className={`block h-0.5 w-4.5 origin-center rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "translate-y-[6px] rotate-45" : "translate-y-0 rotate-0"
                    }`}
                />
                {/* Middle line */}
                <span
                    className={`block h-0.5 w-4.5 rounded-full bg-current transition-all duration-200 ease-out ${
                        isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                    }`}
                />
                {/* Bottom line */}
                <span
                    className={`block h-0.5 w-4.5 origin-center rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "-translate-y-[6px] -rotate-45" : "translate-y-0 rotate-0"
                    }`}
                />
            </div>
        </button>
    );
}

export default HamburgerButton;
