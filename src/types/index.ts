
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
  scheduledFor?: string;
  meetingUrl?: string;
  videoUrl?: string;
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

export interface QuizResult {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  answers: {
    questionId: string;
    selectedOption: number;
    isCorrect: boolean;
  }[];
  completedAt: string;
}

export interface ClassNote {
  id: string;
  classId: string;
  content: string;
  keyConcepts: {
    text: string;
    timestamp: string;
  }[];
  unansweredQuestions: {
    text: string;
    timestamp: string;
  }[];
  createdAt: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'video' | 'article' | 'example';
  conceptIds: string[];
}

export interface Concept {
  id: string;
  name: string;
  description: string;
}
