"use client";

import Link from "next/link";

export default function ConsultantBanner() {
  return (
    <section className="w-full bg-navy py-10 md:py-14 overflow-hidden relative">
      {/* Decorative background curves */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-12 text-center sm:text-left">
          
          {/* Left: Text - Using Global H3/H4 classes for responsive scaling */}
          <h3 className="h3 sm:h4 text-white tracking-tight">
            GET CONSULTANT NOW!
          </h3>

          {/* Right: Button - ✅ Replaced custom Button import with global Outline Button */}
          <Link href="/contact" className="btn btn-outline shadow-md whitespace-nowrap">
            Lets talk now
          </Link>
        </div>
      </div>
    </section>
  );
}