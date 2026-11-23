"use client";

import { Clock, Languages, UsersRound, UtensilsCrossed } from "lucide-react";
import { useT } from "@/lib/i18n";
import { Heart, Rainbow, Sparkle } from "../decor/Doodles";
import { SectionHeading } from "../ui/SectionHeading";
import { TumarMark } from "../ui/Logo";

const facts = [
  { Icon: UsersRound, card: "bg-teal-soft shape-blob", icon: "bg-teal text-white", text: "text-teal-deep" },
  { Icon: Languages, card: "bg-sun-soft shape-leaf", icon: "bg-sun text-ink", text: "text-sun-deep" },
  { Icon: UtensilsCrossed, card: "bg-peach-soft shape-leaf-r", icon: "bg-peach text-ink", text: "text-peach-deep" },
  { Icon: Clock, card: "bg-lavender-soft shape-blob-2", icon: "bg-lavender text-ink", text: "text-lavender-deep" },
];

export function About() {
  const t = useT();
  const a = t.about;

  return (
    <section id="about" aria-labelledby="about-title" className="section bg-milk">
      <Rainbow className="decor -z-10 top-10 right-[4%] hidden w-24 opacity-80 md:block" />
      <Sparkle className="decor -z-10 bottom-12 left-[3%] w-6 animate-twinkle" />

      <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div>
          <SectionHeading id="about-title" eyebrow={a.eyebrow} title={a.title} tone="peach" align="left" />
          <div className="-mt-3 space-y-4 text-[1.02rem] leading-relaxed text-ink-soft lg:text-[1.06rem]">
            {a.text.map((p, i) => (
              <p key={i} className="reveal text-pretty" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                {p}
              </p>
            ))}
          </div>
          <figure className="reveal mt-6 flex items-start gap-3 rounded-[28px_28px_28px_8px] bg-white p-4 shadow-soft ring-1 ring-line">
            <TumarMark className="size-12 shrink-0" />
            <figcaption className="text-[0.97rem] leading-snug font-semibold text-ink text-pretty">{a.name}</figcaption>
          </figure>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-4">
          {a.facts.map((f, i) => {
            const s = facts[i];
            return (
              <li
                key={f.title}
                className={`reveal relative flex min-h-[148px] flex-col items-center justify-center p-4 text-center sm:min-h-[176px] sm:p-6 ${s.card} ${i % 2 ? "sm:translate-y-6" : ""}`}
                style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
              >
                <span className={`grid size-12 place-items-center rounded-full shadow-soft sm:size-14 ${s.icon}`}>
                  <s.Icon className="size-6 sm:size-7" aria-hidden />
                </span>
                <span className={`font-display mt-3 block text-[1.12rem] leading-tight font-bold sm:text-[1.4rem] ${s.text}`}>{f.title}</span>
                <span className="mt-1 block text-sm font-semibold text-ink-soft sm:text-[0.95rem]">{f.text}</span>
                {i === 3 ? <Heart className="decor -top-2 -right-1 w-7 -rotate-12" fill="#ffbc9a" /> : null}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
