"use client"

import Link from "next/link"
import { ArrowRight, Boxes, CircleDot, Repeat2, Sparkles, Users, Waves } from "lucide-react"
import { useEffect, useState } from "react"
import { motion, type Variants } from "framer-motion"

type Service = { id: string; title: string; slug: string; shortDescription: string | null; description: string; icon: string; active: boolean; published: boolean }
const iconMap = { waves: Waves, boxes: Boxes, users: Users, sparkles: Sparkles, circledot: CircleDot, repeat: Repeat2 }
const easeOut = [0.22, 1, 0.36, 1] as const
const item: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } }

export default function ServicesSidebar({ activeId }: { activeId?: string }) {
  const [services, setServices] = useState<Service[]>([])
  useEffect(() => { fetch("/api/services", { cache: "no-store" }).then(r => r.ok ? r.json() : []).then(data => setServices(Array.isArray(data) ? data : [])).catch(() => setServices([])) }, [])

  return <div className="w-full overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
    <div className="border-b border-gray-100 bg-gradient-to-r from-section to-white p-3.5 sm:p-4"><h3 className="flex items-center gap-2 text-[15px] font-bold text-navy"><span className="h-2 w-2 animate-pulse-glow rounded-full bg-accent"/>Our Services</h3><p className="mt-0.5 text-sm text-gray-500">Explore our comprehensive consulting solutions</p></div>
    <div className="divide-y divide-gray-100">
      {services.map((service, index) => { const Icon = iconMap[service.icon as keyof typeof iconMap] ?? Waves; const isActive = service.id === activeId || service.slug === activeId; return <Link key={service.id} href={`/services/${service.slug}`} className={`group relative block cursor-pointer p-3.5 transition-all duration-300 hover:bg-section sm:p-4 sm:hover:pl-6 ${isActive ? "bg-section sm:pl-6" : ""}`}>
        <div className={`absolute bottom-0 left-0 top-0 w-1 rounded-l-full bg-accent transition-opacity ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
        <div className="relative z-10 flex items-start gap-4"><div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-all sm:h-12 sm:w-12 ${isActive ? "scale-105 bg-accent text-white shadow-lg shadow-accent/25" : "bg-orange-100 text-accent group-hover:scale-105 group-hover:bg-accent group-hover:text-white"}`}><Icon className="h-6 w-6"/></div><div className="flex-1"><h4 className={`text-[15px] font-bold leading-snug ${isActive ? "text-accent" : "text-navy group-hover:text-accent"}`}>{service.title}</h4><p className="mt-1 text-sm leading-snug text-gray-500">{service.shortDescription || service.description}</p></div></div>
        <div className={`mt-3 flex items-center gap-1 pl-14 text-sm font-medium text-accent sm:pl-16 sm:opacity-0 sm:translate-y-1 sm:transition-all sm:group-hover:translate-y-0 sm:group-hover:opacity-100 ${isActive ? "sm:translate-y-0 sm:opacity-100" : ""}`}><span>View Details</span><ArrowRight className="h-4 w-4"/></div>
        <div className={`absolute right-5 top-5 text-[10px] font-medium ${isActive ? "text-accent/60" : "text-gray-300"}`}>{String(index + 1).padStart(2, "0")}</div>
      </Link> })}
    </div>
    <motion.div variants={item} initial="hidden" animate="show" className="border-t border-gray-100 p-3.5 sm:p-4"><Link href="/services" className="btn btn-primary w-full justify-center">More services</Link></motion.div>
  </div>
}
