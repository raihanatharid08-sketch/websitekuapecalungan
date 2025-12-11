import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQSection() {
  const faqs = [
    {
      question: "Apakah layanan ini gratis?",
      answer: "Ya, layanan tanya jawab fiqih kami sepenuhnya gratis untuk semua masyarakat. Kami berkomitmen untuk memberikan akses informasi keagamaan yang berkualitas tanpa biaya.",
    },
    {
      question: "Berapa lama waktu untuk mendapatkan jawaban?",
      answer: "Rata-rata 2-3 hari kerja, tergantung kompleksitas pertanyaan. Kami berusaha memberikan jawaban yang komprehensif dan berdasarkan sumber yang terpercaya.",
    },
    {
      question: "Apakah identitas saya akan dirahasiakan?",
      answer: "Ya, kami menjaga kerahasiaan identitas penanya dalam publikasi jawaban. Hanya pertanyaan dan jawaban yang akan ditampilkan di website, tanpa informasi pribadi Anda.",
    },
    {
      question: "Siapa yang menjawab pertanyaan?",
      answer: "Pertanyaan dijawab oleh ulama berpengalaman yang memahami fiqih Islam dan memiliki kompetensi di bidangnya. Semua jawaban disertai dengan dalil dari Al-Qur'an dan Hadits.",
    },
    {
      question: "Bagaimana cara mengajukan pertanyaan?",
      answer: "Klik tombol 'Ajukan Pertanyaan' di bagian atas halaman, kemudian isi formulir dengan detail pertanyaan Anda. Pastikan pertanyaan ditulis dengan jelas dan lengkap.",
    },
    {
      question: "Apakah saya bisa bertanya tentang topik apa saja?",
      answer: "Anda dapat bertanya tentang berbagai topik fiqih Islam seperti ibadah, muamalah, keluarga, dan lainnya. Namun, pertanyaan harus sesuai dengan koridor syariat Islam.",
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span className="gradient-text">Pertanyaan</span> yang Sering Diajukan
            </h2>
            <p className="text-lg text-muted-foreground">
              Temukan jawaban untuk pertanyaan umum tentang layanan kami
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6 bg-card/80 backdrop-blur-sm hover:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="font-heading text-lg font-semibold text-left hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
