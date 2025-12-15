import { Link } from "wouter";
import { ArrowLeft, Shield, Lock, Eye, Database, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-heading font-bold gradient-text">
                Kebijakan Privasi
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
              Kantor Urusan Agama (KUA) Kecamatan Pecalungan berkomitmen untuk melindungi privasi Anda. 
              Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi 
              informasi pribadi Anda saat menggunakan platform konsultasi fiqih online kami.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Database className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Informasi yang Kami Kumpulkan
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kami mengumpulkan informasi yang Anda berikan secara sukarela saat menggunakan layanan kami:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li><strong>Informasi Identitas:</strong> Nama, alamat email (opsional)</li>
                <li><strong>Pertanyaan Fiqih:</strong> Konten pertanyaan yang Anda ajukan</li>
                <li><strong>Data Teknis:</strong> Alamat IP, jenis browser, sistem operasi</li>
                <li><strong>Cookie:</strong> Data untuk meningkatkan pengalaman pengguna</li>
              </ul>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Bagaimana Kami Menggunakan Informasi
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>Informasi yang kami kumpulkan digunakan untuk:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Menjawab pertanyaan fiqih yang Anda ajukan</li>
                <li>Mengirimkan notifikasi terkait status pertanyaan Anda</li>
                <li>Meningkatkan kualitas layanan kami</li>
                <li>Menganalisis penggunaan website untuk perbaikan</li>
                <li>Mematuhi kewajiban hukum yang berlaku</li>
              </ul>
            </div>
          </section>

          {/* Data Protection */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Lock className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Perlindungan Data
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi 
                informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Enkripsi data saat transmisi (HTTPS/SSL)</li>
                <li>Akses terbatas hanya untuk staf yang berwenang</li>
                <li>Penyimpanan data di server yang aman</li>
                <li>Pemantauan keamanan secara berkala</li>
              </ul>
            </div>
          </section>

          {/* Data Sharing */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-foreground m-0">
                Pembagian Informasi
              </h2>
            </div>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kami <strong>tidak akan</strong> menjual, menyewakan, atau membagikan informasi pribadi Anda 
                kepada pihak ketiga untuk tujuan pemasaran. Informasi Anda hanya akan dibagikan dalam kondisi berikut:
              </p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Dengan persetujuan eksplisit dari Anda</li>
                <li>Kepada ulama/ustadz KUA untuk menjawab pertanyaan Anda</li>
                <li>Untuk mematuhi kewajiban hukum atau perintah pengadilan</li>
                <li>Untuk melindungi hak, properti, atau keselamatan KUA Pecalungan dan pengguna lainnya</li>
              </ul>
            </div>
          </section>

          {/* Your Rights */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Hak Anda
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>Anda memiliki hak untuk:</p>
              
              <ul className="space-y-2 list-disc list-inside">
                <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                <li>Meminta koreksi atas informasi yang tidak akurat</li>
                <li>Meminta penghapusan informasi pribadi Anda</li>
                <li>Menarik persetujuan Anda kapan saja</li>
                <li>Mengajukan keluhan kepada otoritas perlindungan data</li>
              </ul>
              
              <p className="mt-4">
                Untuk menggunakan hak-hak ini, silakan hubungi kami melalui informasi kontak di bawah.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Cookie dan Teknologi Pelacakan
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Website kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman 
                pengguna dan menganalisis lalu lintas website. Anda dapat mengatur browser Anda untuk menolak 
                cookie, namun beberapa fitur website mungkin tidak berfungsi dengan baik.
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="mb-12">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-4">
              Perubahan Kebijakan Privasi
            </h2>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan 
                di halaman ini dengan tanggal "Terakhir diperbarui" yang baru. Kami mendorong Anda untuk meninjau 
                kebijakan ini secara berkala.
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
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda, 
                silakan hubungi kami:
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
