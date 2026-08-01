import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Globe2, Users } from "lucide-react";

const milestones = [
  {
    year: "2015",
    title: "Founded in a small office",
    text: "Solvior opened its doors with a three-person team and a single client, focused on operational strategy for local businesses.",
  },
  {
    year: "2018",
    title: "First international engagement",
    text: "We took on our first cross-border consultancy project, expanding our reach beyond the domestic market.",
  },
  {
    year: "2021",
    title: "Leadership institute launched",
    text: "We introduced our executive coaching and leadership development program, now used by teams at over 40 companies.",
  },
  {
    year: "2024",
    title: "200+ enterprises served",
    text: "Today we work with startups and Fortune 500 companies alike, with a team spanning four countries.",
  },
];

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Our History" />

      {/* --- MAIN CONTENT GRID --- */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT: LARGE IMAGE */}
          <div className="relative aspect-[4/3] lg:aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
              alt="Team collaborating"
              fill
              className="object-cover"
            />
          </div>

          {/* RIGHT: HISTORY STATS & TEXT */}
          <div className="space-y-6">

            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1426] leading-[1.1]">
              Our History
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Solvior was founded in 2015 on a simple idea: that businesses of every size deserve strategic guidance that's both rigorous and genuinely tailored to their situation. In today's fast-moving business environment, the key to lasting success lies in adapting quickly without losing sight of long-term direction.
              </p>
              <p>
                Since then, our consultancy has grown from a single-client operation into a team spanning four countries, providing fast, tailored solutions across operations, strategy, and leadership development for clients ranging from early-stage startups to global enterprises.
              </p>
            </div>

            {/* HISTORY STATS CARDS (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0B1426]">10+</div>
                <p className="text-sm text-gray-500 mt-0.5 text-[13px]">Years Experience</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0B1426]">200+</div>
                <p className="text-sm text-gray-500 mt-0.5 text-[13px]">Projects Delivered</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0B1426]">4</div>
                <p className="text-sm text-gray-500 mt-0.5 text-[13px]">Countries Served</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm">
                <div className="font-display text-3xl md:text-4xl font-bold text-[#0B1426]">40+</div>
                <p className="text-sm text-gray-500 mt-0.5 text-[13px]">Teams Coached</p>
              </div>
            </div>

            {/* BUTTON */}
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full bg-[var(--color-navy)] pl-2 pr-6 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03] shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
                  <ArrowRight className="h-4 w-4" />
                </span>
                More About Us
              </Link>
            </div>
          </div>
        </div>

        {/* --- MILESTONES / TIMELINE --- */}
        <section className="mt-16 md:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B1426] mb-3">Key Milestones</h2>
            <p className="text-gray-600">A look at how we've grown since our founding.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-sm">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-bold">
                  {m.year}
                </div>
                <h3 className="text-lg font-bold text-[#0B1426] mb-2">{m.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{m.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- WHY CLIENTS TRUST US --- */}
        <section className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-11 w-11 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B1426] mb-1">Client-first partnerships</h4>
              <p className="text-sm text-gray-500 leading-relaxed">We embed with your team rather than handing off a report and moving on.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-11 w-11 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Globe2 className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B1426] mb-1">Global perspective</h4>
              <p className="text-sm text-gray-500 leading-relaxed">A team across four countries brings a wider range of market experience to every engagement.</p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="h-11 w-11 shrink-0 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold text-[#0B1426] mb-1">Proven track record</h4>
              <p className="text-sm text-gray-500 leading-relaxed">Over 200 projects delivered, from early-stage startups to Fortune 500 companies.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}