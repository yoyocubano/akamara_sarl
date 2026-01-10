
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, FileText, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../contexts/ConfigContext';
import { LEGAL_INFO } from '../constants';

export default function Policies() {
    const { config } = useConfig();
    const { t } = useTranslation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper to render HTML strings safely
    const renderHTML = (htmlKey: string) => {
        return <span dangerouslySetInnerHTML={{ __html: t(htmlKey) }} />;
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-amber-500 selection:text-slate-950 pt-32 pb-20">
            <div className="max-w-4xl mx-auto px-6">
                
                <Link to="/" className="inline-flex items-center gap-2 text-amber-500 hover:text-amber-400 transition-colors mb-12 font-bold uppercase tracking-widest text-xs">
                    <ArrowLeft size={16} />
                    {t('policies.back')}
                </Link>

                <div className="text-center mb-16">
                    <Shield className="w-16 h-16 text-amber-500 mx-auto mb-6" />
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">{t('policies.title')}</h1>
                    <p className="text-slate-500 text-lg">{t('policies.last_update')}</p>
                </div>

                <div className="space-y-12">

                    {/* SECCIÓN 1: MARCO LEGAL */}
                    <section className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                <FileText size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('policies.legal_info.title')}</h2>
                        </div>
                        <div className="prose prose-invert prose-slate max-w-none text-sm leading-relaxed">
                            <p>{renderHTML('policies.legal_info.intro')}</p>
                            <ul className="list-none pl-0 space-y-2 my-4 bg-black/20 p-6 rounded-xl border border-white/5 font-mono text-xs">
                                <li><strong>{t('policies.legal_info.labels.reason')}</strong> {LEGAL_INFO.name}</li>
                                <li><strong>{t('policies.legal_info.labels.form')}</strong> {t('policies.legal_info.values.form')}</li>
                                <li><strong>{t('policies.legal_info.labels.nit')}</strong> {LEGAL_INFO.nit}</li>
                                <li><strong>{t('policies.legal_info.labels.address')}</strong> {LEGAL_INFO.location}</li>
                                <li><strong>{t('policies.legal_info.labels.framework')}</strong> {t('policies.legal_info.values.framework')}</li>
                            </ul>
                            <p>{renderHTML('policies.legal_info.closing')}</p>
                        </div>
                    </section>

                    {/* SECCIÓN 2: PRIVACIDAD */}
                    <section className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-green-500/10 rounded-xl text-green-500">
                                <Lock size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('policies.privacy.title')}</h2>
                        </div>
                        <div className="prose prose-invert prose-slate max-w-none text-sm leading-relaxed">
                            <p>{renderHTML('policies.privacy.intro')}</p>
                            <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-400">
                                <li>
                                    <strong className="text-white">{t('policies.privacy.points.confidentiality.title')}</strong> {renderHTML('policies.privacy.points.confidentiality.desc')}
                                </li>
                                <li>
                                    <strong className="text-white">{t('policies.privacy.points.no_transfer.title')}</strong> {renderHTML('policies.privacy.points.no_transfer.desc')}
                                </li>
                                <li>
                                    <strong className="text-white">{t('policies.privacy.points.security.title')}</strong> {renderHTML('policies.privacy.points.security.desc')}
                                </li>
                            </ul>
                        </div>
                    </section>

                    {/* SECCIÓN 3: EXENCIÓN DE RESPONSABILIDAD (DISCLAIMER) */}
                    <section className="bg-slate-900/50 p-8 rounded-3xl border border-red-500/10 hover:border-red-500/30 transition-colors relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
                            <AlertTriangle size={200} />
                        </div>
                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 bg-red-500/10 rounded-xl text-red-500">
                                <AlertTriangle size={24} />
                            </div>
                            <h2 className="text-2xl font-bold text-white">{t('policies.disclaimer.title')}</h2>
                        </div>
                        <div className="prose prose-invert prose-slate max-w-none text-sm leading-relaxed relative z-10">
                            <p className="font-bold text-white mb-4">
                                {t('policies.disclaimer.intro')}
                            </p>
                            <p>
                                <strong>{t('policies.disclaimer.points.accuracy.title')}</strong> {t('policies.disclaimer.points.accuracy.desc')}
                            </p>
                            <p>
                                <strong>{t('policies.disclaimer.points.technical.title')}</strong> {renderHTML('policies.disclaimer.points.technical.desc')}
                            </p>
                            <p>
                                <strong>{t('policies.disclaimer.points.ai.title')}</strong> {t('policies.disclaimer.points.ai.desc')}
                            </p>
                            <p>
                                <strong>{t('policies.disclaimer.points.external.title')}</strong> {t('policies.disclaimer.points.external.desc')}
                            </p>
                        </div>
                    </section>
                    
                    {/* SECCIÓN 4: PROPIEDAD INTELECTUAL */}
                    <section className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-amber-500/20 transition-colors">
                        <h2 className="text-xl font-bold text-white mb-4">{t('policies.ip.title')}</h2>
                        <p className="text-sm leading-relaxed">
                            {renderHTML('policies.ip.desc')}
                        </p>
                    </section>

                    <div className="text-center pt-12 border-t border-white/10 mt-12">
                        <p className="text-xs text-slate-500 uppercase tracking-widest">
                            {t('footer.rights', { year: new Date().getFullYear(), title: config.site_title || 'AKAMARA S.U.R.L.' })}
                        </p>
                        <p className="text-xs text-slate-600 mt-2">La Habana, Cuba</p>
                    </div>

                </div>
            </div>
        </div>
    );
}
