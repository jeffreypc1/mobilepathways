"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  DashboardConfig,
  ImportantLink,
  FundraisingConfig,
  CalendarEvent,
  KanbanTask,
  SectionVisibility,
} from "@/types";

interface DashboardStore extends DashboardConfig {
  // Link actions
  addLink: (link: ImportantLink) => void;
  removeLink: (id: string) => void;
  updateLink: (id: string, link: Partial<ImportantLink>) => void;

  // Fundraising actions
  updateFundraising: (config: Partial<FundraisingConfig>) => void;

  // Event actions
  addEvent: (event: CalendarEvent) => void;
  removeEvent: (id: string) => void;

  // Kanban actions
  addTask: (task: KanbanTask) => void;
  removeTask: (id: string) => void;
  updateTask: (id: string, updates: Partial<KanbanTask>) => void;
  moveTask: (id: string, column: KanbanTask["column"]) => void;

  // Visibility actions
  toggleSection: (section: keyof SectionVisibility) => void;
  setSectionVisibility: (visibility: Partial<SectionVisibility>) => void;
}

const defaultState: DashboardConfig = {
  links: [
    {
      id: "1",
      title: "EOIR Portal",
      url: "https://portal.eoir.justice.gov",
      description: "Executive Office for Immigration Review case portal",
    },
    {
      id: "2",
      title: "Pathfinder",
      url: "https://www.pathfinder.org",
      description: "Immigration legal pathway assessment tool",
    },
    {
      id: "3",
      title: "USCIS Case Status",
      url: "https://egov.uscis.gov/casestatus",
      description: "Check your USCIS case status online",
    },
  ],
  fundraising: {
    goalAmount: 50000,
    currentAmount: 18750,
    campaignName: "2026 Community Legal Aid Fund",
    endDate: "2026-12-31",
  },
  events: [
    {
      id: "1",
      title: "Immigration Court Hearing Prep",
      date: "2026-02-15",
      type: "legal",
      description: "Group preparation session for upcoming hearings",
    },
    {
      id: "2",
      title: "Community Know Your Rights Workshop",
      date: "2026-02-20",
      type: "community",
      description: "Free workshop on immigration rights",
    },
    {
      id: "3",
      title: "TPS Re-registration Deadline",
      date: "2026-03-01",
      type: "deadline",
      description: "Deadline for TPS re-registration",
    },
    {
      id: "4",
      title: "Staff Weekly Standup",
      date: "2026-02-10",
      type: "meeting",
      description: "Weekly team sync meeting",
    },
  ],
  kanbanTasks: [
    {
      id: "1",
      title: "Review Q1 grant applications",
      description: "Review and prioritize incoming grant applications",
      assignee: "Executive Director",
      column: "todo",
      priority: "high",
      createdAt: "2026-02-01",
    },
    {
      id: "2",
      title: "Update volunteer training materials",
      description: "Refresh training docs for new volunteers",
      assignee: "Staff",
      column: "in-progress",
      priority: "medium",
      createdAt: "2026-02-05",
    },
    {
      id: "3",
      title: "Send February newsletter",
      description: "Draft and send monthly community newsletter",
      assignee: "Staff",
      column: "todo",
      priority: "medium",
      createdAt: "2026-02-07",
    },
  ],
  sectionVisibility: {
    calendar: true,
    links: true,
    fundraising: true,
    kanban: true,
  },
};

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      ...defaultState,

      addLink: (link) => set((s) => ({ links: [...s.links, link] })),
      removeLink: (id) => set((s) => ({ links: s.links.filter((l) => l.id !== id) })),
      updateLink: (id, updates) =>
        set((s) => ({
          links: s.links.map((l) => (l.id === id ? { ...l, ...updates } : l)),
        })),

      updateFundraising: (config) =>
        set((s) => ({ fundraising: { ...s.fundraising, ...config } })),

      addEvent: (event) => set((s) => ({ events: [...s.events, event] })),
      removeEvent: (id) => set((s) => ({ events: s.events.filter((e) => e.id !== id) })),

      addTask: (task) => set((s) => ({ kanbanTasks: [...s.kanbanTasks, task] })),
      removeTask: (id) =>
        set((s) => ({ kanbanTasks: s.kanbanTasks.filter((t) => t.id !== id) })),
      updateTask: (id, updates) =>
        set((s) => ({
          kanbanTasks: s.kanbanTasks.map((t) => (t.id === id ? { ...t, ...updates } : t)),
        })),
      moveTask: (id, column) =>
        set((s) => ({
          kanbanTasks: s.kanbanTasks.map((t) => (t.id === id ? { ...t, column } : t)),
        })),

      toggleSection: (section) =>
        set((s) => ({
          sectionVisibility: {
            ...s.sectionVisibility,
            [section]: !s.sectionVisibility[section],
          },
        })),
      setSectionVisibility: (visibility) =>
        set((s) => ({
          sectionVisibility: { ...s.sectionVisibility, ...visibility },
        })),
    }),
    { name: "mobilepathways-dashboard" }
  )
);
