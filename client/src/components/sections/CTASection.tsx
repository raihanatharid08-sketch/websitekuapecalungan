import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-bg opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10" />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-6">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Siap Bertanya?
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Ajukan pertanyaan fiqih Anda sekarang dan dapatkan jawaban dari ulama berpengalaman. 
            Jawaban dijamin dalam 2-3 hari kerja.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="text-base font-body group min-w-[200px]" asChild>
              <Link href="/dashboard">
                Ajukan Pertanyaan Sekarang
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base font-body min-w-[200px]" asChild>
              <Link href="/tentang-kami">
                Tentang Kami
              </Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-12 inline-flex items-center gap-2 px-6 py-3 bg-card/80 backdrop-blur-sm rounded-full border border-border shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center"
                >
                  <span className="text-xs font-semibold text-primary">✓</span>
                </div>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              Bergabung dengan <strong className="text-foreground">10,000+</strong> pengguna lainnya
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
