# Services panel + themed icon picker

## What changed

### 1. New shared icon set — `src/lib/service-icons.tsx`
Single source of truth for service icons (18 curated icons: waves, boxes,
users, sparkles, circledot, repeat, zap, target, rocket, shield, trendingup,
handshake, lightbulb, award, briefcase, barchart, compass, layers). Exposes
`getServiceIcon(name)` with a safe fallback. Keys are lowercase, no-dash
slugs — same convention already used in the database (`icon: "waves"`
default etc.), so existing data keeps working.

### 2. New themed icon picker — `src/components/admin/IconPicker.tsx`
Replaces the old plain text input ("e.g. waves, boxes, users") and the old
bare `<select>` with a visual grid picker: each icon renders with its actual
glyph, and the trigger button + selected swatch use the site's purple→orange
brand gradient. Reused everywhere an icon is chosen:
- `/admin/content` → Services section → each service tile's icon
- `/admin/services` → a service's main icon
- `/admin/services` → each feature's icon

### 3. Services panel now matches what the homepage actually shows —
`src/app/admin/content/page.tsx`
The Services section's repeatable-items editor previously showed the same
generic fields as every other section (Image upload, Link, Badge, Tags) even
though the homepage Services tiles never use them. For `sectionKey ===
"SERVICES"` specifically, the editor now shows only what's rendered on the
homepage tile: Title, Short label (used as a description fallback), the new
Icon Picker, and Description — with a caption explaining what the icon/label
control. Every other section (Marquee, Process, Case Study, etc.) is
unchanged. Also gave the Services item list its own intro copy ("Service
tiles — the first 4 published items become the service tiles on the
homepage, each with its own icon").

### 4. Homepage Services section now renders the icon —
`src/components/Services.tsx`
The `icon` field existed in the data model already but was silently dropped
before reaching the UI. Now:
- Both data sources (CMS items and the `/api/services` fallback) carry
  `icon` through to the rendered card.
- Each card shows the icon in a circular chip (white/10 by default,
  transitioning to the purple→orange brand gradient on hover — matching the
  card's existing hover-glow effect).
- `fallbackServices` (used before any data loads) now has icons too (zap,
  lightbulb, target, repeat).

### 5. Consistency cleanup
- `src/components/ServicesSidebar.tsx` and `src/app/admin/services/page.tsx`
  now use the same shared `getServiceIcon` / `IconPicker` instead of their
  own separate 6-icon maps, so all 18 icons work everywhere consistently.
  Removed the now-dead local `icons` array and `SelectField` component from
  `admin/services/page.tsx`.

## Known follow-up (not changed, flagging so it's not a surprise)
`src/app/services/page.tsx` (the individual service detail page) renders
icons with its own hand-rolled inline SVGs for only 5 of the icon names
(boxes, users, sparkles, circledot, repeat) — it doesn't use the shared
icon set. If a service is given one of the newer icons (zap, target,
rocket, etc.) via the new picker, this specific page will render nothing
for that icon until it's wired to `getServiceIcon` too. Everywhere else
(homepage tiles, sidebar, admin panels) already reflects the full icon set.

## To run locally
`npx prisma generate` / `npm run build` as usual — no schema or API changes
were needed, this is UI-only.
