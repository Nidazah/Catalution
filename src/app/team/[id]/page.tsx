import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Mail, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import PageHero from "@/components/PageHero";

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // The old navigation used /team/1, but team members are stored by slug.
  // Keep /team/1 working by resolving it to the first published member.
  let member = await prisma.teamMember.findFirst({
    where: { slug: id, active: true, published: true },
  });

  if (!member && /^\d+$/.test(id)) {
    member = await prisma.teamMember.findFirst({
      where: { active: true, published: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });

    if (member) {
      redirect(`/team/${member.slug}`);
    }
  }

  if (!member) {
    notFound();
  }

  const experience = (member.experience as string[] | null) ?? [];
  const coreBeliefs = (member.coreBeliefs as string[] | null) ?? [];
  const skills = (member.skills as { name: string; percent: number }[] | null) ?? [];

  const socialLinks = [
    { href: member.facebook, Icon: FaFacebookF, label: "Facebook" },
    { href: member.instagram, Icon: FaInstagram, label: "Instagram" },
    { href: member.twitter, Icon: FaTwitter, label: "Twitter" },
    { href: member.linkedin, Icon: FaLinkedinIn, label: "LinkedIn" },
  ].filter((s) => !!s.href);

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Team details" />

      <section className="container mx-auto px-6 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          <div className="space-y-5">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-navy mb-2">
                Hello, I am {member.name}
              </h1>
              <p className="text-base text-gray-600 font-medium">
                {member.role}
              </p>
              {member.bio && (
                <p className="mt-3 text-gray-600 leading-relaxed text-[15px] max-w-xl">
                  {member.bio}
                </p>
              )}
            </div>

            {(member.email || member.phone) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 border border-gray-200 rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {member.email && (
                  <div className="p-5 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Email address
                    </span>
                    <span className="text-sm font-medium text-navy">
                      {member.email}
                    </span>
                  </div>
                )}
                {member.phone && (
                  <div className="p-5 flex flex-col gap-1">
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Phone number
                    </span>
                    <span className="text-sm font-medium text-navy">
                      {member.phone}
                    </span>
                  </div>
                )}
              </div>
            )}

            {socialLinks.length > 0 && (
              <div className="flex gap-3">
                {socialLinks.map(({ href, Icon, label }) => (
                  <Link
                    key={label}
                    href={href!}
                    target="_blank"
                    className="h-9 w-9 rounded-full bg-[#AAB2C0] flex items-center justify-center text-white hover:bg-accent transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            )}

            {experience.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">
                  Work experience
                </h2>
                <div className="space-y-3 text-gray-600 leading-relaxed text-[15px]">
                  {experience.map((text, idx) => (
                    <p key={idx}>{text}</p>
                  ))}
                </div>
              </div>
            )}

            {coreBeliefs.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {coreBeliefs.map((belief, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 rounded-lg p-4 flex items-start gap-3"
                  >
                    <span className="text-accent shrink-0 mt-0.5">✓</span>
                    <span className="text-sm text-gray-600 leading-snug">
                      {belief}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {skills.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-navy mb-3">
                  Professional skills
                </h2>
                <div className="space-y-3">
                  {skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-navy">{skill.name}</span>
                        <span className="text-accent">{skill.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full"
                          style={{ width: `${skill.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-section py-10 md:py-12">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">
            <div className="space-y-5">
              <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-accent">
                <span className="h-px w-3 bg-accent" /> Contact Us
              </span>
              <h2 className="text-[44px] md:text-[52px] font-bold text-navy leading-[1.05] tracking-tight">
                Let's discuss further to get better results
              </h2>
              <p className="text-[#4B5563] text-[15px] leading-[1.7] max-w-md">
                Our mission is to empower businesses of all size to thrive in an ever changing marketplace.
              </p>
              <div className="flex items-center gap-2 text-[15px] font-medium text-navy pt-1">
                <Mail className="h-5 w-5 text-accent" />
                <span>livechat@solvior.com</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <input
                  type="text"
                  placeholder="Full name*"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-accent placeholder:text-gray-400 text-navy"
                />
                <input
                  type="email"
                  placeholder="Email address*"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-accent placeholder:text-gray-400 text-navy"
                />
                <input
                  type="tel"
                  placeholder="Phone number*"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-accent placeholder:text-gray-400 text-navy"
                />
                <select defaultValue="" className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-accent text-gray-400">
                  <option value="" disabled>Choose a option</option>
                  <option value="1">Option 1</option>
                  <option value="2">Option 2</option>
                </select>
                <textarea
                  placeholder="Type message*"
                  className="sm:col-span-2 w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[14px] outline-none focus:border-accent placeholder:text-gray-400 text-navy resize-none h-24"
                />
              </form>

              <button
                type="button"
                className="flex items-center gap-3 rounded-full bg-navy hover:bg-navy-ink text-white pl-2 pr-7 py-2.5 text-[15px] font-semibold transition-all w-fit mt-2"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Send message
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}