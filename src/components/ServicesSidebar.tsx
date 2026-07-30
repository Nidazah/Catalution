import Link from "next/link";
import { 
  Radar, 
  Layers, 
  UserRoundCog, 
  Snowflake, 
  PieChart, 
  ArrowRightLeft,
  ArrowRight
} from "lucide-react";

const services = [
  {
    id: "1",
    title: "Business Process Optimization",
    subtitle: "Streamline operations & maximize ROI",
    href: "/services/1",
    icon: Radar,
  },
  {
    id: "2",
    title: "Strategic Planning & Execution",
    subtitle: "Turn bold visions into measurable results",
    href: "/services/2",
    icon: Layers,
  },
  {
    id: "3",
    title: "Leadership Executive Coaching",
    subtitle: "Empower your C-suite to inspire greatness",
    href: "/services/3",
    icon: UserRoundCog,
  },
  {
    id: "4",
    title: "Legacy Leadership Institute",
    subtitle: "Build a sustainable, enduring culture",
    href: "/services/4",
    icon: Snowflake,
  },
  {
    id: "5",
    title: "Executive Growth Solutions",
    subtitle: "Unlock the full potential of your team",
    href: "/services/5",
    icon: PieChart,
  },
  {
    id: "6",
    title: "Empowered Leadership Journey",
    subtitle: "Transform managers into visionary leaders",
    href: "/services/6",
    icon: ArrowRightLeft,
  },
];

export default function ServicesSidebar() {
  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="divide-y divide-gray-100">
        {services.map((service) => (
          <Link
            key={service.id}
            href={service.href}
            className="group relative block p-5 transition-all duration-300 hover:bg-[#F8FAFD] hover:pl-6"
          >
            <div className="flex items-start gap-4">
              {/* Circular Icon Background */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EAF3FF] text-[#1A73E8] transition-all duration-300 group-hover:bg-[#1A73E8] group-hover:text-white group-hover:scale-105">
                <service.icon className="h-6 w-6" />
              </div>

              {/* Text Content */}
              <div className="flex-1">
                <h4 className="text-[15px] font-bold text-[#0B1426] leading-snug group-hover:text-[#1A73E8] transition-colors">
                  {service.title}
                </h4>
                <p className="mt-1 text-sm text-gray-500 leading-snug">
                  {service.subtitle}
                </p>
              </div>
            </div>

            {/* Hover "View Details" Action */}
            <div className="mt-3 flex items-center gap-1 text-sm font-medium text-[#1A73E8] opacity-0 transform translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 pl-16">
              View Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}