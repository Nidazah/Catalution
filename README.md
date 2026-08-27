# Admin Dashboard & Sidebar Polish — README

3 files changed, drop each one into the matching path in your repo
(overwrite the existing file):

- `AdminSidebar.tsx`  → `src/components/admin/AdminSidebar.tsx`
- `layout.tsx`        → `src/app/admin/layout.tsx`
- `page.tsx`          → `src/app/admin/page.tsx`   (the Dashboard)

No schema, API, or auth changes — this is UI-only. Logout still calls
the same `/api/auth/logout` endpoint the same way.

## 1. Logout position — fixed

The account dropdown (avatar → "A" menu) is now:
- Anchored with `bottom-[calc(100%+8px)]` instead of a fixed `bottom-12`,
  so it always sits flush above its trigger no matter the button's
  actual height — nothing floats or gets clipped.
- Fixed at a consistent 224px width when the sidebar is collapsed
  (icon-only mode), and stretches edge-to-edge of the sidebar when
  expanded, instead of guessing a fixed width in both states.
- The avatar row, name/role text, and the "Log out" button icon+label
  are all centered and vertically aligned with `items-center`, with a
  divider between the profile row and the logout action.
- The menu now closes automatically on route change or when the
  sidebar's expanded/collapsed state changes, so it can't ever be
  left open and misaligned after a layout change.

## 2. "Website CMS" added to the sidebar

Added as the second item, right under **Dashboard**, since it's the
main content-management hub. It links to your existing
`/admin/content` page (the Content Sections editor with Media
Library) — no new page or duplicate route was created. Icon:
`LayoutTemplate` from lucide-react, matching the existing icon set.
It gets the same active/hover/focus states as every other nav item.

## 3. Sidebar — responsive fix

Previously the sidebar had no mobile behavior: it was always
`fixed`/visible at `w-20` or `w-64`, overlapping page content on
small screens with no way to fully hide it.

Now:
- **Desktop (`md:` and up):** unchanged behavior — click the logo to
  collapse/expand between icon-only (`w-20`) and full (`w-72`) width.
- **Mobile/tablet (below `md`):** the sidebar is a full off-canvas
  drawer (`-translate-x-full` when closed), opened via a new
  hamburger button in a slim top bar (`layout.tsx`) that's only
  rendered below `md`. Opening it shows the existing dark overlay
  and a full-width drawer with an explicit close (✕) button.
- Fixed sidebar width bumped from `w-64` → `w-72` to give the new
  account row (name + role + chevron) room to breathe; `layout.tsx`'s
  main content margin (`md:ml-72`/`md:ml-20`) was updated to match.
- Tooltips, active-state highlight (now a left accent bar instead of
  a flat tint, for clearer hierarchy), and spacing were tightened up
  throughout the nav list and logo row.

## 4. Dashboard polish

`page.tsx` keeps the exact same Prisma queries and stat logic —
only the markup changed:
- Type scale bumped up across the board (the previous version used
  9.5–13px text everywhere, which read as cramped/unfinished at
  normal viewing distance). Page now has a proper `<h1>`, stat values
  are `text-2xl`, section labels are readable at `text-xs`/`text-sm`.
- Added a plain page heading above the hero banner ("Dashboard" +
  one-line subtext), which the page was missing entirely.
- Cards got consistent `shadow-sm`, padding (`p-5`), and icon-badge
  sizing; the publish ring got a bit bigger and less cramped.
- Hero banner gets a subtle decorative blur accent and slightly more
  breathing room; buttons enlarged to a normal touch-friendly size.

## Not changed / out of scope

- `AdminChrome.tsx` and the `.admin-card` / `.admin-table` / etc.
  classes in `admin.css` are dead code — nothing in the app actually
  imports or uses them (verified: `AdminChrome` isn't imported
  anywhere, and none of the `.admin-*` component classes appear
  outside `admin.css` itself). Left untouched since removing them
  wasn't part of this task, but worth cleaning up later.
- Individual list/edit pages (Services, Blog, Team, etc.) already
  use plain Tailwind consistent with the new dashboard styling and
  weren't touched.
