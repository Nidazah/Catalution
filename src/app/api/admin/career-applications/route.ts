import { NextResponse } from "next/server";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;

  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) {
    return null;
  }

  return session;
}

/*
 * GET /api/admin/career-applications
 *
 * Admin/Staff only.
 *
 * Returns all submitted career applications.
 */
export async function GET() {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const applications = await withDbRetry(() =>
      prisma.careerApplication.findMany({
        include: {
          Career: {
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
        orderBy: {
          createdAt: "desc",
        },
      })
    );

    const mapped = applications.map((application) => ({
      ...application,
      careerTitle: application.Career?.title ?? "",
      career: application.Career,
    }));

    return NextResponse.json({
      applications: mapped,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/career-applications",
      error
    );

    return NextResponse.json(
      {
        error: "Could not load career applications",
      },
      {
        status: 500,
      }
    );
  }
}