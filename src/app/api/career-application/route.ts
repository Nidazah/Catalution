import { NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { prisma } from "@/lib/prisma";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ALLOWED_EXTENSIONS = new Set([
  ".pdf",
  ".doc",
  ".docx",
]);

const ALLOWED_MIME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

function getExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");

  if (lastDot === -1) {
    return "";
  }

  return fileName.slice(lastDot).toLowerCase();
}

function isAllowedFile(file: File) {
  const extension = getExtension(file.name);

  return (
    ALLOWED_EXTENSIONS.has(extension) &&
    ALLOWED_MIME_TYPES.has(file.type)
  );
}

export async function POST(req: NextRequest) {
  let uploadedBlobUrl: string | null = null;

  try {
    const formData = await req.formData();

    const careerId = String(formData.get("careerId") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const coverLetter = String(
      formData.get("coverLetter") ?? "",
    ).trim();

    const cvEntry = formData.get("cv");

    if (!careerId || !name || !email || !phone || !coverLetter) {
      return NextResponse.json(
        {
          error: "All application fields are required.",
        },
        { status: 400 },
      );
    }

    if (!(cvEntry instanceof File)) {
      return NextResponse.json(
        {
          error: "Please upload your CV.",
        },
        { status: 400 },
      );
    }

    if (cvEntry.size <= 0) {
      return NextResponse.json(
        {
          error: "The uploaded CV is empty.",
        },
        { status: 400 },
      );
    }

    if (cvEntry.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "CV file size must not exceed 5 MB.",
        },
        { status: 400 },
      );
    }

    if (!isAllowedFile(cvEntry)) {
      return NextResponse.json(
        {
          error: "Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 },
      );
    }

    const career = await prisma.career.findUnique({
      where: {
        id: careerId,
      },
      select: {
        id: true,
        title: true,
        active: true,
        published: true,
      },
    });

    if (!career) {
      return NextResponse.json(
        {
          error: "Career position not found.",
        },
        { status: 404 },
      );
    }

    if (!career.active || !career.published) {
      return NextResponse.json(
        {
          error: "This position is no longer accepting applications.",
        },
        { status: 400 },
      );
    }

    const extension = getExtension(cvEntry.name);

    const safeBaseName =
      cvEntry.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80) || "cv";

    const uniqueName = `${safeBaseName}-${Date.now()}${extension}`;

    const blob = await put(
      `career-applications/${career.id}/${uniqueName}`,
      cvEntry,
      {
        access: "public",
        addRandomSuffix: false,
        contentType: cvEntry.type,
      },
    );

    uploadedBlobUrl = blob.url;

    const application = await prisma.careerApplication.create({
      data: {
        careerId: career.id,
        name,
        email,
        phone,
        coverLetter,

        cvUrl: blob.url,
        cvFileName: cvEntry.name,
        cvFileType: cvEntry.type,
        cvFileSize: cvEntry.size,

        status: "NEW",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been submitted successfully.",
        application: {
          id: application.id,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Career application submission error:", error);

    /*
     * If the Blob upload succeeded but the database insert failed,
     * we intentionally do not expose the Blob URL to the client.
     * The uploaded file can be cleaned from Blob storage separately
     * if necessary.
     */
    if (uploadedBlobUrl) {
      console.error(
        "CV was uploaded to Blob but application creation failed:",
        uploadedBlobUrl,
      );
    }

    return NextResponse.json(
      {
        error: "Failed to submit your application. Please try again.",
      },
      { status: 500 },
    );
  }
}