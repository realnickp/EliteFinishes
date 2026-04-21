import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const PatchSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    email: z.string().email().max(254).optional(),
    phone: z.string().trim().max(30).nullable().optional(),
    active: z.boolean().optional(),
  })
  .refine((v) => Object.keys(v).length > 0, { message: "No changes provided" });

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await context.params;

  let body;
  try {
    body = PatchSchema.parse(await request.json());
  } catch (err) {
    const message =
      err instanceof z.ZodError ? err.issues[0]?.message : "Invalid request";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  const updates: Record<string, unknown> = {};
  if (body.name !== undefined) updates.name = body.name.trim();
  if (body.phone !== undefined) updates.phone = body.phone?.trim() || null;
  if (body.active !== undefined) updates.active = body.active;
  if (body.email !== undefined) {
    const email = body.email.trim().toLowerCase();
    const { data: dup } = await supabase
      .from("canvassers")
      .select("id")
      .ilike("email", email)
      .neq("id", id)
      .maybeSingle();
    if (dup) {
      return NextResponse.json(
        { error: "Another canvasser already uses that email." },
        { status: 409 }
      );
    }
    updates.email = email;
  }

  const { data, error } = await supabase
    .from("canvassers")
    .update(updates)
    .eq("id", id)
    .select("id, name, email, phone, active, created_at, last_login_at")
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "Canvasser not found" }, { status: 404 });
  }

  return NextResponse.json({ canvasser: data });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth(request);
  if (authError) return authError;

  const { id } = await context.params;
  const supabase = getSupabaseAdmin();

  const { count } = await supabase
    .from("leads")
    .select("id", { count: "exact", head: true })
    .eq("canvasser_id", id);

  if ((count ?? 0) > 0) {
    return NextResponse.json(
      {
        error:
          "This canvasser has leads attributed to them. Deactivate the account instead to preserve attribution.",
      },
      { status: 409 }
    );
  }

  const { error } = await supabase.from("canvassers").delete().eq("id", id);
  if (error) {
    return NextResponse.json({ error: "Failed to delete canvasser" }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
