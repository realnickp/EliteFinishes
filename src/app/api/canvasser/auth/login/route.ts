import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { consume, getClientIp } from "@/lib/rate-limit";
import {
  generateCanvasserSessionToken,
  setCanvasserSessionCookie,
  verifyPassword,
} from "@/lib/canvasser-auth";

export const runtime = "nodejs";

const BodySchema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(200),
});

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (!consume(`canvasser-login:${ip}`, 10, 15 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      { status: 429 }
    );
  }

  let parsed;
  try {
    parsed = BodySchema.parse(await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const email = parsed.email.trim().toLowerCase();
  const supabase = getSupabaseAdmin();
  const { data: canvasser } = await supabase
    .from("canvassers")
    .select("id, name, email, password_hash, active")
    .ilike("email", email)
    .maybeSingle();

  if (!canvasser || !canvasser.active) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const ok = await verifyPassword(parsed.password, canvasser.password_hash);
  if (!ok) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  await supabase
    .from("canvassers")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", canvasser.id);

  const token = generateCanvasserSessionToken(canvasser.id, canvasser.password_hash);
  const response = NextResponse.json({
    success: true,
    canvasser: { id: canvasser.id, name: canvasser.name, email: canvasser.email },
  });
  setCanvasserSessionCookie(response, token);
  return response;
}
