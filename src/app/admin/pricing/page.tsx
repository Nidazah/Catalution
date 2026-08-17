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

type Plan = {
  id: string;
  name: string;
  monthly: string;
  yearly: string;
  features: string[];
  active: boolean;
  published: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

type FormState = Omit<Plan, "id" | "createdAt" | "updatedAt">;

const emptyForm: FormState = {
  name: "",
  monthly: "",
  yearly: "",
  features: [],
  active: true,
  published: true,
  sortOrder: 1,
};

// Brand tokens — same as Services
const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
  orange: "#FF6B00",
  orangeTint: "#FFEAD5",
};

export default function AdminPricingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);

    try {
      const res = await fetch("/api/pricing?admin=true", {
        cache: "no-store",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Could not load pricing plans");
      }

      // The API should return the array directly.
      setPlans(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not load pricing plans",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sortOrder: plans.length + 1,
    });
    setError("");
    setOpen(true);
  }

  function openEdit(plan: Plan) {
    setEditingId(plan.id);

    setForm({
      name: plan.name,
      monthly: plan.monthly,
      yearly: plan.yearly,
      features: Array.isArray(plan.features) ? plan.features : [],
      active: plan.active,
      published: plan.published,
      sortOrder: plan.sortOrder,
    });

    setError("");
    setOpen(true);
  }

  async function save(e: FormEvent) {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      name: form.name.trim(),
      monthly: form.monthly.trim(),
      yearly: form.yearly.trim(),
      features: form.features.filter((feature) => feature.trim() !== ""),
      active: form.active,
      published: form.published,
      sortOrder: Number(form.sortOrder),
    };

    try {
      const res = await fetch("/api/pricing", {
        method: editingId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editingId
            ? {
                id: editingId,
                ...payload,
              }
            : payload,
        ),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Could not save pricing plan",
        );
      }

      setOpen(false);
      await load();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Could not save pricing plan",
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this pricing plan? This cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/pricing?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await load();
      } else {
        const data = await res.json().catch(() => null);

        setError(
          data?.error || "Could not delete pricing plan",
        );
      }
    } catch {
      setError("Could not delete pricing plan");
    }
  }

  function addFeature() {
    setForm((current) => ({
      ...current,
      features: [...current.features, ""],
    }));
  }

  function updateFeature(index: number, value: string) {
    setForm((current) => ({
      ...current,
      features: current.features.map((feature, i) =>
        i === index ? value : feature,
      ),
    }));
  }

  function removeFeature(index: number) {
    setForm((current) => ({
      ...current,
      features: current.features.filter((_, i) => i !== index),
    }));
  }

  return (
    <div className="text-xs">
      {/* PAGE HEADER — same structure as Services */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Pricing Plans
          </h1>

          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the pricing plans displayed across the Catalution website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Plan
        </button>
      </div>

      {/* ERROR — same style as Services */}
      {error && !open && (
        <div className="font-[var(--font-inter)] mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] text-red-700">
          {error}
        </div>
      )}

      {/* WHITE ROUNDED LIST — same as Services */}
      <div className="overflow-hidden rounded-2xl border border-[#e7e9ef] bg-white shadow-sm">
        {loading ? (
          <div className="font-[var(--font-inter)] p-12 text-center text-[11px] text-gray-500">
            Loading pricing plans...
          </div>
        ) : plans.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No pricing plans yet
            </p>

            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first pricing plan.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {plans.map((plan, index) => (
              <div
                key={plan.id}
                className="flex items-center gap-4 p-4 sm:p-4"
              >
                {/* NUMBER — same as Services */}
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{
                    background: `${BRAND.purpleTint}4D`,
                    color: BRAND.purple,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* PLAN CONTENT */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                      {plan.name}
                    </h2>

                    {/* PUBLISHED BADGE — same as Services */}
                    {plan.published && plan.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} />
                        {plan.active ? "Draft" : "Inactive"}
                      </span>
                    )}
                  </div>

                  {/* MONTHLY / YEARLY PRICES */}
                  <div className="font-[var(--font-inter)] mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-500">
                    <span>
                      Monthly:{" "}
                      <strong className="font-semibold text-[#151525]">
                        {formatPrice(plan.monthly)}
                      </strong>
                    </span>

                    <span>
                      Yearly:{" "}
                      <strong className="font-semibold text-[#151525]">
                        {formatPrice(plan.yearly)}
                      </strong>
                    </span>
                  </div>

                  {/* FEATURES */}
                  {plan.features?.length > 0 && (
                    <p className="font-[var(--font-inter)] mt-1 line-clamp-2 text-[11px] text-gray-500">
                      {plan.features.join(" • ")}
                    </p>
                  )}
                </div>

                {/* SORT ORDER — same as Services */}
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} />
                  {plan.sortOrder}
                </div>

                {/* ACTIONS — same as Services */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(plan)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil
                      size={14}
                      color={BRAND.purple}
                    />
                  </button>

                  <button
                    type="button"
                    onClick={() => remove(plan.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2
                      size={14}
                      color="#dc2626"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#e7e9ef] p-5">
              <div>
                <h2 className="font-[var(--font-poppins)] text-base font-semibold text-[#151525]">
                  {editingId ? "Edit Pricing Plan" : "Add Pricing Plan"}
                </h2>

                <p className="font-[var(--font-inter)] mt-0.5 text-[9px] text-gray-500">
                  All changes are stored in PostgreSQL.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                <X size={15} color="#6b7280" />
              </button>
            </div>

            {/* MODAL BODY */}
            <div className="overflow-y-auto p-5">
              <div className="grid gap-4">
                {/* PLAN NAME */}
                <Field
                  label="Plan name"
                  value={form.name}
                  required
                  onChange={(value) =>
                    setForm((current) => ({
                      ...current,
                      name: value,
                    }))
                  }
                  placeholder="Starter"
                />

                {/* PRICES */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Monthly price"
                    value={form.monthly}
                    required
                    onChange={(value) =>
                      setForm((current) => ({
                        ...current,
                        monthly: value,
                      }))
                    }
                    placeholder="$29"
                  />

                  <Field
                    label="Yearly price"
                    value={form.yearly}
                    required
                    onChange={(value) =>
                      setForm((current) => ({
                        ...current,
                        yearly: value,
                      }))
                    }
                    placeholder="$290"
                  />
                </div>

                {/* ORDER / ACTIVE / PUBLISHED */}
                <div className="grid gap-4 sm:grid-cols-3">
                  <Field
                    label="Display order"
                    value={String(form.sortOrder)}
                    required
                    type="number"
                    onChange={(value) =>
                      setForm((current) => ({
                        ...current,
                        sortOrder: Number(value),
                      }))
                    }
                  />

                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input
                      type="checkbox"
                      checked={form.active}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          active: e.target.checked,
                        }))
                      }
                    />
                    Active
                  </label>

                  <label className="font-[var(--font-inter)] flex items-end gap-2 pb-2 text-[11px] font-medium text-[#151525]">
                    <input
                      type="checkbox"
                      checked={form.published}
                      onChange={(e) =>
                        setForm((current) => ({
                          ...current,
                          published: e.target.checked,
                        }))
                      }
                    />
                    Published
                  </label>
                </div>

                {/* FEATURES */}
                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">
                        Features
                      </h3>

                      <p className="font-[var(--font-inter)] text-[9px] text-gray-500">
                        Features included with this pricing plan.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={addFeature}
                      className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold transition-opacity hover:opacity-80"
                      style={{
                        background: BRAND.orangeTint,
                        color: BRAND.orange,
                      }}
                    >
                      + Add feature
                    </button>
                  </div>

                  <div className="grid gap-2">
                    {form.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex gap-2"
                      >
                        <input
                          value={feature}
                          onChange={(e) =>
                            updateFeature(
                              index,
                              e.target.value,
                            )
                          }
                          className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]"
                          placeholder="1 User"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            removeFeature(index)
                          }
                          className="px-2 text-gray-400 hover:text-red-600"
                          aria-label="Remove feature"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* MODAL ERROR */}
                {error && (
                  <div className="font-[var(--font-inter)] rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
                    {error}
                  </div>
                )}
              </div>
            </div>

            {/* MODAL FOOTER */}
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
                style={{
                  background: BRAND.purple,
                }}
              >
                <Check size={14} />

                {saving
                  ? "Saving..."
                  : editingId
                    ? "Save Changes"
                    : "Create Plan"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

function formatPrice(value: string) {
  const trimmed = value.trim();

  if (!trimmed) return "—";

  return trimmed.startsWith("$")
    ? trimmed
    : `$${trimmed}`;
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
  onChange: (value: string) => void;
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