// src/app/api/pricing/route.ts

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireStaff } from "@/lib/auth";

// -----------------------------------------------------------------------------
// Validation
// -----------------------------------------------------------------------------

const planSchema = z.object({
  name: z.string().trim().min(1, "Plan name is required"),
  monthly: z.string().trim().min(1, "Monthly price is required"),
  yearly: z.string().trim().min(1, "Yearly price is required"),
  features: z.array(z.string()).default([]),
  active: z.boolean().default(true),
  published: z.boolean().default(true),
  sortOrder: z.coerce.number().int().default(0),
});

const updatePlanSchema = planSchema.partial().extend({
  id: z.string().min(1),
});

// -----------------------------------------------------------------------------
// GET
// GET /api/pricing
// GET /api/pricing?admin=true
// -----------------------------------------------------------------------------

export async function GET(req: NextRequest) {
  try {
    const admin = req.nextUrl.searchParams.get("admin") === "true";

    /*
     * Admin requests are allowed to see all plans, including:
     * - unpublished plans
     * - inactive plans
     *
     * Public requests only receive active + published plans.
     */
    if (admin) {
      const auth = await requireStaff();

      if (auth instanceof NextResponse) {
        return auth;
      }
    }

    const plans = await prisma.pricingPlan.findMany({
      where: admin
        ? undefined
        : {
            active: true,
            published: true,
          },
      orderBy: {
        sortOrder: "asc",
      },
    });

    // IMPORTANT:
    // The admin page expects an array directly and calls plans.map(...)
    // Map Prisma fields to the frontend's monthly/yearly format.
    const mapped = plans.map((plan) => ({
      id: plan.id,
      name: plan.name,
      monthly: `$${plan.price}`,
      yearly: plan.description || `$${plan.price * 10}`,
      features: Array.isArray(plan.features) ? plan.features : [],
      active: plan.active,
      published: plan.published,
      sortOrder: plan.sortOrder,
      createdAt: plan.createdAt,
      updatedAt: plan.updatedAt,
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    console.error("GET /api/pricing error:", error);

    return NextResponse.json(
      {
        error: "Failed to load pricing plans",
      },
      {
        status: 500,
      },
    );
  }
}

// -----------------------------------------------------------------------------
// POST
// POST /api/pricing
// -----------------------------------------------------------------------------

export async function POST(req: NextRequest) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          error: "Invalid request body",
        },
        {
          status: 400,
        },
      );
    }

    const parsed = planSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.issues,
        },
        {
          status: 400,
        },
      );
    }

    const plan = await prisma.pricingPlan.create({
      data: {
        name: parsed.data.name,
        price: parseFloat(parsed.data.monthly.replace(/[^0-9.]/g, "")) || 0,
        description: parsed.data.yearly,
        interval: "month",
        currency: "USD",
        features: parsed.data.features,
        active: parsed.data.active,
        published: parsed.data.published,
        sortOrder: parsed.data.sortOrder,
      },
    });

    return NextResponse.json(
      {
        id: plan.id,
        name: plan.name,
        monthly: `$${plan.price}`,
        yearly: plan.description || `$${plan.price * 10}`,
        features: Array.isArray(plan.features) ? plan.features : [],
        active: plan.active,
        published: plan.published,
        sortOrder: plan.sortOrder,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          error: "A pricing plan with this name already exists.",
        },
        {
          status: 409,
        },
      );
    }

    console.error("POST /api/pricing error:", error);

    return NextResponse.json(
      {
        error: "Failed to create pricing plan",
      },
      {
        status: 500,
      },
    );
  }
}

// -----------------------------------------------------------------------------
// PATCH
// PATCH /api/pricing
// Body: { id, name, monthly, yearly, features, active, published, sortOrder }
// -----------------------------------------------------------------------------

export async function PATCH(req: NextRequest) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const body = await req.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        {
          error: "Invalid request body",
        },
        {
          status: 400,
        },
      );
    }

    const parsed = updatePlanSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: parsed.error.issues,
        },
        {
          status: 400,
        },
      );
    }

    const {
      id,
      name,
      monthly,
      yearly,
      features,
      active,
      published,
      sortOrder,
    } = parsed.data;

    // Build the update object so omitted fields remain unchanged.
    const data: Prisma.PricingPlanUpdateInput = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (monthly !== undefined) {
      data.price = parseFloat(monthly.replace(/[^0-9.]/g, "")) || 0;
    }

    if (yearly !== undefined) {
      data.description = yearly;
    }

    if (features !== undefined) {
      data.features = features;
    }

    if (active !== undefined) {
      data.active = active;
    }

    if (published !== undefined) {
      data.published = published;
    }

    if (sortOrder !== undefined) {
      data.sortOrder = sortOrder;
    }

    const existing = await prisma.pricingPlan.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Pricing plan not found",
        },
        {
          status: 404,
        },
      );
    }

    const plan = await prisma.pricingPlan.update({
      where: {
        id,
      },
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
      if (error.code === "P2002") {
        return NextResponse.json(
          {
            error: "A pricing plan with this name already exists.",
          },
          {
            status: 409,
          },
        );
      }

      if (error.code === "P2025") {
        return NextResponse.json(
          {
            error: "Pricing plan not found",
          },
          {
            status: 404,
          },
        );
      }
    }

    console.error("PATCH /api/pricing error:", error);

    return NextResponse.json(
      {
        error: "Failed to update pricing plan",
      },
      {
        status: 500,
      },
    );
  }
}

// -----------------------------------------------------------------------------
// DELETE
// DELETE /api/pricing?id=PLAN_ID
// -----------------------------------------------------------------------------

export async function DELETE(req: NextRequest) {
  try {
    const auth = await requireStaff();

    if (auth instanceof NextResponse) {
      return auth;
    }

    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Plan id is required",
        },
        {
          status: 400,
        },
      );
    }

    const existing = await prisma.pricingPlan.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      return NextResponse.json(
        {
          error: "Pricing plan not found",
        },
        {
          status: 404,
        },
      );
    }

    await prisma.pricingPlan.delete({
      where: {
        id,
      },
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
        {
          error: "Pricing plan not found",
        },
        {
          status: 404,
        },
      );
    }

    console.error("DELETE /api/pricing error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete pricing plan",
      },
      {
        status: 500,
      },
    );
  }
}