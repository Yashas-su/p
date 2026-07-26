import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "brandsDelivered", title: "Brands delivered stat (e.g. 300+)", type: "string" }),
    defineField({ name: "foundedYear", title: "Founded year", type: "string" }),
    defineField({ name: "contactEmail", title: "Contact email", type: "string" }),
    defineField({ name: "contactPhone", title: "Contact phone", type: "string" }),
    defineField({ name: "officeAddress", title: "Office address", type: "text", rows: 3 }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "clientLogos",
      title: "Client logos (marquee)",
      type: "array",
      of: [{ type: "image" }],
    }),
  ],
});
