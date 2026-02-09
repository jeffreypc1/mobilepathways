"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { getDayName } from "@/lib/utils";
import {
  addDays,
  format,
  startOfWeek,
  isSameDay,
} from "date-fns";

export default function SchedulingPage() {
  const { scheduling } = useDashboardStore();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlotId, setSelectedSlotId] = useState<string | null>(null);
  const [booked, setBooked] = useState(false);

  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const availableSlotsForDate = (date: Date) => {
    const dayOfWeek = date.getDay();
    return scheduling.slots.filter((s) => s.dayOfWeek === dayOfWeek && s.available);
  };

  const handleBook = () => {
    if (selectedSlotId) {
      setBooked(true);
    }
  };

  if (booked) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Scheduling</h1>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 max-w-lg text-center">
          <div className="text-4xl mb-4">&#10003;</div>
          <h2 className="text-xl font-semibold text-green-600 mb-2">Consultation Booked!</h2>
          <p className="text-slate-500 mb-4">
            Your {scheduling.consultationDurationMinutes}-minute consultation has been scheduled
            {selectedDate && ` for ${format(selectedDate, "EEEE, MMMM d")}`}.
          </p>
          <button
            onClick={() => {
              setBooked(false);
              setSelectedSlotId(null);
              setSelectedDate(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Book Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Schedule a Consultation</h1>
      <p className="text-slate-500 mb-6">
        Book a {scheduling.consultationDurationMinutes}-minute consultation session.
      </p>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="font-semibold text-slate-900 mb-4">Select a Day</h2>
        <div className="grid grid-cols-7 gap-2 mb-6">
          {weekDays.map((day) => {
            const slots = availableSlotsForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const hasSlots = slots.length > 0;

            return (
              <button
                key={day.toISOString()}
                onClick={() => {
                  if (hasSlots) {
                    setSelectedDate(day);
                    setSelectedSlotId(null);
                  }
                }}
                disabled={!hasSlots}
                className={`p-3 rounded-lg text-center transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white"
                    : hasSlots
                    ? "bg-slate-50 hover:bg-blue-50 text-slate-700"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                }`}
              >
                <div className="text-xs font-medium">{format(day, "EEE")}</div>
                <div className="text-lg font-semibold">{format(day, "d")}</div>
                {hasSlots && (
                  <div className="text-[10px] mt-1">{slots.length} slot{slots.length !== 1 ? "s" : ""}</div>
                )}
              </button>
            );
          })}
        </div>

        {selectedDate && (
          <>
            <h2 className="font-semibold text-slate-900 mb-4">
              Available Times for {format(selectedDate, "EEEE, MMMM d")}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              {availableSlotsForDate(selectedDate).map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedSlotId(slot.id)}
                  className={`p-3 rounded-lg text-sm font-medium transition-colors ${
                    selectedSlotId === slot.id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-50 hover:bg-blue-50 text-slate-700"
                  }`}
                >
                  {slot.startTime} - {slot.endTime}
                </button>
              ))}
            </div>
          </>
        )}

        {selectedSlotId && (
          <button
            onClick={handleBook}
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  );
}
