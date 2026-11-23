import type { NextConfig } from "next";

/**
 * Статический сайт для GitHub Pages (папка `out/`, без Node.js-сервера).
 *
 * BASE_PATH — подпуть, по которому открывается сайт:
 *   • https://USERNAME.github.io/REPOSITORY/  → "/REPOSITORY";
 *   • собственный домен (например, tumar.edu.kz) → "" (пустая строка).
 *
 * В GitHub Actions BASE_PATH и SITE_URL берутся из настроек Pages (actions/configure-pages):
 * при подключении собственного домена они автоматически станут "" и https://<домен>.
 * Если переменная не задана, имя репозитория берётся из GITHUB_REPOSITORY,
 * а при локальной сборке используется корень ("").
 */
const normalizeBasePath = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, "");
  return trimmed && !trimmed.startsWith("/") ? `/${trimmed}` : trimmed;
};

function repoBasePath() {
  const [owner, repo] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
  if (!owner || !repo) return "";
  // Репозиторий USERNAME.github.io публикуется в корне домена
  return repo.toLowerCase() === `${owner.toLowerCase()}.github.io` ? "" : `/${repo}`;
}

const basePath = normalizeBasePath(process.env.BASE_PATH ?? repoBasePath());
const owner = (process.env.GITHUB_REPOSITORY ?? "").split("/")[0];
const siteUrl = (
  process.env.SITE_URL || (owner ? `https://${owner.toLowerCase()}.github.io${basePath}` : `http://localhost:3000${basePath}`)
).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  // Значения встраиваются в код при сборке — используются в src/lib/site.ts
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_SITE_URL: siteUrl,
  },
  poweredByHeader: false,
  images: {
    // На GitHub Pages нет сервера для оптимизации: отдаём исходные файлы из public/
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
