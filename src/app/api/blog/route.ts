import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

function isAdmin(session: any) {
  return session?.role === "ADMIN";
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const includeInactive =
      searchParams.get("includeInactive") === "true";

    if (includeInactive) {
      const session = await getSession();
      if (!isAdmin(session)) {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        );
      }
    }

    const posts = await prisma.blog.findMany({
      where: includeInactive
        ? {}
        : {
            active: true,
            published: true,
          },
      orderBy: [
        { sortOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error("GET /api/blog error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch blog posts",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

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
      excerpt,
      content,
      image,
      author,
      authorAvatar,
      date,
      comments,
      category,
      tags,
      sortOrder,
      active,
      published,
    } = body;

    if (!title || !slug || !excerpt || !image || !author || !date || !category) {
      return NextResponse.json(
        {
          error:
            "title, slug, excerpt, image, author, date, and category are required",
        },
        { status: 400 }
      );
    }

    const existing = await prisma.blog.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        {
          error: "A blog post with this slug already exists",
        },
        { status: 409 }
      );
    }

    const post = await prisma.blog.create({
      data: {
        title,
        slug,
        excerpt,
        content: content || null,
        image,
        author,
        authorAvatar: authorAvatar || null,
        date,
        comments: Number(comments ?? 0),
        category,
        tags: tags ?? [],
        sortOrder: Number(sortOrder ?? 0),
        active: active !== false,
        published: published !== false,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error("POST /api/blog error:", error);

    return NextResponse.json(
      {
        error: "Failed to create blog post",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}