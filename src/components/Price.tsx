"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function PricingHeader() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Starter",
      monthly: "$29",
      yearly: "$290",
      features: [
        { text: "1 User", included: true },
        { text: "5 Gb Disk Space", included: true },
        { text: "Email Support", included: true },
        { text: "24/7 Tech Support", included: false },
        { text: "Free Upgrades", included: false },
      ],
    },
    {
      name: "Pro",
      monthly: "$79",
      yearly: "$790",
      features: [
        { text: "5 Users", included: true },
        { text: "10 Gb Disk Space", included: true },
        { text: "Email Support", included: true },
        { text: "24/7 Tech Support", included: true },
        { text: "Free Upgrades", included: false },
      ],
    },
    {
      name: "Enterprise",
      monthly: "$199",
      yearly: "$1990",
      features: [
        { text: "10 Users", included: true },
        { text: "100 Gb Disk Space", included: true },
        { text: "Email Support", included: true },
        { text: "24/7 Tech Support", included: true },
        { text: "Free Upgrades", included: true },
      ],
    },
  ];

  return (
    <section id="pricing" className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded bg-[#FFEAD5] px-3 py-1.5 font-poppins text-xs font-semibold tracking-wide text-[#FF6B00]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
              PRICING PLAN
            </div>

            <h2 className="mt-4 font-poppins text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[#4B1D96]">
              Flexible pricing,<br />
              powerful tangible<br />
              results
            </h2>

            <p className="mt-4 max-w-lg font-inter text-base text-gray-500 leading-relaxed">
              In today's dynamic business environment, the key to success starts with a plan that scales alongside your goals.
            </p>

            {/* TOGGLE SWITCH */}
            <div className="mt-8">
              <div className="relative inline-flex h-10 items-center rounded-full bg-[#4B1D96] p-1.5 shadow-sm">

                <motion.div
                  className="absolute h-[34px] w-[80px] rounded-full bg-[#FF6B00] shadow-sm"
                  initial={false}
                  animate={{
                    x: billingCycle === "monthly" ? 0 : 82,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`relative z-10 flex h-full w-[80px] items-center justify-center font-poppins text-xs md:text-sm font-semibold transition-colors duration-200 ${
                    billingCycle === "monthly" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  Monthly
                </button>

                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative z-10 flex h-full w-[80px] items-center justify-center font-poppins text-xs md:text-sm font-semibold transition-colors duration-200 ${
                    billingCycle === "yearly" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  Yearly
                </button>
              </div>

              {billingCycle === "yearly" && (
                <p className="mt-2.5 font-inter text-xs font-medium text-[#FF6B00]">
                  Save up to 2 months with annual billing
                </p>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: PLANS */}
          <div className="relative w-full">
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
              initial={false}
              animate={{ opacity: 1 }}
            >
              {plans.map((plan) => (
                <motion.div
                  key={plan.name}
                  className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-[#4B1D96] to-[#2E1160] shadow-lg"
                >
                  {/* Header strip — brand gradient */}
                  <div className="bg-gradient-to-r from-[#FF6B00] to-[#FB923C] px-4 py-4 text-center">
                    <span className="font-poppins text-xs font-bold uppercase tracking-wider text-white">
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="border-b border-white/10 px-4 py-6 text-center">
                    <motion.div
                      key={billingCycle + plan.name}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <span className="font-poppins text-3xl font-bold text-white">
                        {billingCycle === "monthly" ? plan.monthly : plan.yearly}
                      </span>
                    </motion.div>
                    <span className="mt-1 block font-inter text-[11px] uppercase tracking-wide text-white/50">
                      / {billingCycle === "monthly" ? "Month" : "Year"}
                    </span>
                  </div>

                  {/* Features */}
                  <ul className="flex-1">
                    {plan.features.map((f) => (
                      <li
                        key={f.text}
                        className={`border-b border-white/10 px-4 py-3 text-center font-inter text-xs ${
                          f.included ? "text-white/90" : "text-white/30 line-through"
                        }`}
                      >
                        {f.text}
                      </li>
                    ))}
                  </ul>

                  {/* CTA — primary button style from brand guide: solid, 12px radius */}
                  <div className="px-4 py-6 text-center">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-2.5 font-poppins text-[11px] font-bold uppercase tracking-wider text-white transition-colors duration-200 hover:bg-[#FB923C]"
                    >
                      Subscribe
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}