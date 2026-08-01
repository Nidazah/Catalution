"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import {
  Menu,
  X,
  ArrowUpRight,
  ChevronDown,
  Search,
  Waves,
  Boxes,
  Users,
  Sparkles,
  CircleDot,
  Repeat,
  Hexagon,
} from "lucide-react";

// --- SERVICES DROPDOWN ---
const servicesLinks = [
  { icon: Waves, label: "Business process optimization", href: "/services/1" },
  { icon: Boxes, label: "Strategic planning & execution", href: "/services/2" },
  { icon: Users, label: "Leadership executive coaching", href: "/services/3" },
  { icon: Sparkles, label: "Legacy leadership institute", href: "/services/4" },
  { icon: CircleDot, label: "Executive growth solutions", href: "/services/5" },
  { icon: Repeat, label: "Empowered leadership journey", href: "/services/6" },
];

// --- PORTFOLIOS DROPDOWN ---
const portfolioLinks = [
  { icon: Hexagon, label: "Portfolios", href: "/portfolios" },
  { icon: Hexagon, label: "Portfolio details", href: "/portfolios/1" },
];

// --- BLOG DROPDOWN ---
const blogLinks = [
  { icon: Hexagon, label: "Blog", href: "/blog" },
  { icon: Hexagon, label: "Blog grid", href: "/blog-grid" },
  { icon: Hexagon, label: "Blog with sidebar", href: "/blog-sidebar" },
  { icon: Hexagon, label: "Blog details", href: "/blog/1" },
];

// --- PAGES MEGA MENU ---
const pagesLinks = {
  main: [
    { label: "About us", href: "/about", badge: null },
    { label: "Our history", href: "/history", badge: "HOT" },
    { label: "Team", href: "/team", badge: null },
    { label: "Team details", href: "/team/1", badge: null },
    { label: "Careers", href: "/careers", badge: "New" },
    { label: "Pricing Plan", href: "/pricing", badge: null },
    { label: "Feedbacks", href: "/feedbacks", badge: null },
    { label: "Faq", href: "/faq", badge: null },
    { label: "Contact", href: "/contact", badge: null },
  ],
  other: [
    { label: "Services", href: "/services", badge: null },
    { label: "Service details", href: "/services/1", badge: null },
    { label: "Portfolios", href: "/portfolios", badge: null },
    { label: "Portfolio details", href: "/portfolios/1", badge: null },
    { label: "Error 404", href: "/404", badge: null },
    { label: "Blog grid", href: "/blog-grid", badge: "NEW" },
    { label: "Blog standard", href: "/blog", badge: null },
    { label: "Blog sidebar", href: "/blog-sidebar", badge: null },
    { label: "Blog details", href: "/blog/1", badge: null },
  ],
};

// --- MAIN NAV DATA ---
const links = [
  { label: "Home", href: "/" },
  { label: "Pages", href: "#", isMegaMenu: true, width: "w-[760px]" },
  {
    label: "Services",
    href: "/services",
    dropdown: servicesLinks,
    width: "w-72",
  },
  {
    label: "Portfolios",
    href: "/portfolios",
    dropdown: portfolioLinks,
    width: "w-44",
    hasSimpleDropdown: true,
  },
  {
    label: "Blog",
    href: "/blog",
    dropdown: blogLinks,
    width: "w-48",
    hasSimpleDropdown: true,
  },
  { label: "Contact", href: "/contact" },
];

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  isMegaMenu?: boolean;
  dropdown?: Array<{
    icon?: React.ComponentType<{ className?: string }>;
    label: string;
    href: string;
  }>;
  width?: string;
  hasSimpleDropdown?: boolean;
}

// --- MEGA MENU COMPONENT ---
function PagesMegaMenu({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-3 w-[760px] rounded-xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-4 p-8 border-r border-gray-100">
              <h4 className="text-[17px] font-bold text-[#0B1426] mb-5 border-b-2 border-blue-600 pb-2 inline-block">
                Main pages
              </h4>
              <ul className="space-y-1.5">
                {pagesLinks.main.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-2 text-[15px] font-medium text-gray-600 hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${link.badge === "HOT" ? "bg-red-500" : "bg-blue-500"}`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 p-8 border-r border-gray-100">
              <h4 className="text-[17px] font-bold text-[#0B1426] mb-5 border-b-2 border-blue-600 pb-2 inline-block">
                Other pages
              </h4>
              <ul className="space-y-1.5">
                {pagesLinks.other.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex items-center justify-between py-2 text-[15px] font-medium text-gray-600 hover:text-[var(--color-accent)] transition-colors"
                    >
                      {link.label}
                      {link.badge && (
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${link.badge === "HOT" ? "bg-red-500" : "bg-blue-500"}`}
                        >
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-4 p-8 bg-gray-50/30 relative flex flex-col justify-center">
              <div className="relative rounded-xl overflow-hidden bg-[#0B1426] p-6 group hover:shadow-lg transition-shadow">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                  alt="Contact Us"
                  fill
                  className="object-cover opacity-40 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="relative z-10">
                  <div className="text-blue-500 mb-3">
                    <Hexagon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h5 className="text-[22px] font-bold text-white mb-1 leading-tight">
                    Need help?
                  </h5>
                  <p className="text-sm text-white/80 mb-4 max-w-[160px]">
                    Feel free contact us
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 bg-white text-[#0B1426] font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent)] text-white">
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                    Get in touch
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- REGULAR DROPDOWN COMPONENT ---
function NavItem({ 
  link, 
  pathname, 
  isHero 
}: { 
  link: NavLink; 
  pathname: string; 
  isHero: boolean;
}) {
  const [open, setOpen] = useState(false);
  const isActive =
    link.href === pathname ||
    (link.dropdown && link.dropdown.some((item) => item.href === pathname));

  // Conditional Colors based on Hero Mode
  const textColorClass = isHero
    ? isActive
      ? "text-[#3B82F6]" 
      : "text-white hover:text-[#3B82F6]"
    : isActive
      ? "text-[var(--color-accent)]" 
      : "text-[var(--color-heading)] hover:text-[var(--color-accent)]";

  if (link.isMegaMenu) {
    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        <button
          className={`relative text-[15px] font-semibold transition-colors inline-flex items-center gap-1 pb-1 ${open ? "text-[#3B82F6]" : textColorClass}`}
        >
          {link.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          <span
            className={`absolute -bottom-1 left-0 h-[2px] w-full bg-[#3B82F6] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          />
        </button>
        <PagesMegaMenu open={open} />
      </div>
    );
  }

  if (!link.dropdown) {
    return (
      <Link
        href={link.href}
        className={`text-[15px] font-semibold transition-colors inline-flex items-center gap-1 ${textColorClass}`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className="relative"
    >
      <Link
        href={link.href}
        className={`relative text-[15px] font-semibold transition-colors inline-flex items-center gap-1 pb-1 ${open || isActive ? "text-[#3B82F6]" : textColorClass}`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-[2px] w-full bg-[#3B82F6] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={`absolute left-0 top-full z-50 mt-3 ${link.width} rounded-lg bg-white py-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100`}
          >
            {link.dropdown.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                data-cursor-hover
                className="flex items-center gap-3 px-5 py-2.5 text-[15px] font-semibold text-[#0B1426] transition-colors hover:text-[#3B82F6]"
              >
                {item.icon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1FD] text-[var(--color-accent)]">
                    <item.icon className="h-4.5 w-4.5" />
                  </span>
                )}
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- MOBILE NAV COMPONENT ---
function MobileSection({
  link,
  onNavigate,
  pathname,
}: {
  link: NavLink;
  onNavigate: () => void;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const isActive =
    link.href === pathname ||
    (link.dropdown && link.dropdown.some((item) => item.href === pathname));

  if (!link.dropdown && !link.isMegaMenu) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className={`text-sm font-semibold ${isActive ? "text-[#3B82F6]" : "text-white hover:text-[#3B82F6]"}`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-sm font-semibold ${isActive ? "text-[#3B82F6]" : "text-white hover:text-[#3B82F6]"}`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && link.dropdown && (
        <div className="mt-3 ml-3 flex flex-col gap-3 border-l border-[var(--color-line)] pl-3">
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className="text-sm text-white/80 hover:text-[#3B82F6]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

// --- MAIN NAVBAR COMPONENT ---
export default function Navbar({ transparent = false }: { transparent?: boolean }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Explicitly track scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll(); // Check immediately on load
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Smart Hide/Show logic (kept separate for clean hide animation)
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastScrollY;
    setLastScrollY(latest);

    if (latest > previous && latest > 10) {
      setHidden(true);
    } else if (latest < previous) {
      setHidden(false);
    }
  });

  // ✅ UNIVERSAL LOGIC: Trust the 'transparent' prop from layout.tsx
  // If transparent is true AND we haven't scrolled, turn on Hero Mode.
  const isHeroMode = transparent && !scrolled;

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
    >
      <div
        className={`h-20 flex items-center justify-between px-6 mx-auto max-w-7xl transition-colors duration-300 ${
          isHeroMode
            ? "bg-transparent"
            : "bg-white/90 backdrop-blur-md border-b border-[var(--color-line)]"
        }`}
      >
        {/* --- LOGO --- */}
        <Link
          href="/"
          className={`flex items-center gap-2 font-display font-bold text-2xl transition-colors ${
            isHeroMode ? "text-white" : "text-[var(--color-heading)]"
          }`}
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-accent)]">
            <span className="h-3.5 w-3.5 rounded-full bg-white" />
          </span>
          Sol
          <span className="italic font-serif text-[var(--color-accent)]">
            vior
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavItem 
              key={l.label} 
              link={l} 
              pathname={pathname} 
              isHero={isHeroMode} 
            />
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <button
            className={`inline-flex items-center gap-2 text-sm font-semibold transition-colors ${
              isHeroMode
                ? "text-white hover:text-[#3B82F6]"
                : "text-[var(--color-heading)] hover:text-[var(--color-accent)]"
            }`}
          >
            Explore <Search className="h-4 w-4" />
          </button>
          
          <motion.a
            href="/contact"
            data-cursor-hover
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`group inline-flex items-center gap-2 rounded-full pl-2 pr-6 py-2 text-sm font-semibold transition-colors shadow-md hover:shadow-lg ${
              isHeroMode
                ? "bg-white text-[#0B1426]"
                : "bg-[var(--color-navy)] text-white"
            }`}
          >
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-accent)]">
              <span className="absolute inset-0 rounded-full bg-[var(--color-accent)] animate-quote-pulse" />
              <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            Get a quote
          </motion.a>
        </div>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`lg:hidden transition-colors ${isHeroMode ? "text-white" : "text-[var(--color-navy)]"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-[var(--color-line)] bg-white px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <MobileSection
              key={l.label}
              link={l}
              onNavigate={() => setMobileOpen(false)}
              pathname={pathname}
            />
          ))}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[var(--color-navy)] px-5 py-2.5 text-sm font-semibold text-white"
          >
            Get a quote
          </Link>
        </div>
      )}
    </motion.header>
  );
}