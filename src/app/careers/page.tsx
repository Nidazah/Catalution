"use client";

import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowRight, MapPin, Clock, Briefcase, ArrowLeft } from "lucide-react";

// --- YOUR DATA ---
const jobData = {
  "1": {
    title: "Business Development Manager",
    department: "Sales & Marketing",
    location: "San Francisco, CA",
    type: "Full Time",
    description:
      "We are looking for a passionate Business Development Manager to drive growth and expand our market presence.",
    responsibilities: [
      "Identify new business opportunities.",
      "Build strong relationships with key clients.",
    ],
    requirements: [
      "5+ years of experience.",
      "Excellent communication skills.",
    ],
  },
  "2": {
    title: "Senior UX Designer",
    department: "Product Design",
    location: "Remote (US)",
    type: "Full Time",
    description:
      "We are seeking a Senior UX Designer to lead the design of our digital products.",
    responsibilities: [
      "Lead the UX design process.",
      "Create wireframes and prototypes.",
    ],
    requirements: [
      "6+ years of experience in UX/UI Design.",
      "Proficiency in Figma.",
    ],
  },
  "3": {
    title: "Executive Leadership Coach",
    department: "Consulting",
    location: "New York, NY",
    type: "Contract",
    description:
      "We are looking for an experienced Executive Leadership Coach to work with our C-suite clients.",
    responsibilities: [
      "Deliver one-on-one coaching sessions.",
      "Facilitate leadership workshops.",
    ],
    requirements: [
      "10+ years of executive leadership experience.",
      "ICF Certification.",
    ],
  },
};

export default function CareersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedId = searchParams.get("id");
  const job = selectedId ? jobData[selectedId as keyof typeof jobData] : null;

  // If an ID is in the URL, show the DETAIL VIEW
  if (job) {
    return (
      <main className="min-h-screen bg-white pt-20 pb-6 md:pb-4">
        <div className="w-full max-w-6xl mx-auto px-6 py-6 md:py-8">
          <button
            onClick={() => router.push("/careers")}
            className="inline-flex items-center text-sm font-medium text-[#0B1426] hover:text-blue-600 transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Careers
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            <div className="lg:col-span-4 bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 h-full flex flex-col justify-between">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]">
                  {job.title}
                </h1>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Department
                      </p>
                      <p className="text-sm font-medium text-[#0B1426]">
                        {job.department}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Location
                      </p>
                      <p className="text-sm font-medium text-[#0B1426]">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        Job Type
                      </p>
                      <p className="text-sm font-medium text-[#0B1426]">
                        {job.type}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                href="/contact"
                className="mt-8 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#0B1426] hover:bg-[#1a253f] pl-2 pr-7 py-2 text-sm font-semibold text-white"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Apply Now
              </Link>
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[#0B1426] mb-3">
                  Job Description
                </h2>
                <p className="text-gray-600 leading-relaxed text-[15px]">
                  {job.description}
                </p>
              </div>
              
              <div>
                <h2 className="text-2xl font-bold text-[#0B1426] mb-3">
                  Key Responsibilities
                </h2>
                <ul className="space-y-2">
                  {job.responsibilities.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-[#0B1426] mb-3">
                  Requirements & Qualifications
                </h2>
                <ul className="space-y-2">
                  {job.requirements.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 mt-2.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>
        </div>
      </main>
    );
  }

  // =========================================================================
  // If NO ID is in the URL, show the LIST VIEW
  // =========================================================================
  return (
    <main className="min-h-screen bg-white pt-20 pb-8 md:pb-4">
      <PageHero title="Careers" />

      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          <div className="lg:col-span-4 relative overflow-hidden rounded-3xl bg-[#0B1426] text-white p-8 md:p-10 shadow-md flex flex-col justify-between h-full min-h-[450px]">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Careers Hero"
                fill
                className="object-cover opacity-20"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/80 via-[#0B1426]/90 to-[#0B1426]" />
            </div>
            <div className="relative z-10 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-xs text-blue-300 w-fit">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" /> WE ARE HIRING
              </span>
              <h1 className="text-4xl md:text-5xl font-bold leading-[1.1] tracking-tight">
                Join our team <br /> and grow with us
              </h1>
              <p className="text-blue-100/80 text-sm md:text-base max-w-sm leading-relaxed">
                We are looking for passionate individuals who are ready to make a difference.
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-blue-600 hover:bg-blue-700 pl-2 pr-6 py-1.5 text-sm font-semibold text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-600">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>{" "}
                Apply Now
              </Link>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 md:space-y-5 h-full flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#0B1426] mb-2">
              Open Positions
            </h2>
            <div className="flex-1 flex flex-col justify-evenly gap-4 md:gap-5">
              {Object.values(jobData).map((job, index) => {
                const id = Object.keys(jobData)[index];
                return (
                  <div
                    key={id}
                    className="group bg-gray-50 rounded-2xl p-5 md:p-6 border border-gray-100 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1.5">
                        <h3 className="text-lg md:text-xl font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-gray-500">
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-3.5 w-3.5" /> {job.department}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" /> {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5" /> {job.type}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/careers?id=${id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy)] hover:bg-[#1a253f] px-4 py-2 text-xs md:text-sm font-semibold text-white transition-colors shrink-0"
                      >
                        Apply Now <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pt-4 border-t border-gray-100/50 text-center text-xs text-gray-400">
              <p>
                No suitable position? Send us your resume at{" "}
                <span className="text-blue-600 font-medium">
                  careers@solvior.com
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}