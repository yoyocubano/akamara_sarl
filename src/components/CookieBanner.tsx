import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Cookie, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

/**
 * Cookie Banner Component
 * Ported from Welux Events to ensure EU GDPR Compliance for Akamara S.U.R.L.
 * Styled with Akamara's Void/Amber theme.
 */
export default function CookieBanner() {
    const { t } = useTranslation();
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setVisible(true);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie_consent', 'true');
        setVisible(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookie_consent', 'false');
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[10000] bg-slate-950/95 backdrop-blur-md border-t border-white/10 shadow-2xl animate-in slide-in-from-bottom duration-500">
            <div className="max-w-7xl mx-auto px-4 py-4 md:py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                
                <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-amber-500/10 rounded-lg shrink-0">
                        <Cookie className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-white text-sm font-bold uppercase tracking-wider">Aviso de Privacidad</h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-3xl">
                            {t('cookies.message') || "Utilizamos cookies para garantizar la mejor experiencia en nuestro ecosistema digital. Al continuar, usted acepta nuestro uso de datos para optimizar la plataforma."}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={handleReject}
                        className="flex-1 md:flex-none px-4 py-2 rounded text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
                    >
                        {t('cookies.reject') || "Rechazar"}
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 md:flex-none px-6 py-2 rounded bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2"
                    >
                        <ShieldCheck className="w-3 h-3" />
                        {t('cookies.accept') || "Aceptar"}
                    </button>
                </div>
            </div>
        </div>
    );
}
