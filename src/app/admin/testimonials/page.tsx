"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, Eye, EyeOff, GripVertical, Pencil, Plus, Trash2, X } from "lucide-react";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  slug: string;
  avatar: string | null;
  sortOrder: number;
  active: boolean;
  published: boolean;
};

type FormState = Omit<Testimonial, "id">;

const emptyForm: FormState = {
  quote: "",
  name: "",
  role: "",
  slug: "",
  avatar: "",
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

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/testimonials?admin=true", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load testimonials");
      setTestimonials(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load testimonials");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: testimonials.length + 1 });
    setError("");
    setOpen(true);
  }

  function openEdit(item: Testimonial) {
    setEditingId(item.id);
    setForm({
      quote: item.quote,
      name: item.name,
      role: item.role,
      slug: item.slug,
      avatar: item.avatar ?? "",
      sortOrder: item.sortOrder,
      active: item.active,
      published: item.published,
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
      slug: form.slug || slugify(form.name),
      avatar: form.avatar || null,
    };
    try {
      const res = await fetch("/api/testimonials", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save testimonial");
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save testimonial");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial? This cannot be undone.")) return;
    const res = await fetch("/api/testimonials", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await load();
    else {
      const data = await res.json();
      setError(data.error || "Could not delete testimonial");
    }
  }

  return (
    <div className="text-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Testimonials
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the client testimonials displayed across the Catalution website.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Testimonial
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
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No testimonials yet
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first testimonial.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {testimonials.map((item, index) => (
              <div key={item.id} className="flex items-start gap-4 p-4 sm:p-4">
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                {item.avatar ? (
                  <img src={item.avatar} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                ) : (
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white"
                    style={{ background: BRAND.purple }}
                  >
                    {initials(item.name)}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[16px] font-semibold text-[#151525]">
                      {item.name}
                    </h2>
                    {item.published && item.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} /> {item.active ? "Draft" : "Inactive"}
                      </span>
                    )}
                  </div>
                  <p className="font-[var(--font-inter)] mt-0.5 text-[11px] text-gray-500">
                    {item.role}
                  </p>
                  <p className="font-[var(--font-inter)] mt-1.5 line-clamp-2 text-[11px] italic text-gray-600">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} /> {item.sortOrder}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(item)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil size={14} color={BRAND.purple} />
                  </button>
                  <button
                    onClick={() => remove(item.id)}
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
            className="flex max-h-[94vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e7e9ef] p-5">
              <div>
                <h2 className="font-[var(--font-poppins)] text-base font-semibold text-[#151525]">
                  {editingId ? "Edit Testimonial" : "Add Testimonial"}
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
                <TextArea
                  label="Quote"
                  value={form.quote}
                  required
                  rows={4}
                  onChange={(v) => setForm((f) => ({ ...f, quote: v }))}
                  placeholder="What the client said about working with you"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" value={form.name} required onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Jane Doe" />
                  <Field label="Slug" value={form.slug} required onChange={(v) => setForm((f) => ({ ...f, slug: v }))} placeholder="jane-doe" />
                </div>
                <Field label="Role / Company" value={form.role} required onChange={(v) => setForm((f) => ({ ...f, role: v }))} placeholder="VP Engineering, Ledgerly" />
                <Field label="Avatar URL (optional)" value={form.avatar} onChange={(v) => setForm((f) => ({ ...f, avatar: v }))} placeholder="https://... leave blank to use initials" type="url" />

                <div className="grid gap-4 sm:grid-cols-3">
                  <Field label="Display order" value={String(form.sortOrder)} required type="number" onChange={(v) => setForm((f) => ({ ...f, sortOrder: Number(v) }))} />
                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} /> Active
                  </label>
                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input type="checkbox" checked={form.published} onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))} /> Published
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
              <button type="button" onClick={() => setOpen(false)} className="font-[var(--font-poppins)] rounded-xl border border-[#dfe2e8] px-4 py-2 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50">
                Cancel
              </button>
              <button disabled={saving} type="submit" className="font-[var(--font-poppins)] inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60" style={{ background: BRAND.purple }}>
                <Check size={14} />
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Testimonial"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, required = false, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; type?: string }) {
  return (
    <label className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">{label}</span>
      <input required={required} type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full rounded-xl border border-[#dfe2e8] px-3 py-2 text-[11px] outline-none transition-shadow focus:border-[#4B1D96] focus:ring-2 focus:ring-[#4B1D96]/10" />
    </label>
  );
}

function TextArea({ label, value, onChange, placeholder, required = false, rows = 4 }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean; rows?: number }) {
  return (
    <label className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">{label}</span>
      <textarea required={required} rows={rows} value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} className="w-full resize-y rounded-xl border border-[#dfe2e8] px-3 py-2 text-[11px] outline-none transition-shadow focus:border-[#4B1D96] focus:ring-2 focus:ring-[#4B1D96]/10" />
    </label>
  );
}
