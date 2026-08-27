"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp, Globe, Send, ShieldCheck } from "lucide-react";

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

/* Map social labels → icon components (used when CMS items omit `icon`) */
const socialIconByLabel: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Twitter: TwitterIcon,
  LinkedIn: LinkedinIcon,
  Linkedin: LinkedinIcon,
};

function getSocialIcon(
  s: { label: string; href: string; icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> }
): React.ComponentType<React.SVGProps<SVGSVGElement>> {
  if (s.icon) return s.icon;
  return socialIconByLabel[s.label] ?? Globe;
}

const socials = [
  {
    icon: FacebookIcon,
    label: "Facebook",
    href: "https://facebook.com/catalution",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    href: "https://instagram.com/catalution",
  },
  { icon: TwitterIcon, label: "Twitter", href: "https://twitter.com/catalution" },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    href: "https://linkedin.com/company/catalution",
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
  const [layout, setLayout] = useState<{
    description?: string;
    newsletterTitle?: string;
    copyright?: string;
    logo?: string;
    followLabel?: string; resourcesTitle?: string; servicesTitle?: string; newsletterPlaceholder?: string; trustedText?: string; privacyLabel?: string; termsLabel?: string; privacyUrl?: string; termsUrl?: string;
    brandName?: string;
    privacyVisible?: boolean;
    termsVisible?: boolean;
    newsletterButtonVisible?: boolean;

    social?: Array<{
      label: string;
      href: string;
      visible?: boolean;
    }>;

    socialShape?: "circle" | "rounded" | "square";

    resources?: Array<{
      label: string;
      href: string;
      badge?: string;
      visible?: boolean;
    }>;

    services?: Array<{
      label: string;
      href: string;
      visible?: boolean;
    }>;

    goTop?: {
      enabled?: boolean;
      label?: string;
      target?: string;
      backgroundColor?: string;
      textColor?: string;
      iconColor?: string;
    };
  }>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-settings?key=LAYOUT", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!cancelled && payload?.data?.footer) setLayout(payload.data.footer);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribing email:", email);
    setEmail("");
    // You can add your newsletter API call here
  };

  const socialRadius =
    layout.socialShape === "square" ? "6px" : layout.socialShape === "rounded" ? "12px" : "9999px";

  const resourceLinks =
    layout.resources?.length
      ? layout.resources.filter((r) => r.visible !== false).map((r) => ({ name: r.label, href: r.href, badge: r.badge }))
      : resources.map((r) => ({ name: r.name, href: r.href, badge: r.name === "Careers" ? "New" : undefined }));

  const serviceLinks =
    layout.services?.length
      ? layout.services.filter((s) => s.visible !== false).map((s) => ({ name: s.label, href: s.href }))
      : services;

  return (
    <footer className="relative" style={{backgroundColor:"var(--cms-footer-bg, var(--color-section))"}}>
      <div className="mx-auto max-w-7xl px-6 grid gap-12 md:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]" style={{paddingTop:"var(--cms-footer-pt, 80px)",paddingBottom:"var(--cms-footer-pb, 80px)"}}>
        {/* Brand + social */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src={layout.logo || "/images/Logo/icon-mark.webp"}
              alt="Catalution"
              width={36}
              height={38}
              className="h-9 w-auto"
            />
            <span className="font-display text-2xl font-bold" style={{color:"var(--cms-footer-heading, var(--color-heading))"}}>
              {layout.brandName || "Catalution"}
            </span>
          </Link>

          <p className="mt-6 max-w-xs text-sm leading-relaxed" style={{color:"var(--cms-footer-text, var(--color-body))"}}>
            {layout.description || "Our mission is to empower businesses of all sizes to thrive in an ever changing marketplace."}
          </p>

          <h4 className="mt-8 font-display text-base font-bold" style={{color:"var(--cms-footer-heading, var(--color-heading))"}}>
            {layout.followLabel || "Follow Us:"}
          </h4>
          <div className="mt-4 flex gap-3">
            {(layout.social?.length ? layout.social.filter((s) => s.visible !== false) : socials).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                /* ✅ UPDATED HOVER COLOR TO LIGHT PURPLE */
                className="flex h-9 w-9 items-center justify-center bg-[var(--color-purple-300)] text-white transition-colors hover:bg-[var(--color-purple-300)] hover:text-white"
                style={{ borderRadius: socialRadius }}
              >
                {(() => {
                  const Icon = getSocialIcon(s);
                  return <Icon className="h-4 w-4" />;
                })()}
              </a>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-display text-lg font-bold" style={{color:"var(--cms-footer-heading, var(--color-heading))"}}>
            {layout.resourcesTitle || "Resources"}
          </h4>
          <ul className="mt-6 space-y-4">
            {resourceLinks.map((r) => (
              <li key={r.name}>
                <a
                  href={r.href}
                  className="inline-flex items-center gap-2 text-sm text-[var(--color-body)] transition-colors hover:text-[var(--color-navy)]"
                >
                  {r.name}
                  {r.badge && (
                    <span className="rounded bg-[var(--color-accent)] px-1.5 py-0.5 text-xs font-bold uppercase text-white">
                      {r.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-lg font-bold" style={{color:"var(--cms-footer-heading, var(--color-heading))"}}>
            {layout.servicesTitle || "Services"}
          </h4>
          <ul className="mt-6 space-y-4">
            {serviceLinks.map((s) => (
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
          <h4 className="font-display text-2xl font-bold leading-snug" style={{color:"var(--cms-footer-heading, var(--color-heading))"}}>
            {layout.newsletterTitle || "Subscribe to our newsletter"}
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
              placeholder={layout.newsletterPlaceholder || "Enter email"}
              className="w-full bg-transparent text-sm text-[var(--color-heading)] placeholder:text-[var(--color-body)] focus:outline-none"
            />
            {layout.newsletterButtonVisible !== false && <button
              type="submit"
              aria-label="Subscribe"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white transition-transform hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </button>}
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="" style={{backgroundColor:"var(--cms-footer-bottom, var(--color-navy))"}}>
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <div className="flex items-center gap-2" style={{color:"var(--cms-footer-bottom-text, var(--color-purple-100))"}}>
            <ShieldCheck className="h-4 w-4 text-white" />
            <span>{layout.trustedText || "Trusted partner in business excellence"}</span>
          </div>
          <div>
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold text-white">Catalution</span> {layout.copyright || "All right reserved."}
          </div>
          <div className="flex items-center gap-3">
            {layout.privacyVisible !== false && (
              <a href={layout.privacyUrl || "/privacy"} className="hover:text-white transition-colors">
                {layout.privacyLabel || "Policy & privacy"}
              </a>
            )}
            {layout.privacyVisible !== false && layout.termsVisible !== false && <span>•</span>}
            {layout.termsVisible !== false && (
              <a href={layout.termsUrl || "/terms"} className="hover:text-white transition-colors">
                {layout.termsLabel || "Terms & conditions"}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Go-to-top pill — controlled from Theme Settings */}
      {layout.goTop?.enabled !== false && (
        <a
          href={layout.goTop?.target || "#top"}
          aria-label={layout.goTop?.label || "Go to top"}
          className="group fixed bottom-8 right-6 z-40 flex flex-col items-center gap-1 rounded-full px-2 py-4 shadow-[0_10px_30px_-10px_rgba(10,37,64,0.35)] transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(10,37,64,0.6)]"
          style={{ backgroundColor: layout.goTop?.backgroundColor || "#ffffff" }}
        >
          <ArrowUp className="h-4 w-4 transition-colors duration-300 group-hover:text-white" style={{ color: layout.goTop?.iconColor || layout.goTop?.textColor || "var(--color-navy)" }} />
          <span
            className="font-display text-[10px] font-bold tracking-widest transition-colors duration-300 group-hover:text-white"
            style={{ writingMode: "vertical-rl", color: layout.goTop?.textColor || "var(--color-navy)" }}
          >
            {layout.goTop?.label || "GO TOP"}
          </span>
        </a>
      )}
    </footer>
  );
}