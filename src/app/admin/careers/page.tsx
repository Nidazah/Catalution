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
} from "lucide-react";

type Career = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: string;
  urgency: string | null;
  icon: string;
  description: string;
  requirements: string;
  requirementsGrid: string[] | null;
  responsibilities: string;
  responsibilitiesList: string[] | null;
  category: string;
  number: string;
  company: string;
  website: string | null;
  salary: string;
  vacancy: string;
  applyOn: string;
  tags: string[] | null;
  sortOrder: number;
  active: boolean;
  published: boolean;
};

type FormState = Omit<
  Career,
  "id" | "requirementsGrid" | "responsibilitiesList" | "tags"
> & {
  requirementsGrid: string[];
  responsibilitiesList: string[];
  tags: string[];
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  department: "",
  location: "",
  type: "Full time job/on site",
  urgency: "Urgent",
  icon: "swirl",
  description: "",
  requirements: "",
  requirementsGrid: [],
  responsibilities: "",
  responsibilitiesList: [],
  category: "",
  number: "",
  company: "Catalution",
  website: "",
  salary: "",
  vacancy: "",
  applyOn: "",
  tags: [],
  sortOrder: 1,
  active: true,
  published: true,
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const icons = ["swirl", "dots", "triangle", "c", "people", "eye"];

// Brand tokens — keep in sync with the kit
const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
  orange: "#FF6B00",
  orangeTint: "#FFEAD5",
};

export default function AdminCareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/careers?admin=true", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load careers");

      setCareers(Array.isArray(data) ? data : data.careers ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load careers");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: careers.length + 1 });
    setError("");
    setOpen(true);
  }

  function openEdit(career: Career) {
    setEditingId(career.id);
    setForm({
      title: career.title,
      slug: career.slug,
      department: career.department,
      location: career.location,
      type: career.type,
      urgency: career.urgency ?? "",
      icon: career.icon,
      description: career.description,
      requirements: career.requirements,
      requirementsGrid: career.requirementsGrid ?? [],
      responsibilities: career.responsibilities,
      responsibilitiesList: career.responsibilitiesList ?? [],
      category: career.category,
      number: career.number,
      company: career.company,
      website: career.website ?? "",
      salary: career.salary,
      vacancy: career.vacancy,
      applyOn: career.applyOn,
      tags: career.tags ?? [],
      sortOrder: career.sortOrder,
      active: career.active,
      published: career.published,
    });
    setError("");
    setOpen(true);
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      ...form,
      slug: form.slug || slugify(form.title),
      urgency: form.urgency || null,
      website: form.website || null,
    };
    try {
      const res = await fetch("/api/careers", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { id: editingId, ...payload } : payload,
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save career");
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save career");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this career listing? This cannot be undone.")) return;
    const res = await fetch(`/api/careers/${id}`, { method: "DELETE" });
    if (res.ok) await load();
    else {
      const data = await res.json();
      setError(data.error || "Could not delete career");
    }
  }

  function addListItem(field: "requirementsGrid" | "responsibilitiesList" | "tags") {
    setForm((f) => ({ ...f, [field]: [...f[field], ""] }));
  }
  function updateListItem(
    field: "requirementsGrid" | "responsibilitiesList" | "tags",
    index: number,
    value: string,
  ) {
    setForm((f) => ({
      ...f,
      [field]: f[field].map((item, i) => (i === index ? value : item)),
    }));
  }
  function removeListItem(
    field: "requirementsGrid" | "responsibilitiesList" | "tags",
    index: number,
  ) {
    setForm((f) => ({
      ...f,
      [field]: f[field].filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="text-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Careers
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the job listings displayed on the Catalution careers page.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Career
        </button>
      </div>

      {error && !open && (
        <div className="font-[var(--font-inter)] mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#e7e9ef] bg-white shadow-sm">
        {loading ? (
          <div className="font-[var(--font-inter)] p-12 text-center text-[11px] text-gray-500">
            Loading careers...
          </div>
        ) : careers.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No career listings yet
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first job opening.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {careers.map((career, index) => (
              <div key={career.id} className="flex items-center gap-4 p-4 sm:p-4">
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                      {career.title}
                    </h2>
                    {career.published && career.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} />{" "}
                        {career.active ? "Draft" : "Inactive"}
                      </span>
                    )}
                    {career.urgency && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-medium"
                        style={{ background: BRAND.orangeTint, color: BRAND.orange }}
                      >
                        {career.urgency}
                      </span>
                    )}
                  </div>
                  <p className="font-[var(--font-inter)] mt-0.5 line-clamp-1 text-[11px] text-gray-500">
                    {career.department} · {career.location} · {career.salary}
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} /> {career.sortOrder}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(career)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil size={14} color={BRAND.purple} />
                  </button>
                  <button
                    onClick={() => remove(career.id)}
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
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e7e9ef] p-5">
              <div>
                <h2 className="font-[var(--font-poppins)] text-base font-semibold text-[#151525]">
                  {editingId ? "Edit Career" : "Add Career"}
                </h2>
                <p className="font-[var(--font-inter)] mt-0.5 text-[9px] text-gray-500">
                  All changes are stored in PostgreSQL.
                </p>
              </div>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close">
                <X size={15} color="#6b7280" />
              </button>
            </div>
            <div className="overflow-y-auto p-5">
              <div className="grid gap-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Title"
                    value={form.title}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, title: v }))}
                    placeholder="Business Development Manager"
                  />
                  <Field
                    label="Slug"
                    value={form.slug}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
                    placeholder="business-development-manager"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Department"
                    value={form.department}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, department: v }))}
                    placeholder="Consulting"
                  />
                  <Field
                    label="Location"
                    value={form.location}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, location: v }))}
                    placeholder="London, UK"
                  />
                  <Field
                    label="Job type"
                    value={form.type}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, type: v }))}
                    placeholder="Full time job/on site"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Urgency badge"
                    value={form.urgency}
                    onChange={(v) => setForm((f) => ({ ...f, urgency: v }))}
                    placeholder="Urgent (leave blank to hide)"
                  />
                  <SelectField
                    label="Icon"
                    value={form.icon}
                    onChange={(v) => setForm((f) => ({ ...f, icon: v }))}
                    options={icons}
                  />
                  <Field
                    label="Reference number"
                    value={form.number}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, number: v }))}
                    placeholder="6080UO"
                  />
                </div>

                <TextArea
                  label="Description"
                  value={form.description}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                  placeholder="What this role is about"
                />
                <TextArea
                  label="Requirements intro"
                  value={form.requirements}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, requirements: v }))}
                  placeholder="Short paragraph before the requirements checklist"
                />

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Requirements checklist
                      </h3>
                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Shown as the "what you'll gain" style checklist.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addListItem("requirementsGrid")}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: BRAND.purpleTint, color: BRAND.purple }}
                    >
                      + Add point
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {form.requirementsGrid.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) =>
                            updateListItem("requirementsGrid", i, e.target.value)
                          }
                          className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]"
                          placeholder="Clear vision and direction for the business"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("requirementsGrid", i)}
                          className="px-2 text-gray-400 hover:text-red-600"
                          aria-label="Remove point"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <TextArea
                  label="Responsibilities intro"
                  value={form.responsibilities}
                  required
                  onChange={(v) =>
                    setForm((f) => ({ ...f, responsibilities: v }))
                  }
                  placeholder="Short paragraph before the responsibilities list"
                />

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Responsibilities list
                      </h3>
                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Bulleted list on the job detail page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addListItem("responsibilitiesList")}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: BRAND.orangeTint, color: BRAND.orange }}
                    >
                      + Add item
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {form.responsibilitiesList.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) =>
                            updateListItem(
                              "responsibilitiesList",
                              i,
                              e.target.value,
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]"
                          placeholder="Meet our team and learn"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("responsibilitiesList", i)}
                          className="px-2 text-gray-400 hover:text-red-600"
                          aria-label="Remove item"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Category"
                    value={form.category}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, category: v }))}
                    placeholder="Business consultant"
                  />
                  <Field
                    label="Company"
                    value={form.company}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, company: v }))}
                    placeholder="Catalution"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Website"
                    value={form.website}
                    onChange={(v) => setForm((f) => ({ ...f, website: v }))}
                    placeholder="www.example.com"
                  />
                  <Field
                    label="Salary"
                    value={form.salary}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, salary: v }))}
                    placeholder="$400-$550 / week"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Vacancy"
                    value={form.vacancy}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, vacancy: v }))}
                    placeholder="03 Available"
                  />
                  <Field
                    label="Apply on"
                    value={form.applyOn}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, applyOn: v }))}
                    placeholder="OCT 22, 2024"
                  />
                </div>

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Tags
                      </h3>
                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Shown as pills at the bottom of the listing.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => addListItem("tags")}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: BRAND.purpleTint, color: BRAND.purple }}
                    >
                      + Add tag
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {form.tags.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateListItem("tags", i, e.target.value)}
                          className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]"
                          placeholder="Consulting"
                        />
                        <button
                          type="button"
                          onClick={() => removeListItem("tags", i)}
                          className="px-2 text-gray-400 hover:text-red-600"
                          aria-label="Remove tag"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Display order"
                    value={String(form.sortOrder)}
                    required
                    type="number"
                    onChange={(v) =>
                      setForm((f) => ({ ...f, sortOrder: Number(v) }))
                    }
                  />
                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, active: e.target.checked }))
                      }
                    />{" "}
                    Active
                  </label>
                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, published: e.target.checked }))
                      }
                    />{" "}
                    Published
                  </label>
                </div>

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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Career"}
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
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-[#dfe2e8] bg-white px-3 py-2 text-[11px] outline-none focus:border-[#4B1D96]"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
