"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, DragEvent, ReactNode } from "react";
import { ArrowDown, ArrowUp, Check, ChevronDown, Eye, EyeOff, Layers, Monitor, Move, Save, Smartphone, Sparkles, Tablet, ExternalLink, GripVertical, RotateCcw } from "lucide-react";

import ImageUploadField from "@/components/admin/ImageUploadField";
import Hero from "@/components/Hero";
import AboutSection from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Team from "@/components/Team";
import PricingHeader from "@/components/Price";
import Testimonials from "@/components/Testimonials";
import CaseStudy from "@/components/Case-Study";
import CTA from "@/components/CTA";
import Marquee from "@/components/Marquee";
import GenericCmsSection from "@/components/GenericCmsSection";
import { defaultTheme, defaultLayout, defaultSectionStyles } from "@/lib/site-defaults";
import { contentSectionDefaults } from "@/lib/content-section-defaults";

const HOMEPAGE_KEYS = ["HERO", "SERVICES", "ABOUT", "MARQUE", "PROCESS", "TEAM", "CASE_STUDIES", "PRICING", "TESTIMONIALS", "CTA"] as const;
type SectionKey = typeof HOMEPAGE_KEYS[number];
type Device = "desktop" | "tablet" | "mobile";
type Tab = "layout" | "spacing" | "visibility" | "advanced";
type AnySectionKey = SectionKey | "navbar" | "footer" | "consultantBanner";

type SectionStyle = Record<string, any>;
type CmsRow = Record<string, any> & { id?: string; sectionKey: string; label?: string; sortOrder?: number; published?: boolean };

const deviceLabels: Record<Device, string> = { desktop: "Desktop", tablet: "Tablet", mobile: "Mobile" };
const deviceWidths: Record<Device, number> = { desktop: 1180, tablet: 768, mobile: 390 };

const fallbackSections = HOMEPAGE_KEYS.map((key, index) => ({
  sectionKey: key,
  label: (contentSectionDefaults as any)[key]?.label || key,
  sortOrder: index + 1,
  published: true,
}));

const globalSections = [
  { sectionKey: "navbar", label: "Navbar", description: "Site navigation" },
  { sectionKey: "footer", label: "Footer", description: "Site footer" },
  { sectionKey: "consultantBanner", label: "Consultant Banner", description: "Inner-page CTA banner" },
] as const;

const layoutDirectionOptions = [
  { value: "text-left", label: "Text Left / Image Right" },
  { value: "image-left", label: "Image Left / Text Right" },
  { value: "centered", label: "Centered" },
  { value: "stacked", label: "Stacked" },
];

function number(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function hasOwn(obj: Record<string, any>, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

function deviceStyle(style: SectionStyle, device: Device): SectionStyle {
  if (device === "desktop") return style;
  return { ...style, ...((style.responsive?.[device] as SectionStyle | undefined) ?? {}) };
}

function updateDeviceField(style: SectionStyle, device: Device, key: string, value: unknown) {
  if (device === "desktop") return { ...style, [key]: value };
  return {
    ...style,
    responsive: {
      ...(style.responsive ?? {}),
      [device]: { ...((style.responsive?.[device] as SectionStyle | undefined) ?? {}), [key]: value },
    },
  };
}

function isHomepageSection(key: string): key is SectionKey {
  return (HOMEPAGE_KEYS as readonly string[]).includes(key);
}

function SectionDropdown({
  value,
  homepageRows,
  onChange,
}: {
  value: AnySectionKey;
  homepageRows: CmsRow[];
  onChange: (key: AnySectionKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const groups: { key: string; label: string; icon: ReactNode; rows: { sectionKey: AnySectionKey; label: string }[] }[] = [
    {
      key: "homepage",
      label: "Homepage sections",
      icon: <Layers size={11} />,
      rows: homepageRows.map((row) => ({ sectionKey: row.sectionKey as AnySectionKey, label: row.label || row.sectionKey })),
    },
    {
      key: "chrome",
      label: "Site chrome",
      icon: <Sparkles size={11} />,
      rows: globalSections.map((row) => ({ sectionKey: row.sectionKey as AnySectionKey, label: row.label })),
    },
  ];

  const active = groups.flatMap((g) => g.rows).find((r) => r.sectionKey === value);
  const activeGroup = groups.find((g) => g.rows.some((r) => r.sectionKey === value));

  return (
    <div ref={rootRef} className="relative mt-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={`flex h-10 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 text-left text-xs font-semibold outline-none transition-colors ${open ? "border-[#6c39bd] ring-4 ring-[#6c39bd]/10" : "border-[#dcd3e8] hover:border-[#c6b8e0]"}`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[#f3edfb] text-[#6c39bd]">{activeGroup?.icon ?? <Layers size={11} />}</span>
          <span className="min-w-0 truncate text-[#3c3548]">{active?.label ?? "Select a section"}</span>
        </span>
        <ChevronDown size={14} className={`shrink-0 text-[#9186a3] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div role="listbox" className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-80 overflow-y-auto rounded-xl border border-[#e7dfef] bg-white p-1.5 shadow-[0_18px_45px_rgba(43,20,88,0.16)] ring-1 ring-black/5">
          {groups.map((group, gi) => (
            <div key={group.key} className={gi > 0 ? "mt-1.5 border-t border-[#f0eaf7] pt-1.5" : ""}>
              <div className="flex items-center gap-1.5 px-2 py-1.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#a397b5]">
                {group.icon}
                <span>{group.label}</span>
              </div>
              <div className="space-y-0.5">
                {group.rows.map((row) => {
                  const selected = row.sectionKey === value;
                  return (
                    <button
                      key={row.sectionKey}
                      type="button"
                      role="option"
                      aria-selected={selected}
                      onClick={() => { onChange(row.sectionKey); setOpen(false); }}
                      className={`flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-[11px] font-semibold transition-colors ${selected ? "bg-[#f0e8ff] text-[#5424a6]" : "text-[#514860] hover:bg-[#faf8fd]"}`}
                    >
                      <span className="min-w-0 truncate">{row.label}</span>
                      {selected && <Check size={13} className="shrink-0 text-[#6c39bd]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function LayoutManagerPage() {
  const [activeSection, setActiveSection] = useState<AnySectionKey>("HERO");
  const [tab, setTab] = useState<Tab>("spacing");
  const [device, setDevice] = useState<Device>("desktop");
  const [preview, setPreview] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);
  const [sectionStyles, setSectionStyles] = useState<Record<string, SectionStyle>>({});
  const [effectiveStyles, setEffectiveStyles] = useState<Record<string, SectionStyle>>({});
  const [layout, setLayout] = useState<Record<string, any>>({});
  const [layoutOverrides, setLayoutOverrides] = useState<Record<string, any>>({});
  const [theme, setTheme] = useState<Record<string, any>>(defaultTheme as any);
  const [contentRows, setContentRows] = useState<CmsRow[]>(fallbackSections as CmsRow[]);
  const [dragKey, setDragKey] = useState<string | null>(null);

  const activeInfo = useMemo(() => {
    if (globalSections.some((s) => s.sectionKey === activeSection)) return globalSections.find((s) => s.sectionKey === activeSection);
    return contentRows.find((s) => s.sectionKey === activeSection) ?? fallbackSections.find((s) => s.sectionKey === activeSection);
  }, [activeSection, contentRows]);

  const activeStyle = deviceStyle(effectiveStyles[activeSection] ?? (defaultSectionStyles as any)[activeSection] ?? {}, device);
  const activeRaw = sectionStyles[activeSection] ?? {};

  useEffect(() => { load(); }, []);

  async function load() {
    setLoading(true);
    try {
      const [settingsRes, rawRes, layoutRes, contentRes] = await Promise.all([
        fetch("/api/site-settings", { cache: "no-store" }),
        fetch("/api/site-settings?key=SECTION_STYLES&raw=true", { cache: "no-store" }),
        fetch("/api/site-settings?key=LAYOUT&raw=true", { cache: "no-store" }),
        fetch("/api/content", { cache: "no-store" }),
      ]);
      const data = settingsRes.ok ? await settingsRes.json() : {};
      const raw = rawRes.ok ? await rawRes.json() : { data: {} };
      const rawLayout = layoutRes.ok ? await layoutRes.json() : { data: {} };
      const rows = contentRes.ok ? await contentRes.json() : [];

      setEffectiveStyles(data.sectionStyles ?? {});
      setSectionStyles(raw.data ?? {});
      setLayout(data.layout ?? {});
      setLayoutOverrides(rawLayout.data ?? {});
      setTheme({ ...defaultTheme, ...(data.theme ?? {}) });
      if (Array.isArray(rows) && rows.length) setContentRows(rows);
      try { window.localStorage.setItem("cms-site-settings-cache-v3", JSON.stringify(data)); } catch {}
      setDirty(false);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Could not load layout settings.");
    } finally {
      setLoading(false);
    }
  }

  function setStyle(key: string, value: unknown) {
    setSectionStyles((current) => {
      const next = { ...(current[activeSection] ?? {}) };
      const updated = updateDeviceField(next, device, key, value);
      return { ...current, [activeSection]: updated };
    });
    setEffectiveStyles((current) => {
      const next = { ...(current[activeSection] ?? (defaultSectionStyles as any)[activeSection] ?? {}) };
      const updated = updateDeviceField(next, device, key, value);
      return { ...current, [activeSection]: updated };
    });
    setDirty(true);
    setMessage("Unsaved changes");
  }

  function setLayoutField(section: string, key: string, value: unknown) {
    setLayout((current) => ({ ...current, [section]: { ...(current[section] ?? {}), [key]: value } }));
    setLayoutOverrides((current) => ({ ...current, [section]: { ...(current[section] ?? {}), [key]: value } }));
    setDirty(true);
    setMessage("Unsaved changes");
  }

  async function save() {
    setSaving(true);
    setMessage("");
    try {
      const requests: Promise<Response>[] = [];
      if (Object.keys(sectionStyles).length) {
        const versionedStyles = Object.fromEntries(
          Object.entries(sectionStyles).map(([key, value]) => [
            key,
            { ...(value as Record<string, any>), _layoutManagerVersion: 3 },
          ]),
        );
        requests.push(fetch("/api/site-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "SECTION_STYLES", data: versionedStyles }) }));
      }
      if (Object.keys(layoutOverrides).length) {
        requests.push(fetch("/api/site-settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ key: "LAYOUT", data: layoutOverrides }) }));
      }
      const results = await Promise.all(requests);
      const failed = results.find((r) => !r.ok);
      if (failed) throw new Error((await failed.json().catch(() => ({})))?.error || "Could not save changes.");
      await load();
      setMessage("Changes saved successfully.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not save changes.");
    } finally { setSaving(false); }
  }

  async function reset() {
    const label = activeInfo?.label || activeSection;
    if (!window.confirm(`Reset ${label} to its original default settings? This will not change content, theme, or other sections.`)) return;
    try {
      const key = isHomepageSection(activeSection) ? "SECTION_STYLES" : "LAYOUT";
      const res = await fetch(`/api/site-settings?key=${key}&section=${encodeURIComponent(activeSection)}`, { method: "DELETE" });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Reset failed.");
      await load();
      setMessage(`${label} reset to the original default.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Reset failed."); }
  }

  async function reorder(from: number, to: number) {
    if (from === to || from < 0 || to < 0) return;
    const rows = contentRows.filter((row) => isHomepageSection(row.sectionKey)).sort((a, b) => number(a.sortOrder) - number(b.sortOrder));
    const moving = rows[from];
    if (!moving?.id) return;
    const next = [...rows];
    next.splice(from, 1); next.splice(to, 0, moving);
    try {
      await Promise.all(next.map((row, index) => row.id ? fetch("/api/content", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...row, sortOrder: index + 1 }) }) : Promise.resolve(new Response())));
      setContentRows((current) => current.map((row) => { const index = next.findIndex((x) => x.sectionKey === row.sectionKey); return index >= 0 ? { ...row, sortOrder: index + 1 } : row; }));
      setMessage("Section order saved.");
    } catch { setMessage("Could not save section order."); }
  }

  function onDrop(event: DragEvent<HTMLDivElement>, targetKey: string) {
    event.preventDefault();
    if (!dragKey || dragKey === targetKey) return;
    const rows = contentRows.filter((r) => isHomepageSection(r.sectionKey)).sort((a, b) => number(a.sortOrder) - number(b.sortOrder));
    const from = rows.findIndex((r) => r.sectionKey === dragKey);
    const to = rows.findIndex((r) => r.sectionKey === targetKey);
    setDragKey(null);
    void reorder(from, to);
  }

  if (loading) return <div className="min-h-screen bg-[#f8f7fc] p-8"><div className="rounded-2xl border border-[#e8e1f2] bg-white p-8 text-sm text-[#6d6480]">Loading Layout &amp; Section Manager…</div></div>;

  const homepageRows = contentRows.filter((row) => isHomepageSection(row.sectionKey)).sort((a, b) => number(a.sortOrder) - number(b.sortOrder));

  return (
    <div className="min-h-screen bg-[#f7f5fa] text-[#21164f]">
      <header className="sticky top-0 z-40 border-b border-[#e7e0ef] bg-white/95 backdrop-blur">
        <div className="flex flex-col gap-3 px-5 py-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff6800]">Website Layout</div>
            <h1 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">Layout &amp; Section Manager</h1>
            <p className="mt-1 text-[11px] text-[#7b7488]">Manage layout, spacing and position for each section of your website.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-[10px] font-semibold text-[#6d6480]">
              <span>Preview</span>
              <button type="button" onClick={() => setPreview((v) => !v)} className={`relative h-6 w-11 rounded-full transition ${preview ? "bg-[#5b2ab3]" : "bg-[#d7d1df]"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${preview ? "left-6" : "left-1"}`} /></button>
            </label>
            <div className="flex overflow-hidden rounded-lg border border-[#ddd4e9] bg-white">
              {(["desktop", "tablet", "mobile"] as Device[]).map((d) => (
                <button key={d} type="button" title={deviceLabels[d]} onClick={() => setDevice(d)} className={`flex h-9 w-9 items-center justify-center ${device === d ? "bg-[#f0e8ff] text-[#5424a6]" : "text-[#81788f] hover:bg-[#faf8fd]"}`}>
                  {d === "desktop" ? <Monitor size={15} /> : d === "tablet" ? <Tablet size={15} /> : <Smartphone size={15} />}
                </button>
              ))}
            </div>
            <a href="/" target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#cfc2e2] bg-white px-3 text-[10px] font-semibold text-[#5424a6] hover:bg-[#faf7ff]"><ExternalLink size={13} /> View Live Site</a>
            <button type="button" onClick={save} disabled={saving || !dirty} className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-[#5524ae] px-4 text-[10px] font-bold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-50"><Save size={13} /> {saving ? "Saving…" : "Save Changes"}</button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-92px)] flex-col">
        <aside className="border-b border-[#e6dfed] bg-white p-4">
          <div className="rounded-xl border border-[#e7dfef] bg-white shadow-[0_5px_20px_rgba(72,29,150,0.04)]">
            <div className="p-4">
              <label className="block text-[10px] font-bold text-[#51485f]">Select Section</label>
              <SectionDropdown
                value={activeSection}
                homepageRows={homepageRows}
                onChange={(key) => { setActiveSection(key); setTab("layout"); setMessage(""); }}
              />
            </div>

            <div className="grid grid-cols-4 border-y border-[#eee9f4]">
              {(["layout", "spacing", "visibility", "advanced"] as Tab[]).map((item) => (
                <button key={item} type="button" onClick={() => setTab(item)} className={`border-b-2 px-2 py-3 text-[9px] font-bold capitalize ${tab === item ? "border-[#642cb7] text-[#642cb7]" : "border-transparent text-[#81788f] hover:text-[#4e4560]"}`}>{item === "spacing" ? "Spacing & Position" : item}</button>
              ))}
            </div>

            <div className="p-4">
              {isHomepageSection(activeSection) ? (
                <>
                  {tab === "layout" && <LayoutTab style={activeStyle} setStyle={setStyle} section={activeSection} />}
                  {tab === "spacing" && <SpacingTab style={activeStyle} setStyle={setStyle} device={device} />}
                  {tab === "visibility" && <VisibilityTab style={activeStyle} setStyle={setStyle} />}
                  {tab === "advanced" && <AdvancedTab style={activeStyle} setStyle={setStyle} />}
                </>
              ) : (
                <GlobalTab section={activeSection} layout={layout} setLayoutField={setLayoutField} />
              )}
            </div>
          </div>

          {isHomepageSection(activeSection) && (
            <div className="mt-4 rounded-xl border border-[#e8e0f0] bg-[#fbf9fe] p-3">
              <div className="flex items-start gap-2 text-[10px] leading-4 text-[#746a83]"><Move size={14} className="mt-0.5 shrink-0 text-[#6a39b5]" /><span>These settings are responsive. Switch between devices to adjust values for each screen size.</span></div>
            </div>
          )}

          <div className="mt-4 flex items-center justify-between gap-2">
            <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded-lg border border-[#ddd3e7] bg-white px-3 py-2 text-[10px] font-semibold text-[#716879] hover:bg-[#faf8fc]"><RotateCcw size={13} /> Reset to Default</button>
            <span className={`text-[10px] font-semibold ${dirty ? "text-[#c15c00]" : "text-[#3c7a51]"}`}>{dirty ? "Unsaved changes" : "All changes saved"}</span>
          </div>
          {message && <div className={`mt-2 text-[10px] ${message.toLowerCase().includes("could") || message.toLowerCase().includes("failed") ? "text-red-600" : "text-[#3c7a51]"}`}>{message}</div>}

          <div className="mt-5 border-t border-[#eee8f3] pt-4">
            <div className="mb-2 flex items-center justify-between"><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#7b708c]">Section order</span><span className="text-[9px] text-[#9a91a5]">Drag or use arrows</span></div>
            <div className="space-y-1.5">
              {homepageRows.map((row, index) => (
                <div key={row.sectionKey} draggable onDragStart={() => setDragKey(row.sectionKey)} onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, row.sectionKey)} className={`flex items-center gap-2 rounded-lg border px-2 py-1.5 ${activeSection === row.sectionKey ? "border-[#d9c7ef] bg-[#f7f1ff]" : "border-[#eee9f3] bg-white"}`}>
                  <GripVertical size={13} className="cursor-grab text-[#a89bb7]" />
                  <button type="button" onClick={() => setActiveSection(row.sectionKey as AnySectionKey)} className="min-w-0 flex-1 truncate text-left text-[10px] font-semibold text-[#51485f]">{row.label || row.sectionKey}</button>
                  <button type="button" disabled={index === 0} onClick={() => void reorder(index, index - 1)} className="rounded p-1 text-[#81778d] disabled:opacity-30"><ArrowUp size={12} /></button>
                  <button type="button" disabled={index === homepageRows.length - 1} onClick={() => void reorder(index, index + 1)} className="rounded p-1 text-[#81778d] disabled:opacity-30"><ArrowDown size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <main className="min-w-0 border-t border-[#e6dfed] bg-[#f7f5fa] p-4 sm:p-5 lg:p-5 xl:p-6">
          <div className="mb-3 flex items-center justify-between">
            <div><div className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#ff6800]">Live Preview</div><h2 className="mt-1 text-lg font-bold">{activeInfo?.label || activeSection}</h2></div>
            <div className="flex items-center gap-2 text-[10px] text-[#80768b]"><span className="rounded-full bg-white px-2.5 py-1 font-semibold shadow-sm ring-1 ring-[#e7dfef]">{deviceLabels[device]} · {deviceWidths[device]}px</span>{preview ? <Eye size={14} /> : <EyeOff size={14} />}</div>
          </div>
          {preview && isHomepageSection(activeSection) ? (
            <PreviewFrame section={activeSection} style={activeStyle} rawStyle={activeRaw} content={contentRows.find((r) => r.sectionKey === activeSection) ?? (contentSectionDefaults as any)[activeSection] ?? {}} theme={theme} device={device} />
          ) : (
            <div className="flex min-h-[520px] items-center justify-center rounded-2xl border border-dashed border-[#d9d0e5] bg-white text-xs text-[#8b8197]">Preview is disabled for this panel.</div>
          )}
        </main>
      </div>
    </div>
  );
}

function LayoutTab({ style, setStyle, section }: { style: SectionStyle; setStyle: (key: string, value: unknown) => void; section?: string }) {
  const paired = ["HERO", "ABOUT", "PROCESS"].includes(section ?? "");
  return <div className="space-y-4">
    <SettingCard title="Container & Alignment">
      <div className="grid grid-cols-2 gap-3">
        <NumberField label="Container width" value={number(style.maxWidth, 1280)} onChange={(v) => setStyle("maxWidth", v)} suffix="px" />
        <SelectField label="Content alignment" value={String(style.contentAlign ?? "left")} options={["left", "center", "right"]} onChange={(v) => setStyle("contentAlign", v)} />
      </div>
    </SettingCard>
    <SettingCard title="Content Layout">
      <div className="grid grid-cols-1 gap-3">
        <SelectField label="Content direction" value={String(style.layoutDirection ?? "text-left")} options={layoutDirectionOptions.map((x) => x.value)} labels={Object.fromEntries(layoutDirectionOptions.map((x) => [x.value, x.label]))} onChange={(v) => setStyle("layoutDirection", v)} />
        <div className="grid grid-cols-2 gap-3"><SelectField label="Horizontal alignment" value={String(style.horizontalAlign ?? "left")} options={["left", "center", "right", "stretch"]} onChange={(v) => setStyle("horizontalAlign", v)} /><SelectField label="Vertical alignment" value={String(style.verticalAlign ?? "center")} options={["top", "center", "bottom", "stretch"]} onChange={(v) => setStyle("verticalAlign", v)} /></div>
      </div>
      {paired && <p className="mt-3 rounded-lg bg-[#faf7ff] p-2 text-[9px] leading-4 text-[#776b86]">This section contains paired content and image areas. The selected direction is applied to the real frontend section.</p>}
    </SettingCard>
  </div>;
}

function SpacingTab({ style, setStyle, device }: { style: SectionStyle; setStyle: (key: string, value: unknown) => void; device: Device }) {
  const spacingUnit = String(style.spacingUnit ?? "px");
  const positionUnit = String(style.positionUnit ?? "px");
  const unitOptions = ["px", "rem"];
  const positionUnits = ["px", "%", "rem"];
  return <div className="space-y-4">
    <SettingCard title="Spacing (Padding)" action={<SelectField label="" value={spacingUnit} options={unitOptions} onChange={(v) => setStyle("spacingUnit", v)} />}>
      <div className="grid grid-cols-2 gap-3"><NumberField label="Top" value={number(style.paddingTop, 0)} onChange={(v) => setStyle("paddingTop", v)} suffix={spacingUnit} /><NumberField label="Right" value={number(style.paddingRight, 0)} onChange={(v) => setStyle("paddingRight", v)} suffix={spacingUnit} /><NumberField label="Bottom" value={number(style.paddingBottom, 0)} onChange={(v) => setStyle("paddingBottom", v)} suffix={spacingUnit} /><NumberField label="Left" value={number(style.paddingLeft, 0)} onChange={(v) => setStyle("paddingLeft", v)} suffix={spacingUnit} /></div>
    </SettingCard>
    <SettingCard title="Spacing (Margin)" action={<SelectField label="" value={spacingUnit} options={unitOptions} onChange={(v) => setStyle("spacingUnit", v)} />}>
      <div className="grid grid-cols-2 gap-3"><NumberField label="Top" value={number(style.marginTop, 0)} onChange={(v) => setStyle("marginTop", v)} suffix={spacingUnit} /><NumberField label="Right" value={number(style.marginRight, 0)} onChange={(v) => setStyle("marginRight", v)} suffix={spacingUnit} /><NumberField label="Bottom" value={number(style.marginBottom, 0)} onChange={(v) => setStyle("marginBottom", v)} suffix={spacingUnit} /><NumberField label="Left" value={number(style.marginLeft, 0)} onChange={(v) => setStyle("marginLeft", v)} suffix={spacingUnit} /></div>
    </SettingCard>
    <SettingCard title="Position" action={<SelectField label="" value={positionUnit} options={positionUnits} onChange={(v) => setStyle("positionUnit", v)} />}>
      <div className="grid grid-cols-2 gap-3"><NumberField label="Content Position (X)" value={number(style.contentOffsetX, 0)} onChange={(v) => setStyle("contentOffsetX", v)} suffix={positionUnit} /><NumberField label="Content Position (Y)" value={number(style.contentOffsetY, 0)} onChange={(v) => setStyle("contentOffsetY", v)} suffix={positionUnit} /><NumberField label="Title Position (X)" value={number(style.titleOffsetX, 0)} onChange={(v) => setStyle("titleOffsetX", v)} suffix={positionUnit} /><NumberField label="Title Position (Y)" value={number(style.titleOffsetY, 0)} onChange={(v) => setStyle("titleOffsetY", v)} suffix={positionUnit} /><NumberField label="Image Position (X)" value={number(style.imageOffsetX, 0)} onChange={(v) => setStyle("imageOffsetX", v)} suffix={positionUnit} /><NumberField label="Image Position (Y)" value={number(style.imageOffsetY, 0)} onChange={(v) => setStyle("imageOffsetY", v)} suffix={positionUnit} /><NumberField label="Button Position (X)" value={number(style.buttonOffsetX, 0)} onChange={(v) => setStyle("buttonOffsetX", v)} suffix={positionUnit} /><NumberField label="Button Position (Y)" value={number(style.buttonOffsetY, 0)} onChange={(v) => setStyle("buttonOffsetY", v)} suffix={positionUnit} /></div><div className="mt-3"><SelectField label="Image / Object position" value={String(style.imageObjectPosition ?? "center")} options={["top", "center", "bottom", "left", "right"]} onChange={(v) => setStyle("imageObjectPosition", v)} /></div><div className="mt-3 rounded-lg border border-[#e8e0f0] bg-[#fbf9fe] p-2 text-[9px] text-[#7b7187]">Device: <strong className="text-[#5a2aab]">{deviceLabels[device]}</strong>. Values are stored independently for tablet and mobile.</div></SettingCard>
  </div>;
}

function VisibilityTab({ style, setStyle }: { style: SectionStyle; setStyle: (key: string, value: unknown) => void }) {
  return <SettingCard title="Visibility"><div className="space-y-3"><Toggle label="Show section" checked={style.enabled !== false} onChange={(v) => setStyle("enabled", v)} /><Toggle label="Desktop visibility" checked={style.visibility?.desktop !== false} onChange={(v) => setStyle("visibility", { ...(style.visibility ?? {}), desktop: v })} /><Toggle label="Tablet visibility" checked={style.visibility?.tablet !== false} onChange={(v) => setStyle("visibility", { ...(style.visibility ?? {}), tablet: v })} /><Toggle label="Mobile visibility" checked={style.visibility?.mobile !== false} onChange={(v) => setStyle("visibility", { ...(style.visibility ?? {}), mobile: v })} /><Toggle label="Published" checked={style.published !== false} onChange={(v) => setStyle("published", v)} /></div></SettingCard>;
}

function AdvancedTab({ style, setStyle }: { style: SectionStyle; setStyle: (key: string, value: unknown) => void }) {
  return <div className="space-y-4"><SettingCard title="Advanced"><div className="space-y-3"><TextField label="Custom CSS class" value={String(style.customClass ?? "")} onChange={(v) => setStyle("customClass", v)} /><TextField label="HTML ID" value={String(style.htmlId ?? "")} onChange={(v) => setStyle("htmlId", v)} /><div className="grid grid-cols-2 gap-3"><NumberField label="Z-index" value={number(style.zIndex, 0)} onChange={(v) => setStyle("zIndex", v)} /><SelectField label="Overflow" value={String(style.overflow ?? "visible")} options={["visible", "hidden", "clip", "auto"]} onChange={(v) => setStyle("overflow", v)} /></div><SelectField label="Position mode" value={String(style.positionMode ?? "static")} options={["static", "relative", "sticky"]} onChange={(v) => setStyle("positionMode", v)} /></div></SettingCard><SettingCard title="Animation"><Toggle label="Use existing section animation" checked={style.animationEnabled !== false} onChange={(v) => setStyle("animationEnabled", v)} /></SettingCard></div>;
}

function GlobalTab({ section, layout, setLayoutField }: { section: AnySectionKey; layout: Record<string, any>; setLayoutField: (section: string, key: string, value: unknown) => void }) {
  const data = layout[section] ?? (defaultLayout as any)[section] ?? {};
  return <div className="space-y-4"><SettingCard title="Layout & Presentation"><div className="grid grid-cols-2 gap-3">{section === "navbar" && <NumberField label="Logo width" value={number(data.logoWidth, 120)} onChange={(v) => setLayoutField(section, "logoWidth", v)} suffix="px" />}<TextField label="CTA label" value={String(data.ctaLabel ?? data.buttonLabel ?? "")} onChange={(v) => setLayoutField(section, section === "navbar" ? "ctaLabel" : "buttonLabel", v)} /><TextField label="CTA URL" value={String(data.ctaUrl ?? data.buttonUrl ?? "")} onChange={(v) => setLayoutField(section, section === "navbar" ? "ctaUrl" : "buttonUrl", v)} /></div></SettingCard>{(section === "navbar" || section === "footer") && <SettingCard title="Logo"><ImageUploadField label="Logo image" value={String(data.logo ?? "")} onChange={(v) => setLayoutField(section, "logo", v)} /></SettingCard>}<SettingCard title="Visibility"><Toggle label={`Show ${section}`} checked={data.enabled !== false} onChange={(v) => setLayoutField(section, "enabled", v)} /></SettingCard></div>;
}

function PreviewFrame({ section, style, rawStyle, content, theme, device }: { section: SectionKey; style: SectionStyle; rawStyle: SectionStyle; content: CmsRow; theme: Record<string, any>; device: Device }) {
  const css: CSSProperties = {
    ["--color-primary" as any]: theme.primaryColor ?? defaultTheme.primaryColor,
    ["--color-secondary" as any]: theme.secondaryColor ?? defaultTheme.secondaryColor,
    ["--color-accent" as any]: theme.accentColor ?? defaultTheme.accentColor,
    ["--color-accent-soft" as any]: theme.accentSoftColor ?? defaultTheme.accentSoftColor,
    ["--color-bg" as any]: theme.backgroundColor ?? defaultTheme.backgroundColor,
    ["--color-section" as any]: theme.sectionColor ?? defaultTheme.sectionColor,
    ["--color-heading" as any]: theme.headingColor ?? defaultTheme.headingColor,
    ["--color-body" as any]: theme.bodyColor ?? defaultTheme.bodyColor,
    ["--color-line" as any]: theme.lineColor ?? defaultTheme.lineColor,
    ["--color-navy" as any]: "#0f172a",
    ["--font-poppins" as any]: `"${theme.headingFont ?? defaultTheme.headingFont}", Poppins, Arial, sans-serif`,
    ["--font-inter" as any]: `"${theme.bodyFont ?? defaultTheme.bodyFont}", Inter, Arial, sans-serif`,
    ["--preview-pt" as any]: `${number(style.paddingTop, 0)}px`,
    ["--preview-pr" as any]: `${number(style.paddingRight, 0)}px`,
    ["--preview-pb" as any]: `${number(style.paddingBottom, 0)}px`,
    ["--preview-pl" as any]: `${number(style.paddingLeft, 0)}px`,
    ["--preview-mt" as any]: `${number(style.marginTop, 0)}px`,
    ["--preview-mr" as any]: `${number(style.marginRight, 0)}px`,
    ["--preview-mb" as any]: `${number(style.marginBottom, 0)}px`,
    ["--preview-ml" as any]: `${number(style.marginLeft, 0)}px`,
    ["--preview-title-x" as any]: `${number(style.titleOffsetX, 0)}px`,
    ["--preview-title-y" as any]: `${number(style.titleOffsetY, 0)}px`,
    ["--preview-content-x" as any]: `${number(style.contentOffsetX, 0)}px`,
    ["--preview-content-y" as any]: `${number(style.contentOffsetY, 0)}px`,
    ["--preview-image-x" as any]: `${number(style.imageOffsetX, 0)}px`,
    ["--preview-image-y" as any]: `${number(style.imageOffsetY, 0)}px`,
    ["--preview-button-x" as any]: `${number(style.buttonOffsetX, 0)}px`,
    ["--preview-button-y" as any]: `${number(style.buttonOffsetY, 0)}px`,
    ["--preview-image-position" as any]: String(style.imageObjectPosition ?? "center"),
  };
  const settings = content.settings ?? {};
  const items = Array.isArray(content.items) ? content.items : [];
  const inner = <>
    {section === "HERO" && <Hero eyebrow={content.eyebrow} title={content.title} description={content.description} image={content.image} primaryButtonLabel={content.primaryButtonLabel} primaryButtonUrl={content.primaryButtonUrl} items={items} settings={settings} />}
    {section === "ABOUT" && <AboutSection eyebrow={content.eyebrow} title={content.title} description={content.description} image={content.image} primaryButtonLabel={content.primaryButtonLabel} primaryButtonUrl={content.primaryButtonUrl} settings={settings} />}
    {section === "SERVICES" && <Services />}
    {section === "MARQUE" && <Marquee />}
    {section === "PROCESS" && <Process eyebrow={content.eyebrow} title={content.title} description={content.description} image={content.image} items={items} />}
    {section === "TEAM" && <Team eyebrow={content.eyebrow} title={content.title} description={content.description} primaryButtonLabel={content.primaryButtonLabel} primaryButtonUrl={content.primaryButtonUrl} items={items} settings={settings} />}
    {section === "CASE_STUDIES" && <CaseStudy eyebrow={content.eyebrow} title={content.title} description={content.description} items={items} />}
    {section === "PRICING" && <PricingHeader eyebrow={content.eyebrow} title={content.title} description={content.description} cmsSettings={settings as any} />}
    {section === "TESTIMONIALS" && <Testimonials eyebrow={content.eyebrow} title={content.title} cmsSettings={settings as any} />}
    {section === "CTA" && <CTA eyebrow={content.eyebrow} title={content.title} description={content.description} image={content.image} primaryButtonLabel={content.primaryButtonLabel} primaryButtonUrl={content.primaryButtonUrl} />}
    {!(["HERO", "ABOUT", "SERVICES", "MARQUE", "PROCESS", "TEAM", "CASE_STUDIES", "PRICING", "TESTIMONIALS", "CTA"] as string[]).includes(section) && <GenericCmsSection eyebrow={content.eyebrow} title={content.title || section} description={content.description} image={content.image} primaryButtonLabel={content.primaryButtonLabel} primaryButtonUrl={content.primaryButtonUrl} secondaryButtonLabel={content.secondaryButtonLabel} secondaryButtonUrl={content.secondaryButtonUrl} items={items} />}
  </>;
  return <div className="overflow-hidden rounded-2xl border border-[#e2dbea] bg-[#ece9ef] shadow-[0_10px_35px_rgba(33,22,79,0.08)]"><div className="flex items-center justify-between border-b border-[#e5deec] bg-white px-4 py-2.5"><div className="text-[10px] font-semibold text-[#6f6678]">Actual {section} component · unsaved preview</div><div className="flex items-center gap-1.5 text-[9px] text-[#948a9e]"><span className="h-1.5 w-1.5 rounded-full bg-[#6b32b7]" /> {deviceLabels[device]}</div></div><div className="flex min-h-0 justify-center overflow-auto bg-[#ece9ef] p-3 sm:p-4"><div className="w-full overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-black/[0.03]" style={{ width: "100%", maxWidth: device === "desktop" ? 980 : deviceWidths[device] }}><div className="cms-layout-preview" data-device={device} style={css}>{inner}</div></div></div><style jsx global>{`.cms-layout-preview > section{box-sizing:border-box;padding-top:var(--preview-pt);padding-right:var(--preview-pr);padding-bottom:var(--preview-pb);padding-left:var(--preview-pl);margin-top:var(--preview-mt);margin-right:var(--preview-mr);margin-bottom:var(--preview-mb);margin-left:var(--preview-ml)}.cms-layout-preview h1,.cms-layout-preview h2,.cms-layout-preview h3,.cms-layout-preview h4{transform:translate(var(--preview-title-x),var(--preview-title-y))}.cms-layout-preview .cms-layout-role-content{transform:translate(var(--preview-content-x),var(--preview-content-y))}.cms-layout-preview .cms-layout-role-image{transform:translate(var(--preview-image-x),var(--preview-image-y))}.cms-layout-preview img{object-position:var(--preview-image-position)!important;transform:translate(var(--preview-image-x),var(--preview-image-y))}.cms-layout-preview a.btn,.cms-layout-preview button.btn{transform:translate(var(--preview-button-x),var(--preview-button-y))}.cms-layout-preview[data-device="mobile"] .cms-layout-content-image{grid-template-columns:1fr!important}.cms-layout-preview[data-device="mobile"] .cms-layout-role-content{order:1!important}.cms-layout-preview[data-device="mobile"] .cms-layout-role-image{order:2!important}.cms-layout-preview[data-device="tablet"]{font-size:95%}`}</style></div>;
}

function SettingCard({ title, action, children }: { title: string; action?: ReactNode; children: ReactNode }) { return <div className="rounded-xl border border-[#e9e2f0] bg-white p-3.5"><div className="mb-3 flex items-center justify-between"><h3 className="text-[10px] font-bold text-[#51485f]">{title}</h3>{action}</div>{children}</div>; }
function NumberField({ label, value, onChange, suffix }: { label: string; value: number; onChange: (v: number) => void; suffix?: string }) { return <label className="block"><span className="mb-1 block text-[9px] font-semibold text-[#6b6274]">{label}</span><div className="flex h-9 overflow-hidden rounded-md border border-[#ddd4e7] bg-white focus-within:border-[#7040bd]"><input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="min-w-0 flex-1 bg-transparent px-2.5 text-[10px] outline-none" />{suffix && <span className="flex items-center px-2 text-[9px] text-[#94899f]">{suffix}</span>}</div></label>; }
function TextField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) { return <label className="block"><span className="mb-1 block text-[9px] font-semibold text-[#6b6274]">{label}</span><input value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full rounded-md border border-[#ddd4e7] px-2.5 text-[10px] outline-none focus:border-[#7040bd]" /></label>; }
function SelectField({ label, value, options, labels, onChange }: { label: string; value: string; options: string[]; labels?: Record<string, string>; onChange: (v: string) => void }) { return <label className="block"><span className="mb-1 block text-[9px] font-semibold text-[#6b6274]">{label}</span><select value={value} onChange={(e) => onChange(e.target.value)} className="h-9 w-full rounded-md border border-[#ddd4e7] bg-white px-2.5 text-[10px] outline-none focus:border-[#7040bd]">{options.map((o) => <option key={o} value={o}>{labels?.[o] ?? o}</option>)}</select></label>; }
function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) { return <label className="flex items-center justify-between rounded-lg border border-[#eee8f3] px-3 py-2"><span className="text-[10px] font-semibold text-[#5f5668]">{label}</span><button type="button" onClick={() => onChange(!checked)} className={`relative h-5 w-9 rounded-full ${checked ? "bg-[#5a28ae]" : "bg-[#cfc7d8]"}`}><span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${checked ? "left-[18px]" : "left-0.5"}`} /></button></label>; }
