import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { AssessmentModal } from "@/components/assessment-modal";
import type { Assessment } from "@shared/schema";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Assessments() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  const { data, isLoading } = useQuery<{ assessments: Assessment[] }>({
    queryKey: ["/api/assessments"],
  });

  const assessments = data?.assessments || [];

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("/api/assessments", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/assessments"] });
      setIsModalOpen(false);
      toast({ title: "Assessment created successfully!" });
    },
    onError: () => {
      toast({ title: "Failed to create assessment", variant: "destructive" });
    },
  });

  const handleSubmit = (data: any) => {
    createMutation.mutate(data);
  };

  return (
    <div className="space-y-6" data-testid="page-assessments">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Assessments</h1>
          <p className="text-muted-foreground">Create and manage job assessments</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} data-testid="button-create-assessment">
          <Plus className="h-4 w-4 mr-2" />
          Create Assessment
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-48 bg-muted animate-pulse rounded-lg" />
          ))}
        </div>
      ) : assessments.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <FileText className="h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">No assessments yet</p>
            <Button onClick={() => setIsModalOpen(true)} data-testid="button-create-first-assessment">
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Assessment
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {assessments.map((assessment: Assessment) => (
            <Card
              key={assessment.id}
              className="hover-elevate cursor-pointer"
              data-testid={`card-assessment-${assessment.id}`}
            >
              <CardHeader>
                <CardTitle>{assessment.title}</CardTitle>
                {assessment.description && (
                  <CardDescription>{assessment.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sections</span>
                    <Badge variant="secondary">{assessment.sections.length}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Questions</span>
                    <Badge variant="secondary">
                      {assessment.sections.reduce((acc, s) => acc + s.questions.length, 0)}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Created {new Date(assessment.createdAt!).toLocaleDateString()}
                  </div>
                  {assessment.jobId ? (
                    <Link href={`/assessments/${assessment.jobId}/run`}>
                      <Button size="sm" variant="outline">Open Runtime</Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline" disabled title="No job linked">
                      Open Runtime
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <AssessmentModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
