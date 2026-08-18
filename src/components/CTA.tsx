"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

type CTAProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
};

export default function CTA({
  eyebrow,
  title,
  description,
  primaryButtonLabel,
  primaryButtonUrl,
}: CTAProps) {
  if (!title && !description && !primaryButtonLabel) {
    return null;
  }

  return (
    <section id="contact" className="px-6 py-16">
      <ScrollReveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[var(--color-navy)] px-8 py-16 md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 65% at 85% 20%, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0) 70%)",
            }}
          />

          <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              {eyebrow && (
                <span className="ui-sm uppercase tracking-widest text-[var(--color-accent-soft)]">
                  • {eyebrow}
                </span>
              )}

              {title && (
                <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-white md:text-5xl">
                  {title}
                </h2>
              )}

              {description && (
                <p className="body-lg mt-4 max-w-lg text-[#D5DCE7]">
                  {description}
                </p>
              )}
            </div>

            {primaryButtonLabel && primaryButtonUrl && (
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={primaryButtonUrl}
                  className="inline-flex items-center justify-center rounded-[12px] bg-white px-6 py-3 text-base font-medium !text-black shadow-md transition-all"
                >
                  {primaryButtonLabel}
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}