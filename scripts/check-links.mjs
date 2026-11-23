// Проверка собранного сайта: все локальные ссылки (href/src/srcset) в out/**/*.html
// должны указывать на существующие файлы, а якоря #id — на существующие элементы.
//   npm run build && npm run check
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
const index = await readFile(path.join(out, "index.html"), "utf8");
const base = index.match(/(?:src|href)="([^"]*?)\/_next\//)?.[1] ?? "";

async function* walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else yield p;
  }
}

const exists = async (p) => stat(p).then((s) => (s.isDirectory() ? stat(path.join(p, "index.html")).then(() => true, () => false) : true), () => false);
let errors = 0;
let checked = 0;
for await (const file of walk(out)) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const urls = [
    ...[...html.matchAll(/\s(?:href|src)="([^"]+)"/g)].map((m) => m[1]),
    ...[...html.matchAll(/\ssrcset="([^"]+)"/g)].flatMap((m) => m[1].split(",").map((s) => s.trim().split(" ")[0])),
  ];
  for (const raw of urls) {
    const u = raw.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|tel:|data:)/.test(u)) continue;
    checked++;
    if (u.startsWith("#")) {
      if (u.length > 1 && !ids.has(u.slice(1))) {
        errors++;
        console.error(`✗ ${path.relative(out, file)}: якорь ${u} не найден`);
      }
      continue;
    }
    const clean = decodeURIComponent(u.split(/[?#]/)[0]);
    if (!clean.startsWith(`${base}/`)) {
      errors++;
      console.error(`✗ ${path.relative(out, file)}: ${u} — путь без basePath "${base}"`);
      continue;
    }
    if (!(await exists(path.join(out, clean.slice(base.length))))) {
      errors++;
      console.error(`✗ ${path.relative(out, file)}: ${u} — файл не найден`);
    }
  }
}
console.log(errors ? `Найдено ошибок: ${errors}` : `✓ Проверено ссылок: ${checked}, basePath: "${base || "(корень)"}" — ошибок нет`);
process.exit(errors ? 1 : 0);
