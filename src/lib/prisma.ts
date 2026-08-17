// src/lib/prisma.ts
import { PrismaClient, type Prisma } from "@prisma/client";

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

// ✅ Correct typing for log levels
type LogLevel = 'info' | 'query' | 'warn' | 'error';
type LogDefinition = {
  level: LogLevel;
  emit?: 'stdout' | 'event';
};

// Option 1: Simple array of log levels
const logLevels: LogLevel[] = process.env.NODE_ENV === "development" 
  ? ["error", "warn", "query"] 
  : ["error"];

// Option 2: With custom emission (if you want to capture events)
const logConfig: (LogLevel | LogDefinition)[] = process.env.NODE_ENV === "development"
  ? [
      { level: 'query', emit: 'stdout' },
      { level: 'error', emit: 'stdout' },
      { level: 'warn', emit: 'stdout' },
    ]
  : [
      { level: 'error', emit: 'stdout' }
    ];

// Option 3: More precise configuration
const prismaClientOptions: Prisma.PrismaClientOptions = {
  log: process.env.NODE_ENV === "development" 
    ? ["error", "warn", "query"] 
    : ["error"],
  ...(process.env.NODE_ENV === "production" && {
    // Connection timeout in production
    // Note: connectionTimeout is not a standard Prisma option
    // Use datasource URL parameters instead
  }),
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaClientOptions);

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// ============ HELPER FUNCTIONS ============

/**
 * Helper function with timeout
 * Prevents operations from hanging indefinitely
 */
export async function withTimeout<T>(
  promise: Promise<T>,
  timeoutMs = 30000
): Promise<T> {
  let timeoutId: NodeJS.Timeout | undefined;

  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutId = setTimeout(() => {
      reject(new Error(`Operation timed out after ${timeoutMs}ms`));
    }, timeoutMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeoutId) clearTimeout(timeoutId);
  }
}

/**
 * Helper function for database operations that may temporarily fail
 * Retries failed operations with a delay between attempts
 */
export async function withDbRetry<T>(
  operation: () => Promise<T>,
  retries = 3,
  delay = 2000
): Promise<T> {
  let lastError: unknown = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;

      console.error(
        `Database attempt ${attempt}/${retries} failed:`,
        error
      );

      if (attempt < retries) {
        console.log(`Retrying database operation in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("All database retry attempts failed");
}

/**
 * Enhanced retry with better error handling and backoff
 */
export async function withDbRetryEnhanced<T>(
  operation: () => Promise<T>,
  options: {
    retries?: number;
    delay?: number;
    backoff?: boolean;
    timeout?: number;
    shouldRetry?: (error: any) => boolean;
  } = {}
): Promise<T> {
  const {
    retries = 3,
    delay = 2000,
    backoff = true,
    timeout = 30000,
    shouldRetry = (error) => {
      // Retry on common Prisma errors
      const retryableCodes = [
        'P1001', // Connection refused
        'P1002', // Connection timed out
        'P1017', // Server closed connection
        'P1008', // Connection pool timeout
        'P1009', // Database does not exist
        'P1010', // User denied access
      ];
      return retryableCodes.includes(error?.code) || 
             error?.message?.includes('timeout') ||
             error?.message?.includes('connection');
    }
  } = options;

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await withTimeout(operation(), timeout);
    } catch (error) {
      lastError = error;

      if (!shouldRetry(error) || attempt === retries) {
        throw error;
      }

      const backoffDelay = backoff ? delay * Math.pow(1.5, attempt - 1) : delay;
      
      console.warn(
        `Database operation failed (attempt ${attempt}/${retries}). ` +
        `Retrying in ${backoffDelay}ms...`,
        error
      );

      await new Promise(resolve => setTimeout(resolve, backoffDelay));
    }
  }

  throw lastError;
}

// ============ GRACEFUL SHUTDOWN ============

// Graceful shutdown for production
if (process.env.NODE_ENV === "production") {
  process.on('SIGTERM', async () => {
    console.log('Received SIGTERM, closing database connections...');
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on('beforeExit', async () => {
  console.log('Process exiting, closing database connections...');
  await prisma.$disconnect();
});

// Handle uncaught exceptions
process.on('uncaughtException', async (error) => {
  console.error('Uncaught Exception:', error);
  await prisma.$disconnect();
  process.exit(1);
});

// Handle unhandled rejections
process.on('unhandledRejection', async (reason) => {
  console.error('Unhandled Rejection:', reason);
  await prisma.$disconnect();
  process.exit(1);
});