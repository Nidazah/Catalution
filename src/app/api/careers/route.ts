// app/api/careers/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

// ============================================
// SCHEMAS
// ============================================

const careerSchema = z.object({
  title: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  department: z.string().trim().min(1).max(100),
  location: z.string().trim().min(1).max(150),
  type: z.string().trim().min(1).max(100),
  urgency: z.string().trim().max(50).optional().nullable(),
  icon: z.string().trim().min(1).max(40).default("swirl"),
  description: z.string().trim().min(10).max(3000),
  requirements: z.string().trim().min(10).max(3000),
  requirementsGrid: z
    .array(z.string().trim().min(1).max(300))
    .max(12)
    .optional()
    .nullable(),
  responsibilities: z.string().trim().min(10).max(3000),
  responsibilitiesList: z
    .array(z.string().trim().min(1).max(300))
    .max(12)
    .optional()
    .nullable(),
  category: z.string().trim().min(1).max(100),
  number: z.string().trim().min(1).max(40),
  company: z.string().trim().min(1).max(100).default("Catalution"),
  website: z.string().trim().max(200).optional().nullable(),
  salary: z.string().trim().min(1).max(80),
  vacancy: z.string().trim().min(1).max(40),
  applyOn: z.string().trim().min(1).max(40),
  tags: z.array(z.string().trim().min(1).max(40)).max(10).optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  published: z.boolean().default(true),
});

const idSchema = z.string().trim().min(1);

// ============================================
// AUTHENTICATION
// ============================================

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;
  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

// ============================================
// HELPERS
// ============================================

function isUniqueError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2002"
  );
}

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2025"
  );
}

// ============================================
// GET - List careers (public + admin)
// ============================================

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get("admin") === "true";

  if (isAdmin && !(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const careers = await withDbRetry(() =>
      prisma.career.findMany({
        where: isAdmin ? undefined : { active: true, published: true },
        select: {
          id: true,
          title: true,
          slug: true,
          department: true,
          location: true,
          type: true,
          urgency: true,
          icon: true,
          category: true,
          number: true,
          company: true,
          website: true,
          salary: true,
          vacancy: true,
          applyOn: true,
          tags: true,
          sortOrder: true,
          active: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      })
    );

    return NextResponse.json({ careers });
  } catch (error) {
    console.error("GET /api/careers", error);
    return NextResponse.json(
      { error: "Could not load careers" },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Create a new career
// ============================================

export async function POST(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = careerSchema.parse(body);

    const career = await withDbRetry(() => prisma.career.create({ data }));

    return NextResponse.json({ career }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid career data", details: error.flatten() },
        { status: 400 }
      );
    }

    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A career with this slug already exists." },
        { status: 409 }
      );
    }

    console.error("POST /api/careers", error);
    return NextResponse.json(
      { error: "Could not create career" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update a career
// ============================================

export async function PATCH(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    const id = idSchema.parse(body.id);

    const { id: _, ...updateData } = body;
    const data = careerSchema.parse(updateData);

    const career = await withDbRetry(() =>
      prisma.career.update({ where: { id }, data })
    );

    return NextResponse.json({ career });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid career data", details: error.flatten() },
        { status: 400 }
      );
    }

    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A career with this slug already exists." },
        { status: 409 }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Career not found." },
        { status: 404 }
      );
    }

    console.error("PATCH /api/careers", error);
    return NextResponse.json(
      { error: "Could not update career" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Remove a career
// ============================================

export async function DELETE(request: NextRequest) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = idSchema.parse(body.id);

    await withDbRetry(() => prisma.career.delete({ where: { id } }));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid career id" }, { status: 400 });
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Career not found." },
        { status: 404 }
      );
    }

    console.error("DELETE /api/careers", error);
    return NextResponse.json(
      { error: "Could not delete career" },
      { status: 500 }
    );
  }
}
