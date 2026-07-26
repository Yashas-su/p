export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET",
  "production"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID",
  "placeholder"
);

function assertValue<T>(v: T | undefined, errorMessage: string, fallback: T): T {
  if (v === undefined) {
    // Falls back to a valid-format placeholder so `next build` succeeds
    // without live Sanity credentials present (e.g. in CI, or before the
    // client's Sanity project is created). The placeholder is a
    // syntactically valid projectId/dataset so the client can construct
    // without throwing — it will simply return no data until real values
    // are set. Real values are required at runtime for the site to show
    // real content — set them in .env.local (dev) and in Cloudflare
    // Pages' project environment variables (production/preview).
    console.warn(errorMessage);
    return fallback;
  }
  return v;
}
