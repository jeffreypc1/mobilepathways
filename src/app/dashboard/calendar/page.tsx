"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";

const eventTypeColors: Record<string, string> = {
  legal: "bg-red-100 text-red-700 border-red-200",
  community: "bg-blue-100 text-blue-700 border-blue-200",
  deadline: "bg-amber-100 text-amber-700 border-amber-200",
  meeting: "bg-green-100 text-green-700 border-green-200",
};

export default function CalendarPage() {
  const { events } = useDashboardStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEventsForDate = (date: Date) =>
    events.filter((e) => isSameDay(new Date(e.date), date));

  const selectedEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Event Calendar</h1>

      <div className="flex gap-4 mb-4 text-sm">
        {Object.entries(eventTypeColors).map(([type, cls]) => (
          <span key={type} className={`px-2 py-1 rounded border ${cls} capitalize`}>
            {type}
          </span>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            &larr; Prev
          </button>
          <h2 className="text-lg font-semibold text-slate-900">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
          >
            Next &rarr;
          </button>
        </div>

        <div className="grid grid-cols-7 border-b border-slate-200">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-center text-xs font-semibold text-slate-500">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {calendarDays.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());
            const isSelected = selectedDate && isSameDay(day, selectedDate);

            return (
              <button
                key={day.toISOString()}
                onClick={() => setSelectedDate(day)}
                className={`p-2 min-h-[80px] border-b border-r border-slate-100 text-left transition-colors ${
                  !isCurrentMonth ? "bg-slate-50 text-slate-300" : "hover:bg-blue-50"
                } ${isSelected ? "bg-blue-50 ring-2 ring-blue-300 ring-inset" : ""}`}
              >
                <span
                  className={`text-xs font-medium ${
                    isToday
                      ? "bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
                <div className="mt-1 space-y-0.5">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`text-[10px] px-1 py-0.5 rounded truncate border ${eventTypeColors[event.type]}`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 2 && (
                    <div className="text-[10px] text-slate-400">+{dayEvents.length - 2} more</div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-3">
            Events for {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          {selectedEvents.length === 0 ? (
            <p className="text-sm text-slate-400">No events on this date.</p>
          ) : (
            <ul className="space-y-3">
              {selectedEvents.map((event) => (
                <li key={event.id} className="flex items-start gap-3">
                  <span className={`text-xs px-2 py-1 rounded border ${eventTypeColors[event.type]} capitalize`}>
                    {event.type}
                  </span>
                  <div>
                    <p className="font-medium text-slate-900">{event.title}</p>
                    <p className="text-sm text-slate-500">{event.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
