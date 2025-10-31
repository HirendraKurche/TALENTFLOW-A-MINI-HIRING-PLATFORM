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

export function makeServer() {
  return createServer({
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
        server.create('candidate', { jobId: randomJob.id });
      }

      const sampleAssessments = [
        {
          id: nanoid(),
          jobId: jobs[0].id,
          title: 'Technical Assessment',
          description: 'Evaluate technical skills and problem-solving abilities',
          sections: [
            {
              id: nanoid(),
              title: 'Technical Knowledge',
              questions: [
                {
                  id: nanoid(),
                  type: 'single' as const,
                  question: 'What is your primary programming language?',
                  required: true,
                  options: ['JavaScript', 'Python', 'Java', 'Go', 'Ruby'],
                },
                {
                  id: nanoid(),
                  type: 'multiple' as const,
                  question: 'Which frameworks have you worked with?',
                  required: true,
                  options: ['React', 'Vue', 'Angular', 'Svelte', 'Next.js'],
                },
                {
                  id: nanoid(),
                  type: 'numeric' as const,
                  question: 'Years of professional experience?',
                  required: true,
                  minValue: 0,
                  maxValue: 50,
                },
              ],
            },
            {
              id: nanoid(),
              title: 'Coding Challenge',
              questions: [
                {
                  id: nanoid(),
                  type: 'long_text' as const,
                  question: 'Explain your approach to solving a complex algorithmic problem.',
                  required: true,
                  maxLength: 1000,
                },
                {
                  id: nanoid(),
                  type: 'file' as const,
                  question: 'Upload your code solution',
                  required: false,
                },
              ],
            },
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
      this.timing = randomLatency();

      this.get('/jobs', (schema, request) => {
        const { search, status, page = '1', pageSize = '10' } = request.queryParams;
        let jobs = schema.all('job').models;

        if (search) {
          jobs = jobs.filter(job => 
            job.title.toLowerCase().includes(search.toLowerCase())
          );
        }

        if (status && status !== 'all') {
          jobs = jobs.filter(job => job.status === status);
        }

        jobs.sort((a, b) => a.order - b.order);

        const startIndex = (parseInt(page) - 1) * parseInt(pageSize);
        const paginatedJobs = jobs.slice(startIndex, startIndex + parseInt(pageSize));

        db.jobs.bulkPut(jobs as Job[]);

        return {
          jobs: paginatedJobs,
          total: jobs.length,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        };
      });

      this.get('/jobs/:id', (schema, request) => {
        const job = schema.find('job', request.params.id);
        if (job) {
          db.jobs.put(job.attrs as Job);
        }
        return job;
      });

      this.post('/jobs', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Internal server error' });
        }

        const attrs = JSON.parse(request.requestBody);
        const job = schema.create('job', { ...attrs, id: nanoid(), createdAt: new Date().toISOString() });
        db.jobs.add(job.attrs as Job);
        return job;
      });

      this.patch('/jobs/:id', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Internal server error' });
        }

        const id = request.params.id;
        const attrs = JSON.parse(request.requestBody);
        const job = schema.find('job', id);
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
        const { search, stage, jobId } = request.queryParams;
        let candidates = schema.all('candidate').models;

        if (search) {
          const searchLower = search.toLowerCase();
          candidates = candidates.filter(c => 
            c.name.toLowerCase().includes(searchLower) ||
            c.email.toLowerCase().includes(searchLower)
          );
        }

        if (stage && stage !== 'all') {
          candidates = candidates.filter(c => c.stage === stage);
        }

        if (jobId) {
          candidates = candidates.filter(c => c.jobId === jobId);
        }

        db.candidates.bulkPut(candidates as Candidate[]);

        return { candidates };
      });

      this.get('/candidates/:id', (schema, request) => {
        const candidate = schema.find('candidate', request.params.id);
        if (candidate) {
          db.candidates.put(candidate.attrs as Candidate);
        }
        return candidate;
      });

      this.patch('/candidates/:id', (schema, request) => {
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

        if (jobId) {
          assessments = assessments.filter(a => a.jobId === jobId);
        }

        db.assessments.bulkPut(assessments as Assessment[]);

        return { assessments };
      });

      this.get('/assessments/:id', (schema, request) => {
        const assessment = schema.find('assessment', request.params.id);
        if (assessment) {
          db.assessments.put(assessment.attrs as Assessment);
        }
        return assessment;
      });

      this.post('/assessments', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to create assessment' });
        }

        const attrs = JSON.parse(request.requestBody);
        const assessment = schema.create('assessment', { ...attrs, id: nanoid(), createdAt: new Date().toISOString() });
        db.assessments.add(assessment.attrs as Assessment);
        return assessment;
      });

      this.post('/assessments/:id/submit', (schema, request) => {
        if (shouldError()) {
          return new Response(500, {}, { error: 'Failed to submit assessment' });
        }

        const attrs = JSON.parse(request.requestBody);
        return new Response(200, {}, { success: true, ...attrs });
      });

      this.passthrough();
    },
  });
}
