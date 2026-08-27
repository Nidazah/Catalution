import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { resetPasswordSchema } from "@/lib/validation/password-reset";
import { hashResetToken } from "@/lib/reset-token";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = resetPasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid input", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { token, password } = parsed.data;
  const tokenHash = hashResetToken(token);

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { tokenHash },
  });

  if (
    !resetToken ||
    resetToken.usedAt ||
    resetToken.expiresAt.getTime() < Date.now()
  ) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired. Please request a new one." },
      { status: 400 }
    );
  }

  const passwordHash = await bcrypt.hash(password, 10);

  try {
    await prisma.$transaction(async (tx) => {
      // Atomically claim the token first. This prevents two concurrent
      // requests from both successfully reusing the same reset token.
      const claimed = await tx.passwordResetToken.updateMany({
        where: {
          id: resetToken.id,
          usedAt: null,
          expiresAt: { gt: new Date() },
        },
        data: { usedAt: new Date() },
      });

      if (claimed.count !== 1) {
        throw new Error("RESET_TOKEN_ALREADY_USED");
      }

      await tx.user.update({
        where: { id: resetToken.userId },
        data: { password: passwordHash },
      });

      await tx.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,
          id: { not: resetToken.id },
        },
      });
    });
  } catch (error) {
    if (error instanceof Error && error.message === "RESET_TOKEN_ALREADY_USED") {
      return NextResponse.json(
        { error: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 },
      );
    }
    console.error("Password reset transaction failed:", error);
    return NextResponse.json(
      { error: "Could not update the password. Please request a new reset link." },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Password updated successfully." });
}