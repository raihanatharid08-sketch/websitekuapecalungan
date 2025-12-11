# Cara Membuat Admin User untuk Login

## Status Koneksi Supabase

✅ **Supabase sudah terhubung!**
- Project URL: `https://svjcgaeuyojkiksaduxq.supabase.co`
- Anon Key: Sudah dikonfigurasi
- Server Development: Berjalan di https://3000-i35a6z759pfqxie54v73i-0732a422.manus-asia.computer

## Masalah Login Admin

Anda tidak bisa login karena **belum ada user admin** yang dibuat di Supabase.

## Solusi: Buat Admin User di Supabase Dashboard

### Langkah 1: Buka Supabase Dashboard

1. Kunjungi: https://app.supabase.com
2. Login dengan akun Supabase Anda
3. Pilih project: **svjcgaeuyojkiksaduxq**

### Langkah 2: Buat User Admin

1. **Navigasi ke Authentication**
   - Di sidebar kiri, klik **"Authentication"**
   - Klik tab **"Users"**

2. **Klik "Add user"**
   - Tombol hijau di pojok kanan atas

3. **Isi Form User**
   ```
   Email: kuapecalungan15@gmail.com
   Password: [Pilih password yang kuat, minimal 8 karakter]
   
   ✅ PENTING: Centang "Auto Confirm User"
   ```

4. **Klik "Create user"**
   - User akan muncul di list
   - Status harus "Confirmed" (hijau)

5. **Simpan Kredensial**
   ```
   Email: kuapecalungan15@gmail.com
   Password: [Password yang Anda buat]
   ```
   ⚠️ **Catat password ini dengan aman!**

### Langkah 3: Test Login

1. **Buka halaman login**
   ```
   https://3000-i35a6z759pfqxie54v73i-0732a422.manus-asia.computer/login
   ```

2. **Masukkan kredensial**
   - Email: `kuapecalungan15@gmail.com`
   - Password: [Password yang Anda buat]

3. **Klik "Masuk"**
   - Jika berhasil: Akan muncul toast "Login berhasil!" dan redirect ke `/admin`
   - Jika gagal: Periksa email dan password, atau cek status user di Supabase

### Langkah 4: Verifikasi Admin Access

Setelah login berhasil, Anda bisa mengakses:
- `/admin` - Admin Dashboard
- `/admin/questions` - Kelola Pertanyaan

## Alternatif: Buat User dengan Email Lain

Jika Anda ingin menggunakan email lain:

1. Ikuti langkah yang sama di atas
2. Gunakan email Anda sendiri
3. Pastikan centang "Auto Confirm User"

## Troubleshooting

### ❌ "Invalid login credentials"
**Penyebab**: Email atau password salah, atau user belum di-confirm

**Solusi**:
1. Cek kembali email dan password
2. Buka Supabase Dashboard → Authentication → Users
3. Pastikan user status "Confirmed" (hijau)
4. Jika status "Waiting for verification" (kuning), klik user → "Confirm email"

### ❌ "User not found"
**Penyebab**: User belum dibuat di Supabase

**Solusi**: Ikuti Langkah 2 di atas untuk membuat user

### ❌ Redirect ke login terus-menerus
**Penyebab**: Session tidak tersimpan atau ada error di AuthContext

**Solusi**:
1. Clear browser cache dan cookies
2. Coba browser lain atau incognito mode
3. Check browser console untuk error (F12 → Console)

### ❌ "Failed to fetch"
**Penyebab**: Koneksi ke Supabase gagal

**Solusi**:
1. Cek koneksi internet
2. Verifikasi Supabase project masih aktif di dashboard
3. Pastikan `.env` sudah benar (sudah saya konfigurasi)

## Informasi Tambahan

### Email Admin yang Disarankan
Sesuai dokumentasi proyek, email admin yang disarankan adalah:
- `kuapecalungan15@gmail.com` (email resmi KUA Pecalungan)

### Password Requirements
Supabase memerlukan password minimal:
- 8 karakter
- Kombinasi huruf dan angka (disarankan)
- Karakter spesial (opsional tapi disarankan)

Contoh password yang kuat:
- `KuaPec@2024!`
- `Admin#KUA2024`
- `Pecalungan@123`

### Keamanan
⚠️ **JANGAN** share password admin di tempat publik atau commit ke Git!

## Status Saat Ini

✅ Supabase terhubung dengan benar
✅ Halaman login berfungsi
✅ Server development berjalan
❌ User admin belum dibuat (perlu dibuat manual di dashboard)

## Setelah User Dibuat

Setelah Anda membuat user admin di Supabase Dashboard:
1. Login akan langsung berfungsi
2. Anda bisa akses admin panel
3. Anda bisa mulai mengelola pertanyaan dari user

---

**Butuh bantuan?**
Jika masih ada masalah setelah membuat user, beritahu saya dan saya akan membantu troubleshoot lebih lanjut!
