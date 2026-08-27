// src/app/admin/layout.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import CustomCursor from "@/components/CustomCursor";

import "./admin.css";

// Pages that should not show the sidebar
const HIDE_SIDEBAR_PATHS = [
  "/admin/login",
  "/admin/logout",
  "/admin/forgot-password",
  "/admin/reset-password",
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = useCallback(
    () => setIsSidebarOpen((prev) => !prev),
    [],
  );
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Close the mobile drawer automatically on route changes.
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const shouldHideSidebar = HIDE_SIDEBAR_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`),
  );

  // The custom cursor must also be available on auth pages (login, forgot-password, reset-password).
  // Keep it mounted once at the admin-layout level so route changes never remove it.
  if (!isMounted) {
    return (
      <>
        <CustomCursor />
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f6fc]">
          <main className="min-h-screen">{children}</main>
        </div>
      </>
    );
  }

  // If we should hide the sidebar, render without it
  if (shouldHideSidebar) {
    return (
      <>
        <CustomCursor />
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f6fc]">
          <main className="min-h-screen">{children}</main>
        </div>
      </>
    );
  }

  // Render with sidebar
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f8f6fc]">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onToggle={toggleSidebar}
          onClose={closeSidebar}
        />

        {/* Mobile-only top bar: the sidebar is off-canvas below md, so this
            is the only way to reach it on phones/tablets. */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-[#ece6f7] bg-white/95 px-4 backdrop-blur md:hidden">
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Open sidebar"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#481d96] transition-colors hover:bg-[#f0eafa]"
          >
            <Menu size={20} strokeWidth={2} />
          </button>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#481d96] text-[11px] font-bold text-white">
            C
          </span>
          <span className="text-sm font-semibold text-[#24133f]">
            Catalution Admin
          </span>
        </header>

        <main
          className={`admin-main min-h-screen max-w-full overflow-x-hidden p-4 text-sm transition-all duration-300 sm:p-6 lg:p-8 ${
            isSidebarOpen ? "md:ml-72" : "md:ml-20"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
