import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const students = pgTable("students", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  grade: text("grade").notNull(), // elementary-4, elementary-5, etc.
  birthDate: text("birth_date").notNull(), // YYMMDD format
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const testSessions = pgTable("test_sessions", {
  id: serial("id").primaryKey(),
  studentId: integer("student_id").references(() => students.id).notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time"),
  timeRemaining: integer("time_remaining").notNull().default(900), // 15 minutes in seconds
  currentQuestion: integer("current_question").notNull().default(1),
  isCompleted: boolean("is_completed").notNull().default(false),
  answers: jsonb("answers").notNull().default([]), // Array of answer objects
  totalScore: integer("total_score"),
  skillScores: jsonb("skill_scores"), // Object with reading, grammar, vocabulary, listening scores
});

export const insertStudentSchema = createInsertSchema(students).omit({
  id: true,
  createdAt: true,
}).extend({
  name: z.string().min(1, "이름을 입력해주세요"),
  grade: z.string().min(1, "학년을 선택해주세요"),
  birthDate: z.string()
    .length(6, "생년월일은 6자리로 입력해주세요 (예: 051225)")
    .regex(/^\d{6}$/, "숫자만 입력해주세요"),
});

export const insertTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
}).extend({
  startTime: z.coerce.date(),
  endTime: z.coerce.date().optional(),
});

export const updateTestSessionSchema = createInsertSchema(testSessions).omit({
  id: true,
  studentId: true,
}).extend({
  startTime: z.coerce.date().optional(),
  endTime: z.coerce.date().optional(),
}).partial();

export type Student = typeof students.$inferSelect;
export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type TestSession = typeof testSessions.$inferSelect;
export type InsertTestSession = z.infer<typeof insertTestSessionSchema>;
export type UpdateTestSession = z.infer<typeof updateTestSessionSchema>;

// Question types
export interface Question {
  id: number;
  skill: 'reading' | 'grammar' | 'vocabulary' | 'listening';
  grade: 'elementary' | 'middle';
  passage?: string; // For reading comprehension
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct option
  difficulty: 'easy' | 'medium' | 'hard';
  explanation?: string; // Explanation for the correct answer
}

export interface Answer {
  questionId: number;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number; // in seconds
}

export interface SkillScores {
  reading: number;
  grammar: number;
  vocabulary: number;
  listening: number;
}
