import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import sharp from "sharp";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { requireCanvasser } from "@/lib/canvasser-auth";
import { consume } from "@/lib/rate-limit";

export const runtime = "nodejs";

const BUCKET = "lead-photos";
const MAX_BYTES = 15 * 1024 * 1024; // raw upload ceiling, resized way down
const ACCEPT = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]);

export async function POST(request: NextRequest) {
  const auth = await requireCanvasser(request);
  if (!auth.ok) return auth.response;
  const canvasser = auth.canvasser;

  // Rate limit: 200 uploads/canvasser/hour (≥ 10 leads × 10 photos buffered)
  if (!consume(`canvasser-upload:${canvasser.id}`, 200, 60 * 60 * 1000)) {
    return NextResponse.json(
      { error: "Too many uploads. Please slow down." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "File too large (max 15MB)" }, { status: 413 });
  }
  if (file.type && !ACCEPT.has(file.type)) {
    return NextResponse.json(
      { error: "Unsupported image type. Use JPG, PNG, HEIC, or WEBP." },
      { status: 415 }
    );
  }

  const input = Buffer.from(await file.arrayBuffer());

  let resized: Buffer;
  try {
    resized = await sharp(input, { failOn: "none" })
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 85, mozjpeg: true })
      .toBuffer();
  } catch (err) {
    console.error("[CANVASSER UPLOAD] sharp failed:", err);
    return NextResponse.json({ error: "Could not process image" }, { status: 400 });
  }

  const path = `${canvasser.id}/${randomUUID()}.jpg`;
  const supabase = getSupabaseAdmin();
  const { error: uploadErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, resized, {
      contentType: "image/jpeg",
      cacheControl: "31536000",
      upsert: false,
    });

  if (uploadErr) {
    console.error("[CANVASSER UPLOAD] storage upload failed:", uploadErr.message);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }

  const { data: publicUrl } = supabase.storage.from(BUCKET).getPublicUrl(path);

  return NextResponse.json({
    url: publicUrl.publicUrl,
    path,
    size: resized.length,
  });
}
