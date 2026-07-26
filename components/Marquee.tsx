import Image from "next/image";
import type { Image as SanityImage } from "sanity";
import { urlForImage } from "@/sanity/image";

export default function Marquee({ logos }: { logos?: SanityImage[] }) {
  const items = logos && logos.length > 0 ? logos : Array.from({ length: 8 });

  return (
    <div className="border-y border-ink/10 bg-paper-dim py-6">
      <div className="mx-auto flex max-w-content items-center gap-3 overflow-hidden px-6 md:px-10">
        <span className="eyebrow shrink-0 text-signal">300+ brands ·</span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] items-center gap-16">
            {[...items, ...items].map((logo, i) => {
              const url = logo ? urlForImage(logo as SanityImage) : undefined;
              return (
                <div key={i} className="flex h-8 w-28 shrink-0 items-center justify-center">
                  {url ? (
                    <Image src={url.width(160).height(64).url()} alt="" width={112} height={32} className="max-h-8 w-auto opacity-70 grayscale" />
                  ) : (
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-mid">Brand {(i % items.length) + 1}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
