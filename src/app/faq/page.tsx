"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services does Solvior offer?",
    answer: "Solvior offers a wide range of services including Business Process Optimization, Strategic Planning & Execution, Leadership Executive Coaching, Legacy Leadership Institute, Executive Growth Solutions, and Empowered Leadership Journey. We tailor our solutions to meet the unique needs of your business."
  },
  {
    question: "How do I get started with your services?",
    answer: "Getting started is simple! Just click the 'Get a Quote' button in the top right corner, fill out our contact form, and one of our expert consultants will reach out to you within 24 hours to schedule a free consultation."
  },
  {
    question: "What industries do you specialize in?",
    answer: "We have extensive experience working across multiple industries including Technology, Finance, Healthcare, Retail, Manufacturing, and Non-Profit sectors. Our team adapts our proven methodologies to fit the specific challenges of your industry."
  },
  {
    question: "How long does a typical consulting engagement last?",
    answer: "Engagement duration varies based on your specific needs. Short-term projects can be completed in 4-6 weeks, while comprehensive strategic transformations can span 6-12 months. We work with you to create a timeline that fits your goals."
  },
  {
    question: "Do you offer remote consulting services?",
    answer: "Absolutely. We offer fully remote, hybrid, and on-site consulting options to accommodate your team's preferences. Our digital collaboration tools ensure seamless communication regardless of your location."
  },
  {
    question: "What is your pricing model?",
    answer: "Our pricing is flexible and project-based, tailored to the scope and complexity of your engagement. We offer fixed-rate projects, hourly consulting, and long-term retainer options. We also provide a free initial consultation to discuss your budget and goals."
  }
];

export default function FAQPage() {
  // State to track which index is open. Null means none are open.
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    // If clicking the already open one, close it. Otherwise, open the new one.
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    // FIX: same padding issue as the other inner pages — dropped the
    // forced vertical centering and gave it real top/bottom padding.
    <main className="min-h-screen bg-white">
      <div className="w-full max-w-7xl mx-auto px-6 pt-28 pb-16 md:pt-36 md:pb-20">

        {/* --- HEADER SECTION --- */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-flex items-center gap-2 rounded bg-[#0B1426] px-3 py-1.5 text-xs font-semibold tracking-wide text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            FAQ
          </span>
          <h1 className="mt-4 font-display text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]">
            Frequently asked questions
          </h1>
          <p className="mt-3 text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Find answers to the most common questions about our services, process, and how we can help your business thrive.
          </p>
        </div>

        {/* --- FAQ GRID (2 Columns) --- */}
        {/* FIX: added items-start — grid rows default to align-items:
            stretch, so an open card's neighbor in the same row was
            stretching to match its expanded height, leaving a big empty
            gap. items-start makes each card size to its own content. */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-6xl mx-auto items-start">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              faq={faq} 
              isOpen={activeIndex === index} // Check if this specific item is active
              onToggle={() => toggleFAQ(index)} // Pass the toggle function
            />
          ))}
        </div>
      </div>
    </main>
  );
}

// --- SINGLE FAQ ITEM COMPONENT ---
// We pass 'isOpen' and 'onToggle' as props from the parent
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left"
      >
        <span className="font-semibold text-[15px] md:text-base text-[#0B1426] pr-4">
          {faq.question}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 transition-colors duration-300">
          {isOpen ? (
            <Minus className="h-4 w-4 text-[#0B1426]" />
          ) : (
            <Plus className="h-4 w-4 text-[#0B1426]" />
          )}
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 md:px-6 md:pb-6 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}