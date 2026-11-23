"use client";

import { Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useT } from "@/lib/i18n";
import { logoImage } from "@/lib/media";
import { site, telHref, waHref } from "@/lib/site";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { LangSwitch } from "./ui/LangSwitch";
import { TumarMark } from "./ui/Logo";

export const NAV_IDS = ["about", "groups", "food", "clubs", "gallery", "documents", "contacts"] as const;

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const panel = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Подсветка текущего раздела в меню
  useEffect(() => {
    const sections = NAV_IDS.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    const onTop = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onTop, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onTop);
    };
  }, []);

  // Мобильное меню: закрытие по Escape, клику вне меню и при переходе на компьютерную ширину
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!panel.current?.contains(target) && !toggle.current?.contains(target)) setOpen(false);
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    mq.addEventListener("change", onMq);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
      mq.removeEventListener("change", onMq);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const brand = (
    <a
      href="#top"
      onClick={() => setOpen(false)}
      aria-label={t.a11y.home}
      className="group flex min-w-0 items-center gap-2.5 rounded-2xl"
    >
      {logoImage ? (
        <Image src={logoImage.src} alt="" width={44} height={44} className="size-10 shrink-0 rounded-full object-contain lg:size-11" />
      ) : (
        <TumarMark className="size-10 shrink-0 transition-transform duration-300 group-hover:-rotate-6 lg:size-11" />
      )}
      <span className="min-w-0 leading-none">
        <span className="font-display block text-[1.35rem] font-bold text-teal-deep lg:text-[1.45rem]">{site.brand}</span>
        <span className="mt-1 block truncate text-[0.72rem] font-bold tracking-wide text-ink-soft uppercase">
          <span className="sm:hidden">{t.brand.short}</span>
          <span className="hidden sm:inline">{t.brand.kind}</span>
        </span>
      </span>
    </a>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? "bg-milk/95 shadow-[0_6px_24px_-16px_rgb(36_50_74/0.35)] backdrop-blur-md" : "bg-milk/70 backdrop-blur-sm"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <a
        href="#main"
        className="sr-only rounded-full bg-ink px-4 py-2 font-bold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50"
      >
        {t.a11y.skip}
      </a>

      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-3">
        {brand}

        <nav aria-label={t.a11y.nav} className="hidden lg:block">
          <ul className="flex items-center gap-0.5 xl:gap-1">
            {NAV_IDS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`relative block rounded-full px-2.5 py-2 text-[0.93rem] font-bold transition-colors xl:px-3 ${
                    active === id ? "bg-teal-soft text-teal-deep" : "text-ink hover:bg-white hover:text-teal-deep"
                  }`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LangSwitch className="hidden min-[380px]:inline-flex" />
          <a
            href={waHref(t.cta.waText)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-wa hidden !min-h-11 !px-4 lg:inline-flex"
            aria-label={`${t.cta.whatsapp} (${t.a11y.newTab})`}
          >
            <WhatsAppIcon className="size-5" />
            <span className="hidden xl:inline">{t.cta.whatsappShort}</span>
          </a>
          <button
            ref={toggle}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.a11y.menuClose : t.a11y.menuOpen}
            className="grid size-12 place-items-center rounded-full bg-white text-ink shadow-soft ring-1 ring-line lg:hidden"
          >
            {open ? <X className="size-6" aria-hidden /> : <Menu className="size-6" aria-hidden />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        ref={panel}
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100svh-var(--header-h))] overflow-y-auto overscroll-contain border-t border-line bg-milk lg:hidden"
      >
        <nav aria-label={t.a11y.nav} className="container-x py-4">
          <ul className="grid grid-cols-2 gap-2">
            {NAV_IDS.map((id, i) => (
              <li key={id} className={i === NAV_IDS.length - 1 && NAV_IDS.length % 2 ? "col-span-2" : undefined}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-13 items-center rounded-2xl px-4 text-[1.05rem] font-extrabold ${
                    ["bg-teal-soft", "bg-sun-soft", "bg-peach-soft", "bg-lavender-soft"][i % 4]
                  } text-ink`}
                >
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-wa flex-1">
              <WhatsAppIcon className="size-5" />
              {t.cta.whatsapp}
            </a>
            <a href={telHref} className="btn btn-light flex-1">
              <Phone className="size-5" aria-hidden />
              {site.phone.display}
            </a>
          </div>
          <div className="mt-4 flex justify-center min-[380px]:hidden">
            <LangSwitch />
          </div>
        </nav>
      </div>
    </header>
  );
}
