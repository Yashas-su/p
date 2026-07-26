import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemaTypes";
import { apiVersion, dataset, projectId } from "./sanity/env";

export default defineConfig({
  name: "planning-labs",
  title: "Planning Labs",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool(),
    // Vision lets an editor test GROQ queries directly in the Studio —
    // dev/QA convenience, safe to leave in for the client's own use too.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
