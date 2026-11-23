import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { OG_IMAGE } from "@/lib/site";

/**
 * Картинка превью ссылки (WhatsApp, Telegram, соцсети) — out/og-image.png.
 * Генерируется один раз при сборке; расширение .png нужно, чтобы GitHub Pages отдавал верный тип файла.
 */
export const dynamic = "force-static";

export async function GET() {
  const dir = path.join(process.cwd(), "src/app/_og");
  const [comfortaa, nunito] = await Promise.all([
    readFile(path.join(dir, "Comfortaa-700.ttf")),
    readFile(path.join(dir, "Nunito-700.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          padding: "0 80px",
          background: "linear-gradient(160deg, #e4f7f4 0%, #fffbf4 55%, #fff5cf 100%)",
          fontFamily: "Nunito",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 720 }}>
          <div style={{ display: "flex", alignSelf: "flex-start", background: "#fff", borderRadius: 999, padding: "10px 24px", fontSize: 28, color: "#0f7368" }}>
            Бөбекжай-балабақша · Өтеген батыр ауылы
          </div>
          <div style={{ display: "flex", fontFamily: "Comfortaa", fontSize: 120, color: "#24324a", marginTop: 24 }}>«Тұмар»</div>
          <div style={{ display: "flex", fontSize: 40, color: "#55617a", marginTop: 4 }}>Детский ясли-сад</div>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            {[
              ["3 топ", "#e4f7f4", "#0f7368"],
              ["Қазақ тілі", "#fff5cf", "#855c00"],
              ["4 мезгіл тамақ", "#fff0e8", "#b24a22"],
              ["07:00–18:00", "#f3eefe", "#5f45b5"],
            ].map(([label, bg, fg]) => (
              <div key={label} style={{ display: "flex", background: bg, color: fg, borderRadius: 999, padding: "10px 22px", fontSize: 28 }}>
                {label}
              </div>
            ))}
          </div>
        </div>
        <svg width="330" height="330" viewBox="0 0 64 64" style={{ position: "absolute", right: 70, top: 150 }}>
          <path d="M22 17c0-9 20-9 20 0" stroke="#c9b8f4" strokeWidth="3.4" fill="none" strokeLinecap="round" />
          <path d="M11 19.5h42L32 57.5Z" fill="#6fd3c9" stroke="#6fd3c9" strokeWidth="7" strokeLinejoin="round" />
          <path d="M19 23.5h26L32 47Z" fill="#ffd65c" stroke="#ffd65c" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="27.5" cy="30" r="1.9" fill="#24324a" />
          <circle cx="36.5" cy="30" r="1.9" fill="#24324a" />
          <path d="M28.5 35c2 2 5 2 7 0" stroke="#24324a" strokeWidth="1.9" strokeLinecap="round" fill="none" />
          <circle cx="32" cy="16" r="2.6" fill="#ffbc9a" />
        </svg>
      </div>
    ),
    {
      width: OG_IMAGE.width,
      height: OG_IMAGE.height,
      fonts: [
        { name: "Comfortaa", data: comfortaa, weight: 700, style: "normal" },
        { name: "Nunito", data: nunito, weight: 700, style: "normal" },
      ],
    },
  );
}
