import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const whatsappNumber = "6285117737315"; // Format: country code + number without +
  const message = encodeURIComponent(
    "Assalamualaikum, saya ingin berkonsultasi mengenai hukum Islam."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Hubungi via WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-full mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Hubungi via WhatsApp
      </span>
    </a>
  );
}
