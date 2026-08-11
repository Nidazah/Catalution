"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const portfoliosData = [
  {
    id: "1",
    title: "Modern Tech Startup Branding",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", 
  },
  {
    id: "2",
    title: "Corporate Financial Dashboard",
    category: "UX/UI Design",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "3",
    title: "Sustainable Fashion Lookbook",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
  },
  {
    id: "4",
    title: "Healthcare Mobile Application",
    category: "Mobile App",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  },
  {
    id: "5",
    title: "Global Logistics Platform",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
  },
  {
    id: "6",
    title: "Minimalist Packaging Design",
    category: "Branding",
    image: "https://images.openai.com/static-rsc-4/4vweEO0BdUaKSPRfnFbQMbRlcwikJKXL0Wp7QCakG6ZaHH9CFmB31jyUNqWLh2EADz2iF0JqKIS5PNXotk9C5IOl3TAUmrwa4KZKdPRFskxxcbt9N0xjn8rtrJVcaevKVcvQtVJzW2SE9kDyWb0vlwQ6gad4g-qxB1HozX7NVvxuGeE05rFzRCbYi2WnVchl?purpose=fullsize",
  },
];

export default function PortfoliosPage() {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Show all 6 items on one page
  const totalPages = Math.ceil(portfoliosData.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Portfolios" />

      {/* 
        ✅ SINGLE EYE VIEW OPTIMIZATIONS:
        - Reduced `py-20` to `py-12`
        - Reduced image height from `h-[280px]` to `h-[220px]`
        - Reduced inner card padding from `p-6` to `p-5`
        - Grid remains `lg:grid-cols-3` to fit exactly 2 rows of 3
      */}
      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {portfoliosData.map((portfolio) => (
            <Link
              key={portfolio.id}
              href={`/portfolios/${portfolio.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                
                <div className="relative w-full h-[220px] bg-gray-50 overflow-hidden">
                  <Image
                    src={portfolio.image}
                    alt={portfolio.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    style={{ objectPosition: 'center 20%' }} 
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-xs font-bold tracking-widest uppercase text-accent mb-2">
                    {portfolio.category}
                  </span>
                  <h3 className="text-lg font-bold text-navy group-hover:text-accent transition-colors mb-2">
                    {portfolio.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-navy group-hover:text-accent transition-colors">
                    View Project
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* --- PAGINATION WITH ARROWS ON BOTH SIDES --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
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
              ),
            )}

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
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}