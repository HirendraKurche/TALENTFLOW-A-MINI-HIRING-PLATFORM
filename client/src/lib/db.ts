import Dexie, { Table } from 'dexie';
import type { Job, Candidate, Assessment, AssessmentResponse } from '@shared/schema';

export class TalentFlowDatabase extends Dexie {
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

export const db = new TalentFlowDatabase();
