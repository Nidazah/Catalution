// src/lib/session.ts
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { cookies } from "next/headers"; // If using Next.js

export const SESSION_COOKIE = "catalution_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days
export const SESSION_TTL_MS = SESSION_TTL_SECONDS * 1000;

// Session payload type
export type SessionPayload = {
  sub: string; // user id
  email: string;
  role: "ADMIN" | "STAFF";
  name?: string;
  permissions?: string[];
};

// Session response type (includes all JWT claims)
export type Session = SessionPayload & {
  exp: number;
  iat: number;
};

function getSecretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET environment variable is not set");
  }
  
  // Ensure minimum length for HS256
  if (secret.length < 32) {
    console.warn(
      "SESSION_SECRET should be at least 32 characters for security"
    );
  }
  
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(
  payload: SessionPayload
): Promise<string> {
  return new SignJWT({
    email: payload.email,
    role: payload.role,
    name: payload.name,
    permissions: payload.permissions,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .setIssuer("catalution")
    .setAudience("catalution-api")
    .sign(getSecretKey());
}

export async function verifySessionToken(
  token: string
): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      issuer: "catalution",
      audience: "catalution-api",
    });
    
    if (!payload.sub || !payload.email || !payload.role) {
      return null;
    }
    
    return {
      sub: payload.sub as string,
      email: payload.email as string,
      role: payload.role as "ADMIN" | "STAFF",
      name: payload.name as string | undefined,
      permissions: payload.permissions as string[] | undefined,
      exp: payload.exp as number,
      iat: payload.iat as number,
    };
  } catch (error) {
    console.error("Session verification failed:", error);
    return null;
  }
}

// Cookie management functions
export function getSessionCookieConfig() {
  const isProduction = process.env.NODE_ENV === "production";
  
  return {
    name: SESSION_COOKIE,
    options: {
      httpOnly: true,
      secure: isProduction,
      sameSite: "lax" as const,
      path: "/",
      maxAge: SESSION_TTL_SECONDS,
      // Domain: process.env.COOKIE_DOMAIN, // For production with subdomains
    },
  };
}

// Next.js helper functions
export async function getSession(): Promise<Session | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch {
    return null;
  }
}

export async function setSession(token: string) {
  const cookieStore = await cookies();
  const { options } = getSessionCookieConfig();
  cookieStore.set(SESSION_COOKIE, token, options);
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

// Helper to check permissions
export function hasPermission(
  session: Session | null,
  requiredPermission: string | string[]
): boolean {
  if (!session) return false;
  
  const permissions = session.permissions || [];
  const required = Array.isArray(requiredPermission) 
    ? requiredPermission 
    : [requiredPermission];
  
  return required.some(p => permissions.includes(p));
}

// Helper to check if user is admin
export function isAdmin(session: Session | null): boolean {
  return session?.role === "ADMIN";
}

// Middleware helper for route protection
export type RouteConfig = {
  public?: boolean;
  roles?: ("ADMIN" | "STAFF")[];
  permissions?: string[];
};

export async function validateRouteAccess(
  token: string | undefined,
  config: RouteConfig = {}
): Promise<{ valid: boolean; session?: Session; error?: string }> {
  // Public routes
  if (config.public) {
    return { valid: true };
  }
  
  // Verify token
  if (!token) {
    return { valid: false, error: "No session token provided" };
  }
  
  const session = await verifySessionToken(token);
  if (!session) {
    return { valid: false, error: "Invalid or expired session" };
  }
  
  // Check roles
  if (config.roles && !config.roles.includes(session.role)) {
    return { valid: false, error: "Insufficient role permissions" };
  }
  
  // Check permissions
  if (config.permissions) {
    const hasRequiredPermission = config.permissions.some(p => 
      session.permissions?.includes(p) || false
    );
    if (!hasRequiredPermission) {
      return { valid: false, error: "Insufficient permissions" };
    }
  }
  
  return { valid: true, session };
}