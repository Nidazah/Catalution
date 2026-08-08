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
      <div className="h-px flex-1 border-t border-dashed border-line" />
      <svg
        viewBox="0 0 24 24"
        className={`mx-2 h-3.5 w-3.5 shrink-0 ${
          active ? "text-accent" : "text-gray-400"
        }`}
        fill="currentColor"
      >
        <circle cx="12" cy="4" r="2" />
        <circle cx="12" cy="20" r="2" />
        <circle cx="4" cy="12" r="2" />
        <circle cx="20" cy="12" r="2" />
      </svg>
      <div className="h-px flex-1 border-t border-dashed border-line" />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-section min-h-screen flex items-center py-16 md:py-20">
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
              <span className="inline-flex items-center gap-2 rounded bg-orange-100 px-3 py-1.5 text-xs font-semibold tracking-wide text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                HOW IT WORKS
              </span>
              <h2 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold leading-[1.08] text-heading">
                Three steps to transform your business
              </h2>
            </div>
          </ScrollReveal>

          {/* --- STEPS CARD --- */}
          <ScrollReveal delay={0.15} className="md:col-span-2 mt-4 md:mt-6">
            <div className="rounded-2xl bg-purple-100 p-6 md:p-8 w-full shadow-sm">
              <div className="grid gap-8 sm:grid-cols-3">
                {steps.map((s) => (
                  <div key={s.title}>
                    <div className="flex items-center">
                      {/* Shrunk number icons */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold text-white ${
                          s.active
                            ? "bg-accent"
                            : "bg-navy"
                        }`}
                      >
                        {s.n}
                      </div>
                      <DotConnector active={s.active} />
                    </div>

                    {/* Shrunk title and text */}
                    <h3 className="mt-4 font-display text-lg font-semibold text-heading">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-body">
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