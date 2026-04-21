import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";
import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  CANVASSER_COOKIE,
  parseCanvasserSessionToken,
} from "@/lib/canvasser-auth";
import { CanvasserNav } from "@/components/canvasser/CanvasserNav";

export const metadata: Metadata = {
  title: { default: "Canvasser Portal", template: "%s | Elite Finishes Canvasser" },
  robots: { index: false, follow: false },
};

async function getCanvasserName(): Promise<string | null> {
  try {
    const store = await cookies();
    const parsed = parseCanvasserSessionToken(store.get(CANVASSER_COOKIE)?.value);
    if (!parsed) return null;
    const { data } = await getSupabaseAdmin()
      .from("canvassers")
      .select("name, active")
      .eq("id", parsed.id)
      .maybeSingle();
    if (!data || !data.active) return null;
    return data.name as string;
  } catch {
    return null;
  }
}

export default async function CanvasserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const name = await getCanvasserName();
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <CanvasserNav canvasserName={name} />

      <main className="flex-1 overflow-auto pt-14 md:pt-0">{children}</main>

      <Toaster position="top-right" toastOptions={{ duration: 3500 }} />
    </div>
  );
}
