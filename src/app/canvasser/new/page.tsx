"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { ArrowLeft, Loader2, Shield, CheckCircle, Home, List } from "lucide-react";
import { PRIMARY_SERVICES, SITE } from "@/lib/constants";
import { QUIZ_DATA } from "@/lib/quiz-data";
import { QuizScreen } from "@/components/lp/QuizScreen";
import { ServicePicker } from "@/components/canvasser/ServicePicker";
import { PhotoUploader } from "@/components/canvasser/PhotoUploader";
import { TalkingPointsPanel } from "@/components/canvasser/TalkingPointsPanel";

type Stage = "service" | "quiz" | "contact" | "submitting" | "done";

export default function CanvasserNewLeadPage() {
  const [stage, setStage] = useState<Stage>("service");
  const [serviceSlug, setServiceSlug] = useState<string>("");
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState("");

  const [lastLeadName, setLastLeadName] = useState("");

  const svc = PRIMARY_SERVICES.find((s) => s.slug === serviceSlug);
  const questions = serviceSlug ? QUIZ_DATA[serviceSlug] ?? [] : [];

  function reset() {
    setStage("service");
    setServiceSlug("");
    setAnswers([]);
    setCurrentStep(0);
    setName("");
    setPhone("");
    setZip("");
    setEmail("");
    setNotes("");
    setPhotos([]);
    setError("");
  }

  function handleServicePick(slug: string) {
    setServiceSlug(slug);
    setAnswers(Array(QUIZ_DATA[slug]?.length ?? 0).fill(""));
    setCurrentStep(0);
    setStage("quiz");
  }

  function handleAnswer(answer: string) {
    const next = [...answers];
    next[currentStep] = answer;
    setAnswers(next);

    if (currentStep < questions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: "instant" });
      }, 320);
    } else {
      setTimeout(() => setStage("contact"), 320);
    }
  }

  function handleQuizBack() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      setStage("service");
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !phone.trim() || !zip.trim()) {
      setError("Please fill in the prospect's name, phone, and zip.");
      return;
    }

    setStage("submitting");
    try {
      const res = await fetch("/api/canvasser/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          cityOrZip: zip.trim(),
          email: email.trim() || undefined,
          service: serviceSlug,
          answers,
          photos,
          notes: notes.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Submission failed");
      }

      const leadName = name.trim();
      setLastLeadName(leadName);
      toast.success(`Lead submitted for ${leadName}`);
      setStage("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setStage("contact");
    }
  }

  // ── Stage: service picker ────────────────────────────────────────
  if (stage === "service") {
    return (
      <WithTalkingPoints>
        <ServicePicker selected={serviceSlug} onSelect={handleServicePick} />
      </WithTalkingPoints>
    );
  }

  // ── Stage: quiz ──────────────────────────────────────────────────
  // QuizScreen owns the full viewport during the guided conversation — no panel.
  if (stage === "quiz" && questions.length > 0) {
    return (
      <QuizScreen
        question={questions[currentStep]}
        stepIndex={currentStep}
        totalSteps={questions.length}
        onAnswer={handleAnswer}
        onBack={handleQuizBack}
        selectedAnswer={answers[currentStep] ?? ""}
        serviceTitle={svc?.title ?? serviceSlug}
      />
    );
  }

  // ── Stage: done ──────────────────────────────────────────────────
  if (stage === "done") {
    return (
      <div className="p-6 md:p-10 max-w-xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Lead submitted!</h1>
          <p className="text-gray-600">
            Nice work{lastLeadName ? ` on ${lastLeadName}` : ""}. The office has been notified and
            will follow up within one business day.
          </p>
          <button
            onClick={reset}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600"
          >
            Submit another lead
          </button>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Link
              href="/canvasser"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-200"
            >
              <Home className="h-4 w-4" /> Home
            </Link>
            <Link
              href="/canvasser/leads"
              className="inline-flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-medium py-2.5 rounded-xl hover:bg-gray-200"
            >
              <List className="h-4 w-4" /> My leads
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ── Stage: contact / submitting ──────────────────────────────────
  const submitting = stage === "submitting";

  return (
    <WithTalkingPoints>
    <div className="p-4 md:p-8 max-w-2xl mx-auto">
      <button
        onClick={() => setStage("quiz")}
        disabled={submitting}
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-4 disabled:opacity-50"
      >
        <ArrowLeft className="h-4 w-4" /> Back to questions
      </button>

      <div className="text-center mb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-600 mb-2">
          Step 3 of 3
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Capture their contact info
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Last step — the office will follow up within one business day.
        </p>
      </div>

      {answers.length > 0 && questions.length > 0 && (
        <div className="bg-orange-50/60 border border-orange-200/70 rounded-2xl p-4 mb-6">
          <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide mb-2">
            {svc?.title ?? "Service"} — quiz summary
          </p>
          <ul className="space-y-1.5">
            {questions.map((q, i) =>
              answers[i] ? (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    <span className="text-gray-500">{q.question.replace("?", "")}:</span>{" "}
                    <span className="font-semibold">{answers[i]}</span>
                  </span>
                </li>
              ) : null
            )}
          </ul>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 md:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="c-name" className="text-sm font-medium text-gray-700">
              Prospect name *
            </label>
            <input
              id="c-name"
              type="text"
              placeholder="First & last name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="c-phone" className="text-sm font-medium text-gray-700">
              Phone *
            </label>
            <input
              id="c-phone"
              type="tel"
              inputMode="tel"
              placeholder="(443) 555-0123"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="c-zip" className="text-sm font-medium text-gray-700">
              Zip code *
            </label>
            <input
              id="c-zip"
              type="text"
              inputMode="numeric"
              placeholder="21230"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              required
              className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="c-email" className="text-sm font-medium text-gray-700">
              Email <span className="text-gray-400 font-normal text-xs">(optional)</span>
            </label>
            <input
              id="c-email"
              type="email"
              placeholder="them@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="c-notes" className="text-sm font-medium text-gray-700">
            Notes for the office <span className="text-gray-400 font-normal text-xs">(optional)</span>
          </label>
          <textarea
            id="c-notes"
            rows={3}
            placeholder="Best time to call, access notes, anything the estimator should know…"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
          />
        </div>

        <div className="space-y-2 pt-2 border-t border-gray-100">
          <div>
            <p className="text-sm font-medium text-gray-700">
              Photos <span className="text-gray-400 font-normal text-xs">(optional)</span>
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              Snap the work area so the estimator walks in prepared. You can also submit without photos.
            </p>
          </div>
          <PhotoUploader photos={photos} onChange={setPhotos} />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-60"
        >
          {submitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : photos.length > 0 ? (
            `Submit lead with ${photos.length} photo${photos.length === 1 ? "" : "s"}`
          ) : (
            "Submit lead"
          )}
        </button>

        <p className="flex items-center justify-center gap-1.5 text-xs text-gray-500">
          <Shield className="h-3.5 w-3.5" />
          Licensed {SITE.license}
        </p>
      </form>
    </div>
    </WithTalkingPoints>
  );
}

function WithTalkingPoints({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-6 lg:p-6">
      <div className="min-w-0">{children}</div>
      <aside className="hidden lg:block">
        <div className="sticky top-6">
          <TalkingPointsPanel />
        </div>
      </aside>
    </div>
  );
}
