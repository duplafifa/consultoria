/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
  verifiedProfit: string;
  rating: number;
  date: string;
}

export interface MarketInfo {
  id: string;
  name: string;
  category: 'real' | 'virtual';
  description: string;
  averageAssertiveness: string;
  difficulty: 'Baixo' | 'Médio' | 'Alto';
  indicator: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export type UserRole = 'student' | 'admin';

export interface UserProfile {
  email: string;
  role: UserRole;
  status?: 'pending' | 'approved';
  purchasedCourses: string[];
  completedLessons: string[];
  createdAt?: string;
  stripeCustomerId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  description: string;
  videoUrl?: string;
  bannerUrl?: string;
  backgroundImageUrl?: string;
  textContent?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  backgroundImageUrl?: string;
}

export interface Course {
  id: string;
  title: string;
  category: string;
  duration: string;
  modules: Module[];
  instructor: string;
  description: string;
  bannerUrl?: string;
  createdAt?: string;
  price?: number;
  stripeProductId?: string;
  status?: 'draft' | 'approved';
}
