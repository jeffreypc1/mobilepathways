"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

export default function DashboardHome() {
  const { sectionVisibility, fundraising, events, links, kanbanTasks } =
    useDashboardStore();

  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const progressPercent = Math.min(
    100,
    Math.round((fundraising.currentAmount / fundraising.goalAmount) * 100)
  );

  const todoCount = kanbanTasks.filter((t) => t.column === "todo").length;
  const inProgressCount = kanbanTasks.filter((t) => t.column === "in-progress").length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sectionVisibility.calendar && (
          <Link href="/dashboard/calendar" className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Upcoming Events
              </h2>
              {upcomingEvents.length > 0 ? (
                <ul className="space-y-2">
                  {upcomingEvents.map((event) => (
                    <li key={event.id} className="flex items-start gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded mt-0.5">
                        {new Date(event.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </span>
                      <span className="text-sm text-slate-700">{event.title}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-slate-400">No upcoming events</p>
              )}
            </div>
          </Link>
        )}

        {sectionVisibility.fundraising && (
          <Link href="/dashboard/fundraising" className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Fundraising
              </h2>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(fundraising.currentAmount)}
              </p>
              <p className="text-sm text-slate-500 mb-3">
                of {formatCurrency(fundraising.goalAmount)} goal
              </p>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </Link>
        )}

        {sectionVisibility.links && (
          <Link href="/dashboard/links" className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Important Links
              </h2>
              <p className="text-2xl font-bold text-slate-900">{links.length}</p>
              <p className="text-sm text-slate-500">Quick access resources</p>
            </div>
          </Link>
        )}

        {sectionVisibility.kanban && (
          <Link href="/dashboard/kanban" className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Staff Board
              </h2>
              <div className="flex gap-4">
                <div>
                  <p className="text-2xl font-bold text-slate-900">{todoCount}</p>
                  <p className="text-xs text-slate-500">To Do</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{inProgressCount}</p>
                  <p className="text-xs text-slate-500">In Progress</p>
                </div>
              </div>
            </div>
          </Link>
        )}

        {sectionVisibility.scheduling && (
          <Link href="/dashboard/scheduling" className="block">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
                Scheduling
              </h2>
              <p className="text-sm text-slate-700">Book a consultation</p>
              <p className="text-xs text-slate-500 mt-1">
                {fundraising.campaignName ? "Slots available" : "Check availability"}
              </p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
