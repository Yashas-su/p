import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  brandsDelivered, foundedYear, contactEmail, contactPhone, officeAddress,
  socialLinks, clientLogos
}`;

export const allVerticalsQuery = groq`*[_type == "vertical"] | order(title asc){
  _id, title, slug, tagline, intro, heroStat, heroImage
}`;

export const verticalBySlugQuery = groq`*[_type == "vertical" && slug.current == $slug][0]{
  _id, title, slug, tagline, intro, heroStat, heroImage, seoTitle, seoDescription,
  "services": services[]->{ _id, title, slug, summary, heroImage }
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id, title, slug, summary, body, heroImage, seoTitle, seoDescription,
  vertical->{ title, slug },
  "relatedCaseStudies": relatedCaseStudies[]->{ _id, title, slug, coverImage, client }
}`;

export const allCaseStudiesQuery = groq`*[_type == "caseStudy"] | order(year desc){
  _id, title, slug, client, industry, year, coverImage,
  vertical->{ title, slug },
  serviceType->{ title, slug }
}`;

export const featuredCaseStudiesQuery = groq`*[_type == "caseStudy" && featured == true] | order(year desc)[0...4]{
  _id, title, slug, client, industry, year, coverImage,
  vertical->{ title, slug }
}`;

export const caseStudyBySlugQuery = groq`*[_type == "caseStudy" && slug.current == $slug][0]{
  _id, title, slug, client, industry, year, coverImage, gallery, challenge, approach, results, body,
  seoTitle, seoDescription,
  vertical->{ title, slug },
  serviceType->{ title, slug }
}`;

export const allPostsQuery = groq`*[_type == "post"] | order(publishedAt desc){
  _id, title, slug, excerpt, category, coverImage, publishedAt, author
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  _id, title, slug, excerpt, category, coverImage, publishedAt, author, body, seoTitle, seoDescription
}`;

export const openCareersQuery = groq`*[_type == "career" && isOpen == true] | order(postedAt desc){
  _id, title, slug, department, location, employmentType, description
}`;

export const searchQuery = groq`{
  "pages": *[_type in ["service", "caseStudy", "post"] && [title, summary, excerpt][@ match $term]]{
    _type, title, "slug": slug.current, "excerpt": coalesce(summary, excerpt)
  }
}`;
