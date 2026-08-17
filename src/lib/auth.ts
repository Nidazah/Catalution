// src/lib/auth.ts

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  SESSION_COOKIE,
  verifySessionToken,
  createSessionToken,
  type Session,
  type SessionPayload,
} from "@/lib/session";

// ============================================================
// SESSION HELPERS
// ============================================================

export async function getSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) {
    return null;
  }

  return verifySessionToken(token);
}

export async function getSessionUser(): Promise<SessionPayload | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return {
    sub: session.sub,
    email: session.email,
    role: session.role,
    name: session.name,
    permissions: session.permissions,
  };
}

// ============================================================
// AUTHENTICATION HELPERS
// ============================================================

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return !!session;
}

export async function isStaff(): Promise<boolean> {
  const session = await getSession();

  return (
    !!session &&
    (session.role === "STAFF" || session.role === "ADMIN")
  );
}

export async function isAdmin(): Promise<boolean> {
  const session = await getSession();

  return !!session && session.role === "ADMIN";
}

// ============================================================
// AUTHORIZATION HELPERS
// ============================================================

export type Role = "ADMIN" | "STAFF";

export async function hasRole(
  requiredRole: Role | Role[],
): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  const roles = Array.isArray(requiredRole)
    ? requiredRole
    : [requiredRole];

  return roles.includes(session.role);
}

export async function hasPermission(
  requiredPermission: string | string[],
): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return false;
  }

  const permissions = session.permissions || [];

  const required = Array.isArray(requiredPermission)
    ? requiredPermission
    : [requiredPermission];

  return required.some((permission) =>
    permissions.includes(permission),
  );
}

// ============================================================
// API ROUTE GUARDS
// ============================================================

export async function requireAuth(): Promise<
  Session | NextResponse
> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
      },
      {
        status: 401,
      },
    );
  }

  return session;
}

export async function requireStaff(): Promise<
  Session | NextResponse
> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
      },
      {
        status: 401,
      },
    );
  }

  if (
    session.role !== "STAFF" &&
    session.role !== "ADMIN"
  ) {
    return NextResponse.json(
      {
        error: "Staff access required",
      },
      {
        status: 403,
      },
    );
  }

  return session;
}

export async function requireAdmin(): Promise<
  Session | NextResponse
> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
      },
      {
        status: 401,
      },
    );
  }

  if (session.role !== "ADMIN") {
    return NextResponse.json(
      {
        error: "Admin access required",
      },
      {
        status: 403,
      },
    );
  }

  return session;
}

export async function requirePermission(
  permission: string | string[],
): Promise<Session | NextResponse> {
  const session = await getSession();

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
      },
      {
        status: 401,
      },
    );
  }

  const permissions = session.permissions || [];

  const required = Array.isArray(permission)
    ? permission
    : [permission];

  const allowed = required.some((p) =>
    permissions.includes(p),
  );

  if (!allowed) {
    return NextResponse.json(
      {
        error: "Insufficient permissions",
      },
      {
        status: 403,
      },
    );
  }

  return session;
}

// ============================================================
// MIDDLEWARE
// ============================================================

export async function validateSessionForMiddleware(
  token: string | undefined,
): Promise<{
  valid: boolean;
  session?: Session;
}> {
  if (!token) {
    return {
      valid: false,
    };
  }

  try {
    const session = await verifySessionToken(token);

    if (!session) {
      return {
        valid: false,
      };
    }

    return {
      valid: true,
      session,
    };
  } catch {
    return {
      valid: false,
    };
  }
}

// ============================================================
// SESSION REFRESH
// ============================================================

export async function refreshSession(): Promise<string | null> {
  const session = await getSession();

  if (!session) {
    return null;
  }

  const payload: SessionPayload = {
    sub: session.sub,
    email: session.email,
    role: session.role,
    name: session.name,
    permissions: session.permissions,
  };

  return createSessionToken(payload);
}

// ============================================================
// UTILITY HELPERS
// ============================================================

export async function getCurrentUser(): Promise<Session> {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }

  return session;
}

export async function isSessionExpiring(): Promise<boolean> {
  const session = await getSession();

  if (!session) {
    return true;
  }

  const fiveMinutes = 5 * 60 * 1000;

  const timeUntilExpiry =
    session.exp * 1000 - Date.now();

  return timeUntilExpiry < fiveMinutes;
}