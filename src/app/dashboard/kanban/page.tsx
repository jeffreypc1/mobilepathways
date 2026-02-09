"use client";

import { useState } from "react";
import { useDashboardStore } from "@/store/dashboard-store";
import { generateId } from "@/lib/utils";
import type { KanbanTask } from "@/types";

const columns: { id: KanbanTask["column"]; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "border-slate-300" },
  { id: "in-progress", label: "In Progress", color: "border-amber-400" },
  { id: "done", label: "Done", color: "border-green-400" },
];

const priorityColors: Record<string, string> = {
  low: "bg-slate-100 text-slate-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export default function KanbanPage() {
  const { kanbanTasks, addTask, removeTask, moveTask } = useDashboardStore();
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAssignee, setNewAssignee] = useState("");
  const [newPriority, setNewPriority] = useState<KanbanTask["priority"]>("medium");
  const [draggedId, setDraggedId] = useState<string | null>(null);

  const handleAddTask = () => {
    if (!newTitle.trim()) return;
    addTask({
      id: generateId(),
      title: newTitle,
      description: newDesc,
      assignee: newAssignee || "Unassigned",
      column: "todo",
      priority: newPriority,
      createdAt: new Date().toISOString().split("T")[0],
    });
    setNewTitle("");
    setNewDesc("");
    setNewAssignee("");
    setNewPriority("medium");
    setShowForm(false);
  };

  const handleDragStart = (id: string) => setDraggedId(id);
  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (column: KanbanTask["column"]) => {
    if (draggedId) {
      moveTask(draggedId, column);
      setDraggedId(null);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Staff Kanban Board</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          {showForm ? "Cancel" : "+ Add Task"}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Task title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
            <input
              type="text"
              placeholder="Assignee"
              value={newAssignee}
              onChange={(e) => setNewAssignee(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
            />
            <input
              type="text"
              placeholder="Description"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 md:col-span-1"
            />
            <select
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as KanbanTask["priority"])}
              className="px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
          <button
            onClick={handleAddTask}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
          >
            Add Task
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col) => {
          const tasks = kanbanTasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(col.id)}
              className={`bg-slate-100 rounded-xl p-4 border-t-4 ${col.color} min-h-[300px]`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-slate-700">{col.label}</h2>
                <span className="text-xs bg-white text-slate-500 px-2 py-1 rounded-full">
                  {tasks.length}
                </span>
              </div>
              <div className="space-y-3">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task.id)}
                    className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-medium text-slate-900">{task.title}</h3>
                      <button
                        onClick={() => removeTask(task.id)}
                        className="text-slate-300 hover:text-red-500 text-xs"
                      >
                        &times;
                      </button>
                    </div>
                    {task.description && (
                      <p className="text-xs text-slate-500 mt-1">{task.description}</p>
                    )}
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className="text-[10px] text-slate-400">{task.assignee}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
