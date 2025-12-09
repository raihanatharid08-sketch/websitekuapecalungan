import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Phone, Mail, MapPin, Send, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Pesan berhasil dikirim!", {
      description: "Kami akan segera menghubungi Anda kembali.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                Hubungi Kami
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div className="lg:col-span-2 animate-fade-in-up">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-heading text-2xl flex items-center gap-2">
                      <MessageSquare className="h-6 w-6 text-primary" />
                      Kirim Pesan
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nama Lengkap *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Masukkan nama Anda"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="nama@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Nomor Telepon</Label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="08xxxxxxxxxx"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subjek *</Label>
                          <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="Perihal pesan Anda"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Pesan *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tulis pesan Anda di sini..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full md:w-auto gap-2"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          "Mengirim..."
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Kirim Pesan
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Phone className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg mb-1">Telepon</h3>
                        <a
                          href="tel:+6285117737315"
                          className="text-primary hover:underline"
                        >
                          +62 851-1773-7315
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg mb-1">Email</h3>
                        <a
                          href="mailto:kuapecalungan15@gmail.com"
                          className="text-primary hover:underline break-all"
                        >
                          kuapecalungan15@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-3">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                        <MapPin className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heading font-bold text-lg mb-1">Alamat</h3>
                        <p className="text-muted-foreground text-sm">
                          Jl. Raya Pecalungan<br />
                          Kec. Pecalungan, Kab. Batang<br />
                          Jawa Tengah 51281
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading font-bold text-lg mb-2">Jam Operasional</h3>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <p><strong>Senin - Kamis:</strong> 08:00 - 15:00</p>
                      <p><strong>Jumat:</strong> 08:00 - 11:30</p>
                      <p><strong>Sabtu - Minggu:</strong> Tutup</p>
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
