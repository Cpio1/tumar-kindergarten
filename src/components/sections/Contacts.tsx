"use client";

import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { useT } from "@/lib/i18n";
import { googleMapsHref, site, telHref, twoGisEmbed, twoGisHref, waHref } from "@/lib/site";
import { Cloud, Flower, Heart } from "../decor/Doodles";
import { InstagramIcon, WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";
import { TumarMark } from "../ui/Logo";

/** Стилизованная карта-заглушка (без выдуманной точки на реальной карте). */
function MapArt() {
  return (
    <svg viewBox="0 0 400 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden focusable="false">
      <rect width="400" height="260" fill="#e4f7f4" />
      <path d="M0 190c60-20 110-10 160 6s110 20 240-14v80H0Z" fill="#c9eee8" />
      <circle cx="330" cy="60" r="44" fill="#fff5cf" />
      <path d="M-10 120C80 100 140 150 220 128S340 70 420 92" stroke="#fff" strokeWidth="22" fill="none" strokeLinecap="round" />
      <path d="M120 -10c10 80 -20 140 20 280" stroke="#fff" strokeWidth="16" fill="none" strokeLinecap="round" />
      <path d="M260 -10c-20 90 30 170 10 280" stroke="#fff" strokeWidth="12" fill="none" strokeLinecap="round" />
      <path d="M-10 120C80 100 140 150 220 128S340 70 420 92" stroke="#ffd65c" strokeWidth="2.5" strokeDasharray="10 10" fill="none" />
      {[
        [40, 40, "#ffbc9a"],
        [170, 40, "#c9b8f4"],
        [300, 160, "#ffbc9a"],
        [40, 170, "#c9b8f4"],
        [180, 190, "#ffd65c"],
      ].map(([x, y, c]) => (
        <rect key={`${x}-${y}`} x={x as number} y={y as number} width="46" height="34" rx="10" fill={c as string} opacity=".55" />
      ))}
      {[
        [80, 210],
        [350, 210],
        [215, 70],
      ].map(([x, y]) => (
        <g key={`${x}`} transform={`translate(${x} ${y})`}>
          <circle r="12" fill="#6fd3c9" />
          <circle r="6" cy="-6" cx="4" fill="#9fe2d9" />
        </g>
      ))}
    </svg>
  );
}

export function Contacts() {
  const t = useT();
  const c = t.contacts;
  const embed = twoGisEmbed();

  const rows = [
    { Icon: MapPin, label: c.address, value: c.addressValue, tone: "bg-peach-soft text-peach-deep" },
    {
      Icon: Phone,
      label: c.phone,
      value: (
        <a href={telHref} className="font-extrabold text-ink underline decoration-teal decoration-2 underline-offset-4 hover:text-teal-deep">
          {site.phone.display}
        </a>
      ),
      tone: "bg-teal-soft text-teal-deep",
    },
    {
      Icon: InstagramIcon,
      label: c.instagram,
      value: (
        <a
          href={site.instagram.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-extrabold text-ink underline decoration-peach decoration-2 underline-offset-4 hover:text-peach-deep"
        >
          {site.instagram.handle}
        </a>
      ),
      tone: "bg-lavender-soft text-lavender-deep",
    },
    {
      Icon: Clock,
      label: c.hours,
      value: (
        <>
          <span className="font-extrabold text-ink">{c.hoursValue}</span>
          <span className="mt-0.5 block text-sm">{c.weekend}</span>
        </>
      ),
      tone: "bg-sun-soft text-sun-deep",
    },
  ];

  return (
    <section id="contacts" aria-labelledby="contacts-title" className="section bg-milk">
      <Cloud className="decor -z-10 top-14 right-[-20px] w-24 animate-drift lg:right-[4%]" fill="#e4f7f4" />
      <Flower className="decor -z-10 bottom-16 left-[3%] hidden w-8 sm:block" petal="#ffbc9a" />

      <div className="container-x">
        <SectionHeading id="contacts-title" eyebrow={c.eyebrow} title={c.title} lead={c.lead} tone="teal" />

        <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] lg:gap-7">
          {/* Контактные данные */}
          <div className="reveal rounded-[36px_36px_36px_12px] bg-white p-5 shadow-soft ring-1 ring-line sm:p-7 lg:p-6">
            <dl className="space-y-4 lg:space-y-3">
              {rows.map(({ Icon, label, value, tone }) => (
                <div key={label} className="flex items-start gap-3.5">
                  <dt className="contents">
                    <span className={`grid size-11 shrink-0 place-items-center rounded-2xl ${tone}`}>
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <span className="sr-only">{label}</span>
                  </dt>
                  <dd className="min-w-0 pt-0.5 text-[0.98rem] leading-snug text-ink-soft">
                    <span aria-hidden className="mb-0.5 block text-xs font-extrabold tracking-wider text-ink-soft/80 uppercase">
                      {label}
                    </span>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-3 lg:mt-5">
              <a href={waHref(t.cta.waText)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
                <WhatsAppIcon className="size-5" />
                {t.cta.whatsappShort}
              </a>
              <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="btn btn-light">
                <InstagramIcon className="size-5 text-peach-deep" />
                {t.cta.instagram}
              </a>
              <a href={telHref} className="btn btn-sun">
                <Phone className="size-5" aria-hidden />
                {t.cta.call}
              </a>
            </div>
          </div>

          {/* Карта */}
          <div
            className="reveal relative flex min-h-[300px] flex-col overflow-hidden rounded-[36px_12px_36px_36px] shadow-soft ring-1 ring-line lg:min-h-0"
            style={{ "--d": "120ms" } as React.CSSProperties}
          >
            {embed ? (
              <iframe
                src={embed}
                title={c.mapTitle}
                loading="lazy"
                className="absolute inset-0 h-full w-full border-0"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <>
                <MapArt />
                <div className="relative flex flex-1 flex-col items-center justify-center p-6 text-center">
                  <span className="relative grid place-items-center">
                    <span aria-hidden className="absolute size-24 animate-ping rounded-full bg-teal/25 [animation-duration:2.6s]" />
                    <span className="relative grid size-20 place-items-center rounded-full bg-white shadow-lift">
                      <TumarMark className="size-12" />
                    </span>
                  </span>
                  <p className="mt-4 max-w-xs rounded-2xl bg-white/90 px-4 py-2 font-extrabold text-ink shadow-soft">{c.addressShort}</p>
                  <Heart className="decor top-6 left-6 w-6" fill="#ffbc9a" />
                </div>
              </>
            )}
            <div className="relative mt-auto grid gap-2 bg-white/95 p-3 backdrop-blur sm:grid-cols-2">
              <a href={twoGisHref()} target="_blank" rel="noopener noreferrer" className="btn btn-ink !min-h-11">
                <MapPin className="size-5" aria-hidden />
                {c.open2gis}
              </a>
              <a href={googleMapsHref()} target="_blank" rel="noopener noreferrer" className="btn btn-light !min-h-11">
                <Navigation className="size-5 text-teal-deep" aria-hidden />
                {c.openGoogle}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
