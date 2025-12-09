import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Building2, Target, Eye, Award, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
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
                Tentang Kami
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground">
                Kantor Urusan Agama Kecamatan Pecalungan, Kabupaten Batang
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            {/* Profile */}
            <div className="mb-16 animate-fade-in-up">
              <Card>
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                        <Building2 className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h2 className="font-heading text-2xl md:text-3xl font-bold mb-4">
                        Kantor Urusan Agama Kecamatan Pecalungan
                      </h2>
                      <div className="prose prose-lg max-w-none text-muted-foreground">
                        <p className="mb-4">
                          Kantor Urusan Agama (KUA) Kecamatan Pecalungan merupakan instansi vertikal Kementerian Agama Republik Indonesia yang bertugas melaksanakan sebagian tugas Kantor Kementerian Agama Kabupaten Batang di bidang urusan agama Islam dalam wilayah Kecamatan Pecalungan.
                        </p>
                        <p className="mb-4">
                          Sebagai lembaga pemerintah yang bersentuhan langsung dengan masyarakat, KUA Pecalungan berkomitmen untuk memberikan pelayanan terbaik dalam bidang pencatatan nikah, rujuk, konsultasi keluarga sakinah, bimbingan manasik haji, dan konsultasi hukum Islam (fiqih).
                        </p>
                        <p>
                          Melalui platform konsultasi fiqih online ini, kami berupaya memberikan kemudahan akses bagi masyarakat untuk berkonsultasi dengan ulama dan ustadz yang kompeten dalam menjawab permasalahan keagamaan sesuai dengan Al-Qur'an, Hadits, dan pendapat para ulama madhab.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Eye className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-3">Visi</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Terwujudnya masyarakat Kecamatan Pecalungan yang religius, harmonis, dan sejahtera melalui pelayanan keagamaan yang profesional dan berkualitas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold mb-3">Misi</h3>
                      <ul className="text-muted-foreground leading-relaxed space-y-2">
                        <li>• Memberikan pelayanan administrasi nikah yang cepat, mudah, dan transparan</li>
                        <li>• Membina keluarga sakinah, mawaddah, warahmah</li>
                        <li>• Memberikan bimbingan dan konsultasi hukum Islam</li>
                        <li>• Meningkatkan kualitas ibadah masyarakat</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Services */}
            <div className="mb-16">
              <div className="text-center mb-12 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <h2 className="font-heading text-3xl font-bold mb-4">
                  Layanan Kami
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  KUA Pecalungan menyediakan berbagai layanan untuk memenuhi kebutuhan keagamaan masyarakat
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: BookOpen,
                    title: "Konsultasi Fiqih",
                    description: "Layanan konsultasi hukum Islam dengan ulama berpengalaman",
                  },
                  {
                    icon: Users,
                    title: "Pencatatan Nikah",
                    description: "Pelayanan administrasi pernikahan sesuai syariat dan peraturan",
                  },
                  {
                    icon: Award,
                    title: "Bimbingan Keluarga",
                    description: "Pembinaan keluarga sakinah dan konseling pernikahan",
                  },
                ].map((service, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow animate-fade-in-up"
                    style={{ animationDelay: `${(index + 4) * 100}ms` }}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <service.icon className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="font-heading font-bold text-lg mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {service.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <Card className="bg-primary/5 border-primary/20 animate-fade-in-up" style={{ animationDelay: "700ms" }}>
              <CardContent className="p-8 md:p-12">
                <div className="text-center">
                  <h3 className="font-heading text-2xl font-bold mb-4">
                    Hubungi Kami
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Untuk informasi lebih lanjut atau konsultasi langsung, silakan hubungi kami
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Telepon:</span>
                      <a href="tel:+6285117737315" className="text-primary hover:underline">
                        +62 851-1773-7315
                      </a>
                    </div>
                    <span className="hidden md:inline text-muted-foreground">•</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:kuapecalungan15@gmail.com" className="text-primary hover:underline">
                        kuapecalungan15@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
