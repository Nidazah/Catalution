"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  imageSrc?: string;
}

export default function PageHero({
  title,
  imageSrc = "/images/portfolios/porofolio.webp",
}: PageHeroProps) {
  return (
    // Background still bleeds up behind the transparent/fixed navbar (-mt-20),
    // but text content gets its OWN top offset so it clears the navbar height.
    <section className="relative -mt-20 h-[500px] flex justify-center overflow-hidden bg-[#0B1426]">
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`${title} Hero Background`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#0B1426]/85" />
      </div>

      {/* pt-40/44 instead of pt-24 — clears the ~100px navbar + the -mt-20 offset */}
      <div className="relative z-10 container mx-auto px-6 text-center pt-40 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            {title}
          </h1>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{title}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}