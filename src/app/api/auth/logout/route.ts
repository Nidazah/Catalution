// src/app/api/auth/logout/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    // Optional: Verify session exists before clearing
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    
    // Create response
    const res = NextResponse.json({ 
      ok: true, 
      message: "Logged out successfully" 
    });
    
    // Clear the session cookie with the same settings used during login
    res.cookies.set(SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0, // Immediately expire the cookie
    });
    
    // Optional: Clear any other related cookies
    // res.cookies.delete("other-cookie-name");
    
    return res;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { error: "Failed to logout" },
      { status: 500 }
    );
  }
}

// Support both POST and DELETE methods
export async function DELETE(req: NextRequest) {
  return POST(req);
}