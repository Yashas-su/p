import type { Metadata } from "next";
import { sanityFetch } from "@/lib/sanity-fetch";
import { siteSettingsQuery } from "@/sanity/queries";
import type { SiteSettings } from "@/lib/types";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a brief with Planning Labs — experiential activations and digital marketing.",
};

export default async function ContactPage() {
  const settings = await sanityFetch<SiteSettings>(siteSettingsQuery);

  return (
    <section className="mx-auto max-w-content px-6 py-20 md:px-10 md:py-28">
      <div className="grid gap-16 md:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-display text-5xl uppercase leading-[0.95] tracking-tightest text-ink md:text-6xl">
            Start a brief
          </h1>
          <p className="mt-6 max-w-sm text-ink-mid">
            Tell us what you're planning — even a rough one-pager works. We'll route it to the right team and
            get back to you within one business day.
          </p>

          <div className="mt-12 space-y-4 font-mono text-sm text-ink-mid">
            {settings?.contactEmail && (
              <p>
                <span className="eyebrow mr-2 inline text-signal">Email</span>
                <a href={`mailto:${settings.contactEmail}`} className="hover:text-signal">
                  {settings.contactEmail}
                </a>
              </p>
            )}
            {settings?.contactPhone && (
              <p>
                <span className="eyebrow mr-2 inline text-signal">Phone</span>
                {settings.contactPhone}
              </p>
            )}
            {settings?.officeAddress && (
              <p>
                <span className="eyebrow mr-2 inline text-signal">Studio</span>
                {settings.officeAddress}
              </p>
            )}
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
