import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity-fetch";
import { caseStudyBySlugQuery } from "@/sanity/queries";
import type { CaseStudy } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/RichText";
import StatBlock from "@/components/StatBlock";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const c = await sanityFetch<CaseStudy | null>(caseStudyBySlugQuery, { slug: params.slug });
  return {
    title: c?.seoTitle || c?.title,
    description: c?.seoDescription || c?.challenge,
  };
}

export default async function CaseStudyPage({ params }: { params: { slug: string } }) {
  const c = await sanityFetch<CaseStudy | null>(caseStudyBySlugQuery, { slug: params.slug });
  if (!c) notFound();

  const cover = urlForImage(c.coverImage);

  return (
    <>
      <section className="relative flex min-h-[70vh] flex-col justify-end overflow-hidden bg-ink px-6 py-16 text-paper md:px-10 md:py-24">
        {cover && (
          <Image src={cover.width(1800).height(1100).url()} alt="" fill className="object-cover opacity-40" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-transparent" />
        <div className="relative mx-auto w-full max-w-content">
          <p className="eyebrow mb-4 text-signal">
            {c.vertical?.title} {c.industry && `· ${c.industry}`}
          </p>
          <h1 className="max-w-4xl font-display text-5xl uppercase leading-[0.95] tracking-tightest md:text-7xl">
            {c.title}
          </h1>
          <p className="mt-4 font-mono text-sm uppercase tracking-[0.1em] text-paper/70">
            {c.client} {c.year && `· ${c.year}`}
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-content gap-12 px-6 py-16 md:grid-cols-2 md:px-10">
        {c.challenge && (
          <div>
            <p className="eyebrow mb-3">The challenge</p>
            <p className="text-lg leading-relaxed text-graphite">{c.challenge}</p>
          </div>
        )}
        {c.approach && (
          <div>
            <p className="eyebrow mb-3">The approach</p>
            <p className="text-lg leading-relaxed text-graphite">{c.approach}</p>
          </div>
        )}
      </section>

      {c.results && c.results.length > 0 && (
        <section className="border-y border-ink/10 bg-paper-dim/40 px-6 py-16 md:px-10">
          <div className="mx-auto grid max-w-content grid-cols-2 gap-8 md:grid-cols-4">
            {c.results.map((r, i) => (
              <StatBlock key={i} value={r.value} label={r.label} />
            ))}
          </div>
        </section>
      )}

      {c.gallery && c.gallery.length > 0 && (
        <section className="mx-auto max-w-content px-6 py-16 md:px-10">
          <div className="grid gap-6 sm:grid-cols-2">
            {c.gallery.map((img, i) => {
              const url = urlForImage(img);
              if (!url) return null;
              return (
                <div key={i} className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image src={url.width(900).height(675).url()} alt="" fill className="object-cover" />
                </div>
              );
            })}
          </div>
        </section>
      )}

      {c.body && (
        <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
          <RichText value={c.body} />
        </section>
      )}

      <section className="bg-ink px-6 py-20 text-center text-paper md:px-10">
        <h2 className="font-display text-3xl uppercase tracking-tightest md:text-5xl">Have a brief like this?</h2>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-signal hover:text-paper"
        >
          Start a brief
        </Link>
      </section>
    </>
  );
}
