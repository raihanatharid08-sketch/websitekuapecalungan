import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

interface Category {
  id: string;
  name: string;
  description: string;
}

export default function SubmitQuestion() {
  const { user, loading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    urgency_level: "medium",
    contact_email: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Silakan login terlebih dahulu");
      setLocation("/user/login");
    }
  }, [user, authLoading, setLocation]);

  useEffect(() => {
    if (user) {
      loadCategories();
    }
  }, [user]);

  const loadCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error loading categories:", error);
      toast.error("Gagal memuat kategori");
    } else {
      setCategories(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate unique access token
      const accessToken = crypto.randomUUID();

      const { data, error } = await supabase.from("questions").insert([
        {
          ...formData,
          user_id: user?.id,
          status: "submitted",
          views_count: 0,
          access_token: accessToken,
          is_public: false,
        },
      ]).select();

      if (error) throw error;

      // Store access URL for display
      const accessUrl = `${window.location.origin}/my-question/${accessToken}`;
      localStorage.setItem('lastQuestionAccessUrl', accessUrl);

      setSubmitted(true);
      toast.success("Pertanyaan berhasil dikirim!");
      
      // Reset form
      setFormData({
        title: "",
        description: "",
        category_id: "",
        urgency_level: "medium",
        contact_email: "",
      });
    } catch (error: any) {
      console.error("Error submitting question:", error);
      toast.error(error.message || "Gagal mengirim pertanyaan");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 py-16 md:py-24">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <Card className="text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl font-heading">
                    Pertanyaan Berhasil Dikirim!
                  </CardTitle>
                  <CardDescription className="text-base">
                    Terima kasih telah mengajukan pertanyaan. Tim kami akan segera memverifikasi dan
                    meneruskan pertanyaan Anda kepada ulama kami.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Access Link */}
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <p className="font-semibold mb-2 text-sm">Link Akses Pertanyaan Anda:</p>
                    <div className="bg-background rounded p-3 mb-2 break-all text-sm font-mono">
                      {localStorage.getItem('lastQuestionAccessUrl')}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Simpan link ini! Anda akan membutuhkannya untuk melihat status dan jawaban pertanyaan Anda.
                      Link juga akan dikirim ke email Anda.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-lg p-4 text-sm text-muted-foreground">
                    <p className="font-semibold mb-2">Apa yang terjadi selanjutnya?</p>
                    <ol className="list-decimal list-inside space-y-1 text-left">
                      <li>Tim kami akan memverifikasi pertanyaan Anda (1 hari kerja)</li>
                      <li>Pertanyaan akan diteruskan kepada ulama yang kompeten</li>
                      <li>Jawaban akan dikirim ke email Anda (2-3 hari kerja)</li>
                      <li>Anda bisa cek status via link di atas kapan saja</li>
                    </ol>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button onClick={() => setSubmitted(false)}>
                      Ajukan Pertanyaan Lain
                    </Button>
                    <Button variant="outline" onClick={() => window.location.href = "/qa"}>
                      Lihat Q&A Lainnya
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                Ajukan Pertanyaan Fiqih
              </h1>
              <p className="text-lg text-muted-foreground">
                Sampaikan pertanyaan Anda dengan jelas dan lengkap untuk mendapatkan jawaban yang
                komprehensif dari ulama kami
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle className="font-heading">Form Pertanyaan</CardTitle>
                <CardDescription>
                  Semua field yang ditandai dengan (*) wajib diisi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Judul Pertanyaan <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="Contoh: Hukum shalat berjamaah di masjid"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                      maxLength={255}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tulis judul yang singkat dan jelas (maksimal 255 karakter)
                    </p>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">
                      Detail Pertanyaan <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Jelaskan pertanyaan Anda secara detail..."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={8}
                      className="resize-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      Semakin detail pertanyaan Anda, semakin komprehensif jawaban yang akan
                      diberikan
                    </p>
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label htmlFor="category">
                      Kategori <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={formData.category_id}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category_id: value })
                      }
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori pertanyaan" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Urgency Level */}
                  <div className="space-y-2">
                    <Label htmlFor="urgency">Tingkat Urgensi</Label>
                    <Select
                      value={formData.urgency_level}
                      onValueChange={(value) =>
                        setFormData({ ...formData, urgency_level: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Rendah (Tidak mendesak)</SelectItem>
                        <SelectItem value="medium">Sedang (Normal)</SelectItem>
                        <SelectItem value="high">Tinggi (Mendesak)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      value={formData.contact_email}
                      onChange={(e) =>
                        setFormData({ ...formData, contact_email: e.target.value })
                      }
                      required
                    />
                    <p className="text-xs text-muted-foreground">
                      Jawaban akan dikirim ke email ini. Identitas Anda akan dirahasiakan.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <Button type="submit" disabled={loading} className="flex-1">
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        "Kirim Pertanyaan"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => window.history.back()}
                    >
                      Batal
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
