import { NextResponse } from "next/server";
import { clearCanvasserSessionCookie } from "@/lib/canvasser-auth";

export async function POST() {
  const response = NextResponse.json({ success: true });
  clearCanvasserSessionCookie(response);
  return response;
}
