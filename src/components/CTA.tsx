"use client";

import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function CTA() {
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
                • LET&apos;S TALK
              </span>
              <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-white leading-[1.1]">
                Ready to transform your business?
              </h2>
              <p className="mt-4 text-[#B7C4D6] max-w-lg">
                Book a free consultation. We&apos;ll reply within one business
                day with concrete next steps.
              </p>
            </div>
            <a
              href="mailto:support@solvior.com"
              data-cursor-hover
              className="inline-flex items-center gap-3 rounded-full bg-white pl-2 pr-7 py-2 text-sm font-semibold text-[var(--color-navy)] transition-transform hover:scale-[1.03] whitespace-nowrap"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowRight className="h-4 w-4 text-white" />
              </span>
              Free consultation
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
