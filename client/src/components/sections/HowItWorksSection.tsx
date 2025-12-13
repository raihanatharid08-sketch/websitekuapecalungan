import { CheckCircle2, Clock, Mail, MessageSquare } from "lucide-react";

interface StepProps {
  number: number;
  iconImage: string;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, iconImage, title, description, isLast }: StepProps) {
  return (
    <div className="relative animate-fade-in-bottom">
      <div className="flex flex-col items-center text-center transition-transform hover:scale-105 duration-300">
        {/* Step Number Badge */}
        <div className="relative mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center shadow-lg p-3 hover:shadow-xl transition-all duration-300">
            <img 
              src={iconImage} 
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center border-4 border-background">
            <span className="text-xs font-bold text-primary-foreground">{number}</span>
          </div>
        </div>

        {/* Content */}
        <h3 className="font-heading text-xl md:text-2xl font-semibold mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed max-w-xs">
          {description}
        </p>
      </div>

      {/* Connector Line (Desktop) - Behind Icon */}
      {!isLast && (
        <div className="hidden lg:block absolute top-12 left-1/2 w-full h-1 bg-gradient-to-r from-primary/30 via-primary/50 to-primary/30 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/70 to-transparent animate-pulse" />
        </div>
      )}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Bagaimana Cara <span className="gradient-text">Menggunakan Layanan</span> Kami?
          </h2>
          <p className="text-lg text-muted-foreground">
            Proses yang mudah dan transparan untuk mendapatkan jawaban atas pertanyaan fiqih Anda
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          <Step
            number={1}
            iconImage="/step1-icon.png"
            title="Ajukan Pertanyaan"
            description="Isi formulir dengan pertanyaan fiqih Anda secara detail dan jelas"
          />
          <Step
            number={2}
            iconImage="/step2-icon.png"
            title="Verifikasi Pertanyaan"
            description="Tim kami memverifikasi dan meneruskan pertanyaan Anda kepada ulama"
          />
          <Step
            number={3}
            iconImage="/step3-icon.png"
            title="Tunggu Jawaban"
            description="Ulama kami menyiapkan jawaban berdasarkan sumber Islam yang terpercaya"
          />
          <Step
            number={4}
            iconImage="/step4-icon.png"
            title="Terima Jawaban"
            description="Dapatkan jawaban melalui email dan lihat di website kami"
            isLast
          />
        </div>

        {/* Timeline Note */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            <Clock className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-primary">
              Biasanya dijawab dalam 2-3 hari kerja
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
