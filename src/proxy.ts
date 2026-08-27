// src/proxy.ts
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

// Paths that don't require authentication
const PUBLIC_PATHS = [
  "/admin/login",
  "/admin/forgot-password", 
  "/admin/reset-password",
];

// Paths that require admin role (not just any authenticated user)
const ADMIN_ONLY_PATHS = [
  "/admin/settings",
  "/admin/users",
  "/admin/audit",
];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if it's a public path
  const isPublicPath = PUBLIC_PATHS.some(path => pathname === path);
  
  // Check if it's an admin page (excluding public paths)
  const isAdminPage = pathname.startsWith("/admin") && !isPublicPath;

  // If not an admin page, proceed normally
  if (!isAdminPage) {
    return NextResponse.next();
  }

  // Get and verify session token
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const session = token ? await verifySessionToken(token) : null;

  // If no valid session, redirect to login
  if (!session) {
    const loginUrl = new URL("/admin/login", req.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if the path requires admin role
  const requiresAdmin = ADMIN_ONLY_PATHS.some(path => pathname.startsWith(path));
  
  if (requiresAdmin && session.role !== "ADMIN") {
    // Redirect to dashboard with permission error
    const dashboardUrl = new URL("/admin", req.url);
    dashboardUrl.searchParams.set("error", "insufficient_permissions");
    return NextResponse.redirect(dashboardUrl);
  }

  // Add session info to request headers for downstream use
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-user-id", session.sub);
  requestHeaders.set("x-user-role", session.role);
  requestHeaders.set("x-user-email", session.email);

  // Security headers for the admin application. These reduce the impact of
  // accidental content injection and prevent framing/cross-origin surprises.
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  response.headers.set("Content-Security-Policy", "frame-ancestors 'none'; base-uri 'self'; form-action 'self';");

  return response;
}

// Configure which paths the proxy runs on
export const config = {
  matcher: [
    "/admin/:path*", // All admin paths
    // Exclude API routes if needed
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};