// app/api/services/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";
import { Prisma } from "@prisma/client";

// ============================================
// SCHEMAS
// ============================================

// Full service schema (for complete updates)
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

// Partial schema for updates (all fields optional)
const serviceUpdateSchema = serviceSchema.partial();

// ID validation
const idSchema = z.string().trim().min(1);

// ============================================
// AUTHENTICATION
// ============================================

async function requireStaff() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  return session?.user && ["ADMIN", "STAFF"].includes(role ?? "");
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
// GET - Get a single service (public)
// ============================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID
    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid service id" },
        { status: 400 }
      );
    }

    // Check if admin is requesting (can see unpublished/inactive)
    const url = new URL(request.url);
    const isAdmin = url.searchParams.get("admin") === "true";
    
    // If admin, verify authentication
    if (isAdmin && !(await requireStaff())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Query service
    const service = await withDbRetry(() =>
      prisma.service.findFirst({
        where: isAdmin
          ? { id }
          : { 
              id,
              active: true,
              published: true,
            },
      })
    );

    if (!service) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Return consistent response format
    return NextResponse.json({ service });
  } catch (error) {
    console.error("GET /api/services/[id]", error);
    return NextResponse.json(
      { error: "Could not load service" },
      { status: 500 }
    );
  }
}

// ============================================
// PATCH - Update a service (Admin/Staff only)
// ============================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Authentication check
  if (!(await requireStaff())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Validate ID
    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid service id" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    // Validate update data
    const parsed = serviceUpdateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid update data",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    // Check if there's anything to update
    if (Object.keys(parsed.data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    // Perform update with retry logic
    const service = await withDbRetry(() =>
      prisma.service.update({
        where: { id },
        data: parsed.data,
      })
    );

    return NextResponse.json({ service });
  } catch (error) {
    // Handle not found
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    // Handle unique constraint (duplicate slug)
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A service with this slug already exists." },
        { status: 409 }
      );
    }

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid update data",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    console.error("PATCH /api/services/[id]", error);
    return NextResponse.json(
      { error: "Could not update service" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE - Delete a service (Admin/Staff only)
// ============================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Authentication check
  if (!(await requireStaff())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Validate ID
    const idValidation = idSchema.safeParse(id);
    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid service id" },
        { status: 400 }
      );
    }

    // Delete with retry logic
    await withDbRetry(() =>
      prisma.service.delete({
        where: { id },
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    // Handle not found
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Service not found" },
        { status: 404 }
      );
    }

    console.error("DELETE /api/services/[id]", error);
    return NextResponse.json(
      { error: "Could not delete service" },
      { status: 500 }
    );
  }
}