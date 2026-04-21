"use client";

import { useState } from "react";
import { X, Loader2, UserPlus, RefreshCw, Copy, Check } from "lucide-react";

interface CreateCanvasserModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

function generatePassword(length = 14): string {
  const alphabet =
    "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$";
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i++) out += alphabet[bytes[i] % alphabet.length];
  return out;
}

export function CreateCanvasserModal({ onClose, onSuccess }: CreateCanvasserModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [password, setPassword] = useState(() => generatePassword());
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: (fd.get("name") as string)?.trim(),
      email: (fd.get("email") as string)?.trim(),
      phone: (fd.get("phone") as string)?.trim() || null,
      password,
    };

    try {
      const res = await fetch("/api/admin/canvassers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to create canvasser");
      }
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function copyPassword() {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // noop
    }
  }

  const inputClass =
    "flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Add Canvasser</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cc-name" className={labelClass}>Name *</label>
              <input id="cc-name" name="name" required minLength={2} className={inputClass} placeholder="Jane Doe" />
            </div>
            <div>
              <label htmlFor="cc-phone" className={labelClass}>Phone (optional)</label>
              <input id="cc-phone" name="phone" type="tel" className={inputClass} placeholder="(410) 555-1234" />
            </div>
          </div>

          <div>
            <label htmlFor="cc-email" className={labelClass}>Email *</label>
            <input id="cc-email" name="email" type="email" required className={inputClass} placeholder="jane@example.com" />
          </div>

          <div>
            <label className={labelClass}>Starter Password *</label>
            <div className="flex items-center gap-2">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputClass} font-mono`}
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setPassword(generatePassword())}
                className="flex-shrink-0 p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
                title="Regenerate"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={copyPassword}
                className="flex-shrink-0 p-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-600"
                title="Copy"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Share this password with the canvasser securely. They cannot reset it themselves — only you can.
            </p>
          </div>

          {error && <p className="text-sm text-red-600 bg-red-50 rounded-md p-2">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
            >
              {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
              {submitting ? "Creating..." : "Create Canvasser"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
