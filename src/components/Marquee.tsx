"use client";

const items = [
  "Mission and progress",
  "Founders and vision",
  "Growth and impact",
  "Team and values",
];

function Row() {
  return (
    <div className="flex items-center shrink-0 gap-16 pr-16">
      {items.map((t) => (
        <div key={t} className="flex items-center gap-16">
          <span className="font-display text-3xl md:text-4xl font-semibold text-white whitespace-nowrap">
            {t}
          </span>
          <svg viewBox="0 0 48 48" width="28" height="28" fill="none" className="text-white/90">
            <polygon
              points="24,4 42,14 42,34 24,44 6,34 6,14"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <circle cx="24" cy="24" r="3" fill="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="bg-[var(--color-accent)] overflow-hidden py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        <Row />
        <Row />
        <Row />
      </div>
    </div>
  );
}
