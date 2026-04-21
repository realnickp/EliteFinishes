import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const supabase = getSupabaseAdmin();
  const stamp = new Date().toISOString();

  // 1. Try the full-shape insert the real /api/leads POST uses.
  const fullInsert = {
    name: `DEBUG PROBE ${stamp}`,
    email: "debug@example.invalid",
    phone: "0000000000",
    service: "Interior Painting",
    city_or_zip: "Debug",
    description: "Test lead inserted by /api/debug/insert-test-lead — safe to delete.",
    timeframe: "Just exploring",
    budget: null,
    status: "new",
    source: "debug",
    score: 0,
    score_factors: {},
    chatbot_qualified: false,
    status_history: [{ status: "new", timestamp: stamp, notes: "debug probe" }],
  };

  const fullResult = await supabase
    .from("leads")
    .insert(fullInsert)
    .select("id")
    .single();

  // 2. Try the minimal-shape insert (matches the fallback in /api/leads).
  const minimalInsert = {
    name: `DEBUG PROBE MIN ${stamp}`,
    email: "debug@example.invalid",
    phone: "0000000000",
    service: "Interior Painting",
    city_or_zip: "Debug",
    description: "Minimal test lead inserted by /api/debug/insert-test-lead — safe to delete.",
    timeframe: "Just exploring",
    budget: null,
    status: "new" as const,
    notes: "debug probe minimal",
  };

  const minResult = await supabase
    .from("leads")
    .insert(minimalInsert)
    .select("id")
    .single();

  return NextResponse.json({
    now: stamp,
    fullInsert: {
      ok: !fullResult.error,
      id: fullResult.data?.id ?? null,
      error: fullResult.error
        ? {
            message: fullResult.error.message,
            details: fullResult.error.details,
            hint: fullResult.error.hint,
            code: fullResult.error.code,
          }
        : null,
    },
    minimalInsert: {
      ok: !minResult.error,
      id: minResult.data?.id ?? null,
      error: minResult.error
        ? {
            message: minResult.error.message,
            details: minResult.error.details,
            hint: minResult.error.hint,
            code: minResult.error.code,
          }
        : null,
    },
  });
}
