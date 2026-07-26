import Link from "next/link";

const COLUMNS = [
  {
    title: "Verticals",
    links: [
      { label: "Experiential Marketing", href: "/experiential-marketing" },
      { label: "Digital Marketing", href: "/digital-marketing" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Our Work", href: "/work" },
      { label: "Insights", href: "/insights" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { label: "Start a brief", href: "/contact" },
      { label: "hello@planninglabs.in", href: "mailto:hello@planninglabs.in" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-ink text-paper">
      <div className="mx-auto max-w-content px-6 py-16 md:px-10">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl uppercase tracking-tightest">
              Planning<span className="text-signal">L</span>abs
            </p>
            <p className="mt-4 max-w-xs text-sm text-ink-mid">
              Experiential activations and digital campaigns for brands who want to be felt, not just seen.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <p className="eyebrow mb-4 text-pulse">{col.title}</p>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-paper/85 transition-colors hover:text-signal">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-paper/10 pt-6 font-mono text-xs uppercase tracking-[0.15em] text-ink-mid sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Planning Labs. All rights reserved.</p>
          <p>Mumbai, India</p>
        </div>
      </div>
    </footer>
  );
}
