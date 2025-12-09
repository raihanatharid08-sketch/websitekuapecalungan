import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactSection() {
  const whatsappUrl = "https://wa.me/6285117737315?text=Assalamualaikum%2C%20saya%20ingin%20berkonsultasi%20mengenai%20hukum%20Islam.";

  return (
    <section id="kontak" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Hubungi Kami
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami siap melayani dan menjawab pertanyaan Anda seputar hukum Islam dan layanan KUA
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {/* WhatsApp Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#25D366]" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Chat langsung dengan kami
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#25D366] hover:underline"
              >
                085117737315
              </a>
              <Button
                asChild
                className="w-full mt-4 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Chat Sekarang
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Phone Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Telepon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Hubungi kami via telepon
              </p>
              <a
                href="tel:+6285117737315"
                className="text-sm font-medium text-primary hover:underline"
              >
                +62 851-1773-7315
              </a>
              <Button
                asChild
                variant="outline"
                className="w-full mt-4"
              >
                <a href="tel:+6285117737315">
                  Telepon Sekarang
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Email</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Kirim email kepada kami
              </p>
              <a
                href="mailto:kuapecalungan15@gmail.com"
                className="text-sm font-medium text-primary hover:underline break-all"
              >
                kuapecalungan15@gmail.com
              </a>
              <Button
                asChild
                variant="outline"
                className="w-full mt-4"
              >
                <a href="mailto:kuapecalungan15@gmail.com">
                  Kirim Email
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">Alamat</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Kunjungi kantor kami
              </p>
              <p className="text-sm font-medium text-foreground">
                Jl. Raya Pecalungan
                <br />
                Kec. Pecalungan
                <br />
                Kab. Batang, Jawa Tengah
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="max-w-3xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Jam Pelayanan:</strong> Senin - Jumat, 08:00 - 15:00 WIB
                <br />
                <strong className="text-foreground">Sabtu:</strong> 08:00 - 12:00 WIB
                <br />
                <span className="text-xs mt-2 block">
                  Untuk pertanyaan mendesak di luar jam kerja, silakan hubungi via WhatsApp
                </span>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
