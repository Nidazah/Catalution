import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession as getUserSession } from "@/lib/auth";

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;

  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) {
    return null;
  }

  return session;
}

export async function POST(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
    if (!allowedTypes.has(file.type)) {
      return NextResponse.json(
        { error: "Only JPEG, PNG, WebP, and GIF images are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Image must be under 5MB" },
        { status: 400 }
      );
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error("BLOB_READ_WRITE_TOKEN is missing");

      return NextResponse.json(
        { error: "BLOB_READ_WRITE_TOKEN is not configured" },
        { status: 500 }
      );
    }

    const header = new Uint8Array(await file.slice(0, 12).arrayBuffer());
    const isJpeg = header[0] === 0xff && header[1] === 0xd8 && header[2] === 0xff;
    const isPng = header[0] === 0x89 && header[1] === 0x50 && header[2] === 0x4e && header[3] === 0x47;
    const isGif = header[0] === 0x47 && header[1] === 0x49 && header[2] === 0x46;
    const isWebp = header[0] === 0x52 && header[1] === 0x49 && header[2] === 0x46 && header[3] === 0x46 && header[8] === 0x57 && header[9] === 0x45 && header[10] === 0x42 && header[11] === 0x50;

    if (!isJpeg && !isPng && !isGif && !isWebp) {
      return NextResponse.json(
        { error: "The uploaded file is not a valid supported image." },
        { status: 400 }
      );
    }

    const safeFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-").slice(-120);

    const blob = await put(
      `team/${Date.now()}-${safeFileName}`,
      file,
      {
        access: "public",
        addRandomSuffix: true,
      }
    );

    return NextResponse.json({
      success: true,
      url: blob.url,
    });
  } catch (error) {
    console.error("POST /api/upload error:", error);

    return NextResponse.json(
      {
        error: "Could not upload image",
      },
      { status: 500 }
    );
  }
}