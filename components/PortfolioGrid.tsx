"use client";

import { useMemo, useState } from "react";
import type { CaseStudySummary } from "@/lib/types";
import CaseStudyCard from "@/components/CaseStudyCard";

function uniqueBy<T>(items: T[], key: (t: T) => string | undefined) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const item of items) {
    const k = key(item);
    if (k && !seen.has(k)) {
      seen.add(k);
      out.push(k);
    }
  }
  return out;
}

export default function PortfolioGrid({ caseStudies }: { caseStudies: CaseStudySummary[] }) {
  const [vertical, setVertical] = useState<string | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);

  const verticals = useMemo(() => uniqueBy(caseStudies, (c) => c.vertical?.title), [caseStudies]);
  const industries = useMemo(() => uniqueBy(caseStudies, (c) => c.industry), [caseStudies]);

  const filtered = caseStudies.filter((c) => {
    if (vertical && c.vertical?.title !== vertical) return false;
    if (industry && c.industry !== industry) return false;
    return true;
  });

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-ink/10 pb-6">
        <FilterGroup label="Vertical" value={vertical} onChange={setVertical} options={verticals} />
        <FilterGroup label="Industry" value={industry} onChange={setIndustry} options={industries} />
        {(vertical || industry) && (
          <button
            onClick={() => {
              setVertical(null);
              setIndustry(null);
            }}
            className="font-mono text-xs uppercase tracking-[0.1em] text-signal underline underline-offset-4"
          >
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center font-mono text-sm text-ink-mid">
          No work matches those filters yet — try clearing one.
        </p>
      ) : (
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CaseStudyCard key={c._id} caseStudy={c} />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
  options: string[];
}) {
  if (options.length === 0) return null;
  return (
    <div className="flex items-center gap-2">
      <span className="eyebrow">{label}:</span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(value === opt ? null : opt)}
            className={`rounded-full border px-3 py-1 font-mono text-xs uppercase tracking-[0.05em] transition-colors ${
              value === opt
                ? "border-signal bg-signal text-paper"
                : "border-ink/15 text-ink-mid hover:border-signal hover:text-signal"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
