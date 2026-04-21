import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mask(v: string | undefined): string {
  if (!v) return "MISSING";
  if (v.length <= 8) return `SET(len=${v.length})`;
  return `SET(len=${v.length}, prefix=${v.slice(0, 4)}…, suffix=…${v.slice(-2)})`;
}

export async function GET(request: NextRequest) {
  // Admin-only — don't leak env presence publicly.
  const authError = requireAuth(request);
  if (authError) return authError;

  return NextResponse.json({
    now: new Date().toISOString(),
    runtime: "nodejs",
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV ?? null,
    VERCEL_GIT_COMMIT_SHA: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    RESEND_API_KEY: mask(process.env.RESEND_API_KEY),
    EMAIL_FROM: process.env.EMAIL_FROM ?? "MISSING",
    EMAIL_NOTIFY_TO_raw: process.env.EMAIL_NOTIFY_TO ?? "MISSING",
    EMAIL_NOTIFY_TO_parsed: (process.env.EMAIL_NOTIFY_TO || "")
      .split(",")
      .map((e) => e.trim())
      .filter(Boolean),
    TWILIO_ACCOUNT_SID: mask(process.env.TWILIO_ACCOUNT_SID),
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER ?? "MISSING",
    ADMIN_PHONE: process.env.ADMIN_PHONE ?? "MISSING",
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "MISSING",
    SUPABASE_SERVICE_ROLE_KEY: mask(process.env.SUPABASE_SERVICE_ROLE_KEY),
    FORM_TOKEN_SECRET: mask(process.env.FORM_TOKEN_SECRET),
    DASHBOARD_PASSWORD: mask(process.env.DASHBOARD_PASSWORD),
    CANVASSER_SESSION_SECRET: mask(process.env.CANVASSER_SESSION_SECRET),
  });
}
