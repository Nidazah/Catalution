import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function isAdmin(session: any) {
  return session?.user?.role === "ADMIN";
}

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function GET(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const post = await prisma.blog.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("GET /api/blog/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to fetch blog post",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const existing = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    if (body.slug && body.slug !== existing.slug) {
      const slugExists = await prisma.blog.findUnique({
        where: { slug: body.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: "A blog post with this slug already exists" },
          { status: 409 }
        );
      }
    }

    const post = await prisma.blog.update({
      where: { id },
      data: {
        ...(body.title !== undefined && { title: body.title }),
        ...(body.slug !== undefined && { slug: body.slug }),
        ...(body.excerpt !== undefined && {
          excerpt: body.excerpt,
        }),
        ...(body.content !== undefined && {
          content: body.content || null,
        }),
        ...(body.image !== undefined && {
          image: body.image,
        }),
        ...(body.author !== undefined && {
          author: body.author,
        }),
        ...(body.authorAvatar !== undefined && {
          authorAvatar: body.authorAvatar || null,
        }),
        ...(body.date !== undefined && {
          date: body.date,
        }),
        ...(body.comments !== undefined && {
          comments: Number(body.comments),
        }),
        ...(body.category !== undefined && {
          category: body.category,
        }),
        ...(body.tags !== undefined && {
          tags: body.tags,
        }),
        ...(body.sortOrder !== undefined && {
          sortOrder: Number(body.sortOrder),
        }),
        ...(body.active !== undefined && {
          active: Boolean(body.active),
        }),
        ...(body.published !== undefined && {
          published: Boolean(body.published),
        }),
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("PUT /api/blog/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to update blog post",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: RouteContext
) {
  try {
    const session = await auth();

    if (!isAdmin(session)) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const existing = await prisma.blog.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Blog post not found" },
        { status: 404 }
      );
    }

    await prisma.blog.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /api/blog/[id] error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete blog post",
        message:
          error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}