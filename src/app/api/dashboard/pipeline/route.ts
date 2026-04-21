import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import { PIPELINE_STAGES, STATUS_LABELS } from "@/lib/dashboard-types";
import { requireAuth } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const authError = requireAuth(request);
  if (authError) return authError;

  try {
    const supabase = getSupabaseAdmin();

    const { data: rawLeads, error } = await supabase
      .from("leads")
      .select(
        "id, name, phone, service, city_or_zip, status, score, quote_amount, canvasser_id, source, created_at, updated_at"
      )
      .in("status", [...PIPELINE_STAGES, "lost"])
      .order("score", { ascending: false });

    if (error) throw error;

    type PipelineLead = {
      id: string;
      name: string;
      phone: string;
      service: string;
      city_or_zip: string;
      status: string;
      score: number;
      quote_amount: number | null;
      canvasser_id?: string | null;
      source?: string | null;
      created_at: string;
      updated_at: string;
      canvasser?: { id: string; name: string };
    };

    const leads = (rawLeads || []) as PipelineLead[];

    const canvasserIds = Array.from(
      new Set(
        leads
          .map((l) => l.canvasser_id)
          .filter((v): v is string => typeof v === "string" && v.length > 0)
      )
    );
    if (canvasserIds.length > 0) {
      const { data: cs } = await supabase
        .from("canvassers")
        .select("id, name")
        .in("id", canvasserIds);
      const nameById = new Map<string, string>();
      for (const c of cs ?? []) nameById.set(c.id, c.name);
      for (const lead of leads) {
        const cid = lead.canvasser_id;
        if (cid && nameById.has(cid)) {
          lead.canvasser = { id: cid, name: nameById.get(cid) ?? "" };
        }
      }
    }

    const pipeline = PIPELINE_STAGES.map((status) => {
      const stageLeads = leads.filter((l) => l.status === status);
      const totalValue = stageLeads.reduce((sum, l) => sum + (l.quote_amount || 0), 0);
      return {
        status,
        label: STATUS_LABELS[status],
        count: stageLeads.length,
        total_value: totalValue,
        leads: stageLeads,
      };
    });

    const lostLeads = leads.filter((l) => l.status === "lost");
    pipeline.push({
      status: "lost",
      label: "Lost",
      count: lostLeads.length,
      total_value: 0,
      leads: lostLeads,
    });

    return NextResponse.json({ pipeline });
  } catch (err) {
    console.error("GET /api/dashboard/pipeline error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
