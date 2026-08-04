import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Radar,
  Layers,
  UserRoundCog,
  Snowflake,
  PieChart,
  ArrowRightLeft,
  ArrowRight,
  Check,
  Play,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import ServiceFAQ from "@/components/ServiceFAQ";
import ServicesSidebar, { services } from "@/components/ServicesSidebar"; // Import sidebar & data

// --- DATA FOR ALL YOUR SERVICE PAGES (ALL 6 INCLUDED) ---
const servicesData = {
  "1": {
    id: "1",
    title: "Business Process Optimization",
    subtitle: "Streamline operations for maximum efficiency",
    description:
      "We analyze your current workflows to identify bottlenecks and implement cutting-edge automation strategies. Our data-driven approach ensures your business runs smoother, faster, and more cost-effectively.",
    fullDesc:
      "Our service guides you through the entire strategic planning process, from initial goal formulation to precise execution. Start with a thorough assessment of your current position and market landscape, then help you define clear, actionable objectives aligned with your vision. Our approach includes developing detailed action plans, setting key performance indicators (KPIs), and implementing strategies to ensure seamless execution. Formulating and implementing business goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges.",
    icon: Radar,
    overviewItems: [
      "Clear vision and direction for your business for consultings.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning execution.",
      "Structured approach to achieving your business goals.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Quick solutions",
        desc: "Provide hands-on guidance and support during the execution strategic",
      },
      {
        icon: "provenresults",
        title: "Proven Results",
        desc: "Benefit from the expertise of seasoned consultants who offer strategic",
      },
      {
        icon: "personalization",
        title: "Personalization",
        desc: "Ensure that strategies are effectively implemented and objectives",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&q=85",
  },
  "2": {
    id: "2",
    title: "Strategic Planning & Execution",
    subtitle: "Turn ambitious goals into measurable reality",
    description:
      "We partner with leadership teams to define clear, actionable strategic roadmaps. From market analysis to execution frameworks, we ensure your vision translates into tangible business outcomes.",
    fullDesc:
      "Our service guides you through the entire strategic planning process, from initial goal formulation to precise execution. Start with a thorough assessment of your current position and market landscape, then help you define clear, actionable objectives aligned with your vision. Our approach includes developing detailed action plans, setting key performance indicators (KPIs), and implementing strategies to ensure seamless execution. Our Strategic Planning and Execution service offers a thorough approach to formulating and implementing business goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges.",
    icon: Layers,
    overviewItems: [
      "Clear vision and direction for your business for consultings.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning execution.",
      "Structured approach to achieving your business goals.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Quick solutions",
        desc: "Provide hands-on guidance and support during the execution strategic",
      },
      {
        icon: "provenresults",
        title: "Proven Results",
        desc: "Benefit from the expertise of seasoned consultants who offer strategic",
      },
      {
        icon: "personalization",
        title: "Personalization",
        desc: "Ensure that strategies are effectively implemented and objectives",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1200&q=85",
  },
  "3": {
    id: "3",
    title: "Leadership Executive Coaching",
    subtitle: "Empower your leaders to inspire greatness",
    description:
      "Our one-on-one coaching programs are designed for C-suite executives and high-potential managers. We focus on emotional intelligence, decision-making under pressure, and building high-performance teams.",
    fullDesc:
      "Our Leadership Executive Coaching service transforms your top talent into visionary leaders. We begin with a comprehensive 360-degree assessment to identify individual strengths and growth areas. From there, we craft a personalized coaching roadmap that includes regular one-on-one sessions, practical leadership challenges, and actionable feedback loops. Our coaches work alongside your executives to refine their communication skills, strategic thinking, and emotional intelligence.",
    icon: UserRoundCog,
    overviewItems: [
      "Personalized one-on-one executive coaching sessions.",
      "Enhanced emotional intelligence and decision-making skills.",
      "High-performance team building and conflict resolution.",
      "Strategic succession planning and mentorship.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Tailored Coaching",
        desc: "Custom coaching plans designed for your specific executive leadership needs and goals.",
      },
      {
        icon: "provenresults",
        title: "Proven Results",
        desc: "Benefit from the expertise of seasoned executive coaches who have transformed Fortune 500 leaders.",
      },
      {
        icon: "personalization",
        title: "Holistic Growth",
        desc: "Ensure that emotional, strategic, and operational leadership skills are effectively developed.",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=85",
  },
  "4": {
    id: "4",
    title: "Legacy Leadership Institute",
    subtitle: "Build a lasting organizational culture",
    description:
      "Our institute program is tailored for organizations looking to embed sustainable leadership values. We transform company culture from the ground up, ensuring your legacy endures through future generations of leaders.",
    fullDesc:
      "The Legacy Leadership Institute is our flagship program dedicated to building an enduring culture of leadership. We start by identifying the core values and behaviors that define your organization. Through immersive workshops, cross-departmental collaboration, and community-driven initiatives, we embed these principles into the fabric of your company. Our approach ensures that leadership is not just a title, but a shared responsibility at every level.",
    icon: Snowflake,
    overviewItems: [
      "Transformational company culture workshops.",
      "Core values alignment and organizational buy-in.",
      "Multi-generational leadership talent pipeline.",
      "Corporate social responsibility and community integration.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Cultural Transformation",
        desc: "A holistic approach to shifting your organizational mindset and company culture.",
      },
      {
        icon: "provenresults",
        title: "Enduring Impact",
        desc: "Build a leadership pipeline that ensures your legacy lasts for future generations.",
      },
      {
        icon: "personalization",
        title: "Values-Driven",
        desc: "Ensure that your unique core values are deeply embedded into everyday business practices.",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=85",
  },
  "5": {
    id: "5",
    title: "Executive Growth Solutions",
    subtitle: "Unlock the full potential of your workforce",
    description:
      "We provide comprehensive growth solutions that bridge the gap between individual performance and organizational success. Through advanced assessment tools and targeted development plans, we elevate your entire executive team.",
    fullDesc:
      "Executive Growth Solutions focuses on accelerating the performance of your top-tier talent. Our process begins with advanced psychometric and performance assessments to baseline current capabilities. We then introduce tailored development plans featuring strategic retreats, peer networking groups, and advanced leadership bootcamps. This comprehensive growth framework ensures that your executives are equipped to tackle the most complex market challenges with confidence.",
    icon: PieChart,
    overviewItems: [
      "Advanced performance and psychometric assessments.",
      "Exclusive executive peer networking and roundtables.",
      "High-intensity leadership bootcamps and retreats.",
      "Comprehensive 360-degree feedback and growth systems.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Targeted Growth",
        desc: "Accelerated development plans built specifically for high-potential executive talent.",
      },
      {
        icon: "provenresults",
        title: "Measurable Metrics",
        desc: "Track real growth through advanced performance benchmarks and 360-degree reviews.",
      },
      {
        icon: "personalization",
        title: "Peer Collaboration",
        desc: "Leverage the power of networking with fellow C-suite leaders across industries.",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&q=85",
  },
  "6": {
    id: "6",
    title: "Empowered Leadership Journey",
    subtitle: "Transform managers into visionary leaders",
    description:
      "Our Empowered Leadership Journey is a comprehensive development program designed to accelerate the growth of emerging leaders. We combine immersive workshops, real-world project leadership, and personalized mentorship to build the confidence and strategic mindset required to lead high-performing teams.",
    fullDesc:
      "The Empowered Leadership Journey takes emerging managers and accelerates their transition into confident, visionary leaders. We combine immersive leadership workshops with real-world project command experiences. Participants are paired with seasoned executive mentors who provide hands-on guidance and constructive feedback. This unique blend of theoretical learning and practical application ensures that new leaders are ready to step up and drive business success from day one.",
    icon: ArrowRightLeft,
    overviewItems: [
      "Immersive leadership and management workshops.",
      "Real-world project command and ownership.",
      "Personalized one-on-one executive mentorship.",
      "Strategic mindset development and confidence building.",
    ],
    keyFeatures: [
      {
        icon: "quicksolutions",
        title: "Practical Application",
        desc: "Learn by doing through real-world projects and leadership responsibilities.",
      },
      {
        icon: "provenresults",
        title: "Mentorship Focus",
        desc: "Benefit from the expertise of top-tier executive mentors dedicated to your growth.",
      },
      {
        icon: "personalization",
        title: "Confidence Building",
        desc: "Develop the strategic mindset and self-assurance needed to lead high-performance teams.",
      },
    ],
    heroImage:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=85",
    heroImage2:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1200&q=85",
  },
};

// --- KEY FEATURES ICON HELPER ---
const FeatureIcon = ({ type }: { type: string }) => {
  return (
    <div className="w-12 h-12 text-[#2563EB] mb-4">
      {type === "quicksolutions" && (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V-4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
      )}
      {type === "provenresults" && (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      )}
      {type === "personalization" && (
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
        </svg>
      )}
    </div>
  );
};

export default async function ServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = servicesData[id as keyof typeof servicesData];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title={service.title} />

      {/* --- MAIN WRAPPER --- */}
      <div className="w-full max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* ================= LEFT COLUMN (8/12) ================= */}
          <div className="lg:col-span-8 space-y-12">
            {/* 1. Large Hero Image */}
            <div className="relative aspect-[16/9] w-full bg-gray-100 overflow-hidden">
              <Image
                src={service.heroImage}
                alt={service.title}
                fill
                className="object-cover"
              />
            </div>

            {/* 2. Main Title & Description */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#0B1426] mb-4 leading-tight">
                {service.title} in the comprehensive process of formulating
                goals
              </h1>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                <p>{service.fullDesc}</p>
                <p>
                  Our {service.title} service offers a thorough approach to
                  formulating and implementing business goals. We begin with an
                  in-depth analysis of your business and market to identify
                  opportunities and challenges. From there, we work with you to
                  define clear, actionable objectives and develop a detailed
                  roadmap.
                </p>
              </div>
            </div>

            {/* 3. Service Overview & 2x2 Grid */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-3">
                Service overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
                Our mission is to empowers businesses size to thrive in an
                businesses ever changing marketplace. We are committed to the
                delivering exceptionals the value through strategic inset.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 border-t border-l border-gray-300">
                {service.overviewItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 border-b border-r border-gray-300 bg-white flex items-start gap-3"
                  >
                    <Check className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                    <p className="text-[14px] text-[#0B1426] leading-relaxed font-medium">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Two Images Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={service.heroImage}
                  alt="Service detail 1"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <Image
                  src={service.heroImage2}
                  alt="Service detail 2"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* 5. Key Features (3 Columns) */}
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-3">
                Key features
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px] mb-6">
                <p>
                  Our service guides you through the entire strategic planning
                  process, from initial goal formulation to precise execution.
                  Start with a thorough assessment of your current position and
                  market landscape, then help you define clear, actionable
                  objectives aligned with your vision.
                </p>
                <p>
                  Formulating and implementing business goals. We begin with an
                  in-depth analysis of your business and market to identify
                  opportunities and challenges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {service.keyFeatures.map((feature, idx) => (
                  <div key={idx} className="bg-[#EAF1FD] p-6 rounded-sm">
                    <FeatureIcon type={feature.icon} />
                    <h4 className="text-[17px] font-bold text-[#0B1426] mb-2">
                      {feature.title}
                    </h4>
                    <p className="text-[14px] text-[#4B5563] leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Video Section (Dark Background with Play Button) */}
            <div className="relative aspect-[21/9] w-full bg-[#0B1426] overflow-hidden mt-4">
              <Image
                src={service.heroImage}
                alt="Video Placeholder"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-transform">
                  <Play className="h-8 w-8 text-[#0B1426] fill-[#0B1426] ml-1" />
                </button>
              </div>
            </div>

            {/* 7. General Questions FAQ (Client Component imported) */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-[#0B1426] mb-6">
                General questions
              </h2>
              <ServiceFAQ />
            </div>
          </div>

          {/* ================= RIGHT COLUMN (4/12) ================= */}
          <div className="lg:col-span-4 space-y-10">
            {/* 1. Related Service Sidebar - CONNECTED */}
            <ServicesSidebar activeId={id} />

            {/* 2. Need Help? CTA Box */}
            <div className="relative border border-gray-300 p-6 bg-white overflow-hidden h-[420px] flex flex-col justify-between">
              <div className="absolute inset-0 z-0">
                <Image
                  src={service.heroImage}
                  alt="Need help background"
                  fill
                  className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/80 via-[#0B1426]/60 to-[#0B1426]/90" />
              </div>

              <div className="relative z-10 pt-2">
                <div className="w-12 h-12 bg-[#1D4ED8] rounded-lg flex items-center justify-center text-white mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                  Need help?
                  <br />
                  Feel free contact us
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed max-w-[200px]">
                  Our mission is to empowers businesses off all size in an
                  businesses.
                </p>
              </div>

              <div className="relative z-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-white hover:bg-gray-100 pl-2 pr-6 py-2 text-[14px] font-semibold text-[#0B1426] transition-all shadow-lg"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8] text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  Get in touch
                </Link>
              </div>

              {/* Curly Arrow SVG decoration */}
              <div className="absolute bottom-20 right-4 z-10 text-white/30">
                <svg
                  width="60"
                  height="60"
                  viewBox="0 0 100 100"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    d="M10,50 C10,20 90,20 90,50 C90,80 10,80 10,50"
                    fill="none"
                  />
                  <path d="M80,40 L90,50 L80,60" fill="none" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}