"use client";

import { useState } from "react";
import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog"; 
import { Calendar, User, ArrowRight } from "lucide-react";
import Button from "@/components/Button"; // ✅ Import Button

export default function BlogPage() {
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4; // Show 4 posts per page
  
  // Get the first post as the featured one (always visible)
  const featuredPost = blogPosts[0];
  // Get the rest for pagination (exclude featured post)
  const allOtherPosts = blogPosts.slice(1);
  
  // Pagination logic
  const totalPages = Math.ceil(allOtherPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allOtherPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get recent posts for sidebar
  const recentPosts = blogPosts.slice(1, 4);
  // Get categories
  const categories = ["Business Strategy", "Leadership", "Design", "Strategy", "Technology"];

  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Blog" />

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN: FEATURED POST + GRID (Spans 2 columns) --- */}
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-2xl font-bold text-navy mb-6">Featured Post</h2>
            
            <Link href={`/blog/${featuredPost.id}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                <div className="relative w-full aspect-[16/9]">
                  <Image 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 1200px) 100vw, 66vw"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <User className="h-4 w-4" /> {featuredPost.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" /> {featuredPost.date}
                    </span>
                  </div>
                  <span className="text-xs font-bold tracking-widest uppercase text-accent mb-2 block">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-navy group-hover:text-accent transition-colors mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* Grid Posts below Featured (Paginated) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              {currentPosts.map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="p-5 flex-grow">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-accent mb-1.5 block">{post.category}</span>
                      <h4 className="text-lg font-bold text-navy group-hover:text-accent transition-colors mb-2 line-clamp-2">{post.title}</h4>
                      
                      {/* ✅ Replaced manual Read More link with Button */}
                      <div className="mt-auto pt-2">
                        <Button
                          href={`/blog/${post.id}`}
                          size="sm"
                          className="bg-transparent !text-navy hover:text-accent p-0 h-auto font-bold"
                        >
                          Read more
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* --- PAGINATION WITH ARROWS ON BOTH SIDES --- */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-10">
                
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

          {/* --- RIGHT COLUMN: SIDEBAR (Spans 1 column) --- */}
          <div className="space-y-10">
            
            {/* 1. Search Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy mb-4">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-accent outline-none text-sm"
                />
                <div className="absolute right-3 top-3 text-gray-400 text-xs font-medium cursor-pointer hover:text-accent transition-colors">
                  Search
                </div>
              </div>
            </div>

            {/* 2. Categories Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.map((cat, idx) => (
                  <li key={cat}>
                    <Link href="#" className="flex justify-between items-center text-gray-600 hover:text-accent transition-colors py-2 border-b border-gray-200 last:border-0">
                      <span>{cat}</span>
                      <span className="text-xs font-medium bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {Math.floor(Math.random() * 8) + 3}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Recent Posts Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-navy mb-4">Recent Posts</h3>
              <div className="space-y-5">
                {recentPosts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="flex items-center gap-4 group">
                    <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-navy group-hover:text-accent transition-colors line-clamp-2">{post.title}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 4. Call to Action Widget */}
            <div className="bg-navy rounded-2xl p-8 text-center border border-gray-800">
              <h4 className="text-xl font-bold text-white mb-2">Need Expert Advice?</h4>
              <p className="text-orange-100/70 text-sm mb-6">Let's discuss your business goals over a coffee.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-orange-700 text-white text-sm font-semibold py-3 px-6 rounded-full transition-colors w-full">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}