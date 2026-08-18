"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import ScrollReveal from "./ScrollReveal";
import "swiper/css";
import "swiper/css/pagination";

type Portfolio = {
  id: string;
  title: string;
  slug: string;
  tags?: unknown;
  image: string;
};

type CaseStudyProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

function getTags(tags: unknown): string[] {
  return Array.isArray(tags) ? tags.filter((tag): tag is string => typeof tag === "string") : [];
}

export default function CaseStudy({ eyebrow, title, description }: CaseStudyProps) {
  const [projects, setProjects] = useState<Portfolio[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/portfolio", { cache: "no-store", signal: controller.signal })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to load portfolios")))
      .then((data) => Array.isArray(data) && setProjects(data.slice(0, 8)))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  if (!projects.length) return null;

  return (
    <section id="case-studies" className="overflow-hidden bg-[#DEE7F2] py-14 md:py-16">
      <ScrollReveal className="mx-auto mb-8 max-w-3xl px-6 text-center">
        {eyebrow && (
          <span className="inline-flex items-center gap-2 rounded bg-white px-3 py-1.5 ui-sm font-bold tracking-wider text-[var(--color-accent)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            {eyebrow}
          </span>
        )}
        {title && <h2 className="mt-3 font-display text-2xl font-bold leading-tight text-[var(--color-heading)] md:text-3xl lg:text-4xl">{title}</h2>}
        {description && <p className="body-lg mx-auto mt-3 max-w-2xl text-[var(--color-body)]">{description}</p>}
      </ScrollReveal>

      <div className="w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={projects.length > 1}
          speed={800}
          slidesPerView={1}
          spaceBetween={16}
          grabCursor
          autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
          pagination={{ clickable: true, el: ".case-study-pagination" }}
          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 14 },
            640: { slidesPerView: 2, spaceBetween: 14 },
            1024: { slidesPerView: 3, spaceBetween: 14 },
          }}
          className="!overflow-visible px-4 md:px-8"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id} className="h-auto">
              <ScrollReveal className="h-full flex">
                <Link href={`/portfolios/${project.slug || project.id}`} className="group relative flex w-full flex-col overflow-hidden rounded-xl h-[280px] sm:h-[300px] md:h-[320px]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={index < 3}
                    sizes="(max-width: 639px) 85vw, (max-width: 1023px) 45vw, 32vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0">
                    <div className="flex min-h-[100px] w-full items-center justify-between rounded-tl-xl bg-white px-4 md:px-5 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
                      <div className="flex-1 min-w-0 pr-3">
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {getTags(project.tags).map((tag) => (
                            <span key={`${project.id}-${tag}`} className="rounded-full border border-[var(--color-line)] bg-white px-2 py-0.5 ui-sm font-medium text-[var(--color-navy)]">{tag}</span>
                          ))}
                        </div>
                        <h3 className="font-display text-base md:text-lg font-semibold leading-tight text-[var(--color-heading)]">{project.title}</h3>
                      </div>
                      <span className="flex h-10 w-10 min-w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-all group-hover:rotate-45 group-hover:bg-[var(--color-accent)]">
                        <ArrowUpRight className="h-4 w-4" />
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
    </section>
  );
}
