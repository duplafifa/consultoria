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
