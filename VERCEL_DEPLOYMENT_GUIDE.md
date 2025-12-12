# Panduan Deployment ke Vercel - KUA Pecalungan

**Tanggal**: 11 Desember 2024

## 📋 Environment Variables yang Perlu Di-setup

Untuk deploy ke Vercel, Anda **HARUS** menambahkan environment variables berikut di Vercel Dashboard.

### ✅ Required Variables (WAJIB)

```env
VITE_SUPABASE_URL=https://svjcgaeuyojkiksaduxq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2amNnYWV1eW9qa2lrc2FkdXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODAwODcsImV4cCI6MjA3OTQ1NjA4N30.YJ6R8wBkhCQALgzVBtteSZ4q3i60Sa-phMNU6lWz0AM
```

### ⚙️ Optional Variables (Opsional)

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=mysql://placeholder:placeholder@placeholder:3306/placeholder
OAUTH_SERVER_URL=
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

## 🚀 Cara Setup Environment Variables di Vercel

### Metode 1: Via Vercel Dashboard (Recommended)

1. **Buka Vercel Dashboard**
   - URL: https://vercel.com/dashboard
   - Login dengan akun Anda

2. **Pilih Project**
   - Klik project: **websitekuapecalungan** (atau nama project Anda)
   - Atau salah satu dari:
     - `websitekuapecalungan03`
     - `kuapecalungan`
     - `websitekua`
     - `websitekua-github`

3. **Masuk ke Settings**
   - Klik tab **"Settings"** di menu atas
   - Scroll ke bawah atau klik **"Environment Variables"** di sidebar kiri

4. **Tambahkan Variables**
   
   **Variable 1: VITE_SUPABASE_URL**
   ```
   Name: VITE_SUPABASE_URL
   Value: https://svjcgaeuyojkiksaduxq.supabase.co
   Environment: ✅ Production ✅ Preview ✅ Development
   ```
   Klik **"Save"**

   **Variable 2: VITE_SUPABASE_ANON_KEY**
   ```
   Name: VITE_SUPABASE_ANON_KEY
   Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2amNnYWV1eW9qa2lrc2FkdXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODAwODcsImV4cCI6MjA3OTQ1NjA4N30.YJ6R8wBkhCQALgzVBtteSZ4q3i60Sa-phMNU6lWz0AM
   Environment: ✅ Production ✅ Preview ✅ Development
   ```
   Klik **"Save"**

5. **Redeploy (Jika Perlu)**
   - Klik tab **"Deployments"**
   - Klik **"..."** (three dots) pada deployment terakhir
   - Klik **"Redeploy"**
   - Atau push commit baru ke GitHub untuk trigger auto-deploy

### Metode 2: Via Vercel CLI

```bash
# Install Vercel CLI (jika belum)
npm i -g vercel

# Login
vercel login

# Link project
vercel link

# Add environment variables
vercel env add VITE_SUPABASE_URL production
# Paste: https://svjcgaeuyojkiksaduxq.supabase.co

vercel env add VITE_SUPABASE_ANON_KEY production
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2amNnYWV1eW9qa2lrc2FkdXhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4ODAwODcsImV4cCI6MjA3OTQ1NjA4N30.YJ6R8wBkhCQALgzVBtteSZ4q3i60Sa-phMNU6lWz0AM

# Redeploy
vercel --prod
```

## 📊 Vercel Projects yang Terdeteksi

Anda memiliki beberapa project di Vercel:

| Project Name | Project ID | Created |
|--------------|------------|---------|
| **websitekuapecalungan03** | prj_HzavAAMUA0tDZujiQv9FNwQD41Ix | 9 Dec 2024 |
| kuapecalungan | prj_5TC99sqmOiPvifjtzFtIYMuoIt3p | 7 Dec 2024 |
| websitekuapecalungan | prj_xNUlEpvtYnx7JcLhsjmMUGTiUrBs | 1 Dec 2024 |
| websitekua | prj_B2RVbV39Sz9onaQAJMI2ReDRvv4C | 1 Dec 2024 |
| websitekua-github | prj_XSHyY1W9HTvK1N1C0YnRKgsajMPr | 30 Nov 2024 |

**Pilih project yang terhubung dengan repository GitHub**: `raihanatharid08-sketch/websitekuapecalungan`

## ⚠️ Penting!

### Jangan Lupa Centang Environment
Saat menambahkan environment variable, pastikan centang:
- ✅ **Production** - Untuk deployment production
- ✅ **Preview** - Untuk preview deployments (PR, branch)
- ✅ **Development** - Untuk local development (opsional)

### Keamanan
- ❌ **JANGAN** commit file `.env` ke Git
- ✅ File `.env` sudah ada di `.gitignore`
- ✅ Environment variables di Vercel aman dan encrypted

## 🔍 Troubleshooting

### Deployment Gagal dengan Error "Supabase not configured"

**Penyebab**: Environment variables belum di-set

**Solusi**:
1. Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` di Vercel
2. Redeploy project

### Login Admin Tidak Berfungsi di Production

**Penyebab**: Supabase URL atau Anon Key salah

**Solusi**:
1. Cek environment variables di Vercel Settings
2. Pastikan value sama persis dengan yang di `.env` local
3. Redeploy

### Build Gagal

**Penyebab**: Biasanya karena dependency atau TypeScript error

**Solusi**:
1. Cek build logs di Vercel Deployments
2. Test build local: `pnpm build`
3. Fix error dan push lagi

## 📝 Checklist Deployment

Sebelum deploy, pastikan:

- [x] ✅ Code sudah di-push ke GitHub
- [ ] ⚠️ Environment variables sudah di-set di Vercel
- [ ] ⚠️ Project Vercel sudah terhubung dengan GitHub repo
- [ ] ⚠️ Build settings sudah benar (Framework: Vite, Build Command: `pnpm build`)
- [ ] ⚠️ Output directory: `dist` (default Vite)

## 🎯 Setelah Deploy

### Cek Deployment
1. Buka Vercel Dashboard → Deployments
2. Lihat status deployment (Building → Ready)
3. Klik URL deployment untuk test

### Test Fitur
1. ✅ Homepage loading
2. ✅ Navigation berfungsi
3. ✅ Login admin berfungsi (dengan user yang sudah dibuat di Supabase)
4. ✅ Submit pertanyaan berfungsi
5. ✅ Supabase connection berfungsi

### Custom Domain (Opsional)
1. Vercel Settings → Domains
2. Tambahkan domain Anda
3. Update DNS records sesuai instruksi Vercel

## 🔗 Links Penting

- **Vercel Dashboard**: https://vercel.com/dashboard
- **GitHub Repository**: https://github.com/raihanatharid08-sketch/websitekuapecalungan
- **Supabase Dashboard**: https://app.supabase.com

## 📞 Support

Jika ada masalah:
1. Cek build logs di Vercel
2. Cek browser console untuk error
3. Cek Supabase connection di Network tab

---

**Status**: ⚠️ Environment variables perlu di-setup manual di Vercel Dashboard
**Next Step**: Tambahkan environment variables di Vercel → Redeploy
