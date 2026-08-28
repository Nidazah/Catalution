# Catalution — Page Heroes, History Timeline, About Logos & Homepage Reordering

This closes the gaps found in the full-site CMS audit: inner-page hero
banners, the History timeline, and the About page's client-logo strip
were still hardcoded with no CMS connection, and homepage section
*order* (unlike visibility, which already worked) wasn't wired to the
`sortOrder` field already sitting in the `/admin/content` editor.

## What's in this zip (new/changed files only)

```
prisma/content-section-key-additions.prisma   NEW — paste-in enum snippet
prisma/seed-page-content-v2.ts                NEW — optional seed script

src/lib/use-page-hero.ts                      NEW — client hook for page-hero banners
src/lib/content-section-defaults.ts           CHANGED — added 12 new key defaults

src/app/page.tsx                              CHANGED — homepage sections now render
                                               in the order set by each section's
                                               "Display order" field in /admin/content
src/app/admin/content/page.tsx                CHANGED — added the 12 new keys to the
                                               editor, plus History's Image 2/Alignment
                                               fields and a hint on the order field

src/app/about/page.tsx                        CHANGED — hero + client logos wired to CMS
src/app/services/page.tsx                     CHANGED — hero wired to CMS
src/app/portfolios/page.tsx                   CHANGED — hero wired to CMS
src/app/blog/page.tsx                         CHANGED — hero wired to CMS
src/app/team/page.tsx                         CHANGED — hero wired to CMS
src/app/careers/page.tsx                      CHANGED — hero wired to CMS
src/app/contact/page.tsx                      CHANGED — hero wired to CMS
src/app/pricing/page.tsx                      CHANGED — hero wired to CMS
src/app/faq/page.tsx                          CHANGED — hero wired to CMS
src/app/history/page.tsx                      CHANGED — hero + timeline wired to CMS
```

## 1. What changed and why

### Inner-page hero banners (About, Services, Portfolios, Blog, Team,
### Careers, Contact, Pricing, FAQ, History)
Every one of these had `<PageHero title="..." />` with the title
hardcoded as a JSX literal — no fetch, no admin control. Each page now
calls `usePageHero("PAGE_HERO_X", { title: "..." })`, a small client
hook (`src/lib/use-page-hero.ts`) that fetches
`/api/content?sectionKey=PAGE_HERO_X` and swaps in the live title,
subtitle (mapped from `description`), and background image if a
published row exists — otherwise it silently keeps the hardcoded
fallback you pass in, so a page can never render blank or break.

No changes were needed to `/api/content` or the `ContentSection`
model — both were already generic over `ContentSectionKey`. The only
schema change is 12 new enum values (see step 2 below).

### History timeline (`/history`)
This page had zero CMS connection — `timelineData` was a fully
hardcoded array with no fetch call at all. It's now backed by a new
`HISTORY` ContentSection: each milestone's year lives in `meta`,
title/description are the milestone copy, the first photo is `image`,
and the second photo + left/right alignment live in `item.settings`
(`image2`, `align`) since the generic item schema already supports a
free-form `settings` object per item — no API changes needed there
either. The admin editor's repeatable-items panel gained two extra
fields (Image 2, Alignment) specifically when editing the `HISTORY`
section.

### About page client-logo strip
Same pattern — a new `ABOUT_LOGOS` section with one repeatable item
per logo (`title` = client name / alt text, `image` = logo file).

### Homepage section reordering
`/admin/content` already had a "Display order" number field per
section, and `/admin/layout-manager` already had a working show/hide
toggle (confirmed via `RootShell.tsx`'s CSS injection) — but
`src/app/page.tsx` rendered the 10 homepage sections in a fixed JSX
order regardless of that field. `page.tsx` now builds an array of
`{ key, node }` and sorts it by each section's live `sortOrder`
(falling back to the original visual order for any section that
hasn't been customized yet), so changing "Display order" in
`/admin/content` now actually reorders the live homepage. No visual
change out of the box — the default order matches the original JSX
order exactly.

## 2. Steps to apply

1. **Paste the enum snippet.** Open `prisma/content-section-key-additions.prisma`
   in this zip and add its 12 new values into your **existing**
   `enum ContentSectionKey { ... }` block in `schema.prisma` — do not
   create a second enum.
2. Copy the other files in this zip into the matching paths in your
   repo, overwriting the originals.
3. Run the two commands from your project root (using this project's
   established `db push` workaround instead of `migrate dev`, per
   your earlier shadow-DB issue):
   ```
   npx prisma db push
   npx prisma generate
   ```
4. **Optional but recommended** — seed the new sections with their
   current hardcoded copy so they show real content in `/admin/content`
   immediately instead of only via in-browser fallback:
   ```
   npx tsx prisma/seed-page-content-v2.ts
   ```
   Skipping this step is safe — every new page will simply keep
   showing its original hardcoded content until you edit it in
   `/admin/content` yourself.
5. `npm run build` and click through: each inner page's hero,
   `/history`'s timeline, `/about`'s logo strip, and try reordering
   two homepage sections via the "Display order" field to confirm the
   live homepage reflects it.

## 3. Still outstanding (not in this patch)

- **About page** stats/skills/feature-card blocks further down the
  page are still hardcoded — same `ContentSection` pattern can extend
  to them next.
- **Contact page** section headings (separate from the editable
  `ContactInfo` fields) are still hardcoded.
- The History intro heading block just below the page hero ("Discover
  how we have evolved...") is still hardcoded — only the hero banner
  and the timeline itself were wired this round.
- No new Prisma schema/migration file could be generated or run from
  this sandbox (no live network to Neon or `binaries.prisma.sh`), and
  no `package.json`/`schema.prisma` were present in this upload, so
  no build or typecheck could be run against your real project
  dependencies — only manual brace/paren-balance checks were done on
  every changed file.
