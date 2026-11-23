import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Генерируется один раз при сборке — совместимо со статическим экспортом
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml` };
}
