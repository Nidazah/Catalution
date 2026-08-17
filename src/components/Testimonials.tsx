"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

const fallbackQuotes = [
  {
    text: "Solvior didn't just take a ticket queue — they asked why the queue existed in the first place. Our infra bill dropped and our on-call rotation got quiet.",
    name: "Amara Reyes",
    role: "VP Engineering, Ledgerly",
  },
  {
    text: "We'd stalled twice trying to modernize our claims system in-house. Solvior shipped the migration in a single quarter without a day of downtime.",
    name: "Faisal Rahman",
    role: "CTO, Northbeam Health",
  },
  {
    text: "The AI intake tool they built is the first internal tool our clinicians actually asked to keep using after the pilot ended.",
    name: "Priya Menon",
    role: "Head of Product, Carewell",
  },
  {
    text: "Solvior rebuilt our checkout flow and cut cart abandonment by a third in six weeks. They explained every tradeoff before we signed off on it.",
    name: "Daniel Ochoa",
    role: "Founder, Marlowe & Finch",
  },
  {
    text: "Most consultants hand you a slide deck. Solvior handed us a working pipeline, documentation, and a team that could actually run it after they left.",
    name: "Grace Lindqvist",
    role: "Director of Data, Halstrom Group",
  },
  {
    text: "We brought them in for a two-week audit. What they found saved us more in the first month than the entire engagement cost.",
    name: "Tomás Rivera",
    role: "COO, Beacon Freight",
  },
];

// how many cards visible at once, per breakpoint
const CARDS_PER_VIEW_DESKTOP = 3;
const ROTATE_INTERVAL_MS = 5000;

export default function Testimonials() {
  const [quotes, setQuotes] = useState(fallbackQuotes);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/testimonials", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load testimonials"))))
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length > 0) {
          setQuotes(data.map((item) => ({ text: item.quote, name: item.name, role: item.role })));
        }
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardsPerView = isDesktop ? CARDS_PER_VIEW_DESKTOP : 1;
  const totalSlides = Math.ceil(quotes.length / cardsPerView);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(next, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [next, isPaused]);

  // reset index safely if breakpoint change shrinks totalSlides
  useEffect(() => {
    if (index >= totalSlides) setIndex(0);
  }, [totalSlides, index]);

  const visibleQuotes = quotes.slice(
    index * cardsPerView,
    index * cardsPerView + cardsPerView
  );

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono-caps text-[11px] uppercase text-[var(--color-accent)]">
            <b>Client word</b>
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-[var(--color-heading)]">
            Teams who kept us past the first project.
          </h2>
        </ScrollReveal>

        <div
          className="mt-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-4 md:grid-cols-3"
            >
              {visibleQuotes.map((q) => (
                <figure
                  key={q.name}
                  className="h-full flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-section)] p-6 sm:p-7 min-h-[200px] md:min-h-[240px]"
                >
                  <blockquote className="text-sm leading-relaxed text-[var(--color-heading)]">
                    “{q.text}”
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-[var(--color-navy)] flex items-center justify-center font-display text-xs font-bold text-white shrink-0">
                      {q.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    
                    {/* ✅ FIX: Removed 'whitespace-nowrap' completely so text wraps naturally */}
                    <div className="min-w-0 flex flex-col">
                      <div className="text-sm font-semibold text-[var(--color-heading)]">
                        {q.name}
                      </div>
                      <div className="text-sm text-[var(--color-body)]">
                        {q.role}
                      </div>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: totalSlides }).map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index
                    ? "w-6 bg-[var(--color-accent)]"
                    : "w-2 bg-[var(--color-line)] hover:bg-[var(--color-accent)]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}