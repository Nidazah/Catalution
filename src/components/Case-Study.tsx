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

export default function CaseStudy() {
  return (
    <section
      id="case-studies"
      className="overflow-hidden bg-[#DEE7F2] py-14 md:py-16" // ⬇️ Shrunk outer padding
    >
      <ScrollReveal className="mx-auto mb-8 max-w-2xl px-6 text-center">
        <span className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
          OUR CASE STUDIES
        </span>

        <h2 className="mt-3 font-display text-2xl md:text-3xl lg:text-4xl font-bold leading-[1.1] text-[var(--color-heading)]"> {/* ⬇️ Shrunk Header Title */}
          Explore our outstanding client projects
        </h2>
      </ScrollReveal>

      <div className="w-full overflow-hidden px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={700}
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
            0: { slidesPerView: 1, spaceBetween: 16 },
            640: { slidesPerView: 2, spaceBetween: 16 },
            768: { slidesPerView: 2, spaceBetween: 16 },
            1024: { slidesPerView: 3, spaceBetween: 16 },
            1280: { slidesPerView: 3, spaceBetween: 16 },
          }}
          className="!overflow-visible px-6 md:px-10"
        >
          {portfolios.map((project) => (
            <SwiperSlide key={project.id}>
              <ScrollReveal className="h-full">
                <Link
                  href={`/portfolios/${project.id}`}
                  data-cursor-hover
                  className="group relative block h-[280px] md:h-[380px] overflow-hidden rounded-xl" // ⬇️ Shrunk Card Height
                >
                  <Image
                    src={project.img}
                    alt={project.title}
                    fill
                    sizes="
                      (max-width: 639px) 85vw,
                      (max-width: 1023px) 45vw,
                      32vw
                    "
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="absolute bottom-0 right-0 flex max-w-[90%] items-end justify-between gap-3 rounded-tl-xl bg-white px-4 py-4 md:px-5 md:py-5"> {/* ⬇️ Shrunk inner padding */}
                    <div>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag: string) => (
                          <span
                            key={tag}
                            className="rounded-full border border-[var(--color-line)] px-2 py-0.5 text-[10px] md:text-xs font-medium text-[var(--color-navy)]" // ⬇️ Shrunk Tag text
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <h3 className="mt-2 font-display text-base md:text-lg font-semibold leading-tight text-[var(--color-heading)]"> {/* ⬇️ Shrunk Card Title */}
                        {project.title}
                      </h3>
                    </div>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-all duration-300 group-hover:rotate-45 group-hover:bg-[var(--color-accent)]">
                      <ArrowUpRight className="h-3 w-3" /> {/* ⬇️ Shrunk Arrow */}
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="case-study-pagination mt-6 flex items-center justify-center gap-2.5" /> {/* ⬇️ Shrunk bottom spacing */}
    </section>
  );
}