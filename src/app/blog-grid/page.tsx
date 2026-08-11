"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog";

export default function BlogGridPage() {
  const itemsPerPage = 6;
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
    <main className="min-h-screen bg-[#F9FAFB] pt-20 pb-24">
      <PageHero title="Blog Grid" />

      <section className="container mx-auto px-6 py-20 max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-0 right-0 bg-[#374151]/90 text-white flex flex-col items-center justify-center p-2.5 min-w-[56px] backdrop-blur-sm">
                      <span className="text-[20px] font-bold leading-none">
                        {day}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wide mt-0.5">
                        {month}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-7 flex flex-col">
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="px-3.5 py-1 border border-gray-300 rounded-full text-[11px] font-medium text-gray-600 bg-white">
                        {post.category}
                      </span>
                      <span className="text-[12px] text-gray-500 font-medium">
                        {post.comments} Comments
                      </span>
                    </div>
                    <h3 className="text-[22px] font-bold text-navy leading-tight group-hover:text-accent transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[15px] text-[#4B5563] leading-relaxed mb-6 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* 
                      ✅ FIX: NESTED LINK REMOVED. 
                      Replaced with a <span> acting as a styled button.
                      Because the parent <Link> covers the whole card, this "Read more" 
                      will still trigger the navigation perfectly, but won't throw an 
                      "a inside a" React hydration error.
                    */}
                    <div className="mt-auto pt-2">
                      <span className="btn btn-ghost text-sm font-bold p-0 h-auto cursor-pointer">
                        Read more
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* --- PAGINATION WITH ANIMATIONS & ARROWS ON BOTH SIDES --- */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="flex justify-center items-center gap-2 mt-16"
          >
            {/* Previous Arrow (←) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
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
            </motion.button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (number) => (
                <motion.button
                  key={number}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.1 * number,
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => paginate(number)}
                  className={`relative flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                    currentPage === number
                      ? "bg-accent text-white border-2 border-black shadow-md scale-105"
                      : "border-2 border-gray-200 text-gray-600 bg-white hover:border-accent hover:text-accent hover:bg-accent/5"
                  }`}
                  aria-label={`Go to page ${number}`}
                >
                  {number.toString().padStart(2, "0")}
                </motion.button>
              ),
            )}

            {/* Next Arrow (→) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-all duration-300 ${
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
            </motion.button>
          </motion.div>
        )}
      </section>
    </main>
  );
}