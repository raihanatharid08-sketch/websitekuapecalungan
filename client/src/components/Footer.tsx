import { Facebook, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">K</span>
              </div>
              <div>
                <div className="font-heading font-bold text-lg leading-tight">
                  KUA Pecalungan
                </div>
                <div className="text-xs text-muted-foreground">Kab. Batang</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Kantor Urusan Agama Kecamatan Pecalungan memberikan pelayanan keagamaan yang berkualitas, transparan, dan akuntabel kepada masyarakat.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-base mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Jl. Raya Pecalungan, Kec. Pecalungan, Kab. Batang, Jawa Tengah</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="tel:+6285117737315" className="text-muted-foreground hover:text-primary transition-colors">
                  +62 851-1773-7315
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MessageCircle className="h-4 w-4 flex-shrink-0 text-[#25D366]" />
                <a 
                  href="https://wa.me/6285117737315?text=Assalamualaikum%2C%20saya%20ingin%20berkonsultasi%20mengenai%20hukum%20Islam." 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#25D366] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <a href="mailto:kuapecalungan15@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                  kuapecalungan15@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Facebook className="h-4 w-4 flex-shrink-0 text-primary" />
                <a 
                  href="https://www.facebook.com/kuapecalungan112515" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  KUA Pecalungan
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} KUA Pecalungan. Kementerian Agama Republik Indonesia.
            </p>
            <div className="flex gap-6">
              <Link href="/kebijakan-privasi" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Kebijakan Privasi
              </Link>
              <Link href="/syarat-ketentuan" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
