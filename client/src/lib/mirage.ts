import { createServer, Model, Factory, Response } from 'miragejs';
import { nanoid } from 'nanoid';
import { db } from './db';
import type { Job, Candidate, Assessment } from '@shared/schema';

const LATENCY_MIN = 200;
const LATENCY_MAX = 1200;
const ERROR_RATE = 0.07;

const randomLatency = () => Math.random() * (LATENCY_MAX - LATENCY_MIN) + LATENCY_MIN;
const shouldError = () => Math.random() < ERROR_RATE;

const firstNames = ['Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'Ethan', 'Sophia', 'Mason', 'Isabella', 'William', 'Mia', 'James', 'Charlotte', 'Benjamin', 'Amelia', 'Lucas', 'Harper', 'Henry', 'Evelyn', 'Alexander', 'Abigail', 'Michael', 'Emily', 'Daniel', 'Elizabeth', 'Jacob', 'Sofia', 'Logan', 'Avery', 'Jackson'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'];

const stages = ['applied', 'screening', 'interview', 'assessment', 'offer', 'rejected'];
const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Operations'];
const locations = ['Remote', 'San Francisco', 'New York', 'London', 'Berlin', 'Tokyo'];
const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Intern'];

declare global {
  interface Window { __mirage__?: any }
}

export function makeServer() {
  if (typeof window !== 'undefined' && (window as any).__mirage__) {
    return (window as any).__mirage__;
  }

  const server = createServer({
    models: {
      job: Model,
      candidate: Model,
      assessment: Model,
    },

    factories: {
      job: Factory.extend({
        id() {
          return nanoid();
        },
        title(i: number) {
          const titles = [
            'Senior Frontend Engineer',
            'Backend Developer',
            'Full Stack Engineer',
            'DevOps Engineer',
            'Product Manager',
            'UX Designer',
            'Data Scientist',
            'Marketing Manager',
            'Sales Representative',
            'Customer Success Manager',
            'QA Engineer',
            'Mobile Developer',
            'System Administrator',
            'Technical Writer',
            'Business Analyst',
          ];
          return titles[i % titles.length];
        },
        slug(i: number) {
          return `job-${i + 1}-${nanoid(6)}`;
        },
        description() {
          return 'We are looking for a talented professional to join our growing team.';
        },
        department() {
          return departments[Math.floor(Math.random() * departments.length)];
        },
        location() {
          return locations[Math.floor(Math.random() * locations.length)];
        },
        employmentType() {
          return employmentTypes[Math.floor(Math.random() * employmentTypes.length)];
        },
        tags() {
          const allTags = ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'Kubernetes', 'TypeScript', 'Go', 'PostgreSQL'];
          const count = Math.floor(Math.random() * 3) + 2;
          return Array.from({ length: count }, () => allTags[Math.floor(Math.random() * allTags.length)]);
        },
        status(i: number) {
          return i % 5 === 0 ? 'archived' : 'active';
        },
        order(i: number) {
          return i;
        },
        createdAt() {
          return new Date().toISOString();
        },
      }),

      candidate: Factory.extend({
        id() {
          return nanoid();
        },
        name() {
          return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
        },
        email(i: number) {
          return `candidate${i}@example.com`;
        },
        phone() {
          return `+1 ${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 900 + 100)}-${Math.floor(Math.random() * 9000 + 1000)}`;
        },
        avatar() {
          return `https://api.dicebear.com/7.x/avataaars/svg?seed=${nanoid()}`;
        },
        stage() {
          return stages[Math.floor(Math.random() * stages.length)];
        },
        timeline() {
          return [
            {
              id: nanoid(),
              type: 'stage_change',
              stage: 'applied',
              timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            },
          ];
        },
        createdAt() {
          return new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString();
        },
      }),
    },

    seeds(server) {
      server.createList('job', 25);
      const jobs = server.schema.all('job').models;
      
      for (let i = 0; i < 1000; i++) {
        const randomJob = jobs[Math.floor(Math.random() * jobs.length)];
        server.create('candidate', { jobId: (randomJob as any).id });
      }

      const makeQuestions = () => ([
        { id: nanoid(), type: 'single' as const, question: 'Preferred language?', required: true, options: ['JS','TS','Python','Go'] },
        { id: nanoid(), type: 'multiple' as const, question: 'Frameworks used', required: true, options: ['React','Vue','Angular','Svelte','Node'] },
        { id: nanoid(), type: 'short_text' as const, question: 'Favorite tool', required: false },
        { id: nanoid(), type: 'long_text' as const, question: 'Describe a hard bug you fixed', required: true, maxLength: 800 },
        { id: nanoid(), type: 'numeric' as const, question: 'Years of experience', required: true, minValue: 0, maxValue: 50 },
        { id: nanoid(), type: 'file' as const, question: 'Upload sample work', required: false },
        { id: nanoid(), type: 'single' as const, question: 'Open to relocation?', required: true, options: ['Yes','No'] },
        { id: nanoid(), type: 'short_text' as const, question: 'Current city', required: false, showIfQuestionId: undefined, showIfEquals: undefined } as any,
        { id: nanoid(), type: 'single' as const, question: 'Interested in management?', required: false, options: ['Yes','No'] },
        { id: nanoid(), type: 'long_text' as const, question: 'Leadership experience', required: false, maxLength: 600 },
      ]);

      const sampleAssessments = [
        {
          id: nanoid(),
          jobId: jobs[0].id,
          title: 'Technical Assessment',
          description: 'Evaluate technical skills and problem-solving abilities',
          sections: [
            { id: nanoid(), title: 'Basics', questions: makeQuestions() },
            { id: nanoid(), title: 'Deeper Dive', questions: makeQuestions() },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: nanoid(),
          jobId: jobs[1].id,
          title: 'Product Sense Assessment',
          description: 'Evaluate product thinking and prioritization',
          sections: [
            { id: nanoid(), title: 'Product Strategy', questions: makeQuestions() },
          ],
          createdAt: new Date().toISOString(),
        },
        {
          id: nanoid(),
          jobId: jobs[2].id,
          title: 'Design Assessment',
          description: 'Evaluate UX and visual design thinking',
          sections: [
            { id: nanoid(), title: 'Design Principles', questions: makeQuestions() },
          ],
          createdAt: new Date().toISOString(),
        },
      ];

      sampleAssessments.forEach(assessment => {
        server.create('assessment', assessment);
      });
    },

    routes() {
      this.namespace = 'api';
      // All requests use realistic latency as per spec
      
      this.get('/jobs', (schema, request) => {
        this.timing = randomLatency(); // 200-1200ms as per requirement
        const { search, status, tags, page = '1', pageSize = '10', sort } = request.queryParams;
        let jobs = schema.all('job').models;

        if (search && typeof search === 'string') {
          jobs = jobs.filter((job: any) => 
            job.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (status && status !== 'all' && typeof status === 'string') {
          jobs = jobs.filter((job: any) => job.status === status);
        }

        if (tags && typeof tags === 'string' && tags.trim().length > 0) {
          const wanted = tags.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
          if (wanted.length) {
            jobs = jobs.filter((j: any) => Array.isArray(j.tags) && j.tags.some((t: string) => wanted.includes(t.toLowerCase())));
          }
        }

        if (sort && typeof sort === 'string') {
          const [field, direction] = sort.split(':');
          jobs.sort((a: any, b: any) => {
            const av = (a as any)[field];
            const bv = (b as any)[field];
            if (av === bv) return 0;
            const cmp = av > bv ? 1 : -1;
            return direction === 'desc' ? -cmp : cmp;
          });
        } else {
          jobs.sort((a: any, b: any) => a.order - b.order);
        }

        const startIndex = (parseInt(page as string) - 1) * parseInt(pageSize as string);
        const paginatedJobs = jobs.slice(startIndex, startIndex + parseInt(pageSize as string));

        // Write paginated results immediately
        db.jobs.bulkPut(paginatedJobs.map((j: any) => j.attrs));
        
        // Asynchronously write all jobs for full persistence (non-blocking)
        if (!search && !status && !tags && page === '1') {
          // Only on initial load without filters
          setTimeout(() => {
            db.jobs.bulkPut(jobs.map((j: any) => j.attrs));
          }, 0);
        }

        return {
          jobs: paginatedJobs,
          total: jobs.length,
          page: parseInt(page as string),
          pageSize: parseInt(pageSize as string),
        };
      });

      this.get('/jobs/:id', (schema, request) => {
        const job = schema.find('job', request.params.id);
        if (job) {
          db.jobs.put((job as any).attrs);
          return (job as any).attrs;
        }
        return new Response(404, {}, { error: 'Not found' });
      });

      this.post('/jobs', (schema, request) => {
        this.timing = randomLatency(); // Realistic latency for writes
        if (shouldError()) {
          return new Response(500, {}, { error: 'Internal server error' });
        }

        const attrs = JSON.parse(request.requestBody);
        // enforce unique slug
        const existing = schema.all('job').models.find((j: any) => j.slug === attrs.slug);
        if (existing) {
          return new Response(400, {}, { error: 'Slug must be unique' });
        }
        const job = schema.create('job', { ...attrs, id: nanoid(), createdAt: new Date().toISOString() });
        db.jobs.add((job as any).attrs);
        return job;
      });

      this.patch('/jobs/:id', (schema, request) => {
        this.timing = randomLatency(); // Realistic latency for writes
        if (shouldError()) {
          return new Response(500, {}, { error: 'Internal server error' });
        }

        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const job = schema.find('job', id);
        if (attrs.slug) {
          const exists = schema
            .all('job')
            .models.find((j: any) => j.id !== id && j.slug === attrs.slug);
          if (exists) {
            return new Response(400, {}, { error: 'Slug must be unique' });
          }
        }
        job?.update(attrs);
        if (job) {
          db.jobs.update(id, attrs);
        }
        return job;
      });

      this.patch('/jobs/:id/reorder', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to reorder jobs' });
        }

        const { order } = JSON.parse(request.requestBody);
        const job = schema.find('job', request.params.id);
        job?.update({ order });
        if (job) {
          db.jobs.update(request.params.id, { order });
        }
        return job;
      });

      this.get('/candidates', (schema, request) => {
        this.timing = randomLatency(); // 200-1200ms as per requirement
        const { search, stage, jobId, page = '1', pageSize = '50' } = request.queryParams;
        let candidates = schema.all('candidate').models;

        if (search && typeof search === 'string') {
          const searchLower = search.toLowerCase();
          candidates = candidates.filter((c: any) => 
            c.name.toLowerCase().includes(searchLower) ||
            c.email.toLowerCase().includes(searchLower)
          );
        }

        if (stage && stage !== 'all' && typeof stage === 'string') {
          candidates = candidates.filter((c: any) => c.stage === stage);
        }

        if (jobId && typeof jobId === 'string') {
          candidates = candidates.filter((c: any) => c.jobId === jobId);
        }

        candidates.sort((a: any, b: any) => (a.createdAt > b.createdAt ? -1 : 1));

        const startIndex = (parseInt(page as string) - 1) * parseInt(pageSize as string);
        const paginated = candidates.slice(startIndex, startIndex + parseInt(pageSize as string));

        // Write paginated results immediately for quick access
        db.candidates.bulkPut(paginated.map((c: any) => c.attrs));
        
        // Asynchronously write all candidates for full persistence (non-blocking)
        if (!search && !stage && !jobId && page === '1') {
          // Only on initial load without filters
          setTimeout(() => {
            db.candidates.bulkPut(candidates.map((c: any) => c.attrs));
          }, 0);
        }

        return { candidates: paginated, total: candidates.length, page: parseInt(page as string), pageSize: parseInt(pageSize as string) };
      });

      this.get('/candidates/:id', (schema, request) => {
        const candidate = schema.find('candidate', request.params.id);
        if (candidate) {
          db.candidates.put((candidate as any).attrs);
          return (candidate as any).attrs;
        }
        return new Response(404, {}, { error: 'Not found' });
      });

      this.post('/candidates', (schema, request) => {
        this.timing = randomLatency(); // Realistic latency for writes
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to create candidate' });
        }

        const attrs = JSON.parse(request.requestBody);
        const candidate = schema.create('candidate', {
          ...attrs,
          id: nanoid(),
          stage: attrs.stage || 'applied',
          avatar: attrs.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${nanoid()}`,
          timeline: [{
            id: nanoid(),
            type: 'stage_change',
            stage: attrs.stage || 'applied',
            timestamp: new Date().toISOString(),
          }],
          createdAt: new Date().toISOString(),
        });
        
        db.candidates.add((candidate as any).attrs);
        return candidate;
      });

      this.patch('/candidates/:id', (schema, request) => {
        this.timing = randomLatency(); // Realistic latency for writes
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to update candidate' });
        }

        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const candidate = schema.find('candidate', id);
        
        if (attrs.stage && candidate && attrs.stage !== candidate.stage) {
          const timeline = [...(candidate.timeline || []), {
            id: nanoid(),
            type: 'stage_change',
            stage: attrs.stage,
            timestamp: new Date().toISOString(),
          }];
          attrs.timeline = timeline;
        }

        candidate?.update(attrs);
        if (candidate) {
          db.candidates.update(id, attrs);
        }
        return candidate;
      });

      this.get('/assessments', (schema, request) => {
        const { jobId } = request.queryParams;
        let assessments = schema.all('assessment').models;

        if (jobId && typeof jobId === 'string') {
          assessments = assessments.filter((a: any) => a.jobId === jobId);
        }

        db.assessments.bulkPut(assessments.map((a: any) => a.attrs));

        return { assessments };
      });

      // Support GET /assessments/:jobId (by job) and legacy by id
      this.get('/assessments/:id', (schema, request) => {
        let assessment = schema.find('assessment', request.params.id);
        if (!assessment) {
          const byJob = schema.all('assessment').models.find((a: any) => a.jobId === request.params.id);
          if (byJob) assessment = byJob as any;
        }
        if (assessment) {
          db.assessments.put((assessment as any).attrs);
        }
        return assessment;
      });

      this.post('/assessments', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to create assessment' });
        }

        const attrs = JSON.parse(request.requestBody);
        const assessment = schema.create('assessment', { ...attrs, id: nanoid(), createdAt: new Date().toISOString() });
        db.assessments.add((assessment as any).attrs);
        return assessment;
      });

      this.put('/assessments/:jobId', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to update assessment' });
        }
        const { jobId } = request.params;
        const attrs = JSON.parse(request.requestBody);
        let existing = schema.all('assessment').models.find((a: any) => a.jobId === jobId);
        if (existing) {
          (existing as any).update(attrs);
          db.assessments.put((existing as any).attrs);
          return existing;
        }
        const created = schema.create('assessment', { ...attrs, id: nanoid(), jobId, createdAt: new Date().toISOString() });
        db.assessments.add((created as any).attrs);
        return created;
      });

      this.post('/assessments/:id/submit', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to submit assessment' });
        }

        const attrs = JSON.parse(request.requestBody);
        try {
          db.assessmentResponses.add({
            id: nanoid(),
            assessmentId: request.params.id,
            candidateId: attrs.candidateId,
            responses: attrs.responses,
            submittedAt: new Date().toISOString(),
          } as any);
        } catch {}
        return new Response(200, {}, { success: true });
      });

      this.passthrough();
    },
  });

  if (typeof window !== 'undefined') {
    (window as any).__mirage__ = server;
  }

  return server;
}
