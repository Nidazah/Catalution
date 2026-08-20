"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

export type WorkItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
};

type WorkProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  secondaryButtonLabel?: string;
  secondaryButtonUrl?: string;
  items?: WorkItem[];
};

const fallbackWork: WorkItem[] = [
  {
    title: "ERP Implementation",
    description: "End-to-end ERP deployment for a manufacturing client, cutting operational costs by 30%.",
    image: "/images/portfolio/portfolio-1.jpg",
    meta: "ERP",
    link: "/portfolios",
  },
  {
    title: "POS System Rollout",
    description: "Retail POS integration across 40+ locations with real-time inventory sync.",
    image: "/images/portfolio/portfolio-2.jpg",
    meta: "POS",
    link: "/portfolios",
  },
  {
    title: "Financial Transformation",
    description: "Automated bookkeeping and reporting for a growing fintech startup.",
    image: "/images/portfolio/portfolio-3.jpg",
    meta: "Finance",
    link: "/portfolios",
  },
];

export default function Work({
  eyebrow = "OUR WORK",
  title = "Projects that deliver measurable results",
  description = "Explore how we've helped businesses transform their operations with tailored solutions.",
  image,
  primaryButtonLabel = "View all projects",
  primaryButtonUrl = "/portfolios",
  secondaryButtonLabel,
  secondaryButtonUrl,
  items,
}: WorkProps) {
  const projects =
    items && items.length > 0
      ? items
      : fallbackWork;

  return (
    <section id="work" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_auto] md:items-end">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)] sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {eyebrow}
            </span>

            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-[var(--color-heading)] sm:mt-4 sm:text-4xl md:text-5xl">
              {title}
            </h2>

            {description && (
              <p className="mt-3 max-w-xl text-sm text-[var(--color-body)] sm:text-base">
                {description}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3">
              {primaryButtonLabel && primaryButtonUrl && (
                <Link
                  href={primaryButtonUrl}
                  className="btn btn-primary w-full justify-center whitespace-nowrap text-center shadow-md sm:w-auto"
                >
                  {primaryButtonLabel}
                </Link>
              )}
              {secondaryButtonLabel && secondaryButtonUrl && (
                <Link
                  href={secondaryButtonUrl}
                  className="btn btn-outline w-full justify-center whitespace-nowrap text-center sm:w-auto"
                >
                  {secondaryButtonLabel}
                </Link>
              )}
            </div>
          </ScrollReveal>
        </div>

        {/* Work Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal
              key={`${project.title}-${i}`}
              delay={i * 0.08}
              className="h-full"
            >
              <Link
                href={project.link || "/portfolios"}
                data-cursor-hover
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-[var(--color-line)] bg-white transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Project Image */}
                <div className="relative h-[220px] w-full overflow-hidden bg-[#F5F1FB]">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title || "Project"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-[#C4B2E8]">
                      <ArrowUpRight className="h-10 w-10" />
                    </div>
                  )}

                  {/* Meta Badge */}
                  {project.meta && (
                    <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-[var(--color-navy)] backdrop-blur-sm">
                      {project.meta}
                    </span>
                  )}
                </div>

                {/* Project Info */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-semibold text-[var(--color-heading)]">
                    {project.title || "Project"}
                  </h3>

                  {project.description && (
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-body)]">
                      {project.description}
                    </p>
                  )}

                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-accent)]">
                    View project
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}