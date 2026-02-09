# Mobile Pathways — Dual-Portal Dashboard

## Project Overview
A dual-portal dashboard for the nonprofit **Mobile Pathways** with two main areas:
- **User Dashboard** — Public-facing dashboard for staff and community members
- **Admin Panel** — Settings interface for managing dashboard content

## Tech Stack
- **Framework:** Next.js (App Router) with TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand (shared store between Admin and User views)
- **Drag & Drop:** @dnd-kit (for Staff Kanban)
- **Date Utilities:** date-fns

## Architecture Rules
- Admin Panel controls User Dashboard content through a shared Zustand store persisted to localStorage.
- All shared data types live in `src/types/`.
- Store definitions live in `src/store/` using Zustand with persist middleware.
- Reusable UI primitives go in `src/components/ui/`.
- Layout components (Sidebar, Shell) go in `src/components/layout/`.
- Feature-specific components go in `src/components/dashboard/` or `src/components/admin/`.

## Route Structure
```
/                     → Redirects to /dashboard
/dashboard            → User Dashboard home
/dashboard/calendar   → Event Calendar
/dashboard/links      → Important Links
/dashboard/fundraising→ Fundraising Tracker
/dashboard/scheduling → Scheduling Tool
/dashboard/kanban     → Staff Kanban Board
/admin                → Admin Panel home
/admin/links          → Manage Important Links
/admin/fundraising    → Update Fundraising Goals
/admin/visibility     → Toggle Dashboard Sections
/admin/scheduling     → Edit Scheduling Availability
```

## User Dashboard Features
1. **Event Calendar** — Interactive calendar showing legal dates and community events
2. **Important Links** — Quick access to Pathfinder, EOIR portals, etc.
3. **Fundraising Tracker** — Visual progress bar (goal vs. current funds)
4. **Scheduling** — Embedded Calendly-style consultation scheduler
5. **Staff Kanban** — Drag-and-drop to-do list for Executive Director and staff

## Admin Panel Features
1. **Manage Links** — Add/Delete important links
2. **Fundraising Settings** — Update goal numbers and current amounts
3. **Section Visibility** — Toggle on/off dashboard sections
4. **Scheduling Settings** — Edit availability parameters

## Development Commands
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
```

## Conventions
- Use `"use client"` directive only in components that need browser APIs or interactivity.
- Keep server components as the default where possible.
- Name files with kebab-case for routes, PascalCase for components.
