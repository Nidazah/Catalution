import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

const sectionKeys = [
  "HERO",
  "ABOUT",
  "PROCESS",
  "WORK",
  "TEAM",
  "CASE_STUDIES",
  "PRICING",
  "TESTIMONIALS",
  "CTA",
  "BLOG",
  "FAQ",
  "CAREERS",
] as const;

const itemSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(1000).optional().default(""),
  image: z.string().trim().max(1000).optional().default(""),
  meta: z.string().trim().max(300).optional().default(""),
  link: z.string().trim().max(500).optional().default(""),
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
  items: z.array(itemSchema).max(30).default([]),
  sortOrder: z.coerce.number().int().min(0).default(0),
  published: z.boolean().default(true),
});

async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const key = url.searchParams.get("sectionKey");
  const session = await auth();
  const isAdmin = ["ADMIN", "STAFF"].includes(
    (session?.user as { role?: string } | undefined)?.role ?? "",
  );

  const where = {
    ...(key && sectionKeys.includes(key as (typeof sectionKeys)[number])
      ? { sectionKey: key as (typeof sectionKeys)[number] }
      : {}),
    ...(isAdmin ? {} : { published: true }),
  };

  try {
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
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
          error instanceof Error ? error.message : "Could not create section",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    )
  }

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
        error:
          error instanceof Error
            ? error.message
            : "Could not update section",
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!(await requireAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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
