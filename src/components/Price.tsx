"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function PricingHeader() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  // Replace these with your actual pricing data
  const plans = [
    { name: "Starter", monthly: "$29", yearly: "$290", features: ["Feature 1", "Feature 2"] },
    { name: "Pro", monthly: "$79", yearly: "$790", features: ["Feature A", "Feature B"] },
    { name: "Enterprise", monthly: "$199", yearly: "$1990", features: ["Feature X", "Feature Y"] },
  ];

  return (
    <section id="pricing" className="bg-white py-16 md:py-20 overflow-hidden"> {/* ⬇️ Shrunk vertical padding */}
      <div className="mx-auto max-w-7xl px-6">
        
        {/* SPLIT INTO 2 COLUMNS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"> {/* ⬇️ Tightened gap & items-center for vertical alignment */}
          
          {/* LEFT COLUMN: STATIC */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded bg-blue-50 px-3 py-1.5 text-[10px] md:text-xs font-semibold tracking-wide text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
              PRICING PLAN
            </div>

            {/* ⬇️ Shrunk Title */}
            <h1 className="mt-4 font-display text-3xl md:text-4xl lg:text-5xl font-bold text-[#0B1426] leading-[1.1] tracking-tight">
              Flexible pricing,<br />
              powerful tangible<br />
              results
            </h1>

            {/* ⬇️ Shrunk Paragraph */}
            <p className="mt-4 max-w-lg text-sm md:text-base text-gray-500 leading-relaxed">
              In today's dynamic business environment, the key to success strategics..
            </p>

            {/* TOGGLE SWITCH - Stays on the left */}
            {/* ⬇️ Compressed the toggle slightly */}
            <div className="mt-8">
              <div className="relative inline-flex h-12 items-center rounded-full bg-[#0B1426] p-1.5 shadow-sm">
                
                <motion.div
                  className="absolute h-[38px] w-[90px] rounded-full bg-blue-600 shadow-sm"
                  initial={false}
                  animate={{
                    x: billingCycle === "monthly" ? 0 : 92,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative z-10 flex h-full w-[90px] items-center justify-center text-xs md:text-sm font-semibold transition-colors duration-200 ${
                    billingCycle === "monthly" ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative z-10 flex h-full w-[90px] items-center justify-center text-xs md:text-sm font-semibold transition-colors duration-200 ${
                    billingCycle === "yearly" ? "text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SCROLLS WITH THE PAGE */}
          <div className="relative w-full">
            {/* 
               Reduced the Y-translation motion dramatically.
               This keeps the cards tightly packed inside the screen height.
            */}
            <motion.div
              className="flex flex-col gap-4"
              initial={false}
              animate={{ 
                y: billingCycle === "monthly" ? 0 : -160 // ⬇️ COMPRESSED from -500 to -160
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {plans.map((plan, i) => (
                <div 
                  key={plan.name} 
                  className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm" // ⬇️ Shrunk inner padding
                >
                  {/* ⬇️ Shrunk Plan Title */}
                  <h3 className="font-display text-lg md:text-xl font-bold text-[#0B1426]">
                    {plan.name}
                  </h3>
                  
                  {/* ⬇️ Shrunk Price */}
                  <div className="mt-3">
                    <span className="text-3xl md:text-4xl font-bold text-[#0B1426]">
                      {billingCycle === "monthly" ? plan.monthly : plan.yearly}
                    </span>
                    <span className="text-gray-500 ml-1 text-sm">
                      / {billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </div>

                  {/* ⬇️ Shrunk Features list */}
                  <ul className="mt-4 space-y-2 text-sm text-gray-500">
                    {plan.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}