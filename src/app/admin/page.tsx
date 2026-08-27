import Link from "next/link"
import { prisma } from "@/lib/prisma"
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Layers3,
  CheckCircle2,
} from "./AdminIcons"

export default async function AdminDashboardPage() {
  const serviceCount = await prisma.service.count().catch(() => 0)
  const publishedServices = await prisma.service.count({ where: { published: true } }).catch(() => 0)
  const contentCount = await prisma.contentSection.count().catch(() => 0)
  const publishedContent = await prisma.contentSection.count({ where: { published: true } }).catch(() => 0)
  const portfolioCount = await prisma.portfolio.count().catch(() => 0)
  const publishedPortfolios = await prisma.portfolio.count({ where: { published: true } }).catch(() => 0)

  const totalItems = serviceCount + contentCount + portfolioCount
  const totalPublished = publishedServices + publishedContent + publishedPortfolios
  const overallPct = totalItems > 0 ? Math.round((totalPublished / totalItems) * 100) : 0

  return (
    <div className="space-y-5 text-[13px]">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#481d96] via-[#6d28d9] to-[#8b5cf6] p-5 text-white shadow-lg">
        <div className="relative max-w-3xl">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.2em] text-[#ffd59e]">Catalution CMS</p>
          <h1 className="mt-1.5 text-sm font-bold tracking-tight">Catalyzing your content.</h1>
          <p className="mt-1.5 max-w-2xl text-[11.5px] leading-4 text-white/80">
            Manage the website sections that power Catalution&apos;s ERP, POS and business transformation brand experience.
          </p>
          <div className="mt-4 flex flex-wrap gap-2.5">
            <Link href="/admin/content" className="inline-flex items-center gap-1.5 rounded-lg bg-[#ff6800] px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-[#fb923c]">
              <Layers3 size={13} /> Manage Website Content
            </Link>
            <Link href="/admin/services" className="inline-flex items-center gap-1.5 rounded-lg border border-white/30 px-3 py-1.5 text-[12px] font-semibold text-white transition hover:bg-white/10">
              <BriefcaseBusiness size={13} /> Manage Services
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <div className="mb-2.5">
          <p className="text-[9.5px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">Overview</p>
          <h2 className="mt-0.5 text-[13px] font-bold text-[#24133f]">Content health</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            href="/admin/services"
            icon={<BriefcaseBusiness size={15} />}
            value={serviceCount}
            label="Services"
            detail={`${publishedServices} published`}
            iconClass="bg-[#f0eafa] text-[#481d96]"
          />
          <StatCard
            href="/admin/content"
            icon={<Layers3 size={15} />}
            value={contentCount}
            label="Website sections"
            detail={`${publishedContent} published`}
            iconClass="bg-[#fff1e8] text-[#ff6800]"
          />
          <StatCard
            href="/admin/portfolio"
            icon={<BriefcaseBusiness size={15} />}
            value={portfolioCount}
            label="Portfolio"
            detail={`${publishedPortfolios} published`}
            iconClass="bg-[#fff1e8] text-[#ff6800]"
          />
          <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0faef] text-[#2f8f46]">
              <CheckCircle2 size={15} />
            </div>
            <div className="text-[13px] font-bold text-[#24133f]">Brand system</div>
            <p className="mt-0.5 text-[11.5px] leading-4 text-[#7b8190]">Purple-led UI with orange action highlights and 12px branded buttons.</p>
          </div>
        </div>
      </div>

      {/* Publish coverage visuals */}
      <div className="grid gap-3 lg:grid-cols-[220px_1fr]">
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-[#ece6f7] bg-white p-4">
          <PublishRing percent={overallPct} />
          <div className="text-center">
            <div className="text-[13px] font-bold text-[#24133f]">{overallPct}% published</div>
            <p className="mt-0.5 text-[10.5px] text-[#7b8190]">{totalPublished} of {totalItems} items live</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
          <p className="mb-3 text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#8a8399]">Publish coverage by type</p>
          <div className="space-y-3.5">
            <PublishBar label="Services" published={publishedServices} total={serviceCount} color="#481d96" />
            <PublishBar label="Website sections" published={publishedContent} total={contentCount} color="#ff6800" />
            <PublishBar label="Portfolio" published={publishedPortfolios} total={portfolioCount} color="#2f8f46" />
          </div>
        </div>
      </div>
    </div>
  )
}

function PublishBar({
  label,
  published,
  total,
  color,
}: {
  label: string
  published: number
  total: number
  color: string
}) {
  const pct = total > 0 ? Math.round((published / total) * 100) : 0
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] font-semibold text-[#24133f]">
        <span>{label}</span>
        <span className="text-[#7b8190]">{published}/{total} · {pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#f1eefa]">
        <div
          className="h-full rounded-full transition-[width]"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  )
}

function PublishRing({ percent }: { percent: number }) {
  const size = 96
  const stroke = 10
  const radius = (size - stroke) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#f1eefa"
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#ff6800"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  )
}

function StatCard({
  href,
  icon,
  value,
  label,
  detail,
  iconClass,
}: {
  href: string
  icon: React.ReactNode
  value: number
  label: string
  detail: string
  iconClass: string
}) {
  return (
    <Link href={href} className="rounded-xl border border-[#ece6f7] bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-md">
      <div className={`mb-3 flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}>{icon}</div>
      <div className="text-[13px] font-bold text-[#24133f]">{value}</div>
      <div className="mt-0.5 text-[11.5px] font-medium text-[#4b5563]">{label}</div>
      <div className="mt-2 flex items-center gap-1 text-[10.5px] font-semibold text-[#481d96]">{detail} <ArrowUpRight size={11} /></div>
    </Link>
  )
}