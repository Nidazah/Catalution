"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/Button"; // ✅ Import Button

// --- DATA ---
const allJobs = [
  {
    id: "1", // Switched to Numeric ID
    icon: "swirl",
    tags: ["Full time job/on site", "Urgent"],
    title: "Business Development Manager",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "2",
    icon: "dots",
    tags: ["Full time job/on site", "Urgent"],
    title: "Executive Leadership Coach",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "3",
    icon: "triangle",
    tags: ["Full time job/on site", "Urgent"],
    title: "Senior UX Designer",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "4",
    icon: "c",
    tags: ["Full time job/on site", "Urgent"],
    title: "Management consultant",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "5",
    icon: "people",
    tags: ["Full time job/on site", "Urgent"],
    title: "Business process consultant",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "6",
    icon: "eye",
    tags: ["Full time job/on site", "Urgent"],
    title: "Performance optimization",
    salary: "$400-$550 / week",
    location: "London, UK",
  },
  {
    id: "7",
    icon: "swirl",
    tags: ["Full time job/on site", "Urgent"],
    title: "Senior Data Analyst",
    salary: "$500-$650 / week",
    location: "London, UK",
  },
  {
    id: "8",
    icon: "dots",
    tags: ["Full time job/on site", "Urgent"],
    title: "UX Researcher",
    salary: "$450-$600 / week",
    location: "London, UK",
  },
];

// Icon helper
const JobIcon = ({ type }: { type: string }) => {
  return (
    <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mb-5 shrink-0">
      <div className="relative w-8 h-8 text-accent">
        {type === "swirl" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        )}
        {type === "dots" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="12" r="3" />
            <circle cx="4" cy="12" r="2" />
            <circle cx="20" cy="12" r="2" />
            <circle cx="12" cy="4" r="2" />
            <circle cx="12" cy="20" r="2" />
          </svg>
        )}
        {type === "triangle" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 13.5h-13L12 6.5z" />
          </svg>
        )}
        {type === "c" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
        )}
        {type === "people" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <circle cx="9" cy="8" r="4" />
            <circle cx="15" cy="10" r="3" />
            <path d="M9 14c-4.42 0-8 1.79-8 4v2h16v-2c0-2.21-3.58-4-8-4z" />
            <path d="M15 14c-1.1 0-2.1.15-3 .42v1.58c0 1.1.9 2 2 2h4v-2c0-1.1-.9-2-2-2z" />
          </svg>
        )}
        {type === "eye" && (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default function CareersPage() {
  const itemsPerPage = 6; // 3 columns x 2 rows
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(allJobs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = allJobs.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] pt-20 pb-24">
      <PageHero title="Careers" />

      <div className="w-full max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <Link
              key={job.id}
              href={`/careers/${job.id}`} // <--- Links to /careers/1, /careers/2, etc.
              className="group bg-white border border-gray-200 p-8 flex flex-col items-start hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <JobIcon type={job.icon} />

              <div className="flex flex-wrap gap-2 mb-4">
                {job.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 border border-gray-200 rounded-full text-[11px] font-medium text-gray-600 group-hover:border-orange-300 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-xl font-bold text-navy mb-1 group-hover:text-accent transition-colors">
                {job.title}
              </h3>
              <p className="text-[15px] font-medium text-[#9CA3AF] mb-6">
                {job.salary}
              </p>

              <div className="w-full flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-1.5 text-[13px] font-medium text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                
                {/* ✅ "Apply now" as a span — card is already a Link, so no nested interactive element */}
                <span
                  data-cursor-hover
                  className="group/btn inline-flex items-center gap-1.5 text-[13px] font-bold text-navy transition-colors group-hover:text-accent"
                >
                  Apply now
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* --- PAGINATION WITH ARROWS ON BOTH SIDES --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-16">
            
            {/* Previous Arrow (←) */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
              }`}
              aria-label="Previous page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === number
                    ? "bg-accent text-white border-2 border-black shadow-md scale-105"
                    : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent hover:bg-accent/5"
                }`}
                aria-label={`Go to page ${number}`}
              >
                {number.toString().padStart(2, "0")}
              </button>
            ))}

            {/* Next Arrow (→) */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent hover:bg-accent/5"
              }`}
              aria-label="Next page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

          </div>
        )}
      </div>
    </main>
  );
}