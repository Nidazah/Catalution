import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

const infoSchema = z.object({
  emailPrimary: z.string().trim().email().max(200),
  emailSecondary: z.string().trim().email().max(200).optional().nullable().or(z.literal("")),
  phone: z.string().trim().min(1).max(60),
  addressLine1: z.string().trim().min(1).max(200),
  addressLine2: z.string().trim().min(1).max(200),
  mapEmbedUrl: z.string().trim().url().max(2000).optional().nullable().or(z.literal("")),
  rating: z.coerce.number().min(0).max(5).optional().nullable(),
  reviewCount: z.coerce.number().int().min(0).optional().nullable(),
});

async function getSession() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

// GET /api/contact-info — public, returns the single contact info record
export async function GET() {
  try {
    const info = await withDbRetry(() => prisma.contactInfo.findFirst());
    return NextResponse.json(info);
  } catch (error) {
    console.error("GET /api/contact-info", error);
    return NextResponse.json(
      { error: "Could not load contact info" },
      { status: 500 },
    );
  }
}

// PATCH /api/contact-info — admin, create-or-update the singleton record
export async function PATCH(request: Request) {
  if (!(await getSession()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const data = infoSchema.parse(await request.json());
    const payload = {
      emailPrimary: data.emailPrimary,
      emailSecondary: data.emailSecondary || null,
      phone: data.phone,
      addressLine1: data.addressLine1,
      addressLine2: data.addressLine2,
      mapEmbedUrl: data.mapEmbedUrl || null,
      rating: data.rating ?? null,
      reviewCount: data.reviewCount ?? null,
    };

    const existing = await prisma.contactInfo.findFirst();
    const info = existing
      ? await prisma.contactInfo.update({ where: { id: existing.id }, data: payload })
      : await prisma.contactInfo.create({ data: payload });

    return NextResponse.json(info);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid contact info", details: error.flatten() },
        { status: 400 },
      );
    }
    console.error("PATCH /api/contact-info", error);
    return NextResponse.json(
      { error: "Could not update contact info" },
      { status: 500 },
    );
  }
}
