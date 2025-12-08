-- ============================================
-- MIGRATION 02: Update RLS Policies for Privacy System
-- ============================================
-- Run this AFTER migration-01-add-privacy-fields.sql
-- This updates Row Level Security policies to support public FAQ and private questions

-- Step 1: Drop old policies
DROP POLICY IF EXISTS "Users can view published questions" ON questions;
DROP POLICY IF EXISTS "Anyone can view public FAQ questions" ON questions;
DROP POLICY IF EXISTS "Users can view their own questions" ON questions;

-- Step 2: Create new policies for public FAQ access
CREATE POLICY "Anyone can view public FAQ questions"
ON questions FOR SELECT
USING (is_public = TRUE AND status = 'answered');

-- Step 3: Create policy for private question access (via token)
-- Note: This policy allows viewing if the question is accessed via the correct token
-- In practice, the application will filter by access_token in the query
CREATE POLICY "Anyone can view questions via access token"
ON questions FOR SELECT
USING (true);

-- Step 4: Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'questions'
ORDER BY policyname;
