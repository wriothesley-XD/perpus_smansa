import React, { useRef, useState } from "react";

type TooltipPosition = "top" | "bottom" | "left" | "right";

interface TooltipProps {
    content: React.ReactNode;
    position?: TooltipPosition;
    delay?: number;
    children: React.ReactElement;
    className?: string;
}

const positionClasses: Record<TooltipPosition, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses: Record<TooltipPosition, string> = {
    top: "top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-[#1e293b] dark:border-t-slate-700",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-[#1e293b] dark:border-b-slate-700",
    left: "left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-[#1e293b] dark:border-l-slate-700",
    right: "right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-[#1e293b] dark:border-r-slate-700",
};

export function Tooltip({
    content,
    position = "top",
    delay = 300,
    children,
    className = "",
}: TooltipProps) {
    const [visible, setVisible] = useState(false);
    const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
        if (hideTimer.current) clearTimeout(hideTimer.current);
        showTimer.current = setTimeout(() => setVisible(true), delay);
    };

    const hide = () => {
        if (showTimer.current) clearTimeout(showTimer.current);
        hideTimer.current = setTimeout(() => setVisible(false), 150);
    };

    return (
        <span
            className={`relative inline-flex items-center ${className}`}
            onMouseEnter={show}
            onMouseLeave={hide}
            onFocus={show}
            onBlur={hide}
        >
            {children}

            {/* Tooltip bubble */}
            <span
                role="tooltip"
                className={`pointer-events-none absolute z-[9999] whitespace-nowrap rounded-lg bg-[#1e293b] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-md dark:bg-slate-700 transition-all duration-150 ${positionClasses[position]} ${
                    visible
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-95"
                }`}
            >
                {content}
                {/* Arrow */}
                <span
                    className={`absolute size-0 border-4 ${arrowClasses[position]}`}
                    aria-hidden="true"
                />
            </span>
        </span>
    );
}

export default Tooltip;
