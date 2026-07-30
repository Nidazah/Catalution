import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog"; 
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogPage() {
  // Get the first post as the featured one
  const featuredPost = blogPosts[0];
  // Get the rest for the sidebar/recent posts
  const recentPosts = blogPosts.slice(1, 4);
  // Get categories
  const categories = ["Business Strategy", "Leadership", "Design", "Strategy", "Technology"];

  return (
    <main className="min-h-screen bg-white">
      
      {/* --- HERO SECTION (Matches the live site) --- */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portfolios/porofolio.webp"
            alt="Blog Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1426]/85" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Blogs
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Blogs</span>
          </div>
        </div>
      </section>

      {/* --- MAIN CONTENT SECTION --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* --- LEFT COLUMN: FEATURED POST (Spans 2 columns) --- */}
          <div className="lg:col-span-2 space-y-10">
            <h2 className="text-2xl font-bold text-[#0B1426] mb-6">Featured Post</h2>
            
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
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2 block">
                    {featuredPost.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors mb-4">
                    {featuredPost.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-sm font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="h-4 w-4 ml-1.5" />
                  </div>
                </div>
              </div>
            </Link>

            {/* 3 Small Grid Posts below Featured (Optional, to match the rich feel) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
              {blogPosts.slice(1, 3).map((post) => (
                <Link key={post.id} href={`/blog/${post.id}`} className="group block">
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 h-full flex flex-col">
                    <div className="relative h-48 w-full">
                      <Image src={post.image} alt={post.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                    </div>
                    <div className="p-5 flex-grow">
                      <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-1.5 block">{post.category}</span>
                      <h4 className="text-lg font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors mb-2 line-clamp-2">{post.title}</h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
                        <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                        <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: SIDEBAR (Spans 1 column) --- */}
          <div className="space-y-10">
            
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
                {recentPosts.map((post) => (
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