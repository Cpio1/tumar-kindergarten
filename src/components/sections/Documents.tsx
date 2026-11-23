"use client";

import { Download, ExternalLink, FileText, FolderOpen, Link2 } from "lucide-react";
import { documents, type DocumentItem } from "@/lib/documents";
import { useLang, useT } from "@/lib/i18n";
import { waHref } from "@/lib/site";
import { Sparkle, Star, Wave } from "../decor/Doodles";
import { WhatsAppIcon } from "../ui/BrandIcons";
import { SectionHeading } from "../ui/SectionHeading";

const tones = [
  "bg-teal-soft text-teal-deep",
  "bg-peach-soft text-peach-deep",
  "bg-lavender-soft text-lavender-deep",
  "bg-sun-soft text-sun-deep",
];

function formatSize(bytes: number | undefined) {
  if (!bytes) return null;
  const kb = bytes / 1024;
  return kb < 1024 ? `${Math.max(1, Math.round(kb))} КБ` : `${(kb / 1024).toFixed(1).replace(".", ",")} МБ`;
}

export function Documents() {
  const t = useT();
  const d = t.documents;

  return (
    <>
      <Wave fill="#fff5cf" />
      <section id="documents" aria-labelledby="documents-title" className="section bg-sun-soft">
        <Sparkle className="decor -z-10 top-12 left-[5%] w-6 animate-twinkle" fill="#ffbc9a" />
        <Star className="decor -z-10 right-[6%] bottom-12 w-7 animate-twinkle" fill="#fff" />
        <div className="container-x">
          <SectionHeading id="documents-title" eyebrow={d.eyebrow} title={d.title} lead={documents.length ? d.lead : undefined} tone="teal" />
          {documents.length ? (
            <ul className={`mx-auto grid gap-3 lg:gap-4 ${documents.length > 1 ? "max-w-4xl sm:grid-cols-2" : "max-w-xl"}`}>
              {documents.map((doc, i) => (
                <DocumentCard key={doc.id} doc={doc} tone={tones[i % tones.length]} delay={i * 60} />
              ))}
            </ul>
          ) : (
            <EmptyDocuments />
          )}
        </div>
      </section>
      <Wave fill="#fff5cf" flip />
    </>
  );
}

function DocumentCard({ doc, tone, delay }: { doc: DocumentItem; tone: string; delay: number }) {
  const t = useT();
  const [lang] = useLang();
  const d = t.documents;
  const Icon = doc.source === "local" ? FileText : doc.source === "drive" ? FolderOpen : Link2;
  const meta = [doc.format ?? (doc.source === "link" ? d.link : null), formatSize(doc.size)].filter(Boolean).join(" · ");
  const title = doc.title[lang];

  return (
    <li
      className="reveal flex items-center gap-4 rounded-[28px_28px_28px_10px] bg-white p-4 shadow-soft ring-1 ring-line"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
    >
      <span className={`grid size-12 shrink-0 place-items-center rounded-2xl ${tone}`}>
        <Icon className="size-6" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <h3 className="font-bold leading-snug text-ink break-words">{title}</h3>
        {meta ? <p className="mt-0.5 text-sm font-semibold text-ink-soft">{meta}</p> : null}
      </div>
      <div className="flex shrink-0 gap-1.5">
        <a
          href={doc.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${d.open}: ${title} (${t.a11y.newTab})`}
          title={d.open}
          className="grid size-11 place-items-center rounded-full bg-teal-soft text-teal-deep transition-colors hover:bg-teal hover:text-white"
        >
          <ExternalLink className="size-5" aria-hidden />
        </a>
        {doc.downloadUrl ? (
          <a
            href={doc.downloadUrl}
            download={doc.source === "local" ? "" : undefined}
            target={doc.source === "local" ? undefined : "_blank"}
            rel={doc.source === "local" ? undefined : "noopener noreferrer"}
            aria-label={`${d.download}: ${title}`}
            title={d.download}
            className="grid size-11 place-items-center rounded-full bg-sun-soft text-sun-deep transition-colors hover:bg-sun hover:text-ink"
          >
            <Download className="size-5" aria-hidden />
          </a>
        ) : null}
      </div>
    </li>
  );
}

function EmptyDocuments() {
  const t = useT();
  const d = t.documents;
  return (
    <div className="reveal relative mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-[44px_16px_44px_44px] bg-white/85 px-6 py-9 text-center shadow-soft ring-1 ring-white sm:flex-row sm:px-9 sm:text-left">
      <div aria-hidden className="relative shrink-0">
        <span className="absolute top-1 left-3 h-20 w-16 rotate-[10deg] rounded-xl bg-lavender-soft ring-1 ring-lavender/60" />
        <span className="relative grid h-20 w-16 -rotate-6 place-items-center rounded-xl bg-white shadow-soft ring-1 ring-line">
          <span className="block w-9 space-y-1.5">
            <span className="block h-1.5 rounded bg-teal" />
            <span className="block h-1.5 w-7 rounded bg-peach" />
            <span className="block h-1.5 rounded bg-sun" />
            <span className="block h-1.5 w-5 rounded bg-lavender" />
          </span>
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-display text-xl font-bold text-ink">{d.emptyTitle}</h3>
        <p className="mt-2 text-ink-soft text-pretty">{d.emptyText}</p>
        <a href={waHref(d.askText)} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-5 !min-h-11">
          <WhatsAppIcon className="size-5 text-wa" />
          {d.ask}
        </a>
      </div>
    </div>
  );
}
