"use client";

import Link from "next/link";
import {
  Radar,
  Layers,
  UserRoundCog,
  Snowflake,
  PieChart,
  ArrowRightLeft,
  ArrowRight,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Button from "./Button";

// --- DATA EXPORTED SO IT CAN BE USED IN THE PAGE TOO ---
export const services = [
  {
    id: "1",
    title: "Business Process Optimization",
    subtitle: "Streamline operations & maximize ROI",
    href: "/services/1",
    icon: Radar,
  },
  {
    id: "2",
    title: "Strategic Planning & Execution",
    subtitle: "Turn bold visions into measurable results",
    href: "/services/2",
    icon: Layers,
  },
  {
    id: "3",
    title: "Leadership Executive Coaching",
    subtitle: "Empower your C-suite to inspire greatness",
    href: "/services/3",
    icon: UserRoundCog,
  },
  {
    id: "4",
    title: "Legacy Leadership Institute",
    subtitle: "Build a sustainable, enduring culture",
    href: "/services/4",
    icon: Snowflake,
  },
  {
    id: "5",
    title: "Executive Growth Solutions",
    subtitle: "Unlock the full potential of your team",
    href: "/services/5",
    icon: PieChart,
  },
  {
    id: "6",
    title: "Empowered Leadership Journey",
    subtitle: "Transform managers into visionary leaders",
    href: "/services/6",
    icon: ArrowRightLeft,
  },
];

const easeOut = [0.22, 1, 0.36, 1] as const;
const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

interface ServicesSidebarProps {
  activeId?: string; // The ID of the currently active service page
}

export default function ServicesSidebar({ activeId }: ServicesSidebarProps) {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-in { animation: slideIn 0.3s ease-out forwards; }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(26, 115, 232, 0.4); }
          50% { box-shadow: 0 0 0 8px rgba(26, 115, 232, 0); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #EAF3FF 25%, #d4e6ff 50%, #EAF3FF 75%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
      {/* Header */}
      <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-[#F8FAFD] to-white">
        <h3 className="text-[15px] font-bold text-[#0B1426] flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#1A73E8] animate-pulse" />
          Our Services
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Explore our comprehensive consulting solutions
        </p>
      </div>
      <div className="divide-y divide-gray-100">
        {services.map((service, index) => {
          const isActive = service.id === activeId;

          return (
            <Link
              key={service.id}
              href={service.href}
              className={`group relative block p-5 transition-all duration-300 hover:bg-[#F8FAFD] hover:pl-6 cursor-pointer ${
                isActive ? "bg-[#F8FAFD] pl-6" : ""
              }`}
            >
              {/* Hover & Active gradient accent line */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-[#1A73E8] transition-opacity duration-300 rounded-l-full ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              />

              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A73E8]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="flex items-start gap-4 relative z-10">
                {/* Circular Icon Background */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-[#1A73E8] text-white shadow-lg shadow-[#1A73E8]/25 scale-105"
                      : "bg-[#EAF3FF] text-[#1A73E8] group-hover:bg-[#1A73E8] group-hover:text-white group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#1A73E8]/25"
                  }`}
                >
                  <service.icon
                    className={`h-6 w-6 transition-transform duration-300 ${
                      isActive ? "rotate-[-5deg]" : "group-hover:rotate-[-5deg]"
                    }`}
                  />
                </div>

                {/* Text Content */}
                <div className="flex-1">
                  <h4
                    className={`text-[15px] font-bold leading-snug transition-colors duration-300 ${
                      isActive
                        ? "text-[#1A73E8]"
                        : "text-[#0B1426] group-hover:text-[#1A73E8]"
                    }`}
                  >
                    {service.title}
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 leading-snug group-hover:text-gray-600 transition-colors duration-300">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              {/* Hover "View Details" Action */}
              <div
                className={`mt-3 flex items-center gap-1 text-sm font-medium text-[#1A73E8] transition-all duration-300 pl-16 ${
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0"
                }`}
              >
                <span className="relative">
                  View Details
                  <span
                    className={`absolute -bottom-0.5 left-0 h-px bg-[#1A73E8] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>

              {/* Number indicator */}
              <div
                className={`absolute top-5 right-5 text-[10px] font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#1A73E8]/60"
                    : "text-gray-300 group-hover:text-[#1A73E8]/60"
                }`}
              >
                {String(Number(index) + 1).padStart(2, "0")}
              </div>
            </Link>
          );
        })}
      </div>
      ```tsx
      {/* Footer - CTA with Button component */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="p-5 border-t border-gray-100"
      >
        <Button
          href="/services"
          variant="primary"
          size="lg"
          className="bg-[#07162E] !pl-2 pr-6"
        >
          More services
        </Button>
      </motion.div>
      ```
    </div>
  );
}
