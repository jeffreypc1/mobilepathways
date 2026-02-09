"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { formatCurrency } from "@/lib/utils";

export default function AdminFundraisingPage() {
  const { fundraising, updateFundraising } = useDashboardStore();
  const [campaignName, setCampaignName] = useState(fundraising.campaignName);
  const [goalAmount, setGoalAmount] = useState(fundraising.goalAmount.toString());
  const [currentAmount, setCurrentAmount] = useState(fundraising.currentAmount.toString());
  const [endDate, setEndDate] = useState(fundraising.endDate);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateFundraising({
      campaignName,
      goalAmount: parseFloat(goalAmount) || 0,
      currentAmount: parseFloat(currentAmount) || 0,
      endDate,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Fundraising Settings</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 max-w-xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Campaign Name
            </label>
            <input
              type="text"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Goal Amount ($)
              </label>
              <input
                type="number"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Current Amount ($)
              </label>
              <input
                type="number"
                value={currentAmount}
                onChange={(e) => setCurrentAmount(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Campaign End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
          </div>

          <div className="pt-4 flex items-center gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium">Saved!</span>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <h3 className="text-sm font-medium text-slate-500 mb-2">Preview</h3>
          <div className="flex justify-between text-sm mb-1">
            <span>{formatCurrency(parseFloat(currentAmount) || 0)} raised</span>
            <span>Goal: {formatCurrency(parseFloat(goalAmount) || 0)}</span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-3">
            <div
              className="bg-green-500 h-3 rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.round(((parseFloat(currentAmount) || 0) / (parseFloat(goalAmount) || 1)) * 100))}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
