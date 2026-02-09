"use client";

import { useDashboardStore } from "@/store/dashboard-store";
import { formatCurrency } from "@/lib/utils";

export default function FundraisingPage() {
  const { fundraising } = useDashboardStore();
  const progressPercent = Math.min(
    100,
    Math.round((fundraising.currentAmount / fundraising.goalAmount) * 100)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Fundraising Tracker</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-2xl">
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          {fundraising.campaignName}
        </h2>
        <p className="text-sm text-slate-500 mb-6">
          Campaign ends {new Date(fundraising.endDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </p>

        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-3xl font-bold text-green-600">
              {formatCurrency(fundraising.currentAmount)}
            </span>
            <span className="text-lg text-slate-500 self-end">
              of {formatCurrency(fundraising.goalAmount)}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-right text-sm text-slate-500 mt-1">{progressPercent}% funded</p>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(fundraising.goalAmount - fundraising.currentAmount)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Remaining</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">{progressPercent}%</p>
            <p className="text-xs text-slate-500 mt-1">Complete</p>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-lg">
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(fundraising.goalAmount)}
            </p>
            <p className="text-xs text-slate-500 mt-1">Goal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
