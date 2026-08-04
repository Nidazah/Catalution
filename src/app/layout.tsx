import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";

import RootShell from "./RootShell";

import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["italic", "normal"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Solvior — Proven Consulting for Modern Global Enterprises",
  description:
    "Solvior is a consulting agency helping modern global enterprises transform their business with expert consultancy services.",
  openGraph: {
    title: "Solvior — Proven Consulting for Modern Global Enterprises",
    description:
      "Solvior is a consulting agency helping modern global enterprises transform their business with expert consultancy services.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${playfairDisplay.variable}`}>
      <body className="min-h-full flex flex-col">
        <RootShell>{children}</RootShell>
      </body>
    </html>
  );
}