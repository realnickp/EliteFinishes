import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle,
  DollarSign,
  CreditCard,
  Clock,
  Shield,
  Percent,
  CalendarCheck,
  FileText,
  Banknote,
  Home,
  Zap,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { TrustBar } from "@/components/shared/TrustBar";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQPageSchema } from "@/components/shared/SchemaOrg";

export const metadata: Metadata = {
  title: `Financing for Painting and Remodeling Projects | ${SITE.name}`,
  description: `Finance your painting or remodeling project in Baltimore with flexible payment plans through HFS Financial. Inquire in minutes with no impact to your credit score. Personal loans up to $300,000, fixed rates as low as 7.8%, terms up to 20 years. Licensed contractor ${SITE.license}.`,
  keywords: [
    "home improvement financing Baltimore",
    "painting financing Maryland",
    "remodeling financing Baltimore",
    "HFS Financial contractor loans",
    "home improvement loans no equity",
    "contractor financing Baltimore MD",
    "kitchen remodel financing",
    "bathroom remodel financing",
    "Elite Finishes financing",
    "home renovation loans Maryland",
  ],
  openGraph: {
    siteName: "Elite Finishes",
    title: `Financing for Painting and Remodeling | ${SITE.name}`,
    description: `Flexible financing for Baltimore painting and remodeling through HFS Financial. Personal loans up to $300,000, terms up to 20 years, low fixed rates. Licensed ${SITE.license}.`,
    url: `${SITE.url}/financing`,
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Financing for Painting and Remodeling | ${SITE.name}`,
    description: `Personal home improvement loans up to $300,000 through HFS Financial. Fixed rates, terms up to 20 years, no home equity required. Licensed ${SITE.license}.`,
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: `${SITE.url}/financing` },
};

const HFS_PROMO_URL = "https://www.hfsfinancial.net/promo/6706b64ac3bb21107c7cdafb/";
const HFS_APPLY_URL = "https://apply.hfsfinancial.net/prequalification?contractor_name=Elite%20Finishes%20Inc.%20-%20Sykesville%2C%20MD&promo_code=6706b64ac3bb21107c7cdafb&intermediary_id=6706b64ac3bb21107c7cdafb";

const HFS_BENEFITS = [
  { icon: Shield, title: "No Credit Impact to Inquire", desc: "Checking your rate is a soft pull — zero risk to your credit score." },
  { icon: CalendarCheck, title: "Terms Up to 20 Years", desc: "Lock in a fixed rate with a repayment timeline that fits your budget." },
  { icon: Zap, title: "Same-Day Qualifications", desc: "Get prequalified for your loan options in minutes, not days." },
  { icon: DollarSign, title: "Personal Loans", desc: "No home equity required. Your property stays untouched as collateral." },
  { icon: Banknote, title: "Direct-to-Consumer Funded", desc: "Loan proceeds go directly to you, giving you full control over your project funds." },
  { icon: Percent, title: "Low Fixed Rates", desc: "Rates as low as 7.8% fixed with no prepayment penalties." },
];

const PAYMENT_OPTIONS = [
  {
    icon: Home,
    title: "HFS Financial",
    desc: "Personal home improvement loans up to $300,000. Fixed rates as low as 7.8%, terms from 1 to 20 years. No home equity required, no appraisals, and no prepayment penalties. Funds available within 48 hours of approval.",
    highlight: true,
  },
  {
    icon: CreditCard,
    title: "Major Credit Cards",
    desc: "Visa, Mastercard, American Express, and Discover accepted on every project. No processing fees.",
    highlight: false,
  },
  {
    icon: DollarSign,
    title: "Check and ACH Transfer",
    desc: "Traditional payment methods welcomed. No fees on checks or bank transfers.",
    highlight: false,
  },
  {
    icon: CalendarCheck,
    title: "Milestone-Based Payments",
    desc: "For larger projects, we break payments into milestones tied to project progress. You never pay for work that is not done. We do not ask for more than 50% upfront.",
    highlight: false,
  },
];

const PRICE_RANGES = [
  { service: "Interior Painting (single room)", range: "$600 to $2,000+", note: "Room size, ceiling height, and surface condition" },
  { service: "Interior Painting (whole home)", range: "$3,500 to $12,000+", note: "Square footage, number of rooms, and trim work" },
  { service: "Exterior Painting", range: "$2,500 to $8,000+", note: "Home size, stories, siding type, and prep required" },
  { service: "Kitchen Remodeling", range: "$8,000 to $50,000+", note: "Cabinet painting vs. replacement, countertops, and scope" },
  { service: "Bathroom Remodeling", range: "$6,000 to $35,000+", note: "Tile work, vanity, fixtures, and layout changes" },
  { service: "Basement Remodeling", range: "$15,000 to $45,000+", note: "Square footage, bathroom addition, and finish quality" },
  { service: "Flooring Installation", range: "$2,000 to $15,000+", note: "Material type, square footage, and subfloor condition" },
  { service: "Decks", range: "$10,000 to $28,000+", note: "Size, material (wood vs. composite), and features" },
  { service: "Siding Replacement", range: "$8,000 to $35,000+", note: "Home size, material type, and removal scope" },
  { service: "Roofing", range: "$8,000 to $16,000+", note: "Roof size, pitch, material, and decking repairs" },
];

const FINANCING_FAQS = [
  {
    question: "How does HFS Financial financing work for home improvement projects?",
    answer:
      "HFS Financial connects homeowners with personal loans for home improvement projects. You inquire online in minutes with no impact to your credit score. If you prequalify, you can view loan options instantly or speak with a loan consultant. Once you choose a loan, you securely upload some basic documents for verification, and funds are typically available within 48 hours of approval.",
  },
  {
    question: "What credit score do I need to qualify?",
    answer:
      "HFS Financial works with multiple lending partners and considers a range of credit profiles. The initial inquiry is a soft pull with no impact to your credit score, so there is no risk in checking your options. You will see what you qualify for before committing to anything.",
  },
  {
    question: "Does inquiring affect my credit score?",
    answer:
      "No. The initial inquiry is a soft credit check that has zero impact on your credit score. A hard inquiry only occurs if you decide to formally accept and proceed with a loan offer.",
  },
  {
    question: "What are the interest rates and loan terms?",
    answer:
      "HFS Financial offers fixed rates as low as 7.8% with terms from 1 to 20 years. Loan amounts go up to $300,000. There are no prepayment penalties, so you can pay off your loan early at any time without additional fees.",
  },
  {
    question: "Do I need home equity to qualify?",
    answer:
      "No. Loans through HFS Financial are personal loans, which means there are no home equity requirements, no need to refinance or mortgage your home, no appraisals, and no lengthy loan processes.",
  },
  {
    question: "Can I finance any type of project?",
    answer:
      "Yes. HFS Financial can help finance almost any residential home improvement project. That includes interior and exterior painting, kitchen and bathroom remodeling, basement finishing, flooring, siding, roofing, decks, and more.",
  },
  {
    question: "How much does Elite Finishes require upfront?",
    answer:
      "For projects paid in full or by card, we never ask for more than 50% upfront. The balance is due at completion. With HFS financing, the lender funds you directly, so you have full control over how and when you pay us. We discuss payment structure during your free estimate.",
  },
  {
    question: "Is there a penalty for paying off the loan early?",
    answer:
      "No. HFS Financial loans have no prepayment penalties. You can pay off your balance early at any time without additional fees.",
  },
  {
    question: "How quickly can I get funded?",
    answer:
      "HFS Financial offers same-day prequalifications. Once you accept a loan offer and complete verification, funds are typically available within 48 hours of approval.",
  },
  {
    question: "What states does HFS Financial cover?",
    answer:
      "HFS Financial operates nationwide and can assist homeowners in all 50 states with securing loans for home improvement projects.",
  },
];

function BreadcrumbSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
            { "@type": "ListItem", position: 2, name: "Financing", item: `${SITE.url}/financing` },
          ],
        }),
      }}
    />
  );
}

function FinancingHowToSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: "How to Finance a Home Improvement Project with Elite Finishes",
          description: "Step-by-step guide to financing your painting or remodeling project in Baltimore through HFS Financial with no impact to your credit score.",
          totalTime: "PT5M",
          step: [
            {
              "@type": "HowToStep",
              position: 1,
              name: "Inquire for a Loan",
              text: "Fill out a quick online form through HFS Financial. This does NOT affect your credit score. Get same-day answers on your loan options.",
              url: `${SITE.url}/financing#apply`,
            },
            {
              "@type": "HowToStep",
              position: 2,
              name: "Get Prequalified",
              text: "View instant loan options or speak with an HFS loan consultant to find the best fit for your budget and project.",
            },
            {
              "@type": "HowToStep",
              position: 3,
              name: "Verify Your Information",
              text: "Securely upload basic documents for loan verification. The process is quick and straightforward.",
            },
            {
              "@type": "HowToStep",
              position: 4,
              name: "Get Your Funds",
              text: "Loan proceeds are available within 48 hours of approval. Funds go directly to you, giving you full control over your project.",
            },
          ],
        }),
      }}
    />
  );
}

export default function FinancingPage() {
  return (
    <>
      <FAQPageSchema faqs={FINANCING_FAQS} />
      <BreadcrumbSchema />
      <FinancingHowToSchema />

      <article>
        {/* Hero */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-semibold mb-6">
                <Percent className="h-3.5 w-3.5" />
                120% Financing Available
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Finance Your Home Project{" "}
                <span className="text-brand-green">With Flexible Payments</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">
                Do not let budget hold you back from the home you deserve. Through our
                partnership with HFS Financial, you can get prequalified in minutes with
                no impact to your credit score — personal loans up to $300,000 with fixed
                rates and terms up to 20 years.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href={HFS_APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Check Your Rate
                  <ArrowRight className="h-5 w-5" />
                </a>
                <CTAButton href="/contact" variant="outline-light" size="lg">
                  Get a Free Estimate First
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        <TrustBar />

        {/* How Financing Works */}
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elite Finishes partners with HFS Financial to offer simple, transparent
              financing for painting and remodeling projects in the Baltimore area.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-4 max-w-5xl mx-auto">
            {[
              {
                step: "1",
                title: "Inquire for a Loan",
                desc: "Fill out a quick form — it does NOT affect your credit. Get same-day answers on your options.",
              },
              {
                step: "2",
                title: "Get Prequalified",
                desc: "View instant loan options or speak with an HFS loan consultant to find the best fit.",
              },
              {
                step: "3",
                title: "Verify",
                desc: "Securely upload some basic documents for loan verification. Quick and straightforward.",
              },
              {
                step: "4",
                title: "Get Your Funds",
                desc: "Loan proceeds available within 48 hours of approval. Funds go directly to you.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center text-white font-bold text-lg">
                  {item.step}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* HFS Financial Benefits */}
        <Section variant="warm">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">Why Homeowners Choose HFS Financial</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Over 100,000 contractors and 20,000+ homeowners trust HFS Financial for home improvement financing.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {HFS_BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 items-start">
                <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <benefit.icon className="h-5 w-5 text-brand-green" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* HFS Embed */}
        <Section id="apply">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4">
              Apply Now — No Credit Impact
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Use the calculator below to estimate your monthly payment, or click
              &ldquo;Inquire Now&rdquo; to check your rate with no impact to your credit score.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg bg-white">
              <iframe
                src={HFS_PROMO_URL}
                title="HFS Financial Home Improvement Loan — Elite Finishes"
                className="w-full border-0"
                style={{ height: "1800px", minHeight: "1200px" }}
                loading="lazy"
                allow="payment"
              />
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Shield className="h-3.5 w-3.5" /> Secure and encrypted
              </span>
              <span className="flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> No hard credit pull
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> Same-day qualifications
              </span>
            </div>
          </div>
        </Section>

        {/* Payment Options */}
        <Section variant="warm">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4">All Payment Options</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Financing is not the only way to pay. Here is every option we accept.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {PAYMENT_OPTIONS.map((option) => (
              <div
                key={option.title}
                className={`rounded-2xl p-6 border ${
                  option.highlight
                    ? "border-brand-green/40 bg-brand-green/5 ring-1 ring-brand-green/20"
                    : "border-border/40 bg-white"
                }`}
              >
                {option.highlight && (
                  <span className="inline-block mb-3 px-2.5 py-0.5 bg-gradient-to-r from-brand-green to-brand-green-dark text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </span>
                )}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand-green/10 flex items-center justify-center">
                    <option.icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{option.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {option.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Price Ranges */}
        <Section>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              What Do Projects Typically Cost?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every project is unique. These ranges give you a starting point.
              Your free estimate will be specific to your property and goals.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-border/30 overflow-hidden shadow-sm">
              {PRICE_RANGES.map((item, i) => (
                <div
                  key={item.service}
                  className={`flex items-center justify-between px-6 py-4 ${
                    i < PRICE_RANGES.length - 1 ? "border-b border-border/20" : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold text-sm">{item.service}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.note}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="font-bold text-brand">{item.range}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4">
              Prices are general ranges based on typical projects in the Baltimore
              area. Your estimate will reflect your specific scope, materials,
              and site conditions.
            </p>
          </div>
        </Section>

        {/* Pricing Promise */}
        <Section variant="warm">
          <div className="grid gap-10 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">Our Pricing Promise</h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We give you one price. That is the price you pay. No change
                orders for work we should have accounted for upfront, no surprise
                fees at the end of a job.
              </p>
              <ul className="space-y-3">
                {[
                  "Written estimate before any work begins",
                  "Price holds once you approve — no mid-project increases",
                  "Change orders only for work you specifically add or change",
                  "Payment milestones tied to actual progress on the job",
                  "We never ask for more than 50% upfront",
                  `Licensed ${SITE.license} — backed by Maryland's consumer protection fund`,
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-border/30 p-8 shadow-sm">
              <h3 className="text-xl font-bold mb-3">
                Not Sure What Your Project Will Cost?
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Get a free on-site estimate first. We will come to your property,
                assess the project, and give you a clear written price. Then you
                can decide how to pay — including financing through HFS Financial.
              </p>
              <div className="space-y-3">
                <CTAButton href="/contact" className="w-full">
                  Request a Free Estimate
                  <ArrowRight className="h-4 w-4" />
                </CTAButton>
                <CTAButton variant="phone" className="w-full" />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-4">
                Estimates are always free. We respond within one business day.
              </p>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl mb-4">
                Financing FAQs
              </h2>
              <p className="text-muted-foreground text-lg">
                Common questions about paying for painting and remodeling projects
                in the Baltimore area.
              </p>
            </div>
            <FAQAccordion items={FINANCING_FAQS} />
          </div>
        </Section>

        {/* Final CTA */}
        <section className="bg-primary text-white py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
              Check your rate in minutes with no credit impact, or request a free
              estimate to find out exactly what your project will cost.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a href={HFS_APPLY_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-xl bg-gradient-to-r from-brand to-brand-dark text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Check Your Rate <ArrowRight className="h-5 w-5" />
              </a>
              <CTAButton href="/contact" variant="outline-light" size="lg">
                Get a Free Estimate
              </CTAButton>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-6 max-w-lg mx-auto">
              {SITE.name} is a licensed painting and remodeling contractor
              ({SITE.license}) serving 28 communities across the Baltimore area.
              Financing provided by HFS Financial, a third-party lender.
              Loan terms and rates subject to credit approval.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
