import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface User {
  id: string;
  name: string;
  email: string;
  created_at?: string;
}

export interface EventProfile {
  id: string;
  user_id: string;
  event_id: string;
  name: string;
  role: string;
  major?: string;
  year?: string;
  skills_have: string[];
  skills_need: string[];
  bio?: string;
  created_at?: string;
}

export interface Event {
  id: string;
  name: string;
  code: string;
  host_id: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  created_at?: string;
}

export interface Participant {
  id: string;
  user_id: string;
  event_id: string;
  joined_at?: string;
  event_profile?: EventProfile;
}

export interface Match {
  id: string;
  event_id: string;
  user_a_id: string;
  user_b_id: string;
  reasons: string[];
  bucket: 'strong_complement' | 'good_potential' | 'explore';
  created_at?: string;
  user_b_profile?: EventProfile;
}

export interface Connection {
  id: string;
  event_id: string;
  user_a_id: string;
  user_b_id: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at?: string;
  user_b_profile?: EventProfile;
}
