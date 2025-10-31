import { KanbanBoard } from '../kanban-board';

export default function KanbanBoardExample() {
  const mockCandidates = [
    {
      id: '1',
      name: 'Emma Johnson',
      email: 'emma@example.com',
      phone: '+1 555-0101',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
      jobId: 'job-1',
      stage: 'applied',
      resumeUrl: null,
      linkedinUrl: null,
      notes: null,
      timeline: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Liam Smith',
      email: 'liam@example.com',
      phone: null,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Liam',
      jobId: 'job-1',
      stage: 'screening',
      resumeUrl: null,
      linkedinUrl: null,
      notes: null,
      timeline: [],
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Olivia Brown',
      email: 'olivia@example.com',
      phone: '+1 555-0103',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia',
      jobId: 'job-1',
      stage: 'interview',
      resumeUrl: null,
      linkedinUrl: null,
      notes: null,
      timeline: [],
      createdAt: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-4">
      <KanbanBoard
        candidates={mockCandidates}
        onStageChange={(id, stage) => console.log(`Move candidate ${id} to ${stage}`)}
        onCardClick={(candidate) => console.log('Clicked:', candidate.name)}
      />
    </div>
  );
}
