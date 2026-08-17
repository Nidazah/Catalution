import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { forgotPasswordSchema } from "@/lib/validation/password-reset";
import { generateResetToken, RESET_TOKEN_TTL_MS } from "@/lib/reset-token";
import { sendPasswordResetEmail } from "@/lib/email";

// Very small in-memory rate limiter: 3 requests per email per 15 minutes.
// Fine for a low-traffic internal admin panel; swap for Redis/Upstash if
// this ever needs to survive multiple server instances or restarts.
const attempts = new Map<string, number[]>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 3;

function isRateLimited(key: string) {
  const now = Date.now();
  const history = (attempts.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  history.push(now);
  attempts.set(key, history);
  return history.length > MAX_ATTEMPTS;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    const parsed = forgotPasswordSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = parsed.data;

    // Always return the same generic response whether or not the account
    // exists, is rate-limited, etc. — the response must never reveal
    // whether an email is registered (account enumeration).
    const genericResponse = NextResponse.json({
      message: "If that email is registered, we've sent a reset link.",
    });

    if (isRateLimited(email.toLowerCase())) {
      return genericResponse;
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return genericResponse;
    }

    const { raw, tokenHash } = generateResetToken();

    await prisma.passwordResetToken.create({
      data: {
        tokenHash,
        userId: user.id,
        expiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
      },
    });

    const resetUrl = `${req.nextUrl.origin}/admin/reset-password?token=${raw}`;

    // Send the email - we catch the error and log it, but still return the generic response
    try {
      await sendPasswordResetEmail({ 
        to: user.email, 
        name: user.name || "Admin", 
        resetUrl 
      });
    } catch (err) {
      console.error("Failed to send password reset email:", err);
      // Still return the generic response to avoid revealing failure
    }

    return genericResponse;
  } catch (error) {
    console.error("Unexpected error in forgot-password route:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}