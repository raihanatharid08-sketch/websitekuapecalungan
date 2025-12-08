import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar,
  Eye,
  Tag,
  Mail
} from "lucide-react";

interface Question {
  id: string;
  title: string;
  description: string;
  status: string;
  urgency_level: string;
  contact_email: string;
  views_count: number;
  created_at: string;
  updated_at: string;
  categories: { name: string };
  answers: Array<{
    id: string;
    content: string;
    created_at: string;
    published_at: string;
    sources: any;
    madhabs: { name: string };
  }>;
}

export default function MyQuestion() {
  const { token } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (token) {
      loadQuestion();
    }
  }, [token]);

  const loadQuestion = async () => {
    const { data, error } = await supabase
      .from("questions")
      .select(`
        *,
        categories (name),
        answers (
          id,
          content,
          created_at,
          published_at,
          sources,
          madhabs (name)
        )
      `)
      .eq("access_token", token)
      .single();

    if (error) {
      console.error("Error loading question:", error);
      setNotFound(true);
      toast.error("Pertanyaan tidak ditemukan");
    } else {
      setQuestion(data);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      submitted: { label: "Menunggu Verifikasi", variant: "secondary" as const, icon: Clock },
      answered: { label: "Sudah Dijawab", variant: "default" as const, icon: CheckCircle2 },
      archived: { label: "Diarsipkan", variant: "outline" as const, icon: AlertCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.submitted;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const getUrgencyBadge = (level: string) => {
    const urgencyConfig = {
      low: { label: "Rendah", className: "bg-blue-100 text-blue-800" },
      medium: { label: "Sedang", className: "bg-yellow-100 text-yellow-800" },
      high: { label: "Tinggi", className: "bg-red-100 text-red-800" },
    };

    const config = urgencyConfig[level as keyof typeof urgencyConfig] || urgencyConfig.medium;

    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Memuat pertanyaan...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (notFound || !question) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="text-center">
                <CardContent className="py-12">
                  <AlertCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-heading font-bold mb-2">
                    Pertanyaan Tidak Ditemukan
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Link akses tidak valid atau pertanyaan telah dihapus.
                  </p>
                  <Button asChild>
                    <a href="/">Kembali ke Beranda</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const answer = question.answers?.[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(question.status)}
                      {getUrgencyBadge(question.urgency_level)}
                    </div>
                    <CardTitle className="text-2xl font-heading">
                      Status Pertanyaan Anda
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Diajukan: {new Date(question.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="h-4 w-4" />
                    <span>Kategori: {question.categories.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span>Email: {question.contact_email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>{question.views_count} kali dilihat</span>
                  </div>
                </div>

                {question.status === "submitted" && (
                  <div className="bg-muted/50 rounded-lg p-4 text-sm">
                    <p className="font-semibold mb-2">Pertanyaan Anda sedang diproses</p>
                    <p className="text-muted-foreground">
                      Tim kami sedang memverifikasi pertanyaan Anda dan akan segera meneruskannya kepada ulama.
                      Anda akan menerima notifikasi email ketika jawaban sudah tersedia.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Pertanyaan Anda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{question.title}</h3>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {question.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Answer Card */}
            {answer && (
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    <CardTitle className="font-heading">Jawaban dari Ulama</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dijawab pada {new Date(answer.published_at || answer.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric"
                    })}
                    {answer.madhabs && ` • Madhab: ${answer.madhabs.name}`}
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose prose-sm max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: answer.content }} />
                  </div>

                  {answer.sources && answer.sources.length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="font-semibold mb-2">Sumber Rujukan:</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                        {answer.sources.map((source: string, index: number) => (
                          <li key={index}>{source}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Privacy Notice */}
            <Card className="bg-muted/30">
              <CardContent className="py-4 text-sm text-muted-foreground text-center">
                <p>
                  🔒 Pertanyaan ini bersifat privat. Hanya Anda yang memiliki link ini yang bisa mengaksesnya.
                  Simpan link ini dengan baik untuk referensi di masa mendatang.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
