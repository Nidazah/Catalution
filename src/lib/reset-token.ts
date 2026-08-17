import crypto from "crypto";

export const RESET_TOKEN_TTL_MS = 30 * 60 * 1000; // 30 minutes

export function hashResetToken(rawToken: string) {
  return crypto.createHash("sha256").update(rawToken).digest("hex");
}

export function generateResetToken() {
  // Generate a secure random token
  const raw = crypto.randomBytes(32).toString("hex");

  // Create a hash for database storage (never store raw tokens)
  const tokenHash = hashResetToken(raw);

  return { raw, tokenHash };
}

export function verifyResetToken(rawToken: string, storedHash: string) {
  const tokenHash = hashResetToken(rawToken);

  return crypto.timingSafeEqual(
    Buffer.from(tokenHash),
    Buffer.from(storedHash)
  );
}