"use client";

import { useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";

/** Плавающая кнопка WhatsApp в правом нижнем углу (с учётом «чёлки» и панели жестов). */
export function WhatsAppFloat() {
  const t = useT();
  return (
    <a
      href={waHref(t.cta.waText)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t.a11y.waFloat} (${t.a11y.newTab})`}
      className="group fixed z-50 flex items-center gap-2"
      style={{
        right: "max(16px, env(safe-area-inset-right))",
        bottom: "max(16px, calc(env(safe-area-inset-bottom) + 12px))",
      }}
    >
      <span className="pointer-events-none hidden rounded-full bg-white px-3 py-1.5 text-sm font-extrabold text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 lg:block">
        {t.a11y.waFloat}
      </span>
      <span className="relative grid size-14 place-items-center rounded-full bg-wa text-white shadow-[0_12px_28px_-8px_rgb(21_128_61/0.65)] ring-4 ring-white transition-transform group-hover:scale-105 group-active:scale-95 lg:size-[60px]">
        <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-wa/40 [animation-duration:2.8s]" />
        <WhatsAppIcon className="relative size-7 lg:size-8" />
      </span>
    </a>
  );
}
