"use client";

import { useState, useEffect } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import { Play, LayoutGrid, Layers, Circle, Hexagon } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// --- Team Data (fallback; live data comes from /api/team) ---
const fallbackTeamMembers = [
  {
    name: "Guy Hawkins",
    role: "Sr. Designer",
    image: "/images/team/Guy-Hawkins.webp",
  },
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

// --- Testimonials Data ---
const testimonials = [
  {
    id: 1,
    quote: "Partnering with Catalution has been a transformative experience for our organization. Their expert guidance through our market expansion strategy was invaluable. They helped us navigate complex regulatory environments and develop a clear, actionable plan that has led to successful.",
    name: "Burdee Nicolas",
    role: "Business owner",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 2,
    quote: "Catalution's strategic approach to operational efficiency completely transformed our workflow. Their team brought fresh perspectives and data-driven solutions that exceeded our expectations. We've seen measurable improvements across all departments.",
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
  {
    id: 3,
    quote: "Working with Catalution was a game-changer for our business. Their consultants took the time to truly understand our unique challenges and crafted a tailored strategy that delivered real results. Highly recommend their services.",
    name: "Michael Chen",
    role: "Founder, Innovate Labs",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 5,
  },
];

type TeamMember = {
  name: string;
  role: string;
  image: string;
};

type Testimonial = {
  id?: number;
  quote: string;
  name: string;
  role: string;
  image: string;
  rating: number;
};

export default function AboutPage() {
  // --- Team + Testimonial State (live data from APIs, fallback to static) ---
  const [teamMembers, setTeamMembers] =
    useState<TeamMember[]>(fallbackTeamMembers);

  const [allTestimonials, setAllTestimonials] =
    useState<Testimonial[]>(testimonials);

  // --- Testimonial State ---
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // --- Live data fetch ---
  useEffect(() => {
    let cancelled = false;

    // Fetch team members
    fetch("/api/team?limit=50", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load team"))))
      .then((data) => {
        if (cancelled) return;

        const members = Array.isArray(data?.data)
          ? data.data
          : [];

        if (members.length > 0) {
          setTeamMembers(
            members.map((m: TeamMember) => ({
              name: m.name,
              role: m.role,
              image: m.image,
            })),
          );
        }
      })
      .catch(() => undefined);

    // Fetch testimonials
    fetch("/api/testimonials", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load testimonials"))))
      .then((data) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;

        setAllTestimonials(
          data.map((item: Testimonial) => ({
            quote: item.quote,
            name: item.name,
            role: item.role,
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
          })),
        );
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  // Reset current index if the live list is shorter
  useEffect(() => {
    if (currentTestimonial >= allTestimonials.length) {
      setCurrentTestimonial(0);
    }
  }, [allTestimonials.length, currentTestimonial]);

  // --- Auto-rotate Logic ---
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % allTestimonials.length);
      }, 5000); // Rotate every 5 seconds
    }

    return () => clearInterval(interval);
  }, [isAutoPlaying, allTestimonials.length]);

  // --- Navigation Handlers ---
  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % allTestimonials.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToTestimonial = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentTestimonial(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="About Us" />

      {/* --- 1. TOP HEADER SECTION --- */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Column */}
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-accent after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-accent">
              ABOUT OUR COMPANY
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-navy leading-[1.1]">
              Crafting success tailored solution for each & every challenges
            </h1>
            
            {/* ✅ FIXED: Uses the global primary variant, no manual overrides */}
            <Link href="/contact" className="btn btn-primary mt-8">
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
            <div className="mb-6 text-navy">
              <LayoutGrid className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Quick solutions</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to your business challenges
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-navy">
              <Layers className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Expert advice</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to your business challenges
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-navy">
              <Circle className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Strategic planning</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to your business challenges
            </p>
          </div>

          {/* Card 4 */}
          <div className="border border-[#D1D9E6] bg-gray-50/50 rounded p-8 hover:shadow-md transition-shadow">
            <div className="mb-6 text-navy">
              <Hexagon className="w-12 h-12 stroke-1" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-2">Efficient operations</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Our consultancy excels in providing quick solutions tailored to your business challenges
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
              <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-white">
                <span className="text-lg">✦</span> Our evolution
              </span>

              <p className="text-gray-600 leading-relaxed text-[15px] italic">
                &ldquo;Founded in 2002 by Burdee Ncolase en our firm started with our great vision to bring innovative solutions of businesses facing unprecedented challenges. That began as a small consultings firm quickly evolved into a trusted partner for companies around the globe. Our journey into began with a simple idea that offer unparalleled consulting services empower. Our core values of integrity, innovation, and excellence guide everything we do leading the wave in consulting.&rdquo;
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-6 pt-4">
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy">93%</div>
                  <p className="text-xs text-gray-500 mt-1">Complete projects</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy">20M</div>
                  <p className="text-xs text-gray-500 mt-1">Reach worldwide</p>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-navy">8.5x</div>
                  <p className="text-xs text-gray-500 mt-1">Faster growth</p>
                </div>
              </div>
            </div>

            {/* Right Column: Video/Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <div className="relative aspect-video w-full bg-navy">
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
                  <p className="mt-5 text-white text-sm font-medium tracking-wide">Click for watch</p>
                  <p className="text-white text-xl font-bold mt-1">See our latest video</p>
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
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-accent after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-accent">
              MEET OUR TEAM
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-bold text-navy leading-[1.1]">
              Expert team members
            </h2>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <div key={index} className="media-card group rounded-xl bg-navy shadow-lg hover:shadow-xl transition-shadow">
                <div className="media-card media-card--3-4 w-full">
                  <Image src={member.image} alt={member.name} fill className="object-cover object-top" />
                  <div className="media-card__overlay bg-gradient-to-t from-navy/95 via-navy/40 to-transparent" />
                </div>
                <div className="media-card__caption--full">
                  <h3 className="text-xl font-bold text-white leading-tight">{member.name}</h3>
                  <p className="text-sm text-gray-300 mt-1 font-medium">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6. SKILL & EXPERIENCE SECTION --- */}
      <section className="relative w-full py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/about/experience-bg.webp" alt="Skill background" fill className="object-cover object-center" />
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
        </div>

        <div className="relative z-10 container mx-auto px-6 flex justify-end">
          <div className="bg-black/50 backdrop-blur-md rounded-2xl p-10 md:p-12 max-w-lg text-white shadow-2xl border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skill and experience</h2>
            <p className="text-white/80 text-sm md:text-base leading-relaxed mb-8">
              In today's dynamic business environment, the key to success lies in strategic planning and operational excellence.
            </p>

            <div className="space-y-6">
              {/* Bar 1 */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Business consultants</span>
                  <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded">90%</span>
                </div>
                <div className="relative h-2 w-full bg-white/20 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-accent rounded-full" style={{ width: "90%" }} />
                  <div className="absolute top-1/2 -translate-y-1/2 right-[10%] h-4 w-4 bg-accent rounded-full border-2 border-white shadow-md" />
                </div>
              </div>

              {/* Bar 2 */}
              <div>
                <div className="flex justify-between text-sm font-semibold mb-2">
                  <span>Client communication</span>
                  <span className="bg-accent text-white text-[10px] px-2 py-0.5 rounded">82%</span>
                </div>
                <div className="relative h-2 w-full bg-white/20 rounded-full">
                  <div className="absolute top-0 left-0 h-full bg-accent rounded-full" style={{ width: "82%" }} />
                  <div className="absolute top-1/2 -translate-y-1/2 right-[18%] h-4 w-4 bg-accent rounded-full border-2 border-white shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. TESTIMONIALS SECTION --- */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent before:mr-2 before:h-1 before:w-1 before:rounded-full before:bg-accent after:ml-2 after:h-1 after:w-1 after:rounded-full after:bg-accent">
            CLIENTS FEEDBACK
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-navy leading-[1.1]">
            Our clients testimonials
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center max-w-6xl mx-auto">
          {/* Left: Portrait Image */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-sm bg-gray-100">
            <Image
              src="/images/about/h2-test-1.webp"
              alt="Client testimonial"
              fill
              className="object-cover object-center"
            />
            <div className="absolute bottom-6 left-6 bg-[#2D3748]/90 backdrop-blur-sm rounded-xl p-5 text-white min-w-[160px] shadow-lg border border-white/10">
              <div className="text-3xl font-bold tracking-tight">3.8 K+</div>
              <p className="text-xs text-white/80 mt-0.5">Happy clients all over world now.</p>
            </div>
          </div>

          {/* Right: Quote with Navigation */}
          <div className="space-y-6">
            <div className="text-accent">
              <svg className="h-12 w-12" fill="currentColor" viewBox="0 0 32 32">
                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
              </svg>
            </div>

            {/* Animated Quote Text */}
            <motion.p
              key={currentTestimonial}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="text-gray-600 leading-relaxed text-[17px]"
            >
              {allTestimonials[currentTestimonial].quote}
            </motion.p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src={allTestimonials[currentTestimonial].image}
                    alt={allTestimonials[currentTestimonial].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(allTestimonials[currentTestimonial].rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <h4 className="font-bold text-navy text-sm">
                    {allTestimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {allTestimonials[currentTestimonial].role}, <span className="font-medium text-accent">Catalution</span>
                  </p>
                </div>
              </div>
              
              {/* Functional Arrow Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goToNext}
                  className="h-10 w-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  aria-label="Next testimonial"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pt-2">
              {allTestimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? "w-6 bg-accent" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- 7. ANIMATED CLIENT LOGOS (1000+ COMPANIES) SECTION --- */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
        className="bg-white py-20"
      >
        <div className="container mx-auto px-6 max-w-7xl">
          {/* The Horizontal Divider with the Pill */}
          <div className="relative flex items-center justify-center mb-12 w-full">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gray-200 -translate-y-1/2" />

            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
              }}
              className="relative z-10 bg-white px-6 py-3 rounded-full border border-gray-100 shadow-sm flex items-center gap-1"
            >
              <span className="text-sm text-gray-500">Join the</span>
              <span className="text-sm text-accent font-semibold">1000+</span>
              <span className="text-sm text-gray-500">companies benefiting from Catalution</span>
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
                    <Image src={logo.img} alt={logo.name} fill className="object-contain" />
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