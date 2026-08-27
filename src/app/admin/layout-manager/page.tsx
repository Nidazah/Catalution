"use client";

import { useEffect, useMemo, useState } from "react";

import ImageUploadField from "@/components/admin/ImageUploadField";

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

type GlobalSectionKey =
  | "navbar"
  | "footer"
  | "consultantBanner";

/*
 * activeSection can now be either a homepage section
 * or a global chrome section — both are edited through
 * the exact same generic panel below, since both are
 * stored as SectionStyle records keyed by string.
 */
type AnySectionKey = SectionKey | GlobalSectionKey;

type EditorSection = {
  key: SectionKey;
  label: string;
  description: string;
};

type GlobalEditorSection = {
  key: GlobalSectionKey;
  label: string;
  description: string;
};

type SectionStyle = {
  enabled?: boolean;

  backgroundColor?: string;
  textColor?: string;
  headingColor?: string;
  eyebrowColor?: string;
  bodyColor?: string;
  borderColor?: string;

  paddingTop?: number | string;
  paddingBottom?: number | string;

  contentAlign?: string;

  titleSize?: number | string;
  titleWeight?: number | string;

  headingFont?: string;
  bodyFont?: string;

  bodySize?: number | string;
  bodyLineHeight?: number | string;

  titleOffsetX?: number | string;
  titleOffsetY?: number | string;

  contentOffsetX?: number | string;
  contentOffsetY?: number | string;

  imageObjectPosition?: string;
  imageOffsetX?: number | string;
  imageOffsetY?: number | string;

  buttonBackground?: string;
  buttonText?: string;

  radius?: number | string;
  maxWidth?: number | string;

  [key: string]: unknown;
};

const sections: EditorSection[] = [
  {
    key: "HERO",
    label: "Hero",
    description: "Main homepage hero",
  },
  {
    key: "SERVICES",
    label: "Services",
    description: "Services/cards section",
  },
  {
    key: "ABOUT",
    label: "About",
    description: "About/company introduction",
  },
  {
    key: "MARQUE",
    label: "Marquee",
    description: "Scrolling brand/message strip",
  },
  {
    key: "PROCESS",
    label: "Process",
    description: "Process/workflow section",
  },
  {
    key: "TEAM",
    label: "Team",
    description: "Team members section",
  },
  {
    key: "CASE_STUDIES",
    label: "Case Studies",
    description: "Portfolio/case study slider",
  },
  {
    key: "PRICING",
    label: "Pricing",
    description: "Pricing plans section",
  },
  {
    key: "TESTIMONIALS",
    label: "Testimonials",
    description: "Customer testimonials",
  },
  {
    key: "CTA",
    label: "CTA",
    description: "Final call-to-action section",
  },
];

const globalSections: GlobalEditorSection[] = [
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
];

/*
 * Combined list used for label/description lookups
 * regardless of whether activeSection is a homepage
 * section or a global chrome section.
 */
const allSections: (EditorSection | GlobalEditorSection)[] = [
  ...sections,
  ...globalSections,
];

const fontOptions = [
  "Inter",
  "Poppins",
  "Roboto",
  "Open Sans",
  "Montserrat",
  "Nunito",
  "Lato",
  "Playfair Display",
];

const alignmentOptions = [
  "left",
  "center",
  "right",
];

const imagePositionOptions = [
  "top",
  "center",
  "bottom",
  "left",
  "right",
];

function toNumber(
  value: unknown,
  fallback = 0,
): number {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

export default function LayoutManagerPage() {
  const [activeSection, setActiveSection] =
    useState<AnySectionKey>("SERVICES");

  /*
   * ONLY SAVED DATABASE OVERRIDES.
   *
   * Defaults are never placed into this object.
   */
  const [sectionStyles, setSectionStyles] =
    useState<Record<string, SectionStyle>>({});

  /*
   * EFFECTIVE SETTINGS:
   *
   * defaultSectionStyles + database overrides.
   *
   * Used only to display the current form values.
   */
  const [effectiveStyles, setEffectiveStyles] =
    useState<Record<string, SectionStyle>>({});

  const [layout, setLayout] =
    useState<Record<string, unknown>>({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const activeStyle =
    effectiveStyles[activeSection] ?? {};

  const activeSectionInfo = useMemo(
    () =>
      allSections.find(
        (section) =>
          section.key === activeSection,
      ),
    [activeSection],
  );

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);
      setMessage("");

      /*
       * Get effective settings.
       */
      const response = await fetch(
        "/api/site-settings",
        {
          cache: "no-store",
        },
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load settings",
        );
      }

      const data =
        await response.json();

      setEffectiveStyles(
        data.sectionStyles ?? {},
      );

      setLayout(
        data.layout ?? {},
      );

      /*
       * Get ONLY the actual database override.
       *
       * The API supports ?raw=true for this purpose.
       */
      const rawResponse =
        await fetch(
          "/api/site-settings?key=SECTION_STYLES&raw=true",
          {
            cache: "no-store",
          },
        );

      if (rawResponse.ok) {
        const rawData =
          await rawResponse.json();

        setSectionStyles(
          rawData.data ?? {},
        );
      } else {
        setSectionStyles({});
      }
    } catch (error) {
      console.error(
        "Failed to load settings:",
        error,
      );

      setMessage(
        "Failed to load settings.",
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * Change ONLY ONE PROPERTY
   * of ONLY ONE SECTION.
   */
  function updateActive(
    key: string,
    value: unknown,
  ) {
    setSectionStyles((current) => {
      const currentSection =
        current[activeSection] ?? {};

      return {
        ...current,

        [activeSection]: {
          ...currentSection,
          [key]: value,
        },
      };
    });

    /*
     * Update the displayed value immediately.
     */
    setEffectiveStyles((current) => {
      const currentSection =
        current[activeSection] ?? {};

      return {
        ...current,

        [activeSection]: {
          ...currentSection,
          [key]: value,
        },
      };
    });
  }

  /*
   * Update ONE FIELD of ONE LAYOUT SUBSECTION
   * (navbar/footer/consultantBanner) and save it
   * immediately.
   *
   * This is a separate system from sectionStyles/
   * SECTION_STYLES above — layout fields like the logo
   * live under the LAYOUT settings key, not SECTION_STYLES,
   * so they're saved on change rather than waiting for
   * "Save All Changes".
   */
  async function updateLayoutField(
    section: GlobalSectionKey,
    key: string,
    value: unknown,
  ) {
    setLayout((current) => {
      const currentSection =
        (current[section] as
          | Record<string, unknown>
          | undefined) ?? {};

      return {
        ...current,

        [section]: {
          ...currentSection,
          [key]: value,
        },
      };
    });

    try {
      const response =
        await fetch(
          "/api/site-settings",
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              key: "LAYOUT",
              data: {
                [section]: {
                  [key]: value,
                },
              },
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Failed to save logo",
        );
      }

      setMessage(
        "Logo updated.",
      );
    } catch (error) {
      console.error(
        "Layout field save error:",
        error,
      );

      setMessage(
        "Could not save the logo. Please try again.",
      );
    }
  }

  async function saveAllChanges() {
    try {
      setSaving(true);
      setMessage("");

      const response =
        await fetch(
          "/api/site-settings",
          {
            method: "PUT",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              key: "SECTION_STYLES",
              data: sectionStyles,
            }),
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Failed to save settings",
        );
      }

      await loadSettings();

      setMessage(
        "All changes saved successfully.",
      );
    } catch (error) {
      console.error(
        "Save error:",
        error,
      );

      setMessage(
        "Could not save changes.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function resetSection(
    section: AnySectionKey,
  ) {
    const sectionInfo =
      allSections.find(
        (item) =>
          item.key === section,
      );

    const confirmed =
      window.confirm(
        `Reset ${sectionInfo?.label ?? section} to the original website default?`,
      );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");

      const response =
        await fetch(
          `/api/site-settings?key=SECTION_STYLES&section=${encodeURIComponent(
            section,
          )}`,
          {
            method: "DELETE",
          },
        );

      const result =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.error ??
            "Failed to reset section",
        );
      }

      /*
       * Reload both:
       *
       * 1. effective settings
       * 2. remaining database overrides
       */
      await loadSettings();

      setMessage(
        `${
          sectionInfo?.label ??
          section
        } has been reset to the original default.`,
      );
    } catch (error) {
      console.error(
        "Reset error:",
        error,
      );

      setMessage(
        "Could not reset this section.",
      );
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f7fc] p-8">
        <div className="rounded-xl border bg-white p-8">
          Loading Layout & Section Manager...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f7fc] text-[#21164f]">
      <div className="px-8 pb-5 pt-8">
        <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
          Theme Settings
        </div>

        <h1 className="text-4xl font-bold tracking-tight">
          Layout & Section Manager
        </h1>

        <p className="mt-2 max-w-3xl text-xs text-gray-500">
          Control each website section independently.
          Changing one setting will not modify unrelated
          settings.
        </p>
      </div>

      <div className="mx-8 mb-8 grid grid-cols-[190px_minmax(0,1fr)] gap-4">
        <aside className="rounded-lg border border-[#e5ddf5] bg-white p-3">
          <div className="mb-3 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7d72a3]">
            Global Chrome
          </div>

          {globalSections.map(
            (item) => {
              const active =
                item.key ===
                activeSection;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(
                      item.key,
                    );
                    setMessage("");
                  }}
                  className={`mb-1 w-full rounded-md px-2 py-2 text-left transition ${
                    active
                      ? "bg-[#eee5ff]"
                      : "hover:bg-[#f5f0ff]"
                  }`}
                >
                  <div className="text-xs font-semibold">
                    {item.label}
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    {item.description}
                  </div>
                </button>
              );
            },
          )}

          <div className="mb-3 mt-5 px-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#7d72a3]">
            Homepage Sections
          </div>

          {sections.map(
            (section) => {
              const active =
                section.key ===
                activeSection;

              return (
                <button
                  key={section.key}
                  type="button"
                  onClick={() => {
                    setActiveSection(
                      section.key,
                    );
                    setMessage("");
                  }}
                  className={`mb-1 w-full rounded-md px-2 py-2 text-left transition ${
                    active
                      ? "bg-[#eee5ff]"
                      : "hover:bg-[#f7f3fc]"
                  }`}
                >
                  <div className="text-xs font-semibold">
                    {section.label}
                  </div>

                  <div className="mt-0.5 text-[9px] text-gray-400">
                    {section.description}
                  </div>
                </button>
              );
            },
          )}
        </aside>

        <main className="rounded-lg border border-[#e5ddf5] bg-white p-5">
          <div className="mb-6">
            <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
              Section Panel
            </div>

            <h2 className="text-3xl font-bold">
              {activeSectionInfo?.label ??
                activeSection} settings
            </h2>

            <p className="mt-2 text-xs text-gray-400">
              Every control here applies only to this
              section.
            </p>
          </div>

          {(activeSection === "navbar" ||
            activeSection === "footer") && (
            <EditorGroup title="Logo">
              <div className="grid grid-cols-3 gap-3">
                <ImageUploadField
                  label="Logo image"
                  value={String(
                    (layout[activeSection] as
                      | { logo?: string }
                      | undefined)?.logo ?? "",
                  )}
                  onChange={(url) =>
                    updateLayoutField(
                      activeSection,
                      "logo",
                      url,
                    )
                  }
                />

                {activeSection === "navbar" && (
                  <NumberField
                    label="Logo width (px)"
                    value={toNumber(
                      (layout.navbar as
                        | { logoWidth?: number }
                        | undefined)?.logoWidth,
                      120,
                    )}
                    onChange={(value) =>
                      updateLayoutField(
                        "navbar",
                        "logoWidth",
                        value,
                      )
                    }
                  />
                )}
              </div>
            </EditorGroup>
          )}

          <EditorGroup title="General">
            <div className="grid grid-cols-3 gap-3">
              <CheckboxField
                label="Show section"
                checked={
                  activeStyle.enabled !== false
                }
                onChange={(value) =>
                  updateActive(
                    "enabled",
                    value,
                  )
                }
              />

              <SelectField
                label="Content alignment"
                value={String(
                  activeStyle.contentAlign ??
                    "left",
                )}
                options={
                  alignmentOptions
                }
                onChange={(value) =>
                  updateActive(
                    "contentAlign",
                    value,
                  )
                }
              />

              <NumberField
                label="Maximum width (px)"
                value={toNumber(
                  activeStyle.maxWidth,
                  1280,
                )}
                onChange={(value) =>
                  updateActive(
                    "maxWidth",
                    value,
                  )
                }
              />
            </div>
          </EditorGroup>

          <EditorGroup title="Colors">
            <div className="grid grid-cols-3 gap-x-3 gap-y-3">
              <ColorField
                label="Section background"
                value={String(
                  activeStyle.backgroundColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "backgroundColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Default text"
                value={String(
                  activeStyle.textColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "textColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Heading"
                value={String(
                  activeStyle.headingColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "headingColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Eyebrow / accent"
                value={String(
                  activeStyle.eyebrowColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "eyebrowColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Body text"
                value={String(
                  activeStyle.bodyColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "bodyColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Border"
                value={String(
                  activeStyle.borderColor ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "borderColor",
                    value,
                  )
                }
              />

              <ColorField
                label="Button background"
                value={String(
                  activeStyle.buttonBackground ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "buttonBackground",
                    value,
                  )
                }
              />

              <ColorField
                label="Button text"
                value={String(
                  activeStyle.buttonText ??
                    "",
                )}
                onChange={(value) =>
                  updateActive(
                    "buttonText",
                    value,
                  )
                }
              />
            </div>
          </EditorGroup>

          <EditorGroup title="Typography">
            <div className="grid grid-cols-4 gap-3">
              <SelectField
                label="Heading font"
                value={String(
                  activeStyle.headingFont ??
                    "Poppins",
                )}
                options={
                  fontOptions
                }
                onChange={(value) =>
                  updateActive(
                    "headingFont",
                    value,
                  )
                }
              />

              <SelectField
                label="Body font"
                value={String(
                  activeStyle.bodyFont ??
                    "Inter",
                )}
                options={
                  fontOptions
                }
                onChange={(value) =>
                  updateActive(
                    "bodyFont",
                    value,
                  )
                }
              />

              <NumberField
                label="Title size (px)"
                value={toNumber(
                  activeStyle.titleSize,
                  48,
                )}
                onChange={(value) =>
                  updateActive(
                    "titleSize",
                    value,
                  )
                }
              />

              <NumberField
                label="Title weight"
                value={toNumber(
                  activeStyle.titleWeight,
                  700,
                )}
                onChange={(value) =>
                  updateActive(
                    "titleWeight",
                    value,
                  )
                }
              />

              <NumberField
                label="Body size (px)"
                value={toNumber(
                  activeStyle.bodySize,
                  16,
                )}
                onChange={(value) =>
                  updateActive(
                    "bodySize",
                    value,
                  )
                }
              />

              <NumberField
                label="Body line height"
                value={toNumber(
                  activeStyle.bodyLineHeight,
                  1.6,
                )}
                step={0.1}
                onChange={(value) =>
                  updateActive(
                    "bodyLineHeight",
                    value,
                  )
                }
              />
            </div>
          </EditorGroup>

          <EditorGroup title="Spacing & Position">
            <div className="grid grid-cols-4 gap-3">
              <NumberField
                label="Padding top (px)"
                value={toNumber(
                  activeStyle.paddingTop,
                  64,
                )}
                onChange={(value) =>
                  updateActive(
                    "paddingTop",
                    value,
                  )
                }
              />

              <NumberField
                label="Padding bottom (px)"
                value={toNumber(
                  activeStyle.paddingBottom,
                  64,
                )}
                onChange={(value) =>
                  updateActive(
                    "paddingBottom",
                    value,
                  )
                }
              />

              <NumberField
                label="Title X offset (px)"
                value={toNumber(
                  activeStyle.titleOffsetX,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "titleOffsetX",
                    value,
                  )
                }
              />

              <NumberField
                label="Title Y offset (px)"
                value={toNumber(
                  activeStyle.titleOffsetY,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "titleOffsetY",
                    value,
                  )
                }
              />

              <NumberField
                label="Content X offset (px)"
                value={toNumber(
                  activeStyle.contentOffsetX,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "contentOffsetX",
                    value,
                  )
                }
              />

              <NumberField
                label="Content Y offset (px)"
                value={toNumber(
                  activeStyle.contentOffsetY,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "contentOffsetY",
                    value,
                  )
                }
              />

              <NumberField
                label="Image X offset (px)"
                value={toNumber(
                  activeStyle.imageOffsetX,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "imageOffsetX",
                    value,
                  )
                }
              />

              <NumberField
                label="Image Y offset (px)"
                value={toNumber(
                  activeStyle.imageOffsetY,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "imageOffsetY",
                    value,
                  )
                }
              />

              <SelectField
                label="Image object position"
                value={String(
                  activeStyle.imageObjectPosition ??
                    "center",
                )}
                options={
                  imagePositionOptions
                }
                onChange={(value) =>
                  updateActive(
                    "imageObjectPosition",
                    value,
                  )
                }
              />

              <NumberField
                label="Section corner radius (px)"
                value={toNumber(
                  activeStyle.radius,
                  0,
                )}
                onChange={(value) =>
                  updateActive(
                    "radius",
                    value,
                  )
                }
              />
            </div>
          </EditorGroup>

          <div className="mt-8 flex items-center justify-between border-t border-[#eee8f7] pt-4">
            <div
              className={`text-xs ${
                message.startsWith("Could") ||
                message.startsWith("Failed")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {message ||
                `${
                  activeSectionInfo?.label ??
                  activeSection
                } style is ready.`}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  resetSection(
                    activeSection,
                  )
                }
                className="rounded-md border border-[#e8dff3] bg-white px-4 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50"
              >
                Reset to Default
              </button>

              <button
                type="button"
                onClick={
                  saveAllChanges
                }
                disabled={saving}
                className="rounded-md bg-[#21164f] px-4 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {saving
                  ? "Saving..."
                  : "Save All Changes"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* =========================================================
   UI COMPONENTS
========================================================= */

function EditorGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="mb-3 border-b border-[#e9e1f4] pb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#5e3a91]">
        {title}
      </div>

      {children}
    </div>
  );
}

function CheckboxField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex h-[38px] cursor-pointer items-center gap-2 rounded-md border border-[#e5ddf5] px-3 text-xs">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) =>
          onChange(
            event.target.checked,
          )
        }
      />

      <span>{label}</span>
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
  onChange: (value: number) => void;
  step?: number;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold">
        {label}
      </span>

      <input
        type="number"
        value={value}
        step={step}
        onChange={(event) =>
          onChange(
            Number(event.target.value),
          )
        }
        className="h-[36px] w-full rounded-md border border-[#ddd2ee] px-3 text-xs outline-none focus:border-[#7b4eb0]"
      />
    </label>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-[36px] w-full rounded-md border border-[#ddd2ee] bg-white px-3 text-xs outline-none focus:border-[#7b4eb0]"
      >
        {options.map(
          (option) => (
            <option
              key={option}
              value={option}
            >
              {option}
            </option>
          ),
        )}
      </select>
    </label>
  );
}

function ColorField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const colorValue =
    /^#[0-9a-fA-F]{6}$/.test(
      value,
    )
      ? value
      : "#ffffff";

  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold">
        {label}
      </span>

      <div className="flex gap-2">
        <input
          type="color"
          value={colorValue}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className="h-[36px] w-[38px] cursor-pointer rounded-md border border-[#ddd2ee] bg-white p-1"
        />

        <input
          value={value}
          onChange={(event) =>
            onChange(
              event.target.value,
            )
          }
          className="h-[36px] min-w-0 flex-1 rounded-md border border-[#ddd2ee] px-3 text-xs outline-none focus:border-[#7b4eb0]"
        />
      </div>
    </label>
  );
}