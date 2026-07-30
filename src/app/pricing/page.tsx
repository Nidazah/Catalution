"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses and startups.",
      monthly: 29,
      yearly: 290,
      features: [
        "Up to 10 team members",
        "Basic analytics dashboard",
        "Email support",
        "1 project included",
      ],
      buttonText: "Get Started",
    },
    {
      name: "Professional",
      description: "Best for growing teams and mid-sized companies.",
      monthly: 79,
      yearly: 790,
      features: [
        "Up to 50 team members",
        "Advanced analytics & reporting",
        "Priority email & chat support",
        "10 projects included",
        "API access",
      ],
      buttonText: "Get Started",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations.",
      monthly: 199,
      yearly: 1990,
      features: [
        "Unlimited team members",
        "Custom integrations & workflows",
        "Dedicated account manager",
        "Unlimited projects",
        "24/7 phone support",
      ],
      buttonText: "Contact Sales",
    },
  ];

  return (
    <main className="min-h-screen bg-white flex items-center justify-center pt-20 pb-6 md:pb-4">
      <div className="w-full max-w-7xl px-6 py-6 md:py-8">
        
        {/* --- HEADER with Staggered Animation --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-10"
        >
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded bg-blue-50 px-3 py-1.5 text-xs font-semibold tracking-wide text-blue-600"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
            PRICING PLAN
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
            className="mt-4 font-display text-4xl md:text-5xl font-bold text-[#0B1426] leading-[1.1]"
          >
            Choose your plan
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-3 text-gray-600 text-sm md:text-base max-w-xl mx-auto"
          >
            Simple, transparent pricing that grows with you. Try any plan free for 30 days.
          </motion.p>

          {/* --- BILLING TOGGLE --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="mt-6 inline-flex items-center gap-4 bg-gray-50 p-1.5 rounded-full border border-gray-200"
          >
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-white text-[#0B1426] shadow-sm"
                  : "text-gray-500 hover:text-[#0B1426]"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                billingCycle === "yearly"
                  ? "bg-white text-[#0B1426] shadow-sm"
                  : "text-gray-500 hover:text-[#0B1426]"
              }`}
            >
              Yearly <span className="text-[10px] text-green-600 font-medium">Save 20%</span>
            </button>
          </motion.div>
        </motion.div>

        {/* --- PRICING GRID with Staggered Children & Price Animation --- */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
              }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0px 20px 40px -10px rgba(0,0,0,0.1)",
                transition: { duration: 0.2 } 
              }}
              className={`relative rounded-2xl p-8 border ${
                plan.popular
                  ? "border-blue-600 shadow-xl bg-blue-50/30"
                  : "border-gray-200 bg-white shadow-sm"
              } flex flex-col`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  Most Popular
                </motion.span>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-[#0B1426]">{plan.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
              </div>

              {/* Animated Price */}
              <div className="mb-6 relative h-[60px] flex items-end">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billingCycle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute left-0"
                  >
                    <span className="text-5xl font-bold text-[#0B1426]">
                      ${billingCycle === "monthly" ? plan.monthly : plan.yearly}
                    </span>
                    <span className="text-gray-500 ml-1 text-sm">
                      / {billingCycle === "monthly" ? "mo" : "yr"}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + (i * 0.05) }}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    {feature}
                  </motion.li>
                ))}
              </ul>

              {/* Button */}
              <motion.div whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-[#0B1426] hover:bg-[#1a253f] text-white"
                  }`}
                >
                  {plan.buttonText} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
}