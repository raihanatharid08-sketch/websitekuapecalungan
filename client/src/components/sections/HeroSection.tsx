import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function HeroSection() {
  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-20 animate-gentle-float" />
      
      {/* Decorative Circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mt-6 lg:mt-0">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Terpercaya & Profesional</span>
            </div>

            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              Konsultasi Hukum Islam{" "}
              <span className="gradient-text">KUA Pecalungan</span>
            </h1>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Tanya jawab fiqih dengan ulama berpengalaman berdasarkan Al-Qur'an dan Hadits.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="text-base font-body group" asChild>
                <Link href="/dashboard">
                  Mulai Bertanya Sekarang
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base font-body" asChild>
                <Link href="/materi-fiqih">
                  Lihat Materi Fiqih
                </Link>
              </Button>
            </div>



            {/* Response Time Card */}
            <div className="inline-flex items-center gap-4 bg-card/95 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-border mt-8 lg:mt-8 glow animate-scale-in">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-heading font-semibold text-lg">Respon Cepat</div>
                <div className="text-sm text-muted-foreground">Rata-rata 2-3 hari kerja</div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2 hidden lg:flex justify-center items-center animate-fade-in-right">
            <div className="relative w-full max-w-md" style={{ height: 'calc(100% - 4rem)' }}>
              <img 
                src="/hero-character.png" 
                alt="KUA Pecalungan Consultant" 
                className="w-full h-full object-contain drop-shadow-2xl"
                style={{ 
                  objectPosition: 'center',
                  maxHeight: '550px'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
