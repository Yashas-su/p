import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/lib/sanity-fetch";
import { postBySlugQuery } from "@/sanity/queries";
import type { Post } from "@/lib/types";
import { urlForImage } from "@/sanity/image";
import RichText from "@/components/RichText";

const CATEGORY_LABEL: Record<string, string> = {
  "experiential-marketing": "Experiential",
  "digital-marketing": "Digital Marketing",
  "studio-news": "Studio News",
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug: params.slug });
  return {
    title: post?.seoTitle || post?.title,
    description: post?.seoDescription || post?.excerpt,
  };
}

export default async function InsightPage({ params }: { params: { slug: string } }) {
  const post = await sanityFetch<Post | null>(postBySlugQuery, { slug: params.slug });
  if (!post) notFound();

  const cover = urlForImage(post.coverImage);
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article>
      <section className="px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="eyebrow mb-4 text-signal">
            {post.category ? CATEGORY_LABEL[post.category] : "Studio"} · {date}
            {post.author && ` · ${post.author}`}
          </p>
          <h1 className="font-display text-4xl uppercase leading-[0.95] tracking-tightest text-ink md:text-6xl">
            {post.title}
          </h1>
        </div>
      </section>

      {cover && (
        <div className="mx-auto mb-16 aspect-[16/9] max-w-content overflow-hidden rounded-xl px-6 md:px-10">
          <div className="relative h-full w-full">
            <Image src={cover.width(1600).height(900).url()} alt="" fill className="object-cover" priority />
          </div>
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 pb-24 md:px-10">
        <RichText value={post.body} />
      </div>
    </article>
  );
}
