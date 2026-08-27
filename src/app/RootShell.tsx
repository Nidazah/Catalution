"use client";

import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultantBanner from "../components/ConsultantBanner";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";

const SITE_SETTINGS_CACHE_KEY = "cms-site-settings-cache-v1";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Apply whatever settings we already have (from a previous load, cached in
  // localStorage) synchronously, before the browser paints. This is what
  // stops the "padding changes on every refresh" flash: without this, every
  // reload briefly shows the plain Tailwind defaults until the
  // /api/site-settings fetch below resolves and overrides them a moment
  // later. Re-applying the last-known values immediately means there's
  // nothing to visibly jump to on repeat visits — only the very first load
  // (with no cache yet) can show a brief default state.
  useLayoutEffect(() => {
    try {
      const cached = window.localStorage.getItem(SITE_SETTINGS_CACHE_KEY);
      if (cached) applySiteSettings(JSON.parse(cached));
    } catch {
      // ignore malformed/blocked cache
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site-settings", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((payload) => {
        if (cancelled || !payload) return;
        applySiteSettings(payload);
        try {
          window.localStorage.setItem(
            SITE_SETTINGS_CACHE_KEY,
            JSON.stringify(payload),
          );
        } catch {
          // ignore quota/blocked storage
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
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

      {/* The public navbar is absolutely positioned, so the home hero must start directly beneath it. */}
      <div className={isTransparent || pathname === "/" ? "" : "pt-[70px]"}>
        {children}
      </div>

      {pathname !== "/" && <ConsultantBanner />}

      <Footer />
    </>
  );
}

function applySiteSettings(payload: Record<string, any>) {
  const clean = (value: unknown, fallback: string) => {
    const s = String(value ?? fallback);
    return s.replace(/[{};]/g, "");
  };

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
  Object.entries(vars).forEach(([key, value]) =>
    root.style.setProperty(key, value),
  );

  root.style.setProperty(
    "--font-poppins",
    `"${vars["--cms-heading-font"]}", Poppins, Arial, sans-serif`,
  );
  root.style.setProperty(
    "--font-inter",
    `"${vars["--cms-body-font"]}", Inter, Arial, sans-serif`,
  );
  document.body.style.fontSize = vars["--cms-base-font-size"];
  document.body.style.fontFamily = `"${vars["--cms-body-font"]}", Inter, Arial, sans-serif`;
  document.body.style.fontWeight = vars["--cms-body-weight"];
  document.body.style.lineHeight = vars["--cms-body-line-height"];

  const themeStyleId = "cms-theme-runtime";
  let themeStyle = document.getElementById(
    themeStyleId,
  ) as HTMLStyleElement | null;
  if (!themeStyle) {
    themeStyle = document.createElement("style");
    themeStyle.id = themeStyleId;
    document.head.appendChild(themeStyle);
  }

  // Only force a CSS property when that EXACT field was actually
  // saved by an admin for that section — not just because the
  // section has a saved row at all, and not just because "some
  // section somewhere" was customized.
  //
  // `payload.sectionStyles` always contains every field for every
  // section (e.g. HERO.paddingTop is always present, defaulting to
  // 64, whether or not anyone ever touched it). A saved row can
  // also contain default-equal values for fields nobody actually
  // changed (e.g. if the admin form writes back the whole object on
  // save). Checking only "does this section have a row?" still lets
  // an untouched field like Hero's paddingTop get forcibly set to
  // 64px, which is what was producing the gap between the navbar
  // and the hero content. `sectionStylesOverrides` is the RAW saved
  // data with no defaults merged in, so a field's presence there
  // means it was genuinely set.
  const rawOverrides = (payload.sectionStylesOverrides || {}) as Record<
    string,
    any
  >;
  const allSectionStyles = (payload.sectionStyles || {}) as Record<string, any>;
  const has = (obj: Record<string, any>, field: string) =>
    !!obj &&
    Object.prototype.hasOwnProperty.call(obj, field) &&
    obj[field] !== undefined;

  const sectionCss = Object.keys(rawOverrides)
    .map((key) => {
      const raw = rawOverrides[key] || {};
      const merged = allSectionStyles[key] || {};
      const safeKey = key.replace(/[^A-Z0-9_-]/gi, "");

      // "" means "not customized — leave the section's own original
      // hardcoded background/border alone." Every section has a
      // different real original background (Services is dark navy,
      // Hero is #ECF1F7, Pricing is white, etc.), so there is no single
      // default color that's correct for all of them — the only safe
      // "default" is to not touch it at all. Do NOT default these to
      // "transparent": that IS a real CSS value and would forcibly
      // strip every section's real background the moment any section
      // style row exists in the DB (e.g. right after any section is
      // reset), which is the bug that caused Services' bg-navy to
      // disappear and its white/light text to go unreadable.
      const bg = has(raw, "backgroundColor")
        ? clean(merged.backgroundColor, "")
        : "";
      const text = has(raw, "textColor") ? clean(merged.textColor, "") : "";
      const heading = has(raw, "headingColor")
        ? clean(merged.headingColor, "")
        : "";
      const eyebrow = has(raw, "eyebrowColor")
        ? clean(merged.eyebrowColor, "")
        : "";
      const body = has(raw, "bodyColor") ? clean(merged.bodyColor, "") : "";
      const border = has(raw, "borderColor")
        ? clean(merged.borderColor, "")
        : "";
      const align =
        has(raw, "contentAlign") &&
        ["left", "center", "right"].includes(merged.contentAlign)
          ? merged.contentAlign
          : null;
      const pt = has(raw, "paddingTop")
        ? Number(merged.paddingTop ?? 64)
        : null;

      const pb =
        key === "HERO"
          ? 0
          : has(raw, "paddingBottom")
            ? Number(merged.paddingBottom ?? 64)
            : null;
      const titleSize = has(raw, "titleSize")
        ? Number(merged.titleSize ?? 48)
        : null;
      const titleWeight = has(raw, "titleWeight")
        ? Number(merged.titleWeight ?? 700)
        : null;
      const headingFont = has(raw, "headingFont")
        ? clean(merged.headingFont, "Poppins")
        : null;
      const bodyFont = has(raw, "bodyFont")
        ? clean(merged.bodyFont, "Inter")
        : null;
      const bodySize = has(raw, "bodySize")
        ? Number(merged.bodySize ?? 16)
        : null;
      const bodyLine = has(raw, "bodyLineHeight")
        ? Number(merged.bodyLineHeight ?? 1.6)
        : null;
      const radius = has(raw, "radius") ? Number(merged.radius ?? 0) : null;
      const maxWidth = has(raw, "maxWidth")
        ? Number(merged.maxWidth ?? 1280)
        : null;
      const tx = has(raw, "titleOffsetX")
        ? Number(merged.titleOffsetX ?? 0)
        : 0;
      const ty = has(raw, "titleOffsetY")
        ? Number(merged.titleOffsetY ?? 0)
        : 0;
      const cx = has(raw, "contentOffsetX")
        ? Number(merged.contentOffsetX ?? 0)
        : 0;
      const cy = has(raw, "contentOffsetY")
        ? Number(merged.contentOffsetY ?? 0)
        : 0;
      const ix = has(raw, "imageOffsetX")
        ? Number(merged.imageOffsetX ?? 0)
        : 0;
      const iy = has(raw, "imageOffsetY")
        ? Number(merged.imageOffsetY ?? 0)
        : 0;
      const imagePos = has(raw, "imageObjectPosition")
        ? clean(merged.imageObjectPosition, "center")
        : null;
      const buttonBg = has(raw, "buttonBackground")
        ? clean(merged.buttonBackground, "")
        : "";
      const buttonText = has(raw, "buttonText")
        ? clean(merged.buttonText, "")
        : "";
      const display =
        has(raw, "enabled") && merged.enabled === false ? "none" : null;
      return `
.cms-section[data-cms-section="${safeKey}"] > section {
  ${display ? `display:${display}!important;` : ""}
  ${bg ? `background:${bg}!important;` : ""}
  ${text ? `color:${text}!important;` : ""}
  ${pt !== null ? `padding-top:${pt}px!important;` : ""}
  ${pb !== null ? `padding-bottom:${pb}px!important;` : ""}
  ${align ? `text-align:${align};` : ""}
  ${border ? `border-color:${border}!important;` : ""}
  ${radius !== null ? `border-radius:${radius}px;` : ""}
}
.cms-section[data-cms-section="${safeKey}"] h1,
.cms-section[data-cms-section="${safeKey}"] h2,
.cms-section[data-cms-section="${safeKey}"] h3,
.cms-section[data-cms-section="${safeKey}"] h4 {
  ${heading ? `color:${heading}!important;` : ""}
  ${headingFont ? `font-family:"${headingFont}", var(--font-poppins), Poppins, Arial, sans-serif!important;` : ""}
  ${titleSize !== null ? `font-size:${titleSize}px!important;` : ""}
  ${titleWeight !== null ? `font-weight:${titleWeight}!important;` : ""}
  ${tx || ty ? `transform:translate(${tx}px,${ty}px);` : ""}
}
.cms-section[data-cms-section="${safeKey}"] p,
.cms-section[data-cms-section="${safeKey}"] li {
  ${body ? `color:${body}!important;` : text ? `color:${text}!important;` : ""}
  ${bodyFont ? `font-family:"${bodyFont}", var(--font-inter), Inter, Arial, sans-serif;` : ""}
  ${bodySize !== null ? `font-size:${bodySize}px;` : ""}
  ${bodyLine !== null ? `line-height:${bodyLine};` : ""}
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
  ${maxWidth !== null ? `max-width:${maxWidth}px;` : ""}
  ${cx || cy ? `transform:translate(${cx}px,${cy}px);` : ""}
}
.cms-section[data-cms-section="${safeKey}"] img {
  ${imagePos ? `object-position:${imagePos}!important;` : ""}
  ${ix || iy ? `transform:translate(${ix}px,${iy}px);` : ""}
}
`;
    })
    .join("\n");

  themeStyle.textContent = `
          /*
           * The site-wide container-width setting is only meant for
           * sections that follow the generic full-width band layout
           * (Hero, Services, Team, Price, etc. all use ~1280px via
           * max-w-7xl, matching the default here). About intentionally
           * uses a narrower, different max-width (1020px) as part of its
           * own two-column image+text design — forcing it to the generic
           * site container width stretched it wider than intended and
           * broke its centering. Exclude it from this rule so its own
           * layout is respected regardless of the site-wide setting.
           */
          .cms-section:not([data-cms-section="ABOUT"]) > section .mx-auto{max-width:min(var(--cms-container-width),100%)}
          ${sectionCss}
        `;

  const layout = (payload.layout || {}) as Record<string, any>;
  const navbar = layout.navbar || {};
  root.style.setProperty(
    "--cms-navbar-bg",
    clean(navbar.backgroundColor, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-navbar-text",
    clean(navbar.textColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-navbar-active",
    clean(navbar.activeColor, "#ff6800"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-bg",
    clean(navbar.ctaBackground, "#481d96"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-text",
    clean(navbar.ctaText, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-navbar-border",
    clean(navbar.borderColor, "#e7def7"),
  );
  root.style.setProperty("--cms-navbar-px", `${Number(navbar.paddingX ?? 4)}%`);
  root.style.setProperty(
    "--cms-navbar-py",
    `${Number(navbar.paddingY ?? 1)}rem`,
  );

  const footer = layout.footer || {};
  root.style.setProperty(
    "--cms-footer-bg",
    clean(footer.backgroundColor, "#f8f5ff"),
  );
  root.style.setProperty(
    "--cms-footer-heading",
    clean(footer.headingColor, "#1e1233"),
  );
  root.style.setProperty(
    "--cms-footer-text",
    clean(footer.textColor, "#6b7280"),
  );
  root.style.setProperty(
    "--cms-footer-link",
    clean(footer.linkColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-footer-bottom",
    clean(footer.bottomBackground, "#481d96"),
  );
  root.style.setProperty(
    "--cms-footer-bottom-text",
    clean(footer.bottomText, "#dccbff"),
  );
  root.style.setProperty(
    "--cms-footer-pt",
    `${Number(footer.paddingTop ?? 80)}px`,
  );
  root.style.setProperty(
    "--cms-footer-pb",
    `${Number(footer.paddingBottom ?? 80)}px`,
  );
  const socialShape = clean(footer.socialShape, "circle");
  root.style.setProperty(
    "--cms-footer-social-radius",
    socialShape === "square"
      ? "6px"
      : socialShape === "rounded"
        ? "12px"
        : "9999px",
  );

  const banner = layout.consultantBanner || {};
  root.style.setProperty(
    "--cms-banner-bg",
    clean(banner.backgroundColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-banner-text",
    clean(banner.textColor, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-banner-button-bg",
    clean(banner.buttonBackground, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-banner-button-text",
    clean(banner.buttonText, "#481d96"),
  );
  root.style.setProperty(
    "--cms-banner-pt",
    `${Number(banner.paddingTop ?? 40)}px`,
  );
  root.style.setProperty(
    "--cms-banner-pb",
    `${Number(banner.paddingBottom ?? 40)}px`,
  );
}
