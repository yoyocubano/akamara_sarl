
import React, { useState, useRef, useEffect } from "react";
import { X, Send, Sparkles, Loader2 } from "lucide-react";
import { databases, APPWRITE_CONFIG } from "../lib/appwrite";
import { Query } from "appwrite";

interface Message {
    role: "user" | "assistant" | "system";
    content: string;
    timestamp?: string;
}

export default function OriChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "sk-ee8de57e3144456aa0b13285ada8c0eb";

    // Dynamic Identity Logic
    const YUNIOR_END_DATE = new Date("2026-01-16T23:59:59");
    const now = new Date();
    const isYuniorMode = now < YUNIOR_END_DATE;

    const getTimeGreeting = () => {
        const hour = now.getHours();
        if (hour >= 5 && hour < 12) return isYuniorMode ? "¡Buenos días, asere!" : "¡Buenos días!";
        if (hour >= 12 && hour < 19) return isYuniorMode ? "¡Buenas tardes, qué volá!" : "¡Buenas tardes!";
        return isYuniorMode ? "¡Buenas noches, en la talla!" : "¡Buenas noches!";
    };

    const botIdentity = isYuniorMode ? {
        name: "Yunior GPT",
        slogan: "que bolero el mio",
        vibe: "repartero cubano",
        greeting: `${getTimeGreeting()} Soy Yunior, el que sabe de todo aquí en Akamara. Dime qué es lo que hay, ¿qué bolero el mío?`,
        systemPrompt: `Eres Yunior GPT, un asistente virtual cubano con estilo "repartero". Tu slogan es "que bolero el mio". Hablas con jerga cubana urbana de forma moderada pero auténtica (asere, qué volá, en la talla, fula, muela). 
        
        **CONOCIMIENTO DE AKAMARA (MANIFIESTO):**
        Trabajas para Akamara S.U.R.L., un ecosistema de creación inspirado en los Orishas.
        - **Estrategia (Orunmila):** Sabiduría y conocimiento.
        - **Diseño (Yemayá):** Fluidez y ambientes de paz.
        - **Construcción (Shangó):** Fuerza y carácter sólido.
        - **Gastronomía (Olokun):** Profundidad y riqueza de sabores.
        - **Logística (Eshú):** Abrir caminos y conectar destinos.
        
        Tu misión es resolver problemas "en la talla" y vender estos servicios a clientes (hoteles, empresas, gente que quiere remodelar). Eres experto en todo pero de forma relajada y directa. Estás activo por una semana antes de que regrese Ori IA.`,
        iconStyle: "bg-red-600 shadow-red-900/40"
    } : {
        name: "Ori IA",
        slogan: "Asistente Virtual Eficiente",
        vibe: "efficient",
        greeting: `${getTimeGreeting()} Soy Ori, la asistente virtual de Akamara. ¿En qué puedo ayudarle hoy de manera eficiente?`,
        systemPrompt: `Eres Ori IA, la asistente virtual oficial de Akamara S.U.R.L. Tu tono es profesional, eficiente, cortés y altamente analítico.
        
        **MANIFIESTO Y CONSTITUCIÓN DE AKAMARA:**
        Akamara es un "Ecosistema de Creación" inspirado en la excelencia y la herencia cultural (filosofía Orisha):
        1. **División Estrategia (Inspiración Orunmila):** Consultoría basada en conocimiento.
        2. **División Mobiliario y Diseño (Inspiración Yemayá):** Creación de ambientes fluidos y maternales.
        3. **División Construcción (Inspiración Shangó):** Ejecución sólida, justa y con fuerza.
        4. **División Gastronomía (Inspiración Olokun):** Calidad profunda y detalles ocultos.
        5. **División Logística (Inspiración Eshú):** Oportunidad y conexión de destinos.

        **NUESTRO OBJETIVO:**
        Servir como Hub Digital y Vitrina de Excelencia para clientes corporativos (Hoteles, Inversores) y particulares que buscan diseño de autor y seriedad jurídica como S.U.R.L. en Cuba.

        Tu objetivo es brindar información precisa basada en esta estructura y ayudar a los clientes a canalizar sus proyectos hacia la división correcta.`,
        iconStyle: "bg-gradient-to-tr from-amber-500 to-amber-700"
    };

    // Initial Greeting
    useEffect(() => {
        if (messages.length === 0 && isOpen) {
            setIsLoading(true);
            const timer = setTimeout(() => {
                setMessages([{
                    role: "assistant",
                    content: botIdentity.greeting,
                    timestamp: getCurrentTime()
                }]);
                setIsLoading(false);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [isOpen, messages.length, botIdentity.greeting]);

    // Auto-Scroll
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isLoading, isOpen]);

    const getCurrentTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const [dynamicPrompt, setDynamicPrompt] = useState("");
    const DAILY_LIMIT = 20; // Message limit per user/day
    
    // Check Limits
    const checkLimit = () => {
        const today = new Date().toDateString();
        const usage = JSON.parse(localStorage.getItem('akamara_chat_usage') || '{}');
        
        if (usage.date !== today) {
            usage.date = today;
            usage.count = 0;
        }
        
        if (usage.count >= DAILY_LIMIT) return false;
        
        usage.count++;
        localStorage.setItem('akamara_chat_usage', JSON.stringify(usage));
        return true;
    };

    // Fetch Dynamic Prompt from Appwrite
    useEffect(() => {
        const fetchPrompt = async () => {
            try {
                // Fetch System Prompt from Settings
                const docs = await databases.listDocuments(
                    APPWRITE_CONFIG.DATABASE_ID,
                    APPWRITE_CONFIG.COLLECTIONS.SETTINGS,
                    [Query.equal('key', 'chatbot_system_prompt')]
                );
                
                if (docs.total > 0) {
                   setDynamicPrompt(docs.documents[0].value);
                }
            } catch (err) {
                console.warn("Using default system prompt");
            }
        };
        fetchPrompt();
    }, []);

    const fetchDeepSeekResponse = async (chatMessages: Message[]) => {
        if (!checkLimit()) {
            return isYuniorMode 
                ? "Asere, ya hablamos demasiado por hoy. La cuenta no da pa' más. Mañana seguimos." 
                : "He alcanzado mi límite diario de mensajes. Por favor, contáctenos vía WhatsApp o intente mañana.";
        }

        const activeSystemPrompt = dynamicPrompt || botIdentity.systemPrompt;

        const fullPrompt = [
            {
                role: "system",
                content: `${activeSystemPrompt}\n\nCONTEXTO ACTUAL:\n- Fecha: ${now.toLocaleDateString('es-ES')}\n- Hora Local: ${now.toLocaleTimeString('es-ES')}\n- Ubicación: La Habana, Cuba.\n\nIMPORTANTE: No alucines con la fecha ni la hora, usa los datos proporcionados arriba. Saluda adecuadamente según el contexto horario si es necesario.`
            },
            ...chatMessages.map(m => ({ role: m.role, content: m.content }))
        ];

        try {
            const response = await fetch("https://api.deepseek.com/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: fullPrompt,
                    stream: false
                })
            });

            if (!response.ok) throw new Error("Error en la API de DeepSeek");
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error("DeepSeek Error:", error);
            return isYuniorMode
                ? "Asere, la tecnología me tiró un pie de amigo. Aguántame ahí un momento o escríbenos al WhatsApp."
                : "Lo siento, estoy experimentando una interrupción técnica. Por favor, inténtelo de nuevo en unos momentos o contáctenos vía WhatsApp.";
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg: Message = {
            role: "user",
            content: inputValue,
            timestamp: getCurrentTime(),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInputValue("");
        setIsLoading(true);

        const aiResponse = await fetchDeepSeekResponse(updatedMessages);

        setMessages((prev) => [...prev, {
            role: "assistant",
            content: aiResponse,
            timestamp: getCurrentTime()
        }]);
        setIsLoading(false);
    };

    return (
        <>
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998]" onClick={() => setIsOpen(false)} />
                    <div className="fixed z-[9999] bottom-4 right-4 sm:bottom-8 sm:right-8 w-full sm:w-[400px] h-[600px] flex flex-col shadow-2xl bg-slate-950 border border-amber-500/30 rounded-2xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">

                        {/* Header */}
                        <div className="p-4 flex justify-between items-center bg-slate-900/90 border-b border-white/5 backdrop-blur-md">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-white/10 shadow-lg transition-colors duration-500 ${botIdentity.iconStyle}`}>
                                        <Sparkles className="w-5 h-5 text-white" />
                                    </div>
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-base">{botIdentity.name}</h3>
                                    <p className="text-[10px] text-amber-500 uppercase tracking-widest font-bold">{botIdentity.slogan}</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-950 relative">
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
                                        <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                                        <span className="text-[10px] text-slate-500 italic">Procesando...</span>
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
                    className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full text-white shadow-2xl transition-all duration-300 flex items-center justify-center group transform-gpu hover:scale-110 bg-gradient-to-r from-amber-500 to-amber-600 shadow-amber-500/30 hover:shadow-amber-500/50"
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
