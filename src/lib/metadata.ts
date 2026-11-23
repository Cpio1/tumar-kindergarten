import type { Metadata } from "next";
import { langPath, type Lang } from "./i18n/config";
import { kk } from "./i18n/kk";
import { ru } from "./i18n/ru";
import { OG_IMAGE, SITE_URL } from "./site";

/** SEO-метаданные страницы на русском (`/`) или казахском (`/kk/`) языке. */
export function pageMetadata(lang: Lang): Metadata {
  const d = lang === "kk" ? kk : ru;
  const url = `${SITE_URL}${langPath(lang)}`;
  return {
    metadataBase: new URL(`${SITE_URL}/`),
    title: d.meta.title,
    description: d.meta.description,
    applicationName: "Тұмар",
    keywords:
      lang === "kk"
        ? ["Тұмар", "Тұмар балабақшасы", "бөбекжай-балабақша", "Өтеген батыр балабақша", "Іле ауданы балабақша", "Қарасу", "қазақ тілді балабақша"]
        : ["Тұмар", "детский сад Тұмар", "ясли-сад", "детский сад Отеген Батыр", "детский сад Илийский район", "Карасу", "казахоязычный детский сад"],
    alternates: {
      canonical: url,
      languages: { ru: `${SITE_URL}/`, kk: `${SITE_URL}/kk/`, "x-default": `${SITE_URL}/` },
    },
    openGraph: {
      type: "website",
      url,
      title: d.meta.title,
      description: d.meta.description,
      siteName: d.meta.siteName,
      locale: lang === "kk" ? "kk_KZ" : "ru_RU",
      alternateLocale: [lang === "kk" ? "ru_RU" : "kk_KZ"],
      images: [{ url: `${SITE_URL}${OG_IMAGE.path}`, width: OG_IMAGE.width, height: OG_IMAGE.height, alt: d.meta.ogAlt, type: "image/png" }],
    },
    twitter: { card: "summary_large_image", title: d.meta.title, description: d.meta.description, images: [`${SITE_URL}${OG_IMAGE.path}`] },
    robots: { index: true, follow: true },
    formatDetection: { telephone: false, address: false, email: false },
    // Свои тексты RU/KZ — автоматический перевод браузера не нужен
    other: { google: "notranslate" },
  };
}
