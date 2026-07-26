import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "vertical",
      title: "Vertical",
      type: "reference",
      to: [{ type: "vertical" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", title: "One-line summary", type: "string" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "relatedCaseStudies",
      title: "Related case studies",
      type: "array",
      of: [{ type: "reference", to: [{ type: "caseStudy" }] }],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
