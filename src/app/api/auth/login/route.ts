// src/app/api/auth/login/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/password";
import {
  createSessionToken,
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  type SessionPayload,
} from "@/lib/session";

// ============ SCHEMAS ============

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const adminLoginSchema = z.object({
  password: z.string().min(1),
});

// ============ AUTHENTICATION FUNCTIONS ============

async function authenticateAdmin(password: string) {
  try {
    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@catalution.com";


    const user = await prisma.user.findUnique({
      where: {
        email: adminEmail,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    });


    if (!user) {
      console.error(`Admin user not found: ${adminEmail}`);
      return {
        success: false,
        error: "Admin account not found.",
      };
    }


    if (user.role !== "ADMIN") {
      console.error(`User ${adminEmail} is not an ADMIN.`);
      return {
        success: false,
        error: "User is not an administrator.",
      };
    }


    const valid = await verifyPassword(password, user.password);


    if (!valid) {
      return {
        success: false,
        error: "Incorrect password.",
      };
    }


    const { password: _, ...userWithoutPassword } = user;


    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Admin authentication error:", error);


    return {
      success: false,
      error: "An error occurred during authentication.",
    };
  }
}

async function authenticateUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ 
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      }
    });
    
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const valid = await verifyPassword(password, user.password);
    if (!valid) {
      return { success: false, error: "Invalid email or password." };
    }

    // Remove password from user object
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      success: true,
      user: userWithoutPassword,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return { success: false, error: "An error occurred during authentication." };
  }
}

// ============ SESSION HELPERS ============

function setSessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

// ============ MAIN API ROUTE ============

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: "Invalid request body." },
        { status: 400 }
      );
    }

    // Determine login type by checking if email is provided
    const hasEmail = body.email && typeof body.email === 'string';
    
    if (hasEmail) {
      // User login
      const parsed = loginSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Invalid email or password format." },
          { status: 400 }
        );
      }

      const { email, password } = parsed.data;
      const result = await authenticateUser(email, password);

      if (!result.success || !result.user) {
        return NextResponse.json(
          { error: result.error || "Invalid email or password." },
          { status: 401 }
        );
      }

      const sessionPayload: SessionPayload = {
        sub: result.user.id,
        email: result.user.email,
        role: result.user.role,
        name: result.user.name || undefined,
      };

      const token = await createSessionToken(sessionPayload);
      const response = NextResponse.json({
        ok: true,
        user: result.user,
        loginType: "user",
      });

      setSessionCookie(response, token);
      return response;
    } else {
      // Admin login (no email provided)
      const parsed = adminLoginSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { error: "Password is required." },
          { status: 400 }
        );
      }

      const result = await authenticateAdmin(parsed.data.password);


      if (!result.success || !result.user) {
        return NextResponse.json(
          { error: result.error || "Incorrect password." },
          { status: 401 }
        );
      }


      // Create admin session from the database user
      const sessionPayload: SessionPayload = {
        sub: result.user.id,
        email: result.user.email,
        role: result.user.role,
        name: result.user.name || undefined,
      };

      const token = await createSessionToken(sessionPayload);


      const response = NextResponse.json({
        ok: true,
        user: result.user,
        loginType: "admin",
      });

      setSessionCookie(response, token);
      return response;
    }
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

// ============ LOGOUT ROUTE ============

export async function DELETE(req: NextRequest) {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}