import { Link } from "wouter";
import { ArrowLeft, FileText, CheckCircle2, AlertTriangle, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
        <div className="container py-12">
          <Button variant="ghost" asChild className="mb-6">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </Button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold gradient-text">
                Syarat & Ketentuan
              </h1>
              <p className="text-muted-foreground mt-2">
                Terakhir diperbarui: 15 Desember 2025
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12 max-w-4xl">
        <div className="prose prose-slate max-w-none">
          {/* Introduction */}
          <section className="mb-12">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Selamat datang di platform konsultasi fiqih online KUA Pecalungan. Dengan mengakses dan menggunakan 
              layanan kami, Anda setuju untuk terikat oleh Syarat dan Ketentuan berikut. Harap baca dengan seksama 
              sebelum menggunakan layanan kami.
            </p>
          </section>

          {/* Acceptance of Terms */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Penerimaan Syarat
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Dengan mengakses website ini, Anda menyatakan bahwa:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Anda telah membaca, memahami, dan menyetujui Syarat dan Ketentuan ini</li>
                <li>Anda berusia minimal 17 tahun atau memiliki izin dari orang tua/wali</li>
                <li>Anda akan menggunakan layanan ini dengan itikad baik dan sesuai hukum yang berlaku</li>
                <li>Informasi yang Anda berikan adalah benar dan akurat</li>
              </ul>
            </div>
          </section>

          {/* Service Description */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Scale className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Deskripsi Layanan
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Platform ini menyediakan layanan konsultasi hukum Islam (fiqih) online yang meliputi:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Pengajuan pertanyaan seputar fiqih dan hukum Islam</li>
                <li>Jawaban dari ulama dan ustadz yang kompeten</li>
                <li>Akses ke materi fiqih yang telah dipublikasikan</li>
                <li>Informasi tentang layanan KUA Pecalungan</li>
              </ul>
              
              <p className="mt-4">
                Layanan ini bersifat <strong>informatif dan edukatif</strong>, bukan pengganti konsultasi langsung 
                untuk urusan resmi seperti pernikahan, perceraian, atau warisan yang memerlukan dokumentasi hukum.
              </p>
            </div>
          </section>

          {/* User Responsibilities */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Tanggung Jawab Pengguna
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>Sebagai pengguna layanan ini, Anda setuju untuk:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Mengajukan pertanyaan yang sopan, jelas, dan sesuai dengan topik fiqih</li>
                <li>Tidak menggunakan bahasa yang kasar, menghina, atau tidak pantas</li>
                <li>Tidak menyebarkan informasi palsu atau menyesatkan</li>
                <li>Tidak menggunakan layanan untuk tujuan ilegal atau melanggar hukum</li>
                <li>Menghormati hak cipta dan kekayaan intelektual</li>
                <li>Tidak melakukan spam atau penyalahgunaan sistem</li>
              </ul>
            </div>
          </section>

          {/* Content and Answers */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Konten dan Jawaban
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Mengenai konten dan jawaban yang disediakan di platform ini:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Jawaban diberikan berdasarkan Al-Qur'an, Hadits Shahih, dan pendapat ulama madhab</li>
                <li>Jawaban bersifat umum dan mungkin perlu disesuaikan dengan konteks spesifik Anda</li>
                <li>Kami berusaha memberikan jawaban yang akurat, namun tidak menjamin keabsolutan</li>
                <li>Untuk kasus yang kompleks, kami sarankan konsultasi langsung ke KUA</li>
                <li>Konten yang dipublikasikan dapat digunakan untuk tujuan edukatif dengan mencantumkan sumber</li>
              </ul>
            </div>
          </section>

          {/* Prohibited Activities */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Aktivitas yang Dilarang
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>Anda <strong>dilarang</strong> untuk:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Menggunakan layanan untuk menyebarkan paham yang bertentangan dengan Islam Ahlussunnah wal Jamaah</li>
                <li>Mengajukan pertanyaan yang bersifat fitnah, provokasi, atau memecah belah</li>
                <li>Mencoba mengakses sistem secara tidak sah (hacking, cracking, dll)</li>
                <li>Menyamar sebagai orang lain atau memberikan identitas palsu</li>
                <li>Menggunakan bot, script, atau otomasi tanpa izin</li>
                <li>Mengumpulkan data pengguna lain tanpa persetujuan</li>
              </ul>
              
              <p className="mt-4">
                Pelanggaran terhadap ketentuan ini dapat mengakibatkan penangguhan atau penghentian akses Anda 
                ke layanan kami.
              </p>
            </div>
          </section>

          {/* Intellectual Property */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Hak Kekayaan Intelektual
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Seluruh konten di website ini, termasuk teks, grafik, logo, dan desain, adalah milik KUA Pecalungan 
                atau pemberi lisensi kami dan dilindungi oleh hukum hak cipta Indonesia.
              </p>
              
              <p>
                Anda diperbolehkan untuk melihat, mengunduh, dan mencetak konten untuk penggunaan pribadi dan 
                non-komersial, dengan tetap mencantumkan sumber.
              </p>
            </div>
          </section>

          {/* Disclaimer */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Penyangkalan (Disclaimer)
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Layanan ini disediakan "sebagaimana adanya" tanpa jaminan apapun, baik tersurat maupun tersirat. 
                KUA Pecalungan tidak bertanggung jawab atas:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Keakuratan, kelengkapan, atau keandalan konten</li>
                <li>Kerugian atau kerusakan yang timbul dari penggunaan layanan ini</li>
                <li>Gangguan teknis, virus, atau malware</li>
                <li>Tindakan pihak ketiga yang mengakses sistem kami</li>
              </ul>
            </div>
          </section>

          {/* Limitation of Liability */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Batasan Tanggung Jawab
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Dalam batas maksimal yang diizinkan oleh hukum, KUA Pecalungan tidak bertanggung jawab atas 
                kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari 
                penggunaan atau ketidakmampuan menggunakan layanan ini.
              </p>
            </div>
          </section>

          {/* Changes to Terms */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Perubahan Syarat dan Ketentuan
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan dipublikasikan 
                di halaman ini dengan tanggal "Terakhir diperbarui" yang baru. Penggunaan layanan setelah 
                perubahan dianggap sebagai penerimaan terhadap syarat yang baru.
              </p>
            </div>
          </section>

          {/* Governing Law */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Hukum yang Berlaku
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. 
                Setiap sengketa yang timbul akan diselesaikan melalui Pengadilan Negeri Batang, Jawa Tengah.
              </p>
            </div>
          </section>

          {/* Contact */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Hubungi Kami
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami:
              </p>
              
              <div className="bg-primary/5 border border-primary/10 rounded-lg p-6 space-y-2">
                <p className="font-semibold text-foreground">Kantor Urusan Agama Kecamatan Pecalungan</p>
                <p>Jl. Raya Pecalungan, Kec. Pecalungan, Kab. Batang</p>
                <p>Jawa Tengah 51281, Indonesia</p>
                <p>Email: <a href="mailto:kuapecalungan15@gmail.com" className="text-primary hover:underline">kuapecalungan15@gmail.com</a></p>
                <p>Telepon: <a href="tel:+6285117737315" className="text-primary hover:underline">+62 851-1773-7315</a></p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
