"use client";

import { useCallback, useEffect, useState } from "react";
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

const BRAND = {
  purple: "#481d96",
  purpleDark: "#24133f",
  purpleLight: "#6d28d9",
  purpleTint: "#f0eafa",
  orange: "#ff6800",
  orangeLight: "#fb923c",
};

type Portfolio = {
  id: string;
  title: string;
  slug: string;
  tags: string[];
  image: string;
  heroImage: string;
  intro: string;
  description: string[];
  overview: {
    text: string;
    points: string[];
  };
  challenge?: string | null;
  solution?: string | null;
  highlightStats?: { value?: string; label?: string } | null;
  award?: string | null;
  testimonial?: string | null;
  media: {
    image: string;
    videoUrl: string;
  };
  finalResult: string[];
  info: {
    client: string;
    portfolio: string;
    service: string;
    category: string;
    date: string;
  };
  sortOrder: number;
  active: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

type PortfolioForm = {
  title: string;
  slug: string;
  tags: string;
  image: string;
  heroImage: string;
  intro: string;
  description: string;
  overviewText: string;
  overviewPoints: string;
  challenge: string;
  solution: string;
  highlightStatsValue: string;
  highlightStatsLabel: string;
  award: string;
  testimonial: string;
  mediaImage: string;
  videoUrl: string;
  finalResult: string;
  client: string;
  portfolio: string;
  service: string;
  category: string;
  date: string;
  sortOrder: string;
  active: boolean;
  published: boolean;
};

const emptyForm: PortfolioForm = {
  title: "",
  slug: "",
  tags: "",
  image: "",
  heroImage: "",
  intro: "",
  description: "",
  overviewText: "",
  overviewPoints: "",
  challenge: "",
  solution: "",
  highlightStatsValue: "",
  highlightStatsLabel: "",
  award: "",
  testimonial: "",
  mediaImage: "",
  videoUrl: "",
  finalResult: "",
  client: "",
  portfolio: "",
  service: "",
  category: "",
  date: "",
  sortOrder: "0",
  active: true,
  published: true,
};

function portfolioToForm(portfolio: Portfolio): PortfolioForm {
  return {
    title: portfolio.title || "",
    slug: portfolio.slug || "",
    tags: portfolio.tags?.join(", ") || "",
    image: portfolio.image || "",
    heroImage: portfolio.heroImage || "",
    intro: portfolio.intro || "",
    description: portfolio.description?.join("\n\n") || "",
    overviewText: portfolio.overview?.text || "",
    overviewPoints: portfolio.overview?.points?.join("\n") || "",
    challenge: portfolio.challenge ?? "",
    solution: portfolio.solution ?? "",
    highlightStatsValue:
      portfolio.highlightStats &&
      typeof portfolio.highlightStats === "object"
        ? portfolio.highlightStats.value ?? ""
        : "",
    highlightStatsLabel:
      portfolio.highlightStats &&
      typeof portfolio.highlightStats === "object"
        ? portfolio.highlightStats.label ?? ""
        : "",
    award: portfolio.award ?? "",
    testimonial: portfolio.testimonial ?? "",
    mediaImage: portfolio.media?.image || "",
    videoUrl: portfolio.media?.videoUrl || "",
    finalResult: portfolio.finalResult?.join("\n\n") || "",
    client: portfolio.info?.client || "",
    portfolio: portfolio.info?.portfolio || "",
    service: portfolio.info?.service || "",
    category: portfolio.info?.category || "",
    date: portfolio.info?.date || "",
    sortOrder: String(portfolio.sortOrder ?? 0),
    active: portfolio.active ?? true,
    published: portfolio.published ?? true,
  };
}

function formToPayload(form: PortfolioForm) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    tags: form.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    image: form.image.trim(),
    heroImage: form.heroImage.trim(),

    intro: form.intro.trim(),

    description: form.description
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean),

    overview: {
      text: form.overviewText.trim(),
      points: form.overviewPoints
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
    },

    challenge: form.challenge.trim(),
    solution: form.solution.trim(),

    highlightStats: {
      value: form.highlightStatsValue.trim(),
      label: form.highlightStatsLabel.trim(),
    },

    award: form.award.trim(),
    testimonial: form.testimonial.trim(),

    media: {
      image: form.mediaImage.trim(),
      videoUrl: form.videoUrl.trim(),
    },

    finalResult: form.finalResult
      .split(/\n\s*\n/)
      .map((item) => item.trim())
      .filter(Boolean),

    info: {
      client: form.client.trim(),
      portfolio: form.portfolio.trim(),
      service: form.service.trim(),
      category: form.category.trim(),
      date: form.date.trim(),
    },

    sortOrder: Number(form.sortOrder) || 0,
    active: form.active,
    published: form.published,
  };
}

export default function AdminPortfolioPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState<PortfolioForm>(emptyForm);

  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const loadPortfolios = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/portfolio?admin=true", {
        cache: "no-store",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error || data?.message || "Failed to load portfolios"
        );
      }

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.portfolios)
          ? data.portfolios
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setPortfolios(items);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load portfolios"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPortfolios();
  }, [loadPortfolios]);

  function openAdd() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sortOrder: String(portfolios.length + 1),
    });
    setOpen(true);
  }

  function openEdit(portfolio: Portfolio) {
    setEditingId(portfolio.id);
    setForm(portfolioToForm(portfolio));
    setOpen(true);
  }

  function closeModal() {
    if (saving) return;

    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateField<K extends keyof PortfolioForm>(
    field: K,
    value: PortfolioForm[K]
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      if (!form.title.trim()) {
        throw new Error("Portfolio title is required.");
      }

      if (!form.slug.trim()) {
        throw new Error("Portfolio slug is required.");
      }

      const payload = formToPayload(form);

      const res = await fetch(
        editingId
          ? `/api/portfolio/${editingId}`
          : "/api/portfolio",
        {
          method: editingId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Failed to save portfolio"
        );
      }

      closeModal();
      await loadPortfolios();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to save portfolio"
      );
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this portfolio?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const res = await fetch(`/api/portfolio/${id}`, {
        method: "DELETE",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(
          data?.error ||
            data?.message ||
            "Failed to delete portfolio"
        );
      }

      await loadPortfolios();
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to delete portfolio"
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-5 text-[13px]">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Portfolio
          </h1>

          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the portfolio projects displayed across the
            Catalution website.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Portfolio
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[11px] text-red-700">
          {error}
        </div>
      )}

      {/* Main List Card */}
      <div className="overflow-hidden rounded-xl border border-[#ece6f7] bg-white">
        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center">
            <div className="text-[11px] text-gray-500">
              Loading portfolios...
            </div>
          </div>
        ) : portfolios.length === 0 ? (
          /* Empty */
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{
                background: BRAND.purpleTint,
                color: BRAND.purple,
              }}
            >
              <BriefcaseIcon />
            </div>

            <h2 className="text-[13px] font-semibold text-[#24133f]">
              No portfolios yet
            </h2>

            <p className="mt-1 max-w-sm text-[11px] leading-4 text-gray-500">
              Add your first portfolio project to manage it
              from the CMS.
            </p>

            <button
              type="button"
              onClick={openAdd}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
            >
              <Plus size={13} />
              Add Portfolio
            </button>
          </div>
        ) : (
          /* List */
          <div className="divide-y divide-[#f0edf5]">
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio.id}
                className="flex items-center gap-4 p-4 sm:p-4"
              >
                {/* Number */}
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{
                    background: `${BRAND.purpleTint}4D`,
                    color: BRAND.purple,
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Thumbnail */}
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                  {portfolio.image ? (
                    <img
                      src={portfolio.image}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex h-full w-full items-center justify-center"
                      style={{
                        background: BRAND.purpleTint,
                        color: BRAND.purple,
                      }}
                    >
                      <BriefcaseIcon />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                      {portfolio.title}
                    </h2>

                    {portfolio.published && portfolio.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} />
                        Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} />

                        {portfolio.active
                          ? "Draft"
                          : "Inactive"}
                      </span>
                    )}
                  </div>

                  <p className="font-[var(--font-inter)] mt-0.5 line-clamp-2 text-[11px] text-gray-500">
                    {portfolio.intro ||
                      portfolio.info?.service ||
                      portfolio.tags?.join(", ") ||
                      "—"}
                  </p>

                  {portfolio.tags?.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {portfolio.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-[#f7f4ff] px-2 py-0.5 text-[8px] font-medium text-[#481d96]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sort Order */}
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} />
                  {portfolio.sortOrder}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(portfolio)}
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
                    onClick={() => remove(portfolio.id)}
                    disabled={deletingId === portfolio.id}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    title="Delete"
                  >
                    {deletingId === portfolio.id ? (
                      <span className="text-[9px] text-red-600">
                        ...
                      </span>
                    ) : (
                      <Trash2
                        size={14}
                        color="#dc2626"
                      />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#e7e9ef] px-5 py-4">
              <div>
                <h2 className="font-[var(--font-poppins)] text-[14px] font-semibold text-[#24133f]">
                  {editingId
                    ? "Edit Portfolio"
                    : "Add Portfolio"}
                </h2>

                <p className="mt-0.5 text-[10px] text-gray-500">
                  {editingId
                    ? "Update portfolio content."
                    : "Create a new portfolio project."}
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] text-gray-500 transition hover:bg-gray-50"
              >
                <X size={15} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-5">
              <div className="space-y-5">
                {/* Basic Information */}
                <SectionTitle title="Basic information" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Title"
                    required
                    value={form.title}
                    onChange={(value) =>
                      updateField("title", value)
                    }
                    placeholder="Innovate Consultancy"
                  />

                  <Field
                    label="Slug"
                    required
                    value={form.slug}
                    onChange={(value) =>
                      updateField("slug", value)
                    }
                    placeholder="innovate-consultancy"
                  />
                </div>

                <Field
                  label="Tags"
                  value={form.tags}
                  onChange={(value) =>
                    updateField("tags", value)
                  }
                  placeholder="Strategy, Growth"
                />

                <Field
                  label="Intro"
                  value={form.intro}
                  onChange={(value) =>
                    updateField("intro", value)
                  }
                  textarea
                  rows={3}
                  placeholder="Short portfolio introduction..."
                />

                {/* Images */}
                <SectionTitle title="Images" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Portfolio image"
                    value={form.image}
                    onChange={(value) =>
                      updateField("image", value)
                    }
                    placeholder="https://..."
                  />

                  <Field
                    label="Hero image"
                    value={form.heroImage}
                    onChange={(value) =>
                      updateField("heroImage", value)
                    }
                    placeholder="https://..."
                  />
                </div>

                {/* Image Preview */}
                {form.image && (
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-[#4b5563]">
                      Thumbnail preview
                    </label>

                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-[#e1e4ea] bg-gray-50">
                      <img
                        src={form.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {/* Description */}
                <SectionTitle title="Description" />

                <Field
                  label="Description"
                  value={form.description}
                  onChange={(value) =>
                    updateField("description", value)
                  }
                  textarea
                  rows={6}
                  placeholder="Separate paragraphs with a blank line..."
                />

                {/* Overview */}
                <SectionTitle title="Overview" />

                <Field
                  label="Overview text"
                  value={form.overviewText}
                  onChange={(value) =>
                    updateField("overviewText", value)
                  }
                  textarea
                  rows={5}
                  placeholder="Overview description..."
                />

                <Field
                  label="Overview points"
                  value={form.overviewPoints}
                  onChange={(value) =>
                    updateField("overviewPoints", value)
                  }
                  textarea
                  rows={5}
                  placeholder={"One point per line..."}
                />

                {/* Challenge & Solution */}
                <SectionTitle title="Challenge & Solution" />

                <Field
                  label="Challenge"
                  value={form.challenge}
                  onChange={(value) =>
                    updateField("challenge", value)
                  }
                  textarea
                  rows={5}
                  placeholder="Describe the main challenge of this project..."
                />

                <Field
                  label="Solution"
                  value={form.solution}
                  onChange={(value) =>
                    updateField("solution", value)
                  }
                  textarea
                  rows={5}
                  placeholder="Describe the solution delivered..."
                />

                {/* Highlight Stats */}
                <SectionTitle title="Highlight" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Highlight value"
                    value={form.highlightStatsValue}
                    onChange={(value) =>
                      updateField("highlightStatsValue", value)
                    }
                    placeholder="40%"
                  />

                  <Field
                    label="Highlight label"
                    value={form.highlightStatsLabel}
                    onChange={(value) =>
                      updateField("highlightStatsLabel", value)
                    }
                    placeholder="Increase in Brand Recall"
                  />
                </div>

                {/* Award & Testimonial */}
                <SectionTitle title="Award & Testimonial" />

                <Field
                  label="Award"
                  value={form.award}
                  onChange={(value) =>
                    updateField("award", value)
                  }
                  placeholder="Awwwards Site of the Day 2024"
                />

                <Field
                  label="Testimonial"
                  value={form.testimonial}
                  onChange={(value) =>
                    updateField("testimonial", value)
                  }
                  textarea
                  rows={5}
                  placeholder="Client testimonial..."
                />

                {/* Media */}
                <SectionTitle title="Media" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Media image"
                    value={form.mediaImage}
                    onChange={(value) =>
                      updateField("mediaImage", value)
                    }
                    placeholder="https://..."
                  />

                  <Field
                    label="Video URL"
                    value={form.videoUrl}
                    onChange={(value) =>
                      updateField("videoUrl", value)
                    }
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>

                {/* Final Result */}
                <SectionTitle title="Final result" />

                <Field
                  label="Final result"
                  value={form.finalResult}
                  onChange={(value) =>
                    updateField("finalResult", value)
                  }
                  textarea
                  rows={6}
                  placeholder="Separate paragraphs with a blank line..."
                />

                {/* Portfolio Information */}
                <SectionTitle title="Portfolio information" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Client"
                    value={form.client}
                    onChange={(value) =>
                      updateField("client", value)
                    }
                    placeholder="Client name"
                  />

                  <Field
                    label="Portfolio"
                    value={form.portfolio}
                    onChange={(value) =>
                      updateField("portfolio", value)
                    }
                    placeholder="Financial"
                  />

                  <Field
                    label="Service"
                    value={form.service}
                    onChange={(value) =>
                      updateField("service", value)
                    }
                    placeholder="Corporate"
                  />

                  <Field
                    label="Category"
                    value={form.category}
                    onChange={(value) =>
                      updateField("category", value)
                    }
                    placeholder="Marketing"
                  />

                  <Field
                    label="Date"
                    value={form.date}
                    onChange={(value) =>
                      updateField("date", value)
                    }
                    placeholder="08 March 2023"
                  />

                  <Field
                    label="Sort order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(value) =>
                      updateField("sortOrder", value)
                    }
                    placeholder="1"
                  />
                </div>

                {/* Publishing */}
                <SectionTitle title="Publishing" />

                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    label="Active"
                    description="Allow this portfolio to be active."
                    checked={form.active}
                    onChange={(value) =>
                      updateField("active", value)
                    }
                  />

                  <Toggle
                    label="Published"
                    description="Show this portfolio publicly."
                    checked={form.published}
                    onChange={(value) =>
                      updateField("published", value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-2 border-t border-[#e7e9ef] p-5">
              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="font-[var(--font-poppins)] rounded-xl border border-[#dfe2e8] px-4 py-2 text-[11px] font-medium text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-50"
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
                    : "Create Portfolio"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Shared UI                                                                   */
/* -------------------------------------------------------------------------- */

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-[#eeeaf5] pb-2">
      <h3 className="font-[var(--font-poppins)] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#481d96]">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  textarea = false,
  rows = 4,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  textarea?: boolean;
  rows?: number;
  type?: string;
  required?: boolean;
}) {
  const className =
    "w-full rounded-xl border border-[#dfe2e8] bg-white px-3 py-2 text-[11px] text-[#151525] outline-none transition placeholder:text-gray-400 focus:border-[#481d96] focus:ring-2 focus:ring-[#481d96]/10";

  return (
    <div>
      <label className="mb-1.5 block text-[10px] font-semibold text-[#4b5563]">
        {label}

        {required && (
          <span className="ml-0.5 text-red-500">*</span>
        )}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          rows={rows}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e1e4ea] p-3">
      <div>
        <div className="text-[11px] font-semibold text-[#24133f]">
          {label}
        </div>

        <div className="mt-0.5 text-[9px] leading-3 text-gray-500">
          {description}
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${
          checked ? "bg-[#481d96]" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
    </label>
  );
}

function BriefcaseIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="7"
        width="18"
        height="13"
        rx="2"
      />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
      <path d="M10 12v2h4v-2" />
    </svg>
  );
}