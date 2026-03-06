import type { Metadata } from "next";
import { Suspense } from "react";
import { SITE } from "@/lib/constants";
import { EstimateQuiz } from "@/components/shared/EstimateQuiz";

export const metadata: Metadata = {
  title: `Free Estimate Quiz | ${SITE.name}`,
  description: `Answer a few quick questions about your project and get a personalized estimate from ${SITE.name}. No obligation, no pressure — free estimates for painting and remodeling in Baltimore, MD.`,
  alternates: { canonical: `${SITE.url}/quote/quiz` },
  openGraph: {
    siteName: SITE.name,
    title: `Free Estimate Quiz | ${SITE.name}`,
    description: `Answer a few quick questions and get a free, personalized estimate for your painting or remodeling project in Baltimore.`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: `${SITE.name} — Free Estimate Quiz` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Estimate Quiz | ${SITE.name}`,
    description: `Quick quiz to get a free painting or remodeling estimate in Baltimore, MD.`,
    images: [{ url: "/images/og-default.jpg", width: 1200, height: 630, alt: `${SITE.name} — Free Estimate Quiz` }],
  },
};

export default function QuizPage() {
  return (
    <div className="min-h-[60vh]">
      <Suspense
        fallback={
          <div className="flex items-center justify-center py-32">
            <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
          </div>
        }
      >
        <EstimateQuiz />
      </Suspense>
    </div>
  );
}
