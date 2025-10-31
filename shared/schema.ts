import { z } from "zod";

// Job types
export interface Job {
  id: string;
  title: string;
  slug: string;
  description?: string;
  department?: string;
  location?: string;
  employmentType?: string;
  tags?: string[];
  status: string;
  order: number;
  createdAt: string;
}

export const insertJobSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  department: z.string().optional(),
  location: z.string().optional(),
  employmentType: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.string().default("active"),
  order: z.number().default(0),
});

export type InsertJob = z.infer<typeof insertJobSchema>;

// Candidate types
export interface TimelineEvent {
  id: string;
  type: string;
  stage?: string;
  note?: string;
  timestamp: string;
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  jobId?: string;
  stage: string;
  resumeUrl?: string;
  linkedinUrl?: string;
  notes?: string;
  timeline?: TimelineEvent[];
  createdAt: string;
}

export const insertCandidateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  jobId: z.string().optional(),
  stage: z.string().default("applied"),
  resumeUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  notes: z.string().optional(),
  timeline: z.array(z.any()).optional(),
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;

// Assessment types
export interface AssessmentQuestion {
  id: string;
  type: "single" | "multiple" | "short_text" | "long_text" | "numeric" | "file";
  question: string;
  required: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
  showIfQuestionId?: string;
  showIfEquals?: string;
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export interface Assessment {
  id: string;
  jobId: string;
  title: string;
  description?: string;
  sections: AssessmentSection[];
  createdAt: string;
}

export const insertAssessmentSchema = z.object({
  jobId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  sections: z.array(z.any()),
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;

// Assessment Response types
export interface AssessmentResponse {
  id: string;
  assessmentId: string;
  candidateId: string;
  responses: Record<string, any>;
  submittedAt: string;
}

export const insertAssessmentResponseSchema = z.object({
  assessmentId: z.string(),
  candidateId: z.string(),
  responses: z.record(z.any()),
});

export type InsertAssessmentResponse = z.infer<typeof insertAssessmentResponseSchema>;

// User types (for future auth)
export interface User {
  id: string;
  username: string;
  password: string;
}

export const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

