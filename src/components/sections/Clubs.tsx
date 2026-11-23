"use client";

import { Music2, MessageCircleHeart } from "lucide-react";
import { useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";
import { Sparkle, Star, Wave } from "../decor/Doodles";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

const display = { fontFamily: "var(--font-comfortaa), var(--font-nunito), sans-serif" };

/** Хореография: ноты, звёздочки и ленточка-волна. */
function DanceArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden focusable="false">
      <path d="M14 120c30-40 60 10 92-24s58-24 84-56" stroke="#fff" strokeWidth="7" strokeLinecap="round" fill="none" opacity=".85" />
      {/* ноты */}
      <g fill="#5f45b5">
        <path d="M120 24v52a13 10 0 1 1-6-8.5V34l40-9v42a13 10 0 1 1-6-8.5V18Z" />
        <path d="M62 44v40a11 8.5 0 1 1-5-7V44Z" opacity=".75" />
        <path d="M57 44c8 2 14 8 16 16" stroke="#5f45b5" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".75" />
      </g>
      <path d="M150 104l3.5 7.5 8 1-6 5.5 1.6 8L150 122l-7 4 1.6-8-6-5.5 8-1Z" fill="#ffd65c" />
      <path d="M40 112l2.6 5.4 6 .8-4.4 4 1.2 6L40 125.4 34.6 128.2l1.2-6-4.4-4 6-.8Z" fill="#fff" />
      <circle cx="176" cy="96" r="5" fill="#ffd65c" />
      <circle cx="24" cy="40" r="4" fill="#ffd65c" />
    </svg>
  );
}

/** Логопед: облачка речи с казахскими буквами. */
function SpeechArt({ className }: { className?: string }) {
  const letters = [
    { x: 18, y: 26, w: 70, fill: "#fff", c: "#0f7368", t: "Ә" },
    { x: 104, y: 12, w: 60, fill: "#ffd65c", c: "#24324a", t: "Ң" },
    { x: 92, y: 80, w: 74, fill: "#fff0e8", c: "#b24a22", t: "Өө" },
  ];
  return (
    <svg viewBox="0 0 200 150" className={className} aria-hidden focusable="false">
      {letters.map((l) => (
        <g key={l.t} transform={`translate(${l.x} ${l.y})`}>
          <rect width={l.w} height="50" rx="22" fill={l.fill} />
          <path d={`M16 46l-6 16 18-12Z`} fill={l.fill} />
          <text x={l.w / 2} y="35" textAnchor="middle" fontSize="28" fontWeight="700" fill={l.c} style={display}>
            {l.t}
          </text>
        </g>
      ))}
      <circle cx="40" cy="112" r="7" fill="#c9b8f4" />
      <circle cx="58" cy="126" r="4" fill="#c9b8f4" />
    </svg>
  );
}

const looks = {
  dance: {
    card: "bg-[linear-gradient(150deg,#f3eefe_0%,#ffe7f0_55%,#fff0e8_100%)] rounded-[40px_120px_40px_40px]",
    art: "bg-lavender",
    Icon: Music2,
    icon: "bg-lavender-deep text-white",
    tag: "bg-white/80 text-lavender-deep",
    Art: DanceArt,
  },
  speech: {
    card: "bg-[linear-gradient(150deg,#e4f7f4_0%,#f1fbf9_55%,#fff5cf_100%)] rounded-[120px_40px_40px_40px]",
    art: "bg-teal",
    Icon: MessageCircleHeart,
    icon: "bg-teal-deep text-white",
    tag: "bg-white/80 text-teal-deep",
    Art: SpeechArt,
  },
} as const;

export function Clubs() {
  const t = useT();
  const c = t.clubs;

  return (
    <>
      <Wave fill="#fff6e9" />
      <section id="clubs" aria-labelledby="clubs-title" className="section bg-cream">
        <Star className="decor -z-10 top-12 right-[7%] w-7 animate-twinkle" fill="#c9b8f4" />
        <Sparkle className="decor -z-10 bottom-10 left-[4%] w-6 animate-twinkle" fill="#6fd3c9" />
        <div className="container-x">
          <SectionHeading id="clubs-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="lavender" />

          <ul className="grid gap-5 md:grid-cols-2 lg:gap-7">
            {c.items.map((item, i) => {
              const l = looks[item.id as keyof typeof looks];
              return (
                <li
                  key={item.id}
                  className={`reveal relative flex flex-col overflow-hidden p-6 shadow-soft ring-1 ring-white sm:p-8 lg:p-7 ${l.card}`}
                  style={{ "--d": `${i * 120}ms` } as React.CSSProperties}
                >
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span className={`grid size-14 place-items-center rounded-2xl shadow-soft ${l.icon}`}>
                        <l.Icon className="size-7" aria-hidden />
                      </span>
                      <h3 className="font-display mt-6 text-[1.6rem] sm:mt-4 leading-tight font-bold text-ink sm:text-[2rem]">{item.title}</h3>
                    </div>
                    <div className={`shape-blob absolute -top-3 -right-3 grid w-28 shrink-0 place-items-center p-1.5 sm:relative sm:top-auto sm:right-auto sm:-mt-3 sm:-mr-2 sm:w-[44%] sm:max-w-[190px] sm:p-2 lg:max-w-[min(170px,22svh)] ${l.art}`}>
                      <l.Art className="h-auto w-full" />
                    </div>
                  </div>

                  <p className="mt-4 lg:mt-3 text-[1rem] leading-relaxed text-ink-soft text-pretty">{item.text}</p>

                  <ul className="mt-5 flex flex-wrap gap-2 lg:mt-4">
                    {item.tags.map((tag) => (
                      <li key={tag} className={`chip ${l.tag}`}>
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6 lg:pt-5">
                    <a
                      href={waHref(c.askText(item.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-light w-full sm:w-auto"
                    >
                      <WhatsAppIcon className="size-5 text-wa" />
                      {c.ask}
                    </a>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <Wave fill="#fff6e9" flip />
    </>
  );
}
