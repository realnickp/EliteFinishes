import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ClipboardList, MessageSquare, Phone } from "lucide-react";
import { GOOGLE_REVIEWS, SITE } from "@/lib/constants";
import type { LandingConfig } from "@/lib/lp-landing";
import { FlagStripe } from "@/components/shared/FlagStripe";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { UtmSaver } from "@/components/lp/UtmSaver";
import { ProjectBuilder } from "./ProjectBuilder";
import { QuickEstimateForm } from "./QuickEstimateForm";
import { ContactButton, EstimateButton } from "./ActionButtons";
import { HeroSlideshow } from "./HeroSlideshow";
import { IdeasMarquee } from "./IdeasMarquee";
import { OfferShowcase } from "./OfferShowcase";

/** Maryland Department of Labor public license search, so visitors can check our MHIC number themselves. */
const MHIC_LOOKUP_URL =
  "https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect";

const STEPS = [
  {
    title: "Tell us about your project",
    text: "Answer a few quick questions, send the short form, or just call or text us.",
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
  "inline-flex min-h-[52px] cursor-pointer items-center justify-center gap-2 rounded-lg px-6 text-base font-bold transition-colors active:scale-[0.98]";

const sectionTitle = "text-3xl leading-[1.1] sm:text-4xl lg:text-[2.75rem] text-balance";

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

export function ConversionLanding({ config }: { config: LandingConfig }) {
  const { slug, serviceTitle, smsBody, offer } = config;
  const dinner = offer.variant === "dinner";
  const { address } = SITE;

  return (
    <div className="lp-page bg-white">
      <Suspense fallback={null}>
        <UtmSaver />
      </Suspense>

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white shadow-sm">
        <FlagStripe />
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 lg:h-20">
          <div className="flex min-w-0 items-center gap-3">
            <Image src="/images/logo.png" alt={SITE.name} width={162} height={169} className="h-11 w-auto lg:h-14" priority />
            <div className="leading-tight">
              <p className="text-sm font-bold">{SITE.name}</p>
              <p className="text-xs text-muted-foreground">
                <span className="hidden sm:inline">Licensed and insured, </span>
                {SITE.license}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ContactButton
              kind="text"
              service={serviceTitle}
              placement="header"
              smsBody={smsBody}
              className="hidden min-h-[44px] items-center gap-2 rounded-lg border border-primary px-4 text-sm font-semibold text-primary transition-colors hover:bg-primary/5 md:inline-flex"
            >
              <MessageSquare className="h-4 w-4" />
              Text us
            </ContactButton>
            <ContactButton
              kind="call"
              service={serviceTitle}
              placement="header"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-primary px-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90 sm:px-4"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </ContactButton>
            <EstimateButton
              placement="header"
              className="hidden min-h-[44px] cursor-pointer items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-bold text-white transition-colors hover:bg-brand-green-dark lg:inline-flex"
            >
              Free estimate
            </EstimateButton>
          </div>
        </div>
      </header>

      {/* ── Offer bar ────────────────────────────────────────────────────── */}
      <a
        href="#offer"
        className={`block px-4 py-2.5 text-center text-sm font-semibold leading-snug ${
          dinner ? "bg-[#3b0d14] text-[#e6c88c]" : "bg-[#17343a] text-white"
        }`}
      >
        {offer.short}
        <span className="ml-2 underline underline-offset-4">See details</span>
      </a>

      {/* ── Hero + estimate builder ──────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-[#eef0ee] lg:bg-primary">
        <div className="absolute inset-x-0 top-0 h-[340px] sm:h-[420px] lg:h-full">
          <HeroSlideshow images={config.heroSlides} />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-black/85 via-black/35 to-black/10 lg:bg-gradient-to-r lg:from-black/80 lg:via-black/50 lg:to-black/10" />
        </div>

        <div className="relative z-[4] mx-auto grid max-w-6xl gap-5 px-4 pb-10 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:py-16">
          <div className="flex h-[284px] flex-col justify-end text-white sm:h-[350px] lg:col-span-7 lg:h-auto lg:justify-center">
            <p className="text-sm font-medium text-white/85 sm:text-base">{config.eyebrow}</p>
            <h1 className="mt-2 text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-7xl text-balance">{config.headline}</h1>
            <p className="mt-4 hidden max-w-xl text-lg leading-relaxed text-white/85 sm:block">{config.subheadline}</p>

            <ul className="mt-6 hidden space-y-2.5 lg:block">
              {config.heroBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5 text-white/95">
                  <Check className="mt-1 h-4 w-4 shrink-0 text-white" strokeWidth={3} />
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
                className={`${btnBase} border border-white/60 text-white hover:bg-white/10`}
              >
                <MessageSquare className="h-5 w-5" />
                Text us
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
            <div className="mt-5 lg:hidden">
              <p className="mb-2.5 text-center text-sm text-muted-foreground">Rather talk to a person?</p>
              <div className="grid grid-cols-2 gap-2.5">
                <ContactButton
                  kind="call"
                  service={serviceTitle}
                  placement="hero_mobile"
                  className={`${btnBase} bg-primary px-3 text-white`}
                >
                  <Phone className="h-5 w-5" />
                  Call
                </ContactButton>
                <ContactButton
                  kind="text"
                  service={serviceTitle}
                  placement="hero_mobile"
                  smsBody={smsBody}
                  className={`${btnBase} border border-primary bg-white px-3 text-primary`}
                >
                  <MessageSquare className="h-5 w-5" />
                  Text
                </ContactButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust facts ──────────────────────────────────────────────────── */}
      <section className="border-b border-border bg-white">
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-5 gap-y-3 px-4 py-5 text-sm sm:px-6 lg:grid-cols-4">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" strokeWidth={3} />
            <span>
              <span className="font-bold">Maryland licensed</span>
              <br />
              <a
                href={MHIC_LOOKUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground underline underline-offset-2 hover:text-foreground"
              >
                Look up {SITE.license}
              </a>
            </span>
          </li>
          {[
            ["Family owned and insured", `Run by ${SITE.owner}`],
            ["Free written estimates", "No cost, no obligation"],
            ["Fast response", "Within 1 business day"],
          ].map(([title, text]) => (
            <li key={title} className="flex items-start gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" strokeWidth={3} />
              <span>
                <span className="font-bold">{title}</span>
                <br />
                <span className="text-muted-foreground">{text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Style ideas (stock photos, never credited as our work) ───────── */}
      <section className="overflow-hidden bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={sectionTitle}>{config.ideas.heading}</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">{config.ideas.subheading}</p>
        </div>
        <div className="mt-8 sm:mt-10">
          <IdeasMarquee photos={config.ideas.photos} />
        </div>
        <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-xs text-muted-foreground">
            Style ideas for inspiration. Photos from our own recent jobs are further down the page.
          </p>
          <EstimateButton
            placement="ideas"
            className={`${btnBase} shrink-0 bg-brand-green text-white hover:bg-brand-green-dark`}
          >
            Get my free estimate
          </EstimateButton>
        </div>
      </section>

      {/* ── Google reviews (only on pages our reviews actually talk about) ─ */}
      {config.showReviews && (
        <section className="bg-[#eef0ee] py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className={`${sectionTitle} flex flex-wrap items-center gap-x-3`}>
              What customers say on
              <span className="inline-flex items-center gap-2">
                <GoogleG className="h-7 w-7 sm:h-8 sm:w-8" />
                Google
              </span>
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Word for word from {SITE.name} customers.
            </p>
          </div>
          <div className="mx-auto mt-8 flex max-w-6xl snap-x snap-mandatory items-start gap-4 overflow-x-auto px-4 pb-4 sm:px-6 md:grid md:grid-cols-2 md:overflow-visible md:pb-0">
            {GOOGLE_REVIEWS.map((review) => (
              <figure
                key={review.name}
                className="w-[86%] shrink-0 snap-center rounded-lg border border-border bg-white p-6 md:w-auto"
              >
                <blockquote className="leading-relaxed text-foreground/85">&ldquo;{review.text}&rdquo;</blockquote>
                <figcaption className="mt-5 flex items-center justify-between gap-3 border-t border-border pt-4 text-sm">
                  <span>
                    <span className="font-bold">{review.name}</span>
                    <br />
                    <span className="text-muted-foreground">{review.project}</span>
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                    <GoogleG className="h-3.5 w-3.5" />
                    Posted on Google
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* ── Offer ────────────────────────────────────────────────────────── */}
      <OfferShowcase config={config} />

      {/* ── Our own work: real job photos only ───────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={sectionTitle}>Recent {SITE.name} projects</h2>
          <p className="mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Real photos from our own jobs around the Baltimore area.
          </p>
        </div>
        <div className="mx-auto mt-8 flex max-w-6xl snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-6 sm:pb-0">
          {config.workPhotos.map((photo) => (
            <figure key={photo.src} className="w-[78%] shrink-0 snap-center sm:w-auto">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 640px) 78vw, (max-width: 1152px) 33vw, 370px"
                  className="object-cover"
                />
              </div>
              <figcaption className="mt-2.5 text-sm leading-snug text-muted-foreground">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Who you're hiring ────────────────────────────────────────────── */}
      <section className="bg-[#eef0ee] py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className={sectionTitle}>A local company you can look up</h2>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              {SITE.name} is a family owned Baltimore contractor run by {SITE.owner}. We hold a Maryland Home
              Improvement Commission license and we are fully insured.
            </p>
            <p className="mt-4 text-base leading-relaxed text-foreground/80 sm:text-lg">
              Don&apos;t take our word for it. Check our license number on the state website before you ever call us.
            </p>
          </div>
          <dl className="divide-y divide-border self-start rounded-lg border border-border bg-white text-sm sm:text-base">
            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="text-muted-foreground">License</dt>
              <dd className="text-right font-semibold">
                {SITE.license}
                <br />
                <a
                  href={MHIC_LOOKUP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-green-dark underline underline-offset-2"
                >
                  Verify with the State of Maryland
                </a>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="text-muted-foreground">Owner</dt>
              <dd className="text-right font-semibold">{SITE.owner}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="text-muted-foreground">Office</dt>
              <dd className="text-right font-semibold">
                {address.street}
                <br />
                {address.city}, {address.stateCode} {address.zip}
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="text-muted-foreground">Phone</dt>
              <dd className="text-right font-semibold">
                <ContactButton kind="call" service={serviceTitle} placement="company_facts" className="underline underline-offset-2">
                  {SITE.phone}
                </ContactButton>
              </dd>
            </div>
            <div className="flex items-baseline justify-between gap-4 px-5 py-4">
              <dt className="text-muted-foreground">Website</dt>
              <dd className="text-right font-semibold">
                <Link href="/" className="underline underline-offset-2">
                  {SITE.domain}
                </Link>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── Why Elite ────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-muted lg:col-span-5 lg:aspect-auto">
            <Image src={config.whyImage} alt="" fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-7">
            <h2 className={sectionTitle}>{config.why.heading}</h2>
            <dl className="mt-6 divide-y divide-border border-y border-border">
              {config.why.items.map((item) => (
                <div key={item.title} className="grid gap-1 py-4 sm:grid-cols-[200px_1fr] sm:gap-6">
                  <dt className="font-bold">{item.title}</dt>
                  <dd className="text-muted-foreground">{item.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────────────────── */}
      <section className="bg-[#eef0ee] py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className={sectionTitle}>Getting started is easy</h2>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-10">
            {STEPS.map((step, i) => (
              <li key={step.title} className="border-t-2 border-primary pt-4">
                <span className="font-display text-5xl leading-none text-brand" aria-hidden>
                  {i + 1}
                </span>
                <h3 className="mt-3 text-lg">{step.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <h2 className={sectionTitle}>Questions homeowners ask</h2>
            <p className="mt-4 text-muted-foreground">
              Something else on your mind? Call or text{" "}
              <ContactButton kind="call" service={serviceTitle} placement="faq" className="font-semibold text-foreground underline underline-offset-2">
                {SITE.phone}
              </ContactButton>{" "}
              and ask us directly.
            </p>
          </div>
          <div className="lg:col-span-8">
            <FAQAccordion items={config.faq} className="border-t border-border" />
          </div>
        </div>
      </section>

      {/* ── Final call to action ─────────────────────────────────────────── */}
      <section className="bg-[#eef0ee] py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 sm:px-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl bg-primary p-6 text-white sm:p-8">
            <h2 className="text-3xl leading-tight sm:text-4xl">Ready for your free estimate?</h2>
            <p className="mt-3 text-white/75">
              Pick whatever is easiest for you. However you reach out, a real person from {SITE.name} gets back to
              you within one business day.
            </p>
            <p className={`mt-4 text-sm font-semibold ${dinner ? "text-[#e6c88c]" : "text-white"}`}>
              Current offer: {offer.badge}.
            </p>
            <div className="mt-6 space-y-3">
              <EstimateButton
                placement="final"
                className="flex w-full cursor-pointer items-center gap-4 rounded-lg bg-white p-4 text-left text-primary transition hover:bg-white/90"
              >
                <ClipboardList className="h-6 w-6 shrink-0 text-brand-green-dark" />
                <span className="flex-1">
                  <span className="block font-bold">Answer a few quick questions</span>
                  <span className="block text-sm text-muted-foreground">A few taps, about 60 seconds</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </EstimateButton>
              <ContactButton
                kind="call"
                service={serviceTitle}
                placement="final"
                className="flex w-full items-center gap-4 rounded-lg bg-white/[0.08] p-4 ring-1 ring-white/15 transition hover:bg-white/[0.12]"
              >
                <Phone className="h-6 w-6 shrink-0" />
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
                className="flex w-full items-center gap-4 rounded-lg bg-white/[0.08] p-4 ring-1 ring-white/15 transition hover:bg-white/[0.12]"
              >
                <MessageSquare className="h-6 w-6 shrink-0" />
                <span className="flex-1">
                  <span className="block font-bold">Text us</span>
                  <span className="block text-sm text-white/65">Send a photo of your space for a faster quote</span>
                </span>
                <ArrowRight className="h-5 w-5 shrink-0 text-white/60" />
              </ContactButton>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-white p-6 sm:p-8">
            <h2 className="text-3xl leading-tight">Or send a quick request</h2>
            <p className="mb-6 mt-2 text-muted-foreground">Just your name, number, zip and city. We&apos;ll take it from there.</p>
            <QuickEstimateForm slug={slug} serviceTitle={serviceTitle} />
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="border-t border-border bg-white px-4 pb-28 pt-8 text-center text-xs text-muted-foreground lg:pb-8">
        <p className="text-sm font-bold text-foreground">{SITE.name}</p>
        <p className="mt-1">
          {address.street}, {address.city}, {address.stateCode} {address.zip}
        </p>
        <p className="mt-1">Licensed and insured, {SITE.license}</p>
        <p className="mt-1">
          <a href={SITE.phoneTel} className="font-semibold text-foreground hover:underline">
            {SITE.phone}
          </a>
          <span className="mx-2" aria-hidden>
            |
          </span>
          <a href={`mailto:${SITE.email}`} className="hover:underline">
            {SITE.email}
          </a>
        </p>
        <p className="mt-4 flex justify-center gap-5">
          <Link href="/" className="hover:underline">
            Main website
          </Link>
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
            className="flex min-h-[60px] cursor-pointer flex-col items-center justify-center gap-0.5 bg-brand-green text-xs font-bold text-white"
          >
            <ClipboardList className="h-5 w-5" />
            Free estimate
          </EstimateButton>
        </div>
      </div>
    </div>
  );
}
