// Локальный просмотр собранного сайта (папка out/) так, как его отдаёт GitHub Pages:
// с тем же подпутём (basePath), который был использован при сборке.
//   npm run build && npm run preview  →  http://localhost:4173/<basePath>/
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const out = path.resolve("out");
const port = Number(process.env.PORT ?? 4173);
const index = await readFile(path.join(out, "index.html"), "utf8").catch(() => {
  console.error("Папка out/ не найдена — сначала выполните `npm run build`.");
  process.exit(1);
});
const base = index.match(/(?:src|href)="([^"]*?)\/_next\//)?.[1] ?? "";

const types = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".txt": "text/plain; charset=utf-8", ".xml": "application/xml", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff2": "font/woff2", ".pdf": "application/pdf", ".ico": "image/x-icon",
};

createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url ?? "/", "http://x").pathname);
  if (base && !url.startsWith(`${base}/`)) {
    res.writeHead(302, { location: `${base}/` }).end();
    return;
  }
  let file = path.join(out, url.slice(base.length));
  if (!file.startsWith(out)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, "index.html");
    const body = await readFile(file);
    res.writeHead(200, { "content-type": types[path.extname(file).toLowerCase()] ?? "application/octet-stream" }).end(body);
  } catch {
    // Как GitHub Pages: /kk → /kk/
    if (!url.endsWith("/") && !path.extname(url)) return res.writeHead(301, { location: `${url}/` }).end();
    res.writeHead(404, { "content-type": "text/html; charset=utf-8" }).end(await readFile(path.join(out, "404.html")));
  }
}).listen(port, () => console.log(`Просмотр: http://localhost:${port}${base}/`));
