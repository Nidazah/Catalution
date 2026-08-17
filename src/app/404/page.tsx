import PageHero from "@/components/PageHero";
import Image from "next/image";
import Link from "next/link";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-white">
      
            <PageHero title="About Us" />

      {/* --- SECTION 2: WHITE ERROR CONTENT (Illustration & Text) --- */}
      <section className="bg-white py-16 md:py-24 flex flex-col items-center justify-center px-6 flex-1">
        
        {/* Big 404 Illustration with Clouds (Using CSS/SVG to mimic your screenshot) */}
        <div className="relative w-full max-w-md mx-auto text-accent mb-8">
          {/* Decorative Clouds below the numbers */}
          <svg viewBox="0 0 200 80" className="w-full h-auto">
             {/* Sea of Clouds */}
            <path d="M10,60 Q20,40 40,50 Q50,30 70,45 Q80,25 100,40 Q110,20 130,35 Q140,15 160,30 Q170,20 190,40 L190,80 L10,80 Z" fill="currentColor" className="opacity-20"/>
            <path d="M20,70 Q35,50 60,60 Q70,40 90,55 Q100,35 120,50 Q130,30 150,45 Q160,35 180,50 L180,80 L20,80 Z" fill="currentColor" className="opacity-40"/>
            {/* Birds */}
            <path d="M130,10 Q135,5 140,10 Q145,5 150,10" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M110,15 Q115,10 120,15 Q125,10 130,15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          
          {/* Huge 404 Numbers on top */}
          <h1 className="absolute inset-0 flex items-center justify-center text-8xl md:text-9xl font-black text-accent leading-none tracking-tighter bg-transparent z-10 select-none">
            404
          </h1>
        </div>

        {/* Error Text */}
        <h2 className="text-3xl md:text-4xl font-bold text-navy text-center mb-2">
          Opps! Page not found
        </h2>
        <p className="text-gray-500 text-center max-w-lg text-sm md:text-base">
          Page does not exist or some other error occurred. Go to our Home Page
        </p>

        {/* ✅ Replaced Button component with native Next.js Link + CSS classes */}
        <Link
          href="/"
          className="btn btn-primary shadow-md transition-transform hover:scale-[1.03]"
        >
          Go back to home page
        </Link>
      </section>
    </div>
  );
}