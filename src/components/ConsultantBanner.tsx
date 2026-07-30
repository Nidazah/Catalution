import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function ConsultantBanner() {
  return (
    <section className="w-full bg-[#1A73E8] py-12 md:py-14 overflow-hidden relative">
      {/* Decorative background curves */}
      <div className="absolute top-[-200px] left-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[400px] h-[400px] bg-white/5 rounded-full blur-2xl pointer-events-none" />

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12">
          
          {/* Left: Text */}
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white tracking-tight text-center md:text-left">
            GET CONSULTANT NOW!
          </h2>

          {/* Right: Button */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 rounded-full bg-white pl-1.5 pr-6 py-1.5 transition-transform hover:scale-105"
          >
            {/* Circular Blue Arrow Icon */}
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1A73E8] transition-colors group-hover:bg-[#1557b0]">
              <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            
            {/* Button Text */}
            <span className="text-[15px] font-semibold text-[#0B1426]">
              Lets talk now
            </span>
          </Link>

        </div>
      </div>
    </section>
  );
}