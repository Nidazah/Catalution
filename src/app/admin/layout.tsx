// src/app/admin/layout.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";
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

  const toggleSidebar = useCallback(() => setIsSidebarOpen((prev) => !prev), []);
  const closeSidebar = useCallback(() => setIsSidebarOpen(false), []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const shouldHideSidebar = HIDE_SIDEBAR_PATHS.some(
    (path) => pathname === path || pathname?.startsWith(`${path}/`)
  );

  // Don't render anything on server to prevent hydration mismatch
  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#f8f6fc]">
        <main className="min-h-screen">{children}</main>
      </div>
    );
  }

  // If we should hide the sidebar, render without it
  if (shouldHideSidebar) {
    return (
      <div className="min-h-screen bg-[#f8f6fc]">
        <main className="min-h-screen">{children}</main>
      </div>
    );
  }

  // Render with sidebar
  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-[#f8f6fc]">
        <AdminSidebar 
          isOpen={isSidebarOpen} 
          onToggle={toggleSidebar} 
          onClose={closeSidebar} 
        />
        <main
          className={`min-h-screen p-8 text-sm transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "md:ml-16"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}