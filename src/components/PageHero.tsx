"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageSrc?: string;
  className?: string;
  children?: React.ReactNode;
  showBreadcrumbs?: boolean;
}

export default function PageHero({
  title,
  subtitle,
  imageSrc = "/images/portfolios/porofolio.webp",
  className = "",
  children,
  showBreadcrumbs = true,
}: PageHeroProps) {
  return (
    <section
      className={`relative min-h-[380px] sm:min-h-[420px] lg:min-h-[500px] flex items-center justify-center overflow-hidden bg-navy ${className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt={`${title} Hero Background`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-navy/50" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 lg:px-8 py-28 sm:py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            {title}
          </h1>

          {subtitle && (
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-6">
              {subtitle}
            </p>
          )}

          {showBreadcrumbs && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-white">{title}</span>
            </div>
          )}

          {children}
        </motion.div>
      </div>
    </section>
  );
}
