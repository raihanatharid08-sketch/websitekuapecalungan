import { CheckCircle2, Clock, Mail, MessageSquare } from "lucide-react";

interface StepProps {
  number: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
}

function Step({ number, icon, title, description, isLast }: StepProps) {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        {/* Step Number Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            {icon}
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center border-4 border-background">
            <span className="text-xs font-bold text-secondary-foreground">{number}</span>
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

      {/* Connector Line (Desktop) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
      )}
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Bagaimana Cara Menggunakan Layanan Kami?
          </h2>
          <p className="text-lg text-muted-foreground">
            Proses yang mudah dan transparan untuk mendapatkan jawaban atas pertanyaan fiqih Anda
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative">
          <Step
            number={1}
            icon={<MessageSquare className="h-10 w-10 text-primary-foreground" />}
            title="Ajukan Pertanyaan"
            description="Isi formulir dengan pertanyaan fiqih Anda secara detail dan jelas"
          />
          <Step
            number={2}
            icon={<CheckCircle2 className="h-10 w-10 text-primary-foreground" />}
            title="Verifikasi Pertanyaan"
            description="Tim kami memverifikasi dan meneruskan pertanyaan Anda kepada ulama"
          />
          <Step
            number={3}
            icon={<Clock className="h-10 w-10 text-primary-foreground" />}
            title="Tunggu Jawaban"
            description="Ulama kami menyiapkan jawaban berdasarkan sumber Islam yang terpercaya"
          />
          <Step
            number={4}
            icon={<Mail className="h-10 w-10 text-primary-foreground" />}
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
