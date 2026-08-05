"use client";

import { useState } from "react";
import { ArrowUp, Send, ShieldCheck } from "lucide-react";

/* ---------- inline social icons (lucide dropped brand logos) ---------- */
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.4 3.66 15.4 3.57 14.24 3.57c-2.4 0-4.05 1.47-4.05 4.16v2.16H7.5v3.1h2.69V21h3.31z" />
    </svg>
  );
}
function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...props}
    >
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.5 6.4c-.6.28-1.24.46-1.9.55a3.3 3.3 0 0 0 1.46-1.83 6.6 6.6 0 0 1-2.1.8 3.3 3.3 0 0 0-5.63 3A9.36 9.36 0 0 1 5.3 5.6a3.3 3.3 0 0 0 1.02 4.4 3.28 3.28 0 0 1-1.5-.4v.04a3.3 3.3 0 0 0 2.65 3.24c-.4.1-.83.15-1.27.06a3.3 3.3 0 0 0 3.08 2.29A6.62 6.62 0 0 1 4.5 16.6a9.3 9.3 0 0 0 5.04 1.48c6.05 0 9.36-5.02 9.36-9.36 0-.14 0-.28-.01-.42a6.7 6.7 0 0 0 1.64-1.7 6.5 6.5 0 0 1-1.9.52z" />
    </svg>
  );
}
function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 8.5H4.1V19h2.84V8.5zM5.52 3.5a1.65 1.65 0 1 0 0 3.3 1.65 1.65 0 0 0 0-3.3zM20 19v-5.8c0-3.1-1.66-4.55-3.87-4.55-1.78 0-2.58.98-3.03 1.66V8.5H10.3c.04.8 0 10.5 0 10.5h2.8v-5.86c0-.31.02-.63.11-.85.25-.63.8-1.28 1.74-1.28 1.23 0 1.72.94 1.72 2.31V19H20z" />
    </svg>
  );
}

const socials = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://facebook.com/solvior",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://instagram.com/solvior",
  },
  { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com/solvior" },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/company/solvior",
  },
];

const resources = [
  { name: "Contact us", href: "/contact" },
  { name: "Privacy policy", href: "/" },
  { name: "Recognitions", href: "/" },
  { name: "Careers", href: "/careers" },
  { name: "Blog", href: "/blog" },
  { name: "Feedback", href: "/feedback" },
  { name: "Error 404", href: "/404" },
];

const services = [
  { name: "Strategic planning", href: "/services" },
  { name: "Market research", href: "/services" },
  { name: "Business process", href: "/services" },
  { name: "Financial management", href: "/services" },
  { name: "Change management", href: "/services" },
  { name: "IT consulting", href: "/services" },
  { name: "Leadership", href: "/services" },
];

export default function FooterV2() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    // You can add your newsletter API call here
  };

  return (
    <footer className="relative bg-[var(--color-section)]">
      <div className="mx-auto max-w-7xl px-6 py-20 grid gap-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
        {/* Brand + social */}
        <div>
          <a href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <span className="h-3 w-3 rounded-full bg-white" />
            </span>
            <span className="font-display text-2xl font-bold text-[var(--color-heading)]">
              Sol<span className="font-serif italic font-normal">vior</span>
            </span>
          </a>

          <p className="mt-6 max-w-xs text-sm leading-relaxed text-[var(--color-body)]">
            Our mission is to empower businesses of all sizes to thrive in an
            ever changing marketplace.
          </p>

          <h4 className="mt-8 font-display text-base font-bold text-[var(--color-heading)]">
            Follow Us:
          </h4>
          <div className="mt-4 flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C7CFDA] text-white transition-colors hover:bg-[var(--color-accent)]"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-display text-lg font-bold text-[var(--color-heading)]">
            Resources
          </h4>
          <ul className="mt-6 space-y-4">
            {resources.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-body)] transition-colors hover:text-[var(--color-navy)]"
                >
                  {r.name}
                  {r.name === "Careers" && (
                    <span className="rounded bg-[var(--color-accent)] px-1.5 py-0.5 text-xs font-bold uppercase text-white">
                      New
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-lg font-bold text-[var(--color-heading)]">
            Services
          </h4>
          <ul className="mt-6 space-y-4">
            {services.map((s) => (
              <li key={s.name}>
                <a
                  href={s.href}
                  className="text-sm text-[var(--color-body)] transition-colors hover:text-[var(--color-navy)]"
                >
                  {s.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="font-display text-2xl font-bold leading-snug text-[var(--color-heading)]">
            Subscribe to our newsletter
          </h4>
          <form
            onSubmit={handleSubscribe}
            className="mt-6 flex items-center gap-2 rounded-xl border border-[var(--color-line)] bg-white p-1.5 pl-4 shadow-sm"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full bg-transparent text-sm text-[var(--color-heading)] placeholder:text-[var(--color-body)] focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-[var(--color-navy)]">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#B7C4D6]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-white" />
            <span>Trusted partner in business excellence</span>
          </div>
          <div>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Solvior</span> All right
            reserved.
          </div>
          <div className="flex items-center gap-3">
            <a href="/privacy" className="hover:text-white transition-colors">
              Policy &amp; privacy
            </a>
            <span>•</span>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms &amp; conditions
            </a>
          </div>
        </div>
      </div>

      {/* Go-to-top pill */}
      <a
        href="#top"
        aria-label="Go to top"
        className="group fixed bottom-8 right-6 z-40 flex flex-col items-center gap-1 rounded-full bg-white px-2 py-4 shadow-[0_10px_30px_-10px_rgba(10,37,64,0.35)] transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:bg-[var(--color-navy)] hover:shadow-[0_15px_35px_-10px_rgba(10,37,64,0.6)]"
      >
        <ArrowUp className="h-4 w-4 text-[var(--color-navy)] transition-colors duration-300 group-hover:text-white" />
        <span
          className="font-display text-[10px] font-bold tracking-widest text-[var(--color-navy)] transition-colors duration-300 group-hover:text-white"
          style={{ writingMode: "vertical-rl" }}
        >
          GO TOP
        </span>
      </a>
    </footer>
  );
}
