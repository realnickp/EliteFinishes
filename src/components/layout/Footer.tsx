import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Shield, MessageSquare } from "lucide-react";
import { SITE, PRIMARY_SERVICES, CITY_DATA } from "@/lib/constants";
import { FlagStripe } from "@/components/shared/FlagStripe";

const FOOTER_CITIES = CITY_DATA.filter((c) =>
  ["baltimore", "towson", "catonsville", "ellicott-city", "columbia", "annapolis", "glen-burnie", "dundalk", "pikesville", "owings-mills", "cockeysville", "timonium", "pasadena", "severna-park", "arnold", "parkville", "middle-river", "randallstown", "woodlawn", "jessup"].includes(c.slug)
);

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground dark-textured">
      <FlagStripe className="h-2" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-24 lg:pb-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Image
              src="/images/logo.png"
              alt="Elite Finishes"
              width={200}
              height={76}
              className="h-18 w-auto mb-5 brightness-110"
            />
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-4">
              Licensed painting and home remodeling contractor serving Baltimore, Baltimore County, Anne Arundel County, and Howard County, Maryland.
            </p>
            <div className="flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-2 text-sm text-brand-green">
                <Shield className="h-4 w-4 flex-shrink-0" />
                <span className="font-medium">MHIC {SITE.license}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/50">
                <Shield className="h-4 w-4 flex-shrink-0 opacity-60" />
                <span>WBME {SITE.license2}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <a
                href={SITE.phoneTel}
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 min-h-[44px]"
              >
                <Phone className="h-4 w-4 text-brand-green" />
                {SITE.phone}
              </a>
              <a
                href={SITE.phoneSms}
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 min-h-[44px]"
              >
                <MessageSquare className="h-4 w-4 text-brand-green" />
                Text us anytime
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 min-h-[44px]"
              >
                <Mail className="h-4 w-4 text-brand-green" />
                {SITE.email}
              </a>
              <div className="inline-flex items-start gap-2 text-sm text-primary-foreground/60 py-2">
                <MapPin className="h-4 w-4 text-brand-green flex-shrink-0 mt-0.5" />
                <span>{SITE.address.street}, {SITE.address.city}, {SITE.address.stateCode} {SITE.address.zip}</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-brand-green">Services</h3>
            <ul className="space-y-0.5">
              {PRIMARY_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Areas We Serve</h3>
            <ul className="space-y-0.5">
              {FOOTER_CITIES.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/areas/${city.slug}`}
                    className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block"
                  >
                    {city.name}, MD
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/areas"
                  className="text-sm text-brand-green font-semibold hover:text-brand-green-dark hover:underline py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block"
                >
                  View all 28 areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">Company</h3>
            <ul className="space-y-0.5">
              <li><Link href="/" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Home</Link></li>
              <li><Link href="/about" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">About Us</Link></li>
              <li><Link href="/services" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">All Services</Link></li>
              <li><Link href="/areas" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Service Areas</Link></li>
              <li><Link href="/financing" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Financing</Link></li>
              <li><Link href="/gallery" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Project Gallery</Link></li>
              <li><Link href="/testimonials" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Reviews</Link></li>
              <li><Link href="/blog" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Blog</Link></li>
              <li><Link href="/quote" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Free Estimate</Link></li>
              <li><Link href="/contact" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Contact</Link></li>
              <li><Link href="/privacy-policy" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-primary-foreground/60 hover:text-brand-green transition-colors py-2 block min-h-[44px] flex items-center lg:min-h-0 lg:py-0 lg:block">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/40">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5" />
            <p>Licensed Maryland Home Improvement Contractor &middot; MHIC {SITE.license}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
