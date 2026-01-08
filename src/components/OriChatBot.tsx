
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";

// --- Theme Constants (Cosmic Luxury) ---
const THEME = {
    primary: "#f59e0b", // Amber 500
    bg: "bg-slate-950",
    surface: "bg-black",
    userBubble: "bg-amber-600 text-white",
    botBubble: "bg-slate-800 text-slate-200",
    dateBadge: "bg-slate-900 text-slate-500",
};

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

export default function OriChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Greeting
    useEffect(() => {
        if (messages.length === 0 && isOpen) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setMessages([{
                    role: "assistant",
                    content: "¡Hola! Soy Ori, la asistente virtual de Akamara. ¿En qué puedo ayudarte hoy?",
                    timestamp: getCurrentTime()
                }]);
                setIsLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length]);

    // Auto-Scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading, isOpen]);

    const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg: Message = {
            role: "user",
            content: inputValue,
            timestamp: getCurrentTime(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        // Simulate Response
        setTimeout(() => {
            const responses = [
                "Estoy procesando tu solicitud con mis algoritmos creativos...",
                "Interesante punto. En Akamara buscamos trascender lo ordinario.",
                "Esa es una excelente pregunta. Permíteme consultar con La Fragua.",
                "Entendido. ¿Te gustaría saber más sobre nuestros servicios de Mobiliario o Construcción?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages((prev) => [...prev, {
                role: "assistant",
                content: randomResponse,
                timestamp: getCurrentTime()
            }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" onClick={() => setIsOpen(false)} />
                    <div className="fixed z-[9999] bottom-4 right-4 sm:bottom-8 sm:right-8 w-full sm:w-[400px] flex flex-col shadow-2xl bg-slate-950 border border-amber-500/30 rounded-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                        {/* Header */}
                        <div className="p-4 flex justify-between items-center bg-slate-900/90 border-b border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-700 flex items-center justify-center border border-white/10 shadow-lg">
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">Ori AI</h3>
                                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">Asistente Virtual</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 h-[400px] overflow-y-auto p-4 space-y-4 bg-slate-950 relative">
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #f59e0b 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>

                            {messages.map((msg, idx) => {
                                const isUser = msg.role === "user";
                                return (
                                    <div key={idx} className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] flex gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {!isUser && (
                                                <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center shrink-0 border border-white/5 text-[8px] font-bold text-slate-400 mt-1">AI</div>
                                            )}
                                            <div className="flex flex-col">
                                                <div className={`px-4 py-2 text-sm shadow-md ${isUser ? 'bg-amber-600 text-white rounded-l-xl rounded-vr-none rounded-br-xl' : 'bg-slate-800 text-slate-200 rounded-r-xl rounded-bl-xl'}`}>
                                                    {msg.content}
                                                </div>
                                                <span className={`text-[9px] text-slate-600 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>{msg.timestamp}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="flex gap-2 items-center bg-slate-800 px-4 py-2 rounded-xl">
                                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                        <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-bounce"></div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="p-3 bg-slate-900 border-t border-white/10">
                            <form onSubmit={handleSubmit} className="flex gap-2">
                                <input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Escribe un mensaje..."
                                    className="flex-1 bg-black/50 border border-white/10 rounded-full px-4 h-10 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-all placeholder:text-slate-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim() || isLoading}
                                    className="w-10 h-10 rounded-full bg-amber-600 hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all shadow-lg shadow-amber-900/20"
                                >
                                    <Send className="w-4 h-4 ml-0.5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            )}

            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-2xl shadow-amber-500/30 hover:scale-110 hover:shadow-amber-500/50 transition-all duration-300 flex items-center justify-center group"
                >
                    <Sparkles className="w-8 h-8 group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                </button>
            )}
        </>
    );
}
