
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { LayoutDashboard, Newspaper, Package, Settings, LogOut } from 'lucide-react';
import logo from '../assets/logo.png';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await supabase.auth.signOut();
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
