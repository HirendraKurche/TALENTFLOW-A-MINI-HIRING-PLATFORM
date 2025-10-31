# TalentFlow Architecture Documentation

This document provides an in-depth look at the technical architecture, design patterns, and implementation details of the TalentFlow application.

## Table of Contents

1. [System Overview](#system-overview)
2. [Data Flow Architecture](#data-flow-architecture)
3. [State Management](#state-management)
4. [API Simulation Layer](#api-simulation-layer)
5. [Persistence Strategy](#persistence-strategy)
6. [Component Architecture](#component-architecture)
7. [Performance Optimizations](#performance-optimizations)
8. [Error Handling](#error-handling)
9. [Design Patterns](#design-patterns)
10. [Testing Strategy](#testing-strategy)

## System Overview

TalentFlow is a frontend-only application that simulates a full-stack hiring platform. It uses a three-layer architecture:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│        (React Components + UI State Management)         │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                   Application Layer                      │
│   (TanStack Query + Business Logic + Route Handling)   │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────┴────────────────────────────────────┐
│                     Data Layer                          │
│         (MirageJS Mock API + IndexedDB Storage)        │
└─────────────────────────────────────────────────────────┘
```

### Technology Stack Justification

| Technology | Purpose | Why Chosen |
|------------|---------|------------|
| React 18 | UI Framework | Industry standard, concurrent features, excellent ecosystem |
| TypeScript | Type Safety | Catch errors at compile-time, better IDE support, self-documenting code |
| Vite | Build Tool | Fast HMR, modern ESM-based, optimized production builds |
| TanStack Query | Server State | Automatic caching, optimistic updates, background sync |
| MirageJS | API Mocking | Full CRUD simulation, factories for seeding, relationship modeling |
| Dexie | IndexedDB Wrapper | Promise-based API, TypeScript support, easy schema management |
| DnD Kit | Drag & Drop | Accessible, performant, keyboard navigation support |
| TanStack Virtual | List Virtualization | Handles 10,000+ items smoothly, minimal re-renders |
| Wouter | Routing | Lightweight (1.6kB), hooks-based, simple API |
| shadcn/ui | Component Library | Unstyled, accessible, customizable, owns the code |
| Tailwind CSS | Styling | Utility-first, small bundle size, design system consistency |

## Data Flow Architecture

### Read Flow (Fetching Data)

```
User Action (page load, search, filter)
    ↓
TanStack Query Hook (useQuery)
    ↓
Query Function (getQueryFn)
    ↓
MirageJS Route Handler
    ↓
[Artificial Latency 200-1200ms]
    ↓
[7% chance of error on writes]
    ↓
Read from MirageJS In-Memory DB
    ↓
Write to IndexedDB (cache through)
    ↓
Return Response
    ↓
TanStack Query Cache Update
    ↓
Component Re-render
```

### Write Flow (Creating/Updating Data)

```
User Action (form submit, drag-and-drop)
    ↓
TanStack Query Mutation (useMutation)
    ↓
[Optional: Optimistic Update]
    ↓
API Request to MirageJS
    ↓
[Artificial Latency 200-1200ms]
    ↓
[7% chance of error - simulates network issues]
    ↓
MirageJS Handler Processing
    ↓
Validation (e.g., unique slug check)
    ↓
Write to MirageJS In-Memory DB
    ↓
Write to IndexedDB (persistence)
    ↓
Return Response
    ↓
On Success:
    - Keep optimistic update
    - Invalidate related queries
    - Show success toast
    ↓
On Error:
    - Rollback optimistic update
    - Show error toast
    - Log error
```

### Hydration Flow (App Startup)

```
App Mount
    ↓
useIndexedDBSync Hook
    ↓
Read Jobs from IndexedDB
    ↓
Read Candidates from IndexedDB
    ↓
Read Assessments from IndexedDB
    ↓
Populate TanStack Query Cache
    ↓
Components Render with Data
    ↓
[Background: MirageJS initializes with seeds if DB empty]
```

## State Management

### State Categories

1. **Server State** (TanStack Query)
   - Jobs, Candidates, Assessments
   - Cached, automatically refetched
   - Optimistic updates for mutations

2. **URL State** (Wouter Router)
   - Current route
   - Route parameters (job ID, candidate ID)

3. **Local UI State** (React useState)
   - Modal visibility
   - Form inputs (via React Hook Form)
   - Accordion expand/collapse
   - View toggle (list vs kanban)

4. **Persistent Client State** (IndexedDB)
   - All application data
   - Assessment responses
   - Survives page refresh

### TanStack Query Configuration

```typescript
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,          // No polling
      refetchOnWindowFocus: false,     // No auto-refetch
      staleTime: Infinity,             // Data never stale (local-first)
      retry: false,                    // No retries (simulate real network)
    },
    mutations: {
      retry: false,                    // No retries
    },
  },
});
```

**Design Decision**: Since this is a local-first app with simulated API, we disable automatic refetching and set infinite stale time to avoid unnecessary re-renders.

## API Simulation Layer

### MirageJS Server Structure

```typescript
makeServer() {
  return createServer({
    models: {
      job: Model,
      candidate: Model,
      assessment: Model,
    },
    
    factories: {
      job: Factory.extend({ /* factory methods */ }),
      candidate: Factory.extend({ /* factory methods */ }),
    },
    
    seeds(server) {
      // Create 25 jobs
      server.createList('job', 25);
      
      // Create 1000 candidates
      for (let i = 0; i < 1000; i++) {
        server.create('candidate', { jobId: randomJobId });
      }
      
      // Create 3+ assessments
      // ...
    },
    
    routes() {
      this.namespace = 'api';
      this.timing = randomLatency(); // 200-1200ms
      
      // Define all routes...
    },
  });
}
```

### Error Simulation Strategy

```typescript
const ERROR_RATE = 0.07; // 7%
const shouldError = () => Math.random() < ERROR_RATE;

this.patch('/jobs/:id/reorder', (schema, request) => {
  if (shouldError()) {
    return new Response(500, {}, { error: 'Failed to reorder' });
  }
  // ... success handling
});
```

**Why 7%?** This rate is high enough to test error handling regularly but low enough to not be annoying during normal use.

### Write-Through Caching

Every MirageJS write operation also writes to IndexedDB:

```typescript
this.post('/jobs', (schema, request) => {
  const attrs = JSON.parse(request.requestBody);
  const job = schema.create('job', attrs);
  
  // Write through to IndexedDB
  db.jobs.add(job.attrs);
  
  return job;
});
```

This ensures data persists across page refreshes.

## Persistence Strategy

### IndexedDB Schema (Dexie)

```typescript
class TalentFlowDatabase extends Dexie {
  jobs!: Table<Job>;
  candidates!: Table<Candidate>;
  assessments!: Table<Assessment>;
  assessmentResponses!: Table<AssessmentResponse>;

  constructor() {
    super('TalentFlowDB');
    this.version(1).stores({
      jobs: 'id, slug, status, order',
      candidates: 'id, email, jobId, stage',
      assessments: 'id, jobId',
      assessmentResponses: 'id, assessmentId, candidateId',
    });
  }
}
```

**Indexed Fields**: Only fields used in queries are indexed to keep the database fast.

### Synchronization Strategy

On app startup:
1. Check if IndexedDB has data
2. If yes, populate TanStack Query cache
3. If no, MirageJS seeds will populate on first API call

On every write:
1. MirageJS updates in-memory DB
2. Simultaneously writes to IndexedDB
3. Both are kept in sync

### Data Consistency

Since this is a single-user, local-first app:
- No conflict resolution needed
- IndexedDB is source of truth
- MirageJS in-memory DB is ephemeral (resets on refresh)
- TanStack Query cache bridges them

## Component Architecture

### Component Categories

1. **Page Components** (`pages/`)
   - Route-level components
   - Data fetching with useQuery
   - Layout and composition

2. **Feature Components** (`components/`)
   - Business logic components
   - Self-contained features (JobCard, KanbanBoard)
   - Accept props, emit events

3. **UI Components** (`components/ui/`)
   - Presentational components (shadcn/ui)
   - No business logic
   - Highly reusable

### Example: Jobs Page Architecture

```
Jobs.tsx (Page)
├── JobModal (Feature)
│   ├── Dialog (UI)
│   ├── Form (UI)
│   └── Input/Select/Button (UI)
├── DndContext (Feature)
│   └── SortableJobCard (Feature)
│       └── JobCard (Feature)
│           ├── Card (UI)
│           ├── Badge (UI)
│           └── Button (UI)
└── Pagination Controls (Feature)
```

### Props vs Context

**We use Props** for:
- Parent-child communication
- Data passing
- Event handlers

**We avoid Context** because:
- App is relatively small
- Prop drilling is manageable
- Makes component dependencies explicit
- Easier to test

Exception: Theme and Toast use Context (from libraries).

## Performance Optimizations

### 1. List Virtualization

For the candidates list (1000+ items):

```typescript
const virtualizer = useVirtualizer({
  count: filteredCandidates.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 80,        // Each row ~80px
  overscan: 10,                  // Render 10 extra rows
});
```

**Result**: Only renders ~20-30 DOM nodes at a time instead of 1000+.

### 2. React Query Caching

- Automatic deduplication of requests
- Background refetching disabled (local-first)
- Stale data served immediately while revalidating

### 3. Code Splitting

Vite automatically splits:
- Route-level components
- Large dependencies (MirageJS, Dexie)
- Dynamic imports where needed

### 4. Optimistic Updates

```typescript
useMutation({
  mutationFn: updateJob,
  onMutate: async (newJob) => {
    // Cancel outgoing refetches
    await queryClient.cancelQueries(['/api/jobs']);
    
    // Snapshot current state
    const previous = queryClient.getQueryData(['/api/jobs']);
    
    // Optimistically update
    queryClient.setQueryData(['/api/jobs'], newJobs);
    
    return { previous };
  },
  onError: (err, variables, context) => {
    // Rollback on error
    queryClient.setQueryData(['/api/jobs'], context.previous);
  },
});
```

**Result**: UI updates instantly, rolls back only if API fails.

### 5. Memoization

Used sparingly:
- useMemo for expensive calculations
- React.memo for pure components
- useCallback for stable function references in deps arrays

**Design Philosophy**: Prefer simple, readable code over premature optimization.

## Error Handling

### Error Types

1. **Network Errors** (simulated 7% rate)
   - Caught by TanStack Query
   - Displayed via toast notifications
   - Optimistic updates rolled back

2. **Validation Errors**
   - Caught by React Hook Form
   - Displayed inline with form fields
   - Prevented from reaching API

3. **404 Errors**
   - Caught by route handler
   - NotFound page component

4. **Client Errors** (bugs)
   - Error boundaries (could be added)
   - Console logging for debugging

### Error UI Patterns

```typescript
// Network error
toast({
  title: "Failed to save job",
  description: "Please try again",
  variant: "destructive",
});

// Validation error
<FormMessage>Title is required</FormMessage>

// Loading state
{isLoading && <Skeleton />}

// Empty state
{jobs.length === 0 && <EmptyState />}
```

## Design Patterns

### 1. Compound Components

Example: AssessmentBuilder + AssessmentPreview

```typescript
<AssessmentModal>
  {showBuilder ? (
    <AssessmentBuilder sections={sections} onChange={setSections} />
  ) : (
    <AssessmentPreview sections={sections} />
  )}
</AssessmentModal>
```

### 2. Render Props

Example: Virtual list rendering

```typescript
virtualizer.getVirtualItems().map((virtualItem) => {
  const candidate = candidates[virtualItem.index];
  return <CandidateRow key={virtualItem.key} candidate={candidate} />;
});
```

### 3. Custom Hooks

Examples:
- `useIndexedDBSync()` - Hydrates cache on mount
- `useToast()` - Toast notification management
- `useTheme()` - Dark mode state and toggle

### 4. Factory Pattern

MirageJS factories for data generation:

```typescript
Factory.extend({
  name() {
    return faker.person.fullName();
  },
  email(i) {
    return `candidate${i}@example.com`;
  },
});
```

### 5. Higher-Order Components

SortableJobCard wraps JobCard with drag-and-drop:

```typescript
function SortableJobCard({ job }) {
  const { attributes, listeners, setNodeRef, transform } = useSortable({ id: job.id });
  return (
    <div ref={setNodeRef} style={{ transform }}>
      <JobCard job={job} dragHandleProps={{ ...attributes, ...listeners }} />
    </div>
  );
}
```

## Testing Strategy

### Unit Testing (Recommended)

```typescript
// Example test for validation
describe('JobModal', () => {
  it('shows error for duplicate slug', () => {
    render(<JobModal existingJobs={[{ slug: 'test' }]} />);
    userEvent.type(screen.getByLabelText('Slug'), 'test');
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    expect(screen.getByText('Slug must be unique')).toBeInTheDocument();
  });
});
```

### Integration Testing

```typescript
// Example test for full flow
describe('Job creation flow', () => {
  it('creates and displays a new job', async () => {
    render(<App />);
    userEvent.click(screen.getByRole('button', { name: /create job/i }));
    // Fill form...
    userEvent.click(screen.getByRole('button', { name: /save/i }));
    await waitFor(() => {
      expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    });
  });
});
```

### E2E Testing (Optional)

Playwright or Cypress could test:
- Full user journeys
- Drag-and-drop interactions
- Form submissions with validation
- Error scenarios

## Security Considerations

Since this is a frontend-only demo:

1. **No sensitive data** - All data is local, no real user information
2. **No authentication** - Would be required in production
3. **XSS prevention** - React escapes by default
4. **No CSRF** - No real backend to attack
5. **Input validation** - Client-side only (would need server-side too)

In production, add:
- Authentication & authorization
- Server-side validation
- Rate limiting
- HTTPS only
- Content Security Policy
- CORS configuration

## Scalability Considerations

### Current Limitations

1. **Data Size**: IndexedDB can handle millions of records, but UI virtualizes only 10,000 efficiently
2. **Concurrent Users**: N/A (local-only)
3. **Real-time Updates**: Not implemented (would need WebSockets)

### If This Were Real

To scale to production:

1. **Backend API**: Replace MirageJS with REST/GraphQL API
2. **Database**: PostgreSQL with proper indexes
3. **Caching**: Redis for frequently accessed data
4. **CDN**: Cloudflare for static assets
5. **Load Balancing**: Multiple API servers
6. **Search**: Elasticsearch for advanced candidate search
7. **File Storage**: S3 for resume uploads
8. **Real-time**: WebSockets or Server-Sent Events
9. **Monitoring**: Sentry, DataDog, or similar
10. **CI/CD**: GitHub Actions, automated tests

## Deployment Architecture

```
User Browser
    ↓
CDN (Vercel/Netlify/Cloudflare)
    ↓
Static Files (HTML/CSS/JS)
    ↓
[Client-side App Runs]
    ↓
IndexedDB (Local Storage)
```

**Note**: No backend servers needed for this demo.

## Future Improvements

### Performance
- [ ] Implement service worker for offline support
- [ ] Add React.lazy for route-based code splitting
- [ ] Optimize bundle size with tree shaking
- [ ] Add image optimization for candidate avatars

### Features
- [ ] Bulk operations (select multiple candidates)
- [ ] Advanced filtering (date ranges, custom fields)
- [ ] Export to CSV/PDF
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality

### Developer Experience
- [ ] Storybook for component documentation
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright
- [ ] Pre-commit hooks with Husky
- [ ] Automated dependency updates

### Accessibility
- [ ] ARIA labels for all interactive elements
- [ ] Keyboard navigation for drag-and-drop
- [ ] Screen reader testing
- [ ] Color contrast validation
- [ ] Focus management

## Conclusion

TalentFlow demonstrates modern frontend architecture patterns:
- Local-first data management
- Optimistic UI updates
- Comprehensive error handling
- Performance optimization
- Type safety throughout
- Scalable component structure

The architecture is designed to be maintainable, testable, and easily extensible for future requirements.

---

**Questions?** Review the code, run the app, and experiment with the implementation!
