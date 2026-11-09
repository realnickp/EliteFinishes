import { Phone, Wallet } from "lucide-react";
import { SITE } from "@/lib/constants";
import type { LandingConfig } from "@/lib/lp-landing";
import { FinancingModal } from "@/components/shared/FinancingModal";
import { ContactButton, EstimateButton } from "./ActionButtons";

const btn =
  "inline-flex min-h-[54px] cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-base font-bold transition-colors active:scale-[0.98]";

// ── Gift card offer: a generic $500 gift card ───────────────────────────────
// Deliberately brand-free: no restaurant, store or card network names or logos.

function GiftCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex aspect-[1.586] w-[270px] flex-col justify-between overflow-hidden rounded-xl border border-[#d2ae6d]/45 bg-gradient-to-br from-[#1f3a30] to-[#0d1a15] p-5 text-[#f7ecda] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)] sm:w-[380px] sm:p-7 ${className}`}
    >
      {/* Ribbon, like a wrapped gift. Kept left of the right-aligned text. */}
      <span className="absolute inset-y-0 left-[20%] w-3 bg-[#d2ae6d]/75 sm:w-4" />
      <span className="absolute inset-x-0 top-[32%] h-3 bg-[#d2ae6d]/75 sm:h-4" />
      <p className="relative text-right text-[11px] font-semibold uppercase tracking-[0.32em] text-[#d2ae6d] sm:text-xs">
        Gift card
      </p>
      <div className="relative text-right">
        <p className="font-display text-5xl leading-none text-[#d2ae6d] sm:text-6xl">$500</p>
        <p className="mt-1.5 text-[11px] leading-snug text-[#f7ecda]/70">When you book your remodel</p>
      </div>
    </div>
  );
}

function GiftCardVisual() {
  return (
    <div className="mx-auto flex w-fit items-center justify-center py-6" aria-hidden>
      <GiftCard className="-rotate-[4deg]" />
    </div>
  );
}

// ── Paint offer: a fan of paint chips ────────────────────────────────────────

function PaintChip({
  color,
  name,
  code,
  className = "",
  children,
}: {
  color: string;
  name: string;
  code: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`flex h-[250px] w-[170px] flex-col overflow-hidden rounded-md bg-white shadow-[0_24px_50px_-12px_rgba(0,0,0,0.55)] sm:h-[300px] sm:w-[205px] ${className}`}
    >
      <div className="flex flex-1 flex-col justify-end p-4 text-white" style={{ backgroundColor: color }}>
        {children}
      </div>
      <div className="px-4 py-3 text-[#1b1b1b]">
        <p className="text-sm font-bold leading-tight">{name}</p>
        <p className="text-[11px] text-black/50">{code}</p>
      </div>
    </div>
  );
}

function PaintVisual() {
  return (
    <div className="relative mx-auto h-[290px] w-[300px] sm:h-[350px] sm:w-[400px]" aria-hidden>
      <PaintChip color="#a9553f" name="Rowhome Brick" code="EF 03" className="absolute right-0 top-3 rotate-[12deg]" />
      <PaintChip color="#93a58e" name="Patapsco Sage" code="EF 02" className="absolute left-1/2 top-1 -translate-x-1/2 rotate-[3deg]" />
      <PaintChip color="#24505a" name="Harbor Teal" code="EF 01" className="absolute bottom-0 left-0 -rotate-[7deg]">
        <p className="font-display text-6xl leading-none sm:text-7xl">10%</p>
        <p className="mt-1 text-lg font-bold">off your project</p>
      </PaintChip>
    </div>
  );
}

// ── Section ──────────────────────────────────────────────────────────────────

export function OfferShowcase({ config }: { config: LandingConfig }) {
  const { offer, serviceTitle } = config;
  const gift = offer.variant === "giftcard";

  return (
    <section
      id="offer"
      className={`relative scroll-mt-20 overflow-hidden py-16 text-[#f7ecda] sm:py-24 ${gift ? "bg-[#14271f]" : "bg-[#17343a]"}`}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: gift
            ? "radial-gradient(90% 70% at 75% 35%, rgba(210,174,109,0.16), transparent 60%)"
            : "radial-gradient(90% 70% at 75% 35%, rgba(255,255,255,0.10), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">{gift ? <GiftCardVisual /> : <PaintVisual />}</div>

        <div>
          <h2 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl text-balance">{offer.title}</h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#f7ecda]/85">{offer.details}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <EstimateButton
              placement="offer"
              className={`${btn} ${gift ? "bg-[#d2ae6d] text-[#14271f] hover:bg-[#e0c083]" : "bg-white text-[#17343a] hover:bg-white/90"}`}
            >
              Claim this offer
            </EstimateButton>
            <ContactButton
              kind="call"
              service={serviceTitle}
              placement="offer"
              className={`${btn} border border-[#f7ecda]/40 text-[#f7ecda] hover:bg-white/10`}
            >
              <Phone className="h-5 w-5" />
              Call {SITE.phone}
            </ContactButton>
          </div>

          {config.showFinancing && (
            <div className="mt-6">
              <FinancingModal>
                <span className="inline-flex items-center gap-2 text-sm font-semibold underline decoration-[#f7ecda]/40 underline-offset-4 hover:decoration-[#f7ecda]">
                  <Wallet className="h-4 w-4" />
                  Financing available. Check your rate with no credit impact.
                </span>
              </FinancingModal>
            </div>
          )}

          <p className="mt-6 max-w-xl text-xs leading-relaxed text-[#f7ecda]/55">
            {offer.finePrint}
          </p>
        </div>
      </div>
    </section>
  );
}
