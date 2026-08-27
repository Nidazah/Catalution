"use client"

import Link from "next/link"
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Layers3,
  Users,
  Images,
  MessageSquareQuote,
  DollarSign,
  CircleHelp,
} from "lucide-react"

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: BriefcaseBusiness,
  },
  {
    label: "Website Content",
    href: "/admin/content",
    icon: Layers3,
  },
  {
    label: "Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    label: "Portfolio",
    href: "/admin/portfolio",
    icon: Images,
  },
  {
    label: "Case Studies",
    href: "/admin/portfolio",
    icon: Images,
  },
  {
    label: "Testimonials",
    href: "/admin/testimonials",
    icon: MessageSquareQuote,
  },
  {
    label: "Pricing",
    href: "/admin/pricing",
    icon: DollarSign,
  },
  {
    label: "FAQ",
    href: "/admin/faq",
    icon: CircleHelp,
  },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: Layers3,
  },
]

export default function AdminNav() {
  return (
    <nav className="flex-1 px-3 py-2 overflow-y-auto">
      <div
        className="px-4 pb-3 text-[10px] font-semibold uppercase tracking-[0.18em]"
        style={{ color: "#cbb9e8" }}
      >
        Menu
      </div>

      <div className="space-y-1">
        {navItems.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="group flex items-center gap-4 rounded-xl px-4 py-3 text-[14px] transition-all duration-200 hover:bg-white/10 hover:text-white"
            style={{ color: "#e3d9f2" }}
          >
            <Icon
              size={21}
              strokeWidth={1.8}
              className="shrink-0 transition-colors group-hover:text-[#ff6800]"
            />

            <span className="truncate group-hover:text-white">
              {label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}