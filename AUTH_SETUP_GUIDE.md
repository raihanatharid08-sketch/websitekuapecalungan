# Authentication Setup Guide

Panduan lengkap untuk setup Supabase Authentication dan membuat admin user.

## Overview

Website ini menggunakan **Supabase Auth** untuk autentikasi admin panel. Hanya admin yang sudah login yang bisa mengakses `/admin` routes.

## Features

✅ **Email/Password Authentication** via Supabase Auth  
✅ **Protected Admin Routes** - redirect ke `/login` jika belum login  
✅ **Session Management** - auto login jika session masih valid  
✅ **Logout Functionality** - clear session dan redirect ke login  
✅ **Loading States** - tampilkan loading saat check auth status  

## Setup Steps

### Step 1: Verify Supabase Auth is Enabled

1. **Open Supabase Dashboard**
   - Go to [app.supabase.com](https://app.supabase.com)
   - Select your project

2. **Check Authentication Settings**
   - Click "Authentication" → "Providers"
   - Ensure "Email" provider is **enabled** (should be enabled by default)
   - If disabled, toggle it on

3. **Configure Email Templates (Optional)**
   - Click "Authentication" → "Email Templates"
   - Customize confirmation and reset password emails
   - Use your domain for better branding

### Step 2: Create Admin User

#### Method 1: Via Supabase Dashboard (Recommended)

1. **Navigate to Users**
   ```
   Dashboard → Authentication → Users → "Add user" button
   ```

2. **Fill User Details**
   ```
   Email: kuapecalungan15@gmail.com
   Password: [Choose a strong password]
   ✓ Auto Confirm User (check this box)
   ```

3. **Create User**
   - Click "Create user"
   - User will appear in the list immediately
   - Status should show "Confirmed"

4. **Save Credentials**
   ```
   Email: kuapecalungan15@gmail.com
   Password: [Your chosen password]
   ```
   **⚠️ Important**: Write down the password securely!

#### Method 2: Via Supabase CLI (Alternative)

If you have Supabase CLI installed:

```bash
# Login to Supabase CLI
supabase login

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Create admin user
supabase auth users create kuapecalungan15@gmail.com --password "YOUR_STRONG_PASSWORD"
```

### Step 3: Verify Admin User

Run this query in **SQL Editor**:

```sql
SELECT 
  id,
  email,
  created_at,
  confirmed_at,
  email_confirmed_at,
  last_sign_in_at
FROM auth.users
WHERE email = 'kuapecalungan15@gmail.com';
```

Expected result:
- 1 row returned
- `email` = kuapecalungan15@gmail.com
- `confirmed_at` and `email_confirmed_at` should have timestamps (not NULL)

### Step 4: Test Login

1. **Open Login Page**
   ```
   http://localhost:3000/login
   ```

2. **Enter Credentials**
   ```
   Email: kuapecalungan15@gmail.com
   Password: [Your password]
   ```

3. **Click "Masuk"**
   - Should show "Login berhasil!" toast
   - Redirect to `/admin` dashboard
   - See admin email in top right corner

4. **Test Protected Routes**
   ```
   Try accessing:
   - /admin → Should work (you're logged in)
   - /admin/questions → Should work
   ```

5. **Test Logout**
   - Click logout button (top right)
   - Should show "Logout berhasil!" toast
   - Redirect to `/login`
   - Try accessing `/admin` → Should redirect to `/login`

## Authentication Flow

### Login Flow

```
User visits /login
  ↓
Enter email & password
  ↓
Click "Masuk"
  ↓
Call supabase.auth.signInWithPassword()
  ↓
Success → Redirect to /admin
Fail → Show error toast
```

### Protected Route Flow

```
User visits /admin/*
  ↓
AdminLayout checks auth state
  ↓
If loading → Show loading spinner
If not logged in → Redirect to /login
If logged in → Show admin panel
```

### Logout Flow

```
User clicks logout button
  ↓
Call supabase.auth.signOut()
  ↓
Clear session
  ↓
Show success toast
  ↓
Redirect to /login
```

## File Structure

```
client/src/
├── contexts/
│   └── AuthContext.tsx          # Auth state management
├── pages/
│   └── Login.tsx                # Login page
├── components/
│   └── AdminLayout.tsx          # Protected layout wrapper
└── App.tsx                      # AuthProvider wrapper
```

## Key Components

### AuthContext

Provides auth state and methods to entire app:

```tsx
const { user, session, loading, signIn, signOut } = useAuth();
```

- `user`: Current logged in user (null if not logged in)
- `session`: Current session object
- `loading`: true while checking auth status
- `signIn(email, password)`: Login function
- `signOut()`: Logout function

### AdminLayout

Wraps all admin routes and checks authentication:

```tsx
<AdminLayout>
  <AdminDashboard />
</AdminLayout>
```

Features:
- Redirects to `/login` if not authenticated
- Shows loading state while checking auth
- Displays logout button
- Shows user email in header

### Login Page

Simple login form at `/login`:

- Email input
- Password input
- Submit button with loading state
- Auto-redirect if already logged in

## Security Best Practices

### Password Requirements

Use a strong password with:
- Minimum 8 characters
- Mix of uppercase and lowercase
- At least one number
- At least one special character

Example: `KuaPc@2024!Secure`

### Row Level Security (RLS)

Currently, admin routes are protected by:
1. **Frontend auth check** in AdminLayout
2. **Supabase RLS policies** on database tables

For production, ensure RLS policies check user role:

```sql
-- Example: Only allow authenticated users to insert answers
CREATE POLICY "Only authenticated users can insert answers"
ON answers FOR INSERT
TO authenticated
USING (true);
```

### Environment Variables

Ensure these are set in production:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**⚠️ Never commit** `.env` file to git!

## Troubleshooting

### Error: "Invalid login credentials"

**Cause**: Wrong email or password

**Solution**:
1. Double-check email: `kuapecalungan15@gmail.com`
2. Verify password (case-sensitive)
3. Check user exists in Supabase Dashboard → Authentication → Users

### Error: "Email not confirmed"

**Cause**: User created without auto-confirm

**Solution**:
1. Go to Supabase Dashboard → Authentication → Users
2. Find user `kuapecalungan15@gmail.com`
3. Click user → "Confirm email"
4. Or recreate user with "Auto Confirm User" checked

### Redirect Loop (keeps going to /login)

**Cause**: Session not persisting

**Solution**:
1. Clear browser cache and cookies
2. Check browser console for errors
3. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct
4. Try incognito/private browsing mode

### "Silakan login terlebih dahulu" toast keeps appearing

**Cause**: Auth state not loading properly

**Solution**:
1. Check browser console for Supabase errors
2. Verify Supabase credentials in `.env`
3. Check network tab for failed auth requests
4. Restart dev server: `pnpm dev`

### Cannot access /admin after login

**Cause**: Routing issue or auth state not updating

**Solution**:
1. Hard refresh browser (Ctrl+Shift+R)
2. Check browser console for errors
3. Verify user is logged in:
   ```tsx
   console.log('User:', user);
   ```
4. Check AdminLayout is receiving user prop

### Logout button not working

**Cause**: signOut function not called properly

**Solution**:
1. Check browser console for errors
2. Verify AuthContext is providing signOut
3. Try manual logout:
   ```tsx
   await supabase.auth.signOut();
   window.location.href = '/login';
   ```

## Adding More Admin Users

To add additional admin users:

1. **Via Dashboard**
   ```
   Authentication → Users → Add user
   Email: newadmin@example.com
   Password: [strong password]
   ✓ Auto Confirm User
   ```

2. **Via SQL** (after user created)
   ```sql
   -- Verify new user
   SELECT email, confirmed_at 
   FROM auth.users 
   WHERE email = 'newadmin@example.com';
   ```

## Role-Based Access Control (Future Enhancement)

For multiple admin roles (super admin, moderator, etc.):

1. **Create roles table**
   ```sql
   CREATE TABLE user_roles (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     user_id UUID REFERENCES auth.users(id),
     role VARCHAR(50) NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Assign roles**
   ```sql
   INSERT INTO user_roles (user_id, role)
   SELECT id, 'super_admin'
   FROM auth.users
   WHERE email = 'kuapecalungan15@gmail.com';
   ```

3. **Check role in AdminLayout**
   ```tsx
   const { data: userRole } = await supabase
     .from('user_roles')
     .select('role')
     .eq('user_id', user.id)
     .single();
   ```

## Support

If you encounter issues:

1. Check Supabase Dashboard → Logs for error details
2. Review browser console for client-side errors
3. Verify all environment variables are set correctly
4. Ensure Supabase Auth provider is enabled

## References

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Auth with React](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
