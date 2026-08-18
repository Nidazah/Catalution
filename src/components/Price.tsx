"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

type PricingProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
};

export default function PricingHeader({ eyebrow, title, description }: PricingProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [plans, setPlans] = useState<Array<{
    name: string;
    monthly: string;
    yearly: string;
    features: Array<string | { text?: string }>;
  }>>([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/pricing", { cache: "no-store", signal: controller.signal })
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to load pricing")))
      .then((data) => {
        if (Array.isArray(data)) {
          setPlans(data.map((plan) => ({
            name: plan.name ?? "",
            monthly: plan.monthly ?? "",
            yearly: plan.yearly ?? "",
            features: Array.isArray(plan.features) ? plan.features : [],
          })));
        }
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  if (!plans.length && !title) return null;

  return (
    <section id="pricing" className="bg-white py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col justify-center">
            {eyebrow && (
              <div className="inline-flex w-fit items-center gap-2 rounded bg-[#FFEAD5] px-3 py-1.5 ui-sm font-semibold tracking-wide text-[#FF6B00]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="mt-4 font-poppins text-4xl md:text-5xl font-bold leading-tight tracking-tight text-[#4B1D96] whitespace-pre-line">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 max-w-lg body-lg text-gray-600 leading-relaxed">{description}</p>
            )}

            <div className="mt-8">
              <div className="relative inline-flex h-11 items-center rounded-full bg-[#4B1D96] p-1.5">
                <motion.div
                  className="absolute h-9 w-[80px] rounded-full bg-[#FF6B00]"
                  initial={false}
                  animate={{ x: billingCycle === "monthly" ? 0 : 82 }}
                />
                <button onClick={() => setBillingCycle("monthly")} className="relative z-10 flex h-full w-[80px] items-center justify-center ui-md font-semibold text-white">Monthly</button>
                <button onClick={() => setBillingCycle("yearly")} className="relative z-10 flex h-full w-[80px] items-center justify-center ui-md font-semibold text-white">Yearly</button>
              </div>
            </div>
          </div>

          <div className="relative w-full">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((plan) => (
                <motion.div key={plan.name} className="flex flex-col overflow-hidden rounded-xl bg-gradient-to-b from-[#4B1D96] to-[#2E1160] shadow-lg">
                  <div className="bg-gradient-to-r from-[#FF6B00] to-[#FB923C] px-4 py-4 text-center">
                    <span className="ui-md font-bold uppercase tracking-wider text-white">{plan.name}</span>
                  </div>
                  <div className="border-b border-white/10 px-4 py-6 text-center">
                    <span className="font-poppins text-3xl font-bold text-white">
                      {billingCycle === "monthly" ? plan.monthly : plan.yearly}
                    </span>
                    <span className="mt-1 block ui-sm uppercase tracking-wide text-white/70">
                      / {billingCycle === "monthly" ? "Month" : "Year"}
                    </span>
                  </div>
                  <ul className="flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={`${plan.name}-${index}`} className="border-b border-white/10 px-4 py-3 text-center body-sm text-white/95">
                        {typeof feature === "string" ? feature : feature.text || ""}
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-6 text-center">
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-[#FF6B00] px-6 py-2.5 ui-sm font-bold uppercase tracking-wider text-white hover:bg-[#FB923C]">
                      Subscribe
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
