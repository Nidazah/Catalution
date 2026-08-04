import PageHero from "@/components/PageHero";
import { blogPosts } from "@/app/data/blog";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Calendar, 
  Search, 
  Check, 
  Reply,
  ArrowRight
} from "lucide-react";

import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import Button from "@/components/Button"; // ✅ Import Button

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Check if the "id" is actually a number (ID) or a string (slug)
  const isNumeric = /^\d+$/.test(id);
  
  let post;
  
  if (isNumeric) {
    // If it's a number, find by ID
    post = blogPosts.find((p) => p.id === parseInt(id));
  } else {
    // If it's a text slug, find by slug (✅ FIXED: using 'id' instead of 'slug')
    post = blogPosts.find((p) => p.slug === id);
  }

  if (!post) {
    notFound();
  }

  // Helper for sidebar formatting
  const formatDateBadge = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("default", { month: "short" }).toUpperCase();
    return { day, month };
  };

  return (
    <main className="min-h-screen bg-white pt-20 pb-24">
      <PageHero title="Blog Details" />

      {/* --- MAIN LAYOUT: LEFT CONTENT + RIGHT SIDEBAR --- */}
      <section className="container mx-auto px-6 py-16 max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* ============================================================
              LEFT COLUMN: BLOG CONTENT (8 Columns)
              ============================================================ */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* 1. Large Hero Image */}
            <div className="relative aspect-[16/10] w-full bg-gray-100 overflow-hidden border border-gray-200">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* 2. Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-[#0B1426] leading-tight">
              {post.title}
            </h1>

            {/* 3. Meta Info Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 border border-gray-300 divide-y sm:divide-y-0 sm:divide-x divide-gray-300 bg-white">
              
              {/* Author */}
              <div className="flex items-center gap-3 p-5">
                <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0 bg-gray-200 border border-gray-100">
                  <Image 
                    src={post.authorAvatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80"} 
                    alt={post.author} 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Authored by</p>
                  <p className="text-[15px] font-bold text-[#0B1426]">{post.author}</p>
                </div>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 p-5">
                <div className="h-12 w-12 bg-[#EAF1FD] rounded-lg flex items-center justify-center text-[#1D4ED8] shrink-0">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Date Issued</p>
                  <p className="text-[15px] font-bold text-[#0B1426]">{post.date}</p>
                </div>
              </div>

              {/* Comments */}
              <div className="flex items-center gap-3 p-5">
                <div className="h-12 w-12 bg-[#EAF1FD] rounded-lg flex items-center justify-center text-[#1D4ED8] shrink-0">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
                  </svg>
                </div>
                <div>
                  <p className="text-[12px] font-medium text-gray-400 uppercase tracking-wider">Comments</p>
                  <p className="text-[15px] font-bold text-[#0B1426]">{post.comments} Comments</p>
                </div>
              </div>
            </div>

            {/* 4. Body Paragraphs */}
            <div className="space-y-5 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional in the values through our strategic inset, approaches empower.
              </p>
              <p>
                Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive.
              </p>
            </div>

            {/* 5. Quote Block */}
            <div className="bg-[#EAF1FD] p-8 md:p-10 relative">
              <div className="mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="text-[#1D4ED8]">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 12.1046 13.1216 13 12.017 13H10.017V21H14.017ZM7.0166 21L7.0166 18C7.0166 16.8954 7.91203 16 9.0166 16H12.0166C12.5689 16 13.0166 15.5523 13.0166 15V9C13.0166 8.44772 12.5689 8 12.0166 8H8.0166C7.46432 8 7.0166 8.44772 7.0166 9V11C7.0166 12.1046 6.12117 13 5.0166 13H3.0166V21H7.0166Z" />
                </svg>
              </div>
              <p className="text-[18px] md:text-[20px] font-semibold text-[#0B1426] leading-relaxed mb-3">
                The greatest asset of a consultant is the ability to ask the right questions and guide clients to discover their own consulting answers.
              </p>
              <p className="text-[14px] text-gray-500 font-medium flex items-center gap-2">
                — <span className="text-[#0B1426]">Aryan Gronic</span>
              </p>
            </div>

            {/* 6. More Body Text */}
            <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
              <p>
                Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.
              </p>
            </div>

            {/* 7. Key Lessons Section */}
            <div>
              <h2 className="text-[22px] font-bold text-[#0B1426] mb-4">Key lessons of business</h2>
              <p className="text-gray-600 leading-relaxed text-[15px] mb-4">
                Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals.
              </p>
              <ul className="space-y-2.5">
                {[
                  "Discover our expertise",
                  "Journey and commitment to explained",
                  "Meet our team and learn",
                  "Meet our team"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[15px] text-[#0B1426] font-medium">
                    <Check className="h-5 w-5 text-[#1D4ED8] shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* 8. Conclusion */}
            <div>
              <h2 className="text-[22px] font-bold text-[#0B1426] mb-3">Conclusions</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed text-[15px]">
                <p>
                  Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches. Our consulting of our missing empower businesses of all sizes to thrive. Committed to the delivering exceptional.
                </p>
                <p>
                  Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset, innovative approaches.
                </p>
              </div>
            </div>

            {/* 9. Tags & Share */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[15px] font-bold text-[#0B1426] mr-2">Tags:</span>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-[#0B1426] bg-white">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[15px] font-bold text-[#0B1426] mr-2">Share:</span>
                <div className="flex gap-2">
                  <button className="w-9 h-9 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#1877F2] hover:text-white transition-colors">
                    <FaFacebookF className="h-4 w-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#000000] hover:text-white transition-colors">
                    <FaTwitter className="h-4 w-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#0A66C2] hover:text-white transition-colors">
                    <FaLinkedinIn className="h-4 w-4" />
                  </button>
                  <button className="w-9 h-9 rounded-full bg-gray-200/50 flex items-center justify-center text-gray-500 hover:bg-[#E4405F] hover:text-white transition-colors">
                    <FaInstagram className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 10. Next Post Navigation */}
            <div className="border border-gray-300 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="grid grid-cols-4 gap-0.5">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-[#1D4ED8]" />
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={`/blog/${post.id + 1}`}
                className="flex items-center gap-3 text-[14px] font-bold text-[#0B1426] hover:text-[#1D4ED8] transition-colors"
              >
                Next <div className="w-8 h-8 rounded-full bg-[#EAF1FD] flex items-center justify-center"><ArrowRight className="h-4 w-4 text-[#1D4ED8]" /></div>
              </Link>
            </div>

            {/* 11. Comments Section */}
            <div className="pt-4">
              <h3 className="text-[22px] font-bold text-[#0B1426] mb-6">Comments ({post.comments})</h3>
              
              <div className="space-y-6">
                {[
                  { name: "Jami Smith", date: "February 02, 2024", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=128&q=80" },
                  { name: "Marden Smith", date: "March 03, 2024", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&q=80" },
                  { name: "Muhin Deon", date: "June 03, 2024", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=128&q=80" }
                ].map((comment, idx) => (
                  <div key={idx} className="border border-gray-300 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden shrink-0">
                          <Image src={comment.avatar} alt={comment.name} fill className="object-cover" />
                        </div>
                        <div>
                          <h4 className="text-[16px] font-bold text-[#0B1426]">{comment.name}</h4>
                          <p className="text-[13px] text-gray-500">{comment.date}</p>
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 text-[13px] font-medium text-[#0B1426] hover:text-[#1D4ED8] transition-colors">
                        <Reply className="h-4 w-4" /> Reply
                      </button>
                    </div>
                    <p className="text-[15px] text-gray-600 leading-relaxed">
                      Our mission is to empower businesses size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptionals the value through strategic inset.
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12. Leave a Reply Form */}
            <div className="pt-4">
              <h3 className="text-[22px] font-bold text-[#0B1426] mb-6">Leave a reply</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input type="text" placeholder="Enter name" className="w-full px-4 py-3 bg-[#F3F6F9] border border-gray-200 rounded-sm text-[14px] outline-none focus:border-[#1D4ED8] placeholder:text-gray-400 text-[#0B1426]" />
                  <input type="email" placeholder="Enter email" className="w-full px-4 py-3 bg-[#F3F6F9] border border-gray-200 rounded-sm text-[14px] outline-none focus:border-[#1D4ED8] placeholder:text-gray-400 text-[#0B1426]" />
                </div>
                <input type="text" placeholder="Your website" className="w-full px-4 py-3 bg-[#F3F6F9] border border-gray-200 rounded-sm text-[14px] outline-none focus:border-[#1D4ED8] placeholder:text-gray-400 text-[#0B1426]" />
                <textarea placeholder="Enter your comments" className="w-full px-4 py-3 bg-[#F3F6F9] border border-gray-200 rounded-sm text-[14px] outline-none focus:border-[#1D4ED8] placeholder:text-gray-400 text-[#0B1426] resize-none h-32" />
                
                {/* ✅ Replaced manual button with Button component */}
                <Button
                  type="button"
                  size="md"
                  className="bg-[#0B1426] hover:bg-[#1a253f] text-white"
                >
                  Leave comment
                </Button>
              </form>
            </div>

          </div>

          {/* ============================================================
              RIGHT COLUMN: SIDEBAR (4 Columns)
              ============================================================ */}
          <div className="lg:col-span-4 space-y-8">
            
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
                    <Link key={post.id} href={`/blog/${post.slug}`} className="flex items-center gap-4 group">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-gray-200 border border-gray-100">
                        <Image src={post.image} alt={post.title} fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[14px] font-semibold text-[#0B1426] group-hover:text-[#1D4ED8] transition-colors line-clamp-2 leading-snug">
                          {post.title.length > 30 ? post.title.substring(0, 30) + "..." : post.title}
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
                {["Branding", "Business", "Consulting", "Innovations", "Managements", "Marketing"].map((cat, idx) => (
                  <li key={cat}>
                    <Link href="#" className="flex justify-between items-center text-[#0B1426] hover:text-[#1D4ED8] transition-colors bg-[#F3F6F9] px-4 py-3">
                      <span>{cat}</span>
                      <span className="text-gray-500 font-normal">({idx + 1})</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Tags Widget */}
            <div className="border border-gray-300 p-6 bg-white">
              <h3 className="text-[18px] font-bold text-[#0B1426] mb-5 border-b-2 border-[#1D4ED8] pb-2 inline-block">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2.5 mt-2">
                {["Branding", "Business", "Design", "Marketing", "Strategy"].map((tag) => (
                  <Link key={tag} href="#" className="px-4 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-[#0B1426] hover:bg-[#0B1426] hover:text-white transition-colors">
                    {tag}
                  </Link>
                ))}
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
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                    <path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-white leading-tight mb-3">
                  Need help?<br />Feel free contact us
                </h3>
                <p className="text-sm text-blue-100/80 leading-relaxed max-w-[200px]">
                  Our mission is to empowers businesses off all size in an businesses.
                </p>
              </div>

              <div className="relative z-10">
                {/* ✅ Replaced <Link> with Button */}
                <Button
                  href="/contact"
                  size="md"
                  className="bg-white hover:bg-gray-100 text-[#0B1426] shadow-lg"
                >
                  Get in touch
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}