
import { useState, useEffect } from 'react';
import { databases, APPWRITE_CONFIG } from '../../lib/appwrite';
import { Query } from 'appwrite';
import { Mail, Clock } from 'lucide-react';

export default function MessagesManager() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            // --- AUTO-CLEANUP: Delete messages older than 10 days ---
            // This runs client-side for Akamara (Appwrite) as instructed to match Welux features
            try {
                const tenDaysAgo = new Date();
                tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
                
                // 1. List old documents
                const oldDocs = await databases.listDocuments(
                    APPWRITE_CONFIG.DATABASE_ID,
                    APPWRITE_CONFIG.COLLECTIONS.MESSAGES,
                    [Query.lessThan('$createdAt', tenDaysAgo.toISOString())]
                );

                // 2. Delete them one by one (Appwrite bulk delete depends on version/permissions, safety first)
                if (oldDocs.total > 0) {
                    console.log(`🧹 Auto-Cleanup: Removing ${oldDocs.total} old messages...`);
                    await Promise.all(oldDocs.documents.map(doc => 
                        databases.deleteDocument(
                            APPWRITE_CONFIG.DATABASE_ID, 
                            APPWRITE_CONFIG.COLLECTIONS.MESSAGES, 
                            doc.$id
                        )
                    ));
                }
            } catch (cleanupError) {
                console.warn("Auto-cleanup warning:", cleanupError);
                // Continue fetching even if cleanup fails
            }
            // -----------------------------------------------------

            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.MESSAGES,
                [Query.orderDesc('$createdAt')]
            );
            setMessages(response.documents);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = async (id: string, currentStatus: boolean) => {
        try {
            await databases.updateDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.MESSAGES,
                id,
                { read: !currentStatus }
            );
            setMessages(messages.map(m => m.$id === id ? { ...m, read: !currentStatus } : m));
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="space-y-8 p-6 text-slate-300">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-black text-white">Buzón de Mensajes</h2>
                    <p className="text-slate-500">Solicitudes de contacto recibidas desde la web.</p>
                </div>
                <div className="bg-slate-900 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2">
                    <Mail size={16} className="text-amber-500" />
                    <span className="font-bold">{messages.length} Total</span>
                </div>
            </div>

            <div className="space-y-4">
                {messages.map(msg => (
                    <div key={msg.$id} className={`p-6 rounded-2xl border transition-all ${msg.read ? 'bg-slate-900/50 border-white/5 opacity-70' : 'bg-slate-900 border-amber-500/30 shadow-lg shadow-amber-500/5'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.read ? 'bg-white/5 text-slate-500' : 'bg-amber-500/20 text-amber-500'}`}>
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white">{msg.name}</h3>
                                    <p className="text-xs text-slate-400">{msg.company || 'Particular'} • <span className="text-amber-500">{msg.division}</span></p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <span className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                                    <Clock size={10} />
                                    {new Date(msg.$createdAt).toLocaleString()}
                                </span>
                                <button 
                                    onClick={() => toggleRead(msg.$id, msg.read)}
                                    className={`text-xs px-3 py-1 rounded-full border ${msg.read ? 'border-white/10 text-slate-500 hover:text-white' : 'border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-slate-950'} transition-all`}
                                >
                                    {msg.read ? 'Marcar como No Leído' : 'Marcar como Leído'}
                                </button>
                            </div>
                        </div>
                        
                        <div className="pl-13 ml-13 bg-black/20 p-4 rounded-xl border border-white/5 text-sm leading-relaxed text-slate-300 font-light">
                            "{msg.message}"
                        </div>

                        <div className="mt-4 flex gap-4 pl-13 text-xs">
                            <a href={`mailto:${msg.email}`} className="text-amber-500 hover:text-amber-400 font-bold flex items-center gap-2">
                                ✉️ Responder a: {msg.email}
                            </a>
                        </div>
                    </div>
                ))}

                {messages.length === 0 && !loading && (
                    <div className="text-center py-20 bg-slate-900 border border-white/5 rounded-3xl border-dashed">
                        <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-500">No hay mensajes nuevos.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
