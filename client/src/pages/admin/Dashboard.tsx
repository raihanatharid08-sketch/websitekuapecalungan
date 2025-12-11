import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Clock, MessageSquare, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface Stats {
  totalQuestions: number;
  pendingQuestions: number;
  answeredQuestions: number;
  totalViews: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalQuestions: 0,
    pendingQuestions: 0,
    answeredQuestions: 0,
    totalViews: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      // Total questions
      const { count: totalQuestions } = await supabase
        .from("questions")
        .select("*", { count: "exact", head: true });

      // Pending questions
      const { count: pendingQuestions } = await supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("status", "submitted");

      // Answered questions
      const { count: answeredQuestions } = await supabase
        .from("questions")
        .select("*", { count: "exact", head: true })
        .eq("status", "answered");

      // Total views
      const { data: viewsData } = await supabase
        .from("questions")
        .select("views_count");
      
      const totalViews = viewsData?.reduce((sum, q) => sum + (q.views_count || 0), 0) || 0;

      setStats({
        totalQuestions: totalQuestions || 0,
        pendingQuestions: pendingQuestions || 0,
        answeredQuestions: answeredQuestions || 0,
        totalViews,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Pertanyaan",
      value: stats.totalQuestions,
      description: "Semua pertanyaan yang masuk",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Menunggu Jawaban",
      value: stats.pendingQuestions,
      description: "Pertanyaan yang belum dijawab",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },
    {
      title: "Sudah Dijawab",
      value: stats.answeredQuestions,
      description: "Pertanyaan yang sudah dijawab",
      icon: CheckCircle2,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Views",
      value: stats.totalViews,
      description: "Total views semua pertanyaan",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Memuat statistik...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-heading text-3xl font-bold mb-2">Dashboard Admin</h1>
        <p className="text-muted-foreground">
          Ringkasan statistik dan aktivitas platform
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aksi Cepat</CardTitle>
          <CardDescription>
            Navigasi cepat ke fitur-fitur utama admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <a
              href="/admin/questions"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <MessageSquare className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Kelola Pertanyaan</h3>
              <p className="text-sm text-muted-foreground">
                Lihat dan kelola semua pertanyaan
              </p>
            </a>
            <a
              href="/admin/categories"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <CheckCircle2 className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Kelola Kategori</h3>
              <p className="text-sm text-muted-foreground">
                Tambah dan edit kategori pertanyaan
              </p>
            </a>
            <a
              href="/admin/madhabs"
              className="p-4 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <Users className="h-6 w-6 text-primary mb-2" />
              <h3 className="font-semibold mb-1">Kelola Madhab</h3>
              <p className="text-sm text-muted-foreground">
                Tambah dan edit madhab
              </p>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
