import PageHero from "@/components/PageHero";
import Link from "next/link";
import { ArrowRight, Waves, Boxes, Users, Sparkles, CircleDot, Repeat } from "lucide-react";

const servicesList = [
  { icon: Waves, title: "Business process optimization", href: "/services/1" },
  { icon: Boxes, title: "Strategic planning & execution", href: "/services/2" },
  { icon: Users, title: "Leadership executive coaching", href: "/services/3" },
  { icon: Sparkles, title: "Legacy leadership institute", href: "/services/4" },
  { icon: CircleDot, title: "Executive growth solutions", href: "/services/5" },
  { icon: Repeat, title: "Empowered leadership journey", href: "/services/6" },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Services" />

      <div className="w-full max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-gray-600">Empowering your business with strategic expertise and cutting-edge solutions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesList.map((s, i) => (
            <Link key={i} href={s.href} className="group block bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 text-center">
              <div className="h-14 w-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1426] mb-2">{s.title}</h3>
              <div className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-blue-600 group-hover:gap-2 transition-all">
                Learn More <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}