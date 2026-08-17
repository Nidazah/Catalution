"use client";

import { FormEvent, useEffect, useState } from "react";
import { Check, Eye, EyeOff, GripVertical, Pencil, Plus, Trash2, X } from "lucide-react";

type Skill = { name: string; percent: number };

type TeamMember = {
  id: string;
  name: string;
  role: string;
  slug: string;
  bio: string | null;
  image: string;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  twitter: string | null;
  instagram: string | null;
  facebook: string | null;
  experience: string[] | null;
  coreBeliefs: string[] | null;
  skills: Skill[] | null;
  sortOrder: number;
  active: boolean;
  published: boolean;
};

type FormState = Omit<TeamMember, "id" | "experience" | "coreBeliefs" | "skills"> & {
  experience: string[];
  coreBeliefs: string[];
  skills: Skill[];
};

const emptyForm: FormState = {
  name: "",
  role: "",
  slug: "",
  bio: "",
  image: "",
  email: "",
  phone: "",
  linkedin: "",
  twitter: "",
  instagram: "",
  facebook: "",
  experience: [],
  coreBeliefs: [],
  skills: [],
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

const BRAND = {
  purple: "#4B1D96",
  purpleTint: "#DCCBFF",
  orange: "#FF6B00",
  orangeTint: "#FFE8D9",
};

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/team?admin=true", { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not load team");
      setTeam(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not load team");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function openAdd() {
    setEditingId(null);
    setForm({ ...emptyForm, sortOrder: team.length + 1 });
    setError("");
    setOpen(true);
  }

  function openEdit(member: TeamMember) {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      slug: member.slug,
      bio: member.bio ?? "",
      image: member.image,
      email: member.email ?? "",
      phone: member.phone ?? "",
      linkedin: member.linkedin ?? "",
      twitter: member.twitter ?? "",
      instagram: member.instagram ?? "",
      facebook: member.facebook ?? "",
      experience: member.experience ?? [],
      coreBeliefs: member.coreBeliefs ?? [],
      skills: member.skills ?? [],
      sortOrder: member.sortOrder,
      active: member.active,
      published: member.published,
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
      bio: form.bio || null,
      email: form.email || null,
      phone: form.phone || null,
      linkedin: form.linkedin || null,
      twitter: form.twitter || null,
      instagram: form.instagram || null,
      facebook: form.facebook || null,
    };
    try {
      const res = await fetch("/api/team", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not save team member");
      setOpen(false);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save team member");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this team member? This cannot be undone.")) return;
    const res = await fetch("/api/team", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) await load();
    else {
      const data = await res.json();
      setError(data.error || "Could not delete team member");
    }
  }

  function addExperience() {
    setForm((f) => ({ ...f, experience: [...f.experience, ""] }));
  }
  function updateExperience(i: number, v: string) {
    setForm((f) => ({ ...f, experience: f.experience.map((x, idx) => (idx === i ? v : x)) }));
  }
  function removeExperience(i: number) {
    setForm((f) => ({ ...f, experience: f.experience.filter((_, idx) => idx !== i) }));
  }

  function addBelief() {
    setForm((f) => ({ ...f, coreBeliefs: [...f.coreBeliefs, ""] }));
  }
  function updateBelief(i: number, v: string) {
    setForm((f) => ({ ...f, coreBeliefs: f.coreBeliefs.map((x, idx) => (idx === i ? v : x)) }));
  }
  function removeBelief(i: number) {
    setForm((f) => ({ ...f, coreBeliefs: f.coreBeliefs.filter((_, idx) => idx !== i) }));
  }

  function addSkill() {
    setForm((f) => ({ ...f, skills: [...f.skills, { name: "", percent: 80 }] }));
  }
  function updateSkill(i: number, patch: Partial<Skill>) {
    setForm((f) => ({
      ...f,
      skills: f.skills.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  }
  function removeSkill(i: number) {
    setForm((f) => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));
  }

  return (
    <div className="text-xs">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-[var(--font-poppins)] text-lg font-semibold tracking-tight text-[#151525] !text-[45px]">
            Team
          </h1>
          <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
            Manage the team members displayed across the Catalution website.
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]"
        >
          <Plus size={13} />
          Add Team Member
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
            Loading team...
          </div>
        ) : team.length === 0 ? (
          <div className="p-14 text-center">
            <p className="font-[var(--font-poppins)] text-xs font-medium text-[#151525]">
              No team members yet
            </p>
            <p className="font-[var(--font-inter)] mt-1 text-[11px] text-gray-500">
              Add your first team member.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#eef0f4]">
            {team.map((member, index) => (
              <div key={member.id} className="flex items-center gap-4 p-4 sm:p-4">
                <div
                  className="hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-semibold sm:flex"
                  style={{ background: `${BRAND.purpleTint}4D`, color: BRAND.purple }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <img src={member.image} alt="" className="h-14 w-14 shrink-0 rounded-xl object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-[var(--font-poppins)] truncate !text-[20px] font-semibold text-[#151525]">
                      {member.name}
                    </h2>
                    {member.published && member.active ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[9px] text-green-700">
                        <Eye size={10} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[9px] text-gray-500">
                        <EyeOff size={10} /> {member.active ? "Draft" : "Inactive"}
                      </span>
                    )}
                  </div>
                  <p className="font-[var(--font-inter)] mt-0.5 line-clamp-2 text-[11px] text-gray-500">
                    {member.role}
                  </p>
                </div>
                <div className="hidden items-center gap-1 text-[9px] text-gray-400 md:flex">
                  <GripVertical size={12} /> {member.sortOrder}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    onClick={() => openEdit(member)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#e1e4ea] transition-colors hover:bg-[#f7f4ff]"
                    title="Edit"
                  >
                    <Pencil size={14} color={BRAND.purple} />
                  </button>
                  <button
                    onClick={() => remove(member.id)}
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
                  {editingId ? "Edit Team Member" : "Add Team Member"}
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
                  <Field label="Name" value={form.name} required onChange={(v) => setForm((f) => ({ ...f, name: v }))} placeholder="Jane Doe" />
                  <Field label="Slug" value={form.slug} required onChange={(v) => setForm((f) => ({ ...f, slug: v }))} placeholder="jane-doe" />
                </div>
                <Field label="Role / Title" value={form.role} required onChange={(v) => setForm((f) => ({ ...f, role: v }))} placeholder="Lead Consultant" />
                <TextArea label="Bio" value={form.bio} onChange={(v) => setForm((f) => ({ ...f, bio: v }))} placeholder="Short bio shown on the profile page" rows={4} />
                <ImageField label="Photo" value={form.image} required onChange={(v) => setForm((f) => ({ ...f, image: v }))} />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Email" value={form.email} onChange={(v) => setForm((f) => ({ ...f, email: v }))} placeholder="jane@catalution.com" type="email" />
                  <Field label="Phone" value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} placeholder="+1 (009) 544-7826" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="LinkedIn URL" value={form.linkedin} onChange={(v) => setForm((f) => ({ ...f, linkedin: v }))} placeholder="https://linkedin.com/in/..." type="url" />
                  <Field label="Twitter/X URL" value={form.twitter} onChange={(v) => setForm((f) => ({ ...f, twitter: v }))} placeholder="https://x.com/..." type="url" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Instagram URL" value={form.instagram} onChange={(v) => setForm((f) => ({ ...f, instagram: v }))} placeholder="https://instagram.com/..." type="url" />
                  <Field label="Facebook URL" value={form.facebook} onChange={(v) => setForm((f) => ({ ...f, facebook: v }))} placeholder="https://facebook.com/..." type="url" />
                </div>

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">Work experience</h3>
                    <button type="button" onClick={addExperience} className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold" style={{ background: BRAND.purpleTint, color: BRAND.purple }}>+ Add paragraph</button>
                  </div>
                  <div className="grid gap-2">
                    {form.experience.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <textarea value={item} rows={2} onChange={(e) => updateExperience(i, e.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]" placeholder="Experience paragraph" />
                        <button type="button" onClick={() => removeExperience(i)} className="px-2 text-gray-400 hover:text-red-600"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">Core beliefs</h3>
                    <button type="button" onClick={addBelief} className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold" style={{ background: BRAND.purpleTint, color: BRAND.purple }}>+ Add belief</button>
                  </div>
                  <div className="grid gap-2">
                    {form.coreBeliefs.map((item, i) => (
                      <div key={i} className="flex gap-2">
                        <input value={item} onChange={(e) => updateBelief(i, e.target.value)} className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]" placeholder="We believe that..." />
                        <button type="button" onClick={() => removeBelief(i)} className="px-2 text-gray-400 hover:text-red-600"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-xl border border-[#e7e9ef] p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-[var(--font-poppins)] text-xs font-semibold text-[#151525]">Professional skills</h3>
                    <button type="button" onClick={addSkill} className="font-[var(--font-poppins)] rounded-lg px-3 py-1.5 text-[9px] font-semibold" style={{ background: BRAND.orangeTint, color: BRAND.orange }}>+ Add skill</button>
                  </div>
                  <div className="grid gap-2">
                    {form.skills.map((skill, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={skill.name} onChange={(e) => updateSkill(i, { name: e.target.value })} className="min-w-0 flex-1 rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]" placeholder="Business strategy" />
                        <input type="number" min={0} max={100} value={skill.percent} onChange={(e) => updateSkill(i, { percent: Number(e.target.value) })} className="w-16 rounded-lg border border-[#dfe2e8] px-2 py-1.5 text-[11px] outline-none focus:border-[#4B1D96]" />
                        <span className="text-[10px] text-gray-400">%</span>
                        <button type="button" onClick={() => removeSkill(i)} className="px-2 text-gray-400 hover:text-red-600"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                </section>

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
                {saving ? "Saving..." : editingId ? "Save Changes" : "Create Team Member"}
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

function ImageField({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFile(file: File) {
    setUploading(true);
    setUploadError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      onChange(data.url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="grid gap-1">
      <span className="font-[var(--font-poppins)] text-[11px] font-medium text-[#151525]">
        {label}
      </span>
      <div className="flex items-center gap-3">
        {value && (
          <img
            src={value}
            alt=""
            className="h-12 w-12 shrink-0 rounded-lg border border-[#e1e4ea] object-cover"
          />
        )}
        <div className="grid flex-1 gap-2">
          <input
            required={required && !value}
            type="url"
            value={value}
            placeholder="https://... or upload a file below"
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-xl border border-[#dfe2e8] px-3 py-2 text-[11px] outline-none transition-shadow focus:border-[#4B1D96] focus:ring-2 focus:ring-[#4B1D96]/10"
          />
          <div className="flex items-center gap-2">
            <label className="font-[var(--font-poppins)] cursor-pointer rounded-lg border border-[#dfe2e8] px-3 py-1.5 text-[10px] font-medium text-gray-700 transition-colors hover:bg-gray-50">
              {uploading ? "Uploading..." : "Upload from computer"}
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFile(file);
                  e.target.value = "";
                }}
                className="hidden"
              />
            </label>
            {uploadError && (
              <span className="text-[10px] text-red-600">{uploadError}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}