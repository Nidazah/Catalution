import { CheckCircle2 } from "../AdminIcons"

const primaryColors = [
  { hex: "#4B1D96", label: "Purple 900" },
  { hex: "#6D28D9", label: "Purple 700" },
  { hex: "#8B5CF6", label: "Purple 500" },
  { hex: "#A78BFA", label: "Purple 400" },
  { hex: "#DCCBFF", label: "Purple 200" },
]

const secondaryColors = [
  { hex: "#FF6800", label: "Orange 600" },
  { hex: "#FB923C", label: "Orange 500" },
  { hex: "#FFB164", label: "Orange 400" },
  { hex: "#FFD59E", label: "Orange 300" },
  { hex: "#FFEAD5", label: "Orange 100" },
]

const typeScale = [
  { name: "H1", spec: "Poppins Bold, 48px / 120%" },
  { name: "H2", spec: "Poppins SemiBold, 36px / 120%" },
  { name: "H3", spec: "Poppins SemiBold, 28px / 120%" },
  { name: "H4", spec: "Poppins Medium, 22px / 130%" },
  { name: "H5", spec: "Poppins Medium, 18px / 140%" },
  { name: "H6", spec: "Poppins Regular, 16px / 140%" },
  { name: "Body Regular", spec: "Inter Regular, 14px / 160%" },
  { name: "Caption", spec: "Inter Regular, 11px / 150%" },
]

export default function BrandSettingsPage() {
  return (
    <div className="space-y-5 text-[13px]">
      <div>
        <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">Design Tokens</p>
        <h1 className="mt-0.5 text-sm font-bold tracking-tight text-[#24133f]">Brand Settings</h1>
        <p className="mt-1.5 max-w-2xl text-[11.5px] leading-4 text-[#7b8190]">
          Reference for the Catalution visual system — colors, typography and button styles used across the admin panel and website.
        </p>
      </div>

      {/* Status banner */}
      <div className="flex items-center gap-2.5 rounded-xl border border-[#d7f0d2] bg-[#f0faef] px-4 py-3">
        <CheckCircle2 size={16} className="shrink-0 text-[#2f8f46]" />
        <p className="text-[12px] font-medium text-[#256b37]">Brand system applied consistently across the CMS.</p>
      </div>

      {/* Color palette */}
      <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
        <h2 className="text-[13px] font-bold text-[#24133f]">Color palette</h2>

        <div className="mt-3">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#481d96]">Primary — Purple</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {primaryColors.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-lg border border-[#ece6f7]">
                <div className="h-12" style={{ backgroundColor: c.hex }} />
                <div className="px-2 py-1.5">
                  <p className="text-[10.5px] font-semibold text-[#24133f]">{c.hex}</p>
                  <p className="text-[9.5px] text-[#7b8190]">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.14em] text-[#ff6800]">Secondary — Orange</p>
          <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-5">
            {secondaryColors.map((c) => (
              <div key={c.hex} className="overflow-hidden rounded-lg border border-[#ece6f7]">
                <div className="h-12" style={{ backgroundColor: c.hex }} />
                <div className="px-2 py-1.5">
                  <p className="text-[10.5px] font-semibold text-[#24133f]">{c.hex}</p>
                  <p className="text-[9.5px] text-[#7b8190]">{c.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Typography */}
      <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
        <h2 className="text-[13px] font-bold text-[#24133f]">Typography</h2>
        <p className="mt-0.5 text-[11.5px] text-[#7b8190]">Poppins for headings and UI, Inter for body text.</p>

        <div className="mt-3 divide-y divide-[#f0eefb]">
          {typeScale.map((t) => (
            <div key={t.name} className="flex items-center justify-between py-2">
              <span className="text-[12px] font-semibold text-[#24133f]">{t.name}</span>
              <span className="text-[11px] text-[#7b8190]">{t.spec}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
        <h2 className="text-[13px] font-bold text-[#24133f]">Button styles</h2>
        <p className="mt-0.5 text-[11.5px] text-[#7b8190]">12px border radius. Purple for primary actions, orange for secondary/highlighted actions.</p>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" className="rounded-xl bg-[#481d96] px-4 py-2 text-[12px] font-semibold text-white">
            Primary button
          </button>
          <button type="button" className="rounded-xl bg-[#ff6800] px-4 py-2 text-[12px] font-semibold text-white">
            Secondary button
          </button>
          <button type="button" className="rounded-xl border border-[#d8c9f4] px-4 py-2 text-[12px] font-semibold text-[#481d96]">
            Outline button
          </button>
        </div>
      </div>
    </div>
  )
}