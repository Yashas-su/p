import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Insight / Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Experiential Marketing", value: "experiential-marketing" },
          { title: "Digital Marketing", value: "digital-marketing" },
          { title: "Studio News", value: "studio-news" },
        ],
      },
    }),
    defineField({ name: "coverImage", title: "Cover image", type: "image", options: { hotspot: true } }),
    defineField({ name: "publishedAt", title: "Published at", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "author", title: "Author", type: "string" }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image" }] }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string" }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3 }),
  ],
});
