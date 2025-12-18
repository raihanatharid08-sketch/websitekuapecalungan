# Panduan Editing Website KUA Pecalungan

Dokumen ini berisi panduan lengkap untuk mengedit dan mengembangkan website KUA Pecalungan.

## 📁 Struktur Proyek

```
websitekuapecalungan/
├── client/                      # Frontend React
│   ├── public/                  # Asset statis (gambar, favicon, dll)
│   └── src/
│       ├── components/          # Komponen React
│       ├── pages/               # Halaman website
│       ├── lib/                 # Utilities dan konfigurasi
│       └── App.tsx              # Main app component
├── server/                      # Backend Express + tRPC
├── shared/                      # Shared types dan utilities
├── drizzle/                     # Database schema
└── package.json                 # Dependencies
```

## 🎨 Cara Mengedit Konten Website

### 1. Mengedit Teks dan Konten

**Header & Navigation**
- File: `client/src/components/Header.tsx`
- Edit menu navigasi, logo, dan teks header

**Hero Section (Banner Utama)**
- File: `client/src/pages/Home.tsx`
- Cari section dengan className yang mengandung "hero"
- Edit judul, deskripsi, dan tombol CTA

**Footer**
- File: `client/src/components/Footer.tsx`
- Edit informasi kontak, alamat, dan link sosial media

**FAQ Section**
- File: `client/src/pages/Home.tsx`
- Cari komponen Accordion
- Tambah/edit pertanyaan dan jawaban

### 2. Mengedit Gambar dan Asset

**Mengganti Gambar:**
1. Upload gambar baru ke folder `client/public/`
2. Edit referensi gambar di komponen terkait
3. Contoh: `<img src="/nama-gambar-baru.png" />`

**Gambar yang Ada:**
- `hero-bg.png` - Background hero section
- `kua-building.png` - Gambar gedung KUA
- `favicon.png` - Icon website
- `step1-icon.png` sampai `step4-icon.png` - Icon langkah-langkah

### 3. Mengedit Warna dan Styling

**File Konfigurasi Warna:**
- `client/src/index.css` - Global styles dan CSS variables

**Warna Utama Saat Ini:**
```css
--primary: #047857 (Emerald Green)
--secondary: #D4AF37 (Sand Gold)
--background: #F9FAFB (Warm Off-White)
--text: #1F2937 (Charcoal Grey)
```

**Cara Mengubah Warna:**
1. Edit file `client/src/index.css`
2. Cari CSS variable yang ingin diubah
3. Ganti nilai hex color

### 4. Menambah Halaman Baru

**Langkah-langkah:**
1. Buat file baru di `client/src/pages/NamaHalaman.tsx`
2. Buat komponen React:
```tsx
export default function NamaHalaman() {
  return (
    <div>
      <h1>Judul Halaman</h1>
      {/* Konten halaman */}
    </div>
  );
}
```
3. Tambahkan route di `client/src/App.tsx`:
```tsx
<Route path="/nama-halaman" component={NamaHalaman} />
```

## 🔧 Development Workflow

### Setup Environment

1. **Buat file `.env` di root project:**
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=your-database-url
```

2. **Install dependencies:**
```bash
pnpm install
```

### Menjalankan Development Server

```bash
pnpm dev
```

Website akan berjalan di `http://localhost:3000`

### Build untuk Production

```bash
pnpm build
```

Output akan ada di folder `dist/`

## 🚀 Deploy ke Vercel

### Otomatis (Recommended)

Setiap kali Anda push ke GitHub branch `main`, Vercel akan otomatis deploy.

```bash
git add .
git commit -m "Deskripsi perubahan"
git push origin main
```

### Manual via Vercel CLI

```bash
vercel --prod
```

## 📝 Tips Editing

### 1. Edit dengan Aman
- Selalu buat branch baru untuk perubahan besar
- Test di local sebelum push ke production
- Backup file sebelum edit

### 2. Cara Membuat Branch Baru
```bash
git checkout -b nama-branch-baru
# Edit file...
git add .
git commit -m "Deskripsi perubahan"
git push origin nama-branch-baru
```

### 3. Kembali ke Versi Sebelumnya
```bash
git log  # Lihat history commit
git checkout <commit-hash>  # Kembali ke commit tertentu
```

## 🎯 Task Umum

### Mengubah Judul Website
1. Edit `client/index.html`
2. Cari tag `<title>` dan ubah teksnya

### Mengubah Meta Description (SEO)
1. Edit `client/index.html`
2. Cari tag `<meta name="description">` dan ubah content-nya

### Menambah Menu Navigasi
1. Edit `client/src/components/Header.tsx`
2. Tambahkan item menu baru di array navigation

### Mengubah Informasi Kontak
1. Edit `client/src/components/Footer.tsx`
2. Ubah email, telepon, alamat, dll

## 🐛 Troubleshooting

### Error saat `pnpm dev`
**Solusi:**
```bash
rm -rf node_modules
pnpm install
pnpm dev
```

### Perubahan tidak muncul di browser
**Solusi:**
- Hard refresh: `Ctrl+Shift+R` (Windows) atau `Cmd+Shift+R` (Mac)
- Clear browser cache

### Build error di Vercel
**Solusi:**
1. Cek build logs di Vercel dashboard
2. Pastikan environment variables sudah diset
3. Test build di local: `pnpm build`

## 📚 Referensi

- **React Documentation**: https://react.dev
- **TailwindCSS**: https://tailwindcss.com
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs

## 🆘 Butuh Bantuan?

Jika mengalami kesulitan:
1. Cek file `README.md` untuk dokumentasi teknis
2. Lihat folder dokumentasi untuk panduan spesifik
3. Hubungi developer atau tim IT KUA

---

**Catatan Penting:**
- Selalu backup sebelum melakukan perubahan besar
- Test di local development sebelum deploy
- Gunakan Git untuk version control
