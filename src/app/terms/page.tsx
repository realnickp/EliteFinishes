import type { Metadata } from "next";
import { Section } from "@/components/shared/Section";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Terms and Conditions | ${SITE.name}`,
  description: `Terms and Conditions for all services provided by ${SITE.name}, a Maryland-licensed Home Improvement Contractor (${SITE.license}).`,
  alternates: { canonical: `${SITE.url}/terms` },
};

export default function TermsPage() {
  return (
    <>
      <section className="bg-primary text-primary-foreground py-12 md:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold">Terms and Conditions</h1>
          <p className="text-primary-foreground/70 mt-2">Effective: January 21, 2026</p>
        </div>
      </section>

      <Section>
        <div className="mx-auto max-w-4xl space-y-10">

          <p className="text-muted-foreground leading-relaxed">
            These Terms and Conditions (&ldquo;Terms&rdquo;) govern all services provided by {SITE.name}
            (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), a Maryland-licensed
            Home Improvement Contractor (MHIC {SITE.license}). By engaging our services, requesting an estimate, or
            making a payment, you (&ldquo;Client,&rdquo; &ldquo;you,&rdquo; or &ldquo;your&rdquo;) agree to these
            Terms. We reserve the right to update these Terms at any time, with notice provided via email or our
            website ({SITE.domain}). Continued use of our services constitutes acceptance of changes.
          </p>

          <div>
            <h2 className="text-2xl font-bold mb-3">1. Services</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We provide interior painting, exterior painting, kitchen remodeling, bathroom remodeling, home
                remodeling, basement finishing, flooring installation and refinishing, siding installation, roofing,
                concrete and masonry work, deck building, commercial painting and renovation, and related home
                improvement services throughout the Baltimore metropolitan area in Maryland.
              </p>
              <p>
                All services are described in your estimate or contract. We may subcontract portions to qualified
                professionals, but we remain responsible for overall quality and compliance.
              </p>
              <p>
                Services are performed in accordance with Maryland law and MHIC regulations. Customizations or
                changes must be in writing and may incur additional fees.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">2. Estimates and Contracts</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Estimates are free and valid for 30 days. They are based on information provided and may change
                due to site conditions, material costs, or scope adjustments.
              </p>
              <p>
                A written contract is required for all projects over $500 per MHIC rules. It will detail scope,
                timeline, payment schedule, and any warranties.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">3. Payment Terms</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Payments accepted via check, credit card, bank transfer, or approved methods. All amounts in USD.
              </p>
              <p>
                We require a 25% deposit to schedule work; 60% upon project start; and the remaining 15% upon
                completion.
              </p>
              <p>
                Invoices are due within 7 days of receipt unless otherwise specified. Late payments incur 1.5%
                monthly interest.
              </p>
              <p>
                You are responsible for any government fees, taxes, or permits (passed through at cost).
              </p>
              <p>
                No refunds for completed work; cancellations before start may forfeit deposit (less reasonable
                costs, subject to cancellation rights below).
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">4. Cancellation Policy</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Pursuant to the Maryland Door-to-Door Sales Act (MD Commercial Law &sect; 14-301 et seq.) and
                federal regulations, if this contract was solicited or signed at your home or a location other
                than our place of business, you have the right to cancel without penalty within three (3) business
                days from the date of signing.
              </p>
              <p>
                As an extended courtesy, we provide a seven (7) day cancellation period for all contracts, during
                which you may cancel in writing without penalty (except for any custom materials ordered or work
                already initiated at your request).
              </p>
              <p>
                To cancel, provide written notice (email or mail) postmarked by midnight of the seventh day.
                Refunds will be issued within 10 business days. After this period, cancellations may incur fees
                based on progress.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">5. Timelines and Delays</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Project timelines are estimates and may be affected by weather, material availability, client
                delays, or unforeseen conditions.
              </p>
              <p>
                We will notify you of any delays. No liability for indirect losses (e.g., inconvenience) from
                delays.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">6. Warranties and Disclaimers</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We warrant services against defects in workmanship for 1 year from completion (materials per
                manufacturer warranty).
              </p>
              <p>
                Warranty claims must be in writing within 30 days of discovery. We will repair or replace at
                our discretion; no cash refunds.
              </p>
              <p>
                No warranty for client-provided materials, misuse, normal wear, or acts of God.
              </p>
              <p>
                Services provided &ldquo;as is&rdquo; except as stated; no implied warranties beyond MHIC
                requirements.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">7. Liability and Insurance</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Our liability is limited to the contract price. We are not responsible for consequential damages
                (e.g., lost profits, property damage from client negligence).
              </p>
              <p>
                We carry general liability insurance and workers&apos; compensation; proof available upon request.
                You are responsible for your property insurance.
              </p>
              <p>
                You agree to indemnify us against claims arising from your provided information or site conditions.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">8. Client Responsibilities</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Provide accurate project details, access to site, and necessary utilities.
              </p>
              <p>
                Obtain any required homeowner approvals (e.g., HOA); we assist with permits but you&apos;re
                responsible for compliance.
              </p>
              <p>
                Secure valuables and pets during work; we are not liable for loss or damage.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">9. Dispute Resolution</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                Any disputes will be resolved through good-faith negotiation. If unresolved, mediation in
                Maryland before arbitration or court.
              </p>
              <p>
                Governing law: Maryland. Venue: Baltimore City or Baltimore County.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">10. Privacy and Data</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                We collect personal data (e.g., name, address) for services and marketing. We protect it per
                privacy laws; no sharing without consent except as required (e.g., subcontractors). See our full
                Privacy Policy at {SITE.url}/privacy-policy.
              </p>
              <p>
                Opt out of marketing communications at any time by contacting us at{" "}
                <a href={`mailto:info@${SITE.domain}`} className="text-brand hover:underline">
                  info@{SITE.domain}
                </a>.
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-3">11. Miscellaneous</h2>
            <div className="space-y-3 text-muted-foreground leading-relaxed">
              <p>
                <strong>Force majeure:</strong> No liability for delays from uncontrollable events (e.g., weather,
                strikes).
              </p>
              <p>
                <strong>Entire agreement:</strong> These Terms, plus your contract or estimate, supersede prior
                discussions.
              </p>
              <p>
                <strong>Severability:</strong> Invalid provisions do not affect others.
              </p>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <h2 className="text-2xl font-bold mb-3">Contact</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms, please contact us:
            </p>
            <ul className="list-none mt-3 space-y-1 text-muted-foreground">
              <li><strong>{SITE.name}</strong></li>
              <li>{SITE.address.street}, {SITE.address.city}, {SITE.address.state} {SITE.address.zip}</li>
              <li>Phone: <a href={SITE.phoneTel} className="text-brand hover:underline">{SITE.phone}</a></li>
              <li>Email: <a href={`mailto:info@${SITE.domain}`} className="text-brand hover:underline">info@{SITE.domain}</a></li>
            </ul>
          </div>

        </div>
      </Section>
    </>
  );
}
