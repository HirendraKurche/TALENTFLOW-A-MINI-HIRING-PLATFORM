import { useRoute, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Job } from "@shared/schema";
import { ArrowLeft, UserPlus } from "lucide-react";
import { CandidateModal } from "@/components/candidate-modal";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function JobDetail() {
  const [, params] = useRoute("/jobs/:id");
  const id = params?.id;
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const { toast } = useToast();

  const { data: job, isLoading } = useQuery<Job>({
    queryKey: ["/api/jobs/" + id],
    enabled: !!id,
  });

  const applyMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/candidates", {
        method: "POST",
        body: JSON.stringify({ ...data, jobId: id }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/candidates"] });
      setIsApplyModalOpen(false);
      toast({ 
        title: "Application submitted successfully!",
        description: "The candidate has been added to the hiring pipeline.",
      });
    },
    onError: () => {
      toast({ 
        title: "Failed to submit application", 
        variant: "destructive" 
      });
    },
  });

  if (isLoading) {
    return <div className="h-64 bg-muted animate-pulse rounded-lg" />;
  }

  if (!job) return <div>Job not found</div>;

  return (
    <div className="space-y-6" data-testid="page-job-detail">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/jobs">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-semibold">{job.title}</h1>
            <p className="text-muted-foreground">Job Detail</p>
          </div>
        </div>
        {job.status === "active" && (
          <Button 
            onClick={() => setIsApplyModalOpen(true)} 
            data-testid="button-apply-job"
            size="lg"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Apply Now
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{job.title}</CardTitle>
          {job.description && <CardDescription>{job.description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {job.tags?.map((t) => (
              <Badge key={t} variant="secondary">{t}</Badge>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div><span className="text-muted-foreground">Department:</span> {job.department || "—"}</div>
            <div><span className="text-muted-foreground">Location:</span> {job.location || "—"}</div>
            <div><span className="text-muted-foreground">Type:</span> {job.employmentType || "—"}</div>
            <div><span className="text-muted-foreground">Status:</span> {job.status}</div>
            <div><span className="text-muted-foreground">Slug:</span> {job.slug}</div>
            <div><span className="text-muted-foreground">Created:</span> {job.createdAt ? new Date(job.createdAt).toLocaleString() : "—"}</div>
          </div>
        </CardContent>
      </Card>

      <CandidateModal
        open={isApplyModalOpen}
        onClose={() => setIsApplyModalOpen(false)}
        onSubmit={(data) => applyMutation.mutate(data)}
        jobId={id}
        jobTitle={job?.title}
        isLoading={applyMutation.isPending}
      />
    </div>
  );
}


