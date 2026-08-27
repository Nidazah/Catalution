# Website Builder implementation

This update adds a database-backed visual CMS/page-builder foundation.

## What it adds

- `CmsPage` for page-level draft/live data and SEO.
- `CmsPageVersion` for version history.
- `/admin/website-builder` admin editor.
- `/api/cms/pages` page CRUD.
- `/api/cms/pages/[slug]` draft/publish API.
- `/cms/[slug]` renderer for published custom pages.
- Home page can use a published `home` visual-builder page when it has sections; otherwise the existing Solvior/Catalution home remains the fallback.
- Individual elements support text, headings, images, buttons, icons, video, divider and spacer, plus editable inline style properties.

## Database

From the project root run:

```powershell
npx prisma db push
npx prisma generate
```

or apply the included SQL migration if your deployment workflow requires SQL migrations.

## Important

The existing page components are intentionally kept as the fallback so the current website design is not destroyed. To make an existing Solvior section completely builder-controlled, migrate that section's hardcoded JSX into the builder's `draftData` and use the builder renderer for that page/section.

Do not delete the existing content models. Services, portfolio, blog, team, careers, pricing, testimonials and FAQ can continue to be managed by their existing CRUD screens while the page builder controls where and how those datasets are displayed.
