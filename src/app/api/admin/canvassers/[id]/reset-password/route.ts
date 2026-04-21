import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAuth } from "@/lib/auth";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { hashPassword } from "@/lib/canvasser-auth";

export const runtime = "nodejs";

const BodySchema = z.object({
  password: z.string().min(8).max(200),
});

export async function POST(
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

  const password_hash = await hashPassword(body.password);
  const supabase = getSupabaseAdmin();

  const { error } = await supabase
    .from("canvassers")
    .update({ password_hash })
    .eq("id", id);

  if (error) {
    return NextResponse.json({ error: "Canvasser not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
