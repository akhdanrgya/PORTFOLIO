-- Migration: Add project detail fields
-- Run this in Supabase SQL Editor

ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenge TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_features JSONB;

-- key_features schema: [{ "title": "Feature Name", "description": "Feature description" }, ...]
