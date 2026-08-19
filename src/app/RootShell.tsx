"use client";

import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultantBanner from "../components/ConsultantBanner";

import { usePathname } from "next/navigation";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Admin panel has its own layout/chrome — skip the public site's navbar/footer entirely
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // List of pages where you want the transparent navbar
  // Add new routes here as you build more pages
  const pagesWithTransparentNavbar = [
    "/pricing",
    "/services",
    "/portfolios",
    "/blog",
    "/blog-grid",
    "/blog-sidebar",
    "/contact",
    "/about",
    "/team",
    "/careers",
    "/faq",
    "/history",
    "/404",
    "/team/1",
    "/portfolios/1",
    "/blog/1",
  ];

  // Update the check to include startsWith logic for dynamic routes
  const isTransparent =
    pagesWithTransparentNavbar.includes(pathname) ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/portfolios/") ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/team/") ||
    pathname.startsWith("/careers/");

  return (
    <>
      <CustomCursor />

      <Navbar transparent={isTransparent} lightText={isTransparent} />

      <div className={isTransparent ? "" : "pt-[70px]"}>
        {children}
      </div>

      {pathname !== "/" && <ConsultantBanner />}

      <Footer />
    </>
  );
}
