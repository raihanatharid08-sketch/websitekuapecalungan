import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";
import { Link } from "wouter";

export default function CTASection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pattern-bg opacity-20 animate-gentle-float" />
      
      {/* Gradient Overlay with Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background/50 to-secondary/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl animate-pulse" />

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Image */}
            <div className="flex justify-center animate-fade-in-left">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
                <img 
                  src="/consultation-character.png" 
                  alt="Islamic Consultation" 
                  className="relative w-full max-w-md h-auto object-contain drop-shadow-2xl rounded-2xl"
                />
              </div>
            </div>

            {/* Right Content */}
            <div className="text-center lg:text-left">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl mb-6 glow animate-scale-in">
            <Mail className="h-8 w-8 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in-up">
            Siap <span className="gradient-text">Bertanya</span>?
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
              <Link href="/kontak">
                Hubungi Kami
              </Link>
            </Button>
          </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
