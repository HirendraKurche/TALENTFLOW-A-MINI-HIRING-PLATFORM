import { CandidateRow } from '../candidate-row';

export default function CandidateRowExample() {
  const mockCandidate = {
    id: '1',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    phone: '+1 555-123-4567',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
    jobId: 'job-1',
    stage: 'interview',
    resumeUrl: null,
    linkedinUrl: null,
    notes: null,
    timeline: [],
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="border rounded-md">
      <CandidateRow
        candidate={mockCandidate}
        onClick={() => console.log('Candidate clicked:', mockCandidate.name)}
      />
    </div>
  );
}
