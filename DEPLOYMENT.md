# Panduan Deployment ke Vercel

## 📋 Persiapan

Pastikan Anda sudah:
- ✅ Memiliki akun Vercel (gratis di https://vercel.com)
- ✅ Code sudah di-push ke GitHub repository: `raihanatharid08-sketch/websitekuapecalungan`
- ✅ Memiliki kredensial Supabase (URL dan Anon Key)

## 🚀 Metode 1: Vercel Dashboard (Recommended)

### Langkah 1: Login ke Vercel
1. Buka https://vercel.com
2. Login dengan akun GitHub Anda

### Langkah 2: Import Project
1. Klik tombol **"Add New Project"**
2. Pilih **"Import Git Repository"**
3. Cari dan pilih repository: `raihanatharid08-sketch/websitekuapecalungan`
4. Klik **"Import"**

### Langkah 3: Configure Project
Di halaman konfigurasi project:

**Build & Development Settings:**
- Framework Preset: `Other`
- Build Command: `pnpm build`
- Output Directory: `dist/public`
- Install Command: `pnpm install`
- Development Command: `pnpm dev`

### Langkah 4: Environment Variables
Klik **"Environment Variables"** dan tambahkan:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://xxxxx.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` | Production, Preview, Development |

**Cara mendapatkan kredensial Supabase:**
1. Login ke https://supabase.com
2. Pilih project Anda
3. Buka Settings > API
4. Salin **Project URL** dan **anon/public key**

### Langkah 5: Deploy
1. Klik tombol **"Deploy"**
2. Tunggu proses build selesai (sekitar 2-3 menit)
3. Setelah selesai, Anda akan mendapatkan URL deployment seperti: `https://websitekuapecalungan.vercel.app`

### Langkah 6: Verifikasi Deployment
1. Buka URL deployment
2. Pastikan landing page muncul dengan benar
3. Test navigasi dan interaksi

---

## 🔧 Metode 2: Vercel CLI

### Langkah 1: Login ke Vercel CLI
```bash
cd /home/ubuntu/kuape-calungan
npx vercel login
```

Ikuti instruksi untuk login (akan membuka browser atau memberikan kode verifikasi).

### Langkah 2: Deploy ke Preview
```bash
npx vercel
```

Jawab pertanyaan yang muncul:
- Set up and deploy? **Y**
- Which scope? Pilih akun Anda
- Link to existing project? **N**
- What's your project's name? **websitekuapecalungan**
- In which directory is your code located? **.**
- Want to override the settings? **N**

### Langkah 3: Tambahkan Environment Variables
```bash
npx vercel env add VITE_SUPABASE_URL
# Paste nilai Supabase URL Anda

npx vercel env add VITE_SUPABASE_ANON_KEY
# Paste nilai Supabase Anon Key Anda
```

Pilih environment: **Production, Preview, Development** (pilih semua dengan spasi)

### Langkah 4: Deploy ke Production
```bash
npx vercel --prod
```

---

## 🔄 Automatic Deployments (Git Integration)

Setelah deployment pertama berhasil, Vercel akan otomatis:
- ✅ Deploy setiap push ke branch `main` (Production)
- ✅ Deploy setiap pull request (Preview)
- ✅ Mengirim notifikasi deployment ke GitHub

Untuk push perubahan baru:
```bash
git add .
git commit -m "Your commit message"
git push github main
```

Vercel akan otomatis mendeteksi dan deploy perubahan tersebut.

---

## 🗄️ Setup Database Supabase

Jika belum setup database, jalankan SQL berikut di Supabase SQL Editor:

```sql
-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(255),
  display_order INT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (name, description, display_order) VALUES
('Ibadah', 'Pertanyaan tentang ibadah dan ritual Islam', 1),
('Muamalah', 'Pertanyaan tentang transaksi dan hukum perdata', 2),
('Keluarga', 'Pertanyaan tentang keluarga dan pernikahan', 3),
('Tauhid', 'Pertanyaan tentang akidah dan kepercayaan', 4),
('Lainnya', 'Pertanyaan lainnya', 5);

-- Madhabs Table
CREATE TABLE madhabs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO madhabs (name, description) VALUES
('Syafi''i', 'Madhab Syafi''i - dominan di Indonesia'),
('Hanafi', 'Madhab Hanafi'),
('Maliki', 'Madhab Maliki'),
('Hanbali', 'Madhab Hanbali');

-- Questions Table
CREATE TABLE questions (
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

CREATE INDEX idx_questions_status ON questions(status);
CREATE INDEX idx_questions_category ON questions(category_id);
CREATE INDEX idx_questions_created_at ON questions(created_at DESC);

-- Answers Table
CREATE TABLE answers (
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

CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_answers_status ON answers(status);
CREATE INDEX idx_answers_published_at ON answers(published_at DESC);

-- Ratings Table
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  answer_id UUID NOT NULL REFERENCES answers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  is_helpful BOOLEAN,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(answer_id, user_id)
);

-- Attachments Table
CREATE TABLE attachments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
  file_path VARCHAR(255) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_size INT,
  file_type VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;

-- Questions policies
CREATE POLICY "Users can view published questions"
ON questions FOR SELECT
USING (status = 'answered' OR user_id = auth.uid());

CREATE POLICY "Users can insert their own questions"
ON questions FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Answers policies
CREATE POLICY "Users can view published answers"
ON answers FOR SELECT
USING (status = 'published');

-- Ratings policies
CREATE POLICY "Users can insert their own ratings"
ON ratings FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view all ratings"
ON ratings FOR SELECT
USING (true);
```

---

## 🔍 Troubleshooting

### Build Error: "Command failed"
- Pastikan `pnpm build` berjalan sukses di local
- Check build logs di Vercel dashboard
- Pastikan semua dependencies terinstall

### Environment Variables Not Working
- Pastikan nama variable exact match (case-sensitive)
- Redeploy setelah menambahkan environment variables
- Check di Vercel dashboard > Settings > Environment Variables

### Supabase Connection Error
- Verifikasi VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY benar
- Pastikan Supabase project aktif
- Check CORS settings di Supabase (allow Vercel domain)

### 404 on Page Refresh
- Sudah ditangani oleh `vercel.json` rewrites
- Jika masih terjadi, check vercel.json configuration

---

## 📊 Monitoring

Setelah deployment:
1. **Analytics**: Vercel Dashboard > Analytics
2. **Logs**: Vercel Dashboard > Deployments > [Deployment] > Logs
3. **Performance**: Vercel Dashboard > Speed Insights

---

## 🔐 Custom Domain (Optional)

Untuk menggunakan domain custom:
1. Buka Vercel Dashboard > Project Settings > Domains
2. Klik "Add Domain"
3. Masukkan domain Anda (contoh: `kuapecalungan.com`)
4. Ikuti instruksi untuk update DNS records
5. Tunggu DNS propagation (24-48 jam)

---

## ✅ Checklist Deployment

- [ ] Login ke Vercel
- [ ] Import GitHub repository
- [ ] Configure build settings
- [ ] Add environment variables (Supabase)
- [ ] Deploy project
- [ ] Verify deployment URL
- [ ] Setup Supabase database schema
- [ ] Test Q&A functionality
- [ ] Setup custom domain (optional)
- [ ] Enable analytics monitoring

---

**Selamat! Website KUA Pecalungan Anda sudah live! 🎉**

Untuk bantuan lebih lanjut, hubungi:
- Vercel Support: https://vercel.com/support
- Supabase Support: https://supabase.com/support
