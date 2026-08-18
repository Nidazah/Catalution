import { NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

const testimonialSchema = z.object({
  quote: z.string().trim().min(10).max(1000),
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(160),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  avatar: z.string().trim().url().optional().nullable(),
  sortOrder: z.coerce.number().int().min(0).default(0),
  active: z.boolean().default(true),
  published: z.boolean().default(true),
});

const idSchema = z.string().trim().min(1);

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;
  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

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

export async function GET(request: Request) {
  const url = new URL(request.url);
  const admin = url.searchParams.get("admin") === "true";

  if (admin && !(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testimonials = await withDbRetry(() =>
      prisma.testimonial.findMany({
        where: admin ? undefined : { active: true, published: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      }),
    );
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("GET /api/testimonials", error);
    return NextResponse.json(
      { error: "Could not load testimonials" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await getSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = testimonialSchema.parse(await request.json());
    const testimonial = await prisma.testimonial.create({ data });
    return NextResponse.json(testimonial, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid testimonial data", details: error.flatten() },
        { status: 400 },
      );
    }
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A testimonial with this slug already exists." },
        { status: 409 },
      );
    }
    console.error("POST /api/testimonials", error);
    return NextResponse.json(
      { error: "Could not create testimonial" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  if (!(await getSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const id = idSchema.parse(body.id);
    const data = testimonialSchema.parse(body);
    const testimonial = await prisma.testimonial.update({ where: { id }, data });
    return NextResponse.json(testimonial);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid testimonial data", details: error.flatten() },
        { status: 400 },
      );
    }
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A testimonial with this slug already exists." },
        { status: 409 },
      );
    }
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 },
      );
    }
    console.error("PATCH /api/testimonials", error);
    return NextResponse.json(
      { error: "Could not update testimonial" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await getSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const id = idSchema.parse(body.id);
    await prisma.testimonial.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid testimonial id" },
        { status: 400 },
      );
    }
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Testimonial not found." },
        { status: 404 },
      );
    }
    console.error("DELETE /api/testimonials", error);
    return NextResponse.json(
      { error: "Could not delete testimonial" },
      { status: 500 },
    );
  }
}
