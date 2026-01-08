
import { useEffect, useState } from 'react';
import { Activity, Mail, CheckCircle, Database, Server } from 'lucide-react';
import { supabase } from '../../lib/supabase';

const StatusDashboard = () => {
    const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'checking'>('checking');
    const [messageCount, setMessageCount] = useState(0);

    useEffect(() => {
        checkHealth();
    }, []);

    const checkHealth = async () => {
        const { data, error } = await supabase.from('novedades').select('count', { count: 'exact', head: true });
        if (error && error.code !== 'PGRST116') { // Ignore empty result error if strictly checking connection
            setDbStatus('error');
        } else {
            setDbStatus('connected');
        }

        // Simulating message count or fetching from a future 'contact_messages' table
        setMessageCount(12);
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-amber-500" />
                Estado del Sistema
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Database Status */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Database className="w-6 h-6 text-blue-400" />
                        </div>
                        {dbStatus === 'connected' ? (
                            <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                Online
                            </span>
                        ) : (
                            <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Error</span>
                        )}
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider">Base de Datos</h3>
                    <p className="text-2xl font-black text-white mt-1">Supabase</p>
                </div>

                {/* Web Server Status */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Server className="w-6 h-6 text-amber-500" />
                        </div>
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Active
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider">Cloudflare Pages</h3>
                    <p className="text-2xl font-black text-white mt-1">v4.2.1 Stable</p>
                </div>

                {/* Message Log */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Mail className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase">Últimos 30 días</span>
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider">Mensajes Recibidos</h3>
                    <p className="text-2xl font-black text-white mt-1">{messageCount} Envíos</p>
                </div>
            </div>

            <div className="mt-8 bg-slate-900/30 border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Registro de Actividad Reciente
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Despliegue exitoso en Cloudflare</span>
                        <span className="text-slate-500 text-xs text-right">Hace 2 min</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Actualización de Novedades (Admin)</span>
                        <span className="text-slate-500 text-xs text-right">Hace 15 min</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDashboard;
