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
    image: "https://images.openai.com/static-rsc-4/4vweEO0BdUaKSPRfnFbQMbRlcwikJKXL0Wp7QCakG6ZaHH9CFmB31jyUNqWLh2EADz2iF0JqKIS5PNXotk9C5IOl3TAUmrwa4KZKdPRFskxxcbt9N0xjn8rtrJVcaevKVcvQtVJzW2SE9kDyWb0vlwQ6gad4g-qxB1HozX7NVvxuGeE05rFzRCbYi2WnVchl?purpose=fullsize", // Changed to a stable Unsplash link
  },
];

export default function PortfoliosPage() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* --- EXACT HERO FROM YOUR SCREENSHOT --- */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        
        {/* Background Image with dark navy overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portfolios/porofolio.webp"
            alt="Business meeting background"
            fill
            className="object-cover"
            priority
          />
          {/* Deep Dark Navy Overlay to match your screenshot */}
          <div className="absolute inset-0 bg-[#0B1426]/85" />
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Portfolios
          </h1>
          
          {/* Breadcrumb Pill - Exact match to screenshot */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">Portfolios</span>
          </div>
        </div>
      </section>

      {/* --- Portfolio Grid Section (Unchanged, but styling fits perfectly now) --- */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {portfoliosData.map((portfolio) => (
            <Link
              key={portfolio.id}
              href={`/portfolios/${portfolio.id}`}
              className="group block"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                
                <div className="relative w-full h-[280px] bg-gray-50 overflow-hidden">
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

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-2">
                    {portfolio.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#0B1426] group-hover:text-blue-600 transition-colors mb-2">
                    {portfolio.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 flex items-center text-sm font-medium text-[#0B1426] group-hover:text-blue-600 transition-colors">
                    View Project
                    <ArrowRight className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
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