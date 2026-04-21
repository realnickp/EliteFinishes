"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2, LogIn, DoorOpen } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const rawRedirect = searchParams.get("redirect") || "/canvasser";
  const redirect =
    rawRedirect.startsWith("/") && !rawRedirect.startsWith("//")
      ? rawRedirect
      : "/canvasser";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/canvasser/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error === "Too many attempts. Try again later."
            ? "Too many failed attempts. Please wait before trying again."
            : "Invalid email or password."
        );
        return;
      }

      router.push(redirect);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1.5">
          Canvasser email
        </label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="username"
            required
            className="w-full pl-10 pr-3 py-2.5 text-sm bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-1.5">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password from your admin"
            autoComplete="current-password"
            required
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 placeholder-gray-500"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-300 bg-red-950/50 border border-red-900 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 bg-orange-500 text-white text-sm font-bold rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
        Sign in to canvass
      </button>

      <p className="text-xs text-gray-400 text-center pt-1">
        Forgot your password? Ask your admin to reset it.
      </p>
    </form>
  );
}

export default function CanvasserLoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500/20 ring-1 ring-orange-500/40 flex items-center justify-center mb-4">
            <DoorOpen className="h-8 w-8 text-orange-400" />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-orange-400 mb-1">
            Door-to-Door Team
          </p>
          <h1 className="text-2xl font-bold text-white">Canvasser Portal</h1>
          <p className="text-sm text-gray-400 mt-1">
            Sign in to submit a lead from the field.
          </p>
        </div>

        <div className="bg-gray-900/80 backdrop-blur rounded-2xl shadow-2xl border border-gray-800 p-6">
          <Suspense fallback={<div className="h-40 flex items-center justify-center"><Loader2 className="h-5 w-5 animate-spin text-gray-400" /></div>}>
            <LoginForm />
          </Suspense>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-xs text-gray-500 hover:text-gray-300 underline underline-offset-2"
          >
            ← Not a canvasser? Pick a different login
          </Link>
        </div>
      </div>
    </div>
  );
}
