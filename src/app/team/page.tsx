import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "Jami Simth",
      role: "Assistant Manager",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "Mahin Deen",
      role: "Executive Support",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    },
    {
      name: "David Chen",
      role: "Project Lead",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    },
  ];

  return (
    <main className="min-h-screen bg-white flex items-center justify-center pt-16 pb-8 md:pb-0">
      <div className="w-full max-w-7xl px-6 py-4 md:py-2">
        
        {/* --- HERO SECTION --- */}
        <section className="relative overflow-hidden rounded-3xl bg-[#0B1426] text-white py-14 md:py-16 shadow-md mb-8 md:mb-10">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1552664688-cf412ec27db2?q=80&w=2070&auto=format&fit=crop"
              alt="Team Hero"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B1426]/90 via-[#0B1426]/70 to-transparent" />
          </div>
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs md:text-sm text-blue-300">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> OUR TEAM
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-3 tracking-tight">
                Our mission is to empower businesses of all size to thrive in an businesses changing marketplaces.
              </h1>
              <p className="text-base md:text-lg text-blue-100/80 max-w-2xl mb-6">
                In today&apos;s dynamic business environment, the key to success lies strategic planning and operational excellence.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-white pl-2 pr-6 py-2 text-sm font-semibold text-[#0B1426] transition-transform hover:scale-[1.03] shadow-sm"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Know More
              </Link>
            </div>
          </div>
        </section>

        {/* --- TEAM GRID SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
              <div className="relative aspect-[4/5] w-full bg-gray-50">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="font-display text-xl font-bold text-[#0B1426]">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {member.role}
                </p>
                <Link
                  href="/team-details"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:gap-3 transition-all"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}