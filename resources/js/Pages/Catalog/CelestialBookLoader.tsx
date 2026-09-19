import React from "react";

export type TimePhase = "dawn" | "day" | "sunset" | "night";

interface CelestialBookLoaderProps {
    bookTitle: string;
    opacity: number;
    currentTimePhase: TimePhase;
    onChangeTimePhase: (phase: TimePhase) => void;
    onDismiss: () => void;
}

export function CelestialBookLoader({
    bookTitle,
    opacity,
    currentTimePhase,
    onChangeTimePhase,
    onDismiss,
}: CelestialBookLoaderProps) {
    const themes = {
        dawn: {
            name: "Fajar Pagi",
            label: "Pagi • Siluet Marapi & Singgalang",
            bg: "linear-gradient(to bottom, #1e1b4b 0%, #431407 35%, #b45309 65%, #fde047 100%)",
            greeting: "Selamat Pagi!",
            subGreeting: "Menyiapkan lembaran buku di sejuknya fajar Minangkabau...",
            mountainBack: "#064e3b",
            mountainFront: "#047857",
            celestialType: "rising-sun" as const,
            celestialStyle: "from-amber-200 via-amber-400 to-yellow-200 shadow-[0_0_70px_rgba(251,191,36,0.65)]",
            hasStars: false,
            cloudColor: "bg-amber-100/30",
        },
        day: {
            name: "Siang Cerah",
            label: "Siang • Langit Biru Cerah",
            bg: "radial-gradient(ellipse at 50% 15%, #0284c7 0%, #0369a1 45%, #0f172a 100%)",
            greeting: "Semangat Membaca!",
            subGreeting: "Menjelajahi jendela ilmu pengetahuan bersama SMAN 1 Bukittinggi...",
            mountainBack: "#0284c7",
            mountainFront: "#0369a1",
            celestialType: "sun" as const,
            celestialStyle: "from-yellow-300 via-amber-400 to-yellow-100 shadow-[0_0_70px_rgba(251,191,36,0.6)]",
            hasStars: false,
            cloudColor: "bg-white/35",
        },
        sunset: {
            name: "Sore / Sunset",
            label: "Senja • Sunset Khas Ranah Minang",
            bg: "linear-gradient(to bottom, #2e1065 0%, #7c2d12 30%, #ea580c 65%, #fbbf24 100%)",
            greeting: "Menikmati Senja yang Syahdu...",
            subGreeting: "Menemani istirahat sore Anda dengan buku terbaik...",
            mountainBack: "#431407",
            mountainFront: "#78350f",
            celestialType: "sunset-sun" as const,
            celestialStyle: "from-orange-400 via-amber-500 to-rose-400 shadow-[0_0_80px_rgba(249,115,22,0.7)]",
            hasStars: true,
            cloudColor: "bg-orange-200/25",
        },
        night: {
            name: "Malam Hening",
            label: "Malam • Bulan & Bertabur Bintang",
            bg: "radial-gradient(ellipse at 50% 20%, #1e1b4b 0%, #0f172a 55%, #030712 100%)",
            greeting: "Membaca di Hening Malam...",
            subGreeting: "Suasana tenang untuk menyerap inspirasi dan wawasan...",
            mountainBack: "#090d16",
            mountainFront: "#0f172a",
            celestialType: "moon" as const,
            celestialStyle: "from-slate-100 via-slate-200 to-slate-300 shadow-[0_0_55px_rgba(226,232,240,0.5)]",
            hasStars: true,
            cloudColor: "bg-indigo-300/15",
        },
    };

    const currentTheme = themes[currentTimePhase];

    return (
        <div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-all duration-700 ease-out select-none"
            style={{
                opacity,
                pointerEvents: opacity === 0 ? "none" : "auto",
                background: currentTheme.bg,
            }}
        >
            {/* Time Phase Preview Switcher (Allows testing/previewing all 4 times) */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-1 rounded-full border border-white/20 bg-black/30 p-1 backdrop-blur-md">
                <span className="hidden sm:inline px-2 text-[10px] font-bold text-white/70">Waktu:</span>
                {(["dawn", "day", "sunset", "night"] as const).map((phase) => (
                    <button
                        key={phase}
                        type="button"
                        onClick={() => onChangeTimePhase(phase)}
                        className={`rounded-full px-2.5 py-1 text-[10px] font-bold transition ${
                            currentTimePhase === phase
                                ? "bg-white text-slate-900 shadow-sm scale-105"
                                : "text-white/60 hover:text-white hover:bg-white/10"
                        }`}
                    >
                        {phase === "dawn" ? "🌅 Fajar" : phase === "day" ? "☀️ Siang" : phase === "sunset" ? "🌇 Senja" : "🌙 Malam"}
                    </button>
                ))}
            </div>

            {/* Celestial Body: Sun or Moon (with craters for night) */}
            <div className="pointer-events-none absolute top-10 right-10 sm:top-14 sm:right-24 transition-all duration-700">
                {currentTheme.celestialType === "moon" ? (
                    <div className="relative size-20 sm:size-24 rounded-full bg-gradient-to-tr from-slate-200 via-slate-100 to-white shadow-[0_0_55px_rgba(226,232,240,0.5)]">
                        {/* Moon craters */}
                        <div className="absolute top-3 left-4 size-3 rounded-full bg-slate-300/60 shadow-inner" />
                        <div className="absolute top-7 left-2 size-4 rounded-full bg-slate-300/60 shadow-inner" />
                        <div className="absolute top-11 left-7 size-2.5 rounded-full bg-slate-300/50 shadow-inner" />
                        {/* Soft lunar glow */}
                        <div className="absolute -inset-4 rounded-full bg-slate-100/10 animate-ping" style={{ animationDuration: "5s" }} />
                    </div>
                ) : (
                    <div className={`relative size-20 sm:size-24 rounded-full bg-gradient-to-tr ${currentTheme.celestialStyle}`}>
                        {/* Light rays & pulsing corona */}
                        <div className="absolute -inset-6 rounded-full bg-amber-400/20 animate-ping" style={{ animationDuration: "3.5s" }} />
                        <div className="absolute -inset-10 rounded-full bg-amber-400/10" />
                    </div>
                )}
            </div>

            {/* Soft Drifting Clouds */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* Cloud 1 (Top Left) */}
                <div className="animate-float-cloud-left absolute top-12 -left-12 opacity-35">
                    <div className={`relative h-20 w-60 rounded-full ${currentTheme.cloudColor} blur-md`}>
                        <div className={`absolute -top-8 left-10 size-24 rounded-full ${currentTheme.cloudColor}`} />
                        <div className={`absolute -top-12 left-24 size-28 rounded-full ${currentTheme.cloudColor}`} />
                    </div>
                </div>

                {/* Cloud 2 (Mid Right) */}
                <div className="animate-float-cloud-right absolute top-44 -right-8 opacity-30">
                    <div className={`relative h-24 w-64 rounded-full ${currentTheme.cloudColor} blur-md`}>
                        <div className={`absolute -top-10 left-12 size-28 rounded-full ${currentTheme.cloudColor}`} />
                        <div className={`absolute -top-6 left-32 size-20 rounded-full ${currentTheme.cloudColor}`} />
                    </div>
                </div>

                {/* Cloud 3 (Bottom Left Soft Horizon) */}
                <div className="animate-float-cloud-left absolute bottom-24 left-12 opacity-20" style={{ animationDuration: "12s" }}>
                    <div className={`relative h-16 w-52 rounded-full ${currentTheme.cloudColor} blur-lg`}>
                        <div className={`absolute -top-6 left-16 size-20 rounded-full ${currentTheme.cloudColor}`} />
                    </div>
                </div>
            </div>

            {/* Twinkling 4-Point Stars (Active in Night & Sunset) */}
            {currentTheme.hasStars && (
                <div className="pointer-events-none absolute inset-0">
                    <svg className="animate-twinkle-1 absolute top-20 left-1/4 size-5 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 10 20 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg className="animate-twinkle-2 absolute top-1/3 right-1/4 size-4 text-sky-200 drop-shadow-[0_0_8px_rgba(186,230,253,0.8)]" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg className="animate-twinkle-3 absolute bottom-36 left-1/3 size-4 text-amber-200 drop-shadow-[0_0_8px_rgba(254,240,138,0.8)]" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg className="animate-twinkle-1 absolute top-28 right-1/3 size-3 text-white opacity-80" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                    <svg className="animate-twinkle-2 absolute bottom-28 right-1/4 size-5 text-amber-300" viewBox="0 0 20 20">
                        <path fill="currentColor" d="M 0 10 C 10 10,10 10 ,0 10 C 10 10 , 10 10 , 20 10 C 10 10 , 10 10 , 10 0 C 10 10,10 10 ,0 10 Z" />
                    </svg>
                </div>
            )}

            {/* Scenic Mountain Silhouettes: Gunung Marapi & Gunung Singgalang Bukittinggi */}
            <svg
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-44 w-full transition-all duration-700"
                viewBox="0 0 1200 320"
                preserveAspectRatio="none"
            >
                {/* Back Mountain: Gunung Singgalang */}
                <path
                    d="M0,320 L0,190 Q220,70 450,190 Q620,40 850,210 Q1040,100 1200,180 L1200,320 Z"
                    fill={currentTheme.mountainBack}
                    className="transition-colors duration-700"
                />
                {/* Front Mountain: Gunung Marapi */}
                <path
                    d="M0,320 L0,240 Q180,140 380,240 Q620,110 880,250 Q1060,170 1200,240 L1200,320 Z"
                    fill={currentTheme.mountainFront}
                    className="transition-colors duration-700 opacity-90"
                />
            </svg>

            {/* Centered Flipbook Loader (Exact Uiverse Component) */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="book-loader">
                    <div>
                        <ul>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <li key={i}>
                                    <svg fill="currentColor" viewBox="0 0 90 120">
                                        <path d="M90,0 L90,120 L11,120 C4.92486775,120 0,115.075132 0,109 L0,11 C0,4.92486775 4.92486775,0 11,0 L90,0 Z M71.5,81 L18.5,81 C17.1192881,81 16,82.1192881 16,83.5 C16,84.8254834 17.0315359,85.9100387 18.3356243,85.9946823 L18.5,86 L71.5,86 C72.8807119,86 74,84.8807119 74,83.5 C74,82.1745166 72.9684641,81.0899613 71.6643757,81.0053177 L71.5,81 Z M71.5,57 L18.5,57 C17.1192881,57 16,58.1192881 16,59.5 C16,60.8254834 17.0315359,61.9100387 18.3356243,61.9946823 L18.5,62 L71.5,62 C72.8807119,62 74,60.8807119 74,59.5 C74,58.1192881 72.8807119,57 71.5,57 Z M71.5,33 L18.5,33 C17.1192881,33 16,34.1192881 16,35.5 C16,36.8254834 17.0315359,37.9100387 18.3356243,37.9946823 L18.5,38 L71.5,38 C72.8807119,38 74,36.8807119 74,35.5 C74,34.1192881 72.8807119,33 71.5,33 Z" />
                                    </svg>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <span className="text-white/95 font-sans tracking-wide">
                        {currentTheme.greeting}
                    </span>
                </div>

                {/* Book Title & Landscape Greeting */}
                <div className="mt-14 text-center max-w-md px-4">
                    <h3 className="font-display text-base sm:text-lg font-bold text-white drop-shadow-md">
                        {bookTitle}
                    </h3>
                    <p className="mt-1 text-xs text-amber-200/90 font-medium">
                        {currentTheme.subGreeting}
                    </p>
                    <p className="mt-0.5 text-[11px] text-white/60">
                        {currentTheme.label} • SMAN 1 Bukittinggi
                    </p>
                    <button
                        type="button"
                        onClick={onDismiss}
                        className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[11px] font-semibold text-white/90 backdrop-blur-sm transition hover:bg-white/20 active:scale-95 shadow-sm"
                    >
                        Mulai Membaca Sekarang &rarr;
                    </button>
                </div>
            </div>
        </div>
    );
}
