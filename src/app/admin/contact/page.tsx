"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  Check,
  Circle,
  CircleCheck,
  Mail,
  MailOpen,
  MapPin,
  Phone,
  Save,
  Star,
  Trash2,
} from "lucide-react";

type ContactInfo = {
  id: string;
  emailPrimary: string;
  emailSecondary: string | null;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  mapEmbedUrl: string | null;
  rating: number | null;
  reviewCount: number | null;
};

type InfoForm = {
  emailPrimary: string;
  emailSecondary: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  mapEmbedUrl: string;
  rating: string;
  reviewCount: string;
};

const emptyInfoForm: InfoForm = {
  emailPrimary: "",
  emailSecondary: "",
  phone: "",
  addressLine1: "",
  addressLine2: "",
  mapEmbedUrl: "",
  rating: "",
  reviewCount: "",
};

type Submission = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
};

export default function AdminContactPage() {
  const [tab, setTab] = useState<"info" | "submissions">("submissions");

  return (
    <div className="text-xs">
      <div className="mb-6">
        <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
          Contact
        </h1>
        <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
          Manage the contact details shown on the site and the messages that come in through the contact form.
        </p>
      </div>

      <div className="mb-6 inline-flex rounded-xl border border-[#e7e9ef] bg-white p-1 shadow-sm">
        <button
          type="button"
          onClick={() => setTab("submissions")}
          className={`font-[var(--font-poppins)] rounded-lg px-4 py-1.5 text-[11px] font-semibold transition-colors ${
            tab === "submissions" ? "text-white" : "text-gray-500 hover:text-[#151525]"
          }`}
          style={tab === "submissions" ? { background: BRAND.purple } : undefined}
        >
          Submissions
        </button>
        <button
          type="button"
          onClick={() => setTab("info")}
          className={`font-[var(--font-poppins)] rounded-lg px-4 py-1.5 text-[11px] font-semibold transition-colors ${
            tab === "info" ? "text-white" : "text-gray-500 hover:text-[#151525]"
          }`}
          style={tab === "info" ? { background: BRAND.purple } : undefined}
        >
          Contact Info
        </button>
      </div>

      {tab === "submissions" ? <SubmissionsPanel /> : <InfoPanel />}
    </div>
  );
}

function timeAgo(iso: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString();
}

function SubmissionsPanel() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact?admin=true", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load submissions");
      setSubmissions(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load submissions");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function toggleRead(item: Submission) {
    setSubmissions((prev) =>
      prev.map((s) => (s.id === item.id ? { ...s, read: !s.read } : s)),
    );
    const res = await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, read: !item.read }),
    });
    if (!res.ok) await load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message? This cannot be undone.")) return;
    const res = await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      if (openId === id) setOpenId(null);
    } else {
      const data = await res.json();
      setError(data.error || "Could not delete message");
    }
  }

  const visible = submissions.filter((s) => (filter === "unread" ? !s.read : true));
  const unreadCount = submissions.filter((s) => !s.read).length;

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="inline-flex rounded-lg border border-[#e7e9ef] bg-white p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`font-[var(--font-inter)] rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
              filter === "all" ? "bg-[#f4f0ff] text-[#4B1D96]" : "text-gray-500"
            }`}
          >
            All ({submissions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("unread")}
            className={`font-[var(--font-inter)] rounded-md px-3 py-1 text-[11px] font-medium transition-colors ${
              filter === "unread" ? "bg-[#f4f0ff] text-[#4B1D96]" : "text-gray-500"
            }`}
          >
            Unread ({unreadCount})
          </button>
        </div>
      </div>

      {error && (
        <div className="font-[var(--font-inter)] mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-[#e7e9ef] bg-white shadow-sm">
        {loading ? (
          <div className="font-[var(--font-inter)] p-12 text-center text-[11px] text-gray-500">
            Loading messages...
          </div>
        ) : visible.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No messages
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              {filter === "unread" ? "You're all caught up." : "Submissions from the contact form will show up here."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {visible.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div key={item.id}>
                  <div
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex cursor-pointer items-start gap-4 p-4 hover:bg-[#faf9fd]"
                  >
                    <div className="mt-0.5 shrink-0" title={item.read ? "Read" : "Unread"}>
                      {item.read ? (
                        <MailOpen size={16} color="#9ca3af" />
                      ) : (
                        <Mail size={16} color={BRAND.purple} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h2
                          className={`font-[var(--font-poppins)] truncate !text-[14px] ${
                            item.read ? "font-medium text-gray-600" : "font-semibold text-[#151525]"
                          }`}
                        >
                          {item.firstName} {item.lastName}
                        </h2>
                        {item.service && (
                          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[9px] font-medium text-[#ff6800]">
                            {item.service}
                          </span>
                        )}
                        <span className="font-[var(--font-inter)] ml-auto shrink-0 text-[10px] text-gray-400">
                          {timeAgo(item.createdAt)}
                        </span>
                      </div>
                      <p className="font-[var(--font-inter)] mt-0.5 text-[11px] text-gray-500">
                        {item.email}
                        {item.phone ? ` · ${item.phone}` : ""}
                      </p>
                      <p
                        className={`font-[var(--font-inter)] mt-1.5 text-[11px] text-gray-600 ${
                          isOpen ? "" : "line-clamp-2"
                        }`}
                      >
                        {item.message}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRead(item);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                        title={item.read ? "Mark unread" : "Mark read"}
                      >
                        {item.read ? (
                          <Circle size={14} color={BRAND.purple} />
                        ) : (
                          <CircleCheck size={14} color={BRAND.purple} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          remove(item.id);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 size={14} color="#dc2626" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function InfoPanel() {
  const [form, setForm] = useState<InfoForm>(emptyInfoForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/contact-info", { cache: "no-store" });
      const data: ContactInfo | null = await res.json();
      if (!res.ok) throw new Error("Could not load contact info");
      if (data) {
        setForm({
          emailPrimary: data.emailPrimary,
          emailSecondary: data.emailSecondary ?? "",
          phone: data.phone,
          addressLine1: data.addressLine1,
          addressLine2: data.addressLine2,
          mapEmbedUrl: data.mapEmbedUrl ?? "",
          rating: data.rating != null ? String(data.rating) : "",
          reviewCount: data.reviewCount != null ? String(data.reviewCount) : "",
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load contact info");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/contact-info", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          rating: form.rating || null,
          reviewCount: form.reviewCount || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save contact info");
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save contact info");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="rounded-2xl border border-[#e7e9ef] bg-white p-12 text-center text-[11px] text-gray-500 shadow-sm">
        Loading contact info...
      </div>
    );
  }

  return (
    <form
      onSubmit={save}
      className="max-w-2xl rounded-2xl border border-[#e7e9ef] bg-white p-6 shadow-sm"
    >
      <div className="mb-5 flex items-center gap-2">
        <Mail size={15} color={BRAND.purple} />
        <h2 className="font-[var(--font-poppins)] text-sm font-semibold text-[#151525]">
          Email
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Primary email"
          value={form.emailPrimary}
          required
          type="email"
          onChange={(v) => setForm((f) => ({ ...f, emailPrimary: v }))}
        />
        <Field
          label="Secondary email (optional)"
          value={form.emailSecondary}
          type="email"
          onChange={(v) => setForm((f) => ({ ...f, emailSecondary: v }))}
        />
      </div>

      <div className="mb-5 mt-8 flex items-center gap-2">
        <Phone size={15} color={BRAND.purple} />
        <h2 className="font-[var(--font-poppins)] text-sm font-semibold text-[#151525]">
          Phone
        </h2>
      </div>
      <Field label="Phone number" value={form.phone} required onChange={(v) => setForm((f) => ({ ...f, phone: v }))} />

      <div className="mb-5 mt-8 flex items-center gap-2">
        <MapPin size={15} color={BRAND.purple} />
        <h2 className="font-[var(--font-poppins)] text-sm font-semibold text-[#151525]">
          Address
        </h2>
      </div>
      <div className="grid gap-4">
        <Field label="Address line 1" value={form.addressLine1} required onChange={(v) => setForm((f) => ({ ...f, addressLine1: v }))} />
        <Field label="Address line 2" value={form.addressLine2} required onChange={(v) => setForm((f) => ({ ...f, addressLine2: v }))} />
        <Field
          label="Google Maps embed URL (optional)"
          value={form.mapEmbedUrl}
          onChange={(v) => setForm((f) => ({ ...f, mapEmbedUrl: v }))}
          placeholder="https://www.google.com/maps/embed?..."
        />
      </div>

      <div className="mb-5 mt-8 flex items-center gap-2">
        <Star size={15} color={BRAND.purple} />
        <h2 className="font-[var(--font-poppins)] text-sm font-semibold text-[#151525]">
          Trust badge
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Rating (0–5, optional)" value={form.rating} type="number" onChange={(v) => setForm((f) => ({ ...f, rating: v }))} placeholder="4.9" />
        <Field label="Review count (optional)" value={form.reviewCount} type="number" onChange={(v) => setForm((f) => ({ ...f, reviewCount: v }))} placeholder="200" />
      </div>

      {error && (
        <div className="font-[var(--font-inter)] mt-5 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-[11px] text-red-700">
          {error}
        </div>
      )}

      <div className="mt-8 flex items-center gap-3 border-t border-[#e7e9ef] pt-5">
        <button
          disabled={saving}
          type="submit"
          className="font-[var(--font-poppins)] inline-flex items-center gap-2 rounded-xl px-5 py-2 text-[11px] font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          style={{ background: BRAND.purple }}
        >
          <Save size={14} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="font-[var(--font-inter)] inline-flex items-center gap-1 text-[11px] text-green-700">
            <Check size={13} /> Saved
          </span>
        )}
      </div>
    </form>
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
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">{label}</span>
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
