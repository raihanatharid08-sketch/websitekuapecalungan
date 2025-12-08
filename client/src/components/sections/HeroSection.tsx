import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div 
        className="absolute inset-0 pattern-bg opacity-40"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Terpercaya & Profesional</span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Konsultasi Hukum Islam Terpercaya Dari{" "}
              <span className="text-primary">KUA Pecalungan</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Tanya jawab fiqih dengan ulama berpengalaman untuk menjawab pertanyaan agama Anda. 
              Dapatkan jawaban yang komprehensif berdasarkan Al-Qur'an dan Hadits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-base font-body group">
                Mulai Bertanya Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="text-base font-body">
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                    >
                      <span className="text-xs font-semibold text-primary">U</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  Dipercaya oleh <strong className="text-foreground">10,000+</strong> masyarakat
                </span>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block animate-gentle-float">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl arch-top">
              <img
                src="/kua-building.png"
                alt="Kantor Urusan Agama Pecalungan"
                className="w-full h-auto object-cover"
              />
              {/* Overlay Card */}
              <div className="absolute bottom-8 left-8 right-8 bg-card/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-lg">Respon Cepat</div>
                    <div className="text-sm text-muted-foreground">Rata-rata 2-3 hari kerja</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Pattern */}
            <div className="absolute -top-8 -right-8 w-32 h-32 opacity-20">
              <img src="/pattern-overlay.png" alt="" className="w-full h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
