import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Location() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 pattern-bg opacity-20" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                Lokasi Kantor Kami
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Kunjungi kantor KUA Pecalungan untuk konsultasi langsung atau hubungi kami melalui kontak yang tersedia
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Map */}
              <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <Card className="overflow-hidden h-full">
                  <CardContent className="p-0 h-[450px] lg:h-full min-h-[500px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.898!2d109.7264!3d-6.9089!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7024e7f7f7f7f7%3A0x7f7f7f7f7f7f7f7f!2sKUA%20Pecalungan!5e0!3m2!1sid!2sid!4v1234567890"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Lokasi KUA Pecalungan"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Location Info */}
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <MapPin className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-xl mb-3">Alamat Lengkap</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                          <strong>Kantor Urusan Agama (KUA) Kecamatan Pecalungan</strong><br />
                          Jl. Raya Pecalungan<br />
                          Kec. Pecalungan, Kab. Batang<br />
                          Jawa Tengah 51281<br />
                          Indonesia
                        </p>
                        <Button variant="outline" size="sm" className="gap-2" asChild>
                          <a
                            href="https://maps.app.goo.gl/Ab5B4XHXhZgz6Q6Q9"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-4 w-4" />
                            Buka di Google Maps
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Clock className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-xl mb-3">Jam Operasional</h3>
                        <div className="space-y-2 text-muted-foreground">
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="font-medium">Senin - Kamis</span>
                            <span>08:00 - 15:00 WIB</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border">
                            <span className="font-medium">Jumat</span>
                            <span>08:00 - 11:30 WIB</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="font-medium">Sabtu - Minggu</span>
                            <span className="text-destructive font-medium">Tutup</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4 italic">
                          * Jam operasional dapat berubah pada hari libur nasional
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <Phone className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-heading font-bold text-xl mb-3">Hubungi Kami</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Telepon</p>
                              <a 
                                href="tel:+6285117737315" 
                                className="text-primary hover:underline font-medium"
                              >
                                +62 851-1773-7315
                              </a>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 text-primary" />
                            <div>
                              <p className="text-sm text-muted-foreground">Email</p>
                              <a 
                                href="mailto:kuapecalungan15@gmail.com" 
                                className="text-primary hover:underline font-medium"
                              >
                                kuapecalungan15@gmail.com
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
