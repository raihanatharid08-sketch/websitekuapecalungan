import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-secondary/10 px-4">
      <div className="max-w-2xl w-full text-center space-y-8 animate-fade-in-up">
        {/* 404 Number */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-heading font-bold gradient-text leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Maaf, halaman yang Anda cari tidak dapat ditemukan. Halaman mungkin telah dipindahkan atau tidak pernah ada.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button size="lg" asChild className="group">
            <Link href="/">
              <Home className="mr-2 h-5 w-5" />
              Kembali ke Beranda
            </Link>
          </Button>
          
          <Button size="lg" variant="outline" asChild className="group">
            <Link href="/materi-fiqih">
              <Search className="mr-2 h-5 w-5" />
              Cari Materi Fiqih
            </Link>
          </Button>
        </div>

        {/* Helpful Links */}
        <div className="pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Atau kunjungi halaman berikut:
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/dashboard" className="text-sm text-primary hover:underline">
              Pertanyaan Saya
            </Link>
            <Link href="/lokasi" className="text-sm text-primary hover:underline">
              Lokasi KUA
            </Link>
            <Link href="/kontak" className="text-sm text-primary hover:underline">
              Kontak Kami
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
