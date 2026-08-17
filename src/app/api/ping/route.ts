// src/app/api/ping/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("Pinging database to wake it up...");
    
    // Simple query to wake up the database
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    
    return NextResponse.json({ 
      status: "alive", 
      timestamp: new Date().toISOString(),
      result
    });
  } catch (error) {
    console.error("Ping error:", error);
    return NextResponse.json(
      { status: "error", message: String(error) },
      { status: 500 }
    );
  }
}