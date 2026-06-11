-- Run this script in your Supabase SQL Editor to create all required tables

-- 1. Projects
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  live_url TEXT,
  github_url TEXT,
  thumbnail_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INT DEFAULT 0,
  challenge TEXT,
  solution TEXT,
  key_features JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon_url TEXT,
  category TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. About (Single row table)
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio TEXT,
  profile_photo_url TEXT,
  banner_photos TEXT[],
  tagline TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Experience
CREATE TABLE experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  logo_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Certifications
CREATE TABLE certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  cert_url TEXT,
  image_url TEXT,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. Admins
CREATE TABLE admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Set up Storage Policies (assuming bucket name is 'portfolio')
-- You need to create a bucket named 'portfolio' manually in the Supabase Storage dashboard
-- and make it PUBLIC.
