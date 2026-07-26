import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { urlForImage } from "@/sanity/image";

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const url = urlForImage(value);
      if (!url) return null;
      return (
        <span className="my-8 block overflow-hidden rounded-xl">
          <Image src={url.width(1200).url()} alt={value.alt || ""} width={1200} height={800} className="h-auto w-full object-cover" />
        </span>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2 className="mt-10 mb-4 font-display text-3xl uppercase tracking-tightest text-ink">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-8 mb-3 font-display text-2xl uppercase tracking-tightest text-ink">{children}</h3>,
    normal: ({ children }) => <p className="mb-5 text-base leading-relaxed text-graphite">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-2 border-signal pl-6 font-display text-xl uppercase tracking-tight text-ink">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} className="text-pulse underline underline-offset-2" target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    ),
  },
};

export default function RichText({ value }: { value: unknown[] | undefined }) {
  if (!value) return null;
  return <PortableText value={value as never} components={components} />;
}
