// src/app/admin/AdminChrome.tsx
"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";

interface AdminChromeProps {
  children: ReactNode;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onCloseSidebar: () => void;
}

export default function AdminChrome({ 
  children, 
  isSidebarOpen, 
  onToggleSidebar, 
  onCloseSidebar 
}: AdminChromeProps) {
  const pathname = usePathname();
  const isLogin = pathname === "/admin/login";

  // Login page - no sidebar
  if (isLogin) {
    return (
      <div className="admin-shell admin-shell--auth">
        {children}
      </div>
    );
  }

  // Admin pages - with sidebar
  return (
    <div className="admin-shell">
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onToggle={onToggleSidebar} 
        onClose={onCloseSidebar} 
      />
      <main className={`admin-main ${isSidebarOpen ? "ml-64" : "ml-20"}`}>
        {children}
      </main>
    </div>
  );
}