import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity-fetch";
import { openCareersQuery } from "@/sanity/queries";
import type { Career } from "@/lib/types";
import RichText from "@/components/RichText";

export const metadata: Metadata = {
  title: "Careers",
  description: "Open roles at Planning Labs, across experiential and digital marketing.",
};

export default async function CareersPage() {
  const roles = await sanityFetch<Career[]>(openCareersQuery);

  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <p className="eyebrow mb-4">Careers</p>
      <h1 className="mb-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-7xl">
        Work with us
      </h1>
      <p className="mb-16 max-w-xl text-lg text-ink-mid">
        We hire across both disciplines — people who can run a live activation and people who can optimise a
        media budget, and the occasional person who wants to do both.
      </p>

      {roles.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/15 px-6 py-10 font-mono text-sm text-ink-mid">
          No open roles right now — check back soon, or send a speculative note to hello@planninglabs.in.
        </p>
      ) : (
        <div className="divide-y divide-ink/10 border-t border-ink/10">
          {roles.map((role) => (
            <details key={role._id} className="group py-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                <div>
                  <h2 className="font-display text-2xl uppercase tracking-tightest text-ink group-hover:text-signal md:text-3xl">
                    {role.title}
                  </h2>
                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.1em] text-ink-mid">
                    {role.department} {role.location && `· ${role.location}`} {role.employmentType && `· ${role.employmentType}`}
                  </p>
                </div>
                <span className="shrink-0 font-mono text-xs uppercase text-signal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="mt-4 max-w-2xl">
                <RichText value={role.description} />
                <a
                  href={`mailto:hello@planninglabs.in?subject=Application: ${role.title}`}
                  className="mt-2 inline-block rounded-full bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-paper transition-colors hover:bg-signal"
                >
                  Apply for this role
                </a>
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
