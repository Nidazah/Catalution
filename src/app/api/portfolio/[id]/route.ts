import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

// GET /api/portfolio/:id
//
// Supports:
//   /api/portfolio/1
//   /api/portfolio/2
//   /api/portfolio/<cuid>
//   /api/portfolio/<slug>
//
// Numeric IDs are treated as 1-based positions in the published
// portfolio list. Existing CUID IDs and slugs continue to work.
export async function GET(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const url = new URL(request.url);
    const admin = url.searchParams.get("admin") === "true";

    let portfolio;

    // ------------------------------------------------------------
    // /api/portfolio/1
    // /api/portfolio/2
    // etc.
    //
    // Treat numeric values as a 1-based portfolio position.
    // ------------------------------------------------------------
    if (/^\d+$/.test(id)) {
      const position = Number(id);

      if (position < 1) {
        return NextResponse.json(
          { error: "Portfolio not found" },
          { status: 404 }
        );
      }

      const portfolios = await prisma.portfolio.findMany({
        where: admin
          ? {}
          : {
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
      });

      portfolio = portfolios[position - 1];
    } else {
      // ----------------------------------------------------------
      // Existing CUID or slug.
      //
      // Example:
      // /api/portfolio/cmsvpc79b0001v0eswcxif2i3
      //
      // or:
      // /api/portfolio/strat-edge-solutions
      // ----------------------------------------------------------
      portfolio = await prisma.portfolio.findFirst({
        where: {
          OR: [
            {
              id,
            },
            {
              slug: id,
            },
          ],
          ...(admin
            ? {}
            : {
                published: true,
              }),
        },
      });
    }

    // Portfolio doesn't exist.
    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Public users can only see published portfolios.
    if (!admin && !portfolio.published) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("GET /api/portfolio/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch portfolio",
      },
      {
        status: 500,
      }
    );
  }
}


// PATCH /api/portfolio/:id
export async function PATCH(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Portfolio not found",
        },
        {
          status: 404,
        }
      );
    }

    const data: Record<string, unknown> = {};

    const allowedFields = [
      "title",
      "slug",
      "category",
      "tags",
      "image",
      "heroImage",
      "intro",
      "description",
      "overviewText",
      "overviewPoints",
      "mediaImage",
      "videoUrl",
      "finalResult",
      "client",
      "portfolio",
      "service",
      "date",
      "sortOrder",
      "active",
      "published",
      "award",
      "challenge",
      "highlightStats",
      "solution",
      "testimonial",
    ] as const;

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        data[field] = body[field];
      }
    }

    // Image is required when it is being updated.
    if (
      data.image !== undefined &&
      (typeof data.image !== "string" ||
        data.image.trim().length === 0)
    ) {
      return NextResponse.json(
        {
          error: "Portfolio image is required",
        },
        {
          status: 400,
        }
      );
    }

    // Prevent duplicate slugs.
    if (
      typeof data.slug === "string" &&
      data.slug !== existing.slug
    ) {
      const duplicate = await prisma.portfolio.findFirst({
        where: {
          slug: data.slug,
          NOT: {
            id,
          },
        },
      });

      if (duplicate) {
        return NextResponse.json(
          {
            error:
              "A portfolio with this slug already exists",
          },
          {
            status: 409,
          }
        );
      }
    }

    const portfolio = await prisma.portfolio.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(portfolio);
  } catch (error: any) {
    console.error(
      "PATCH /api/portfolio/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to update portfolio",
      },
      {
        status: 500,
      }
    );
  }
}


// DELETE /api/portfolio/:id
export async function DELETE(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const existing = await prisma.portfolio.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Portfolio not found",
        },
        {
          status: 404,
        }
      );
    }

    await prisma.portfolio.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Portfolio deleted successfully",
    });
  } catch (error: any) {
    console.error(
      "DELETE /api/portfolio/[id] error:",
      error
    );

    return NextResponse.json(
      {
        error:
          error?.message ||
          "Failed to delete portfolio",
      },
      {
        status: 500,
      }
    );
  }
}