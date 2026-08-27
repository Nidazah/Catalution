// src/components/admin/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useCallback, useRef, useEffect } from "react";
import {
  LayoutDashboard,
  PanelsTopLeft,
  Paintbrush,
  Briefcase,
  FolderKanban,
  Newspaper,
  Users,
  MessageSquareQuote,
  Tag,
  HelpCircle,
  Mail,
  UserPlus,
  LogOut,
  AlertCircle,
  CheckCircle,
  LayoutTemplate,
  ChevronsUpDown,
  X,
  type LucideIcon,
} from "lucide-react";

interface MenuItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const MENU_ITEMS: MenuItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Website CMS", href: "/admin/content", icon: LayoutTemplate },
  { label: "Theme", href: "/admin/brand-settings", icon: Paintbrush },
  { label: "Layout", href: "/admin/layout-manager", icon: PanelsTopLeft },
  { label: "Services", href: "/admin/services", icon: Briefcase },
  { label: "Portfolios", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Team", href: "/admin/team", icon: Users },
  { label: "Careers", href: "/admin/careers", icon: UserPlus },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  { label: "Pricing", href: "/admin/pricing", icon: Tag },
  { label: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { label: "Contact", href: "/admin/contact", icon: Mail },
];

function isActiveRoute(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [accountMenuOpen]);

  // Keep the account menu closed whenever the sidebar collapses or the
  // route changes, so it never lingers detached from its trigger.
  useEffect(() => {
    setAccountMenuOpen(false);
  }, [pathname, isOpen]);

  const handleLogout = useCallback(async () => {
    if (logoutState === "loading") return;

    setLogoutState("loading");
    setErrorMessage("");

    try {
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(
          () => reject(new Error("Logout request timed out after 10 seconds")),
          10000,
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
            "Logout timed out. Please check your connection and try again.",
          );
        } else if (
          error.message.includes("fetch") ||
          error.message.includes("network")
        ) {
          setErrorMessage(
            "Network error. Please check your internet connection.",
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
      {/* Mobile overlay — only ever present while the drawer is open */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-white/[0.06] bg-[#270f4b] transition-all duration-300 ease-in-out ${
          isOpen ? "w-72 translate-x-0" : "w-20 -translate-x-full md:translate-x-0"
        }`}
        role="navigation"
        aria-label="Admin sidebar"
      >
        {/* Logo row + collapse toggle */}
        <div
          className={`flex h-16 shrink-0 items-center border-b border-white/[0.06] ${
            isOpen ? "justify-between px-4" : "justify-center px-2"
          }`}
        >
          <button
            type="button"
            onClick={onToggle}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            aria-expanded={isOpen}
            className="flex min-w-0 shrink cursor-pointer items-center rounded-lg transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#667eea]"
          >
            {isOpen ? (
              <img
                src="/images/Logo/primary-logo.webp"
                alt="Catalution"
                className="h-auto max-w-[140px] object-contain"
              />
            ) : (
              <img
                src="/images/Logo/icon-mark-white.webp"
                alt="Catalution"
                className="h-8 w-8 object-contain"
              />
            )}
          </button>

          {isOpen && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white md:hidden"
            >
              <X size={16} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Navigation Links */}
        <nav
          className={`scrollbar-hide flex flex-1 flex-col gap-0.5 overflow-y-auto py-4 ${
            isOpen ? "w-full px-3" : "items-center px-2"
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
                  className={`flex items-center rounded-xl font-medium transition-all duration-150 ${
                    isOpen
                      ? "w-full gap-3 px-3 py-2.5 text-sm"
                      : "h-11 w-11 justify-center text-sm"
                  } ${
                    active
                      ? "bg-[#667eea]/15 text-white shadow-[inset_2px_0_0_0_#667eea]"
                      : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.75}
                    className={`shrink-0 ${active ? "text-[#8b9bf5]" : ""}`}
                  />
                  {isOpen && (
                    <span className="truncate">{item.label}</span>
                  )}
                </Link>

                {!isOpen && (
                  <span className="pointer-events-none absolute left-[72px] top-1/2 z-10 -translate-y-1/2 whitespace-nowrap rounded-md bg-[#1c1c20] px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>

        {/* Account / avatar / logout */}
        <div
          ref={menuRef}
          className={`relative shrink-0 border-t border-white/[0.06] py-3 ${
            isOpen ? "w-full px-3" : "flex justify-center px-2"
          }`}
        >
          {accountMenuOpen && (
            <div
              className={`absolute bottom-[calc(100%+8px)] z-10 w-56 overflow-hidden rounded-xl border border-white/10 bg-[#1c1c20] p-1.5 shadow-2xl ${
                isOpen ? "left-3 right-3 w-auto" : "left-1/2 -translate-x-1/2"
              }`}
            >
              <div className="flex items-center gap-2.5 rounded-lg px-2.5 py-2">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#667eea] text-xs font-semibold text-white">
                  A
                </span>
                <div className="min-w-0 text-left">
                  <p className="truncate text-xs font-semibold text-white">
                    Admin
                  </p>
                  <p className="truncate text-[11px] text-white/40">
                    Administrator
                  </p>
                </div>
              </div>

              <div className="my-1 h-px bg-white/10" />

              <button
                type="button"
                onClick={handleLogout}
                disabled={logoutState === "loading"}
                className={`flex w-full items-center justify-center gap-2 rounded-lg px-2.5 py-2.5 text-xs font-medium transition-colors ${
                  logoutState === "error"
                    ? "text-red-400 hover:bg-red-500/10"
                    : logoutState === "success"
                      ? "text-green-400"
                      : "text-white/75 hover:bg-white/10 hover:text-white"
                } ${logoutState === "loading" ? "cursor-not-allowed opacity-70" : ""}`}
              >
                {logoutState === "loading" ? (
                  <>
                    <div className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-transparent" />
                    <span>Signing out&hellip;</span>
                  </>
                ) : logoutState === "success" ? (
                  <>
                    <CheckCircle size={14} className="shrink-0" />
                    <span>Signed out</span>
                  </>
                ) : logoutState === "error" ? (
                  <>
                    <AlertCircle size={14} className="shrink-0" />
                    <span>Retry logout</span>
                  </>
                ) : (
                  <>
                    <LogOut size={14} className="shrink-0" />
                    <span>Log out</span>
                  </>
                )}
              </button>

              {logoutState === "error" && errorMessage && (
                <p className="mt-1 px-2.5 pb-1 text-center text-[10.5px] leading-4 text-red-300">
                  {errorMessage}
                </p>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setAccountMenuOpen((prev) => !prev)}
            className={`flex items-center rounded-xl transition-colors ${
              isOpen
                ? "w-full gap-2.5 px-2 py-2 hover:bg-white/[0.06]"
                : "h-11 w-11 items-center justify-center hover:bg-white/[0.06]"
            }`}
            aria-label="Account menu"
            aria-expanded={accountMenuOpen}
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#667eea] text-xs font-semibold text-white ring-2 ring-white/10">
              A
            </span>
            {isOpen && (
              <>
                <span className="min-w-0 flex-1 text-left">
                  <p className="truncate text-xs font-semibold text-white">
                    Admin
                  </p>
                  <p className="truncate text-[11px] text-white/40">
                    Administrator
                  </p>
                </span>
                <ChevronsUpDown
                  size={14}
                  className="shrink-0 text-white/30"
                />
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
