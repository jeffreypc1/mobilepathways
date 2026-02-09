"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { getDayName } from "@/lib/utils";

export default function AdminSchedulingPage() {
  const { scheduling, updateScheduling } = useDashboardStore();
  const [duration, setDuration] = useState(scheduling.consultationDurationMinutes.toString());
  const [buffer, setBuffer] = useState(scheduling.bufferMinutes.toString());
  const [maxBookings, setMaxBookings] = useState(scheduling.maxBookingsPerDay.toString());
  const [saved, setSaved] = useState(false);

  const handleSaveGeneral = () => {
    updateScheduling({
      consultationDurationMinutes: parseInt(duration) || 30,
      bufferMinutes: parseInt(buffer) || 15,
      maxBookingsPerDay: parseInt(maxBookings) || 8,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleSlot = (slotId: string) => {
    const updatedSlots = scheduling.slots.map((s) =>
      s.id === slotId ? { ...s, available: !s.available } : s
    );
    updateScheduling({ slots: updatedSlots });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Scheduling Settings</h1>

      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">General Settings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Buffer Between (min)
              </label>
              <input
                type="number"
                value={buffer}
                onChange={(e) => setBuffer(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Max Bookings/Day
              </label>
              <input
                type="number"
                value={maxBookings}
                onChange={(e) => setMaxBookings(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handleSaveGeneral}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Save Settings
            </button>
            {saved && (
              <span className="text-sm text-green-600 font-medium">Saved!</span>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h2 className="font-semibold text-slate-900 mb-4">Availability Slots</h2>
          <p className="text-sm text-slate-500 mb-4">
            Toggle time slots on or off to control when consultations can be booked.
          </p>
          <div className="space-y-2">
            {scheduling.slots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700 w-24">
                    {getDayName(slot.dayOfWeek)}
                  </span>
                  <span className="text-sm text-slate-500">
                    {slot.startTime} - {slot.endTime}
                  </span>
                </div>
                <button
                  onClick={() => toggleSlot(slot.id)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    slot.available ? "bg-green-500" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      slot.available ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
