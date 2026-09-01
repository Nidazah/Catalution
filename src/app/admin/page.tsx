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
    <div className="space-y-6">

      {/* Page heading */}
      <div className="flex items-start gap-3">
        <div>
          <p className="font-[var(--font-poppins)] font-[var(--font-poppins)] text-[9px] font-bold uppercase tracking-[0.18em] text-[#ff6800]">
            Catalution CMS
          </p>
          <h1 className="mt-1 font-[var(--font-poppins)] text-2xl font-bold tracking-tight text-[#151525] sm:text-[28px]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#7b8190]">
            A snapshot of your website content and publish status.
          </p>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4B1D96] via-[#4B1D96] to-[#151525] p-6 text-white shadow-lg sm:p-8">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl"
          aria-hidden="true"
        />
        <div className="relative max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#ffd59e]">
            Catalution CMS
          </p>
          <h2 className="mt-2 text-xl font-bold tracking-tight sm:text-2xl">
            Catalyzing your content.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80">
            Manage the website sections that power Catalution&apos;s ERP, POS
            and business transformation brand experience.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ff6800] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#fb923c]"
            >
              <Layers3 size={15} /> Manage Website Content
            </Link>
            <Link
              href="/admin/services"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              <BriefcaseBusiness size={15} /> Manage Services
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div>
        <div className="mb-3">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ff6800]">
            Overview
          </p>
          <h3 className="mt-0.5 text-base font-bold text-[#151525]">
            Content health
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            href="/admin/services"
            icon={<BriefcaseBusiness size={17} />}
            value={serviceCount}
            label="Services"
            detail={`${publishedServices} published`}
            iconClass="bg-[#f0eafa] text-[#4B1D96]"
          />
          <StatCard
            href="/admin/content"
            icon={<Layers3 size={17} />}
            value={contentCount}
            label="Website sections"
            detail={`${publishedContent} published`}
            iconClass="bg-[#fff1e8] text-[#ff6800]"
          />
          <StatCard
            href="/admin/portfolio"
            icon={<BriefcaseBusiness size={17} />}
            value={portfolioCount}
            label="Portfolio"
            detail={`${publishedPortfolios} published`}
            iconClass="bg-[#fff1e8] text-[#ff6800]"
          />
          <div className="rounded-xl border border-[#e7e9ef] bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#f0faef] text-[#2f8f46]">
              <CheckCircle2 size={17} />
            </div>
            <div className="text-lg font-bold text-[#151525]">
              Brand system
            </div>
            <p className="mt-1 text-xs leading-5 text-[#7b8190]">
              Purple-led UI with orange action highlights and 12px branded
              buttons.
            </p>
          </div>
        </div>
      </div>

      {/* Publish coverage visuals */}
      <div className="grid gap-4 lg:grid-cols-[240px_1fr]">
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-[#e7e9ef] bg-white p-5 shadow-sm">
          <PublishRing percent={overallPct} />
          <div className="text-center">
            <div className="text-lg font-bold text-[#151525]">
              {overallPct}% published
            </div>
            <p className="mt-0.5 text-xs text-[#7b8190]">
              {totalPublished} of {totalItems} items live
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#e7e9ef] bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-[#8a8399]">
            Publish coverage by type
          </p>
          <div className="space-y-4">
            <PublishBar label="Services" published={publishedServices} total={serviceCount} color="#4B1D96" />
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
      <div className="mb-1.5 flex items-center justify-between text-xs font-semibold text-[#151525]">
        <span>{label}</span>
        <span className="text-[#7b8190]">{published}/{total} &middot; {pct}%</span>
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
  const size = 104
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
    <Link
      href={href}
      className="rounded-xl border border-[#e7e9ef] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${iconClass}`}>
        {icon}
      </div>
      <div className="text-2xl font-bold leading-none text-[#151525]">
        {value}
      </div>
      <div className="mt-1.5 text-sm font-medium text-[#4b5563]">
        {label}
      </div>
      <div className="mt-2.5 flex items-center gap-1 text-xs font-semibold text-[#4B1D96]">
        {detail} <ArrowUpRight size={12} />
      </div>
    </Link>
  )
}
