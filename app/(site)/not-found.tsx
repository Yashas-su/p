import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <p className="eyebrow mb-4 text-signal">404</p>
      <h1 className="font-display text-5xl uppercase tracking-tightest text-ink md:text-7xl">Page not found</h1>
      <p className="mt-4 max-w-sm text-ink-mid">
        That page moved, or never existed. Try the homepage, or search for what you're after.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-ink px-8 py-4 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal"
      >
        Back to homepage
      </Link>
    </section>
  );
}
