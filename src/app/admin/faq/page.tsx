"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  GripVertical,
  Pencil,
  Plus,
  Trash2,
  X,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

type FaqItem = {
  title: string; // question
  description: string; // answer
  image: string;
  meta: string;
  link: string;
};

type Section = {
  id: string;
  sectionKey: "FAQ";
  label: string;
  eyebrow: string | null;
  title: string;
  description: string | null;
  image: string | null;
  primaryButtonLabel: string | null;
  primaryButtonUrl: string | null;
  secondaryButtonLabel: string | null;
  secondaryButtonUrl: string | null;
  items: FaqItem[];
  published: boolean;
  sortOrder: number;
};

type FormState = { title: string; description: string };

const emptyForm: FormState = { title: "", description: "" };

const emptyItem: FaqItem = {
  title: "",
  description: "",
  image: "",
  meta: "",
  link: "",
};

// Brand tokens — keep in sync with the kit
const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
  orange: "#FF6B00",
  orangeTint: "#FFEAD5",
};

export default function AdminFaqPage() {
  const [section, setSection] = useState<Section | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/content?sectionKey=FAQ", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load FAQ");

      const list: Section[] = Array.isArray(data) ? data : [];
      setSection(list[0] ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load FAQ");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingIndex(null);
    setForm(emptyForm);
    setError("");
    setOpen(true);
  }

  function openEdit(index: number) {
    const item = section?.items[index];
    if (!item) return;
    setEditingIndex(index);
    setForm({ title: item.title, description: item.description });
    setError("");
    setOpen(true);
  }

  async function persistItems(items: FaqItem[]) {
    const payload = section
      ? {
          id: section.id,
          sectionKey: "FAQ" as const,
          label: section.label || "FAQ",
          eyebrow: section.eyebrow ?? "",
          title: section.title || "Frequently asked questions",
          description: section.description ?? "",
          image: section.image ?? "",
          primaryButtonLabel: section.primaryButtonLabel ?? "",
          primaryButtonUrl: section.primaryButtonUrl ?? "",
          secondaryButtonLabel: section.secondaryButtonLabel ?? "",
          secondaryButtonUrl: section.secondaryButtonUrl ?? "",
          items,
          published: section.published,
          sortOrder: section.sortOrder,
        }
      : {
          sectionKey: "FAQ" as const,
          label: "FAQ",
          title: "Frequently asked questions",
          description: "",
          items,
          published: true,
          sortOrder: 0,
        };

    const res = await fetch("/api/content", {
      method: section ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Could not save FAQ");
    setSection(data);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      const current = section?.items ?? [];
      const nextItem: FaqItem = {
        ...emptyItem,
        title: form.title,
        description: form.description,
      };
      const items =
        editingIndex === null
          ? [...current, nextItem]
          : current.map((item, i) => (i === editingIndex ? nextItem : item));

      await persistItems(items);
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save FAQ");
    } finally {
      setSaving(false);
    }
  }

  async function remove(index: number) {
    if (!confirm("Delete this question? This cannot be undone.")) return;
    if (!section) return;
    try {
      const items = section.items.filter((_, i) => i !== index);
      await persistItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not delete FAQ");
    }
  }

  async function move(index: number, direction: -1 | 1) {
    if (!section) return;
    const target = index + direction;
    if (target < 0 || target >= section.items.length) return;
    const items = [...section.items];
    [items[index], items[target]] = [items[target], items[index]];
    try {
      await persistItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not reorder FAQ");
    }
  }

  async function togglePublished() {
    if (!section) return;
    try {
      const res = await fetch("/api/content", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: section.id,
          sectionKey: "FAQ",
          label: section.label || "FAQ",
          eyebrow: section.eyebrow ?? "",
          title: section.title || "Frequently asked questions",
          description: section.description ?? "",
          image: section.image ?? "",
          primaryButtonLabel: section.primaryButtonLabel ?? "",
          primaryButtonUrl: section.primaryButtonUrl ?? "",
          secondaryButtonLabel: section.secondaryButtonLabel ?? "",
          secondaryButtonUrl: section.secondaryButtonUrl ?? "",
          items: section.items,
          published: !section.published,
          sortOrder: section.sortOrder,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not update FAQ");
      setSection(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not update FAQ");
    }
  }

  const items = section?.items ?? [];

  return (
    <div className="text-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            FAQ
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the questions and answers shown on the FAQ page and on
            service detail pages.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {section && (
            <button
              type="button"
              onClick={togglePublished}
              className="font-[var(--font-poppins)] inline-flex items-center gap-1.5 rounded-lg border border-[#e1e4ea] px-3 py-1.5 text-[12px] font-semibold text-[#151525] transition-colors hover:bg-gray-50"
            >
              {section.published ? (
                <>
                  <Eye size={13} color={BRAND.purple} /> Published
                </>
              ) : (
                <>
                  <EyeOff size={13} color="#6b7280" /> Hidden
                </>
              )}
            </button>
          )}
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
          >
            <Plus size={13} />
            Add Question
          </button>
        </div>
      </div>

      {error && !open && (
        <div className="font-[var(--font-inter)] mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#e7e9ef] bg-white shadow-sm">
        {loading ? (
          <div className="font-[var(--font-inter)] p-12 text-center text-[11px] text-gray-500">
            Loading FAQ...
          </div>
        ) : items.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No questions yet
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first question.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {items.map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 sm:p-4">
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-[var(--font-poppins)] truncate !text-[16px] font-semibold text-[#151525]">
                    {item.title}
                  </h2>
                  <p className="font-[var(--font-inter)] mt-0.5 line-clamp-2 text-[11px] text-gray-500">
                    {item.description}
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} /> {index + 1}
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Move up"
                  >
                    <ChevronUp size={14} color="#6b7280" />
                  </button>
                  <button
                    onClick={() => move(index, 1)}
                    disabled={index === items.length - 1}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    title="Move down"
                  >
                    <ChevronDown size={14} color="#6b7280" />
                  </button>
                  <button
                    onClick={() => openEdit(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil size={14} color={BRAND.purple} />
                  </button>
                  <button
                    onClick={() => remove(index)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 size={14} color="#dc2626" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e7e9ef] p-5">
              <div>
                <h2 className="font-[var(--font-poppins)] text-base font-semibold text-[#151525]">
                  {editingIndex === null ? "Add Question" : "Edit Question"}
                </h2>
                <p className="font-[var(--font-inter)] mt-0.5 text-[9px] text-gray-500">
                  Shown on /faq and on every service detail page.
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={15} color="#6b7280" />
              </button>
            </div>
            <div className="overflow-y-auto p-5">
              <div className="grid gap-4">
                <Field
                  label="Question"
                  value={form.title}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                  placeholder="How do consultants add value to a business?"
                />
                <TextArea
                  label="Answer"
                  value={form.description}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                  placeholder="Consultants bring deep expertise, fresh perspectives..."
                  rows={5}
                />

                {error && (
                  <div className="font-[var(--font-inter)] rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#e7e9ef] p-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-[var(--font-poppins)] rounded-xl border border-[#dfe2e8] px-4 py-2 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                disabled={saving}
                type="submit"
                className="font-[var(--font-poppins)] inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
                style={{ background: BRAND.purple }}
              >
                <Check size={14} />
                {saving
                  ? "Saving..."
                  : editingIndex === null
                    ? "Add Question"
                    : "Save Changes"}
              </button>
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
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">
        {label}
      </span>
      <input
        required={required}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#dfe2e8] px-3 py-2 text-[11px] outline-none transition-shadow focus:border-[#4B1D96] focus:ring-2 focus:ring-[#4B1D96]/10"
      />
    </label>
  );
}
function TextArea({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  rows?: number;
}) {
  return (
    <label className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">
        {label}
      </span>
      <textarea
        required={required}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full resize-y rounded-xl border border-[#dfe2e8] px-3 py-2 text-[11px] outline-none transition-shadow focus:border-[#4B1D96] focus:ring-2 focus:ring-[#4B1D96]/10"
      />
    </label>
  );
}