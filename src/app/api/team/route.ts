import { NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

const skillSchema = z.object({
  name: z.string().trim().min(1).max(80),
  percent: z.coerce.number().int().min(0).max(100),
});

const teamMemberSchema = z.object({
  name: z.string().trim().min(2).max(120),
  role: z.string().trim().min(2).max(120),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(140)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  bio: z.string().trim().max(2000).optional().nullable(),
  image: z
    .string()
    .trim()
    .min(1)
    .refine(
      (v) => v.startsWith("/") || v.startsWith("http://") || v.startsWith("https://"),
      "Image must be a valid URL or local path",
    ),
  email: z.string().trim().email().optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  linkedin: z.string().trim().url().optional().nullable(),
  twitter: z.string().trim().url().optional().nullable(),
  instagram: z.string().trim().url().optional().nullable(),
  facebook: z.string().trim().url().optional().nullable(),
  experience: z.array(z.string().trim().min(1).max(800)).max(10).optional().nullable(),
  coreBeliefs: z.array(z.string().trim().min(1).max(300)).max(12).optional().nullable(),
  skills: z.array(skillSchema).max(10).optional().nullable(),
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
    const pageParam = Number(url.searchParams.get("page") || "1");
    const limitParam = Number(url.searchParams.get("limit") || "10");

    const page = Math.max(1, Number.isFinite(pageParam) ? pageParam : 1);
    const limit = Math.min(
      50,
      Math.max(1, Number.isFinite(limitParam) ? limitParam : 10),
    );

    const skip = (page - 1) * limit;

    const where = admin
      ? undefined
      : {
          active: true,
          published: true,
        };

    const [team, total] = await withDbRetry(() =>
      Promise.all([
        prisma.teamMember.findMany({
          where,
          orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
          skip,
          take: limit,
        }),

        prisma.teamMember.count({
          where,
        }),
      ]),
    );

    const totalPages = Math.max(1, Math.ceil(total / limit));

    return NextResponse.json({
      data: team,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("GET /api/team", error);
    return NextResponse.json(
      { error: "Could not load team" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  if (!(await getSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = teamMemberSchema.parse(await request.json());
    const member = await prisma.teamMember.create({ data });
    return NextResponse.json(member, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Team validation error:", error.issues);

      return NextResponse.json(
        {
          error: "Invalid team member data",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A team member with this slug already exists." },
        { status: 409 },
      );
    }
    console.error("POST /api/team", error);
    return NextResponse.json(
      { error: "Could not create team member" },
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

    const {
      id: _id,
      ...memberData
    } = body;

    const data = teamMemberSchema.parse(memberData);
    const member = await prisma.teamMember.update({ where: { id }, data });
    return NextResponse.json(member);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Team validation error:", error.issues);

      return NextResponse.json(
        {
          error: "Invalid team member data",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }
    if (isUniqueError(error)) {
      return NextResponse.json(
        { error: "A team member with this slug already exists." },
        { status: 409 },
      );
    }
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Team member not found." },
        { status: 404 },
      );
    }
    console.error("PATCH /api/team", error);
    return NextResponse.json(
      { error: "Could not update team member" },
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
    await prisma.teamMember.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid team member id" },
        { status: 400 },
      );
    }
    if (isNotFoundError(error)) {
      return NextResponse.json(
        { error: "Team member not found." },
        { status: 404 },
      );
    }
    console.error("DELETE /api/team", error);
    return NextResponse.json(
      { error: "Could not delete team member" },
      { status: 500 },
    );
  }
}