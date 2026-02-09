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
  kanban: boolean;
}

export interface DashboardConfig {
  links: ImportantLink[];
  fundraising: FundraisingConfig;
  events: CalendarEvent[];
  kanbanTasks: KanbanTask[];
  sectionVisibility: SectionVisibility;
}
