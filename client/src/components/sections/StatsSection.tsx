import { MessageSquare, Users, Clock, ThumbsUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  delay?: number;
}

function StatItem({ icon, value, label, delay = 0 }: StatItemProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`text-center transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4">
        {icon}
      </div>
      <div className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
        {value}
      </div>
      <div className="text-base text-muted-foreground font-body">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-card/50">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          <StatItem
            icon={<MessageSquare className="h-8 w-8 text-primary" />}
            value="5,000+"
            label="Pertanyaan Terjawab"
            delay={0}
          />
          <StatItem
            icon={<Users className="h-8 w-8 text-primary" />}
            value="10,000+"
            label="Pengguna Aktif"
            delay={100}
          />
          <StatItem
            icon={<Clock className="h-8 w-8 text-primary" />}
            value="2-3 Hari"
            label="Rata-rata Respon"
            delay={200}
          />
          <StatItem
            icon={<ThumbsUp className="h-8 w-8 text-primary" />}
            value="98%"
            label="Kepuasan Pengguna"
            delay={300}
          />
        </div>
      </div>
    </section>
  );
}
