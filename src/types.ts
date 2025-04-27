
export type UserRole = 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface Class {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  createdAt: string;
  scheduledFor: string;
  meetingUrl?: string;
  completed?: boolean;
  resources?: Resource[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'article' | 'video' | 'example';
  conceptIds: string[];
  classId?: string;
  aiRecommended?: boolean;
}

export interface ClassNote {
  id: string;
  classId: string;
  content: string;
  keyConcepts?: Array<{text: string, timestamp: string}>;
  unansweredQuestions?: Array<{text: string, timestamp: string}>;
  createdAt: string;
}

export interface Quiz {
  id: string;
  classId: string;
  title: string;
  type: 'pre' | 'post';
  questions: Question[];
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctOption: number;
  difficulty: 'easy' | 'medium' | 'hard';
  conceptId: string;
}

export interface Student {
  id: string;
  name: string;
  overallScore: number;
  participation: number;
  status: 'excellent' | 'good' | 'needs improvement' | 'struggling';
  improvementAreas: string[];
  strengthAreas: string[];
  sessionPerformance: SessionPerformance[];
}

export interface SessionPerformance {
  classId: string;
  preQuizScore: number;
  postQuizScore: number;
  participation: number;
}
