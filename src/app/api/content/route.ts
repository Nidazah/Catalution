import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";
import { Prisma, ContentSectionKey } from "@prisma/client";
import { contentSectionDefaults } from "@/lib/content-section-defaults";

const sectionKeys = Object.values(ContentSectionKey);

const itemSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(1000).optional().default(""),
  image: z.string().trim().max(1000).optional().default(""),
  meta: z.string().trim().max(300).optional().default(""),
  link: z.string().trim().max(500).optional().default(""),
  icon: z.string().trim().max(120).optional().default(""),
  badge: z.string().trim().max(120).optional().default(""),
  tags: z.array(z.string().trim().max(80)).max(20).optional().default([]),
  settings: z.record(z.string(), z.any()).optional().default({}),
});

const sectionSchema = z.object({
  sectionKey: z.enum(sectionKeys),
  label: z.string().trim().min(2).max(80),
  eyebrow: z.string().trim().max(120).optional().default(""),
  title: z.string().trim().min(2).max(240),
  description: z.string().trim().max(2000).optional().default(""),
  image: z.string().trim().max(1000).optional().default(""),
  primaryButtonLabel: z.string().trim().max(80).optional().default(""),
  primaryButtonUrl: z.string().trim().max(500).optional().default(""),
  secondaryButtonLabel: z.string().trim().max(80).optional().default(""),
  secondaryButtonUrl: z.string().trim().max(500).optional().default(""),
  items: z.array(itemSchema).max(100).default([]),
  settings: z.record(z.string(), z.any()).optional().default({}),
  sortOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

async function requireAdmin() {
  const session = await getSession();
  const role = session?.role;
  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

/**
 * Provision any missing CMS sections from the single source of truth in
 * lib/content-section-defaults.ts. This makes the default content available
 * in the admin editor (and on the public pages) without requiring a manual
 * Configure step for every section after a fresh database/seed.
 * Existing rows are never overwritten.
 */
async function ensureDefaultContentSections() {
  const existing = await prisma.contentSection.findMany({
    select: { sectionKey: true },
  });

  const existingKeys = new Set(existing.map((row) => row.sectionKey));
  const missing = Object.entries(contentSectionDefaults).filter(
    ([key]) =>
      sectionKeys.includes(key as ContentSectionKey) && !existingKeys.has(key as ContentSectionKey),
  );

  if (missing.length === 0) return;

  await prisma.$transaction(
    missing.map(([key, value], index) => {
      const defaults = value as any;

      return prisma.contentSection.create({
        data: {
          sectionKey: key as ContentSectionKey,
          label: defaults.label ?? key,
          eyebrow: defaults.eyebrow ?? "",
          title: defaults.title ?? key,
          description: defaults.description ?? "",
          image: defaults.image ?? "",
          primaryButtonLabel: defaults.primaryButtonLabel ?? "",
          primaryButtonUrl: defaults.primaryButtonUrl ?? "",
          secondaryButtonLabel: defaults.secondaryButtonLabel ?? "",
          secondaryButtonUrl: defaults.secondaryButtonUrl ?? "",
          items: defaults.items ?? [],
          settings: defaults.settings ?? {},
          sortOrder: sectionOptionsOrder(key, index),
          published: true,
        },
      });
    }),
  );
}

function sectionOptionsOrder(key: string, fallback: number) {
  const order = [
    "HERO",
    "SERVICES",
    "ABOUT",
    "MARQUE",
    "PROCESS",
    "TEAM",
    "CASE_STUDIES",
    "PRICING",
    "TESTIMONIALS",
    "CTA",
    "PAGE_HERO_ABOUT",
    "PAGE_HERO_HISTORY",
    "ABOUT_INTRO",
    "ABOUT_FEATURES",
    "ABOUT_EVOLUTION",
    "ABOUT_SKILLS",
    "ABOUT_LOGOS",
    "HISTORY_INTRO",
    "HISTORY",
  ];

  const index = order.indexOf(key);
  return index >= 0 ? index : fallback;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("sectionKey");
  const session = await getSession();
  const isAdmin = ["ADMIN", "STAFF"].includes(
    session?.role ?? "",
  );

  const where: Prisma.ContentSectionWhereInput = {
    ...(key && sectionKeys.includes(key as ContentSectionKey)
      ? { sectionKey: key as ContentSectionKey }
      : {}),
    ...(isAdmin ? {} : { published: true }),
  };

  try {
    // When an admin opens Content Sections, make sure every default section
    // exists in the database. This removes the "Not configured" state for
    // /about and /history while preserving all existing admin edits.
    if (isAdmin) {
      await withDbRetry(() => ensureDefaultContentSections());
    }

    const sections = await withDbRetry(() =>
      prisma.contentSection.findMany({
        where,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    );
    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json(
      { error: "Could not load content sections" },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const data = sectionSchema.parse(body);

    const section = await withDbRetry(() =>
      prisma.contentSection.create({
        data,
      }),
    );

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    console.error("POST /api/content error:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid section data",
          details: error.flatten(),
        },
        { status: 400 },
      );
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      (error as { code?: string }).code === "P2002"
    ) {
      return NextResponse.json(
        {
          error:
            "This section already exists. Refresh and edit it instead of creating a new one.",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Could not create section",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json()

    const id = z.string().min(1).parse(body.id)
    const data = sectionSchema.parse(body)

    const section = await withDbRetry(() =>
      prisma.contentSection.update({
        where: { id },
        data,
      })
    )

    return NextResponse.json(section)
  } catch (error) {
    console.error("PATCH /api/content error:", error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid section data",
          details: error.flatten(),
        },
        { status: 400 }
      )
    }

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error
    ) {
      const prismaError = error as {
        code?: string
        message?: string
      }

      if (prismaError.code === "P2025") {
        return NextResponse.json(
          {
            error: "Section not found. Refresh the page and try again.",
          },
          { status: 404 }
        )
      }

      if (prismaError.code === "P2002") {
        return NextResponse.json(
          {
            error:
              "Another section already uses this section key.",
          },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      {
        error: "Could not update section",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth instanceof NextResponse) return auth;

  try {
    const { id } = z
      .object({ id: z.string().min(1) })
      .parse(await request.json());
    await withDbRetry(() => prisma.contentSection.delete({ where: { id } }));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Could not delete section" },
      { status: 500 },
    );
  }
}
