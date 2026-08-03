"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/app/data/blog"; // Using your actual data source!

export default function BlogGridPage() {
  const itemsPerPage = 6; // 3 columns x 2 rows
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Helper to format "October 15, 2024" to "15 OCT"
  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
    return { day, month };
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB] pt-20 pb-24">
      <PageHero title="Blog Grid" />

      {/* --- MAIN GRID SECTION --- */}
      <section className="container mx-auto px-6 py-20 max-w-7xl">
        
        {/* Blog Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => {
            const { day, month } = formatDateBadge(post.date);
            
            return (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`} 
                className="group block bg-white border border-gray-300 hover:shadow-lg transition-all duration-300"
              >
                {/* Image Area with Date Badge */}
                <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-500" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  {/* Date Badge (Top Right Corner) */}
                  <div className="absolute top-0 right-0 bg-[#374151]/90 text-white flex flex-col items-center justify-center p-2.5 min-w-[56px] backdrop-blur-sm">
                    <span className="text-[20px] font-bold leading-none">
                      {day}
                    </span>
                    <span className="text-[11px] font-medium uppercase tracking-wide mt-0.5">
                      {month}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 md:p-7 flex flex-col">
                  
                  {/* Tags & Comments Row */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="px-3.5 py-1 border border-gray-300 rounded-full text-[11px] font-medium text-gray-600 bg-white">
                      {post.category}
                    </span>
                    <span className="text-[12px] text-gray-500 font-medium">
                      {post.comments} Comments
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-[22px] font-bold text-[#0B1426] leading-tight group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-[15px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Read More Link */}
                  <div className="mt-auto pt-2 flex items-center text-[14px] font-bold text-[#0B1426] group-hover:text-blue-600 group-hover:translate-x-1.5 transition-all">
                    Read more <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            {/* Previous (+) Button */}
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                currentPage === 1
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-gray-500"
              }`}
              aria-label="Previous page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold transition-colors ${
                  currentPage === number
                    ? "bg-[#1D4ED8] text-white"
                    : "border border-gray-300 text-gray-600 bg-white hover:bg-gray-50"
                }`}
              >
                {number.toString().padStart(2, "0")}
              </button>
            ))}

            {/* Next (+) Button */}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                currentPage === totalPages
                  ? "border-gray-200 text-gray-300 cursor-not-allowed"
                  : "border-gray-300 text-gray-600 hover:border-gray-500"
              }`}
              aria-label="Next page"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        )}
      </section>
    </main>
  );
}