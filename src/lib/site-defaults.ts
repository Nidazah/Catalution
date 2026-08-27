// ============================================================
// ORIGINAL WEBSITE DEFAULTS
// ============================================================
//
// IMPORTANT:
// These values represent the ORIGINAL website state.
//
// The CMS stores only overrides in the database.
// When an override is removed/reset, these defaults are used.
//
// Do not put customized CMS values here.
// ============================================================


// ============================================================
// THEME DEFAULTS
// ============================================================

export const defaultTheme = {
  primaryColor: "#481d96",
  secondaryColor: "#6d28d9",
  accentColor: "#ff6800",
  accentSoftColor: "#ffb164",

  backgroundColor: "#ffffff",
  sectionColor: "#f8f5ff",

  headingColor: "#1e1233",
  bodyColor: "#6b7280",
  lineColor: "#e7def7",

  headingFont: "Poppins",
  bodyFont: "Inter",

  headingWeight: "700",
  bodyWeight: "400",

  baseFontSize: 16,
  headingScale: 1,
  bodyLineHeight: 1.6,

  radius: 12,
  containerWidth: 1280,

  sectionGap: 0,

  buttonRadius: 12,
  buttonPaddingX: 24,
  buttonPaddingY: 12,

  buttonPrimaryBg: "#481d96",
  buttonPrimaryText: "#ffffff",

  buttonSecondaryBg: "#ff6800",
  buttonSecondaryText: "#ffffff",
};


// ============================================================
// LAYOUT DEFAULTS
// ============================================================

export const defaultLayout = {
  // ----------------------------------------------------------
  // NAVBAR
  // ----------------------------------------------------------

  navbar: {
    logo: "/images/Logo/secondary-logo.webp",

    ctaLabel: "Get Started",
    ctaUrl: "/contact",

    exploreLabel: "Explore",

    mobileSearchPlaceholder: "Search here...",

    navItems: [
      {
        label: "Home",
        href: "/",
      },
      {
        label: "Pages",
        href: "#",
      },
      {
        label: "Services",
        href: "/services",
      },
      {
        label: "Portfolios",
        href: "/portfolios",
      },
      {
        label: "Blog",
        href: "/blog",
      },
      {
        label: "Contact",
        href: "/contact",
      },
    ],

    pagesMain: [],
    pagesOther: [],

    backgroundColor: "#ffffff",
    textColor: "#481d96",
    activeColor: "#ff6800",

    ctaBackground: "#481d96",
    ctaText: "#ffffff",

    borderColor: "#e7def7",

    paddingX: 4,
    paddingY: 1,

    logoWidth: 120,

    mobileContactEmail1: "support@catalution.com",
    mobileContactEmail2: "accounts@catalution.com",

    mobileContactPhone: "03015221051",

    mobileContactAddress:
      "Near Plot 37, Tipu Block Garden Town, Lahore",

    mobileSocials: [
      "f",
      "ig",
      "in",
      "t",
    ],
  },


  // ----------------------------------------------------------
  // FOOTER
  // ----------------------------------------------------------

  footer: {
    description:
      "Our mission is to empower businesses of all sizes to thrive in an ever changing marketplace.",

    newsletterTitle:
      "Subscribe to our newsletter",

    copyright:
      "All right reserved.",

    logo:
      "/images/Logo/icon-mark.webp",

    brandName:
      "Catalution",

    social: [
      {
        label: "Facebook",
        href: "https://facebook.com/catalution",
      },
      {
        label: "Instagram",
        href: "https://instagram.com/catalution",
      },
      {
        label: "Twitter",
        href: "https://twitter.com/catalution",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/company/catalution",
      },
    ],

    socialShape: "circle",

    resources: [
      "Contact us",
      "Privacy policy",
      "Recognitions",
      "Careers",
      "Blog",
      "Feedback",
      "Error 404",
    ].map((label) => ({
      label,

      href:
        label === "Careers"
          ? "/careers"
          : label === "Blog"
            ? "/blog"
            : label === "Contact us"
              ? "/contact"
              : label === "Error 404"
                ? "/404"
                : label === "Feedback"
                  ? "/feedback"
                  : "/",

      ...(label === "Careers"
        ? {
            badge: "New",
          }
        : {}),
    })),

    services: [
      "Strategic planning",
      "Market research",
      "Business process",
      "Financial management",
      "Change management",
      "IT consulting",
      "Leadership",
    ].map((label) => ({
      label,
      href: "/services",
    })),

    backgroundColor: "#f8f5ff",
    headingColor: "#1e1233",
    textColor: "#6b7280",
    linkColor: "#481d96",

    bottomBackground: "#481d96",
    bottomText: "#dccbff",

    paddingTop: 80,
    paddingBottom: 80,

    newsletterPlaceholder:
      "Enter email",

    followLabel:
      "Follow Us:",

    resourcesTitle:
      "Resources",

    servicesTitle:
      "Services",

    trustedText:
      "Trusted partner in business excellence",

    privacyLabel:
      "Policy & privacy",

    termsLabel:
      "Terms & conditions",

    privacyUrl:
      "/privacy",

    termsUrl:
      "/terms",

    goTop: {
      enabled: true,

      label: "GO TOP",

      target: "#top",

      backgroundColor: "#ffffff",

      textColor: "#481d96",

      iconColor: "#481d96",
    },
  },


  // ----------------------------------------------------------
  // CONSULTANT BANNER
  // ----------------------------------------------------------

  consultantBanner: {
    enabled: true,

    title:
      "GET CONSULTANT NOW!",

    buttonLabel:
      "Lets talk now",

    buttonUrl:
      "/contact",

    backgroundColor:
      "#481d96",

    textColor:
      "#ffffff",

    buttonBackground:
      "#ffffff",

    buttonText:
      "#481d96",

    paddingTop: 40,
    paddingBottom: 40,
  },
};


// ============================================================
// BASE SECTION STYLE
// ============================================================
//
// Empty strings are intentional.
//
// "" means:
// "Do not override the original hard-coded website design."
//
// This is important because every homepage section may have a
// different original background, color, border, etc.
//
// For example:
//
// backgroundColor: ""
//
// means the Services section keeps its original purple
// background rather than receiving a generic CMS background.
// ============================================================

export const defaultSectionStyle = {
  enabled: true,

  // Empty = preserve original website design
  backgroundColor: "",
  textColor: "",
  headingColor: "",
  eyebrowColor: "",
  bodyColor: "",
  borderColor: "",

  paddingTop: 64,
  paddingBottom: 64,

  contentAlign: "left",

  titleSize: 48,
  titleWeight: "700",

  headingFont: "Poppins",
  bodyFont: "Inter",

  bodySize: 16,
  bodyLineHeight: 1.6,

  titleOffsetX: 0,
  titleOffsetY: 0,

  contentOffsetX: 0,
  contentOffsetY: 0,

  imageObjectPosition: "center",

  imageOffsetX: 0,
  imageOffsetY: 0,

  buttonBackground: "",
  buttonText: "",

  radius: 0,

  maxWidth: 1280,
};


// ============================================================
// HOMEPAGE SECTION DEFAULTS
// ============================================================
//
// IMPORTANT:
// Each section can have its own original dimensions.
//
// The Services section is intentionally different from the
// generic default.
//
// Based on the original website appearance:
//   - Services background is preserved by ""
//   - Services has approximately 40px top padding
//   - Services has approximately 40px bottom padding
//
// This keeps the Services section at the compact height shown
// in the original website screenshot.
// ============================================================

export const defaultSectionStyles = {
  // ----------------------------------------------------------
  // HERO
  // ----------------------------------------------------------

  HERO: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // SERVICES
  // ----------------------------------------------------------
  //
  // ORIGINAL SERVICES SECTION:
  //
  // The screenshot shows a compact purple services strip.
  // Therefore it must NOT use the generic 64px + 64px padding.
  //
  // 40px top + 40px bottom matches the original proportions
  // much more closely.
  // ----------------------------------------------------------

  SERVICES: {
    ...defaultSectionStyle,

    paddingTop: 40,
    paddingBottom: 40,
  },


  // ----------------------------------------------------------
  // ABOUT
  // ----------------------------------------------------------

  ABOUT: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // MARQUE
  // ----------------------------------------------------------

  MARQUE: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // PROCESS
  // ----------------------------------------------------------

  PROCESS: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // TEAM
  // ----------------------------------------------------------

  TEAM: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // CASE STUDIES
  // ----------------------------------------------------------

  CASE_STUDIES: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // PRICING
  // ----------------------------------------------------------

  PRICING: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // TESTIMONIALS
  // ----------------------------------------------------------

  TESTIMONIALS: {
    ...defaultSectionStyle,
  },


  // ----------------------------------------------------------
  // CTA
  // ----------------------------------------------------------

  CTA: {
    ...defaultSectionStyle,
  },
};


// ============================================================
// TYPES
// ============================================================

export type DefaultTheme =
  typeof defaultTheme;

export type DefaultLayout =
  typeof defaultLayout;

export type DefaultSectionStyle =
  typeof defaultSectionStyle;

export type DefaultSectionStyles =
  typeof defaultSectionStyles;