import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Building2, HandHeart, Heart, Home, MessageCircle } from "lucide-react";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  href?: string;
}

function ServiceCard({ icon, title, description, action }: ServiceCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50">
      <CardHeader>
        <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
          {icon}
        </div>
        <CardTitle className="font-heading text-xl">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="ghost" className="group/btn p-0 h-auto font-body text-primary hover:text-primary/80">
          {action}
          <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function ServicesSection() {
  const services = [
    {
      icon: <Heart className="h-7 w-7 text-primary" />,
      title: "Pelayanan Nikah",
      description: "Pendaftaran nikah dan bimbingan perkawinan sesuai syariat Islam",
      action: "Pelajari Lebih Lanjut",
    },
    {
      icon: <BookOpen className="h-7 w-7 text-primary" />,
      title: "Konsultasi Syariah",
      description: "Tanya jawab fiqih dengan ulama berpengalaman",
      action: "Mulai Bertanya",
    },
    {
      icon: <Home className="h-7 w-7 text-primary" />,
      title: "Bimbingan Keluarga",
      description: "Konsultasi masalah keluarga dan rumah tangga",
      action: "Hubungi Kami",
    },
    {
      icon: <HandHeart className="h-7 w-7 text-primary" />,
      title: "Zakat dan Wakaf",
      description: "Informasi dan pengelolaan zakat dan wakaf",
      action: "Pelajari Lebih Lanjut",
    },
    {
      icon: <Building2 className="h-7 w-7 text-primary" />,
      title: "Pembinaan Masjid",
      description: "Program pembinaan dan pengembangan masjid",
      action: "Pelajari Lebih Lanjut",
    },
    {
      icon: <MessageCircle className="h-7 w-7 text-primary" />,
      title: "Pendidikan Islam",
      description: "Materi pendidikan Islam untuk masyarakat",
      action: "Akses Materi",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Layanan KUA Pecalungan
          </h2>
          <p className="text-lg text-muted-foreground">
            Kami menyediakan berbagai layanan keagamaan untuk melayani kebutuhan masyarakat
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}
