import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { supabase } from "@/lib/supabase";
import { ArrowLeft, Calendar, Eye, Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "wouter";
import { toast } from "sonner";

interface QuestionDetail {
  id: string;
  title: string;
  description: string;
  created_at: string;
  views_count: number;
  categories: {
    name: string;
  };
  answers: Array<{
    id: string;
    content: string;
    created_at: string;
    published_at: string;
    madhabs: {
      name: string;
    } | null;
    sources: any;
  }>;
}

export default function QADetail() {
  const { id } = useParams();
  const [question, setQuestion] = useState<QuestionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number>(0);
  const [hasRated, setHasRated] = useState(false);

  useEffect(() => {
    if (id) {
      loadQuestion();
      incrementViews();
    }
  }, [id]);

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
      .eq("id", id)
      .eq("status", "answered")
      .single();

    if (error) {
      console.error("Error loading question:", error);
      toast.error("Pertanyaan tidak ditemukan");
    } else {
      setQuestion(data);
    }
    setLoading(false);
  };

  const incrementViews = async () => {
    await supabase.rpc("increment_views", { question_id: id });
  };

  const handleRating = async (value: number) => {
    if (!question?.answers[0]) return;

    const { error } = await supabase.from("ratings").insert([
      {
        answer_id: question.answers[0].id,
        rating: value,
        is_helpful: value >= 4,
      },
    ]);

    if (error) {
      if (error.code === "23505") {
        toast.error("Anda sudah memberikan rating untuk jawaban ini");
      } else {
        toast.error("Gagal memberikan rating");
      }
    } else {
      setRating(value);
      setHasRated(true);
      toast.success("Terima kasih atas rating Anda!");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Memuat pertanyaan...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Pertanyaan Tidak Ditemukan</h2>
            <p className="text-muted-foreground mb-6">
              Pertanyaan yang Anda cari tidak tersedia atau belum dijawab
            </p>
            <Button onClick={() => window.history.back()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const answer = question.answers[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button variant="ghost" onClick={() => window.history.back()} className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali
            </Button>

            {/* Question Card */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {question.categories.name}
                  </span>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(question.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views_count} views</span>
                    </div>
                  </div>
                </div>
                <CardTitle className="font-heading text-2xl md:text-3xl">
                  {question.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm md:prose-base max-w-none">
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                    {question.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Answer Card */}
            {answer && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-heading text-xl flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold text-sm">J</span>
                    </div>
                    Jawaban
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4">
                      {answer.madhabs && (
                        <span>Madhab: {answer.madhabs.name}</span>
                      )}
                      <span>Dijawab pada {formatDate(answer.published_at || answer.created_at)}</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Answer Content */}
                  <div className="prose prose-sm md:prose-base max-w-none">
                    <div className="text-foreground leading-relaxed whitespace-pre-wrap">
                      {answer.content}
                    </div>
                  </div>

                  {/* Sources */}
                  {answer.sources && answer.sources.length > 0 && (
                    <>
                      <Separator />
                      <div>
                        <h4 className="font-semibold mb-3">Sumber Referensi:</h4>
                        <ul className="space-y-2">
                          {answer.sources.map((source: any, index: number) => (
                            <li key={index} className="text-sm text-muted-foreground">
                              {source.title || source}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  )}

                  {/* Rating Section */}
                  <Separator />
                  <div>
                    <h4 className="font-semibold mb-3">Apakah jawaban ini membantu?</h4>
                    {hasRated ? (
                      <div className="text-center py-4 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          Terima kasih atas feedback Anda!
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-3">
                            Berikan rating (1-5 bintang):
                          </p>
                          <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((value) => (
                              <button
                                key={value}
                                onClick={() => handleRating(value)}
                                className="p-2 hover:bg-muted rounded-lg transition-colors"
                              >
                                <Star
                                  className={`h-6 w-6 ${
                                    value <= rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRating(5)}
                            className="flex-1 sm:flex-none"
                          >
                            <ThumbsUp className="mr-2 h-4 w-4" />
                            Membantu
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleRating(2)}
                            className="flex-1 sm:flex-none"
                          >
                            <ThumbsDown className="mr-2 h-4 w-4" />
                            Kurang Membantu
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
