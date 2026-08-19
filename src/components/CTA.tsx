"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface CTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
}

export default function CTA({
  eyebrow,
  title,
  description,
  primaryButtonLabel,
  primaryButtonUrl,
}: CTAProps) {
  return (
    <section id="contact" className="px-6 py-16">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[var(--color-navy)] px-8 py-16 md:px-16 md:py-20 relative">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 65% at 85% 20%, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0) 70%)",
            }}
          />
          <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div className="max-w-xl">
              <span className="font-mono-caps text-[11px] uppercase tracking-widest text-[var(--color-accent-soft)]">
                {eyebrow || "• LET'S TALK"}
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                {title || "Ready to transform your business?"}
              </h2>
              <p className="mt-4 text-[#B7C4D6] max-w-lg">
                {description ||
                  "Book a free consultation. We'll reply within one business day with concrete next steps."}
              </p>
            </div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {/* Replaced Button with native Link */}
              <Link
                href={primaryButtonUrl || "mailto:support@solvior.com"}
                className="inline-flex items-center justify-center rounded-[12px] bg-white px-6 py-3 text-base font-medium !text-black transition-all shadow-md hover:scale-[1.03]"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {primaryButtonLabel || "Free consultation"}
              </Link>
            </motion.div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}