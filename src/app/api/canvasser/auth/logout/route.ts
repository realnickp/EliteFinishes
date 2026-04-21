import { NextRequest, NextResponse } from "next/server";
import { clearCanvasserSessionCookie } from "@/lib/canvasser-auth";

export async function POST(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/login", request.url), 303);
  clearCanvasserSessionCookie(response);
  return response;
}
