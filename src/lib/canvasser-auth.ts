import { createHmac, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const CANVASSER_COOKIE = "canvasser_session";
const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 30;

export type CanvasserIdentity = {
  id: string;
  name: string;
  email: string;
};

function getSessionSecret(): string {
  return (
    process.env.CANVASSER_SESSION_SECRET ||
    process.env.FORM_TOKEN_SECRET ||
    process.env.DASHBOARD_PASSWORD ||
    "canvasser-fallback-secret-change-in-prod"
  );
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  try {
    return await bcrypt.compare(plain, hash);
  } catch {
    return false;
  }
}

function signatureFor(canvasserId: string, passwordHash: string): string {
  const payload = `${canvasserId}:${passwordHash.slice(0, 16)}`;
  return createHmac("sha256", getSessionSecret()).update(payload).digest("hex");
}

export function generateCanvasserSessionToken(
  canvasserId: string,
  passwordHash: string
): string {
  return `${canvasserId}.${signatureFor(canvasserId, passwordHash)}`;
}

export function parseCanvasserSessionToken(
  cookieValue: string | undefined
): { id: string; sig: string } | null {
  if (!cookieValue) return null;
  const match = cookieValue.match(/^([0-9a-f-]{36})\.([0-9a-f]{64})$/);
  if (!match) return null;
  return { id: match[1], sig: match[2] };
}

export function setCanvasserSessionCookie(
  response: NextResponse,
  token: string
): void {
  response.cookies.set(CANVASSER_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE_SEC,
    path: "/",
  });
}

export function clearCanvasserSessionCookie(response: NextResponse): void {
  response.cookies.set(CANVASSER_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
}

function sigMatches(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a, "hex"), Buffer.from(b, "hex"));
  } catch {
    return false;
  }
}

export async function requireCanvasser(
  request: NextRequest
): Promise<
  | { ok: true; canvasser: CanvasserIdentity }
  | { ok: false; response: NextResponse }
> {
  const cookie = request.cookies.get(CANVASSER_COOKIE)?.value;
  const parsed = parseCanvasserSessionToken(cookie);
  if (!parsed) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("canvassers")
    .select("id, name, email, password_hash, active")
    .eq("id", parsed.id)
    .maybeSingle();

  if (error || !data || !data.active) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const expected = signatureFor(data.id, data.password_hash);
  if (!sigMatches(parsed.sig, expected)) {
    return { ok: false, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  return {
    ok: true,
    canvasser: { id: data.id, name: data.name, email: data.email },
  };
}
