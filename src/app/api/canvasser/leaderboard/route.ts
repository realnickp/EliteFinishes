import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireCanvasser } from "@/lib/canvasser-auth";

export const runtime = "nodejs";

type Period = "week" | "month" | "all";

const CONVERTED_STATUSES = ["scheduled", "quoted", "completed"] as const;

function periodStart(period: Period): string | null {
  const now = Date.now();
  if (period === "week") return new Date(now - 7 * 86400000).toISOString();
  if (period === "month") return new Date(now - 30 * 86400000).toISOString();
  return null;
}

export async function GET(request: NextRequest) {
  const auth = await requireCanvasser(request);
  if (!auth.ok) return auth.response;

  const { searchParams } = new URL(request.url);
  const period = (searchParams.get("period") || "week") as Period;
  const start = periodStart(period);

  const supabase = getSupabaseAdmin();

  let query = supabase
    .from("leads")
    .select("canvasser_id, status, created_at")
    .not("canvasser_id", "is", null);

  if (start) query = query.gte("created_at", start);

  const { data: rows, error } = await query;
  if (error) {
    console.error("[LEADERBOARD]", error.message);
    return NextResponse.json({ error: "Failed to load leaderboard" }, { status: 500 });
  }

  const stats = new Map<string, { submitted: number; converted: number }>();
  for (const row of rows ?? []) {
    const id = row.canvasser_id as string | null;
    if (!id) continue;
    const bucket = stats.get(id) ?? { submitted: 0, converted: 0 };
    bucket.submitted += 1;
    if (CONVERTED_STATUSES.includes(row.status as typeof CONVERTED_STATUSES[number])) {
      bucket.converted += 1;
    }
    stats.set(id, bucket);
  }

  const ids = Array.from(stats.keys());
  if (ids.length === 0) {
    return NextResponse.json({ period, rows: [], me: auth.canvasser.id });
  }

  const { data: canvassers } = await supabase
    .from("canvassers")
    .select("id, name, active")
    .in("id", ids);

  const nameMap = new Map<string, string>();
  for (const c of canvassers ?? []) nameMap.set(c.id, c.name);

  const leaderboardRows = ids
    .map((id) => ({
      canvasser_id: id,
      name: nameMap.get(id) ?? "Unknown",
      submitted: stats.get(id)?.submitted ?? 0,
      converted: stats.get(id)?.converted ?? 0,
    }))
    .sort((a, b) => {
      if (b.submitted !== a.submitted) return b.submitted - a.submitted;
      return b.converted - a.converted;
    })
    .map((row, i) => ({ ...row, rank: i + 1 }));

  return NextResponse.json({
    period,
    rows: leaderboardRows,
    me: auth.canvasser.id,
  });
}
