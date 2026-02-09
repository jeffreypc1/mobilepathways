"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import type { SectionVisibility } from "@/types";

const sectionLabels: Record<keyof SectionVisibility, { label: string; description: string }> = {
  calendar: {
    label: "Event Calendar",
    description: "Interactive calendar with legal dates and community events",
  },
  links: {
    label: "Important Links",
    description: "Quick-access links to tools like Pathfinder and EOIR",
  },
  fundraising: {
    label: "Fundraising Tracker",
    description: "Visual progress bar showing goal vs. current funds",
  },
  kanban: {
    label: "Staff Kanban Board",
    description: "Drag-and-drop task board for staff management",
  },
};

export default function AdminVisibilityPage() {
  const { sectionVisibility, toggleSection } = useDashboardStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Section Visibility</h1>
      <p className="text-slate-500 mb-6">
        Control which sections are visible on the User Dashboard.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 divide-y divide-slate-100">
        {(Object.keys(sectionLabels) as (keyof SectionVisibility)[]).map((key) => {
          const { label, description } = sectionLabels[key];
          const isVisible = sectionVisibility[key];

          return (
            <div key={key} className="flex items-center justify-between p-5">
              <div>
                <h3 className="font-medium text-slate-900">{label}</h3>
                <p className="text-sm text-slate-500">{description}</p>
              </div>
              <button
                onClick={() => toggleSection(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  isVisible ? "bg-blue-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    isVisible ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
