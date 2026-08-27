"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{ background: "var(--color-section)" }}
    >
      <div
        className="w-full max-w-sm bg-white rounded-2xl border p-8"
        style={{
          borderColor: "var(--color-line)",
          boxShadow: "0 1px 2px rgba(30,18,51,0.04), 0 12px 32px -12px rgba(30,18,51,0.12)",
        }}
      >
        {sent ? (
          <div className="text-center py-4">
            <div
              className="mx-auto mb-4 flex items-center justify-center rounded-full"
              style={{ width: 48, height: 48, background: "#ecfdf5" }}
            >
              <CheckCircle2 size={24} style={{ color: "#059669" }} />
            </div>
            <h2
              className="text-sm font-semibold mb-2 font-[var(--font-poppins)]"
              style={{ color: "var(--color-heading)" }}
            >
              Check your email
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-body)" }}>
              If an account exists for <strong>{email}</strong>, we&apos;ve sent
              a link to reset your password. It expires in 30 minutes.
            </p>
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
              style={{ color: "var(--color-purple-900)" }}
            >
              <ArrowLeft size={15} />
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className="text-xs font-semibold uppercase tracking-wider mb-3"
              style={{ color: "var(--color-orange-900)" }}
            >
              Admin Panel
            </div>

            <h2
              className="text-sm font-semibold mb-1 font-[var(--font-poppins)]"
              style={{ color: "var(--color-heading)" }}
            >
              Forgot password?
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--color-body)" }}>
              Enter your email and we&apos;ll send you a reset link.
            </p>

            {error && (
              <div className="mb-5 text-sm rounded-[var(--radius-btn)] px-3 py-2.5 bg-red-50 text-red-700 border border-red-200">
                {error}
              </div>
            )}

            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1.5"
              style={{ color: "var(--color-heading)" }}
            >
              Email
            </label>
            <div className="relative mb-6">
              <Mail
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ color: "var(--color-body)" }}
              />
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@catalution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-[var(--radius-btn)] border outline-none transition"
                style={{ borderColor: "var(--color-line)" }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-purple-900)";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(72,29,150,0.12)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-line)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send reset link"}
              {!loading && <ArrowRight size={16} />}
            </button>

            <Link
              href="/admin/login"
              className="mt-6 flex items-center justify-center gap-1.5 text-sm font-medium hover:underline"
              style={{ color: "var(--color-body)" }}
            >
              <ArrowLeft size={15} />
              Back to sign in
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}