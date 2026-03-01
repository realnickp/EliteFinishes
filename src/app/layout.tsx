import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { PublicShell } from "@/components/layout/PublicShell";
import { AnalyticsProvider } from "@/components/layout/AnalyticsProvider";
import { LocalBusinessSchema } from "@/components/shared/SchemaOrg";
import { SITE } from "@/lib/constants";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Painting and Remodeling in Baltimore, MD`,
    template: `%s | ${SITE.name}`,
  },
  description: `${SITE.name} is Baltimore's premier painting and home remodeling contractor. Interior painting, exterior painting, kitchen and bathroom remodeling, flooring, siding, decks, roofing, and commercial services. Licensed ${SITE.license}. Free estimates — call ${SITE.phone}.`,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE.name,
    title: `${SITE.name} | Painting and Remodeling in Baltimore, MD`,
    description: `Licensed Baltimore painting and home remodeling contractor. Interior and exterior painting, kitchen and bathroom remodeling, flooring, siding, roofing, decks, and more. ${SITE.license}. Free estimates.`,
    url: SITE.url,
    images: [
      {
        url: `/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Painting and Remodeling in Baltimore, MD`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Painting and Remodeling in Baltimore, MD`,
    description: `Licensed Baltimore painting and home remodeling contractor. Free estimates — call ${SITE.phone}.`,
    images: [
      {
        url: `/images/og-default.png`,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — Painting and Remodeling in Baltimore, MD`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE.url,
  },
  keywords: [
    "painting contractor Baltimore MD",
    "interior painting Baltimore",
    "exterior painting Baltimore",
    "kitchen remodeling Baltimore",
    "bathroom remodeling Baltimore",
    "home remodeling Baltimore County",
    "basement finishing Baltimore",
    "flooring installation Maryland",
    "siding contractor Baltimore",
    "roofing contractor Baltimore MD",
    "painting company Anne Arundel County",
    "commercial painting Baltimore",
    SITE.license,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerif.variable} font-sans antialiased`}
      >
        <AnalyticsProvider>
          <LocalBusinessSchema />
          <PublicShell>{children}</PublicShell>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
