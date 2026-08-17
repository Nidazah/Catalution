// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FolderKanban,
  Newspaper,
  Users,
  MessageSquareQuote,
  Tag,
  HelpCircle,
  Mail,
  LogOut,
  AlertCircle,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Portfolios", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Pricing", href: "/admin/pricing", icon: Tag },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Contact", href: "/admin/contact", icon: Mail },
];

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === href;
  return pathname.startsWith(href);
}

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function AdminSidebar({
  isOpen,
  onToggle,
  onClose,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [logoutState, setLogoutState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setAccountMenuOpen(false);
      }
    }
    if (accountMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [accountMenuOpen]);

  const handleLogout = useCallback(async () => {
    if (logoutState === "loading") return;

    setLogoutState("loading");
    setErrorMessage("");

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Logout request timed out after 10 seconds")),
          10000
        );
      });

      // Use custom logout endpoint instead of NextAuth's signOut
      const logoutPromise = fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Important for cookies
      });

      await Promise.race([logoutPromise, timeoutPromise]);

      const response = await logoutPromise;
      
      if (!response.ok) {
        throw new Error(`Logout failed with status: ${response.status}`);
      }

      setLogoutState("success");

      setTimeout(() => {
        router.push("/admin/login");
        router.refresh();
      }, 500);
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutState("error");

      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          setErrorMessage(
            "Logout timed out. Please check your connection and try again."
          );
        } else if (
          error.message.includes("fetch") ||
          error.message.includes("network")
        ) {
          setErrorMessage(
            "Network error. Please check your internet connection."
          );
        } else {
          setErrorMessage(error.message);
        }
      } else {
        setErrorMessage("An unexpected error occurred during logout.");
      }

      setTimeout(() => {
        setLogoutState("idle");
        setErrorMessage("");
      }, 5000);
    }
  }, [router, logoutState]);

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-[#1a1a2e] py-4 transition-all duration-300 ease-in-out
          ${isOpen ? "w-64" : "w-16"}`}
        role="navigation"
        aria-label="Admin sidebar"
      >
        {/* LOGO with toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={isOpen}
          className={`mb-6 flex shrink-0 cursor-pointer items-center transition-opacity hover:opacity-80 focus:outline-none ${
            isOpen ? "w-full justify-start px-5" : "w-full justify-center"
          }`}
        >
          {isOpen ? (
            <img
              src="/images/Logo/primary-logo.webp"
              alt="Catalution"
              className="h-auto w-[150px] object-contain"
            />
          ) : (
            <img
              src="/images/Logo/icon-mark-white.webp"
              alt="Catalution"
              className="h-8 w-8 object-contain"
            />
          )}
        </button>

        {/* Navigation Links */}
        <nav
          className={`flex flex-1 flex-col gap-1 overflow-y-auto scrollbar-hide ${
            isOpen ? "w-full px-3" : "items-center"
          }`}
          aria-label="Admin navigation"
        >
          {MENU_ITEMS.map((item) => {
            const active = isActiveRoute(pathname, item.href);
            const Icon = item.icon;
            return (
              <div key={item.href} className="group relative w-full">
                <Link
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center rounded-xl transition-all duration-150 w-full ${
                    isOpen ? "gap-3 px-3 py-2.5" : "h-10 w-10 justify-center"
                  } ${
                    active
                      ? "bg-[#667eea]/20 text-[#667eea]"
                      : "text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon size={19} strokeWidth={1.75} className="shrink-0" />
                  {isOpen && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </Link>

                {!isOpen && (
                  <span className="pointer-events-none absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#1c1c20] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Account / avatar */}
        <div
          ref={menuRef}
          className={`relative mt-2 shrink-0 ${isOpen ? "w-full px-3" : ""}`}
        >
          {accountMenuOpen && (
            <div
              className={`absolute bottom-12 w-52 rounded-xl border border-white/10 bg-[#1c1c20] p-2 shadow-2xl ${
                isOpen ? "left-3" : "left-0"
              }`}
            >
              <div className="mb-1 flex items-center gap-2.5 rounded-lg px-2 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#667eea] text-xs font-semibold text-white">
                  A
                </div>
                <div>
                  <p className="text-xs font-medium text-white">Admin</p>
                  <p className="text-[11px] text-white/40">Administrator</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutState === "loading"}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-xs font-medium transition-colors ${
                  logoutState === "error"
                    ? "text-red-400 hover:bg-red-500/10"
                    : logoutState === "success"
                    ? "text-green-400"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                } ${logoutState === "loading" ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {logoutState === "loading" ? (
                  <>
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                    Signing out...
                  </>
                ) : logoutState === "success" ? (
                  <>
                    <CheckCircle size={14} /> Signed out
                  </>
                ) : logoutState === "error" ? (
                  <>
                    <AlertCircle size={14} /> Retry logout
                  </>
                ) : (
                  <>
                    <LogOut size={14} /> Logout
                  </>
                )}
              </button>

              {logoutState === "error" && errorMessage && (
                <p className="mt-1 px-2 text-[10.5px] leading-4 text-red-300">
                  {errorMessage}
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className={`flex items-center gap-2.5 rounded-full transition-colors ${
              isOpen
                ? "w-full rounded-xl px-2 py-2 hover:bg-white/10"
                : "h-9 w-9 justify-center"
            }`}
            aria-label="Account menu"
            aria-expanded={accountMenuOpen}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#667eea] text-xs font-semibold text-white ring-2 ring-white/10">
              A
            </span>
            {isOpen && (
              <span className="text-left">
                <p className="text-xs font-medium text-white">Admin</p>
                <p className="text-[11px] text-white/40">Administrator</p>
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}