"use client";

import ScrollReveal from "./ScrollReveal";

const quotes = [
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
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal className="max-w-2xl">
          <span className="font-mono-caps text-[11px] uppercase text-[var(--color-accent)]">
            Client word
          </span>
          <h2 className="mt-4 font-display text-3xl md:text-4xl font-bold text-[var(--color-heading)]">
            Teams who kept us past the first project.
          </h2>
        </ScrollReveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {quotes.map((q, i) => (
            <ScrollReveal key={q.name} delay={i * 0.08}>
              <figure className="h-full flex flex-col justify-between rounded-2xl border border-[var(--color-line)] bg-[var(--color-section)] p-7">
                <blockquote className="text-sm leading-relaxed text-[var(--color-heading)]">
                  “{q.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[var(--color-navy)] flex items-center justify-center font-display text-xs font-bold text-white">
                    {q.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[var(--color-heading)]">
                      {q.name}
                    </div>
                    <div className="text-xs text-[var(--color-body)]">{q.role}</div>
                  </div>
                </figcaption>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
