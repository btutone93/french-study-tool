-- supabase/migrations/20260909_create_subjects_table.sql

-- 1. Create enum types for grammatical properties
CREATE TYPE public.grammatical_person AS ENUM ('1st', '2nd', '3rd');
CREATE TYPE public.grammatical_number AS ENUM ('singular', 'plural');

-- 2. Create the table
CREATE TABLE public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  french TEXT NOT NULL,
  english TEXT NOT NULL,
  grammatical_person public.grammatical_person NOT NULL,
  grammatical_number public.grammatical_number NOT NULL,
  is_formal BOOLEAN DEFAULT false NOT NULL,
  sort_order INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  
  -- Ensure unique subject combinations
  CONSTRAINT unique_french_subject UNIQUE (french, grammatical_person, grammatical_number, is_formal)
);

-- Enable Row Level Security
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;

-- Allow public read access via API
CREATE POLICY "Allow public read access" 
  ON public.subjects FOR SELECT USING (true);

-- Create index for API sorting and filtering
CREATE INDEX idx_subjects_sort_order ON public.subjects(sort_order);

-- 3. Idempotent seed data insert with deterministic UUIDs
INSERT INTO public.subjects (id, french, english, grammatical_person, grammatical_number, is_formal, sort_order)
VALUES
  ('11111111-1111-4111-8111-111111111111', 'je', 'I', '1st', 'singular', false, 1),
  ('22222222-2222-4222-8222-222222222222', 'tu', 'you', '2nd', 'singular', false, 2),
  ('33333333-3333-4333-8333-333333333333', 'il', 'he', '3rd', 'singular', false, 3),
  ('44444444-4444-4444-8444-444444444444', 'elle', 'she', '3rd', 'singular', false, 4),
  ('55555555-5555-4555-8555-555555555555', 'on', 'one / we', '3rd', 'singular', false, 5),
  ('66666666-6666-4666-8666-666666666666', 'nous', 'we', '1st', 'plural', false, 6),
  ('77777777-7777-4777-8777-777777777777', 'vous', 'you (formal / plural)', '2nd', 'plural', true, 7),
  ('88888888-8888-4888-8888-888888888888', 'ils', 'they (masculine / mixed)', '3rd', 'plural', false, 8),
  ('99999999-9999-4999-8999-999999999999', 'elles', 'they (feminine)', '3rd', 'plural', false, 9)
ON CONFLICT (id) DO UPDATE SET
  french = EXCLUDED.french,
  english = EXCLUDED.english,
  grammatical_person = EXCLUDED.grammatical_person,
  grammatical_number = EXCLUDED.grammatical_number,
  is_formal = EXCLUDED.is_formal,
  sort_order = EXCLUDED.sort_order;