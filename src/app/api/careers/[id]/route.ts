// app/api/careers/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

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

const careerUpdateSchema = careerSchema.partial();
const idSchema = z.string().trim().min(1);

// ============================================
// AUTHENTICATION
// ============================================

async function requireStaff() {
  const session = await getSession();
  const role = session?.role;
  return session && ["ADMIN", "STAFF"].includes(role ?? "");
}

// ============================================
// HELPERS
// ============================================

function isNotFoundError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

function isUniqueError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

// ============================================
// GET - Get a single career (public)
// ============================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json({ error: "Invalid career id" }, { status: 400 });
    }

    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "true";

    if (isAdmin && !(await requireStaff())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const career = await withDbRetry(() =>
      prisma.career.findFirst({
        where: {
          OR: [{ id }, { slug: id }],
          ...(isAdmin ? {} : { active: true, published: true }),
        },
      })
    );

    if (!career) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    return NextResponse.json({ career });
  } catch (error) {
    console.error("GET /api/careers/[id]", error);
    return NextResponse.json(
      { error: "Could not load career" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update a career (Admin/Staff only)
// ============================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireStaff())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json({ error: "Invalid career id" }, { status: 400 });
    }

    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const parsed = careerUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid update data", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const career = await withDbRetry(() =>
      prisma.career.update({ where: { id }, data: parsed.data })
    );

    return NextResponse.json({ career });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A career with this slug already exists." },
        { status: 409 }
      );
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid update data", details: error.flatten() },
        { status: 400 }
      );
    }

    console.error("PATCH /api/careers/[id]", error);
    return NextResponse.json(
      { error: "Could not update career" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete a career (Admin/Staff only)
// ============================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireStaff())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json({ error: "Invalid career id" }, { status: 400 });
    }

    await withDbRetry(() => prisma.career.delete({ where: { id } }));

    return NextResponse.json({ success: true });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Career not found" }, { status: 404 });
    }

    console.error("DELETE /api/careers/[id]", error);
    return NextResponse.json(
      { error: "Could not delete career" },
      { status: 500 }
    );
  }
}
