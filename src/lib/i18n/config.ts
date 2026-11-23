export type Lang = "ru" | "kk";

export const LANGS: Lang[] = ["ru", "kk"];
export const DEFAULT_LANG: Lang = "ru";
export const LANG_STORAGE_KEY = "tumar-lang";

/** Адрес страницы для языка (без basePath): русская версия — "/", казахская — "/kk/". */
export const langPath = (lang: Lang) => (lang === "kk" ? "/kk/" : "/");
