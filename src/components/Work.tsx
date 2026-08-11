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
      <div className="h-px flex-1 border-t border-dashed border-purple-300/60" />
      <svg
        viewBox="0 0 24 24"
        className={`mx-1.5 h-3 w-3 shrink-0 ${
          active ? "text-accent" : "text-purple-300"
        }`}
        fill="currentColor"
      >
        <circle cx="12" cy="4" r="1.5" />
        <circle cx="12" cy="20" r="1.5" />
        <circle cx="4" cy="12" r="1.5" />
        <circle cx="20" cy="12" r="1.5" />
      </svg>
      <div className="h-px flex-1 border-t border-dashed border-purple-300/60" />
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="bg-[#F1EDFF] py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-stretch">
          
          {/* --- LEFT: IMAGE --- */}
          <ScrollReveal className="h-full">
            <div className="relative w-full h-full min-h-[300px] md:min-h-[450px] overflow-hidden rounded-2xl md:rounded-3xl shadow-sm">
              <Image
                src="/images/h5-process-img.webp"
                alt="Consultants reviewing business strategy"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </ScrollReveal>

          {/* --- RIGHT: STEPS CARD --- */}
          <ScrollReveal delay={0.15} className="h-full">
            <div className="flex flex-col justify-center h-full rounded-2xl md:rounded-3xl bg-white/60 backdrop-blur-[2px] p-6 md:p-8 shadow-sm border border-white/40">
              
              {/* --- HEADING --- */}
              <div className="mb-6 md:mb-8">
                <span className="inline-flex items-center gap-2 rounded bg-orange-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-accent">
                  <span className="h-1 w-1 rounded-full bg-accent" />
                  HOW IT WORKS
                </span>
                {/* 
                  EXACT TEXT STYLES PRESERVED:
                  font-display, text-2xl, leading-[1.08]
                */}
                <h2 className="mt-3 font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.08] text-heading">
                  Three steps to <br className="hidden sm:block" />
                  <span className="text-accent">transform</span> your business
                </h2>
              </div>

              {/* --- STEPS GRID --- */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4">
                {steps.map((s) => (
                  <div key={s.title} className="flex flex-col">
                    <div className="flex items-center mb-2">
                      {/* Uniform circle color for every step */}
                      <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy font-display text-xs font-bold text-white
                                   transition-all duration-300 ease-out
                                   hover:ring-2 hover:ring-accent hover:ring-offset-2 hover:ring-offset-white hover:-translate-y-0.5"
                      >
                        {s.n}
                      </div>
                      <DotConnector active={s.active} />
                    </div>

                    <h3 className="mt-3 font-display text-[16px] font-semibold text-heading">
                      {s.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-body">
                      {s.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}