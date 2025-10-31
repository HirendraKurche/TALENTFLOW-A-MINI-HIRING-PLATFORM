# TalentFlow - Hiring Platform

## Overview

TalentFlow is a modern, frontend-focused hiring platform built with React and TypeScript. It provides HR teams with a comprehensive dashboard to manage jobs, candidates, and assessments through an intuitive interface. The application features drag-and-drop job reordering, Kanban-style candidate pipeline management, and a dynamic assessment builder for creating job-specific evaluations.

The application is designed as a complete client-side solution with mock backend services, making it ideal for prototyping and development environments. It uses IndexedDB for persistent local storage and MirageJS for simulating REST API interactions.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18+ with TypeScript for type-safe component development
- Vite as the build tool and development server for fast HMR (Hot Module Replacement)
- Wouter for lightweight client-side routing instead of React Router

**Rationale:** Vite provides significantly faster development experience compared to webpack-based tooling, while Wouter reduces bundle size compared to React Router DOM for simple routing needs.

**UI Component System:**
- shadcn/ui components built on Radix UI primitives
- TailwindCSS for utility-first styling with custom design tokens
- Design system inspired by Linear's precision and Notion's information hierarchy

**Rationale:** This combination provides accessible, customizable components with minimal bundle overhead. The Linear/Notion-inspired design approach prioritizes data density and usability over decorative elements, which is ideal for a data-heavy HR dashboard.

**State Management:**
- TanStack Query (React Query) for server state management and caching
- React Hook Form + Zod for form state and validation
- Local component state using React hooks where appropriate

**Rationale:** React Query eliminates the need for a traditional state management library (Redux/Zustand) for server-synced data by providing built-in caching, background updates, and optimistic updates. Form state is isolated using React Hook Form to prevent unnecessary re-renders.

**Complex Interactions:**
- @dnd-kit for drag-and-drop functionality (job reordering, Kanban board)
- @tanstack/react-virtual for virtualizing large candidate lists (1000+ items)
- Framer Motion for smooth animations and transitions

**Rationale:** @dnd-kit provides better TypeScript support and tree-shaking compared to react-beautiful-dnd. Virtualization is essential for rendering large lists without performance degradation.

### Data Persistence & Mock Backend

**Client-Side Storage:**
- Dexie.js wrapper around IndexedDB for structured local data storage
- Automatic sync between IndexedDB and React Query cache on app initialization

**Rationale:** IndexedDB provides persistent browser storage that survives page refreshes, making the app feel more production-like. Dexie simplifies the IndexedDB API with a more developer-friendly interface.

**Mock API Layer:**
- MirageJS creates an in-memory mock server that intercepts fetch requests
- Simulates realistic API latency (200-1200ms) and error rates (7%)
- Factory-based data generation for seeding 1000+ mock candidates

**Rationale:** MirageJS allows developing against realistic API responses without a backend server. The simulated latency and errors help surface edge cases that might occur in production.

**Data Models:**
- Jobs: Title, department, location, tags, status (active/archived), drag-and-drop ordering
- Candidates: Personal info, job assignment, pipeline stage, timeline of status changes, notes
- Assessments: Job-specific forms with sections and multiple question types (single/multiple choice, text, numeric, file upload)

### Key Design Patterns

**Optimistic Updates:**
- Drag-and-drop operations immediately update the UI
- Changes are rolled back if the mock API request fails
- Provides snappy user experience while maintaining data consistency

**Component Composition:**
- Separation between presentational components (JobCard, CandidateRow) and container components (Jobs, Candidates pages)
- Reusable UI primitives from shadcn/ui library
- Feature-specific compositions (KanbanBoard, AssessmentBuilder)

**Form Handling:**
- Controlled forms using React Hook Form
- Schema validation with Zod
- Reusable modal patterns for create/edit operations

**Virtualization Strategy:**
- @tanstack/react-virtual renders only visible rows for candidate lists
- Maintains scroll position and provides smooth scrolling experience
- Critical for performance when displaying 1000+ candidates

## External Dependencies

### UI Libraries
- **@radix-ui/* packages**: Headless accessible component primitives (dialogs, dropdowns, tooltips, etc.)
- **tailwindcss**: Utility-first CSS framework with custom design tokens
- **lucide-react**: Icon library for consistent iconography
- **class-variance-authority** + **clsx**: Utility for constructing className strings with variants

### Data & State Management
- **@tanstack/react-query**: Async state management, caching, and synchronization
- **react-hook-form**: Performant form state management
- **@hookform/resolvers**: Validation resolver for integrating Zod with React Hook Form
- **zod**: TypeScript-first schema validation

### Drag & Drop
- **@dnd-kit/core**: Core drag-and-drop functionality
- **@dnd-kit/sortable**: Sortable list utilities
- **@dnd-kit/utilities**: Helper utilities for transforms and positioning

### Mock Backend & Storage
- **miragejs**: In-memory mock server for simulating REST APIs
- **dexie**: IndexedDB wrapper for client-side persistence
- **nanoid**: Lightweight unique ID generator for client-side entity creation

### Utilities
- **wouter**: Lightweight routing library (~1.5KB)
- **@tanstack/react-virtual**: Virtualization for rendering large lists efficiently

### Database Schema (PostgreSQL via Drizzle ORM)
Although the current implementation uses mock data, the schema is defined using Drizzle ORM for future PostgreSQL integration:
- **Jobs table**: Stores job postings with metadata and ordering
- **Candidates table**: Stores applicant information with JSONB timeline field
- **Assessments table**: Stores assessment definitions with JSONB sections
- **Assessment responses table**: Stores candidate answers to assessments

**Note:** The app currently uses MirageJS + IndexedDB, but the schema is PostgreSQL-ready for backend integration.

### Theming
- Light/dark mode support via CSS variables
- Theme toggle persisted to localStorage
- Custom color tokens defined in tailwind.config.ts and index.css