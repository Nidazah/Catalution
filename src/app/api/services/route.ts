// app/api/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// ============================================
// SCHEMAS
// ============================================

const featureSchema = z.object({
  title: z.string().trim().min(1).max(80),
  description: z.string().trim().min(1).max(300),
  icon: z.string().trim().min(1).max(40).default("sparkles"),
});

const serviceSchema = z.object({
  title: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  shortDescription: z.string().trim().max(500).optional().nullable(),
  description: z.string().trim().min(10).max(1000),
  fullDescription: z.string().trim().max(5000).optional().nullable(),
  icon: z.string().trim().min(1).max(40).default("waves"),
  image: z.string().trim().url(),
  heroImage2: z.string().trim().url().optional().nullable(),
  features: z.array(featureSchema).max(12).optional().nullable(),
  overviewItems: z
    .array(z.string().trim().min(1).max(300))
    .max(12)
    .optional()
    .nullable(),
  ctaLabel: z.string().trim().min(1).max(60).default("Get optimization"),
  ctaUrl: z.string().trim().min(1).max(300).default("/contact"),
  sortOrder: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  published: z.boolean().default(true),
});

const idSchema = z.string().trim().min(1);

const serviceUpdateSchema = serviceSchema.partial().extend({
  id: z.string().trim().min(1),
});

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
// GET - List services (public + admin)
// ============================================

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const isAdmin = url.searchParams.get("admin") === "true";

  // Check authentication for admin access
  if (isAdmin && !(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const services = await withDbRetry(() =>
      prisma.service.findMany({
        where: isAdmin ? undefined : { active: true, published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      })
    );

    return NextResponse.json({ services });
  } catch (error) {
    console.error("GET /api/services", error);
    return NextResponse.json(
      { error: "Could not load services" },
      { status: 500 }
    );
  }
}

// ============================================
// POST - Create a new service
// ============================================

export async function POST(request: NextRequest) {
  // Authentication check
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const data = serviceSchema.parse(body);

    const service = await withDbRetry(() =>
      prisma.service.create({ data })
    );

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid service data",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    // Unique constraint errors (duplicate slug)
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    console.error("POST /api/services", error);
    return NextResponse.json(
      { error: "Could not create service" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update a service
// ============================================

export async function PATCH(request: NextRequest) {
  // Authentication check
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate id
    const id = idSchema.parse(body.id);

    // Remove id from data and validate the rest
    const { id: _, ...updateData } = body;
    const data = serviceSchema.parse(updateData);

    const service = await withDbRetry(() =>
      prisma.service.update({
        where: { id },
        data,
      })
    );

    return NextResponse.json({ service });
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid service data",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    // Unique constraint errors (duplicate slug)
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    // Not found errors
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    console.error("PATCH /api/services", error);
    return NextResponse.json(
      { error: "Could not update service" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Remove a service
// ============================================

export async function DELETE(request: NextRequest) {
  // Authentication check
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const id = idSchema.parse(body.id);

    await withDbRetry(() =>
      prisma.service.delete({
        where: { id },
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    // Validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid service id" },
        { status: 400 }
      );
    }

    // Not found errors
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Service not found." },
        { status: 404 }
      );
    }

    console.error("DELETE /api/services", error);
    return NextResponse.json(
      { error: "Could not delete service" },
      { status: 500 }
    );
  }
}