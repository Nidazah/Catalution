import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { auth } from "@/auth";

async function getSession() {
  const session = await auth();
  const role = (session?.user as { role?: string } | undefined)?.role;
  if (!session?.user || !["ADMIN", "STAFF"].includes(role ?? "")) return null;
  return session;
}

export async function POST(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json(
      { error: "Only image files are allowed" },
      { status: 400 },
    );
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Image must be under 5MB" },
      { status: 400 },
    );
  }

  try {
    const blob = await put(`team/${Date.now()}-${file.name}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("POST /api/upload", error);
    return NextResponse.json(
      { error: "Could not upload image" },
      { status: 500 },
    );
  }
}