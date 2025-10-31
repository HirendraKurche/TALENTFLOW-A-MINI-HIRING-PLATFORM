# TalentFlow Design Guidelines

## Design Approach: Linear-Inspired Dashboard System

**Selected Approach:** Design system approach inspired by Linear's precision and Notion's information hierarchy
**Rationale:** Data-heavy HR dashboard requiring optimal usability, quick scanning, and efficient workflows over visual flair

---

## Typography System

**Font Family:**
- Primary: 'Inter' (Google Fonts) - UI elements, body text, data tables
- Monospace: 'JetBrains Mono' (Google Fonts) - IDs, technical fields, timestamps

**Type Scale:**
- Hero/Page Titles: text-3xl (30px) font-semibold
- Section Headers: text-xl (20px) font-semibold
- Card Titles: text-lg (18px) font-medium
- Body/Default: text-sm (14px) font-normal
- Supporting Text: text-xs (12px) font-normal
- Buttons/Labels: text-sm (14px) font-medium

**Line Heights:** leading-tight for headings, leading-normal for body text

---

## Layout & Spacing System

**Core Spacing Units:** Tailwind units of 1, 2, 3, 4, 6, 8, 12, 16 (strictly limited set)
- Micro spacing (between related elements): gap-2, space-x-3
- Component internal padding: p-4, px-6 py-4
- Card/Section spacing: p-6, gap-6
- Page margins: p-8, gap-8
- Major section breaks: mt-12, mb-16

**Grid System:**
- Dashboard: Fixed sidebar (w-64) + fluid content area
- Content max-width: max-w-7xl mx-auto
- Card grids: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 with gap-4 or gap-6

---

## Component Library

### Navigation & Layout

**Sidebar:**
- Fixed left position (w-64), full height
- Logo/branding at top (h-16)
- Navigation items with icon + label (h-10 px-3)
- Active state: subtle left border accent (border-l-2)
- Grouped sections with uppercase text-xs labels

**Top Bar:**
- Height: h-16
- Contains: breadcrumbs, search, user profile
- Right-aligned action buttons (gap-3)
- Subtle bottom border for separation

**Content Area:**
- Padding: p-8
- Responsive: p-4 on mobile
- Breadcrumbs at top (text-sm with separator icons)

### Data Display Components

**Job Cards:**
- Border with subtle shadow: border rounded-lg shadow-sm
- Padding: p-6
- Header: title (text-lg font-semibold) + status badge
- Meta info row: flex items-center gap-4 text-sm (date, tags)
- Action buttons: positioned top-right (absolute top-4 right-4)
- Drag handle: visible on hover (opacity-0 hover:opacity-100)

**Candidate List (Virtualized):**
- Row height: h-16
- Hover state: subtle background change
- Layout: grid with fixed columns (avatar | name | email | stage | date)
- Avatar: w-10 h-10 rounded-full
- Stage badges: inline-flex px-2 py-1 rounded-full text-xs

**Kanban Board:**
- Columns: min-w-80 with flex-shrink-0
- Column header: sticky top-0, includes count badge
- Card spacing: gap-3 in vertical stack
- Cards: p-4 rounded-lg border with drag indicator on left
- Drop zone: dashed border with subtle background when dragging

**Data Tables:**
- Header: sticky top-0 border-b font-medium text-xs uppercase
- Rows: border-b last:border-0
- Cell padding: px-4 py-3
- Sortable headers: with arrow icons (Heroicons)
- Zebra striping: optional subtle alternating backgrounds

### Forms & Inputs

**Form Layout:**
- Max width: max-w-2xl for readability
- Field spacing: space-y-6
- Label above input: block text-sm font-medium mb-2
- Input height: h-10 for text inputs
- Textarea: min-h-24 resize-y
- Helper text: text-xs mt-1

**Input Styles:**
- Border: border rounded-md
- Padding: px-3 py-2
- Focus: ring-2 ring-offset-1 (system handles color)
- Error state: border with error text below

**Select/Dropdown:**
- Same height as text inputs (h-10)
- Icon on right indicating dropdown (Heroicons chevron-down)
- Menu: absolute z-50 mt-1 border rounded-md shadow-lg

**Checkboxes/Radio:**
- Size: w-4 h-4
- Label spacing: ml-2
- Group spacing: space-y-2

### Assessment Builder

**Builder Layout:**
- Split view: 60% builder | 40% preview
- Builder sidebar: sections list with add button
- Question cards: p-4 border rounded-lg with drag handle
- Question types: icon grid (2 columns) for selection
- Add question: dashed border button (w-full p-4)

**Preview Pane:**
- Sticky: sticky top-8
- Scrollable: max-h-screen overflow-y-auto
- Background: subtle contrast from main area
- Padding: p-6
- Renders assessment as user would see it

### Interactive Elements

**Buttons:**
- Primary: px-4 py-2 rounded-md text-sm font-medium
- Secondary: border variant
- Icon-only: w-9 h-9 flex items-center justify-center
- Button groups: inline-flex gap-2

**Badges/Tags:**
- Padding: px-2 py-1 rounded-full text-xs font-medium
- Status badges: dot indicator (w-2 h-2 rounded-full mr-1.5)
- Removable tags: with X icon on right

**Modals:**
- Overlay: backdrop blur
- Container: max-w-2xl rounded-lg shadow-2xl
- Header: border-b px-6 py-4
- Content: px-6 py-4 max-h-96 overflow-y-auto
- Footer: border-t px-6 py-4 with right-aligned actions

**Dropdowns/Popovers:**
- Shadow: shadow-lg
- Border: border rounded-md
- Padding: p-2
- Items: px-3 py-2 rounded-md (hover background)

### Feedback Components

**Loading States:**
- Skeleton: animate-pulse with rounded rectangles matching content shape
- Spinner: w-5 h-5 border-2 border-t-transparent rounded-full animate-spin
- Progress bar: h-1 rounded-full with animated width

**Empty States:**
- Centered: flex flex-col items-center justify-center py-12
- Icon: large icon from Heroicons (w-16 h-16)
- Text: text-sm with action button below (mt-4)

**Error States:**
- Alert box: border-l-4 p-4 rounded-md
- Icon + message layout
- Action button if recoverable

**Toast Notifications:**
- Fixed position: bottom-right (bottom-4 right-4)
- Width: w-96
- Padding: p-4 rounded-lg shadow-lg
- Auto-dismiss animation: slide + fade

---

## Icons

**Library:** Heroicons (outline for most UI, solid for emphasis)
**Usage via CDN:** React Icons package
**Common Icons:**
- Navigation: home, users, clipboard-list, chart-bar
- Actions: plus, pencil, trash, archive, check, x
- UI: chevron-down, chevron-right, search, filter, dots-vertical
- Status: check-circle, x-circle, exclamation-triangle, information-circle

---

## Responsive Behavior

**Breakpoints:**
- Mobile: < 768px - stack columns, hide sidebar (hamburger menu)
- Tablet: 768px - 1024px - 2-column grids, collapsible sidebar
- Desktop: > 1024px - full layout with fixed sidebar

**Mobile Adjustments:**
- Sidebar: transforms to bottom navigation or drawer
- Tables: convert to stacked cards
- Multi-column grids: single column
- Padding: reduce from p-8 to p-4

---

## Animations (Minimal)

**Use Framer Motion for:**
- Page transitions: fade + subtle slide (duration: 0.2s)
- Modal enter/exit: scale(0.95) to scale(1) + fade
- List reordering: smooth position changes
- Drag-and-drop: visual feedback during drag
- Toast notifications: slide in from bottom-right

**Avoid:**
- Hover animations on data-heavy elements
- Excessive loading animations
- Decorative animations that distract from workflow

---

## Accessibility

- Focus indicators: ring-2 on all interactive elements
- Skip to content link
- ARIA labels on icon-only buttons
- Keyboard navigation for all interactions
- Form error announcements
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient contrast ratios (handled by color system)

---

## Images

**No hero images** - This is a dashboard application, not a marketing site. Visual content is data-driven:
- User avatars: rounded-full (candidate/profile photos)
- Company logos: in job listings if applicable
- Empty state illustrations: simple line art icons from Heroicons (w-16 h-16 or larger)
- All images are functional, supporting the data display rather than decorative