-- ============================================
-- MIGRATION 01: Add Privacy Fields to Questions Table
-- ============================================
-- Run this FIRST before running migration-02
-- This adds is_public and access_token columns to existing questions table

-- Step 1: Add new columns
ALTER TABLE questions 
ADD COLUMN IF NOT EXISTS is_public BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS access_token VARCHAR(255) UNIQUE;

-- Step 2: Generate access tokens for existing questions
UPDATE questions 
SET access_token = gen_random_uuid()::text 
WHERE access_token IS NULL;

-- Step 3: Create indexes for new columns
CREATE INDEX IF NOT EXISTS idx_questions_is_public ON questions(is_public);
CREATE INDEX IF NOT EXISTS idx_questions_access_token ON questions(access_token);

-- Verification: Check if columns exist
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'questions' 
AND column_name IN ('is_public', 'access_token')
ORDER BY column_name;
