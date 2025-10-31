import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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

const candidateSchema = z.object({
  name: z.string().min(1, "Name is required").min(2, "Name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  phone: z.string().optional(),
  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  resumeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  notes: z.string().optional(),
});

type CandidateFormData = z.infer<typeof candidateSchema>;

interface CandidateModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CandidateFormData) => void;
  jobId?: string;
  jobTitle?: string;
  isLoading?: boolean;
}

export function CandidateModal({ 
  open, 
  onClose, 
  onSubmit, 
  jobId,
  jobTitle,
  isLoading 
}: CandidateModalProps) {
  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      linkedinUrl: "",
      resumeUrl: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (open) {
      form.reset({
        name: "",
        email: "",
        phone: "",
        linkedinUrl: "",
        resumeUrl: "",
        notes: "",
      });
    }
  }, [open, form]);

  const handleSubmit = (data: CandidateFormData) => {
    onSubmit({ ...data, jobId } as any);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto" data-testid="dialog-candidate-form">
        <DialogHeader>
          <DialogTitle>Apply to Job</DialogTitle>
          {jobTitle && (
            <DialogDescription>
              Submit your application for <strong>{jobTitle}</strong>
            </DialogDescription>
          )}
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="John Doe" data-testid="input-candidate-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input {...field} type="email" placeholder="john@example.com" data-testid="input-candidate-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" placeholder="+1 234-567-8900" data-testid="input-candidate-phone" />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">Include country code if applicable</p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="linkedinUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://linkedin.com/in/johndoe" data-testid="input-candidate-linkedin" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="resumeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Resume URL</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://example.com/resume.pdf" data-testid="input-candidate-resume" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cover Letter / Notes</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} placeholder="Tell us about yourself..." data-testid="textarea-candidate-notes" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose} data-testid="button-cancel-candidate">
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading} data-testid="button-submit-candidate">
                {isLoading ? "Submitting..." : "Submit Application"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
