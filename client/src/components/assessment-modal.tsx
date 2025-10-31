import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { AssessmentBuilder } from "./assessment-builder";
import { AssessmentPreview } from "./assessment-preview";
import type { AssessmentSection } from "@shared/schema";
import { nanoid } from "nanoid";

const assessmentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  jobId: z.string().optional(),
});

type AssessmentFormData = z.infer<typeof assessmentSchema>;

interface AssessmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AssessmentFormData & { sections: AssessmentSection[] }) => void;
  isLoading?: boolean;
}

export function AssessmentModal({ open, onClose, onSubmit, isLoading }: AssessmentModalProps) {
  const [sections, setSections] = useState<AssessmentSection[]>([
    {
      id: nanoid(),
      title: "Section 1",
      questions: [],
    },
  ]);
  const [showPreview, setShowPreview] = useState(false);
  const [validationError, setValidationError] = useState<string>("");

  const form = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema),
    defaultValues: {
      title: "",
      description: "",
      jobId: "",
    },
  });

  const handleSubmit = (data: AssessmentFormData) => {
    setValidationError("");
    
    // Validate that at least one question exists
    const totalQuestions = sections.reduce((acc, section) => acc + section.questions.length, 0);
    if (totalQuestions === 0) {
      setValidationError("Please add at least one question to the assessment");
      return;
    }
    
    // Validate section titles
    for (const section of sections) {
      if (!section.title.trim()) {
        setValidationError("All sections must have a title");
        return;
      }
    }
    
    // Validate that single/multiple choice questions have options
    for (const section of sections) {
      for (const question of section.questions) {
        if (!question.question.trim()) {
          setValidationError("All questions must have text");
          return;
        }
        if ((question.type === "single" || question.type === "multiple") && 
            (!question.options || question.options.length === 0 || question.options.every(o => !o.trim()))) {
          setValidationError(`Question "${question.question}" requires at least one option`);
          return;
        }
      }
    }
    
    onSubmit({ ...data, sections });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto" data-testid="dialog-assessment-form">
        <DialogHeader>
          <DialogTitle>Create Assessment</DialogTitle>
          <p className="text-sm text-muted-foreground">Build sections and questions, then preview before saving.</p>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {validationError && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assessment Title *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Technical Assessment" data-testid="input-assessment-title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jobId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job ID (optional)</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="job-123" data-testid="input-assessment-job-id" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={2} placeholder="Assessment description..." data-testid="textarea-assessment-description" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-2 mb-4">
              <Button
                type="button"
                variant={!showPreview ? "default" : "outline"}
                onClick={() => setShowPreview(false)}
                data-testid="button-builder-view"
              >
                Builder
              </Button>
              <Button
                type="button"
                variant={showPreview ? "default" : "outline"}
                onClick={() => setShowPreview(true)}
                data-testid="button-preview-view"
              >
                Preview
              </Button>
            </div>

            {!showPreview ? (
              <AssessmentBuilder sections={sections} onSectionsChange={setSections} />
            ) : (
              <AssessmentPreview sections={sections} title={form.watch("title") || "Assessment"} />
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-assessment">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} data-testid="button-submit-assessment">
                {isLoading ? "Creating..." : "Create Assessment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
