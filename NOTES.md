# /about + /history CMS wiring

Drop these files into the matching paths in your project (they replace the
existing versions — I diffed against the current `github.com/Nidazah/Catalution`
main branch, not your local zip-merged copy, so review before overwriting if
you've since made other local edits).

Files:
- prisma/schema.prisma              (ContentSectionKey enum extended)
- src/lib/content-section-defaults.ts
- src/lib/use-page-hero.ts          (new file)
- src/app/about/page.tsx
- src/app/history/page.tsx
- src/app/admin/content/page.tsx

## New ContentSectionKey values
PAGE_HERO_ABOUT, PAGE_HERO_HISTORY, ABOUT_INTRO, ABOUT_FEATURES,
ABOUT_EVOLUTION, ABOUT_SKILLS, ABOUT_LOGOS, HISTORY_INTRO, HISTORY

## Steps to apply
1. Copy the files over.
2. `npx prisma db push` (per your project's established workaround for the
   Neon shadow-DB migrate issue — do NOT use `prisma migrate dev`).
3. `npx prisma generate`
4. `npm run build` to confirm no TS errors against your real generated client
   (I couldn't run this myself — the sandbox's network allowlist blocks
   `binaries.prisma.sh`, so `prisma generate` fails here and I could only
   typecheck everything else, which came back clean).
5. In /admin/content you'll see 9 new cards: "About page hero", "History
   page hero", "About intro", "About feature cards", "About evolution &
   stats", "About skill & experience", "About client logos", "History
   intro", "History timeline". Each has a "Reset to Default" button that
   seeds it from the current hardcoded copy, so configure each once and
   Publish it.
6. Both pages fall back to the original hardcoded content if a section
   hasn't been configured yet, so nothing breaks before you touch the
   admin panel.

## Design notes / trade-offs
- About's "Our evolution" video block reuses the section's existing "Main
  image" field as the video background and "primaryButtonUrl" as the video
  link (via a small bespoke field I added) — no new schema fields needed.
- History timeline items use `item.meta` for the year, `item.settings.align`
  for left/right placement, and `item.settings.image2` for the second image
  (item.image is the first). The admin editor has a dedicated Year /
  Side-of-timeline / Image 1 / Image 2 layout for this section only.
- About skill bars use `item.meta` as the percentage string (e.g. "90%");
  I parse it with `parseInt` to size the bar.
- I dropped the decorative "01." step-numbering strings on the history
  cards in favor of computing "01.", "02." etc. from array index, since the
  old `step` field wasn't part of the ContentSection item shape.

## Not done (still outstanding from your original audit)
- Contact page's section headings.
- The WORK/BLOG/FAQ/CAREERS admin/content gap.
- The CmsPage/CmsPageVersion dead-code question.
- TS error investigation from your local zip merge (I never had access to
  that exact local state — see conversation).
