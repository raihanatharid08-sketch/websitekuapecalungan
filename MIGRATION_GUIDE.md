# Migration Guide - Privacy System Update

Panduan untuk menjalankan database migration untuk sistem privacy (public FAQ + private questions).

## ⚠️ Penting: Urutan Eksekusi

Migration harus dijalankan dalam urutan yang benar:
1. **migration-01-add-privacy-fields.sql** - Menambahkan kolom baru
2. **migration-02-update-policies.sql** - Update RLS policies

## Langkah-Langkah Migration

### Step 1: Backup Database (Opsional tapi Disarankan)

1. Buka Supabase Dashboard → Database → Backups
2. Klik "Create Backup" untuk membuat backup manual
3. Tunggu hingga backup selesai

### Step 2: Jalankan Migration 01

1. **Buka SQL Editor**
   - Login ke [app.supabase.com](https://app.supabase.com)
   - Pilih project Anda
   - Klik "SQL Editor" di sidebar

2. **Copy SQL Migration 01**
   - Buka file `migration-01-add-privacy-fields.sql`
   - Copy seluruh isi file

3. **Paste dan Run**
   - Paste ke SQL Editor
   - Klik "Run" atau tekan `Ctrl+Enter`
   - Tunggu hingga selesai

4. **Verifikasi Hasil**
   - Anda akan melihat hasil query di bagian bawah
   - Harus menampilkan 2 rows:
     ```
     column_name    | data_type          | is_nullable | column_default
     ---------------|--------------------|--------------|-----------------
     access_token   | character varying  | YES         | NULL
     is_public      | boolean            | YES         | false
     ```

5. **Cek di Table Editor**
   - Klik "Table Editor" → pilih tabel "questions"
   - Scroll ke kanan, harus ada kolom baru:
     - `is_public` (boolean)
     - `access_token` (text)
   - Semua row existing harus punya `is_public = false` dan `access_token` berisi UUID

### Step 3: Jalankan Migration 02

1. **Copy SQL Migration 02**
   - Buka file `migration-02-update-policies.sql`
   - Copy seluruh isi file

2. **Paste dan Run**
   - Paste ke SQL Editor (bisa di tab yang sama atau new query)
   - Klik "Run" atau tekan `Ctrl+Enter`
   - Tunggu hingga selesai

3. **Verifikasi Policies**
   - Hasil query akan menampilkan list policies
   - Harus ada 2 policies baru:
     - `Anyone can view public FAQ questions`
     - `Anyone can view questions via access token`

4. **Cek di Table Editor**
   - Klik tabel "questions" → tab "Policies"
   - Harus ada policies untuk SELECT dengan kondisi:
     - Policy 1: `is_public = true AND status = 'answered'`
     - Policy 2: `true` (allow all for token-based access)

### Step 4: Test Aplikasi

1. **Test Submit Pertanyaan**
   ```
   1. Buka http://localhost:3000/submit-question
   2. Isi form dan submit
   3. Harus muncul success page dengan access link
   4. Copy access link tersebut
   ```

2. **Test Private Access**
   ```
   1. Paste access link di browser
   2. Harus bisa melihat pertanyaan Anda
   3. Status: "Menunggu Verifikasi"
   ```

3. **Test FAQ Page**
   ```
   1. Buka http://localhost:3000/qa
   2. Harus kosong (karena belum ada FAQ public)
   3. Pesan: "Belum ada FAQ yang dipublikasikan"
   ```

4. **Test Admin Toggle**
   ```
   1. Login ke admin panel: http://localhost:3000/admin
   2. Pilih pertanyaan yang sudah dijawab
   3. Klik "Jadikan FAQ"
   4. Buka /qa lagi, pertanyaan harus muncul di FAQ
   ```

## Troubleshooting

### Error: "column already exists"

**Penyebab**: Migration 01 sudah pernah dijalankan sebelumnya.

**Solusi**: Skip migration 01, langsung jalankan migration 02.

### Error: "policy already exists"

**Penyebab**: Migration 02 sudah pernah dijalankan.

**Solusi**: 
```sql
-- Drop policies dulu, lalu jalankan ulang migration 02
DROP POLICY IF EXISTS "Anyone can view public FAQ questions" ON questions;
DROP POLICY IF EXISTS "Anyone can view questions via access token" ON questions;
```

### Questions tidak muncul di /qa setelah toggle

**Penyebab**: Cache atau RLS policy belum aktif.

**Solusi**:
1. Refresh browser dengan hard reload (Ctrl+Shift+R)
2. Cek di Table Editor apakah `is_public = true`
3. Cek di SQL Editor:
   ```sql
   SELECT id, title, is_public, status 
   FROM questions 
   WHERE is_public = true;
   ```

### Access token link tidak bisa dibuka

**Penyebab**: RLS policy terlalu ketat atau access_token tidak valid.

**Solusi**:
1. Cek apakah migration 02 sudah dijalankan
2. Test query di SQL Editor:
   ```sql
   SELECT id, title, access_token 
   FROM questions 
   WHERE access_token = 'YOUR_TOKEN_HERE';
   ```
3. Jika tidak ada hasil, token tidak valid atau sudah dihapus

### Existing questions tidak punya access_token

**Penyebab**: Migration 01 tidak menggenerate token untuk existing data.

**Solusi**: Jalankan query ini di SQL Editor:
```sql
UPDATE questions 
SET access_token = gen_random_uuid()::text 
WHERE access_token IS NULL;
```

## Rollback (Jika Diperlukan)

Jika ingin membatalkan migration:

```sql
-- 1. Drop new policies
DROP POLICY IF EXISTS "Anyone can view public FAQ questions" ON questions;
DROP POLICY IF EXISTS "Anyone can view questions via access token" ON questions;

-- 2. Restore old policy
CREATE POLICY "Users can view published questions"
ON questions FOR SELECT
USING (status = 'answered');

-- 3. Remove new columns (HATI-HATI: Data akan hilang!)
ALTER TABLE questions 
DROP COLUMN IF EXISTS is_public,
DROP COLUMN IF EXISTS access_token;
```

## Verifikasi Final

Setelah semua migration selesai, jalankan query ini untuk verifikasi:

```sql
-- Check columns
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'questions'
ORDER BY ordinal_position;

-- Check policies
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'questions';

-- Check data
SELECT 
  COUNT(*) as total_questions,
  COUNT(CASE WHEN is_public = true THEN 1 END) as public_faqs,
  COUNT(CASE WHEN is_public = false THEN 1 END) as private_questions,
  COUNT(CASE WHEN access_token IS NULL THEN 1 END) as missing_tokens
FROM questions;
```

Expected results:
- Columns: harus ada `is_public` dan `access_token`
- Policies: harus ada 2 policies baru
- Data: `missing_tokens` harus = 0

## Support

Jika masih ada error:
1. Screenshot error message
2. Copy query yang dijalankan
3. Cek Supabase Dashboard → Logs untuk detail error
