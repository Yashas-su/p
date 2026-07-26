import Link from "next/link";
import { sanityFetch } from "@/lib/sanity-fetch";
import { allVerticalsQuery, featuredCaseStudiesQuery, siteSettingsQuery } from "@/sanity/queries";
import type { Vertical, CaseStudySummary, SiteSettings } from "@/lib/types";
import Spotlight from "@/components/Spotlight";
import VerticalCard from "@/components/VerticalCard";
import CaseStudyCard from "@/components/CaseStudyCard";
import Marquee from "@/components/Marquee";
import StatBlock from "@/components/StatBlock";

export default async function HomePage() {
  const [verticals, featured, settings] = await Promise.all([
    sanityFetch<Vertical[]>(allVerticalsQuery),
    sanityFetch<CaseStudySummary[]>(featuredCaseStudiesQuery),
    sanityFetch<SiteSettings>(siteSettingsQuery),
  ]);

  const experiential = verticals.find((v) => v.slug.current === "experiential-marketing");
  const digital = verticals.find((v) => v.slug.current === "digital-marketing");

  return (
    <>
      {/* Split hero: dark kinetic (Experiential) / light precise (Digital) */}
      <section className="grid min-h-[86vh] md:grid-cols-2">
        <Spotlight className="flex flex-col justify-between bg-ink px-6 py-14 md:px-12 md:py-20">
          <p className="eyebrow text-signal">Experiential</p>
          <div>
            <h1 className="font-display text-[13vw] uppercase leading-[0.92] tracking-tightest text-paper md:text-[4.2vw]">
              Brands, felt
              <br />
              in real life
            </h1>
            <p className="mt-6 max-w-sm text-sm text-paper/70 md:text-base">
              Activations, roadshows, and live moments engineered for {settings?.brandsDelivered ?? "300+"} brands across India.
            </p>
            <Link
              href="/experiential-marketing"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:text-signal"
            >
              See experiential work
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" /></svg>
            </Link>
          </div>
        </Spotlight>

        <div className="grid-tick-bg flex flex-col justify-between bg-paper px-6 py-14 md:px-12 md:py-20">
          <p className="eyebrow text-pulse">Digital Marketing</p>
          <div>
            <h1 className="font-display text-[13vw] uppercase leading-[0.92] tracking-tightest text-ink md:text-[4.2vw]">
              Campaigns,
              <br />
              engineered
            </h1>
            <p className="mt-6 max-w-sm text-sm text-ink-mid md:text-base">
              Strategy, media, and content built on data — precise where experiential is expressive.
            </p>
            <Link
              href="/digital-marketing"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:text-pulse"
            >
              See digital work
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.4" /></svg>
            </Link>
          </div>
        </div>
      </section>

      <Marquee logos={settings?.clientLogos} />

      {/* Verticals as cards, restated for anyone who scrolled past the hero */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-10">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-3">Two disciplines, one studio</p>
          <h2 className="font-display text-4xl uppercase tracking-tightest text-ink md:text-5xl">
            Where the physical meets the measurable
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {experiential && <VerticalCard vertical={experiential} tone="signal" />}
          {digital && <VerticalCard vertical={digital} tone="pulse" />}
        </div>
      </section>

      {/* Featured work */}
      {featured.length > 0 && (
        <section className="border-t border-ink/10 bg-paper-dim/40 px-6 py-24 md:px-10">
          <div className="mx-auto max-w-content">
            <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="eyebrow mb-3">Selected work</p>
                <h2 className="font-display text-4xl uppercase tracking-tightest text-ink md:text-5xl">Recent launches</h2>
              </div>
              <Link href="/work" className="font-mono text-xs uppercase tracking-[0.15em] text-signal underline underline-offset-4">
                View all work
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((c) => (
                <CaseStudyCard key={c._id} caseStudy={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Studio stats */}
      <section className="mx-auto max-w-content px-6 py-24 md:px-10">
        <div className="grid gap-10 border-t border-ink/10 pt-12 sm:grid-cols-3">
          <StatBlock value={settings?.brandsDelivered ?? "300+"} label="Brands delivered" />
          <StatBlock value={settings?.foundedYear ? `Est. ${settings.foundedYear}` : "Mumbai HQ"} label="In-house + partner network across India" />
          <StatBlock value="2" label="Disciplines under one roof" />
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-ink/10 bg-ink px-6 py-24 text-paper md:px-10">
        <div className="mx-auto max-w-content text-center">
          <h2 className="font-display text-4xl uppercase tracking-tightest md:text-6xl">
            Got a brief? <span className="text-signal">Send it over.</span>
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-block rounded-full bg-paper px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-ink transition-colors hover:bg-signal hover:text-paper"
          >
            Start a brief
          </Link>
        </div>
      </section>
    </>
  );
}
