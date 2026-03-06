"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ClipboardList, ChevronDown, FileText } from "lucide-react";
import { LeadForm } from "./LeadForm";

interface EstimateSidebarProps {
  serviceTitle: string;
  serviceSlug: string;
}

export function EstimateSidebar({ serviceTitle, serviceSlug }: EstimateSidebarProps) {
  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Primary: Project Builder CTA */}
      <div className="rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/5 to-brand/10 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-brand/15">
            <ClipboardList className="h-5 w-5 text-brand" />
          </div>
          <h3 className="font-bold text-lg">Project Builder</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          Answer a few quick questions about your {serviceTitle.toLowerCase()} project and we&apos;ll prepare a personalized estimate — takes about 2 minutes.
        </p>
        <Link
          href={`/quote/quiz?service=${serviceSlug}`}
          className="flex items-center justify-center gap-2 w-full bg-gradient-to-br from-brand to-brand-dark text-white font-semibold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-brand/25 transition-all text-sm"
        >
          Start Project Builder
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Secondary: Collapsible form */}
      <div className="rounded-2xl border border-border/50 bg-warm-bg shadow-sm overflow-hidden">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="flex items-center justify-between w-full p-5 text-left cursor-pointer hover:bg-warm-bg/80 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-muted">
              <FileText className="h-4 w-4 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold text-sm">Prefer a form?</p>
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
            <div className="px-5 pb-5">
              <LeadForm preselectedService={serviceTitle} compact />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
