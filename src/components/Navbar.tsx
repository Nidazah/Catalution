"use client";

import { useEffect, useState, type ComponentType } from "react";
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
import Button from "@/components/Button";

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
    { label: "Careers", href: "/careers", badge: null },
    { label: "Careers details", href: "/careers/1", badge: "New" },
    { label: "Pricing Plan", href: "/pricing", badge: null },
    { label: "Feedbacks", href: "/", badge: null },
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
    { label: "Blog standard", href: "/blog-standard", badge: null },
    { label: "Blog sidebar", href: "/blog-sidebar", badge: null },
    { label: "Blog details", href: "/blog/1", badge: null },
    { label: "Term & Conditions", href: "/", badge: null },
  ],
};

// --- MAIN NAV DATA ---
const links = [
  { label: "Home", href: "/" },
  { label: "Pages", href: "#", isMegaMenu: true, width: "w-[900px]" },
  {
    label: "Services",
    href: "/services",
    dropdown: servicesLinks,
    width: "w-96",
  },
  {
    label: "Portfolios",
    href: "/portfolios",
    dropdown: portfolioLinks,
    width: "w-56",
    hasSimpleDropdown: true,
  },
  {
    label: "Blog",
    href: "/blog",
    dropdown: blogLinks,
    width: "w-60",
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
    icon?: ComponentType<{ className?: string }>;
    label: string;
    href: string;
  }>;
  width?: string;
  hasSimpleDropdown?: boolean;
}

// --- MEGA MENU COMPONENT ---
function PagesMegaMenu({
  open,
  pathname,
  onNavigate,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="absolute left-0 top-full z-50 mt-3 w-[900px] rounded-xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
        >
          <div className="grid grid-cols-12 gap-0">
            <div className="col-span-3 p-6 border-r border-gray-100">
              <h4 className="text-[17px] font-bold text-[#0B1426] mb-4 border-b-2 border-blue-600 pb-2 inline-block">
                Main pages
              </h4>
              <ul className="space-y-0.5">
                {pagesLinks.main.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={`flex items-center justify-between py-1.5 text-[15px] font-medium transition-colors hover:text-[var(--color-accent)] ${
                        pathname === link.href
                          ? "text-[var(--color-accent)] font-semibold"
                          : "text-gray-600"
                      }`}
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
            <div className="col-span-3 p-6 border-r border-gray-100">
              <h4 className="text-[17px] font-bold text-[#0B1426] mb-4 border-b-2 border-blue-600 pb-2 inline-block">
                Other pages
              </h4>
              <ul className="space-y-0.5">
                {pagesLinks.other.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      className={`flex items-center justify-between py-1.5 text-[15px] font-medium transition-colors hover:text-[var(--color-accent)] ${
                        pathname === link.href
                          ? "text-[var(--color-accent)] font-semibold"
                          : "text-gray-600"
                      }`}
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
            <div className="col-span-6 p-7 bg-gray-50/30 relative flex flex-col">
              <div className="relative rounded-xl overflow-hidden bg-[#0B1426] p-6 group hover:shadow-lg transition-shadow flex-1 flex flex-col justify-end max-h-[360px]">
                <Image
                  src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&q=80"
                  alt="Contact Us"
                  fill
                  className="object-cover object-top opacity-30 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1426] via-[#0B1426]/40 to-transparent" />
                <div className="relative z-10">
                  <div className="text-blue-500 mb-3">
                    <Hexagon className="h-8 w-8 text-blue-500" />
                  </div>
                  <h5 className="text-[20px] font-bold text-white mb-1 leading-tight">
                    Need help?
                  </h5>
                  <p className="text-sm text-white/80 mb-4 max-w-[160px]">
                    Feel free contact us
                  </p>
                  <Button
                    href="/contact"
                    onClick={onNavigate}
                    className="inline-flex items-center gap-2 bg-white !text-[#0B1426] [&_svg]:text-white font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
                  >
                    Get in touch
                  </Button>
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
  isHero,
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
        <PagesMegaMenu
          open={open}
          pathname={pathname}
          onNavigate={() => setOpen(false)}
        />
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
            {link.dropdown.map((item) => {
              const itemActive = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-cursor-hover
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-5 py-2.5 text-[15px] font-semibold transition-colors hover:text-[#3B82F6] ${
                    itemActive ? "text-[#3B82F6] bg-[#EAF1FD]/60" : "text-[#0B1426]"
                  }`}
                >
                  {item.icon && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#EAF1FD] text-[var(--color-accent)]">
                      <item.icon className="h-[18px] w-[18px]" />
                    </span>
                  )}
                  {item.label}
                </Link>
              );
            })}
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
        className={`text-sm font-semibold ${
          isActive ? "text-[#3B82F6]" : "text-gray-700 hover:text-[#3B82F6]"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-sm font-semibold ${
          isActive ? "text-[#3B82F6]" : "text-gray-700 hover:text-[#3B82F6]"
        }`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && link.dropdown && (
        <div className="mt-3 ml-3 flex flex-col gap-3 border-l border-gray-200 pl-3">
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`text-sm hover:text-[#3B82F6] ${
                item.href === pathname
                  ? "text-[#3B82F6] font-semibold"
                  : "text-gray-600"
              }`}
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
export default function Navbar({
  transparent = false,
}: {
  transparent?: boolean;
}) {
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

  // Force transparent mode on Careers and Blog pages.
  const isCareersPage = pathname.startsWith("/careers");
  const isBlogPage = pathname.startsWith("/blog");
  const isHeroMode = isCareersPage || isBlogPage || (transparent && !scrolled);

  // Logo selection based on mode
  const logoSrc = isHeroMode
    ? "/images/Logo/primary-logo.webp"
    : "/images/Logo/secondary-logo.webp";

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
          className="flex items-center gap-2 font-display font-bold text-2xl transition-colors"
        >
          <Image
            src={logoSrc}
            alt="Solvior Logo"
            width={120}
            height={40}
            className="h-auto w-auto"
            priority
          />
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

          {/* --- FIXED BUTTON WITH #0a2540 BACKGROUND --- */}
          <Button
            href="/contact"
            variant="primary" // Keeps solid background
            size="md"
            className={`shadow-md hover:shadow-lg ${
              isHeroMode
                ? "bg-[#0a2540] text-white border-0" // Your custom navy background
                : "bg-[var(--color-navy)] text-white"
            }`}
          >
            Get a quote
          </Button>
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

          <Button
            href="/contact"
            onClick={() => setMobileOpen(false)}
            variant="primary"
            size="md"
            className="w-full justify-center bg-[var(--color-navy)]"
          >
            Get a quote
          </Button>
        </div>
      )}
    </motion.header>
  );
}