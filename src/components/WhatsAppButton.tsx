
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
    const defaultNumber = "5358746866";
    const waLink = `https://wa.me/${defaultNumber}`;

    return (
        <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#1db954] transition-all duration-300 hover:scale-105 animate-in fade-in slide-in-from-bottom-4 group"
            aria-label="Contact on WhatsApp"
        >
            <MessageCircle className="w-6 h-6 fill-current" />
            <span className="font-bold tracking-wide group-hover:underline decoration-white/30 underline-offset-4">WhatsApp</span>
        </a>
    );
}
