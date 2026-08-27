# Follow-up: services detail page now uses the full icon set

## What changed
`src/app/services/page.tsx`'s `ServiceIcon` component previously hand-rolled
its own inline SVGs for only 5 icon names (boxes, users, sparkles,
circledot, repeat), falling back to a generic circle-and-dot glyph for
everything else — including "waves" and all 12 of the newer icons added in
the last update (zap, target, rocket, shield, trendingup, handshake,
lightbulb, award, briefcase, barchart, compass, layers).

Replaced the inline SVGs with the shared `getServiceIcon()` helper from
`src/lib/service-icons.tsx` (the same one already used on the homepage
Services tiles, `ServicesSidebar.tsx`, and the admin Icon Picker). Now this
page renders all 18 icons correctly, and any future icon added to the
shared set automatically works here too — no more per-page icon lists to
keep in sync.

Visual sizing/coloring behavior is unchanged (80px circle, orange-100
background / white-20 on hover, accent-colored icon / white on hover) —
this was a like-for-like swap of the icon source, not a redesign.

Single file changed: `src/app/services/page.tsx`. No schema/API changes.
Scoped TypeScript check on the changed file + its `service-icons.tsx`
dependency is clean (only pre-existing, unrelated noise from other files
without node_modules installed).

## To run locally
`npx prisma generate` / `npm run build` as usual.
