import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Assessment } from "@shared/schema";

export default function Assessments() {
  const { data, isLoading } = useQuery({
    queryKey: ["/api/assessments"],
  });

  const assessments = data?.assessments || [];

  return (
    <div className="space-y-6" data-testid="page-assessments">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Assessments</h1>
          <p className="text-muted-foreground">Create and manage job assessments</p>
        </div>
        <Button data-testid="button-create-assessment">
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
            <Button data-testid="button-create-first-assessment">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
