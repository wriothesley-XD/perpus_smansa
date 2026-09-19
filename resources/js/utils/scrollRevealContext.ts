import { createContext, useContext } from "react";

export interface ScrollRevealContextType {
    /** Increment ini untuk memicu ulang semua animasi reveal */
    replayKey: number;
    triggerReplay: () => void;
}

export const ScrollRevealContext = createContext<ScrollRevealContextType>({
    replayKey: 0,
    triggerReplay: () => {},
});

export const useScrollRevealContext = () => useContext(ScrollRevealContext);
