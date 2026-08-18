import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";

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
    .min(0)
    .default(0),

  active: z.boolean().default(true),

  published: z.boolean().default(true),
});

async function requireStaff() {
  const session = await getSession();

  const role = session?.role;

  if (
    !session ||
    !["ADMIN", "STAFF"].includes(role ?? "")
  ) {
    return null;
  }

  return session;
}

const idSchema = z.string().trim().min(1);

// ============================================
// GET /api/faq
//
// Public:
//   Returns active + published FAQs
//
// Admin/Staff:
//   /api/faq?admin=true
//   Returns all FAQs
// ============================================

export async function GET(request: NextRequest) {
  try {
    const admin =
      request.nextUrl.searchParams.get("admin") === "true";

    if (admin && !(await requireStaff())) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const faqs = await withDbRetry(() =>
      prisma.fAQ.findMany({
        where: admin
          ? undefined
          : {
              active: true,
              published: true,
            },

        orderBy: [
          {
            sortOrder: "asc",
          },
          {
            createdAt: "asc",
          },
        ],
      })
    );

    return NextResponse.json({
      faqs,
    });
  } catch (error) {
    console.error("GET /api/faq error:", error);

    return NextResponse.json(
      { error: "Failed to fetch FAQs" },
      { status: 500 }
    );
  }
}

// ============================================
// POST /api/faq
//
// Admin/Staff only
// ============================================

export async function POST(request: NextRequest) {
  if (!(await requireStaff())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
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
      prisma.fAQ.create({
        data: parsed.data,
      })
    );

    return NextResponse.json(
      {
        faq,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/faq error:", error);

    return NextResponse.json(
      { error: "Failed to create FAQ" },
      { status: 500 }
    );
  }
}