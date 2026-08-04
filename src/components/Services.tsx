"use client";

import ScrollReveal from "./ScrollReveal";

const services = [
  {
    title: "Quick solutions",
    text: "Rapid problem-solving with agile methodologies to keep your business moving forward.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/80">
        <rect x="6" y="6" width="36" height="36" rx="4" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="14" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.2" />
        <rect x="22" y="22" width="12" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Expert advice",
    text: "Insights from industry veterans with decades of experience in your sector.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/80">
        <polygon points="24,6 43,17 43,31 24,42 5,31 5,17" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="1.2" />
        <line x1="24" y1="10" x2="24" y2="18" stroke="currentColor" strokeWidth="1.2" />
        <line x1="24" y1="30" x2="24" y2="38" stroke="currentColor" strokeWidth="1.2" />
        <line x1="13" y1="17" x2="19" y2="21" stroke="currentColor" strokeWidth="1.2" />
        <line x1="29" y1="27" x2="35" y2="31" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Strategic planning",
    text: "Long-term roadmaps tailored to your unique business goals and market position.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/80">
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="1.2" />
        <path d="M24 13 C31 13 35 19 35 24 C35 29 31 35 24 35" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "Efficient operations",
    text: "Streamline workflows and eliminate bottlenecks for maximum productivity.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/80">
        <polygon points="12,10 28,10 36,24 28,38 12,38 20,24" stroke="currentColor" strokeWidth="1.2" />
        <polygon points="22,16 32,16 37,24 32,32 22,32" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-[#0B1426] py-20 md:py-24">
      {/* =====================================================
          INLINE STYLES FOR CSS VARIABLES
      ====================================================== */}
      <style>{`
        :root {
          --color-line: #d1d5db;
          --color-heading: #0a2540;
          --color-body: #4b5563;
          --color-accent: #1D65FF;
          --color-navy: #0a2540;
        }
      `}</style>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div
                className={`
                  group relative h-full overflow-hidden p-8 md:p-12 flex flex-col items-center text-center transition-all duration-300
                  ${i !== services.length - 1 ? "md:border-r lg:border-r md:border-white/10" : ""}
                `}
              >
                {/* --- BOTTOM GLOW (hover only) --- */}
                <div
                  className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-[140%] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-500/50 blur-[70px] opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100"
                />

                {/* --- ICON --- */}
                <div className="mb-2 drop-shadow-md relative z-10">
                  {s.icon}
                </div>

                {/* --- TEXT CONTENT --- */}
                <h3 className="mt-6 font-display text-xl font-bold text-white tracking-tight relative z-10">
                  {s.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-gray-400 max-w-[260px] mx-auto group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                  {s.text}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}