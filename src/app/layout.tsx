import type { Metadata } from "next";

import RootShell from "./RootShell";

import "./globals.css";
import "./typography-readability-fix.css";

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
    <html lang="en" className="antialiased">
      <body
        className="relative cursor-none"
        style={{
          "--font-poppins": "Poppins, Arial, Helvetica, sans-serif",
          "--font-inter": "Inter, Arial, Helvetica, sans-serif",
        } as React.CSSProperties}
      >
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}