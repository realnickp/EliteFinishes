import type { InputHTMLAttributes } from "react";

interface LeadFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  optional?: boolean;
}

/** Large, thumb friendly input used by the landing page lead forms. */
export function LeadField({ id, label, optional, className = "", ...inputProps }: LeadFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
        {optional ? (
          <span className="ml-1 text-xs font-normal text-muted-foreground">(optional)</span>
        ) : (
          <span className="text-brand"> *</span>
        )}
      </label>
      <input
        id={id}
        className={`h-12 w-full rounded-xl border border-input bg-white px-3.5 text-base outline-none transition placeholder:text-muted-foreground/70 focus:border-brand focus:ring-2 focus:ring-brand/20 ${className}`}
        {...inputProps}
      />
    </div>
  );
}

export function isValidPhone(phone: string): boolean {
  return phone.replace(/\D/g, "").length >= 10;
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export function thanksUrl(slug: string, name: string): string {
  return `/lp/${slug}/thanks?name=${encodeURIComponent(name.trim().split(" ")[0])}`;
}

/**
 * Full page load (not client-side routing) so the Google tag records a real
 * page view of the thank-you URL, which is what the Google Ads "Submit lead
 * form" conversion counts.
 */
export function goToThanks(slug: string, name: string) {
  window.location.assign(thanksUrl(slug, name));
}
