"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Eye, EyeOff, Loader2, TriangleAlert } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      router.push("/admin/pricing");
      router.refresh();
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <svg
        className="login-wave"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ff6800" stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <path
          d="M0,180 C200,100 320,240 560,160 C800,80 900,220 1200,140 L1200,300 L0,300 Z"
          fill="url(#waveGrad)"
        />
      </svg>

      <div className="login-card">
        <div className="login-brand">
          <span className="login-mark">
            C
            <i className="login-dot login-dot--a" />
            <i className="login-dot login-dot--b" />
            <i className="login-dot login-dot--c" />
          </span>
          <div>
            <div className="login-wordmark">Catalution</div>
            <div className="login-tagline">Catalyst &middot; Solution &middot; Growth</div>
          </div>
        </div>

        <h1 className="login-title">Admin sign in</h1>
        <p className="login-subtitle">Sign in to manage your site content.</p>

        {error && (
          <div className="login-alert" role="alert">
            <TriangleAlert size={16} strokeWidth={2.2} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="password" className="login-label">
            Password
          </label>
          <div className="login-input-wrap">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
              required
              autoComplete="current-password"
              placeholder="Enter password"
              className="login-input"
            />
            <button
              type="button"
              className="login-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>

          <button type="submit" className="login-submit" disabled={loading || !password}>
            {loading ? (
              <>
                <Loader2 size={17} className="login-spinner" />
                Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="login-footer">Catalution CMS &middot; Protected admin area</p>
      </div>

      <style jsx>{`
        .login-screen {
          position: relative;
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: linear-gradient(160deg, var(--color-navy-ink) 0%, var(--color-purple-900) 55%, #2a1063 100%);
          overflow: hidden;
        }

        .login-wave {
          position: absolute;
          left: 0;
          right: 0;
          bottom: -20px;
          width: 100%;
          height: 300px;
          opacity: 0.5;
          pointer-events: none;
        }

        .login-card {
          position: relative;
          width: 100%;
          max-width: 400px;
          background: #ffffff;
          border-radius: 22px;
          padding: 38px 34px 30px;
          box-shadow: 0 30px 70px -16px rgba(30, 8, 70, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.06);
        }

        .login-brand {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 26px;
        }

        .login-mark {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, var(--color-purple-900), var(--color-orange-900));
          color: #fff;
          font-family: var(--font-poppins);
          font-size: 20px;
          font-weight: 700;
          box-shadow: 0 8px 18px -6px rgba(72, 29, 150, 0.5);
          flex-shrink: 0;
        }

        .login-dot {
          position: absolute;
          border-radius: 3px;
          display: block;
        }
        .login-dot--a {
          width: 8px;
          height: 8px;
          top: -5px;
          right: -5px;
          background: var(--color-purple-500);
        }
        .login-dot--b {
          width: 6px;
          height: 6px;
          top: 6px;
          right: -11px;
          background: var(--color-orange-700);
        }
        .login-dot--c {
          width: 5px;
          height: 5px;
          top: -5px;
          right: 7px;
          background: var(--color-orange-500);
        }

        .login-wordmark {
          font-family: var(--font-poppins);
          font-size: 18px;
          font-weight: 700;
          color: var(--color-heading);
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .login-tagline {
          font-family: var(--font-inter);
          font-size: 10.5px;
          font-weight: 600;
          color: var(--color-orange-900);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }

        .login-title {
          font-family: var(--font-poppins);
          margin: 0 0 6px;
          font-size: 24px;
          font-weight: 600;
          color: var(--color-heading);
          letter-spacing: -0.01em;
        }

        .login-subtitle {
          font-family: var(--font-inter);
          margin: 0 0 24px;
          font-size: 14px;
          color: var(--color-body);
          line-height: 1.4;
        }

        .login-alert {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #fdeeee;
          border: 1px solid #f3c6c6;
          color: #b3261e;
          border-radius: var(--radius-btn);
          padding: 10px 13px;
          font-family: var(--font-inter);
          font-size: 13px;
          font-weight: 500;
          margin-bottom: 18px;
        }

        .login-label {
          display: block;
          font-family: var(--font-inter);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--color-body);
          margin-bottom: 7px;
          text-transform: uppercase;
          letter-spacing: 0.03em;
        }

        .login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          margin-bottom: 20px;
        }

        .login-input-icon {
          position: absolute;
          left: 13px;
          color: var(--color-purple-500);
          pointer-events: none;
        }

        .login-input {
          width: 100%;
          height: 46px;
          background: var(--color-section);
          border: 1px solid var(--color-line);
          border-radius: var(--radius-btn);
          padding: 0 42px;
          color: var(--color-heading);
          font-family: var(--font-inter);
          font-size: 14.5px;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .login-input::placeholder {
          color: #a89ec2;
        }

        .login-input:focus {
          outline: none;
          border-color: var(--color-purple-500);
          box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.18);
        }

        .login-toggle {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--color-purple-500);
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: color 0.15s ease;
        }

        .login-toggle:hover {
          color: var(--color-purple-900);
        }

        .login-submit {
          width: 100%;
          height: 46px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--color-purple-900);
          color: #fff;
          border: none;
          border-radius: var(--radius-btn);
          font-family: var(--font-poppins);
          font-size: 14.5px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 10px 24px -8px rgba(72, 29, 150, 0.45);
          transition: background 0.15s ease, transform 0.1s ease, opacity 0.15s ease;
        }

        .login-submit:hover:not(:disabled) {
          background: var(--color-purple-700);
        }

        .login-submit:active:not(:disabled) {
          transform: translateY(1px);
        }

        .login-submit:disabled {
          background: #cbd1db;
          color: #8a93a3;
          cursor: not-allowed;
          box-shadow: none;
        }

        .login-spinner {
          animation: login-spin 0.8s linear infinite;
        }

        @keyframes login-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .login-footer {
          margin: 22px 0 0;
          text-align: center;
          font-family: var(--font-inter);
          font-size: 11.5px;
          color: #a89ec2;
        }
      `}</style>
    </div>
  );
}