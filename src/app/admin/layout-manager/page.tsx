"use client";

import { useEffect, useMemo, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";

type SectionStyle = {
  enabled: boolean;
  backgroundColor: string;
  textColor: string;
  headingColor: string;
  eyebrowColor: string;
  bodyColor: string;
  borderColor: string;
  paddingTop: number;
  paddingBottom: number;
  contentAlign: "left" | "center" | "right";
  titleSize: number;
  titleWeight: string;
  headingFont: string;
  bodyFont: string;
  bodySize: number;
  bodyLineHeight: number;
  titleOffsetX: number;
  titleOffsetY: number;
  contentOffsetX: number;
  contentOffsetY: number;
  imageObjectPosition: string;
  imageOffsetX: number;
  imageOffsetY: number;
  buttonBackground: string;
  buttonText: string;
  radius: number;
  maxWidth: number;
};

type SectionKey =
  | "HERO"
  | "SERVICES"
  | "ABOUT"
  | "MARQUE"
  | "PROCESS"
  | "TEAM"
  | "CASE_STUDIES"
  | "PRICING"
  | "TESTIMONIALS"
  | "CTA";
type Layout = {
  navbar: any;
  footer: any;
  consultantBanner: any;
};

const keys: Array<{ key: SectionKey; label: string; description: string }> = [
  ["HERO", "Hero", "Main homepage hero"],
  ["SERVICES", "Services", "Services/cards section"],
  ["ABOUT", "About", "About/company introduction"],
  ["MARQUE", "Marquee", "Scrolling brand/message strip"],
  ["PROCESS", "Process", "Process/workflow section"],
  ["TEAM", "Team", "Team members section"],
  ["CASE_STUDIES", "Case Studies", "Portfolio/case study slider"],
  ["PRICING", "Pricing", "Pricing plans section"],
  ["TESTIMONIALS", "Testimonials", "Customer testimonials"],
  ["CTA", "CTA", "Final call-to-action section"],
].map(([key, label, description]) => ({
  key: key as SectionKey,
  label,
  description,
}));

const defaultStyle: SectionStyle = {
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

const layoutDefaults = {
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
    description: "",
    newsletterTitle: "Subscribe to our newsletter",
    copyright: "All right reserved.",
    social: [],
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

export default function LayoutManagerPage() {
  const [layout, setLayout] = useState<Layout>(layoutDefaults);
  const [styles, setStyles] = useState<Record<string, SectionStyle>>({});
  // Sections the admin has actually customized (loaded from the DB, or edited
  // this session). Only these are ever written back or applied to the live
  // site — this is what stops editing one section from changing another
  // section's spacing: an untouched section is simply never saved.
  const [customized, setCustomized] = useState<Set<string>>(new Set());
  const [tab, setTab] = useState<
    "navbar" | "footer" | "consultantBanner" | SectionKey
  >("navbar");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    Promise.all([
      fetch("/api/site-settings?key=LAYOUT", { cache: "no-store" }).then((r) =>
        r.json(),
      ),
      fetch("/api/site-settings?key=SECTION_STYLES", {
        cache: "no-store",
      }).then((r) => r.json()),
    ])
      .then(([l, s]) => {
        if (l?.data) setLayout(mergeDeep(layoutDefaults, l.data));
        const raw = s?.raw || {};
        const next: Record<string, SectionStyle> = {};
        keys.forEach(
          ({ key }) => (next[key] = { ...defaultStyle, ...(raw[key] || {}) }),
        );
        setStyles(next);
        setCustomized(new Set(Object.keys(raw)));
      })
      .catch(() => setMessage("Could not load layout settings."));
  }, []);

  const saveLayout = async () => {
    setSaving(true);
    setMessage("");
    try {
      // Only send styles for sections that are actually customized — never
      // the default-filled values for sections nobody has touched.
      const sectionData: Record<string, SectionStyle> = {};
      customized.forEach((key) => {
        if (styles[key]) sectionData[key] = styles[key];
      });
      const [a, b] = await Promise.all([
        fetch("/api/site-settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "LAYOUT", data: layout }),
        }),
        Object.keys(sectionData).length > 0
          ? fetch("/api/site-settings", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ key: "SECTION_STYLES", data: sectionData }),
            })
          : fetch("/api/site-settings?key=SECTION_STYLES", { method: "DELETE" }),
      ]);
      const ad = await a.json();
      const bd = await b.json();
      setMessage(
        a.ok && b.ok
          ? "All layout and section settings saved successfully."
          : ad.error || bd.error || "Could not save settings.",
      );
    } catch {
      setMessage("Could not save settings.");
    }
    setSaving(false);
  };

  const currentStyle =
    tab in styles ? styles[tab] || defaultStyle : defaultStyle;
  const updateStyle = (patch: Partial<SectionStyle>) => {
    if (!(tab in styles)) return;
    setStyles((prev) => ({ ...prev, [tab]: { ...currentStyle, ...patch } }));
    // Editing a field is what marks a section as customized — merely opening
    // a tab and looking at its (default) values never does.
    setCustomized((prev) => new Set(prev).add(tab as string));
  };

  const isCurrentSectionCustomized = tab in styles && customized.has(tab as string);

  const resetSection = async (key: string) => {
    const label = keys.find((x) => x.key === key)?.label || key;
    if (!confirm(`Reset "${label}" back to the site's default spacing and styling?`)) return;
    setSaving(true);
    setMessage("");
    try {
      await fetch(
        `/api/site-settings?key=SECTION_STYLES&section=${encodeURIComponent(key)}`,
        { method: "DELETE" },
      );
      setStyles((prev) => ({ ...prev, [key]: { ...defaultStyle } }));
      setCustomized((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
      setMessage(`"${label}" reset to default.`);
    } catch {
      setMessage("Could not reset that section.");
    }
    setSaving(false);
  };

  const resetEverything = async () => {
    if (
      !confirm(
        "Reset every section, the navbar, footer and consultant banner back to their defaults? This can't be undone.",
      )
    )
      return;
    setSaving(true);
    setMessage("");
    try {
      await Promise.all([
        fetch("/api/site-settings?key=SECTION_STYLES", { method: "DELETE" }),
        fetch("/api/site-settings", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: "LAYOUT", data: layoutDefaults }),
        }),
      ]);
      const resetStyles: Record<string, SectionStyle> = {};
      keys.forEach(({ key }) => (resetStyles[key] = { ...defaultStyle }));
      setStyles(resetStyles);
      setCustomized(new Set());
      setLayout(layoutDefaults);
      setMessage("Everything reset to default.");
    } catch {
      setMessage("Could not reset settings.");
    }
    setSaving(false);
  };

  const tabGroups = useMemo(
    () => [
      {
        title: "Global chrome",
        items: [
          {
            key: "navbar",
            label: "Navbar",
            description: "Logo, navigation, CTA and navbar styling",
          },
          {
            key: "footer",
            label: "Footer",
            description: "Footer content, colors and spacing",
          },
          {
            key: "consultantBanner",
            label: "Consultant Banner",
            description: "Inner-page call-to-action strip",
          },
        ],
      },
      {
        title: "Homepage sections",
        items: keys,
      },
    ],
    [],
  );

  return (
    <div className="space-y-5 text-[12.5px]">
      <div>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
          Website Builder
        </p>
        <h1 className="mt-1 text-[16px] font-bold text-[#24133f]">
          Layout & Section Manager
        </h1>
        <p className="mt-1.5 max-w-3xl text-[11.5px] text-[#7b8190]">
          Control each website section independently. Change colors, typography,
          spacing, alignment, image position and visibility without editing
          code.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-xl border border-[#ece6f7] bg-white p-3">
          {tabGroups.map((group) => (
            <div key={group.title} className="mb-4 last:mb-0">
              <p className="px-2 pb-2 text-[9px] font-bold uppercase tracking-[0.16em] text-[#8a8399]">
                {group.title}
              </p>
              <div className="space-y-1">
                {group.items.map((item: any) => {
                  const { key, label, description } = item;

                  return (
                    <button
                      key={key}
                      onClick={() => setTab(key)}
                      className={`w-full rounded-lg px-3 py-2.5 text-left transition ${
                        tab === key
                          ? "bg-[#f0e9fc] text-[#481d96]"
                          : "text-[#3b3448] hover:bg-[#faf8fd]"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 text-[11px] font-bold">
                        {label}
                        {customized.has(key as string) && (
                          <span
                            title="Customized — overrides the site default"
                            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6800]"
                          />
                        )}
                      </span>

                      <span className="mt-0.5 block text-[9.5px] text-[#8a8399]">
                        {description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </aside>

        <section className="rounded-xl border border-[#ece6f7] bg-white p-5">
          {tab === "navbar" && (
            <NavbarPanel
              value={layout.navbar}
              onChange={(v) => setLayout({ ...layout, navbar: v })}
            />
          )}
          {tab === "footer" && (
            <FooterPanel
              value={layout.footer}
              onChange={(v) => setLayout({ ...layout, footer: v })}
            />
          )}
          {tab === "consultantBanner" && (
            <BannerPanel
              value={layout.consultantBanner}
              onChange={(v) => setLayout({ ...layout, consultantBanner: v })}
            />
          )}
          {tab in styles && (
            <SectionPanel
              section={keys.find((x) => x.key === tab)?.label || String(tab)}
              value={currentStyle}
              onChange={updateStyle}
            />
          )}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#eeeaf5] pt-4">
            <span className="text-[11px] text-[#2f8f46]">{message}</span>
            <div className="flex flex-wrap items-center gap-2">
              {tab in styles && isCurrentSectionCustomized && (
                <button
                  onClick={() => resetSection(tab as string)}
                  disabled={saving}
                  className="rounded-lg border border-[#ddd5ed] px-3 py-2.5 text-[11.5px] font-semibold text-[#3b3448] transition hover:bg-[#faf8fd] disabled:opacity-60"
                >
                  Reset this section
                </button>
              )}
              <button
                onClick={resetEverything}
                disabled={saving}
                className="rounded-lg border border-[#ddd5ed] px-3 py-2.5 text-[11.5px] font-semibold text-[#3b3448] transition hover:bg-[#faf8fd] disabled:opacity-60"
              >
                Reset everything to default
              </button>
              <button
                onClick={saveLayout}
                disabled={saving}
                className="rounded-lg bg-[#481d96] px-5 py-2.5 text-[11.5px] font-semibold text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save All Changes"}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function SectionPanel({
  section,
  value,
  onChange,
}: {
  section: string;
  value: SectionStyle;
  onChange: (v: Partial<SectionStyle>) => void;
}) {
  return (
    <div className="space-y-5">
      <PanelHeader
        title={`${section} settings`}
        subtitle="Every control here applies only to this section."
      />
      <div className="grid gap-3 md:grid-cols-3">
        <Toggle
          label="Show section"
          checked={value.enabled}
          onChange={(v) => onChange({ enabled: v })}
        />
        <Select
          label="Content alignment"
          value={value.contentAlign}
          options={["left", "center", "right"]}
          onChange={(v) => onChange({ contentAlign: v as any })}
        />
        <NumberField
          label="Maximum width (px)"
          value={value.maxWidth}
          onChange={(v) => onChange({ maxWidth: v })}
        />
      </div>

      <PanelTitle>Colors</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Color
          label="Section background"
          value={value.backgroundColor}
          onChange={(v) => onChange({ backgroundColor: v })}
        />
        <Color
          label="Default text"
          value={value.textColor}
          onChange={(v) => onChange({ textColor: v })}
        />
        <Color
          label="Heading"
          value={value.headingColor}
          onChange={(v) => onChange({ headingColor: v })}
        />
        <Color
          label="Eyebrow / accent"
          value={value.eyebrowColor}
          onChange={(v) => onChange({ eyebrowColor: v })}
        />
        <Color
          label="Body text"
          value={value.bodyColor}
          onChange={(v) => onChange({ bodyColor: v })}
        />
        <Color
          label="Border"
          value={value.borderColor}
          onChange={(v) => onChange({ borderColor: v })}
        />
        <Color
          label="Section button background"
          value={value.buttonBackground}
          onChange={(v) => onChange({ buttonBackground: v })}
        />
        <Color
          label="Section button text"
          value={value.buttonText}
          onChange={(v) => onChange({ buttonText: v })}
        />
      </div>

      <PanelTitle>Typography</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Select
          label="Heading font"
          value={value.headingFont}
          options={fontOptions}
          onChange={(v) => onChange({ headingFont: v })}
        />
        <Select
          label="Body font"
          value={value.bodyFont}
          options={fontOptions}
          onChange={(v) => onChange({ bodyFont: v })}
        />
        <NumberField
          label="Title size (px)"
          value={value.titleSize}
          onChange={(v) => onChange({ titleSize: v })}
        />
        <Select
          label="Title weight"
          value={value.titleWeight}
          options={["400", "500", "600", "700", "800"]}
          onChange={(v) => onChange({ titleWeight: v })}
        />
        <NumberField
          label="Body size (px)"
          value={value.bodySize}
          onChange={(v) => onChange({ bodySize: v })}
        />
        <NumberField
          label="Body line height"
          value={value.bodyLineHeight}
          step={0.1}
          onChange={(v) => onChange({ bodyLineHeight: v })}
        />
      </div>

      <PanelTitle>Spacing & position</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <NumberField
          label="Padding top (px)"
          value={value.paddingTop}
          onChange={(v) => onChange({ paddingTop: v })}
        />
        <NumberField
          label="Padding bottom (px)"
          value={value.paddingBottom}
          onChange={(v) => onChange({ paddingBottom: v })}
        />
        <NumberField
          label="Title X offset (px)"
          value={value.titleOffsetX}
          onChange={(v) => onChange({ titleOffsetX: v })}
        />
        <NumberField
          label="Title Y offset (px)"
          value={value.titleOffsetY}
          onChange={(v) => onChange({ titleOffsetY: v })}
        />
        <NumberField
          label="Content X offset (px)"
          value={value.contentOffsetX}
          onChange={(v) => onChange({ contentOffsetX: v })}
        />
        <NumberField
          label="Content Y offset (px)"
          value={value.contentOffsetY}
          onChange={(v) => onChange({ contentOffsetY: v })}
        />
        <NumberField
          label="Image X offset (px)"
          value={value.imageOffsetX}
          onChange={(v) => onChange({ imageOffsetX: v })}
        />
        <NumberField
          label="Image Y offset (px)"
          value={value.imageOffsetY}
          onChange={(v) => onChange({ imageOffsetY: v })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select
          label="Image object position"
          value={value.imageObjectPosition}
          options={[
            "center",
            "top",
            "bottom",
            "left",
            "right",
            "left top",
            "right top",
            "left bottom",
            "right bottom",
          ]}
          onChange={(v) => onChange({ imageObjectPosition: v })}
        />
        <NumberField
          label="Section corner radius (px)"
          value={value.radius}
          onChange={(v) => onChange({ radius: v })}
        />
      </div>
    </div>
  );
}

function NavbarPanel({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  return (
    <div className="space-y-5">
      <PanelHeader
        title="Navbar settings"
        subtitle="Branding, navigation, CTA colors and exact navbar spacing."
      />
      <ImageUploadField
        value={value.logo || ""}
        onChange={(v) => onChange({ ...value, logo: v })}
        label="Logo"
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Field
          label="CTA label"
          value={value.ctaLabel}
          onChange={(v) => onChange({ ...value, ctaLabel: v })}
        />
        <Field
          label="CTA URL"
          value={value.ctaUrl}
          onChange={(v) => onChange({ ...value, ctaUrl: v })}
        />
        <Field
          label="Explore label"
          value={value.exploreLabel}
          onChange={(v) => onChange({ ...value, exploreLabel: v })}
        />
        <Field
          label="Mobile search placeholder"
          value={value.mobileSearchPlaceholder}
          onChange={(v) => onChange({ ...value, mobileSearchPlaceholder: v })}
        />
        <NumberField
          label="Horizontal padding (%)"
          value={value.paddingX}
          onChange={(v) => onChange({ ...value, paddingX: v })}
        />
        <NumberField
          label="Vertical padding (rem)"
          value={value.paddingY}
          step={0.25}
          onChange={(v) => onChange({ ...value, paddingY: v })}
        />
        <NumberField
          label="Logo width (px)"
          value={value.logoWidth}
          onChange={(v) => onChange({ ...value, logoWidth: v })}
        />
      </div>
      <PanelTitle>Navbar colors</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Color
          label="Background"
          value={value.backgroundColor}
          onChange={(v) => onChange({ ...value, backgroundColor: v })}
        />
        <Color
          label="Text"
          value={value.textColor}
          onChange={(v) => onChange({ ...value, textColor: v })}
        />
        <Color
          label="Active / hover"
          value={value.activeColor}
          onChange={(v) => onChange({ ...value, activeColor: v })}
        />
        <Color
          label="CTA background"
          value={value.ctaBackground}
          onChange={(v) => onChange({ ...value, ctaBackground: v })}
        />
        <Color
          label="CTA text"
          value={value.ctaText}
          onChange={(v) => onChange({ ...value, ctaText: v })}
        />
        <Color
          label="Border"
          value={value.borderColor}
          onChange={(v) => onChange({ ...value, borderColor: v })}
        />
      </div>
    </div>
  );
}

function FooterPanel({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  return (
    <div className="space-y-5">
      <PanelHeader
        title="Footer settings"
        subtitle="Control footer palette, typography colors and vertical spacing."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Description"
          value={value.description}
          onChange={(v) => onChange({ ...value, description: v })}
        />
        <Field
          label="Newsletter title"
          value={value.newsletterTitle}
          onChange={(v) => onChange({ ...value, newsletterTitle: v })}
        />
        <Field
          label="Copyright"
          value={value.copyright}
          onChange={(v) => onChange({ ...value, copyright: v })}
        />
        <NumberField
          label="Padding top (px)"
          value={value.paddingTop}
          onChange={(v) => onChange({ ...value, paddingTop: v })}
        />
        <NumberField
          label="Padding bottom (px)"
          value={value.paddingBottom}
          onChange={(v) => onChange({ ...value, paddingBottom: v })}
        />
      </div>
      <PanelTitle>Footer colors</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Color
          label="Footer background"
          value={value.backgroundColor}
          onChange={(v) => onChange({ ...value, backgroundColor: v })}
        />
        <Color
          label="Headings"
          value={value.headingColor}
          onChange={(v) => onChange({ ...value, headingColor: v })}
        />
        <Color
          label="Body text"
          value={value.textColor}
          onChange={(v) => onChange({ ...value, textColor: v })}
        />
        <Color
          label="Links"
          value={value.linkColor}
          onChange={(v) => onChange({ ...value, linkColor: v })}
        />
        <Color
          label="Bottom bar"
          value={value.bottomBackground}
          onChange={(v) => onChange({ ...value, bottomBackground: v })}
        />
        <Color
          label="Bottom text"
          value={value.bottomText}
          onChange={(v) => onChange({ ...value, bottomText: v })}
        />
      </div>
    </div>
  );
}

function BannerPanel({
  value,
  onChange,
}: {
  value: any;
  onChange: (v: any) => void;
}) {
  return (
    <div className="space-y-5">
      <PanelHeader
        title="Consultant banner settings"
        subtitle="This panel controls the CTA strip shown on inner pages."
      />
      <Toggle
        label="Show consultant banner"
        checked={value.enabled}
        onChange={(v) => onChange({ ...value, enabled: v })}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Heading"
          value={value.title}
          onChange={(v) => onChange({ ...value, title: v })}
        />
        <Field
          label="Button label"
          value={value.buttonLabel}
          onChange={(v) => onChange({ ...value, buttonLabel: v })}
        />
        <Field
          label="Button URL"
          value={value.buttonUrl}
          onChange={(v) => onChange({ ...value, buttonUrl: v })}
        />
        <NumberField
          label="Padding top (px)"
          value={value.paddingTop}
          onChange={(v) => onChange({ ...value, paddingTop: v })}
        />
        <NumberField
          label="Padding bottom (px)"
          value={value.paddingBottom}
          onChange={(v) => onChange({ ...value, paddingBottom: v })}
        />
      </div>
      <PanelTitle>Banner colors</PanelTitle>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Color
          label="Background"
          value={value.backgroundColor}
          onChange={(v) => onChange({ ...value, backgroundColor: v })}
        />
        <Color
          label="Text"
          value={value.textColor}
          onChange={(v) => onChange({ ...value, textColor: v })}
        />
        <Color
          label="Button background"
          value={value.buttonBackground}
          onChange={(v) => onChange({ ...value, buttonBackground: v })}
        />
        <Color
          label="Button text"
          value={value.buttonText}
          onChange={(v) => onChange({ ...value, buttonText: v })}
        />
      </div>
    </div>
  );
}

const fontOptions = [
  "Poppins",
  "Inter",
  "Roboto",
  "Open Sans",
  "Lato",
  "Montserrat",
  "Nunito",
  "Raleway",
  "Merriweather",
  "Arial",
  "Helvetica",
  "Georgia",
  "system-ui",
];

function PanelHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div>
      <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#ff6800]">
        Section panel
      </p>
      <h2 className="mt-1 text-[18px] font-bold text-[#24133f]">{title}</h2>
      <p className="mt-1 text-[11px] text-[#7b8190]">{subtitle}</p>
    </div>
  );
}
function PanelTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="border-b border-[#eeeaf5] pb-2 text-[11px] font-bold uppercase tracking-wider text-[#481d96]">
      {children}
    </h3>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[12px] outline-none focus:border-[#8b5cf6]"
      />
    </label>
  );
}
function NumberField({
  label,
  value,
  onChange,
  step = 1,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[12px] outline-none focus:border-[#8b5cf6]"
      />
    </label>
  );
}
function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[12px]"
      >
        {options.map((x) => (
          <option key={x}>{x}</option>
        ))}
      </select>
    </label>
  );
}
function Color({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const safe = value || "#ffffff";
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>
      <div className="flex gap-2">
        <input
          type="color"
          value={safe}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-12 rounded border"
        />
        <input
          value={safe}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-[#ddd5ed] px-3 py-2 text-[12px]"
        />
      </div>
    </label>
  );
}
function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-[#ece6f7] bg-[#faf8fd] px-3 py-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-[11px] font-semibold text-[#24133f]">{label}</span>
    </label>
  );
}
function mergeDeep(base: any, incoming: any): any {
  if (!incoming || typeof incoming !== "object" || Array.isArray(incoming))
    return incoming ?? base;
  const out = { ...base };
  for (const key of Object.keys(incoming))
    out[key] = mergeDeep(base?.[key], incoming[key]);
  return out;
}