import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  return session?.role === "ADMIN";
}

function parseJson(value: unknown, field: string) {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${field} must contain valid JSON`);
  }
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

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    const body = await request.json();

    if (!body.title?.trim()) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }
    if (!body.image?.trim()) {
      return NextResponse.json({ error: "Portfolio image is required" }, { status: 400 });
    }
    if (!body.heroImage?.trim()) {
      return NextResponse.json({ error: "Hero image is required" }, { status: 400 });
    }

    const slug = body.slug?.trim();
    if (!slug) {
      return NextResponse.json({ error: "Portfolio slug is required" }, { status: 400 });
    }

    const overview = parseJson(body.overview ?? { text: "", points: [] }, "Overview") as Record<string, unknown>;
    const media = parseJson(body.media ?? { image: "", videoUrl: "" }, "Media") as Record<string, unknown>;
    const info = parseJson(body.info ?? {}, "Info") as Record<string, unknown>;

    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        title: body.title.trim(),
        slug,
        category: typeof info.category === "string" ? info.category : "",
        tags: parseJson(body.tags ?? [], "Tags"),
        image: body.image.trim(),
        heroImage: body.heroImage.trim(),
        intro: body.intro?.trim() ?? "",
        description: parseJson(body.description ?? [], "Description"),
        overviewText: typeof overview.text === "string" ? overview.text : "",
        overviewPoints: Array.isArray(overview.points) ? overview.points : [],
        challenge: body.challenge?.trim() ?? "",
        solution: body.solution?.trim() ?? "",
        highlightStats: parseJson(body.highlightStats ?? { value: "", label: "" }, "Highlight Stats"),
        mediaImage: typeof media.image === "string" ? media.image : "",
        videoUrl: typeof media.videoUrl === "string" ? media.videoUrl : "",
        finalResult: parseJson(body.finalResult ?? [], "Final Result"),
        award: body.award?.trim() ?? "",
        testimonial: body.testimonial?.trim() ?? "",
        client: typeof info.client === "string" ? info.client : "",
        portfolio: typeof info.portfolio === "string" ? info.portfolio : "",
        service: typeof info.service === "string" ? info.service : "",
        date: typeof info.date === "string" ? info.date : "",
        sortOrder: Number(body.sortOrder ?? 0),
        active: body.active === undefined ? true : Boolean(body.active),
        published: body.published === undefined ? true : Boolean(body.published),
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.error("PATCH /api/portfolio/[id] error:", error);
    if (isUniqueError(error)) {
      return NextResponse.json({ error: "A portfolio with this slug already exists" }, { status: 409 });
    }
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to update portfolio" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getSession();
    if (!isAdmin(session)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await context.params;
    await prisma.portfolio.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/portfolio/[id] error:", error);
    if (isNotFoundError(error)) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Failed to delete portfolio" }, { status: 500 });
  }
}
