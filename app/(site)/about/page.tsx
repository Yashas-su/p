import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity-fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/lib/types";
import StatBlock from "@/components/StatBlock";
import Marquee from "@/components/Marquee";

export const metadata: Metadata = {
  title: "About",
  description: "Planning Labs is a Mumbai-based studio built around two disciplines: experiential activations and digital marketing.",
};

export default async function AboutPage() {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);

  return (
    <>
      <section className="grid-tick-bg px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-content">
          <p className="eyebrow mb-4">About</p>
          <h1 className="max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-7xl">
            One studio,
            <br />
            two ways of thinking
          </h1>
          <p className="mt-8 max-w-xl text-lg text-ink-mid">
            Planning Labs was built on a simple bet: the brands that stick are the ones people experience in
            person and encounter everywhere else, too. So we run two disciplines under one roof — experiential
            activations that put a brand in the room, and digital marketing that keeps it in view long after.
          </p>
        </div>
      </section>

      <Marquee logos={settings?.clientLogos} />

      <section className="mx-auto max-w-content px-6 py-20 md:px-10">
        <div className="grid gap-10 sm:grid-cols-3">
          <StatBlock value={settings?.brandsDelivered ?? "300+"} label="Brands delivered" />
          <StatBlock value={settings?.foundedYear ?? "Mumbai"} label={settings?.foundedYear ? "Founded" : "Headquartered"} />
          <StatBlock value="2" label="Disciplines, one studio" />
        </div>
      </section>

      <section className="border-t border-ink/10 bg-ink px-6 py-20 text-paper md:px-10">
        <div className="mx-auto grid max-w-content gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow mb-3 text-signal">How we work</p>
            <p className="text-base leading-relaxed text-paper/80">
              Every brief starts with the same question: does this need to be felt, measured, or both? From
              there we route it to the right discipline, or run both in parallel when a launch needs a physical
              moment and a digital tail.
            </p>
          </div>
          <div>
            <p className="eyebrow mb-3 text-pulse">Who we work with</p>
            <p className="text-base leading-relaxed text-paper/80">
              Marketing teams at consumer brands, D2C companies, and enterprises across India who need a
              partner that can plan a live activation on Monday and ship a campaign report on Friday.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
