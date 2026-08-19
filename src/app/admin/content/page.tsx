"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  ImagePlus,
  Pencil,
  Plus,
  Save,
  Trash2,
  X,
} from "lucide-react";
import ImageUploadField from "@/components/admin/ImageUploadField";

const sectionOptions = [
  ["HERO", "Hero", "Homepage opening message and primary CTA"],
  ["ABOUT", "About", "Company story, positioning and trust message"],
  ["PROCESS", "Process", "How your ERP, POS and transformation process works"],
  ["WORK", "Work", "Implementation steps, capabilities or workflow"],
  ["CASE_STUDIES", "Case Studies", "Client projects and success stories"],
] as const;

type Item = {
  title: string;
  description: string;
  image: string;
  meta: string;
  link: string;
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
  sortOrder: number;
  published: boolean;
};

const emptyItem: Item = {
  title: "",
  description: "",
  image: "",
  meta: "",
  link: "",
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
  // ✅ NEW: Load error state
  const [loadError, setLoadError] = useState("");

  const selectedMeta = useMemo(
    () => sectionOptions.find(([key]) => key === selectedKey),
    [selectedKey],
  );

  // ✅ UPDATED: load() with error handling
  async function load() {
    setLoading(true);
    setLoadError(""); // Clear previous load errors
    
    try {
      const res = await fetch("/api/content", { cache: "no-store" });
      
      // ✅ Check if response is OK
      if (!res.ok) {
        throw new Error(`Failed to load content (status ${res.status})`);
      }
      
      const data = await res.json();
      setSections(Array.isArray(data) ? data : []);
      
    } catch (err) {
      console.error("Load error:", err);
      setLoadError(
        "Could not load content sections. The database may be waking up — try again in a few seconds."
      );
      // ✅ Keep existing sections on error
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
        items: Array.isArray(existing.items) ? existing.items : [],
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
        i === index ? { ...item, ...patch } : item,
      ),
    }));
  }

  function addItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));
  }

  function removeItem(index: number) {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");

    const res = await fetch("/api/content", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });
    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Could not save this section.");
      setSaving(false);
      return;
    }

    setOpen(false);
    setSaving(false);
    await load();
  }

  async function remove(id: string) {
    if (
      !confirm(
        "Delete this content section? The website section will no longer have CMS content.",
      )
    )
      return;
    const res = await fetch("/api/content", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      await load();
      setOpen(false);
      setEditingId(null);
    }
  }

  return (
    <div className="space-y-6 text-[12.5px]">
      {/* Page header */}
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
          onClick={() => selectSection(selectedKey)}
          className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#481d96] px-3.5 py-2 text-[11.5px] font-semibold text-white shadow-sm transition hover:bg-[#3d1980]"
        >
          <Plus size={13} /> Edit {selectedMeta?.[1] ?? "Section"}
        </button>
      </div>

      {/* ✅ NEW: Load Error Banner */}
      {loadError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[11.5px] text-red-700 flex items-center justify-between gap-3">
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

      {/* Section grid */}
      <div className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-3">
        {sectionOptions.map(([key, label, description]) => {
          const section = sections.find((item) => item.sectionKey === key);
          const active = selectedKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedKey(key)}
              className={`text-left rounded-xl border p-3.5 transition-all ${
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

      {/* Selected section preview */}
      <div className="rounded-xl border border-[#ece6f7] bg-white overflow-hidden">
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
            onClick={() => selectSection(selectedKey)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8c9f4] px-2.5 py-1.5 text-[10.5px] font-semibold text-[#481d96] hover:border-[#8b5cf6] hover:bg-[#f0eafa]"
          >
            <Pencil size={11} />{" "}
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
              if (!current)
                return (
                  <div className="rounded-lg bg-[#faf7ff] p-6 text-center text-[11.5px] text-[#6b7280]">
                    This section has not been configured yet.
                  </div>
                );
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

      {/* Edit modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1c0d31]/60 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
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

            <div className="overflow-y-auto px-5 py-5">
              <div className="grid gap-4">
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Section label"
                    value={form.label}
                    onChange={(value) => setForm({ ...form, label: value })}
                  />
                  <Field
                    label="Eyebrow / small heading"
                    value={form.eyebrow}
                    onChange={(value) => setForm({ ...form, eyebrow: value })}
                  />
                </div>

                <Field
                  label="Main heading"
                  value={form.title}
                  required
                  onChange={(value) => setForm({ ...form, title: value })}
                />

                <label className="grid gap-1">
                  <span className="text-[10.5px] font-semibold text-[#24133f]">
                    Description
                  </span>
                  <textarea
                    value={form.description}
                    rows={3}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="rounded-lg border border-[#ddd6eb] px-2.5 py-2 text-[11.5px] outline-none focus:border-[#8b5cf6] focus:ring-2 focus:ring-[#f0eafa]"
                  />
                </label>

                <ImageUploadField
                  label="Main image"
                  value={form.image}
                  onChange={(url) => setForm({ ...form, image: url })}
                />

                <div className="rounded-xl border border-[#ece6f7] bg-[#faf7ff] p-3.5">
                  <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                    Calls to action
                  </p>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Field
                      label="Primary button"
                      value={form.primaryButtonLabel}
                      onChange={(value) =>
                        setForm({ ...form, primaryButtonLabel: value })
                      }
                      placeholder="Get Started"
                    />
                    <Field
                      label="Primary URL"
                      value={form.primaryButtonUrl}
                      onChange={(value) =>
                        setForm({ ...form, primaryButtonUrl: value })
                      }
                      placeholder="/contact"
                    />
                    <Field
                      label="Secondary button"
                      value={form.secondaryButtonLabel}
                      onChange={(value) =>
                        setForm({ ...form, secondaryButtonLabel: value })
                      }
                    />
                    <Field
                      label="Secondary URL"
                      value={form.secondaryButtonUrl}
                      onChange={(value) =>
                        setForm({ ...form, secondaryButtonUrl: value })
                      }
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-[#ece6f7] p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[9.5px] font-bold uppercase tracking-[0.12em] text-[#481d96]">
                        Content items
                      </p>
                      <p className="mt-0.5 text-[10px] text-[#7b8190]">
                        Use this for team members, steps, projects, plans or
                        testimonials.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addItem}
                      className="inline-flex items-center gap-1 rounded-lg bg-[#ff6800] px-2.5 py-1.5 text-[10px] font-semibold text-white hover:bg-[#e85f00]"
                    >
                      <Plus size={11} /> Add item
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
                              Item {String(index + 1).padStart(2, "0")}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className="rounded-md p-1 text-red-500 hover:bg-red-50"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                          <div className="grid gap-2.5">
                            <Field
                              label="Title"
                              required
                              value={item.title}
                              onChange={(value) =>
                                updateItem(index, { title: value })
                              }
                            />
                            <Field
                              label="Meta / role / price"
                              value={item.meta}
                              onChange={(value) =>
                                updateItem(index, { meta: value })
                              }
                            />
                            <ImageUploadField
                              label="Image"
                              value={item.image}
                              onChange={(url) => updateItem(index, { image: url })}
                            />
                            <label className="grid gap-1">
                              <span className="text-[10.5px] font-semibold text-[#24133f]">
                                Description / details
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
                              label="Link"
                              value={item.link}
                              onChange={(value) =>
                                updateItem(index, { link: value })
                              }
                              placeholder="/contact or https://..."
                            />
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Display order"
                    value={String(form.sortOrder)}
                    type="number"
                    onChange={(value) =>
                      setForm({ ...form, sortOrder: Number(value) })
                    }
                  />
                  <label className="flex items-center gap-2.5 rounded-lg border border-[#ece6f7] px-2.5 py-2">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm({ ...form, published: e.target.checked })
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

            <div className="flex items-center justify-between gap-3 border-t border-[#eeeaf5] px-5 py-3.5">
              <div>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => remove(editingId)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10.5px] font-semibold text-red-600 hover:bg-red-100 hover:text-red-700"
                  >
                    <Trash2 size={11} /> Delete section
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
                  <Save size={12} /> {saving ? "Saving..." : "Save Section"}
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