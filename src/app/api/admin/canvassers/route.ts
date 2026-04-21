import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { hashPassword } from "@/lib/canvasser-auth";

export const runtime = "nodejs";

const CreateSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().email().max(254),
  phone: z.string().trim().max(30).optional().nullable(),
  password: z.string().min(8).max(200),
});

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const supabase = getSupabaseAdmin();
  const { data: canvassers, error } = await supabase
    .from("canvassers")
    .select("id, name, email, phone, active, created_at, last_login_at")
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: "Failed to load canvassers" }, { status: 500 });
  }

  const ids = (canvassers ?? []).map((c) => c.id);
  const counts: Record<string, number> = {};
  if (ids.length > 0) {
    const { data: leadRows } = await supabase
      .from("leads")
      .select("canvasser_id")
      .in("canvasser_id", ids);
    for (const row of leadRows ?? []) {
      if (row.canvasser_id) counts[row.canvasser_id] = (counts[row.canvasser_id] ?? 0) + 1;
    }
  }

  return NextResponse.json({
    canvassers: (canvassers ?? []).map((c) => ({
      ...c,
      lead_count: counts[c.id] ?? 0,
    })),
  });
}

export async function POST(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  let body;
  try {
    body = CreateSchema.parse(await request.json());
  } catch (err) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  const supabase = getSupabaseAdmin();

  const { data: existing } = await supabase
    .from("canvassers")
    .select("id")
    .ilike("email", email)
    .maybeSingle();

  if (existing) {
    return NextResponse.json(
      { error: "A canvasser with that email already exists." },
      { status: 409 }
    );
  }

  const password_hash = await hashPassword(body.password);
  const { data, error } = await supabase
    .from("canvassers")
    .insert({
      name: body.name.trim(),
      email,
      phone: body.phone?.trim() || null,
      password_hash,
      active: true,
    })
    .select("id, name, email, phone, active, created_at, last_login_at")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Failed to create canvasser" }, { status: 500 });
  }

  return NextResponse.json({ canvasser: { ...data, lead_count: 0 } }, { status: 201 });
}
