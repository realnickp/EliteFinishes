import { NextRequest, NextResponse } from "next/server";
import { requireCanvasser } from "@/lib/canvasser-auth";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const auth = await requireCanvasser(request);
  if (!auth.ok) return auth.response;
  return NextResponse.json({ canvasser: auth.canvasser });
}
