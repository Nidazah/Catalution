"use client";

import { useState } from "react";
import {
  ArrowRight,
  Waves,
  Boxes,
  Users,
  Sparkles,
  CircleDot,
  Repeat,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    icon: Waves,
    label: "Business process optimization",
    title: "Business process",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
  {
    icon: Boxes,
    label: "Strategic planning & execution",
    title: "Strategic planning & execution",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
  {
    icon: Users,
    label: "Leadership executive coaching",
    title: "Leadership executive coaching",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
  {
    icon: Sparkles,
    label: "Legacy leadership institute",
    title: "Legacy leadership institute",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
  {
    icon: CircleDot,
    label: "Executive growth solutions",
    title: "Executive growth solutions",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
  {
    icon: Repeat,
    label: "Empowered leadership journey",
    title: "Empowered leadership journey",
    text: "In today's dynamic business environment, the key to success lies strategics our planning and operational business.",
  },
];

export default function Process() {
  // Start with index 1 (second item) active
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <section id="process" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Header Row - Subtly reduced text sizes */}
        <div className="grid gap-8 md:grid-cols-[1.2fr_1fr_auto] items-end mb-10 md:mb-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#F5F7FA] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              TRANSFORMATIVE SOLUTION
            </span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-heading)] leading-[1.05]">
              In comprehensive service offer.
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-[var(--color-body)] max-w-xs text-sm">
              In today&apos;s dynamic business environment, the key to success
              strategics..
            </p>
          </ScrollReveal>
          <ScrollReveal className="flex justify-start md:justify-end">
            <a
              href="#services"
              data-cursor-hover
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-7 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] whitespace-nowrap"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowRight className="h-4 w-4" />
              </span>
              More services
            </a>
          </ScrollReveal>
        </div>

        {/* Steps Row - Shrunk heights and text sizes */}
        <div className="relative rounded-3xl bg-[#F5F7FA] overflow-hidden min-h-[450px] md:min-h-[550px]">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--color-line)] h-full">
            {steps.map((s, i) => {
              const isActive = i === activeIndex;
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`
                    relative flex flex-col items-center justify-center text-center px-3 py-6 md:py-10 cursor-pointer
                    transition-all duration-500 ease-in-out h-full
                    ${isActive ? "bg-white flex-[3]" : "bg-transparent flex-[1] hover:bg-white/50"}
                  `}
                  style={{
                    minWidth: isActive ? "240px" : "50px",
                  }}
                >
                  {/* Absolute Positioned Vertical Text (Shrunk) */}
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none
                      ${isActive ? "opacity-0" : "opacity-100"}
                    `}
                  >
                    <span
                      className="font-display text-xs md:text-sm font-medium text-[var(--color-heading)] whitespace-nowrap tracking-wider"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      {s.label}
                    </span>
                  </div>

                  {/* Content that shows ONLY when active (Shrunk) */}
                  <div
                    className={`
                      relative z-10 flex flex-col items-center transition-all duration-500 delay-100
                      ${isActive ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
                    `}
                  >
                    {/* Icon (Shrunk) */}
                    <div
                      className={`
                        flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition-colors duration-500
                        bg-[var(--color-accent)]
                      `}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    {/* Dot Indicator (Shrunk) */}
                    <span className="mt-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-[var(--color-accent)]/40">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                    </span>

                    {/* Title & Text (Shrunk) */}
                    <div className="mt-4 px-4">
                      <h3 className="font-display text-lg md:text-xl font-semibold text-[var(--color-heading)]">
                        {s.title}
                      </h3>
                      <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-body)] max-w-[200px] mx-auto">
                        {s.text}
                      </p>
                    </div>

                    {/* Arrow Button (Shrunk) */}
                    <button
                      aria-label={`Learn more about ${s.title}`}
                      className="mt-5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-transform duration-300 hover:scale-105"
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