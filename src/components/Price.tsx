"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface PriceProps {
  eyebrow?: string; title?: string; description?: string;
  cmsSettings?: { monthlyLabel?: string; yearlyLabel?: string; yearlySavingsText?: string; plans?: Array<{name:string;monthly:string;yearly:string;features?:Array<string|{text?:string}>;buttonLabel?:string;buttonUrl?:string}> };
}

export default function PricingHeader({ eyebrow, title, description, cmsSettings }: PriceProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const fallbackPlans = [
    { name: "Starter", monthly: "$29", yearly: "$290", features: ["1 User", "5 Gb Disk Space", "Email Support"] },
    { name: "Pro", monthly: "$79", yearly: "$790", features: ["5 Users", "10 Gb Disk Space", "Email Support", "24/7 Tech Support"] },
    { name: "Enterprise", monthly: "$199", yearly: "$1990", features: ["10 Users", "100 Gb Disk Space", "Email Support", "24/7 Tech Support", "Free Upgrades"] },
  ];
  const [plans, setPlans] = useState<Array<{
    name: string;
    monthly: string;
    yearly: string;
    features?: Array<string | { text?: string }>;
    buttonLabel?: string;
    buttonUrl?: string;
  }>>(cmsSettings?.plans?.length ? cmsSettings.plans : fallbackPlans);

  useEffect(() => {
    let cancelled = false;
    if (cmsSettings?.plans?.length) return;
    fetch("/api/pricing", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to load pricing"))))
      .then((data) => {
        if (cancelled || !Array.isArray(data) || data.length === 0) return;
        setPlans(data.map((plan) => ({
          name: plan.name,
          monthly: plan.monthly,
          yearly: plan.yearly,
          features: Array.isArray(plan.features) ? plan.features : [],
          buttonLabel: plan.buttonLabel || "",
          buttonUrl: plan.buttonUrl || "",
        })));
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, []);

  return (
    <section id="pricing" className="bg-[var(--color-bg)] py-16 md:py-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="flex flex-col justify-center">
            <div className="inline-flex w-fit items-center gap-2 rounded bg-[var(--color-orange-100)] px-3 py-1.5 font-poppins text-xs font-semibold tracking-wide text-[var(--color-accent)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
              {eyebrow || "PRICING PLAN"}
            </div>

            <h2 className="mt-4 font-poppins text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight text-[var(--color-purple-900)]">
              {title || (
                <>
                  Flexible pricing,<br />
                  powerful tangible<br />
                  results
                </>
              )}
            </h2>

            <p className="mt-4 max-w-lg font-inter text-base text-[var(--color-body)] leading-relaxed">
              {description || "In today's dynamic business environment, the key to success starts with a plan that scales alongside your goals."}
            </p>

            {/* TOGGLE SWITCH */}
            <div className="mt-8">
              <div className="relative inline-flex h-10 items-center rounded-full bg-[var(--color-purple-900)] p-1.5 shadow-sm">

                <motion.div
                  className="absolute h-[34px] w-[80px] rounded-full bg-[var(--color-accent)] shadow-sm"
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
                  {cmsSettings?.monthlyLabel || "Monthly"}
                </button>

                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`relative z-10 flex h-full w-[80px] items-center justify-center font-poppins text-xs md:text-sm font-semibold transition-colors duration-200 ${
                    billingCycle === "yearly" ? "text-white" : "text-white/50 hover:text-white/80"
                  }`}
                >
                  {cmsSettings?.yearlyLabel || "Yearly"}
                </button>
              </div>

              {billingCycle === "yearly" && (
                <p className="mt-2.5 font-inter text-xs font-medium text-[var(--color-accent)]">
                  {cmsSettings?.yearlySavingsText || "Save up to 2 months with annual billing"}
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
                  className="flex flex-col overflow-hidden rounded-xl shadow-lg"
                  style={{ background: "linear-gradient(to bottom, var(--color-purple-900), color-mix(in srgb, var(--color-purple-900) 68%, #000000 32%))" }}
                >
                  {/* Header strip — brand gradient */}
                  <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-orange-700)] px-4 py-4 text-center">
                    <span className="font-poppins text-xs font-bold uppercase tracking-wider text-white">
                      {plan.name}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="border-b px-4 py-6 text-center" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
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
                    {(plan.features || []).map((feature, index) => (
                      <li
                        key={`${plan.name}-${index}`}
                        className="border-b border-white/10 px-4 py-3 text-center font-inter text-xs text-white/90"
                      >
                        {typeof feature === "string" ? feature : feature.text || ""}
                      </li>
                    ))}
                  </ul>

                  {/* CTA — primary button style from brand guide: solid, 12px radius */}
                  <div className="px-4 py-6 text-center">
                    <Link
                      href={plan.buttonUrl || "/contact"}
                      className="inline-flex items-center justify-center rounded-xl bg-[var(--cms-button-secondary-bg)] px-6 py-2.5 font-poppins text-[11px] font-bold uppercase tracking-wider text-[var(--cms-button-secondary-text)] transition-colors duration-200 hover:bg-[var(--cms-button-secondary-hover-bg)] hover:text-[var(--cms-button-secondary-hover-text)]"
                      style={{ borderColor: "var(--cms-button-secondary-border)", borderWidth: "1px", borderStyle: "solid" }}
                    >
                      {plan.buttonLabel || "Subscribe"}
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