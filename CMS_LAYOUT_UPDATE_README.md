# Catalution CMS + Layout update

This bundle contains the updated `app`, `components`, `lib`, and `prisma` source folders supplied for this task. Existing filenames and the existing visual classes/layout were retained.

## Added

### CMS
- Hero
- Services
- About
- Marquee
- Process
- Case Study
- CTA

The existing `/admin/content` editor now exposes these sections. Services and Marquee can also consume CMS items from `ContentSection`.

### Layout
- Navbar
- Footer
- Consultant Banner

Admin path: `/admin/layout-manager`.

### Theme
Admin path: `/admin/brand-settings`.

Editable global design tokens include:
- Primary/secondary/accent colors
- Background/section/heading/body/line colors
- Heading and body font family
- Heading/body font weight
- Base font size

The public shell applies saved theme values at runtime without changing the existing page structure.

## Database

A new Prisma model `SiteSettings` stores `THEME` and `LAYOUT` JSON settings.

A migration was added:
`prisma/migrations/20260820190000_add_cms_layout_theme/migration.sql`

The `ContentSectionKey` enum now also supports:
- `SERVICES`
- `MARQUE`

Run your normal Prisma workflow after replacing these source files:

```bash
npx prisma migrate deploy
npx prisma generate
```

If you use `prisma db push` instead of migrations, run:

```bash
npx prisma db push
npx prisma generate
```

No `.env` or secrets are included in this bundle.


## Enhanced visual editor (added in this update)

### Layout & Section Manager
`/admin/layout-manager` now has a dedicated panel for each homepage section:
- Hero
- Services
- About
- Marquee
- Process
- Team
- Case Studies
- Pricing
- Testimonials
- CTA
- Navbar
- Footer
- Consultant Banner

Each homepage section can independently control:
- Enable/disable visibility
- Background, heading, body, eyebrow and border colors
- Title size and weight
- Body size and line height
- Top/bottom spacing
- Content alignment
- Maximum content width
- Title/content X/Y offsets
- Image X/Y offsets and object position
- Corner radius

Navbar, Footer and Consultant Banner have their own color, spacing and sizing controls.

### Global Theme
`/admin/brand-settings` now also controls:
- Body line height
- Container width
- Global radius
- Section gap
- Button radius
- Button horizontal/vertical padding
- Primary/secondary button colors

### Persistence
The existing `SiteSettings` model stores the new `SECTION_STYLES` JSON key. No new Prisma model is required.

After copying the update into the project, run:

```bash
npx prisma generate
npx prisma db push
```

Then run the normal Next.js build/type-check commands used by your project.
