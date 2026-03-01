/**
 * Server-side env config. Use for conditional features and API behavior.
 * NEXT_PUBLIC_* are available in client components via process.env.
 */

export const env = {
  /** Show Calendly booking on contact page when set */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || null,

  /** Dashboard protection */
  dashboardPassword: process.env.DASHBOARD_PASSWORD?.trim() || null,

  /** Cron-automations auth */
  cronSecret: process.env.CRON_SECRET?.trim() || null,

  /** Admin SMS notifications (new lead alerts) */
  adminPhone: process.env.ADMIN_PHONE?.trim() || null,

  /** Optional reCAPTCHA: when set, POST /api/leads can verify recaptchaToken */
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY?.trim() || null,

  /** Supabase (required for leads + chat) */
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || null,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || null,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() || null,

  /** OpenAI (required for chatbot) */
  openaiApiKey: process.env.OPENAI_API_KEY?.trim() || null,

  /** Twilio SMS */
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID?.trim() || null,
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN?.trim() || null,
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER?.trim() || null,

  /** Resend email */
  resendApiKey: process.env.RESEND_API_KEY?.trim() || null,
  emailFrom: process.env.EMAIL_FROM?.trim() || null,

  /** PostHog (client uses NEXT_PUBLIC_POSTHOG_KEY / NEXT_PUBLIC_POSTHOG_HOST) */
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim() || null,
  posthogHost: process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim() || "https://us.i.posthog.com",
} as const;

export function hasCalendly(): boolean {
  return Boolean(env.calendlyUrl);
}

export function hasRecaptcha(): boolean {
  return Boolean(env.recaptchaSecretKey);
}
