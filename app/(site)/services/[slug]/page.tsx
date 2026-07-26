import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity-fetch";
import { serviceBySlugQuery } from "@/sanity/queries";
import type { Service } from "@/lib/types";
import RichText from "@/components/RichText";
import CaseStudyCard from "@/components/CaseStudyCard";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = await sanityFetch<Service | null>(serviceBySlugQuery, { slug: params.slug });
  return {
    title: service?.seoTitle || service?.title,
    description: service?.seoDescription || service?.summary,
  };
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await sanityFetch<Service | null>(serviceBySlugQuery, { slug: params.slug });
  if (!service) notFound();

  return (
    <>
      <section className="grid-tick-bg px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-4">
            <Link href={`/${service.vertical.slug.current}`} className="hover:text-signal">
              {service.vertical.title}
            </Link>
          </p>
          <h1 className="max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-7xl">
            {service.title}
          </h1>
          {service.summary && <p className="mt-6 max-w-xl text-lg text-ink-mid">{service.summary}</p>}
        </div>
      </section>

      {service.body && (
        <section className="mx-auto max-w-3xl px-6 py-16 md:px-10">
          <RichText value={service.body} />
        </section>
      )}

      {service.relatedCaseStudies && service.relatedCaseStudies.length > 0 && (
        <section className="border-t border-ink/10 bg-paper-dim/40 px-6 py-20 md:px-10">
          <div className="mx-auto max-w-content">
            <p className="eyebrow mb-8">Related work</p>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedCaseStudies.map((c) => (
                <CaseStudyCard key={c._id} caseStudy={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-ink px-6 py-20 text-center text-paper md:px-10">
        <h2 className="font-display text-3xl uppercase tracking-tightest md:text-5xl">
          Talk to us about {service.title.toLowerCase()}
        </h2>
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
