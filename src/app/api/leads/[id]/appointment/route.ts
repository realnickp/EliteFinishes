import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const BodySchema = z.object({
  appointment_date: z.string().datetime({ offset: true }).nullable(),
  appointment_notes: z.string().max(1000).nullable().optional(),
});

type StatusHistoryEntry = {
  status: string;
  timestamp: string;
  notes?: string;
};

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await context.params;
  let body;
  try {
    body = BodySchema.parse(await request.json());
  } catch (err) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const { data: existing, error: fetchErr } = await supabase
    .from("leads")
    .select("id, status, status_history")
    .eq("id", id)
    .maybeSingle();

  if (fetchErr || !existing) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  const history: StatusHistoryEntry[] = Array.isArray(existing.status_history)
    ? (existing.status_history as StatusHistoryEntry[])
    : [];

  const now = new Date().toISOString();
  const updates: Record<string, unknown> = {
    updated_at: now,
  };

  if (body.appointment_date) {
    updates.appointment_scheduled = true;
    updates.appointment_date = body.appointment_date;
    if (body.appointment_notes !== undefined) {
      updates.appointment_notes = body.appointment_notes;
    }
    if (existing.status !== "scheduled") {
      updates.status = "scheduled";
      history.push({
        status: "scheduled",
        timestamp: now,
        notes: `Appointment booked for ${body.appointment_date}`,
      });
      updates.status_history = history;
    }
  } else {
    updates.appointment_scheduled = false;
    updates.appointment_date = null;
    // Don't regress status — just clear the booking.
  }

  const { error: updateErr } = await supabase
    .from("leads")
    .update(updates)
    .eq("id", id);

  if (updateErr) {
    console.error("[APPOINTMENT PATCH]", updateErr.message);
    return NextResponse.json({ error: "Failed to update appointment" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
