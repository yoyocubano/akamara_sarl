
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Newspaper, Package, LogOut, Settings, Sparkles, AlertCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const AICreditBalance = () => {
    const [balance, setBalance] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY || "sk-ee8de57e3144456aa0b13285ada8c0eb";

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch("https://api.deepseek.com/user/balance", {
                    headers: { "Authorization": `Bearer ${API_KEY}` }
                });
                const data = await response.json();
                if (data.balance_infos && data.balance_infos.length > 0) {
                    setBalance(parseFloat(data.balance_infos[0].total_balance));
                }
            } catch (error) {
                console.error("Error fetching AI balance:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBalance();
        const interval = setInterval(fetchBalance, 60000); // Update every minute
        return () => clearInterval(interval);
    }, [API_KEY]);

    if (isLoading) return <div className="px-4 py-2 animate-pulse bg-white/5 rounded-lg mx-4 mt-2 h-10"></div>;

    const isLow = balance !== null && balance <= 0.05;
    const isExhausted = balance !== null && balance <= 0;

    // Assume $2.00 as "full" for the bar as the user suggested
    const percentage = balance !== null ? Math.min(Math.max((balance / 2.0) * 100, 0), 100) : 0;

    return (
        <a
            href="https://platform.deepseek.com/top_up"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-4 py-4 mx-4 mt-2 bg-slate-900 border border-white/5 rounded-xl shadow-inner hover:bg-slate-800 transition-all group/credit"
        >
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Sparkles className={`w-3 h-3 ${isExhausted ? 'text-red-500' : 'text-amber-500'}`} />
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover/credit:text-amber-400 transition-colors">Crédito IA</span>
                </div>
                {isExhausted && <AlertCircle className="w-3 h-3 text-red-500 animate-pulse" />}
            </div>

            <div className="flex items-baseline gap-1 mb-2">
                <span className={`text-lg font-black ${isExhausted ? 'text-red-500' : 'text-white'}`}>
                    ${balance?.toFixed(2) || "0.00"}
                </span>
                <span className="text-[8px] text-slate-600 font-bold uppercase">USD</span>
            </div>

            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ${isExhausted ? 'bg-red-600' : isLow ? 'bg-orange-500' : 'bg-amber-500'}`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
            <p className="text-[8px] text-slate-500 mt-2 leading-tight group-hover/credit:text-slate-300 transition-colors">
                {isExhausted ? '⚠ SIN CRÉDITO. TOCAR PARA RECARGAR' : 'CRÉDITO ACTIVO. GESTIONAR AQUÍ'}
            </p>
        </a>
    );
};

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await account.deleteSession('current');
        } catch (e) {
            console.error('Logout error', e);
        }
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-void flex font-sans text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-950/90 border-r border-white/5 flex flex-col fixed h-full z-20">
                <div className="h-20 flex items-center px-6 border-b border-white/5 space-x-3">
                    <img src={logo} alt="Akamara" className="w-8 h-8 object-contain" />
                    <span className="font-black uppercase tracking-wider text-sm">El Tablero</span>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-4 px-4 pt-4">Gestión</div>

                    <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                        <LayoutDashboard className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold tracking-wide">Vista General</span>
                    </Link>

                    <Link to="/admin/novedades" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                        <Newspaper className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold tracking-wide">Novedades</span>
                    </Link>

                    <Link to="/admin/mobiliario" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                        <Package className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold tracking-wide">Mobiliario</span>
                    </Link>

                    <Link to="/admin/config" className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-colors group">
                        <Settings className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
                        <span className="text-sm font-bold tracking-wide">Configuración</span>
                    </Link>

                    <div className="pt-6">
                        <AICreditBalance />
                    </div>
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button onClick={handleLogout} className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-wide">Desconectar</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8">
                <div className="max-w-5xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
