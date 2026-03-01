import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Hammer, Users, Clock, ThumbsUp, ShieldCheck, MessageSquare, Star, Award, MapPin } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { ProcessSteps } from "@/components/shared/ProcessSteps";
import { AreaGrid } from "@/components/shared/AreaGrid";
import { FAQAccordion } from "@/components/shared/FAQAccordion";
import { CTAButton } from "@/components/shared/CTAButton";
import { FlagStripe } from "@/components/shared/FlagStripe";
import { GalleryGrid } from "@/components/shared/GalleryGrid";
import { ScrollReveal, StaggerChildren, StaggerItem, StickyStack, StackOver, ParallaxImage, CountUp } from "@/components/shared/animations";
import type { Metadata } from "next";
import { PRIMARY_SERVICES, TESTIMONIALS, GALLERY_ITEMS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${SITE.name} | Painting and Remodeling Contractor in Baltimore, MD`,
  description: `${SITE.name} is a licensed Baltimore painting and home remodeling contractor serving 28 communities across Baltimore City, Baltimore County, Anne Arundel County, and Howard County. Interior and exterior painting, kitchen and bathroom remodeling, flooring, siding, decks, roofing, and more. ${SITE.license}. Free estimates — call ${SITE.phone}.`,
  openGraph: {
    siteName: "Elite Finishes",
    title: `${SITE.name} | Painting and Remodeling Contractor in Baltimore, MD`,
    description: `Licensed Baltimore painting and home remodeling contractor. Interior and exterior painting, kitchens, bathrooms, flooring, siding, decks, roofing. ${SITE.license}. Free estimates.`,
    url: SITE.url,
    images: [{ url: "/images/og-default.png", width: 1200, height: 630, alt: "Elite Finishes — Painting and Remodeling in Baltimore, MD" }],
  },
  alternates: { canonical: SITE.url },
};

const SERVICE_CHIPS = PRIMARY_SERVICES.map((s) => ({ label: s.title, href: `/services/${s.slug}` }));

const PROCESS = [
  { step: 1, title: "Request Your Estimate", description: "Fill out our quick form or give us a call. Tell us about your project and we'll schedule a time to visit your property." },
  { step: 2, title: "On-Site Consultation", description: "We come to you, assess the project, discuss your vision, and provide a clear written estimate with no pressure and no obligation." },
  { step: 3, title: "Approve and Schedule", description: "Review your estimate at your own pace. Once approved, we lock in your start date and coordinate materials and crew." },
  { step: 4, title: "Expert Work and Walkthrough", description: "Our crew delivers quality craftsmanship from start to finish. When the job is done, we walk through every detail together before you sign off." },
];

const WHY_US = [
  { icon: ShieldCheck, title: "Licensed and Insured", desc: `${SITE.license} and ${SITE.license2} — fully licensed with the Maryland Home Improvement Commission. Documentation available on request.` },
  { icon: Hammer, title: "Quality You Can See", desc: "Thorough prep work, premium materials, and clean execution. Every surface we touch is treated with the same care as if it were our own home." },
  { icon: MessageSquare, title: "Clear Communication", desc: "You will always know what is happening, what is next, and what it costs. No surprises, no vague estimates, no disappearing act mid-project." },
  { icon: Users, title: "Family Owned and Local", desc: "We live and work in the Baltimore area. Our reputation in this community is everything, and we treat every project like it reflects our name." },
  { icon: Clock, title: "On Time and On Budget", desc: "We give you a timeline and a price and we stick to both. If something changes, we tell you immediately and get your approval before moving forward." },
  { icon: ThumbsUp, title: "Satisfaction Guaranteed", desc: "We are not finished until you are thrilled with the result. Quality workmanship and your complete satisfaction are the standard, not the exception." },
];

const HOME_FAQS = [
  { question: "How quickly can you start my project?", answer: "Most projects can be scheduled within one to three weeks of estimate approval. Smaller jobs like single-room painting or drywall repair can sometimes be fit in sooner. We will always give you a realistic start date during your consultation so you can plan accordingly." },
  { question: "Do you offer free estimates?", answer: "Yes, always. We visit your property, assess the project, and provide a detailed written estimate at no charge and no obligation. There is no pressure to book and no fee for the visit." },
  { question: "What areas do you serve?", answer: "We serve Baltimore City, Baltimore County, Anne Arundel County, and Howard County. That includes Baltimore, Towson, Catonsville, Ellicott City, Columbia, Annapolis, Glen Burnie, Dundalk, Pikesville, Owings Mills, and many more communities throughout the region." },
  { question: "Are you licensed and insured?", answer: `Absolutely. We are a licensed Maryland Home Improvement Contractor (${SITE.license}) and a registered Women's Business Enterprise (${SITE.license2}). We carry full liability insurance and are happy to provide documentation before any work begins.` },
  { question: "Can you handle multiple projects at once?", answer: "Yes. Many homeowners bundle services such as interior painting with flooring or a kitchen remodel with a bathroom refresh. Bundling often saves time and reduces the disruption to your home since we are already on site and working." },
  { question: "What if I am not sure exactly what I need?", answer: "No problem at all. Give us a call or submit a request describing what you want to accomplish. We will assess your space and recommend the best approach. We are painters and remodelers, not salespeople, so our advice is always based on what actually makes sense for your home." },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO: Split Layout with Image Collage ===== */}
      <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden">
        {/* Mobile: image background visible */}
        <div className="absolute inset-0 lg:hidden">
          <Image
            src="/images/pexels-binyaminmellish-106399.jpg"
            alt="Beautiful home exterior remodeled by Elite Finishes in Baltimore"
            fill
            className="object-cover object-[center_60%]"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95" />
        </div>

        {/* Desktop: split layout */}
        <div className="hidden lg:block absolute inset-0">
          <div className="absolute inset-0 bg-primary" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 min-h-[90vh] lg:min-h-screen items-center gap-8 lg:gap-12">
            {/* Left: Content */}
            <div className="lg:col-span-6 pt-12 pb-8 lg:py-24 text-white">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand-green/15 border border-brand-green/40 text-brand-green text-xs font-semibold mb-6">
                <ShieldCheck className="h-3.5 w-3.5" />
                Licensed {SITE.license} &middot; Baltimore, MD
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1.05] mb-6 text-balance">
                Painting and Remodeling in
                <span className="text-white block mt-1">Baltimore, MD</span>
              </h1>

              <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
                Interior and exterior painting, kitchen and bathroom remodeling, flooring, siding, roofing, and more — delivered by a licensed local crew that treats your home with the respect it deserves.
              </p>

              {/* Social proof stats */}
              <div className="flex flex-wrap gap-6 mb-8 pb-8 border-b border-white/10">
                <div>
                  <div className="flex gap-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} className="h-5 w-5 fill-white text-white" />)}
                  </div>
                  <p className="text-xs text-white/50 mt-1">5-Star Rated</p>
                </div>
                <div>
                  <p className="text-3xl font-display text-white">28</p>
                  <p className="text-xs text-white/50 mt-0.5">Communities Served</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <CTAButton href="/contact" size="lg" variant="primaryGreen">
                  Get a Free Estimate
                  <ArrowRight className="h-5 w-5" />
                </CTAButton>
                <CTAButton variant="phone" size="lg">
                  Call {SITE.phone}
                </CTAButton>
              </div>

              <div className="flex flex-wrap gap-2">
                {SERVICE_CHIPS.slice(0, 5).map((chip) => (
                  <Link
                    key={chip.label}
                    href={chip.href}
                    className="px-4 py-2.5 text-xs font-medium bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 hover:border-white/20 text-white/60 hover:text-white/80"
                  >
                    {chip.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: Image Collage (desktop only) */}
            <div className="hidden lg:block lg:col-span-6 relative py-16">
              <div className="grid grid-cols-12 grid-rows-6 gap-3 h-[600px]">
                {/* Main large image */}
                <div className="col-span-8 row-span-4 relative rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/pexels-artbovich-7031616.jpg"
                    alt="Interior painting in progress in a Baltimore home by Elite Finishes"
                    fill
                    className="object-cover"
                    priority
                    sizes="40vw"
                  />
                </div>
                {/* Top right small image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-artbovich-6301185.jpg"
                    alt="Kitchen remodeling by Elite Finishes in Baltimore"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                {/* Bottom right small image */}
                <div className="col-span-4 row-span-3 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/house-exterior.jpg"
                    alt="Exterior painting by Elite Finishes in Baltimore County"
                    fill
                    className="object-cover"
                    sizes="20vw"
                  />
                </div>
                {/* Bottom left image */}
                <div className="col-span-8 row-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/images/pexels-artbovich-8146335.jpg"
                    alt="Professional painting crew completing a project in the Baltimore area"
                    fill
                    className="object-cover"
                    sizes="30vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FlagStripe className="h-2" />
      <TrustBar />

      {/* ===== Stats Counter Bar ===== */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/pexels-artbovich-8146335.jpg"
            alt="Elite Finishes painting crew at work on a Maryland home"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-primary/85" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center text-white">
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-white mb-1">Fast</p>
              <p className="text-sm text-white/60">Response Guarantee</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-white mb-1"><CountUp target={28} /></p>
              <p className="text-sm text-white/60">Communities Served</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand-green mb-1">5.0</p>
              <p className="text-sm text-white/60">Average Star Rating</p>
            </div>
            </StaggerItem>
            <StaggerItem>
            <div>
              <p className="text-4xl md:text-5xl font-display text-brand-green mb-1">MHIC</p>
              <p className="text-sm text-white/60">Licensed and Insured</p>
            </div>
            </StaggerItem>
          </StaggerChildren>
        </div>
      </section>

      {/* ===== Services Grid ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">What We Do</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From a single-room paint refresh to a full kitchen remodel, we handle every phase of your project with care and precision.
          </p>
        </div>
        </ScrollReveal>
        <StaggerChildren className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PRIMARY_SERVICES.map((service) => (
            <StaggerItem key={service.slug} className="h-full">
              <ServiceCard {...service} />
            </StaggerItem>
          ))}
        </StaggerChildren>
        <ScrollReveal delay={0.3}>
        <div className="text-center mt-10">
          <CTAButton href="/services" variant="outline-green">
            View All Services
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
        </ScrollReveal>
      </Section>

      {/* ===== Full-Bleed Image Break ===== */}
      <StickyStack>
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <ParallaxImage
          src="/images/pexels-artbovich-7533755.jpg"
          alt="Freshly painted interior room in a Baltimore home by Elite Finishes"
          className="absolute inset-0"
          speed={0.12}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/40 to-transparent" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            <ScrollReveal direction="left">
            <blockquote className="max-w-lg text-white">
              <p className="font-display text-2xl md:text-3xl leading-snug mb-3">
                &ldquo;They treated our home like it was their own. Incredible work from start to finish.&rdquo;
              </p>
              <cite className="text-brand-green text-sm font-semibold not-italic">
                &mdash; Maria S., Baltimore MD
              </cite>
            </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>
      </StickyStack>

      {/* ===== Why Choose Us (Asymmetric Layout) ===== */}
      <StackOver>
      <Section>
        <div className="grid gap-12 lg:grid-cols-5 items-center">
          {/* Left: Large project image */}
          <div className="lg:col-span-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4]">
              <Image
                src="/images/pexels-artbovich-7147282.jpg"
                alt="Elite Finishes painter delivering meticulous interior work in a Baltimore home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-brand-green to-brand-green-dark text-white rounded-xl px-5 py-3 shadow-lg">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-white" />)}
              </div>
              <p className="text-xs mt-1 font-medium">5-Star Rated</p>
            </div>
          </div>

          {/* Right: Benefits */}
          <div className="lg:col-span-3">
            <ScrollReveal>
            <h2 className="text-3xl md:text-5xl mb-4">
              Why Homeowners Choose Elite Finishes
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              We earn every project through honest work, fair pricing, and results you can see.
            </p>
            </ScrollReveal>
            <StaggerChildren className="grid gap-6 sm:grid-cols-2">
              {WHY_US.map((item, i) => (
                <StaggerItem key={item.title}>
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 h-11 w-11 rounded-xl flex items-center justify-center ${i % 2 === 0 ? "bg-brand/10" : "bg-brand-green/10"}`}>
                    <item.icon className={`h-5 w-5 ${i % 2 === 0 ? "text-brand" : "text-brand-green"}`} />
                  </div>
                  <div>
                    <h3 className="font-bold mb-0.5 text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </Section>

      {/* ===== Featured Gallery Strip ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Recent Projects</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what we have delivered for homeowners throughout the Baltimore area.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
        <GalleryGrid items={GALLERY_ITEMS.slice(0, 8)} />
        </ScrollReveal>
        <ScrollReveal delay={0.3}>
        <div className="text-center mt-8">
          <CTAButton href="/gallery" variant="outline-green">
            View Full Gallery
            <ArrowRight className="h-4 w-4" />
          </CTAButton>
        </div>
        </ScrollReveal>
      </Section>

      {/* ===== Process ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From your first call to the final walkthrough, here is what to expect when you work with us.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
        <ProcessSteps steps={PROCESS} />
        </ScrollReveal>
      </Section>

      {/* ===== Testimonials (Featured + Grid) ===== */}
      <Section variant="warm">
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">What Our Customers Say</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real feedback from real homeowners throughout the Baltimore area.
          </p>
        </div>
        </ScrollReveal>
        {/* Featured large quote */}
        <ScrollReveal delay={0.1}>
        <div className="mb-8">
          <TestimonialCard {...TESTIMONIALS[0]} featured />
        </div>
        </ScrollReveal>
        {/* Supporting testimonials */}
        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(1).map((t) => (
            <StaggerItem key={t.name}>
              <TestimonialCard {...t} />
            </StaggerItem>
          ))}
        </StaggerChildren>
      </Section>

      {/* ===== Service Areas ===== */}
      <Section>
        <ScrollReveal>
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl mb-4">Areas We Serve</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Proud to serve homeowners throughout Baltimore City, Baltimore County, Anne Arundel County, and Howard County.
          </p>
        </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
        <AreaGrid />
        </ScrollReveal>
      </Section>

      {/* ===== FAQ ===== */}
      <Section variant="warm">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
          <FAQAccordion items={HOME_FAQS} />
          </ScrollReveal>
        </div>
      </Section>
      </StackOver>

      {/* ===== Final CTA with Visible Image ===== */}
      <StickyStack>
      <section className="relative overflow-hidden py-20 md:py-28">
        <ParallaxImage
          src="/images/pexels-artbovich-8146201.jpg"
          alt="Elite Finishes painting and remodeling in Baltimore Maryland"
          className="absolute inset-0"
          speed={0.1}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <ScrollReveal>
          <h2 className="text-3xl md:text-5xl mb-4">
            Ready to Transform Your Home?
          </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-8">
            Get a free, no-pressure estimate from a licensed contractor who shows up on time, communicates clearly, and delivers work you will be proud to show off.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <CTAButton href="/contact" size="lg">
              Get Your Free Estimate
              <ArrowRight className="h-5 w-5" />
            </CTAButton>
            <CTAButton variant="phone" size="lg">
              Call {SITE.phone}
            </CTAButton>
          </div>
          <p className="text-white/40 text-sm mt-6">
            Estimates are always free.
          </p>
          </ScrollReveal>
        </div>
      </section>
      </StickyStack>
    </>
  );
}
