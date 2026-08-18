"use client";

import { useEffect, useState } from "react";
import ScrollReveal from "./ScrollReveal";

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
    const controller = new AbortController();
    fetch("/api/services", { cache: "no-store", signal: controller.signal })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to load services")))
      .then((data) => setServices(Array.isArray(data?.services) ? data.services : []))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  if (!services.length) return null;

  return (
    <section id="services" className="bg-navy py-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.slice(0, 4).map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 0.08}>
              <div className="group relative h-full overflow-hidden border-white/10 p-5 flex flex-col items-center text-center transition-all duration-300 sm:border-r sm:border-b-0">
                <div className="pointer-events-none absolute bottom-0 left-1/2 h-16 w-[120%] -translate-x-1/2 translate-y-1/2 rounded-full bg-accent/50 blur-[40px] opacity-0 transition-all duration-500 group-hover:opacity-100" />
                <div className="mb-3 relative z-10">
                  <svg viewBox="0 0 48 48" fill="none" className="h-10 w-10 text-white/90" aria-hidden="true">
                    <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
                    <circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight relative z-10">
                  {service.title}
                </h3>
                <p className="body-md mt-2 leading-relaxed text-gray-300 max-w-xs mx-auto relative z-10">
                  {service.shortDescription || service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
