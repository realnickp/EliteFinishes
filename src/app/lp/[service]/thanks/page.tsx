"use client";

import { useParams, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { Phone, MessageSquare, CheckCircle, Clock, Star } from "lucide-react";
import { PRIMARY_SERVICES, SITE } from "@/lib/constants";

const NEXT_STEPS = [
  {
    emoji: "📋",
    title: "We review your details",
    desc: "Our team looks over exactly what you told us and comes prepared with real answers.",
  },
  {
    emoji: "📞",
    title: "Our team calls you",
    desc: "Most customers hear back within one business day — often much sooner.",
  },
  {
    emoji: "🏡",
    title: "Free on-site estimate",
    desc: "We visit your property, walk the project with you, and give you a written quote. No pressure.",
  },
];

function ThanksContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const service = params.service as string;
  const firstName = searchParams.get("name") || "there";

  const svc = PRIMARY_SERVICES.find((s) => s.slug === service);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-2.5 px-4 shrink-0">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <span className="text-sm font-bold">{SITE.name}</span>
          <a
            href={SITE.phoneTel}
            className="flex items-center gap-1.5 text-sm font-bold hover:opacity-80 transition-opacity"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE.phone}
          </a>
        </div>
      </div>

      {/* Progress bar — full + complete */}
      <div className="w-full h-2 bg-gradient-to-r from-brand via-brand-green to-brand shrink-0" />

      {/* Main */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg text-center">

          {/* Success icon */}
          <div className="flex justify-center mb-6">
            <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-brand-green/10">
              <CheckCircle className="h-14 w-14 text-brand-green" />
              <span className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-brand-green text-white text-lg">
                ✓
              </span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            You&apos;re all set, {firstName}!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Our team received your{" "}
            <span className="font-semibold text-foreground">{svc?.title ?? service}</span> request.
          </p>
          <p className="text-muted-foreground mb-8">
            We built our reputation one project at a time — and yours is next on our list.
          </p>

          {/* Stars */}
          <div className="flex items-center justify-center gap-1 mb-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 fill-brand-green text-brand-green" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">5.0 · 500+ Maryland homeowners served</span>
          </div>

          {/* What happens next */}
          <div className="bg-warm-bg rounded-2xl border border-border/30 p-6 mb-8 text-left">
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground mb-4">
              What happens next
            </p>
            <div className="space-y-5">
              {NEXT_STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white border border-border/40 text-xl shadow-xs">
                    {step.emoji}
                  </div>
                  <div>
                    <p className="font-semibold text-sm mb-0.5">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Response time badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-green/15 text-brand-green text-sm font-semibold px-4 py-2 mb-8">
            <Clock className="h-4 w-4" />
            We respond within one business day
          </div>

          {/* Call / text CTAs */}
          <p className="text-sm text-muted-foreground mb-3">Want to reach us right now?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href={SITE.phoneTel}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <Phone className="h-4 w-4" />
              Call Us
            </a>
            <a
              href={SITE.phoneSms}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 min-h-[48px] rounded-xl border-2 border-primary text-primary font-semibold text-sm hover:bg-primary/5 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Text Us
            </a>
          </div>

          {/* Back to site link */}
          <Link
            href="/"
            className="text-sm text-brand hover:underline font-medium"
          >
            ← Back to our website
          </Link>
        </div>
      </div>

      {/* Bottom trust */}
      <div className="shrink-0 border-t border-border/30 py-4 px-4 text-center">
        <p className="text-xs text-muted-foreground">
          {SITE.name} · {SITE.license} · Baltimore Metro Area, MD
        </p>
      </div>
    </div>
  );
}

export default function ThanksPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        </div>
      }
    >
      <ThanksContent />
    </Suspense>
  );
}
