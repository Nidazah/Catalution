# Go Top Button + Global Button hover controls

## What changed

No database schema or API route changes were needed — the existing
`THEME` / `LAYOUT` settings API (`src/app/api/site-settings/route.ts`)
already stores arbitrary JSON and deep-merges it against the defaults
in `src/lib/site-defaults.ts`. So adding new fields there is enough
for them to be readable, writable, resettable, and persisted, with
zero backend code changes.

5 files changed:

1. **`src/lib/site-defaults.ts`** — single source of truth for every
   default value. Added:
   - `defaultTheme`: `buttonPrimaryBorderColor`, `buttonPrimaryHoverBg`,
     `buttonPrimaryHoverText`, `buttonPrimaryHoverBorderColor`, and the
     matching `buttonSecondary*` fields, plus a shared
     `buttonHoverEffect` (`"none" | "lift" | "scale" | "glow"`).
   - `defaultLayout.footer.goTop`: `borderColor`, `hoverBackgroundColor`,
     `hoverTextColor`, `hoverIconColor`, `hoverBorderColor`,
     `hoverEffect`.
   - All new defaults were chosen to exactly reproduce the site's
     current look, so nothing changes visually until an admin edits
     a value.

2. **`src/app/RootShell.tsx`** — exposes the new Global Button fields
   as CSS custom properties on `:root` (same pattern as the existing
   button color vars), including two computed vars,
   `--cms-btn-hover-transform` / `--cms-btn-hover-shadow`, derived
   from `buttonHoverEffect`.

3. **`src/app/globals.css`**
   - Removed the old hardcoded `.btn-primary:hover` / `.btn-secondary:hover`
     rules (fixed purple-700 / orange-700 colors that the admin could
     never actually change).
   - The CMS-runtime `.btn-primary` / `.btn-secondary` rules now also
     define real `:hover` states driven entirely by the new CSS vars,
     with sensible fallback chains so an unset field just falls back
     to the base color.
   - Added a new `.go-top-btn` block (base + `:hover` + `--lift` /
     `--scale` / `--glow` effect modifiers) consuming `--gotop-*`
     custom properties.

4. **`src/components/Footer.tsx`** — the Go Top pill's hover state was
   previously broken: an inline `style` color permanently overrode a
   Tailwind `group-hover:text-white` class, so the "hover" text color
   never actually applied. Replaced with `--gotop-*` CSS custom
   properties set inline (same approach the rest of the CMS layer
   uses), and a real CSS `:hover` rule now does the work. `goTop` type
   in this file extended to match the new fields.

5. **`src/app/admin/brand-settings/page.tsx`**
   - Added hover-color pickers + a border-color field to the **Go Top
     Button** card, and a "Hover animation" dropdown.
   - Added hover-color pickers + border-color fields to **Global
     Layout & Buttons** for both Primary and Secondary, plus one
     shared "Hover animation" dropdown (applies sitewide, matching how
     `buttonHoverEffect` is a single shared field).
   - `defaultGoTop` is now derived from `site-defaults.ts` instead of
     being hand-copied in this file, closing off the kind of
     copy-drift bug fixed here previously (Aug 25 session).
   - The live "Button Preview" at the bottom of the Global Buttons
     card now reflects the actual stored hover colors/effect instead
     of an approximated 12%-darken — what you see in the preview is
     what ships live.

## Reset behavior

- "Reset Theme" deletes the `THEME` row and reloads
  `defaultTheme` (now including every new button field) — Global
  Button hover settings reset correctly.
- The Go Top card's save/reset flow deletes only
  `LAYOUT.footer.goTop` (not the whole footer or navbar) and reloads
  `defaultGoTop` — Go Top hover settings reset correctly without
  touching any other footer/navbar customization.

## Verified

- Brace/paren/bracket balance checked on every changed file.
- Ran a real `tsc --noEmit` (TypeScript 5.6.3, with `react`/`next`/
  `@types/react` installed and `lucide-react` stubbed) scoped to the
  4 changed `.tsx`/`.ts` files plus their direct imports — **0 errors**.
- Traced the full flow: Admin form → `setTheme`/`setLayout` → PUT
  `/api/site-settings` → Prisma JSON column → GET merges with
  `site-defaults.ts` → `RootShell.tsx` sets CSS vars on `:root` /
  `Footer.tsx` sets CSS vars inline → `globals.css` renders the
  hover state. No hardcoded frontend values.

## Not touched / not needed

- No Prisma schema or migration — the settings API's JSON column
  already covers this.
- `.btn-outline` (a third button variant used in a few places) was
  left as-is — it isn't part of the existing "Global Buttons" theme
  model (only Primary/Secondary have admin-controlled colors today),
  so it was out of scope here.

## What you still need to do

- Pull these 5 files into your working tree (paths match exactly,
  safe to overwrite).
- Run `npm run build` (or `next dev`) locally and click through:
  - `/admin/brand-settings` → Go Top Button card → change hover
    background/text/icon/border + animation → Save → check the
    live site's Go Top pill hovers as expected.
  - Same page → Global Layout & Buttons → change Primary/Secondary
    hover colors + animation → Save Theme → check `.btn-primary`/
    `.btn-secondary` buttons across the site.
  - Click "Reset Theme" and confirm both Global Buttons and Go Top
    hover settings return to their original look.
- No `prisma db push` / migration needed for this patch.
