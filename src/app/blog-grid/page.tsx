import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "@/app/data/blog";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function BlogGridPage() {
  // Get categories for the sidebar (same as blog page for consistency)
  const categories = ["Business Strategy", "Leadership", "Design", "Strategy", "Technology"];

  return (
    <main className="min-h-screen bg-white">
      
      {/* --- HERO SECTION (Matches main blog page) --- */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2069&auto=format&fit=crop"
            alt="Blog Grid Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1426]/85" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Blog Grid
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Grid</span>
          </div>
        </div>
      </section>

      {/* --- MAIN GRID SECTION --- */}
      <section className="container mx-auto px-6 py-20">
        
        {/* Blog Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group block">
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-50">
                  <Image 
                    src={post.image} 
                    alt={post.title} 
                    fill 
                    className="object-cover" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3 w-3" /> {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3 w-3" /> {post.date}
                    </span>
                  </div>
                  
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-600 mb-2 block">
                    {post.category}
                  </span>
                  
                  <h3 className="text-lg md:text-xl font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                    Read More <ArrowRight className="h-3 w-3 ml-1" />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>

      </section>
    </main>
  );
}