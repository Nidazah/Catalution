"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const posts = [
  {
    slug: "innovative-solutions-for-business-success-dynamic",
    category: "Branding",
    date: "Jul 28, 2025",
    comments: 3,
    title: "Innovative solutions for business success dynamic",
    img: "/images/blog/innovative-solutions.webp",
  },
  {
    slug: "what-consultants-should-know-about-nonprofits",
    category: "Business",
    date: "Nov 06, 2025",
    comments: 3,
    title: "What consultants should know about working with nonprofits",
    img: "/images/blog/consultants-nonprofits.webp",
  },
  {
    slug: "why-every-entrepreneur-needs-digital-marketing",
    category: "Consuting",
    date: "Aug 24, 2025",
    comments: 3,
    title: "Why every entrepreneur needs solid digital marketing",
    img: "/images/blog/digital-marketing.webp",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="bg-white py-16 md:py-20"> {/* ⬇️ Shrunk padding */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr_auto] md:items-end mb-10 md:mb-14"> {/* ⬇️ Tightened gap & mb */}
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              LATEST NEWS
            </span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--color-heading)] leading-[1.05]"> {/* ⬇️ Shrunk title */}
              Tip and tricks for success
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-sm md:text-base text-[var(--color-body)] max-w-sm md:pb-1"> {/* ⬇️ Shrunk text size */}
              In today&apos;s dynamic business environment, the key to success
              strategics..
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <a
              href="#blog"
              data-cursor-hover
              className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-7 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] whitespace-nowrap"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)]">
                <ArrowRight className="h-4 w-4" />
              </span>
              More blog
            </a>
          </ScrollReveal>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3"> {/* ⬇️ Reduced top margin */}
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-hover
                className="group block border border-[var(--color-line)] rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                {/* ⬇️ Shrunk image height */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                  <Image
                    src={post.img}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-white/25 backdrop-blur-sm px-3 py-1 text-[10px] md:text-xs font-medium text-white">
                    {post.category}
                  </span>
                </div>

                {/* ⬇️ Shrunk inner padding */}
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-3 text-[10px] md:text-xs text-[var(--color-body)]">
                    <span className="h-px w-6 bg-[var(--color-line)]" />
                    {post.date}
                    <span>•</span>
                    {post.comments.toString().padStart(2, "0")} Comments
                  </div>

                  {/* ⬇️ Shrunk card title */}
                  <h3 className="mt-3 font-display text-base md:text-lg font-semibold leading-snug text-[var(--color-heading)] group-hover:text-[var(--color-accent)] transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* ⬇️ Shrunk button size */}
                  <span className="mt-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-navy)] text-white transition-colors duration-300 group-hover:bg-[var(--color-accent)]">
                    <ArrowRight className="h-3.5 w-3.5" />
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