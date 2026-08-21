"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

interface CTAProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
}

export default function CTA({
  eyebrow,
  title,
  description,
  image,
  primaryButtonLabel,
  primaryButtonUrl,
}: CTAProps) {
  return (
    <section id="contact" className="px-6 py-16">
      <ScrollReveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[var(--color-navy)] px-8 py-16 md:px-16 md:py-20">
          {/* Background glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(45% 65% at 85% 20%, rgba(96,165,250,0.35) 0%, rgba(96,165,250,0) 70%)",
            }}
          />

          {/* CTA Image */}
          {image && (
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] md:block">
              <Image
                src={image}
                alt=""
                fill
                sizes="45vw"
                className="object-cover object-center"
                priority={false}
              />

              {/* Image overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-navy)] via-[var(--color-navy)]/70 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <span className="font-mono-caps text-[11px] uppercase tracking-widest text-[var(--color-accent-soft)]">
                {eyebrow || "• LET'S TALK"}
              </span>

              <h2 className="mt-4 font-display text-4xl font-bold leading-[1.1] text-white md:text-5xl">
                {title || "Ready to transform your business?"}
              </h2>

              <p className="mt-4 max-w-lg text-[#B7C4D6]">
                {description ||
                  "Book a free consultation. We'll reply within one business day with concrete next steps."}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 17,
              }}
              className="relative z-20 shrink-0"
            >
              <Link
                href={primaryButtonUrl || "mailto:support@solvior.com"}
                className="inline-flex items-center justify-center rounded-[12px] bg-white px-6 py-3 text-base font-medium !text-black shadow-md transition-all hover:scale-[1.03]"
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                }}
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