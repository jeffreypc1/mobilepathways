"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { generateId } from "@/lib/utils";

export default function AdminLinksPage() {
  const { links, addLink, removeLink } = useDashboardStore();
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!title.trim() || !url.trim()) return;
    addLink({
      id: generateId(),
      title: title.trim(),
      url: url.trim(),
      description: description.trim(),
    });
    setTitle("");
    setUrl("");
    setDescription("");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Manage Important Links</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
        <h2 className="font-semibold text-slate-900 mb-4">Add New Link</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
          />
          <input
            type="url"
            placeholder="URL (https://...)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
          />
        </div>
        <button
          onClick={handleAdd}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Add Link
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-semibold text-slate-900">Current Links ({links.length})</h2>
        </div>
        {links.length === 0 ? (
          <div className="p-8 text-center text-slate-400">No links added yet.</div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {links.map((link) => (
              <li key={link.id} className="flex items-center justify-between p-4 hover:bg-slate-50">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{link.title}</p>
                  <p className="text-sm text-slate-500 truncate">{link.url}</p>
                  {link.description && (
                    <p className="text-xs text-slate-400 mt-0.5">{link.description}</p>
                  )}
                </div>
                <button
                  onClick={() => removeLink(link.id)}
                  className="ml-4 px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
