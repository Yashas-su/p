import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { sanityFetch } from "@/lib/sanity-fetch";
import { allPostsQuery } from "@/sanity/queries";
import type { Post } from "@/lib/types";
import { urlForImage } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Insights",
  description: "Notes from the studio on experiential activations and digital marketing.",
};

const CATEGORY_LABEL: Record<string, string> = {
  "experiential-marketing": "Experiential",
  "digital-marketing": "Digital Marketing",
  "studio-news": "Studio News",
};

export default async function InsightsPage() {
  const posts = await sanityFetch<Post[]>(allPostsQuery);

  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <p className="eyebrow mb-4">Insights</p>
      <h1 className="mb-12 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-7xl">
        Notes from the studio
      </h1>

      {posts.length === 0 ? (
        <p className="font-mono text-sm text-ink-mid">Nothing published yet — check back soon.</p>
      ) : (
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const img = urlForImage(post.coverImage);
            return (
              <Link key={post._id} href={`/insights/${post.slug.current}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-dim">
                  {img && (
                    <Image
                      src={img.width(800).height(600).url()}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-700 ease-signal group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="eyebrow mb-2 mt-4 text-signal">
                  {post.category ? CATEGORY_LABEL[post.category] : "Studio"}
                </p>
                <h2 className="font-display text-xl uppercase tracking-tightest text-ink transition-colors group-hover:text-signal">
                  {post.title}
                </h2>
                {post.excerpt && <p className="mt-2 text-sm text-ink-mid line-clamp-2">{post.excerpt}</p>}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
