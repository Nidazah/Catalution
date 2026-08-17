import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { prisma, withDbRetry } from "@/lib/prisma";

const idSchema = z.string().trim().min(1);

const faqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(3, "Question must be at least 3 characters")
    .max(500, "Question must be 500 characters or less"),

  answer: z
    .string()
    .trim()
    .min(1, "Answer is required")
    .max(5000, "Answer must be 5000 characters or less"),

  sortOrder: z.coerce
    .number()
    .int()
    .min(0),

  active: z.boolean(),

  published: z.boolean(),
});

const faqUpdateSchema = faqSchema.partial();

async function requireStaff() {
  const session = await auth();

  const role = (session?.user as { role?: string } | undefined)?.role;

  return (
    session?.user &&
    ["ADMIN", "STAFF"].includes(role ?? "")
  );
}

function isNotFoundError(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2025"
  );
}

// ============================================
// GET /api/faq/[id]
//
// Public:
//   Published + active FAQ only
//
// Admin/Staff:
//   /api/faq/[id]?admin=true
//   Can see inactive/unpublished FAQ
// ============================================

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);

    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid FAQ id" },
        { status: 400 }
      );
    }

    const admin =
      request.nextUrl.searchParams.get("admin") === "true";

    if (admin && !(await requireStaff())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const faq = await withDbRetry(() =>
      prisma.fAQ.findFirst({
        where: admin
          ? { id }
          : {
              id,
              active: true,
              published: true,
            },
      })
    );

    if (!faq) {
      return NextResponse.json(
        { error: "FAQ not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      faq,
    });
  } catch (error) {
    console.error("GET /api/faq/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to fetch FAQ" },
      { status: 500 }
    );
  }
}

// ============================================
// PUT /api/faq/[id]
//
// Admin/Staff only
//
// Full replacement/update
// ============================================

export async function PUT(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  if (!(await requireStaff())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);

    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid FAQ id" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const parsed = faqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid FAQ data",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const faq = await withDbRetry(() =>
      prisma.fAQ.update({
        where: {
          id,
        },
        data: parsed.data,
      })
    );

    return NextResponse.json({
      faq,
    });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "FAQ not found" },
        { status: 404 }
      );
    }

    console.error("PUT /api/faq/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update FAQ" },
      { status: 500 }
    );
  }
}

// ============================================
// DELETE /api/faq/[id]
//
// Admin/Staff only
// ============================================

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  if (!(await requireStaff())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const { id } = await params;

    const idValidation = idSchema.safeParse(id);

    if (!idValidation.success) {
      return NextResponse.json(
        { error: "Invalid FAQ id" },
        { status: 400 }
      );
    }

    await withDbRetry(() =>
      prisma.fAQ.delete({
        where: {
          id,
        },
      })
    );

    return NextResponse.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "FAQ not found" },
        { status: 404 }
      );
    }

    console.error("DELETE /api/faq/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to delete FAQ" },
      { status: 500 }
    );
  }
}