"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const userLinks = [
  { href: "/dashboard", label: "Overview", icon: "🏠" },
  { href: "/dashboard/calendar", label: "Event Calendar", icon: "📅" },
  { href: "/dashboard/links", label: "Important Links", icon: "🔗" },
  { href: "/dashboard/fundraising", label: "Fundraising", icon: "💰" },
  { href: "/dashboard/scheduling", label: "Scheduling", icon: "🕐" },
  { href: "/dashboard/kanban", label: "Staff Board", icon: "📋" },
];

const adminLinks = [
  { href: "/admin", label: "Admin Home", icon: "⚙️" },
  { href: "/admin/links", label: "Manage Links", icon: "🔗" },
  { href: "/admin/fundraising", label: "Fundraising Settings", icon: "💰" },
  { href: "/admin/visibility", label: "Section Visibility", icon: "👁️" },
  { href: "/admin/scheduling", label: "Scheduling Settings", icon: "🕐" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  const links = isAdmin ? adminLinks : userLinks;
  const portalLabel = isAdmin ? "Admin Panel" : "User Dashboard";
  const switchHref = isAdmin ? "/dashboard" : "/admin";
  const switchLabel = isAdmin ? "Switch to Dashboard" : "Switch to Admin";

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-lg font-bold">Mobile Pathways</h1>
        <p className="text-sm text-slate-400 mt-1">{portalLabel}</p>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {links.map((link) => {
            const isActive =
              link.href === pathname ||
              (link.href !== "/dashboard" &&
                link.href !== "/admin" &&
                pathname.startsWith(link.href));
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-slate-700">
        <Link
          href={switchHref}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-slate-300 transition-colors"
        >
          <span>{isAdmin ? "←" : "⚙️"}</span>
          <span>{switchLabel}</span>
        </Link>
      </div>
    </aside>
  );
}
