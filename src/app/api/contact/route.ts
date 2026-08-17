import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

const submissionSchema = z.object({
  firstName: z.string().trim().min(1).max(120),
  lastName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(60).optional().nullable(),
  service: z.string().trim().max(160).optional().nullable(),
  message: z.string().trim().min(1).max(5000),
});

const idSchema = z.string().trim().min(1);

async function getSession() {
  const session = await auth();

  const role = (
    session?.user as { role?: string } | undefined
  )?.role;

  if (
    !session?.user ||
    !["ADMIN", "STAFF"].includes(role ?? "")
  ) {
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

/* =========================================================
   GET /api/contact?admin=true
   Admin only - get contact submissions
========================================================= */

export async function GET(request: Request) {
  const url = new URL(request.url);

  const admin =
    url.searchParams.get("admin") === "true";

  if (!admin || !(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const submissions = await withDbRetry(() =>
      prisma.contactSubmission.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
      })
    );

    return NextResponse.json(submissions);
  } catch (error) {
    console.error("GET /api/contact", error);

    return NextResponse.json(
      {
        error: "Could not load submissions",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST /api/contact
   Public - submit contact form
========================================================= */

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const data = submissionSchema.parse(body);

    /*
     * IMPORTANT:
     * Use withDbRetry here.
     *
     * This is especially useful with hosted PostgreSQL/
     * Neon/Vercel connections that can occasionally drop
     * or timeout.
     */
    const submission = await withDbRetry(
      () =>
        prisma.contactSubmission.create({
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone || null,
            service: data.service || null,
            message: data.message,
          },
        }),
      3,
      2000
    );

    return NextResponse.json(
      submission,
      {
        status: 201,
      }
    );
  } catch (error) {
    /* -------------------------
       Validation error
    -------------------------- */
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid form data",
          details: error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    /* -------------------------
       Database / server error
    -------------------------- */
    console.error(
      "POST /api/contact - database error:",
      error
    );

    /*
     * During development, return the actual Prisma error
     * so you can see exactly what is wrong.
     *
     * In production, keep the error generic.
     */
    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Database error",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Could not submit your message",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PATCH /api/contact
   Admin only - update read status
========================================================= */

export async function PATCH(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const id = idSchema.parse(body.id);
    const read = z.boolean().parse(body.read);

    const submission = await withDbRetry(() =>
      prisma.contactSubmission.update({
        where: {
          id,
        },
        data: {
          read,
        },
      })
    );

    return NextResponse.json(submission);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid submission data",
        },
        {
          status: 400,
        }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(
      "PATCH /api/contact",
      error
    );

    return NextResponse.json(
      {
        error: "Could not update submission",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE /api/contact
   Admin only
========================================================= */

export async function DELETE(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const id = idSchema.parse(body.id);

    await withDbRetry(() =>
      prisma.contactSubmission.delete({
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
          error: "Invalid submission id",
        },
        {
          status: 400,
        }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Submission not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(
      "DELETE /api/contact",
      error
    );

    return NextResponse.json(
      {
        error: "Could not delete submission",
      },
      {
        status: 500,
      }
    );
  }
}