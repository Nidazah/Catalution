"use client";

import CustomCursor from "../components/CustomCursor";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ConsultantBanner from "../components/ConsultantBanner";
import { defaultLayout, defaultSectionStyles } from "@/lib/site-defaults";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, type ReactNode } from "react";

const SITE_SETTINGS_CACHE_KEY = "cms-site-settings-cache-v3";

export default function RootShell({ children }: { children: ReactNode }) {
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
    // The admin has its own settings loader.  Do not let the public-shell
    // loader run on /admin and race a Reset/Save request, otherwise an older
    // GET can put stale settings back into localStorage while the admin is
    // resetting a section.
    if (pathname.startsWith("/admin")) return;

    try {
      const cached = window.localStorage.getItem(SITE_SETTINGS_CACHE_KEY);
      if (cached) applySiteSettings(JSON.parse(cached));
    } catch {
      // ignore malformed/blocked cache
    }
  }, [pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    let cancelled = false;

    const handleSettingsStorage = (event: StorageEvent) => {
      if (event.key !== SITE_SETTINGS_CACHE_KEY || !event.newValue) return;
      try {
        applySiteSettings(JSON.parse(event.newValue));
      } catch {
        // ignore malformed cache updates
      }
    };

    window.addEventListener("storage", handleSettingsStorage);

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
      window.removeEventListener("storage", handleSettingsStorage);
    };
  }, [pathname]);

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
    "--cms-button-px": `${Number(t.buttonPaddingX || 24)}px`,
    "--cms-button-py": `${Number(t.buttonPaddingY || 12)}px`,
    "--cms-button-primary-bg": clean(t.buttonPrimaryBg, "#481d96"),
    "--cms-button-primary-text": clean(t.buttonPrimaryText, "#ffffff"),
    "--cms-button-primary-border": clean(
      t.buttonPrimaryBorderColor,
      String(t.buttonPrimaryBg ?? "#481d96"),
    ),
    "--cms-button-primary-hover-bg": clean(t.buttonPrimaryHoverBg, "#6d28d9"),
    "--cms-button-primary-hover-text": clean(
      t.buttonPrimaryHoverText,
      "#ffffff",
    ),
    "--cms-button-primary-hover-border": clean(
      t.buttonPrimaryHoverBorderColor,
      String(t.buttonPrimaryHoverBg ?? "#6d28d9"),
    ),
    "--cms-button-secondary-bg": clean(t.buttonSecondaryBg, "#ff6800"),
    "--cms-button-secondary-text": clean(t.buttonSecondaryText, "#ffffff"),
    "--cms-button-secondary-border": clean(
      t.buttonSecondaryBorderColor,
      String(t.buttonSecondaryBg ?? "#ff6800"),
    ),
    "--cms-button-secondary-hover-bg": clean(
      t.buttonSecondaryHoverBg,
      "#fb923c",
    ),
    "--cms-button-secondary-hover-text": clean(
      t.buttonSecondaryHoverText,
      "#ffffff",
    ),
    "--cms-button-secondary-hover-border": clean(
      t.buttonSecondaryHoverBorderColor,
      String(t.buttonSecondaryHoverBg ?? "#fb923c"),
    ),
    "--cms-btn-hover-transform": (() => {
      const effect = clean(t.buttonHoverEffect, "none");
      if (effect === "lift") return "translateY(-2px)";
      if (effect === "scale") return "scale(1.05)";
      return "none";
    })(),
    "--cms-btn-hover-shadow": (() => {
      const effect = clean(t.buttonHoverEffect, "none");
      if (effect === "lift") return "0 10px 20px -6px rgba(10,37,64,0.35)";
      if (effect === "glow") return "0 0 18px 3px rgba(72,29,150,0.45)";
      return "none";
    })(),
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
  const isPlainObject = (value: unknown): value is Record<string, any> =>
    !!value && typeof value === "object" && !Array.isArray(value);

  const rawOverrides = (payload.sectionStylesOverrides || {}) as Record<
    string,
    any
  >;
  const allSectionStyles = (payload.sectionStyles || {}) as Record<string, any>;

  // The previous Layout & Section Manager version used 64px as the generic
  // Hero padding default. Those values were never part of the original Hero
  // design and could leave a visible gap below the navbar after an old save.
  // Treat only those old default-equal Hero values as legacy; explicit newer
  // Hero spacing remains fully editable.
  const normalizedRawOverrides: Record<string, any> = Object.fromEntries(
    Object.entries(rawOverrides).map(([key, value]) => {
      if (
        !value ||
        typeof value !== "object" ||
        Array.isArray(value) ||
        key !== "HERO"
      ) {
        return [key, value];
      }
      const next = { ...(value as Record<string, any>) };
      const version = Number(next._layoutManagerVersion || 0);
      if (
        (version > 0 && version < 3) ||
        (version === 0 && Object.keys(next).length >= 12)
      ) {
        if (Number(next.paddingTop) === 64) delete next.paddingTop;
        if (Number(next.paddingBottom) === 64) delete next.paddingBottom;
      }
      return [key, next];
    }),
  );
  const has = (obj: Record<string, any>, field: string) =>
    !!obj &&
    Object.prototype.hasOwnProperty.call(obj, field) &&
    obj[field] !== undefined;

  const sectionKeys = Array.from(
    new Set([
      ...Object.keys(defaultSectionStyles),
      ...Object.keys(allSectionStyles),
      ...Object.keys(normalizedRawOverrides),
    ]),
  );

  const sectionCss = sectionKeys
    .map((key) => {
      const raw = normalizedRawOverrides[key] || {};
      const merged = allSectionStyles[key] || {};
      const safeKey = key.replace(/[^A-Z0-9_-]/gi, "");

      // Older versions of Layout & Section Manager saved the entire
      // effective/default style object. Those records unintentionally
      // turned the original component CSS into hard overrides (for example
      // forcing every section to 64px padding and forcing About/Process to
      // the generic text-left direction). Treat a large unversioned object
      // as legacy and ignore only layout/position fields. Theme/color fields
      // remain intact. New saves carry _layoutManagerVersion: 3.
      const layoutManagerVersion = Number(raw._layoutManagerVersion || 0);
      const legacyFullStyle =
        layoutManagerVersion < 2 && Object.keys(raw).length >= 12;
      const hasStyle = (field: string) => !legacyFullStyle && has(raw, field);
      const hasColorStyle = (field: string) => has(raw, field);

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
      const bg = hasColorStyle("backgroundColor")
        ? clean(merged.backgroundColor, "")
        : "";
      const text = hasColorStyle("textColor")
        ? clean(merged.textColor, "")
        : "";
      const heading = hasColorStyle("headingColor")
        ? clean(merged.headingColor, "")
        : "";
      const eyebrow = hasColorStyle("eyebrowColor")
        ? clean(merged.eyebrowColor, "")
        : "";
      const body = hasColorStyle("bodyColor")
        ? clean(merged.bodyColor, "")
        : "";
      const border = hasColorStyle("borderColor")
        ? clean(merged.borderColor, "")
        : "";
      const align =
        hasStyle("contentAlign") &&
        ["left", "center", "right"].includes(merged.contentAlign)
          ? merged.contentAlign
          : null;
      // Hero's top padding defaults to 70px (see defaultSectionStyles.HERO
      // in site-defaults.ts) and, unlike every other section/field, that
      // default is meant to be the section's real baseline — not just a
      // fallback used while nothing has an opinion. So apply it on the
      // public frontend from `merged` (default 70, or an admin's saved
      // override if one exists) unconditionally, instead of gating on
      // `hasStyle`, which would otherwise leave the live Hero section on
      // its own hardcoded 0px until someone explicitly saves a value.
      // Every other section's paddingTop keeps the existing opt-in-only
      // behavior below.
      const pt =
        key === "HERO"
          ? Number(merged.paddingTop ?? 60)
          : hasStyle("paddingTop")
            ? Number(merged.paddingTop ?? 64)
            : null;
      const pb = hasStyle("paddingBottom")
        ? Number(merged.paddingBottom ?? 64)
        : null;
      const pl = hasStyle("paddingLeft")
        ? Number(merged.paddingLeft ?? 0)
        : null;
      const pr = hasStyle("paddingRight")
        ? Number(merged.paddingRight ?? 0)
        : null;
      const mt = hasStyle("marginTop") ? Number(merged.marginTop ?? 0) : null;
      const mb = hasStyle("marginBottom")
        ? Number(merged.marginBottom ?? 0)
        : null;
      const ml = hasStyle("marginLeft") ? Number(merged.marginLeft ?? 0) : null;
      const mr = hasStyle("marginRight")
        ? Number(merged.marginRight ?? 0)
        : null;
      const titleSize = hasStyle("titleSize")
        ? Number(merged.titleSize ?? 48)
        : null;
      const titleWeight = hasStyle("titleWeight")
        ? Number(merged.titleWeight ?? 700)
        : null;
      const headingFont = hasStyle("headingFont")
        ? clean(merged.headingFont, "Poppins")
        : null;
      const bodyFont = hasStyle("bodyFont")
        ? clean(merged.bodyFont, "Inter")
        : null;
      const bodySize = hasStyle("bodySize")
        ? Number(merged.bodySize ?? 16)
        : null;
      const bodyLine = hasStyle("bodyLineHeight")
        ? Number(merged.bodyLineHeight ?? 1.6)
        : null;
      const radius = hasStyle("radius") ? Number(merged.radius ?? 0) : null;
      const maxWidth = hasStyle("maxWidth")
        ? Number(merged.maxWidth ?? 1280)
        : null;
      const tx = hasStyle("titleOffsetX")
        ? Number(merged.titleOffsetX ?? 0)
        : 0;
      const ty = hasStyle("titleOffsetY")
        ? Number(merged.titleOffsetY ?? 0)
        : 0;
      const cx = hasStyle("contentOffsetX")
        ? Number(merged.contentOffsetX ?? 0)
        : 0;
      const cy = hasStyle("contentOffsetY")
        ? Number(merged.contentOffsetY ?? 0)
        : 0;
      const ix = hasStyle("imageOffsetX")
        ? Number(merged.imageOffsetX ?? 0)
        : 0;
      const iy = hasStyle("imageOffsetY")
        ? Number(merged.imageOffsetY ?? 0)
        : 0;
      const imagePos = hasStyle("imageObjectPosition")
        ? clean(merged.imageObjectPosition, "center")
        : null;
      const layoutDirection =
        hasStyle("layoutDirection") &&
        ["text-left", "image-left", "centered", "stacked"].includes(
          String(merged.layoutDirection),
        )
          ? String(merged.layoutDirection)
          : null;
      const buttonBg = hasColorStyle("buttonBackground")
        ? clean(merged.buttonBackground, "")
        : "";
      const buttonText = hasColorStyle("buttonText")
        ? clean(merged.buttonText, "")
        : "";
      const bx = hasStyle("buttonOffsetX")
        ? Number(merged.buttonOffsetX ?? 0)
        : 0;
      const by = hasStyle("buttonOffsetY")
        ? Number(merged.buttonOffsetY ?? 0)
        : 0;
      const spacingUnit = ["px", "rem"].includes(String(merged.spacingUnit))
        ? String(merged.spacingUnit)
        : "px";
      const positionUnit = ["px", "%", "rem"].includes(
        String(merged.positionUnit),
      )
        ? String(merged.positionUnit)
        : "px";
      const visibility = isPlainObject(raw.visibility) ? raw.visibility : {};
      const advancedZ = hasStyle("zIndex") ? Number(merged.zIndex ?? 0) : null;
      const overflow =
        hasStyle("overflow") &&
        ["visible", "hidden", "clip", "auto"].includes(String(merged.overflow))
          ? String(merged.overflow)
          : null;
      const positionMode =
        hasStyle("positionMode") &&
        ["static", "relative", "sticky"].includes(String(merged.positionMode))
          ? String(merged.positionMode)
          : null;
      const display =
        (hasStyle("enabled") && merged.enabled === false) ||
        (hasStyle("published") && merged.published === false)
          ? "none"
          : null;
      const deviceVisibilityCss = `
.cms-section[data-cms-section="${safeKey}"] {
  ${visibility.desktop === false ? "display:none!important;" : ""}
}
@media (max-width: 1023px) and (min-width: 768px) {
  .cms-section[data-cms-section="${safeKey}"] { ${visibility.tablet === false ? "display:none!important;" : ""} }
}
@media (max-width: 767px) {
  .cms-section[data-cms-section="${safeKey}"] { ${visibility.mobile === false ? "display:none!important;" : ""} }
}
`;
      const responsive = isPlainObject(raw.responsive) ? raw.responsive : {};
      const responsiveCss = (["tablet", "mobile"] as const)
        .map((device) => {
          const r = isPlainObject(responsive[device]) ? responsive[device] : {};
          const field = (name: string) =>
            Object.prototype.hasOwnProperty.call(r, name) &&
            r[name] !== undefined;
          const rUnit = ["px", "rem"].includes(
            String(r.spacingUnit ?? spacingUnit),
          )
            ? String(r.spacingUnit ?? spacingUnit)
            : spacingUnit;
          const rPosUnit = ["px", "%", "rem"].includes(
            String(r.positionUnit ?? positionUnit),
          )
            ? String(r.positionUnit ?? positionUnit)
            : positionUnit;
          const declaration = (name: string, cssName: string, unit: string) =>
            field(name)
              ? `${cssName}:${Number(r[name] ?? 0)}${unit}!important;`
              : "";
          const transform = (x: string, y: string) =>
            field(x) || field(y)
              ? `transform:translate(${Number(r[x] ?? 0)}${rPosUnit},${Number(r[y] ?? 0)}${rPosUnit})!important;`
              : "";
          const titleTransform = transform("titleOffsetX", "titleOffsetY");
          const contentTransform = transform(
            "contentOffsetX",
            "contentOffsetY",
          );
          const imageTransform = transform("imageOffsetX", "imageOffsetY");
          const buttonTransform = transform("buttonOffsetX", "buttonOffsetY");
          const tabletOnly =
            device === "tablet"
              ? "@media (max-width:1023px) and (min-width:768px)"
              : "@media (max-width:767px)";
          return `${tabletOnly} {
  .cms-section[data-cms-section="${safeKey}"] > section {
    ${declaration("paddingTop", "padding-top", rUnit)}
    ${declaration("paddingRight", "padding-right", rUnit)}
    ${declaration("paddingBottom", "padding-bottom", rUnit)}
    ${declaration("paddingLeft", "padding-left", rUnit)}
    ${declaration("marginTop", "margin-top", rUnit)}
    ${declaration("marginRight", "margin-right", rUnit)}
    ${declaration("marginBottom", "margin-bottom", rUnit)}
    ${declaration("marginLeft", "margin-left", rUnit)}
  }
  .cms-section[data-cms-section="${safeKey}"] h1,.cms-section[data-cms-section="${safeKey}"] h2,.cms-section[data-cms-section="${safeKey}"] h3,.cms-section[data-cms-section="${safeKey}"] h4 { ${titleTransform} }
  .cms-section[data-cms-section="${safeKey}"] > section > div { ${contentTransform} }
  .cms-section[data-cms-section="${safeKey}"] .cms-layout-role-content { ${contentTransform} }
  .cms-section[data-cms-section="${safeKey}"] img { ${imageTransform} }
  .cms-section[data-cms-section="${safeKey}"] a.btn,.cms-section[data-cms-section="${safeKey}"] button.btn { ${buttonTransform} }
}`;
        })
        .join("\n");
      const pairedLayoutCss =
        layoutDirection && ["HERO", "ABOUT", "PROCESS"].includes(key)
          ? `
.cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image .cms-layout-role-content {
  order:${layoutDirection === "image-left" ? 2 : 1};
}
.cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image .cms-layout-role-image {
  order:${layoutDirection === "image-left" ? 1 : 2};
}
${layoutDirection === "centered" ? `.cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image{grid-template-columns:1fr!important}.cms-section[data-cms-section="${safeKey}"] .cms-layout-role-content{text-align:center!important}.cms-section[data-cms-section="${safeKey}"] .cms-layout-role-image{max-width:520px;margin-left:auto;margin-right:auto}` : ""}
${layoutDirection === "stacked" ? `.cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image{grid-template-columns:1fr!important}.cms-section[data-cms-section="${safeKey}"] .cms-layout-role-content{order:1}.cms-section[data-cms-section="${safeKey}"] .cms-layout-role-image{order:2}` : ""}
@media (max-width: 767px) {
  .cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image .cms-layout-role-content { order:1; }
  .cms-section[data-cms-section="${safeKey}"] .cms-layout-content-image .cms-layout-role-image { order:2; }
}
`
          : "";

      return `
.cms-section[data-cms-section="${safeKey}"] > section {
  ${display ? `display:${display}!important;` : ""}
  ${bg ? `background:${bg}!important;` : ""}
  ${text ? `color:${text}!important;` : ""}
  ${pt !== null ? `padding-top:${pt}${spacingUnit}!important;` : ""}
  ${pb !== null ? `padding-bottom:${pb}${spacingUnit}!important;` : ""}
  ${pl !== null ? `padding-left:${pl}${spacingUnit}!important;` : ""}
  ${pr !== null ? `padding-right:${pr}${spacingUnit}!important;` : ""}
  ${mt !== null ? `margin-top:${mt}${spacingUnit}!important;` : ""}
  ${mb !== null ? `margin-bottom:${mb}${spacingUnit}!important;` : ""}
  ${ml !== null ? `margin-left:${ml}${spacingUnit}!important;` : ""}
  ${mr !== null ? `margin-right:${mr}${spacingUnit}!important;` : ""}
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
  ${tx || ty ? `transform:translate(${tx}${positionUnit},${ty}${positionUnit});` : ""}
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
  ${bx || by ? `transform:translate(${bx}${positionUnit},${by}${positionUnit});` : ""}
}
.cms-section[data-cms-section="${safeKey}"] span.text-accent,
.cms-section[data-cms-section="${safeKey}"] .text-accent {
  ${eyebrow ? `color:${eyebrow}!important;` : ""}
}
.cms-section[data-cms-section="${safeKey}"] > section > div {
  ${maxWidth !== null ? `max-width:${maxWidth}px;` : ""}
  ${cx || cy ? `transform:translate(${cx}${positionUnit},${cy}${positionUnit});` : ""}
}
.cms-section[data-cms-section="${safeKey}"] img {
  ${imagePos ? `object-position:${imagePos}!important;` : ""}
  ${ix || iy ? `transform:translate(${ix}${positionUnit},${iy}${positionUnit});` : ""}
}
${advancedZ !== null ? `.cms-section[data-cms-section="${safeKey}"]{z-index:${advancedZ};}` : ""}
${overflow ? `.cms-section[data-cms-section="${safeKey}"] > section{overflow:${overflow};}` : ""}
${positionMode ? `.cms-section[data-cms-section="${safeKey}"] > section{position:${positionMode};}` : ""}
${deviceVisibilityCss}
${responsiveCss}
${pairedLayoutCss}`;
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
          @media (max-width: 767px) {
            .cms-section > section { max-width: 100%; box-sizing: border-box; }
            .cms-section img { max-width: 100%; }
          }
        `;

  // Apply optional Advanced identifiers/classes directly to the real CMS
  // section wrappers. This keeps the setting section-scoped without changing
  // the markup of the existing frontend components.
  document
    .querySelectorAll<HTMLElement>(".cms-section[data-cms-section]")
    .forEach((element) => {
      const key = element.dataset.cmsSection || "";
      const style = rawOverrides[key] || {};
      const previous = element.dataset.cmsCustomClass || "";
      previous
        .split(/\s+/)
        .filter(Boolean)
        .forEach((name) => element.classList.remove(name));
      const customClass =
        typeof style.customClass === "string"
          ? style.customClass.replace(/[^a-zA-Z0-9_-]/g, " ").trim()
          : "";
      if (customClass)
        customClass
          .split(/\s+/)
          .filter(Boolean)
          .forEach((name) => element.classList.add(name));
      element.dataset.cmsCustomClass = customClass;
      const htmlId =
        typeof style.htmlId === "string"
          ? style.htmlId.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 80)
          : "";
      if (htmlId) element.id = htmlId;
      else if (element.dataset.cmsGeneratedId) element.removeAttribute("id");
      element.dataset.cmsGeneratedId = htmlId;
    });

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
  // Navbar CTA is the site's global primary button. Keep these
  // compatibility variables in sync with Theme → Global Buttons
  // so legacy navbar styles cannot override the CMS button colors.
  root.style.setProperty(
    "--cms-navbar-cta-bg",
    clean(t.buttonPrimaryBg, "#481d96"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-text",
    clean(t.buttonPrimaryText, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-border",
    clean(t.buttonPrimaryBorderColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-hover-bg",
    clean(t.buttonPrimaryHoverBg, "#6d28d9"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-hover-text",
    clean(t.buttonPrimaryHoverText, "#ffffff"),
  );
  root.style.setProperty(
    "--cms-navbar-cta-hover-border",
    clean(t.buttonPrimaryHoverBorderColor, "#6d28d9"),
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
  const footerOverrides = (payload.layoutOverrides?.footer || {}) as Record<
    string,
    unknown
  >;
  const defaultFooter = defaultLayout.footer;

  // Footer-specific colors are still respected when the admin explicitly
  // saved a custom value. Legacy/default-equal values are treated as
  // untouched, so the global Theme Settings can recolor the footer too.
  const footerColor = (key: string, themeValue: unknown, fallback: string) => {
    const override = footerOverrides[key];
    const original = (defaultFooter as Record<string, unknown>)[key];
    return clean(
      override !== undefined && override !== original ? override : themeValue,
      fallback,
    );
  };

  root.style.setProperty(
    "--cms-footer-bg",
    footerColor("backgroundColor", t.sectionColor, "#f8f5ff"),
  );
  root.style.setProperty(
    "--cms-footer-heading",
    footerColor("headingColor", t.headingColor, "#1e1233"),
  );
  root.style.setProperty(
    "--cms-footer-text",
    footerColor("textColor", t.bodyColor, "#6b7280"),
  );
  root.style.setProperty(
    "--cms-footer-link",
    footerColor("linkColor", t.primaryColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-footer-bottom",
    footerColor("bottomBackground", t.primaryColor, "#481d96"),
  );
  root.style.setProperty(
    "--cms-footer-bottom-text",
    footerColor(
      "bottomText",
      `color-mix(in srgb, ${clean(t.primaryColor, "#481d96")} 20%, white 80%)`,
      "#dccbff",
    ),
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
