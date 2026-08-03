"use client"; // <--- MUST BE LINE 1

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, MapPin, Check } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa6";

// --- DATA CENTRALIZED HERE ---
const jobDetails: Record<string, any> = {
  "1": {
    title: "Business strategy consultant",
    department: "Consulting",
    location: "London, UK",
    type: "Full time job/on site",
    urgency: "Urgent",
    description: "Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional in the values through our strategic inset, approaches empower.",
    requirements: "Formulating and implementing business goals. We begin with an in-depth analysis of your business and market to identify opportunities and challenges. From there, we work with you to define clear, actionable.",
    requirementsGrid: [
      "Clear vision and direction for your business for consultings.",
      "Enhanced ability to anticipate and respond to market changes.",
      "Data-driven decision-making for strategic planning execution.",
      "Structured approach to achieving your business goals."
    ],
    responsibilities: "Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to delivering delivering exceptional.",
    responsibilitiesList: [
      "Discover our expertise",
      "Journey and commitment to explained",
      "Meet our team and learn",
      "Meet our team"
    ],
    category: "Business consultant",
    number: "6080UO",
    company: "Solvior",
    website: "www.example.com",
    salary: "$400-$550 / week",
    vacancy: "03 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Business", "Consulting", "Insights"]
  },
  "2": {
    title: "Executive Leadership Coach",
    department: "Consulting",
    location: "New York, NY",
    type: "Contract / Remote",
    urgency: "Urgent",
    description: "We are looking for an experienced Executive Leadership Coach to work with our C-suite clients. You will be responsible for delivering high-impact one-on-one coaching sessions and facilitating leadership workshops.",
    requirements: "Formulating and implementing leadership frameworks. We begin with an in-depth analysis of your organizational structure to identify opportunities and challenges.",
    requirementsGrid: [
      "Proven executive coaching expertise.",
      "Enhanced ability to anticipate and respond to leadership challenges.",
      "Data-driven decision-making for strategic planning.",
      "Structured approach to achieving organizational goals."
    ],
    responsibilities: "Our mission is to empower businesses to thrive in an ever-changing marketplace. We are committed to delivering exceptional value through strategic insights and innovative approaches.",
    responsibilitiesList: [
      "Deliver tailored one-on-one executive coaching sessions.",
      "Facilitate leadership development workshops.",
      "Assess organizational needs and design custom coaching programs.",
      "Provide actionable feedback to drive leadership growth."
    ],
    category: "Executive Coach",
    number: "6080UO",
    company: "Solvior",
    website: "www.example.com",
    salary: "$500-$650 / week",
    vacancy: "02 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Leadership", "Executive", "Coaching"]
  },
  "3": {
    title: "Senior UX Designer",
    department: "Product Design",
    location: "Remote (US)",
    type: "Full time",
    urgency: "Urgent",
    description: "We are seeking a Senior UX Designer to lead the design of our digital products. You will drive user-centered design processes and collaborate closely with developers and product managers.",
    requirements: "We believe in creating world-class user experiences. We begin with a deep understanding of our users to drive innovative design solutions.",
    requirementsGrid: [
      "Lead the UX design process from research to final implementation.",
      "Create user flows, wireframes, high-fidelity prototypes.",
      "Conduct user testing and iterate based on feedback.",
      "Collaborate with developers for pixel-perfect implementation."
    ],
    responsibilities: "Our mission is to drive user-centered design across all our digital products.",
    responsibilitiesList: [
      "Lead the UX design process",
      "Create user flows and prototypes",
      "Conduct user testing",
      "Collaborate with developers"
    ],
    category: "UX Designer",
    number: "7080UO",
    company: "Solvior",
    website: "www.example.com",
    salary: "$600-$750 / week",
    vacancy: "01 Available",
    applyOn: "OCT 22, 2024",
    tags: ["Design", "UX", "UI"]
  },
};

// Ensure we have a list of all available IDs for rotation
const allIds = Object.keys(jobDetails);

// --- CLIENT-SIDE LOGIC ---
export default function CareerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Since we are in a "use client" file, we must use React.use() or handle the promise differently.
  // The best approach is to use a standard hook to get the params.
  // However, to keep it safe without breaking rules, we can unwrap it inside a useEffect.
  const [id, setId] = useState<string | null>(null);
  
  useEffect(() => {
    params.then((res) => setId(res.id));
  }, [params]);

  if (!id) {
    return <main className="min-h-screen bg-white pt-20 pb-24"><PageHero title="Loading..." /></main>;
  }

  const job = jobDetails[id as keyof typeof jobDetails];

  if (!job) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white pt-20 pb-24">
      <PageHero title="Career Details" />
      <CareerContent job={job} currentId={id} allIds={allIds} />
    </main>
  );
}

// --- RENDER COMPONENT ---
function CareerContent({ job, currentId, allIds }: { job: any, currentId: string, allIds: string[] }) {
  const router = useRouter();

  // Find current index to determine Next ID
  const currentIndex = allIds.indexOf(currentId);
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : allIds[0]; // Loop back to first job

  // AUTO-ROTATE TIMER (5 seconds)
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push(`/careers/${nextId}`);
    }, 5000);

    // Cleanup timer if user navigates away manually
    return () => clearTimeout(timer);
  }, [currentId, nextId, router]);

  const handleNext = () => {
    router.push(`/careers/${nextId}`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* ================= LEFT COLUMN ================= */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* 1. Header Card (Blue Background) */}
          <div className="bg-[#EAF5FF] p-8 md:p-10 rounded-lg">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-[#1D4ED8] rounded-lg flex items-center justify-center text-white shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12">
                  <circle cx="12" cy="12" r="3" />
                  <circle cx="4" cy="12" r="2" />
                  <circle cx="20" cy="12" r="2" />
                  <circle cx="12" cy="4" r="2" />
                  <circle cx="12" cy="20" r="2" />
                </svg>
              </div>
              
              <div className="space-y-2.5">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3.5 py-1 border border-gray-400/40 rounded-full text-[13px] font-medium text-gray-600 bg-white/50">
                    {job.type}
                  </span>
                  <span className="px-3.5 py-1 border border-gray-400/40 rounded-full text-[13px] font-medium text-gray-600 bg-white/50">
                    {job.urgency}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#0B1426]">
                  {job.title}
                </h1>
                <div className="flex items-center gap-1.5 text-[15px] font-medium text-[#0B1426]">
                  <MapPin className="h-4.5 w-4.5 text-[#0B1426]" />
                  <span>{job.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Job Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1426] mb-3">Job Description</h2>
            <p className="text-gray-600 leading-relaxed text-[15px]">
              {job.description}
            </p>
          </div>

          {/* 3. Requirements */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1426] mb-3">Requirements</h2>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-6">
              {job.requirements}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {job.requirementsGrid.map((item: string, idx: number) => (
                <div key={idx} className="border border-gray-200 p-5 bg-white flex items-start gap-3 rounded-sm">
                  <Check className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  <p className="text-[14px] text-[#0B1426] leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-gray-600 leading-relaxed text-[15px] mt-6">
              Our mission is to empowers businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to delivering delivering exceptional.
            </p>
          </div>

          {/* 4. Responsibilities */}
          <div>
            <h2 className="text-2xl font-bold text-[#0B1426] mb-3">Responsibilities</h2>
            <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
              {job.responsibilities}
            </p>
            <ul className="space-y-2.5">
              {job.responsibilitiesList.map((item: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3 text-[#0B1426] font-medium text-[15px]">
                  <Check className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Tags & Share Footer */}
          <div className="pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-medium text-[#0B1426]">Tags:</span>
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag: string, idx: number) => (
                  <span key={idx} className="px-3.5 py-1 border border-gray-200 rounded-full text-[13px] font-medium text-gray-600 bg-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[15px] font-medium text-[#0B1426]">Share:</span>
              <div className="flex gap-2">
                <button className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#1877F2] hover:text-white transition-colors">
                  <FaFacebook className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#000000] hover:text-white transition-colors">
                  <FaTwitter className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white transition-colors">
                  <FaLinkedin className="h-4 w-4" />
                </button>
                <button className="w-8 h-8 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#E4405F] hover:text-white transition-colors">
                  <FaInstagram className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* 6. Next / Previous Footer */}
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            <div></div> 
            <button
              onClick={handleNext}
              className="flex items-center gap-4 text-[15px] font-semibold text-[#0B1426] group bg-gray-50 px-4 py-2.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <span>Next</span>
              <div className="w-10 h-10 rounded-full bg-gray-200/60 flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                <ArrowRight className="h-4 w-4" />
              </div>
            </button>
          </div>

        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* 1. Job Information Box */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-bold text-[#0B1426] mb-5 border-b-2 border-[#2563EB] pb-2.5 inline-block">
              Job information
            </h3>
            
            <div className="grid grid-cols-1 gap-4 text-[15px] border border-gray-200 rounded-lg divide-y divide-gray-200">
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Category</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.category}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Number</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.number}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Company</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.company}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Website</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.website}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Salary</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.salary}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Vacancy</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.vacancy}</span>
              </div>
              <div className="flex p-4">
                <span className="w-28 font-medium text-[#4B5563] shrink-0">Apply on</span>
                <span className="text-[#0B1426]">:</span>
                <span className="pl-3 text-[#0B1426] font-medium">{job.applyOn}</span>
              </div>
            </div>
          </div>

          {/* 2. Apply Online Form */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-bold text-[#0B1426] mb-6 border-b-2 border-[#2563EB] pb-2.5 inline-block">
              Apply online
            </h3>
            
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full name*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm text-[14px] outline-none focus:border-[#2563EB] placeholder:text-gray-400 text-[#0B1426]"
              />
              <input
                type="email"
                placeholder="Enter email*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm text-[14px] outline-none focus:border-[#2563EB] placeholder:text-gray-400 text-[#0B1426]"
              />
              <input
                type="tel"
                placeholder="Phone number*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm text-[14px] outline-none focus:border-[#2563EB] placeholder:text-gray-400 text-[#0B1426]"
              />
              <textarea
                placeholder="Cover letter*"
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-sm text-[14px] outline-none focus:border-[#2563EB] placeholder:text-gray-400 text-[#0B1426] resize-none h-28"
              />

              <div className="flex items-center gap-3 pt-1">
                <span className="text-[14px] font-medium text-[#0B1426]">Attach resume*</span>
                <div className="flex items-center border border-[#2563EB] bg-[#F0F8FF] rounded-sm">
                  <span className="px-3 py-1.5 text-[13px] font-medium text-[#2563EB] cursor-pointer bg-[#E1EFFE]">Choose File</span>
                  <span className="px-3 py-1.5 text-[13px] text-gray-500">No file chosen</span>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-3 rounded-full bg-[#0B1426] hover:bg-[#1a253f] text-white pl-2 pr-6 py-2 text-[14px] font-semibold transition-all mt-2"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2563EB]">
                  <ArrowRight className="h-4 w-4" />
                </span>
                Submit now
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}