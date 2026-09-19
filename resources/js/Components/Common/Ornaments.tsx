import React from 'react';

/** Realistic Paper Clip SVG */
export function RealPaperClip({ className = "", color = "#788796", rotate = 15 }: { className?: string; color?: string; rotate?: number }) {
  return (
    <svg
      width="20"
      height="45"
      viewBox="0 0 24 55"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(1px 2px 2px rgba(0,0,0,0.18))' }}
      aria-hidden="true"
    >
      <path
        d="M8 12 V38 C8 44 12 48 17 48 C22 48 26 44 26 38 V8 C26 3.5 22 0 17 0 C12 0 8 3.5 8 8 V38 C8 41 10.5 43.5 13.5 43.5 C16.5 43.5 19 41 19 38 V12"
        stroke={color}
        strokeWidth="2.8"
        strokeLinecap="round"
        fill="none"
      />
      {/* Metallic highlight */}
      <path
        d="M9 12 V38 C9 43 12.5 46.5 16.5 46.5"
        stroke="rgba(255,255,255,0.7)"
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Washi Tape Strip with Torn Edges */
export function WashiTapeStrip({
  width = "70px",
  height = "22px",
  color = "rgba(186, 215, 245, 0.85)",
  rotate = -2,
  className = ""
}: {
  width?: string;
  height?: string;
  color?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute pointer-events-none z-20 ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 90% 100%, 95% 0%, 100% 100%, 95% 0%, 5% 0%)'
      }}
      aria-hidden="true"
    />
  );
}

/** Leaf Illustration with Botanical Look */
export function BotanicalLeaf({ className = "", size = 64, color = "#2E5A44", rotate = 0 }: { className?: string; size?: number; color?: string; rotate?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 70 95"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden="true"
    >
      <path
        d="M35 5 C35 5 15 35 15 60 C15 78 25 90 35 92 C45 90 55 78 55 60 C55 35 35 5 Z"
        fill={color}
        fillOpacity="0.85"
      />
      <path d="M35 15 V90" stroke="#FFF" strokeWidth="1.5" strokeOpacity="0.4" strokeLinecap="round" />
      <path d="M35 35 Q22 45 18 52" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
      <path d="M35 48 Q48 58 52 65" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
      <path d="M35 62 Q24 72 20 78" stroke="#FFF" strokeWidth="1.2" strokeOpacity="0.35" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn Star Doodle */
export function HandDrawnStar({ size = 20, color = "#E37C5B", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2 L14.5 8.5 L21 9 L16 13.5 L17.5 20 L12 16.5 L6.5 20 L8 13.5 L3 9 L9.5 8.5 Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/** Circular READ MORE Stamp Badge */
export function ReadMoreStamp({ className = "" }: { className?: string }) {
  return (
    <div
      className={`stamp-badge size-14 md:size-16 z-20 cursor-pointer transition-transform hover:scale-110 active:scale-95 ${className}`}
      style={{ transform: 'rotate(-8deg)' }}
      >
      <span className="font-mono-display text-[9px] md:text-[10px] font-extrabold tracking-wider">READ</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16M8 7h8M8 11h8" />
      </svg>
      <span className="font-mono-display text-[8px] md:text-[9px] font-extrabold tracking-wider">MORE</span>
    </div>
  );
}

/** Hand-drawn curved brush underline stroke (Orange #FF8E4F) */
export function BrushUnderline({ className = "", color = "#FF8E4F" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 170 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none absolute -bottom-1.5 left-0 w-full overflow-visible ${className}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 8.5C32 3.5 90 2 167.5 7.5C125 4.5 45 4 10 10.5"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 4-point Crisp Sparkle */
export function SparkleFourPoint({ size = 16, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 2 Q12 12 22 12 Q12 12 12 22 Q12 12 2 12 Q12 12 12 2 Z"
        fill={color}
      />
    </svg>
  );
}

/** Dot Cluster decoration */
export function DotCluster({ className = "", color = "#FFC533" }: { className?: string; color?: string }) {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="2.5" fill={color} />
      <circle cx="24" cy="8" r="2.5" fill={color} />
      <circle cx="40" cy="8" r="2.5" fill={color} />
      <circle cx="8" cy="24" r="2.5" fill={color} />
      <circle cx="24" cy="24" r="2.5" fill={color} />
      <circle cx="40" cy="24" r="2.5" fill={color} />
      <circle cx="8" cy="40" r="2.5" fill={color} />
      <circle cx="24" cy="40" r="2.5" fill={color} />
      <circle cx="40" cy="40" r="2.5" fill={color} />
    </svg>
  );
}

/** Doodle Outline Icons for CTA section */
export function DoodleBook({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M4 7 C10 6 13 8 16 10 C19 8 22 6 28 7 V25 C22 24 19 26 16 28 C13 26 10 24 4 25 Z" />
      <path d="M16 10 V28" />
    </svg>
  );
}

export function DoodleGlasses({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="9" cy="18" r="5" />
      <circle cx="23" cy="18" r="5" />
      <path d="M14 18 C16 16 16 16 18 18" />
      <path d="M4 18 C3 12 7 8 10 7" />
      <path d="M28 18 C29 12 25 8 22 7" />
    </svg>
  );
}

export function DoodleGraduationCap({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 6 L29 13 L16 20 L3 13 Z" />
      <path d="M7 15.5 V22 C7 25 11 27 16 27 C21 27 25 25 25 22 V15.5" />
      <path d="M29 13 V23" />
    </svg>
  );
}

export function DoodleBulb({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M16 4 C11 4 8 8 8 13 C8 17 11 19 12 22 H20 C21 19 24 17 24 13 C24 8 21 4 16 4 Z" />
      <path d="M12 25 H20" />
      <path d="M13 28 H19" />
    </svg>
  );
}

export function DoodleTote({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="6" y="11" width="20" height="17" rx="3" />
      <path d="M11 11 V8 C11 5.5 13 4 16 4 C19 4 21 5.5 21 8 V11" />
    </svg>
  );
}

export function DoodleChat({ size = 28, color = "#FFC533", className = "" }: { size?: number; color?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M6 8 C6 5.8 8 4 11 4 H21 C24 4 26 5.8 26 8 V18 C26 20.2 24 22 21 22 H12 L6 27 Z" />
      <circle cx="11" cy="13" r="1" fill={color} />
      <circle cx="16" cy="13" r="1" fill={color} />
      <circle cx="21" cy="13" r="1" fill={color} />
    </svg>
  );
}
