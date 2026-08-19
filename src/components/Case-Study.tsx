"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import ScrollReveal from "./ScrollReveal";
import { portfolios } from "../app/data/portfolios";

import "swiper/css";
import "swiper/css/pagination";

interface CaseStudyProps {
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function CaseStudy({ eyebrow, title, description }: CaseStudyProps) {
  return (
    <section
      id="case-studies"
      className="overflow-hidden bg-[#DEE7F2] py-14 md:py-16"
    >
      {/* Section Header */}
      <ScrollReveal className="mx-auto mb-8 max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-xs font-bold tracking-wider text-[var(--color-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          {eyebrow || "OUR CASE STUDIES"}
        </span>

        <h2 className="mt-3 font-display text-2xl font-bold leading-[1.1] text-[var(--color-heading)] md:text-3xl lg:text-4xl">
          {title || "Explore our outstanding client projects"}
        </h2>

        {description && (
          <p className="mt-3 font-inter text-base text-[var(--color-muted)] md:text-lg">
            {description}
          </p>
        )}
      </ScrollReveal>

      {/* Portfolio Slider */}
      <div className="w-full overflow-hidden px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={800}
          slidesPerView={1}
          spaceBetween={16}
          centeredSlides={false}
          grabCursor={true}
          watchSlidesProgress={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: ".case-study-pagination",
          }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            1024: { slidesPerView: 3, spaceBetween: 14 },
            1280: { slidesPerView: 3, spaceBetween: 14 },
          }}
          // ✅ FIX: Reduced horizontal padding to squeeze the slides closer to the edges
          className="!overflow-visible px-4 md:px-8"
        >
          {portfolios.map((project) => (
            <SwiperSlide key={project.id} className="h-auto">
              <ScrollReveal className="h-full flex">
                <Link
                  href={`/portfolios/${project.id}`}
                  data-cursor-hover
                  className="group relative flex w-full flex-col overflow-hidden rounded-xl h-[280px] sm:h-[300px] md:h-[320px]"
                >
                  {/* Active Online Portfolio Image */}
                  <Image
                    src={project.img}
                    alt={`${project.title} case study`}
                    fill
                    priority={project.id <= 3}
                    sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 32vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Dark Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                  {/* Project Information — fixed height so every card matches exactly */}
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="flex h-[96px] md:h-[104px] w-full items-center justify-between rounded-tl-xl bg-white px-4 md:px-5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                      {/* Left Text Area */}
                      <div className="flex-1 pr-3">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-1">
                          {project.tags.map((tag) => (
                            <span
                              key={`${project.id}-${tag}`}
                              className="rounded-full border border-[var(--color-line)] bg-white px-2 py-0.5 text-[10px] font-medium text-[var(--color-navy)] md:text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Title — clamped to 1 line so panel height never needs to grow */}
                        <h3 className="font-display text-[15px] md:text-[17px] font-semibold leading-tight text-[var(--color-heading)] line-clamp-1">
                          {project.title}
                        </h3>
                      </div>

                      {/* Arrow Button — vertically centered in the fixed-height panel */}
                      <span className="flex h-9 w-9 min-w-[36px] shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[var(--color-accent)]">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Pagination */}
      <div className="case-study-pagination mt-6 flex items-center justify-center gap-2.5" />
    </section>
  );
}