"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog";
import { ArrowRight, Search } from "lucide-react";

export default function BlogSidebarPage() {
  const itemsPerPage = 8; // <--- CHANGED FROM 4 TO 8 (4 rows x 2 columns)
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

  // Helper to format "October 15, 2024" to "28 AUG"
  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    return { day, month };
  };

  return (
    <main className="min-h-screen bg-white pt-20 pb-24">
      <PageHero title="Blog Sidebar" />

      {/* --- MAIN LAYOUT: LEFT CONTENT + RIGHT SIDEBAR --- */}
      <section className="container mx-auto px-6 py-20 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ======= LEFT COLUMN: BLOG LIST GRID (8 Columns) ======= */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />

                      {/* Date Badge (Top Right Corner) */}
                      <div className="absolute top-4 right-4 bg-[#374151]/80 text-white flex flex-col items-center justify-center p-2 min-w-[50px] backdrop-blur-sm shadow-sm">
                        <span className="text-[20px] font-bold leading-none">
                          {day}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wide mt-0.5">
                          {month}
                        </span>
                      </div>
                    </div>

                    {/* Content Area */}
                    <div className="p-6 flex flex-col">
                      {/* Tags & Comments Row */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3.5 py-1 border border-gray-300 rounded-full text-[11px] font-medium text-gray-600 bg-white">
                          {post.category}
                        </span>
                        <span className="text-[12px] text-gray-500 font-medium">
                          {post.comments} Comments
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-[20px] font-bold text-[#0B1426] leading-tight group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                        In today's dynamic business environment, the key to
                        success lies in strategic planning.
                      </p>

                      {/* Read More Link */}
                      <div className="mt-auto pt-2 flex items-center text-[13px] font-bold text-[#0B1426] group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                        Read more <ArrowRight className="h-4 w-4 ml-1" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* --- PAGINATION --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                    currentPage === 1
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
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
                  )
                )}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`flex items-center justify-center w-10 h-10 rounded-full border transition-colors bg-white ${
                    currentPage === totalPages
                      ? "border-gray-200 text-gray-300 cursor-not-allowed"
                      : "border-gray-300 text-gray-600 hover:border-gray-500"
                  }`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* ======= RIGHT COLUMN: SIDEBAR (4 Columns) ======= */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* 1. Search Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-[#0B1426] mb-4 border-b-2 border-[#1D4ED8] pb-2 inline-block">
                Search here
              </h3>
              <div className="relative mt-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-[#F3F6F9] border border-transparent focus:border-[#1D4ED8] outline-none text-[14px] text-[#0B1426] placeholder:text-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* 2. Recent Posts Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-[#0B1426] mb-5 border-b-2 border-[#1D4ED8] pb-2 inline-block">
                Recent Post
              </h3>
              <div className="space-y-5">
                {blogPosts.slice(0, 3).map((post) => {
                  const { day, month } = formatDateBadge(post.date);
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-gray-200 border border-gray-100">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[14px] font-semibold text-[#0B1426] group-hover:text-[#1D4ED8] transition-colors line-clamp-2 leading-snug">
                          {post.title.length > 30
                            ? post.title.substring(0, 30) + "..."
                            : post.title}
                        </h4>
                        <p className="text-[12px] text-gray-500 mt-1">
                          {month} {day}, 2025
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* 3. Categories Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-[#0B1426] mb-5 border-b-2 border-[#1D4ED8] pb-2 inline-block">
                Categories
              </h3>
              <ul className="space-y-2.5 text-[14px] font-medium">
                {["Branding", "Business", "Consulting", "Innovations", "Managements", "Marketing"].map(
                  (cat, idx) => (
                    <li key={cat}>
                      <Link
                        href="#"
                        className="flex justify-between items-center text-[#0B1426] hover:text-[#1D4ED8] transition-colors bg-[#F3F6F9] px-4 py-3"
                      >
                        <span>{cat}</span>
                        <span className="text-gray-500 font-normal">
                          ({idx + 1})
                        </span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* 4. Tags Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-[#0B1426] mb-5 border-b-2 border-[#1D4ED8] pb-2 inline-block">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {["Branding", "Business", "Design", "Marketing", "Strategy"].map(
                  (tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-[#0B1426] hover:bg-[#0B1426] hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  )
                )}
              </div>
            </div>

            {/* 5. Need Help? CTA Box */}
            <div className="relative border border-gray-300 bg-white overflow-hidden h-[380px] flex flex-col justify-between p-6">
              <div className="absolute inset-0 z-0">
                <Image
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80"
                  alt="Need help background"
                  fill
                  className="object-cover opacity-20 grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B1426]/80 via-[#0B1426]/60 to-[#0B1426]/90" />
              </div>

              <div className="relative z-10 pt-2">
                <div className="w-12 h-12 bg-[#1D4ED8] rounded-lg flex items-center justify-center text-white mb-6">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                  Need help?<br />
                  Feel free contact us
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed max-w-[200px]">
                  Our mission is to empowers businesses off all size in an
                  businesses.
                </p>
              </div>

              <div className="relative z-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-3 rounded-full bg-white hover:bg-gray-100 pl-1.5 pr-6 py-1.5 text-[14px] font-semibold text-[#0B1426] transition-all shadow-lg w-fit"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1D4ED8] text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                  Get in touch
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}