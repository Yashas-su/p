import Link from "next/link";
import SearchTrigger from "@/components/SearchTrigger";
import MobileNav from "@/components/MobileNav";

const NAV = [
  { label: "Experiential", href: "/experiential-marketing" },
  { label: "Digital Marketing", href: "/digital-marketing" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4 md:px-10">
        <Link href="/" className="font-display text-xl uppercase tracking-tightest text-ink">
          Planning<span className="text-signal">L</span>abs
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="eyebrow text-ink transition-colors hover:text-signal"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <SearchTrigger />
          <Link
            href="/contact"
            className="hidden rounded-full bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal sm:inline-block"
          >
            Start a brief
          </Link>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
