"use client";

import { useDashboardStore } from "@/store/dashboard-store";

export default function LinksPage() {
  const { links } = useDashboardStore();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Important Links</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md hover:border-blue-300 transition-all group"
          >
            <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
              {link.title}
            </h2>
            <p className="text-sm text-slate-500 mt-1">{link.description}</p>
            <p className="text-xs text-blue-500 mt-3 truncate">{link.url}</p>
          </a>
        ))}
      </div>

      {links.length === 0 && (
        <div className="text-center py-12 text-slate-400">
          <p>No links have been added yet.</p>
          <p className="text-sm mt-1">An admin can add links from the Admin Panel.</p>
        </div>
      )}
    </div>
  );
}
