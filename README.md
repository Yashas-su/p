# Planning Labs — Website

Next.js 14 (App Router) + Sanity CMS, built for deployment on Cloudflare Pages.

## What's here

- `app/(site)/` — the public website (all marketing pages)
- `app/(studio)/studio/` — the embedded Sanity Studio, live at `/studio` once deployed
- `sanity/` — Sanity client, GROQ queries, image URL builder, environment config
- `sanity/schemaTypes/` — content models: `vertical`, `service`, `caseStudy`, `post`, `career`, `siteSettings`
- `components/` — shared UI (Header, Footer, PortfolioGrid, ContactForm, etc.)
- `lib/` — typed fetch helper + shared TypeScript types

Verified: `npx tsc --noEmit` and `npx next build` both run clean end-to-end once
real Sanity credentials are set (see below) — every route in the brief compiles
and statically generates, including the two vertical hubs, service template,
case-study template, portfolio filters, insights/blog, careers accordion, and
the enquiry form with file upload.

## 1. Set up Sanity (the CMS)

1. `npx sanity init` from this folder — creates a free Sanity project and dataset.
   (Or create one manually at sanity.io/manage.)
2. Copy `.env.example` to `.env.local` and fill in the project ID it gives you:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```
3. `npm install`
4. `npm run dev` — site runs at `localhost:3000`, Studio at `localhost:3000/studio`.
5. Log into `/studio` and add at least two `Vertical` documents with slugs
   `experiential-marketing` and `digital-marketing` — the homepage and nav
   depend on those two slugs existing. Add a `Site Settings` document too
   (singleton — only create one).

## 2. Content model, in plain terms

- **Vertical** — the two hub pages (Experiential Marketing / Digital Marketing).
  Holds the hero stat, intro copy, and a list of Services.
- **Service** — an individual service page, belongs to one Vertical.
- **Case Study** — a portfolio entry. Tagged with a Vertical and (optionally)
  a Service and an industry string, which is what the `/work` page filters on.
- **Post** — a blog/insights entry.
- **Career** — a job listing; only ones with "Currently open" checked show on `/careers`.
- **Site Settings** — singleton for the client logo marquee, brand stat, contact details.

Editors never touch code — everything above is editable from `/studio`.

## 3. Deploy to Cloudflare Pages

1. Push this repo to GitHub, under **Planning Labs' own GitHub org/account**
   (not the developer's) so ownership transfers cleanly.
2. In Cloudflare Pages, create a project from that repo, framework preset **Next.js**.
3. Cloudflare's Next.js support (`@cloudflare/next-on-pages`) handles the adapter —
   if the build preset doesn't pick it up automatically, add it:
   ```
   npm install --save-dev @cloudflare/next-on-pages
   ```
   and set the build command to `npx @cloudflare/next-on-pages`.
4. Add the same three env vars from `.env.local` in the Cloudflare project's
   **Settings → Environment variables** (Production and Preview).
5. Deploy. First build will be slow (font + image optimization); subsequent
   builds are fast.

**Known Cloudflare/Next.js edge cases to watch for during this step:**
   - Image optimization: Next's built-in `next/image` optimizer isn't supported
     as-is on Cloudflare's edge runtime. If images don't resize correctly after
     deploy, switch to Sanity's own image CDN sizing (already used throughout
     this app via `urlForImage(...).width(...)`) rather than Next's optimizer —
     this app is already built that way, so it should work out of the box, but
     verify on first deploy.
   - ISR (`revalidate: 60` used in `lib/sanity-fetch.ts`) behaves slightly
     differently on Cloudflare than on Vercel. If content edits in Sanity don't
     appear within ~60s after deploy, check Cloudflare's cache/revalidation docs
     for the adapter version in use at deploy time.

## 4. Hooking up the enquiry form

`app/(site)/contact/[...]` posts to `app/(site)/api/enquiry/route.ts`, which
currently logs the submission. That route has a clearly marked
`TODO(integration)` — plug in whichever email/CRM Planning Labs wants
(Resend, SendGrid, HubSpot, etc.) once that's decided.

## 5. Ownership handover checklist

- [ ] GitHub repo transferred to Planning Labs' org
- [ ] Cloudflare Pages project under Planning Labs' Cloudflare account
- [ ] Sanity project transferred to Planning Labs' Sanity organization
- [ ] Domain DNS pointed at Cloudflare, under Planning Labs' control
- [ ] Enquiry form wired to their chosen email/CRM
