"use client";

import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/i18n";
import { site, telHref } from "@/lib/site";
import { NAV_IDS } from "./Header";
import { Star, Wave } from "./decor/Doodles";
import { InstagramIcon } from "./ui/BrandIcons";
import { TumarMark } from "./ui/Logo";

export function Footer() {
  const t = useT();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-4 text-white">
      <Wave fill="#0f7368" />
      <div className="relative bg-teal-deep pb-[calc(88px+env(safe-area-inset-bottom))] sm:pb-10">
        <Star className="decor top-6 right-[8%] w-6 animate-twinkle opacity-80" />
        <div className="container-x grid gap-8 pt-6 lg:grid-cols-[1.2fr_2fr] lg:items-start">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 rounded-2xl" aria-label={t.a11y.home}>
              <span className="grid size-14 place-items-center rounded-full bg-white">
                <TumarMark className="size-10" />
              </span>
              <span>
                <span className="font-display block text-2xl font-bold">{site.brand}</span>
                <span className="block text-sm font-bold text-white/80">{t.brand.kind}</span>
              </span>
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">{t.contacts.addressValue}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-[1.4fr_1fr]">
            <nav aria-label={t.a11y.nav}>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                {NAV_IDS.map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} className="inline-block py-1.5 font-bold text-white/90 hover:text-sun">
                      {t.nav[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-2 text-sm">
              <a href={telHref} className="block text-lg font-extrabold hover:text-sun">
                {site.phone.display}
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-bold text-white/90 hover:text-sun"
              >
                <InstagramIcon className="size-5" />
                {site.instagram.handle}
              </a>
              <p className="font-semibold text-white/80">{t.contacts.hoursValue}</p>
            </div>
          </div>
        </div>

        <div className="container-x mt-8 flex flex-col gap-3 border-t border-white/15 pt-5 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {t.footer.rights}
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 self-start font-bold text-white hover:text-sun sm:self-auto">
            <ArrowUp className="size-4" aria-hidden />
            {t.footer.up}
          </a>
        </div>
      </div>
    </footer>
  );
}
