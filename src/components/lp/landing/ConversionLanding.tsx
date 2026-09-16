import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  Bath,
  CheckCircle,
  ClipboardCheck,
  Clock,
  FileText,
  MapPin,
  MessageSquare,
  Palette,
  Phone,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { GOOGLE_REVIEWS, SITE } from "@/lib/constants";
import type { LandingConfig, WhyIcon } from "@/lib/lp-landing";
import { FlagStripe } from "@/components/shared/FlagStripe";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FinancingModal } from "@/components/shared/FinancingModal";
import { UtmSaver } from "@/components/lp/UtmSaver";
import { ProjectBuilder } from "./ProjectBuilder";
import { QuickEstimateForm } from "./QuickEstimateForm";
import { ContactButton, EstimateButton } from "./ActionButtons";

const WHY_ICONS: Record<WhyIcon, LucideIcon> = {
  prep: ClipboardCheck,
  palette: Palette,
  shield: ShieldCheck,
  sparkles: Sparkles,
  clock: Clock,
  price: BadgeDollarSign,
  bath: Bath,
  team: Users,
  wallet: Wallet,
};

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: "Licensed and insured", text: SITE.license },
  { icon: FileText, title: "Free written estimates", text: "No cost, no obligation" },
  { icon: Clock, title: "Fast response", text: "Within 1 business day" },
  { icon: MapPin, title: "Baltimore area", text: "City and surrounding counties" },
];

const STEPS = [
  {
    title: "Tell us about your project",
    text: "Use the Project Builder, send the quick form, or just call or text us.",
  },
  {
    title: "Get a free on-site estimate",
    text: "We come out, walk through the project with you and give you a clear written quote.",
  },
  {
    title: "We get to work",
    text: "Our crew shows up on time, does the job right and leaves your home clean.",
  },
];

const btnBase =
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-xl px-6 text-base font-bold transition-all active:scale-[0.98]";

function GoogleG({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
}) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <p className={`text-xs font-bold uppercase tracking-[0.18em] ${dark ? "text-brand-green" : "text-brand"}`}>
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl leading-tight sm:text-4xl text-balance">{title}</h2>
      {subtitle && (
        <p className={`mt-3 text-base sm:text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function ConversionLanding({ config }: { config: LandingConfig }) {
  const { slug, serviceTitle, smsBody } = config;

  return (
    <div className="bg-background">
      <Suspense fallback={null}>
        <UtmSaver />
      </Suspense>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/95 shadow-sm backdrop-blur">
        <FlagStripe />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/images/logo.png" alt={SITE.name} width={162} height={169} className="h-11 w-auto lg:h-14" priority />
            <div className="hidden leading-tight sm:block">
              <p className="text-sm font-bold">{SITE.name}</p>
              <p className="text-xs text-muted-foreground">Licensed and insured · {SITE.license}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ContactButton
              kind="text"
              service={serviceTitle}
              placement="header"
              smsBody={smsBody}
              className="hidden min-h-[44px] items-center gap-2 rounded-xl border-2 border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 md:inline-flex"
            >
              <MessageSquare className="h-4 w-4" />
              Text Us
            </ContactButton>
            <ContactButton
              kind="call"
              service={serviceTitle}
              placement="header"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </ContactButton>
            <EstimateButton
              placement="header"
              className="hidden min-h-[44px] cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-br from-brand-green to-brand-green-dark px-4 text-sm font-bold text-white shadow-md shadow-brand-green/20 lg:inline-flex"
            >
              Free Estimate
            </EstimateButton>
          </div>
        </div>
      </header>

      {/* ── Hero + Project Builder ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary text-white">
        <Image src={config.heroImage} alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary/85 lg:bg-transparent lg:bg-gradient-to-r lg:from-primary lg:via-primary/90 lg:to-primary/55" />

        <div className="relative mx-auto grid max-w-6xl gap-7 px-4 pb-10 pt-7 sm:px-6 sm:pt-10 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="lg:col-span-7 lg:pt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-black/20">
              <Tag className="h-3.5 w-3.5" />
              {config.offer.badge}
            </span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.16em] text-white/65">{config.eyebrow}</p>
            <h1 className="mt-2 text-[2.1rem] leading-[1.05] sm:text-5xl lg:text-6xl text-balance">{config.headline}</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{config.subheadline}</p>

            <ul className="mt-6 hidden space-y-2.5 sm:block">
              {config.heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-white/90">
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                  {bullet}
                </li>
              ))}
            </ul>

            <div className="mt-8 hidden flex-wrap gap-3 lg:flex">
              <ContactButton
                kind="call"
                service={serviceTitle}
                placement="hero"
                className={`${btnBase} bg-white text-primary hover:bg-white/90`}
              >
                <Phone className="h-5 w-5" />
                Call {SITE.phone}
              </ContactButton>
              <ContactButton
                kind="text"
                service={serviceTitle}
                placement="hero"
                smsBody={smsBody}
                className={`${btnBase} border-2 border-white/40 text-white hover:bg-white/10`}
              >
                <MessageSquare className="h-5 w-5" />
                Text Us
              </ContactButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <ProjectBuilder
              slug={slug}
              serviceTitle={serviceTitle}
              title={config.builder.title}
              questions={config.builder.questions}
            />
            <div className="mt-4 lg:hidden">
              <p className="mb-2.5 text-center text-sm text-white/70">Rather talk to a person?</p>
              <div className="grid grid-cols-2 gap-2.5">
                <ContactButton
                  kind="call"
                  service={serviceTitle}
                  placement="hero_mobile"
                  className={`${btnBase} bg-white px-3 text-primary`}
                >
                  <Phone className="h-5 w-5" />
                  Call
                </ContactButton>
                <ContactButton
                  kind="text"
                  service={serviceTitle}
                  placement="hero_mobile"
                  smsBody={smsBody}
                  className={`${btnBase} border-2 border-white/40 px-3 text-white`}
                >
                  <MessageSquare className="h-5 w-5" />
                  Text
                </ContactButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ────────────────────────────────────────────────────── */}
      <section className="border-b border-border/60 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-5 px-4 py-6 sm:px-6 lg:grid-cols-4">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand/10">
                <item.icon className="h-5 w-5 text-brand" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Our work ─────────────────────────────────────────────────────── */}
      <section className="bg-warm-bg py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Our Work" title={config.work.heading} subtitle={config.work.subheading} />
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {config.work.photos.map((photo) => (
              <figure key={photo.src} className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted shadow-md">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-3 pb-3 pt-10 text-xs font-medium leading-snug text-white sm:text-sm">
                  {photo.caption}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-8 text-center">
            <EstimateButton
              placement="work"
              className={`${btnBase} bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-lg shadow-brand-green/25`}
            >
              Start My Free Estimate
              <ArrowRight className="h-5 w-5" />
            </EstimateButton>
          </div>
        </div>
      </section>

      {/* ── Google reviews ───────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading
            eyebrow="Google Reviews"
            title="What our customers say"
            subtitle={`Real reviews from real ${SITE.name} customers on Google.`}
          />
          <div className="grid gap-4 md:grid-cols-2">
            {GOOGLE_REVIEWS.map((review) => (
              <article key={review.name} className="flex flex-col rounded-2xl border border-border/60 bg-warm-bg p-6 shadow-sm">
                <p className="flex-1 leading-relaxed text-foreground/85">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-white">
                      {review.name.charAt(0)}
                    </div>
                    <div className="leading-tight">
                      <p className="font-bold">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.project}</p>
                    </div>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border">
                    <GoogleG className="h-3.5 w-3.5" />
                    Google
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why Elite ────────────────────────────────────────────────────── */}
      <section className="bg-primary py-14 text-white sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="Why Elite Finishes" title={config.why.heading} dark />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {config.why.items.map((item) => {
              const Icon = WHY_ICONS[item.icon];
              return (
                <div key={item.title} className="rounded-2xl bg-white/[0.06] p-6 ring-1 ring-white/10">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/15">
                    <Icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <h3 className="mt-4 text-lg">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Offer ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <Image src={config.offerImage} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-primary/70" />
        <div className="relative mx-auto max-w-3xl px-4 text-center text-white sm:px-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
            <Tag className="h-3.5 w-3.5" />
            Limited-time offer
          </span>
          <h2 className="mt-5 text-4xl leading-tight sm:text-5xl text-balance">{config.offer.title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/85">{config.offer.details}</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <EstimateButton
              placement="offer"
              className={`${btnBase} bg-gradient-to-br from-brand-green to-brand-green-dark text-white shadow-lg shadow-black/20`}
            >
              Claim My Offer
              <ArrowRight className="h-5 w-5" />
            </EstimateButton>
            <ContactButton
              kind="call"
              service={serviceTitle}
              placement="offer"
              className={`${btnBase} bg-white text-primary hover:bg-white/90`}
            >
              <Phone className="h-5 w-5" />
              Call {SITE.phone}
            </ContactButton>
          </div>
          {config.showFinancing && (
            <div className="mt-6">
              <FinancingModal>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white">
                  <Wallet className="h-4 w-4" />
                  Financing available. Check your rate with no credit impact.
                </span>
              </FinancingModal>
            </div>
          )}
          <p className="mt-6 text-xs text-white/60">{config.offer.finePrint}</p>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHeading eyebrow="How It Works" title="Getting started is easy" />
          <ol className="grid gap-4 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border/60 bg-warm-bg p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-warm-bg py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <SectionHeading eyebrow="FAQ" title="Questions homeowners ask" />
          <FAQAccordion items={config.faq} className="rounded-2xl bg-white px-5 shadow-sm sm:px-7" />
        </div>
      </section>

      {/* ── Final call to action ─────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl bg-primary p-6 text-white sm:p-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-green px-3 py-1.5 text-xs font-bold uppercase tracking-wide">
              <Tag className="h-3.5 w-3.5" />
              {config.offer.badge}
            </span>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Ready for your free estimate?</h2>
            <p className="mt-3 text-white/75">
              Pick whatever is easiest for you. However you reach out, a real person from {SITE.name} gets back to
              you within one business day.
            </p>
            <div className="mt-6 space-y-3">
              <EstimateButton
                placement="final"
                className="flex w-full cursor-pointer items-center gap-4 rounded-xl bg-white p-4 text-left text-primary transition hover:bg-white/90"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-green/15">
                  <Sparkles className="h-5 w-5 text-brand-green-dark" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold">Use the Project Builder</span>
                  <span className="block text-sm text-muted-foreground">A few quick taps, about 60 seconds</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </EstimateButton>
              <ContactButton
                kind="call"
                service={serviceTitle}
                placement="final"
                className="flex w-full items-center gap-4 rounded-xl bg-white/[0.08] p-4 ring-1 ring-white/15 transition hover:bg-white/[0.12]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Phone className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold">Call {SITE.phone}</span>
                  <span className="block text-sm text-white/65">Talk to our team today</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-white/60" />
              </ContactButton>
              <ContactButton
                kind="text"
                service={serviceTitle}
                placement="final"
                smsBody={smsBody}
                className="flex w-full items-center gap-4 rounded-xl bg-white/[0.08] p-4 ring-1 ring-white/15 transition hover:bg-white/[0.12]"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <MessageSquare className="h-5 w-5" />
                </span>
                <span className="flex-1">
                  <span className="block font-bold">Text us</span>
                  <span className="block text-sm text-white/65">Send a photo of your space for a faster quote</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-white/60" />
              </ContactButton>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-white p-6 shadow-xl sm:p-8">
            <h2 className="text-3xl leading-tight">Or send a quick request</h2>
            <p className="mb-6 mt-2 text-muted-foreground">Just your name, number and zip. We&apos;ll take it from there.</p>
            <QuickEstimateForm slug={slug} serviceTitle={serviceTitle} />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border/60 bg-warm-bg px-4 pb-28 pt-8 text-center text-xs text-muted-foreground lg:pb-8">
        <p className="text-sm font-bold text-foreground">{SITE.name}</p>
        <p className="mt-1">
          Licensed and insured · {SITE.license} · Serving the Baltimore area
        </p>
        <p className="mt-1">
          <a href={SITE.phoneTel} className="font-semibold text-foreground hover:underline">
            {SITE.phone}
          </a>
          {" · "}
          <a href={`mailto:${SITE.email}`} className="hover:underline">
            {SITE.email}
          </a>
        </p>
        <p className="mt-4 flex justify-center gap-5">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms
          </Link>
        </p>
      </footer>

      {/* ── Sticky mobile action bar ─────────────────────────────────────── */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-white shadow-[0_-4px_16px_rgba(0,0,0,0.12)] lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        <div className="grid grid-cols-3">
          <ContactButton
            kind="call"
            service={serviceTitle}
            placement="sticky_bar"
            className="flex min-h-[60px] flex-col items-center justify-center gap-0.5 bg-primary text-xs font-semibold text-white"
          >
            <Phone className="h-5 w-5" />
            Call
          </ContactButton>
          <ContactButton
            kind="text"
            service={serviceTitle}
            placement="sticky_bar"
            smsBody={smsBody}
            className="flex min-h-[60px] flex-col items-center justify-center gap-0.5 border-x border-white/10 bg-primary text-xs font-semibold text-white"
          >
            <MessageSquare className="h-5 w-5" />
            Text
          </ContactButton>
          <EstimateButton
            placement="sticky_bar"
            className="flex min-h-[60px] cursor-pointer flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-brand-green to-brand-green-dark text-xs font-bold text-white"
          >
            <Sparkles className="h-5 w-5" />
            Free Estimate
          </EstimateButton>
        </div>
      </div>
    </div>
  );
}
