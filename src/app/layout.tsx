import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import RootShell from "./RootShell";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
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
    <html lang="en" className={`antialiased ${poppins.variable}`}>
      <body className="relative cursor-none">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}