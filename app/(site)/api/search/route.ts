import { NextRequest, NextResponse } from "next/server";
import { sanityFetch } from "@/lib/sanity-fetch";
import { searchQuery } from "@/sanity/queries";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get("q")?.trim();

  if (!q) {
    return NextResponse.json({ results: [] });
  }

  const data = await sanityFetch<{ pages: unknown[] }>(searchQuery, { term: `*${q}*` });

  return NextResponse.json({ results: data.pages.slice(0, 8) });
}
