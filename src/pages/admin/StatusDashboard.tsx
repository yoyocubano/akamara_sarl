import { useEffect, useState } from 'react';
import { Activity, Mail, CheckCircle, Database, Server, Users, Eye } from 'lucide-react';
import { databases, APPWRITE_CONFIG } from '../../lib/appwrite';
import { Query } from 'appwrite';

const StatusDashboard = () => {
    const [dbStatus, setDbStatus] = useState<'connected' | 'error' | 'checking'>('checking');
    const [stats, setStats] = useState({
        liveVisitors: 0,
        totalVisits24h: 0,
        messageCount: 0
    });

    useEffect(() => {
        checkHealth();
        const interval = setInterval(checkHealth, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const checkHealth = async () => {
        try {
            // 1. Check DB Connection (Novedades)
            await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID, 
                APPWRITE_CONFIG.COLLECTIONS.NOVEDADES, 
                [Query.limit(1)]
            );
            setDbStatus('connected');

            // 2. Fetch Live Visitors (Active in last 5 mins)
            const fiveMinsAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
            const liveDocs = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.ANALYTICS,
                [Query.greaterThan('$createdAt', fiveMinsAgo)]
            );

            // 3. Fetch Total Visits (Last 24h)
            const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
            const dayDocs = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTIONS.ANALYTICS,
                [Query.greaterThan('$createdAt', twentyFourHoursAgo)]
            );

            setStats({
                liveVisitors: liveDocs.total,
                totalVisits24h: dayDocs.total,
                messageCount: 12 // Placeholder
            });
        } catch (error) {
            console.error(error);
            setDbStatus('error');
        }
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4">
            <h1 className="text-3xl font-black text-white uppercase tracking-tight flex items-center gap-3 mb-8">
                <Activity className="w-8 h-8 text-amber-500" />
                Estado del Sistema
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Live Visitors */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Users size={80} />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-amber-500/10 rounded-lg">
                            <Users className="w-6 h-6 text-amber-500" />
                        </div>
                        <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase flex items-center gap-2">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Live
                        </span>
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider relative z-10">Visitantes Ahora</h3>
                    <p className="text-3xl font-black text-white mt-1 relative z-10">{stats.liveVisitors}</p>
                </div>

                {/* Total Visits 24h */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Eye size={80} />
                    </div>
                    <div className="flex justify-between items-start mb-4 relative z-10">
                        <div className="p-3 bg-blue-500/10 rounded-lg">
                            <Eye className="w-6 h-6 text-blue-400" />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase">24 Horas</span>
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider relative z-10">Visitas Totales</h3>
                    <p className="text-3xl font-black text-white mt-1 relative z-10">{stats.totalVisits24h}</p>
                </div>

                {/* Database Status */}
                <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Database className="w-6 h-6 text-slate-400" />
                        </div>
                        {dbStatus === 'connected' ? (
                            <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Online</span>
                        ) : (
                            <span className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-bold uppercase">Error</span>
                        )}
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider">Base de Datos</h3>
                    <p className="text-xl font-black text-white mt-1">Supabase</p>
                </div>

                 {/* Message Log */}
                 <div className="bg-slate-900/50 border border-white/5 p-6 rounded-2xl">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-slate-800 rounded-lg">
                            <Mail className="w-6 h-6 text-purple-400" />
                        </div>
                        <span className="text-slate-500 text-xs font-bold uppercase">30 días</span>
                    </div>
                    <h3 className="text-slate-400 text-sm uppercase font-bold tracking-wider">Mensajes</h3>
                    <p className="text-xl font-black text-white mt-1">{stats.messageCount}</p>
                </div>
            </div>

            <div className="mt-8 bg-slate-900/30 border border-white/5 rounded-2xl p-6">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Registro de Actividad Reciente
                </h3>
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Monitor de Tráfico Activado</span>
                        <span className="text-slate-500 text-xs text-right">Hace 1 min</span>
                    </div>
                    <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-300">Sincronización de Base de Datos</span>
                        <span className="text-slate-500 text-xs text-right">Automático</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusDashboard;
