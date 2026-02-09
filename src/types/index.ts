// Shared types for the Mobile Pathways dual-portal dashboard

export interface ImportantLink {
  id: string;
  title: string;
  url: string;
  description: string;
  icon?: string;
}

export interface FundraisingConfig {
  goalAmount: number;
  currentAmount: number;
  campaignName: string;
  endDate: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // ISO date string
  type: "legal" | "community" | "deadline" | "meeting";
  description: string;
}

export interface SchedulingSlot {
  id: string;
  dayOfWeek: number; // 0-6 (Sun-Sat)
  startTime: string; // "HH:mm"
  endTime: string; // "HH:mm"
  available: boolean;
}

export interface SchedulingConfig {
  slots: SchedulingSlot[];
  consultationDurationMinutes: number;
  bufferMinutes: number;
  maxBookingsPerDay: number;
}

export interface KanbanTask {
  id: string;
  title: string;
  description: string;
  assignee: string;
  column: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  createdAt: string;
}

export interface SectionVisibility {
  calendar: boolean;
  links: boolean;
  fundraising: boolean;
  scheduling: boolean;
  kanban: boolean;
}

export interface DashboardConfig {
  links: ImportantLink[];
  fundraising: FundraisingConfig;
  events: CalendarEvent[];
  scheduling: SchedulingConfig;
  kanbanTasks: KanbanTask[];
  sectionVisibility: SectionVisibility;
}
