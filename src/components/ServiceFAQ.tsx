"use client";

import { useState } from "react";

const faqs = [
  { q: "How do consultants add value to a business?", a: "Consultants bring deep expertise, fresh perspectives, and data-driven strategies to identify inefficiencies and implement tailored solutions that drive sustainable growth." },
  { q: "How do I know if my business needs a consultant?", a: "If your business is facing growth plateaus, operational bottlenecks, or needs a new strategic direction, a consultant can provide the objective insights and specialized skills necessary to overcome these challenges." },
  { q: "How do business consultants charge for their services?", a: "Consultants typically charge based on project scope, hourly rates, or long-term retainers. We offer flexible pricing models designed to align with your specific project goals and budget." },
  { q: "Can a business consultant guarantee results?", a: "While we cannot guarantee specific outcomes, we commit to delivering our best expertise, data-driven strategies, and a structured roadmap. We work closely with you to ensure our strategies are actionable." },
  { q: "How can I measure the success of a consulting engagement?", a: "Success is measured through pre-defined KPIs, ROI analysis, and post-engagement performance reviews. We establish clear metrics at the start of every project to track our progress." },
];

export default function ServiceFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => (
        <div key={index} className="border border-gray-300 bg-white">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between gap-3 p-3.5 sm:p-4 md:p-5 text-left"
          >
            <span className="font-semibold text-sm sm:text-[15px] leading-snug text-navy">{faq.q}</span>
            <span className={`shrink-0 text-navy transition-transform duration-300 ${openIndex === index ? "rotate-45" : "rotate-0"}`}>
              <svg width="18" height="18" className="sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {openIndex === index && (
            <div className="px-3.5 sm:px-4 md:px-5 pb-4 pt-0">
              <p className="text-sm sm:text-[15px] text-gray-600 leading-relaxed border-t border-gray-100 pt-3">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}