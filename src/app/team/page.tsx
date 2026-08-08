"use client"; 

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";

export default function TeamPage() {
  // Full list of team members
  const allTeamMembers = [
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
    {
      name: "Guy Hawkins",
      role: "Sr. Marketer",
      image: "/images/team/Guy-Hawkins.webp",
    },
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
    {
      name: "Guy Hawkins",
      role: "Sr. Marketer",
      image: "/images/team/Guy-Hawkins.webp",
    },
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
    {
      name: "Guy Hawkins",
      role: "Sr. Marketer",
      image: "/images/team/Guy-Hawkins.webp",
    },
    {
      name: "Savanah Nguyen",
      role: "Manager",
      image: "/images/team/Savanah-Nguyen.webp",
    },
    {
      name: "Esther Howard",
      role: "Co. Founder",
      image: "/images/team/Esther-Howard.webp",
    },
    {
      name: "Guy Hawkins",
      role: "Sr. Marketer",
      image: "/images/team/Guy-Hawkins.webp",
    },
    {
      name: "Kristin Watson",
      role: "Sr. Manager",
      image: "/images/team/Kristin-Watson.webp",
    },
  ];

  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(allTeamMembers.length / itemsPerPage);

  // Get the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTeamMembers = allTeamMembers.slice(indexOfFirstItem, indexOfLastItem);

  // Handler to change page
  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Our Team" />

      {/* --- TEAM GRID SECTION --- */}
      <div className="w-full max-w-[1280px] mx-auto px-6 py-20">
        {/* If no members found (edge case) */}
        {currentTeamMembers.length === 0 && (
          <p className="text-center text-gray-500">No team members found.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentTeamMembers.map((member, idx) => (
            <div
              key={idx}
              className="relative aspect-[3/4] w-full bg-gray-100 overflow-hidden group"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
              
              {/* Dark Gradient Overlay at the bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />
              
              {/* Text Content over the overlay */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <h3 className="text-xl font-bold text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-300 mt-1 font-medium">
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- CLEAN PAGINATION WITH ARROWS ON BOTH SIDES --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            
            {/* Previous Arrow (<) */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
              }`}
              aria-label="Previous page"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers (01, 02...) */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                  currentPage === number
                    ? "bg-accent text-white shadow-md"
                    : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent"
                }`}
                aria-label={`Go to page ${number}`}
              >
                {number.toString().padStart(2, "0")}
              </button>
            ))}

            {/* Next Arrow (>) */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-accent hover:text-accent"
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