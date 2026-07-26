import { defineField, defineType } from "sanity";

export default defineType({
  name: "vertical",
  title: "Vertical",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "intro", title: "Intro copy", type: "text", rows: 4 }),
    defineField({
      name: "heroStat",
      title: "Hero stat",
      type: "object",
      fields: [
        { name: "value", title: "Value (e.g. 300+)", type: "string" },
        { name: "label", title: "Label (e.g. Brands delivered)", type: "string" },
      ],
    }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "services",
      title: "Services in this vertical",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
    }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
