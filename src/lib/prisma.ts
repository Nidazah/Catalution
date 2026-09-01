import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export async function withDbRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 1500
): Promise<T> {
  let lastError: unknown;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      const prismaError = error as {
        code?: string;
        message?: string;
      };

      const message = prismaError.message?.toLowerCase() ?? "";

      const retryableCodes = [
        "P1001",
        "P1002",
        "P1017",
        "P2024",
      ];

      const shouldRetry =
        retryableCodes.includes(prismaError.code ?? "") ||
        message.includes("connection") ||
        message.includes("timeout") ||
        message.includes("can't reach database");

      if (!shouldRetry || attempt === retries) {
        throw error;
      }

      console.warn(
        `Database attempt ${attempt}/${retries} failed. Retrying in ${delay}ms...`
      );

      await new Promise((resolve) => setTimeout(resolve, delay));

      delay *= 2;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Database operation failed");
}