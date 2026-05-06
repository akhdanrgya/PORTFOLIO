import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Project = {
  id: string;
  title: string;
  description: string | null;
  tech_stack: string[] | null;
  live_url: string | null;
  github_url: string | null;
  thumbnail_url: string | null;
  category: string | null;
  featured: boolean;
  order_index: number;
  created_at: string;
};

export type Skill = {
  id: string;
  name: string;
  icon_url: string | null;
  category: string | null;
  order_index: number;
  created_at: string;
};

export type About = {
  id: string;
  bio: string | null;
  profile_photo_url: string | null;
  banner_photos: string[] | null;
  tagline: string | null;
  updated_at: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  logo_url: string | null;
  order_index: number;
  created_at: string;
};

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  cert_url: string | null;
  image_url: string | null;
  order_index: number;
  created_at: string;
};
