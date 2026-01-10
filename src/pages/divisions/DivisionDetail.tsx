
import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { DIVISIONS } from '../../constants';
import { ArrowLeft, Sparkles, Shield, Rocket, Users, Zap, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const DIVISION_THEMES: Record<string, any> = {
    estrategia: {
        theme: 'bg-green-950/20 text-green-500 border-green-500/30',
        accent: 'text-yellow-500',
        gradient: 'from-green-500/20 to-yellow-500/10',
        orisha: 'Orunmila'
    },
    mobiliario: {
        theme: 'bg-blue-950/20 text-blue-500 border-blue-500/30',
        accent: 'text-cyan-400',
        gradient: 'from-blue-600/20 to-cyan-500/10',
        orisha: 'Yemayá'
    },
    construccion: {
        theme: 'bg-red-950/20 text-red-500 border-red-500/30',
        accent: 'text-orange-500',
        gradient: 'from-red-600/20 to-orange-500/10',
        orisha: 'Shangó'
    },
    gastronomia: {
        theme: 'bg-indigo-950/20 text-indigo-400 border-indigo-500/30',
        accent: 'text-blue-400',
        gradient: 'from-blue-900/40 to-indigo-900/10',
        orisha: 'Olokun'
    },
    logistica: {
        theme: 'bg-slate-900 text-red-500 border-red-900/30',
        accent: 'text-red-700',
        gradient: 'from-red-800/20 to-black/30',
        orisha: 'Eshú'
    }
};

export default function DivisionDetail() {
    const { id } = useParams();
    const { t } = useTranslation();
    const division = DIVISIONS.find(d => d.id === id);
    const theme = id ? DIVISION_THEMES[id] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!division || !theme) {
        return <Navigate to="/" replace />;
    }

    // Dynamic Translation Data
    const fullTitle = t(`divisions.${id}.fullTitle`);
    const vision = t(`divisions.${id}.vision`);
    const cta = t(`divisions.${id}.cta`);

    // Points are returned as an object {0: "", 1: ""} from i18n
    const pointsObj = t(`divisions.${id}.points`, { returnObjects: true }) as Record<string, string>;
    const points = Object.values(pointsObj || {});

    return (
        <div className="min-h-screen bg-slate-950 text-white pt-32 pb-20 relative overflow-hidden">
            {/* Visual background dedicated to the Orisha */}
            <div className={`absolute inset-0 z-0 opacity-10 blur-[120px] bg-gradient-to-tr ${theme.gradient}`}></div>

            <div className="max-w-6xl mx-auto px-4 relative z-10">
                <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-500 transition-colors mb-12 group">
                    <ArrowLeft className="group-hover:-translate-x-2 transition-transform" />
                    <span className="text-[10px] uppercase tracking-widest font-black">Volver al Hub</span>
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div>
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6 ${theme.theme}`}>
                            <Sparkles className="w-3 h-3" />
                            <span className="text-[9px] uppercase tracking-[0.3em] font-black">{theme.orisha}</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
                            {fullTitle}
                        </h1>

                        <p className="text-xl text-slate-400 italic mb-10 leading-relaxed font-light border-l-4 border-amber-500 pl-8">
                            "{vision}"
                        </p>

                        <div className="space-y-4 mb-12">
                            {points.map((point: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                                    <CheckCircle2 className={`w-5 h-5 ${theme.accent}`} />
                                    <span className="text-slate-300 font-bold text-sm tracking-wide">{point}</span>
                                </div>
                            ))}
                        </div>

                        <Link
                            to="/contact"
                            className={`inline-flex items-center gap-4 px-10 py-5 bg-amber-500 text-slate-950 font-black rounded-full hover:scale-105 transition-all shadow-2xl shadow-amber-500/20`}
                        >
                            <span>{cta}</span>
                            <Rocket className="w-5 h-5" />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className={`absolute inset-0 bg-gradient-to-tr ${theme.gradient} blur-3xl rounded-full opacity-30`}></div>
                        <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-3xl transform rotate-1 group">
                            <img src={division.image} alt={t(division.title)} className="w-full h-[600px] object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>

                            <div className="absolute bottom-10 left-10 p-8 backdrop-blur-md bg-white/5 rounded-3xl border border-white/10">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/10 text-amber-500`}>
                                        {division.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Estatus Akamara</p>
                                        <p className="text-white font-bold tracking-tight">División Activa</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32">
                    {[
                        { icon: Shield, title: 'Calidad SURL', desc: 'Cumplimiento estricto de estándares operativos y legales cubanos.' },
                        { icon: Users, title: 'Equipo Especialista', desc: 'Brigadas y profesionales con años de experiencia en el sector.' },
                        { icon: Zap, title: 'Eficiencia Akamara', desc: 'Procesos optimizados para entrega en tiempo y forma récord.' }
                    ].map((feature, i) => (
                        <div key={i} className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-all text-center">
                            <feature.icon className="w-10 h-10 text-amber-500 mx-auto mb-6" />
                            <h3 className="text-white font-black uppercase text-xs tracking-widest mb-4">{feature.title}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
