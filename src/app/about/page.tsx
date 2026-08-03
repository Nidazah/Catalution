"use client";

import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

// --- Team Data ---
const teamMembers = [
  {
    name: "Darlene Robert",
    role: "Sr. Designer",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Savanah Nguyen",
    role: "Manager",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Esther Howard",
    role: "Co. Founder",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Kristin Watson",
    role: "Sr. Manager",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
  },
];

// --- Logos Data ---
const logos = [
  { name: "flomodia", img: "/images/about/brand-thumb-6.png" },
  { name: "Influence 4You", img: "/images/about/brand-thumb-1.png" },
  { name: "monceau", img: "/images/about/brand-thumb-2.png" },
  { name: "tse", img: "/images/about/brand-thumb-3.png" },
  { name: "coudac", img: "/images/about/brand-thumb-4.png" },
  { name: "WEGLOT", img: "/images/about/brand-thumb-5.png" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="About Us" />

      {/* --- 1. TOP HEADER SECTION --- */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-blue-600 after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-blue-600">
              ABOUT OUR COMPANY
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-[#0B1426] leading-[1.1]">
              Crafting success tailored solution for each & every challenges
            </h1>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#0B1426] pl-2 pr-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                <ArrowRight className="h-4 w-4" />
              </span>
              Learn more
            </Link>
          </div>

          {/* Right Column */}
          <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] pt-2 lg:pt-6">
            <p>
              Our mission is to empower businesses of all size to thrive in an
              businesses ever changing marketplace. We are committed to the
              delivering exceptional in the value through our strategic inset,
              innovative approaches.
            </p>
            <p>
              Committed to the delivering exceptional in the value through our
              strategic inset, innovative approaches empower.
            </p>
          </div>
        </div>
      </section>

      {/* --- 2. FEATURES CARDS SECTION --- */}
      <section className="container mx-auto px-6 pb-20 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-[#0B1426]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="7" y="7" width="4" height="4" />
                <rect x="13" y="7" width="4" height="4" />
                <rect x="7" y="13" width="4" height="4" />
                <rect x="13" y="13" width="4" height="4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0B1426] mb-2">
              Quick solutions
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to
              your business challenges
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-[#0B1426]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0B1426] mb-2">
              Expert advice
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to
              your business challenges
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-[#0B1426]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0B1426] mb-2">
              Strategic planning
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to
              your business challenges
            </p>
          </div>

          {/* Card 4 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-[#0B1426]">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polygon points="12 12 2 17 12 22 22 17 12 12" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-[#0B1426] mb-2">
              Efficient operations
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to
              your business challenges
            </p>
          </div>
        </div>
      </section>

      {/* --- 3. EVOLUTION & STATS SECTION --- */}
      <section className="bg-[#E8F0FC] py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Text & Stats */}
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold text-white">
                <span className="text-lg">✦</span> Our evolution
              </span>

              <p className="text-gray-600 leading-relaxed text-[15px] italic">
                &ldquo;Founded in 2002 by Burdee Ncolase en our firm started
                with our great vision to bring innovative solutions of
                businesses facing unprecedented challenges. That began as a
                small consultings firm quickly evolved into a trusted partner
                for companies around the globe. Our journey into began with a
                simple idea that offer unparalleled consulting services empower.
                Our core values of integrity, innovation, and excellence guide
                everything we do leading the wave in consulting.&rdquo;
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#0B1426]">
                    93%
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Complete projects
                  </p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#0B1426]">
                    20M
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Reach worldwide</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#0B1426]">
                    8.5x
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Faster growth</p>
                </div>
              </div>
            </div>

            {/* Right Column: Video/Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-video w-full bg-[#0B1426]">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070&auto=format&fit=crop"
                  alt="Team working together"
                  fill
                  className="object-cover object-center opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <a
                  href="https://www.youtube.com/watch?v=GGf1JjSAKP4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex flex-col items-center justify-center transition-transform hover:scale-105"
                >
                  <div className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20">
                    <Play className="h-8 w-8 text-white fill-white ml-1" />
                  </div>
                  <p className="mt-5 text-white text-sm font-medium tracking-wide">
                    Click for watch
                  </p>
                  <p className="text-white text-xl font-bold mt-1">
                    See our latest video
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. EXPERT TEAM MEMBERS SECTION --- */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 max-w-7xl text-center">
          {/* Header */}
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-blue-600 after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-blue-600">
              MEET OUR TEAM
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]">
              Expert team members
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl bg-[#0B1426] shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="relative aspect-[3/4] w-full">
                  {/* Portrait Image */}
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top"
                  />

                  {/* Dark Gradient Overlay for Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426]/95 via-[#0B1426]/40 to-transparent" />
                </div>

                {/* Text Overlay (Bottom Left) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-left z-10">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-300 mt-1 font-medium">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. SKILL & EXPERIENCE SECTION --- */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/about/Screenshot 2026-07-31 164926-Photoroom.webp"
            alt="Skill background"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 flex justify-end">
          {/* Glassmorphism Card on the Right */}
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-10 md:p-12 max-w-lg text-white shadow-2xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Skill and experience
            </h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
              In today's dynamic business environment, the key to success lies
              in strategic planning and operational excellence.
            </p>

            <div className="space-y-6">
              {/* Bar 1 */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Business consultants</span>
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded">
                    90%
                  </span>
                </div>
                <div className="relative h-2 w-full bg-white/20 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                    style={{ width: "90%" }}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-[10%] h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Bar 2 */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Client communication</span>
                  <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded">
                    82%
                  </span>
                </div>
                <div className="relative h-2 w-full bg-white/20 rounded-full">
                  <div
                    className="absolute top-0 left-0 h-full bg-blue-600 rounded-full"
                    style={{ width: "82%" }}
                  />
                  <div className="absolute top-1/2 -translate-y-1/2 right-[18%] h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. TESTIMONIALS SECTION --- */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-blue-600 before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-blue-600 after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-blue-600">
            CLIENTS FEEDBACK
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]">
            Our clients testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left: Adjusted Portrait Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-gray-100">
            <Image
              src="/images/about/h2-test-1.webp"
              alt="Client testimonial"
              fill
              className="object-cover object-center"
            />
            {/* Adjusted Dark Badge Overlay */}
            <div className="absolute bottom-6 left-6 bg-[#2D3748]/90 backdrop-blur-sm rounded-xl p-5 text-white min-w-[160px] shadow-lg border border-white/10">
              <div className="text-3xl font-bold tracking-tight">3.8 K+</div>
              <p className="text-xs text-white/80 mt-0.5">
                Happy clients all over world now.
              </p>
            </div>
          </div>

          {/* Right: Quote */}
          <div className="space-y-6">
            <div className="text-blue-600">
              <svg
                className="h-12 w-12"
                fill="currentColor"
                viewBox="0 0 32 32"
              >
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>

            <p className="text-gray-600 leading-relaxed text-[17px]">
              Partnering with solvior has been a transformative experience for
              our organization. Their expert guidance through our market
              expansion strategy was invaluable. They helped us navigate complex
              regulatory environments and develop a clear, actionable plan that
              has led to successful.
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
                    alt="Burdee Nicolas"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex text-yellow-400 text-xs">
                    <span>★★★★★</span>
                  </div>
                  <h4 className="font-bold text-[#0B1426] text-sm">
                    Burdee Nicolas
                  </h4>
                  <p className="text-xs text-gray-500">Business owner</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg">+</span>
                </button>
                <button className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <span className="text-lg">+</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 👇 FIXED: ANIMATED CLIENT LOGOS (1000+ COMPANIES) SECTION 👇 */}
      {/* ============================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2,
            },
          },
        }}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          {/* The Horizontal Divider with the Blue Pill */}
          <div className="relative flex items-center justify-center mb-12 w-full">
            {/* Full width gray line */}
            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 -translate-y-1/2" />

            {/* Centered White Pill */}
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5 },
                },
              }}
              className="relative z-10 bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm flex items-center gap-1"
            >
              <span className="text-sm text-gray-500">Join the</span>
              <span className="text-sm text-blue-600 font-semibold">1000+</span>
              <span className="text-sm text-gray-500">
                companies benefiting from solvior
              </span>
            </motion.div>
          </div>

          {/* Logo Marquee */}
          <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-6">
              {[...logos, ...logos, ...logos].map((logo, index) => (
                <div
                  key={index}
                  className="w-[240px] shrink-0 bg-[#F4F7FA] rounded-lg p-6 flex items-center justify-center h-20 border border-[#E4E9F0]"
                >
                  <div className="relative w-full h-8 flex items-center justify-center invert opacity-60 hover:opacity-100 transition-opacity duration-300">
                    <Image
                      src={logo.img}
                      alt={logo.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}