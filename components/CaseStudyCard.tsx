import Link from "next/link";
import Image from "next/image";
import type { CaseStudySummary } from "@/lib/types";
import { urlForImage } from "@/sanity/image";

export default function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudySummary }) {
  const img = urlForImage(caseStudy.coverImage);

  return (
    <Link href={`/work/${caseStudy.slug.current}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-dim">
        {img && (
          <Image
            src={img.width(800).height(600).url()}
            alt=""
            fill
            className="object-cover transition-transform duration-700 ease-signal group-hover:scale-105"
          />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-paper backdrop-blur">
          {caseStudy.vertical?.title}
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-xl uppercase tracking-tightest text-ink transition-colors group-hover:text-signal">
            {caseStudy.title}
          </h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-ink-mid">
            {caseStudy.client} {caseStudy.year && `· ${caseStudy.year}`}
          </p>
        </div>
      </div>
    </Link>
  );
}
