import { NextResponse } from "next/server";
import { put } from "@vercel/blob";
import { getSession as getUserSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";
import { z } from "zod";

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

const updateSchema = z.object({
  id: z.string().trim().min(1),
  status: z
    .string()
    .trim()
    .min(1)
    .max(50)
    .optional(),
  notes: z
    .string()
    .trim()
    .max(5000)
    .nullable()
    .optional(),
});

async function getSession() {
  const session = await getUserSession();
  const role = session?.role;

  if (!session || !["ADMIN", "STAFF"].includes(role ?? "")) {
    return null;
  }

  return session;
}

function isNotFoundError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: string }).code === "P2025"
  );
}

/*
 * GET /api/career-applications
 *
 * Admin/Staff only.
 *
 * Optional:
 * ?careerId=...
 * ?status=NEW
 */
export async function GET(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const url = new URL(request.url);

    const careerId = url.searchParams.get("careerId");
    const status = url.searchParams.get("status");

    const applications = await withDbRetry(() =>
      prisma.careerApplication.findMany({
        where: {
          ...(careerId ? { careerId } : {}),
          ...(status ? { status } : {}),
        },
        include: {
          career: {
            select: {
              id: true,
              title: true,
              slug: true,
              department: true,
              location: true,
              type: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      })
    );

    return NextResponse.json({ applications });
  } catch (error) {
    console.error(
      "GET /api/career-applications",
      error
    );

    return NextResponse.json(
      {
        error: "Could not load career applications",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * POST /api/career-applications
 *
 * Public.
 *
 * Accepts multipart/form-data with:
 *   careerId, name, email, phone, coverLetter, cv (File)
 *
 * Uploads the CV to Vercel Blob and creates a new
 * career application.
 */
export async function POST(request: Request) {
  let uploadedBlobUrl: string | null = null;

  try {
    const formData = await request.formData();

    const careerId = String(formData.get("careerId") ?? "").trim();
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const coverLetter = String(
      formData.get("coverLetter") ?? ""
    ).trim();

    const cvEntry = formData.get("cv");

    if (!careerId || !name || !email || !phone || !coverLetter) {
      return NextResponse.json(
        {
          error: "All application fields are required.",
        },
        { status: 400 }
      );
    }

    if (!(cvEntry instanceof File)) {
      return NextResponse.json(
        {
          error: "Please upload your CV.",
        },
        { status: 400 }
      );
    }

    if (cvEntry.size <= 0) {
      return NextResponse.json(
        {
          error: "The uploaded CV is empty.",
        },
        { status: 400 }
      );
    }

    if (cvEntry.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: "CV file size must not exceed 5 MB.",
        },
        { status: 400 }
      );
    }

    if (!isAllowedFile(cvEntry)) {
      return NextResponse.json(
        {
          error: "Only PDF, DOC, and DOCX files are allowed.",
        },
        { status: 400 }
      );
    }

    /*
     * Make sure the selected career actually exists
     * and is accepting applications.
     */
    const career = await withDbRetry(() =>
      prisma.career.findUnique({
        where: {
          id: careerId,
        },
        select: {
          id: true,
          active: true,
          published: true,
        },
      })
    );

    if (!career) {
      return NextResponse.json(
        {
          error: "Career position not found.",
        },
        { status: 404 }
      );
    }

    if (!career.active || !career.published) {
      return NextResponse.json(
        {
          error:
            "This position is no longer accepting applications.",
        },
        { status: 400 }
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
      }
    );

    uploadedBlobUrl = blob.url;

    const application = await withDbRetry(
      () =>
        prisma.careerApplication.create({
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
          include: {
            career: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        }),
      3,
      2000
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Your application has been submitted successfully.",
        application: {
          id: application.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    /*
     * If the Blob upload succeeded but the database insert failed,
     * we intentionally do not expose the Blob URL to the client.
     * The uploaded file can be cleaned from Blob storage separately
     * if necessary.
     */
    if (uploadedBlobUrl) {
      console.error(
        "CV was uploaded to Blob but application creation failed:",
        uploadedBlobUrl
      );
    }

    console.error(
      "POST /api/career-applications",
      error
    );

    if (process.env.NODE_ENV === "development") {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Database error",
        },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      {
        error: "Could not submit application",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * PATCH /api/career-applications
 *
 * Admin/Staff only.
 *
 * Updates application status and/or notes.
 */
export async function PATCH(request: Request) {
  if (!(await getSession())) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = updateSchema.parse(
      await request.json()
    );

    const application =
      await withDbRetry(() =>
        prisma.careerApplication.update({
          where: {
            id: body.id,
          },
          data: {
            ...(body.status !== undefined
              ? { status: body.status }
              : {}),
            ...(body.notes !== undefined
              ? { notes: body.notes }
              : {}),
          },
          include: {
            career: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        })
      );

    return NextResponse.json({ application });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid application data",
          details: error.flatten(),
        },
        {
          status: 400,
        }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(
      "PATCH /api/career-applications",
      error
    );

    return NextResponse.json(
      {
        error: "Could not update application",
      },
      {
        status: 500,
      }
    );
  }
}

/*
 * DELETE /api/career-applications
 *
 * Admin only.
 */
export async function DELETE(request: Request) {
  const session = await getSession();

  if (!session || session.role !== "ADMIN") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    const id = z.string().trim().min(1).parse(body.id);

    await withDbRetry(() =>
      prisma.careerApplication.delete({
        where: {
          id,
        },
      })
    );

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: "Invalid application id",
        },
        {
          status: 400,
        }
      );
    }

    if (isNotFoundError(error)) {
      return NextResponse.json(
        {
          error: "Application not found.",
        },
        {
          status: 404,
        }
      );
    }

    console.error(
      "DELETE /api/career-applications",
      error
    );

    return NextResponse.json(
      {
        error: "Could not delete application",
      },
      {
        status: 500,
      }
    );
  }
}