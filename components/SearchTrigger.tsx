"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Result {
  _type: string;
  title: string;
  slug: string;
  excerpt?: string;
}

const TYPE_PATH: Record<string, string> = {
  service: "services",
  caseStudy: "work",
  post: "insights",
};

export default function SearchTrigger() {
  const [open, setOpen] = useState(false);
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!term.trim()) {
      setResults([]);
      return;
    }
    const handle = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(term)}`);
        const data = await res.json();
        setResults(data.results ?? []);
      } finally {
        setLoading(false);
      }
    }, 250);
    return () => clearTimeout(handle);
  }, [term]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="eyebrow flex items-center gap-2 text-ink transition-colors hover:text-signal"
        aria-label="Search the site"
      >
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.3" />
          <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
        <span className="hidden md:inline">Search</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] bg-ink/60 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="mx-auto mt-24 w-[92%] max-w-2xl rounded-2xl bg-paper p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-ink/10 px-4 py-3">
              <span className="font-mono text-xs text-ink-mid">/</span>
              <input
                ref={inputRef}
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="Search services, work, insights…"
                className="flex-1 bg-transparent font-display text-lg uppercase tracking-tight text-ink outline-none placeholder:text-ink-mid"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase text-ink-mid hover:text-signal"
              >
                Esc
              </button>
            </div>

            <div className="max-h-[50vh] overflow-y-auto p-2">
              {loading && <p className="px-3 py-4 font-mono text-xs text-ink-mid">Searching…</p>}
              {!loading && term && results.length === 0 && (
                <p className="px-3 py-4 font-mono text-xs text-ink-mid">No results for "{term}".</p>
              )}
              {results.map((r) => (
                <Link
                  key={`${r._type}-${r.slug}`}
                  href={`/${TYPE_PATH[r._type] ?? ""}/${r.slug}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 transition-colors hover:bg-paper-dim"
                >
                  <p className="eyebrow mb-1">{r._type === "caseStudy" ? "Case Study" : r._type}</p>
                  <p className="font-display text-base uppercase tracking-tight text-ink">{r.title}</p>
                  {r.excerpt && <p className="mt-1 text-sm text-ink-mid line-clamp-1">{r.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
