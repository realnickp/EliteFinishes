import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Shield, Heart, Eye, Hammer, Users, Award } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { TrustBar } from "@/components/shared/TrustBar";
import { CTAButton } from "@/components/shared/CTAButton";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { SITE, TESTIMONIALS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "About Us | Baltimore Painting and Remodeling Contractor",
  description: `${SITE.name} is a family-owned, licensed painting and home remodeling contractor serving Baltimore and surrounding Maryland counties. Learn about our story, values, and commitment to quality.`,
  openGraph: {
    title: "About Us | Baltimore Painting and Remodeling Contractor",
    description: `${SITE.name} is a family-owned, licensed painting and home remodeling contractor serving Baltimore and surrounding Maryland counties. Learn about our story, values, and commitment to quality.`,
    url: `${SITE.url}/about`,
    images: [{
      url: `${SITE.url}/api/og?title=About+Elite+Finishes&subtitle=Baltimore%27s+Premier+Painting+Contractor`,
      width: 1200, height: 630,
      alt: "About Elite Finishes — Baltimore Painting and Remodeling Contractor",
    }],
  },
  alternates: { canonical: `${SITE.url}/about` },
};

const VALUES = [
  {
    icon: Hammer,
    title: "Craftsmanship First",
    description:
      "Every surface we prep, every coat we apply, every tile we set is done with intention. We work the right way because our name is on every project we complete.",
    accent: "from-brand/20 to-brand/5",
  },
  {
    icon: Eye,
    title: "Honest Communication",
    description:
      "You will never wonder what is happening with your project. We give you a clear scope, a clear price, and clear updates throughout the entire job.",
    accent: "from-blue-500/15 to-blue-500/5",
  },
  {
    icon: Heart,
    title: "Treat It Like Our Own",
    description:
      "We work in your home like it is our own. That means clean job sites, careful preparation, protection of your belongings, and respect for your space every single day.",
    accent: "from-rose-500/15 to-rose-500/5",
  },
  {
    icon: Users,
    title: "Local Relationships",
    description:
      "We live and work in the Baltimore area. Our reputation in this community means everything to us, and every job is an opportunity to earn another neighbor's trust.",
    accent: "from-emerald-500/15 to-emerald-500/5",
  },
  {
    icon: Shield,
    title: "Licensed and Accountable",
    description: `We carry ${SITE.license} and ${SITE.license2} because we believe in accountability. Licensed, insured, and standing behind every project we complete.`,
    accent: "from-violet-500/15 to-violet-500/5",
  },
  {
    icon: Award,
    title: "Results You Can See",
    description:
      "Our gallery is real work done for real homeowners throughout the Baltimore area. We are proud of every project and happy to provide references on request.",
    accent: "from-amber-500/15 to-amber-500/5",
  },
];

const HERO_IMAGES = [
  { src: "/images/pexels-artbovich-7031616.jpg", alt: "Elite Finishes painter working on an interior room" },
  { src: "/images/house-exterior.jpg", alt: "Exterior painting on a Baltimore area home" },
  { src: "/images/pexels-artbovich-6301185.jpg", alt: "Kitchen remodeling completed by Elite Finishes" },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero: 3-image collage background ── */}
      <section className="relative overflow-hidden bg-primary min-h-[520px] md:min-h-[600px] flex items-center">
        {/* Three-column image collage behind the hero */}
        <div className="absolute inset-0 grid grid-cols-3">
          {HERO_IMAGES.map((img) => (
            <div key={img.src} className="relative overflow-hidden">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="34vw"
                priority
              />
            </div>
          ))}
        </div>
        {/* Dark overlay for text readability with images showing through */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-primary/60" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center py-20 md:py-28">
          <p className="inline-block text-brand-green font-semibold text-sm tracking-widest uppercase mb-4">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-3xl mx-auto leading-tight">
            Premium Painting and Remodeling, Done Right
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto leading-relaxed">
            We are a licensed Baltimore contractor focused on one thing: delivering
            finishes and renovations that look great and hold up. No shortcuts, no
            surprises—just clear estimates and work we stand behind.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* ── Our Story ── */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              We Transform Homes That Families Are Proud to Live In
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Elite Finishes started with a simple idea: homeowners in
                Baltimore deserve a contractor who shows up when they say they
                will, does exactly what they promised, and delivers work that
                lasts for years.
              </p>
              <p>
                Too many people have been burned by contractors who disappear
                after collecting a deposit, use cheap materials to protect their
                margin, or leave a mess that takes days to clean up. We built
                this company to be the opposite of that experience.
              </p>
              <p>
                Every project we take on, whether it is a fresh coat of paint in
                Federal Hill or a full kitchen remodel in Towson, gets the same
                thorough preparation, the same premium materials, and the same
                honest communication from first estimate to final walkthrough.
              </p>
              <p>
                We are not a franchise. We are not a national chain. We are a
                family owned crew that lives and works in this community and
                takes pride in making Baltimore homes look and feel their best.
              </p>
            </div>
            <div className="mt-8">
              <CTAButton href="/contact">
                Work With Us <ArrowRight className="h-5 w-5" />
              </CTAButton>
            </div>
          </div>

          {/* Stacked / overlapping image pair */}
          <div className="relative lg:pl-8">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pexels-artbovich-8146201.jpg"
                alt="Elite Finishes crew delivering quality painting work in a Baltimore home"
                width={600}
                height={450}
                className="w-full object-cover"
              />
            </div>
            {/* Offset second image for visual depth */}
            <div className="absolute -bottom-8 -left-4 md:-left-10 w-[55%] rounded-xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src="/images/pexels-artbovich-7147282.jpg"
                alt="Detail of professional painting work by Elite Finishes"
                width={400}
                height={300}
                className="w-full object-cover"
              />
            </div>
            {/* MHIC badge overlapping the image stack */}
            <div className="absolute -top-4 -right-2 md:-right-6 bg-primary text-white rounded-xl px-5 py-3 shadow-lg ring-4 ring-white z-10">
              <p className="text-xs font-semibold tracking-wide text-brand-green uppercase">
                Licensed
              </p>
              <p className="text-lg font-bold leading-tight">MHIC</p>
              <p className="text-xs text-white/70">153498</p>
            </div>
          </div>
        </div>
      </Section>

      {/* ── Full-bleed project image strip ── */}
      <section className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
        <Image
          src="/images/pexels-artbovich-8143696.jpg"
          alt="Elite Finishes painting crew completing a project in the Baltimore area"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-transparent to-primary/30" />
      </section>

      {/* ── Values ── */}
      <Section variant="warm">
        <div className="grid gap-12 lg:grid-cols-5 items-start">
          {/* Left editorial intro */}
          <div className="lg:col-span-2">
            <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
              What Drives Us
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Stand For
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              These are not just words on a page. They are how we run every job,
              handle every phone call, and earn every five-star review.
            </p>
            <div className="hidden lg:block mt-8 relative rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/pexels-artbovich-7005296.jpg"
                alt="Elite Finishes exterior painting project on a Baltimore area home"
                width={500}
                height={380}
                className="w-full object-cover"
              />
            </div>
          </div>

          {/* Value cards */}
          <div className="lg:col-span-3 grid gap-5 sm:grid-cols-2">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className={`relative rounded-2xl bg-white p-6 shadow-sm border border-border/30 overflow-hidden group hover:shadow-md transition-shadow ${
                  i === 0 ? "sm:col-span-2" : ""
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${value.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 mb-4">
                    <value.icon className="h-5 w-5 text-brand-green" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Testimonials ── */}
      <Section>
        <div className="text-center mb-12">
          <p className="text-brand-green font-semibold text-sm tracking-widest uppercase mb-3">
            Real Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Hear From Our Customers
          </h2>
        </div>

        {/* Featured testimonial + 2 regular */}
        <div className="grid gap-6 lg:grid-cols-2 mb-6">
          <TestimonialCard {...TESTIMONIALS[0]} featured />
          <div className="grid gap-6">
            <TestimonialCard {...TESTIMONIALS[1]} />
            <TestimonialCard {...TESTIMONIALS[2]} />
          </div>
        </div>
      </Section>

      {/* ── CTA with visible background ── */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <Image
          src="/images/pexels-artbovich-8146335.jpg"
          alt="Professional painting work in a Baltimore area home by Elite Finishes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/75 via-primary/60 to-primary/80" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Work With a Contractor You Can Trust?
          </h2>
          <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
            Get a free estimate and see why homeowners throughout Baltimore and
            surrounding Maryland counties choose Elite Finishes for their painting and remodeling projects.
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
        </div>
      </section>
    </>
  );
}
