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

    const plans = await prisma.plan.findMany({
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
    return NextResponse.json(plans);
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

    const plan = await prisma.plan.create({
      data: {
        name: parsed.data.name,
        monthly: parsed.data.monthly,
        yearly: parsed.data.yearly,
        features: parsed.data.features,
        active: parsed.data.active,
        published: parsed.data.published,
        sortOrder: parsed.data.sortOrder,
      },
    });

    return NextResponse.json(plan, {
      status: 201,
    });
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
    const data: Prisma.PlanUpdateInput = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (monthly !== undefined) {
      data.monthly = monthly;
    }

    if (yearly !== undefined) {
      data.yearly = yearly;
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

    const existing = await prisma.plan.findUnique({
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

    const plan = await prisma.plan.update({
      where: {
        id,
      },
      data,
    });

    return NextResponse.json(plan);
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

    const existing = await prisma.plan.findUnique({
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

    await prisma.plan.delete({
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