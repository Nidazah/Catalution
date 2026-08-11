"use client";

import { ArrowRight, Globe, Camera, AtSign, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

const team = [
  {
    name: "Savanah Nguyen",
    role: "Manager",
    image: "/images/team/Savanah-Nguyen.webp",
  },
  {
    name: "Esther Howard",
    role: "Co. Founder",
    image: "/images/team/Esther-Howard.webp",
  },
  {
    name: "Kristin Watson",
    role: "Sr. Manager",
    image: "/images/team/Kristin-Watson.webp",
  },
  {
    name: "Guy Hawkins",
    role: "Sr. Marketer",
    image: "/images/team/Guy-Hawkins.webp",
  },
];

const socials = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: AtSign, href: "#", label: "Twitter" },
  { icon: Share2, href: "#", label: "Facebook" },
];

export default function Team() {
  return (
    <section id="team" className="bg-[#F7F8FA] py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Layout */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_auto_auto] md:items-end">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-xs sm:text-sm font-semibold tracking-wide text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              MEET OUR TEAMS
            </span>
            <h2 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-[var(--color-heading)] leading-[1.05]">
              Expert team members
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-[var(--color-body)] max-w-sm text-sm sm:text-base md:pb-2">
              In today&apos;s dynamic business environment, the key to success
              strategics..
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Link 
              href="#team" 
              className="btn btn-primary shadow-md whitespace-nowrap w-full sm:w-auto text-center justify-center"
            >
              More members
            </Link>
          </ScrollReveal>
        </div>

        {/* 
          GRID LAYOUT:
          Base = 2 columns (Mobile & Tablets)
          lg: = 4 columns (Desktops)
        */}
        <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08} className="h-full">
              <div className="group flex h-full min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] flex-col items-center rounded-xl border border-[var(--color-line)] bg-white px-4 py-6 sm:px-6 sm:pt-8 sm:pb-6 text-center transition-shadow duration-300 hover:shadow-md">
                
                {/* Responsive Avatar */}
                <div className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-32 lg:w-32 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                  />
                </div>

                {/* 
                  Responsive Text 
                  FIXED: Removed `whitespace-nowrap` so long names wrap to a second line naturally.
                */}
                <h3 className="mt-4 sm:mt-5 lg:mt-6 font-display text-base sm:text-lg font-semibold text-[var(--color-heading)] text-center">
                  {member.name}
                </h3>
                <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-[var(--color-body)]">
                  {member.role}
                </p>

                {/* Social Icons */}
                <div className="mt-auto flex w-full items-center justify-center gap-2 sm:gap-3 border-t border-[var(--color-line)] pt-4 sm:pt-5 transition-colors duration-300">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={`${member.name} on ${s.label}`}
                      data-cursor-hover
                      className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white"
                    >
                      <s.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}