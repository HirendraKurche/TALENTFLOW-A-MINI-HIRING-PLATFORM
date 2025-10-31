import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobCard } from "@/components/job-card";
import { JobModal } from "@/components/job-modal";
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Job } from "@shared/schema";

function SortableJobCard({ job, onEdit, onArchive }: any) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: job.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <JobCard
        job={job}
        onEdit={onEdit}
        onArchive={onArchive}
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

export default function Jobs() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ["/api/jobs", { search, status: statusFilter }],
  });

  const jobs = data?.jobs || [];

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const tagsArray = data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [];
      return apiRequest("/api/jobs", {
        method: "POST",
        body: JSON.stringify({ ...data, tags: tagsArray, order: jobs.length }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setIsModalOpen(false);
      toast({ title: "Job created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create job", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: any) => {
      const tagsArray = data.tags ? data.tags.split(",").map((t: string) => t.trim()) : [];
      return apiRequest(`/api/jobs/${selectedJob?.id}`, {
        method: "PATCH",
        body: JSON.stringify({ ...data, tags: tagsArray }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      setIsModalOpen(false);
      setSelectedJob(null);
      toast({ title: "Job updated successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to update job", variant: "destructive" });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async (job: Job) => {
      const newStatus = job.status === "active" ? "archived" : "active";
      return apiRequest(`/api/jobs/${job.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
    },
    onSuccess: (_, job) => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({
        title: `Job ${job.status === "active" ? "archived" : "unarchived"} successfully!`,
      });
    },
    onError: () => {
      toast({ title: "Failed to update job status", variant: "destructive" });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: async ({ jobId, newOrder }: { jobId: string; newOrder: number }) => {
      return apiRequest(`/api/jobs/${jobId}/reorder`, {
        method: "PATCH",
        body: JSON.stringify({ order: newOrder }),
      });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/jobs"] });
      toast({ title: "Failed to reorder jobs", variant: "destructive" });
    },
  });

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = jobs.findIndex((j: Job) => j.id === active.id);
    const newIndex = jobs.findIndex((j: Job) => j.id === over.id);

    const reorderedJobs = [...jobs];
    const [movedJob] = reorderedJobs.splice(oldIndex, 1);
    reorderedJobs.splice(newIndex, 0, movedJob);

    queryClient.setQueryData(["/api/jobs", { search, status: statusFilter }], {
      ...data,
      jobs: reorderedJobs.map((job: Job, index: number) => ({ ...job, order: index })),
    });

    reorderMutation.mutate({ jobId: active.id as string, newOrder: newIndex });
  };

  const handleEdit = (job: Job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setSelectedJob(null);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (selectedJob) {
      updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  return (
    <div className="space-y-6" data-testid="page-jobs">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Jobs</h1>
          <p className="text-muted-foreground">Manage job postings and track applications</p>
        </div>
        <Button onClick={handleCreate} data-testid="button-create-job">
          <Plus className="h-4 w-4 mr-2" />
          Create Job
        </Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
            data-testid="input-search-jobs"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40" data-testid="select-status-filter">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No jobs found</p>
        </div>
      ) : (
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={jobs.map((j: Job) => j.id)} strategy={verticalListSortingStrategy}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jobs.map((job: Job) => (
                <SortableJobCard
                  key={job.id}
                  job={job}
                  onEdit={handleEdit}
                  onArchive={(j: Job) => archiveMutation.mutate(j)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      <JobModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedJob(null);
        }}
        onSubmit={handleSubmit}
        job={selectedJob}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
}
