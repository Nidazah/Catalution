import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { prisma, withDbRetry } from "@/lib/prisma";

const defaultTheme = {
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

const sectionKeys = [
  "HERO",
  "SERVICES",
  "ABOUT",
  "MARQUE",
  "PROCESS",
  "TEAM",
  "CASE_STUDIES",
  "PRICING",
  "TESTIMONIALS",
  "CTA",
] as const;

const defaultSectionStyle = {
  enabled: true,
  backgroundColor: "transparent",
  textColor: "",
  headingColor: "",
  eyebrowColor: "",
  bodyColor: "",
  borderColor: "transparent",
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

const defaultSectionStyles = Object.fromEntries(
  sectionKeys.map((key) => [key, { ...defaultSectionStyle }]),
);

const defaultLayout = {
  navbar: {
    logo: "/images/Logo/secondary-logo.webp",
    ctaLabel: "Get Started",
    ctaUrl: "/contact",
    exploreLabel: "Explore",
    mobileSearchPlaceholder: "Search here...",
    navItems: [
      { label: "Home", href: "/" },
      { label: "Pages", href: "#" },
      { label: "Services", href: "/services" },
      { label: "Portfolios", href: "/portfolios" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
    backgroundColor: "#ffffff",
    textColor: "#481d96",
    activeColor: "#ff6800",
    ctaBackground: "#481d96",
    ctaText: "#ffffff",
    borderColor: "#e7def7",
    paddingX: 4,
    paddingY: 1,
    logoWidth: 120,
  },
  footer: {
    description:
      "Our mission is to empower businesses of all sizes to thrive in an ever changing marketplace.",
    newsletterTitle: "Subscribe to our newsletter",
    copyright: "All right reserved.",
    social: [
      { label: "Facebook", href: "https://facebook.com/catalution" },
      { label: "Instagram", href: "https://instagram.com/catalution" },
      { label: "Twitter", href: "https://twitter.com/catalution" },
      { label: "LinkedIn", href: "https://linkedin.com/company/catalution" },
    ],
    backgroundColor: "#f8f5ff",
    headingColor: "#1e1233",
    textColor: "#6b7280",
    linkColor: "#481d96",
    bottomBackground: "#481d96",
    bottomText: "#dccbff",
    paddingTop: 80,
    paddingBottom: 80,
  },
  consultantBanner: {
    enabled: true,
    title: "GET CONSULTANT NOW!",
    buttonLabel: "Lets talk now",
    buttonUrl: "/contact",
    backgroundColor: "#481d96",
    textColor: "#ffffff",
    buttonBackground: "#ffffff",
    buttonText: "#481d96",
    paddingTop: 40,
    paddingBottom: 40,
  },
};

const settingsSchema = z.object({
  key: z.enum(["THEME", "LAYOUT", "SECTION_STYLES"]),
  data: z.record(z.string(), z.any()),
});

async function isAdmin() {
  const session = await getSession();
  return !!session && ["ADMIN", "STAFF"].includes(session.role ?? "");
}

async function getSetting(key: "THEME" | "LAYOUT" | "SECTION_STYLES") {
  const fallback =
    key === "THEME"
      ? defaultTheme
      : key === "LAYOUT"
        ? defaultLayout
        : defaultSectionStyles;
  const row = await withDbRetry(() =>
    prisma.siteSettings.findUnique({ where: { key } }),
  );
  if (!row?.data) return fallback;
  if (key === "SECTION_STYLES")
    return { ...defaultSectionStyles, ...(row.data as object) };
  if (key === "THEME") return { ...defaultTheme, ...(row.data as object) };
  return { ...defaultLayout, ...(row.data as object) };
}

export async function GET(request: Request) {
  const key = new URL(request.url).searchParams.get("key");
  try {
    if (key === "THEME" || key === "LAYOUT" || key === "SECTION_STYLES") {
      const data = await getSetting(key);
      const row =
        key === "SECTION_STYLES"
          ? await withDbRetry(() =>
              prisma.siteSettings.findUnique({ where: { key } }),
            )
          : null;
      // `raw` is the actual, unmerged DB content — only the sections an admin has
      // explicitly customized appear here. The admin editor uses this to tell
      // "customized" sections apart from ones just showing default placeholder values.
      const raw =
        key === "SECTION_STYLES" ? ((row?.data as object) ?? {}) : undefined;
      return NextResponse.json({ key, data, raw, customized: !!row });
    }
    const [theme, layout, sectionRow] = await Promise.all([
      getSetting("THEME"),
      getSetting("LAYOUT"),
      withDbRetry(() =>
        prisma.siteSettings.findUnique({ where: { key: "SECTION_STYLES" } }),
      ),
    ]);
    // IMPORTANT: the live site only receives styles for sections that were
    // explicitly customized (raw DB content), never the default-filled version.
    // That way editing/saving one section's styles can never silently change
    // the spacing/appearance of a section nobody touched.
    const sectionStyles = (sectionRow?.data as object) ?? {};
    return NextResponse.json({
      theme,
      layout,
      sectionStyles,
      sectionStylesCustomized: !!sectionRow,
    });
  } catch (error) {
    console.error("GET /api/site-settings", error);
    return NextResponse.json(
      { theme: defaultTheme, layout: defaultLayout, sectionStyles: {} },
      { status: 200 },
    );
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = settingsSchema.parse(await request.json());
    const row = await withDbRetry(() =>
      prisma.siteSettings.upsert({
        where: { key: body.key },
        create: { key: body.key, data: body.data },
        update: { data: body.data },
      }),
    );
    return NextResponse.json(row);
  } catch (error) {
    if (error instanceof z.ZodError)
      return NextResponse.json(
        { error: "Invalid settings", details: error.flatten() },
        { status: 400 },
      );
    console.error("PUT /api/site-settings", error);
    return NextResponse.json(
      { error: "Could not save settings" },
      { status: 500 },
    );
  }
}

// Reset to default.
//   DELETE /api/site-settings?key=SECTION_STYLES              -> clear every section's customization
//   DELETE /api/site-settings?key=SECTION_STYLES&section=HERO -> clear just one section
//   DELETE /api/site-settings?key=LAYOUT                       -> clear navbar/footer/banner customization
//   DELETE /api/site-settings?key=THEME                        -> clear theme customization
export async function DELETE(request: Request) {
  if (!(await isAdmin()))
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const url = new URL(request.url);
  const key = url.searchParams.get("key");
  const section = url.searchParams.get("section");
  if (key !== "THEME" && key !== "LAYOUT" && key !== "SECTION_STYLES") {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }
  try {
    if (key === "SECTION_STYLES" && section) {
      const row = await withDbRetry(() =>
        prisma.siteSettings.findUnique({ where: { key } }),
      );
      const data = { ...((row?.data as object) ?? {}) } as Record<
        string,
        Prisma.InputJsonValue
      >;
      delete data[section];
      if (Object.keys(data).length === 0) {
        await withDbRetry(() =>
          prisma.siteSettings.delete({ where: { key } }).catch(() => null),
        );
      } else {
        await withDbRetry(() =>
          prisma.siteSettings.upsert({
            where: { key },
            create: { key, data },
            update: { data },
          }),
        );
      }
      return NextResponse.json({ ok: true, data });
    }
    await withDbRetry(() =>
      prisma.siteSettings.delete({ where: { key } }).catch(() => null),
    );
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE /api/site-settings", error);
    return NextResponse.json(
      { error: "Could not reset settings" },
      { status: 500 },
    );
  }
}
