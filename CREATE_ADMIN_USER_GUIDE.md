# Panduan Membuat Admin User - Step by Step

## ✅ Konfirmasi: Supabase Sudah Terhubung!

Project Anda: **WEBSITEKUA**
- Project ID: `svjcgaeuyojkiksaduxq`
- Anon Key: ✅ Sudah dikonfigurasi dengan benar
- Status: ✅ Siap digunakan

## 🎯 Langkah Terakhir: Buat Admin User

### Step 1: Buka Authentication di Supabase Dashboard

Anda sudah di dashboard Supabase kan? Sekarang:

1. **Di sidebar kiri**, cari dan klik **"Authentication"** (ikon gembok/kunci)
2. Akan muncul beberapa tab di atas
3. Klik tab **"Users"**

### Step 2: Klik "Add user"

Di halaman Users:
1. Lihat pojok **kanan atas**
2. Ada tombol hijau bertuliskan **"Add user"** atau **"+ Add user"**
3. **Klik tombol tersebut**

### Step 3: Isi Form Create User

Akan muncul popup/modal form. Isi dengan data berikut:

```
┌─────────────────────────────────────────┐
│  Create a new user                      │
├─────────────────────────────────────────┤
│                                         │
│  Email *                                │
│  ┌───────────────────────────────────┐ │
│  │ kuapecalungan15@gmail.com         │ │
│  └───────────────────────────────────┘ │
│                                         │
│  Password *                             │
│  ┌───────────────────────────────────┐ │
│  │ KuaPec@2024!                      │ │
│  └───────────────────────────────────┘ │
│                                         │
│  ☑ Auto Confirm User                   │
│  ^ CENTANG INI! PENTING!                │
│                                         │
│  [ Cancel ]  [ Create user ]            │
└─────────────────────────────────────────┘
```

**PENTING**: 
- ✅ **CENTANG** checkbox "Auto Confirm User"
- Password bisa diganti sesuai keinginan (minimal 8 karakter)
- Contoh password kuat: `KuaPec@2024!` atau `AdminKUA#2024`

### Step 4: Klik "Create user"

Setelah form terisi lengkap dan checkbox tercentang:
1. Klik tombol **"Create user"** (biasanya warna hijau/biru)
2. Tunggu beberapa detik
3. User akan muncul di list dengan status **"Confirmed"** (hijau)

### Step 5: Verifikasi User Berhasil Dibuat

Di halaman Users, Anda akan melihat:

```
┌──────────────────────────────────────────────────────────┐
│ Email                      │ Created    │ Status         │
├──────────────────────────────────────────────────────────┤
│ kuapecalungan15@gmail.com  │ Just now   │ ● Confirmed   │
└──────────────────────────────────────────────────────────┘
```

Status harus **"Confirmed"** dengan dot hijau (●).

### Step 6: Test Login!

Sekarang buka halaman login:

**URL**: https://3000-i35a6z759pfqxie54v73i-0732a422.manus-asia.computer/login

**Login dengan:**
- Email: `kuapecalungan15@gmail.com`
- Password: `KuaPec@2024!` (atau password yang Anda buat)

**Klik "Masuk"**

Jika berhasil:
- ✅ Muncul toast hijau: "Login berhasil!"
- ✅ Otomatis redirect ke `/admin` dashboard
- ✅ Anda akan lihat email Anda di pojok kanan atas

## 🎉 Selesai!

Setelah login berhasil, Anda bisa:
- Akses admin dashboard
- Kelola pertanyaan dari user
- Submit jawaban
- Lihat statistik

## ❓ Troubleshooting

### Jika checkbox "Auto Confirm User" tidak ada:

Coba cara alternatif:
1. Buat user tanpa centang apapun
2. Setelah user dibuat, klik pada user tersebut di list
3. Di detail user, cari tombol **"Confirm email"**
4. Klik tombol tersebut

### Jika login gagal dengan error "Invalid credentials":

1. **Cek email dan password** - pastikan exact match
2. **Cek status user** di Supabase:
   - Buka Authentication → Users
   - Pastikan status "Confirmed" (hijau)
   - Jika "Waiting for verification" (kuning), klik user → "Confirm email"

### Jika tetap tidak bisa:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Coba incognito/private mode
3. Cek browser console (F12 → Console) untuk error
4. Screenshot error dan beritahu saya

## 📝 Simpan Kredensial Anda

```
=== ADMIN CREDENTIALS ===
Email: kuapecalungan15@gmail.com
Password: KuaPec@2024!

Login URL: https://3000-i35a6z759pfqxie54v73i-0732a422.manus-asia.computer/login
```

⚠️ **Simpan dengan aman! Jangan share atau commit ke Git!**

## 🚀 Next Steps Setelah Login

Setelah berhasil login, Anda bisa:

1. **Setup Database Tables** (jika belum)
   - Buka SQL Editor di Supabase
   - Run file `supabase-complete-schema.sql`

2. **Explore Admin Dashboard**
   - Lihat pertanyaan dari user
   - Submit jawaban
   - Kelola konten

3. **Test User Flow**
   - Logout dari admin
   - Coba submit pertanyaan sebagai user biasa
   - Login kembali sebagai admin untuk jawab

---

**Status**: Tinggal 1 langkah lagi! Buat user admin dan Anda siap! 🎯
