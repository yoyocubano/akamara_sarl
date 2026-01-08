
import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import logo from '../assets/logo.png';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
        } else {
            navigate('/admin');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-void flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/5 rounded-full blur-[80px] animate-pulse"></div>
            </div>

            <div className="w-full max-w-md bg-slate-950/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <div className="flex flex-col items-center mb-8">
                    <div className="relative group perspective-[1000px] mb-4">
                        <div className="absolute inset-0 bg-amber-500 blur-md opacity-20 group-hover:opacity-50 transition-opacity duration-500"></div>
                        <img src={logo} alt="Akamara" className="w-20 h-20 object-contain drop-shadow-2xl logo-beat" />
                    </div>
                    <h2 className="text-2xl font-black text-white uppercase tracking-wider">El Tablero</h2>
                    <p className="text-amber-500 text-xs uppercase tracking-[0.3em] font-bold">Acceso Restringido</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded mb-6 text-sm flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Credencial (Email)</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="admin@akamara.cu"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-xs uppercase tracking-widest font-bold mb-2">Llave (Password)</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-black/40 border border-white/10 text-white px-4 py-3 rounded focus:outline-none focus:border-amber-500 transition-colors"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-white text-black font-black uppercase tracking-widest py-4 hover:bg-amber-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
                    >
                        {loading ? (
                            <Sparkles className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Entrar al Void
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
