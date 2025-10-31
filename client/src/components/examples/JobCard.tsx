import { JobCard } from '../job-card';

export default function JobCardExample() {
  const mockJob = {
    id: '1',
    title: 'Senior Frontend Engineer',
    slug: 'senior-frontend-engineer',
    description: 'We are looking for a talented frontend engineer to join our growing team and help build amazing user experiences.',
    department: 'Engineering',
    location: 'Remote',
    employmentType: 'Full-time',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    status: 'active',
    order: 0,
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="p-4 max-w-md">
      <JobCard
        job={mockJob}
        onEdit={(job) => console.log('Edit job:', job.title)}
        onArchive={(job) => console.log('Archive job:', job.title)}
      />
    </div>
  );
}
