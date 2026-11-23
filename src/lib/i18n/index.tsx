"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { BASE_PATH } from "../site";
import { LANG_STORAGE_KEY, langPath, type Lang } from "./config";
import { kk } from "./kk";
import { ru, type Dict } from "./ru";

export type { Dict, Lang };

export const dictionaries: Record<Lang, Dict> = { ru, kk };

type Ctx = { lang: Lang; setLang: (lang: Lang) => void };
const LangContext = createContext<Ctx>({ lang: "ru", setLang: () => {} });

function store(lang: Lang) {
  try {
    window.localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* приватный режим — выбор просто не запоминается */
  }
}

function readStored(): Lang | null {
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY);
    return v === "ru" || v === "kk" ? v : null;
  } catch {
    return null;
  }
}

/** Меняет адрес страницы (/ ↔ /kk/) без перезагрузки, сохраняя якорь раздела. */
function syncUrl(lang: Lang) {
  const target = `${BASE_PATH}${langPath(lang)}`;
  if (window.location.pathname === target) return;
  window.history.replaceState(window.history.state, "", `${target}${window.location.hash}`);
}

/**
 * Сайт — статический HTML: русская версия собирается в `/`, казахская — в `/kk/`.
 * Переключение языка происходит мгновенно на клиенте, адрес обновляется.
 * На русской странице применяется язык, выбранный посетителем ранее.
 */
export function LangProvider({ initial, children }: { initial: Lang; children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initial);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    store(next);
    syncUrl(next);
  }, []);

  useEffect(() => {
    // Явный адрес /kk/ всегда открывает казахскую версию; на «/» восстанавливаем прошлый выбор.
    const stored = initial === "kk" ? "kk" : readStored();
    if (stored) store(stored);
    if (stored && stored !== initial) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- восстановление сохранённого выбора после гидратации
      setLangState(stored);
      syncUrl(stored);
    }
  }, [initial]);

  useEffect(() => {
    const d = dictionaries[lang];
    document.documentElement.lang = lang;
    document.title = d.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", d.meta.description);
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang(): [Lang, (lang: Lang) => void] {
  const { lang, setLang } = useContext(LangContext);
  return [lang, setLang];
}

export function useT(): Dict {
  return dictionaries[useContext(LangContext).lang];
}
