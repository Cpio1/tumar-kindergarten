import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Генерируется один раз при сборке — совместимо со статическим экспортом
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { ru: `${SITE_URL}/`, kk: `${SITE_URL}/kk/` };
  return [
    { url: `${SITE_URL}/`, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: `${SITE_URL}/kk/`, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
