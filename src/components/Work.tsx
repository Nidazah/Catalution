"use client";

import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const steps = [
  {
    n: "01.",
    title: "Understand business",
    text: "Our consultancy excels in providing quick solutions tailored to your business challenges",
    active: false,
  },
  {
    n: "02.",
    title: "Custom strategy",
    text: "Our consultancy excels in providing quick solutions tailored to your business challenges",
    active: true,
  },
  {
    n: "03.",
    title: "Execute & optimize",
    text: "Our consultancy excels in providing quick solutions tailored to your business challenges",
    active: false,
  },
];

function DotConnector({ active }: { active: boolean }) {
  return (
    <div className="flex flex-1 items-center">
      <div className="h-px flex-1 border-t border-dashed border-[var(--color-line)]" />
      <svg
        viewBox="0 0 24 24"
        className={`mx-2 h-3.5 w-3.5 shrink-0 ${
          active ? "text-[var(--color-accent)]" : "text-gray-400"
        }`}
        fill="currentColor"
      >
        <circle cx="12" cy="4" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
      </svg>
      <div className="h-px flex-1 border-t border-dashed border-[var(--color-line)]" />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-[#F7F8FA] min-h-screen flex items-center py-16 md:py-20">
      {/* =====================================================
          INLINE STYLES FOR CSS VARIABLES
      ====================================================== */}
      <style>{`
        :root {
          --color-line: #d1d5db;
          --color-heading: #0a2540;
          --color-body: #4b5563;
          --color-accent: #1D65FF;
          --color-navy: #0a2540;
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-6 w-full">
        
        {/* Simplified grid structure - no weird absolute overlaps */}
        <div className="grid gap-10 md:grid-cols-2 md:items-start relative">
          
          {/* --- IMAGE --- */}
          <ScrollReveal>
            <div className="relative aspect-[4/3] md:aspect-[16/13] w-full overflow-hidden rounded-2xl md:rounded-3xl shadow-sm">
              <Image
                src="/images/work.jpg"
                alt="Consultants reviewing business strategy"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
          </ScrollReveal>

          {/* --- HEADING (Top right) --- */}
          <ScrollReveal delay={0.1}>
            <div className="pt-0 md:pt-4">
              <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                HOW IT WORKS
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-[var(--color-heading)]">
                Three steps to transform your business
              </h2>
            </div>
          </ScrollReveal>

          {/* --- STEPS CARD --- */}
          <ScrollReveal delay={0.15} className="md:col-span-2 mt-4 md:mt-6">
            <div className="rounded-2xl bg-[#DEE7F2] p-6 md:p-8 w-full shadow-sm">
              <div className="grid gap-8 sm:grid-cols-3">
                {steps.map((s) => (
                  <div key={s.title}>
                    <div className="flex items-center">
                      {/* Shrunk number icons */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white ${
                          s.active
                            ? "bg-[var(--color-accent)]"
                            : "bg-[var(--color-navy)]"
                        }`}
                      >
                        {s.n}
                      </div>
                      <DotConnector active={s.active} />
                    </div>

                    {/* Shrunk title and text */}
                    <h3 className="mt-4 font-display text-lg font-semibold text-[var(--color-heading)]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-body)]">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* 
          REMOVED THE 260px SPACER! 
          The component naturally ends right after the steps card.
        */}

      </div>
    </section>
  );
}