# Login Troubleshooting Guide - KUA Pecalungan Website

## ❌ Masalah Utama: User Tidak Bisa Login Setelah Registrasi

**Gejala:**
- User berhasil daftar tapi tidak bisa login
- Error: "Invalid login credentials" atau "Email atau password salah"
- Tidak ada error message saat klik tombol login

**Penyebab Utama:**
Email confirmation masih aktif di Supabase. User yang baru daftar ditandai sebagai "unconfirmed" dan tidak bisa login sampai mereka klik link konfirmasi di email. Karena ini development/local environment, email tidak terkirim.

---

## ✅ Solusi: Nonaktifkan Email Confirmation di Supabase

### Langkah-langkah Detail:

1. **Buka Supabase Dashboard**
   - Kunjungi: https://supabase.com/dashboard
   - Login dengan akun Anda
   - Pilih project KUA Pecalungan

2. **Masuk ke Authentication Settings**
   - Klik ikon **Settings** (⚙️) di sidebar kiri paling bawah
   - Klik menu **Authentication**
   - Scroll ke bawah sampai bagian **Auth Providers**

3. **Edit Email Provider**
   - Klik pada **Email** provider
   - Cari checkbox **"Confirm email"**
   - **UNCHECK** (hilangkan centang) pada checkbox tersebut
   - Klik tombol **Save** di bagian bawah

4. **Verifikasi Perubahan**
   - Pastikan checkbox "Confirm email" sudah tidak tercentang
   - Anda akan melihat pesan sukses setelah save

---

## 🔧 Handle User yang Sudah Terdaftar Sebelumnya

Jika ada user yang sudah mendaftar sebelum email confirmation dinonaktifkan, mereka masih tidak bisa login. Ada 2 cara:

### Opsi A: Konfirmasi Manual di Dashboard

1. Buka Supabase Dashboard → **Authentication** → **Users**
2. Cari user berdasarkan email
3. Klik pada user tersebut
4. Klik tombol **"Confirm email"**
5. User sekarang bisa login

### Opsi B: Hapus dan Daftar Ulang

1. Buka Supabase Dashboard → **Authentication** → **Users**
2. Cari user dan klik tombol delete (🗑️)
3. User daftar ulang di `/user/register`
4. Karena email confirmation sudah dinonaktifkan, user langsung bisa login

---

## 🧪 Testing Setelah Fix

1. **Daftar User Baru**
   - Buka `/user/register`
   - Isi semua field (Nama, Email, Password, Konfirmasi Password)
   - Klik **Daftar**
   - Lihat pesan: **"Registrasi berhasil! Anda sudah bisa login sekarang."**
   - Otomatis redirect ke `/user/login` setelah 1.5 detik

2. **Login User**
   - Di halaman `/user/login`
   - Masukkan email dan password yang sama
   - Klik **Login**
   - Seharusnya berhasil redirect ke `/dashboard`

3. **Verifikasi Dashboard**
   - Lihat nama user di dashboard
   - Bisa submit pertanyaan baru
   - Bisa lihat daftar pertanyaan yang sudah diajukan

---

## 🔐 Login Admin

**Email Admin:** `kuapecalungan15@gmail.com`  
**Password:** `KUAPECALUNGAN` (atau password yang Anda set)

### Cara Buat Akun Admin di Supabase:

1. Buka Supabase Dashboard → **Authentication** → **Users**
2. Klik **"Add user"** → **"Create new user"**
3. Isi data:
   - **Email:** `kuapecalungan15@gmail.com`
   - **Password:** `KUAPECALUNGAN`
   - **PENTING:** Centang **"Auto Confirm User"**
4. Klik **"Create user"**
5. Sekarang bisa login di `/login` (halaman admin login)

---

## ⚠️ Troubleshooting Lainnya

### Tombol Login Tidak Merespon

**Penyebab:**
- JavaScript error di browser
- Koneksi Supabase bermasalah
- Environment variables tidak diset

**Solusi:**
1. Tekan F12 → buka tab **Console**
2. Lihat apakah ada error merah
3. Cek tab **Network** → lihat apakah request ke Supabase gagal
4. Pastikan file `.env` ada dan berisi:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Redirect Loop / Stuck di Loading

**Solusi:**
1. Clear browser cache dan cookies
2. Tekan F12 → tab **Application**
3. Klik **Cookies** → hapus semua cookies
4. Klik **Local Storage** → hapus semua items
5. Refresh halaman

### Error "Only admin can access this panel"

**Penyebab:**
Hanya email `kuapecalungan15@gmail.com` yang bisa akses admin panel.

**Solusi:**
- Pastikan login dengan email admin yang benar
- Jika ingin user biasa akses admin, email harus diganti di kode

---

## 📋 Checklist Testing Lengkap

### User Flow
- [ ] Daftar user baru di `/user/register`
- [ ] Lihat pesan sukses
- [ ] Auto-redirect ke `/user/login`
- [ ] Login dengan kredensial yang sama
- [ ] Berhasil masuk ke `/dashboard`
- [ ] Bisa submit pertanyaan
- [ ] Bisa logout

### Admin Flow
- [ ] Buka `/login` (admin login)
- [ ] Login dengan `kuapecalungan15@gmail.com`
- [ ] Berhasil masuk ke `/admin`
- [ ] Bisa lihat dashboard statistik
- [ ] Bisa akses halaman Questions
- [ ] Bisa akses halaman Categories
- [ ] Bisa logout

---

## 🆘 Masih Bermasalah?

Jika sudah mengikuti semua langkah tapi masih tidak bisa login:

1. **Screenshot error message** yang muncul
2. **Buka browser console** (F12 → Console tab) dan screenshot error
3. **Cek Supabase Dashboard** → Authentication → Users untuk memastikan user terdaftar
4. **Verifikasi environment variables** di Vercel (jika sudah deploy)
5. **Coba browser lain** atau incognito mode

---

**Catatan Keamanan:** Menonaktifkan email confirmation berarti siapa saja bisa daftar tanpa verifikasi email. Ini cocok untuk internal/community use, tapi pertimbangkan implikasi keamanan untuk aplikasi publik.

**Terakhir Diupdate:** 9 Desember 2024
