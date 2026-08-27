"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

type LogoutStatus = "initiating" | "loading" | "success" | "error";

export default function AdminLogoutPage() {
  const router = useRouter();
  const [status, setStatus] = useState<LogoutStatus>("initiating");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [retryCount, setRetryCount] = useState(0);
  const [isMounted, setIsMounted] = useState(true);

  // Brand Colors defined from the Style Guide (Primary #4B0D56, Secondary #F4E9F7)
  const brandColors = {
    primary: "#4B0D56",     // Dark Purple from brand palette
    primaryDark: "#2A1B36", // Used for main text
    secondary: "#F4E9F7",   // Used for background accents
    textMuted: "#5D4E6D",   // Muted text color
    green: "#10B981",       // Success color
    red: "#EF4444",         // Error color
  };

  const performLogout = useCallback(async () => {
    if (!isMounted) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => {
          reject(new Error("timeout"));
        }, 15000);
      });

      await Promise.race([
        signOut({
          redirect: false,
          callbackUrl: "/admin/login",
        }),
        timeoutPromise,
      ]);

      if (!isMounted) return;
      setStatus("success");

      setTimeout(() => {
        if (isMounted) {
          router.push("/admin/login");
          router.refresh();
        }
      }, 1000);
    } catch (error) {
      if (!isMounted) return;
      console.error("Logout error:", error);
      setStatus("error");

      if (error instanceof Error) {
        if (error.message === "timeout") {
          setErrorMessage(
            "The logout request timed out. Please check your network connection and try again."
          );
        } else if (error.message.includes("fetch") || error.message.includes("network")) {
          setErrorMessage(
            "Network error detected. Please verify your internet connection."
          );
        } else if (error.message.includes("CSRF")) {
          setErrorMessage(
            "Security token validation failed. Please refresh the page and try again."
          );
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }

      if (retryCount < 1) {
        setTimeout(() => {
          if (isMounted) {
            setRetryCount((prev) => prev + 1);
            performLogout();
          }
        }, 3000);
      }
    }
  }, [router, retryCount, isMounted]);

  useEffect(() => {
    performLogout();

    return () => {
      setIsMounted(false);
    };
  }, [performLogout]);

  const handleManualRetry = () => {
    setRetryCount((prev) => prev + 1);
    performLogout();
  };

  const getStatusIcon = () => {
    switch (status) {
      case "initiating":
      case "loading":
        return (
          <div
            className="flex h-16 w-16 items-center justify-center rounded-full"
            style={{ backgroundColor: `${brandColors.primary}1A` }} // 10% opacity
          >
            <Loader2
              className="h-8 w-8 animate-spin"
              style={{ color: brandColors.primary }}
            />
          </div>
        );
      case "success":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle className="h-8 w-8" style={{ color: brandColors.green }} />
          </div>
        );
      case "error":
        return (
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-8 w-8" style={{ color: brandColors.red }} />
          </div>
        );
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "initiating":
      case "loading":
        return {
          title: "Signing you out...",
          description: "Please wait while we securely end your session.",
          action: null,
        };
      case "success":
        return {
          title: "Signed out successfully",
          description: "Redirecting you to the login page...",
          action: null,
        };
      case "error":
        return {
          title: "Sign out failed",
          description: errorMessage || "An unexpected error occurred.",
          action: (
            <button
              onClick={handleManualRetry}
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{
                backgroundColor: brandColors.primary,
              }}
              onFocus={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 2px ${brandColors.primary}50`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          ),
        };
    }
  };

  const statusText = getStatusText();

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6"
      style={{ backgroundColor: brandColors.secondary }} // Using the secondary purple tone from the guide
    >
      <div className="w-full max-w-md">
        {/* Logout Card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 text-center transition-all duration-300">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/images/Logo/primary-logo.webp"
              alt="Catalution"
              width={180}
              height={45}
              className="h-10 w-auto"
              priority
            />
          </div>

          {/* Status Icon */}
          <div className="mb-6 flex justify-center">{getStatusIcon()}</div>

          {/* Status Content */}
          <div className="space-y-2">
            <h1 
              className="text-2xl font-semibold"
              style={{ 
                color: brandColors.primaryDark, 
                fontFamily: "'Poppins', sans-serif" // Poppins SemiBold per guide
              }}
            >
              {statusText.title}
            </h1>
            <p className="text-sm" style={{ color: brandColors.textMuted }}>
              {statusText.description}
            </p>
          </div>

          {/* Action Button */}
          {statusText.action && <div className="mt-6 flex justify-center">{statusText.action}</div>}

          {/* Progress Bar */}
          {(status === "initiating" || status === "loading") && (
            <div className="mt-8 w-full max-w-[200px] mx-auto">
              <div 
                className="relative h-1.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: `${brandColors.primary}1A` }}
              >
                <div
                  className="absolute h-full rounded-full transition-all duration-1000 ease-in-out"
                  style={{
                    width: status === "initiating" ? "10%" : "70%",
                    backgroundColor: brandColors.primary,
                    animation: "progress-pulse 1.5s ease-in-out infinite",
                  }}
                />
              </div>
              <p className="mt-2 text-xs" style={{ color: brandColors.textMuted }}>
                Please wait...
              </p>
            </div>
          )}

          {/* Error Details */}
          {status === "error" && errorMessage && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 text-left border border-red-100">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-red-800">Error</p>
                  <p className="text-xs text-red-700">{errorMessage}</p>
                </div>
              </div>
              {retryCount < 1 && (
                <p className="mt-1 text-xs text-red-600 pl-6">Auto-retry in progress...</p>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 text-center space-y-1">
          <p className="text-xs" style={{ color: brandColors.textMuted }}>
            © {new Date().getFullYear()} Catalution. All rights reserved.
          </p>
          {status === "error" && (
            <p className="text-[11px]" style={{ color: brandColors.textMuted }}>
              Need help? Contact support at support@catalution.com
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes progress-pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
}