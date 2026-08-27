"use client";

import { useEffect, useState } from "react";

export const defaultMarqueeItems = [
  "Mission and progress",
  "Founders and vision",
  "Growth and impact",
  "Team and values",
];

function Row({ values }: { values: string[] }) {
  return (
    <div className="flex items-center shrink-0 gap-16 pr-16">
      {values.map((t, index) => (
        <div key={`${t}-${index}`} className="flex items-center gap-16">
          <span className="font-display text-3xl md:text-4xl font-semibold text-white whitespace-nowrap">
            {t}
          </span>
          {/* --- UPDATED ICON: 40px size, 6px stroke, 5px center dot --- */}
          <svg viewBox="0 0 48 48" width="40" height="40" fill="none" className="text-white/90">
            <polygon
              points="24,4 42,14 42,34 24,44 6,34 6,14"
              stroke="currentColor"
              strokeWidth="6" 
            />
            <circle cx="24" cy="24" r="5" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const [values, setValues] = useState(defaultMarqueeItems);
  useEffect(() => {
    fetch("/api/content?sectionKey=MARQUE", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : [])
      .then((sections) => {
        const section = Array.isArray(sections) ? sections[0] : null;
        const next = Array.isArray(section?.items)
          ? section.items.map((item: { title?: string }) => item.title).filter(Boolean)
          : [];
        if (next.length) setValues(next as string[]);
      })
      .catch(() => {});
  }, []);
  return (
    <div className="bg-[var(--color-accent)] overflow-hidden py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        <Row values={values} />
        <Row values={values} />
        <Row values={values} />
      </div>
    </div>
  );
}