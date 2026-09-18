"use client";

import { useMemo, useRef, useState } from "react";
import { ArrowLeft, Check, Clock, Loader2, Lock } from "lucide-react";
import type { BuilderQuestion } from "@/lib/lp-landing";
import { extractBudget, extractTimeframe } from "@/lib/quiz-data";
import { submitLpLead } from "@/lib/lp-lead";
import { trackEvent } from "@/lib/analytics";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { useZipCityAutofill } from "@/hooks/useZipCityAutofill";
import { formatLocation, isValidCity, isValidZip } from "@/lib/location";
import { LeadField, isValidPhone, goToThanks } from "./LeadField";

/** Questions whose showIf condition matches the answers so far. */
function visibleQuestions(questions: BuilderQuestion[], answers: Record<string, string>) {
  return questions.filter((q) => !q.showIf || q.showIf.anyOf.includes(answers[q.showIf.questionId] ?? ""));
}

interface ProjectBuilderProps {
  slug: string;
  serviceTitle: string;
  title: string;
  questions: BuilderQuestion[];
}

/** Tap-through estimate builder that runs inline on the landing page. */
export function ProjectBuilder({ slug, serviceTitle, title, questions }: ProjectBuilderProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const advancing = useRef(false);
  const { spamFields, HoneypotField } = useSpamProtection();

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [chosen, setChosen] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state: zipState } = useZipCityAutofill(zip, city, setCity);

  const visible = useMemo(() => visibleQuestions(questions, answers), [questions, answers]);

  const onContact = step >= visible.length;
  const totalSteps = visible.length + 1;
  const progress = ((Math.min(step, visible.length) + 1) / totalSteps) * 100;
  const current = visible[step];

  function keepInView() {
    requestAnimationFrame(() => {
      const el = cardRef.current;
      if (el && el.getBoundingClientRect().top < 72) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  function handleAnswer(label: string) {
    if (!current || advancing.current) return;
    advancing.current = true;
    const nextAnswers = { ...answers, [current.id]: label };
    const next = step + 1;
    setChosen(label);
    setAnswers(nextAnswers);
    if (step === 0) trackEvent("lp_builder_started", { service: slug });
    if (next >= visibleQuestions(questions, nextAnswers).length) {
      trackEvent("lp_builder_contact_step", { service: slug });
    }

    setTimeout(() => {
      setChosen("");
      setStep(next);
      advancing.current = false;
      keepInView();
    }, 260);
  }

  function handleBack() {
    setError("");
    setStep((s) => Math.max(0, Math.min(s, visible.length) - 1));
    keepInView();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !isValidPhone(phone) || !isValidZip(zip) || !isValidCity(city)) {
      setError("Please add your name, a 10 digit phone number, your zip code and your city.");
      return;
    }

    setLoading(true);
    try {
      const answered = visible.filter((q) => answers[q.id]);
      await submitLpLead({
        slug,
        service: serviceTitle,
        method: "builder",
        name,
        phone,
        cityOrZip: formatLocation(city, zip, zipState),
        email,
        description:
          answered.map((q) => `${q.question.replace("?", "")}: ${answers[q.id]}`).join(" | ") ||
          `Interested in: ${serviceTitle}`,
        timeframe: extractTimeframe(answers.timeline ?? ""),
        budget: extractBudget(answered.map((q) => answers[q.id])),
        spamFields: spamFields(),
      });
      goToThanks(slug, name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call or text us instead.");
      setLoading(false);
    }
  }

  return (
    <div
      ref={cardRef}
      id="estimate"
      className="scroll-mt-24 overflow-hidden rounded-2xl bg-white text-foreground shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/10"
    >
      {/* Header + progress */}
      <div className="px-5 pt-5 sm:px-6 sm:pt-6">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-display text-xl leading-tight sm:text-2xl">{title}</p>
          <p className="shrink-0 text-xs font-medium text-muted-foreground">
            {onContact ? "Last step" : `Step ${step + 1} of ${totalSteps}`}
          </p>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-brand-green transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {!onContact && current ? (
          <div key={current.id} className="animate-in fade-in slide-in-from-right-2 duration-200">
            <h2 className="font-sans text-lg font-bold leading-snug sm:text-xl">{current.question}</h2>
            <div className="mt-3.5 space-y-2">
              {current.options.map((option) => {
                const selected = chosen ? chosen === option.label : answers[current.id] === option.label;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => handleAnswer(option.label)}
                    className={`flex min-h-[52px] w-full cursor-pointer items-center gap-3 rounded-lg border px-4 py-2.5 text-left text-[15px] font-semibold leading-tight transition-colors active:scale-[0.99] ${
                      selected
                        ? "border-brand-green bg-brand-green/[0.07] text-brand-green-dark"
                        : "border-border bg-white hover:border-foreground/40"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                        selected ? "border-brand-green bg-brand-green" : "border-foreground/25"
                      }`}
                      aria-hidden
                    >
                      {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                    </span>
                    <span className="flex-1">{option.label}</span>
                  </button>
                );
              })}
            </div>
            <div className="mt-3 flex min-h-[44px] items-center justify-between text-xs text-muted-foreground">
              {step > 0 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-1 px-2 hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Back
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Takes about 60 seconds
                </span>
              )}
              <span>Free · No obligation</span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="animate-in fade-in slide-in-from-right-2 duration-200">
            <HoneypotField />
            <h2 className="font-sans text-xl font-bold leading-snug sm:text-2xl">
              Last step: who should we call about your free estimate?
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              We&apos;ll reach out within one business day to set up a time that works for you.
            </p>

            <div className="mt-5 space-y-3.5">
              <LeadField
                id="pb-name"
                label="Your name"
                autoComplete="name"
                placeholder="First and last name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <LeadField
                id="pb-phone"
                label="Phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(443) 555-0123"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="grid grid-cols-2 gap-3">
                <LeadField
                  id="pb-zip"
                  label="Zip code"
                  inputMode="numeric"
                  autoComplete="postal-code"
                  maxLength={10}
                  placeholder="21230"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
                <LeadField
                  id="pb-city"
                  label="City"
                  autoComplete="address-level2"
                  placeholder="Baltimore"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
              <LeadField
                id="pb-email"
                label="Email"
                optional
                type="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-5 flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-brand-green text-base font-bold text-white transition-colors hover:bg-brand-green-dark active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Get my free estimate
                </>
              )}
            </button>

            <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
              <button
                type="button"
                onClick={handleBack}
                className="-ml-2 inline-flex min-h-[44px] cursor-pointer items-center gap-1 px-2 hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
              <span className="inline-flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Private. No spam, ever.
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
