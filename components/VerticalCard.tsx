import Link from "next/link";
import Image from "next/image";
import type { Vertical } from "@/lib/types";
import { urlForImage } from "@/sanity/image";

export default function VerticalCard({ vertical, tone }: { vertical: Vertical; tone: "signal" | "pulse" }) {
  const img = urlForImage(vertical.heroImage);
  const accent = tone === "signal" ? "group-hover:text-signal" : "group-hover:text-pulse";

  return (
    <Link
      href={`/${vertical.slug.current}`}
      className="group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl bg-ink p-8 md:p-10"
    >
      {img ? (
        <Image
          src={img.width(900).height(1100).url()}
          alt=""
          fill
          className="object-cover opacity-40 transition-transform duration-700 ease-signal group-hover:scale-105"
        />
      ) : (
        <div className="grid-tick-bg absolute inset-0 opacity-20" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative">
        <p className="eyebrow mb-3 text-paper/60">{vertical.heroStat?.value ?? ""} {vertical.heroStat?.label ?? ""}</p>
        <h3 className={`font-display text-4xl uppercase tracking-tightest text-paper transition-colors ${accent} md:text-5xl`}>
          {vertical.title}
        </h3>
        <p className="mt-3 max-w-sm text-sm text-paper/70">{vertical.tagline}</p>
        <span className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper">
          Explore vertical
          <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="transition-transform group-hover:translate-x-1">
            <path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
