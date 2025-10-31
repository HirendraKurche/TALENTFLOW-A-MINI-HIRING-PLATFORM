# Quick Start Guide

Get TalentFlow running in under 2 minutes! ⚡

## Prerequisites

- Node.js 18+ ([Download here](https://nodejs.org/))
- A code editor (VS Code recommended)
- A modern web browser

## Installation Steps

### 1. Install Dependencies

```bash
cd entnt_replit
npm install
```

⏱️ Takes ~30 seconds

### 2. Start Development Server

```bash
npm run dev
```

⏱️ Server starts in < 1 second

### 3. Open in Browser

Visit: **http://localhost:5173** (or whatever port Vite shows)

🎉 That's it! The app is now running with seeded data.

---

## First Steps in the App

### Explore the Dashboard
1. You'll see an overview of jobs, candidates, and assessments
2. Click on any card to navigate to that section

### Try the Jobs Board
1. Click **"Jobs"** in the sidebar
2. See 25 pre-loaded jobs
3. Click **"Create Job"** to add a new one
4. Try dragging jobs to reorder them
5. Filter by status or search by title

### View Candidates
1. Click **"Candidates"** in the sidebar
2. Scroll through 1000+ candidates (virtualized for performance)
3. Toggle to **Kanban view**
4. Drag candidates between stages
5. Click any candidate to see their profile

### Build an Assessment
1. Click **"Assessments"** in the sidebar
2. Click **"Create Assessment"**
3. Add sections and questions
4. Toggle to **Preview** to see how it looks
5. Click **"Open Runtime"** on any assessment to fill it out

---

## Key Features to Try

### ⚡ Drag and Drop
- Reorder jobs in the jobs list
- Move candidates between stages in Kanban view

### 🔍 Search and Filter
- Search jobs by title
- Filter jobs by status (active/archived) or tags
- Search candidates by name or email
- Filter candidates by stage

### 📝 Forms with Validation
- Try creating a job with a duplicate slug (will show error)
- Submit an assessment without filling required fields (will show validation)

### 🎨 Dark Mode
- Click the theme toggle in the sidebar
- Switch between light/dark/system themes

### 💾 Data Persistence
- Create some jobs/candidates/assessments
- Refresh the page
- All your data is still there! (saved in IndexedDB)

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npx tsc --noEmit` | Type-check without building |

---

## Project Structure at a Glance

```
client/src/
├── pages/           # Route components (Dashboard, Jobs, Candidates, etc.)
├── components/      # Reusable components (JobCard, KanbanBoard, etc.)
│   └── ui/         # shadcn/ui primitives (Button, Input, etc.)
├── hooks/          # Custom React hooks
├── lib/            # Utilities (API mock, DB, query client)
└── App.tsx         # Main app component

shared/
└── schema.ts       # TypeScript types and Zod schemas
```

---

## Common Issues & Solutions

### Port Already in Use
**Issue:** `Port 5173 is in use`  
**Solution:** Vite automatically tries the next available port. Just use the port shown in the terminal.

### Dependencies Failed to Install
**Issue:** `npm install` errors  
**Solution:** 
```bash
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors in IDE
**Issue:** Red squiggles everywhere  
**Solution:** Restart your TypeScript server (VS Code: Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server")

### Data Not Persisting
**Issue:** Data disappears on refresh  
**Solution:** Check if IndexedDB is enabled in your browser (it should be by default)

---

## Browser DevTools Tips

### View IndexedDB Data
1. Open DevTools (F12)
2. Go to **Application** tab (Chrome) or **Storage** tab (Firefox)
3. Expand **IndexedDB** → **TalentFlowDB**
4. Click on any table (jobs, candidates, assessments)
5. See all your data!

### View Network Requests
1. Open DevTools (F12)
2. Go to **Network** tab
3. Filter by **XHR** or **Fetch**
4. See simulated API calls to MirageJS

### Check Console for Logs
1. Open DevTools (F12)
2. Go to **Console** tab
3. See "Synced data from IndexedDB" on app start
4. See any errors or warnings (there shouldn't be any!)

---

## Performance Tips

### For Best Experience
- Use Chrome or Edge for best DevTools
- Keep browser extensions minimal (ad blockers can slow things down)
- Close other tabs if you have 50+ open

### Testing with 10,000+ Candidates
Want to stress-test the virtualized list?

1. Open `client/src/lib/mirage.ts`
2. Change this line:
   ```typescript
   for (let i = 0; i < 1000; i++) {
   ```
   to:
   ```typescript
   for (let i = 0; i < 10000; i++) {
   ```
3. Restart the dev server
4. Visit the Candidates page
5. Scroll smoothly through 10,000 items! 🚀

---

## Next Steps

### Want to Deploy?
See [`DEPLOYMENT.md`](./DEPLOYMENT.md) for step-by-step guides for:
- Vercel (easiest)
- Netlify
- Cloudflare Pages
- GitHub Pages
- And more!

### Want to Understand the Architecture?
See [`ARCHITECTURE.md`](./ARCHITECTURE.md) for:
- Data flow diagrams
- State management strategy
- Performance optimizations
- Design patterns used

### Want to See All Features?
See [`FEATURE_CHECKLIST.md`](./FEATURE_CHECKLIST.md) for:
- Complete feature list with status
- Testing checklist
- File locations

### Want the Full Story?
See [`README.md`](./README.md) for:
- Comprehensive overview
- Technical decisions
- Implementation highlights
- Known issues and improvements

---

## Quick Command Reference

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type-check
npx tsc --noEmit

# Clean install (if issues)
rm -rf node_modules package-lock.json && npm install
```

---

## Getting Help

### Documentation
- `README.md` - Project overview
- `ARCHITECTURE.md` - Technical details
- `DEPLOYMENT.md` - Deployment guides
- `FEATURE_CHECKLIST.md` - Feature list

### Code Comments
Look for comments in the code explaining complex logic, especially in:
- `client/src/lib/mirage.ts` - API simulation
- `client/src/pages/jobs.tsx` - Drag-and-drop with optimistic updates
- `client/src/pages/assessment-run.tsx` - Conditional questions

### Browser Console
The app logs helpful messages to the console:
- "Synced data from IndexedDB" on startup
- Any errors with descriptive messages

---

## You're All Set! 🎉

The app is now running with:
- ✅ 25 pre-loaded jobs
- ✅ 1,000 pre-loaded candidates
- ✅ 3 pre-loaded assessments
- ✅ Full drag-and-drop functionality
- ✅ Search and filtering
- ✅ Data persistence
- ✅ Dark mode
- ✅ Responsive design

**Enjoy exploring TalentFlow!** 🚀

---

**Pro Tips:**
- Try dragging things around - it's fun! 🎯
- The app simulates network errors (~7% of the time) - watch for toast notifications
- All your data is saved locally - no server needed
- Check out the dark mode - it's beautiful 🌙
