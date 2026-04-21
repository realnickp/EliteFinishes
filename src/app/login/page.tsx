import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, DoorOpen, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Sign In",
  robots: { index: false, follow: false },
};

export default function LoginChooserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <Image
            src="/images/logo.png"
            alt={SITE.name}
            width={160}
            height={60}
            className="h-12 w-auto mx-auto mb-4 brightness-125"
          />
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 mb-1">
            {SITE.name}
          </p>
          <h1 className="text-2xl font-bold text-white">Who&apos;s signing in?</h1>
          <p className="text-sm text-gray-400 mt-1">
            Pick the login that matches your role.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/dashboard/login"
            className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl bg-gray-900/80 backdrop-blur border border-gray-800 hover:border-orange-500 hover:bg-gray-900 transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/40 flex items-center justify-center">
              <ShieldCheck className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-orange-400">
                Admin
              </p>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Dashboard login
              </h2>
              <p className="text-sm text-gray-400 mt-1 leading-snug">
                Leads, pipeline, calendar, canvasser management.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 mt-auto">
              Go to admin
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>

          <Link
            href="/canvasser/login"
            className="group relative flex flex-col items-start gap-3 p-5 rounded-2xl bg-gray-900/80 backdrop-blur border border-gray-800 hover:border-orange-500 hover:bg-gray-900 transition-all"
          >
            <div className="h-11 w-11 rounded-xl bg-orange-500/15 ring-1 ring-orange-500/40 flex items-center justify-center">
              <DoorOpen className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-orange-400">
                Door-to-door
              </p>
              <h2 className="text-lg font-bold text-white mt-0.5">
                Canvasser login
              </h2>
              <p className="text-sm text-gray-400 mt-1 leading-snug">
                Submit leads from the field, see your status and ranking.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-orange-400 mt-auto">
              Go to canvasser
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Canvassers: forgot your password? Ask your admin to reset it.
        </p>
      </div>
    </div>
  );
}
