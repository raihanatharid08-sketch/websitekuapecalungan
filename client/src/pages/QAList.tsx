import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";
import { ArrowRight, Eye, MessageSquare, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface Question {
  id: string;
  title: string;
  description: string;
  category_id: string;
  views_count: number;
  created_at: string;
  categories: {
    name: string;
  };
  answers: Array<{
    id: string;
    created_at: string;
  }>;
}

interface Category {
  id: string;
  name: string;
}

export default function QAList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    loadCategories();
    loadQuestions();
  }, [selectedCategory]);

  const loadCategories = async () => {
    const { data } = await supabase
      .from("categories")
      .select("id, name")
      .order("display_order", { ascending: true });

    if (data) {
      setCategories(data);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    
    let query = supabase
      .from("questions")
      .select(`
        *,
        categories (name),
        answers (id, created_at)
      `)
      .eq("status", "answered")
      .eq("is_public", true)
      .order("created_at", { ascending: false });

    if (selectedCategory !== "all") {
      query = query.eq("category_id", selectedCategory);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error loading questions:", error);
    } else {
      setQuestions(data || []);
    }
    
    setLoading(false);
  };

  const filteredQuestions = questions.filter((q) =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
              FAQ - Pertanyaan yang Sering Diajukan
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Koleksi pertanyaan dan jawaban fiqih pilihan dari ulama kami untuk referensi umum
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Cari pertanyaan..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Semua Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questions List */}
          <div className="max-w-4xl mx-auto space-y-4">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                <p className="mt-4 text-muted-foreground">Memuat pertanyaan...</p>
              </div>
            ) : filteredQuestions.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg font-semibold mb-2">Tidak ada FAQ ditemukan</p>
                  <p className="text-muted-foreground mb-6">
                    {searchQuery
                      ? "Coba kata kunci lain atau ubah filter kategori"
                      : "Belum ada FAQ yang dipublikasikan"}
                  </p>
                  <Button asChild>
                    <Link href="/submit-question">Ajukan Pertanyaan Anda</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <>
                {filteredQuestions.map((question) => (
                  <Card key={question.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                              {question.categories.name}
                            </span>
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
                            <MessageSquare className="h-4 w-4" />
                            <span>{question.answers.length} jawaban</span>
                          </div>
                        </div>
                        <Button variant="ghost" asChild className="group">
                          <Link href={`/qa/${question.id}`}>
                            Lihat Detail
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Pagination placeholder */}
                <div className="text-center py-8">
                  <p className="text-sm text-muted-foreground">
                    Menampilkan {filteredQuestions.length} pertanyaan
                  </p>
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="text-center py-8">
                <h3 className="font-heading text-2xl font-bold mb-2">
                  Punya Pertanyaan Fiqih?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Ajukan pertanyaan Anda dan dapatkan jawaban dari ulama berpengalaman
                </p>
                <Button size="lg" asChild>
                  <Link href="/submit-question">
                    Ajukan Pertanyaan Sekarang
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
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
