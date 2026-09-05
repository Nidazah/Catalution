"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import ScrollReveal from "./ScrollReveal";

import "swiper/css";
import "swiper/css/pagination";

export type CaseStudyItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
  tags?: string[];
};

interface CaseStudyProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  // Kept for compatibility with the existing Home page contract.
  // Homepage cards are intentionally sourced from /api/portfolio below.
  items?: CaseStudyItem[];
}

type ApiPortfolio = {
  id: string;
  title: string;
  slug: string;
  image: string | null;
  tags: unknown;
  category?: string | null;
  published?: boolean;
  active?: boolean;
};

type HomeCaseStudy = {
  id: string;
  title: string;
  img: string;
  tags: string[];
  link: string;
};

export default function CaseStudy({ eyebrow, title, description }: CaseStudyProps) {
  const [projects, setProjects] = useState<HomeCaseStudy[]>([]);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/portfolio", { cache: "no-store" })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(new Error("Failed to load case studies")),
      )
      .then((data) => {
        if (cancelled || !Array.isArray(data)) return;

        const mapped = data
          .filter(
            (p: ApiPortfolio) =>
              (p.published === undefined || p.published === true) &&
              (p.active === undefined || p.active === true),
          )
          .map((p: ApiPortfolio) => ({
            id: p.id,
            title: p.title,
            img: p.image || "/images/portfolio/portfolio-1.jpg",
            tags:
              Array.isArray(p.tags) &&
              p.tags.some(
                (tag): tag is string =>
                  typeof tag === "string" && tag.trim().length > 0,
              )
                ? p.tags.filter(
                    (tag): tag is string =>
                      typeof tag === "string" && tag.trim().length > 0,
                  )
                : p.category
                  ? [p.category]
                  : ["Case Study"],
            link: `/portfolios/${p.slug}`,
          }));

        setProjects(mapped);
      })
      .catch((error) => {
        console.error("Failed to load homepage case studies", error);
        if (!cancelled) setProjects([]);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="case-studies"
      className="overflow-hidden bg-[#DEE7F2] py-14 md:py-16"
    >
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

      {projects.length > 0 && (
        <>
          <div className="w-full overflow-hidden px-0">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={projects.length > 1}
              speed={800}
              slidesPerView={1}
              spaceBetween={16}
              centeredSlides={false}
              grabCursor={true}
              watchSlidesProgress={true}
              autoplay={
                projects.length > 1
                  ? {
                      delay: 3500,
                      disableOnInteraction: false,
                      pauseOnMouseEnter: true,
                    }
                  : false
              }
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
              className="!overflow-visible px-4 md:px-8"
            >
              {projects.map((project, index) => (
                <SwiperSlide key={project.id} className="h-auto">
                  <ScrollReveal className="h-full flex">
                    <Link
                      href={project.link}
                      data-cursor-hover
                      className="group relative flex w-full flex-col overflow-hidden rounded-xl h-[280px] sm:h-[300px] md:h-[320px]"
                    >
                      <Image
                        src={project.img}
                        alt={`${project.title} case study`}
                        fill
                        priority={index < 3}
                        sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 32vw"
                        className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10" />

                      <div className="absolute inset-x-0 bottom-0">
                        <div className="flex h-[96px] md:h-[104px] w-full items-center justify-between rounded-tl-xl bg-white px-4 md:px-5 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                          <div className="flex-1 pr-3">
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

                            <h3 className="font-display text-[15px] md:text-[17px] font-semibold leading-tight text-[var(--color-heading)] line-clamp-1">
                              {project.title}
                            </h3>
                          </div>

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

          <div className="case-study-pagination mt-6 flex items-center justify-center gap-2.5" />
        </>
      )}
    </section>
  );
}
