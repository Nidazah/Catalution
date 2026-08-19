"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

const fallbackServices = [
  { title: "Quick solutions", text: "Rapid problem-solving with agile methodologies to keep your business moving forward." },
  { title: "Expert advice", text: "Insights from industry veterans with decades of experience in your sector." },
  { title: "Strategic planning", text: "Long-term roadmaps tailored to your unique business goals and market position." },
  { title: "Efficient operations", text: "Streamline workflows and eliminate bottlenecks for maximum productivity." },
];

type Service = {
  id: string;
  title: string;
  description: string;
  shortDescription?: string | null;
  icon?: string | null;
};


export default function Services() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/services", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load services"))))
      .then((data) => {
        if (!cancelled) setServices(Array.isArray(data?.services) ? data.services : []);
      })
      .catch(() => {
        if (!cancelled) setServices([]);
      });
    return () => { cancelled = true; };
  }, []);

  const items = services.length > 0
    ? services.slice(0, 4).map((s) => ({ title: s.title, text: s.shortDescription || s.description, icon: s.icon }))
    : fallbackServices.map((s) => ({ ...s, icon: undefined }));

  return (
    <section id="services" className="bg-navy py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <ScrollReveal key={`${s.title}-${i}`} delay={i * 0.08}>
              <div className={`group relative h-full overflow-hidden p-3 sm:p-4 md:p-5 flex flex-col items-center text-center transition-all duration-300 ${i % 2 === 0 ? "border-r border-white/10" : ""} ${i < 2 ? "border-b lg:border-b-0 border-white/10" : ""} ${i !== items.length - 1 ? "lg:border-r" : ""}`}>
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-[120%] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/50 blur-[40px] opacity-0 scale-90 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-100" />
                <div className="mb-2 drop-shadow-md relative z-10">
                  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/90">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight relative z-10">{s.title}</h3>
                <p className="body-sm mt-1 leading-relaxed text-gray-400 max-w-[180px] mx-auto group-hover:text-gray-300 transition-colors duration-300 relative z-10">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}