"use client";

import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultantBanner from "@/components/ConsultantBanner";

import "./globals.css";

import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

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
    "/services/1",
    "/portfolios/1",
    "/blog/1",
  ];

  // Update the check to include startsWith logic for dynamic routes
  const isTransparent =
    pagesWithTransparentNavbar.includes(pathname) ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/portfolios/") ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/team/");

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CustomCursor />

        <Navbar transparent={isTransparent} />

        {children}

        {pathname !== "/" && <ConsultantBanner />}

        <Footer />
      </body>
    </html>
  );
}
