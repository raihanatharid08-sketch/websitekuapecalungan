-- ============================================
-- MIGRATION 03: Create Admin User
-- ============================================
-- This migration creates the admin user account
-- Email: kuapecalungan15@gmail.com
-- Password: (will be set via Supabase Dashboard)

-- Note: You CANNOT create users directly via SQL in Supabase
-- Users must be created through:
-- 1. Supabase Dashboard → Authentication → Users → "Add user"
-- 2. Or via Supabase Auth API

-- This file documents the admin user that needs to be created manually

/*
MANUAL STEPS TO CREATE ADMIN USER:

1. Open Supabase Dashboard
   - Go to https://app.supabase.com
   - Select your project

2. Navigate to Authentication
   - Click "Authentication" in the sidebar
   - Click "Users" tab

3. Add New User
   - Click "Add user" button
   - Select "Create new user"
   
4. Fill in User Details:
   - Email: kuapecalungan15@gmail.com
   - Password: (choose a strong password)
   - Email Confirm: Yes (check the box to auto-confirm)
   - Click "Create user"

5. Save the Password
   - Write down the password securely
   - You'll need it to login to /login page

6. Verify User Created
   - User should appear in the users list
   - Status should be "Confirmed"
   - Email should be "kuapecalungan15@gmail.com"

7. Test Login
   - Go to your website /login
   - Enter email: kuapecalungan15@gmail.com
   - Enter the password you set
   - Click "Masuk"
   - Should redirect to /admin dashboard

ALTERNATIVE: Create via Supabase CLI (if installed)
```bash
supabase auth users create kuapecalungan15@gmail.com --password YOUR_PASSWORD
```

SECURITY NOTES:
- Use a strong password (min 8 characters, mix of upper/lower/numbers/symbols)
- Store password in a secure password manager
- Enable 2FA in Supabase Dashboard for extra security
- Never commit passwords to git
*/

-- Verification Query (run after creating user)
-- This will show the admin user if created successfully
SELECT 
  id,
  email,
  created_at,
  confirmed_at,
  email_confirmed_at
FROM auth.users
WHERE email = 'kuapecalungan15@gmail.com';
