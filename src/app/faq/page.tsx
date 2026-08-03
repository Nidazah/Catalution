"use client";

import PageHero from "@/components/PageHero";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search } from "lucide-react";

const faqs = [
  {
    question: "How do consultants add value to a business?",
    answer: "Consultants bring deep expertise, fresh perspectives, and data-driven strategies to identify inefficiencies and implement tailored solutions that drive sustainable growth.",
  },
  {
    question: "How do I know if my business needs a consultant?",
    answer: "If your business is facing growth plateaus, operational bottlenecks, or needs a new strategic direction, a consultant can provide the objective insights and specialized skills necessary to overcome these challenges.",
  },
  {
    question: "How do business consultants charge for their services?",
    answer: "Consultants typically charge based on project scope, hourly rates, or long-term retainers. We offer flexible pricing models designed to align with your specific project goals and budget.",
  },
  {
    question: "Can a business consultant guarantee results?",
    answer: "While we cannot guarantee specific outcomes, we commit to delivering our best expertise, data-driven strategies, and a structured roadmap. We work closely with you to ensure our strategies are actionable.",
  },
  {
    question: "How can I measure the success of a consulting engagement?",
    answer: "Success is measured through pre-defined KPIs, ROI analysis, and post-engagement performance reviews. We establish clear metrics at the start of every project to track our progress.",
  },
];

export default function FAQPage() {
  // State to track which index is open. Null means none are open.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-[#FAFBFC] pt-20">
      <PageHero title="FAQ" />

      <div className="w-full max-w-6xl mx-auto px-6 pt-12 pb-24">

        {/* --- TOP SECTION: HEADER & SEARCH --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-[#0B1426] mb-8">
            Hi, how we <span className="text-[#1D4ED8]">support</span> you?
          </h1>
          
          <div className="flex max-w-3xl mx-auto bg-white border border-gray-300">
            <div className="flex-1 flex items-center px-4">
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Ask a question" 
                className="w-full py-3 text-[15px] outline-none bg-transparent text-[#0B1426] placeholder:text-gray-400"
              />
            </div>
            <button className="bg-[#1D4ED8] text-white font-medium px-8 py-3 hover:bg-blue-700 transition-colors text-[15px]">
              Search
            </button>
          </div>
        </div>

        {/* --- DIVIDER LINE --- */}
        <div className="w-full h-px bg-gray-200 mb-16"></div>

        {/* --- BOTTOM SECTION: 2 COLUMN LAYOUT --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* LEFT COLUMN: HEADLINE */}
          <div className="lg:col-span-5 pt-2">
            <h2 className="text-[38px] md:text-[44px] font-bold text-[#0B1426] leading-[1.15] tracking-tight">
              No matter the strategy,<br />
              we've got it handled.
            </h2>
          </div>

          {/* RIGHT COLUMN: FAQ LIST */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index} 
                faq={faq} 
                isOpen={activeIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>

        </div>
      </div>
    </main>
  );
}

// --- SINGLE FAQ ITEM COMPONENT ---
function FAQItem({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: { question: string; answer: string }; 
  isOpen: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="border border-gray-300 bg-white">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 md:py-4 md:px-5 text-left group"
      >
        <span className="font-semibold text-[15px] text-[#0B1426] pr-4">
          {faq.question}
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center">
          <Plus className={`h-5 w-5 text-[#0B1426] transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="px-4 pb-4 md:px-5 md:pb-5 pt-0">
              <p className="text-[15px] text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}