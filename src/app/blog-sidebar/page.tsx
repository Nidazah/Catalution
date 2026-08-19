"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog";
import { Search } from "lucide-react";

export default function BlogSidebarPage() {
  const itemsPerPage = 8;
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

  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    return { day, month };
  };

  return (
    <main className="min-h-screen bg-white">
      <PageHero title="Blog Sidebar" />

      <section className="container mx-auto px-6 py-20 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ======= LEFT COLUMN: BLOG LIST GRID ======= */}
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
                    <div className="relative w-full aspect-[4/3] bg-gray-50 overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="media-card__badge media-card__badge--right bg-[#374151]/80 text-white flex flex-col items-center justify-center p-2 min-w-[50px] backdrop-blur-sm shadow-sm">
                        <span className="text-[20px] font-bold leading-none">
                          {day}
                        </span>
                        <span className="text-[10px] font-semibold uppercase tracking-wide mt-0.5">
                          {month}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3.5 py-1 border border-gray-300 rounded-full text-[11px] font-medium text-gray-600 bg-white">
                          {post.category}
                        </span>
                        <span className="text-[12px] text-gray-500 font-medium">
                          {post.comments} Comments
                        </span>
                      </div>
                      <h3 className="text-[20px] font-bold text-navy leading-tight group-hover:text-accent transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                        In today's dynamic business environment, the key to
                        success lies in strategic planning.
                      </p>
                      
                      {/* ✅ FIX: NESTED LINK REMOVED. Safe <span> inheriting group-hover */}
                      <div className="mt-auto pt-2">
                        <span className="btn btn-ghost text-sm font-bold p-0 h-auto cursor-pointer">
                          Read more
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
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

          {/* ======= RIGHT COLUMN: SIDEBAR ======= */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* 1. Search Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-navy mb-4 border-b-2 border-accent pb-2 inline-block">
                Search here
              </h3>
              <div className="relative mt-4">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-3 bg-section border border-transparent focus:border-accent outline-none text-[14px] text-navy placeholder:text-gray-400 transition-colors"
                />
              </div>
            </div>

            {/* 2. Recent Posts Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-navy mb-5 border-b-2 border-accent pb-2 inline-block">
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
                        <h4 className="text-[14px] font-semibold text-navy group-hover:text-accent transition-colors line-clamp-2 leading-snug">
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
              <h3 className="text-[18px] font-bold text-navy mb-5 border-b-2 border-accent pb-2 inline-block">
                Categories
              </h3>
              <ul className="space-y-2.5 text-[14px] font-medium">
                {["Branding", "Business", "Consulting", "Innovations", "Managements", "Marketing"].map(
                  (cat, idx) => (
                    <li key={cat}>
                      <Link
                        href="#"
                        className="flex justify-between items-center text-navy hover:text-accent transition-colors bg-section px-4 py-3"
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
              <h3 className="text-[18px] font-bold text-navy mb-5 border-b-2 border-accent pb-2 inline-block">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {["Branding", "Business", "Design", "Marketing", "Strategy"].map(
                  (tag) => (
                    <Link
                      key={tag}
                      href="#"
                      className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-navy hover:bg-navy hover:text-white transition-colors"
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
                <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy/90" />
              </div>

              <div className="relative z-10 pt-2">
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-white mb-6">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                  Need help?<br />
                  Feel free contact us
                </h3>
                <p className="text-sm text-orange-100/80 leading-relaxed max-w-[200px]">
                  Our mission is to empowers businesses off all size in an
                  businesses.
                </p>
              </div>

              <div className="relative z-10">
                {/* ✅ Global btn-outline replacing custom Button override */}
                <Link href="/contact" className="btn btn-outline shadow-lg w-full justify-center">
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