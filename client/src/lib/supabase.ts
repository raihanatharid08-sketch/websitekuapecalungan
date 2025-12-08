import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types based on schema
export type Question = {
  id: string;
  user_id?: string;
  title: string;
  description: string;
  category_id?: string;
  status: 'submitted' | 'answered' | 'archived';
  urgency_level: 'low' | 'medium' | 'high';
  contact_email: string;
  views_count: number;
  created_at: string;
  updated_at: string;
};

export type Answer = {
  id: string;
  question_id: string;
  admin_id: string;
  content: string;
  madhab_id?: string;
  sources?: any;
  status: 'draft' | 'pending_review' | 'published';
  created_at: string;
  published_at?: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  display_order: number;
  created_at: string;
};

export type Rating = {
  id: string;
  answer_id: string;
  user_id?: string;
  rating: number;
  is_helpful?: boolean;
  created_at: string;
};
