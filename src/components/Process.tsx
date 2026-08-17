"use client";

import { useState, useRef, useEffect } from "react";
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

// Fallback icons, cycled by position — the CMS has no icon field, so
// whatever order items are saved in determines which icon each gets.
const icons = [Database, ShoppingCart, FileText, Share2];

const fallbackSteps = [
  {
    title: "Custom ERP Systems",
    text: "Centralize operations, supply chain, HR, and reporting into a single cloud platform.",
  },
  {
    title: "Omnichannel POS",
    text: "Sync physical retail stores, cash registers, and online inventory in real time.",
  },
  {
    title: "Automated Bookkeeping",
    text: "Eliminate manual entry with automated invoicing, expense tracking, and financial logs.",
  },
  {
    title: "System Integration",
    text: "Connect legacy databases, payment gateways, and custom APIs seamlessly.",
  },
];

export type ProcessItem = {
  title: string;
  description: string;
  image: string;
  meta: string;
  link: string;
};

type ProcessProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  items?: ProcessItem[];
};

export default function Process({
  eyebrow,
  title,
  description,
  primaryButtonLabel,
  primaryButtonUrl,
  items,
}: ProcessProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const processEyebrow = eyebrow && eyebrow.trim() !== "" ? eyebrow : "CORE SERVICES";
  const processDescription =
    description && description.trim() !== ""
      ? description
      : "Streamline your entire operation with tailored ERP, real-time POS, automated bookkeeping, and seamless system integrations.";
  const btnLabel =
    primaryButtonLabel && primaryButtonLabel.trim() !== "" ? primaryButtonLabel : "More services";
  const btnUrl = primaryButtonUrl && primaryButtonUrl.trim() !== "" ? primaryButtonUrl : "/services";

  // Use CMS items if any were saved, otherwise the original hardcoded steps.
  const steps =
    items && items.length > 0
      ? items.map((it, i) => ({
          icon: icons[i % icons.length],
          label: it.title,
          title: it.title,
          text: it.description,
        }))
      : fallbackSteps.map((s, i) => ({ ...s, icon: icons[i], label: s.title }));

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.querySelector(".carousel-card")?.clientWidth || 0;
      const gap = window.innerWidth < 640 ? 16 : 24;
      const scrollLeft = container.scrollLeft;
      const index = Math.round(scrollLeft / (cardWidth + gap));
      setActiveIndex(Math.min(index, steps.length - 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [steps.length]);

  return (
    <section id="process" className="bg-white py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_auto] items-end mb-8 md:mb-14">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-section px-3 py-1.5 text-xs font-semibold tracking-wide text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {processEyebrow}
            </span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-heading leading-[1.05]">
              {title && title.trim() !== "" ? (
                title
              ) : (
                <>
                  Comprehensive <br className="hidden sm:block" />
                  <span className="text-accent">service</span> offer.
                </>
              )}
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-body max-w-xs text-sm">{processDescription}</p>
          </ScrollReveal>

          <ScrollReveal className="flex justify-start md:justify-end">
            <motion.div variants={item} className="mt-2">
              <Link
                href={btnUrl}
                className="btn btn-primary hover:scale-[1.03] inline-flex items-center gap-2"
              >
                {btnLabel}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* MOBILE/TABLET: Swipeable Carousel */}
        <div className="lg:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 sm:gap-6 pb-6 -mx-4 sm:-mx-6 px-4 sm:px-6 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label + i}
                  className="carousel-card snap-center shrink-0 w-[80%] sm:w-[65%] md:w-[55%] rounded-2xl bg-section p-6 sm:p-8 flex flex-col items-center text-center"
                >
                  <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <span className="mt-3 flex h-3.5 w-3.5 items-center justify-center rounded-full border border-accent/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                  <h3 className="mt-3 font-display text-lg sm:text-xl font-semibold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-body line-clamp-2">
                    {s.text}
                  </p>
                  <button
                    aria-label={`Learn more about ${s.title}`}
                    className="mt-5 flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 -rotate-45" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center gap-2 mt-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  const container = scrollRef.current;
                  if (!container) return;
                  const cardWidth = container.querySelector(".carousel-card")?.clientWidth || 0;
                  const gap = window.innerWidth < 640 ? 16 : 24;
                  container.scrollTo({
                    left: i * (cardWidth + gap),
                    behavior: "smooth",
                  });
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "w-6 sm:w-8 bg-accent" : "bg-accent/30"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* DESKTOP: Stacked Card List */}
        <div className="hidden lg:flex flex-col gap-6">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <ScrollReveal key={s.label + i} delay={i * 0.06}>
                <div className="group relative flex flex-row items-center gap-6 rounded-2xl bg-section p-8 transition-all duration-300 hover:shadow-lg hover:bg-white border border-transparent hover:border-line/50">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent">
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-xl font-semibold text-heading">
                      {s.title}
                    </h3>
                    <p className="mt-1 text-[15px] leading-relaxed text-body line-clamp-2">
                      {s.text}
                    </p>
                  </div>

                  <button
                    aria-label={`Learn more about ${s.title}`}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-transform duration-300 hover:scale-105"
                  >
                    <ArrowRight className="h-4 w-4 -rotate-45" />
                  </button>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}