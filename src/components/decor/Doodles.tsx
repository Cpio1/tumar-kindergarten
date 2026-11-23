/** Небольшие декоративные SVG-элементы: облака, звёздочки, цветочки, радуга, солнце. */
type P = { className?: string; style?: React.CSSProperties };

const svg = (className?: string, style?: React.CSSProperties) => ({
  className,
  style,
  "aria-hidden": true as const,
  focusable: "false" as const,
});

export function Cloud({ className, style, fill = "#fff" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 120 64" {...svg(className, style)}>
      <path
        d="M28 62h66a22 22 0 0 0 2-43.9A30 30 0 0 0 40.5 14 20 20 0 0 0 10 32.6 15 15 0 0 0 28 62Z"
        fill={fill}
      />
    </svg>
  );
}

export function Star({ className, style, fill = "#ffd65c" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 48 48" {...svg(className, style)}>
      <path
        d="M24 3.5c1.3 0 2.4.8 2.9 2l4.2 9.4 10.2 1.1c2.8.3 3.9 3.8 1.8 5.6l-7.6 6.9 2.1 10c.6 2.8-2.4 4.9-4.8 3.5L24 36.8 15.2 42c-2.4 1.4-5.4-.7-4.8-3.5l2.1-10-7.6-6.9c-2.1-1.9-1-5.3 1.8-5.6l10.2-1.1 4.2-9.4c.5-1.2 1.6-2 2.9-2Z"
        fill={fill}
      />
    </svg>
  );
}

export function Sparkle({ className, style, fill = "#c9b8f4" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 32 32" {...svg(className, style)}>
      <path d="M16 1c1.4 7.6 7.4 13.6 15 15-7.6 1.4-13.6 7.4-15 15-1.4-7.6-7.4-13.6-15-15C8.6 14.6 14.6 8.6 16 1Z" fill={fill} />
    </svg>
  );
}

export function Flower({ className, style, petal = "#ffbc9a", core = "#ffd65c" }: P & { petal?: string; core?: string }) {
  return (
    <svg viewBox="0 0 48 48" {...svg(className, style)}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="24" cy="12.5" rx="8" ry="11" fill={petal} transform={`rotate(${r} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="7" fill={core} />
    </svg>
  );
}

export function Heart({ className, style, fill = "#ffbc9a" }: P & { fill?: string }) {
  return (
    <svg viewBox="0 0 40 36" {...svg(className, style)}>
      <path d="M20 35S2 24.4 2 12.2A9.8 9.8 0 0 1 20 6.8a9.8 9.8 0 0 1 18 5.4C38 24.4 20 35 20 35Z" fill={fill} />
    </svg>
  );
}

export function Sun({ className, style }: P) {
  return (
    <svg viewBox="0 0 80 80" {...svg(className, style)}>
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x="37" y="2" width="6" height="14" rx="3" fill="#ffd65c" transform={`rotate(${i * 36} 40 40)`} />
      ))}
      <circle cx="40" cy="40" r="19" fill="#ffd65c" />
      <circle cx="33.5" cy="38" r="2.2" fill="#24324a" />
      <circle cx="46.5" cy="38" r="2.2" fill="#24324a" />
      <path d="M34 45.5c3.4 3.2 8.6 3.2 12 0" stroke="#24324a" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <circle cx="29" cy="44" r="2.6" fill="#ffbc9a" />
      <circle cx="51" cy="44" r="2.6" fill="#ffbc9a" />
    </svg>
  );
}

export function Rainbow({ className, style }: P) {
  const arcs = [
    ["#ffbc9a", 54],
    ["#ffd65c", 44],
    ["#6fd3c9", 34],
    ["#c9b8f4", 24],
  ] as const;
  return (
    <svg viewBox="0 0 120 64" {...svg(className, style)}>
      {arcs.map(([c, r]) => (
        <path key={c} d={`M${60 - r} 62a${r} ${r} 0 0 1 ${r * 2} 0`} stroke={c} strokeWidth="9" strokeLinecap="round" fill="none" />
      ))}
    </svg>
  );
}

/** Мягкая волна-разделитель между разделами. `fill` — цвет следующего раздела. */
export function Wave({ className, fill, flip = false }: { className?: string; fill: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={`pointer-events-none block h-6 w-full sm:h-9 lg:h-10 ${flip ? "rotate-180" : ""} ${className ?? ""}`}
    >
      <path d="M0 48V22c120-14 240-20 360-10s240 26 360 22 240-24 360-26 240 14 360 18v22Z" fill={fill} />
    </svg>
  );
}
