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

  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <CustomCursor />

        <Navbar />

        {children}

        {pathname !== "/" && <ConsultantBanner />}

        <Footer />
      </body>
    </html>
  );
}