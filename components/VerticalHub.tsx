import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity-fetch";
import { verticalBySlugQuery } from "@/sanity/queries";
import type { Vertical } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import ServiceCard from "@/components/ServiceCard";
import StatBlock from "@/components/StatBlock";

export default async function VerticalHub({ slug, tone }: { slug: string; tone: "signal" | "pulse" }) {
  const vertical = await sanityFetch<Vertical | null>(verticalBySlugQuery, { slug });
  if (!vertical) notFound();

  const img = urlForImage(vertical.heroImage);
  const accentText = tone === "signal" ? "text-signal" : "text-pulse";

  return (
    <>
      <section className="relative flex min-h-[60vh] flex-col justify-end overflow-hidden bg-ink px-6 py-16 text-paper md:px-10 md:py-24">
        {img && (
          <Image src={img.width(1800).height(1000).url()} alt="" fill className="object-cover opacity-30" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        <div className="relative mx-auto w-full max-w-content">
          <p className={`eyebrow mb-4 ${accentText}`}>{vertical.tagline}</p>
          <h1 className="max-w-4xl font-display text-6xl uppercase leading-[0.95] tracking-tightest md:text-8xl">
            {vertical.title}
          </h1>
          {vertical.heroStat && (
            <div className="mt-8">
              <StatBlock value={vertical.heroStat.value} label={vertical.heroStat.label} tone="dark" />
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-content px-6 py-16 md:px-10">
        <p className="max-w-2xl text-lg text-graphite md:text-xl">{vertical.intro}</p>
      </section>

      <section className="mx-auto max-w-content border-t border-ink/10 px-6 py-16 md:px-10">
        <p className="eyebrow mb-8">Services</p>
        <div>
          {vertical.services?.map((service, i) => (
            <ServiceCard key={service._id} service={service} index={i} />
          ))}
        </div>
      </section>

      <section className={`px-6 py-20 text-center md:px-10 ${tone === "signal" ? "bg-signal" : "bg-pulse"}`}>
        <h2 className="font-display text-3xl uppercase tracking-tightest text-paper md:text-5xl">
          Ready to brief this vertical?
        </h2>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-paper hover:text-ink"
        >
          Start a brief
        </Link>
      </section>
    </>
  );
}
