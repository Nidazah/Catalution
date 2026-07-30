import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Mail, Phone, MapPin, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter } from "react-icons/fa6";

// --- DATA FOR YOUR TEAM MEMBERS ---
const teamData = {
  "1": {
    name: "Jami Simth",
    role: "Assistant Manager",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
    bio: "Our mission is to empower businesses of all size to thrive in an businesses changing marketplaces. In toda dynamicis business environment, the key to the success lies Our mission is to empower. Our consultancy excels in providing quick solutions tailored. Our mission is to empoiwers businesses off our all size too thrive in an businesses changing marketplaces. In toda dynamicis business environment, the key to the success lies Our mission is to empower. Our consultancy excels in providing quick solutions tailored.",
    phone: "+1 (555) 123-4567",
    email: "jami.simth@solvior.com",
    location: "San Francisco, CA",
    skills: ["Strategic Planning", "Project Management", "Team Building"],
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  "2": {
    name: "Mahin Deen",
    role: "Executive Support",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
    bio: "Our mission is to empower businesses of all size to thrive in an businesses changing marketplaces. In toda dynamicis business environment, the key to the success lies Our mission is to empower. Our consultancy excels in providing quick solutions tailored.",
    phone: "+1 (555) 234-5678",
    email: "mahin.deen@solvior.com",
    location: "New York, NY",
    skills: ["Executive Support", "Operations", "Client Relations"],
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  "3": {
    name: "David Chen",
    role: "Project Lead",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    bio: "Our mission is to empower businesses of all size to thrive in an businesses changing marketplaces. In toda dynamicis business environment, the key to the success lies Our mission is to empower. Our consultancy excels in providing quick solutions tailored.",
    phone: "+1 (555) 345-6789",
    email: "david.chen@solvior.com",
    location: "Austin, TX",
    skills: ["Agile Methodology", "Tech Leadership", "Cross-team Collab"],
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
};

export default async function TeamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = teamData[id as keyof typeof teamData];

  if (!member) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white flex items-center justify-center pt-16 pb-6 md:pb-4">
      <div className="w-full max-w-6xl px-6 py-2 md:py-0">
        
        {/* Back Button */}
        <Link href="/team" className="inline-flex items-center text-sm font-medium text-[#0B1426] hover:text-blue-600 transition-colors mb-5">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Team
        </Link>

        {/* --- MAIN PROFILE GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* LEFT: LARGE PORTRAIT IMAGE */}
          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-100 shadow-sm w-full max-h-[550px]">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-top"
              priority
            />
          </div>

          {/* RIGHT: DETAILED PROFILE INFO */}
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0B1426] mb-2">
                {member.name}
              </h1>
              <p className="text-base md:text-lg text-gray-600 font-medium">
                {member.role}
              </p>
            </div>

            <div className="space-y-3 text-gray-600 leading-relaxed text-sm md:text-[15px]">
              <p>{member.bio}</p>
            </div>

            {/* CONTACT & SKILLS CARD */}
            <div className="bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Phone</p>
                    <p className="text-sm font-medium text-[#0B1426]">{member.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Email</p>
                    <p className="text-sm font-medium text-[#0B1426]">{member.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400">Location</p>
                    <p className="text-sm font-medium text-[#0B1426]">{member.location}</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-200">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                  Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-medium text-[#0B1426]">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* SOCIAL LINKS */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mr-2">
                Follow:
              </span>
              <Link href={member.socials.facebook} target="_blank" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaFacebookF className="h-3.5 w-3.5" />
              </Link>
              <Link href={member.socials.twitter} target="_blank" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaXTwitter className="h-3.5 w-3.5" />
              </Link>
              <Link href={member.socials.linkedin} target="_blank" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaLinkedin className="h-3.5 w-3.5" />
              </Link>
              <Link href={member.socials.instagram} target="_blank" className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                <FaInstagram className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}