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
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { Section } from "@/components/shared/Section";
import { CTAButton } from "@/components/shared/CTAButton";
import { TrustBar } from "@/components/shared/TrustBar";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { FAQPageSchema } from "@/components/shared/SchemaOrg";

export const metadata: Metadata = {
  title: `Financing for Painting and Remodeling Projects | ${SITE.name}`,
  description: `Finance your painting or remodeling project in Baltimore with flexible payment plans through Wisetack. Prequalify in minutes with no impact to your credit score. Licensed contractor ${SITE.license}.`,
  openGraph: {
    title: `Financing for Painting and Remodeling | ${SITE.name}`,
    description: `Flexible financing for Baltimore painting and remodeling. Prequalify in minutes through Wisetack — no hard credit pull. Licensed ${SITE.license}.`,
    images: [{
      url: `${SITE.url}/api/og?title=Financing+Options&subtitle=Flexible+Payment+Plans+for+Your+Project`,
      width: 1200, height: 630,
      alt: "Elite Finishes Financing Options",
    }],
  },
  alternates: { canonical: `${SITE.url}/financing` },
};

const PAYMENT_OPTIONS = [
  {
    icon: Percent,
    title: "Wisetack Financing",
    desc: "Prequalify in minutes with no impact to your credit score. Pay over time with fixed monthly payments — rates as low as 0% APR for qualified borrowers. Loans from $500 to $25,000.",
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
    question: "How does Wisetack financing work for home improvement projects?",
    answer:
      "Wisetack offers fixed-rate installment loans for home improvement projects. You prequalify in minutes with a soft credit check that does not affect your score. If approved, you choose a payment plan (typically 3 to 60 months), and Elite Finishes gets paid directly so your project starts immediately. You make fixed monthly payments to Wisetack with no balloon payments and no prepayment penalties.",
  },
  {
    question: "What credit score do I need to qualify for Wisetack financing?",
    answer:
      "Wisetack considers multiple factors beyond just your credit score, including income and debt-to-income ratio. There is no minimum score published, but the soft prequalification check takes about 30 seconds and tells you your options without any impact to your credit. If you prequalify, a hard credit check only happens when you formally accept a loan offer.",
  },
  {
    question: "Does prequalifying affect my credit score?",
    answer:
      "No. Wisetack uses a soft credit check for prequalification, which does not appear on your credit report and has zero impact on your score. A hard inquiry only occurs if you decide to accept a loan offer and move forward.",
  },
  {
    question: "What are the interest rates and loan terms?",
    answer:
      "Wisetack offers rates as low as 0% APR for qualified borrowers. Terms range from 3 to 60 months depending on the loan amount and your credit profile. Loan amounts range from $500 to $25,000. You will see your exact rate, monthly payment, and total cost before you commit to anything.",
  },
  {
    question: "Can I finance painting or remodeling projects in the Baltimore area?",
    answer:
      "Yes. Every painting and remodeling service we offer is eligible for Wisetack financing. That includes interior painting, exterior painting, kitchen and bathroom remodeling, basement finishing, flooring, siding, roofing, decks, and commercial services. There is no restriction on project type.",
  },
  {
    question: "How much does Elite Finishes require upfront?",
    answer:
      "For projects paid in full or by card, we never ask for more than 50% upfront. The balance is due at completion. With Wisetack financing, the lender pays us directly, so you may have zero out-of-pocket upfront depending on your loan terms. We discuss payment structure during your free estimate.",
  },
  {
    question: "Is there a penalty for paying off the loan early?",
    answer:
      "No. Wisetack loans have no prepayment penalties. You can pay off your balance early at any time without additional fees.",
  },
  {
    question: "Do you offer financing for projects over $25,000?",
    answer:
      "Wisetack loans go up to $25,000, which covers the majority of our projects. For larger projects like whole-home renovations or major multi-phase work, we can structure milestone-based payment schedules and discuss additional options. Ask us during your estimate and we will find a solution that works for your budget.",
  },
];

export default function FinancingPage() {
  return (
    <>
      <FAQPageSchema faqs={FINANCING_FAQS} />

      <article>
        {/* Hero */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-semibold mb-6">
                <Percent className="h-3.5 w-3.5" />
                Rates as low as 0% APR
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Finance Your Home Project{" "}
                <span className="text-brand-green">With Flexible Payments</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl mb-8 leading-relaxed">
                Do not wait to get the home you deserve. Prequalify
                for financing in minutes through Wisetack with no impact to your credit
                score and start your project now with fixed monthly payments.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <CTAButton href="#prequalify" size="lg">
                  Check Your Rate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
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
              How Contractor Financing Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Elite Finishes partners with Wisetack to offer simple, transparent
              financing for painting and remodeling projects in the Baltimore area.
              Here is how the process works.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Prequalify in Minutes",
                desc: "Enter basic info in the Wisetack form below. A soft credit check shows your loan options instantly with no impact to your credit score.",
              },
              {
                step: "2",
                title: "Choose Your Plan",
                desc: "Pick the monthly payment and term that fits your budget. See your exact rate, total cost, and payment amount before you commit.",
              },
              {
                step: "3",
                title: "Start Your Project",
                desc: "Once approved, Wisetack pays Elite Finishes directly. Your project starts on schedule and you make fixed monthly payments.",
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

        {/* Wisetack Embed */}
        <Section variant="warm" id="prequalify">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl mb-4">
              Prequalify Now — No Credit Impact
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Check your rate in under 60 seconds. This is a soft credit check and
              will not affect your credit score.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-lg bg-white">
              <iframe
                src="https://wisetack.us/#/m39n9j4/prequalify"
                title="Wisetack Financing Prequalification for Elite Finishes"
                className="w-full border-0"
                style={{ height: "700px", minHeight: "600px" }}
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
                <Clock className="h-3.5 w-3.5" /> Takes about 60 seconds
              </span>
            </div>
          </div>
        </Section>

        {/* Payment Options */}
        <Section>
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
                    ? "border-brand/40 bg-brand/5 ring-1 ring-brand/20"
                    : "border-border/40 bg-white"
                }`}
              >
                {option.highlight && (
                  <span className="inline-block mb-3 px-2.5 py-0.5 bg-gradient-to-r from-brand to-brand-dark text-white text-xs font-bold rounded-full">
                    RECOMMENDED
                  </span>
                )}
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 h-11 w-11 rounded-xl bg-brand/10 flex items-center justify-center">
                    <option.icon className="h-5 w-5 text-brand" />
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

        {/* Comparison Table */}
        <Section variant="warm">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl mb-4">
              Comparing Your Payment Options
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Which payment method makes the most sense depends on your project
              size and financial goals.
            </p>
          </div>
          <div className="max-w-4xl mx-auto overflow-x-auto rounded-2xl border border-border/50 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-white">
                  <th className="px-5 py-4 text-left font-bold text-foreground border-b border-border/40">Feature</th>
                  <th className="px-5 py-4 text-left font-bold text-brand border-b border-border/40">Wisetack Financing</th>
                  <th className="px-5 py-4 text-left font-bold text-foreground border-b border-border/40">Credit Card</th>
                  <th className="px-5 py-4 text-left font-bold text-foreground border-b border-border/40">Pay in Full</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Upfront cost", "As low as $0", "Full amount charged", "Up to 50% deposit"],
                  ["Interest rate", "As low as 0% APR", "15 to 25% APR (typical)", "None"],
                  ["Credit impact to check", "None (soft pull)", "Hard inquiry", "N/A"],
                  ["Monthly payments", "Fixed, predictable", "Variable minimum", "N/A"],
                  ["Prepayment penalty", "None", "None", "N/A"],
                  ["Best for", "Projects $1,000 to $25,000", "Smaller projects", "Any size"],
                  ["Approval time", "About 60 seconds", "Existing card limit", "Immediate"],
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-warm-bg/50" : "bg-white"}>
                    <td className="px-5 py-3 font-medium text-foreground border-b border-border/20">{row[0]}</td>
                    <td className="px-5 py-3 text-muted-foreground border-b border-border/20">{row[1]}</td>
                    <td className="px-5 py-3 text-muted-foreground border-b border-border/20">{row[2]}</td>
                    <td className="px-5 py-3 text-muted-foreground border-b border-border/20">{row[3]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
                can decide how to pay.
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
              Prequalify for financing in under 60 seconds, or request a free
              estimate to find out exactly what your project will cost.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <CTAButton href="#prequalify" size="lg">
                Check Your Rate <ArrowRight className="h-5 w-5" />
              </CTAButton>
              <CTAButton href="/contact" variant="outline-light" size="lg">
                Get a Free Estimate
              </CTAButton>
            </div>
            <p className="text-sm text-muted-foreground/80 mt-6 max-w-lg mx-auto">
              {SITE.name} is a licensed painting and remodeling contractor
              ({SITE.license}) serving 28 communities across the Baltimore area,
              Maryland. Financing provided by Wisetack, a third-party lender.
              Loan terms and rates subject to credit approval.
            </p>
          </div>
        </section>
      </article>
    </>
  );
}
