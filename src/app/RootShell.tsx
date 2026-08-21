"use client";

import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultantBanner from "../components/ConsultantBanner";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    const clean = (value: unknown, fallback: string) => {
      const s = String(value ?? fallback);
      return s.replace(/[{};]/g, "");
    };

    fetch("/api/site-settings", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (cancelled || !payload) return;

        const t = (payload.theme || {}) as Record<string, unknown>;
        const root = document.documentElement;
        const vars: Record<string, string> = {
          "--color-purple-900": clean(t.primaryColor, "#481d96"),
          "--color-purple-700": clean(t.secondaryColor, "#6d28d9"),
          "--color-accent": clean(t.accentColor, "#ff6800"),
          "--color-accent-soft": clean(t.accentSoftColor, "#ffb164"),
          "--color-bg": clean(t.backgroundColor, "#ffffff"),
          "--color-section": clean(t.sectionColor, "#f8f5ff"),
          "--color-heading": clean(t.headingColor, "#1e1233"),
          "--color-body": clean(t.bodyColor, "#6b7280"),
          "--color-line": clean(t.lineColor, "#e7def7"),
          "--cms-heading-font": clean(t.headingFont, "Poppins"),
          "--cms-body-font": clean(t.bodyFont, "Inter"),
          "--cms-heading-weight": clean(t.headingWeight, "700"),
          "--cms-body-weight": clean(t.bodyWeight, "400"),
          "--cms-base-font-size": `${Number(t.baseFontSize || 16)}px`,
          "--cms-body-line-height": String(Number(t.bodyLineHeight || 1.6)),
          "--radius-btn": `${Number(t.buttonRadius ?? t.radius ?? 12)}px`,
          "--cms-container-width": `${Number(t.containerWidth || 1280)}px`,
          "--cms-section-gap": `${Number(t.sectionGap || 0)}px`,
          "--cms-button-px": `${Number(t.buttonPaddingX || 24)}px`,
          "--cms-button-py": `${Number(t.buttonPaddingY || 12)}px`,
          "--cms-button-primary-bg": clean(t.buttonPrimaryBg, "#481d96"),
          "--cms-button-primary-text": clean(t.buttonPrimaryText, "#ffffff"),
          "--cms-button-secondary-bg": clean(t.buttonSecondaryBg, "#ff6800"),
          "--cms-button-secondary-text": clean(t.buttonSecondaryText, "#ffffff"),
        };
        Object.entries(vars).forEach(([key, value]) => root.style.setProperty(key, value));

        root.style.setProperty("--font-poppins", `"${vars["--cms-heading-font"]}", Poppins, Arial, sans-serif`);
        root.style.setProperty("--font-inter", `"${vars["--cms-body-font"]}", Inter, Arial, sans-serif`);
        document.body.style.fontSize = vars["--cms-base-font-size"];
        document.body.style.fontFamily = `"${vars["--cms-body-font"]}", Inter, Arial, sans-serif`;
        document.body.style.fontWeight = vars["--cms-body-weight"];
        document.body.style.lineHeight = vars["--cms-body-line-height"];

        const themeStyleId = "cms-theme-runtime";
        let themeStyle = document.getElementById(themeStyleId) as HTMLStyleElement | null;
        if (!themeStyle) {
          themeStyle = document.createElement("style");
          themeStyle.id = themeStyleId;
          document.head.appendChild(themeStyle);
        }

        // `sectionStyles` from the API only ever contains sections an admin has
        // explicitly customized — untouched sections simply aren't present here,
        // so they keep using the site's own built-in spacing/styling untouched.
        const sectionStyles = (payload.sectionStyles || {}) as Record<string, any>;
        const sectionCss = Object.entries(sectionStyles).map(([key, raw]) => {
          const s = raw || {};
          const safeKey = key.replace(/[^A-Z0-9_-]/gi, "");
          const bg = clean(s.backgroundColor, "transparent");
          const text = clean(s.textColor, "");
          const heading = clean(s.headingColor, "");
          const eyebrow = clean(s.eyebrowColor, "");
          const body = clean(s.bodyColor, "");
          const border = clean(s.borderColor, "transparent");
          const align = ["left","center","right"].includes(s.contentAlign) ? s.contentAlign : "left";
          const pt = Number(s.paddingTop ?? 64);
          const pb = Number(s.paddingBottom ?? 64);
          const titleSize = Number(s.titleSize ?? 48);
          const titleWeight = Number(s.titleWeight ?? 700);
          const headingFont = clean(s.headingFont, "Poppins");
          const bodyFont = clean(s.bodyFont, "Inter");
          const bodySize = Number(s.bodySize ?? 16);
          const bodyLine = Number(s.bodyLineHeight ?? 1.6);
          const radius = Number(s.radius ?? 0);
          const maxWidth = Number(s.maxWidth ?? 1280);
          const tx = Number(s.titleOffsetX ?? 0), ty = Number(s.titleOffsetY ?? 0);
          const cx = Number(s.contentOffsetX ?? 0), cy = Number(s.contentOffsetY ?? 0);
          const ix = Number(s.imageOffsetX ?? 0), iy = Number(s.imageOffsetY ?? 0);
          const imagePos = clean(s.imageObjectPosition, "center");
          const buttonBg = clean(s.buttonBackground, "");
          const buttonText = clean(s.buttonText, "");
          const display = s.enabled === false ? "none" : "block";
          return `
.cms-section[data-cms-section="${safeKey}"] > section {
  display:${display}!important;
  background:${bg}!important;
  color:${text || "inherit"}!important;
  padding-top:${pt}px!important;
  padding-bottom:${pb}px!important;
  text-align:${align};
  border-color:${border}!important;
  border-radius:${radius}px;
}
.cms-section[data-cms-section="${safeKey}"] h1,
.cms-section[data-cms-section="${safeKey}"] h2,
.cms-section[data-cms-section="${safeKey}"] h3,
.cms-section[data-cms-section="${safeKey}"] h4 {
  ${heading ? `color:${heading}!important;` : ""}
  font-family:"${headingFont}", var(--font-poppins), Poppins, Arial, sans-serif!important;
  font-size:${titleSize}px!important;
  font-weight:${titleWeight}!important;
  transform:translate(${tx}px,${ty}px);
}
.cms-section[data-cms-section="${safeKey}"] p,
.cms-section[data-cms-section="${safeKey}"] li {
  ${body ? `color:${body}!important;` : text ? `color:${text}!important;` : ""}
  font-family:"${bodyFont}", var(--font-inter), Inter, Arial, sans-serif;
  font-size:${bodySize}px;
  line-height:${bodyLine};
}
.cms-section[data-cms-section="${safeKey}"] a.btn,
.cms-section[data-cms-section="${safeKey}"] button.btn {
  ${buttonBg ? `background:${buttonBg}!important;border-color:${buttonBg}!important;` : ""}
  ${buttonText ? `color:${buttonText}!important;` : ""}
}
.cms-section[data-cms-section="${safeKey}"] span.text-accent,
.cms-section[data-cms-section="${safeKey}"] .text-accent {
  ${eyebrow ? `color:${eyebrow}!important;` : ""}
}
.cms-section[data-cms-section="${safeKey}"] > section > div {
  max-width:${maxWidth}px;
  transform:translate(${cx}px,${cy}px);
}
.cms-section[data-cms-section="${safeKey}"] img {
  object-position:${imagePos}!important;
  transform:translate(${ix}px,${iy}px);
}
`;
        }).join("\n");

        themeStyle.textContent = `
          .font-display{font-family:"${vars["--cms-heading-font"]}",Poppins,Arial,sans-serif!important;font-weight:${vars["--cms-heading-weight"]}!important}
          .font-inter{font-family:"${vars["--cms-body-font"]}",Inter,Arial,sans-serif!important;font-weight:${vars["--cms-body-weight"]}!important}
          .btn{border-radius:var(--radius-btn)!important;padding-left:var(--cms-button-px)!important;padding-right:var(--cms-button-px)!important;padding-top:var(--cms-button-py)!important;padding-bottom:var(--cms-button-py)!important}
          .btn-primary{background:var(--cms-button-primary-bg)!important;color:var(--cms-button-primary-text)!important;border-color:var(--cms-button-primary-bg)!important}
          .btn-secondary{background:var(--cms-button-secondary-bg)!important;color:var(--cms-button-secondary-text)!important;border-color:var(--cms-button-secondary-bg)!important}
          .nav-link:hover,.nav-link.active{color:var(--cms-navbar-active)!important}
          .navbar-links .nav-link{color:var(--cms-navbar-text)}
          .cms-section > section .mx-auto{max-width:min(var(--cms-container-width),100%)}
          ${sectionCss}
        `;

        const layout = (payload.layout || {}) as Record<string, any>;
        const navbar = layout.navbar || {};
        root.style.setProperty("--cms-navbar-bg", clean(navbar.backgroundColor, "#ffffff"));
        root.style.setProperty("--cms-navbar-text", clean(navbar.textColor, "#481d96"));
        root.style.setProperty("--cms-navbar-active", clean(navbar.activeColor, "#ff6800"));
        root.style.setProperty("--cms-navbar-cta-bg", clean(navbar.ctaBackground, "#481d96"));
        root.style.setProperty("--cms-navbar-cta-text", clean(navbar.ctaText, "#ffffff"));
        root.style.setProperty("--cms-navbar-border", clean(navbar.borderColor, "#e7def7"));
        root.style.setProperty("--cms-navbar-px", `${Number(navbar.paddingX ?? 4)}%`);
        root.style.setProperty("--cms-navbar-py", `${Number(navbar.paddingY ?? 1)}rem`);

        const footer = layout.footer || {};
        root.style.setProperty("--cms-footer-bg", clean(footer.backgroundColor, "#f8f5ff"));
        root.style.setProperty("--cms-footer-heading", clean(footer.headingColor, "#1e1233"));
        root.style.setProperty("--cms-footer-text", clean(footer.textColor, "#6b7280"));
        root.style.setProperty("--cms-footer-link", clean(footer.linkColor, "#481d96"));
        root.style.setProperty("--cms-footer-bottom", clean(footer.bottomBackground, "#481d96"));
        root.style.setProperty("--cms-footer-bottom-text", clean(footer.bottomText, "#dccbff"));
        root.style.setProperty("--cms-footer-pt", `${Number(footer.paddingTop ?? 80)}px`);
        root.style.setProperty("--cms-footer-pb", `${Number(footer.paddingBottom ?? 80)}px`);

        const banner = layout.consultantBanner || {};
        root.style.setProperty("--cms-banner-bg", clean(banner.backgroundColor, "#481d96"));
        root.style.setProperty("--cms-banner-text", clean(banner.textColor, "#ffffff"));
        root.style.setProperty("--cms-banner-button-bg", clean(banner.buttonBackground, "#ffffff"));
        root.style.setProperty("--cms-banner-button-text", clean(banner.buttonText, "#481d96"));
        root.style.setProperty("--cms-banner-pt", `${Number(banner.paddingTop ?? 40)}px`);
        root.style.setProperty("--cms-banner-pb", `${Number(banner.paddingBottom ?? 40)}px`);
      })
      .catch(() => {});

    return () => { cancelled = true; };
  }, []);

  // Admin panel has its own layout/chrome — skip the public site's navbar/footer entirely
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  // List of pages where you want the transparent navbar
  // Add new routes here as you build more pages
  const pagesWithTransparentNavbar = [
    "/pricing",
    "/services",
    "/portfolios",
    "/blog",
    "/blog-grid",
    "/blog-sidebar",
    "/blog-standard",
    "/contact",
    "/about",
    "/team",
    "/careers",
    "/faq",
    "/history",
    "/404",
    "/team/1",
    "/portfolios/1",
    "/blog/1",
  ];

  // Update the check to include startsWith logic for dynamic routes
  const isTransparent =
    pagesWithTransparentNavbar.includes(pathname) ||
    pathname.startsWith("/services/") ||
    pathname.startsWith("/portfolios/") ||
    pathname.startsWith("/blog/") ||
    pathname.startsWith("/team/") ||
    pathname.startsWith("/careers/");

  return (
    <>
      <CustomCursor />

      <Navbar transparent={isTransparent} lightText={isTransparent} />

      <div className={isTransparent ? "" : "pt-[70px]"}>
        {children}
      </div>

      {pathname !== "/" && <ConsultantBanner />}

      <Footer />
    </>
  );
}