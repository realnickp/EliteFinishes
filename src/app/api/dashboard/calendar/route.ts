import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { searchParams } = new URL(request.url);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  if (!start || !end) {
    return NextResponse.json({ error: "start and end required" }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("leads")
    .select(
      "id, name, phone, email, service, city_or_zip, status, appointment_date, appointment_notes, canvasser_id"
    )
    .eq("appointment_scheduled", true)
    .gte("appointment_date", start)
    .lte("appointment_date", end)
    .order("appointment_date", { ascending: true });

  if (error) {
    console.error("[CALENDAR GET]", error.message);
    return NextResponse.json({ error: "Failed to load calendar" }, { status: 500 });
  }

  const canvasserIds = Array.from(
    new Set((data ?? []).map((l) => l.canvasser_id).filter(Boolean) as string[])
  );
  const canvasserMap: Record<string, string> = {};
  if (canvasserIds.length > 0) {
    const { data: cs } = await supabase
      .from("canvassers")
      .select("id, name")
      .in("id", canvasserIds);
    for (const c of cs ?? []) canvasserMap[c.id] = c.name;
  }

  const events = (data ?? []).map((l) => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    service: l.service,
    city_or_zip: l.city_or_zip,
    status: l.status,
    appointment_date: l.appointment_date,
    appointment_notes: l.appointment_notes,
    canvasser_name: l.canvasser_id ? canvasserMap[l.canvasser_id] ?? null : null,
  }));

  return NextResponse.json({ events });
}
