import { Button } from "@/components/ui/button";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { label: "Beranda", href: "/" },
    { label: "Materi Fiqih", href: "/materi-fiqih" },
    { label: "Tanya Jawab", href: "/qa" },
    { label: "Lokasi", href: "/lokasi" },
    { label: "Kontak", href: "/kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img 
              src="/kemenag-logo.png" 
              alt="Logo Kementerian Agama" 
              className="h-12 w-12 object-contain"
            />
            <div className="hidden sm:block">
              <div className="font-heading font-bold text-lg leading-tight text-foreground">
                KUA Pecalungan
              </div>
              <div className="text-xs text-muted-foreground">Kab. Batang</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={location === item.href ? "default" : "ghost"}
                  className="font-body"
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Link href="/submit-question">
              <Button className="hidden md:flex font-body">
                Ajukan Pertanyaan
              </Button>
            </Link>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={location === item.href ? "default" : "ghost"}
                    className="w-full justify-start font-body"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link href="/submit-question">
                <Button className="w-full mt-2 font-body" onClick={() => setIsMenuOpen(false)}>
                  Ajukan Pertanyaan
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
