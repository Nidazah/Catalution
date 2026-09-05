"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

interface TestimonialsProps {
  eyebrow?: string;
  title?: string;
  // Kept for compatibility with the existing Home page contract.
  // Testimonial cards are intentionally sourced from /api/testimonials below.
  cmsSettings?: unknown;
}

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  avatar?: string | null;
};

const CARDS_PER_VIEW_DESKTOP = 3;
const ROTATE_INTERVAL_MS = 5000;

export default function Testimonials({ eyebrow, title }: TestimonialsProps) {
  const [quotes, setQuotes] = useState<Testimonial[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const loadTestimonials = useCallback(async () => {
    try {
      const res = await fetch("/api/testimonials", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to load testimonials");
      const data = await res.json();
      if (Array.isArray(data)) setQuotes(data);
    } catch (error) {
      console.error("Failed to load homepage testimonials", error);
      setQuotes([]);
    }
  }, []);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardsPerView = isDesktop ? CARDS_PER_VIEW_DESKTOP : 1;
  const totalSlides = Math.max(1, Math.ceil(quotes.length / cardsPerView));

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (isPaused || quotes.length === 0) return;
    const t = setInterval(next, ROTATE_INTERVAL_MS);
    return () => clearInterval(t);
  }, [next, isPaused, quotes.length]);

  useEffect(() => {
    if (index >= totalSlides) setIndex(0);
  }, [totalSlides, index]);

  const visibleQuotes = quotes.slice(
    index * cardsPerView,
    index * cardsPerView + cardsPerView,
  );

  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono-caps text-[11px] uppercase text-[var(--color-accent)]">
            <b>{eyebrow || "Client word"}</b>
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-[var(--color-heading)]">
            {title || "Teams who kept us past the first project."}
          </h2>
        </ScrollReveal>

        <div
          className="mt-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {quotes.length > 0 && (
            <>
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
                      key={q.id}
                      className="h-full flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-section)] p-6 sm:p-7 min-h-[200px] md:min-h-[240px]"
                    >
                      <blockquote className="text-sm leading-relaxed text-[var(--color-heading)]">
                        “{q.quote}”
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-[var(--color-navy)] flex items-center justify-center font-display text-xs font-bold text-white shrink-0 overflow-hidden">
                          {q.avatar ? (
                            <img src={q.avatar} alt="" className="h-full w-full object-cover" />
                          ) : (
                            q.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </div>
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}
