import { useRoute, Link } from "wouter";
import { useMemo, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Assessment } from "@shared/schema";
import { ArrowLeft } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AnyQuestion = any;

function useAssessmentByJob(jobId?: string) {
  return useQuery<{ assessments: Assessment[] }>({
    queryKey: ["/api/assessments", { jobId }],
    enabled: !!jobId,
  });
}

export default function AssessmentRun() {
  const [, params] = useRoute("/assessments/:jobId/run");
  const jobId = params?.jobId;
  const { toast } = useToast();
  const { data, isLoading } = useAssessmentByJob(jobId);
  const assessment = data?.assessments?.[0];

  const [responses, setResponses] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const setValue = (id: string, value: any) => {
    setResponses((p) => ({ ...p, [id]: value }));
    setErrors((e) => ({ ...e, [id]: "" }));
  };

  const isVisible = (q: AnyQuestion) => {
    if (!q.showIfQuestionId) return true;
    const actual = responses[q.showIfQuestionId];
    return String(actual) === String(q.showIfEquals);
  };

  const validate = () => {
    const next: Record<string, string> = {};
    for (const section of assessment?.sections || []) {
      for (const q of section.questions as AnyQuestion[]) {
        if (!isVisible(q)) continue;
        const v = responses[q.id];
        if (q.required && (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0))) {
          next[q.id] = "Required";
          continue;
        }
        if (q.type === "numeric" && v !== undefined && v !== "") {
          const num = Number(v);
          if (Number.isNaN(num)) next[q.id] = "Must be a number";
          if (q.minValue !== undefined && num < q.minValue) next[q.id] = `Min ${q.minValue}`;
          if (q.maxValue !== undefined && num > q.maxValue) next[q.id] = `Max ${q.maxValue}`;
        }
        if (q.type === "long_text" && q.maxLength && typeof v === "string" && v.length > q.maxLength) {
          next[q.id] = `Max length ${q.maxLength}`;
        }
      }
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submitMutation = useMutation({
    mutationFn: async () => {
      if (!assessment) return;
      await apiRequest(`/api/assessments/${assessment.id}/submit`, {
        method: "POST",
        body: JSON.stringify({ candidateId: "local", responses }),
      });
    },
    onSuccess: () => {
      toast({ title: "Assessment submitted" });
      setResponses({});
    },
    onError: () => {
      toast({ title: "Submission failed", variant: "destructive" });
    },
  });

  const handleSubmit = () => {
    if (!assessment) return;
    if (!validate()) return;
    submitMutation.mutate();
  };

  if (isLoading) return <div className="h-64 bg-muted animate-pulse rounded-lg" />;
  if (!assessment) return <div>No assessment found for this job.</div>;

  return (
    <div className="space-y-6" data-testid="page-assessment-run">
      <div className="flex items-center gap-4">
        <Link href="/assessments">
          <Button variant="ghost" size="icon" className="h-9 w-9"><ArrowLeft className="h-4 w-4" /></Button>
        </Link>
        <div>
          <h1 className="text-3xl font-semibold">{assessment.title}</h1>
          <p className="text-muted-foreground">Complete the assessment</p>
        </div>
      </div>

      {assessment.sections.map((section) => (
        <Card key={section.id}>
          <CardHeader>
            <CardTitle>{section.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {section.questions.map((q: AnyQuestion) => {
              if (!isVisible(q)) return null;
              return (
                <div key={q.id} className="space-y-2">
                  <Label>
                    {q.question}
                    {q.required && <span className="text-destructive ml-1">*</span>}
                  </Label>
                  {q.type === "single" && q.options && (
                    <RadioGroup value={responses[q.id] || ""} onValueChange={(v) => setValue(q.id, v)}>
                      {q.options.map((option: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-2">
                          <RadioGroupItem value={option} id={`${q.id}-${idx}`} />
                          <Label htmlFor={`${q.id}-${idx}`} className="font-normal">{option}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {q.type === "multiple" && q.options && (
                    <div className="space-y-2">
                      {(q.options as string[]).map((option, idx) => {
                        const selected: string[] = responses[q.id] || [];
                        const checked = selected.includes(option);
                        return (
                          <div key={idx} className="flex items-center gap-2">
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(c) => {
                                if (c) setValue(q.id, [...selected, option]);
                                else setValue(q.id, selected.filter((o) => o !== option));
                              }}
                              id={`${q.id}-${idx}`}
                            />
                            <Label htmlFor={`${q.id}-${idx}`} className="font-normal">{option}</Label>
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {q.type === "short_text" && (
                    <Input value={responses[q.id] || ""} onChange={(e) => setValue(q.id, e.target.value)} placeholder="Your answer" />
                  )}
                  {q.type === "long_text" && (
                    <Textarea value={responses[q.id] || ""} onChange={(e) => setValue(q.id, e.target.value)} rows={4} maxLength={q.maxLength} placeholder="Your answer" />
                  )}
                  {q.type === "numeric" && (
                    <Input type="number" value={responses[q.id] || ""} onChange={(e) => setValue(q.id, e.target.value)} min={q.minValue} max={q.maxValue} placeholder="Enter a number" />
                  )}
                  {q.type === "file" && (
                    <Input type="file" onChange={(e) => setValue(q.id, e.target.files?.[0])} />
                  )}
                  {errors[q.id] && <div className="text-destructive text-sm">{errors[q.id]}</div>}
                </div>
              );
            })}
          </CardContent>
        </Card>
      ))}

      <Button className="w-full" onClick={handleSubmit} disabled={submitMutation.isPending}>
        {submitMutation.isPending ? "Submitting..." : "Submit Assessment"}
      </Button>
    </div>
  );
}


