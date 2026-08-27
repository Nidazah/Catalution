import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/portfolio/by-slug/[slug] — public. Used by the public portfolio
// detail page so links are stable across DB resets (ids regenerate on
// reseed, slugs don't).
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params;
    const portfolio = await prisma.portfolio.findFirst({
      where: {
        slug,
        published: true,
        active: true,
      },
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("GET /api/portfolio/by-slug/[slug] error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 },
    );
  }
}