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

// --- SERVICES DROPDOWN (fallback, used until live data loads) ---
const fallbackServicesLinks = [
  { icon: Waves, label: "Business process optimization", href: "/services/business-process-optimization" },
  { icon: Boxes, label: "Strategic planning & execution", href: "/services/strategic-planning-execution" },
  { icon: Users, label: "Leadership executive coaching", href: "/services/leadership-executive-coaching" },
  { icon: Sparkles, label: "Legacy leadership institute", href: "/services/legacy-leadership-institute" },
  { icon: CircleDot, label: "Executive growth solutions", href: "/services/executive-growth-solutions" },
  { icon: Repeat, label: "Empowered leadership journey", href: "/services/empowered-leadership-journey" },
];

type ApiService = {
  id: string;
  title: string;
  slug: string;
  icon: string;
};

const serviceIconMap: Record<string, ComponentType<{ className?: string }>> = {
  waves: Waves,
  boxes: Boxes,
  users: Users,
  sparkles: Sparkles,
  circledot: CircleDot,
  repeat: Repeat,
};

// --- PORTFOLIOS DROPDOWN ---
function buildPortfolioLinks(portfolioDetailsHref: string) {
  return [
    { label: "Portfolios", href: "/portfolios" },
    { label: "Portfolio details", href: portfolioDetailsHref },
  ];
}

// --- BLOG DROPDOWN ---
const blogLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Blog grid", href: "/blog-grid" },
  { label: "Blog with sidebar", href: "/blog-sidebar" },
];

// --- PAGES MEGA MENU ---
function buildPagesLinks(
  portfolioDetailsHref: string,
  careersDetailsHref: string,
) {
  return {
    main: [
      { label: "About us", href: "/about", badge: null, visible: true },
      { label: "Our history", href: "/history", badge: "HOT" },
      { label: "Team", href: "/team", badge: null },
      { label: "Team details", href: "/team/savanah-nguyen", badge: null },
      { label: "Careers", href: "/careers", badge: null },
      { label: "Careers details", href: careersDetailsHref, badge: "New" },
      { label: "Pricing Plan", href: "/pricing", badge: null },
      { label: "Feedbacks", href: "/", badge: null },
      { label: "Faq", href: "/faq", badge: null },
      { label: "Contact", href: "/contact", badge: null },
    ],
    other: [
      { label: "Services", href: "/services", badge: null },
      { label: "Service details", href: "/services/business-process-optimization", badge: null },
      { label: "Portfolios", href: "/portfolios", badge: null },
      { label: "Portfolio details", href: portfolioDetailsHref, badge: null },
      { label: "Error 404", href: "/404", badge: null },
      { label: "Blog grid", href: "/blog-grid", badge: "NEW" },
      { label: "Blog standard", href: "/blog-standard", badge: null },
      { label: "Blog sidebar", href: "/blog-sidebar", badge: null },
      { label: "Blog details", href: "/blog", badge: null },
      { label: "Term & Conditions", href: "/", badge: null },
    ],
  };
}

type PagesLinks = ReturnType<typeof buildPagesLinks>;

// --- MAIN NAV DATA ---
function buildLinks(
  servicesDropdown: NavLink["dropdown"],
  portfolioDetailsHref: string,
): NavLink[] {
  return [
    { label: "Home", href: "/", menuKey: "home" },
    { label: "Pages", href: "#", menuKey: "pages", isMegaMenu: true, width: "w-[900px]" },
    {
      label: "Services",
      href: "/services",
      menuKey: "services",
      dropdown: servicesDropdown,
      width: "w-56",
    },
    {
      label: "Portfolios",
      href: "/portfolios",
      menuKey: "portfolios",
      dropdown: buildPortfolioLinks(portfolioDetailsHref),
      width: "w-48",
      hasSimpleDropdown: true,
    },
    {
      label: "Blog",
      href: "/blog",
      menuKey: "blog",
      dropdown: blogLinks,
      width: "w-48",
      hasSimpleDropdown: true,
    },
    { label: "Contact", href: "/contact", menuKey: "contact" },
  ];
}

interface NavbarProps {
  transparent?: boolean;
  lightText?: boolean;
}

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  visible?: boolean;
  menuKey?: string;
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
  pagesLinks,
}: {
  open: boolean;
  pathname: string;
  onNavigate: () => void;
  pagesLinks: PagesLinks;
}) {
  if (!open) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-0 w-[min(900px,calc(100vw-2rem))] max-w-[calc(100vw-2rem)] rounded-xl bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-[var(--color-line)] overflow-hidden">
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
                      : "!text-[var(--color-purple-900)]"
                  }`}
                >
                  <span className="nav-link-menu-item">{link.label}</span>
                  {link.badge && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full !text-white ${
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
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full !text-white ${
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
  pagesLinks,
}: {
  link: NavLink;
  pathname: string;
  isHero: boolean;
  pagesLinks: PagesLinks;
}) {
  const [open, setOpen] = useState(false);
  const isActive =
    link.href === pathname ||
    (link.dropdown && link.dropdown.some((item) => item.href === pathname));

  const textColorClass = isHero
    ? "text-white hover:text-[var(--color-accent)]"
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
          pagesLinks={pagesLinks}
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
                key={item.label}
                href={item.href}
                data-cursor-hover
                onClick={() => setOpen(false)}
                className={`nav-dropdown-item ${
                  itemActive
                    ? "text-[var(--color-accent)] bg-[var(--color-accent)]/10"
                    : ""
                }`}
              >
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
  pagesLinks,
}: {
  pathname: string;
  onNavigate: () => void;
  pagesLinks: PagesLinks;
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
                key={item.label}
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
  pagesLinks,
}: {
  link: NavLink;
  onNavigate: () => void;
  pathname: string;
  pagesLinks: PagesLinks;
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
          <MobilePagesMenu
            pathname={pathname}
            onNavigate={onNavigate}
            pagesLinks={pagesLinks}
          />
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
              key={item.label}
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
  lightText = false,
}: NavbarProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [layout, setLayout] = useState<{
    logo?: string; logoWidth?: number; ctaLabel?: string; ctaUrl?: string; ctaVisible?: boolean; mobileSearchPlaceholder?: string;
    navItems?: Array<{ label: string; href: string; visible?: boolean; menuKey?: string }>;
    pagesMain?: Array<{ label: string; href: string; badge?: string; visible?: boolean }>;
    pagesOther?: Array<{ label: string; href: string; badge?: string; visible?: boolean }>;
    mobileContactEmail1?: string; mobileContactEmail2?: string; mobileContactPhone?: string; mobileContactAddress?: string; mobileFollowLabel?: string; mobileSocials?: string[];
  }>({});

  useEffect(() => {
    let cancelled = false;
    fetch("/api/site-settings?key=LAYOUT", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (!cancelled && payload?.data?.navbar) setLayout(payload.data.navbar);
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, []);

  // Track scroll state
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [servicesDropdown, setServicesDropdown] = useState<NavLink["dropdown"]>(
    fallbackServicesLinks,
  );

  useEffect(() => {
    let cancelled = false;
    fetch("/api/services", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : { services: [] }))
      .then((data: { services: ApiService[] }) => {
        const services = data?.services;
        if (cancelled || !Array.isArray(services) || services.length === 0)
          return;
        setServicesDropdown(
          services.map((service) => ({
            icon: serviceIconMap[service.icon] ?? Waves,
            label: service.title,
            href: `/services/${service.slug}`,
          })),
        );
      })
      .catch(() => {
        // keep fallbackServicesLinks on any error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // "Portfolio details" and "Careers details" mega-menu links have no fixed
  // target page — they point at whichever record happens to come first, so
  // they always resolve to a real, live detail page instead of a
  // hardcoded/stale id or the listing page.
  const [portfolioDetailsHref, setPortfolioDetailsHref] =
    useState("/portfolios");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/portfolio", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) => {
        const portfolios = Array.isArray(data) ? data : [];
        const firstSlug = portfolios[0]?.slug;
        if (cancelled || !firstSlug) return;
        setPortfolioDetailsHref(`/portfolios/${firstSlug}`);
      })
      .catch(() => {
        // keep the "/portfolios" fallback on any error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [careersDetailsHref, setCareersDetailsHref] = useState("/careers");

  useEffect(() => {
    let cancelled = false;
    fetch("/api/careers", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data: unknown) => {
        const careers = Array.isArray(data)
          ? data
          : Array.isArray((data as { careers?: unknown[] })?.careers)
            ? (data as { careers: unknown[] }).careers
            : [];
        const first = careers[0] as
          | { id?: string; slug?: string }
          | undefined;
        const target = first?.slug || first?.id;
        if (cancelled || !target) return;
        setCareersDetailsHref(`/careers/${target}`);
      })
      .catch(() => {
        // keep the "/careers" fallback on any error
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const staticLinks = buildLinks(servicesDropdown, portfolioDetailsHref);
  // CMS `navItems` fully drives which links render, their order, and their
  // label/href — including adding brand-new links or removing default ones.
  // Any item whose label matches one of the built-in menu items keeps that
  // item's dropdown/mega-menu; unrecognized labels render as plain links.
  const configuredItems = layout.navItems?.length ? layout.navItems : staticLinks;
  const links: NavLink[] = configuredItems
    .filter((item) => item.visible !== false)
    .map((item) => {
      const staticMatch = staticLinks.find((l) =>
        item.menuKey ? l.menuKey === item.menuKey : l.label === item.label,
      );
      return staticMatch
        ? { ...staticMatch, label: item.label, href: item.href, visible: item.visible }
        : { label: item.label, href: item.href, visible: item.visible };
    });
  const defaultPages = buildPagesLinks(portfolioDetailsHref, careersDetailsHref);
  const pagesLinks: PagesLinks = {
    main: layout.pagesMain?.length ? layout.pagesMain.filter((item) => item.visible !== false).map((item) => ({ label: item.label, href: item.href, badge: item.badge ?? null })) : defaultPages.main,
    other: layout.pagesOther?.length ? layout.pagesOther.filter((item) => item.visible !== false).map((item) => ({ label: item.label, href: item.href, badge: item.badge ?? null })) : defaultPages.other,
  };

  // The parent decides whether this page has a transparent hero navbar.
  // The navbar becomes solid after scrolling.
  const isHeroMode = transparent && !scrolled;
  const useLightText = isHeroMode && lightText;

  const logoSrc = layout.logo || (useLightText
    ? "/images/Logo/primary-logo.webp"
    : "/images/Logo/secondary-logo.webp");

  return (
    <header className="absolute left-0 top-0 z-50 w-full bg-transparent">
      <div
        className={`catalution-navbar ${
          isHeroMode
            ? "bg-transparent shadow-none border-none"
            : "bg-white/95 backdrop-blur-md border-b shadow-[0_2px_10px_rgba(72,29,150,0.08)]"
        }`}
        style={{
          backgroundColor: isHeroMode ? "transparent" : "var(--cms-navbar-bg, #ffffff)",
          borderColor: isHeroMode ? "transparent" : "var(--cms-navbar-border, var(--color-line))",
          paddingLeft: "var(--cms-navbar-px, 4%)",
          paddingRight: "var(--cms-navbar-px, 4%)",
          paddingTop: "var(--cms-navbar-py, 1rem)",
          paddingBottom: "var(--cms-navbar-py, 1rem)",
        }}
      >
        {/* --- LOGO (Far Left) --- */}
        <Link
          href="/"
          className="navbar-logo flex items-center gap-2 text-2xl transition-colors"
        >
          <Image
            src={logoSrc}
            alt="Catalution Logo"
            width={layout.logoWidth || 120}
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
              isHero={useLightText}
              pagesLinks={pagesLinks}
            />
          ))}
        </nav>

        {/* --- CTA BUTTON & SEARCH (Far Right) --- */}
        <div className="hidden md:flex items-center gap-6">
          {layout.ctaVisible !== false && <Link href={layout.ctaUrl || "/contact"} className="btn-nav-primary" style={{backgroundColor:"var(--cms-navbar-cta-bg, var(--color-purple-900))", color:"var(--cms-navbar-cta-text, #fff)"}}>
            {layout.ctaLabel || "Get Started"}
            <span className="arrow">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>}
        </div>

        {/* --- MOBILE MENU BUTTON --- */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className={`btn-nav-menu ${useLightText ? "!text-white" : "!text-[var(--color-purple-900)]"} hover:text-[var(--color-accent)]`}
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
                  placeholder={layout.mobileSearchPlaceholder || "Search here..."}
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
                    pagesLinks={pagesLinks}
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
                  <Link href={`mailto:${layout.mobileContactEmail1 || "support@catalution.com"}`} className="nav-mobile-drawer-footer-value block">
                    {layout.mobileContactEmail1 || "support@catalution.com"}
                  </Link>
                  <Link href={`mailto:${layout.mobileContactEmail2 || "accounts@catalution.com"}`} className="nav-mobile-drawer-footer-value block mt-1">
                    {layout.mobileContactEmail2 || "accounts@catalution.com"}
                  </Link>
                </div>
                
                <div>
                  <p className="nav-mobile-drawer-footer-label">Phone</p>
                  <Link href={`tel:${layout.mobileContactPhone || "03015221051"}`} className="nav-mobile-drawer-footer-value">
                    {layout.mobileContactPhone || "03015221051"}
                  </Link>
                </div>
                
                <div>
                  <p className="nav-mobile-drawer-footer-label">Address</p>
                  <p className="text-sm">{layout.mobileContactAddress || "Near Plot 37, Tipu Block Garden Town, Lahore"}</p>
                </div>
              </div>

              <h4 className="text-lg font-bold mb-4">{layout.mobileFollowLabel || "Follow us"}</h4>
              <div className="nav-mobile-social">
                <Link href="#" className="nav-mobile-social-link">
                  {layout.mobileSocials?.[0] || "f"}
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  {layout.mobileSocials?.[1] || "ig"}
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  {layout.mobileSocials?.[2] || "in"}
                </Link>
                <Link href="#" className="nav-mobile-social-link">
                  {layout.mobileSocials?.[3] || "t"}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}