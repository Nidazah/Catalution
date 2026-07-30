"use client";

import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section 
      id="about" 
      className="bg-[#F5F7FA] min-h-screen flex items-center overflow-hidden" 
    >
      <div className="mx-auto max-w-7xl px-6 grid gap-10 md:grid-cols-2 items-center py-8 md:py-0 w-full">
        
        {/* Left: image with badge */}
        <ScrollReveal className="relative flex items-center justify-center">
          {/* 
             Changed height from fixed pixel to 'max-h-[60vh]' (60% of viewport height).
             This makes sure the image shrinks to fit any screen perfectly.
          */}
          <div className="relative w-full max-h-[60vh] min-h-[300px] overflow-hidden rounded-2xl shadow-lg bg-[#EAF1FB]">
            <img
              src="/images/about/about.avif"
              alt="Team collaborating"
              className="h-full w-full object-cover"
            />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="font-display text-4xl md:text-5xl font-bold outline-text">
                Reach <span className="text-white">20M</span>
              </div>
            </div>
          </div>
          
          {/* Award badge - tightened slightly */}
          <div className="absolute -top-8 -left-8 h-32 w-32 md:h-40 md:w-40 rounded-full bg-[var(--color-accent)] text-white flex items-center justify-center shadow-xl z-10">
            <div className="text-center leading-tight scale-90 md:scale-100">
              <div className="text-[9px] md:text-[10px] tracking-widest">SCINCE 2019</div>
              <div className="mt-2 text-[10px] md:text-xs font-semibold">AWARD<br/>WINNING<br/>AGENCY</div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: copy - compressed to fit one screen */}
        <ScrollReveal className="flex flex-col justify-center gap-3 md:gap-4">
          <span className="font-mono-caps text-[10px] md:text-[11px] uppercase tracking-widest text-[var(--color-accent)]">
            • ABOUT OUR COMPANY
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-heading)] leading-[1.1]">
            Crafting success tailored solution for each & every challenges
          </h2>
          <p className="text-[15px] md:text-base text-[var(--color-body)] max-w-xl leading-relaxed">
            Our mission is to empower businesses of all size to thrive in an ever-changing marketplace. In today's dynamic business environment, the key to success lies in adaptability.
          </p>

          {/* Stats Box - Compressed padding and margins to save space */}
          <div className="grid grid-cols-2 bg-[#EAF1FB] rounded-2xl p-6 md:p-8 gap-4 relative max-w-lg mt-2">
            <div>
              <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-heading)]">
                8.5x
              </div>
              <div className="mt-1 text-sm text-[var(--color-body)]">
                Faster growth
              </div>
            </div>
            <div className="border-l border-[var(--color-line)] pl-4 md:pl-6 relative flex flex-col justify-center">
              <span className="absolute -left-1.5 top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white ring-2 ring-[var(--color-accent)]" />
              <div className="font-display text-4xl md:text-5xl font-bold text-[var(--color-heading)]">
                20M
              </div>
              <div className="mt-1 text-sm text-[var(--color-body)]">
                Reach worldwide
              </div>
            </div>
          </div>

          {/* Button - reduced margin top */}
          <div className="mt-2 flex items-center gap-6">
            <a
              href="#contact"
              data-cursor-hover
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-7 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowRight className="h-4 w-4" />
              </span>
              Know More
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}