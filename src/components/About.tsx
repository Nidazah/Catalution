"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const easeOut = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

type AboutProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  settings?: { stat1Value?: string; stat1Label?: string; stat2Value?: string; stat2Label?: string; statBadgeLabel?: string; statBadgeValue?: string };
};

export default function AboutSection({
  eyebrow,
  title,
  description,
  image,
  primaryButtonLabel,
  primaryButtonUrl,
  settings,
}: AboutProps) {
  const aboutImage = image && image.trim() !== "" ? image : "/images/about/h5-about-1.webp";
  const aboutEyebrow = eyebrow && eyebrow.trim() !== "" ? eyebrow : "ABOUT OUR COMPANY";
  const aboutDescription =
    description && description.trim() !== ""
      ? description
      : "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. In today's dynamic business environment, the key to success lies in adaptability. Our consultancy excels in providing quick solutions tailored to your unique challenges.";
  const btnLabel =
    primaryButtonLabel && primaryButtonLabel.trim() !== "" ? primaryButtonLabel : "Learn About Us";
  const btnUrl = primaryButtonUrl && primaryButtonUrl.trim() !== "" ? primaryButtonUrl : "#contact";

  return (
    <section className="relative w-full overflow-hidden bg-section pt-0 pb-10 sm:pb-12 lg:pb-14">
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

      <div className="relative mx-auto flex w-full justify-center">
        <div className="relative mx-auto grid w-full max-w-[1020px] grid-cols-1 items-center justify-items-center gap-14 px-6 md:grid-cols-[390px_1fr] md:gap-[68px] lg:px-0">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="relative mx-auto w-full max-w-[390px]"
        >
          <div className="relative h-[450px] w-full overflow-hidden rounded-[3px] md:h-[420px]">
            <Image
              src={aboutImage}
              alt="Team collaborating around a laptop"
              fill
              priority
              sizes="390px"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-[125px] bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
            <div className="absolute bottom-7 left-4">
              <p className="h5 text-white font-light">
                {settings?.statBadgeLabel || "Reach"} <span className="font-bold text-white">{settings?.statBadgeValue || "20M"}</span>
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative mx-auto w-full max-w-[460px] text-left"
        >
          <div className="mb-6 md:mb-8">
            <span className="inline-flex items-center gap-2 rounded bg-orange-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-accent">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {aboutEyebrow}
            </span>
          </div>

          <motion.h2
            variants={item}
            className="mt-3 font-display text-xl sm:text-2xl md:text-3xl lg:text-3xl font-bold leading-[1.1] text-heading"
          >
            {title && title.trim() !== "" ? (
              title
            ) : (
              <>
                Crafting success tailored
                <br className="hidden sm:block" />
                solution for each &amp; every
                <br className="hidden sm:block" />
                <span className="text-accent">challenges</span>
              </>
            )}
          </motion.h2>

          <motion.p variants={item} className="body-md mt-4 max-w-[420px] text-heading">
            {aboutDescription}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-4 flex h-[79px] w-full max-w-[259px] bg-section transition-colors hover:bg-purple-100"
          >
            <div className="flex flex-1 flex-col justify-center px-[15px]">
              <p className="h5 font-bold text-navy">{settings?.stat1Value || "8.5x"}</p>
              <p className="ui-xs mt-[4px] font-medium text-heading">{settings?.stat1Label || "Faster growth"}</p>
            </div>

            <div className="my-[10px] w-px bg-white" />

            <div className="relative flex flex-1 flex-col justify-center px-[15px]">
              <span className="absolute -left-[3px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full border border-accent bg-white" />
              <p className="h5 font-bold text-navy">{settings?.stat2Value || "20M"}</p>
              <p className="ui-xs mt-[4px] font-medium text-heading">{settings?.stat2Label || "Reach worldwide"}</p>
            </div>
          </motion.div>

          <motion.div variants={item} className="mt-6 flex justify-start">
            <Link href={btnUrl} className="btn btn-primary text-sm">
              {btnLabel}
            </Link>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}