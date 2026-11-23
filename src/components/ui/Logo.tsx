/** Знак «Тұмар»: традиционный треугольный оберег-тұмар с орнаментом. */
export function TumarMark({ className, face = false }: { className?: string; face?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden focusable="false">
      <path d="M22 17c0-9 20-9 20 0" stroke="#c9b8f4" strokeWidth="3.4" fill="none" strokeLinecap="round" />
      <path
        d="M11 19.5h42L32 57.5Z"
        fill="#6fd3c9"
        stroke="#6fd3c9"
        strokeWidth="7"
        strokeLinejoin="round"
      />
      <path d="M19 23.5h26L32 47Z" fill="#ffd65c" stroke="#ffd65c" strokeWidth="3" strokeLinejoin="round" />
      {face ? (
        <>
          <circle cx="27.5" cy="30" r="1.9" fill="#24324a" />
          <circle cx="36.5" cy="30" r="1.9" fill="#24324a" />
          <path d="M28.5 35c2 2 5 2 7 0" stroke="#24324a" strokeWidth="1.9" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <path
          d="M32 28.5c1.8-3 6.5-2.2 6.5 1.4 0 3.2-6.5 7-6.5 7s-6.5-3.8-6.5-7c0-3.6 4.7-4.4 6.5-1.4Z"
          fill="#ffbc9a"
        />
      )}
      <circle cx="32" cy="16" r="2.6" fill="#ffbc9a" />
    </svg>
  );
}
