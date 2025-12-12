# Panduan Setup User Roles di Supabase
## KUA Pecalungan - Admin & User Role System

**Tanggal**: 11 Desember 2024

---

## 📋 Overview

Sistem ini akan membuat 2 role:
- **Admin**: Full access, bisa manage semua data
- **User**: Limited access, hanya bisa manage data sendiri

## 🚀 Langkah Setup

### Step 1: Buka Supabase SQL Editor

1. Buka **Supabase Dashboard**: https://app.supabase.com
2. Pilih project: **WEBSITEKUA** (`svjcgaeuyojkiksaduxq`)
3. Sidebar kiri → **SQL Editor**
4. Klik **"New query"**

### Step 2: Run SQL Script

1. Copy **SEMUA ISI** dari file `supabase_user_roles_setup.sql`
2. Paste di SQL Editor
3. Klik **"Run"** atau tekan `Ctrl+Enter`
4. Tunggu sampai muncul "Success. No rows returned"

### Step 3: Verifikasi Table Dibuat

1. Sidebar kiri → **Table Editor**
2. Cari table **`user_roles`**
3. Seharusnya ada dengan kolom:
   - `id` (UUID)
   - `user_id` (UUID)
   - `role` (TEXT)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

### Step 4: Buat Admin User

#### Cara 1: Via SQL (Recommended)

1. Sidebar kiri → **Authentication** → **Users**
2. Cari user **kuapecalungan15@gmail.com**
3. **Copy UUID** user tersebut (contoh: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

4. Kembali ke **SQL Editor** → **New query**
5. Run query ini (ganti `USER_UUID_HERE` dengan UUID yang di-copy):

```sql
-- Make kuapecalungan15@gmail.com an admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_UUID_HERE', 'admin')
ON CONFLICT (user_id) 
DO UPDATE SET role = 'admin', updated_at = NOW();
```

6. Klik **Run**

#### Cara 2: Via Table Editor

1. Sidebar kiri → **Table Editor** → **user_roles**
2. Klik **"Insert"** → **Insert row**
3. Isi:
   - `user_id`: [Paste UUID user]
   - `role`: `admin`
4. Klik **Save**

### Step 5: Verifikasi Admin User

Run query ini di SQL Editor:

```sql
-- Check all users and their roles
SELECT 
  u.email,
  ur.role,
  ur.created_at
FROM auth.users u
LEFT JOIN public.user_roles ur ON u.id = ur.user_id
ORDER BY ur.created_at DESC;
```

Seharusnya muncul:
```
email                      | role  | created_at
---------------------------|-------|------------------
kuapecalungan15@gmail.com | admin | 2024-12-11 ...
```

---

## 🎯 Cara Menggunakan di Aplikasi

### 1. Check User Role (TypeScript/JavaScript)

```typescript
import { supabase } from './supabaseClient';

// Get current user role
async function getUserRole() {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', user.id)
    .single();
  
  return data?.role; // 'admin' or 'user'
}

// Check if user is admin
async function isAdmin() {
  const role = await getUserRole();
  return role === 'admin';
}
```

### 2. Protect Admin Routes

```typescript
// In your route guard or middleware
const role = await getUserRole();

if (role !== 'admin') {
  // Redirect to home or show error
  router.push('/');
  return;
}
```

### 3. Conditional Rendering

```tsx
// In React component
const [isAdmin, setIsAdmin] = useState(false);

useEffect(() => {
  checkAdminStatus();
}, []);

async function checkAdminStatus() {
  const role = await getUserRole();
  setIsAdmin(role === 'admin');
}

return (
  <div>
    {isAdmin && (
      <button>Admin Only Button</button>
    )}
  </div>
);
```

---

## 📊 Database Schema

### Table: `user_roles`

| Column | Type | Description |
|--------|------|-------------|
| id | UUID | Primary key |
| user_id | UUID | Foreign key to auth.users |
| role | TEXT | 'admin' or 'user' |
| created_at | TIMESTAMP | Auto-generated |
| updated_at | TIMESTAMP | Auto-updated |

### Functions

| Function | Returns | Description |
|----------|---------|-------------|
| `get_user_role(uuid)` | TEXT | Get role of specific user |
| `is_admin(uuid)` | BOOLEAN | Check if user is admin |
| `handle_new_user()` | TRIGGER | Auto-assign 'user' role to new signups |

---

## 🔒 Row Level Security (RLS)

Policies yang sudah di-setup:

1. **Users can view own role** - User bisa lihat role sendiri
2. **Admins can view all roles** - Admin bisa lihat semua role
3. **Admins can update roles** - Admin bisa update role
4. **Admins can insert roles** - Admin bisa insert role baru
5. **Admins can delete roles** - Admin bisa delete role

---

## 🧪 Testing

### Test 1: Login sebagai Admin

1. Login dengan `kuapecalungan15@gmail.com`
2. Cek di console:
```javascript
const role = await getUserRole();
console.log(role); // Should print 'admin'
```

### Test 2: Create New User

1. Register user baru (contoh: `testuser@gmail.com`)
2. User baru otomatis dapat role 'user'
3. Verifikasi di SQL Editor:
```sql
SELECT email, role FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE email = 'testuser@gmail.com';
```

### Test 3: Admin Access

1. Login sebagai admin
2. Coba akses admin dashboard
3. Seharusnya bisa akses

### Test 4: User Access

1. Login sebagai user biasa
2. Coba akses admin dashboard
3. Seharusnya di-redirect atau error

---

## 🔧 Troubleshooting

### User tidak punya role setelah signup

**Penyebab**: Trigger `on_auth_user_created` tidak jalan

**Solusi**: Manually insert role
```sql
INSERT INTO public.user_roles (user_id, role)
VALUES ('USER_UUID', 'user');
```

### Admin tidak bisa akses admin features

**Penyebab**: Role tidak di-set dengan benar

**Solusi**: Verifikasi role di database
```sql
SELECT * FROM user_roles WHERE user_id = 'ADMIN_UUID';
```

### RLS Policy blocking access

**Penyebab**: Policy terlalu restrictive

**Solusi**: Cek policy di Supabase Dashboard → Authentication → Policies

---

## 📝 Maintenance

### Promote User to Admin

```sql
UPDATE public.user_roles 
SET role = 'admin', updated_at = NOW()
WHERE user_id = 'USER_UUID';
```

### Demote Admin to User

```sql
UPDATE public.user_roles 
SET role = 'user', updated_at = NOW()
WHERE user_id = 'USER_UUID';
```

### List All Admins

```sql
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
JOIN user_roles ur ON u.id = ur.user_id
WHERE ur.role = 'admin'
ORDER BY ur.created_at DESC;
```

### List All Users

```sql
SELECT u.email, ur.role, ur.created_at
FROM auth.users u
LEFT JOIN user_roles ur ON u.id = ur.user_id
ORDER BY ur.created_at DESC;
```

---

## ✅ Checklist

Setelah setup, pastikan:

- [ ] Table `user_roles` sudah dibuat
- [ ] Trigger `on_auth_user_created` aktif
- [ ] Function `get_user_role()` dan `is_admin()` tersedia
- [ ] RLS policies aktif
- [ ] User `kuapecalungan15@gmail.com` sudah jadi admin
- [ ] Test signup user baru (otomatis dapat role 'user')
- [ ] Test admin access di aplikasi
- [ ] Test user access di aplikasi

---

## 🔗 Resources

- **Supabase Dashboard**: https://app.supabase.com
- **Project**: WEBSITEKUA (`svjcgaeuyojkiksaduxq`)
- **SQL Script**: `supabase_user_roles_setup.sql`
- **Supabase RLS Docs**: https://supabase.com/docs/guides/auth/row-level-security

---

**Status**: ⚠️ Perlu dijalankan manual di Supabase SQL Editor
**Next Step**: Run SQL script → Verify → Test di aplikasi
