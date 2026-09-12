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
export function HandDrawnStar({ size = 20, color = "#2E8BE6", className = "" }: { size?: number; color?: string; className?: string }) {
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
