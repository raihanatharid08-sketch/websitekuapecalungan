-- Function to increment question views
CREATE OR REPLACE FUNCTION increment_views(question_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE questions
  SET views_count = views_count + 1
  WHERE id = question_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION increment_views(UUID) TO anon;
