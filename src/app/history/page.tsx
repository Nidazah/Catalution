import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Globe2, Users } from "lucide-react";

const timelineData = [
  {
    year: "2008",
    align: "left",
    step: "01",
    title: "Founding and early years",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    images: [
      "/images/history/history-1.webp",
      "/images/history/history-2.webp",
    ],
  },
  {
    year: "2012",
    align: "right",
    step: "02",
    title: "Expansion and growth",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    images: [
      "/images/history/history-3.webp",
      "/images/history/history-4.webp",
    ],
  },
  {
    year: "2016",
    align: "left",
    step: "03",
    title: "Innovation and industry leadership",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    images: [
      "/images/history/history-5.webp",
      "/images/history/history-6.webp",
    ],
  },
  {
    year: "2020",
    align: "right",
    step: "04",
    title: "Global expansion and diversification",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    images: [
      "/images/history/history-7.webp",
      "/images/history/history-8.webp",
    ],
  },
  {
    year: "2024",
    align: "left",
    step: "05",
    title: "Looking ahead",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    images: [
      "/images/history/history-9.webp",
      "/images/history/history-1.webp",
    ],
  },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Our History" />

      {/* --- HERO & INTRO (BELOW PAGEHERO) --- */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-[#0B1426] uppercase">
              • Our Background
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-[#0B1426] leading-[1.1] mt-4 mb-8">
              Discover how we have evolved our company's <span className="text-[#1D4ED8]">on legacy.</span>
            </h1>
          </div>
          <div className="max-w-md space-y-4 text-gray-600 leading-relaxed text-[15px]">
            <p>
              Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights, innovative approaches.
            </p>
            <p>
              Committed to delivering exceptional value through strategic insights, innovative approaches empower.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full bg-[#0B1426] pl-2 pr-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#2563EB]">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- TIMELINE --- */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-24">
        {/* Vertical Center Line (Hidden on Mobile) */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 transform -translate-x-1/2 hidden lg:block" />

        {timelineData.map((item, index) => {
          const isLeft = item.align === "left";
          return (
            <div
              key={index}
              className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0 mb-24 lg:mb-20 last:mb-0 ${
                isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
              }`}
            >
              {/* Timeline Year (Desktop - Centered on line) */}
              <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#F9FAFB] px-4 z-10">
                <span className="text-4xl font-bold text-gray-500 tracking-tight bg-[#F9FAFB] px-1">
                  {item.year}
                </span>
              </div>

              {/* Mobile Year (Top right on mobile) */}
              <div className="lg:hidden block w-full mb-2 pl-8 text-right">
                 <span className="text-3xl font-bold text-gray-500 tracking-tight">
                  {item.year}
                </span>
              </div>

              {/* Content Container */}
              <div className={`w-full lg:w-[calc(50%-30px)] relative`}>
                {/* Mobile connector dot */}
                <div className="lg:hidden absolute left-0 top-3 w-3 h-3 rounded-full border-2 border-gray-400 bg-[#F9FAFB] -ml-[18px]" />

                {/* The Card */}
                <div className="bg-white border border-gray-300 p-6 lg:p-8">
                  <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-[#0B1426] mb-3">
                      {item.step}. {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {item.text}
                    </p>
                    {/* 2-Column Image Grid inside card */}
                    <div className="grid grid-cols-2 gap-4">
                      {item.images.map((src, i) => (
                        <div key={i} className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                          <Image
                            src={src}
                            alt={`${item.title} - image ${i + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Invisible spacer for the opposing grid column (Desktop Only) */}
              <div className="hidden lg:block w-[calc(50%-30px)]" />
            </div>
          );
        })}
      </div>
    </main>
  );
}