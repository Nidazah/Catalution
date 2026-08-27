"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConsultantBanner() {
  const [settings, setSettings] = useState({
    enabled: true, title: "GET CONSULTANT NOW!", buttonLabel: "Lets talk now", buttonUrl: "/contact", buttonVisible: true,
  });
  useEffect(() => {
    fetch("/api/site-settings?key=LAYOUT", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : null)
      .then((payload) => payload?.data?.consultantBanner && setSettings(payload.data.consultantBanner))
      .catch(() => {});
  }, []);
  if (!settings.enabled) return null;
  return (
    <section className="w-full overflow-hidden relative" style={{backgroundColor:"var(--cms-banner-bg, var(--color-navy))", color:"var(--cms-banner-text, #fff)", paddingTop:"var(--cms-banner-pt, 40px)", paddingBottom:"var(--cms-banner-pb, 40px)"}}>
      {/* Decorative background curves */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center sm:justify-between gap-6 sm:gap-12 text-center sm:text-left">
          {/* Left: Text - Using Global H3/H4 classes for responsive scaling */}
          <h3 className="h3 sm:h4 tracking-tight" style={{color:"var(--cms-banner-text, #fff)"}}>
            {settings.title}
          </h3>

          {/* Right: Button - ✅ Replaced custom Button import with global Outline Button */}
          {settings.buttonVisible !== false && <Link
            href={settings.buttonUrl || "/contact"}
            className="btn shadow-md whitespace-nowrap" style={{backgroundColor:"var(--cms-banner-button-bg, #fff)", color:"var(--cms-banner-button-text, var(--color-navy))", borderColor:"var(--cms-banner-button-bg, #fff)"}}
          >
            {settings.buttonLabel || "Lets talk now"}
          </Link>}
        </div>
      </div>
    </section>
  );
}
