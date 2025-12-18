import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, ChevronRight, Scroll, Sparkles, Search } from "lucide-react";
import { fiqihCategories } from "@/data/fiqihMaterials";

export default function FiqihMaterials() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      setScrollProgress((currentScroll / totalScroll) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const category = selectedCategory 
    ? fiqihCategories.find(c => c.id === selectedCategory)
    : null;

  const topic = selectedTopic && category
    ? category.topics.find(t => t.id === selectedTopic)
    : null;

  // Filter categories based on search query
  const filteredCategories = fiqihCategories.filter(category => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      category.title.toLowerCase().includes(query) ||
      category.description.toLowerCase().includes(query) ||
      category.topics.some(topic => 
        topic.title.toLowerCase().includes(query) ||
        topic.description.toLowerCase().includes(query)
      )
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
          <div className="absolute inset-0 pattern-bg opacity-30" />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Materi Fiqih Lengkap</span>
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Pelajari Fiqih Islam dengan Dalil yang Shahih
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Materi fiqih komprehensif dilengkapi dengan dalil Al-Qur'an dan Hadits Shahih
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Badge variant="outline" className="px-4 py-2">
                  <BookOpen className="h-4 w-4 mr-2" />
                  5 Kategori Fiqih
                </Badge>
                <Badge variant="outline" className="px-4 py-2">
                  <Scroll className="h-4 w-4 mr-2" />
                  Dalil Al-Qur'an & Hadits
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        {!selectedCategory && (
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="text-center mb-12 animate-fade-in-up">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Kategori Materi Fiqih
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Pilih kategori fiqih yang ingin Anda pelajari
                </p>
                
                {/* Search Bar */}
                <div className="max-w-xl mx-auto">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Cari kategori atau topik fiqih..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 h-12 text-base"
                    />
                  </div>
                  {searchQuery && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Ditemukan {filteredCategories.length} kategori
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {filteredCategories.length > 0 ? filteredCategories.map((category, index) => (
                  <Card 
                    key={category.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <CardHeader>
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">
                          {category.topics.length} Topik
                        </Badge>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
                )) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      Tidak ada kategori yang cocok dengan pencarian "{searchQuery}"
                    </p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setSearchQuery("")}
                    >
                      Reset Pencarian
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Topics Section */}
        {selectedCategory && !selectedTopic && category && (
          <section className="py-16 md:py-24">
            <div className="container">
              <div className="mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedCategory(null)}
                  className="mb-4"
                >
                  ← Kembali ke Kategori
                </Button>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{category.icon}</span>
                  <div>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold">
                      {category.title}
                    </h2>
                    <p className="text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.topics.map((topic, index) => (
                  <Card 
                    key={topic.id}
                    className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => setSelectedTopic(topic.id)}
                  >
                    <CardHeader>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors flex items-center justify-between">
                        {topic.title}
                        <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </CardTitle>
                      <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {topic.quranDalil.length} Ayat Al-Qur'an
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {topic.hadithDalil.length} Hadits
                        </Badge>

                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Topic Detail Section */}
        {selectedTopic && topic && category && (
          <section className="py-16 md:py-24">
            <div className="container max-w-4xl">
              <div className="mb-8">
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedTopic(null)}
                  className="mb-4"
                >
                  ← Kembali ke Topik
                </Button>
                <div className="animate-fade-in-up">
                  <Badge className="mb-4">{category.title}</Badge>
                  <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
                    {topic.title}
                  </h1>
                  <p className="text-xl text-muted-foreground mb-6">
                    {topic.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <Card className="mb-6 animate-fade-in-up" style={{ animationDelay: "100ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary" />
                    Penjelasan
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground leading-relaxed">{topic.content}</p>
                </CardContent>
              </Card>

              {/* Quran Dalil */}
              <Card className="mb-6 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="h-5 w-5 text-primary" />
                    Dalil Al-Qur'an
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {topic.quranDalil.map((dalil, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="mb-3">
                        <Badge variant="secondary" className="mb-2">
                          {dalil.surah} {dalil.number}
                        </Badge>
                        <p className="text-2xl font-arabic text-right leading-loose mb-3 text-primary">
                          {dalil.ayah}
                        </p>
                      </div>
                      <p className="text-foreground italic border-l-4 border-primary pl-4">
                        "{dalil.translation}"
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Hadith Dalil */}
              <Card className="mb-6 animate-fade-in-up" style={{ animationDelay: "300ms" }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scroll className="h-5 w-5 text-primary" />
                    Dalil Hadits
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {topic.hadithDalil.map((hadith, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <p className="text-xl font-arabic text-right leading-loose mb-3 text-primary">
                        {hadith.text}
                      </p>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p><strong>Riwayat:</strong> {hadith.source}</p>
                        <p><strong>Perawi:</strong> {hadith.narrator}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Practical Example */}
              {topic.practicalExample && (
                <Card className="mb-6 animate-fade-in-up bg-primary/5 border-primary/20" style={{ animationDelay: "500ms" }}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />
                      Contoh Praktis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-foreground leading-relaxed">{topic.practicalExample}</p>
                  </CardContent>
                </Card>
              )}

              {/* Navigation */}
              <div className="flex gap-4 mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedTopic(null)}
                  className="flex-1"
                >
                  ← Topik Lainnya
                </Button>
                <Button 
                  onClick={() => {
                    setSelectedTopic(null);
                    setSelectedCategory(null);
                  }}
                  className="flex-1"
                >
                  Kategori Utama
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {!selectedCategory && (
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                  Punya Pertanyaan Seputar Fiqih?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Ajukan pertanyaan Anda dan dapatkan jawaban dari ulama berpengalaman 
                  dengan dalil yang shahih
                </p>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="font-semibold"
                  onClick={() => window.location.href = "/submit-question"}
                >
                  Ajukan Pertanyaan Sekarang
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
}
