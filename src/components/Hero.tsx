"use client";

import { motion, type Variants } from "framer-motion";
import { Play } from "lucide-react";
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

export type HeroItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
};

export type HeroSettings = {
  reelEnabled?: boolean;
  reelLabel?: string;
  reelUrl?: string;
  clientCardEnabled?: boolean;
  clientCount?: string;
  clientLabel?: string;
  clientAvatar1?: string;
  clientAvatar2?: string;
  clientAvatar3?: string;
  badgeLabel?: string;
  badgeValue?: string;
};

type HeroProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  items?: HeroItem[];
  settings?: HeroSettings;
};

export default function Hero({
  eyebrow,
  title,
  description,
  image,
  primaryButtonLabel,
  primaryButtonUrl,
  items = [],
  settings = {},
}: HeroProps) {
  const fallbackAvatars = [
    "/images/about/thumb-1.png",
    "/images/about/thumb-2.png",
    "/images/about/thumb-3.png",
  ];

  const cmsAvatars = items
    .map((item) => item.image?.trim())
    .filter((image): image is string => Boolean(image))
    .slice(0, 3);

  const configuredAvatars = [
    settings.clientAvatar1?.trim(),
    settings.clientAvatar2?.trim(),
    settings.clientAvatar3?.trim(),
  ];

  const avatars = fallbackAvatars.map((fallback, index) =>
    configuredAvatars[index] || cmsAvatars[index] || fallback,
  );

  const heroImage = image && image.trim() !== "" ? image : "/images/hero/h5-hero.png";
  const reelEnabled = settings.reelEnabled !== false;
  const reelLabel = settings.reelLabel?.trim() || "Play our reels";
  const reelUrl = settings.reelUrl?.trim() || "https://www.youtube.com/watch?v=MLpWrANjFbI";
  const clientCardEnabled = settings.clientCardEnabled !== false;
  const clientCount = settings.clientCount?.trim() || "39K+";
  const clientLabel = settings.clientLabel?.trim() || "Happy clients all over world.";
  const heroEyebrow = eyebrow && eyebrow.trim() !== "" ? eyebrow : "SOLVER AGENCY";
  const heroDescription =
    description && description.trim() !== ""
      ? description
      : "Transform your business with expert consultancy services — our team of seasoned consultants unparalleled.";
  const btnLabel =
    primaryButtonLabel && primaryButtonLabel.trim() !== ""
      ? primaryButtonLabel
      : "Free consultation";
  const btnUrl =
    primaryButtonUrl && primaryButtonUrl.trim() !== "" ? primaryButtonUrl : "#contact";

  return (
    <>
      <style jsx global>{`
        :root {
          --font-poppins: "Poppins", sans-serif;
          --font-inter: "Inter", sans-serif;
        }

        .hero-tag,
        .hero-title,
        .hero-btn,
        .hero-reel-text,
        .hero-avatar-count {
          font-family: var(--font-poppins), sans-serif;
        }

        .hero-tag {
          font-size: 11px;
          line-height: 1.5;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .hero-title {
          font-size: 64px;
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        .hero-reel-text {
          font-size: 13px;
          line-height: 1.6;
          font-weight: 600;
        }
        .hero-avatar-count {
          font-size: 22px;
          line-height: 1.3;
          font-weight: 700;
        }
        .hero-btn {
          font-weight: 500;
          line-height: 1.4;
        }

        .hero-desc,
        .hero-avatar-label {
          font-family: var(--font-inter), sans-serif;
        }

        .hero-desc {
          font-size: 17px;
          line-height: 1.6;
        }
        .hero-avatar-label {
          font-size: 13px;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
            line-height: 1.1;
          }
          .hero-desc {
            font-size: 14px;
          }
          .hero-avatar-count {
            font-size: 19px;
          }
          .hero-avatar-label {
            font-size: 12px;
          }
          .hero-reel-text {
            font-size: 12px;
          }
        }
      `}</style>

      <section
        id="top"
        className="relative overflow-hidden overflow-x-hidden pb-0 bg-[#ECF1F7]"
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

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 items-center pb-0">
          {/* Left Column: Text */}
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.span
              variants={item}
              className="hero-tag inline-flex items-center gap-1 sm:gap-2 rounded-md border border-[var(--color-line)] bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 text-[var(--color-heading)]"
            >
              {settings.badgeLabel || "NUMBER"}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-accent)] text-white text-[10px] font-bold">
                {settings.badgeValue || "#1"}
              </span>
              {heroEyebrow}
            </motion.span>

            <motion.h1
              variants={item}
              className="hero-title mt-2 sm:mt-4 text-[var(--color-heading)]"
            >
              {title && title.trim() !== "" ? (
                title
              ) : (
                <>
                  Proven <span className="text-[var(--color-accent)]">consulting</span>
                  <br />
                  for modern global
                  <br />
                  enterprises
                </>
              )}
            </motion.h1>

            <motion.p
              variants={item}
              className="hero-desc mt-2 sm:mt-4 max-w-lg text-[var(--color-body)]"
            >
              {heroDescription}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-4 sm:mt-6 flex flex-wrap items-center gap-4"
            >
              <span className="sm:hidden">
                <Link href={btnUrl} className="btn btn-primary text-sm">
                  {btnLabel}
                </Link>
              </span>

              <span className="hidden sm:inline-block">
                <Link href={btnUrl} className="btn btn-primary">
                  {btnLabel}
                </Link>
              </span>
            </motion.div>
          </motion.div>

          {/* Right Column: Image */}
          <div className="relative flex items-center justify-center w-full h-full px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
              className="relative w-[80%] sm:w-full max-w-sm aspect-[3.5/4.5] overflow-hidden rounded-2xl z-0 mt-6 sm:mt-10"
            >
              <Image
                src={heroImage}
                alt="Consultant"
                fill
                priority
                className="object-contain object-bottom"
                sizes="(max-width: 768px) 90vw, 400px"
              />
            </motion.div>

            {/* --- EDITABLE REEL BUTTON --- */}
            {reelEnabled && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-24 right-8 sm:top-20 sm:right-2 z-20"
            >
              <Link
                href={reelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[12px] bg-white px-3 py-2 sm:px-3.5 sm:py-2.5 shadow-lg border border-gray-100 hover:border-[var(--color-accent)] hover:shadow-xl transition-all animate-float-drift"
              >
                <span className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                  <Play className="h-3 w-3 sm:h-3.5 sm:w-3.5 fill-white" />
                </span>
                <span className="hero-reel-text text-[var(--color-heading)] underline underline-offset-2">
                  {reelLabel}
                </span>
              </Link>
            </motion.div>
            )}

            {/* --- EDITABLE HAPPY CLIENTS CARD --- */}
            {clientCardEnabled && (
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="absolute bottom-2 left-2 sm:bottom-8 sm:-left-4 z-20 bg-white rounded-xl p-2.5 sm:p-3.5 shadow-xl w-[150px] sm:w-[210px] animate-float-drift"
            >
              <div className="relative flex items-center justify-start">
                {avatars.map((src, i) => (
                  <div
                    key={i}
                    className="relative -ml-2.5 first:ml-0 h-7 w-7 sm:h-9 sm:w-9 rounded-full overflow-hidden border-2 border-white bg-gray-200 shadow-sm grayscale opacity-90"
                  >
                    <Image
                      src={src}
                      alt="Client"
                      fill
                      className="object-cover"
                      sizes="40px"
                    />
                  </div>
                ))}
                <div className="relative -ml-2.5 h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-[#1D65FF] flex items-center justify-center border-2 border-white shadow-sm">
                  <span className="text-white text-sm sm:text-lg font-light">+</span>
                </div>
              </div>

              <div className="mt-2">
                <span className="hero-avatar-count text-[var(--color-heading)]">{clientCount}</span>
                <p className="hero-avatar-label text-[var(--color-body)]">
                  {clientLabel}
                </p>
              </div>
            </motion.div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}