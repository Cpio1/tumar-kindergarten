/** Иллюстрации для раздела «Питание»: тарелка, фрукты и овощи. Конкретное меню не изображается. */
type P = { className?: string; style?: React.CSSProperties };
const base = (className?: string, style?: React.CSSProperties) => ({ className, style, "aria-hidden": true as const, focusable: "false" as const });

export function Apple({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M24 14c-3-4-14-4-16 6-2 9 4 22 10 22 3 0 4-1.5 6-1.5s3 1.5 6 1.5c6 0 12-13 10-22-2-10-13-10-16-6Z" fill="#ff8f7a" />
      <path d="M24 14c0-4 1-7 4-9" stroke="#7a5230" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <path d="M26 10c3-4 8-4 10-2-2 3-6 5-10 2Z" fill="#5cc28a" />
      <ellipse cx="15.5" cy="22" rx="2.6" ry="4.5" fill="#fff" opacity=".45" transform="rotate(20 15.5 22)" />
    </svg>
  );
}

export function Carrot({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M30 12c4 0 7 3 7 7 0 3-2 4-5 7L12 44c-2 2-5-1-3-3l14-22c3-4 4-7 7-7Z" fill="#ffa04d" />
      <path d="M20 26l4 2M16 33l3 2M26 20l3 2" stroke="#e57f2a" strokeWidth="2" strokeLinecap="round" />
      <path d="M32 13c0-5 2-9 6-10-1 4-1 7-3 10M34 15c3-3 8-4 11-2-3 2-6 4-9 4M31 12c-2-4-1-8 1-10 1 4 2 6 1 10" fill="#5cc28a" stroke="#5cc28a" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function Pear({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M24 9c-4 0-5 4-6 9-1 4-8 7-8 15 0 7 6 11 14 11s14-4 14-11c0-8-7-11-8-15-1-5-2-9-6-9Z" fill="#c8e46a" />
      <path d="M24 9V4" stroke="#7a5230" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M25 7c2-3 6-3 8-1-2 2-5 3-8 1Z" fill="#5cc28a" />
      <ellipse cx="17" cy="31" rx="2.4" ry="4" fill="#fff" opacity=".45" />
    </svg>
  );
}

export function Broccoli({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M20 28h8l2 15c0 2-12 2-12 0Z" fill="#9bd77a" />
      <circle cx="15" cy="22" r="8" fill="#4fb878" />
      <circle cx="33" cy="22" r="8" fill="#4fb878" />
      <circle cx="24" cy="15" r="10" fill="#5cc28a" />
      <circle cx="24" cy="26" r="7" fill="#4fb878" />
      <circle cx="21" cy="12" r="2" fill="#8ee0a8" />
      <circle cx="31" cy="19" r="1.6" fill="#8ee0a8" />
    </svg>
  );
}

export function Strawberry({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M24 44C14 38 8 28 9 21c1-6 8-8 15-8s14 2 15 8c1 7-5 17-15 23Z" fill="#ff7a8a" />
      <path d="M14 14c3-1 6 1 10-2 4 3 7 1 10 2-1 3-5 4-10 3-5 1-9 0-10-3Z" fill="#5cc28a" />
      {[[17, 22], [24, 21], [31, 22], [20, 29], [28, 29], [24, 36]].map(([x, y]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx="1.1" ry="1.6" fill="#fff3a8" />
      ))}
    </svg>
  );
}

export function Banana({ className, style }: P) {
  return (
    <svg viewBox="0 0 48 48" {...base(className, style)}>
      <path d="M8 18c2 14 14 22 30 18 3-1 4-3 2-4-12 3-22-4-26-15-1-3-6-3-6 1Z" fill="#ffd65c" />
      <path d="M14 22c5 8 13 12 23 11" stroke="#e7b937" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M8 18l-2-4c-1-2 2-3 3-1l2 3" fill="#9c7a2f" />
    </svg>
  );
}

/** Большая тарелка с ложкой и вилкой; в центре — число приёмов пищи. */
export function Plate({ className, label, sub }: { className?: string; label: string; sub: string }) {
  return (
    <svg viewBox="0 0 320 300" className={className} role="img" aria-label={`${label} ${sub}`}>
      {/* вилка */}
      <g fill="#c9b8f4">
        <rect x="20" y="70" width="12" height="190" rx="6" />
        <path d="M10 40c0-6 4-10 4-10v40c0 8 6 12 12 12s12-4 12-12V30s4 4 4 10v32c0 14-8 22-16 22S10 86 10 72Z" />
      </g>
      {/* ложка */}
      <g fill="#6fd3c9">
        <rect x="288" y="92" width="12" height="170" rx="6" />
        <ellipse cx="294" cy="64" rx="18" ry="30" />
      </g>
      {/* тарелка */}
      <circle cx="160" cy="150" r="118" fill="#fff" />
      <circle cx="160" cy="150" r="118" fill="none" stroke="#efe5d6" strokeWidth="3" />
      <circle cx="160" cy="150" r="86" fill="#fff6e9" />
      <circle cx="160" cy="150" r="86" fill="none" stroke="#ffbc9a" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
      <text
        x="160"
        y="168"
        textAnchor="middle"
        fontSize="78"
        fontWeight="700"
        fill="#b24a22"
        style={{ fontFamily: "var(--font-comfortaa), var(--font-nunito), sans-serif" }}
      >
        {label}
      </text>
      <text
        x="160"
        y="200"
        textAnchor="middle"
        fontSize="19"
        fontWeight="800"
        fill="#55617a"
        style={{ fontFamily: "var(--font-nunito), sans-serif" }}
      >
        {sub}
      </text>
    </svg>
  );
}
