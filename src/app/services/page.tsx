"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// --- DATA ---
const allServices = [
  {
    id: 1,
    icon: "waves",
    title: "Business process optimization",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/1",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    icon: "boxes",
    title: "Strategic planning & execution",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/2",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    icon: "users",
    title: "Leadership executive coaching",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/3",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    icon: "sparkles",
    title: "Legacy leadership institute",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/4",
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 5,
    icon: "circledot",
    title: "Executive growth solutions",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/5",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 6,
    icon: "repeat",
    title: "Empowered leadership journey",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/6",
    image:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 7,
    icon: "boxes",
    title: "Strategic planning & execution",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/7",
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 8,
    icon: "users",
    title: "Leadership executive coaching",
    desc: "In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.",
    href: "/services/8",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1200&auto=format&fit=crop",
  },
];

// --- ICON HELPER ---
const ServiceIcon = ({ type, isHovered }: { type: string; isHovered?: boolean }) => {
  return (
    <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shrink-0 transition-colors duration-300 ${isHovered ? "bg-white/20" : "bg-[#EAF1FD]"}`}>
      <div className={`relative w-10 h-10 transition-colors duration-300 ${isHovered ? "text-white" : "text-[#2563EB]"}`}>
        {type === "waves" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        )}
        {type === "boxes" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h8v2H8V8zm0 4h8v2H8v-2zm0 4h4v2H8v-2z" />
          </svg>
        )}
        {type === "users" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="8" r="4" />
            <path d="M5.3 18.3C6.8 16.9 9.2 16 12 16s5.2.9 6.7 2.3C19.4 18.8 20 17.5 20 16c0-4.4-3.6-8-8-8S4 11.6 4 16c0 1.5.6 2.8 1.3 2.3z" />
          </svg>
        )}
        {type === "sparkles" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6z" />
          </svg>
        )}
        {type === "circledot" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="4" fill="white" />
          </svg>
        )}
        {type === "repeat" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4V1L8 5l4 4V6c3.3 0 6 2.7 6 6s-2.7 6-6 6v2c4.4 0 8-3.6 8-8s-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6v3l4-4-4-4V1v3z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default function ServicesPage() {
  const itemsPerPage = 6; // 3 columns x 2 rows
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allServices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServices = allServices.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20 pb-24">
      <PageHero title="Services" />

      <div className="w-full max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentServices.map((s, idx) => {
            const globalIndex = allServices.findIndex(item => item.id === s.id) + 1;
            return (
              <Link
                key={s.id}
                href={s.href}
                className="group relative block bg-white border border-gray-300 aspect-[4/5] overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                {/* BACKGROUND IMAGE (Hidden by default, shows on hover) */}
                <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out z-0">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover"
                  />
                  {/* Dark Gradient Overlay so text stays readable */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/90 via-[#0B1426]/70 to-transparent" />
                </div>

                {/* CONTENT WRAPPER (Always visible) */}
                <div className="relative z-10 flex flex-col h-full p-8 transition-colors duration-300 group-hover:text-white">
                  
                  <div className="mb-4 text-[14px] font-bold text-[#9CA3AF] group-hover:text-white/70">
                    {globalIndex.toString().padStart(2, "0")}
                  </div>

                  {/* The Icon Box and Icon Change Colors on Hover */}
                  <ServiceIcon type={s.icon} isHovered={true} />

                  <h3 className="text-2xl font-bold text-[#0B1426] group-hover:text-white mb-3 transition-colors">
                    {s.title}
                  </h3>
                  
                  {/* flex-1 ensures this pushes the bottom link to the very end, keeping cards equal height */}
                  <p className="flex-1 text-[15px] text-[#4B5563] group-hover:text-gray-200 leading-relaxed transition-colors">
                    {s.desc}
                  </p>
                  
                  <div className="mt-6 flex items-center gap-2 text-[14px] font-bold text-[#0B1426] group-hover:text-white transition-colors">
                    Get optimization <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-gray-500"
              }`}
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                  currentPage === number
                    ? "bg-[#1D4ED8] text-white"
                    : "border border-gray-300 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {number.toString().padStart(2, "0")}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-gray-500"
              }`}
              aria-label="Next page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}