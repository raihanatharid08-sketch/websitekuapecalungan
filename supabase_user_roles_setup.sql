-- =====================================================
-- SUPABASE USER ROLES SETUP
-- KUA Pecalungan - Role-Based Access Control
-- =====================================================

-- 1. CREATE USER ROLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_roles_role ON public.user_roles(role);

-- 2. CREATE FUNCTION TO AUTO-ASSIGN DEFAULT ROLE
-- =====================================================
-- This function automatically assigns 'user' role to new signups
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. CREATE TRIGGER FOR AUTO-ASSIGN ROLE
-- =====================================================
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 4. CREATE FUNCTION TO CHECK USER ROLE
-- =====================================================
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid;
$$ LANGUAGE sql SECURITY DEFINER;

-- 5. CREATE FUNCTION TO CHECK IF USER IS ADMIN
-- =====================================================
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
$$ LANGUAGE sql SECURITY DEFINER;

-- 6. ENABLE ROW LEVEL SECURITY (RLS)
-- =====================================================
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- 7. CREATE RLS POLICIES FOR USER_ROLES TABLE
-- =====================================================

-- Policy: Users can view their own role
CREATE POLICY "Users can view own role"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Admins can view all roles
CREATE POLICY "Admins can view all roles"
  ON public.user_roles
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can update roles
CREATE POLICY "Admins can update roles"
  ON public.user_roles
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can insert roles
CREATE POLICY "Admins can insert roles"
  ON public.user_roles
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Policy: Admins can delete roles
CREATE POLICY "Admins can delete roles"
  ON public.user_roles
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- 8. INSERT ADMIN USER MANUALLY
-- =====================================================
-- Replace 'USER_UUID_HERE' with the actual UUID of the user you want to make admin
-- You can find user UUID in Supabase Dashboard → Authentication → Users

-- Example: Make kuapecalungan15@gmail.com an admin
-- First, get the user UUID from auth.users table, then run:

-- INSERT INTO public.user_roles (user_id, role)
-- VALUES ('USER_UUID_HERE', 'admin')
-- ON CONFLICT (user_id) DO UPDATE SET role = 'admin';

-- Or update existing user to admin:
-- UPDATE public.user_roles SET role = 'admin' WHERE user_id = 'USER_UUID_HERE';

-- 9. GRANT PERMISSIONS
-- =====================================================
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.user_roles TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin TO authenticated;

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check all users and their roles:
-- SELECT 
--   u.email,
--   ur.role,
--   ur.created_at
-- FROM auth.users u
-- LEFT JOIN public.user_roles ur ON u.id = ur.user_id
-- ORDER BY ur.created_at DESC;

-- Check if specific user is admin:
-- SELECT public.is_admin('USER_UUID_HERE');

-- Get user role:
-- SELECT public.get_user_role('USER_UUID_HERE');

-- =====================================================
-- NOTES
-- =====================================================
-- 1. All new users will automatically get 'user' role
-- 2. To make someone admin, manually update their role in user_roles table
-- 3. Admins can manage all roles
-- 4. Users can only view their own role
-- 5. Use is_admin() function in your application to check admin access
