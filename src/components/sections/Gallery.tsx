"use client";

import { Camera, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useT } from "@/lib/i18n";
import { galleryPhotos, type Photo } from "@/lib/media";
import { site } from "@/lib/site";
import { Cloud, Flower, Sparkle, Star } from "../decor/Doodles";
import { InstagramIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

/** Сколько фото показывать до кнопки «Показать ещё». */
const INITIAL = 8;
const tileShapes = ["rounded-[28px_28px_28px_8px]", "rounded-[28px]", "rounded-[8px_28px_28px_28px]", "rounded-[28px_8px_28px_28px]"];

export function Gallery() {
  const t = useT();
  const g = t.gallery;
  const photos = galleryPhotos;
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  const visible = expanded ? photos : photos.slice(0, INITIAL);

  const close = useCallback(() => {
    setIndex((i) => {
      if (i !== null) requestAnimationFrame(() => thumbs.current[i]?.focus({ preventScroll: true }));
      return null;
    });
  }, []);

  const onOpen = (i: number) => {
    if (i >= INITIAL) setExpanded(true);
    setIndex(i);
  };

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section bg-milk">
      <Cloud className="decor -z-10 top-10 left-[-24px] w-24 animate-drift lg:left-[4%]" fill="#e4f7f4" />
      <Star className="decor -z-10 top-16 right-[6%] w-6 animate-twinkle" />

      <div className="container-x">
        <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={photos.length ? g.lead : undefined} tone="sun" />

        {photos.length === 0 ? (
          <EmptyGallery />
        ) : (
          <>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
              {visible.map((p, i) => (
                <li key={p.src} className="reveal" style={{ "--d": `${(i % 4) * 60}ms` } as React.CSSProperties}>
                  <button
                    ref={(el) => {
                      thumbs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => onOpen(i)}
                    aria-label={`${g.open}: ${g.counter(i + 1, photos.length)}`}
                    className={`group relative block aspect-[4/3] w-full overflow-hidden bg-teal-soft shadow-soft ring-1 ring-line ${tileShapes[i % tileShapes.length]} lg:aspect-auto lg:h-[min(200px,22svh)]`}
                  >
                    <Image
                      src={p.src}
                      alt={`${g.photoAlt} — ${i + 1}`}
                      fill
                      sizes="(min-width: 1024px) 280px, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute right-2 bottom-2 grid size-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-4" aria-hidden />
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {photos.length > INITIAL ? (
              <div className="mt-6 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  className="btn btn-light"
                >
                  {expanded ? <ChevronUp className="size-5" aria-hidden /> : <ChevronDown className="size-5" aria-hidden />}
                  {expanded ? g.less : `${g.more} (${photos.length - INITIAL})`}
                </button>
              </div>
            ) : null}
          </>
        )}
      </div>

      {index !== null ? <Lightbox photos={photos} index={index} setIndex={setIndex} onClose={close} /> : null}
    </section>
  );
}

function EmptyGallery() {
  const t = useT();
  const g = t.gallery;
  return (
    <div className="reveal relative mx-auto max-w-2xl overflow-hidden rounded-[48px_48px_48px_16px] bg-sun-soft px-6 py-10 text-center sm:px-10">
      <div aria-hidden className="relative mx-auto mb-5 flex h-28 w-48 items-end justify-center">
        <span className="absolute bottom-0 left-2 h-20 w-24 -rotate-12 rounded-2xl bg-white p-1.5 shadow-soft">
          <span className="block h-full w-full rounded-xl bg-[linear-gradient(180deg,#e4f7f4_60%,#9fe2d9_60%)]" />
        </span>
        <span className="absolute right-2 bottom-1 h-20 w-24 rotate-[10deg] rounded-2xl bg-white p-1.5 shadow-soft">
          <span className="block h-full w-full rounded-xl bg-[linear-gradient(180deg,#f3eefe_60%,#ffbc9a_60%)]" />
        </span>
        <span className="relative z-10 grid size-16 place-items-center rounded-full bg-peach text-ink shadow-lift">
          <Camera className="size-8" />
        </span>
        <Sparkle className="absolute top-0 left-6 w-6 animate-twinkle" fill="#6fd3c9" />
        <Flower className="absolute top-1 right-4 w-7" petal="#c9b8f4" />
      </div>
      <h3 className="font-display text-xl font-bold text-ink sm:text-2xl">{g.emptyTitle}</h3>
      <p className="mx-auto mt-2 max-w-md text-ink-soft text-pretty">{g.emptyText}</p>
      <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6">
        <InstagramIcon className="size-5 text-peach-deep" />
        {site.instagram.handle}
      </a>
    </div>
  );
}

/** Полноэкранный просмотр: стрелки, клавиатура (← → Esc), свайп на телефоне. */
function Lightbox({
  photos,
  index,
  setIndex,
  onClose,
}: {
  photos: Photo[];
  index: number;
  setIndex: (i: number) => void;
  onClose: () => void;
}) {
  const t = useT();
  const g = t.gallery;
  const n = photos.length;
  const p = photos[index];
  const dialog = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const prev = useCallback(() => setIndex((index - 1 + n) % n), [index, n, setIndex]);
  const next = useCallback(() => setIndex((index + 1) % n), [index, n, setIndex]);

  useEffect(() => {
    closeBtn.current?.focus({ preventScroll: true });
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Tab" && dialog.current) {
        // фокус остаётся внутри окна просмотра
        const items = [...dialog.current.querySelectorAll<HTMLElement>("button")].filter((b) => b.offsetParent !== null);
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  // Предзагрузка соседних фото
  useEffect(() => {
    if (n < 2) return;
    for (const i of [(index + 1) % n, (index - 1 + n) % n]) {
      const img = new window.Image();
      img.src = photos[i].src;
    }
  }, [index, n, photos]);

  const navBtn =
    "grid size-12 shrink-0 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30 focus-visible:outline-white";

  return createPortal(
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={g.dialog}
      className="fixed inset-0 z-[60] flex flex-col bg-[#132033]/95"
      style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3 text-white">
        <p className="text-sm font-bold tabular-nums" aria-live="polite">
          {g.counter(index + 1, n)}
        </p>
        <button ref={closeBtn} type="button" onClick={onClose} aria-label={g.close} className={navBtn}>
          <X className="size-6" aria-hidden />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
        onTouchStart={(e) => {
          touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }}
        onTouchEnd={(e) => {
          const s = touch.current;
          touch.current = null;
          if (!s) return;
          const dx = e.changedTouches[0].clientX - s.x;
          const dy = e.changedTouches[0].clientY - s.y;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) (dx < 0 ? next : prev)();
          else if (dy > 90 && Math.abs(dy) > Math.abs(dx)) onClose();
        }}
      >
        {n > 1 ? (
          <button type="button" onClick={prev} aria-label={g.prev} className={`${navBtn} absolute left-3 z-10 hidden sm:grid`}>
            <ChevronLeft className="size-7" aria-hidden />
          </button>
        ) : null}

        <div className="relative h-full w-full max-w-6xl">
          <Image
            key={p.src}
            src={p.src}
            alt={`${g.photoAlt} — ${index + 1}`}
            fill
            sizes="100vw"
            className="object-contain select-none"
            draggable={false}
          />
        </div>

        {n > 1 ? (
          <button type="button" onClick={next} aria-label={g.next} className={`${navBtn} absolute right-3 z-10 hidden sm:grid`}>
            <ChevronRight className="size-7" aria-hidden />
          </button>
        ) : null}
      </div>

      {/* На телефоне — крупные кнопки внизу, под большим пальцем */}
      {n > 1 ? (
        <div className="flex items-center justify-center gap-6 px-4 py-4 sm:hidden">
          <button type="button" onClick={prev} aria-label={g.prev} className={navBtn}>
            <ChevronLeft className="size-7" aria-hidden />
          </button>
          <button type="button" onClick={next} aria-label={g.next} className={navBtn}>
            <ChevronRight className="size-7" aria-hidden />
          </button>
        </div>
      ) : (
        <div className="h-4" />
      )}
    </div>,
    document.body,
  );
}
