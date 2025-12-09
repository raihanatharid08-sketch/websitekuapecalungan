import { MapPin, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function LocationSection() {
  return (
    <section id="lokasi" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Lokasi Kantor
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Kunjungi kantor kami untuk konsultasi langsung atau hubungi melalui kontak yang tersedia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Map */}
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-[400px] lg:h-full">
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
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">Alamat</h3>
                    <p className="text-muted-foreground">
                      Jl. Raya Pecalungan<br />
                      Kec. Pecalungan, Kab. Batang<br />
                      Jawa Tengah 51281
                    </p>
                    <a
                      href="https://maps.app.goo.gl/Ab5B4XHXhZgz6Q6Q9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 text-primary hover:underline font-medium"
                    >
                      Buka di Google Maps →
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">Jam Operasional</h3>
                    <div className="space-y-1 text-muted-foreground">
                      <p><strong>Senin - Kamis:</strong> 08:00 - 15:00 WIB</p>
                      <p><strong>Jumat:</strong> 08:00 - 11:30 WIB</p>
                      <p><strong>Sabtu - Minggu:</strong> Tutup</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg mb-2">Kontak</h3>
                    <div className="space-y-2">
                      <p className="text-muted-foreground">
                        <strong>Telepon:</strong>{" "}
                        <a href="tel:+6285117737315" className="text-primary hover:underline">
                          +62 851-1773-7315
                        </a>
                      </p>
                      <p className="text-muted-foreground">
                        <strong>Email:</strong>{" "}
                        <a href="mailto:kuapecalungan15@gmail.com" className="text-primary hover:underline">
                          kuapecalungan15@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
