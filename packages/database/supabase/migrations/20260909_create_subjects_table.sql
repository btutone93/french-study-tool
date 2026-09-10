-- supabase/migrations/20260909_create_subjects_table.sql

-- Create table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  french TEXT NOT NULL,
  english TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- -- Index foreign keys and search paths
-- CREATE INDEX idx_posts_author_id ON public.posts(author_id);

-- -- Enable Row Level Security (RLS)
-- ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- -- Add RLS policy
-- CREATE POLICY "Allow public read access" 
--   ON public.subjects FOR SELECT USING (true);