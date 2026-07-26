import Link from "next/link";
import type { ServiceSummary } from "@/lib/types";

export default function ServiceCard({ service, index }: { service: ServiceSummary; index: number }) {
  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group flex items-start justify-between gap-6 border-b border-ink/10 py-7 transition-colors hover:border-signal"
    >
      <div className="flex gap-6">
        <span className="font-mono text-xs text-ink-mid">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h3 className="font-display text-2xl uppercase tracking-tightest text-ink transition-colors group-hover:text-signal md:text-3xl">
            {service.title}
          </h3>
          {service.summary && <p className="mt-2 max-w-md text-sm text-ink-mid">{service.summary}</p>}
        </div>
      </div>
      <svg
        width="20" height="20" viewBox="0 0 20 20" fill="none"
        className="mt-2 shrink-0 -rotate-45 text-ink-mid transition-all group-hover:rotate-0 group-hover:text-signal"
      >
        <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </Link>
  );
}
