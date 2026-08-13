"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  UsersRound,
  FolderKanban,
  Newspaper,
  MessageSquareQuote,
  DollarSign,
  CircleHelp,
  GraduationCap,
  Mail,
  MailPlus,
} from "lucide-react";

const items = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Services", href: "/admin/services", icon: BriefcaseBusiness },
  { label: "Team", href: "/admin/team", icon: UsersRound },
  { label: "Portfolio", href: "/admin/portfolio", icon: FolderKanban },
  { label: "Blog", href: "/admin/blog", icon: Newspaper },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Pricing", href: "/admin/pricing", icon: DollarSign },
  { label: "FAQ", href: "/admin/faq", icon: CircleHelp },
  { label: "Careers", href: "/admin/careers", icon: GraduationCap },
  { label: "Contact Messages", href: "/admin/contact-messages", icon: Mail },
  { label: "Newsletter", href: "/admin/newsletter", icon: MailPlus },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">C<span>atalution</span></div>

      <nav className="admin-nav" aria-label="Admin navigation">
        {items.map(({ label, href, icon: Icon }) => {
          const active = href === "/admin" ? pathname === href : pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`admin-nav-item ${active ? "active" : ""}`}>
              <Icon size={22} strokeWidth={1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
