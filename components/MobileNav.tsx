"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { label: "Experiential", href: "/experiential-marketing" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span
          className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`}
        />
        <span className={`block h-0.5 w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
        <span
          className={`block h-0.5 w-6 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`}
        />
      </button>

      {open && (
        <div id="mobile-nav" className="fixed inset-x-0 top-[73px] z-40 h-[calc(100vh-73px)] bg-paper">
          <nav className="flex flex-col gap-1 px-6 py-8">
            {NAV.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-ink/10 py-4 font-display text-3xl uppercase tracking-tightest text-ink"
              >
                <span className="font-mono text-xs text-signal">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
