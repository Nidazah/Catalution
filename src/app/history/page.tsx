"use client";

import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePageHero } from "@/lib/use-page-hero";

const fallbackIntro = {
  eyebrow: "Our Background",
  title: "Discover how we have evolved our company's on legacy.",
  paragraph1:
    "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights, innovative approaches.",
  paragraph2:
    "Committed to delivering exceptional value through strategic insights, innovative approaches empower.",
  buttonLabel: "Learn More",
  buttonUrl: "/contact",
};

const fallbackTimeline = [
  {
    year: "2008",
    align: "left",
    title: "Founding and early years",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    image: "/images/history/history-1.webp",
    image2: "/images/history/history-2.webp",
  },
  {
    year: "2012",
    align: "right",
    title: "Expansion and growth",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    image: "/images/history/history-3.webp",
    image2: "/images/history/history-4.webp",
  },
  {
    year: "2016",
    align: "left",
    title: "Innovation and industry leadership",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    image: "/images/history/history-5.webp",
    image2: "/images/history/history-6.webp",
  },
  {
    year: "2020",
    align: "right",
    title: "Global expansion and diversification",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    image: "/images/history/history-7.webp",
    image2: "/images/history/history-8.webp",
  },
  {
    year: "2024",
    align: "left",
    title: "Looking ahead",
    text: "Our mission is to empower businesses of all sizes to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    image: "/images/history/history-9.webp",
    image2: "/images/history/history-1.webp",
  },
];

type ContentSectionRow = {
  sectionKey: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image: string | null;
  primaryButtonLabel: string | null;
  primaryButtonUrl: string | null;
  items: Array<{
    title?: string;
    description?: string;
    image?: string;
    meta?: string;
    link?: string;
    settings?: Record<string, unknown>;
  }> | null;
  settings: Record<string, unknown> | null;
};

export default function HistoryPage() {
  const hero = usePageHero("PAGE_HERO_HISTORY", { title: "Our History" });
  const [sections, setSections] = useState<Record<string, ContentSectionRow>>({});

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Currently showing all

  useEffect(() => {
    let cancelled = false;

    fetch("/api/content", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load content"))))
      .then((data: ContentSectionRow[]) => {
        if (cancelled || !Array.isArray(data)) return;
        const map: Record<string, ContentSectionRow> = {};
        for (const row of data) map[row.sectionKey] = row;
        setSections(map);
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  const introRow = sections.HISTORY_INTRO;
  const intro = {
    eyebrow: introRow?.eyebrow || fallbackIntro.eyebrow,
    title: introRow?.title || fallbackIntro.title,
    paragraph1: introRow?.description || fallbackIntro.paragraph1,
    paragraph2:
      (introRow?.settings?.paragraph2 as string) || fallbackIntro.paragraph2,
    buttonLabel: introRow?.primaryButtonLabel || fallbackIntro.buttonLabel,
    buttonUrl: introRow?.primaryButtonUrl || fallbackIntro.buttonUrl,
  };

  const historyRow = sections.HISTORY;
  const timelineData =
    historyRow?.items && historyRow.items.length > 0
      ? historyRow.items.map((item) => ({
          year: item.meta || "",
          align: (item.settings?.align as string) || "left",
          title: item.title || "",
          text: item.description || "",
          image: item.image || "",
          image2: (item.settings?.image2 as string) || "",
        }))
      : fallbackTimeline;

  const totalPages = Math.ceil(timelineData.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHero title={hero.title} subtitle={hero.subtitle} imageSrc={hero.image} />

      {/* --- HERO & INTRO (BELOW PAGEHERO) --- */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-8 pb-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest text-navy uppercase">
              • {intro.eyebrow}
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-navy leading-[1.1] mt-4 mb-6">
              {intro.title}
            </h1>
          </div>
          <div className="max-w-md space-y-4 text-gray-600 leading-relaxed text-[15px]">
            <p>{intro.paragraph1}</p>
            <p>{intro.paragraph2}</p>

            <div className="pt-2">
              <Link href={intro.buttonUrl} className="btn btn-primary shadow-md">
                {intro.buttonLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- TIMELINE --- */}
      <div className="relative w-full max-w-6xl mx-auto px-6 pb-16">
        {/* Vertical Center Line (Hidden on Mobile) */}
        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-[1px] bg-gray-300 transform -translate-x-1/2 hidden lg:block" />

        {timelineData.map((item, index) => {
          const isLeft = item.align === "left";
          const images = [item.image, item.image2].filter(Boolean);
          return (
            <div
              key={index}
              className={`relative flex flex-col lg:flex-row items-start lg:items-center gap-8 lg:gap-0 mb-12 lg:mb-12 last:mb-0 ${
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
                    <h3 className="text-lg font-semibold text-navy mb-3">
                      {String(index + 1).padStart(2, "0")}. {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {item.text}
                    </p>
                    {/* 2-Column Image Grid inside card */}
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((src, i) => (
                        <div
                          key={i}
                          className="relative aspect-[4/3] bg-gray-100 overflow-hidden"
                        >
                          <Image
                            src={src as string}
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

        {/* --- PAGINATION WITH ARROWS ON BOTH SIDES --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Arrow (←) */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
              }`}
              aria-label="Previous page"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    currentPage === number
                      ? "bg-accent text-white border-2 border-black shadow-md scale-105"
                      : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent hover:bg-accent/5"
                  }`}
                  aria-label={`Go to page ${number}`}
                >
                  {number.toString().padStart(2, "0")}
                </button>
              ),
            )}

            {/* Next Arrow (→) */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
              }`}
              aria-label="Next page"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
