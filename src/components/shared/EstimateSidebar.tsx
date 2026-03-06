"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ChevronDown, FileText, Clock, Shield } from "lucide-react";
import { LeadForm } from "./LeadForm";
import { SITE } from "@/lib/constants";

interface EstimateSidebarProps {
  serviceTitle: string;
  serviceSlug: string;
}

export function EstimateSidebar({ serviceTitle, serviceSlug }: EstimateSidebarProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Primary: Project Builder CTA */}
      <div className="rounded-2xl bg-primary p-6 shadow-lg">
        <div className="flex items-center gap-2.5 mb-4">
          <Sparkles className="h-5 w-5 text-white/70" />
          <h3 className="font-bold text-lg text-white">Project Builder</h3>
        </div>
        <p className="text-sm text-white/60 mb-5 leading-relaxed">
          Tell us about your {serviceTitle.toLowerCase()} project in a few guided steps. We&apos;ll prepare a personalized estimate tailored to your needs.
        </p>
        <Link
          href={`/quote/quiz?service=${serviceSlug}`}
          className="flex items-center justify-center gap-2 w-full bg-white text-primary font-semibold py-3.5 px-4 rounded-xl hover:bg-white/90 transition-all text-sm"
        >
          Start Project Builder
          <ArrowRight className="h-4 w-4" />
        </Link>
        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-white/40">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> 2 min</span>
          <span className="flex items-center gap-1"><Shield className="h-3 w-3" /> No obligation</span>
        </div>
      </div>

      {/* Secondary: Collapsible form */}
      <div className="rounded-2xl border border-border/50 bg-white shadow-sm overflow-hidden">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-muted/30 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted/50">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">Prefer a form?</p>
              <p className="text-xs text-muted-foreground">Fill out the estimate request directly</p>
            </div>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${formOpen ? "rotate-180" : ""}`}
          />
        </button>
        <div
          className={`grid transition-all duration-300 ease-in-out ${formOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-5 border-t border-border/30 pt-4">
              <LeadForm preselectedService={serviceTitle} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
