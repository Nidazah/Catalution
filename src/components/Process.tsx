"use client";

import { useState } from "react";
import {
  ArrowRight,
  Database,
  ShoppingCart,
  FileText,
  Share2,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const easeOut = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

const steps = [
  {
    icon: Database,
    label: "Custom ERP Systems",
    title: "Custom ERP Systems",
    text: "Centralize operations, supply chain, HR, and reporting into a single cloud platform.",
  },
  {
    icon: ShoppingCart,
    label: "Omnichannel POS",
    title: "Omnichannel POS",
    text: "Sync physical retail stores, cash registers, and online inventory in real time.",
  },
  {
    icon: FileText,
    label: "Automated Bookkeeping",
    title: "Automated Bookkeeping",
    text: "Eliminate manual entry with automated invoicing, expense tracking, and financial logs.",
  },
  {
    icon: Share2,
    label: "System Integration",
    title: "System Integration",
    text: "Connect legacy databases, payment gateways, and custom APIs seamlessly.",
  },
];

export default function Process() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="process" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Header Row */}
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_auto] items-end mb-10 md:mb-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-section px-3 py-1.5 text-xs font-semibold tracking-wide text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              CORE SERVICES
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-heading leading-[1.05]">
              Comprehensive <br className="hidden sm:block" />
              <span className="text-accent">service</span> offer.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-body max-w-xs text-sm">
              Streamline your entire operation with tailored ERP, real-time POS, 
              automated bookkeeping, and seamless system integrations.
            </p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-start md:justify-end">
            <motion.div variants={item} className="mt-4">
              <Link
                href="/services"
                className="btn btn-primary hover:scale-[1.03]"
              >
                More services
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* ===================== MOBILE: static 2-column grid ===================== */}
        <div className="grid grid-cols-2 gap-3 items-stretch md:hidden">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.label} delay={i * 0.06} className="h-full">
                <div className="flex h-full flex-col items-center text-center rounded-2xl bg-section px-4 py-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="mt-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <h3 className="mt-3 line-clamp-2 min-h-[38px] font-display text-[15px] font-semibold text-heading leading-snug">
                    {s.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[12px] leading-relaxed text-body">
                    {s.text}
                  </p>
                  <button
                    aria-label={`Learn more about ${s.title}`}
                    className="mt-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-navy text-white"
                  >
                    <ArrowRight className="h-3 w-3 -rotate-45" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* ===================== DESKTOP: original hover accordion ===================== */}
        <div className="relative rounded-3xl bg-section overflow-hidden min-h-[550px] hidden md:block">
          <div className="flex flex-row divide-x divide-line h-full">
            {steps.map((s, i) => {
              const isActive = i === activeIndex;
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`
                    relative flex flex-col items-center justify-center text-center px-3 py-10 cursor-pointer
                    transition-all duration-500 ease-in-out h-full
                    ${isActive ? "bg-white flex-[3]" : "bg-transparent flex-[1] hover:bg-white/50"}
                  `}
                  style={{
                    minWidth: isActive ? "240px" : "50px",
                  }}
                >
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none
                      ${isActive ? "opacity-0" : "opacity-100"}
                    `}
                  >
                    <span
                      className="font-display text-sm font-medium text-heading whitespace-nowrap tracking-wider"
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {s.label}
                    </span>
                  </div>

                  <div
                    className={`
                      relative z-10 flex flex-col items-center transition-all duration-500 delay-100
                      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <span className="mt-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    <div className="mt-4 px-4">
                      <h3 className="font-display text-xl font-semibold text-heading">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-body max-w-[200px] mx-auto">
                        {s.text}
                      </p>
                    </div>
                    <button
                      aria-label={`Learn more about ${s.title}`}
                      className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 hover:scale-105"
                    >
                      <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}