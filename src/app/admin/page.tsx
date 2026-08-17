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

  return (
    <div className="space-y-5 text-[13px]">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#481d96] via-[#6d28d9] to-[#8b5cf6] p-5 text-white shadow-lg">
        <div className="pointer-events-none absolute -right-16 -top-24 h-64 w-64 rounded-full border border-white/20" />
        <div className="pointer-events-none absolute -right-4 -bottom-32 h-72 w-72 rounded-full border border-[#ff6800]/50" />
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

      {/* Next Steps Section */}
      <div className="rounded-xl border border-[#ece6f7] bg-white p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-[9.5px] font-bold uppercase tracking-[0.16em] text-[#ff6800]">Next</p>
            <h2 className="mt-0.5 text-[9px] font-bold text-[#24133f]">Continue building the CMS one section at a time</h2>
            <p className="mt-0.5 text-[11.5px] leading-4 text-[#7b8190]">Hero, About, Process, Work, Team, Case Studies, Pricing, Testimonials and CTA are now available as managed content sections.</p>
          </div>
          <Link href="/admin/content" className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#481d96] px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-[#6d28d9]">
            Open Content <ArrowUpRight size={12} />
          </Link>
        </div>
      </div>
    </div>
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