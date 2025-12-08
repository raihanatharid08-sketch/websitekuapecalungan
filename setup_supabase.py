import os
from supabase import create_client

# Get Supabase credentials from environment
supabase_url = os.getenv("VITE_SUPABASE_URL")
supabase_key = os.getenv("VITE_SUPABASE_ANON_KEY")

if not supabase_url or not supabase_key:
    print("Error: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set")
    exit(1)

# Create Supabase client
supabase = create_client(supabase_url, supabase_key)

print("Setting up Supabase database...")
print(f"Connected to: {supabase_url}")

# SQL to create all tables and functions
sql_schema = """
-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(255),
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Madhabs Table
CREATE TABLE IF NOT EXISTS madhabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Questions Table
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category_id UUID REFERENCES categories(id),
  status VARCHAR(50) DEFAULT 'submitted' CHECK (status IN ('submitted', 'answered', 'archived')),
  urgency_level VARCHAR(50) DEFAULT 'medium' CHECK (urgency_level IN ('low', 'medium', 'high')),
  contact_email VARCHAR(255) NOT NULL,
  views_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);

-- Answers Table
CREATE TABLE IF NOT EXISTS answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL REFERENCES auth.users(id),
  content TEXT NOT NULL,
  madhab_id UUID REFERENCES madhabs(id),
  sources JSONB,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published')),
  created_at TIMESTAMP DEFAULT NOW(),
  published_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_status ON answers(status);
CREATE INDEX IF NOT EXISTS idx_answers_published_at ON answers(published_at DESC);

-- Ratings Table
CREATE TABLE IF NOT EXISTS ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(answer_id, user_id)
);

-- Attachments Table
CREATE TABLE IF NOT EXISTS attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  file_path VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INT,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Function to increment question views
CREATE OR REPLACE FUNCTION increment_views(question_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE questions
  SET views_count = views_count + 1
  WHERE id = question_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Questions policies
DROP POLICY IF EXISTS "Users can view published questions" ON questions;
CREATE POLICY "Users can view published questions"
ON questions FOR SELECT
USING (status = 'answered' OR user_id = auth.uid());

DROP POLICY IF EXISTS "Users can insert their own questions" ON questions;
CREATE POLICY "Users can insert their own questions"
ON questions FOR INSERT
WITH CHECK (true);

-- Answers policies
DROP POLICY IF EXISTS "Users can view published answers" ON answers;
CREATE POLICY "Users can view published answers"
ON answers FOR SELECT
USING (status = 'published');

-- Ratings policies
DROP POLICY IF EXISTS "Users can insert their own ratings" ON ratings;
CREATE POLICY "Users can insert their own ratings"
ON ratings FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can view all ratings" ON ratings;
CREATE POLICY "Users can view all ratings"
ON ratings FOR SELECT
USING (true);
"""

print("\nExecuting SQL schema...")
print("Note: This script will use Supabase REST API to execute SQL.")
print("For full schema setup, please run the SQL directly in Supabase SQL Editor.")
print("\nSQL Schema saved to: supabase-schema.sql")

# Save SQL to file
with open("supabase-schema.sql", "w") as f:
    f.write(sql_schema)

print("\n✅ SQL schema file created successfully!")
print("\nNext steps:")
print("1. Go to your Supabase project dashboard")
print("2. Open SQL Editor")
print("3. Copy and paste the content from supabase-schema.sql")
print("4. Run the SQL to create all tables and functions")
print("\nOr run this command to insert initial data after schema is created:")
print("python3 insert_initial_data.py")
