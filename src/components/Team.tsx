"use client";

import { ArrowRight, Globe, Camera, AtSign, Share2 } from "lucide-react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import Button from "./Button";

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
    <section id="team" className="bg-[#F7F8FA] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 md:grid-cols-[1fr_auto_auto] md:items-end">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-sm font-semibold tracking-wide text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              MEET OUR TEAMS
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-bold text-[var(--color-heading)] leading-[1.05]">
              Expert team members
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <p className="text-[var(--color-body)] max-w-sm md:pb-2">
              In today&apos;s dynamic business environment, the key to success
              strategics..
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Button
              href="#team"
              className="bg-[var(--color-navy)] text-white transition-transform hover:scale-[1.03] whitespace-nowrap shadow-md"
              size="md"
            >
              More members
            </Button>
          </ScrollReveal>
        </div>

        {/* 2 columns on mobile (sm), 4 columns on desktop (lg) */}
        <div className="mt-14 grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <ScrollReveal key={member.name} delay={i * 0.08}>
              <div className="group flex h-full flex-col items-center rounded-xl border border-[var(--color-line)] bg-white px-6 pt-8 pb-6 text-center transition-shadow duration-300 hover:shadow-md">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="128px"
                  />
                </div>

                <h3 className="mt-6 font-display text-lg font-semibold text-[var(--color-heading)]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-body)]">
                  {member.role}
                </p>

                <div className="mt-auto flex w-full items-center justify-center gap-3 border-t border-[var(--color-line)] pt-5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={`${member.name} on ${s.label}`}
                      data-cursor-hover
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-300 hover:bg-[var(--color-accent)] hover:text-white"
                    >
                      <s.icon className="h-3.5 w-3.5" />
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