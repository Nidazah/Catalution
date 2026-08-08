"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Check } from "lucide-react";

import PageHero from "@/components/PageHero";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Basic",
      price: 19,
      description: "Save 20% offer of consulting 93K clients.",
      features: [
        "In-Depth consultation",
        "Standard business",
        "Quick email support",
        "Monthly check-in",
        "Progress reviews",
      ],
      disabledFeatures: ["Flexible support", "24/7 support"],
      buttonText: "Chose package",
      isPopular: false,
    },
    {
      name: "Business",
      price: 49,
      description: "Save 20% offer of consulting 93K clients.",
      features: [
        "In-Depth consultation",
        "Standard business",
        "Quick email support",
        "Monthly check-in",
        "Progress reviews",
        "Flexible support",
        "24/7 support",
      ],
      disabledFeatures: [],
      buttonText: "Chose package",
      isPopular: true,
    },
    {
      name: "Enterprise",
      price: 99,
      description: "Save 20% offer of consulting 93K clients.",
      features: [
        "In-Depth consultation",
        "Standard business",
        "Quick email support",
        "Monthly check-in",
        "Progress reviews",
      ],
      disabledFeatures: ["Flexible support", "24/7 support"],
      buttonText: "Chose package",
      isPopular: false,
    },
  ];

  // Pagination state (ready if you want to paginate pricing cards)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Shows all cards on one page
  const totalPages = Math.ceil(plans.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      
      {/* --- TOP HERO SECTION --- */}
      <PageHero 
        title="Pricing plan" 
        imageSrc="/images/portfolios/porofolio.webp" 
      />

      {/* --- LOWER SECTION: PRICING TIERS --- */}
      <section className="bg-[#F5F7FA] py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-6">
          
          {/* HEADER ROW: Left Text + Right Checkmarks */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-12 md:mb-16">
            
            {/* Left Column */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-accent">
                <span className="h-1 w-1 rounded-full bg-accent" /> PRICING PLAN <span className="h-1 w-1 rounded-full bg-accent" />
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-navy leading-[1.1]">
                Our Pricing Tiers
              </h2>
              <p className="text-gray-600 text-sm md:text-base max-w-md">
                Our mission is to empoiwers businesses off all size to thrive in an businesses ever changing marketplace.
              </p>

              {/* Toggle Button - Exact Bright Blue Style */}
              <div className="mt-6 inline-flex items-center rounded-full bg-navy p-1.5">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingCycle === "monthly"
                      ? "bg-accent text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-8 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    billingCycle === "yearly"
                      ? "bg-accent text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-gray-600 text-sm md:text-base">
                Our mission is to empoiwers businesses off all size to thrive in an businesses ever changing marketplace. We are committed to the delivering exceptional in the value through our strategic inset, innovative.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  "Discover our expertise",
                  "Journey and commitment to explained",
                  "Meet our team and learn"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-navy">
                    <Check className="h-5 w-5 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* PRICING CARDS GRID */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.isPopular
                    ? "bg-accent text-white shadow-xl shadow-accent/20"
                    : "bg-orange-100 text-navy"
                }`}
              >
                {/* Recommended Badge - Sharp angled ribbon */}
                {plan.isPopular && (
                  <div className="absolute -top-[1px] right-8 z-10">
                    <div className="bg-navy text-white text-[10px] font-bold px-4 py-1.5 rounded-t-md shadow-md">
                      Recommended
                    </div>
                    {/* Small sharp angled triangle at the bottom left of the badge */}
                    <div className="absolute -bottom-[6px] left-0 w-0 h-0 border-l-[6px] border-l-navy border-t-[6px] border-t-transparent" />
                  </div>
                )}

                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                
                <div className="flex items-baseline gap-1 mt-2 mb-4">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={`text-sm ${plan.isPopular ? "text-orange-100" : "text-gray-500"}`}>/month</span>
                </div>

                <p className={`text-sm mb-6 ${plan.isPopular ? "text-orange-100" : "text-gray-500"}`}>
                  {plan.description}
                </p>

                <div className={`h-px w-full mb-6 ${plan.isPopular ? "bg-orange-300/40" : "bg-gray-300"}`} />

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <CheckCircle className={`h-5 w-5 shrink-0 mt-0.5 ${plan.isPopular ? "text-white" : "text-accent"}`} />
                      {feature}
                    </li>
                  ))}
                  {plan.disabledFeatures.map((feature, i) => (
                    <li key={`disabled-${i}`} className="flex items-start gap-3 text-sm text-gray-400">
                      <CheckCircle className="h-5 w-5 shrink-0 mt-0.5 text-gray-300" />
                      <span className="line-through">{feature}</span>
                    </li>
                  ))}
                </ul>

                <motion.div whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className={`w-full flex items-center justify-center gap-2 rounded-full py-3.5 text-sm font-semibold transition-colors ${
                      plan.isPopular
                        ? "bg-white text-accent hover:bg-gray-100"
                        : "bg-navy text-white hover:bg-navy-ink"
                    }`}
                  >
                    {plan.buttonText} <ArrowRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* --- PAGINATION WITH ARROWS ON BOTH SIDES --- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
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
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
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
                ),
              )}

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
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}