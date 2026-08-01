import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { 
  Radar, Layers, UserRoundCog, Snowflake, PieChart, ArrowRightLeft, ArrowRight 
} from "lucide-react";
import ServicesSidebar from "@/components/ServicesSidebar";
import PageHero from "@/components/PageHero";

// --- DATA FOR ALL YOUR SERVICE PAGES ---
const servicesData = {
  "1": {
    title: "Business Process Optimization",
    subtitle: "Streamline operations for maximum efficiency",
    description: "We analyze your current workflows to identify bottlenecks and implement cutting-edge automation strategies. Our data-driven approach ensures your business runs smoother, faster, and more cost-effectively.",
    icon: Radar,
    features: [
      "Workflow automation & digitization",
      "Lean management implementation",
      "Data-driven performance tracking",
      "Cost reduction strategies"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  },
  "2": {
    title: "Strategic Planning & Execution",
    subtitle: "Turn ambitious goals into measurable reality",
    description: "We partner with leadership teams to define clear, actionable strategic roadmaps. From market analysis to execution frameworks, we ensure your vision translates into tangible business outcomes.",
    icon: Layers,
    features: [
      "Market analysis & competitive positioning",
      "Goal-setting & OKR implementation",
      "Resource allocation & budgeting",
      "Performance monitoring & adaptation"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  },
  "3": {
    title: "Leadership Executive Coaching",
    subtitle: "Empower your leaders to inspire greatness",
    description: "Our one-on-one coaching programs are designed for C-suite executives and high-potential managers. We focus on emotional intelligence, decision-making under pressure, and building high-performance teams.",
    icon: UserRoundCog,
    features: [
      "Personalized 1:1 coaching sessions",
      "Emotional intelligence training",
      "Conflict resolution & negotiation skills",
      "Succession planning mentorship"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  },
  "4": {
    title: "Legacy Leadership Institute",
    subtitle: "Build a lasting organizational culture",
    description: "Our institute program is tailored for organizations looking to embed sustainable leadership values. We transform company culture from the ground up, ensuring your legacy endures through future generations of leaders.",
    icon: Snowflake,
    features: [
      "Cultural transformation workshops",
      "Core values alignment programs",
      "Multi-generational leadership training",
      "Corporate social responsibility integration"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  },
  "5": {
    title: "Executive Growth Solutions",
    subtitle: "Unlock the full potential of your workforce",
    description: "We provide comprehensive growth solutions that bridge the gap between individual performance and organizational success. Through advanced assessment tools and targeted development plans, we elevate your entire executive team.",
    icon: PieChart,
    features: [
      "Advanced performance assessments",
      "Executive peer networking groups",
      "Leadership bootcamps & retreats",
      "360-degree feedback systems"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  },
  "6": {
    title: "Empowered Leadership Journey",
    subtitle: "Transform managers into visionary leaders",
    description: "Our Empowered Leadership Journey is a comprehensive development program designed to accelerate the growth of emerging leaders. We combine immersive workshops, real-world project leadership, and personalized mentorship to build the confidence and strategic mindset required to lead high-performing teams.",
    icon: ArrowRightLeft,
    features: [
      "Immersive leadership workshops",
      "Real-world project command",
      "Personalized executive mentorship",
      "Strategic mindset development"
    ],
    heroImage: "/images/services/tj-service-1.webp"
  }
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = servicesData[id as keyof typeof servicesData];

  // If the user goes to any unknown service ID, show a 404 page
  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-20">

      {/* --- Shared Page Hero (consistent across all pages) --- */}
      <PageHero title={service.title} />

      {/* --- Main Content Layout (Sidebar + Content) --- */}
      <section className="container mx-auto px-6 py-12 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Left Column: Sidebar (Takes 4 of 12 columns) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-4">
                Our Services
              </h3>
              <ServicesSidebar />
            </div>
          </div>

          {/* Right Column: Content (Takes 8 of 12 columns) */}
          <div className="lg:col-span-8 space-y-8 md:space-y-10">
            {/* Intro */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#0B1426] mb-3">Overview</h2>
              <p className="text-base leading-relaxed text-gray-600">
                {service.description}
              </p>
            </div>

            {/* Features List */}
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-[#0B1426] mb-5">What we deliver</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 md:p-4 bg-gray-50 rounded-xl border border-gray-100"
                  >
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-[#0B1426]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Box */}
            <div className="bg-[#0B1426] rounded-2xl p-6 md:p-8 text-white">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to transform your business?</h3>
              <p className="text-blue-100/70 mb-5 max-w-xl text-sm md:text-base">
                Let's discuss how {service.title} can help you achieve your goals.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium transition-all"
                >
                  Get a Quote
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/portfolios"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-medium transition-all backdrop-blur-sm border border-white/10"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}