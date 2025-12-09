import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";
import { Plus, MessageSquare, Clock, CheckCircle, XCircle, Eye, Loader2 } from "lucide-react";

interface Question {
  id: string;
  title: string;
  question_text: string;
  category: string;
  madhab: string;
  urgency: string;
  status: string;
  created_at: string;
  answer_text?: string;
  answered_at?: string;
}

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      toast.error("Silakan login terlebih dahulu");
      setLocation("/user/login");
    }
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (user) {
      fetchQuestions();
    }
  }, [user]);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from("questions")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setQuestions(data || []);
    } catch (error: any) {
      toast.error("Gagal memuat pertanyaan", {
        description: error.message,
      });
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "Menunggu", variant: "secondary" as const, icon: Clock },
      approved: { label: "Disetujui", variant: "default" as const, icon: CheckCircle },
      answered: { label: "Terjawab", variant: "default" as const, icon: CheckCircle },
      rejected: { label: "Ditolak", variant: "destructive" as const, icon: XCircle },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl">
          {/* Header */}
          <div className="mb-8 animate-fade-in-up">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
              Dashboard Saya
            </h1>
            <p className="text-muted-foreground">
              Kelola pertanyaan fiqih Anda di sini
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Pertanyaan</p>
                    <p className="text-2xl font-bold">{questions.length}</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-primary opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Menunggu</p>
                    <p className="text-2xl font-bold">
                      {questions.filter(q => q.status === "pending").length}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-yellow-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Terjawab</p>
                    <p className="text-2xl font-bold">
                      {questions.filter(q => q.status === "answered").length}
                    </p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 flex items-center justify-center">
                <Button className="w-full gap-2" onClick={() => setLocation("/submit-question")}>
                  <Plus className="h-4 w-4" />
                  Ajukan Pertanyaan
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <Card className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <CardHeader>
              <CardTitle className="font-heading">Pertanyaan Saya</CardTitle>
              <CardDescription>
                Daftar pertanyaan yang telah Anda ajukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingQuestions ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : questions.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground mb-4">
                    Anda belum mengajukan pertanyaan
                  </p>
                  <Button onClick={() => setLocation("/submit-question")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ajukan Pertanyaan Pertama
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {questions.map((question, index) => (
                    <Card
                      key={question.id}
                      className="hover:shadow-md transition-shadow animate-fade-in-up"
                      style={{ animationDelay: `${(index + 1) * 50}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="font-heading font-bold text-lg flex-1">
                            {question.title}
                          </h3>
                          {getStatusBadge(question.status)}
                        </div>

                        <p className="text-muted-foreground mb-4 line-clamp-2">
                          {question.question_text}
                        </p>

                        <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
                          <Badge variant="outline">{question.category}</Badge>
                          <Badge variant="outline">{question.madhab}</Badge>
                          <span>•</span>
                          <span>{new Date(question.created_at).toLocaleDateString("id-ID")}</span>
                        </div>

                        {question.status === "answered" && question.answer_text && (
                          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                            <p className="text-sm font-medium text-primary mb-2">Jawaban:</p>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {question.answer_text}
                            </p>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                          onClick={() => setLocation(`/my-question/${question.id}`)}
                        >
                          <Eye className="h-4 w-4" />
                          Lihat Detail
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
