"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Loader2,
  Phone,
  Shield,
  Star,
} from "lucide-react";
import { QUIZ_DATA, extractTimeframe, extractBudget } from "@/lib/quiz-data";
import { PRIMARY_SERVICES, SITE } from "@/lib/constants";
import { trackEvent } from "@/lib/analytics";

type Step = "service" | "quiz" | "contact" | "thanks";

const STEP_AFFIRMS = [
  "Nice — keep going!",
  "You're doing great!",
  "Almost there!",
  "Last one — you've got this!",
];

const NEXT_STEPS = [
  { emoji: "📋", title: "We review your details", desc: "Our team looks over exactly what you told us and comes prepared with real answers." },
  { emoji: "📞", title: "Our team calls you", desc: "Most customers hear back within one business day — often much sooner." },
  { emoji: "🏡", title: "Free on-site estimate", desc: "We visit your property, walk the project with you, and give you a written quote. No pressure." },
];

interface EstimateQuizProps {
  preselectedService?: string;
}

export function EstimateQuiz({ preselectedService }: EstimateQuizProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceParam = preselectedService || searchParams.get("service") || "";

  const [step, setStep] = useState<Step>(serviceParam && QUIZ_DATA[serviceParam] ? "quiz" : "service");
  const [serviceSlug, setServiceSlug] = useState(serviceParam);
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [chosen, setChosen] = useState("");
  const [hydrated, setHydrated] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cityOrZip, setCityOrZip] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState("");

  const questions = QUIZ_DATA[serviceSlug] ?? [];
  const svc = PRIMARY_SERVICES.find((s) => s.slug === serviceSlug);
  const serviceTitle = svc?.title ?? serviceSlug;

  const totalSteps = questions.length + 2;
  const currentGlobalStep = step === "service" ? 0 : step === "quiz" ? quizStep + 1 : questions.length + 1;
  const progress = (currentGlobalStep / totalSteps) * 100;

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(`ef_quiz_${serviceSlug}`);
      if (saved && serviceSlug) {
        const parsed = JSON.parse(saved) as { answers: string[]; quizStep: number };
        if (Array.isArray(parsed.answers) && parsed.answers.length === questions.length) {
          setAnswers(parsed.answers);
          setQuizStep(Math.min(parsed.quizStep ?? 0, questions.length - 1));
        }
      }
    } catch { /* ignore */ }
    setHydrated(true);
  }, [serviceSlug, questions.length]);

  const persist = useCallback(
    (newAnswers: string[], qStep: number) => {
      try {
        sessionStorage.setItem(`ef_quiz_${serviceSlug}`, JSON.stringify({ answers: newAnswers, quizStep: qStep }));
      } catch { /* ignore */ }
    },
    [serviceSlug]
  );

  function selectService(slug: string) {
    setServiceSlug(slug);
    const qs = QUIZ_DATA[slug] ?? [];
    setAnswers(Array(qs.length).fill(""));
    setQuizStep(0);
    setChosen("");
    setStep("quiz");
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function handleQuizAnswer(answer: string) {
    setChosen(answer);
    const newAnswers = [...answers];
    newAnswers[quizStep] = answer;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (quizStep < questions.length - 1) {
        const next = quizStep + 1;
        persist(newAnswers, next);
        setQuizStep(next);
        setChosen("");
      } else {
        persist(newAnswers, quizStep);
        setStep("contact");
      }
      window.scrollTo({ top: 0, behavior: "instant" });
    }, 320);
  }

  function handleBack() {
    if (step === "contact") {
      setStep("quiz");
      setQuizStep(questions.length - 1);
      setChosen(answers[questions.length - 1] || "");
    } else if (step === "quiz" && quizStep > 0) {
      const prev = quizStep - 1;
      persist(answers, prev);
      setQuizStep(prev);
      setChosen(answers[prev] || "");
    } else {
      setStep("service");
      setServiceSlug("");
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function buildDescription(): string {
    const parts = questions
      .map((q, i) => (answers[i] ? `${q.question.replace("?", "")}: ${answers[i]}` : null))
      .filter(Boolean);
    if (!parts.length) return `Interested in: ${serviceTitle}`;
    return parts.join(" | ");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!name.trim() || !phone.trim() || !cityOrZip.trim()) {
      setError("Please fill in your name, phone number, and zip code.");
      return;
    }
    setLoading(true);
    try {
      const lastAnswer = answers[answers.length - 1] ?? "";
      const timeframe = extractTimeframe(lastAnswer);
      const budget = extractBudget(answers);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim() || "",
          service: serviceTitle,
          cityOrZip: cityOrZip.trim(),
          description: buildDescription(),
          timeframe,
          budget,
          source: `website_quiz:${serviceSlug}`,
          landingPage: typeof window !== "undefined" ? window.location.href : "/quote/quiz",
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error || "Submission failed");
      }
      trackEvent("quiz_lead_submitted", { service: serviceSlug, timeframe, budget });
      try { sessionStorage.removeItem(`ef_quiz_${serviceSlug}`); } catch { /* ignore */ }
      setFirstName(name.trim().split(" ")[0]);
      setStep("thanks");
      window.scrollTo({ top: 0, behavior: "instant" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try calling us directly.");
    } finally {
      setLoading(false);
    }
  }

  if (!hydrated) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-8 w-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
      </div>
    );
  }

  // ── Thanks screen ──
  if (step === "thanks") {
    return (
      <div className="mx-auto max-w-xl py-12 px-4 text-center">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-green/15 mb-6">
          <CheckCircle className="h-8 w-8 text-brand-green" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Thank you, {firstName}!
        </h2>
        <p className="text-muted-foreground mb-8 text-lg">
          We&apos;ve received your {serviceTitle.toLowerCase()} estimate request and will be in touch within one business day.
        </p>
        <div className="bg-warm-bg rounded-2xl border border-border/30 p-6 mb-8 text-left">
          <h3 className="font-bold mb-4 text-center">What Happens Next</h3>
          <ul className="space-y-4">
            {NEXT_STEPS.map((s, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-2xl leading-none shrink-0">{s.emoji}</span>
                <div>
                  <p className="font-semibold text-sm">{s.title}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <a
          href={SITE.phoneTel}
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand/90 transition-colors"
        >
          <Phone className="h-4 w-4" />
          Need it faster? Call {SITE.phone}
        </a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:py-12">
      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-brand transition-all duration-700 ease-out rounded-full"
          style={{ width: `${Math.max(progress, 3)}%` }}
        />
      </div>

      {/* ── Service selection ── */}
      {step === "service" && (
        <div>
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand mb-3">
              Free Estimate Quiz
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              What type of project are you planning?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Pick your project type and answer a few quick questions. We&apos;ll prepare a personalized estimate — no obligation, no pressure.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PRIMARY_SERVICES.filter((s) => QUIZ_DATA[s.slug]).map((svc) => (
              <button
                key={svc.slug}
                onClick={() => selectService(svc.slug)}
                className="group relative flex flex-col items-center rounded-2xl border-2 border-border bg-white overflow-hidden hover:border-brand/50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image src={svc.image} alt={svc.title} fill className="object-cover" sizes="(max-width: 640px) 50vw, 220px" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <span className="w-full px-3 py-3 text-sm font-semibold leading-snug text-foreground group-hover:text-brand transition-colors">
                  {svc.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Quiz questions ── */}
      {step === "quiz" && questions[quizStep] && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand">
              {quizStep === 0 ? `Free ${serviceTitle} Estimate` : STEP_AFFIRMS[Math.min(quizStep - 1, STEP_AFFIRMS.length - 1)]}
            </span>
            <span className="text-sm text-muted-foreground">
              {quizStep + 1} of {questions.length}
            </span>
          </div>
          <div className="mb-7">
            <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-3">
              {questions[quizStep].question}
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {questions[quizStep].subtext}
            </p>
          </div>
          <div className={`grid gap-3 mb-8 ${questions[quizStep].options.some((o) => o.image) ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-2"}`}>
            {questions[quizStep].options.map((option) => {
              const isSelected = chosen === option.label || (!chosen && answers[quizStep] === option.label);
              return (
                <button
                  key={option.label}
                  onClick={() => handleQuizAnswer(option.label)}
                  className={[
                    "relative flex flex-col items-center justify-center rounded-2xl border-2 text-center overflow-hidden min-h-[44px]",
                    "transition-all duration-200 cursor-pointer select-none",
                    option.image ? "gap-0" : "gap-2.5 p-5",
                    isSelected
                      ? "border-brand bg-brand/8 shadow-lg shadow-brand/15 scale-[1.03]"
                      : "border-border bg-white hover:border-brand/50 hover:shadow-md hover:scale-[1.01] active:scale-[0.99]",
                  ].join(" ")}
                >
                  {option.image ? (
                    <>
                      <div className="relative w-full aspect-[4/3]">
                        <Image src={option.image} alt={`${option.label} option`} fill className="object-cover" sizes="(max-width: 640px) 50vw, 260px" />
                      </div>
                      <span className={`w-full px-3 py-3 text-sm font-semibold leading-snug ${isSelected ? "text-brand" : "text-foreground"}`}>
                        {option.label}
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-3xl leading-none">{option.emoji}</span>
                      <span className={`text-sm font-semibold leading-snug ${isSelected ? "text-brand" : "text-foreground"}`}>
                        {option.label}
                      </span>
                    </>
                  )}
                  {isSelected && (
                    <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 py-2 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors -ml-3"
          >
            <ArrowLeft className="h-4 w-4" />
            {quizStep === 0 ? "Change service" : "Previous question"}
          </button>
        </div>
      )}

      {/* ── Contact form ── */}
      {step === "contact" && (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-semibold uppercase tracking-wide text-brand mb-3">
              Almost done!
            </span>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              You&apos;re seconds away from your free estimate
            </h2>
            <p className="text-muted-foreground">
              Our team reviews every request and responds within one business day. No pressure, no obligation — just an honest quote.
            </p>
          </div>

          {/* Quiz summary */}
          {answers.filter(Boolean).length > 0 && (
            <div className="bg-warm-bg rounded-2xl border border-border/30 p-5 mb-7">
              <p className="text-sm font-semibold text-foreground/70 mb-3">
                Here&apos;s what you told us — we&apos;ll be prepared:
              </p>
              <ul className="space-y-2">
                {questions.map((q, i) =>
                  answers[i] ? (
                    <li key={i} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand shrink-0 mt-0.5" />
                      <span>
                        <span className="text-muted-foreground">{q.question.replace("?", "")}:</span>{" "}
                        <span className="font-semibold">{answers[i]}</span>
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          )}

          <div className="flex items-center justify-center gap-4 mb-7 text-sm text-muted-foreground">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="h-4 w-4 fill-brand text-brand" />
              ))}
            </div>
            <span>Trusted by 500+ Maryland homeowners</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="eq-name" className="text-sm font-medium">Your Name <span className="text-destructive">*</span></label>
                <input id="eq-name" type="text" placeholder="First & last name" value={name} onChange={(e) => setName(e.target.value)} required
                  className="w-full h-11 min-h-[44px] rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="eq-phone" className="text-sm font-medium">Phone Number <span className="text-destructive">*</span></label>
                <input id="eq-phone" type="tel" placeholder="(443) 555-0123" value={phone} onChange={(e) => setPhone(e.target.value)} required
                  className="w-full h-11 min-h-[44px] rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label htmlFor="eq-zip" className="text-sm font-medium">Zip Code <span className="text-destructive">*</span></label>
                <input id="eq-zip" type="text" placeholder="21401" value={cityOrZip} onChange={(e) => setCityOrZip(e.target.value)} required
                  className="w-full h-11 min-h-[44px] rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground" />
              </div>
              <div className="space-y-1.5">
                <label htmlFor="eq-email" className="text-sm font-medium">
                  Email <span className="text-muted-foreground font-normal text-xs">(optional)</span>
                </label>
                <input id="eq-email" type="email" placeholder="you@email.com" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-11 min-h-[44px] rounded-lg border border-input bg-white px-3 py-2.5 text-sm shadow-xs outline-none focus:border-brand focus:ring-2 focus:ring-brand/20 placeholder:text-muted-foreground" />
              </div>
            </div>

            {error && <p className="text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">{error}</p>}

            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-br from-brand to-brand-dark text-white font-bold py-4 min-h-[48px] text-base rounded-xl hover:shadow-lg hover:shadow-brand/25 transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer">
              {loading ? (
                <><Loader2 className="h-4 w-4 animate-spin" /> Sending your details...</>
              ) : (
                <>Send My Project Details <ArrowRight className="h-4 w-4" /></>
              )}
            </button>

            <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <Shield className="h-3.5 w-3.5 shrink-0" />
              Your info is private. No spam — ever. Licensed {SITE.license}
            </p>
          </form>

          <div className="mt-6 text-center">
            <button onClick={handleBack}
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 min-h-[44px] text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Go back to questions
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
