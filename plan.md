# Project Description: Portfolio Landing Page

## 1. Overview

Build a professional Landing Page to serve as a personal portfolio, showcasing services and projects in a way that attracts potential clients, with the ability to manage displayed projects from an admin panel without touching the code.

## 2. Core Requirements

- **Bilingual**: Arabic (default language) and English, with full support for text direction (RTL for Arabic / LTR for English).
- **Dark / Light Mode**: Toggleable, with the user's choice persisted.
- **CMS system**: To add/edit/delete displayed projects without any code changes (no hard-coding).

## 3. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Styling / UI | Tailwind CSS + shadcn/ui, built on the design system already in the project (Apple design system) |
| Animations | Framer Motion |
| Database / CMS | Firebase (Firestore for project data + Storage for project images) |
| Auth (for admin panel) | Firebase Authentication |
| i18n | A Next.js i18n library (Arabic default + English) with RTL/LTR support |
| Dark/Light mode | next-themes |
| Hosting | Vercel |

## 4. Routing Structure

```
/[locale]/                      → Main landing page (all sections)
/[locale]/projects/[project-id] → Standalone page for each project's details (case study)
/admin                           → Protected admin panel for managing projects
```

**Approved decision**: Project details are shown on a **standalone page** with its own URL (not a modal), because this:
- Allows sharing a direct link to each project as a case study with potential clients.
- Is better for SEO, since each project page can be indexed separately.

## 5. Project Data Model (Firestore Schema)

A `projects` collection, where each document contains:

| Field | Type | Description |
|---|---|---|
| `title_ar` / `title_en` | text | Project name in both languages |
| `shortDescription_ar` / `shortDescription_en` | text | Short description shown on the card |
| `problem_ar` / `problem_en` | text | The problem the client faced |
| `solution_ar` / `solution_en` | text | What was implemented to solve it |
| `result_ar` / `result_en` | text | The final outcome after implementation |
| `coverImage` | URL (Storage) | Project cover image |
| `liveUrl` | URL | Link to the live project |
| `order` | number | Display order of the project |
| `featured` | boolean | To highlight a specific project |
| `createdAt` | timestamp | Date added |

## 6. Admin Panel (Admin / CMS)

- Protected by Firebase Authentication login (a single account for the site owner).
- A form to add a new project: title in Arabic and English, description, cover image upload to Storage, live URL, and the remaining fields.
- A table listing current projects with the ability to edit, delete, and reorder them.
- Goal: add a new project to the site with zero code changes.

## 7. i18n and Direction (RTL/LTR)

- Static text (section titles, buttons, etc.) is stored in separate translation files per language.
- Dynamic content (project data) is stored with two fields per language (`_ar` and `_en`) as shown in the schema above.
- Page direction (`dir="rtl"` or `dir="ltr"`) switches automatically based on the selected language.

## 8. Dark / Light Mode

- The toggle is available from the NavBar.
- The user's choice is persisted locally (localStorage) so it stays consistent on return visits.
- Colors are defined via CSS variables consistent with the current design system.

## 9. Landing Page Sections

### 9.1 NavBar
Logo, navigation links, language switcher, and dark/light mode toggle.

### 9.2 Hero Section
Split into two columns: one column for the main text and call-to-action, and one for a visual element (image/illustration).

The text column includes two buttons:
- "Contact Me" button (scrolls/links directly to the contact / CTA section)
- "View My Projects" button (scrolls to the Projects section on the same page)

### 9.3 Social Proof
Three points highlighting credibility:
- 100% Performance
- Continuous Technical Support
- Active Smart Systems

### 9.4 Pain Points Section
Addresses the visitor with three common problems that push them to reach out:
- You have a business that needs an online presence
- You have a great business idea but need to turn it into a digital product
- Your work relies entirely on manual, tedious processes

### 9.5 Services Section
- Building websites
- Building digital systems
- Building AI agents

### 9.6 Projects Section
A grid of project cards, each containing:
- Project image
- Project name
- Short description
- Two buttons: "View Project Details" (links to the standalone project page) and "View Live Project" (external link)

### 9.7 Project Details Page
A standalone page for each project showing:
- The problem
- What was implemented
- The result

### 9.8 "How I Work" Section
Displayed as an **Interactive Timeline** with four numbered steps:

1. **01 — UNDERSTAND**: We start by understanding the problem, goals & users.
2. **02 — EXPLORE**: We explore possible solutions and choose the right direction.
3. **03 — DEFINE**: We turn the direction into a clear, focused plan.
4. **04 — BUILD**: We bring the solution to life and refine it until it's ready.

### 9.9 Call To Action Section
A direct invitation to get in touch / start a project.

### 9.10 FAQ Section
Displayed as an accordion.

### 9.11 Footer
Links, contact info, copyright.

### 9.12 Floating WhatsApp Icon
A floating WhatsApp icon, persistent across the page, for quick direct contact.

