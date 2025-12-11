# Supabase Setup Guide - KUA Pecalungan

Panduan lengkap untuk setup database Supabase untuk aplikasi KUA Pecalungan.

## Prerequisites

- Akun Supabase (gratis di [supabase.com](https://supabase.com))
- Project Supabase sudah dibuat
- Sudah mendapatkan `SUPABASE_URL` dan `SUPABASE_ANON_KEY`

## Langkah 1: Setup Database Schema

### Opsi A: Menggunakan SQL Editor (Recommended)

1. **Buka Supabase Dashboard**
   - Login ke [app.supabase.com](https://app.supabase.com)
   - Pilih project Anda

2. **Buka SQL Editor**
   - Klik menu "SQL Editor" di sidebar kiri
   - Klik tombol "+ New Query"

3. **Copy dan Paste SQL Schema**
   - Buka file `supabase-complete-schema.sql`
   - Copy seluruh isi file
   - Paste ke SQL Editor

4. **Jalankan SQL**
   - Klik tombol "Run" atau tekan `Ctrl+Enter`
   - Tunggu hingga selesai (biasanya < 5 detik)
   - Anda akan melihat pesan "Success. No rows returned"

5. **Verifikasi**
   - Klik menu "Table Editor" di sidebar
   - Anda harus melihat 6 tabel baru:
     - `categories` (5 rows)
     - `madhabs` (4 rows)
     - `questions` (0 rows - akan terisi saat user submit)
     - `answers` (0 rows)
     - `ratings` (0 rows)
     - `attachments` (0 rows)

### Opsi B: Menggunakan Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
supabase link --project-ref YOUR_PROJECT_REF

# Run migration
supabase db push
```

## Langkah 2: Verifikasi Database

### 1. Cek Tabel

Di Table Editor, pastikan semua tabel sudah dibuat:

| Table Name | Columns | Initial Rows |
|------------|---------|--------------|
| categories | id, name, description, icon, display_order, created_at | 5 |
| madhabs | id, name, description, created_at | 4 |
| questions | id, user_id, title, description, category_id, status, urgency_level, contact_email, views_count, created_at, updated_at | 0 |
| answers | id, question_id, admin_id, content, madhab_id, sources, status, created_at, published_at, updated_at | 0 |
| ratings | id, answer_id, user_id, rating, is_helpful, created_at | 0 |
| attachments | id, question_id, file_path, file_name, file_size, file_type, created_at | 0 |

### 2. Cek Functions

Di SQL Editor, jalankan:

```sql
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'increment_views';
```

Harus mengembalikan 1 row: `increment_views`

### 3. Cek RLS Policies

Di Table Editor, klik setiap tabel dan cek tab "Policies":

- **categories**: 1 policy (SELECT for all)
- **madhabs**: 1 policy (SELECT for all)
- **questions**: 3 policies (SELECT, INSERT, UPDATE)
- **answers**: 3 policies (SELECT, INSERT, UPDATE)
- **ratings**: 2 policies (SELECT, INSERT)

## Langkah 3: Test Koneksi dari Aplikasi

### 1. Set Environment Variables

Pastikan file `.env` sudah berisi:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Restart Development Server

```bash
cd /home/ubuntu/kuape-calungan
pnpm dev
```

### 3. Test di Browser

1. **Test Submit Question**
   - Buka `http://localhost:3000/submit-question`
   - Isi form dan submit
   - Cek di Supabase Table Editor > questions (harus ada 1 row baru)

2. **Test Q&A List**
   - Buka `http://localhost:3000/qa`
   - Harus kosong (karena belum ada pertanyaan yang dijawab)

3. **Test Admin Panel**
   - Buka `http://localhost:3000/admin`
   - Login dengan akun Supabase Anda
   - Harus melihat dashboard dengan statistik

## Langkah 4: Setup Authentication (Optional)

Jika ingin mengaktifkan autentikasi:

### 1. Enable Email Auth

Di Supabase Dashboard:
- Klik "Authentication" > "Providers"
- Enable "Email"
- Klik "Save"

### 2. Create Admin User

Di SQL Editor:

```sql
-- Create admin user (ganti dengan email Anda)
INSERT INTO auth.users (
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  'admin@kuapecalungan.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"role":"admin"}',
  NOW(),
  NOW(),
  'authenticated'
);
```

### 3. Test Login

- Buka `http://localhost:3000/admin`
- Login dengan:
  - Email: `admin@kuapecalungan.com`
  - Password: `password123`

## Troubleshooting

### Error: "relation does not exist"

**Solusi**: Tabel belum dibuat. Jalankan ulang SQL schema.

### Error: "permission denied for table"

**Solusi**: RLS policies belum dibuat. Jalankan bagian RLS dari SQL schema.

### Error: "function increment_views does not exist"

**Solusi**: Function belum dibuat. Jalankan bagian Functions dari SQL schema.

### Questions tidak muncul di /qa

**Penyebab**: Pertanyaan masih berstatus "submitted", belum "answered".

**Solusi**: 
1. Buka admin panel
2. Pilih pertanyaan
3. Klik "Jawab"
4. Isi jawaban dan klik "Publikasikan Jawaban"

### Admin panel tidak bisa login

**Penyebab**: User belum dibuat atau email auth belum diaktifkan.

**Solusi**: Ikuti Langkah 4 di atas.

## Database Schema Diagram

```
categories
├── id (PK)
├── name
├── description
├── icon
├── display_order
└── created_at

madhabs
├── id (PK)
├── name
├── description
└── created_at

questions
├── id (PK)
├── user_id (FK → auth.users)
├── title
├── description
├── category_id (FK → categories)
├── status
├── urgency_level
├── contact_email
├── views_count
├── created_at
└── updated_at

answers
├── id (PK)
├── question_id (FK → questions)
├── admin_id (FK → auth.users)
├── content
├── madhab_id (FK → madhabs)
├── sources (JSONB)
├── status
├── created_at
├── published_at
└── updated_at

ratings
├── id (PK)
├── answer_id (FK → answers)
├── user_id (FK → auth.users)
├── rating
├── is_helpful
└── created_at

attachments
├── id (PK)
├── question_id (FK → questions)
├── file_path
├── file_name
├── file_size
├── file_type
└── created_at
```

## Next Steps

Setelah database setup selesai:

1. ✅ Test submit pertanyaan dari user panel
2. ✅ Test jawab pertanyaan dari admin panel
3. ✅ Test rating system
4. ✅ Deploy ke Vercel (lihat `DEPLOYMENT.md`)

## Support

Jika mengalami masalah:
1. Cek Supabase Dashboard > Logs
2. Cek Browser Console untuk error
3. Cek Network tab untuk failed requests
