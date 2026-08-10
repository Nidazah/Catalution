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
              <h4 className="text-[17px] font-bold text-[var(--color-heading)] mb-4 border-b-2 border-[var(--color-accent)] pb-2 inline-block">
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
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${link.badge === "HOT" ? "bg-red-500" : "bg-[var(--color-accent)]"}`}
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
              <h4 className="text-[17px] font-bold text-[var(--color-heading)] mb-4 border-b-2 border-[var(--color-accent)] pb-2 inline-block">
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
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${link.badge === "HOT" ? "bg-red-500" : "bg-[var(--color-accent)]"}`}
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
              <div className="relative rounded-xl overflow-hidden bg-[var(--color-heading)] p-6 group hover:shadow-lg transition-shadow flex-1 flex flex-col justify-end max-h-[360px]">
                <Image
                  src="/images/blog/widget-cta.webp"
                  alt="Contact Us"
                  fill
                  className="object-cover object-top opacity-30 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-heading)] via-[var(--color-heading)]/40 to-transparent" />
                <div className="relative z-10">
                  <div className="text-[var(--color-accent)] mb-3">
                    <Hexagon className="h-8 w-8 text-[var(--color-accent)]" />
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
                    className="inline-flex items-center gap-2 bg-white !text-[var(--color-heading)] [&_svg]:text-white font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors"
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
      ? "text-[var(--color-accent)]"
      : "text-white hover:text-[var(--color-accent)]"
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
          className={`relative text-[15px] font-semibold transition-colors inline-flex items-center gap-1 pb-1 ${open ? "text-[var(--color-accent)]" : textColorClass}`}
        >
          {link.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
          <span
            className={`absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--color-accent)] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
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
        className={`relative text-[15px] font-semibold transition-colors inline-flex items-center gap-1 pb-1 ${open || isActive ? "text-[var(--color-accent)]" : textColorClass}`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--color-accent)] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
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
                  className={`flex items-center gap-3 px-5 py-2.5 text-[15px] font-semibold transition-colors hover:text-[var(--color-accent)] ${
                    itemActive
                      ? "text-[var(--color-accent)] bg-[var(--color-orange-100)]/60"
                      : "text-[var(--color-heading)]"
                  }`}
                >
                  {item.icon && (
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-orange-100)] text-[var(--color-accent)]">
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

// --- MOBILE PAGES SUBMENU (sized for the drawer, not the 900px desktop grid) ---
function MobilePagesMenu({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate: () => void;
}) {
  const groups = [
    { title: "Main pages", items: pagesLinks.main },
    { title: "Other pages", items: pagesLinks.other },
  ];

  return (
    <div className="mt-3 ml-3 flex flex-col gap-5 border-l border-gray-300 pl-3">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="text-xs font-bold uppercase tracking-wide text-gray-400 mb-2">
            {group.title}
          </p>
          <div className="flex flex-col gap-3">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`flex items-center gap-2 text-sm ${
                  item.href === pathname
                    ? "text-[var(--color-accent)] font-semibold"
                    : "text-gray-600 hover:text-[var(--color-accent)]"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                      item.badge === "HOT" ? "bg-red-500" : "bg-[var(--color-accent)]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      ))}
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

  // 1. Standard Link
  if (!link.dropdown && !link.isMegaMenu) {
    return (
      <Link
        href={link.href}
        onClick={onNavigate}
        className={`text-sm font-semibold ${
          isActive ? "text-[var(--color-accent)]" : "text-[var(--color-heading)] hover:text-[var(--color-accent)]"
        }`}
      >
        {link.label}
      </Link>
    );
  }

  // 2. Mega Menu (Pages)
  if (link.isMegaMenu) {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex w-full items-center justify-between text-sm font-semibold ${
            isActive ? "text-[var(--color-accent)]" : "text-[var(--color-heading)] hover:text-[var(--color-accent)]"
          }`}
        >
          {link.label}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
        {open && (
          <MobilePagesMenu pathname={pathname} onNavigate={onNavigate} />
        )}
      </div>
    );
  }

  // 3. Regular Dropdown
  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center justify-between text-sm font-semibold ${
          isActive ? "text-[var(--color-accent)]" : "text-[var(--color-heading)] hover:text-[var(--color-accent)]"
        }`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && link.dropdown && (
        <div className="mt-3 ml-3 flex flex-col gap-3 border-l border-gray-300 pl-3">
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`text-sm hover:text-[var(--color-accent)] ${
                item.href === pathname
                  ? "text-[var(--color-accent)] font-semibold"
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

  // Smart Hide/Show logic
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
        className={`h-20 flex items-center justify-between px-6 mx-auto w-full transition-colors duration-300 ${
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
            alt="Catalution Logo"
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
                ? "text-white hover:text-[var(--color-accent)]"
                : "text-[var(--color-heading)] hover:text-[var(--color-accent)]"
            }`}
          >
            Explore <Search className="h-4 w-4" />
          </button>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            className={`shadow-md hover:shadow-lg ${
              isHeroMode
                ? "bg-[var(--color-navy)] text-white border-0"
                : "bg-[var(--color-navy)] text-white"
            }`}
          >
            Get a quote
          </Button>
        </div>

        {/* --- UPDATED MENU BUTTON WITH CUSTOM 4-BOX ICON --- */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`lg:hidden transition-colors flex items-center gap-2.5 text-[15px] font-medium ${isHeroMode ? "text-white" : "text-[var(--color-navy)]"}`}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <>
              <span>Menu</span>
              <div className="flex flex-col gap-[3px]">
                <div className="flex gap-[3px]">
                  <div className="w-[7px] h-[7px] rounded-[1px] border-[1.5px] currentColor"></div>
                  <div className="w-[7px] h-[7px] rounded-[1px] border-[1.5px] currentColor"></div>
                </div>
                <div className="flex gap-[3px]">
                  <div className="w-[7px] h-[7px] rounded-[1px] border-[1.5px] currentColor"></div>
                  <div className="w-[7px] h-[7px] rounded-[1px] border-[1.5px] currentColor"></div>
                </div>
              </div>
            </>
          )}
        </button>
      </div>

      {/* --- MOBILE MENU --- */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 h-full w-full max-w-[340px] bg-white z-50 lg:hidden flex flex-col overflow-y-auto overscroll-contain shadow-2xl"
            >
              {/* 1. Header */}
              <div className="flex items-center justify-between px-6 py-6 shrink-0">
                <Link
                  href="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3"
                >
                  <Image
                    src="/images/Logo/icon-mark.webp"
                    alt="Catalution"
                    width={32}
                    height={34}
                    className="h-8 w-auto"
                  />
                  <span className="font-display text-xl text-[var(--color-heading)] font-semibold tracking-wide">
                    Catalution
                  </span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-[var(--color-heading)] hover:text-gray-500 transition-colors"
                >
                  <X className="h-7 w-7" />
                </button>
              </div>

              {/* 2. Search Bar */}
              <div className="px-6 pb-6 shrink-0">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search here"
                    className="w-full bg-gray-100 text-[var(--color-heading)] text-sm py-3 pl-4 pr-10 rounded-sm outline-none placeholder-gray-500 focus:ring-1 focus:ring-[var(--color-accent)]"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                </div>
              </div>

              {/* 3. Navigation Links */}
              <div className="flex-1 px-6 pb-6 flex flex-col gap-1">
                {links.map((l) => (
                  <div
                    key={l.label}
                    className="border-b border-gray-200 py-4 last:border-0"
                  >
                    <MobileSection
                      link={l}
                      onNavigate={() => setMobileOpen(false)}
                      pathname={pathname}
                    />
                  </div>
                ))}
              </div>

              {/* 4. CONTACT INFO & SOCIAL (Dark section at bottom) */}
              <div className="bg-[var(--color-navy-ink)] px-6 py-8 shrink-0 text-white">
                <h4 className="text-lg font-bold mb-4">Contact info</h4>
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-0.5">
                      Email
                    </p>
                    <Link
                      href="mailto:support@catalution.com"
                      className="text-sm hover:text-[var(--color-accent-soft)] transition-colors"
                    >
                      support@catalution.com
                    </Link>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-0.5">
                      Phone
                    </p>
                    <Link
                      href="tel:(000)123456789"
                      className="text-sm hover:text-[var(--color-accent-soft)] transition-colors"
                    >
                      (000) 123 456 789
                    </Link>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-medium mb-0.5">
                      Location
                    </p>
                    <p className="text-sm">Santa, United State</p>
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-4">Follow us</h4>
                <div className="flex gap-3">
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
                  >
                    <span className="font-bold text-sm">f</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
                  >
                    <span className="font-bold text-sm">ig</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
                  >
                    <span className="font-bold text-sm">in</span>
                  </Link>
                  <Link
                    href="#"
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-[var(--color-accent)] transition-colors flex items-center justify-center"
                  >
                    <span className="font-bold text-sm">t</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}