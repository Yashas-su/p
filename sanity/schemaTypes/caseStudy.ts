import { defineField, defineType } from "sanity";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "client", title: "Client name", type: "string" }),
    defineField({
      name: "vertical",
      title: "Vertical",
      type: "reference",
      to: [{ type: "vertical" }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "serviceType",
      title: "Service type (for filtering)",
      type: "reference",
      to: [{ type: "service" }],
    }),
    defineField({ name: "industry", title: "Industry (for filtering)", type: "string" }),
    defineField({ name: "year", title: "Year", type: "string" }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({ name: "challenge", title: "The challenge", type: "text", rows: 4 }),
    defineField({ name: "approach", title: "The approach", type: "text", rows: 4 }),
    defineField({
      name: "results",
      title: "Results / stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value (e.g. 2.4M)", type: "string" },
            { name: "label", title: "Label (e.g. Impressions)", type: "string" },
          ],
        },
      ],
    }),
    defineField({ name: "body", title: "Full write-up", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
