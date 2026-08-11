"use client";

import { useEffect, useState, type ComponentType } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
  if (!open) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-0 w-[900px] rounded-xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-[var(--color-line)] overflow-hidden">
      <div className="grid grid-cols-12 gap-0">
        <div className="col-span-3 p-6 border-r border-[var(--color-line)]">
          <h4 className="nav-mega-menu-title">Main pages</h4>
          <ul className="space-y-0.5">
            {pagesLinks.main.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between py-1.5 hover:text-[var(--color-accent)] ${
                    pathname === link.href
                      ? "text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-purple-900)]"
                  }`}
                >
                  <span className="nav-link-menu-item">{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                        link.badge === "HOT"
                          ? "bg-red-500"
                          : "bg-[var(--color-accent)]"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-3 p-6 border-r border-[var(--color-line)]">
          <h4 className="nav-mega-menu-title">Other pages</h4>
          <ul className="space-y-0.5">
            {pagesLinks.other.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className={`flex items-center justify-between py-1.5 hover:text-[var(--color-accent)] ${
                    pathname === link.href
                      ? "text-[var(--color-accent)] font-semibold"
                      : "text-[var(--color-purple-900)]"
                  }`}
                >
                  <span className="nav-link-menu-item">{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                        link.badge === "HOT"
                          ? "bg-red-500"
                          : "bg-[var(--color-accent)]"
                      }`}
                    >
                      {link.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-6 p-7 bg-[var(--color-section)] relative flex flex-col">
          <div className="relative rounded-xl overflow-hidden bg-[var(--color-purple-900)] p-6 hover:shadow-lg transition-shadow flex-1 flex flex-col justify-end max-h-[360px]">
            <Image
              src="/images/blog/widget-cta.webp"
              alt="Contact Us"
              fill
              className="object-cover object-top opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-purple-900)] via-[var(--color-purple-900)]/40 to-transparent" />
            <div className="relative z-10">
              <div className="text-[var(--color-accent)] mb-3">
                <Hexagon className="h-8 w-8 text-[var(--color-accent)]" />
              </div>
              <h5 className="nav-mega-cta-title">Need help?</h5>
              <p className="nav-mega-cta-sub">Feel free contact us</p>
              <Link
                href="/contact"
                onClick={onNavigate}
                className="btn btn-outline"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
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
      : "text-[var(--color-purple-900)] hover:text-[var(--color-accent)]";

  if (link.isMegaMenu) {
    return (
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="relative"
      >
        <button
          className={`nav-link relative inline-flex items-center gap-1 pb-1 ${open ? "text-[var(--color-accent)]" : textColorClass}`}
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
        className={`nav-link inline-flex items-center gap-1 ${textColorClass}`}
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
        className={`nav-link relative inline-flex items-center gap-1 pb-1 ${open || isActive ? "text-[var(--color-accent)]" : textColorClass}`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        <span
          className={`absolute -bottom-1 left-0 h-[2px] w-full bg-[var(--color-accent)] transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
        />
      </Link>
      {open && (
        <div className={`nav-dropdown-menu ${link.width}`}>
          {link.dropdown.map((item) => {
            const itemActive = item.href === pathname;
            return (
              <Link
                key={item.href}
                href={item.href}
                data-cursor-hover
                onClick={() => setOpen(false)}
                className={`nav-dropdown-item ${
                  itemActive
                    ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    : ""
                }`}
              >
                {item.icon && (
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    <item.icon className="h-[18px] w-[18px]" />
                  </span>
                )}
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- MOBILE PAGES SUBMENU ---
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
    <div className="nav-mobile-dropdown">
      {groups.map((group) => (
        <div key={group.title}>
          <p className="nav-mobile-menu-heading">{group.title}</p>
          <div className="flex flex-col gap-3">
            {group.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={`nav-mobile-dropdown-link flex items-center gap-2 ${
                  item.href === pathname
                    ? "text-[var(--color-accent)] font-semibold"
                    : ""
                }`}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full text-white ${
                      item.badge === "HOT"
                        ? "bg-red-500"
                        : "bg-[var(--color-accent)]"
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
        className={`nav-mobile-link ${
          isActive ? "text-[var(--color-accent)]" : ""
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
          className={`nav-mobile-link w-full ${
            isActive ? "text-[var(--color-accent)]" : ""
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
        className={`nav-mobile-link w-full ${
          isActive ? "text-[var(--color-accent)]" : ""
        }`}
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && link.dropdown && (
        <div className="nav-mobile-dropdown">
          {link.dropdown.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`nav-mobile-dropdown-link ${
                item.href === pathname
                  ? "text-[var(--color-accent)] font-semibold"
                  : ""
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

  // Track scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Force transparent mode on Careers and Blog pages.
  const isCareersPage = pathname.startsWith("/careers");
  const isBlogPage = pathname.startsWith("/blog");
  const isHeroMode = isCareersPage || isBlogPage || (transparent && !scrolled);

  // Logo selection based on mode
  const logoSrc = isHeroMode
    ? "/images/Logo/primary-logo.webp"
    : "/images/Logo/secondary-logo.webp";

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-colors duration-300">
      <div
        className={`catalution-navbar ${
          isHeroMode
            ? "bg-transparent shadow-none border-none"
            : "bg-white/95 backdrop-blur-md border-b border-[var(--color-line)] shadow-[0_2px_10px_rgba(72,29,150,0.08)]"
        }`}
      >
        {/* --- LOGO (Far Left) --- */}
        <Link
          href="/"
          className="navbar-logo flex items-center gap-2 text-2xl transition-colors"
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

        {/* --- NAVIGATION LINKS (Center or Right) --- */}
        <nav className="navbar-links hidden lg:flex items-center gap-9">
          {links.map((l) => (
            <NavItem
              key={l.label}
              link={l}
              pathname={pathname}
              isHero={isHeroMode}
            />
          ))}
        </nav>

        {/* --- CTA BUTTON & SEARCH (Far Right) --- */}
        <div className="hidden md:flex items-center gap-6">
          <button
            className={`inline-flex items-center gap-2 text-[13px] font-medium transition-colors ${
              isHeroMode
                ? "text-white hover:text-[var(--color-accent)]"
                : "text-[var(--color-purple-900)] hover:text-[var(--color-accent)]"
            }`}
          >
            Explore <Search className="h-4 w-4" />
          </button>

          <Link href="/contact" className="btn-nav-primary">
            Get Started
            <span className="arrow">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`btn-nav-menu ${isHeroMode ? "text-white" : "text-[var(--color-purple-900)]"}`}
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
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-overlay"
          />

          <div className="nav-mobile-drawer">
            {/* 1. Header */}
            <div className="nav-mobile-drawer-header">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="nav-mobile-drawer-brand"
              >
                <Image
                  src="/images/Logo/icon-mark.webp"
                  alt="Catalution"
                  width={32}
                  height={34}
                  className="h-8 w-auto"
                />
                <span>Catalution</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="nav-mobile-drawer-close"
              >
                <X className="h-7 w-7" />
              </button>
            </div>

            {/* 2. Search Bar */}
            <div className="nav-mobile-drawer-search">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search here..."
                  className="w-full"
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-purple-900)]/50 w-5 h-5" />
              </div>
            </div>

            {/* 3. Navigation Links */}
            <div className="nav-mobile-drawer-links">
              {links.map((l) => (
                <div
                  key={l.label}
                  className="border-b border-[var(--color-line)] py-4 last:border-0"
                >
                  <MobileSection
                    link={l}
                    onNavigate={() => setMobileOpen(false)}
                    pathname={pathname}
                  />
                </div>
              ))}
            </div>

            {/* 4. CONTACT INFO & SOCIAL */}
            <div className="nav-mobile-drawer-footer">
              <h4>Contact info</h4>
              
              <div className="space-y-4 mb-8">
                <div>
                  <p className="nav-mobile-drawer-footer-label">Email</p>
                  <Link href="mailto:support@catalution.com" className="nav-mobile-drawer-footer-value block">
                    support@catalution.com
                  </Link>
                  <Link href="mailto:accounts@catalution.com" className="nav-mobile-drawer-footer-value block mt-1">
                    accounts@catalution.com
                  </Link>
                </div>
                
                <div>
                  <p className="nav-mobile-drawer-footer-label">Phone</p>
                  <Link href="tel:03015221051" className="nav-mobile-drawer-footer-value">
                    03015221051
                  </Link>
                </div>
                
                <div>
                  <p className="nav-mobile-drawer-footer-label">Address</p>
                  <p className="text-sm">Near Plot 37, Tipu Block Garden Town, Lahore</p>
                </div>
              </div>

              <h4 className="text-lg font-bold mb-4">Follow us</h4>
              <div className="nav-mobile-social">
                <Link href="#" className="nav-mobile-social-link">
                  f
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  ig
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  in
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  t
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}