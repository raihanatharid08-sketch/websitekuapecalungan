# KUA Pecalungan Website

Platform tanya jawab fiqih Islam terpercaya dari Kantor Urusan Agama (KUA) Kecamatan Pecalungan, Kabupaten Batang.

## 🎨 Design Philosophy

Website ini menggunakan pendekatan **Modern Islamic Minimalism (Neo-Andalusian)** dengan prinsip:
- **Clarity & Light**: Menekankan ruang putih dan cahaya untuk melambangkan pencerahan
- **Geometric Harmony**: Menggunakan pola geometris Islam (Girih) secara halus
- **Serene Authority**: Nada yang menyambut sekaligus berwibawa
- **Accessible Sacredness**: Membuat layanan keagamaan terasa mudah diakses

### Color Palette
- **Primary**: Emerald Green (#047857) - Pertumbuhan dan simbolisme Islam tradisional
- **Secondary**: Sand Gold (#D4AF37) - Nilai dan tradisi
- **Background**: Warm Off-White (#F9FAFB) - Mengurangi ketegangan mata
- **Text**: Charcoal Grey (#1F2937) - Keterbacaan tinggi

### Typography
- **Headings**: Playfair Display (Serif) - Elegan dan berwibawa
- **Body**: Lato (Sans-serif) - Humanis dan mudah dibaca

## 🚀 Tech Stack

- **Frontend**: React 19 + Vite + TypeScript
- **Styling**: TailwindCSS 4 + shadcn/ui
- **Backend**: Supabase (PostgreSQL, Auth, Realtime, Storage)
- **Deployment**: Vercel
- **Version Control**: GitHub

## 📋 Prerequisites

- Node.js 18+ dan pnpm
- Akun Supabase (gratis)
- Akun Vercel (gratis)
- Akun GitHub

## 🛠️ Local Development Setup

### 1. Clone Repository

```bash
git clone https://github.com/raihanatharid08-sketch/websitekuapecalungan.git
cd websitekuapecalungan
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Supabase

1. Buat proyek baru di [Supabase](https://supabase.com)
2. Buat database schema dengan menjalankan SQL berikut di SQL Editor:

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
```

3. Setup Row Level Security (RLS) policies:

```sql
-- Enable RLS
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

4. Dapatkan kredensial Supabase:
   - Buka Settings > API
   - Salin **Project URL** dan **anon/public key**

### 4. Configure Environment Variables

Buat file `.env.local` di root project:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 5. Run Development Server

```bash
pnpm dev
```

Website akan berjalan di `http://localhost:3000`

## 🚢 Deployment ke Vercel

### Menggunakan Vercel CLI

1. Install Vercel CLI:
```bash
pnpm add -g vercel
```

2. Login ke Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. Untuk production deployment:
```bash
vercel --prod
```

### Menggunakan Vercel Dashboard

1. Login ke [Vercel Dashboard](https://vercel.com)
2. Klik "Add New Project"
3. Import repository GitHub: `raihanatharid08-sketch/websitekuapecalungan`
4. Configure project:
   - **Framework Preset**: Other
   - **Build Command**: `pnpm build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `pnpm install`

5. Tambahkan Environment Variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

6. Klik "Deploy"

### Vercel MCP Integration (Optional)

Jika Anda menggunakan Vercel MCP, Anda dapat mengelola deployment melalui command line:

```bash
# List projects
manus-mcp-cli tool call list_projects --server vercel

# Get deployment logs
manus-mcp-cli tool call get_deployment_logs --server vercel --input '{"deploymentId": "your-deployment-id"}'

# Get domain info
manus-mcp-cli tool call get_domain_info --server vercel --input '{"domain": "your-domain.vercel.app"}'
```

## 📁 Project Structure

```
kuape-calungan/
├── client/
│   ├── public/              # Static assets
│   │   ├── hero-bg.png
│   │   ├── kua-building.png
│   │   └── pattern-overlay.png
│   └── src/
│       ├── components/      # Reusable components
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   └── sections/    # Landing page sections
│       ├── lib/
│       │   ├── supabase.ts  # Supabase client
│       │   └── trpc.ts
│       ├── pages/           # Page components
│       │   └── Home.tsx
│       ├── App.tsx          # Main app component
│       └── index.css        # Global styles
├── server/                  # Server-side code
├── drizzle/                 # Database schema (optional)
├── vercel.json              # Vercel configuration
└── package.json
```

## 🎯 Features

### Implemented ✅
- ✅ Header dengan navigasi sticky
- ✅ Hero section dengan CTA buttons
- ✅ Stats section dengan animated counters
- ✅ How It Works section (4-step process)
- ✅ Services section (6 service cards)
- ✅ FAQ section dengan accordion
- ✅ CTA section
- ✅ Footer dengan contact info
- ✅ Responsive design
- ✅ Islamic geometric patterns
- ✅ Supabase integration

### Coming Soon 🚧
- 🚧 Featured Q&A section dengan category filters
- 🚧 About KUA section
- 🚧 Testimonials section dengan carousel
- 🚧 Q&A submission form
- 🚧 Real-time Q&A updates
- 🚧 Search functionality
- 🚧 Admin dashboard

## 🧪 Testing

Run tests:
```bash
pnpm test
```

## 📝 License

© 2025 KUA Pecalungan. Kementerian Agama Republik Indonesia.

## 🤝 Contributing

Untuk kontribusi, silakan buat pull request ke repository ini.

## 📞 Contact

- **Email**: kua.pecalungan@kemenag.go.id
- **Phone**: (0285) 123456
- **Facebook**: [KUA Pecalungan](https://www.facebook.com/kuapecalungan112515)
- **Address**: Jl. Raya Pecalungan, Kec. Pecalungan, Kab. Batang, Jawa Tengah
