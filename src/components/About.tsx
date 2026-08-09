"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Button from "./Button";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-section py-16 md:py-20 lg:py-[68px]">
      {/* Decorative rings - Now using theme token */}
      <svg
        className="pointer-events-none absolute -left-40 top-10 opacity-10"
        width="520"
        height="520"
        viewBox="0 0 520 520"
        fill="none"
        aria-hidden
      >
        <circle cx="260" cy="260" r="259" stroke="stroke-purple-300" />
        <circle cx="260" cy="260" r="200" stroke="stroke-purple-300" />
        <circle cx="260" cy="260" r="140" stroke="stroke-purple-300" />
      </svg>
      <svg
        className="pointer-events-none absolute right-0 top-40 opacity-10"
        width="640"
        height="640"
        viewBox="0 0 640 640"
        fill="none"
        aria-hidden
      >
        <path
          d="M320 20 C520 20 620 180 620 320 C620 500 460 620 320 620"
          stroke="stroke-purple-300"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M320 80 C480 80 560 200 560 320 C560 460 440 560 320 560"
          stroke="stroke-purple-300"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      <div className="relative mx-auto max-w-[1020px] grid grid-cols-1 items-center gap-14 px-6 md:grid-cols-[390px_1fr] md:gap-[68px] lg:px-0">
        
        {/* =====================================================
            LEFT IMAGE AREA - Animated
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative mx-auto w-full max-w-[390px]"
        >
          {/* Main image */}
          <div className="relative h-[450px] w-full overflow-hidden rounded-[3px] md:h-[420px]">
            <Image
              src="/images/about/h5-about-1.webp"
              alt="Team collaborating around a laptop"
              fill
              priority
              sizes="390px"
              className="object-cover"
            />

            {/* Bottom dark gradient - now using navy token */}
            <div className="absolute inset-x-0 bottom-0 h-[125px] bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />

            {/* Reach 20M */}
            <div className="absolute bottom-7 left-4">
              <p className="text-[31px] font-light leading-none tracking-tight text-white">
                Reach <span className="font-bold text-white">20M</span>
              </p>
            </div>
          </div>

          {/* =================================================
              AWARD BADGE - Animated
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: easeOut }}
            className="absolute -left-[17px] top-[112px] z-20 flex h-[91px] w-[91px] items-center justify-center rounded-full border-[5px] border-white bg-accent shadow-md"
          >
            {/* Circular text — rotates continuously (class from globals.css) */}
            <svg
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full animate-spin-slow"
            >
              <defs>
                <path
                  id="badgeCircle"
                  d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>

              <text
                fill="white"
                fontSize="7.2"
                fontWeight="600"
                letterSpacing="1.5"
              >
                <textPath href="#badgeCircle" startOffset="1%">
                  AWARD WINNING AGENCY • SINCE 2019 •
                </textPath>
              </text>
            </svg>

            {/* Center icon — stays upright, doesn't rotate */}
            <div className="relative flex h-[35px] w-[35px] items-center justify-center rounded-full bg-white/10">
              <svg
                viewBox="0 0 24 24"
                className="h-[20px] w-[20px]"
                fill="none"
              >
                <path
                  d="M12 2L15 9L22 9.5L16.5 14L18.5 21L12 17L5.5 21L7.5 14L2 9.5L9 9L12 2Z"
                  fill="white"
                />
              </svg>
            </div>
          </motion.div>

        </motion.div>

        {/* =====================================================
            RIGHT CONTENT - Animated with stagger
        ====================================================== */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative max-w-[460px]"
        >
          {/* Label */}
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded bg-orange-100 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.7px] text-accent"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            About Our Company
          </motion.span>

          {/* Heading */}
          <motion.h2
            variants={item}
            className="mt-4 font-display text-[28px] md:text-[32px] lg:text-[36px] font-bold leading-[1.08] tracking-[-1.2px] text-navy"
          >
            Crafting success tailored
            <br />
            solution for each &amp; every
            <br />
            challenges
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={item}
            className="mt-4 max-w-[420px] text-[15px] md:text-[16px] font-normal leading-[1.65] text-heading"
          >
            Our mission is to empower businesses of all sizes to thrive in an
            ever-changing marketplace. In today's dynamic business environment,
            the key to success lies in adaptability. Our consultancy excels in
            providing quick solutions tailored to your unique challenges.
          </motion.p>

          {/* =================================================
              STATS CARD - Animated with hover
          ================================================== */}
          <motion.div
            variants={item}
            className="mt-4 flex h-[79px] w-full max-w-[259px] bg-section transition-colors hover:bg-purple-100"
          >
            {/* First stat */}
            <div className="flex flex-1 flex-col justify-center px-[15px]">
              <p className="text-[36px] font-bold leading-none tracking-[-1.5px] text-navy">
                8.5x
              </p>
              <p className="mt-[6px] text-[10px] font-medium text-heading">
                Faster growth
              </p>
            </div>

            {/* Divider */}
            <div className="my-[10px] w-px bg-white" />

            {/* Second stat */}
            <div className="relative flex flex-1 flex-col justify-center px-[15px]">
              {/* Small accent dot */}
              <span className="absolute -left-[3px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full border border-accent bg-white" />

              <p className="text-[36px] font-bold leading-none tracking-[-1.5px] text-navy">
                20M
              </p>
              <p className="mt-[6px] text-[10px] font-medium text-heading">
                Reach worldwide
              </p>
            </div>
          </motion.div>

          {/* =================================================
                SMALL STATIC FLOATING IMAGE (behind button)
            ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="absolute -bottom-[61px] right-[20px] z-10 hidden h-[128px] w-[128px] overflow-hidden border-[3px] border-white shadow-lg md:block animate-float-drift"
          >
            <Image
              src="/images/about/h5-about-2.webp"
              alt="Colleagues reviewing documents"
              fill
              sizes="128px"
              className="object-cover"
            />
          </motion.div>

          {/* =================================================
              CTA - Animated Button
          ================================================== */}
          <motion.div variants={item} className="mt-4">
            <Button
              href="/about"
              size="md"
              className="bg-navy text-white transition-transform hover:scale-[1.03]"
            >
              Know More
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}