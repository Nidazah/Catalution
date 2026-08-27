"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      setDone(true);
      setTimeout(() => router.push("/admin/login"), 2500);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (!token) {
    return (
      <div className="text-center py-4">
        <div
          className="mx-auto mb-4 flex items-center justify-center rounded-full"
          style={{ width: 48, height: 48, background: "#fef2f2" }}
        >
          <AlertCircle size={24} style={{ color: "#dc2626" }} />
        </div>
        <h2
          className="text-sm font-semibold mb-2 font-[var(--font-poppins)]"
          style={{ color: "var(--color-heading)" }}
        >
          Invalid link
        </h2>
        <p className="text-sm mb-6" style={{ color: "var(--color-body)" }}>
          This reset link is missing its token. Request a new one from the
          sign-in page.
        </p>
        <Link
          href="/admin/forgot-password"
          className="text-sm font-medium hover:underline"
          style={{ color: "var(--color-purple-900)" }}
        >
          Request a new link
        </Link>
      </div>
    );
  }

  if (done) {
    return (
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
          Password updated
        </h2>
        <p className="text-sm" style={{ color: "var(--color-body)" }}>
          Redirecting you to sign in...
        </p>
      </div>
    );
  }

  return (
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
        Set a new password
      </h2>
      <p className="text-sm mb-6" style={{ color: "var(--color-body)" }}>
        Choose a strong password you haven&apos;t used before.
      </p>

      {error && (
        <div className="mb-5 flex items-center gap-2 text-sm rounded-[var(--radius-btn)] px-3 py-2.5 bg-red-50 text-red-700 border border-red-200">
          <AlertCircle size={16} className="shrink-0" />
          {error}
        </div>
      )}

      <label
        htmlFor="password"
        className="block text-sm font-medium mb-1.5"
        style={{ color: "var(--color-heading)" }}
      >
        New password
      </label>
      <div className="relative mb-5">
        <Lock
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-body)" }}
        />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full pl-10 pr-10 py-2.5 rounded-[var(--radius-btn)] border outline-none transition"
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
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          style={{ color: "var(--color-body)" }}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>

      <label
        htmlFor="confirmPassword"
        className="block text-sm font-medium mb-1.5"
        style={{ color: "var(--color-heading)" }}
      >
        Confirm password
      </label>
      <div className="relative mb-6">
        <Lock
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ color: "var(--color-body)" }}
        />
        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          required
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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
        {loading ? "Updating..." : "Update password"}
        {!loading && <ArrowRight size={16} />}
      </button>
    </form>
  );
}

export default function ResetPasswordPage() {
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
        <Suspense fallback={null}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  );
}