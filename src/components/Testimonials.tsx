"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollReveal from "./ScrollReveal";

type TestimonialProps = {
  eyebrow?: string;
  title?: string;
};

type Quote = { text: string; name: string; role: string };

export default function Testimonials({ eyebrow, title }: TestimonialProps) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/testimonials", { cache: "no-store", signal: controller.signal })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to load testimonials")))
      .then((data) => {
        if (Array.isArray(data)) {
          setQuotes(data.map((item) => ({
            text: item.quote ?? "",
            name: item.name ?? "",
            role: item.role ?? "",
          })).filter((q) => q.text || q.name));
        }
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const cardsPerView = isDesktop ? 3 : 1;
  const totalSlides = Math.max(1, Math.ceil(quotes.length / cardsPerView));

  const next = useCallback(() => setIndex((i) => (i + 1) % totalSlides), [totalSlides]);

  useEffect(() => {
    if (isPaused || quotes.length === 0) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, quotes.length]);

  useEffect(() => {
    if (index >= totalSlides) setIndex(0);
  }, [index, totalSlides]);

  if (!quotes.length && !title) return null;

  const visibleQuotes = quotes.slice(index * cardsPerView, index * cardsPerView + cardsPerView);

  return (
    <section id="testimonials" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="max-w-3xl">
          {eyebrow && <span className="ui-sm uppercase text-[var(--color-accent)] font-semibold">{eyebrow}</span>}
          {title && <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-[var(--color-heading)]">{title}</h2>}
        </ScrollReveal>

        {quotes.length > 0 && (
          <div className="mt-12 relative" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 gap-4 md:grid-cols-3"
              >
                {visibleQuotes.map((q) => (
                  <figure key={`${q.name}-${q.role}`} className="h-full flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-section)] p-6 sm:p-7 min-h-[220px]">
                    <blockquote className="body-md leading-relaxed text-[var(--color-heading)]">“{q.text}”</blockquote>
                    <figcaption className="mt-6 flex items-start gap-3">
                      <div className="h-10 w-10 rounded-full bg-[var(--color-navy)] flex items-center justify-center ui-sm font-bold text-white shrink-0">
                        {q.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div className="min-w-0">
                        <div className="body-md font-semibold text-[var(--color-heading)]">{q.name}</div>
                        <div className="body-md text-[var(--color-body)]">{q.role}</div>
                      </div>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </AnimatePresence>

            {totalSlides > 1 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: totalSlides }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to testimonial slide ${i + 1}`}
                    onClick={() => setIndex(i)}
                    className={`h-2 rounded-full transition-all ${i === index ? "w-6 bg-[var(--color-accent)]" : "w-2 bg-[var(--color-line)]"}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
