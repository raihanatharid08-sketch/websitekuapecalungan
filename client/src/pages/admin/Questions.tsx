import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Clock, Eye, Loader2, MessageSquare, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Question {
  id: string;
  title: string;
  description: string;
  status: string;
  urgency_level: string;
  contact_email: string;
  views_count: number;
  created_at: string;
  is_public: boolean;
  access_token: string;
  categories: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

export default function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answerDialogOpen, setAnswerDialogOpen] = useState(false);
  const [answerForm, setAnswerForm] = useState({
    content: "",
    sources: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadQuestions();
    loadCategories();
  }, [filterStatus]);

  const loadQuestions = async () => {
    setLoading(true);
    
    let query = supabase
      .from("questions")
      .select(`
        *,
        categories (name)
      `)
      .order("created_at", { ascending: false });

    if (filterStatus !== "all") {
      query = query.eq("status", filterStatus);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading questions:", error);
      toast.error("Gagal memuat pertanyaan");
    } else {
      setQuestions(data || []);
    }
    
    setLoading(false);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });
    
    if (data) setCategories(data);
  };



  const handleAnswerQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setAnswerDialogOpen(true);
    setAnswerForm({
      content: "",
      sources: "",
    });
  };

  const handleSubmitAnswer = async () => {
    if (!selectedQuestion || !answerForm.content) {
      toast.error("Isi jawaban terlebih dahulu");
      return;
    }

    setSubmitting(true);

    try {
      // Get current user (admin)
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("Anda harus login sebagai admin");
        return;
      }

      // Parse sources
      const sources = answerForm.sources
        ? answerForm.sources.split("\n").filter((s) => s.trim())
        : [];

      // Insert answer
      const { error: answerError } = await supabase.from("answers").insert([
        {
          question_id: selectedQuestion.id,
          admin_id: user.id,
          content: answerForm.content,
          madhab_id: null,
          sources: sources.length > 0 ? sources : null,
          status: "published",
          published_at: new Date().toISOString(),
        },
      ]);

      if (answerError) throw answerError;

      // Update question status
      const { error: updateError } = await supabase
        .from("questions")
        .update({ status: "answered" })
        .eq("id", selectedQuestion.id);

      if (updateError) throw updateError;

      toast.success("Jawaban berhasil dipublikasikan!");
      setAnswerDialogOpen(false);
      loadQuestions();
    } catch (error: any) {
      console.error("Error submitting answer:", error);
      toast.error(error.message || "Gagal menyimpan jawaban");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteQuestion = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
      return;
    }

    const { error } = await supabase.from("questions").delete().eq("id", id);

    if (error) {
      toast.error("Gagal menghapus pertanyaan");
    } else {
      toast.success("Pertanyaan berhasil dihapus");
      loadQuestions();
    }
  };

  const handleTogglePublic = async (id: string, isPublic: boolean) => {
    const { error } = await supabase
      .from("questions")
      .update({ is_public: isPublic })
      .eq("id", id);

    if (error) {
      toast.error("Gagal mengubah status publikasi");
    } else {
      toast.success(isPublic ? "Pertanyaan dipublikasikan sebagai FAQ" : "Pertanyaan dibuat privat");
      loadQuestions();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      submitted: { label: "Menunggu", color: "bg-yellow-100 text-yellow-800" },
      answered: { label: "Dijawab", color: "bg-green-100 text-green-800" },
      archived: { label: "Arsip", color: "bg-gray-100 text-gray-800" },
    };
    const badge = badges[status as keyof typeof badges] || badges.submitted;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.color}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold mb-2">Kelola Pertanyaan</h1>
          <p className="text-muted-foreground">
            Lihat dan kelola semua pertanyaan yang masuk
          </p>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="submitted">Menunggu Jawaban</SelectItem>
                <SelectItem value="answered">Sudah Dijawab</SelectItem>
                <SelectItem value="archived">Arsip</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Questions List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Memuat pertanyaan...</p>
        </div>
      ) : questions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-semibold mb-2">Tidak ada pertanyaan</p>
            <p className="text-muted-foreground">
              Belum ada pertanyaan dengan filter yang dipilih
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {questions.map((question) => (
            <Card key={question.id}>
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {getStatusBadge(question.status)}
                      <span className="text-xs text-muted-foreground">
                        {question.categories.name}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(question.created_at)}
                      </span>
                    </div>
                    <CardTitle className="font-heading text-xl mb-2">
                      {question.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {question.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{question.views_count} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {question.urgency_level === "high" ? (
                        <Clock className="h-4 w-4 text-red-500" />
                      ) : (
                        <Clock className="h-4 w-4" />
                      )}
                      <span className="capitalize">{question.urgency_level}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {question.status === "submitted" && (
                      <Button
                        size="sm"
                        onClick={() => handleAnswerQuestion(question)}
                      >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Jawab
                      </Button>
                    )}
                    {question.status === "answered" && (
                      <Button
                        size="sm"
                        variant={question.is_public ? "default" : "outline"}
                        onClick={() => handleTogglePublic(question.id, !question.is_public)}
                      >
                        {question.is_public ? "✓ Publik (FAQ)" : "Jadikan FAQ"}
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(`/my-question/${question.access_token}`, "_blank")}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      Lihat
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Answer Dialog */}
      <Dialog open={answerDialogOpen} onOpenChange={setAnswerDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Jawab Pertanyaan</DialogTitle>
            <DialogDescription>
              {selectedQuestion?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Question Detail */}
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm font-semibold mb-2">Pertanyaan:</p>
              <p className="text-sm whitespace-pre-wrap">
                {selectedQuestion?.description}
              </p>
            </div>

            {/* Answer Content */}
            <div className="space-y-2">
              <Label htmlFor="answer-content">
                Jawaban <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="answer-content"
                placeholder="Tulis jawaban lengkap dengan dalil..."
                value={answerForm.content}
                onChange={(e) =>
                  setAnswerForm({ ...answerForm, content: e.target.value })
                }
                rows={12}
                className="resize-none font-mono text-sm"
              />
            </div>

            {/* Sources */}
            <div className="space-y-2">
              <Label htmlFor="sources">Sumber Referensi</Label>
              <Textarea
                id="sources"
                placeholder="Masukkan sumber referensi (satu per baris)&#10;Contoh:&#10;Al-Qur'an Surah Al-Baqarah ayat 183&#10;Hadits Shahih Bukhari No. 1891"
                value={answerForm.sources}
                onChange={(e) =>
                  setAnswerForm({ ...answerForm, sources: e.target.value })
                }
                rows={4}
                className="resize-none text-sm"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setAnswerDialogOpen(false)}
              disabled={submitting}
            >
              Batal
            </Button>
            <Button onClick={handleSubmitAnswer} disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                "Publikasikan Jawaban"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
