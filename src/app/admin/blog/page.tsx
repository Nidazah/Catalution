"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  Eye,
  EyeOff,
  FileText,
  GripVertical,
  Pencil,
  Plus,
  Search,
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

type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string | null;
  image: string;
  author: string;
  authorAvatar?: string | null;
  date: string;
  category: string;
  tags?: string[] | null;
  comments?: number | null;
  sortOrder: number;
  active: boolean;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type BlogForm = {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  category: string;
  tags: string;
  comments: string;
  sortOrder: string;
  active: boolean;
  published: boolean;
};

const emptyForm: BlogForm = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  image: "",
  author: "",
  authorAvatar: "",
  date: new Date().toISOString().slice(0, 10),
  category: "",
  tags: "",
  comments: "0",
  sortOrder: "0",
  active: true,
  published: true,
};

function blogToForm(post: BlogPost): BlogForm {
  return {
    title: post.title || "",
    slug: post.slug || "",
    excerpt: post.excerpt || "",
    content: post.content || "",
    image: post.image || "",
    author: post.author || "",
    authorAvatar: post.authorAvatar || "",
    date: post.date || new Date().toISOString().slice(0, 10),
    category: post.category || "",
    tags: Array.isArray(post.tags) ? post.tags.join(", ") : "",
    comments: String(post.comments ?? 0),
    sortOrder: String(post.sortOrder ?? 0),
    active: post.active ?? true,
    published: post.published ?? true,
  };
}

function formToPayload(form: BlogForm) {
  return {
    title: form.title.trim(),
    slug: form.slug.trim(),
    excerpt: form.excerpt.trim(),
    content: form.content.trim(),
    image: form.image.trim(),
    author: form.author.trim(),
    authorAvatar: form.authorAvatar.trim(),
    date: form.date.trim(),
    category: form.category.trim(),
    tags: form.tags
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    comments: Number(form.comments) || 0,
    sortOrder: Number(form.sortOrder) || 0,
    active: form.active,
    published: form.published,
  };
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "published" | "draft" | "inactive"
  >("all");
  const [form, setForm] = useState<BlogForm>(emptyForm);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("/api/blog?includeInactive=true", {
        cache: "no-store",
      });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to load posts");
      }

      const items = Array.isArray(data)
        ? data
        : Array.isArray(data?.posts)
          ? data.posts
          : Array.isArray(data?.data)
            ? data.data
            : [];

      setPosts(items);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to load blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  function openAdd() {
    setEditingId(null);
    setForm({
      ...emptyForm,
      sortOrder: String(posts.length + 1),
    });
    setOpen(true);
  }

  function openEdit(post: BlogPost) {
    setEditingId(post.id);
    setForm(blogToForm(post));
    setOpen(true);
  }

  function closeModal() {
    if (saving) return;
    setOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  function updateField<K extends keyof BlogForm>(field: K, value: BlogForm[K]) {
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

      if (!form.title.trim()) throw new Error("Blog title is required.");
      if (!form.slug.trim()) throw new Error("Blog slug is required.");
      if (!form.excerpt.trim()) throw new Error("Blog excerpt is required.");
      if (!form.image.trim()) throw new Error("Blog image is required.");
      if (!form.author.trim()) throw new Error("Author is required.");
      if (!form.category.trim()) throw new Error("Category is required.");

      const payload = formToPayload(form);

      const res = await fetch(editingId ? `/api/blog/${editingId}` : "/api/blog", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to save blog post");
      }

      closeModal();
      await loadPosts();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to save blog post");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    const confirmed = window.confirm("Are you sure you want to delete this blog post?");
    if (!confirmed) return;

    try {
      setDeletingId(id);
      setError("");

      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || data?.message || "Failed to delete blog post");
      }

      await loadPosts();
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unable to delete blog post");
    } finally {
      setDeletingId(null);
    }
  }

  const visiblePosts = useMemo(() => {
    const term = query.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        term.length === 0 ||
        [
          post.title,
          post.excerpt,
          post.category,
          post.author,
          (post.tags ?? []).join(" "),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const status = !post.active ? "inactive" : post.published ? "published" : "draft";
      const matchesStatus = statusFilter === "all" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [posts, query, statusFilter]);

  return (
    <div className="space-y-5 text-[13px]">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Blog
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage your blog posts, editorial status, and portfolio-style content.
          </p>
        </div>

        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Blog
        </button>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full rounded-lg border border-[#e1e4ea] bg-white py-2 pl-9 pr-3 text-[11px] text-[#151525] outline-none transition focus:border-[#481d96] focus:ring-2 focus:ring-[#481d96]/10"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#7b8190]">
              Filter
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="rounded-lg border border-[#e1e4ea] bg-white px-2.5 py-2 text-[11px] text-[#151525] outline-none focus:border-[#481d96]"
            >
              <option value="all">All</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#ece6f7] bg-white">
        {loading ? (
          <div className="flex min-h-[220px] items-center justify-center text-[11px] text-gray-500">
            Loading blog posts...
          </div>
        ) : visiblePosts.length === 0 ? (
          <div className="flex min-h-[220px] flex-col items-center justify-center px-6 text-center">
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: BRAND.purpleTint, color: BRAND.purple }}
            >
              <FileText size={16} />
            </div>
            <h2 className="text-[13px] font-semibold text-[#24133f]">No blog posts found</h2>
            <p className="mt-1 max-w-sm text-[11px] leading-4 text-gray-500">
              Try another search or add a new post to start publishing content.
            </p>
            <button
              type="button"
              onClick={openAdd}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
            >
              <Plus size={13} />
              Add Blog
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#f0edf5]">
            {visiblePosts.map((post, index) => {
              const status = !post.active ? "inactive" : post.published ? "published" : "draft";
              const statusLabel = status === "published" ? "Published" : status === "draft" ? "Draft" : "Inactive";

              return (
                <div key={post.id} className="flex items-center gap-4 p-4 sm:p-4">
                  <div
                    className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                    style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-[#ece6f7] bg-[#f8f6fc]">
                    {post.image ? (
                      <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-[9px] font-semibold text-[#9ca3af]">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                        {post.title}
                      </h2>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] ${
                          status === "published"
                            ? "bg-green-50 text-green-700"
                            : status === "draft"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {status === "published" ? <Eye size={10} /> : <EyeOff size={10} />}
                        {statusLabel}
                      </span>
                    </div>

                    <p className="font-[var(--font-inter)] mt-0.5 line-clamp-2 text-[11px] text-gray-500">
                      {post.excerpt || "—"}
                    </p>

                    <div className="mt-1 flex flex-wrap items-center gap-2 text-[9px] text-gray-500">
                      <span>{post.category || "Uncategorized"}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>

                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {post.tags.slice(0, 3).map((tag) => (
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

                  <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                    <GripVertical size={12} />
                    {post.sortOrder}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      onClick={() => openEdit(post)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                      title="Edit"
                    >
                      <Pencil size={14} color={BRAND.purple} />
                    </button>

                    <button
                      type="button"
                      onClick={() => remove(post.id)}
                      disabled={deletingId === post.id}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      title="Delete"
                    >
                      {deletingId === post.id ? (
                        <span className="text-[9px] text-red-600">...</span>
                      ) : (
                        <Trash2 size={14} color="#dc2626" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <form
            onSubmit={save}
            className="flex max-h-[94vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#e7e9ef] px-5 py-4">
              <div>
                <h2 className="font-[var(--font-poppins)] text-[14px] font-semibold text-[#24133f]">
                  {editingId ? "Edit Blog" : "Add Blog"}
                </h2>
                <p className="mt-0.5 text-[10px] text-gray-500">
                  {editingId ? "Update the blog entry." : "Create a new blog post."}
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

            <div className="overflow-y-auto p-5">
              <div className="space-y-5">
                <SectionTitle title="Basic information" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Title"
                    required
                    value={form.title}
                    onChange={(value) => updateField("title", value)}
                    placeholder="Growth through smarter operations"
                  />
                  <Field
                    label="Slug"
                    required
                    value={form.slug}
                    onChange={(value) => updateField("slug", value)}
                    placeholder="growth-through-smarter-operations"
                  />
                </div>

                <Field
                  label="Excerpt"
                  required
                  value={form.excerpt}
                  onChange={(value) => updateField("excerpt", value)}
                  textarea
                  rows={3}
                  placeholder="Short summary of the post..."
                />

                <Field
                  label="Content"
                  value={form.content}
                  onChange={(value) => updateField("content", value)}
                  textarea
                  rows={6}
                  placeholder="Full article content..."
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Author"
                    required
                    value={form.author}
                    onChange={(value) => updateField("author", value)}
                    placeholder="Catalution team"
                  />
                  <Field
                    label="Author Avatar URL"
                    value={form.authorAvatar}
                    onChange={(value) => updateField("authorAvatar", value)}
                    placeholder="https://..."
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Date"
                    required
                    type="date"
                    value={form.date}
                    onChange={(value) => updateField("date", value)}
                  />
                  <Field
                    label="Category"
                    required
                    value={form.category}
                    onChange={(value) => updateField("category", value)}
                    placeholder="Operations"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Image URL"
                    required
                    value={form.image}
                    onChange={(value) => updateField("image", value)}
                    placeholder="https://..."
                  />
                  <Field
                    label="Sort order"
                    type="number"
                    value={form.sortOrder}
                    onChange={(value) => updateField("sortOrder", value)}
                  />
                </div>

                {form.image && (
                  <div>
                    <label className="mb-1.5 block text-[10px] font-semibold text-[#4b5563]">
                      Thumbnail preview
                    </label>
                    <div className="h-24 w-24 overflow-hidden rounded-xl border border-[#e1e4ea] bg-gray-50">
                      <img src={form.image} alt="" className="h-full w-full object-cover" />
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    label="Tags"
                    value={form.tags}
                    onChange={(value) => updateField("tags", value)}
                    placeholder="Strategy, Growth, Operations"
                  />
                  <Field
                    label="Comments"
                    type="number"
                    value={form.comments}
                    onChange={(value) => updateField("comments", value)}
                    placeholder="0"
                  />
                </div>

                <SectionTitle title="Publishing" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <Toggle
                    label="Active"
                    description="Allow this blog post to be active."
                    checked={form.active}
                    onChange={(value) => updateField("active", value)}
                  />
                  <Toggle
                    label="Published"
                    description="Show this blog post publicly."
                    checked={form.published}
                    onChange={(value) => updateField("published", value)}
                  />
                </div>
              </div>
            </div>

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
                style={{ background: BRAND.purple }}
              >
                <Check size={14} />
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Blog"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

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
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>

      {textarea ? (
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${className} resize-y`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
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
        <div className="text-[11px] font-semibold text-[#24133f]">{label}</div>
        <div className="mt-0.5 text-[9px] leading-3 text-gray-500">{description}</div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition ${checked ? "bg-[#481d96]" : "bg-gray-300"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-[18px]" : "left-0.5"}`}
        />
      </button>
    </label>
  );
}
