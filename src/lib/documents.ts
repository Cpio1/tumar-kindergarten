import { localDocuments } from "./media";
import { withBasePath } from "./site";

/**
 * Официальные документы детского сада.
 *
 * Способ 1 — файл на сайте. Положите PDF в папку `public/documents/` — он появится
 * в разделе автоматически (название берётся из имени файла). Чтобы задать красивое
 * название на двух языках, добавьте запись ниже с `url: "/documents/<имя файла>"`.
 *
 * Способ 2 — ссылка на Google Drive (доступ «Все, у кого есть ссылка»):
 *   {
 *     id: "license",
 *     title: { ru: "Лицензия", kk: "Лицензия" },
 *     url: "https://drive.google.com/file/d/<ID>/view",
 *     source: "drive",
 *   },
 *
 * Локальные файлы, которых нет в public/documents, не показываются — неработающих ссылок не будет.
 */
export type DocumentSource = "local" | "drive" | "link";

export type DocumentItem = {
  id: string;
  title: { ru: string; kk: string };
  url: string;
  source: DocumentSource;
  /** Прямая ссылка для скачивания (для PDF и Google Drive строится автоматически). */
  downloadUrl?: string;
  /** Подпись формата: PDF, DOCX, JPG… */
  format?: string;
  size?: number;
};

const manualDocuments: DocumentItem[] = [
  // Добавляйте документы сюда (см. пример выше).
];

const ext = (name: string) => (name.split(".").pop() ?? "").toUpperCase();
const prettify = (name: string) =>
  decodeURIComponent(name)
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .trim();

function driveDownload(url: string) {
  try {
    const id = url.match(/\/d\/([^/?#]+)/)?.[1] ?? new URL(url).searchParams.get("id");
    return id ? `https://drive.google.com/uc?export=download&id=${id}` : undefined;
  } catch {
    return undefined;
  }
}

function build(): DocumentItem[] {
  const key = (s: string) => decodeURIComponent(s);
  const localBySrc = new Map(localDocuments.map((d) => [key(d.src), d]));

  const manual = manualDocuments
    .map((d) => (d.source === "local" ? { ...d, url: withBasePath(d.url) } : d))
    .filter((d) => d.source !== "local" || localBySrc.has(key(d.url)))
    .map((d) => ({
      ...d,
      format: d.format ?? (d.source === "local" ? ext(d.url) : d.source === "drive" ? "Google Drive" : undefined),
      size: d.size ?? localBySrc.get(key(d.url))?.size,
      downloadUrl: d.downloadUrl ?? (d.source === "local" ? d.url : d.source === "drive" ? driveDownload(d.url) : undefined),
    }));

  const described = new Set(manual.filter((d) => d.source === "local").map((d) => key(d.url)));
  const auto: DocumentItem[] = localDocuments
    .filter((l) => !described.has(key(l.src)))
    .map((l) => ({
      id: l.name,
      title: { ru: prettify(l.name), kk: prettify(l.name) },
      url: l.src,
      source: "local",
      downloadUrl: l.src,
      format: ext(l.name),
      size: l.size,
    }));

  return [...manual, ...auto];
}

export const documents: DocumentItem[] = build();
