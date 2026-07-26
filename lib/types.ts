import type { Image } from "sanity";

export interface SlugRef {
  title: string;
  slug: { current: string };
}

export interface Vertical {
  _id: string;
  title: string;
  slug: { current: string };
  tagline?: string;
  intro?: string;
  heroStat?: { value: string; label: string };
  heroImage?: Image;
  seoTitle?: string;
  seoDescription?: string;
  services?: ServiceSummary[];
}

export interface ServiceSummary {
  _id: string;
  title: string;
  slug: { current: string };
  summary?: string;
  heroImage?: Image;
}

export interface Service extends ServiceSummary {
  body?: unknown[];
  vertical: SlugRef;
  relatedCaseStudies?: CaseStudySummary[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface CaseStudySummary {
  _id: string;
  title: string;
  slug: { current: string };
  client?: string;
  industry?: string;
  year?: string;
  coverImage?: Image;
  vertical?: SlugRef;
  serviceType?: SlugRef;
}

export interface CaseStudy extends CaseStudySummary {
  gallery?: Image[];
  challenge?: string;
  approach?: string;
  results?: { value: string; label: string }[];
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  category?: "experiential-marketing" | "digital-marketing" | "studio-news";
  coverImage?: Image;
  publishedAt: string;
  author?: string;
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface Career {
  _id: string;
  title: string;
  slug: { current: string };
  department?: string;
  location?: string;
  employmentType?: string;
  description?: unknown[];
}

export interface SiteSettings {
  brandsDelivered?: string;
  foundedYear?: string;
  contactEmail?: string;
  contactPhone?: string;
  officeAddress?: string;
  socialLinks?: { platform: string; url: string }[];
  clientLogos?: Image[];
}
