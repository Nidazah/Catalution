import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, Tag, CheckCircle, ArrowUpRight, LayoutGrid, Code2, Award } from "lucide-react";

// Data store with extra fields added for richer content
const portfoliosData = {
  "1": {
    title: "Modern Tech Startup Branding",
    category: "Branding",
    client: "TechVista Inc.",
    date: "October 2024",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
    overview: "TechVista approached us to revitalize their brand identity as they pivoted from a B2B consultancy to a consumer-facing SaaS platform. We developed a comprehensive branding strategy that bridges the gap between technical innovation and human-centered design.",
    challenge: "The primary challenge was moving away from a stale, corporate aesthetic while still maintaining trust and professionalism. The new brand needed to be distinct, modern, and instantly recognizable in a crowded tech landscape.",
    solution: "Through extensive market research and collaborative workshops, we created a vibrant visual language centered around a custom abstract logo mark, a dynamic color palette, and a proprietary typography system.",
    results: [
      "40% increase in brand recall within 3 months of launch.",
      "Successfully secured $12M in Series A funding post-rebrand.",
      "Website conversion rates improved by 15%."
    ],
    highlightStats: { value: "40%", label: "Increase in Brand Recall" },
    techStack: ["Adobe Illustrator", "Figma", "After Effects", "Notion"],
    award: "Awwwards Site of the Day 2024",
    testimonial: "Solvior didn't just design a logo; they crafted our entire visual story. The rebrand was the catalyst we needed to secure our Series A funding.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.techvista.com"
  },
  "2": {
    title: "Corporate Financial Dashboard",
    category: "UX/UI Design",
    client: "FinCorp Group",
    date: "August 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    overview: "FinCorp required a modern, data-rich dashboard that could display complex financial metrics for their C-suite executives in a clear, actionable format.",
    challenge: "The old system was cluttered and hard to read on mobile devices. We needed to prioritize information hierarchy while keeping the UI visually appealing.",
    solution: "We designed a modular dashboard utilizing glassmorphism and vibrant data visualizations, allowing users to drill down into specific KPIs seamlessly.",
    results: [
      "Reduced data retrieval time by 60%.",
      "Received industry award for 'Best Financial Interface 2024'.",
      "Employee satisfaction regarding tool usability jumped to 94%."
    ],
    highlightStats: { value: "60%", label: "Faster Data Retrieval" },
    techStack: ["React", "D3.js", "Node.js", "MongoDB"],
    award: "FinTech Design Award 2024",
    testimonial: "The user interface is a game-changer. Our executives can now make data-driven decisions in seconds instead of hours.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.fincorp.com"
  },
  "3": {
    title: "Sustainable Fashion Lookbook",
    category: "Web Development",
    client: "EcoThreads Co.",
    date: "June 2024",
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80",
    overview: "EcoThreads Co. enlisted us to build an immersive e-commerce website to showcase their new sustainable fashion line. We combined eco-conscious design principles with a high-converting online shopping experience.",
    challenge: "The challenge was striking a balance between earthy, sustainable aesthetics and a sleek, modern, mobile-first user interface that would drive sales without feeling cluttered.",
    solution: "We utilized a light, natural color palette paired with minimalistic typography. We integrated high-definition lazy-loading images and implemented an intuitive filtering system for easy product discovery.",
    results: [
      "Conversion rate increased by 25% in the first 60 days.",
      "Average session duration increased by 45%.",
      "Won the 'Green Web Design Award 2024'."
    ],
    highlightStats: { value: "25%", label: "Conversion Rate Increase" },
    techStack: ["Next.js", "Tailwind CSS", "Stripe", "Sanity CMS"],
    award: "CSS Design Awards 2024",
    testimonial: "Our customers love the new website! It perfectly captures our eco-conscious values while making shopping incredibly easy.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.ecothreads.com"
  },
  "4": {
    title: "Healthcare Mobile Application",
    category: "Mobile App",
    client: "MediCare Connect",
    date: "March 2024",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
    overview: "MediCare Connect required a HIPAA-compliant mobile application that allowed patients to book appointments, view medical records, and chat securely with their primary care physicians.",
    challenge: "Creating a user-friendly interface that was accessible to elderly users while incorporating complex medical backend integrations and strict security protocols was a massive hurdle.",
    solution: "We implemented large, high-contrast UI components for accessibility. We built an encrypted real-time messaging system and seamlessly integrated with their existing EHR (Electronic Health Records) system.",
    results: [
      "Patient appointment no-show rates dropped by 35%.",
      "Received 4.9/5 rating on the App Store within 1 month.",
      "Secured 3 new hospital partnerships."
    ],
    highlightStats: { value: "4.9", label: "App Store Rating" },
    techStack: ["React Native", "Firebase", "WebRTC", "Node.js"],
    award: "HealthTech Innovation Award 2024",
    testimonial: "Solvior built an accessible, HIPAA-compliant app that our elderly patients absolutely love. It has transformed our patient care.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.medicareconnect.com"
  },
  "5": {
    title: "Global Logistics Platform",
    category: "Web Development",
    client: "FreightFlow Inc.",
    date: "January 2024",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
    overview: "FreightFlow Inc. needed a complete overhaul of their legacy logistics platform. We created a robust, real-time web application for tracking global shipments, managing fleets, and generating automated analytical reports.",
    challenge: "The legacy system suffered from massive latency issues and had no mobile responsiveness. We had to modernize the tech stack without interrupting their day-to-day global operations.",
    solution: "We migrated the platform to a microservices architecture using React and Node.js. We integrated real-time WebSocket tracking and designed a dynamic dashboard to visualize complex supply chain data with ease.",
    results: [
      "System latency reduced by 70%.",
      "Operational efficiency improved by 30% across the fleet.",
      "Successfully handled a 50% increase in shipping volume during the busy season."
    ],
    highlightStats: { value: "70%", label: "Reduced System Latency" },
    techStack: ["TypeScript", "WebSockets", "Redis", "AWS"],
    award: "Logistics Innovation Award 2024",
    testimonial: "We increased our shipping volume by 50% during peak season without a single technical hiccup. Absolute reliability.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.freightflow.com"
  },
  "6": {
    title: "Minimalist Packaging Design",
    category: "Branding",
    client: "PureCloud Skincare",
    date: "November 2023",
    image: "https://images.openai.com/static-rsc-4/4vweEO0BdUaKSPRfnFbQMbRlcwikJKXL0Wp7QCakG6ZaHH9CFmB31jyUNqWLh2EADz2iF0JqKIS5PNXotk9C5IOl3TAUmrwa4KZKdPRFskxxcbt9N0xjn8rtrJVcaevKVcvQtVJzW2SE9kDyWb0vlwQ6gad4g-qxB1HozX7NVvxuGeE05rFzRCbYi2WnVchl?purpose=fullsize", // Changed to a stable Unsplash link
    overview: "PureCloud Skincare required a full brand refresh, focusing heavily on packaging design that stood out on retail shelves while resonating with high-end, eco-conscious consumers.",
    challenge: "The market is flooded with generic skincare packaging. PureCloud needed something minimalist, luxury, and fully recyclable, using unique typography and premium foil stamping techniques.",
    solution: "We designed the packaging using a unique matte soft-touch paper combined with sharp, minimalist sans-serif typography. We created a specialized box structure to reduce cardboard waste by 20%.",
    results: [
      "Product sell-through rate increased by 60% in the first quarter.",
      "Featured in 'Design Week' for innovative sustainable packaging.",
      "Brand awareness increased by 300% on social media platforms."
    ],
    highlightStats: { value: "60%", label: "Higher Sell-Through Rate" },
    techStack: ["Photoshop", "Dimension", "Illustrator", "3D Max"],
    award: "Green Packaging Design Award 2024",
    testimonial: "The packaging isn't just beautiful; it aligns perfectly with our sustainability mission. Our brand has never looked better.",
    gallery: [
      "/images/case-studies/strategy-workshop.webp",
      "/images/case-studies/workspace-efficiency.webp",
      "/images/blog/tj-blog-4.webp"
    ],
    website: "https://www.purecloudskincare.com"
  }
};

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const portfolio = portfoliosData[id as keyof typeof portfoliosData];

  if (!portfolio) {
    notFound();
  }

  const portfolioIds = Object.keys(portfoliosData);
  const currentIndex = portfolioIds.indexOf(id);
  const nextId = currentIndex < portfolioIds.length - 1 ? portfolioIds[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-white">
      
      {/* --- HERO: DARK OVERLAY & BREADCRUMB --- */}
      <section className="relative pt-32 pb-20 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/portfolios/porofolio.webp"
            alt="Business meeting background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#0B1426]/85" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight max-w-4xl mx-auto">
            {portfolio.title}
          </h1>
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/40">/</span>
            <Link href="/portfolios" className="hover:text-white transition-colors">Portfolios</Link>
            <span className="text-white/40">/</span>
            <span className="text-white">{portfolio.title}</span>
          </div>
        </div>
      </section>

      {/* --- LAYOUT 1: IMAGE LEFT, INFO RIGHT --- */}
      <section className="container mx-auto px-6 pt-20 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: LARGE LANDSCAPE IMAGE */}
          <div className="lg:col-span-7">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-sm">
              <Image 
                src={portfolio.image} 
                alt={portfolio.title} 
                fill 
                className="object-cover" 
                priority
              />
            </div>
          </div>

          {/* RIGHT COLUMN: PORTFOLIO INFORMATION SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#0B1426] mb-6 inline-block relative">
                Portfolio Information
                <span className="absolute -bottom-2 left-0 w-8 h-1 bg-blue-600 rounded-full"></span>
              </h3>

              <div className="mt-8 space-y-4 text-[15px]">
                
                <div className="grid grid-cols-[100px_20px_1fr] py-4 border-b border-gray-100">
                  <span className="text-[#0B1426] font-medium">Clients</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="text-[#0B1426]">{portfolio.client}</span>
                </div>

                <div className="grid grid-cols-[100px_20px_1fr] py-4 border-b border-gray-100">
                  <span className="text-[#0B1426] font-medium">Portfolio</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="text-[#0B1426]">{portfolio.category}</span>
                </div>

                <div className="grid grid-cols-[100px_20px_1fr] py-4 border-b border-gray-100">
                  <span className="text-[#0B1426] font-medium">Date</span>
                  <span className="text-gray-400 text-center">:</span>
                  <span className="text-[#0B1426]">{portfolio.date}</span>
                </div>

                <div className="grid grid-cols-[100px_20px_1fr] py-4">
                  <span className="text-[#0B1426] font-medium">Website</span>
                  <span className="text-gray-400 text-center">:</span>
                  <Link 
                    href={portfolio.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline truncate"
                  >
                    {portfolio.website.replace('https://', '')}
                  </Link>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- LAYOUT 2: TEXT CONTENT & HIGHLIGHTS --- */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto border-t pt-12 border-gray-100">
          
          {/* 1. Overview, Challenge, Solution */}
          <div className="space-y-12 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-4">Project Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{portfolio.overview}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-4">The Challenge</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{portfolio.challenge}</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0B1426] mb-4">Our Solution</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{portfolio.solution}</p>
            </div>
          </div>

          {/* 2. Project Highlight Stat */}
          <div className="bg-gray-50 rounded-2xl p-10 text-center border border-gray-100 mb-16">
            <span className="text-6xl md:text-7xl font-bold text-blue-600">{portfolio.highlightStats.value}</span>
            <p className="text-lg font-medium text-[#0B1426] mt-2">{portfolio.highlightStats.label}</p>
          </div>

          {/* 3. Key Results, Tech Stack, Awards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#0B1426] mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" /> Key Results
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                {portfolio.results.map((result, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span> {result}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#0B1426] mb-4 flex items-center gap-2">
                <Code2 className="h-5 w-5 text-blue-600" /> Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {portfolio.techStack.map((tech, idx) => (
                  <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
              <h4 className="font-bold text-[#0B1426] mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" /> Awards
              </h4>
              <p className="text-sm text-gray-600">{portfolio.award}</p>
            </div>
          </div>

          {/* 4. Testimonial */}
          <div className="bg-[#0B1426] rounded-2xl p-10 mb-16 text-center relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-blue-500/10 rounded-full blur-2xl" />
            <svg className="h-10 w-10 text-white/20 mx-auto mb-4" fill="currentColor" viewBox="0 0 32 32"><path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z"/></svg>
            <p className="text-white text-xl md:text-2xl leading-relaxed italic max-w-2xl mx-auto relative z-10">
              &ldquo;{portfolio.testimonial}&rdquo;
            </p>
          </div>

        </div>
      </section>

      {/* --- LAYOUT 3: GALLERY IMAGES --- */}
      <section className="container mx-auto px-6 pb-20">
        <div className="max-w-4xl mx-auto border-t pt-12 border-gray-100">
          <h2 className="text-2xl font-bold text-[#0B1426] mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolio.gallery.map((img, idx) => (
              <div key={idx} className="relative h-72 md:h-80 rounded-xl overflow-hidden shadow-sm">
                <Image 
                  src={img} 
                  alt={`Gallery ${idx + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover bg-gray-100" 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NAVIGATION BOTTOM BAR --- */}
      <section className="bg-white py-8">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between bg-gray-50/50 rounded-xl border border-gray-100 p-4 md:p-5 shadow-sm">
            <Link href="/portfolios" className="group flex items-center gap-3 text-sm font-semibold text-[#0B1426] transition-colors hover:text-blue-600">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                <span className="text-lg font-bold">←</span>
              </span>
              <span className="hidden sm:inline">Previous</span>
            </Link>

            <Link href="/portfolios" className="flex h-10 w-10 items-center justify-center rounded-lg text-blue-600 transition-colors hover:bg-blue-50">
              <LayoutGrid className="h-5 w-5" />
            </Link>

            {nextId ? (
              <Link href={`/portfolios/${nextId}`} className="group flex items-center gap-3 text-sm font-semibold text-[#0B1426] transition-colors hover:text-blue-600">
                <span className="hidden sm:inline">Next</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4 rotate-45" />
                </span>
              </Link>
            ) : (
              <div className="group flex items-center gap-3 text-sm font-semibold text-gray-400 cursor-not-allowed">
                <span className="hidden sm:inline">Next</span>
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  <ArrowUpRight className="h-4 w-4 rotate-45" />
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}