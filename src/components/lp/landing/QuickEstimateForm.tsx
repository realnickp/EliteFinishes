"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Lock } from "lucide-react";
import { submitLpLead } from "@/lib/lp-lead";
import { useSpamProtection } from "@/hooks/useSpamProtection";
import { useZipCityAutofill } from "@/hooks/useZipCityAutofill";
import { formatLocation, isValidCity, isValidZip } from "@/lib/location";
import { LeadField, isValidPhone, goToThanks } from "./LeadField";

interface QuickEstimateFormProps {
  slug: string;
  serviceTitle: string;
}

/** Short name, phone, zip and city form for visitors who skip the Project Builder. */
export function QuickEstimateForm({ slug, serviceTitle }: QuickEstimateFormProps) {
  const { spamFields, HoneypotField } = useSpamProtection();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { state: zipState } = useZipCityAutofill(zip, city, setCity);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!name.trim() || !isValidPhone(phone) || !isValidZip(zip) || !isValidCity(city)) {
      setError("Please add your name, a 10 digit phone number, your zip code and your city.");
      return;
    }

    setLoading(true);
    try {
      await submitLpLead({
        slug,
        service: serviceTitle,
        method: "form",
        name,
        phone,
        cityOrZip: formatLocation(city, zip, zipState),
        email: "",
        description: note.trim()
          ? `Quick form: ${note.trim()}`
          : `Quick form on the ${serviceTitle} ad page. Details to be gathered on follow-up.`,
        timeframe: "To be discussed",
        spamFields: spamFields(),
      });
      goToThanks(slug, name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please call or text us instead.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      <HoneypotField />
      <LeadField
        id="qf-name"
        label="Your name"
        autoComplete="name"
        placeholder="First and last name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <LeadField
        id="qf-phone"
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
          id="qf-zip"
          label="Zip code"
          inputMode="numeric"
          autoComplete="postal-code"
          maxLength={10}
          placeholder="21230"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <LeadField
          id="qf-city"
          label="City"
          autoComplete="address-level2"
          placeholder="Baltimore"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="space-y-1.5">
        <label htmlFor="qf-note" className="text-sm font-medium">
          What do you need done?
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        </label>
        <textarea
          id="qf-note"
          rows={3}
          maxLength={1000}
          placeholder="A few words about your project"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full rounded-xl border border-input bg-white px-3.5 py-3 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex min-h-[56px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand to-brand-dark text-base font-bold text-white shadow-lg shadow-brand/25 transition-all hover:shadow-xl active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request My Free Estimate
            <ArrowRight className="h-5 w-5" />
          </>
        )}
      </button>

      <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
        <Lock className="h-3.5 w-3.5" />
        Private. No spam, ever.
      </p>
    </form>
  );
}
