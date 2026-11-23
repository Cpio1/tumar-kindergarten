"use client";

import { useLang, useT } from "@/lib/i18n";
import { LANGS } from "@/lib/i18n/config";

const LABEL = { ru: "RU", kk: "KZ" } as const;
const FULL = { ru: "Русский", kk: "Қазақша" } as const;

/** Переключатель RU / KZ. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const [lang, setLang] = useLang();
  const t = useT();
  return (
    <div role="group" aria-label={t.a11y.lang} className={`inline-flex rounded-full bg-teal-soft p-1 ${className}`}>
      {LANGS.map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            aria-label={FULL[l]}
            title={FULL[l]}
            className={`min-h-10 min-w-11 rounded-full px-3 text-sm font-extrabold transition-colors ${
              active ? "bg-white text-teal-deep shadow-soft" : "text-ink-soft hover:text-ink"
            }`}
          >
            {LABEL[l]}
          </button>
        );
      })}
    </div>
  );
}
