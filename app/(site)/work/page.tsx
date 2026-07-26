import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity-fetch";
import { allCaseStudiesQuery } from "@/sanity/queries";
import type { CaseStudySummary } from "@/lib/types";
import PortfolioGrid from "@/components/PortfolioGrid";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Experiential activations and digital campaigns delivered for 300+ brands across India.",
};

export default async function WorkPage() {
  const caseStudies = await sanityFetch<CaseStudySummary[]>(allCaseStudiesQuery);

  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <p className="eyebrow mb-4">Our Work</p>
      <h1 className="mb-12 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-7xl">
        Portfolio
      </h1>
      <PortfolioGrid caseStudies={caseStudies} />
    </section>
  );
}
