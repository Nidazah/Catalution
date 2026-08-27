import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  return session?.role === "ADMIN";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseJson(value: unknown, field: string) {
  if (typeof value !== "string") return value;

  try {
    return JSON.parse(value);
  } catch {
    throw new Error(`${field} must contain valid JSON`);
  }
}

function parseOverview(value: unknown) {
  const parsed = parseJson(
    value ?? { text: "", points: [] },
    "Overview"
  );

  const obj =
    parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : {};

  return {
    overviewText:
      typeof obj.text === "string" ? obj.text : null,
    overviewPoints: Array.isArray(obj.points)
      ? obj.points
      : [],
  };
}

function parseMedia(value: unknown) {
  const parsed = parseJson(
    value ?? { image: "", videoUrl: "" },
    "Media"
  );

  const obj =
    parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : {};

  return {
    mediaImage:
      typeof obj.image === "string" ? obj.image : null,
    videoUrl:
      typeof obj.videoUrl === "string" ? obj.videoUrl : null,
  };
}

function parseInfo(value: unknown) {
  const parsed = parseJson(
    value ?? {
      client: "",
      portfolio: "",
      service: "",
      category: "",
      date: "",
    },
    "Info"
  );

  const obj =
    parsed && typeof parsed === "object"
      ? (parsed as Record<string, unknown>)
      : {};

  return {
    client: typeof obj.client === "string" ? obj.client : null,
    portfolio:
      typeof obj.portfolio === "string" ? obj.portfolio : null,
    service:
      typeof obj.service === "string" ? obj.service : null,
    category:
      typeof obj.category === "string" ? obj.category : "",
    date: typeof obj.date === "string" ? obj.date : null,
  };
}

// GET /api/portfolio
// Public: only published portfolios
// Admin: /api/portfolio?admin=true returns all
export async function GET(request: NextRequest) {
  try {
    const admin = request.nextUrl.searchParams.get("admin") === "true";

    if (admin) {
      const session = await getSession();

      if (!isAdmin(session)) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    const portfolios = await prisma.portfolio.findMany({
      where: admin
        ? undefined
        : {
            published: true,
            active: true,
          },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "asc" },
      ],
    });

    return NextResponse.json(portfolios);
  } catch (error) {
    console.error("GET /api/portfolio error:", error);

    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

// POST /api/portfolio
export async function POST(request: NextRequest) {
  try {
    const session = await getSession();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title,
      slug,
      tags,
      image,
      heroImage,
      intro,
      description,
      overview,
      challenge,
      solution,
      highlightStats,
      media,
      finalResult,
      award,
      testimonial,
      info,
      sortOrder,
      active,
      published,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    if (!image?.trim()) {
      return NextResponse.json(
        { error: "Portfolio image is required" },
        { status: 400 }
      );
    }

    if (!heroImage?.trim()) {
      return NextResponse.json(
        { error: "Hero image is required" },
        { status: 400 }
      );
    }

    const generatedSlug =
      slug?.trim() || slugify(title);

    const existing = await prisma.portfolio.findUnique({
      where: { slug: generatedSlug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A portfolio with this slug already exists" },
        { status: 409 }
      );
    }

    const overviewData = parseOverview(overview);
    const mediaData = parseMedia(media);
    const infoData = parseInfo(info);

    const portfolio = await prisma.portfolio.create({
      data: {
        title: title.trim(),
        slug: generatedSlug,
        category: infoData.category,
        tags: parseJson(tags ?? [], "Tags"),
        image: image.trim(),
        heroImage: heroImage.trim(),
        intro: intro?.trim() ?? "",
        description: parseJson(description ?? [], "Description"),
        overviewText: overviewData.overviewText,
        overviewPoints: overviewData.overviewPoints,

        // NEW
        challenge: challenge?.trim() ?? "",
        solution: solution?.trim() ?? "",
        highlightStats: parseJson(
          highlightStats ?? { value: "", label: "" },
          "Highlight Stats"
        ),

        mediaImage: mediaData.mediaImage,
        videoUrl: mediaData.videoUrl,
        finalResult: parseJson(finalResult ?? [], "Final Result"),

        // NEW
        award: award?.trim() ?? "",
        testimonial: testimonial?.trim() ?? "",

        client: infoData.client,
        portfolio: infoData.portfolio,
        service: infoData.service,
        date: infoData.date,
        sortOrder: Number(sortOrder ?? 0),
        active:
          active === undefined
            ? true
            : Boolean(active),
        published:
          published === undefined
            ? true
            : Boolean(published),
      },
    });

    return NextResponse.json(portfolio, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/portfolio error:", error);

    return NextResponse.json(
      { error: error?.message || "Failed to create portfolio" },
      { status: 500 }
    );
  }
}