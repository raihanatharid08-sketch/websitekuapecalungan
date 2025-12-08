-- ============================================
-- KUA Pecalungan - Complete Supabase Schema
-- ============================================
-- Run this SQL in your Supabase SQL Editor
-- Dashboard > SQL Editor > New Query > Paste and Run
-- ============================================

-- 1. CREATE TABLES
-- ============================================

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

-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status);
CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category_id);
CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_answers_question ON answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_status ON answers(status);
CREATE INDEX IF NOT EXISTS idx_answers_published_at ON answers(published_at DESC);

-- 3. CREATE FUNCTIONS
-- ============================================

-- Function to increment question views
CREATE OR REPLACE FUNCTION increment_views(question_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE questions
  SET views_count = views_count + 1
  WHERE id = question_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO anon;

-- 4. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE madhabs ENABLE ROW LEVEL SECURITY;

-- 5. CREATE RLS POLICIES
-- ============================================

-- Categories policies (public read)
DROP POLICY IF EXISTS "Anyone can view categories" ON categories;
CREATE POLICY "Anyone can view categories"
ON categories FOR SELECT
USING (true);

-- Madhabs policies (public read)
DROP POLICY IF EXISTS "Anyone can view madhabs" ON madhabs;
CREATE POLICY "Anyone can view madhabs"
ON madhabs FOR SELECT
USING (true);

-- Questions policies
DROP POLICY IF EXISTS "Users can view published questions" ON questions;
CREATE POLICY "Users can view published questions"
ON questions FOR SELECT
USING (status = 'answered' OR user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can insert questions" ON questions;
CREATE POLICY "Anyone can insert questions"
ON questions FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Users can update own questions" ON questions;
CREATE POLICY "Users can update own questions"
ON questions FOR UPDATE
USING (user_id = auth.uid());

-- Answers policies
DROP POLICY IF EXISTS "Users can view published answers" ON answers;
CREATE POLICY "Users can view published answers"
ON answers FOR SELECT
USING (status = 'published');

DROP POLICY IF EXISTS "Admins can insert answers" ON answers;
CREATE POLICY "Admins can insert answers"
ON answers FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Admins can update own answers" ON answers;
CREATE POLICY "Admins can update own answers"
ON answers FOR UPDATE
USING (admin_id = auth.uid());

-- Ratings policies
DROP POLICY IF EXISTS "Anyone can insert ratings" ON ratings;
CREATE POLICY "Anyone can insert ratings"
ON ratings FOR INSERT
WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can view ratings" ON ratings;
CREATE POLICY "Anyone can view ratings"
ON ratings FOR SELECT
USING (true);

-- 6. INSERT INITIAL DATA
-- ============================================

-- Insert categories
INSERT INTO categories (name, description, display_order) VALUES
('Ibadah', 'Pertanyaan tentang ibadah dan ritual Islam', 1),
('Muamalah', 'Pertanyaan tentang transaksi dan hukum perdata', 2),
('Keluarga', 'Pertanyaan tentang keluarga dan pernikahan', 3),
('Tauhid', 'Pertanyaan tentang akidah dan kepercayaan', 4),
('Lainnya', 'Pertanyaan lainnya', 5)
ON CONFLICT (name) DO NOTHING;

-- Insert madhabs
INSERT INTO madhabs (name, description) VALUES
('Syafi''i', 'Madhab Syafi''i - dominan di Indonesia'),
('Hanafi', 'Madhab Hanafi'),
('Maliki', 'Madhab Maliki'),
('Hanbali', 'Madhab Hanbali')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Verify all tables are created in Table Editor
-- 2. Test the application by submitting a question
-- 3. Access admin panel to manage questions
-- ============================================
