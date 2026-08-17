"use client";

import {
  ArrowRight,
  Globe,
  Camera,
  AtSign,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "./ScrollReveal";

export type TeamItem = {
  title?: string;
  description?: string;
  image?: string;
  meta?: string;
  link?: string;
};

const fallbackTeam: TeamItem[] = [
  {
    title: "Savanah Nguyen",
    meta: "Manager",
    image: "/images/team/Savanah-Nguyen.webp",
  },
  {
    title: "Esther Howard",
    meta: "Co. Founder",
    image: "/images/team/Esther-Howard.webp",
  },
  {
    title: "Kristin Watson",
    meta: "Sr. Manager",
    image: "/images/team/Kristin-Watson.webp",
  },
  {
    title: "Guy Hawkins",
    meta: "Sr. Marketer",
    image: "/images/team/Guy-Hawkins.webp",
  },
];

const socials = [
  { icon: Globe, href: "#", label: "LinkedIn" },
  { icon: Camera, href: "#", label: "Instagram" },
  { icon: AtSign, href: "#", label: "Twitter" },
  { icon: Share2, href: "#", label: "Facebook" },
];

type TeamProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  image?: string;
  primaryButtonLabel?: string;
  primaryButtonUrl?: string;
  items?: TeamItem[];
};

export default function Team({
  eyebrow = "MEET OUR TEAMS",
  title = "Expert team members",
  description = "In today's dynamic business environment, the key to success strategics..",
  primaryButtonLabel = "More members",
  primaryButtonUrl = "#team",
  items,
}: TeamProps) {
  const members =
    items && items.length > 0
      ? items
      : fallbackTeam;

  return (
    <section id="team" className="bg-[#F7F8FA] py-16 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header Layout */}
        <div className="grid gap-6 md:gap-8 lg:grid-cols-[1fr_auto_auto] md:items-end">
          <ScrollReveal>
            <span className="inline-flex items-center gap-2 rounded bg-[#EAF1FD] px-3 py-1.5 text-xs font-semibold tracking-wide text-[var(--color-accent)] sm:text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {eyebrow}
            </span>

            <h2 className="mt-3 font-display text-3xl font-bold leading-[1.05] text-[var(--color-heading)] sm:mt-4 sm:text-4xl md:text-5xl">
              {title}
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            {description && (
              <p className="max-w-sm text-sm text-[var(--color-body)] sm:text-base md:pb-2">
                {description}
              </p>
            )}
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            {primaryButtonLabel && primaryButtonUrl && (
              <Link
                href={primaryButtonUrl}
                className="btn btn-primary w-full justify-center whitespace-nowrap text-center shadow-md sm:w-auto"
              >
                {primaryButtonLabel}
              </Link>
            )}
          </ScrollReveal>
        </div>

        {/* Team Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-6 md:mt-14 lg:grid-cols-4">
          {members.map((member, i) => (
            <ScrollReveal
              key={`${member.title}-${i}`}
              delay={i * 0.08}
              className="h-full"
            >
              <div className="group flex h-full min-h-[260px] flex-col items-center rounded-xl border border-[var(--color-line)] bg-white px-4 py-6 text-center transition-shadow duration-300 hover:shadow-md sm:min-h-[300px] sm:px-6 sm:pb-6 sm:pt-8 lg:min-h-[340px]">
                {/* Avatar */}
                {member.image ? (
                  <div className="relative h-20 w-20 overflow-hidden rounded-full sm:h-24 sm:w-24 lg:h-32 lg:w-32">
                    <Image
                      src={member.image}
                      alt={member.title || "Team member"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 128px"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-100 sm:h-24 sm:w-24 lg:h-32 lg:w-32" />
                )}

                {/* Member Name */}
                <h3 className="mt-4 text-center font-display text-base font-semibold text-[var(--color-heading)] sm:mt-5 sm:text-lg lg:mt-6">
                  {member.title || "Team Member"}
                </h3>

                {/* Role */}
                {member.meta && (
                  <p className="mt-0.5 text-xs text-[var(--color-body)] sm:mt-1 sm:text-sm">
                    {member.meta}
                  </p>
                )}

                {/* Optional Description */}
                {member.description && (
                  <p className="mt-2 text-xs leading-relaxed text-[var(--color-body)]">
                    {member.description}
                  </p>
                )}

                {/* Social Icons */}
                <div className="mt-auto flex w-full items-center justify-center gap-2 border-t border-[var(--color-line)] pt-4 transition-colors duration-300 sm:gap-3 sm:pt-5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={`${member.title || "Team member"} on ${s.label}`}
                      data-cursor-hover
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition-colors duration-300 group-hover:bg-[var(--color-accent)] group-hover:text-white sm:h-8 sm:w-8"
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
