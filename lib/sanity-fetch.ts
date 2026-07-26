import { client } from "@/sanity/client";

/**
 * Central fetch helper. Every page calls this instead of the raw client so
 * caching/revalidation behavior lives in one place. Revalidates every 60s —
 * short enough that CMS edits show up quickly, long enough to stay within
 * Sanity's free-tier API usage for a site this size.
 */
export async function sanityFetch<T>(query: string, params: Record<string, unknown> = {}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 60 },
  });
}
