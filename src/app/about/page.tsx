import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, Target, Award, Lightbulb, Handshake, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    // FIX: dropped `flex items-center justify-center` — with a hero banner
    // plus a full two-column content grid below it, forcing vertical
    // centering just squeezes/drifts the layout depending on viewport
    // height. Normal top-down flow with real top/bottom padding lets it
    // size to its actual content instead.
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20">

        {/* --- HERO SECTION (Dark Image Overlay) --- */}
        <section className="relative overflow-hidden rounded-3xl bg-[#0B1426] text-white py-14 md:py-16 shadow-md mb-8 md:mb-10">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="About Us Hero"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/90 via-[#0B1426]/70 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs md:text-sm text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> ABOUT US
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3 tracking-tight">
                Crafting success tailored solutions for each & every challenges
              </h1>
              <p className="text-base md:text-lg text-blue-100/80 max-w-2xl">
                We are a team of passionate consultants dedicated to transforming businesses through strategic insight, innovative solutions, and a relentless commitment to our clients' success.
              </p>
            </div>
          </div>
        </section>

        {/* --- MAIN CONTENT GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">

          {/* LEFT: LARGE IMAGE */}
          <div className="relative aspect-[4/3] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=2070&auto=format&fit=crop"
              alt="Team collaborating"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT: STATS, TEXT & VALUES */}
          <div className="space-y-5">

            {/* HEADLINE */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#0B1426] leading-[1.1]">
              Empowering businesses to thrive in an ever-changing marketplace.
            </h2>

            {/* EXPANDED RICH TEXT CONTENT */}
            <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-base">
              <p>
                Founded in 2015, Solvior has grown from a small strategic consultancy into a global powerhouse dedicated to driving sustainable growth. We believe that true innovation happens at the intersection of rigorous data analysis and human-centered creativity. Our approach is simple: we listen deeply, think strategically, and execute with precision.
              </p>
              <p>
                Over the last decade, we have partnered with over 200 enterprises—from ambitious startups to established Fortune 500 companies—to solve their most complex business challenges. Whether it is optimizing operational workflows, redefining brand identities, or mentoring C-suite executives, our multidisciplinary team brings a wealth of experience to every engagement.
              </p>
              <p>
                What sets Solvior apart is our unwavering commitment to building lasting partnerships. We do not just deliver reports; we embed ourselves within your team to ensure that our strategies translate into tangible, long-term results. Our mission is to turn your vision into a legacy, and we are proud to be the trusted catalyst for some of the most impactful business transformations of the decade.
              </p>
            </div>

            {/* STATS CARDS (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Users className="h-5 w-5 text-blue-600 mb-1.5" />
                <div className="font-display text-2xl font-bold text-[#0B1426]">10+</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Years Experience</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Target className="h-5 w-5 text-blue-600 mb-1.5" />
                <div className="font-display text-2xl font-bold text-[#0B1426]">200+</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Projects Delivered</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Award className="h-5 w-5 text-blue-600 mb-1.5" />
                <div className="font-display text-2xl font-bold text-[#0B1426]">50+</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Global Awards</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <TrendingUp className="h-5 w-5 text-blue-600 mb-1.5" />
                <div className="font-display text-2xl font-bold text-[#0B1426]">4.9</div>
                <p className="text-[11px] text-gray-500 mt-0.5">Client Satisfaction</p>
              </div>
            </div>

            {/* CORE VALUES SECTION (New) */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-3 p-3 bg-blue-50/80 rounded-xl border border-blue-100">
                <Lightbulb className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1426]">Innovation</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">Driving progress through creativity & data.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50/80 rounded-xl border border-blue-100">
                <Handshake className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#0B1426]">Integrity</h4>
                  <p className="text-[10px] text-gray-500 leading-tight">Honesty, transparency, and trust above all.</p>
                </div>
              </div>
            </div>

            {/* BUTTON */}
            <div className="pt-1">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-6 py-1.5 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}