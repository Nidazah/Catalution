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
import IconPicker from "@/components/admin/IconPicker";

type Feature = { title: string; description: string; icon: string };
type Service = {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  fullDescription: string | null;
  icon: string;
  image: string;
  heroImage2: string | null;
  features: Feature[] | null;
  overviewItems: string[] | null;
  ctaLabel: string;
  ctaUrl: string;
  sortOrder: number;
  active: boolean;
  published: boolean;
};

type FormState = Omit<Service, "id" | "features" | "overviewItems"> & {
  features: Feature[];
  overviewItems: string[];
};

const emptyForm: FormState = {
  title: "",
  slug: "",
  shortDescription: "",
  description: "",
  fullDescription: "",
  icon: "waves",
  image: "",
  heroImage2: "",
  features: [],
  overviewItems: [],
  ctaLabel: "Get optimization",
  ctaUrl: "/contact",
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

// Brand tokens — keep in sync with the kit
const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
  orange: "#FF6B00",
  orangeTint: "#FFEAD5",
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/services?admin=true", {
        cache: "no-store",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load services");

      setServices(Array.isArray(data) ? data : data.services ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load services");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: services.length + 1 });
    setError("");
    setOpen(true);
  }

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription ?? "",
      description: service.description,
      fullDescription: service.fullDescription ?? "",
      icon: service.icon,
      image: service.image,
      heroImage2: service.heroImage2 ?? "",
      features: service.features ?? [],
      overviewItems: service.overviewItems ?? [],
      ctaLabel: service.ctaLabel,
      ctaUrl: service.ctaUrl,
      sortOrder: service.sortOrder,
      active: service.active,
      published: service.published,
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
      heroImage2: form.heroImage2 || null,
      shortDescription: form.shortDescription || null,
      fullDescription: form.fullDescription || null,
    };
    try {
      const res = await fetch("/api/services", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          editingId ? { id: editingId, ...payload } : payload,
        ),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save service");
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save service");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this service? This cannot be undone.")) return;
    const res = await fetch(`/api/services/${id}`, { method: "DELETE" });
    if (res.ok) await load();
    else {
      const data = await res.json();
      setError(data.error || "Could not delete service");
    }
  }

  function addFeature() {
    setForm((f) => ({
      ...f,
      features: [
        ...f.features,
        { title: "", description: "", icon: "sparkles" },
      ],
    }));
  }
  function updateFeature(index: number, patch: Partial<Feature>) {
    setForm((f) => ({
      ...f,
      features: f.features.map((item, i) =>
        i === index ? { ...item, ...patch } : item,
      ),
    }));
  }
  function removeFeature(index: number) {
    setForm((f) => ({
      ...f,
      features: f.features.filter((_, i) => i !== index),
    }));
  }
  function addOverview() {
    setForm((f) => ({ ...f, overviewItems: [...f.overviewItems, ""] }));
  }
  function updateOverview(index: number, value: string) {
    setForm((f) => ({
      ...f,
      overviewItems: f.overviewItems.map((item, i) =>
        i === index ? value : item,
      ),
    }));
  }
  function removeOverview(index: number) {
    setForm((f) => ({
      ...f,
      overviewItems: f.overviewItems.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="text-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Services
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the services displayed across the Catalution website.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Service
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
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No services yet
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first service.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="flex items-center gap-4 p-4 sm:p-4"
              >
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <img
                  src={service.image}
                  alt=""
                  className="h-14 w-14 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                      {service.title}
                    </h2>
                    {service.published && service.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} />{" "}
                        {service.active ? "Draft" : "Inactive"}
                      </span>
                    )}
                  </div>
                  <p className="font-[var(--font-inter)] mt-0.5 line-clamp-2 text-[11px] text-gray-500">
                    {service.shortDescription || service.description}
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} /> {service.sortOrder}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(service)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil size={14} color={BRAND.purple} />
                  </button>
                  <button
                    onClick={() => remove(service.id)}
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
                  {editingId ? "Edit Service" : "Add Service"}
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
                    placeholder="Business Process Optimization"
                  />
                  <Field
                    label="Slug"
                    value={form.slug}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, slug: v }))}
                    placeholder="business-process-optimization"
                  />
                </div>
                <Field
                  label="Short description"
                  value={form.shortDescription}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, shortDescription: v }))
                  }
                  placeholder="One concise sentence for cards and listings"
                />
                <TextArea
                  label="Description"
                  value={form.description}
                  required
                  onChange={(v) => setForm((f) => ({ ...f, description: v }))}
                  placeholder="Service description"
                />
                <TextArea
                  label="Full description"
                  value={form.fullDescription}
                  onChange={(v) =>
                    setForm((f) => ({ ...f, fullDescription: v }))
                  }
                  placeholder="Detailed service description shown on the service detail page"
                  rows={5}
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Image URL"
                    value={form.image}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, image: v }))}
                    placeholder="https://..."
                    type="url"
                  />
                  <Field
                    label="Second detail image URL"
                    value={form.heroImage2}
                    onChange={(v) => setForm((f) => ({ ...f, heroImage2: v }))}
                    placeholder="https://..."
                    type="url"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <IconPicker
                    label="Icon"
                    value={form.icon}
                    onChange={(v) => setForm((f) => ({ ...f, icon: v }))}
                  />
                  <Field
                    label="Button label"
                    value={form.ctaLabel}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, ctaLabel: v }))}
                    placeholder="Get optimization"
                  />
                  <Field
                    label="Button URL"
                    value={form.ctaUrl}
                    required
                    onChange={(v) => setForm((f) => ({ ...f, ctaUrl: v }))}
                    placeholder="/contact"
                  />
                </div>
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

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Overview points
                      </h3>
                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Shown as the service overview checklist.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addOverview}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: BRAND.purpleTint, color: BRAND.purple }}
                    >
                      + Add point
                    </button>
                  </div>
                  <div className="grid gap-2">
                    {form.overviewItems.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          value={item}
                          onChange={(e) => updateOverview(i, e.target.value)}
                          className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]"
                          placeholder="Clear outcome or benefit"
                        />
                        <button
                          type="button"
                          onClick={() => removeOverview(i)}
                          className="px-2 text-gray-400 hover:text-red-600"
                          aria-label="Remove point"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Key features
                      </h3>
                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Repeatable feature cards for the detail page.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={addFeature}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{ background: BRAND.orangeTint, color: BRAND.orange }}
                    >
                      + Add feature
                    </button>
                  </div>
                  <div className="grid gap-3">
                    {form.features.map((feature, i) => (
                      <div
                        key={i}
                        className="rounded-lg border border-[#eef0f4] bg-gray-50 p-3"
                      >
                        <div className="mb-2 flex justify-end">
                          <button
                            type="button"
                            onClick={() => removeFeature(i)}
                            className="text-gray-400 hover:text-red-600"
                            aria-label="Remove feature"
                          >
                            <X size={14} />
                          </button>
                        </div>
                        <div className="grid gap-2 sm:grid-cols-2">
                          <Field
                            label="Feature title"
                            value={feature.title}
                            onChange={(v) => updateFeature(i, { title: v })}
                            placeholder="Quick solutions"
                          />
                          <IconPicker
                            label="Icon"
                            value={feature.icon}
                            onChange={(v) => updateFeature(i, { icon: v })}
                          />
                        </div>
                        <TextArea
                          label="Feature description"
                          value={feature.description}
                          onChange={(v) => updateFeature(i, { description: v })}
                          placeholder="Short explanation"
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </section>

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
                  : editingId
                    ? "Save Changes"
                    : "Create Service"}
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
