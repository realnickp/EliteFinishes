import Link from "next/link";
import { cookies } from "next/headers";
import {
  ClipboardPlus,
  List,
  Trophy,
  ArrowRight,
  DoorOpen,
  GraduationCap,
} from "lucide-react";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  CANVASSER_COOKIE,
  parseCanvasserSessionToken,
} from "@/lib/canvasser-auth";

async function getCanvasserName(): Promise<string> {
  try {
    const store = await cookies();
    const parsed = parseCanvasserSessionToken(store.get(CANVASSER_COOKIE)?.value);
    if (!parsed) return "";
    const { data } = await getSupabaseAdmin()
      .from("canvassers")
      .select("name, active")
      .eq("id", parsed.id)
      .maybeSingle();
    if (!data || !data.active) return "";
    return data.name as string;
  } catch {
    return "";
  }
}

export default async function CanvasserHomePage() {
  const name = await getCanvasserName();
  const firstName = name.split(" ")[0] || "there";

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-11 w-11 rounded-xl bg-orange-100 flex items-center justify-center">
          <DoorOpen className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-600">
            Canvasser Portal
          </p>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {firstName}
          </h1>
        </div>
      </div>

      <Link
        href="/canvasser/new"
        className="group block bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30 transition-all mb-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex h-10 w-10 rounded-xl bg-white/15 items-center justify-center mb-3">
              <ClipboardPlus className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white">Submit a new lead</h2>
            <p className="text-sm text-orange-50/90 mt-1">
              Walk the prospect through the quiz and capture their info.
            </p>
          </div>
          <ArrowRight className="h-6 w-6 text-white/80 transition-transform group-hover:translate-x-1" />
        </div>
      </Link>

      <Link
        href="/canvasser/training"
        className="group block bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all mb-3"
      >
        <div className="flex items-start gap-4">
          <div className="h-11 w-11 rounded-xl bg-violet-100 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="h-5 w-5 text-violet-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900">Training & playbook</h3>
            <p className="text-sm text-gray-500 mt-1">
              Door openers, objection scripts, pricing cheat sheet, and safety rules.
            </p>
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400 transition-transform group-hover:translate-x-0.5 mt-1.5" />
        </div>
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Link
          href="/canvasser/leads"
          className="group block bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all"
        >
          <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <List className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900">My leads</h3>
          <p className="text-sm text-gray-500 mt-1">
            Every submission you&apos;ve made with live status.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-3 transition-transform group-hover:translate-x-0.5">
            Open <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        <Link
          href="/canvasser/leaderboard"
          className="group block bg-white rounded-2xl border border-gray-200 shadow-sm p-5 hover:border-orange-300 hover:shadow-md transition-all"
        >
          <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center mb-3">
            <Trophy className="h-5 w-5 text-amber-600" />
          </div>
          <h3 className="font-semibold text-gray-900">Leaderboard</h3>
          <p className="text-sm text-gray-500 mt-1">
            Team ranking by submitted and converted leads.
          </p>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 mt-3 transition-transform group-hover:translate-x-0.5">
            Open <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center mt-8">
        Tip: add this page to your home screen for quick access at the door.
      </p>
    </div>
  );
}
