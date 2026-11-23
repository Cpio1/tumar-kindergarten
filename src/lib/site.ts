/** Единый источник контактных данных и ссылок детского сада «Тұмар». */

/**
 * Полный адрес сайта (без завершающего «/»). Задаётся при сборке в next.config.ts:
 * GitHub Pages — https://USERNAME.github.io/REPOSITORY, позже — например, https://tumar.edu.kz
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

/** Подпуть сайта: "/REPOSITORY" на GitHub Pages, "" на собственном домене. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Добавляет BASE_PATH к локальному пути из public/ ("/gallery/a.jpg" → "/REPOSITORY/gallery/a.jpg"). */
export function withBasePath(src: string): string {
  if (!src.startsWith("/") || src.startsWith("//")) return src;
  if (BASE_PATH && (src === BASE_PATH || src.startsWith(`${BASE_PATH}/`))) return src;
  return `${BASE_PATH}${src}`;
}

/** Картинка превью ссылки (WhatsApp, Telegram, соцсети) — генерируется при сборке в src/app/og-image.png/route.tsx. */
export const OG_IMAGE = { path: "/og-image.png", width: 1200, height: 630 } as const;

export const site = {
  legalName: "ИП Кудусбекова «Детский ясли-сад Тұмар»",
  brand: "Тұмар",
  phone: { display: "+7 747 267 06 41", e164: "+77472670641" },
  whatsapp: "https://wa.me/77472670641",
  instagram: { handle: "@sadik.tumar", url: "https://www.instagram.com/sadik.tumar/" },
  hours: "07:00–18:00",
  groups: 3,
  meals: 4,
  /**
   * Точные координаты здания и ID организации в 2GIS пока не подтверждены —
   * поэтому сайт открывает поиск по адресу, а не ставит на карте случайную точку.
   * Когда точка будет проверена, заполните, например:
   *   geo: { lat: 43.xxxxx, lon: 77.xxxxx }
   *   twoGisFirmId: "70000001234567890"  (из ссылки 2gis.kz/almaty/firm/<ID>)
   * — и на сайте появится встроенная карта.
   */
  geo: null as null | { lat: number; lon: number },
  twoGisFirmId: null as null | string,
} as const;

/** Адрес для поиска в картах. */
const ADDRESS_QUERY = "Алматинская область, Илийский район, Отеген Батыр, микрорайон Карасу, улица Ынтымак, 35";

export const telHref = `tel:${site.phone.e164}`;

export function waHref(text?: string) {
  return `${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

export function twoGisHref() {
  if (site.twoGisFirmId) return `https://2gis.kz/almaty/firm/${site.twoGisFirmId}`;
  const g = site.geo;
  if (g) return `https://2gis.kz/almaty/geo/${g.lon},${g.lat}?m=${g.lon},${g.lat}/17`;
  return `https://2gis.kz/almaty/search/${encodeURIComponent(ADDRESS_QUERY)}`;
}

export function googleMapsHref() {
  const g = site.geo;
  const q = g ? `${g.lat},${g.lon}` : ADDRESS_QUERY;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
}

/** Встраиваемая карта 2GIS — только когда известны координаты и карточка организации. */
export function twoGisEmbed() {
  const g = site.geo;
  if (!g || !site.twoGisFirmId) return null;
  const options = { pos: { lat: g.lat, lon: g.lon, zoom: 16 }, opt: { city: "almaty" }, org: site.twoGisFirmId };
  return `https://widgets.2gis.com/widget?type=firmsonmap&options=${encodeURIComponent(JSON.stringify(options))}`;
}
