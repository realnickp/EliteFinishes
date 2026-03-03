"use client";

import { useState } from "react";
import { X, Shield, FileText, Clock, DollarSign } from "lucide-react";

const HFS_APPLY_URL = "https://apply.hfsfinancial.net/prequalification?contractor_name=Elite%20Finishes%20Inc.%20-%20Sykesville%2C%20MD&promo_code=6706b64ac3bb21107c7cdafb&intermediary_id=6706b64ac3bb21107c7cdafb";

export function FinancingModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <span onClick={() => setOpen(true)} className="cursor-pointer">
        {children}
      </span>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-full h-full sm:h-auto sm:max-w-2xl bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-brand-green to-brand-green-dark text-white shrink-0">
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5" />
                <div>
                  <p className="font-bold text-sm">Finance Your Project</p>
                  <p className="text-xs text-white/70">
                    Powered by HFS Financial &middot; No credit impact
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2.5 hover:bg-white/20 rounded-lg transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              <h3 className="text-xl font-bold mb-2">Home Improvement Financing</h3>
              <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                Through our partnership with HFS Financial, you can finance your painting
                or remodeling project with personal loans up to $300,000. Fixed rates as
                low as 7.8%, terms up to 20 years, and no home equity required.
              </p>

              <div className="grid gap-3 sm:grid-cols-2 mb-6">
                {[
                  { icon: Shield, label: "No credit impact to inquire" },
                  { icon: Clock, label: "Same-day qualifications" },
                  { icon: FileText, label: "No home equity required" },
                  { icon: DollarSign, label: "No prepayment penalties" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <item.icon className="h-4 w-4 text-brand-green flex-shrink-0" />
                    <span className="text-foreground/80">{item.label}</span>
                  </div>
                ))}
              </div>

              <a
                href={HFS_APPLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3.5 bg-gradient-to-r from-brand-green to-brand-green-dark text-white font-bold rounded-xl hover:opacity-90 transition-opacity mb-3"
              >
                Check Your Rate Now
              </a>
              <a
                href="/financing"
                className="block w-full text-center px-6 py-3 border border-border/50 text-foreground/70 font-medium rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Learn More About Financing
              </a>
            </div>

            <div className="flex items-center justify-center gap-5 px-5 py-3 bg-gray-50 border-t border-border/30 text-xs text-muted-foreground shrink-0 safe-bottom">
              <span className="flex items-center gap-1">
                <Shield className="h-3 w-3" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3 w-3" /> No hard credit pull
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" /> Funds in 48 hours
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
