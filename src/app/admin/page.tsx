"use client";

import Link from "next/link";
import { useDashboardStore } from "@/store/dashboard-store";

const adminSections = [
  {
    href: "/admin/links",
    title: "Manage Important Links",
    description: "Add, edit, or remove quick-access links shown on the User Dashboard.",
    icon: "🔗",
  },
  {
    href: "/admin/fundraising",
    title: "Fundraising Settings",
    description: "Update campaign name, goal amount, and current funds raised.",
    icon: "💰",
  },
  {
    href: "/admin/visibility",
    title: "Section Visibility",
    description: "Toggle which dashboard sections are visible to users.",
    icon: "👁️",
  },
  {
    href: "/admin/scheduling",
    title: "Scheduling Settings",
    description: "Configure consultation availability, duration, and booking limits.",
    icon: "🕐",
  },
];

export default function AdminHome() {
  const { links, fundraising, sectionVisibility } = useDashboardStore();
  const hiddenCount = Object.values(sectionVisibility).filter((v) => !v).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Panel</h1>
      <p className="text-slate-500 mb-6">Manage the User Dashboard content and settings.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Active Links</p>
          <p className="text-2xl font-bold text-slate-900">{links.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Hidden Sections</p>
          <p className="text-2xl font-bold text-slate-900">{hiddenCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminSections.map((section) => (
          <Link key={section.href} href={section.href} className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{section.icon}</span>
                <div>
                  <h2 className="font-semibold text-slate-900">{section.title}</h2>
                  <p className="text-sm text-slate-500 mt-1">{section.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
