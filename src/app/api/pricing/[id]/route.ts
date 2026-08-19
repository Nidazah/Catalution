// src/app/api/pricing/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/pricing/[id]
export async function GET(
  _req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    const plan = await prisma.pricingPlan.findUnique({
      where: { id },
    });

    if (!plan) {
      return NextResponse.json(
        { error: "Pricing plan not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      id: plan.id,
      name: plan.name,
      monthly: `$${plan.price}`,
      yearly: plan.description || `$${plan.price * 10}`,
      features: Array.isArray(plan.features) ? plan.features : [],
      active: plan.active,
      published: plan.published,
      sortOrder: plan.sortOrder,
    });
  } catch (error) {
    console.error("GET /api/pricing/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to load pricing plan" },
      { status: 500 },
    );
  }
}

// PATCH /api/pricing/[id]
export async function PATCH(
  req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 },
      );
    }

    const data: Prisma.PricingPlanUpdateInput = {};

    if (body.name !== undefined) {
      if (
        typeof body.name !== "string" ||
        !body.name.trim()
      ) {
        return NextResponse.json(
          { error: "Name is required" },
          { status: 400 },
        );
      }

      data.name = body.name.trim();
    }

    if (body.monthly !== undefined) {
      if (typeof body.monthly !== "string") {
        return NextResponse.json(
          { error: "Monthly price must be a string" },
          { status: 400 },
        );
      }

      data.price = parseFloat(body.monthly.replace(/[^0-9.]/g, "")) || 0;
    }

    if (body.yearly !== undefined) {
      if (typeof body.yearly !== "string") {
        return NextResponse.json(
          { error: "Yearly price must be a string" },
          { status: 400 },
        );
      }

      data.description = body.yearly.trim();
    }

    if (body.features !== undefined) {
      if (!Array.isArray(body.features)) {
        return NextResponse.json(
          { error: "Features must be an array" },
          { status: 400 },
        );
      }

      data.features = body.features.filter(
        (feature: unknown): feature is string =>
          typeof feature === "string",
      );
    }

    if (body.active !== undefined) {
      data.active = Boolean(body.active);
    }

    if (body.published !== undefined) {
      data.published = Boolean(body.published);
    }

    if (body.sortOrder !== undefined) {
      const sortOrder = Number(body.sortOrder);

      if (!Number.isInteger(sortOrder)) {
        return NextResponse.json(
          { error: "sortOrder must be an integer" },
          { status: 400 },
        );
      }

      data.sortOrder = sortOrder;
    }

    const plan = await prisma.pricingPlan.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      id: plan.id,
      name: plan.name,
      monthly: `$${plan.price}`,
      yearly: plan.description || `$${plan.price * 10}`,
      features: Array.isArray(plan.features) ? plan.features : [],
      active: plan.active,
      published: plan.published,
      sortOrder: plan.sortOrder,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "Pricing plan not found" },
          { status: 404 },
        );
      }

      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error:
              "A pricing plan with this name already exists",
          },
          { status: 409 },
        );
      }
    }

    console.error("PATCH /api/pricing/[id] error:", error);

    return NextResponse.json(
      { error: "Failed to update pricing plan" },
      { status: 500 },
    );
  }
}

// DELETE /api/pricing/[id]
export async function DELETE(
  _req: NextRequest,
  { params }: RouteContext,
) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const { id } = await params;

    await prisma.pricingPlan.delete({
      where: { id },
    });

    return NextResponse.json({
      ok: true,
      id,
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json(
        { error: "Pricing plan not found" },
        { status: 404 },
      );
    }

    console.error(
      "DELETE /api/pricing/[id] error:",
      error,
    );

    return NextResponse.json(
      { error: "Failed to delete pricing plan" },
      { status: 500 },
    );
  }
}