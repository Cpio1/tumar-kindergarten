/**
 * Иллюстрация первого экрана (показывается, пока нет фото main-page.png):
 * радуга, солнце, облака, оберег-тұмар и кубики с казахскими буквами.
 */
const anim = (cls: string, delay = "0s"): { className: string; style: React.CSSProperties } => ({
  className: cls,
  style: { transformBox: "fill-box", transformOrigin: "center", animationDelay: delay },
});

const cloud = "M28 62h66a22 22 0 0 0 2-43.9A30 30 0 0 0 40.5 14 20 20 0 0 0 10 32.6 15 15 0 0 0 28 62Z";
const star =
  "M24 3.5c1.3 0 2.4.8 2.9 2l4.2 9.4 10.2 1.1c2.8.3 3.9 3.8 1.8 5.6l-7.6 6.9 2.1 10c.6 2.8-2.4 4.9-4.8 3.5L24 36.8 15.2 42c-2.4 1.4-5.4-.7-4.8-3.5l2.1-10-7.6-6.9c-2.1-1.9-1-5.3 1.8-5.6l10.2-1.1 4.2-9.4c.5-1.2 1.6-2 2.9-2Z";

function Block({ x, y, r, fill, side, letter }: { x: number; y: number; r: number; fill: string; side: string; letter: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <rect x="4" y="6" width="56" height="56" rx="12" fill={side} />
      <rect width="56" height="56" rx="12" fill={fill} />
      <text
        x="28"
        y="39"
        textAnchor="middle"
        fontSize="30"
        fontWeight="700"
        fill="#24324a"
        style={{ fontFamily: "var(--font-comfortaa), var(--font-nunito), sans-serif" }}
      >
        {letter}
      </text>
    </g>
  );
}

export function HeroScene({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 560 470" className={className} aria-hidden focusable="false">
      <defs>
        <clipPath id="hero-blob">
          <path d="M286 18c92-4 196 40 232 128 36 86 4 196-64 256-70 62-178 70-268 48C98 428 24 360 16 268 8 172 68 92 146 50c42-22 90-30 140-32Z" />
        </clipPath>
      </defs>
      {/* мягкое пятно фона */}
      <path d="M286 18c92-4 196 40 232 128 36 86 4 196-64 256-70 62-178 70-268 48C98 428 24 360 16 268 8 172 68 92 146 50c42-22 90-30 140-32Z" fill="#e4f7f4" />
      {/* радуга */}
      {(
        [
          ["#ffbc9a", 198],
          ["#ffd65c", 174],
          ["#6fd3c9", 150],
          ["#c9b8f4", 126],
        ] as const
      ).map(([c, r]) => (
        <path key={c} d={`M${280 - r} 336a${r} ${r} 0 0 1 ${r * 2} 0`} stroke={c} strokeWidth="21" strokeLinecap="round" fill="none" />
      ))}
      {/* холмы */}
      <g clipPath="url(#hero-blob)">
        <path d="M0 382c70-34 150-44 236-26 92 20 168 8 238-18 34-12 62-14 86-10v142H0Z" fill="#bfeee8" />
        <path d="M0 414c88-22 170-20 262-4 96 16 196 10 298-18v78H0Z" fill="#9fe2d9" />
      </g>

      {/* солнце */}
      <g {...anim("animate-float", "-2s")}>
        <g transform="translate(436 30)">
          {Array.from({ length: 10 }, (_, i) => (
            <rect key={i} x="45" y="0" width="10" height="20" rx="5" fill="#ffd65c" transform={`rotate(${i * 36} 50 50)`} />
          ))}
          <circle cx="50" cy="50" r="27" fill="#ffd65c" />
          <circle cx="41" cy="47" r="3" fill="#24324a" />
          <circle cx="59" cy="47" r="3" fill="#24324a" />
          <path d="M41 57c5 4.6 13 4.6 18 0" stroke="#24324a" strokeWidth="3.2" strokeLinecap="round" fill="none" />
          <circle cx="34" cy="56" r="4" fill="#ffbc9a" />
          <circle cx="66" cy="56" r="4" fill="#ffbc9a" />
        </g>
      </g>

      {/* облака у концов радуги */}
      <g {...anim("animate-drift")}>
        <path d={cloud} fill="#fff" transform="translate(14 286) scale(1.15)" />
      </g>
      <g {...anim("animate-drift", "-9s")}>
        <path d={cloud} fill="#fff" transform="translate(410 292) scale(1.1)" />
      </g>
      <path d={cloud} fill="#fff" opacity="0.9" transform="translate(70 70) scale(0.7)" />

      {/* оберег-тұмар */}
      <g {...anim("animate-float")}>
        <g transform="translate(196 150) scale(2.6)">
          <path d="M22 17c0-9 20-9 20 0" stroke="#5f45b5" strokeOpacity="0.55" strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <path d="M11 19.5h42L32 57.5Z" fill="#6fd3c9" stroke="#6fd3c9" strokeWidth="7" strokeLinejoin="round" />
          <path d="M19 23.5h26L32 47Z" fill="#ffd65c" stroke="#ffd65c" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="27.5" cy="30" r="1.9" fill="#24324a" />
          <circle cx="36.5" cy="30" r="1.9" fill="#24324a" />
          <path d="M28.5 35c2 2 5 2 7 0" stroke="#24324a" strokeWidth="1.9" strokeLinecap="round" fill="none" />
          <circle cx="24.5" cy="34" r="1.7" fill="#ffbc9a" />
          <circle cx="39.5" cy="34" r="1.7" fill="#ffbc9a" />
          <circle cx="32" cy="16" r="2.6" fill="#ffbc9a" />
          <path d="M9 23.5 4 27M55 23.5l5 3.5" stroke="#0f7368" strokeOpacity="0.5" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* кубики с буквами */}
      <Block x={52} y={352} r={-8} fill="#ffbc9a" side="#e8956f" letter="Ә" />
      <Block x={112} y={370} r={6} fill="#ffd65c" side="#e7b937" letter="Ұ" />
      <Block x={84} y={300} r={-2} fill="#c9b8f4" side="#a890e6" letter="Қ" />

      {/* цветочки */}
      {(
        [
          [432, 392, "#ffbc9a", 1],
          [478, 404, "#c9b8f4", 0.8],
          [392, 414, "#ffd65c", 0.7],
        ] as const
      ).map(([x, y, c, s]) => (
        <g key={`${x}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0v34" stroke="#3fae9f" strokeWidth="4" strokeLinecap="round" />
          {[0, 72, 144, 216, 288].map((r) => (
            <ellipse key={r} cx="0" cy="-11" rx="7" ry="10" fill={c} transform={`rotate(${r})`} />
          ))}
          <circle r="6.5" fill="#fff6d0" />
        </g>
      ))}

      {/* звёздочки */}
      <g {...anim("animate-twinkle")}>
        <path d={star} fill="#ffd65c" transform="translate(190 64) scale(0.6)" />
      </g>
      <g {...anim("animate-twinkle", "-1.2s")}>
        <path d={star} fill="#ffbc9a" transform="translate(388 168) scale(0.45)" />
      </g>
      <g {...anim("animate-twinkle", "-2.4s")}>
        <path d="M16 1c1.4 7.6 7.4 13.6 15 15-7.6 1.4-13.6 7.4-15 15-1.4-7.6-7.4-13.6-15-15C8.6 14.6 14.6 8.6 16 1Z" fill="#c9b8f4" transform="translate(150 190) scale(0.8)" />
      </g>
      <g {...anim("animate-twinkle", "-0.6s")}>
        <path d="M16 1c1.4 7.6 7.4 13.6 15 15-7.6 1.4-13.6 7.4-15 15-1.4-7.6-7.4-13.6-15-15C8.6 14.6 14.6 8.6 16 1Z" fill="#6fd3c9" transform="translate(356 92) scale(0.7)" />
      </g>
    </svg>
  );
}
