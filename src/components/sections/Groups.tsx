"use client";

import { Check, Info } from "lucide-react";
import { useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";
import { Cloud, Flower, Star, Sun, Wave } from "../decor/Doodles";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

/**
 * Три группы с временными нейтральными названиями («Группа 1» / «1-топ»).
 * Настоящие названия и возраст можно вписать в src/lib/i18n/ru.ts и kk.ts → groups.items.
 */
const looks = [
  { bg: "bg-sun-soft", top: "bg-sun", check: "bg-sun text-ink", tag: "text-sun-deep", shape: "rounded-[40px_40px_32px_32px]", art: <Sun className="w-24" /> },
  {
    bg: "bg-teal-soft",
    top: "bg-teal",
    check: "bg-teal text-white",
    tag: "text-teal-deep",
    shape: "rounded-[32px_64px_32px_64px]",
    art: (
      <span className="relative block h-20 w-28">
        <Cloud className="absolute inset-x-0 top-2 w-28" />
        <Star className="absolute -top-1 right-0 w-7 animate-twinkle" fill="#ffd65c" />
      </span>
    ),
  },
  {
    bg: "bg-lavender-soft",
    top: "bg-lavender",
    check: "bg-lavender text-ink",
    tag: "text-lavender-deep",
    shape: "rounded-[64px_32px_64px_32px]",
    art: (
      <span className="relative block h-20 w-28">
        <Flower className="absolute top-2 left-1 w-14" petal="#ffbc9a" />
        <Star className="absolute top-0 right-1 w-12" fill="#fff6d0" />
      </span>
    ),
  },
];

export function Groups() {
  const t = useT();
  const g = t.groups;

  return (
    <>
      <Wave fill="#f1fbf9" />
      <section id="groups" aria-labelledby="groups-title" className="section bg-teal-mist">
        <Star className="decor -z-10 top-14 left-[5%] w-7 animate-twinkle" fill="#ffbc9a" />
        <div className="container-x">
          <SectionHeading id="groups-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} tone="teal" />

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {g.items.map((item, i) => {
              const l = looks[i % looks.length];
              return (
                <li
                  key={item.name}
                  className={`reveal flex flex-col overflow-hidden bg-white shadow-soft ring-1 ring-line ${l.shape} ${
                    i === 2 ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-10px)] lg:col-span-1 lg:mx-0 lg:w-auto" : ""
                  }`}
                  style={{ "--d": `${i * 100}ms` } as React.CSSProperties}
                >
                  <div className={`relative grid h-32 place-items-center ${l.bg} lg:h-[min(8rem,14svh)]`}>
                    <span aria-hidden className={`absolute -bottom-10 left-1/2 h-20 w-[130%] -translate-x-1/2 rounded-[50%] bg-white`} />
                    <span aria-hidden className="relative -mt-4 animate-float">
                      {l.art}
                    </span>
                  </div>
                  <div className="relative flex flex-1 flex-col px-6 pt-1 pb-6 lg:pb-5">
                    <p className={`text-xs font-extrabold tracking-wider uppercase ${l.tag}`}>{item.tag}</p>
                    <h3 className="font-display mt-1 text-2xl font-bold text-ink">{item.name}</h3>
                    <ul className="mt-3.5 space-y-2.5 lg:space-y-2">
                      {g.features.map((f) => (
                        <li key={f} className="flex items-center gap-2.5 text-[0.98rem] font-semibold text-ink-soft">
                          <span className={`grid size-6 shrink-0 place-items-center rounded-full ${l.check}`}>
                            <Check className="size-3.5" strokeWidth={3} aria-hidden />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={waHref(g.askText(item.name))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light mt-6 w-full lg:mt-5 !border-transparent bg-teal-mist !shadow-none ring-1 ring-teal-soft hover:bg-teal-soft"
                    >
                      <WhatsAppIcon className="size-5 text-wa" />
                      {g.ask}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="reveal mx-auto mt-6 flex max-w-2xl lg:mt-5 items-start justify-center gap-2 text-center text-[0.95rem] font-semibold text-ink-soft">
            <Info className="mt-0.5 size-5 shrink-0 text-teal-deep" aria-hidden />
            {g.note}
          </p>
        </div>
      </section>
      <Wave fill="#f1fbf9" flip />
    </>
  );
}
