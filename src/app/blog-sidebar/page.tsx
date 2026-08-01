import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog";
import { Calendar, User, ArrowRight, Search } from "lucide-react";

export default function BlogSidebarPage() {
  // Get categories (same as other blog pages)
  const categories = ["Business Strategy", "Leadership", "Design", "Strategy", "Technology"];

  return (
    <main className="min-h-screen bg-white pt-20">
      <PageHero title="Blog Sidebar" />

      {/* --- MAIN LAYOUT: LEFT CONTENT + RIGHT SIDEBAR --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* ======= LEFT COLUMN: MAIN BLOG LIST (8 Columns) ======= */}
          <div className="lg:col-span-8 space-y-10">
            {blogPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}`} className="group block border-b border-gray-100 pb-10 last:border-0 last:pb-0">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Left: Thumbnail */}
                  <div className="md:col-span-1">
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-gray-50">
                      <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover" 
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Right: Text Content */}
                  <div className="md:col-span-2 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1.5">
                        <User className="h-3 w-3" /> {post.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3 w-3" /> {post.date}
                      </span>
                    </div>
                    
                    <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-1.5 block">
                      {post.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors mb-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                      Read More <ArrowRight className="h-4 w-4 ml-1.5" />
                    </div>
                  </div>

                </div>
              </Link>
            ))}
          </div>

          {/* ======= RIGHT COLUMN: SIDEBAR (4 Columns) ======= */}
          <div className="lg:col-span-4 space-y-10">
            
            {/* 1. Search Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#0B1426] mb-4">Search</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search articles..." 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                />
                <div className="absolute right-3 top-3 text-gray-400 text-xs font-medium cursor-pointer hover:text-blue-600 transition-colors">
                  Search
                </div>
              </div>
            </div>

            {/* 2. Categories Widget */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="font-bold text-[#0B1426] mb-4">Categories</h3>
              <ul className="space-y-2 text-sm">
                {categories.map((cat, idx) => (
                  <li key={cat}>
                    <Link href="#" className="flex justify-between items-center text-gray-600 hover:text-blue-600 transition-colors py-2 border-b border-gray-200 last:border-0">
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
              <h3 className="font-bold text-[#0B1426] mb-4">Recent Posts</h3>
              <div className="space-y-5">
                {blogPosts.slice(0, 3).map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="flex items-center gap-4 group">
                    <div className="relative h-16 w-16 shrink-0 rounded-lg overflow-hidden bg-gray-200">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#0B1426] group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h4>
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
            <div className="bg-[#0B1426] rounded-2xl p-8 text-center border border-gray-800">
              <h4 className="text-xl font-bold text-white mb-2">Need Expert Advice?</h4>
              <p className="text-blue-100/70 text-sm mb-6">Let's discuss your business goals over a coffee.</p>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-full transition-colors w-full">
                Contact Us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}