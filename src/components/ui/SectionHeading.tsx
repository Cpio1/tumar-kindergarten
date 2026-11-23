type Tone = "teal" | "sun" | "peach" | "lavender";

const tones: Record<Tone, string> = {
  teal: "bg-teal-soft text-teal-deep",
  sun: "bg-sun-soft text-sun-deep",
  peach: "bg-peach-soft text-peach-deep",
  lavender: "bg-lavender-soft text-lavender-deep",
};

/** Заголовок раздела: «бейдж» + заголовок + короткое описание. */
export function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  tone = "teal",
  align = "center",
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead?: string;
  tone?: Tone;
  align?: "center" | "left";
}) {
  const center = align === "center";
  return (
    <div className={`reveal mb-7 lg:mb-[clamp(20px,3.5svh,36px)] ${center ? "mx-auto max-w-2xl text-center" : "max-w-xl"}`}>
      <p className={`chip ${tones[tone]} mb-3`}>
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="h-section text-ink text-balance">
        {title}
      </h2>
      {lead ? <p className="mt-2.5 text-[1.02rem] text-ink-soft text-pretty lg:text-[1.06rem]">{lead}</p> : null}
    </div>
  );
}
