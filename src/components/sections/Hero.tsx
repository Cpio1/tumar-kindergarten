"use client";

import { Phone } from "lucide-react";
import Image from "next/image";
import { useLang, useT } from "@/lib/i18n";
import { heroPhoto } from "@/lib/media";
import { site, telHref, waHref } from "@/lib/site";
import { Cloud, Flower, Sparkle, Star } from "../decor/Doodles";
import { HeroScene } from "../decor/HeroScene";
import { WhatsAppIcon } from "../ui/BrandIcons";

const chipTones = ["bg-teal-soft text-teal-deep", "bg-sun-soft text-sun-deep", "bg-lavender-soft text-lavender-deep"];

export function Hero() {
  const t = useT();
  const h = t.hero;
  const [lang] = useLang();

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero-min-h relative isolate flex items-center overflow-hidden pt-[calc(var(--header-h)+env(safe-area-inset-top))] lg:max-h-[900px]"
    >
      {/* мягкий фон с небольшими элементами */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-[radial-gradient(120%_80%_at_85%_10%,#fff5cf_0%,transparent_55%),radial-gradient(90%_70%_at_0%_100%,#f3eefe_0%,transparent_60%),linear-gradient(180deg,#f1fbf9_0%,#fffbf4_100%)]" />
      <Cloud className="decor -z-10 top-[calc(var(--header-h)+18px)] left-[-18px] w-20 animate-drift opacity-90 sm:w-24 lg:left-[3%]" />
      <Star className="decor -z-10 top-[calc(var(--header-h)+28px)] right-[8%] w-6 animate-twinkle lg:right-[46%]" />
      <Sparkle className="decor -z-10 bottom-[12%] left-[6%] hidden w-6 animate-twinkle sm:block" />
      <Flower className="decor -z-10 bottom-6 left-[44%] hidden w-8 lg:block" petal="#c9b8f4" />

      <div className="container-x grid w-full items-center gap-6 py-6 sm:py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-8">
        {/* Текст */}
        <div className="text-center lg:text-left">
          <p className="reveal chip mx-auto bg-white/90 text-teal-deep shadow-soft ring-1 ring-teal-soft lg:mx-0">
            <span aria-hidden>📍</span> {h.eyebrow}
          </p>

          <h1 id="hero-title" className="reveal mt-4 lg:mt-5" style={{ "--d": "80ms" } as React.CSSProperties}>
            <span className="sr-only">{lang === "kk" ? `«${site.brand}» ${h.kind}` : `${h.kind} «${site.brand}»`}</span>
            <span aria-hidden className="block">
              {lang === "ru" ? (
                <span className="block text-[1.05rem] font-extrabold tracking-wide text-ink-soft uppercase sm:text-lg">{h.kind}</span>
              ) : null}
              <span className="font-display block text-[clamp(3rem,2rem+5vw,5.2rem)] leading-[1.05] font-bold text-teal-deep">
                «<span className="text-ink">{site.brand}</span>»
              </span>
              {lang === "kk" ? (
                <span className="mt-1 block text-[1.05rem] font-extrabold tracking-wide text-ink-soft uppercase sm:text-lg">{h.kind}</span>
              ) : null}
            </span>
          </h1>

          <p
            className="reveal mx-auto mt-4 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-soft text-pretty sm:text-lg lg:mx-0"
            style={{ "--d": "160ms" } as React.CSSProperties}
          >
            {h.lead}
          </p>

          <div
            className="reveal mt-6 flex flex-col gap-3 min-[420px]:flex-row min-[420px]:justify-center lg:justify-start"
            style={{ "--d": "240ms" } as React.CSSProperties}
          >
            <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
              <WhatsAppIcon className="size-5" />
              {t.cta.whatsapp}
            </a>
            <a href={telHref} className="btn btn-light">
              <Phone className="size-5 text-teal-deep" aria-hidden />
              {t.cta.call}
            </a>
          </div>

          <ul
            className="reveal mt-6 flex flex-wrap justify-center gap-2 lg:justify-start"
            style={{ "--d": "320ms" } as React.CSSProperties}
          >
            {h.chips.map((c, i) => (
              <li key={c} className={`chip ${chipTones[i % chipTones.length]}`}>
                {c}
              </li>
            ))}
          </ul>
        </div>

        {/* Изображение или иллюстрация */}
        <div className="reveal relative mx-auto w-full max-w-[min(100%,440px)] sm:max-w-[480px] lg:max-w-none" style={{ "--d": "200ms" } as React.CSSProperties}>
          {heroPhoto ? (
            <div className="relative mx-auto aspect-[5/4] w-full max-h-[min(58svh,520px)] lg:aspect-[1/1] lg:max-w-[min(100%,calc(100svh-var(--header-h)-120px))]">
              <div aria-hidden className="shape-blob absolute -inset-2 -rotate-3 bg-sun/70 sm:-inset-3" />
              <div className="shape-blob-2 relative h-full w-full overflow-hidden bg-teal-soft shadow-lift ring-4 ring-white">
                <Image
                  src={heroPhoto.src}
                  alt={h.photoAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 520px, 90vw"
                  className="object-cover"
                />
              </div>
              <span className="chip absolute bottom-[6%] left-[-2%] -rotate-6 bg-white text-peach-deep shadow-lift sm:text-base">
                {h.welcome}
              </span>
              <Star className="decor top-[-4%] right-[8%] w-9 animate-twinkle" />
              <Cloud className="decor right-[-6%] bottom-[18%] w-20 animate-drift" />
            </div>
          ) : (
            <HeroScene className="mx-auto block h-auto w-full max-h-[min(44svh,360px)] sm:max-h-[420px] lg:max-h-[min(calc(100svh-var(--header-h)-80px),540px)]" />
          )}
        </div>
      </div>
    </section>
  );
}
