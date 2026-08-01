import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, Check, ArrowRight } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa6";

import PageHero from "@/components/PageHero";

// --- DATA FOR YOUR TEAM MEMBERS ---
const teamData = {
  "1": {
    name: "Savanah Nguyen",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    bio: "Our mission is to empower businesses also thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight and innovative approaches. Our consulting team brings years of experience to help you navigate complex business environments.",
    email: "support@solvior.com",
    phone: "+1 (009) 544-7826",
    experience: [
      "Our mission is to empower businesses also thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insight and innovative approaches.",
      "Our consulting team brings years of experience to help you navigate complex business environments and achieve sustainable growth.",
    ],
    coreBeliefs: [
      "We believe that the human element starts any successful project.",
      "We believe that the human element starts any successful project.",
      "We believe that the human element starts any successful project.",
      "We believe that the human element starts any successful project.",
    ],
    skills: [
      { name: "Business consultancy", percent: 95 },
      { name: "Client communication", percent: 90 },
      { name: "Business strategy", percent: 85 },
      { name: "Digital marketing", percent: 95 },
    ],
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
};

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = teamData[id as keyof typeof teamData];

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-20">
      
      {/* --- 1. THE HERO (Sits at the top) --- */}
      <PageHero title="Team details" />

      {/* --- 2. THE PROFILE CONTENT (Starts BELOW the hero) --- */}
      <section className="container mx-auto px-6 py-20 max-w-6xl">
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

          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0B1426] mb-2">
                Hello, I am {member.name}
              </h1>
              <p className="text-base text-gray-600 font-medium">
                {member.role}
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed text-[15px] max-w-xl">
                {member.bio}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 border border-gray-200 rounded-xl overflow-hidden divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
              <div className="p-6 flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Email address
                </span>
                <span className="text-sm font-medium text-[#0B1426]">
                  {member.email}
                </span>
              </div>
              <div className="p-6 flex flex-col gap-1">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Phone number
                </span>
                <span className="text-sm font-medium text-[#0B1426]">
                  {member.phone}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={member.socials.facebook}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#AAB2C0] flex items-center justify-center text-white hover:bg-[#3B82F6] transition-colors"
              >
                <FaFacebookF className="h-4 w-4" />
              </Link>
              <Link
                href={member.socials.instagram}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#AAB2C0] flex items-center justify-center text-white hover:bg-[#3B82F6] transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </Link>
              <Link
                href={member.socials.twitter}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#AAB2C0] flex items-center justify-center text-white hover:bg-[#3B82F6] transition-colors"
              >
                <FaTwitter className="h-4 w-4" />
              </Link>
              <Link
                href={member.socials.linkedin}
                target="_blank"
                className="h-10 w-10 rounded-full bg-[#AAB2C0] flex items-center justify-center text-white hover:bg-[#3B82F6] transition-colors"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </Link>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-4">
                Work experience
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                {member.experience.map((text, idx) => (
                  <p key={idx}>{text}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {member.coreBeliefs.map((belief, idx) => (
                <div
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 flex items-start gap-3"
                >
                  <Check className="h-5 w-5 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600 leading-snug">
                    {belief}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-4">
                Professional skills
              </h2>
              <p className="text-gray-600 text-[15px] mb-6 max-w-xl leading-relaxed">
                Our mission is to empower businesses also thrive in an
                ever-changing marketplace. We are committed to delivering
                exceptional value.
              </p>

              <div className="space-y-4">
                {member.skills.map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-sm font-medium">
                      <span className="text-[#0B1426]">{skill.name}</span>
                      <span className="text-[#3B82F6]">{skill.percent}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#3B82F6] rounded-full"
                        style={{ width: `${skill.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. BOTTOM CTA SECTION --- */}
      <section className="bg-[#ECF1F7] py-16 md:py-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[#3B82F6]">
                <span className="h-1 w-1 rounded-full bg-[#3B82F6]" /> Contact
                Us
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1] mt-4 mb-6">
                Let's discuss further to get better results
              </h2>
              <p className="text-gray-600 text-[15px] max-w-md leading-relaxed">
                Our mission is to empower businesses of all sizes to thrive in
                an ever-changing marketplace. Let's start a conversation today.
              </p>
              <div className="mt-6 flex items-center gap-3 text-sm font-medium text-[#0B1426]">
                <Mail className="h-5 w-5 text-[#3B82F6]" />
                <span>lwchat@solvior.com</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full name*"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#3B82F6] outline-none text-sm"
                />
                <input
                  type="email"
                  placeholder="Email address*"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#3B82F6] outline-none text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone number*"
                  className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#3B82F6] outline-none text-sm"
                />
                <select className="w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#3B82F6] outline-none text-sm text-gray-500">
                  <option>Choose a option</option>
                </select>
                <textarea
                  placeholder="Type message*"
                  className="sm:col-span-2 w-full px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 focus:border-[#3B82F6] outline-none text-sm resize-none h-24"
                />
                <button
                  type="button"
                  className="sm:col-span-2 flex items-center justify-center gap-3 rounded-full bg-[#0B1426] hover:bg-[#1a253f] text-white pl-2 pr-6 py-2 text-sm font-semibold transition-all w-fit mx-auto mt-2"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3B82F6]">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  Send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}