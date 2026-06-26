import { Phone, MessageCircle } from "lucide-react";
import { SITE, WHATSAPP_MESSAGE } from "../../utils/constants";

export default function FloatingButtons() {
  const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* WhatsApp — primary CTA with attention pulse */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 ring-4 ring-white/70 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-emerald-600 hover:shadow-xl hover:shadow-emerald-500/50 active:scale-95"
      >
        {/* Pulsing ring — draws the eye without being noisy */}
        <span className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-emerald-400 opacity-40" />
        <MessageCircle className="relative h-7 w-7" strokeWidth={2.5} />

        {/* Hover tooltip (desktop only) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Chat on WhatsApp
        </span>
      </a>

      {/* Call */}
      <a
        href={`tel:${SITE.phone}`}
        aria-label="Call us"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg shadow-slate-900/30 ring-4 ring-white/70 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/40 active:scale-95"
      >
        <Phone className="h-6 w-6" strokeWidth={2.5} />

        {/* Hover tooltip (desktop only) */}
        <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
          Call us
        </span>
      </a>
    </div>
  );
}
