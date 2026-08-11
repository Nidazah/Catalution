import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";

import RootShell from "./RootShell";
import CustomCursor from "../components/CustomCursor"; 

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Catalution — Catalyzing Solutions. Accelerating Growth.",
  description:
    "Catalution is an ERP & POS solutions provider and business transformation partner. We combine the power of a catalyst with smart solutions to help businesses streamline operations, boost efficiency, and achieve sustainable growth.",
  openGraph: {
    title: "Catalution — Catalyzing Solutions. Accelerating Growth.",
    description:
      "Catalution is an ERP & POS solutions provider and business transformation partner. We combine the power of a catalyst with smart solutions to help businesses streamline operations, boost efficiency, and achieve sustainable growth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${poppins.variable} ${inter.variable}`}>
      <body className="min-h-full flex flex-col relative cursor-none">
        
        {/* ✅ Inject the Client-Side Cursor Provider here */}
        <CustomCursor />

        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}