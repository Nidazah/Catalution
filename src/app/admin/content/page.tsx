"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Eye,
  EyeOff,
  ImagePlus,
  Pencil,
  Plus,
  RotateCcw,
  Save,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import IconPicker from "@/components/admin/IconPicker";
import { contentSectionDefaults } from "@/lib/content-section-defaults";

const sectionOptions = [
  ["HERO", "Hero", "Homepage opening message, imagery and primary CTAs"],
  [
    "SERVICES",
    "Services",
    "Homepage service cards, labels, descriptions and links",
  ],
  ["ABOUT", "About", "Company story, positioning, image and trust message"],
  ["MARQUE", "Marquee", "Scrolling brand/message strip and repeatable items"],
  [
    "PROCESS",
    "Process",
    "Transformation process, steps, images and descriptions",
  ],
  ["TEAM", "Team", "Homepage team section heading and intro copy"],
  [
    "CASE_STUDIES",
    "Case Study",
    "Homepage case-study heading and project cards",
  ],
  ["PRICING", "Pricing", "Homepage pricing section heading and intro copy"],
  ["TESTIMONIALS", "Testimonials", "Homepage testimonials heading"],
  ["CTA", "CTA", "Homepage call-to-action heading, copy and button"],

  [
    "PAGE_HERO_ABOUT",
    "About page hero",
    "The banner title/subtitle/background image at the top of /about",
  ],
  [
    "PAGE_HERO_HISTORY",
    "History page hero",
    "The banner title/subtitle/background image at the top of /history",
  ],
  [
    "ABOUT_INTRO",
    "About intro",
    "The 'About our company' header block and its two paragraphs",
  ],
  [
    "ABOUT_FEATURES",
    "About feature cards",
    "The four icon cards under the About intro (Quick solutions, etc.)",
  ],
  [
    "ABOUT_EVOLUTION",
    "About evolution & stats",
    "The 'Our evolution' quote, the three stat numbers, and the video block",
  ],
  [
    "ABOUT_SKILLS",
    "About skill & experience",
    "The dark 'Skill and experience' panel and its progress bars",
  ],
  [
    "ABOUT_LOGOS",
    "About client logos",
    "The scrolling client-logo strip near the bottom of /about",
  ],
  [
    "HISTORY_INTRO",
    "History intro",
    "The heading block below the /history hero ('Discover how we have evolved...')",
  ],
  [
    "HISTORY",
    "History timeline",
    "The year-by-year timeline entries on /history",
  ],
] as const;

type Item = {
  title: string;
  description: string;
  image: string;
  meta: string;
  link: string;
  icon?: string;
  badge?: string;
  tags?: string[];
  settings?: Record<string, any>;
};

type HeroSettings = {
  reelEnabled: boolean;
  reelLabel: string;
  reelUrl: string;
  clientCardEnabled: boolean;
  clientCount: string;
  clientLabel: string;
  clientAvatar1: string;
  clientAvatar2: string;
  clientAvatar3: string;
};

type Section = {
  id: string;
  sectionKey: (typeof sectionOptions)[number][0];
  label: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image: string | null;
  primaryButtonLabel: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonLabel: string | null;
  secondaryButtonUrl: string | null;
  items: Item[];
  settings: HeroSettings;
  sortOrder: number;
  published: boolean;
};

const emptyItem: Item = {
  title: "",
  description: "",
  image: "",
  meta: "",
  link: "",
  icon: "",
  badge: "",
  tags: [],
  settings: {},
};

const emptyForm = {
  sectionKey: "ABOUT" as Section["sectionKey"],
  label: "About",
  eyebrow: "",
  title: "",
  description: "",
  image: "",
  primaryButtonLabel: "",
  primaryButtonUrl: "",
  secondaryButtonLabel: "",
  secondaryButtonUrl: "",
  items: [] as Item[],
  settings: {
    reelEnabled: true,
    reelLabel: "Play our reels",
    reelUrl: "https://www.youtube.com/watch?v=MLpWrANjFbI",
    clientCardEnabled: true,
    clientCount: "39K+",
    clientLabel: "Happy clients all over world.",
    clientAvatar1: "",
    clientAvatar2: "",
    clientAvatar3: "",
  } as HeroSettings,
  sortOrder: 0,
  published: true,
};

export default function ContentManagerPage() {
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedKey, setSelectedKey] = useState<Section["sectionKey"]>("HERO");

  const [form, setForm] = useState({
    ...emptyForm,
    sectionKey: "HERO" as Section["sectionKey"],
    label: "Hero",
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  const selectedMeta = useMemo(
    () => sectionOptions.find(([key]) => key === selectedKey),
    [selectedKey],
  );

  async function load() {
    setLoading(true);
    setLoadError("");

    try {
      const res = await fetch("/api/content", {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Failed to load content: ${res.status}`);
      }

      const data = await res.json();

      setSections(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Load content error:", err);

      setLoadError(
        "Could not load content sections. The database may be waking up — try again in a few seconds.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function selectSection(key: Section["sectionKey"]) {
    setSelectedKey(key);

    const existing = sections.find((section) => section.sectionKey === key);

    if (existing) {
      setEditingId(existing.id);

      setForm({
        sectionKey: existing.sectionKey,
        label: existing.label,
        eyebrow: existing.eyebrow ?? "",
        title: existing.title,
        description: existing.description ?? "",
        image: existing.image ?? "",
        primaryButtonLabel: existing.primaryButtonLabel ?? "",
        primaryButtonUrl: existing.primaryButtonUrl ?? "",
        secondaryButtonLabel: existing.secondaryButtonLabel ?? "",
        secondaryButtonUrl: existing.secondaryButtonUrl ?? "",
        items: Array.isArray(existing.items)
          ? existing.items.map((item) => ({
              title: item.title ?? "",
              description: item.description ?? "",
              image: item.image ?? "",
              meta: item.meta ?? "",
              link: item.link ?? "",
              icon: item.icon ?? "",
              badge: item.badge ?? "",
              tags: Array.isArray(item.tags) ? item.tags : [],
              settings:
                item.settings && typeof item.settings === "object"
                  ? item.settings
                  : {},
            }))
          : [],
        settings: {
          ...((contentSectionDefaults[key] as any)?.settings ?? {}),
          ...(existing.settings &&
          typeof existing.settings === "object" &&
          !Array.isArray(existing.settings)
            ? existing.settings
            : {}),
        } as HeroSettings,
        sortOrder: existing.sortOrder,
        published: existing.published,
      });
    } else {
      const meta = sectionOptions.find(([item]) => item === key);

      setEditingId(null);

      setForm({
        ...emptyForm,
        sectionKey: key,
        label: meta?.[1] ?? key,
        settings: {
          ...((contentSectionDefaults[key] as any)?.settings ?? {}),
        } as HeroSettings,
        sortOrder: sectionOptions.findIndex(([item]) => item === key) + 1,
      });
    }

    setError("");
    setOpen(true);
  }

  function updateItem(index: number, patch: Partial<Item>) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, i) =>
        i === index
          ? {
              ...item,
              ...patch,
            }
          : item,
      ),
    }));
  }

  function addItem() {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          ...emptyItem,
        },
      ],
    }));
  }

  function removeItem(index: number) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }

  function moveItem(index: number, direction: -1 | 1) {
    setForm((prev) => {
      const next = [...prev.items];
      const target = index + direction;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return { ...prev, items: next };
    });
  }

  async function save(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const res = await fetch("/api/content", {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingId
            ? {
                id: editingId,
                ...form,
              }
            : form,
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Could not save this section.");
        return;
      }

      setOpen(false);

      await load();
    } catch (err) {
      console.error("Save content error:", err);

      setError("Could not save this section. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  function fieldLabels(key: Section["sectionKey"]) {
    switch (key) {
      case "MARQUE":
        return {
          itemTitle: "Marquee text",
          itemDescription: "Optional subtitle",
          itemMeta: "Badge / label",
          itemLink: "Link",
        };

      case "PROCESS":
        return {
          itemTitle: "Step title",
          itemDescription: "Step description",
          itemMeta: "Step label",
          itemLink: "Learn-more URL",
        };

      case "CASE_STUDIES":
        return {
          itemTitle: "Project title",
          itemDescription: "Project summary",
          itemMeta: "Category / tag",
          itemLink: "Project URL",
        };

      case "SERVICES":
        return {
          itemTitle: "Service title",
          itemDescription: "Service description",
          itemMeta: "Short label",
          itemLink: "Service URL",
        };

      case "ABOUT_FEATURES":
        return {
          itemTitle: "Card title",
          itemDescription: "Card description",
          itemMeta: "Label / meta",
          itemLink: "Link",
        };

      case "ABOUT_EVOLUTION":
        return {
          itemTitle: "Stat value",
          itemDescription: "Description",
          itemMeta: "Stat label",
          itemLink: "Link",
        };

      case "ABOUT_SKILLS":
        return {
          itemTitle: "Skill name",
          itemDescription: "Description",
          itemMeta: "Percentage (e.g. 90%)",
          itemLink: "Link",
        };

      case "ABOUT_LOGOS":
        return {
          itemTitle: "Company name",
          itemDescription: "Description",
          itemMeta: "Label / meta",
          itemLink: "Link",
        };

      case "HISTORY":
        return {
          itemTitle: "Milestone title",
          itemDescription: "Milestone text",
          itemMeta: "Year",
          itemLink: "Link",
        };

      default:
        return {
          itemTitle: "Item title",
          itemDescription: "Description",
          itemMeta: "Label / meta",
          itemLink: "Link",
        };
    }
  }

  function sectionCapabilities(key: Section["sectionKey"]) {
    switch (key) {
      case "CASE_STUDIES":
        return {
          mainImage: false,
          cta: false,
        };

      case "SERVICES":
        return {
          mainImage: false,
          cta: true,
        };

      case "ABOUT_FEATURES":
      case "ABOUT_SKILLS":
      case "ABOUT_LOGOS":
      case "HISTORY":
        return {
          mainImage: false,
          cta: false,
        };

      case "ABOUT_EVOLUTION":
        // "image" doubles as the video background image, and
        // "primaryButtonUrl" doubles as the video link — handled below.
        return {
          mainImage: true,
          cta: false,
        };

      default:
        return {
          mainImage: true,
          cta: true,
        };
    }
  }

  function itemsIntro(key: Section["sectionKey"]) {
    if (key === "CASE_STUDIES") {
      return {
        title: "Case study projects",
        subtitle:
          "Each project's image becomes a slide in the auto-rotating homepage carousel — add as many as you like.",
      };
    }

    if (key === "SERVICES") {
      return {
        title: "Service tiles",
        subtitle:
          "The first 4 published items become the service tiles on the homepage, each with its own icon.",
      };
    }

    if (key === "ABOUT_FEATURES") {
      return {
        title: "Feature cards",
        subtitle: "Each item becomes one icon card under the About intro.",
      };
    }

    if (key === "ABOUT_EVOLUTION") {
      return {
        title: "Stats",
        subtitle: "Each item becomes one stat number under the quote.",
      };
    }

    if (key === "ABOUT_SKILLS") {
      return {
        title: "Skill bars",
        subtitle:
          "Each item becomes one progress bar. Use a percentage like \"90%\" for the label.",
      };
    }

    if (key === "ABOUT_LOGOS") {
      return {
        title: "Client logos",
        subtitle: "Each item becomes one logo in the scrolling strip.",
      };
    }

    if (key === "HISTORY") {
      return {
        title: "Timeline milestones",
        subtitle:
          "Each item becomes one year on the /history timeline, in display order.",
      };
    }

    return {
      title: "Content items",
      subtitle:
        "Use this for team members, steps, projects, plans or testimonials.",
    };
  }

  async function remove(id: string) {
    if (
      !confirm(
        "Delete this content section? The website section will no longer have CMS content.",
      )
    ) {
      return;
    }

    const res = await fetch("/api/content", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
      }),
    });

    if (res.ok) {
      await load();

      setOpen(false);
      setEditingId(null);
    }
  }

  /*
   * RESET TO DEFAULT
   *
   * Important:
   * - Only updates the currently open form.
   * - Does NOT call the API.
   * - Does NOT modify the database.
   * - Does NOT modify another section.
   * - Admin must click Save Section to persist the reset.
   */
  function resetToDefault() {
    const defaults = contentSectionDefaults[form.sectionKey];

    if (!defaults) {
      return;
    }

    const confirmed = window.confirm(
      "Reset this section to its default content? Your current edits will be replaced.",
    );

    if (!confirmed) {
      return;
    }

    setForm((prev) => ({
      ...prev,

      label: defaults.label,

      eyebrow: defaults.eyebrow ?? "",

      title: defaults.title,

      description: defaults.description ?? "",

      image: defaults.image ?? "",

      primaryButtonLabel: defaults.primaryButtonLabel ?? "",

      primaryButtonUrl: defaults.primaryButtonUrl ?? "",

      secondaryButtonLabel: defaults.secondaryButtonLabel ?? "",

      secondaryButtonUrl: defaults.secondaryButtonUrl ?? "",

      items: Array.isArray(defaults.items)
        ? defaults.items.map((item) => ({
            title: item.title ?? "",
            description: item.description ?? "",
            image: item.image ?? "",
            meta: item.meta ?? "",
            link: item.link ?? "",
            icon: item.icon ?? "",
            badge: item.badge ?? "",
            tags: Array.isArray(item.tags) ? item.tags : [],
            settings:
              item.settings && typeof item.settings === "object"
                ? item.settings
                : {},
          }))
        : [],
      settings: { ...(defaults as any).settings },
      sortOrder: sectionOptions.findIndex(([key]) => key === form.sectionKey),
      published: true,
    }));

    setError("");
  }

  return (
    <div className="space-y-6 text-[12.5px]">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="mb-2 inline-flex items-center gap-2 rounded bg-orange-100 px-2.5 py-1 text-[10px] font-bold tracking-wider text-accent">
            <span className="h-1 w-1 rounded-full bg-accent" />
            Website CMS
          </span>

          <h1 className="mt-1.5 !text-[16px] font-semibold tracking-tight text-[#24133f]">
            Content Sections
          </h1>

          <p className="mt-1.5 max-w-2xl text-[11.5px] leading-5 text-[#6b7280]">
            Manage website content using the approved purple and orange brand
            system.
          </p>
        </div>

        <button
          type="button"
          onClick={() => selectSection(selectedKey)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#481d96] px-3.5 py-2 text-[11.5px] font-semibold text-white shadow-sm transition hover:bg-[#3d1980]"
        >
          <Plus size={13} />
          Edit {selectedMeta?.[1] ?? "Section"}
        </button>
      </div>

      {/* LOAD ERROR */}
      {loadError && (
        <div className="flex items-center justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[11.5px] text-red-700">
          <span>{loadError}</span>

          <button
            type="button"
            onClick={load}
            className="font-semibold underline hover:text-red-900"
          >
            Retry
          </button>
        </div>
      )}

      {/* SECTION GRID */}
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {sectionOptions.map(([key, label, description]) => {
          const section = sections.find((item) => item.sectionKey === key);

          const active = selectedKey === key;

          return (
            <button
              type="button"
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`rounded-xl border p-3.5 text-left transition-all ${
                active
                  ? "border-[#8b5cf6] bg-[#f0e9fc] shadow-sm"
                  : "border-[#ece6f7] bg-white hover:border-[#b94ef3] hover:bg-[#f0e9fc]"
              }`}
            >
              <div className="flex items-start justify-between gap-2.5">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ff6800]">
                    {label}
                  </p>

                  <h2 className="mt-0.5 !text-[12px] font-semibold text-[#24133f]">
                    {section?.title || "Not configured"}
                  </h2>
                </div>

                {section?.published ? (
                  <span className="rounded-full bg-[#f0faef] p-1 text-[#2f8f46]">
                    <Eye size={11} />
                  </span>
                ) : section ? (
                  <span className="rounded-full bg-[#f2f3f7] p-1 text-[#7b8190]">
                    <EyeOff size={11} />
                  </span>
                ) : (
                  <span className="rounded-full bg-[#fff1e8] p-1 text-[#ff6800]">
                    <Plus size={11} />
                  </span>
                )}
              </div>

              <p className="mt-1.5 text-[10.5px] leading-4 text-[#7b8190]">
                {description}
              </p>
            </button>
          );
        })}
      </div>

      {/* SELECTED SECTION PREVIEW */}
      <div className="overflow-hidden rounded-xl border border-[#ece6f7] bg-white">
        <div className="flex items-center justify-between border-b border-[#eeeaf5] px-4 py-3">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ff6800]">
              {selectedMeta?.[1]}
            </p>

            <h2 className="mt-0.5 !text-[12px] font-semibold text-[#24133f]">
              {sections.find((section) => section.sectionKey === selectedKey)
                ?.title || "Section not configured"}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => selectSection(selectedKey)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c9f4] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#481d96] hover:border-[#8b5cf6] hover:bg-[#f0eafa]"
          >
            <Pencil size={11} />

            {sections.some((section) => section.sectionKey === selectedKey)
              ? "Edit"
              : "Configure"}
          </button>
        </div>

        {loading ? (
          <div className="p-10 text-center text-[11.5px] text-[#7b8190]">
            Loading content...
          </div>
        ) : (
          <div className="p-4">
            {(() => {
              const current = sections.find(
                (section) => section.sectionKey === selectedKey,
              );

              if (!current) {
                return (
                  <div className="rounded-lg bg-[#faf7ff] p-6 text-center text-[11.5px] text-[#6b7280]">
                    This section has not been configured yet.
                  </div>
                );
              }

              return (
                <div className="grid gap-4 lg:grid-cols-[150px_1fr]">
                  <div className="h-28 overflow-hidden rounded-lg bg-[#f5f1fb]">
                    {current.image ? (
                      <img
                        src={current.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <ImagePlus className="m-auto h-full w-7 text-[#c4b2e8]" />
                    )}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="rounded-full bg-[#f0eafa] px-2 py-0.5 text-[9px] font-bold text-[#481d96]">
                        {current.label}
                      </span>

                      <span
                        className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                          current.published
                            ? "bg-[#f0faef] text-[#2f8f46]"
                            : "bg-[#f2f3f7] text-[#7b8190]"
                        }`}
                      >
                        {current.published ? "Published" : "Draft"}
                      </span>
                    </div>

                    <h3 className="mt-2 !text-[12px] font-semibold text-[#24133f]">
                      {current.title}
                    </h3>

                    <p className="mt-1.5 max-w-3xl text-[11.5px] leading-5 text-[#6b7280]">
                      {current.description || "No description added."}
                    </p>

                    {current.items?.length ? (
                      <p className="mt-2 text-[10.5px] font-medium text-[#ff6800]">
                        {current.items.length} managed content item
                        {current.items.length === 1 ? "" : "s"}
                      </p>
                    ) : null}
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c0d31]/60 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#eeeaf5] px-5 py-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#ff6800]">
                  {selectedMeta?.[1]}
                </p>

                <h2 className="mt-0.5 !text-[12px] font-semibold text-[#24133f]">
                  {editingId ? "Edit Section" : "Configure Section"}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-lg p-1.5 text-[#7b8190] hover:bg-[#ece6f7] hover:text-[#481d96]"
              >
                <X size={14} />
              </button>
            </div>

            {/* MODAL CONTENT */}
            <div className="overflow-y-auto px-5 py-5">
              <div className="grid gap-4">
                {(() => {
                  const capabilities = sectionCapabilities(form.sectionKey);

                  const labels = fieldLabels(form.sectionKey);

                  const intro = itemsIntro(form.sectionKey);

                  return (
                    <>
                      {form.sectionKey !== "SERVICES" &&
                        form.sectionKey !== "MARQUE" && (
                          <>
                            {/* LABEL + EYEBROW */}
                            <div className="grid gap-3 sm:grid-cols-2">
                              <Field
                                label="Section label"
                                value={form.label}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    label: value,
                                  })
                                }
                              />

                              <Field
                                label="Eyebrow / small heading"
                                value={form.eyebrow}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    eyebrow: value,
                                  })
                                }
                              />
                            </div>

                            {/* TITLE */}
                            <Field
                              label="Main heading"
                              value={form.title}
                              required
                              onChange={(value) =>
                                setForm({
                                  ...form,
                                  title: value,
                                })
                              }
                            />

                            {/* DESCRIPTION */}
                            <label className="grid gap-1">
                              <span className="text-[10.5px] font-semibold text-[#24133f]">
                                Description
                              </span>

                              <textarea
                                value={form.description}
                                rows={3}
                                onChange={(e) =>
                                  setForm({
                                    ...form,
                                    description: e.target.value,
                                  })
                                }
                                className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                              />
                            </label>

                            {/* MAIN IMAGE */}
                            {capabilities.mainImage &&
                              form.sectionKey !== "PRICING" &&
                              form.sectionKey !== "TESTIMONIALS" &&
                              form.sectionKey !== "CTA" && (
                                <ImageUploadField
                                  label="Main image"
                                  value={form.image}
                                  onChange={(url) =>
                                    setForm({
                                      ...form,
                                      image: url,
                                    })
                                  }
                                />
                              )}
                          </>
                        )}

                      {/* HERO-SPECIFIC FLOATING ELEMENTS */}
                      {form.sectionKey === "HERO" && (
                        <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                            Hero floating elements
                          </p>
                          <p className="mt-1 text-[10px] text-[#7b8190]">
                            These controls manage the three highlighted elements
                            on the homepage without changing the frontend
                            layout.
                          </p>

                          <div className="mt-3 space-y-4">
                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={form.settings.reelEnabled}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        reelEnabled: e.target.checked,
                                      },
                                    })
                                  }
                                />
                                <span className="text-[11px] font-semibold text-[#24133f]">
                                  Show Play Reels button
                                </span>
                              </label>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Button text"
                                  value={form.settings.reelLabel}
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        reelLabel: value,
                                      },
                                    })
                                  }
                                />
                                <Field
                                  label="Video URL"
                                  value={form.settings.reelUrl}
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        reelUrl: value,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <label className="flex items-center gap-2">
                                <input
                                  type="checkbox"
                                  checked={form.settings.clientCardEnabled}
                                  onChange={(e) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientCardEnabled: e.target.checked,
                                      },
                                    })
                                  }
                                />
                                <span className="text-[11px] font-semibold text-[#24133f]">
                                  Show Happy Clients card
                                </span>
                              </label>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Client count"
                                  value={form.settings.clientCount}
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientCount: value,
                                      },
                                    })
                                  }
                                />
                                <Field
                                  label="Client text"
                                  value={form.settings.clientLabel}
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientLabel: value,
                                      },
                                    })
                                  }
                                />
                              </div>
                              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                <ImageUploadField
                                  label="Avatar 1"
                                  value={form.settings.clientAvatar1}
                                  onChange={(url) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientAvatar1: url,
                                      },
                                    })
                                  }
                                />
                                <ImageUploadField
                                  label="Avatar 2"
                                  value={form.settings.clientAvatar2}
                                  onChange={(url) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientAvatar2: url,
                                      },
                                    })
                                  }
                                />
                                <ImageUploadField
                                  label="Avatar 3"
                                  value={form.settings.clientAvatar3}
                                  onChange={(url) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        clientAvatar3: url,
                                      },
                                    })
                                  }
                                />
                              </div>
                            </div>

                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <span className="text-[11px] font-semibold text-[#24133f]">
                                Number badge
                              </span>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Badge label"
                                  value={
                                    (form.settings as any).badgeLabel || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        badgeLabel: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="NUMBER"
                                />
                                <Field
                                  label="Badge value"
                                  value={
                                    (form.settings as any).badgeValue || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        badgeValue: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="#1"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ABOUT-SPECIFIC STATS */}
                      {form.sectionKey === "ABOUT" && (
                        <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                            About stats
                          </p>
                          <p className="mt-1 text-[10px] text-[#7b8190]">
                            The stat numbers and the reach badge shown on the
                            About image, without changing layout.
                          </p>

                          <div className="mt-3 space-y-3">
                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <span className="text-[11px] font-semibold text-[#24133f]">
                                Image badge
                              </span>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Badge label"
                                  value={
                                    (form.settings as any).statBadgeLabel || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        statBadgeLabel: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="Reach"
                                />
                                <Field
                                  label="Badge value"
                                  value={
                                    (form.settings as any).statBadgeValue || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        statBadgeValue: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="20M"
                                />
                              </div>
                            </div>

                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <span className="text-[11px] font-semibold text-[#24133f]">
                                Stat 1
                              </span>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Value"
                                  value={
                                    (form.settings as any).stat1Value || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        stat1Value: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="8.5x"
                                />
                                <Field
                                  label="Label"
                                  value={
                                    (form.settings as any).stat1Label || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        stat1Label: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="Faster growth"
                                />
                              </div>
                            </div>

                            <div className="rounded-lg border border-[#e7def7] bg-white p-3">
                              <span className="text-[11px] font-semibold text-[#24133f]">
                                Stat 2
                              </span>
                              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                                <Field
                                  label="Value"
                                  value={
                                    (form.settings as any).stat2Value || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        stat2Value: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="20M"
                                />
                                <Field
                                  label="Label"
                                  value={
                                    (form.settings as any).stat2Label || ""
                                  }
                                  onChange={(value) =>
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        stat2Label: value,
                                      } as any,
                                    })
                                  }
                                  placeholder="Reach worldwide"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ABOUT EVOLUTION VIDEO LINK */}
                      {form.sectionKey === "ABOUT_EVOLUTION" && (
                        <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                            Video block
                          </p>
                          <p className="mt-1 text-[10px] text-[#7b8190]">
                            The main image above is the video background; this
                            is the link opened when someone clicks play.
                          </p>

                          <div className="mt-3">
                            <Field
                              label="Video URL"
                              value={form.primaryButtonUrl}
                              onChange={(value) =>
                                setForm({
                                  ...form,
                                  primaryButtonUrl: value,
                                })
                              }
                              placeholder="https://www.youtube.com/watch?v=..."
                            />
                          </div>
                        </div>
                      )}

                      {/* PRICING-SPECIFIC TOGGLE LABELS */}
                      {form.sectionKey === "PRICING" && (
                        <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                            Billing toggle
                          </p>
                          <p className="mt-1 text-[10px] text-[#7b8190]">
                            Labels for the Monthly / Yearly toggle shown above
                            the pricing cards.
                          </p>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <Field
                              label="Monthly label"
                              value={(form.settings as any).monthlyLabel || ""}
                              onChange={(value) =>
                                setForm({
                                  ...form,
                                  settings: {
                                    ...form.settings,
                                    monthlyLabel: value,
                                  } as any,
                                })
                              }
                              placeholder="Monthly"
                            />
                            <Field
                              label="Yearly label"
                              value={(form.settings as any).yearlyLabel || ""}
                              onChange={(value) =>
                                setForm({
                                  ...form,
                                  settings: {
                                    ...form.settings,
                                    yearlyLabel: value,
                                  } as any,
                                })
                              }
                              placeholder="Yearly"
                            />
                            <Field
                              label="Yearly savings text"
                              value={
                                (form.settings as any).yearlySavingsText || ""
                              }
                              onChange={(value) =>
                                setForm({
                                  ...form,
                                  settings: {
                                    ...form.settings,
                                    yearlySavingsText: value,
                                  } as any,
                                })
                              }
                              placeholder="Save up to 2 months with annual billing"
                            />
                          </div>
                        </div>
                      )}

                      {/* TEAM-SPECIFIC SOCIAL LINKS */}
                      {form.sectionKey === "TEAM" && (
                        <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                          <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                            Social icon links
                          </p>
                          <p className="mt-1 text-[10px] text-[#7b8190]">
                            The 4 social icons shown under each team member
                            (LinkedIn, Instagram, Twitter, Facebook order).
                          </p>

                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {[
                              "LinkedIn",
                              "Instagram",
                              "Twitter",
                              "Facebook",
                            ].map((platform, socialIndex) => {
                              const currentLinks = Array.isArray(
                                (form.settings as any).socialLinks,
                              )
                                ? ((form.settings as any)
                                    .socialLinks as string[])
                                : [];
                              const fieldValue: string =
                                currentLinks[socialIndex] || "";
                              return (
                                <Field
                                  key={platform}
                                  label={platform}
                                  value={fieldValue}
                                  onChange={(value) => {
                                    const current = Array.isArray(
                                      (form.settings as any).socialLinks,
                                    )
                                      ? [...(form.settings as any).socialLinks]
                                      : ["", "", "", ""];
                                    current[socialIndex] = value;
                                    setForm({
                                      ...form,
                                      settings: {
                                        ...form.settings,
                                        socialLinks: current,
                                      } as any,
                                    });
                                  }}
                                  placeholder="https://..."
                                />
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* BUTTONS */}
                      {capabilities.cta &&
                        form.sectionKey !== "SERVICES" &&
                        form.sectionKey !== "MARQUE" &&
                        form.sectionKey !== "PRICING" &&
                        form.sectionKey !== "TESTIMONIALS" && (
                          <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                            <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                              Calls to action
                            </p>

                            <div className="mt-3 grid gap-3 sm:grid-cols-2">
                              <Field
                                label="Primary button"
                                value={form.primaryButtonLabel}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    primaryButtonLabel: value,
                                  })
                                }
                                placeholder="Get Started"
                              />

                              <Field
                                label="Primary URL"
                                value={form.primaryButtonUrl}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    primaryButtonUrl: value,
                                  })
                                }
                                placeholder="/contact"
                              />

                              <Field
                                label="Secondary button"
                                value={form.secondaryButtonLabel}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    secondaryButtonLabel: value,
                                  })
                                }
                              />

                              <Field
                                label="Secondary URL"
                                value={form.secondaryButtonUrl}
                                onChange={(value) =>
                                  setForm({
                                    ...form,
                                    secondaryButtonUrl: value,
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}

                      {/* REPEATABLE ITEMS */}
                      <div className="rounded-xl border border-[#ece6f7] p-3.5">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                              {intro.title}
                            </p>

                            <p className="mt-0.5 text-[10px] text-[#7b8190]">
                              {intro.subtitle}
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={addItem}
                            className="inline-flex items-center gap-1 rounded-lg bg-[#ff6800] px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-[#e85f00]"
                          >
                            <Plus size={11} />
                            Add item
                          </button>
                        </div>

                        <div className="mt-3 space-y-2.5">
                          {form.items.length === 0 ? (
                            <div className="rounded-lg border border-dashed border-[#d8c9f4] p-5 text-center text-[10.5px] text-[#7b8190]">
                              No repeatable items added.
                            </div>
                          ) : (
                            form.items.map((item, index) => (
                              <div
                                key={index}
                                className="rounded-xl bg-[#faf9fc] p-3.5"
                              >
                                <div className="mb-2.5 flex items-center justify-between">
                                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#ff6800]">
                                    {form.sectionKey === "CASE_STUDIES"
                                      ? "Project"
                                      : "Item"}{" "}
                                    {String(index + 1).padStart(2, "0")}
                                  </span>

                                  <div className="flex items-center gap-1">
                                    <button
                                      type="button"
                                      onClick={() => moveItem(index, -1)}
                                      disabled={index === 0}
                                      className="rounded-md border border-[#ddd5ed] bg-white p-1 text-[#481d96] disabled:opacity-30"
                                      aria-label="Move up"
                                    >
                                      <ChevronUp size={12} />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => moveItem(index, 1)}
                                      disabled={index === form.items.length - 1}
                                      className="rounded-md border border-[#ddd5ed] bg-white p-1 text-[#481d96] disabled:opacity-30"
                                      aria-label="Move down"
                                    >
                                      <ChevronDown size={12} />
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => removeItem(index)}
                                      className="rounded-md p-1 text-red-500 hover:bg-red-50"
                                    >
                                      <Trash2 size={12} />
                                    </button>
                                  </div>
                                </div>

                                <div className="grid gap-2.5">
                                  <Field
                                    label={labels.itemTitle}
                                    required
                                    value={item.title}
                                    onChange={(value) =>
                                      updateItem(index, {
                                        title: value,
                                      })
                                    }
                                  />

                                  {form.sectionKey === "HISTORY" ? (
                                    <>
                                      <div className="grid gap-2.5 sm:grid-cols-2">
                                        <Field
                                          label={labels.itemMeta}
                                          value={item.meta}
                                          onChange={(value) =>
                                            updateItem(index, { meta: value })
                                          }
                                          placeholder="2024"
                                        />

                                        <label className="grid gap-1">
                                          <span className="text-[10.5px] font-semibold text-[#24133f]">
                                            Side of timeline
                                          </span>
                                          <select
                                            value={
                                              (item.settings?.align as string) ||
                                              "left"
                                            }
                                            onChange={(e) =>
                                              updateItem(index, {
                                                settings: {
                                                  ...item.settings,
                                                  align: e.target.value,
                                                },
                                              })
                                            }
                                            className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                                          >
                                            <option value="left">Left</option>
                                            <option value="right">Right</option>
                                          </select>
                                        </label>
                                      </div>

                                      <label className="grid gap-1">
                                        <span className="text-[10.5px] font-semibold text-[#24133f]">
                                          {labels.itemDescription}
                                        </span>

                                        <textarea
                                          rows={2}
                                          value={item.description}
                                          onChange={(e) =>
                                            updateItem(index, {
                                              description: e.target.value,
                                            })
                                          }
                                          className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                                        />
                                      </label>

                                      <div className="grid gap-2.5 sm:grid-cols-2">
                                        <ImageUploadField
                                          label="Image 1"
                                          value={item.image}
                                          onChange={(url) =>
                                            updateItem(index, { image: url })
                                          }
                                        />

                                        <ImageUploadField
                                          label="Image 2"
                                          value={(item.settings?.image2 as string) || ""}
                                          onChange={(url) =>
                                            updateItem(index, {
                                              settings: {
                                                ...item.settings,
                                                image2: url,
                                              },
                                            })
                                          }
                                        />
                                      </div>
                                    </>
                                  ) : form.sectionKey === "SERVICES" ? (
                                    <>
                                      <div className="grid gap-2.5 sm:grid-cols-2">
                                        <Field
                                          label={labels.itemMeta}
                                          value={item.meta}
                                          onChange={(value) =>
                                            updateItem(index, { meta: value })
                                          }
                                        />

                                        <IconPicker
                                          value={item.icon || ""}
                                          onChange={(value) =>
                                            updateItem(index, { icon: value })
                                          }
                                        />
                                      </div>

                                      <p className="text-[9.5px] text-[#7b8190]">
                                        The icon and short label above are shown
                                        on this service's homepage tile, themed
                                        to match the site's purple/orange brand.
                                      </p>

                                      <label className="grid gap-1">
                                        <span className="text-[10.5px] font-semibold text-[#24133f]">
                                          {labels.itemDescription}
                                        </span>

                                        <textarea
                                          rows={2}
                                          value={item.description}
                                          onChange={(e) =>
                                            updateItem(index, {
                                              description: e.target.value,
                                            })
                                          }
                                          className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                                        />
                                      </label>
                                    </>
                                  ) : (
                                    <>
                                      <Field
                                        label={labels.itemMeta}
                                        value={item.meta}
                                        onChange={(value) =>
                                          updateItem(index, {
                                            meta: value,
                                          })
                                        }
                                      />

                                      {form.sectionKey !== "MARQUE" &&
                                        form.sectionKey !== "PRICING" &&
                                        form.sectionKey !== "TESTIMONIALS" && (
                                          <ImageUploadField
                                            label="Image"
                                            value={item.image}
                                            onChange={(url) =>
                                              updateItem(index, {
                                                image: url,
                                              })
                                            }
                                          />
                                        )}

                                      <label className="grid gap-1">
                                        <span className="text-[10.5px] font-semibold text-[#24133f]">
                                          {labels.itemDescription}
                                        </span>

                                        <textarea
                                          rows={2}
                                          value={item.description}
                                          onChange={(e) =>
                                            updateItem(index, {
                                              description: e.target.value,
                                            })
                                          }
                                          className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                                        />
                                      </label>

                                      <Field
                                        label={labels.itemLink}
                                        value={item.link}
                                        onChange={(value) =>
                                          updateItem(index, {
                                            link: value,
                                          })
                                        }
                                        placeholder="/contact or https://..."
                                      />

                                      <div className="grid gap-2.5 sm:grid-cols-2">
                                        <IconPicker
                                          value={item.icon || ""}
                                          onChange={(value) =>
                                            updateItem(index, { icon: value })
                                          }
                                        />

                                        <Field
                                          label="Badge"
                                          value={item.badge || ""}
                                          onChange={(value) =>
                                            updateItem(index, {
                                              badge: value,
                                            })
                                          }
                                          placeholder="e.g. New"
                                        />
                                      </div>

                                      <Field
                                        label="Tags (comma separated)"
                                        value={
                                          Array.isArray(item.tags)
                                            ? item.tags.join(", ")
                                            : ""
                                        }
                                        onChange={(value) =>
                                          updateItem(index, {
                                            tags: value
                                              .split(",")
                                              .map((t) => t.trim())
                                              .filter(Boolean),
                                          })
                                        }
                                        placeholder="tag-one, tag-two"
                                      />
                                    </>
                                  )}
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      </div>
                    </>
                  );
                })()}

                {/* ORDER + PUBLISH */}
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Display order"
                    value={String(form.sortOrder)}
                    type="number"
                    onChange={(value) =>
                      setForm({
                        ...form,
                        sortOrder: Number(value),
                      })
                    }
                  />

                  <label className="flex items-center gap-2.5 rounded-lg border border-[#ece6f7] px-2.5 py-2">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          published: e.target.checked,
                        })
                      }
                    />

                    <span className="text-[11.5px] font-medium text-[#24133f]">
                      Publish this section
                    </span>
                  </label>
                </div>

                {error && (
                  <div className="rounded-lg border border-red-200 bg-red-50 px-2.5 py-2 text-[11.5px] text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between gap-3 border-t border-[#eeeaf5] px-5 py-3.5">
              <div className="flex items-center gap-1.5">
                {editingId && (
                  <button
                    type="button"
                    onClick={() => remove(editingId)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10.5px] font-semibold text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    <Trash2 size={11} />
                    Delete section
                  </button>
                )}

                {/* RESET BUTTON */}
                {contentSectionDefaults[form.sectionKey] && (
                  <button
                    type="button"
                    onClick={resetToDefault}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#481D96] px-2.5 py-1.5 text-[10.5px] font-semibold text-white shadow-sm transition-colors hover:bg-[#6D28D9]"
                  >
                    <RotateCcw size={11} />
                    Reset to Default
                  </button>
                )}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-[#ddd6eb] px-3.5 py-2 text-[11.5px] font-medium text-[#4b5563] hover:border-[#c7cbd3] hover:bg-[#f3f4f6]"
                >
                  Cancel
                </button>

                <button
                  disabled={saving}
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#481d96] px-4 py-2 text-[11.5px] font-semibold text-white hover:bg-[#3d1980] disabled:opacity-60"
                >
                  <Save size={12} />

                  {saving ? "Saving..." : "Save Section"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-1">
      <span className="text-[10.5px] font-semibold text-[#24133f]">
        {label}
      </span>

      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
      />
    </label>
  );
}
