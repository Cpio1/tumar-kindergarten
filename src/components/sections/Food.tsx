"use client";

import { MessageCircleQuestion } from "lucide-react";
import { useT } from "@/lib/i18n";
import { site, waHref } from "@/lib/site";
import { Sparkle } from "../decor/Doodles";
import { Apple, Banana, Broccoli, Carrot, Pear, Plate, Strawberry } from "../decor/FoodArt";
import { SectionHeading } from "../ui/SectionHeading";

const mealLooks = [
  { bg: "bg-sun-soft", num: "bg-sun text-ink", Art: Banana, shape: "rounded-[28px_28px_28px_10px]" },
  { bg: "bg-teal-soft", num: "bg-teal text-ink", Art: Broccoli, shape: "rounded-[28px_28px_10px_28px]" },
  { bg: "bg-peach-soft", num: "bg-peach text-ink", Art: Carrot, shape: "rounded-[28px_10px_28px_28px]" },
  { bg: "bg-lavender-soft", num: "bg-lavender text-ink", Art: Pear, shape: "rounded-[10px_28px_28px_28px]" },
];

/** Фрукты вокруг тарелки: [компонент, положение, размер, задержка анимации] */
const orbit = [
  { Art: Apple, cls: "top-[2%] left-[8%] w-[17%]", d: "0s" },
  { Art: Strawberry, cls: "top-[-2%] right-[16%] w-[14%]", d: "-1.5s" },
  { Art: Carrot, cls: "bottom-[6%] left-[2%] w-[16%]", d: "-3s" },
  { Art: Broccoli, cls: "bottom-[0%] right-[8%] w-[17%]", d: "-4.5s" },
  { Art: Pear, cls: "top-[42%] right-[-3%] w-[13%]", d: "-2.2s" },
];

export function Food() {
  const t = useT();
  const f = t.food;

  return (
    <section id="food" aria-labelledby="food-title" className="section overflow-hidden bg-milk">
      <Sparkle className="decor -z-10 top-16 right-[6%] w-6 animate-twinkle" fill="#ffbc9a" />
      <div aria-hidden className="shape-blob absolute top-[18%] -left-24 -z-10 size-56 bg-peach-soft/70" />

      <div className="container-x grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Тарелка */}
        <div className="reveal relative mx-auto w-full max-w-[300px] sm:max-w-[360px] order-2 lg:max-w-[min(420px,52svh)]">
          <div aria-hidden className="shape-blob-2 absolute inset-[6%] -z-10 bg-sun-soft" />
          <Plate className="relative h-auto w-full drop-shadow-[0_18px_24px_rgb(178_74_34/0.16)]" label={String(site.meals)} sub={f.plate} />
          {orbit.map(({ Art, cls, d }, i) => (
            <Art key={i} className={`decor ${cls} animate-float`} style={{ animationDelay: d }} />
          ))}
        </div>

        {/* Текст и приёмы пищи */}
        <div className="order-1">
          <SectionHeading id="food-title" eyebrow={f.eyebrow} title={f.title} lead={f.lead} tone="peach" align="left" />

          <ol className="-mt-2 grid grid-cols-2 gap-3 sm:gap-4">
            {f.meals.map((m, i) => {
              const l = mealLooks[i];
              return (
                <li
                  key={m}
                  className={`reveal relative flex items-center gap-2.5 p-3 sm:gap-3 sm:p-4 ${l.bg} ${l.shape}`}
                  style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                >
                  <span className={`font-display grid size-9 shrink-0 place-items-center rounded-full text-lg sm:size-11 sm:text-xl font-bold shadow-soft ${l.num}`} aria-hidden>
                    {i + 1}
                  </span>
                  <span className="min-w-0 text-[0.95rem] leading-tight font-extrabold text-ink sm:text-base">{m}</span>
                  <l.Art className="decor -top-3 -right-2 w-8 rotate-12 sm:w-9" />
                </li>
              );
            })}
          </ol>

          <div className="reveal mt-6 flex flex-col gap-3 rounded-[24px] border-2 border-dashed border-peach/70 bg-white/80 p-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.97rem] font-semibold text-ink-soft">{f.menuNote}</p>
            <a href={waHref(f.askText)} target="_blank" rel="noopener noreferrer" className="btn btn-sun shrink-0 !min-h-11 !px-4 text-[0.95rem]">
              <MessageCircleQuestion className="size-5" aria-hidden />
              {f.ask}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
