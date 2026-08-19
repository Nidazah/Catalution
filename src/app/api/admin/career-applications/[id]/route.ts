import { NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;

  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) {
    return null;
  }

  return session;
}

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2025"
  );
}

const paramsSchema = z.object({
  id: z.string().trim().min(1),
});

const updateSchema = z.object({
  status: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .optional(),

  notes: z
    .string()
    .trim()
    .max(5000)
    .nullable()
    .optional(),
});

/*
 * PATCH /api/admin/career-applications/:id
 *
 * Admin/Staff only.
 */
export async function PATCH(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const params = await context.params;

    const { id } = paramsSchema.parse(params);

    const body = updateSchema.parse(
      await request.json()
    );

    const application = await withDbRetry(() =>
      prisma.careerApplication.update({
        where: {
          id,
        },
        data: {
          ...(body.status !== undefined
            ? { status: body.status }
            : {}),
          ...(body.notes !== undefined
            ? { notes: body.notes }
            : {}),
        },
        include: {
          career: {
            select: {
              id: true,
              title: true,
              slug: true,
              department: true,
              location: true,
              type: true,
            },
          },
        },
      })
    );

    return NextResponse.json({
      application,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid application data",
          details: error.flatten(),
        },
        { status: 400 }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Application not found.",
        },
        { status: 404 }
      );
    }

    console.error(
      "PATCH /api/admin/career-applications/[id]",
      error
    );

    return NextResponse.json(
      {
        error: "Could not update application",
      },
      { status: 500 }
    );
  }
}

/*
 * DELETE /api/admin/career-applications/:id
 *
 * Admin only.
 */
export async function DELETE(
  request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const params = await context.params;

    const { id } = paramsSchema.parse(params);

    await withDbRetry(() =>
      prisma.careerApplication.delete({
        where: {
          id,
        },
      })
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid application id",
        },
        { status: 400 }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Application not found.",
        },
        { status: 404 }
      );
    }

    console.error(
      "DELETE /api/admin/career-applications/[id]",
      error
    );

    return NextResponse.json(
      {
        error: "Could not delete application",
      },
      { status: 500 }
    );
  }
}
