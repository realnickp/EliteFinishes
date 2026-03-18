import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * Returns an HMAC-signed timestamp token used for spam prevention.
 * Forms fetch this on mount and send it back with the lead submission.
 * The server verifies the signature + checks the elapsed time.
 */

function getSecret(): string {
  // Prefer a dedicated secret; fall back to a deterministic one from Supabase creds
  if (process.env.FORM_TOKEN_SECRET) return process.env.FORM_TOKEN_SECRET;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  return crypto.createHash("sha256").update(`${url}:${key}:form-token-salt`).digest("hex");
}

export function GET() {
  const timestamp = Date.now().toString();
  const hmac = crypto.createHmac("sha256", getSecret()).update(timestamp).digest("hex");
  const token = `${timestamp}.${hmac}`;
  return NextResponse.json({ token });
}
