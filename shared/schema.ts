import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Jobs schema
export const jobs = pgTable("jobs", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  department: text("department"),
  location: text("location"),
  employmentType: text("employment_type"),
  tags: text("tags").array(),
  status: text("status").notNull().default("active"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
  createdAt: true,
});

export type InsertJob = z.infer<typeof insertJobSchema>;
export type Job = typeof jobs.$inferSelect;

// Candidates schema
export const candidates = pgTable("candidates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  avatar: text("avatar"),
  jobId: varchar("job_id"),
  stage: text("stage").notNull().default("applied"),
  resumeUrl: text("resume_url"),
  linkedinUrl: text("linkedin_url"),
  notes: text("notes"),
  timeline: jsonb("timeline").$type<TimelineEvent[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export interface TimelineEvent {
  id: string;
  type: string;
  stage?: string;
  note?: string;
  timestamp: string;
}

export const insertCandidateSchema = createInsertSchema(candidates).omit({
  id: true,
  createdAt: true,
});

export type InsertCandidate = z.infer<typeof insertCandidateSchema>;
export type Candidate = typeof candidates.$inferSelect;

// Assessment schema
export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  jobId: varchar("job_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  sections: jsonb("sections").$type<AssessmentSection[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export interface AssessmentQuestion {
  id: string;
  type: "single" | "multiple" | "short_text" | "long_text" | "numeric" | "file";
  question: string;
  required: boolean;
  options?: string[];
  minValue?: number;
  maxValue?: number;
  maxLength?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  questions: AssessmentQuestion[];
}

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  createdAt: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;

// Assessment Response schema
export const assessmentResponses = pgTable("assessment_responses", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assessmentId: varchar("assessment_id").notNull(),
  candidateId: varchar("candidate_id").notNull(),
  responses: jsonb("responses").$type<Record<string, any>>().notNull(),
  submittedAt: timestamp("submitted_at").defaultNow(),
});

export const insertAssessmentResponseSchema = createInsertSchema(assessmentResponses).omit({
  id: true,
  submittedAt: true,
});

export type InsertAssessmentResponse = z.infer<typeof insertAssessmentResponseSchema>;
export type AssessmentResponse = typeof assessmentResponses.$inferSelect;

// Keep users for future auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
