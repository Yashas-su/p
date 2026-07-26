import type { Metadata } from "next";
import VerticalHub from "@/components/VerticalHub";
import { sanityFetch } from "@/lib/sanity-fetch";
import { verticalBySlugQuery } from "@/sanity/queries";
import type { Vertical } from "@/lib/types";

export async function generateMetadata(): Promise<Metadata> {
  const vertical = await sanityFetch<Vertical | null>(verticalBySlugQuery, { slug: "experiential-marketing" });
  return {
    title: vertical?.seoTitle || "Experiential Marketing",
    description: vertical?.seoDescription || vertical?.intro,
  };
}

export default function ExperientialMarketingPage() {
  return <VerticalHub slug="experiential-marketing" tone="signal" />;
}
