"use client";

import Link from "next/link";
import Image from "next/image";
import {
  X,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import type { Portfolio } from "../app/data/portfolios";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const socials = [
  { icon: FacebookIcon, href: "https://www.facebook.com/", label: "Facebook" },
  { icon: X, href: "https://x.com/", label: "Twitter" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/", label: "Linkedin" },
];

function VideoLink({ image, href }: { image: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-hover
      className="media-card media-card--video group rounded-2xl"
    >
      <div className="media-card media-card--video">
        <Image
          src={image}
          alt="Project video preview"
          fill
          sizes="(max-width: 1024px) 100vw, 66vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="media-card__overlay bg-black/30 transition-colors duration-300 group-hover:bg-black/40" />
        <span className="media-card__center flex h-16 w-16 items-center justify-center rounded-full bg-white text-[var(--color-navy)] transition-transform duration-300 group-hover:scale-110">
          <svg viewBox="0 0 24 24" className="ml-1 h-5 w-5" fill="currentColor">
            <polygon points="6,4 20,12 6,20" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export default function PortfolioDetail({
  project,
  prevId,
  nextId,
}: {
  project: Portfolio;
  prevId: number;
  nextId: number;
}) {
  return (
    <>
      {/* --- BREADCRUMB HEADER --- */}
      <section className="bg-[#F5F7FA] pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <ScrollReveal>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[var(--color-heading)]">
              {project.title}
            </h1>
            <nav className="mt-4 flex items-center justify-center gap-2 text-sm text-[var(--color-body)]">
              <Link href="/" className="hover:text-[var(--color-accent)]">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/portfolios" className="hover:text-[var(--color-accent)]">
                Portfolios
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[var(--color-heading)]">{project.title}</span>
            </nav>
          </ScrollReveal>
        </div>
      </section>

      {/* --- MAIN CONTENT --- */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal>
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 1024px"
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-line)] px-4 py-1.5 text-sm font-medium text-[var(--color-navy)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <h2 className="mt-6 font-display text-2xl md:text-3xl font-semibold leading-snug text-[var(--color-heading)]">
              {project.intro}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="mt-6 space-y-5">
              {project.description.map((p, i) => (
                <p key={i} className="leading-relaxed text-[var(--color-body)]">
                  {p}
                </p>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-14">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-heading)]">
                Projects overview
              </h3>
              <p className="mt-4 leading-relaxed text-[var(--color-body)]">
                {project.overview.text}
              </p>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {project.overview.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                        <path
                          d="M20 6L9 17l-5-5"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="text-sm leading-relaxed text-[var(--color-body)]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.25}>
            <div className="mt-10">
              <VideoLink image={project.media.image} href={project.media.videoUrl} />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="mt-14">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-[var(--color-heading)]">
                Final result
              </h3>
              <div className="mt-4 space-y-5">
                {project.finalResult.map((p, i) => (
                  <p key={i} className="leading-relaxed text-[var(--color-body)]">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* prev / next nav */}
          <div className="mt-14 flex items-center justify-between border-t border-[var(--color-line)] pt-8">
            <Link
              href={`/portfolios/${prevId}`}
              data-cursor-hover
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Link>
            <Link
              href="/portfolios"
              data-cursor-hover
              className="text-sm font-semibold text-[var(--color-body)] hover:text-[var(--color-accent)] transition-colors"
            >
              /portfolios
            </Link>
            <Link
              href={`/portfolios/${nextId}`}
              data-cursor-hover
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-heading)] hover:text-[var(--color-accent)] transition-colors"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* portfolio information */}
          <ScrollReveal delay={0.1}>
            <div className="mt-14 rounded-2xl bg-[#F5F7FA] p-8 md:p-10">
              <h3 className="font-display text-xl font-semibold text-[var(--color-heading)]">
                Portfolio Information
              </h3>
              <dl className="mt-6 grid gap-5 sm:grid-cols-2">
                <div className="flex justify-between border-b border-[var(--color-line)] pb-3 sm:block sm:border-0 sm:pb-0">
                  <dt className="text-sm text-[var(--color-body)]">Clients</dt>
                  <dd className="text-sm font-semibold text-[var(--color-heading)] sm:mt-1">
                    {project.info.client}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-[var(--color-line)] pb-3 sm:block sm:border-0 sm:pb-0">
                  <dt className="text-sm text-[var(--color-body)]">Portfolio</dt>
                  <dd className="text-sm font-semibold text-[var(--color-heading)] sm:mt-1">
                    {project.info.portfolio}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-[var(--color-line)] pb-3 sm:block sm:border-0 sm:pb-0">
                  <dt className="text-sm text-[var(--color-body)]">Service</dt>
                  <dd className="text-sm font-semibold text-[var(--color-heading)] sm:mt-1">
                    {project.info.service}
                  </dd>
                </div>
                <div className="flex justify-between border-b border-[var(--color-line)] pb-3 sm:block sm:border-0 sm:pb-0">
                  <dt className="text-sm text-[var(--color-body)]">Category</dt>
                  <dd className="text-sm font-semibold text-[var(--color-heading)] sm:mt-1">
                    {project.info.category}
                  </dd>
                </div>
                <div className="flex justify-between sm:block">
                  <dt className="text-sm text-[var(--color-body)]">Date</dt>
                  <dd className="text-sm font-semibold text-[var(--color-heading)] sm:mt-1">
                    {project.info.date}
                  </dd>
                </div>
                <div className="flex items-center justify-between sm:block">
                  <dt className="text-sm text-[var(--color-body)]">Share</dt>
                  <dd className="mt-0 flex gap-2 sm:mt-2">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        data-cursor-hover
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-[var(--color-navy)] transition-colors hover:bg-[var(--color-accent)] hover:text-white"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}