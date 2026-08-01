import PageHero from "@/components/PageHero";
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
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Our Team" />

      {/* --- TEAM GRID SECTION --- */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20">
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