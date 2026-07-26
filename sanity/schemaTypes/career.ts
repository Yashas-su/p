import { defineField, defineType } from "sanity";

export default defineType({
  name: "career",
  title: "Career Listing",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Role title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({
      name: "department",
      title: "Department",
      type: "string",
      options: { list: ["Experiential", "Digital Marketing", "Studio & Ops"] },
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "employmentType",
      title: "Employment type",
      type: "string",
      options: { list: ["Full-time", "Internship", "Freelance / Project"] },
    }),
    defineField({ name: "description", title: "Description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "isOpen", title: "Currently open", type: "boolean", initialValue: true }),
    defineField({ name: "postedAt", title: "Posted at", type: "datetime" }),
  ],
});
