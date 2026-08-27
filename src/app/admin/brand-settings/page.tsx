"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

import { defaultTheme } from "@/lib/site-defaults";

type Theme = {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  accentSoftColor: string;
  backgroundColor: string;
  sectionColor: string;
  headingColor: string;
  bodyColor: string;
  lineColor: string;
  headingFont: string;
  bodyFont: string;
  headingWeight: string;
  bodyWeight: string;
  baseFontSize: number;
  headingScale: number;
  bodyLineHeight: number;
  radius: number;
  containerWidth: number;
  sectionGap: number;
  buttonRadius: number;
  buttonPaddingX: number;
  buttonPaddingY: number;
  buttonPrimaryBg: string;
  buttonPrimaryText: string;
  buttonSecondaryBg: string;
  buttonSecondaryText: string;
};

type GoTopSettings = {
  enabled: boolean;
  label: string;
  target: string;
  backgroundColor: string;
  textColor: string;
  iconColor: string;
};

type LayoutSettings = {
  [key: string]: any;
  footer?: {
    [key: string]: any;
    goTop?: Partial<GoTopSettings>;
  };
};

const defaults: Theme = defaultTheme as Theme;

// Fonts available across the font selectors. Each is mapped to a real
// CSS font-family stack so the option (and the closed select) can
// render a live preview in that font, instead of a plain text label.
const FONT_OPTIONS = [
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
] as const;

const FONT_FAMILY_STACKS: Record<string, string> = {
  Poppins: "'Poppins', sans-serif",
  Inter: "'Inter', sans-serif",
  Roboto: "'Roboto', sans-serif",
  "Open Sans": "'Open Sans', sans-serif",
  Lato: "'Lato', sans-serif",
  Montserrat: "'Montserrat', sans-serif",
  Nunito: "'Nunito', sans-serif",
  Raleway: "'Raleway', sans-serif",
  Merriweather: "'Merriweather', serif",
  Arial: "Arial, Helvetica, sans-serif",
  Helvetica: "Helvetica, Arial, sans-serif",
  Georgia: "Georgia, 'Times New Roman', serif",
  "system-ui": "system-ui, -apple-system, sans-serif",
};

function getFontStack(fontName: string): string {
  return FONT_FAMILY_STACKS[fontName] || `'${fontName}', sans-serif`;
}

const defaultGoTop: GoTopSettings = {
  enabled: true,
  label: "GO TOP",
  target: "#top",
  backgroundColor: "#ffffff",
  textColor: "#481d96",
  iconColor: "#481d96",
};

export default function BrandSettingsPage() {
  const [theme, setTheme] = useState<Theme>(defaults);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [layout, setLayout] = useState<LayoutSettings>({
    footer: {
      goTop: defaultGoTop,
    },
  });

  const [layoutSaving, setLayoutSaving] = useState(false);
  const [layoutMessage, setLayoutMessage] = useState("");

  useEffect(() => {
    fetch("/api/site-settings?key=THEME", {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Could not load theme");
        }

        return response.json();
      })
      .then((data) => {
        if (data?.data) {
          setTheme({
            ...defaults,
            ...data.data,
          });
        }
      })
      .catch(() => {
        setMessage("Could not load theme settings.");
      });
  }, []);

  useEffect(() => {
    fetch("/api/site-settings?key=LAYOUT", {
      cache: "no-store",
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Could not load layout");
        }

        return response.json();
      })
      .then((data) => {
        const savedLayout = data?.data || {};
        const savedGoTop = savedLayout?.footer?.goTop;

        setLayout({
          ...savedLayout,
          footer: {
            ...(savedLayout.footer || {}),
            goTop: {
              ...defaultGoTop,
              ...(savedGoTop || {}),
            },
          },
        });
      })
      .catch(() => {
        setLayoutMessage("Could not load global layout settings.");
      });
  }, []);

  async function saveTheme() {
    setSaving(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/site-settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: "THEME",
            data: theme,
          }),
        }
      );

      const data = await response.json();

      setMessage(
        response.ok
          ? "Theme saved. Refresh the public site to see changes."
          : data?.error ?? "Could not save theme."
      );
    } catch (error) {
      console.error("Save theme error:", error);
      setMessage("Could not save theme.");
    } finally {
      setSaving(false);
    }
  }

  async function saveGoTop() {
    setLayoutSaving(true);
    setLayoutMessage("");

    const normalizedLayout: LayoutSettings = {
      ...layout,
      footer: {
        ...(layout.footer || {}),
        goTop: {
          ...defaultGoTop,
          ...(layout.footer?.goTop || {}),
        },
      },
    };

    try {
      const response = await fetch(
        "/api/site-settings",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            key: "LAYOUT",
            data: normalizedLayout,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setLayout(normalizedLayout);
      }

      setLayoutMessage(
        response.ok
          ? "Go Top settings saved."
          : data?.error ??
              "Could not save Go Top settings."
      );
    } catch (error) {
      console.error("Save Go Top error:", error);
      setLayoutMessage(
        "Could not save Go Top settings."
      );
    } finally {
      setLayoutSaving(false);
    }
  }

  async function resetTheme() {
    const confirmed = window.confirm(
      "Reset theme to the original defaults?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        "/api/site-settings?key=THEME",
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Reset failed");
      }

      setTheme({
        ...defaultTheme,
      } as Theme);

      setMessage(
        "Theme reset to original defaults."
      );
    } catch (error) {
      console.error(
        "Reset theme error:",
        error
      );

      setMessage("Could not reset theme.");
    }
  }

  const colorFields = [
    ["primaryColor", "Primary color"],
    ["secondaryColor", "Secondary color"],
    ["accentColor", "Accent color"],
    ["accentSoftColor", "Accent soft color"],
    ["backgroundColor", "Background color"],
    ["sectionColor", "Section background"],
    ["headingColor", "Heading color"],
    ["bodyColor", "Body color"],
    ["lineColor", "Border/line color"],
  ] as const;

  return (
    <div className="space-y-5 text-[12.5px]">
      {/* HEADER */}

      <div>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
          Design Tokens
        </p>

        <h1 className="mt-1 text-[16px] font-bold text-[#24133f]">
          Theme Settings
        </h1>

        <p className="mt-1.5 text-[11.5px] text-[#7b8190]">
          Change global colors, font family,
          font weight and base sizing without
          changing the existing Catalution
          layout.
        </p>
      </div>

      {/* COLORS */}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-5">
        <h2 className="font-bold text-[#24133f]">
          Colors
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {colorFields.map(([key, label]) => (
            <label
              key={key}
              className="block"
            >
              <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
                {label}
              </span>

              <div className="flex gap-2">
                <input
                  type="color"
                  value={theme[key]}
                  onChange={(event) =>
                    setTheme({
                      ...theme,
                      [key]: event.target.value,
                    })
                  }
                  className="h-9 w-12 rounded border"
                />

                <input
                  value={theme[key]}
                  onChange={(event) =>
                    setTheme({
                      ...theme,
                      [key]: event.target.value,
                    })
                  }
                  className="min-w-0 flex-1 rounded-lg border border-[#ddd5ed] px-3 text-[12px]"
                />
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* TYPOGRAPHY */}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-5">
        <h2 className="font-bold text-[#24133f]">
          Typography
        </h2>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FontSelect
            label="Heading font"
            value={theme.headingFont}
            options={FONT_OPTIONS}
            onChange={(value) =>
              setTheme({
                ...theme,
                headingFont: value,
              })
            }
          />

          <FontSelect
            label="Body font"
            value={theme.bodyFont}
            options={FONT_OPTIONS}
            onChange={(value) =>
              setTheme({
                ...theme,
                bodyFont: value,
              })
            }
          />

          <Select
            label="Heading weight"
            value={theme.headingWeight}
            options={[
              "400",
              "500",
              "600",
              "700",
              "800",
            ]}
            onChange={(value) =>
              setTheme({
                ...theme,
                headingWeight: value,
              })
            }
          />

          <Select
            label="Body weight"
            value={theme.bodyWeight}
            options={[
              "300",
              "400",
              "500",
              "600",
              "700",
            ]}
            onChange={(value) =>
              setTheme({
                ...theme,
                bodyWeight: value,
              })
            }
          />

          <NumberField
            label="Base font size (px)"
            value={theme.baseFontSize}
            onChange={(value) =>
              setTheme({
                ...theme,
                baseFontSize: value,
              })
            }
          />

          <NumberField
            label="Heading scale"
            value={theme.headingScale}
            step={0.05}
            onChange={(value) =>
              setTheme({
                ...theme,
                headingScale: value,
              })
            }
          />

          <NumberField
            label="Body line height"
            value={theme.bodyLineHeight}
            step={0.1}
            onChange={(value) =>
              setTheme({
                ...theme,
                bodyLineHeight: value,
              })
            }
          />
        </div>
      </div>

      {/* GO TOP */}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
              Floating control
            </p>

            <h2 className="mt-1 font-bold text-[#24133f]">
              Go Top Button
            </h2>

            <p className="mt-1 text-[10.5px] leading-5 text-[#6b7280]">
              Edit the floating Go Top control
              shown at the bottom-right of the
              website.
            </p>
          </div>

          <button
            type="button"
            onClick={saveGoTop}
            disabled={layoutSaving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#481d96] px-3.5 py-2 text-[11px] font-semibold text-white disabled:opacity-60"
          >
            <Save size={12} />

            {layoutSaving
              ? "Saving..."
              : "Save Go Top"}
          </button>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <label className="flex items-center gap-2 rounded-lg border border-[#ece6f7] px-3 py-2.5">
            <input
              type="checkbox"
              checked={
                layout.footer?.goTop?.enabled !== false
              }
              onChange={(event) =>
                setLayout({
                  ...layout,
                  footer: {
                    ...(layout.footer || {}),
                    goTop: {
                      ...defaultGoTop,
                      ...(layout.footer?.goTop || {}),
                      enabled:
                        event.target.checked,
                    },
                  },
                })
              }
            />

            <span className="text-[11.5px] font-medium text-[#24133f]">
              Show Go Top button
            </span>
          </label>

          <TextField
            label="Button label"
            value={
              layout.footer?.goTop?.label || ""
            }
            onChange={(value) =>
              setLayout({
                ...layout,
                footer: {
                  ...(layout.footer || {}),
                  goTop: {
                    ...defaultGoTop,
                    ...(layout.footer?.goTop || {}),
                    label: value,
                  },
                },
              })
            }
          />

          <TextField
            label="Target / anchor"
            value={
              layout.footer?.goTop?.target ||
              "#top"
            }
            onChange={(value) =>
              setLayout({
                ...layout,
                footer: {
                  ...(layout.footer || {}),
                  goTop: {
                    ...defaultGoTop,
                    ...(layout.footer?.goTop || {}),
                    target: value,
                  },
                },
              })
            }
          />

          <Color
            label="Background color"
            value={
              layout.footer?.goTop
                ?.backgroundColor ||
              "#ffffff"
            }
            onChange={(value) =>
              setLayout({
                ...layout,
                footer: {
                  ...(layout.footer || {}),
                  goTop: {
                    ...defaultGoTop,
                    ...(layout.footer?.goTop || {}),
                    backgroundColor: value,
                  },
                },
              })
            }
          />

          <Color
            label="Text color"
            value={
              layout.footer?.goTop?.textColor ||
              "#481d96"
            }
            onChange={(value) =>
              setLayout({
                ...layout,
                footer: {
                  ...(layout.footer || {}),
                  goTop: {
                    ...defaultGoTop,
                    ...(layout.footer?.goTop || {}),
                    textColor: value,
                  },
                },
              })
            }
          />

          <Color
            label="Arrow color"
            value={
              layout.footer?.goTop?.iconColor ||
              "#481d96"
            }
            onChange={(value) =>
              setLayout({
                ...layout,
                footer: {
                  ...(layout.footer || {}),
                  goTop: {
                    ...defaultGoTop,
                    ...(layout.footer?.goTop || {}),
                    iconColor: value,
                  },
                },
              })
            }
          />
        </div>

        {layoutMessage && (
          <p className="mt-3 text-[10.5px] font-medium text-[#481d96]">
            {layoutMessage}
          </p>
        )}
      </div>

      {/* GLOBAL LAYOUT */}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-5">
        <h2 className="font-bold text-[#24133f]">
          Global Layout & Buttons
        </h2>

        {/* Sizing fields */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <NumberField
            label="Container width (px)"
            value={theme.containerWidth}
            onChange={(value) =>
              setTheme({
                ...theme,
                containerWidth: value,
              })
            }
          />

          <NumberField
            label="Default section gap (px)"
            value={theme.sectionGap}
            onChange={(value) =>
              setTheme({
                ...theme,
                sectionGap: value,
              })
            }
          />

          <NumberField
            label="Global radius (px)"
            value={theme.radius}
            onChange={(value) =>
              setTheme({
                ...theme,
                radius: value,
              })
            }
          />

          <NumberField
            label="Button radius (px)"
            value={theme.buttonRadius}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonRadius: value,
              })
            }
          />

          <NumberField
            label="Button horizontal padding"
            value={theme.buttonPaddingX}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonPaddingX: value,
              })
            }
          />

          <NumberField
            label="Button vertical padding"
            value={theme.buttonPaddingY}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonPaddingY: value,
              })
            }
          />
        </div>

        {/* Button colors — kept together in their own row/column group */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Color
            label="Secondary button background"
            value={theme.buttonSecondaryBg}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonSecondaryBg: value,
              })
            }
          />

          <Color
            label="Secondary button text"
            value={theme.buttonSecondaryText}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonSecondaryText: value,
              })
            }
          />

          <Color
            label="Primary button background"
            value={theme.buttonPrimaryBg}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonPrimaryBg: value,
              })
            }
          />

          <Color
            label="Primary button text"
            value={theme.buttonPrimaryText}
            onChange={(value) =>
              setTheme({
                ...theme,
                buttonPrimaryText: value,
              })
            }
          />
        </div>

        {/* Live button preview — reflects the settings above */}
        <div className="mt-5 border-t border-[#ece6f7] pt-4">
          <span className="mb-2 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7b8190]">
            Button Preview
          </span>

          <ButtonPreview theme={theme} />
        </div>
      </div>

      {/* CONTENT SECTIONS */}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
              Website Content
            </p>

            <h2 className="mt-1 font-bold text-[#24133f]">
              Content Sections
            </h2>

            <p className="mt-1 max-w-2xl text-[11px] leading-5 text-[#7b8190]">
              Hero, About, Services, Testimonials and every other homepage
              section's copy, images and repeatable items are edited from
              the dedicated Content Sections page, not from here.
            </p>
          </div>

          <a
            href="/admin/content"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#481d96] px-4 py-2.5 text-[11.5px] font-semibold text-white hover:bg-[#3a1778]"
          >
            Open Content Sections
          </a>
        </div>
      </div>

      {/* THEME SAVE */}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-[11px] text-[#2f8f46]">
          {message}
        </span>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetTheme}
            className="rounded-lg border border-[#d9cceb] bg-white px-4 py-2 text-[11.5px] font-semibold text-[#481d96]"
          >
            Reset Theme
          </button>

          <button
            type="button"
            onClick={saveTheme}
            disabled={saving}
            className="rounded-lg bg-[#481d96] px-4 py-2 text-[11.5px] font-semibold text-white disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : "Save Theme"}
          </button>
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <input
        value={value}
        placeholder={placeholder}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
      />
    </label>
  );
}

function TextArea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <textarea
        rows={3}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full resize-y rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
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
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[12px]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function FontSelect({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <label>
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        style={{ fontFamily: getFontStack(value) }}
        className="w-full rounded-lg border border-[#ddd5ed] bg-white px-3 py-2 text-[13px]"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            style={{
              fontFamily: getFontStack(option),
            }}
          >
            {option}
          </option>
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
  onChange: (value: string) => void;
}) {
  const safe =
    value && /^#[0-9A-Fa-f]{6}$/.test(value)
      ? value
      : "#ffffff";

  return (
    <label>
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <div className="flex gap-2">
        <input
          type="color"
          value={safe}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="h-9 w-12 rounded border"
        />

        <input
          value={value || ""}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className="min-w-0 flex-1 rounded-lg border border-[#ddd5ed] px-3 py-2 text-[12px]"
        />
      </div>
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
    <label>
      <span className="mb-1 block text-[10px] font-semibold text-[#24133f]">
        {label}
      </span>

      <input
        type="number"
        step={step}
        value={value}
        onChange={(event) =>
          onChange(
            Number(event.target.value)
          )
        }
        className="w-full rounded-lg border border-[#ddd5ed] px-3 py-2 text-[12px]"
      />
    </label>
  );
}
// Darkens (or lightens, with a negative amount) a "#rrggbb" color by a
// percentage. Used to derive a hover state for the button preview
// without needing a dedicated "hover color" theme field.
function shadeColor(hex: string, percent: number): string {
  const safe = /^#[0-9A-Fa-f]{6}$/.test(hex) ? hex : "#000000";

  const num = parseInt(safe.slice(1), 16);
  const amt = Math.round(2.55 * percent);

  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;

  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));

  return `#${(1 << 24 | (r << 16) | (g << 8) | b)
    .toString(16)
    .slice(1)}`;
}

function ButtonPreview({ theme }: { theme: Theme }) {
  const [primaryHover, setPrimaryHover] = useState(false);
  const [secondaryHover, setSecondaryHover] = useState(false);

  const sharedStyle: React.CSSProperties = {
    borderRadius: `${theme.buttonRadius}px`,
    paddingLeft: `${theme.buttonPaddingX}px`,
    paddingRight: `${theme.buttonPaddingX}px`,
    paddingTop: `${theme.buttonPaddingY}px`,
    paddingBottom: `${theme.buttonPaddingY}px`,
    fontFamily: getFontStack(theme.bodyFont),
    fontWeight: Number(theme.bodyWeight) || 400,
    fontSize: `${theme.baseFontSize}px`,
    borderWidth: "1px",
    borderStyle: "solid",
    transition: "background-color 0.15s ease, transform 0.15s ease",
    cursor: "pointer",
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-lg bg-[#faf8fd] p-4">
      <button
        type="button"
        style={{
          ...sharedStyle,
          backgroundColor: primaryHover
            ? shadeColor(theme.buttonPrimaryBg, -12)
            : theme.buttonPrimaryBg,
          color: theme.buttonPrimaryText,
          borderColor: theme.lineColor,
          transform: primaryHover
            ? "translateY(-1px)"
            : "translateY(0)",
        }}
        onMouseEnter={() => setPrimaryHover(true)}
        onMouseLeave={() => setPrimaryHover(false)}
      >
        Primary Button
      </button>

      <button
        type="button"
        style={{
          ...sharedStyle,
          backgroundColor: secondaryHover
            ? shadeColor(theme.buttonSecondaryBg, -12)
            : theme.buttonSecondaryBg,
          color: theme.buttonSecondaryText,
          borderColor: theme.lineColor,
          transform: secondaryHover
            ? "translateY(-1px)"
            : "translateY(0)",
        }}
        onMouseEnter={() => setSecondaryHover(true)}
        onMouseLeave={() => setSecondaryHover(false)}
      >
        Secondary Button
      </button>

      <span className="text-[10px] text-[#9a9fae]">
        Hover a button to preview its hover state.
      </span>
    </div>
  );
}
