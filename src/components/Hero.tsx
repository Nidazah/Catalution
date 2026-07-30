"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function Hero() {
  return (
    <section
      id="top"
      // FIX: pb-24/pb-32 removed — the portrait image already extends
      // to the bottom of the row, so this extra padding was pure gap.
      className="relative overflow-hidden pt-40 pb-0 md:pt-44 md:pb-0 bg-[#ECF1F7]"
    >
      {/* Decorative rings */}
      <svg
        className="pointer-events-none absolute -left-40 top-10 opacity-30"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden
      >
        <circle cx="260" cy="260" r="259" stroke="#BFD3F0" />
        <circle cx="260" cy="260" r="200" stroke="#BFD3F0" />
        <circle cx="260" cy="260" r="140" stroke="#BFD3F0" />
      </svg>
      <svg
        className="pointer-events-none absolute right-0 top-40 opacity-40"
        width="640"
        height="640"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden
      >
        <path
          d="M320 20 C520 20 620 180 620 320 C620 500 460 620 320 620"
          stroke="#BFD3F0"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M320 80 C480 80 560 200 560 320 C560 460 440 560 320 560"
          stroke="#BFD3F0"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* FIX: items-center -> items-end so both columns bottom-align.
          Previously the shorter/taller column mismatch left a visible
          gap under whichever column was shorter (here, the image). */}
      <div className="relative mx-auto max-w-7xl px-6 grid md:grid-cols-2 gap-14 items-end pb-16 md:pb-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-line)] bg-white px-3 py-2 font-mono-caps text-[11px] uppercase tracking-wider text-[var(--color-heading)]"
          >
            NUMBER
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold">
              #1
            </span>
            SOLVER AGENCY
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl md:text-6xl lg:text-[4rem] font-bold leading-[1.05] text-[var(--color-heading)]"
          >
            Proven{" "}
            <span className="text-[var(--color-accent)] italic font-serif">
              consulting
            </span>
            <br />
            for modern global
            <br />
            enterprises
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-base md:text-lg text-[var(--color-body)]"
          >
            Transform your business with expert consultancy services — our team
            of seasoned consultants unparalleled.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              data-cursor-hover
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-7 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(10,37,64,0.5)] transition-transform hover:scale-[1.03]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowRight className="h-4 w-4" />
              </span>
              Free consultation
            </a>
          </motion.div>
        </motion.div>

        {/* Right: portrait + floating cards */}
        <div className="relative flex items-end justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="relative w-full max-w-sm h-auto overflow-hidden rounded-2xl"
          >
            <img
              src="/images/hero/h5-hero.png"
              alt="Consultant"
              className="h-full w-full object-contain object-bottom"
            />
          </motion.div>

          {/* Play reels bubble */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="absolute top-14 -right-4"
          >
            <a
              href="https://www.youtube.com/watch?v=MLpWrANjFbI"
              target="_blank"
              rel="noopener noreferrer"
              className="animate-float-drift inline-flex items-center gap-3 rounded-full bg-white pl-2 pr-6 py-2 shadow-xl border border-gray-100"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <Play className="h-4 w-4 fill-white" />
              </span>
              <span className="text-sm font-semibold text-[var(--color-heading)] underline underline-offset-2">
                Play our reels
              </span>
            </a>
          </motion.div>

          {/* Happy clients card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="absolute bottom-16 -left-6"
          >
            <div className="animate-float rounded-2xl bg-white p-5 shadow-2xl w-[260px]">
              <div className="flex items-center">
                {[
                  "https://i.pravatar.cc/64?img=12",
                  "https://i.pravatar.cc/64?img=32",
                  "https://i.pravatar.cc/64?img=47",
                ].map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-10 w-10 rounded-full ring-2 ring-white object-cover -ml-2 first:ml-0"
                  />
                ))}
                <span className="ml-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white text-lg font-semibold">
                  +
                </span>
              </div>
              <div className="mt-4">
                <span className="font-display text-2xl font-bold text-[var(--color-heading)]">
                  39K+
                </span>
                <p className="whitespace-nowrap text-sm text-[var(--color-body)]">
                  Happy clients all over world.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}